function buildSpecsTree() {
  const wrap = document.createElement('div');
  wrap.className = 'specs-tree';

  const hdr = document.createElement('div');
  hdr.className   = 'specs-tree-header';
  hdr.textContent = 'This PC';
  wrap.appendChild(hdr);

  SPECS_TREE.forEach(cat => {
    const catEl   = document.createElement('div');
    catEl.className = 'specs-cat';

    const row = document.createElement('div');
    row.className = 'specs-cat-row';
    row.innerHTML = `
      <span class="specs-arrow">▾</span>
      <img class="specs-cat-icon" src="${cat.iconSrc}" alt="">
      <span>${cat.category}</span>
    `;

    const children = document.createElement('div');
    children.className = 'specs-children';

    cat.items.forEach(item => {
      const leaf = document.createElement('div');
      leaf.className   = 'specs-leaf';
      leaf.textContent = item;
      children.appendChild(leaf);
    });

    row.addEventListener('click', () => {
      const collapsed = row.querySelector('.specs-arrow').classList.toggle('collapsed');
      children.classList.toggle('hidden', collapsed);
    });

    catEl.appendChild(row);
    catEl.appendChild(children);
    wrap.appendChild(catEl);
  });

  return wrap;
}
