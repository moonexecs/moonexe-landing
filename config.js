'use strict';

/* ═══════════════════════════════════════════════════════════════
   CONFIG — All customization lives here.
   Add new social links, window apps, or spec categories below.
═══════════════════════════════════════════════════════════════ */

// Social link icons — double-click opens URL in a new tab.
// Uses Simple Icons CDN: https://cdn.simpleicons.org/[icon]/[hexcolor]
// ADD NEW LINKS HERE ↓
const SOCIAL_LINKS = [
  { id: 'youtube',  label: 'YouTube',    icon: 'youtube',  color: 'FF0000', url: 'https://youtube.com/@moonexe' },
  { id: 'twitter',  label: 'Twitter / X', icon: 'x',       color: 'ffffff', url: 'https://x.com/moonexecs' },
  { id: 'twitch',   label: 'Twitch',     icon: 'twitch',   color: '9146FF', url: 'https://twitch.tv/moonexecs' },
  { id: 'tiktok',   label: 'TikTok',     icon: 'tiktok',   color: 'ffffff', url: 'https://tiktok.com/@moonexecs' },
  { id: 'discord',  label: 'Discord',    icon: 'discord',  color: '5865F2', url: 'https://discord.gg/uVYjJdH4JE' },
  { id: 'steam',    label: 'Steam',      icon: 'steam',    color: 'c6d4df', url: 'https://steamcommunity.com/id/moonexe' },
];

