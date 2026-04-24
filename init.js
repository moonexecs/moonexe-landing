/* ═══════════════════════════════════════════════════════════════
   LIVE CLOCK
═══════════════════════════════════════════════════════════════ */
(function clock() {
  function tick() {
    const now  = new Date();
    document.getElementById('clock-time').textContent =
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock-date').textContent =
      now.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  tick();
  setInterval(tick, 1000);
})();

/* ═══════════════════════════════════════════════════════════════
   INIT — Build desktop icons
═══════════════════════════════════════════════════════════════ */
SOCIAL_LINKS.forEach(link => {
  createDesktopIcon({
    id:      link.id,
    label:   link.label,
    iconSrc: `https://cdn.simpleicons.org/${link.icon}/${link.color}`,
    onDblClick() {
      launchedLinks.set(link.id, (launchedLinks.get(link.id) || 0) + 1);
      window.open(link.url, '_blank', 'noopener,noreferrer');
      updateTaskbar();
    },
  });
});

WINDOW_APPS.forEach(app => {
  if (app.hidden) return; // Easter egg — no desktop icon
  createDesktopIcon({
    id:      app.id,
    label:   app.label,
    iconSrc: app.icon,
    onDblClick() { openWindow(app); },
  });
});

// Double-click start button → open CMD easter egg
document.getElementById('start-btn').addEventListener('dblclick', () => {
  const cmdApp = WINDOW_APPS.find(a => a.id === 'cmd');
  if (cmdApp) openWindow(cmdApp);
});

// Close any open notepad dropdown when clicking outside the menu bar
document.addEventListener('mousedown', e => {
  if (!e.target.closest('.notepad-menubar')) {
    document.querySelectorAll('.notepad-menu.open').forEach(m => m.classList.remove('open'));
  }
});

// Wifi panel
const wifiPanel = buildWifiPanel();
document.getElementById('wifi-btn').addEventListener('click', e => {
  e.stopPropagation();
  wifiPanel.classList.toggle('open');
});
document.addEventListener('mousedown', e => {
  if (!e.target.closest('#wifi-panel') && !e.target.closest('#wifi-btn')) {
    wifiPanel.classList.remove('open');
  }
});

/* ═══════════════════════════════════════════════════════════════
   MOBILE — Samsung-style homescreen
═══════════════════════════════════════════════════════════════ */
(function initMobile() {

  /* ── App grid (absolutely positioned for drag support) ─────── */
  const grid = document.getElementById('m-app-grid');
  if (grid) {
    let col = 0, row = 0;
    function addIcon(icon) {
      mSetIconPos(icon, col, row);
      grid.appendChild(icon);
      mobileInitIconInteraction(icon);
      col++; if (col >= M_COLS) { col = 0; row++; }
    }

    WINDOW_APPS.filter(a => !a.hidden).forEach(app => {
      addIcon(makeMobileAppIcon(app.id, app.label, app.icon, () => {
        document.getElementById('windows-layer').classList.add('mobile-open');
        openWindow(app);
      }));
    });

    SOCIAL_LINKS.forEach(link => {
      addIcon(makeMobileAppIcon(
        link.id, link.label,
        `https://cdn.simpleicons.org/${link.icon}/${link.color}`,
        () => window.open(link.url, '_blank', 'noopener,noreferrer')
      ));
    });

    mUpdateGridHeight(grid);
  }

  /* ── Dock (decorative, no actions) ───────────────────────── */
  const dockApps = document.getElementById('m-dock-apps');
  if (dockApps) {
    const DOCK = [
      { label: 'Phone',    svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>` },
      { label: 'Chrome',   img: 'https://cdn.simpleicons.org/googlechrome/ffffff' },
      { label: 'Messages', svg: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>` },
      { label: 'Spotify',  img: 'https://cdn.simpleicons.org/spotify/ffffff' },
    ];
    DOCK.forEach(d => {
      const el = document.createElement('div');
      el.className = 'm-dock-icon';
      el.title     = d.label;
      if (d.svg) {
        el.innerHTML = d.svg;
      } else {
        const i = document.createElement('img');
        i.src = d.img; i.alt = d.label;
        el.appendChild(i);
      }
      dockApps.appendChild(el);
    });
  }

  /* ── Live clock ───────────────────────────────────────────── */
  function tickMobileClock() {
    const now     = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dayStr  = now.toLocaleDateString([], { weekday: 'short', month: 'long', day: 'numeric' });
    const ccDate  = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

    const el = id => document.getElementById(id);
    if (el('m-status-time')) el('m-status-time').textContent = timeStr;
    if (el('m-clock-time'))  el('m-clock-time').textContent  = timeStr;
    if (el('m-clock-day'))   el('m-clock-day').textContent   = dayStr;
    if (el('m-cc-time'))     el('m-cc-time').textContent     = timeStr;
    if (el('m-cc-date'))     el('m-cc-date').textContent     = ccDate;
  }
  tickMobileClock();
  setInterval(tickMobileClock, 1000);

  /* ── Control center swipe ─────────────────────────────────── */
  const panel    = document.getElementById('m-cc-panel');
  const backdrop = document.getElementById('m-cc-backdrop');
  const homescreen = document.getElementById('m-homescreen');
  if (!panel || !backdrop || !homescreen) return;

  let ccOpen       = false;
  let swiping      = false;
  let swipeOnPanel = false;
  let startY       = 0;
  let lastDy       = 0;

  function getPH() { return panel.offsetHeight; }

  function snapCC(open) {
    ccOpen = open;
    panel.classList.add('cc-snap');
    panel.style.transform = open ? 'translateY(0)' : 'translateY(-100%)';
    backdrop.style.background = open ? 'rgba(0,0,0,0.35)' : '';
    backdrop.classList.toggle('open', open);
    setTimeout(() => panel.classList.remove('cc-snap'), 320);
    if (!open) closeWifiSub();
  }

  // Swipe down on homescreen → open
  homescreen.addEventListener('touchstart', e => {
    if (ccOpen) return;
    swiping = true; swipeOnPanel = false;
    startY  = e.touches[0].clientY;
    lastDy  = 0;
  }, { passive: true });

  // Swipe up on panel → close
  panel.addEventListener('touchstart', e => {
    if (!ccOpen) return;
    swiping = true; swipeOnPanel = true;
    startY  = e.touches[0].clientY;
    lastDy  = 0;
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (mDrag?.dragging) {
      const { icon } = mDrag;
      const rect = document.getElementById('m-app-grid').getBoundingClientRect();
      const t = e.touches[0];
      icon.style.left = (t.clientX - rect.left - 36) + 'px';
      icon.style.top  = (t.clientY - rect.top  - 36) + 'px';
      return;
    }
    // brightness drag is handled in a separate touchmove (added after brightTrack is defined)
    if (!swiping) return;
    const dy = e.touches[0].clientY - startY;
    lastDy = dy;
    const pH = getPH();

    if (!swipeOnPanel) {
      if (dy <= 0) return;
      const clamped = Math.min(dy, pH);
      panel.style.transform = `translateY(${clamped - pH}px)`;
      backdrop.style.background = `rgba(0,0,0,${0.35 * clamped / pH})`;
      backdrop.classList.add('open');
    } else {
      if (dy >= 0) return;
      const clamped = Math.max(dy, -pH);
      panel.style.transform = `translateY(${clamped}px)`;
      backdrop.style.background = `rgba(0,0,0,${0.35 * (1 + clamped / pH)})`;
    }
  }, { passive: true });

  document.addEventListener('touchend', e => {
    if (mDrag?.dragging) {
      const t = e.changedTouches[0];
      mSnapDragged(t.clientX, t.clientY);
      return;
    }
    if (!swiping) return;
    swiping = false;
    const pH = getPH();
    if (!swipeOnPanel) {
      snapCC(lastDy > pH * 0.32);
    } else {
      snapCC(lastDy > -pH * 0.32);
    }
  }, { passive: true });

  // Click status bar (desktop testing convenience)
  document.getElementById('m-statusbar').addEventListener('click', () => snapCC(!ccOpen));
  // Tap backdrop to close
  backdrop.addEventListener('click', () => { if (ccOpen) snapCC(false); });

  /* ── Mouse swipe for CC panel (PC testing) ────────────────── */
  let mouseSwiping     = false;
  let mouseSwipePanel  = false;
  let mouseStartY      = 0;
  let mouseLastDy      = 0;

  homescreen.addEventListener('mousedown', e => {
    if (ccOpen || mDrag) return;
    mouseSwiping = true; mouseSwipePanel = false;
    mouseStartY = e.clientY; mouseLastDy = 0;
  });

  panel.addEventListener('mousedown', e => {
    if (!ccOpen || e.target.closest('.m-cc-toggle, #m-cc-bright-track, .m-wifi-net-row, .m-wifi-pass-view')) return;
    mouseSwiping = true; mouseSwipePanel = true;
    mouseStartY = e.clientY; mouseLastDy = 0;
  });

  /* ── Brightness slider (touch + mouse) ───────────────────── */
  const brightTrack = document.getElementById('m-cc-bright-track');
  const brightFill  = document.getElementById('m-cc-bright-fill');
  let draggingBright = false;

  function setBrightness(clientX) {
    const rect = brightTrack.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    brightFill.style.width = (pct * 100) + '%';
  }

  brightTrack.addEventListener('touchstart', e => { draggingBright = true; setBrightness(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('touchmove',  e => { if (draggingBright) setBrightness(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('touchend',   () => { draggingBright = false; });

  brightTrack.addEventListener('mousedown', e => { draggingBright = true; setBrightness(e.clientX); });

  document.addEventListener('mousemove', e => {
    if (mDrag?.dragging) {
      const rect = document.getElementById('m-app-grid').getBoundingClientRect();
      mDrag.icon.style.left = (e.clientX - rect.left - 36) + 'px';
      mDrag.icon.style.top  = (e.clientY - rect.top  - 36) + 'px';
    }
    if (draggingBright) setBrightness(e.clientX);
    if (mouseSwiping) {
      const dy = e.clientY - mouseStartY;
      mouseLastDy = dy;
      const pH = getPH();
      if (!mouseSwipePanel) {
        if (dy <= 0) return;
        const clamped = Math.min(dy, pH);
        panel.style.transform = `translateY(${clamped - pH}px)`;
        backdrop.style.background = `rgba(0,0,0,${0.35 * clamped / pH})`;
        backdrop.classList.add('open');
      } else {
        if (dy >= 0) return;
        const clamped = Math.max(dy, -pH);
        panel.style.transform = `translateY(${clamped}px)`;
        backdrop.style.background = `rgba(0,0,0,${0.35 * (1 + clamped / pH)})`;
      }
    }
  });

  document.addEventListener('mouseup', e => {
    if (mDrag) {
      if (mDrag.dragging) {
        mSnapDragged(e.clientX, e.clientY);
      } else {
        clearTimeout(mDrag.holdTimer);
        const tap = mDrag.icon._onTap;
        mDrag = null;
        tap?.();
      }
    }
    draggingBright = false;
    if (mouseSwiping) {
      mouseSwiping = false;
      const pH = getPH();
      if (!mouseSwipePanel) {
        snapCC(mouseLastDy > pH * 0.32);
      } else {
        snapCC(mouseLastDy > -pH * 0.32);
      }
    }
  });

  /* ── Toggles (WiFi functional, others decorative) ─────────── */
  document.querySelectorAll('.m-cc-toggle').forEach(btn => {
    if (btn.id === 'm-cc-wifi-toggle') return;
    btn.addEventListener('click', () => btn.classList.toggle('active'));
  });

  /* ── Mobile WiFi panel ────────────────────────────────────── */
  const wifiToggle = document.getElementById('m-cc-wifi-toggle');
  const wifiSub    = document.getElementById('m-cc-wifi-sub');
  let wifiSubOpen  = false;
  let mobileWifiOn = true;

  function closeWifiSub() {
    wifiSubOpen = false;
    wifiSub.classList.add('m-hidden');
  }

  function mobileConnectToNetwork(net) {
    const prev = WIFI_NETWORKS.find(n => n.connected);
    if (prev && prev.ssid === "Gabe's Hotspot") hideMobileHL3Icon();
    WIFI_NETWORKS.forEach(n => { n.connected = false; });
    net.connected = true;
    if (net.ssid === "Gabe's Hotspot") revealMobileHL3Icon();
  }

  function signalBars(level) {
    let rects = '';
    for (let i = 1; i <= 4; i++) {
      const h   = 3 + (i - 1) * 3;
      const col = i <= level ? '#fff' : 'rgba(255,255,255,0.22)';
      rects += `<rect x="${(i-1)*5}" y="${16-h}" width="4" height="${h}" rx="1" fill="${col}"/>`;
    }
    return `<svg width="20" height="16" viewBox="0 0 20 16" style="flex-shrink:0">${rects}</svg>`;
  }

  function renderMobileWifiList() {
    wifiSub.innerHTML = '';
    if (!mobileWifiOn) return;

    const connected = WIFI_NETWORKS.find(n => n.connected);
    const available = WIFI_NETWORKS.filter(n => !n.connected);

    if (connected) {
      const row = document.createElement('div');
      row.className = 'm-wifi-connected';
      row.innerHTML = `<span class="m-wifi-check">✓</span><span>${connected.ssid}</span>`;
      wifiSub.appendChild(row);
    }

    available.forEach(net => {
      const row = document.createElement('div');
      row.className = 'm-wifi-net-row';
      row.innerHTML = `
        ${signalBars(net.signal)}
        <span class="m-wifi-ssid">${net.ssid}</span>
        <span class="m-wifi-lock">${net.secured ? '🔒' : ''}</span>
      `;
      row.addEventListener('click', () => {
        if (net.secured) {
          showMobilePassPrompt(net);
        } else {
          mobileConnectToNetwork(net);
          if (net.url) window.open(net.url, '_blank', 'noopener,noreferrer');
          renderMobileWifiList();
        }
      });
      wifiSub.appendChild(row);
    });
  }

  function showMobilePassPrompt(net) {
    wifiSub.innerHTML = '';
    const view = document.createElement('div');
    view.className = 'm-wifi-pass-view';
    view.innerHTML = `
      <div class="m-wifi-pass-header">
        <button class="m-wifi-back">&#8592;</button>
        <span>${net.ssid}</span>
      </div>
      <div class="m-wifi-pass-label">Network security key</div>
      <div class="m-wifi-pass-row">
        <input class="m-wifi-pass-input" type="password" placeholder="Password" autocomplete="off" spellcheck="false">
        <button class="m-wifi-eye-btn" type="button">&#128065;</button>
        <button class="m-wifi-pass-submit">Connect</button>
      </div>
      <div class="m-wifi-pass-error"></div>
    `;
    wifiSub.appendChild(view);

    const input  = view.querySelector('.m-wifi-pass-input');
    const error  = view.querySelector('.m-wifi-pass-error');
    const submit = view.querySelector('.m-wifi-pass-submit');
    const eye    = view.querySelector('.m-wifi-eye-btn');

    view.querySelector('.m-wifi-back').addEventListener('click', renderMobileWifiList);

    eye.addEventListener('mousedown',  e => { e.preventDefault(); input.type = 'text'; });
    eye.addEventListener('mouseup',    () => { input.type = 'password'; });
    eye.addEventListener('mouseleave', () => { input.type = 'password'; });
    eye.addEventListener('touchstart', e => { e.preventDefault(); input.type = 'text'; }, { passive: false });
    eye.addEventListener('touchend',   () => { input.type = 'password'; });

    function tryConnect() {
      const val = input.value.trim();
      const ok  = net.password
        ? val.toLowerCase() === net.password.toLowerCase()
        : val.length > 0;
      if (ok) {
        mobileConnectToNetwork(net);
        renderMobileWifiList();
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

  if (wifiToggle) {
    wifiToggle.addEventListener('click', () => {
      wifiSubOpen = !wifiSubOpen;
      wifiToggle.classList.toggle('active', wifiSubOpen);

      if (wifiSubOpen) {
        wifiSub.classList.remove('m-hidden');
        renderMobileWifiList();
      } else {
        closeWifiSub();
      }
    });
  }

})();
