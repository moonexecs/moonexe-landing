/* ═══════════════════════════════════════════════════════════════
   CS2 CONFIG GENERATOR
═══════════════════════════════════════════════════════════════ */
function buildCfgGenContent() {
  // Feature definitions. All code/tooltip text is placeholder — user will fill in later.
  // needsKey: true  → clicking opens keyboard, user picks key, bind line uses {KEY} template
  // needsKey: false → clicking just toggles a fixed code block into the output (bhop, null, cvars)
  // disabled: true  → button is grayed out, hover shows tooltip, click does nothing
  const CFG_FEATURES = {
    movement: [
      { id: 'bhop',      label: 'Bhop Binds',         needsKey: false, tooltip: 'current CS2 bhop binds (not desubticked)',
        code: '// [Bhop Binds]\nbind mwheelup "+jump"\nbind mwheeldown "+jump"'},
      { id: 'longjump',  label: 'Long Jump Bind',     needsKey: true,  tooltip: 'crouches and jumps for you',
        template: '// [Long Jump Bind]\nalias +lj "+jump;-!duck"\nalias -lj "-jump;+!duck"\nbind {KEY} +lj' },
      { id: 'wlongjump', label: '-w Long Jump Bind',  needsKey: true,  tooltip: 'crouches, jumps, and releases w for you',
        template: '// [-W Long Jump Bind]\nalias +wlj "+jump;+!forward;-!duck"\nalias -wlj "-jump;+!duck"\nbind {KEY} +wlj' },
      { id: 'jumpbug',   label: 'Jump Bug Bind',      needsKey: true,  tooltip: 'uncrouches and jumps for you',
        template: '// [Jump Bug Bind]\nalias +jb "+jump;+!duck"\nalias -jb "-jump"\nbind {KEY} +jb' },
      { id: 'nulls',     label: 'Null Binds',         needsKey: false, tooltip: 'Null WASD binds. Requires separate nulls.cfg',
        code: '// [Null Binds]\nbind w "+w"\nbind a "+a"\nbind s "+s"\nbind d "+d"\nexec nulls',
        extraNullsCfg: '// nulls.cfg\nalias"+a""rightleft -1 0 0; alias +d ad"\nalias"a1""rightleft -1 0 0; alias +d ad"\nalias"ad""rightleft 1 0 0; alias -d add; alias -a ada"\nalias"-a""rightleft 0 0 0; alias +d d1; alias -d d2; alias -a a2; alias +a a1"\nalias"a2""rightleft 0 0 0; alias +d d1; alias -d d2; alias -a a2; alias +a a1"\nalias"+d""rightleft 1 0 0; alias +a da"\nalias"d1""rightleft 1 0 0; alias +a da"\nalias"da""rightleft -1 0 0; alias -a ada; alias -d add"\nalias"-d""rightleft 0 0 0; alias +a a1; alias -a a2; alias -d d2; alias +d d1"\nalias"d2""rightleft 0 0 0; alias +a a1; alias -a a2; alias -d d2; alias +d d1"\nalias"add""rightleft -1 0 0; alias +d ad; alias -a a2; alias -d d2"\nalias"ada""rightleft 1 0 0; alias +a da; alias -d d2; alias -a a2"\n\nalias"+w""forwardback 1 0 0;alias +s ws"\nalias"w1""forwardback 1 0 0;alias +s ws"\nalias"ws""forwardback -1 0 0;alias -s wss;alias -w wsw"\nalias"-w""forwardback 0 0 0;alias +s s1;alias -s s2;alias -w w2;alias +w w1"\nalias"w2""forwardback 0 0 0;alias +s s1;alias -s s2;alias -w w2;alias +w w1"\nalias"+s""forwardback -1 0 0;alias +w sw"\nalias"s1""forwardback -1 0 0;alias +w sw"\nalias"sw""forwardback 1 0 0;alias -w wsw;alias -s wss"\nalias"-s""forwardback 0 0 0;alias +w w1;alias -w w2;alias -s s2;alias +s s1"\nalias"s2""forwardback 0 0 0;alias +w w1;alias -w w2;alias -s s2;alias +s s1"\nalias"wss""forwardback 1 0 0;alias +s ws;alias -w w2;alias -s s2"\nalias"wsw""forwardback -1 0 0;alias +w sw;alias -s s2;alias -w w2"' },
      { id: 'pixelsurf', label: 'Pixel Surf Binds',   disabled: true,  tooltip: 'Coming soon…' },
    ],
    qol: [
      { id: 'jumpthrow',  label: 'Jump Throw Bind',     needsKey: true, tooltip: 'jumps and throws for you',
        template: '// [Jump Throw Bind]\nalias at "-attack"\nalias +jt "-!jump;at"\nalias -jt "+!jump"\nbind {KEY} +jt' },
      { id: 'wjumpthrow', label: 'W Jump Throw Bind',   needsKey: true, tooltip: 'presses w, jumps, and throws for you',
        template: '// [W Jump Throw Bind]\nalias at "-attack"\nalias +jt "-!jump;at"\nalias -jt "+!jump"\nalias +wjt "-!forward; +jt"\nalias -wjt "+!forward; -jt"\nbind {KEY} +wjt',
        templateShort: '// [W Jump Throw Bind]\nalias +wjt "-!forward; +jt"\nalias -wjt "+!forward; -jt"\nbind {KEY} +wjt' },
      { id: 'minimap',    label: 'Minimap Zoom Bind',   needsKey: true, tooltip: 'toggles minimap zoom',
        template: '// [Minimap Zoom Bind]\nbind {KEY} "toggle cl_radar_scale 1 0.3"' },
      { id: 'noclip',     label: 'Noclip Hold Bind',    needsKey: true, tooltip: 'hold key for noclip, let go to turn off',
        template: '// [Noclip on Hold Bind]"\nalias +nClip "noclip"\nalias -nClip "noclip"\nbind {KEY} +nClip' },
      { id: 'togglehud',  label: 'Toggle HUD Bind',     needsKey: true, tooltip: 'turns HUD on/off leaving only crosshair and killfeed',
        template: '// [Toggle Hud Bind]\nbind {KEY} "toggle cl_draw_only_deathnotices 0 1"' },
      { id: 'highsens',   label: 'High Sens Hold Bind', needsKey: true, tooltip: 'hold key for high sens, let go to return to normal',
        template: '// [High Sens Hold Bind]\nalias +spin "tog;sensitivity 100"\nalias -spin "sensitivity {SENS}"\nbind {KEY} +spin' },
    ],
    performance: [
      { id: 'maxfps',          label: 'Max FPS 0',         needsKey: false, cvar: true, tooltip: 'Uncaps FPS',
        code: 'fps_max 0' },
      { id: 'removebuildinfo', label: 'Remove Build Info', needsKey: false, cvar: true, tooltip: 'hide build info from bottom left corner of screen',
        code: 'r_show_build_info FALSE' },
    ],
  };

  // Flatten for lookup
  const ALL_FEATURES = [
    ...CFG_FEATURES.movement, ...CFG_FEATURES.qol, ...CFG_FEATURES.performance,
  ];
  const findFeat = id => ALL_FEATURES.find(f => f.id === id);

  // --- Keyboard layout (ported verbatim from bind-gen.js) ---
  const KB_MAIN_ROWS = [
    [{l:'Esc',c:'escape'}, null, {l:'F1',c:'f1'},{l:'F2',c:'f2'},{l:'F3',c:'f3'},{l:'F4',c:'f4'}, null, {l:'F5',c:'f5'},{l:'F6',c:'f6'},{l:'F7',c:'f7'},{l:'F8',c:'f8'}, null, {l:'F9',c:'f9'},{l:'F10',c:'f10'},{l:'F11',c:'f11'},{l:'F12',c:'f12'}],
    [{l:'`',c:'`'},{l:'1',c:'1'},{l:'2',c:'2'},{l:'3',c:'3'},{l:'4',c:'4'},{l:'5',c:'5'},{l:'6',c:'6'},{l:'7',c:'7'},{l:'8',c:'8'},{l:'9',c:'9'},{l:'0',c:'0'},{l:'-',c:'minus'},{l:'=',c:'equals'},{l:'Bksp',c:'backspace',w:58}],
    [{l:'Tab',c:'tab',w:52},{l:'Q',c:'q'},{l:'W',c:'w'},{l:'E',c:'e'},{l:'R',c:'r'},{l:'T',c:'t'},{l:'Y',c:'y'},{l:'U',c:'u'},{l:'I',c:'i'},{l:'O',c:'o'},{l:'P',c:'p'},{l:'[',c:'leftbracket'},{l:']',c:'rightbracket'},{l:'\\',c:'backslash',w:52}],
    [{l:'Caps',c:'capslock',w:62},{l:'A',c:'a'},{l:'S',c:'s'},{l:'D',c:'d'},{l:'F',c:'f'},{l:'G',c:'g'},{l:'H',c:'h'},{l:'J',c:'j'},{l:'K',c:'k'},{l:'L',c:'l'},{l:';',c:'semicolon'},{l:"'",c:'apostrophe'},{l:'Enter',c:'enter',w:74}],
    [{l:'Shift',c:'shift',w:76},{l:'Z',c:'z'},{l:'X',c:'x'},{l:'C',c:'c'},{l:'V',c:'v'},{l:'B',c:'b'},{l:'N',c:'n'},{l:'M',c:'m'},{l:',',c:','},{l:'.',c:'.'},{l:'/',c:'slash'},{l:'Shift',c:'rshift',w:88}],
    [{l:'Ctrl',c:'ctrl',w:52},{l:'⊞',c:null,d:1,w:40},{l:'Alt',c:'alt',w:52},{l:'Space',c:'space',w:200},{l:'Alt',c:'ralt',w:52},{l:'⊞',c:null,d:1,w:40},{l:'Fn',c:null,d:1,w:36},{l:'Ctrl',c:'rctrl',w:52}],
  ];
  const KB_NAV_ROWS = [
    [{l:'PrtSc',c:null,d:1}, {l:'ScrLk',c:null,d:1}, {l:'Pause',c:null,d:1}],
    [{l:'Ins',c:'ins'},       {l:'Home',c:'home'},     {l:'PgUp',c:'pgup'}],
    [{l:'Del',c:'del'},       {l:'End',c:'end'},       {l:'PgDn',c:'pgdn'}],
    [null,                    null,                    null],
    [null,                    {l:'↑',c:'uparrow'},     null],
    [{l:'←',c:'leftarrow'},  {l:'↓',c:'downarrow'},   {l:'→',c:'rightarrow'}],
  ];
  const NUMPAD = [
    {l:'NumLk', c:'numlock',       row:1, col:1},
    {l:'/',     c:'kp_divide',     row:1, col:2},
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
    {l:'.',     c:'kp_del',        row:5, col:3},
  ];
  const KB_MOUSE = [
    {l:'LMB',    c:'mouse1'},
    {l:'RMB',    c:'mouse2'},
    {l:'Mouse4', c:'mouse4'},
    {l:'Mouse5', c:'mouse5'},
  ];

  // Mutually exclusive feature pairs — only one from each pair can be active at a time.
  const MUTEX_PAIRS = [['longjump', 'wlongjump']];

  // --- State ---
  // bindings: featureId -> { key: 'f', line: 'bind f "..."' } for key-bound features
  // toggles:  Set<featureId> for Bhop, Null, and Performance (non-key features)
  const bindings = new Map();
  const toggles = new Set();
  let pendingFeatureId = null;
  let pendingSens = null;
  let kbWin = null;
  let kbWinTitleEl = null;
  let sensWin = null;

  // --- DOM ---
  const wrap = document.createElement('div');
  wrap.className = 'cg-wrap';

  const left = document.createElement('div');
  left.className = 'cg-left';

  const header = document.createElement('div');
  header.className = 'cg-header';
  header.textContent = 'CONFIG UP-TO-DATE AS OF: April 6, 2026';
  left.appendChild(header);

  const instructions = document.createElement('div');
  instructions.className = 'cg-instructions';
  instructions.innerHTML = 'These commands need to go inside your autoexec.cfg file. You can either copy the code on the right and paste it into your autoexec, or click download and it will generate and download it for you automatically. The autoexec file, along with nulls if activated, go into the following filepath:<br><strong>Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\cfg</strong><br>If you are experiencing issues with the config not working, ensure it is placed in the exact path, otherwise the game won\'t be able to read the file. If you have any questions, feel free to ask them in my discord server.';
  left.appendChild(instructions);

  // Feature buttons are tracked so we can toggle selected class from renderOutput()
  const buttonsById = new Map();

  function buildCategory(titleText, features, gridMode) {
    const cat = document.createElement('div');
    cat.className = 'cg-category';

    const divider = document.createElement('div');
    divider.className = 'cg-category-divider';
    const l1 = document.createElement('div'); l1.className = 'cg-divider-line';
    const title = document.createElement('div'); title.className = 'cg-category-title'; title.textContent = titleText;
    const l2 = document.createElement('div'); l2.className = 'cg-divider-line';
    divider.appendChild(l1); divider.appendChild(title); divider.appendChild(l2);
    cat.appendChild(divider);

    const grid = document.createElement('div');
    grid.className = 'cg-grid' + (gridMode === 'center' ? ' cg-grid--center' : '');
    features.forEach(feat => {
      const btn = document.createElement('button');
      btn.className = 'cg-feat-btn';
      btn.textContent = feat.label;
      btn.dataset.featId = feat.id;
      if (feat.disabled) btn.classList.add('cg-feat-btn--disabled');

      btn.addEventListener('mouseenter', e => showTooltip(e, feat.tooltip || ''));
      btn.addEventListener('mousemove', positionTooltip);
      btn.addEventListener('mouseleave', hideTooltip);

      if (!feat.disabled) {
        btn.addEventListener('click', () => onFeatureClick(feat));
      }

      buttonsById.set(feat.id, btn);
      grid.appendChild(btn);
    });
    cat.appendChild(grid);
    return cat;
  }

  left.appendChild(buildCategory('Movement Binds',        CFG_FEATURES.movement,    'grid'));
  left.appendChild(buildCategory('Quality of Life Binds', CFG_FEATURES.qol,         'grid'));
  left.appendChild(buildCategory('Performance Binds',     CFG_FEATURES.performance, 'center'));

  const comingSoon = document.createElement('div');
  comingSoon.className = 'cg-coming-soon';
  comingSoon.textContent = 'More Binds Coming Soon…';
  left.appendChild(comingSoon);

  // Right panel: output + actions
  const right = document.createElement('div');
  right.className = 'cg-right';

  const outputTA = document.createElement('textarea');
  outputTA.className = 'cg-output-ta';
  outputTA.placeholder = 'Binds Output Here...';
  outputTA.readOnly = true;
  outputTA.spellcheck = false;
  right.appendChild(outputTA);

  const actions = document.createElement('div');
  actions.className = 'cg-actions';
  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'cg-btn';
  downloadBtn.textContent = 'DOWNLOAD';
  const copyBtn = document.createElement('button');
  copyBtn.className = 'cg-btn';
  copyBtn.textContent = 'COPY';
  actions.appendChild(downloadBtn);
  actions.appendChild(copyBtn);
  right.appendChild(actions);

  wrap.appendChild(left);
  wrap.appendChild(right);

  // --- Toast notification ---
  const toast = document.createElement('div');
  toast.className = 'cg-toast';
  wrap.appendChild(toast);
  let toastTimer = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('cg-toast--visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('cg-toast--visible'), 3500);
  }

  // --- Tooltip ---
  const tooltip = document.createElement('div');
  tooltip.className = 'cg-tooltip';
  wrap.appendChild(tooltip);

  function showTooltip(e, text) {
    if (!text) return;
    tooltip.textContent = text;
    tooltip.style.display = 'block';
    positionTooltip(e);
  }
  function positionTooltip(e) {
    if (tooltip.style.display !== 'block') return;
    const wrapRect = wrap.getBoundingClientRect();
    const x = e.clientX - wrapRect.left + 14;
    const y = e.clientY - wrapRect.top + 18;
    tooltip.style.left = x + 'px';
    tooltip.style.top  = y + 'px';
  }
  function hideTooltip() {
    tooltip.style.display = 'none';
  }

  // --- Keyboard elements (placed into a sub-window when active) ---
  const kbWarning = document.createElement('div');
  kbWarning.className = 'cg-kb-warning';

  const kbContent = document.createElement('div');
  kbContent.className = 'cg-kb-content';

  function makeKey(keyDef) {
    const keyEl = document.createElement('div');
    let cls = 'cg-kb-key';
    if (keyDef.d)   cls += ' cg-kb-key--disabled';
    if (keyDef.inv) cls += ' cg-kb-key--inv';
    keyEl.className = cls;
    keyEl.textContent = keyDef.l;
    if (keyDef.w) keyEl.style.minWidth = keyDef.w + 'px';
    if (!keyDef.d && keyDef.c) {
      keyEl.addEventListener('click', () => commitKeySelection(keyDef.c));
    }
    return keyEl;
  }

  const kbMain = document.createElement('div');
  kbMain.className = 'cg-kb-main';
  KB_MAIN_ROWS.forEach(rowDef => {
    const rowEl = document.createElement('div');
    rowEl.className = 'cg-kb-row';
    rowDef.forEach(keyDef => {
      if (keyDef === null) {
        const gap = document.createElement('div');
        gap.className = 'cg-kb-gap';
        rowEl.appendChild(gap);
        return;
      }
      rowEl.appendChild(makeKey(keyDef));
    });
    kbMain.appendChild(rowEl);
  });

  const kbNav = document.createElement('div');
  kbNav.className = 'cg-kb-nav';
  KB_NAV_ROWS.forEach(rowDef => {
    const rowEl = document.createElement('div');
    rowEl.className = 'cg-kb-row';
    rowDef.forEach(keyDef => {
      rowEl.appendChild(keyDef === null ? makeKey({l:' ',c:null,d:1,inv:1}) : makeKey(keyDef));
    });
    kbNav.appendChild(rowEl);
  });

  const kbNumpad = document.createElement('div');
  kbNumpad.className = 'cg-kb-numpad';
  NUMPAD.forEach(key => {
    const keyEl = makeKey(key);
    keyEl.style.gridRow    = key.rs ? `${key.row} / ${key.row + key.rs}` : String(key.row);
    keyEl.style.gridColumn = key.cs ? `${key.col} / ${key.col + key.cs}` : String(key.col);
    if (key.rs || key.cs) keyEl.style.height = 'auto';
    if (key.cs) keyEl.style.minWidth = 'auto';
    kbNumpad.appendChild(keyEl);
  });

  const kbMouse = document.createElement('div');
  kbMouse.className = 'cg-kb-mouse';
  const kbMouseLabel = document.createElement('div');
  kbMouseLabel.className = 'cg-kb-mouse-label';
  kbMouseLabel.textContent = 'MOUSE';
  kbMouse.appendChild(kbMouseLabel);
  KB_MOUSE.forEach(keyDef => kbMouse.appendChild(makeKey(keyDef)));

  const kbGap1 = document.createElement('div'); kbGap1.className = 'cg-kb-gap';
  const kbGap2 = document.createElement('div'); kbGap2.className = 'cg-kb-gap';
  const kbGap3 = document.createElement('div'); kbGap3.className = 'cg-kb-gap';

  kbContent.appendChild(kbMain);
  kbContent.appendChild(kbGap1);
  kbContent.appendChild(kbNav);
  kbContent.appendChild(kbGap2);
  kbContent.appendChild(kbNumpad);
  kbContent.appendChild(kbGap3);
  kbContent.appendChild(kbMouse);

  // --- Nulls Overlay ---
  const nullsOverlay = document.createElement('div');
  nullsOverlay.className = 'cg-nulls-overlay';

  const nullsBar = document.createElement('div');
  nullsBar.className = 'cg-kb-bar';
  const nullsTitle = document.createElement('div');
  nullsTitle.className = 'cg-kb-title';
  nullsTitle.textContent = 'nulls.cfg — extra code';
  const nullsClose = document.createElement('button');
  nullsClose.className = 'cg-kb-close';
  nullsClose.textContent = '×';
  nullsBar.appendChild(nullsTitle);
  nullsBar.appendChild(nullsClose);
  nullsOverlay.appendChild(nullsBar);

  const nullsNote = document.createElement('div');
  nullsNote.className = 'cg-nulls-note';
  nullsNote.textContent = 'Important: This code must live in a SEPARATE file named "nulls.cfg" inside your CS2 cfg folder for the null binds to work properly. Paste it into nulls.cfg manually, or click Download below.';
  nullsOverlay.appendChild(nullsNote);

  const nullsTA = document.createElement('textarea');
  nullsTA.className = 'cg-nulls-ta';
  nullsTA.readOnly = true;
  nullsTA.spellcheck = false;
  nullsOverlay.appendChild(nullsTA);

  const nullsActions = document.createElement('div');
  nullsActions.className = 'cg-actions';
  const nullsDownload = document.createElement('button');
  nullsDownload.className = 'cg-btn';
  nullsDownload.textContent = 'DOWNLOAD nulls.cfg';
  const nullsCopy = document.createElement('button');
  nullsCopy.className = 'cg-btn';
  nullsCopy.textContent = 'COPY';
  nullsActions.appendChild(nullsDownload);
  nullsActions.appendChild(nullsCopy);
  nullsOverlay.appendChild(nullsActions);

  wrap.appendChild(nullsOverlay);

  // --- Sensitivity elements (placed into a sub-window when active) ---
  const sensBody = document.createElement('div');
  sensBody.className = 'cg-sens-body';

  const sensPrompt = document.createElement('div');
  sensPrompt.className = 'cg-sens-prompt';
  sensPrompt.textContent = 'Please enter your current sensitivity:';
  sensBody.appendChild(sensPrompt);

  const sensInput = document.createElement('input');
  sensInput.type = 'text';
  sensInput.className = 'cg-sens-input';
  sensInput.placeholder = 'e.g. 1.8';
  sensInput.autocomplete = 'off';
  sensBody.appendChild(sensInput);

  const sensWarning = document.createElement('div');
  sensWarning.className = 'cg-kb-warning';
  sensBody.appendChild(sensWarning);

  const sensConfirmBtn = document.createElement('button');
  sensConfirmBtn.className = 'cg-btn';
  sensConfirmBtn.textContent = 'CONFIRM';
  sensBody.appendChild(sensConfirmBtn);

  // --- Rendering / State Management ---
  function renderOutput() {
    // Collect selected feature code blocks per category, then join with spacing.
    // 1 blank line (\n\n) between features within a category.
    // 2 blank lines (\n\n\n) between categories.
    // Order: Performance → Movement → QoL
    const sections = [];

    function collectSection(catLabel, features, sep = '\n\n') {
      const blocks = [];
      features.forEach(f => {
        if (f.disabled) return;
        if (f.needsKey && bindings.has(f.id)) {
          const b = bindings.get(f.id);
          let line;
          if (f.id === 'wjumpthrow') {
            const tmpl = bindings.has('jumpthrow') ? f.templateShort : f.template;
            line = tmpl.replace('{KEY}', b.key);
          } else if (f.id === 'highsens') {
            line = f.template.replace('{KEY}', b.key).replace('{SENS}', b.sens ?? '');
          } else {
            line = f.template.replace('{KEY}', b.key);
          }
          blocks.push(line);
        } else if (!f.needsKey && toggles.has(f.id)) {
          blocks.push(f.code);
        }
      });
      if (blocks.length === 0) return;
      const header = `// ===== ${catLabel.toUpperCase()} =====`;
      sections.push(header + '\n' + blocks.join(sep));
    }

    collectSection('Performance Binds', CFG_FEATURES.performance, '\n');
    collectSection('Movement Binds',    CFG_FEATURES.movement);
    collectSection('Quality of Life Binds', CFG_FEATURES.qol);

    outputTA.value = sections.join('\n\n\n');

    // Update selected visuals
    ALL_FEATURES.forEach(f => {
      const btn = buttonsById.get(f.id);
      if (!btn) return;
      const selected = bindings.has(f.id) || toggles.has(f.id);
      btn.classList.toggle('cg-feat-btn--selected', selected);
    });
  }

  function createSubWin(title, contentEl, w, h) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const parentWin = wrap.closest('.win');
    let left, top;
    if (parentWin) {
      const pr = parentWin.getBoundingClientRect();
      left = Math.round(pr.left + (pr.width  - w) / 2);
      top  = Math.round(pr.top  + (pr.height - h) / 2);
    } else {
      left = Math.round((vw - w) / 2);
      top  = Math.round((vh - h) / 2);
    }
    left = Math.max(20, left);
    top  = Math.max(20, top);

    const win = document.createElement('div');
    win.className = 'win';
    win.style.cssText = `left:${left}px; top:${top}px; width:${w}px; height:${h}px;`;

    const titlebar = document.createElement('div');
    titlebar.className = 'win__titlebar';
    const titleSpan = document.createElement('span');
    titleSpan.className = 'win__titlebar-title';
    titleSpan.textContent = title;
    const controls = document.createElement('div');
    controls.className = 'win__controls';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'win__btn win__btn--close';
    closeBtn.title = 'Close';
    closeBtn.innerHTML = '&times;';
    controls.appendChild(closeBtn);
    titlebar.appendChild(titleSpan);
    titlebar.appendChild(controls);

    const contentArea = document.createElement('div');
    contentArea.className = 'win__content';
    contentArea.appendChild(contentEl);

    win.appendChild(titlebar);
    win.appendChild(contentArea);

    win.addEventListener('mousedown', () => focusWin(win));
    initWinDrag(win, titlebar);

    document.getElementById('windows-layer').appendChild(win);
    focusWin(win);
    return { win, titleSpan, closeBtn };
  }

  function openKeyboardFor(featureId) {
    pendingFeatureId = featureId;
    const feat = findFeat(featureId);
    if (kbWin) {
      kbWinTitleEl.textContent = `Pick a key for: ${feat.label}`;
      focusWin(kbWin);
      return;
    }
    const inner = document.createElement('div');
    inner.style.cssText = 'display:flex; flex-direction:column; gap:10px; padding:10px 12px 14px;';
    inner.appendChild(kbWarning);
    inner.appendChild(kbContent);
    const { win, titleSpan, closeBtn } = createSubWin(`Pick a key for: ${feat.label}`, inner, 960, 310);
    kbWin = win;
    kbWinTitleEl = titleSpan;
    closeBtn.addEventListener('click', closeKeyboard);
  }

  function closeKeyboard() {
    if (kbWin) { kbWin.remove(); kbWin = null; kbWinTitleEl = null; }
    pendingFeatureId = null;
    kbWarning.style.display = 'none';
    clearTimeout(kbWarningTimer);
  }

  let kbWarningTimer = null;

  function commitKeySelection(cs2code) {
    if (!pendingFeatureId) { closeKeyboard(); return; }

    // Check for duplicate key — another feature already uses this key
    for (const [existingId, binding] of bindings) {
      if (existingId !== pendingFeatureId && binding.key === cs2code) {
        kbWarning.textContent = 'You cannot bind 2 actions to the same key!';
        kbWarning.style.display = 'block';
        clearTimeout(kbWarningTimer);
        kbWarningTimer = setTimeout(() => { kbWarning.style.display = 'none'; }, 3000);
        return;
      }
    }

    const feat = findFeat(pendingFeatureId);
    if (!feat || !feat.template) { closeKeyboard(); return; }

    // Mutual exclusion — evict the conflicting bind before committing
    let evictedLabel = null;
    for (const pair of MUTEX_PAIRS) {
      if (pair.includes(pendingFeatureId)) {
        const otherId = pair.find(id => id !== pendingFeatureId);
        if (bindings.has(otherId)) {
          bindings.delete(otherId);
          const otherFeat = findFeat(otherId);
          evictedLabel = otherFeat ? otherFeat.label : otherId;
        }
      }
    }

    const binding = { key: cs2code };
    if (feat.id === 'highsens' && pendingSens !== null) {
      binding.sens = pendingSens;
      pendingSens = null;
    }
    bindings.set(feat.id, binding);
    closeKeyboard();
    renderOutput();

    if (evictedLabel) {
      showToast(`Only one Long Jump bind can be active at a time — "${evictedLabel}" has been removed.`);
    }
  }

  function openNullsPopup(feat) {
    nullsTA.value = feat.extraNullsCfg || '';
    nullsOverlay.style.display = 'flex';
    const winEl = wrap.closest('.win');
    if (winEl && !winEl.classList.contains('win--mobile') && !winEl.classList.contains('win--maximized')) {
      if (!winEl.dataset.cgNullsOrigH) winEl.dataset.cgNullsOrigH = winEl.style.height;
    }
  }

  function closeNullsPopup() {
    nullsOverlay.style.display = 'none';
    const winEl = wrap.closest('.win');
    if (winEl && winEl.dataset.cgNullsOrigH !== undefined) {
      delete winEl.dataset.cgNullsOrigH;
    }
  }

  function openSensInput() {
    pendingFeatureId = 'highsens';
    sensInput.value = '';
    sensWarning.style.display = 'none';
    const { win, closeBtn } = createSubWin('High Sens Hold Bind', sensBody, 340, 200);
    sensWin = win;
    closeBtn.addEventListener('click', closeSensInput);
    requestAnimationFrame(() => sensInput.focus());
  }

  function closeSensInput() {
    if (sensWin) { sensWin.remove(); sensWin = null; }
    pendingFeatureId = null;
    pendingSens = null;
  }

  function confirmSens() {
    const val = sensInput.value.trim();
    const num = parseFloat(val);
    if (!val || isNaN(num) || num <= 0) {
      sensWarning.textContent = 'Please enter a valid sensitivity value.';
      sensWarning.style.display = 'block';
      return;
    }
    pendingSens = String(num);
    if (sensWin) { sensWin.remove(); sensWin = null; }
    openKeyboardFor('highsens');
  }

  function onFeatureClick(feat) {
    // Already selected? → deselect and remove from output
    if (bindings.has(feat.id) || toggles.has(feat.id)) {
      bindings.delete(feat.id);
      toggles.delete(feat.id);
      renderOutput();
      return;
    }

    if (feat.needsKey) {
      if (feat.id === 'highsens') {
        openSensInput();
      } else {
        openKeyboardFor(feat.id);
      }
      return;
    }

    // Non-key feature — just toggle into state
    toggles.add(feat.id);
    renderOutput();

    // Nulls: also open popup with extra code
    if (feat.id === 'nulls') {
      openNullsPopup(feat);
    }
  }

  // --- Download/Copy Helpers ---
  function downloadFile(name, text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function copyWithFlash(btn, text, originalLabel) {
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'COPIED!';
      setTimeout(() => { btn.textContent = originalLabel; }, 1200);
    } catch {
      btn.textContent = 'FAILED';
      setTimeout(() => { btn.textContent = originalLabel; }, 1200);
    }
  }

  // --- Event Wiring ---
  nullsClose.addEventListener('click', closeNullsPopup);
  sensConfirmBtn.addEventListener('click', confirmSens);
  sensInput.addEventListener('keydown', e => { if (e.key === 'Enter') confirmSens(); });

  copyBtn.addEventListener('click', () => {
    copyWithFlash(copyBtn, outputTA.value, 'COPY');
  });
  downloadBtn.addEventListener('click', () => {
    downloadFile('autoexec.cfg', outputTA.value);
  });
  nullsCopy.addEventListener('click', () => {
    copyWithFlash(nullsCopy, nullsTA.value, 'COPY');
  });
  nullsDownload.addEventListener('click', () => {
    downloadFile('nulls.cfg', nullsTA.value);
  });

  // Initial render
  renderOutput();

  return wrap;
}