// Notepad content is read lazily inside buildNotepadContent() — see below.
/* NOTEPAD_SRC_BACKUP (kept for reference — actual source is the textarea in index.html)
// GAME SETTINGS

fps_max "0"
//cl_updaterate 128
//cl_interp 0.015625
sensitivity 1.8
volume 0.07
r_show_build_info FALSE
unbindall


//CROSSHAIR COMMANDS
cl_crosshairstyle 4
cl_crosshairsize 2.5
cl_crosshairthickness 0.5
cl_crosshairgap 1.5
cl_crosshair_drawoutline 1
cl_crosshair_outlinethickness 0.5
cl_crosshairdot 0
cl_crosshair_t 0
cl_crosshairusealpha 1
cl_crosshairalpha 255
cl_crosshair_recoil 1
cl_crosshairgap_useweaponvalue 0
cl_crosshaircolor 2

//EXTRAS
cl_crosshair_sniper_width 2
cl_crosshair_friendly_warning 1
hud_showtargetid 1
cl_hud_color 12



//VIEWMODEL

viewmodel_presetpos 0
viewmodel_offset_x 2.5
viewmodel_offset_y 2
viewmodel_offset_z -2
viewmodel_fov 68
cl_prefer_lefthanded 0



//DESUBTICKED SHOOTING

//alias _check1 "-attack; alias check1";
//alias +m1 "+attack; alias check1 _check1";
//alias -m1 "check1";
	//bind mouse1 +m1

// SUBTICKED CROUCH BINDS
	bind "ctrl" "+duck"

//NOCLIP ON HOLD
alias +nClip "noclip"
alias -nClip "noclip"
	bind n "+nClip"

	//spin ON HOLD
alias +spin "tog;sensitivity 100"
alias -spin "sensitivity 1.8"
	bind , "+spin"


//TOGGLEHUD
	bind "p" "toggle cl_draw_only_deathnotices 0 1"



// NEW HAND STUFF

	bind "capslock" "switchhands"
cl_prefer_lefthanded 0


// NULLS
bind a +a
bind d +d
bind w +w
bind s +s
exec nulls


// NEW MOVEMENT STUFF 9/10/2025


 alias +lj "+jump;+!forward;-!duck";
alias -lj "-jump;+!duck";

bind mouse5 +jb
alias +jb "+jump;+!duck"
alias -jb "-jump"


bind alt +lj
bind mwheelup +jump
bind mwheeldown +jump
bind space "+jump"




// ALL CS2 REGULAR BINDS

	bind "0"  "slot10"
	bind "1"  "slot1"
	bind "2"  "slot2"
	bind "3"  "slot3"
	bind "4"  "slot4"
	bind "5"  "slot5"
	bind "6"  "toggle cl_crosshair_recoil 1 0"
	bind "7"  "slot12"
	bind "8"  "slot8"
	bind "9"  "slot9"
	bind "b"  "buymenu"
	bind "c"  "toggle cl_radar_scale 1 0.3"
	//bind "c" "toggle fps_max 64 400"
	bind "e"  "+use"
	bind "f"  "+lookatweapon"
	bind "g"  "drop"
	bind "h"  "slot7"
	bind "i"  "show_loadout_toggle"
	bind "j"  "slot8"
	bind ";"  "slot6"
	bind "m"  "teammenu"
	bind "q"  "lastinv"
	bind "r"  "+reload"
	bind "t"  "+spray_menu"
	bind "u"  "messagemode2"
	bind "v"  "+voicerecord"
	bind "x"  "slot10"
	bind "y"  "messagemode"
	bind "z"  "radio"
	bind "`"  "toggleconsole"
	bind "TAB"  "+showscores"
	bind "ESCAPE"  "cancelselect"
	bind "DEL"  "sellbackall"
	bind "SHIFT"  "+sprint"
	bind "F3"  "autobuy"
	bind "F7"  "rebuy"
	bind "F5"  "jpeg"
	bind "F6"  "save quick"
	//bind "F7"  "load quick"
	bind "F10"  "cs_quit_prompt"


// CHAT BINDS

bind "KP_0"  "say Я играю на лайфхакерском конфиге от Шока (◣_◢)"
bind "KP_1"  "say ⛳ Hole in one! ⛳"
bind "KP_2"  "say ¯\(°_o)/¯ IDK RETARD. SHUT UP !!!"
bind "KP_3"  "say Yeah, I'm Tanka Jahari ✋ But I would never order a whole pizza for myself! 🚫 I mean, I'll take it... But you have to believe me... I would never order a whole pizza just for myself! But... I am Tanka Jahari... So...."
bind "KP_4"  "say ʕᵔᴥᵔʔʕᵔᴥᵔʔʕᵔᴥᵔʔ"
bind "KP_5"  "say (⌐■_■) КИКФЛИП МАФИЯ УБЛИЗНЬ (⌐■_■)"
bind "KP_6"  "say shut up, i'm listening to music... d-.-b"
bind "KP_7"  "say ¯\_(ツ)_/¯"
bind "KP_8"  "say (☞ﾟヮﾟ)☞ nice try buddy ☜(ﾟヮﾟ☜)"
bind "KP_9"  "say ♿♿♿♿♿♿♿♿"
bind "KP_DIVIDE"  "say ✈⨅⨅"
bind "KP_MULTIPLY"  "say cool story bro"
bind "KP_MINUS"  "say 	༼つಠ益ಠ༽つ ─=≡ΣO)) GET FUCKED !!!!!!!!"
bind "KP_PLUS"  "say let that sink in..."
bind "KP_ENTER"  "say ⛹ Ballin"
bind "KP_DEL"  "say \___/ <--- cry here africa need water 👍"


// MOUSE BINDS
	bind "MOUSE1" "+attack"
	bind "MOUSE2"  "+attack2"
	bind "MOUSE3"  "player_ping"
bind "MOUSE_X"  "yaw"
bind "MOUSE_Y"  "pitch"
bind "X_AXIS"  "rightleft"
bind "Y_AXIS"  "!forwardback"
bind "R_AXIS"  "pitch"
bind "U_AXIS"  "yaw"
bind "X_AXIS"  "rightleft"
bind "Y_AXIS"  "!forwardback"
bind "R_AXIS"  "pitch"
bind "U_AXIS"  "yaw"
bind "X_AXIS"  "rightleft"
bind "Y_AXIS"  "!forwardback"
bind "R_AXIS"  "pitch"
bind "U_AXIS"  "yaw"
bind "X_AXIS"  "rightleft"
bind "Y_AXIS"  "!forwardback"
bind "R_AXIS"  "pitch"
bind "U_AXIS"  "yaw"



// toolvolume

	snd_toolvolume 0.002

// TAG
echo .%%...%%..%%..%%..%%..%%.
echo .%%%.%%%...%%%%...%%%.%%.
echo .%%.%.%%....%%....%%.%%%.
echo .%%...%%...%%%%...%%..%%.
echo .%%...%%..%%..%%..%%..%%.
echo .........................
echo ..%%%%...%%%%%%...%%%%..
echo .%%..%%..%%......%%.....
echo .%%......%%%%....%%.%%%.
echo .%%..%%..%%......%%..%%.
echo ..%%%%...%%.......%%%%..
echo ........................

play \sounds\ambient\animal\cat_01.vsnd_c
NOTEPAD_SRC_BACKUP */

