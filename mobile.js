/* ═══════════════════════════════════════════════════════════════
   MOBILE APP GRID HELPERS
═══════════════════════════════════════════════════════════════ */
function mSetIconPos(icon, col, row) {
  icon.style.left  = (col * M_CELL_W) + 'px';
  icon.style.top   = (row * M_CELL_H) + 'px';
  icon.dataset.col = col;
  icon.dataset.row = row;
}

function mFindFreeCell(tc, tr, exclude) {
  const occ = new Set();
  document.querySelectorAll('#m-app-grid .m-app-icon').forEach(ic => {
    if (ic === exclude) return;
    occ.add(`${ic.dataset.col},${ic.dataset.row}`);
  });
  if (!occ.has(`${tc},${tr}`)) return { col: tc, row: tr };
  const q = [[tc, tr]], seen = new Set([`${tc},${tr}`]);
  while (q.length) {
    const [c, r] = q.shift();
    for (const [dc, dr] of [[0,-1],[0,1],[-1,0],[1,0],[-1,-1],[-1,1],[1,-1],[1,1]]) {
      const nc = c + dc, nr = r + dr;
      if (nc < 0 || nc >= M_COLS || nr < 0) continue;
      const k = `${nc},${nr}`;
      if (seen.has(k)) continue;
      seen.add(k);
      if (!occ.has(k)) return { col: nc, row: nr };
      q.push([nc, nr]);
    }
  }
  return { col: tc, row: tr };
}

function mUpdateGridHeight(grid) {
  if (!grid) return;
  let maxRow = 0;
  grid.querySelectorAll('.m-app-icon').forEach(i => {
    maxRow = Math.max(maxRow, parseInt(i.dataset.row) || 0);
  });
  grid.style.height = ((maxRow + 1) * M_CELL_H) + 'px';
}

function mNextFreePos(grid) {
  const occ = new Set();
  grid.querySelectorAll('.m-app-icon').forEach(ic => occ.add(`${ic.dataset.col},${ic.dataset.row}`));
  for (let r = 0; r < 100; r++) {
    for (let c = 0; c < M_COLS; c++) {
      if (!occ.has(`${c},${r}`)) return { col: c, row: r };
    }
  }
  return { col: 0, row: 0 };
}

