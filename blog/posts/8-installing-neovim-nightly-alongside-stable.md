---
title: Installing Neovim nightly alongside stable
description: In this post I will guide you on how to install neovim nightly (v0.5) alongside your stable version
date: Jan 2, 2021
author: Arnold Chand
permalink: /posts/2021/01/02/installing-neovim-nightly-alongside-stable.html
isPost: true
---

<PostHeader />

Nvim v0.5 is the development branch of neovim and has been in constant feature update. Some of the major features
include (but still in development):

+ built-in Language Server Client (aka nvim-lsp)
+ treesitter (used for syntax highlighting - and a bit of syntax check, but a topic for another day perhaps)
+ `init.lua` as a substitute config file instead of `init.vim` (Also coming soon in a future post)

You can have a [look at their roadmap here](https://neovim.io/roadmap/) to see what else is in development.

But today, my focus will be on installing nightly (or v0.5, but for this post I will refer to as nightly) alongside
your stable version.

## Why two different versions and not just update to nightly?

It's true you can just update to the nightly version and it will still work with your current config and go about your
day. But, for someone like me who uses vim at work, I want to keep a stable version separate to the nightly where I may
encounter breaking changes.

I also want to try out the features from nightly and mess around but rather keep those separate to my stable config.

If you also use vim at work but also want to experiment with the new features from nightly, then read on. Else you
would most likely not care about the majority of this post, but feel free to read 🙂.

## Requirements

Couple resources and tools you may need before we get started will be listed here:

Tools:

+ [git](https://git-scm.com)
+ [Build prerequisites from neovim wiki](https://github.com/neovim/neovim/wiki/Building-Neovim#build-prerequisites)

We will also make heavy use of the Build section of the neovim wiki resource:

+ [Building Neovim](https://github.com/neovim/neovim/wiki/Building-Neovim)

## Clone and Build

Once you have git and the build pre-requisites installed, we can continue and clone the neovim repo into your machine.
These instructions are mostly for linux but they are similar for a Mac and for Windows (if you use WSL). My default
directory will be the `$HOME` directory. So let's clone and `cd` into it.

```sh
git clone https://github.com/neovim/neovim.git $HOME/neovim
cd $HOME/neovim
```

Next we compile the source, let's keep it a `Release` type because our focus is using neovim and not developing it:

```
make CMAKE_BUILD_TYPE=Release
```

Depending on your machine, this may take anywhere from 30 seconds to an hour or two. But eventually, if all goes well
you should get no error messages and be able to see the executable at `build/bin`.

## Setup

Now we can also install the binary in a location of choice (by running
`make CMAKE_INSTALL_PREFIX=/path/to/location install`, but I would prefer to just leave the binary at
`build/bin/nvim` and work from there. The downside is that we will need to provide the runtime explicitly, so we run:

```
VIMRUNTIME=runtime ./build/bin/nvim
```

Congratulations! You got vim successfully compiled and running 🎉🥳🎉

At this point you are done. But writing the above line every time you want to open nightly is quite a hassle,
especially when you want to open from your project directory but the runtime directory is not relative to your project,
so you will have to explicitly include the full path to the runtime and the neovim binary.

A better way, would be to create a script file and call that instead. So let's make one!

```sh
touch $HOME/.local/bin/nv.sh
chmod u+x $HOME/.local/bin/nv.sh
```

> A quick note, it is convention that when making script file you create it with the `.sh` extension, but you can omit that and just use the script name (like `nv` instead of `nv.sh`).

Now inside `nv.sh`:

```sh
# nv.sh
VIMRUNTIME=$HOME/neovim/runtime $HOME/neovim/build/bin/nvim
```

Assuming that `$HOME/.local/bin` is in your `$PATH` environment, calling `nv.sh` anywhere from your terminal should
open neovim nightly.

## Config

Add your config at `$HOME/.config/nvim/init.vim` and have two separate configs for stable and nightly.

```vim
" init.vim

let $NVIM_CONFIG_DIR = expand('$HOME/.config/nvim')

if has('nvim-0.5')
    " nightly config
    source $NVIM_CONFIG_DIR/nightly.vim
else
    " stable config
    source $NVIM_CONFIG_DIR/stable.vim
```

Then you can have a `stable.vim` for your stable config and then `nightly.vim` for your nightly config.

---

However, we can take this a step further and separate them in different directories. So you can have a stable config
at `$HOME/.config/nvim` and have your nightly config at `$HOME/.config/nvim-nightly`. While this works, there are a
couple more tweaks you will have to do in order for it to work properly. If you are interested in this method then I
would recommend you to read the next section, otherwise just jump to updating neovim nightly further below 😜.

### Separate directory for stable and nightly (OPTIONAL)

Now everything from here onward is optional for you to do. The reason why I did this is because I had issues with
loading remote plugins (plugins with `rplugin` directory) where it would over-write the `rplugin.vim` manifest, if I
switch between stable and nightly. This was due to me having different plugins for the two versions. 

The solution was to keep them in separate directory so there are no namespace clashes. So we should have the following
directory structure for stable (`nvim`) and nightly (`nvim-nightly`).

```
$HOME/.config/
├── nvim
│   └── init.vim
├── nvim-nightly
│   └── init.vim
```

The same for the local directory:

```
$HOME/.local/share/
├── nvim
│   ├── site/
│   └── rplugin.vim
├── nvim-nightly
│   ├── site/
│   └── rplugin.vim
```

#### Update `nv.sh`

Since `nvim/init.vim` is the file neovim looks for as the default config, we need to explicitly mention the config file
we want loaded for nightly. And we also want to specify where remote plugins manifest will be placed.

```sh
# nv.sh
NVIM_RPLUGIN_MANIFEST=$HOME/.local/share/nvim-nightly/rplugin.vim VIMRUNTIME=$HOME/neovim/runtime $HOME/neovim/build/bin/nvim -u $HOME/.config/nvim-nightly/init.vim
```

#### Add custom paths to `runtimepath`

Finally, we need to specify our config and local directory to be part of the `runtimepath`, else it will end up not
picking plugins installed via a plugin manager. So within the config file, we want to remove all instances where we
don't want `runtimepath` to search for and explicitly add our own custom path.

```vim
" $HOME/.config/nvim-nightly/init.vim

set runtimepath-=~/.config/nvim
set runtimepath-=~/.config/nvim/after
set runtimepath-=~/.local/share/nvim/site
set runtimepath-=~/.local/share/nvim/site/after

set runtimepath+=~/.config/nvim-nightly/after
set runtimepath^=~/.config/nvim-nightly
set runtimepath+=~/.local/share/nvim-nightly/site/after
set runtimepath^=~/.local/share/nvim-nightly/site
```

#### Add custom paths to `packpath` if using minpac or similar plugin manager

If you are using the native package handler, or using a plugin manager that utilizes the build-in package handling in
vim like minpac. Then you may have to specify the custom path to your local directory.

```vim
" $HOME/.config/nvim-nightly/init.vim

set packpath-=~/.config/nvim
set packpath-=~/.config/nvim/after
set packpath-=~/.local/share/nvim/site
set packpath-=~/.local/share/nvim/site/after

set packpath^=~/.config/nvim-nightly
set packpath+=~/.config/nvim-nightly/after
set packpath^=~/.local/share/nvim-nightly/site
set packpath+=~/.local/share/nvim-nightly/site/after
```

## Update neovim nightly

To update neovim, it's as easy as pulling all the latest changes to your local machine and doing a clean compile.

```sh
cd $HOME/neovim
git pull
make distclean && make CMAKE_BUILD_TYPE=Release
```

## Conclusion

I hope this guide helps you in setting up neovim nightly alongside the stable version, or at least to helps me
reference in-case I forget. It is one of many ways of getting them installed in a machine, but this is the way I
preferred on getting it installed.

## Troubleshooting

### `E149: Sorry, no help for ...`

If you have problems accessing docs, since it was compiled from source you will have to manually generate docs.
Fortunately, this can be done just once by running the vim ex command:

```vim
:helptags $VIMRUNTIME/doc
```

### `$MYVIMRC` is empty

Some might use `:e $MYVIMRC` to open their config file, and because we are using different directory for configs, you
may have to include `MYVIMRC` variable in `nv.sh`.

```sh
# nv.sh
MYVIMRC=$HOME/.config/nvim-nightly/init.vim NVIM_RPLUGIN_MANIFEST=$HOME/.local/share/nvim-nightly/rplugin.vim VIMRUNTIME=$HOME/neovim/runtime $HOME/neovim/build/bin/nvim -u $HOME/.config/nvim-nightly/init.vim
```
