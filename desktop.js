/* ═══════════════════════════════════════════════════════════════
   DESKTOP ICONS
═══════════════════════════════════════════════════════════════ */
function createDesktopIcon({ id, label, iconSrc, onDblClick }) {
  const el  = document.createElement('div');
  el.className  = 'desk-icon';
  el.dataset.id = id;

  const img = document.createElement('img');
  img.className    = 'desk-icon__img';
  img.src          = iconSrc;
  img.alt          = label;
  img.draggable    = false;

  const span = document.createElement('span');
  span.className   = 'desk-icon__label';
  span.textContent = label;

  el.appendChild(img);
  el.appendChild(span);

  // Position
  const pos = ICON_POSITIONS[id] || { x: 24, y: 24 };
  el.style.left = pos.x + 'px';
  el.style.top  = pos.y + 'px';

  el.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    e.stopPropagation();
    const group = [...document.querySelectorAll('.desk-icon.selected')];
    if (group.length > 1 && el.classList.contains('selected')) {
      initGroupDrag(group, e);
    } else {
      selectIcon(el);
      initIconDrag(el, e);
    }
  });

  el.addEventListener('dblclick', e => { e.preventDefault(); onDblClick(); });

  document.getElementById('desktop').appendChild(el);
}

function selectIcon(el) {
  if (selectedIcon && selectedIcon !== el) selectedIcon.classList.remove('selected');
  selectedIcon = el;
  el.classList.add('selected');
}

document.getElementById('desktop').addEventListener('mousedown', e => {
  // Only start rubber-band when clicking the bare desktop (not an icon)
  if (e.button !== 0) return;
  const desktop = document.getElementById('desktop');
  if (e.target !== desktop && e.target !== document.getElementById('select-box')) return;

  // Deselect any currently selected icon
  if (selectedIcon) { selectedIcon.classList.remove('selected'); selectedIcon = null; }

  const box    = document.getElementById('select-box');
  const dRect  = desktop.getBoundingClientRect();
  const startX = e.clientX - dRect.left;
  const startY = e.clientY - dRect.top;

  box.style.display = 'block';
  box.style.left   = startX + 'px';
  box.style.top    = startY + 'px';
  box.style.width  = '0px';
  box.style.height = '0px';

  function onMove(e) {
    const curX = e.clientX - dRect.left;
    const curY = e.clientY - dRect.top;
    const x = Math.min(startX, curX), y = Math.min(startY, curY);
    const w = Math.abs(curX - startX),  h = Math.abs(curY - startY);
    box.style.left   = x + 'px';
    box.style.top    = y + 'px';
    box.style.width  = w + 'px';
    box.style.height = h + 'px';

    // Highlight icons that intersect the selection rect
    const selRect = { x, y, right: x + w, bottom: y + h };
    desktop.querySelectorAll('.desk-icon').forEach(icon => {
      const iRect = icon.getBoundingClientRect();
      const il = iRect.left - dRect.left, it = iRect.top - dRect.top;
      const ir = il + iRect.width,        ib = it + iRect.height;
      const hit = ir > selRect.x && il < selRect.right && ib > selRect.y && it < selRect.bottom;
      icon.classList.toggle('selected', hit);
    });
  }

  function onUp() {
    box.style.display = 'none';
    // Keep the last intersecting set selected; clear selectedIcon single-select ref
    selectedIcon = null;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onUp);
  }

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onUp);
});

// Grid cell size in px — icons snap to this on drop.
// Must be ≥ icon width (80px) to prevent overlap.
const ICON_GRID = 88;
const ICON_TOP_BUMPER  = 10; // must match y offset in ICON_POSITIONS
const ICON_LEFT_BUMPER = 10; // must match x offset in ICON_POSITIONS

function snapToGrid(val) {
  return Math.round(val / ICON_GRID) * ICON_GRID;
}

