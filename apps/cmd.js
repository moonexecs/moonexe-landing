/* ═══════════════════════════════════════════════════════════════
   CMD TERMINAL CONTENT
═══════════════════════════════════════════════════════════════ */
function buildCmdContent() {
  const body = document.createElement('div');
  body.className = 'cmd-body';

  // Current input row
  const inputRow = document.createElement('div');
  inputRow.className = 'cmd-input-row';

  const promptSpan = document.createElement('span');
  promptSpan.className = 'cmd-prompt-span';
  promptSpan.innerHTML = '<span class="cmd-ps-user">user@moonexe</span><span class="cmd-ps-colon">:</span><span class="cmd-ps-path">~</span><span class="cmd-ps-dollar">$ </span>';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'cmd-input';
  input.autocomplete = 'off';
  input.spellcheck = false;

  inputRow.appendChild(promptSpan);
  inputRow.appendChild(input);
  body.appendChild(inputRow);

  // Click anywhere on the terminal body to focus the input
  body.addEventListener('click', () => input.focus());

  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const cmd = input.value;
    input.value = '';

    // Move input row out, echo the typed line as history
    body.removeChild(inputRow);

    const echoLine = document.createElement('div');
    echoLine.className = 'cmd-line';
    echoLine.innerHTML = '<span class="cmd-ps-user">user@moonexe</span><span class="cmd-ps-colon">:</span><span class="cmd-ps-path">~</span><span class="cmd-ps-dollar">$ </span>';
    echoLine.appendChild(document.createTextNode(cmd));
    body.appendChild(echoLine);

    if (cmd.trim() === 'ping') {
      const resp = document.createElement('div');
      resp.className = 'cmd-line';
      resp.textContent = 'Pong.';
      body.appendChild(resp);
    }

    if (cmd.trim() === 'get pconfig') {
      const resp = document.createElement('div');
      resp.className = 'cmd-line';
      resp.textContent = '\nInitializing secure channel...\n Loading Config.\n  Opening accessed file.\n';
      body.appendChild(resp);

      const notepadApp = WINDOW_APPS.find(a => a.id === 'notepad');
      if (notepadApp) {
        const existing = winInstances[notepadApp.id];
        if (existing && existing.length > 0) {
          const w = existing[0];
          if (w.dataset.minimized) restoreWindow(w); else focusWin(w);
        } else {
          openWindow(notepadApp);
        }
      }
    }

    if (cmd.trim() === 'get wjt') {
      const resp = document.createElement('div');
      resp.className = 'cmd-line';
      resp.textContent = '\nInitializing secure channel...\n Loading Config.\n  Opening accessed file.\n';
      body.appendChild(resp);

      const wjtApp = WINDOW_APPS.find(a => a.id === 'wjt');
      if (wjtApp) {
        const existing = winInstances[wjtApp.id];
        if (existing && existing.length > 0) {
          const w = existing[0];
          if (w.dataset.minimized) restoreWindow(w); else focusWin(w);
        } else {
          openWindow(wjtApp);
        }
      }
    }

    // Re-append the input row (new prompt line)
    body.appendChild(inputRow);

    // Scroll the win__content container to the bottom
    const winContent = body.parentElement;
    if (winContent) winContent.scrollTop = winContent.scrollHeight;

    input.focus();
  });

  requestAnimationFrame(() => input.focus());
  return body;
}
