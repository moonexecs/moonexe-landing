/* ═══════════════════════════════════════════════════════════════
   SCROLL-TEST CONTENT
   Logic mirrors the reference Processing sketch (mouseScrollTest.pde):
   — draw() runs every frame, painting a fade overlay then a line from
     (prevX, prevY) → (x, y); x advances 1 px per frame.
   — mouseWheel only updates y; prevY is synced from y at end of each
     frame so each event produces exactly one diagonal tick. Between
     events the line is horizontal and fades to invisible on the dark bg.
═══════════════════════════════════════════════════════════════ */
function buildScrollTestContent() {
  const wrap = document.createElement('div');
  wrap.className = 'scroll-test-wrap';

  const canvas = document.createElement('canvas');
  wrap.appendChild(canvas);

  const infoBar = document.createElement('div');
  infoBar.className = 'scroll-test-info';
  const infoText = document.createElement('span');
  infoText.textContent = 'Scroll here · Solid ribbon = good wheel · Gaps = missed inputs';
  const resetBtn = document.createElement('button');
  resetBtn.className = 'scroll-test-reset';
  resetBtn.textContent = 'Reset';
  infoBar.appendChild(infoText);
  infoBar.appendChild(resetBtn);
  wrap.appendChild(infoBar);

  const ctx = canvas.getContext('2d');

  const TICK_H = 10;
  const BG     = 17;
  const FADE_A = 5 / 255;

  let x, prevX, y, prevY, penColor;

  function resetState() {
    const rect = wrap.getBoundingClientRect();
    const W = Math.round(rect.width);
    const H = Math.round(rect.height - infoBar.offsetHeight);
    if (W <= 0 || H <= 0) return;
    canvas.width  = W;
    canvas.height = H;
    x      = Math.round(W / 2);
    prevX  = x;
    y      = Math.round(H / 2);
    prevY  = y;
    penColor = null;
    ctx.fillStyle = `rgb(${BG},${BG},${BG})`;
    ctx.fillRect(0, 0, W, H);
  }

  const ro = new ResizeObserver(() => resetState());
  ro.observe(wrap);

  // Mirror Processing exactly: prevY = y before each event update.
  // If two events fire between frames, the first event's prevY gets overwritten
  // before draw() runs — that Y range is never drawn → visible gap.
  wrap.addEventListener('wheel', e => {
    e.preventDefault();
    const notches = e.deltaMode === 1 ? e.deltaY / 3 : e.deltaY / 100;
    if (Math.abs(notches) < 0.01) return;
    penColor = notches < 0 ? '#00ddff' : '#ff2277';
    prevY = y;
    y += notches * TICK_H;
    const H = canvas.height;
    if (y > H)      { y = 0;     prevY = y; }
    else if (y < 0) { y = H - 1; prevY = y; }
  }, { passive: false });

  resetBtn.addEventListener('click', e => {
    e.stopPropagation();
    resetState();
  });

  function animate() {
    if (!document.contains(canvas)) return;

    const W = canvas.width;
    const H = canvas.height;
    if (W <= 0 || H <= 0) { requestAnimationFrame(animate); return; }

    // Fade overlay
    ctx.fillStyle = `rgba(${BG},${BG},${BG},${FADE_A})`;
    ctx.fillRect(0, 0, W, H);

    if (penColor !== null) {
      ctx.strokeStyle = penColor;
      ctx.lineWidth   = 3;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Only prevX advances each frame — prevY is owned by the wheel handler.
    // This is the exact Processing model: prevx=x; x=x+1 in draw(), no prevy update.
    prevX = x;
    x += 1;
    if (x > W) { x = 0; prevX = x; }

    requestAnimationFrame(animate);
  }

  setTimeout(() => {
    resetState();
    requestAnimationFrame(animate);
  }, 0);

  return wrap;
}
