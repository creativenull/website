---
title: Embedded development environment in Vim (2019) - Part 1
description: There has been a lot of tutorials on setting up vim for a Python/JavaScript/Java/C/C++ environment, but I did not find a variety of tutorials on how to setup a C/C++ environment for embedded development. I did, however, find one great post.. where he did explain how to setup for one. Although his post does a great job explaining, there were still some things missing that I want to add for my embedded development environment. Things that I wanted to work for my setup
date: Feb 8, 2019
author: Arnold Chand
permalink: /posts/2019/02/08/embedded-dev-env-in-vim-2019-p1.html
isPost: true
---

<PostHeader/>

::: tip Info
This is a two part series on how my vim is setup for embedded systems development. The first part shows what vim plugins I use and how I have them setup, while part two will cover the cmake portion on setting up a build workflow and a template.
:::

There has been a lot of tutorials on setting up vim for a Python/JavaScript/Java/C/C++ environment, but I did not find a variety of tutorials on how to setup a C/C++ environment for embedded development. I did, however, find one great post [written by Alexey][ref-1] where he did explain how to setup for one. Although his post does a great job explaining, there were still some things missing that I want to add for my embedded development environment. Things that I wanted to work for my setup:

+ Using `cmake` instead of `make`.
+ Build a custom gcc toolchain for specific boards.
+ Have an all-in-one solution package that features IDE-like tools like linting, auto-completion, goto definition, etc.

So after a bit of digging and a lot of frustration on how limited resources there were, I finally found some useful resources that I was able to put together and have it working. Here are my findings and how I was able to get myself up and running for my requirements. The development board I will be using is the TI TM4C129EXL microcontroller, but the steps on setup is very similiar for other microcontrollers like other TI, STM manufacturers. Here is a picture.

<img width="50%" src="http://image.itmedia.co.jp/edn/articles/1509/27/ts150925_TI01.jpg"/>

So the things to install (this might differ since my setup is on a Linux system):

+ [neovim][neovim-link] or [vim8][vim-link]
+ __vim-plug__ - plugin manager | [link][vim-plug-link]
+ __deoplete__ - auto-completion engine | [link][deoplete-link]
+ __supertab__ - for tab completion, instead of using Ctrl+n and Ctrl+p | [link][supertab-link]
+ __LanguageClient-neovim__ - LSP client for neovim, also works in vim | [link][langclient-link]
+ __clang__ - to get `clangd` which will be used as our LSP server backend | [link][clang-link]
+ __cmake__ - build tool | [link][cmake-link]
+ __arm-gcc-toolchain__ - C compiler for ARM boards | [link][arm-gcc-link]

## Vim - install plugins
```vim
call plug#begin('~/.local/share/nvim/plugged')

" Auto-completion
Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
" Tab for auto-completion
Plug 'ervandew/supertab'
" Language client for a Language Server Protocol support
Plug 'autozimu/LanguageClient-neovim', { 'branch': 'next', 'do': 'bash install.sh' }
" Fuzzy file finder
Plug 'junegunn/fzf'

call plug#end()

" Plugin and Indent enable
filetype plugin indent on
```

Next, we reload vim and execute command `:PlugInstall` to install the plugins, and reloading vim should load our plugins.

### Plugin configs and key bindings
Now we add our global configs for our plugins. We want to make sure deoplete starts by default, supertab has an issue where it will tab complete from the bottom-top (although this is a feature in supertab) I like my tab completion from the top-bottom. Next we add our config for LanguageClient-neovim, the LSP server I will be using is `clangd`. The only binding I use is the goto definition, but you can add other bindings for LanguageClient-neovim more can found on their github repo.

```vim
" --- Deoplete Options ---
let g:deoplete#enable_at_startup=1

" --- SuperTab Options --- 
let g:SuperTabDefaultCompletionType='<C-n>'

" --- LanguageClient Options --- 
let g:LanguageClient_serverCommands={
	\ 'c': ['clangd'],
	\ 'cpp': ['clangd'],
	\ }

" LanguageClient bindings
nnoremap <F5> :call LanguageClient_contextMenu()<CR>
nnoremap <silent> gd :call LanguageClient#textDocument_definition()<CR>
```

This should be it on the vim side of things. In the next part I will show my setup of cmake and a template I usually use for developing for the TM4C microcontroller - which is just a blank template from their website but very helpful. Stay tuned for more.

[ref-1]: http://www.alexeyshmalko.com/2014/using-vim-as-c-cpp-ide/
[neovim-link]: https://neovim.io/
[vim-link]: https://www.vim.org/
[vim-plug-link]: https://github.com/junegunn/vim-plug
[langclient-link]: https://github.com/autozimu/LanguageClient-neovim
[cmake-link]: https://cmake.org/
[arm-gcc-link]: https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads
[deoplete-link]: https://github.com/Shougo/deoplete.nvim
[supertab-link]: https://github.com/ervandew/supertab
[clang-link]: https://clang.llvm.org/
