/* ═══════════════════════════════════════════════════════════════
   NOTEPAD CONTENT
═══════════════════════════════════════════════════════════════ */
const NOTEPAD_MENUS = {
  File: [
    { label: 'New',             sc: 'Ctrl+N' },
    { label: 'New window',      sc: 'Ctrl+Shift+N' },
    { label: 'Open...',         sc: 'Ctrl+O' },
    { label: 'Save',            sc: 'Ctrl+S' },
    { label: 'Save as...',      sc: 'Ctrl+Shift+S' },
    null,
    { label: 'Page setup...' },
    { label: 'Print...',        sc: 'Ctrl+P' },
    null,
    { label: 'Exit' },
  ],
  Edit: [
    { label: 'Undo',            sc: 'Ctrl+Z' },
    null,
    { label: 'Cut',             sc: 'Ctrl+X' },
    { label: 'Copy',            sc: 'Ctrl+C' },
    { label: 'Paste',           sc: 'Ctrl+V' },
    { label: 'Delete',          sc: 'Del' },
    null,
    { label: 'Find...',         sc: 'Ctrl+F' },
    { label: 'Find next',       sc: 'F3' },
    { label: 'Find previous',   sc: 'Shift+F3' },
    { label: 'Replace...',      sc: 'Ctrl+H' },
    { label: 'Go to...',        sc: 'Ctrl+G' },
    null,
    { label: 'Select all',      sc: 'Ctrl+A' },
    { label: 'Time/Date',       sc: 'F5' },
  ],
  Format: [
    { label: 'Word wrap' },
    { label: 'Font...' },
  ],
  View: [
    { label: 'Zoom in',               sc: 'Ctrl+Plus' },
    { label: 'Zoom out',              sc: 'Ctrl+Minus' },
    { label: 'Restore default zoom',  sc: 'Ctrl+0' },
    null,
    { label: 'Status bar' },
  ],
  Help: [
    { label: 'View Help' },
    { label: 'Send Feedback' },
    null,
    { label: 'About Notepad' },
  ],
};

function buildNotepadContent() {
  const wrap = document.createElement('div');
  wrap.className = 'notepad-wrap';

  // Menu bar
  const menubar = document.createElement('div');
  menubar.className = 'notepad-menubar';

  Object.entries(NOTEPAD_MENUS).forEach(([name, items]) => {
    const menuEl = document.createElement('div');
    menuEl.className = 'notepad-menu';

    const label = document.createElement('div');
    label.className = 'notepad-menu-label';
    label.textContent = name;

    const dropdown = document.createElement('div');
    dropdown.className = 'notepad-dropdown';

    items.forEach(item => {
      if (!item) {
        const sep = document.createElement('div');
        sep.className = 'notepad-dd-sep';
        dropdown.appendChild(sep);
      } else {
        const row = document.createElement('div');
        row.className = 'notepad-dd-item';
        const lbl = document.createElement('span');
        lbl.textContent = item.label;
        row.appendChild(lbl);
        if (item.sc) {
          const sc = document.createElement('span');
          sc.className = 'notepad-dd-sc';
          sc.textContent = item.sc;
          row.appendChild(sc);
        }
        dropdown.appendChild(row);
      }
    });

    label.addEventListener('mousedown', e => {
      e.stopPropagation();
      const isOpen = menuEl.classList.contains('open');
      // Close all
      document.querySelectorAll('.notepad-menu.open').forEach(m => m.classList.remove('open'));
      if (!isOpen) menuEl.classList.add('open');
    });

    menuEl.appendChild(label);
    menuEl.appendChild(dropdown);
    menubar.appendChild(menuEl);
  });

  // Content area — selectable but not editable
  // Read the textarea here (lazily), so it's guaranteed to be in the DOM
  const NOTEPAD_CONTENT = (document.getElementById('notepad-src') || { value: '' }).value;
  const content = document.createElement('div');
  content.className = 'notepad-content-area';
  content.textContent = NOTEPAD_CONTENT;

  wrap.appendChild(menubar);
  wrap.appendChild(content);
  return wrap;
}