// Window-based apps — double-click opens an on-page window.
// type: 'specs' renders the device manager tree.
// type: 'placeholder' shows a coming-soon message (easy to replace).
// ADD NEW APPS HERE ↓
const WINDOW_APPS = [
  {
    id: 'specs',
    label: 'specs',
    icon:  'specs.png',
    title: 'Device Manager',
    type:  'specs',
    defaultW: 480,
    defaultH: 420,
  },
  {
    id: 'projects',
    label: 'projects',
    icon:  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z' fill='%23FFB900'/%3E%3Cpath d='M10 4H4c-1.1 0-2 .9-2 2v1h20V8c0-1.1-.9-2-2-2h-8l-2-2z' fill='%23FFD04A'/%3E%3C/svg%3E",
    title: 'projects',
    type:  'folder',
    defaultW: 780,
    defaultH: 500,
  },
  {
    id:          'project1',
    label:       'README',
    icon:        'txtfile.png',
    title:       'Projects',
    type:        'placeholder',
    hidden:      true,
    defaultW:    600,
    defaultH:    440,
    placeholder: 'The apps in this folder are a WIP. \nIf they don\'t work as intended, they will be fixed later. \n But they should work properly atm.',
  },
  {
    id: 'about',
    label: 'about',
    icon:  'user.png',
    title: 'About Me',
    type:  'about',
    defaultW: 600,
    defaultH: 460,
  },
  // Easter egg apps — hidden from desktop, accessible via secret actions.
  {
    id: 'cmd',
    label: 'cmd.exe',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='3' fill='%23111'/%3E%3Cpath d='M5 8.5l4 3.5-4 3.5M11 15.5h8' stroke='%23c8c8c8' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E",
    title: 'Command Prompt',
    type: 'cmd',
    hidden: true,
    defaultW: 650,
    defaultH: 380,
  },
  {
    id: 'notepad',
    label: 'notepad.exe',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c8c8c8'%3E%3Cpath d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8v-2zm0-4h8v2H8v-2z'/%3E%3C/svg%3E",
    title: 'Notepad',
    type: 'notepad',
    hidden: true,
    defaultW: 600,
    defaultH: 460,
  },
  {
    id: 'wjt',
    label: 'wjt.cfg',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23c8c8c8'%3E%3Cpath d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8v-2zm0-4h8v2H8v-2z'/%3E%3C/svg%3E",
    title: 'wjt.cfg — Notepad',
    type: 'wjt',
    hidden: true,
    defaultW: 600,
    defaultH: 460,
  },
  // Half-Life 3 — hidden until Gabe's Hotspot is connected.
  {
    id: 'hl3',
    label: 'Half-Life 3',
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231a1a1a'/%3E%3Ctext x='50' y='82' font-family='Georgia,serif' font-size='78' text-anchor='middle' fill='%23CF6028'%3E%CE%BB%3C/text%3E%3C/svg%3E",
    title: 'Half-Life 3',
    type: 'hl3',
    hidden: true,
    defaultW: 500,
    defaultH: 380,
  },
  {
    id:       'scroll-test',
    label:    'Scroll-Test',
    icon:     'scrollTest.png',
    title:    'Scroll-Test',
    type:     'scroll-test',
    hidden:   true,
    defaultW: 500,
    defaultH: 500,
  },
  {
    id:       'bind-gen',
    label:    'Chat Bind Gen',
    icon:     'chatbindGen.png',
    title:    'Chat Bind Generator',
    type:     'bind-gen',
    hidden:   true,
    defaultW: 920,
    defaultH: 640,
  },
  {
    id:       'cfg-gen',
    label:    'CS2 Config Gen',
    icon:     'cfgGen.png',
    title:    'CS2 Config Generator',
    type:     'cfg-gen',
    hidden:   true,
    defaultW: 1000,
    defaultH: 700,
  },
  // ADD MORE APPS HERE ↓
];

