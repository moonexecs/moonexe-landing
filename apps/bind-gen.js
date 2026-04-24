/* ═══════════════════════════════════════════════════════════════
   CHAT BIND GENERATOR
═══════════════════════════════════════════════════════════════ */
function buildBindGenContent() {
  const FONT_UPPER = [
    Array.from('𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙'),
    Array.from('𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍'),
    Array.from('𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉'),
    Array.from('𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'),
    Array.from('𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ'),
    Array.from('𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁'),
    Array.from('𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'),
    Array.from('𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ'),
    Array.from('𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅'),
    Array.from('𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹'),
    Array.from('𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭'),
    Array.from('𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡'),
    Array.from('𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕'),
    Array.from('ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'),
    Array.from('ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ'),
  ];
  const FONT_LOWER = [
    Array.from('𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳'),
    Array.from('𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧'),
    Array.from('𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣'),
    Array.from('𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'),
    Array.from('𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫'),
    Array.from('𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛'),
    Array.from('𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃'),
    Array.from('𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷'),
    Array.from('𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟'),
    Array.from('𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓'),
    Array.from('𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇'),
    Array.from('𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻'),
    Array.from('𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯'),
    Array.from('ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'),
    Array.from('ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ'),
  ];
  const FONT_NAMES = ['Bold', 'Italic', 'Mono', 'Script', 'Double-Struck', 'Bold Italic', 'Bold Script', 'Fraktur', 'Bold Fraktur', 'Sans', 'Sans Bold', 'Sans Italic', 'Sans Bold Italic', 'Circled', 'Small Caps'];

  function toFont(text, i) {
    return Array.from(text).map(ch => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return FONT_UPPER[i][code - 65];
      if (code >= 97 && code <= 122) return FONT_LOWER[i][code - 97];
      return ch;
    }).join('');
  }

  const EMOJIS = [
    'ʘ‿ʘ', 'ಠ_ಠ', '(╯°□°）╯︵ ┻━┻', '┬─┬ ノ( ゜-゜ノ)', '┬─┬⃰͡ (ᵔᵕᵔ͜ )',
    '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻', 'ლ(｀ー´ლ)', 'ʕ•ᴥ•ʔ', 'ʕᵔᴥᵔʔ', 'ʕ •`ᴥ•´ʔ',
    '(｡◕‿◕｡)', '（　ﾟДﾟ）', '¯\\_(ツ)_/¯', '¯\\(°_o)/¯', '(`･ω･´)',
    '(╬ ಠ益ಠ)', 'ლ(ಠ益ಠლ)', '☜(⌒▽⌒)☞', 'ε=ε=ε=┌(;*´Д`)ﾉ', 'ヽ(´▽`)/',
    'ヽ(´ー｀)ノ', 'ᵒᴥᵒ#', 'V•ᴥ•V', 'ฅ^•ﻌ•^ฅ', '（ ^_^）', 'o自自o', '（^_^ ）',
    'ಠ‿ಠ', '( ͡° ͜ʖ ͡°)', 'ಥ_ಥ', 'ಥ‿ಥ', 'ಥ﹏ಥ',
    '٩◔̯◔۶', 'ᕙ(⇀‸↼‶)ᕗ', 'ᕦ(ò_óˇ)ᕤ', '⊂(◉‿◉)つ', 'q(❂‿❂)p',
    '⊙﹏⊙', '¯\\_(⊙︿⊙)_/¯', '°‿‿°', '¿ⓧ_ⓧﮌ', '(⊙.☉)7',
    '(´･_･`)', 'щ（ﾟДﾟщ）', '٩(๏_๏)۶', 'ఠ_ఠ', 'ᕕ( ᐛ )ᕗ',
    '(⊙_◎)', 'ミ●﹏☉ミ', '༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽', 'ヽ༼ ಠ益ಠ ༽ﾉ', 't(-_-t)',
    '(ಥ⌣ಥ)', '(づ￣ ³￣)づ', '(づ｡◕‿‿◕｡)づ', '(ノಠ ∩ಠ)ノ彡( \\o°o)\\', '｡ﾟ( ﾟஇ‸இﾟ)ﾟ｡',
    '༼ ༎ຶ ෴ ༎ຶ༽', '"ヽ(´▽｀)ノ"', '┌(ㆆ㉨ㆆ)ʃ', '눈_눈', '( ఠൠఠ )ﾉ',
    '乁( ◔ ౪◔)「', ' ┑(￣Д ￣)┍', '(๑•́ ₃ •̀๑)', '⁽⁽ଘ( ˊᵕˋ )ଓ⁾⁾', '◔_◔', '♥‿♥',
    'ԅ(≖‿≖ԅ)', '( ˘ ³˘)♥', '( ˇ෴ˇ )', 'ヾ(-_- )ゞ', '♪♪ ヽ(ˇ∀ˇ )ゞ',
    'ヾ(´〇`)ﾉ♪♪♪', 'ʕ •́؈•̀ ₎', 'ʕ •́؈•̀)', 'ლ(•́•́ლ)', "(ง'̀-'́)ง",
    '◖ᵔᴥᵔ◗ ♪ ♫', '{•̃_•̃}', '(ᵔᴥᵔ)', '(Ծ‸ Ծ)', '(•̀ᴗ•́)و ̑̑',
    '[¬º-°]¬', '(☞ﾟヮﾟ)☞', "''⌐(ಠ۾ಠ)¬'''", '(っ•́｡•́)♪♬', '(҂◡_◡)',
    'ƪ(ړײ)ƪ', '⥀.⥀', 'ح˚௰˚づ', '♨_♨', '(._.)' ,
    '(⊃｡•́‿•̀｡)⊃', '(∩`-´)⊃━☆ﾟ.*･｡ﾟ', '(っ˘ڡ˘ς)', '( ఠ ͟ʖ ఠ)', '( ͡ಠ ʖ̯ ͡ಠ)',
    '( ಠ ʖ̯ ಠ)', '(งツ)ว', '(◠﹏◠)', '(ᵟຶ︵ ᵟຶ)', '(っ▀¯▀)つ',
    'ʚ(•`', '(´ж｀ς)', '(° ͜ʖ͡°)╭∩╮', 'ʕʘ̅͜ʘ̅ʔ', 'ح(•̀ж•́)ง †',
    '-`ღ´-', '(⩾﹏⩽)', 'ヽ( •_)ᕗ', '~(^-^)~', '\\(ᵔᵕᵔ)/',
    'ᴖ̮ ̮ᴖ', 'ಠಠ', '{ಠʖಠ}', '(•_•)', '( •_•)>', '⌐■-■', '(⌐■_■)', '凸(¬‿¬)凸',
    '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', 'щ(ಠ益ಠщ)', 'ᕙ(⇀‸↼‶)ᕗ', '(ノಠ益ಠ)ノ彡┻━┻', '✈⨅⨅', '(☞ﾟヮﾟ)☞', '♿', '⛹',
    '︻╦╤─', '┌(ㆆ㉨ㆆ)ʃ', 'ƪ(ړײ)ƪ', '⥀.⥀', 'ԅ(≖‿≖ԅ)', '( ͡° ͜ʖ ͡°)', 'ʕ•ᴥ•ʔ', '⛳',
    'ღ' , '•' , '⁂' , '€' , '™' , '↑' , '→' , '↓' , '⇝' , '√' , '∞' , '░' , '▲' ,
    '▶' , '◀' , '●' , '☀' , '☁' , '☂' , '☃' , '☄' , '★' , '☆' , '☉' , '☐' , '☑' ,
    '☎' , '☚' , '☛' , '☜' , '☝' , '☞' , '☟' , '☠' , '☢' , '☣' , '☪' , '☮' , '☯' ,
    '☸' , '☹' , '☺' , '☻' , '☼' , '☽' , '☾' , '♔' , '♕' , '♖' , '♗' , '♘' , '♚' ,
    '♛' , '♜' , '♝' , '♞' , '♟' , '♡' , '♨' , '♩' , '♪' , '♫' , '♬' , '✈' , '✉' ,
    '✍' , '✎' , '✓' , '✔' , '✘' , '✚' , '✝' , '✞' , '✟' , '✠' , '✡' , '✦' , '✧' ,
    '✩' , '✪' , '✮' , '✯' , '✹' , '✿' , '❀' , '❁' , '❂' , '❄' , '❅' , '❆' , '❝' ,
    '❞' , '❣' , '❤' , '❥' , '❦' , '❧' , '➤' , 'ツ' , '㋡' , '♥' , '웃',
  ];

  // Main keyboard rows (no nav cluster — nav is a separate column so arrows always align).
  // null inside a row = visual gap between key groups.
  const KB_MAIN_ROWS = [
    [{l:'Esc',c:'escape'}, null, {l:'F1',c:'f1'},{l:'F2',c:'f2'},{l:'F3',c:'f3'},{l:'F4',c:'f4'}, null, {l:'F5',c:'f5'},{l:'F6',c:'f6'},{l:'F7',c:'f7'},{l:'F8',c:'f8'}, null, {l:'F9',c:'f9'},{l:'F10',c:'f10'},{l:'F11',c:'f11'},{l:'F12',c:'f12'}],
    [{l:'`',c:'`'},{l:'1',c:'1'},{l:'2',c:'2'},{l:'3',c:'3'},{l:'4',c:'4'},{l:'5',c:'5'},{l:'6',c:'6'},{l:'7',c:'7'},{l:'8',c:'8'},{l:'9',c:'9'},{l:'0',c:'0'},{l:'-',c:'minus'},{l:'=',c:'equals'},{l:'Bksp',c:'backspace',w:58}],
    [{l:'Tab',c:'tab',w:52},{l:'Q',c:'q'},{l:'W',c:'w'},{l:'E',c:'e'},{l:'R',c:'r'},{l:'T',c:'t'},{l:'Y',c:'y'},{l:'U',c:'u'},{l:'I',c:'i'},{l:'O',c:'o'},{l:'P',c:'p'},{l:'[',c:'leftbracket'},{l:']',c:'rightbracket'},{l:'\\',c:'backslash',w:52}],
    [{l:'Caps',c:'capslock',w:62},{l:'A',c:'a'},{l:'S',c:'s'},{l:'D',c:'d'},{l:'F',c:'f'},{l:'G',c:'g'},{l:'H',c:'h'},{l:'J',c:'j'},{l:'K',c:'k'},{l:'L',c:'l'},{l:';',c:'semicolon'},{l:"'",c:'apostrophe'},{l:'Enter',c:'enter',w:74}],
    [{l:'Shift',c:'shift',w:76},{l:'Z',c:'z'},{l:'X',c:'x'},{l:'C',c:'c'},{l:'V',c:'v'},{l:'B',c:'b'},{l:'N',c:'n'},{l:'M',c:'m'},{l:',',c:','},{l:'.',c:'.'},{l:'/',c:'slash'},{l:'Shift',c:'rshift',w:88}],
    [{l:'Ctrl',c:'ctrl',w:52},{l:'⊞',c:null,d:1,w:40},{l:'Alt',c:'alt',w:52},{l:'Space',c:'space',w:200},{l:'Alt',c:'ralt',w:52},{l:'⊞',c:null,d:1,w:40},{l:'Fn',c:null,d:1,w:36},{l:'Ctrl',c:'rctrl',w:52}],
  ];

  // Nav cluster as its own column — each row matches the corresponding main row.
  // null = invisible spacer to hold row height.
  const KB_NAV_ROWS = [
    [{l:'PrtSc',c:null,d:1}, {l:'ScrLk',c:null,d:1}, {l:'Pause',c:null,d:1}],
    [{l:'Ins',c:'ins'},       {l:'Home',c:'home'},     {l:'PgUp',c:'pgup'}],
    [{l:'Del',c:'del'},       {l:'End',c:'end'},       {l:'PgDn',c:'pgdn'}],
    [null,                    null,                    null],
    [null,                    {l:'↑',c:'uparrow'},     null],
    [{l:'←',c:'leftarrow'},  {l:'↓',c:'downarrow'},   {l:'→',c:'rightarrow'}],
  ];

  // Numpad as CSS grid. row/col are 1-based; rs=rowSpan, cs=colSpan.
  const NUMPAD = [
    {l:'NumLk', c:'numlock',        row:1, col:1},
    {l:'/',     c:'kp_divide',      row:1, col:2},
    {l:'*',     c:'kp_multiply',   row:1, col:3},
    {l:'-',     c:'kp_minus',      row:1, col:4},
    {l:'7',     c:'kp_7',          row:2, col:1},
    {l:'8',     c:'kp_8',          row:2, col:2},
    {l:'9',     c:'kp_9',          row:2, col:3},
    {l:'+',     c:'kp_plus',       row:2, col:4, rs:2},
    {l:'4',     c:'kp_4',          row:3, col:1},
    {l:'5',     c:'kp_5',          row:3, col:2},
    {l:'6',     c:'kp_6',          row:3, col:3},
    {l:'1',     c:'kp_1',          row:4, col:1},
    {l:'2',     c:'kp_2',          row:4, col:2},
    {l:'3',     c:'kp_3',          row:4, col:3},
    {l:'Ent',   c:'kp_enter',      row:4, col:4, rs:2},
    {l:'0',     c:'kp_0',          row:5, col:1, cs:2},
    {l:'.',     c:'kp_del',         row:5, col:3},
  ];

  // --- Build DOM ---
  const wrap = document.createElement('div');
  wrap.className = 'bg-wrap';

  // Top row: input panel + output panel
  const topRow = document.createElement('div');
  topRow.className = 'bg-top-row';

  const inputPanel = document.createElement('div');
  inputPanel.className = 'bg-panel';
  const inputLabel = document.createElement('div');
  inputLabel.className = 'bg-label';
  inputLabel.textContent = 'insert your text here...';
  const inputTA = document.createElement('textarea');
  inputTA.className = 'bg-input';
  inputTA.placeholder = 'type here...';
  inputTA.spellcheck = false;
  inputPanel.appendChild(inputLabel);
  inputPanel.appendChild(inputTA);

  const outputPanel = document.createElement('div');
  outputPanel.className = 'bg-panel bg-output-panel';
  const outputLabel = document.createElement('div');
  outputLabel.className = 'bg-label';
  outputLabel.textContent = 'custom font output...';
  outputPanel.appendChild(outputLabel);

  const fontList = document.createElement('div');
  fontList.className = 'bg-font-list';
  const fontEntries = [];
  FONT_NAMES.forEach((name, i) => {
    const entry = document.createElement('div');
    entry.className = 'bg-font-entry';
    const nameEl = document.createElement('span');
    nameEl.className = 'bg-font-name';
    nameEl.textContent = name;
    const textEl = document.createElement('span');
    textEl.className = 'bg-font-text';
    textEl.textContent = '—';
    const copyBtn = document.createElement('button');
    copyBtn.className = 'bg-copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', () => {
      if (textEl.textContent !== '—') navigator.clipboard.writeText(textEl.textContent).catch(() => {});
    });
    entry.appendChild(nameEl);
    entry.appendChild(textEl);
    entry.appendChild(copyBtn);
    fontList.appendChild(entry);
    fontEntries.push(textEl);
  });
  outputPanel.appendChild(fontList);

  topRow.appendChild(inputPanel);
  topRow.appendChild(outputPanel);
  wrap.appendChild(topRow);

  // Craft row
  const craftRow = document.createElement('div');
  craftRow.className = 'bg-craft-row';
  const craftTA = document.createElement('textarea');
  craftTA.className = 'bg-craft';
  craftTA.placeholder = 'paste your final text and emojis here...';
  craftTA.spellcheck = false;
  const makeBindBtn = document.createElement('button');
  makeBindBtn.className = 'bg-make-bind-btn';
  makeBindBtn.textContent = 'MAKE BIND';
  craftRow.appendChild(craftTA);
  craftRow.appendChild(makeBindBtn);
  wrap.appendChild(craftRow);

  // Emoji section
  const emojiSection = document.createElement('div');
  emojiSection.className = 'bg-emoji-section';
  const emojiLabel = document.createElement('div');
  emojiLabel.className = 'bg-label';
  emojiLabel.textContent = 'ascii emojis — click to insert at cursor';
  const emojiGrid = document.createElement('div');
  emojiGrid.className = 'bg-emoji-grid';
  EMOJIS.forEach(em => {
    const pill = document.createElement('div');
    pill.className = 'bg-emoji-pill';
    pill.textContent = em;
    pill.addEventListener('click', () => {
      const start = craftTA.selectionStart;
      const end   = craftTA.selectionEnd;
      const val   = craftTA.value;
      craftTA.value = val.slice(0, start) + em + val.slice(end);
      craftTA.selectionStart = craftTA.selectionEnd = start + em.length;
      craftTA.focus();
      craftTA.dispatchEvent(new Event('input'));
    });
    emojiGrid.appendChild(pill);
  });
  emojiSection.appendChild(emojiLabel);
  emojiSection.appendChild(emojiGrid);
  wrap.appendChild(emojiSection);

  // Keyboard overlay
  const kbOverlay = document.createElement('div');
  kbOverlay.className = 'bg-kb-overlay';

  const kbBar = document.createElement('div');
  kbBar.className = 'bg-kb-bar';
  const kbOutput = document.createElement('input');
  kbOutput.className = 'bg-kb-output';
  kbOutput.readOnly = true;
  kbOutput.placeholder = 'click a key to generate bind...';
  const kbClose = document.createElement('button');
  kbClose.className = 'bg-kb-close';
  kbClose.textContent = '×';
  kbBar.appendChild(kbOutput);
  kbBar.appendChild(kbClose);
  kbOverlay.appendChild(kbBar);

  // Content: main keyboard rows (left) + numpad grid (right)
  const kbContent = document.createElement('div');
  kbContent.className = 'bg-kb-content';

  const kbMain = document.createElement('div');
  kbMain.className = 'bg-kb-main';

  let activeKeyEl = null;

  function updateBindOutput(cs2code) {
    kbOutput.value = `bind ${cs2code} "say ${craftTA.value}"`;
  }

  function makeKey(keyDef) {
    const keyEl = document.createElement('div');
    let cls = 'bg-kb-key';
    if (keyDef.d)   cls += ' bg-kb-key--disabled';
    if (keyDef.inv) cls += ' bg-kb-key--inv';
    keyEl.className = cls;
    keyEl.textContent = keyDef.l;
    if (keyDef.w) keyEl.style.minWidth = keyDef.w + 'px';
    if (!keyDef.d && keyDef.c) {
      keyEl.dataset.cs2 = keyDef.c;
      keyEl.addEventListener('click', () => {
        if (activeKeyEl) activeKeyEl.classList.remove('bg-kb-key--active');
        activeKeyEl = keyEl;
        keyEl.classList.add('bg-kb-key--active');
        updateBindOutput(keyDef.c);
      });
    }
    return keyEl;
  }

  KB_MAIN_ROWS.forEach(rowDef => {
    const rowEl = document.createElement('div');
    rowEl.className = 'bg-kb-row';
    rowDef.forEach(keyDef => {
      if (keyDef === null) {
        const gap = document.createElement('div');
        gap.className = 'bg-kb-gap';
        rowEl.appendChild(gap);
        return;
      }
      rowEl.appendChild(makeKey(keyDef));
    });
    kbMain.appendChild(rowEl);
  });

  // Nav cluster — separate column so ↑ is always directly above ↓
  const kbNav = document.createElement('div');
  kbNav.className = 'bg-kb-nav';
  KB_NAV_ROWS.forEach(rowDef => {
    const rowEl = document.createElement('div');
    rowEl.className = 'bg-kb-row';
    rowDef.forEach(keyDef => {
      rowEl.appendChild(keyDef === null ? makeKey({l:' ',c:null,d:1,inv:1}) : makeKey(keyDef));
    });
    kbNav.appendChild(rowEl);
  });

  const kbNumpad = document.createElement('div');
  kbNumpad.className = 'bg-kb-numpad';
  NUMPAD.forEach(key => {
    const keyEl = makeKey(key);
    keyEl.style.gridRow    = key.rs ? `${key.row} / ${key.row + key.rs}` : String(key.row);
    keyEl.style.gridColumn = key.cs ? `${key.col} / ${key.col + key.cs}` : String(key.col);
    if (key.rs || key.cs) keyEl.style.height = 'auto';
    if (key.cs) keyEl.style.minWidth = 'auto';
    kbNumpad.appendChild(keyEl);
  });

  const kbGap1 = document.createElement('div');
  kbGap1.className = 'bg-kb-gap';
  const kbGap2 = document.createElement('div');
  kbGap2.className = 'bg-kb-gap';

  kbContent.appendChild(kbMain);
  kbContent.appendChild(kbGap1);
  kbContent.appendChild(kbNav);
  kbContent.appendChild(kbGap2);
  kbContent.appendChild(kbNumpad);
  const kbNote = document.createElement('div');
  kbNote.className = 'bg-kb-note';
  kbNote.textContent = 'If you want persistent chat binds, add all chat bind lines to the bottom of your autoexec.cfg file, otherwise you can directly paste them into the console.';
  kbOverlay.appendChild(kbNote);

  kbOverlay.appendChild(kbContent);
  wrap.appendChild(kbOverlay);

  // Event wiring
  inputTA.addEventListener('input', () => {
    const text = inputTA.value;
    fontEntries.forEach((el, i) => {
      el.textContent = text ? toFont(text, i) : '—';
    });
  });

  craftTA.addEventListener('input', () => {
    if (kbOverlay.style.display === 'flex' && activeKeyEl && activeKeyEl.dataset.cs2) {
      updateBindOutput(activeKeyEl.dataset.cs2);
    }
  });

  makeBindBtn.addEventListener('click', () => {
    kbOverlay.style.display = 'flex';
    // Resize the window to fit the keyboard overlay, hiding the content behind it
    const winEl = wrap.closest('.win');
    if (winEl && !winEl.classList.contains('win--mobile') && !winEl.classList.contains('win--maximized')) {
      if (!winEl.dataset.bgOrigH) winEl.dataset.bgOrigH = winEl.style.height;
      requestAnimationFrame(() => {
        const titleEl = winEl.querySelector('.win__titlebar');
        const titleH  = titleEl ? titleEl.offsetHeight : 32;
        // 12px top padding + 36px bar + 10px gap + note + 10px gap + content + 16px bottom padding
        const contentH = 12 + 36 + 10 + kbNote.offsetHeight + 10 + kbContent.offsetHeight + 16;
        winEl.style.height = (titleH + contentH) + 'px';
      });
    }
    if (activeKeyEl && activeKeyEl.dataset.cs2) updateBindOutput(activeKeyEl.dataset.cs2);
  });

  kbClose.addEventListener('click', () => {
    kbOverlay.style.display = 'none';
    const winEl = wrap.closest('.win');
    if (winEl && winEl.dataset.bgOrigH !== undefined) {
      winEl.style.height = winEl.dataset.bgOrigH;
      delete winEl.dataset.bgOrigH;
    }
  });

  return wrap;
}
