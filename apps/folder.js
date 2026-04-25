/* ═══════════════════════════════════════════════════════════════
   FOLDER / FILE EXPLORER CONTENT
═══════════════════════════════════════════════════════════════ */
function buildFolderContent(folderApp) {
  const project1App = WINDOW_APPS.find(a => a.id === 'project1');

  const wrap = document.createElement('div');
  wrap.className = 'fe-wrap';

  // Command bar
  const cmdBar = document.createElement('div');
  cmdBar.className = 'fe-cmdbar';
  ['New', 'Cut', 'Copy', 'Paste', 'Delete', 'Rename'].forEach(label => {
    const btn = document.createElement('button');
    btn.className = 'fe-cmd-btn';
    btn.textContent = label;
    btn.disabled = true;
    cmdBar.appendChild(btn);
  });
  wrap.appendChild(cmdBar);

  // Navigation bar
  const navBar = document.createElement('div');
  navBar.className = 'fe-navbar';

  const navBtns = document.createElement('div');
  navBtns.className = 'fe-nav-btns';
  navBtns.innerHTML = `
    <button class="fe-nav-btn" disabled title="Back">
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
    </button>
    <button class="fe-nav-btn" disabled title="Forward">
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
    </button>
    <button class="fe-nav-btn" disabled title="Up">
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
    </button>
  `;

  const addrBar = document.createElement('div');
  addrBar.className = 'fe-addr-bar';
  addrBar.innerHTML = `
    <svg class="fe-addr-icon" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="#FFB900"/>
    </svg>
    <span class="fe-addr-text">
      <span class="fe-addr-seg">This PC</span>
      <span class="fe-addr-sep"> › </span>
      <span class="fe-addr-seg fe-addr-seg--current">projects</span>
    </span>
  `;

  navBar.appendChild(navBtns);
  navBar.appendChild(addrBar);
  wrap.appendChild(navBar);

  // Body: sidebar + main
  const body = document.createElement('div');
  body.className = 'fe-body';

  const sidebar = document.createElement('div');
  sidebar.className = 'fe-sidebar';
  sidebar.innerHTML = `
    <div class="fe-sidebar-section">
      <div class="fe-sidebar-header">Quick access</div>
      <div class="fe-sidebar-item"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg><span>Desktop</span></div>
      <div class="fe-sidebar-item"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg><span>Downloads</span></div>
      <div class="fe-sidebar-item"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/></svg><span>Documents</span></div>
      <div class="fe-sidebar-item"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg><span>Pictures</span></div>
    </div>
    <div class="fe-sidebar-section">
      <div class="fe-sidebar-header">This PC</div>
      <div class="fe-sidebar-item"><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg><span>This PC</span></div>
    </div>
  `;

  const main = document.createElement('div');
  main.className = 'fe-main';

  const fileIcon = document.createElement('div');
  fileIcon.className = 'fe-file-icon';
  fileIcon.innerHTML = `
    <img src="txtfile.png" alt="README" draggable="false">
    <span>README</span>
  `;

  let feLastTap = 0;
  fileIcon.addEventListener('click', () => {
    const now = Date.now();
    if (now - feLastTap < 400) {
      if (project1App) openWindow(project1App);
      feLastTap = 0;
    } else {
      feLastTap = now;
    }
  });

  main.appendChild(fileIcon);

  const scrollTestApp = WINDOW_APPS.find(a => a.id === 'scroll-test');
  const scrollTestIcon = document.createElement('div');
  scrollTestIcon.className = 'fe-file-icon';
  scrollTestIcon.innerHTML = `
    <img src="scrollTest.png" alt="Scroll-Test" draggable="false">
    <span>Scroll-Test</span>
  `;
  let stLastTap = 0;
  scrollTestIcon.addEventListener('click', () => {
    const now = Date.now();
    if (now - stLastTap < 400) {
      if (scrollTestApp) openWindow(scrollTestApp);
      stLastTap = 0;
    } else {
      stLastTap = now;
    }
  });
  main.appendChild(scrollTestIcon);

  const bindGenApp = WINDOW_APPS.find(a => a.id === 'bind-gen');
  const bindGenIcon = document.createElement('div');
  bindGenIcon.className = 'fe-file-icon';
  bindGenIcon.innerHTML = `
    <img src="chatbindGen.png" alt="Chat Bind Gen" draggable="false">
    <span>Chat Bind Gen</span>
  `;
  let bgLastTap = 0;
  bindGenIcon.addEventListener('click', () => {
    const now = Date.now();
    if (now - bgLastTap < 400) {
      if (bindGenApp) openWindow(bindGenApp);
      bgLastTap = 0;
    } else {
      bgLastTap = now;
    }
  });
  main.appendChild(bindGenIcon);

  const cfgGenApp = WINDOW_APPS.find(a => a.id === 'cfg-gen');
  const cfgGenIcon = document.createElement('div');
  cfgGenIcon.className = 'fe-file-icon';
  cfgGenIcon.innerHTML = `
    <img src="cfgGen.png" alt="CS2 Config Gen" draggable="false">
    <span>CS2 Config Gen</span>
  `;
  let cfgLastTap = 0;
  cfgGenIcon.addEventListener('click', () => {
    const now = Date.now();
    if (now - cfgLastTap < 400) {
      if (cfgGenApp) openWindow(cfgGenApp);
      cfgLastTap = 0;
    } else {
      cfgLastTap = now;
    }
  });
  main.appendChild(cfgGenIcon);

  body.appendChild(sidebar);
  body.appendChild(main);
  wrap.appendChild(body);

  // Status bar
  const statusBar = document.createElement('div');
  statusBar.className = 'fe-statusbar';
  statusBar.textContent = '4 items';
  wrap.appendChild(statusBar);

  return wrap;
}
