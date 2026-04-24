/* ═══════════════════════════════════════════════════════════════
   TASKBAR
═══════════════════════════════════════════════════════════════ */
function updateTaskbar() {
  const center = document.getElementById('taskbar-center');
  center.innerHTML = '';

  // Social links that have been "launched" (URL opened)
  SOCIAL_LINKS.forEach(link => {
    const count = launchedLinks.get(link.id) || 0;
    if (!count) return;

    const classes = ['running', 'active'];
    if (count > 1) classes.push('multi');
    const btn = makeTbBtn(
      `https://cdn.simpleicons.org/${link.icon}/${link.color}`,
      link.label,
      classes
    );

    if (count > 1) {
      const badge = document.createElement('span');
      badge.className   = 'tb-badge';
      badge.textContent = count;
      btn.appendChild(badge);
    }

    // Double-click dismisses from taskbar
    btn.addEventListener('dblclick', () => {
      launchedLinks.delete(link.id);
      updateTaskbar();
    });

    center.appendChild(btn);
  });

  // Window-based apps currently open
  WINDOW_APPS.forEach(app => {
    const inst = winInstances[app.id] || [];
    if (!inst.length) return;

    const hasVisible = inst.some(w => !w.dataset.minimized);
    const classes    = ['running'];
    if (hasVisible)    classes.push('active');
    if (inst.length > 1) classes.push('multi');

    const btn = makeTbBtn(app.icon, app.title, classes);

    if (inst.length > 1) {
      const badge = document.createElement('span');
      badge.className   = 'tb-badge';
      badge.textContent = inst.length;
      btn.appendChild(badge);
    }

    btn.addEventListener('click', () => {
      if (inst.length === 1) {
        const w = inst[0];
        if (w.dataset.minimized)           restoreWindow(w);
        else if (w.classList.contains('focused')) minimizeWindow(w);
        else focusWin(w);
      } else {
        const visible = inst.filter(w => !w.dataset.minimized);
        if (!visible.length) { inst.forEach(restoreWindow); }
        else focusWin(visible[visible.length - 1]);
      }
      updateTaskbar();
    });

    // Double-click closes the whole stack
    btn.addEventListener('dblclick', () => {
      [...inst].forEach(w => closeWindow(w));
    });

    center.appendChild(btn);
  });
}

function makeTbBtn(iconSrc, label, classes) {
  const btn = document.createElement('div');
  btn.className = 'tb-app ' + classes.join(' ');
  btn.title     = label;
  const img     = document.createElement('img');
  img.src  = iconSrc;
  img.alt  = label;
  btn.appendChild(img);
  return btn;
}