function initIconDrag(el, startE) {
  const desk  = document.getElementById('desktop');
  let moved   = false;
  const sx    = startE.clientX;
  const sy    = startE.clientY;
  const origL = parseInt(el.style.left) || 0;
  const origT = parseInt(el.style.top)  || 0;

  function onMove(e) {
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (!moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
    moved = true;
    el.classList.add('dragging');
    // Follow cursor freely while dragging — snap happens on release
    const dW = desk.offsetWidth, dH = desk.offsetHeight;
    el.style.left = Math.max(0, Math.min(origL + dx, dW - el.offsetWidth))  + 'px';
    el.style.top  = Math.max(0, Math.min(origT + dy, dH - el.offsetHeight)) + 'px';
  }

  function onUp() {
    el.classList.remove('dragging');
    if (moved) {
      const dW  = desk.offsetWidth, dH = desk.offsetHeight;
      const rawL = parseInt(el.style.left) || 0;
      const rawT = parseInt(el.style.top)  || 0;
      const targetL = Math.max(ICON_LEFT_BUMPER, Math.min(snapToGrid(rawL - ICON_LEFT_BUMPER) + ICON_LEFT_BUMPER, dW - el.offsetWidth));
      const targetT = Math.max(ICON_TOP_BUMPER,  Math.min(snapToGrid(rawT - ICON_TOP_BUMPER)  + ICON_TOP_BUMPER,  dH - el.offsetHeight));

      // Collect occupied cells (excluding the icon being dragged)
      const occupied = new Set();
      desk.querySelectorAll('.desk-icon:not(.dragging)').forEach(icon => {
        if (icon === el) return;
        occupied.add(`${parseInt(icon.style.left)||0},${parseInt(icon.style.top)||0}`);
      });

      // BFS outward from target cell to find nearest free cell
      let finalL = targetL, finalT = targetT;
      if (occupied.has(`${targetL},${targetT}`)) {
        const queue = [[targetL, targetT]];
        const seen  = new Set([`${targetL},${targetT}`]);
        let found   = false;
        outer: while (queue.length) {
          const [cl, ct] = queue.shift();
          for (const [dl, dt] of [[0,-ICON_GRID],[0,ICON_GRID],[-ICON_GRID,0],[ICON_GRID,0],
                                   [-ICON_GRID,-ICON_GRID],[-ICON_GRID,ICON_GRID],[ICON_GRID,-ICON_GRID],[ICON_GRID,ICON_GRID]]) {
            const nl = cl + dl, nt = ct + dt;
            const key = `${nl},${nt}`;
            if (seen.has(key)) continue;
            seen.add(key);
            if (nl < ICON_LEFT_BUMPER || nt < ICON_TOP_BUMPER || nl > dW - el.offsetWidth || nt > dH - el.offsetHeight) continue;
            if (!occupied.has(key)) { finalL = nl; finalT = nt; found = true; break outer; }
            queue.push([nl, nt]);
          }
        }
      }

      el.style.transition = 'left 0.12s ease, top 0.12s ease';
      el.style.left = finalL + 'px';
      el.style.top  = finalT + 'px';
      setTimeout(() => { el.style.transition = ''; }, 150);
    }
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onUp);
  }

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onUp);
}

function initGroupDrag(icons, startE) {
  const desk = document.getElementById('desktop');
  let moved = false;
  const sx = startE.clientX, sy = startE.clientY;
  const origPositions = icons.map(icon => ({
    icon,
    origL: parseInt(icon.style.left) || 0,
    origT: parseInt(icon.style.top)  || 0,
  }));

  function onMove(e) {
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (!moved && Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
    moved = true;
    const dW = desk.offsetWidth, dH = desk.offsetHeight;
    origPositions.forEach(({ icon, origL, origT }) => {
      icon.classList.add('dragging');
      icon.style.left = Math.max(0, Math.min(origL + dx, dW - icon.offsetWidth))  + 'px';
      icon.style.top  = Math.max(0, Math.min(origT + dy, dH - icon.offsetHeight)) + 'px';
    });
  }

  function onUp() {
    origPositions.forEach(({ icon }) => icon.classList.remove('dragging'));
    if (moved) {
      const dW = desk.offsetWidth, dH = desk.offsetHeight;
      const groupSet = new Set(icons);

      // Collect cells occupied by non-group icons
      const occupied = new Set();
      desk.querySelectorAll('.desk-icon').forEach(icon => {
        if (groupSet.has(icon)) return;
        occupied.add(`${parseInt(icon.style.left)||0},${parseInt(icon.style.top)||0}`);
      });

      // Place each group icon; track already-claimed cells so group members don't collide
      const claimed = new Set(occupied);
      origPositions.forEach(({ icon }) => {
        const rawL = parseInt(icon.style.left) || 0;
        const rawT = parseInt(icon.style.top)  || 0;
        const targetL = Math.max(ICON_LEFT_BUMPER, Math.min(snapToGrid(rawL - ICON_LEFT_BUMPER) + ICON_LEFT_BUMPER, dW - icon.offsetWidth));
        const targetT = Math.max(ICON_TOP_BUMPER,  Math.min(snapToGrid(rawT - ICON_TOP_BUMPER)  + ICON_TOP_BUMPER,  dH - icon.offsetHeight));

        let finalL = targetL, finalT = targetT;
        if (claimed.has(`${targetL},${targetT}`)) {
          const queue = [[targetL, targetT]];
          const seen  = new Set([`${targetL},${targetT}`]);
          outer: while (queue.length) {
            const [cl, ct] = queue.shift();
            for (const [dl, dt] of [[0,-ICON_GRID],[0,ICON_GRID],[-ICON_GRID,0],[ICON_GRID,0],
                                     [-ICON_GRID,-ICON_GRID],[-ICON_GRID,ICON_GRID],[ICON_GRID,-ICON_GRID],[ICON_GRID,ICON_GRID]]) {
              const nl = cl + dl, nt = ct + dt;
              const key = `${nl},${nt}`;
              if (seen.has(key)) continue;
              seen.add(key);
              if (nl < ICON_LEFT_BUMPER || nt < ICON_TOP_BUMPER || nl > dW - icon.offsetWidth || nt > dH - icon.offsetHeight) continue;
              if (!claimed.has(key)) { finalL = nl; finalT = nt; break outer; }
              queue.push([nl, nt]);
            }
          }
        }

        claimed.add(`${finalL},${finalT}`);
        icon.style.transition = 'left 0.12s ease, top 0.12s ease';
        icon.style.left = finalL + 'px';
        icon.style.top  = finalT + 'px';
        setTimeout(() => { icon.style.transition = ''; }, 150);
      });
    }
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup',   onUp);
  }

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup',   onUp);
}
