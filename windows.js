/* ═══════════════════════════════════════════════════════════════
   WINDOW MANAGEMENT
═══════════════════════════════════════════════════════════════ */
function focusWin(win) {
  document.querySelectorAll('.win.focused').forEach(w => w.classList.remove('focused'));
  win.classList.add('focused');
  win.style.zIndex = ++zTop;
}

function buildWinContent(app) {
  if (app.type === 'cmd')     return buildCmdContent();
  if (app.type === 'notepad') return buildNotepadContent();
  if (app.type === 'wjt')     return buildWjtContent();
  if (app.type === 'about')   return buildAboutContent();
  if (app.type === 'specs')  return buildSpecsTree();
  if (app.type === 'folder')      return buildFolderContent(app);
  if (app.type === 'scroll-test') return buildScrollTestContent();
  if (app.type === 'bind-gen')   return buildBindGenContent();
  if (app.type === 'cfg-gen')    return buildCfgGenContent();

  const div = document.createElement('div');
  div.className = 'placeholder-content';
  div.innerHTML = `
    <svg width="52" height="52" viewBox="0 0 24 24" fill="rgba(255,255,255,0.18)">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
    <p>${app.placeholder || 'Coming soon…'}</p>
  `;
  return div;
}

const savedBounds = new WeakMap();

function openWindow(app) {
  const count    = (winInstances[app.id] || []).length;
  const vw       = window.innerWidth;
  const vh       = window.innerHeight - parseInt(getComputedStyle(document.documentElement).getPropertyValue('--taskbar-h'));
  const isMobile = vw <= 767;
  const w        = app.defaultW || 500;
  const h        = app.defaultH || 400;
  const jitter   = count * 26;
  const left     = Math.max(20, Math.floor((vw - w) / 2) + jitter);
  const top      = Math.max(20, Math.floor((vh - h) / 2) + jitter);

  const win = document.createElement('div');
  win.className = isMobile ? 'win win--mobile' : 'win';
  win.style.cssText = isMobile ? '' : `left:${left}px; top:${top}px; width:${w}px; height:${h}px;`;

  win.innerHTML = `
    <div class="win__titlebar">
      <img class="win__titlebar-icon" src="${app.icon}" alt="">
      <span class="win__titlebar-title">${app.title}</span>
      <div class="win__controls">
        <button class="win__btn win__btn--min"   title="Minimize">&ndash;</button>
        <button class="win__btn win__btn--max"   title="Maximize">&#x25A1;</button>
        <button class="win__btn win__btn--close" title="Close">&times;</button>
      </div>
    </div>
    <div class="win__content"></div>
    <div class="win__resize win__resize--n"></div>
    <div class="win__resize win__resize--s"></div>
    <div class="win__resize win__resize--e"></div>
    <div class="win__resize win__resize--w"></div>
    <div class="win__resize win__resize--ne"></div>
    <div class="win__resize win__resize--nw"></div>
    <div class="win__resize win__resize--se"></div>
    <div class="win__resize win__resize--sw"></div>
  `;

  win.querySelector('.win__content').appendChild(buildWinContent(app));

  win.querySelector('.win__btn--close').addEventListener('click', () => closeWindow(win, app));
  win.querySelector('.win__btn--min').addEventListener('click',   () => minimizeWindow(win));
  win.querySelector('.win__btn--max').addEventListener('click',   () => toggleMax(win));

  win.addEventListener('mousedown', () => focusWin(win));

  if (!isMobile) {
    initWinDrag(win, win.querySelector('.win__titlebar'));
    win.querySelectorAll('.win__resize').forEach(handle => {
      const dir = [...handle.classList].find(c => c.startsWith('win__resize--')).slice(13);
      handle.addEventListener('mousedown', e => { e.stopPropagation(); initResize(win, e, dir); });
    });
  }

  if (!winInstances[app.id]) winInstances[app.id] = [];
  winInstances[app.id].push(win);
  win._appId = app.id;

  document.getElementById('windows-layer').appendChild(win);
  focusWin(win);
  updateTaskbar();
}

function closeWindow(win, app) {
  const id = app ? app.id : win._appId;
  winInstances[id] = (winInstances[id] || []).filter(w => w !== win);
  win.remove();
  updateTaskbar();
  const hasAny = Object.values(winInstances).some(arr => arr.length > 0);
  if (!hasAny) document.getElementById('windows-layer').classList.remove('mobile-open');
}

function minimizeWindow(win) {
  win.style.display  = 'none';
  win.dataset.minimized = '1';
  updateTaskbar();
}

function restoreWindow(win) {
  win.style.display = '';
  delete win.dataset.minimized;
  focusWin(win);
  updateTaskbar();
}

function toggleMax(win) {
  if (win.dataset.maximized) {
    const b = savedBounds.get(win);
    if (b) { win.style.left = b.l; win.style.top = b.t; win.style.width = b.w; win.style.height = b.h; }
    delete win.dataset.maximized;
  } else {
    savedBounds.set(win, { l: win.style.left, t: win.style.top, w: win.style.width, h: win.style.height });
    win.style.left = '0'; win.style.top = '0';
    win.style.width  = window.innerWidth + 'px';
    win.style.height = (window.innerHeight - 48) + 'px';
    win.dataset.maximized = '1';
  }
}

/* ═══════════════════════════════════════════════════════════════
   WINDOW DRAG
═══════════════════════════════════════════════════════════════ */
function initWinDrag(win, handle) {
  handle.addEventListener('mousedown', e => {
    if (e.target.closest('.win__controls')) return;
    if (e.button !== 0) return;
    if (win.dataset.maximized) return;
    e.preventDefault();

    const sx = e.clientX, sy = e.clientY;
    const ol = parseInt(win.style.left) || 0;
    const ot = parseInt(win.style.top)  || 0;

    focusWin(win);

    function onMove(e) {
      win.style.left = Math.max(-(win.offsetWidth - 80), ol + e.clientX - sx) + 'px';
      win.style.top  = Math.max(0, Math.min(ot + e.clientY - sy, window.innerHeight - 86)) + 'px';
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
  });
}

/* ═══════════════════════════════════════════════════════════════
   WINDOW RESIZE
═══════════════════════════════════════════════════════════════ */
function initResize(win, e, dir) {
  e.preventDefault();
  if (win.dataset.maximized) return;
  focusWin(win);

  const sx = e.clientX, sy = e.clientY;
  const sl = parseInt(win.style.left) || 0;
  const st = parseInt(win.style.top)  || 0;
  const sw = win.offsetWidth, sh = win.offsetHeight;
  const mw = 320, mh = 200;

  function onMove(e) {
    const dx = e.clientX - sx, dy = e.clientY - sy;
    let l = sl, t = st, w = sw, h = sh;
    if (dir.includes('e')) w = Math.max(mw, sw + dx);
    if (dir.includes('s')) h = Math.max(mh, sh + dy);
    if (dir.includes('w')) { w = Math.max(mw, sw - dx); l = sl + sw - w; }
    if (dir.includes('n')) { h = Math.max(mh, sh - dy); t = st + sh - h; }
    win.style.left   = l + 'px';
    win.style.top    = t + 'px';
    win.style.width  = w + 'px';
    win.style.height = h + 'px';
  }
  function onUp() {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onUp);
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onUp);
}