function mobileInitIconInteraction(icon) {
  icon.addEventListener('touchstart', e => {
    e.stopPropagation();
    mMobileDown(icon, e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  icon.addEventListener('touchmove', e => {
    if (!mDrag || mDrag.icon !== icon || mDrag.dragging) return;
    if (Math.hypot(e.touches[0].clientX - mDrag.startX, e.touches[0].clientY - mDrag.startY) > 8) {
      clearTimeout(mDrag.holdTimer);
      mDrag = null;
    }
  }, { passive: true });

  icon.addEventListener('touchend', e => {
    if (mDrag && mDrag.icon === icon && !mDrag.dragging) {
      clearTimeout(mDrag.holdTimer);
      mDrag = null;
      icon._onTap?.();
    }
  });

  icon.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    e.stopPropagation();
    mMobileDown(icon, e.clientX, e.clientY);
  });

  icon.addEventListener('mouseleave', () => {
    if (mDrag && mDrag.icon === icon && !mDrag.dragging) {
      clearTimeout(mDrag.holdTimer);
      mDrag = null;
    }
  });
}

function mMobileDown(icon, cx, cy) {
  const grid = document.getElementById('m-app-grid');
  const timer = setTimeout(() => {
    if (!mDrag || mDrag.icon !== icon) return;
    mDrag.dragging = true;
    mDrag.holdTimer = null;
    icon.classList.add('m-dragging');
    icon.style.zIndex = '500';
    icon.style.transition = 'none';
    if (navigator.vibrate) navigator.vibrate(25);
  }, 360);
  mDrag = { icon, grid, holdTimer: timer, startX: cx, startY: cy, dragging: false };
}

function mSnapDragged(cx, cy) {
  if (!mDrag?.dragging) return;
  const { icon, grid } = mDrag;
  mDrag = null;
  icon.classList.remove('m-dragging');
  icon.style.zIndex = '';
  const rect = grid.getBoundingClientRect();
  const tc = Math.max(0, Math.min(M_COLS - 1, Math.round((cx - rect.left) / M_CELL_W)));
  const tr = Math.max(0, Math.round((cy - rect.top) / M_CELL_H));
  const { col, row } = mFindFreeCell(tc, tr, icon);
  icon.style.transition = 'left 0.12s ease, top 0.12s ease';
  mSetIconPos(icon, col, row);
  setTimeout(() => { icon.style.transition = ''; mUpdateGridHeight(grid); }, 150);
}

/* ═══════════════════════════════════════════════════════════════
   HALF-LIFE 3 REVEAL / HIDE
═══════════════════════════════════════════════════════════════ */
function revealHL3Icon() {
  if (document.querySelector('.desk-icon[data-id="hl3"]')) return;
  const app = WINDOW_APPS.find(a => a.id === 'hl3');
  if (!app) return;
  createDesktopIcon({
    id:        app.id,
    label:     app.label,
    iconSrc:   app.icon,
    onDblClick() {}, // Half-Life 3 doesn't launch
  });
}

function hideHL3Icon() {
  const icon = document.querySelector('.desk-icon[data-id="hl3"]');
  if (icon) icon.remove();
  hideMobileHL3Icon();
}

function hideMobileHL3Icon() {
  const el = document.querySelector('#m-app-grid .m-app-icon[data-id="hl3"]');
  if (el) el.remove();
}

function revealMobileHL3Icon() {
  if (document.querySelector('#m-app-grid .m-app-icon[data-id="hl3"]')) return;
  const grid = document.getElementById('m-app-grid');
  if (!grid) return;
  const app = WINDOW_APPS.find(a => a.id === 'hl3');
  if (!app) return;
  const icon = makeMobileAppIcon(app.id, app.label, app.icon, null);
  const { col, row } = mNextFreePos(grid);
  mSetIconPos(icon, col, row);
  grid.appendChild(icon);
  mobileInitIconInteraction(icon);
  mUpdateGridHeight(grid);
}

function makeMobileAppIcon(id, label, iconSrc, onTap) {
  const wrap = document.createElement('div');
  wrap.className  = 'm-app-icon';
  wrap.dataset.id = id;

  const imgWrap = document.createElement('div');
  imgWrap.className = 'm-icon-img-wrap';

  const img = document.createElement('img');
  img.src       = iconSrc;
  img.alt       = label;
  img.draggable = false;

  const span = document.createElement('span');
  span.textContent = label;

  imgWrap.appendChild(img);
  wrap.appendChild(imgWrap);
  wrap.appendChild(span);

  wrap._onTap = onTap || null;
  return wrap;
}

/* ═══════════════════════════════════════════════════════════════
   WIFI PANEL
═══════════════════════════════════════════════════════════════ */
function buildWifiPanel() {
  const panel = document.createElement('div');
  panel.id = 'wifi-panel';

  const listView = document.createElement('div');
  const passView = document.createElement('div');
  passView.className = 'wifi-pass-view';

  let wifiOn = true;

  function connectToNetwork(net) {
    const prev = WIFI_NETWORKS.find(n => n.connected);
    if (prev && prev.ssid === "Gabe's Hotspot") hideHL3Icon();
    WIFI_NETWORKS.forEach(n => { n.connected = false; });
    net.connected = true;
    if (net.ssid === "Gabe's Hotspot") revealHL3Icon();
  }

  function renderList() {
    const connected = WIFI_NETWORKS.find(n => n.connected);
    const available = WIFI_NETWORKS.filter(n => !n.connected);

    listView.innerHTML = `
      <div class="wifi-panel-header">
        <span class="wifi-panel-title">Wi-Fi</span>
        <div class="wifi-toggle${wifiOn ? '' : ' off'}" title="Wi-Fi ${wifiOn ? 'on' : 'off'}"></div>
      </div>
      ${wifiOn && connected ? `
      <div class="wifi-connected-section">
        <div class="wifi-connected-name">${connected.ssid}</div>
        <div class="wifi-connected-sub">Connected, ${connected.secured ? 'secured' : 'open'}</div>
        <button class="wifi-prop-btn">Properties</button>
      </div>` : ''}
      ${wifiOn
        ? `<div class="wifi-available-header">Available (${available.length})</div>
           <div class="wifi-network-list"></div>`
        : `<div class="wifi-off-msg">Wi-Fi is turned off</div>`}
      <div class="wifi-panel-footer">
        <button class="wifi-footer-btn">Network &amp; Internet settings</button>
      </div>
    `;

    listView.querySelector('.wifi-toggle').addEventListener('click', () => {
      wifiOn = !wifiOn;
      if (!wifiOn) {
        const wasGabe = WIFI_NETWORKS.find(n => n.connected && n.ssid === "Gabe's Hotspot");
        if (wasGabe) hideHL3Icon();
        WIFI_NETWORKS.forEach(n => { n.connected = false; });
      }
      renderList();
    });

    listView.style.display = '';
    passView.style.display = 'none';

    if (!wifiOn) return;

    const list = listView.querySelector('.wifi-network-list');
    available.forEach(net => {
      const row = document.createElement('div');
      row.className = 'wifi-network';
      row.innerHTML = `
        <div class="wifi-signal">
          <div class="wifi-bar${net.signal >= 1 ? ' lit' : ''}"></div>
          <div class="wifi-bar${net.signal >= 2 ? ' lit' : ''}"></div>
          <div class="wifi-bar${net.signal >= 3 ? ' lit' : ''}"></div>
          <div class="wifi-bar${net.signal >= 4 ? ' lit' : ''}"></div>
        </div>
        <div class="wifi-network-info">
          <div class="wifi-network-ssid">${net.ssid}</div>
          <div class="wifi-network-sub">${net.secured ? 'Secured' : 'Open'}</div>
        </div>
        <button class="wifi-connect-btn">Connect</button>
      `;

      const connectBtn = row.querySelector('.wifi-connect-btn');

      if (net.secured) {
        row.addEventListener('click', () => showPassView(net));
        connectBtn.addEventListener('click', e => { e.stopPropagation(); showPassView(net); });
      } else {
        const doConnect = () => {
          connectToNetwork(net);
          if (net.url) window.open(net.url, '_blank', 'noopener,noreferrer');
          renderList();
        };
        row.addEventListener('click', doConnect);
        connectBtn.addEventListener('click', e => { e.stopPropagation(); doConnect(); });
      }

      list.appendChild(row);
    });
  }

  function showPassView(net) {
    passView.innerHTML = `
      <div class="wifi-panel-header" style="gap:8px;">
        <button class="wifi-back-btn">&#8592;</button>
        <span class="wifi-panel-title">${net.ssid}</span>
      </div>
      <div class="wifi-pass-body">
        <div class="wifi-pass-label">Network security key</div>
        <div class="wifi-pass-row">
          <input class="wifi-pass-input" type="password" placeholder="Password" autocomplete="off" spellcheck="false">
          <button class="wifi-eye-btn" type="button" title="Hold to reveal">&#128065;</button>
          <button class="wifi-pass-submit">Connect</button>
        </div>
        <div class="wifi-pass-error"></div>
      </div>
    `;

    listView.style.display = 'none';
    passView.style.display = '';

    const input  = passView.querySelector('.wifi-pass-input');
    const error  = passView.querySelector('.wifi-pass-error');
    const submit = passView.querySelector('.wifi-pass-submit');
    const eyeBtn = passView.querySelector('.wifi-eye-btn');

    eyeBtn.addEventListener('mousedown',  e => { e.preventDefault(); input.type = 'text'; });
    eyeBtn.addEventListener('mouseup',    () => { input.type = 'password'; });
    eyeBtn.addEventListener('mouseleave', () => { input.type = 'password'; });

    passView.querySelector('.wifi-back-btn').addEventListener('click', () => renderList());

    function tryConnect() {
      const val = input.value.trim();
      const correct = net.password
        ? val.toLowerCase() === net.password.toLowerCase()
        : val.length > 0;
      if (correct) {
        connectToNetwork(net);
        renderList();
      } else {
        error.textContent = "The network security key isn't correct. Try again.";
        input.value = '';
        input.focus();
      }
    }

    submit.addEventListener('click', tryConnect);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryConnect(); });
    requestAnimationFrame(() => input.focus());
  }

  panel.appendChild(listView);
  panel.appendChild(passView);
  renderList();
  document.body.appendChild(panel);
  return panel;
}