// Specs tree — shown in specs.exe window and mobile accordion.
// ADD / EDIT SPECS HERE ↓
const SPECS_TREE = [
  {
    category: 'Processors',
    iconSrc:  'https://cdn.simpleicons.org/amd/ED1C24',
    items:    ['AMD Ryzen 7 5800X'],
  },
  {
    category: 'Display Adapters',
    iconSrc:  'https://cdn.simpleicons.org/nvidia/76B900',
    items:    ['NVIDIA GeForce RTX 3060 Ti'],
  },
  {
    category: 'Memory',
    iconSrc:  'https://cdn.simpleicons.org/samsung/1428A0',
    items:    ['32 GB DDR4'],
  },
  {
    category: 'Keyboard',
    iconSrc:  'https://cdn.simpleicons.org/razer/44D62C',
    items:    ['Razer Huntsman V2 Pro'],
  },
  {
    category: 'Mouse',
    iconSrc:  'https://cdn.simpleicons.org/razer/44D62C',
    items:    ['Razer DeathAdder V3 Pro'],
  },
  {
    category: 'Operating System',
    iconSrc:  'https://cdn.simpleicons.org/windows/0078d4',
    items:    ['Windows 11 Pro'],
  },
  {
    category: 'Monitors',
    iconSrc:  'https://cdn.simpleicons.org/asus/ffffff',
    items:    ['144 Hz 1440p'],
  },
  {
    category: 'Microphone',
    iconSrc:  'https://cdn.simpleicons.org/shure/1e1e1e',
    items:    ['China Mic From Amazon'],
  },
  {
    category: 'Audio Output',
    iconSrc:  'https://cdn.simpleicons.org/razer/44D62C',
    items:    ['Razer Kraken V3 Pro'],
  },
  {
    category: 'Creative Software',
    iconSrc:  'https://cdn.simpleicons.org/magix/0060A8',
    items:    ['Vegas Pro 23', 'Adobe Photoshop', 'Adobe After Effects', 'Adobe Premier Pro'],
  },
];

// Default icon grid positions on the desktop (x, y in pixels from top-left)
// Adjust these to rearrange icons.
// Positions are multiples of ICON_GRID (88px) so icons start pre-snapped.
const ICON_POSITIONS = {
  youtube:  { x: 10,  y: 10  },
  twitter:  { x: 98,  y: 10  },
  twitch:   { x: 186, y: 10  },
  tiktok:   { x: 274, y: 10  },
  discord:  { x: 362, y: 10  },
  steam:    { x: 450, y: 10  },
  specs:    { x: 10,  y: 98  },
  projects: { x: 98,  y: 98  },
  about:    { x: 186, y: 98  },
  hl3:      { x: 274, y: 98  },
  // ADD POSITIONS FOR NEW ICONS HERE ↓
};

// Wifi panel networks — shown when clicking the wifi icon in the tray.
// signal: 1–4 bars. secured: shows "Secured" / "Open" label.
// url: clicking "Connect" opens this link. null = decorative only.
// EDIT NETWORK NAMES AND LINKS HERE ↓
const WIFI_NETWORKS = [
  { ssid: 'Cedar Creek Public Wifi', signal: 4, secured: false, connected: true,  url: null,     password: null },
  { ssid: 'Cedar Creek Staff',       signal: 3, secured: true,  connected: false, url: null,     password: 'homer' },
  { ssid: 'moon.mp4',                signal: 2, secured: false, connected: false, url: 'https://youtube.com/@moonexedits', password: null },
  { ssid: "Gabe's Hotspot",          signal: 1, secured: true,  connected: false, url: null,     password: 'hl3' },
];

/* ═══════════════════════════════════════════════════════════════
   RUNTIME STATE — do not edit
═══════════════════════════════════════════════════════════════ */
let zTop          = 200;
const winInstances  = {};  // { appId: [Element, ...] }
const launchedLinks = new Map(); // { id: count }
let   selectedIcon  = null;

// Mobile app grid constants
const M_COLS   = 3;
const M_CELL_W = 92;   // 72px icon + 20px col-gap
const M_CELL_H = 97;   // 79px icon+label + 18px row-gap
let   mDrag    = null; // { icon, grid, holdTimer, startX, startY, dragging }