function buildWjtContent() {
  const wrap = document.createElement('div');
  wrap.className = 'notepad-wrap';

  const menubar = document.createElement('div');
  menubar.className = 'notepad-menubar';

  Object.entries(NOTEPAD_MENUS).forEach(([name, items]) => {
    const menuEl = document.createElement('div');
    menuEl.className = 'notepad-menu';

    const label = document.createElement('div');
    label.className = 'notepad-menu-label';
    label.textContent = name;

    const dropdown = document.createElement('div');
    dropdown.className = 'notepad-dropdown';

    items.forEach(item => {
      if (!item) {
        const sep = document.createElement('div');
        sep.className = 'notepad-dd-sep';
        dropdown.appendChild(sep);
      } else {
        const row = document.createElement('div');
        row.className = 'notepad-dd-item';
        const lbl = document.createElement('span');
        lbl.textContent = item.label;
        row.appendChild(lbl);
        if (item.sc) {
          const sc = document.createElement('span');
          sc.className = 'notepad-dd-sc';
          sc.textContent = item.sc;
          row.appendChild(sc);
        }
        dropdown.appendChild(row);
      }
    });

    label.addEventListener('mousedown', e => {
      e.stopPropagation();
      const isOpen = menuEl.classList.contains('open');
      document.querySelectorAll('.notepad-menu.open').forEach(m => m.classList.remove('open'));
      if (!isOpen) menuEl.classList.add('open');
    });

    menuEl.appendChild(label);
    menuEl.appendChild(dropdown);
    menubar.appendChild(menuEl);
  });

  const WJT_CONTENT = (document.getElementById('wjt-src') || { value: '' }).value;
  const content = document.createElement('div');
  content.className = 'notepad-content-area';
  content.textContent = WJT_CONTENT;

  wrap.appendChild(menubar);
  wrap.appendChild(content);
  return wrap;
}

function buildAboutContent() {
  const wrap = document.createElement('div');
  wrap.className = 'notepad-wrap';

  const menubar = document.createElement('div');
  menubar.className = 'notepad-menubar';

  Object.entries(NOTEPAD_MENUS).forEach(([name, items]) => {
    const menuEl = document.createElement('div');
    menuEl.className = 'notepad-menu';

    const label = document.createElement('div');
    label.className = 'notepad-menu-label';
    label.textContent = name;

    const dropdown = document.createElement('div');
    dropdown.className = 'notepad-dropdown';

    items.forEach(item => {
      if (!item) {
        const sep = document.createElement('div');
        sep.className = 'notepad-dd-sep';
        dropdown.appendChild(sep);
      } else {
        const row = document.createElement('div');
        row.className = 'notepad-dd-item';
        const lbl = document.createElement('span');
        lbl.textContent = item.label;
        row.appendChild(lbl);
        if (item.sc) {
          const sc = document.createElement('span');
          sc.className = 'notepad-dd-sc';
          sc.textContent = item.sc;
          row.appendChild(sc);
        }
        dropdown.appendChild(row);
      }
    });

    label.addEventListener('mousedown', e => {
      e.stopPropagation();
      const isOpen = menuEl.classList.contains('open');
      document.querySelectorAll('.notepad-menu.open').forEach(m => m.classList.remove('open'));
      if (!isOpen) menuEl.classList.add('open');
    });

    menuEl.appendChild(label);
    menuEl.appendChild(dropdown);
    menubar.appendChild(menuEl);
  });

  const ABOUT_CONTENT = (document.getElementById('about-src') || { value: '' }).value;
  const content = document.createElement('div');
  content.className = 'notepad-content-area';
  content.textContent = ABOUT_CONTENT;

  wrap.appendChild(menubar);
  wrap.appendChild(content);
  return wrap;
}
