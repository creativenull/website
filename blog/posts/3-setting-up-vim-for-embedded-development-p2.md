---
title: Embedded development environment in Vim (2019) - Part 2
description: Last time, I showed you the plugins I used and setup their settings in a .vimrc (for vim) or init.vim (for nvim) file. This second part will guide you through setting up `cmake` and making sure our Langauge Server/Client is able to work properly with our custom compiler
date: Mar 5, 2019
author: Arnold Chand
permalink: /posts/2019/03/05/embedded-dev-env-in-vim-2019-p2.html
isPost: true
---

<PostHeader/>

::: tip Info
If you haven't read the first part, [click here][part-1] to read that first before you read part two.
:::

Last time, I showed you the plugins I used and setup their settings in a .vimrc (for vim) or init.vim (for nvim) file. This second part will guide you through setting up `cmake` and making sure our Langauge Server/Client is able to work properly with our custom compiler.

## Build custom toolchain
Since we're building our program to be run in a microcontroller, we need a dedicated toolchain to compile our program. The microcontroller I am using is the TI TM4C129EXL ARM microcontroller. And since GCC has ARM support we can use GCC to compile out program. To upload the program we will use the UniFlash tool provided by TI. Unfortunately, we won't be able to debug for this specific microcontroller (I haven't found a working solution yet) but but debugging any other
microcontroller OpenOCD is a great tool to enable that, however I won't be covering that in this guide - maybe part 3?

First, we'll have to create a toolchain file that we can tell `cmake` to use instead of our default installed toolchain. But before we can do that, we'll need to download the ARM GCC toolchain from developer.arm.com. Then create our environment, I'll keep the compilers and projects seperate, since I am using a Linux distro (Manjaro) I will assume you are using the same or are familiar on how to call programs in the terminal/console. Here is how our workspace will look like, you can make this workspace anywhere in your PC - I have it in a folder inside my Home directory (~/embedded):

```
.
├── compilers
└── projects

```

Download and extract the compiler from ARM - lucky for us we don't need to compile since binary sources are available. If you prefer a clicky [link][arm-gcc-link]:

```bash
# Enter into compilers directory
cd compilers
wget https://developer.arm.com/-/media/Files/downloads/gnu-rm/7-2017q4/gcc-arm-none-eabi-7-2017-q4-major-linux.tar.bz2

# Extract the file
tar xjfv gcc-arm-none-eabi-7-2017-q4-major-linux.tar.bz2

# Remove tar bz2 file
rm gcc-arm-none-eabi-7-2017-q4-major-linux.tar.bz2

cd ..
```

Create new project, I used an example file from TI to get the startup and link script to work for TM4C. So we will also need to download TivaWare - which came with Code Composer Studio. I copied mine from where I installed it into the current project:

```bash
# Create new project
cd projects
mkdir blinky
cd blinky

# Copy linker and startup script from example file
cp $HOME/ti/tivaware_c_series_2_1_4_178/examples/boards/ek-tm4c129exl/blinky/blinky.ld TM4C129ENCPDT.ld
cp $HOME/ti/tivaware_c_series_2_1_4_178/examples/boards/ek-tm4c129exl/blinky/startup_gcc.c .

# Copy the blink program to test it out
mkdir src
cp $HOME/ti/tivaware_c_series_2_1_4_178/examples/boards/ek-tm4c129exl/blinky/blinky.c src/main.c
```

Create src folder where all our source files will go inside. We'll also need to create the CMakeLists.txt file along with a toolchain file since we want to use a custom `gcc` instead of the machine installed one.

```bash
# CMakeLists and toolchain files
touch CMakeLists.txt toolchain.cmake
```

Let's start with the toolchain.cmake file.

```
# ---
# toolchain.cmake
# ---

set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM_PROCESSOR ARM)

set(ARM_GCC_PATH $ENV{EMBEDDED_ROOT}/compilers/gcc-arm-none-eabi-7-2017-q4-major/bin)

set(CMAKE_C_COMPILER ${ARM_GCC_PATH}/arm-none-eabi-gcc)
set(CMAKE_CXX_COMPILER ${ARM_GCC_PATH}/arm-none-eabi-g++)
set(CMAKE_ASM_COMPILER ${ARM_GCC_PATH}/arm-none-eabi-gcc)

# tells CMake not to try to link executables during its internal checks
# things are not going to link properly without a linker script
set(CMAKE_TRY_COMPILE_TARGET_TYPE STATIC_LIBRARY)

set(CMAKE_OBJCOPY ${ARM_GCC_PATH}/arm-none-eabi-objcopy)
set(CMAKE_OBJDUMP ${ARM_GCC_PATH}/arm-none-eabi-objdump)
set(CMAKE_SIZE ${ARM_GCC_PATH}/arm-none-eabi-size)
set(CMAKE_DEBUGGER ${ARM_GCC_PATH}/arm-none-eabi-gdb)
set(CMAKE_CPPFILT ${ARM_GCC_PATH}/arm-none-eabi-c++filt)
```

And now we add content in CMakeLists.txt file. I copied the compiler and linker flags from Code Composer Studio and how they compile the program for TM4C microcontroller.

```
# ---
# CMakeLists.txt
# ---

cmake_minimum_required(VERSION 3.10)

project(blinky)
set(PROJECT_TARGET ${PROJECT_NAME}.out)
set(PROJECT_PART TM4C129ENCPDT)

file(GLOB SOURCES ${PROJECT_SOURCE_DIR}/src/*.c)

# Startup and linker file provided by Tiva
enable_language(ASM)
set(STARTUP_FILE startup_gcc.c)
set(LINKER_SCRIPT ${PROJECT_PART}.ld)

# Bin file to create
add_executable(${PROJECT_TARGET} ${STARTUP_FILE} ${SOURCES})

# Tivaware includes and libraries
set(TIVAWARE_PATH $ENV{HOME}/ti/tivaware_c_series_2_1_4_178)
target_include_directories(${PROJECT_TARGET} PUBLIC ${TIVAWARE_PATH})
target_link_libraries(${PROJECT_TARGET} ${TIVAWARE_PATH}/driverlib/gcc/libdriver.a)

# Linker flags
set_target_properties(${PROJECT_TARGET} PROPERTIES LINK_FLAGS
	"-mthumb \
	-march=armv7e-m \
	-mcpu=cortex-m4 \
	-mfloat-abi=hard \
	-mfpu=fpv4-sp-d16 \
	-nostartfiles \
	-static \
	-Wl,-T,${PROJECT_SOURCE_DIR}/${LINKER_SCRIPT} \
	-Wl,--gc-sections")

# Compiler flags
target_compile_options(${PROJECT_TARGET} PUBLIC
	-g
	-mthumb
	-mcpu=cortex-m4
	-mfpu=fpv4-sp-d16
	-mfloat-abi=hard
	-mabi=aapcs
	-Os
	-ffunction-sections
	-fdata-sections
	-MD
	-std=c99
	-Wall
	-pedantic
	-DPART_${PROJECT_PART}
	-DTARGET_IS_TM4C129_RA1
	-Dgcc
	-c)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
```

Now I must mention that this was a quick simple way of getting embedded development setup for vim, there are some parts I will explain that will need a bit of manual modification for this to work for your environment. For our simple blink program, all we needed was the `libdriver` library that came with TivaWare. I simple linked it from where I had my TivaWare installed on my machine which is show above as `TIVAWARE_PATH`.

Finally, everything is assembled and ready for us to compile our program. Let's create a new folder where all the build files will go into, and change our directory into it.

```bash
mkdir build
cd build
```

Now we want to tell `cmake` to build the files, but we want it to use the toolchain file we created instead of `cmake` looking in the machine installed `gcc`. And once that is successful we can compile our project by calling `make` after that.

```bash
# inside the build/ directory
cmake -DCMAKE_TOOLCHAIN_FILE=../toolchain.cmake ..
-- The C compiler identification is GNU 7.2.1
-- The CXX compiler identification is GNU 7.2.1
-- Check for working C compiler: ~/embedded/compilers/gcc-arm-none-eabi-7-2017-q4-major/bin/arm-none-eabi-gcc
-- Check for working C compiler: ~/embedded/compilers/gcc-arm-none-eabi-7-2017-q4-major/bin/arm-none-eabi-gcc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Detecting C compile features
-- Detecting C compile features - done
-- Check for working CXX compiler: ~/embedded/compilers/gcc-arm-none-eabi-7-2017-q4-major/bin/arm-none-eabi-g++
-- Check for working CXX compiler: ~/embedded/compilers/gcc-arm-none-eabi-7-2017-q4-major/bin/arm-none-eabi-g++ -- works
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- The ASM compiler identification is GNU
-- Found assembler: ~/embedded/compilers/gcc-arm-none-eabi-7-2017-q4-major/bin/arm-none-eabi-gcc
-- Configuring done
-- Generating done
-- Build files have been written to: ~/embedded/guide-tutorial/projects/blinky/build

# finally, call make to compile the program
make
Scanning dependencies of target blinky.out
[ 33%] Building C object CMakeFiles/blinky.out.dir/startup_gcc.c.obj
[ 66%] Building C object CMakeFiles/blinky.out.dir/src/main.c.obj
[100%] Linking C executable blinky.out
[100%] Built target blinky.out
```

If everything went well, then we will have a `blinky.out` in our `build/` directory! Congratulate yourself for getting this far!

Now all that remains is that we are able to open up vim and try to get auto-completion and syntax/error checking working. If you remember from the first part, we had LangaugeClient-neovim as our LSP client to run `clangd` which is a Langauge Server that will run in the background providing diagnostics and auto-completion just like an IDE. But in order for `clangd` to provide us IDE-like features we need to provide it with a
`compile_commands.json` file that cmake built for us in the `build/` directory.

Since we need this file in the root of our project, we could copy the file our to the root and have that solved. The downside to that is when we add new files and recompile our program we end up with the old `compile_commands.json` file in the root, which we will need to update again manually. The best approach to this is to symbolically link `compile_commands.json` to the root, so when it updates then we don't need to worry about manually copying the file to the root.

```bash
# in the root of project - blinky/
ln -s build/compile_commands.json .
```

Open `src/main.c` in vim and start using the type any of the function that are available. As you type you should be able to get a list of options auto-completion will prompt for completion. You can go to the definition of a function declared by hovering over the function and pressing `<F5>` to show the LSP options and typing 'definition'. You can make a key binding for each LSP option. Here is my updated `init.vim` with individual key bindings.

```vim
nnoremap <F5> :call LanguageClient_contextMenu()<CR>
nnoremap <leader>gd :call LanguageClient#textDocument_definition()<CR>
nnoremap <leader>gf :call LanguageClient#textDocument_formatting()<CR>
nnoremap <leader>gr :call LanguageClient#textDocument_rename()<CR>
```

This concludes the 2nd part of the series - Embedded development environment in Vim - I would like to revist this in the future and keep it up-to-date as much as possible. I hope you enjoyed this guide.

[part-1]: https://thecreativenobody.github.io/posts/2019/02/08/embedded-dev-env-in-vim-2019-p1.html
[arm-gcc-link]: https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads
[tiva-link]: http://software-dl.ti.com/tiva-c/SW-TM4C/latest/index_FDS.html
