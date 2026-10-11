fx_version 'cerulean'
game 'gta5'

author "RUNE SCRIPTS"
description "A simple, modern and optimized HUD displaying any data you want with a simple config."
version "1.3.0"
lua54 "yes"

client_scripts {
    'config.lua',
    'client/cl-frameworks.lua',
    'client/cl-main.lua'
}

ui_page 'web/index.html'

files {
    'web/index.html',
    'web/assets/*.css',
    'web/assets/*.js',
    'web/locals/*.json',
    'stream/*.ytd',
    'stream/*.gfx',
    'stream/minimap.gfx',
    'stream/int3232302352.gfx'
}

escrow_ignore {
    'config.lua'
}
