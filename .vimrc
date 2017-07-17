set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim/
call vundle#begin()


Plugin 'gmarik/Vundle.vim'
" 根据每行缩进开启代码折叠
Plugin 'tmhedberg/SimpylFold'
" 自动缩进
Plugin 'vim-scripts/indentpython.vim'
" 代码提示
Bundle 'Valloric/YouCompleteMe'



call vundle#end()
filetype plugin indent on

" 区域分割
set splitbelow
set splitright


" c-j,c-k,c-l,c-h切换窗口
" nnoremap将一个组合快捷键映射为另一个快捷键。一开始的n，指的是在Vim的正常模式（Normal
" Mode）下，而不是可视模式下重新映射。基本上，nnoremap <C-J>
" <C-W><C-j>就是说，当我在正常模式按下<C-J>时，进行<C-W><C-j>操作
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-H> <C-W><C-H>
nnoremap <C-L> <C-W><C-L>


" 设置代码折叠
set foldmethod=indent
set foldlevel=99

" 使用空格代替 za (代码折叠和取消)
nnoremap <space> za

" PEP8风格
au BufNewFile,BufRead *.py
			\ set tabstop=4
			\ set softtabstop=4
			\ set shiftwidth=4
			\ set textwidth=79
			\ set autoident
			\ set expandtab
			\ set fileformat=unix

au BufNewFile,BufRead *.js,*.html,*.css
			\ set tabstop=2
			\ set softtabstop=2
			\ set shiftwidth=2

" 标示不必要的空白字符
au BufRead,BufNewFile *.py,*.pyw,*.c,*.h match BadWhitespace /\s\+$/
" UTF8编码
set encoding=utf8

let g:SimpylFold_docstring_preview=1

