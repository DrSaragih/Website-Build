import './enhancements.css';
import { floors, categoryNames } from './directory-data.js';

const allTenants = [...new Map(floors.flatMap(floor => floor.units).map(tenant => [tenant.logo, tenant])).values()];
const path = location.pathname;
const logo = tenant => `<img src="/logos/${tenant.logo}.svg" alt="${tenant.name}" width="110" height="48" loading="lazy">`;

function brandSection() {
  const section = document.createElement('section');
  section.className = 'brand-section';
  section.setAttribute('aria-label', 'Koleksi logo brand');
  section.innerHTML = `<div class="brand-section-heading"><div><span class="eyebrow">THE BRAND EDIT</span><h2>Nama yang akrab.<br><em>Cerita yang baru.</em></h2></div><div><p>Gaya, rasa, dan inspirasi untuk hari Anda.</p><small>Koleksi logo brand · konten demo directory.</small><button class="motion-toggle" aria-pressed="false">Jeda animasi</button></div></div><div class="logo-marquees">${[0, 1].map(row => {
    const tenants = allTenants.slice(row * 6, row * 6 + 6);
    const group = `<div class="logo-group">${tenants.map(t => `<span class="brand-logo">${logo(t)}</span>`).join('')}</div>`;
    const duplicate = `<div class="logo-group" aria-hidden="true">${tenants.map(t => `<span class="brand-logo"><img src="/logos/${t.logo}.svg" alt="" width="110" height="48" loading="lazy"></span>`).join('')}</div>`;
    return `<div class="logo-window"><div class="logo-track ${row ? 'reverse' : ''}">${group}${duplicate}</div></div>`;
  }).join('')}</div>`;
  section.querySelector('.motion-toggle').onclick = event => {
    const paused = section.classList.toggle('paused');
    event.currentTarget.setAttribute('aria-pressed', String(paused));
    event.currentTarget.textContent = paused ? 'Lanjutkan animasi' : 'Jeda animasi';
  };
  return section;
}

const historyMarkup = `<div class="story-heading"><span class="eyebrow">OUR STORY · 23 PASKAL</span><h2>Berakar di Bandung.<br><em>Dekat di hati.</em></h2><p>Lebih dari tempat berbelanja. Sebuah titik temu di tengah kota, tempat cerita sehari-hari saling berjumpa.</p></div><div class="history-layout"><figure><img src="/images/mall-retail.webp" alt="Ilustrasi fotografis koridor retail mall dengan cahaya alami" loading="lazy" width="1536" height="1024"><figcaption>Ilustrasi fotografis konseptual · bukan foto asli 23 Paskal.</figcaption></figure><div class="history-timeline"><article><span>2017</span><h3>A new chapter begins.</h3><p>23 Paskal Shopping Center dibuka pada 21 April 2017, menambah destinasi belanja di kawasan Paskal Hyper Square, Bandung.</p></article><article><span>THE PLACE</span><h3>In the heart of the city.</h3><p>Berada di Jalan Pasir Kaliki, 23 Paskal menjadi bagian dari pengalaman menikmati kawasan pusat kota Bandung.</p></article><article><span>THE EXPERIENCE</span><h3>Everyday, together.</h3><p>Belanja, kuliner, dan waktu bersama menjadi benang merah cerita yang ingin dihadirkan melalui website ini.</p></article><a class="history-source" href="https://id.wikipedia.org/wiki/23_Paskal_Shopping_Center" target="_blank" rel="noopener noreferrer">Referensi sejarah: 23 Paskal Shopping Center ↗</a></div></div>`;

if (path.endsWith('/mall.html')) {
  const section = document.querySelector('#mall');
  section.className = 'section mall-story';
  section.innerHTML = historyMarkup;
  section.after(brandSection());
}

if (path.endsWith('/directory.html')) {
  const section = document.querySelector('#directory');
  section.innerHTML = `<div class="section-kicker"><span>FIND YOUR PLACE</span><span>FLOOR DIRECTORY</span></div><div class="directory-heading"><div><h2>Setiap lantai,<br><em>ada favorit baru.</em></h2><p>Dari satu tujuan ke penemuan berikutnya. Pilih lantai dan klik brand untuk melihat letaknya.</p></div><label class="directory-search"><span>Cari tenant</span><input type="search" id="floor-search" placeholder="Nama brand…" autocomplete="off"></label></div><p class="directory-notice">Demo directory · Data tenant dan denah merupakan ilustrasi untuk menjelajahi fitur website.</p><div class="floor-controls"><div class="floor-tabs" role="tablist" aria-label="Pilih lantai">${floors.map((floor, i) => `<button id="tab-${floor.id}" role="tab" aria-selected="${i === 0}" aria-controls="floor-panel" tabindex="${i === 0 ? 0 : -1}" data-floor="${floor.id}"><span>${floor.id === 'GF' ? 'GF' : `L${floor.id}`}</span>${floor.label}</button>`).join('')}</div><div class="directory-categories" role="group" aria-label="Kategori tenant"><button data-category="all" aria-pressed="true">Semua</button>${Object.entries(categoryNames).map(([key, label]) => `<button data-category="${key}" aria-pressed="false">${label}</button>`).join('')}</div></div><div class="floor-directory" id="floor-panel" role="tabpanel" aria-labelledby="tab-GF"><div class="map-column"><div class="map-heading"><div><span class="eyebrow">YOU’RE EXPLORING</span><h3 id="floor-title"></h3></div><button class="expand-map" type="button">Perbesar denah ↗</button></div><div class="floor-plan" id="floor-plan" role="group" aria-label="Unit tenant pada denah"></div><div class="map-legend"><span><i></i> Tenant</span><span><i class="selected-key"></i> Dipilih</span><span>ESC · Eskalator</span><span>WC · Toilet</span></div><div class="floor-detail" id="floor-detail" aria-live="polite"></div></div><aside class="tenant-list-column"><div class="tenant-list-heading"><h3>Temukan di sini</h3><span id="tenant-count" role="status" aria-live="polite"></span></div><div id="floor-tenant-list"></div></aside></div><div class="directory-footer"><p>Butuh bantuan menemukan lokasi?<br>Konfirmasikan lokasi terbaru di pusat informasi mall.</p><a class="text-link" href="/mall.html#visit">Plan your visit <span>↗</span></a></div>`;

  const zoomDialog = document.createElement('dialog');
  zoomDialog.className = 'plan-dialog';
  zoomDialog.innerHTML = `<div class="plan-dialog-header"><div><span class="eyebrow">EXPLORE EVERY CORNER</span><h2>Denah tenant</h2></div><button class="close-plan" aria-label="Tutup denah">×</button></div><label class="zoom-floor-label">Pilih lantai <select id="zoom-floor">${floors.map((floor,i)=>`<option value="${i}">${floor.label}</option>`).join('')}</select></label><div class="zoom-plan-scroll"><div class="floor-plan zoom-plan" role="group" aria-label="Denah lantai diperbesar"></div></div><p class="zoom-selected" aria-live="polite"></p><small>Denah dan posisi tenant merupakan data dummy. Geser denah ke samping pada layar kecil.</small>`;
  section.append(zoomDialog);
  zoomDialog.querySelector('.close-plan').onclick = () => zoomDialog.close();
  zoomDialog.addEventListener('click', event => { if (event.target === zoomDialog) zoomDialog.close(); });
  section.querySelector('.expand-map').onclick = () => { zoomDialog.showModal(); syncZoom(); };
  function syncZoom() {
    if (!zoomDialog.open) return;
    zoomDialog.querySelector('.zoom-plan').innerHTML = section.querySelector('#floor-plan').innerHTML;
    zoomDialog.querySelector('#zoom-floor').value = String(floorIndex);
    const floor = floors[floorIndex];
    const tenant = floor.units.find(t => t.id === selected);
    zoomDialog.querySelector('.zoom-selected').textContent = tenant ? `${tenant.name} · ${floor.label} · Unit ${tenant.id}` : 'Tidak ada unit dipilih.';
  }
  let floorIndex = 0;
  let category = 'all';
  let selected = floors[0].units[0].id;
  const search = section.querySelector('#floor-search');
  const floorTabs = [...section.querySelectorAll('[data-floor]')];
  const placements = [
    [{x:5,y:10,w:21,h:29},{x:28,y:10,w:21,h:29},{x:51,y:10,w:21,h:29},{x:74,y:10,w:21,h:29},{x:5,y:64,w:21,h:26},{x:28,y:64,w:21,h:26},{x:51,y:64,w:21,h:26},{x:74,y:64,w:21,h:26}],
    [{x:5,y:10,w:25,h:28},{x:32,y:10,w:18,h:28},{x:52,y:10,w:18,h:28},{x:72,y:10,w:23,h:28},{x:5,y:65,w:19,h:25},{x:26,y:65,w:23,h:25},{x:51,y:65,w:22,h:25},{x:75,y:65,w:20,h:25}],
    [{x:5,y:10,w:29,h:30},{x:36,y:10,w:18,h:30},{x:56,y:10,w:18,h:30},{x:76,y:10,w:19,h:30},{x:5,y:65,w:18,h:25},{x:25,y:65,w:19,h:25},{x:46,y:65,w:23,h:25},{x:71,y:65,w:24,h:25}],
  ];
  function visibleUnits() {
    const query = search.value.trim().toLocaleLowerCase();
    return floors[floorIndex].units.filter(t => (category === 'all' || t.category === category) && t.name.toLocaleLowerCase().includes(query));
  }
  function render() {
    const floor = floors[floorIndex];
    const visible = visibleUnits();
    if (!visible.some(t => t.id === selected)) selected = visible[0]?.id ?? null;
    floorTabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === floorIndex));
      tab.tabIndex = i === floorIndex ? 0 : -1;
    });
    section.querySelector('#floor-panel').setAttribute('aria-labelledby', `tab-${floor.id}`);
    section.querySelector('#floor-title').textContent = floor.label;
    section.querySelector('#tenant-count').textContent = `${visible.length} tenant`;
    section.querySelector('#floor-plan').innerHTML = `<div class="map-corridor"></div><span class="map-atrium">ATRIUM<small>${floor.id === 'GF' ? 'GROUND FLOOR' : `LANTAI ${floor.id}`}</small></span><span class="map-escalator">ESC ↑↓</span><span class="map-wc">WC · LIFT</span><span class="map-north" aria-label="Arah utara">N ↑</span>${floor.units.map((tenant, i) => {
      const position = placements[floorIndex][i];
      const found = visible.includes(tenant);
      return `<button class="map-unit ${tenant.id === selected ? 'is-selected' : ''} ${found ? '' : 'is-muted'}" data-unit="${tenant.id}" aria-label="${tenant.name}, unit ${tenant.id}, ${floor.label}" aria-pressed="${tenant.id === selected}" ${found ? '' : 'disabled'} style="left:${position.x}%;top:${position.y}%;width:${position.w}%;height:${position.h}%">${logo(tenant)}<span class="map-unit-name">${tenant.name}</span><span>${tenant.id}</span></button>`;
    }).join('')}<span class="map-entry">${floor.id === 'GF' ? 'ENTRANCE' : 'LOBBY'} ↑</span>`;
    section.querySelector('#floor-tenant-list').innerHTML = visible.length ? visible.map(tenant => `<button class="floor-tenant ${tenant.id === selected ? 'is-selected' : ''}" data-unit="${tenant.id}" aria-pressed="${tenant.id === selected}"><span class="list-logo">${logo(tenant)}</span><span><b>${tenant.name}</b><small>${categoryNames[tenant.category]} · ${tenant.id}</small></span><span aria-hidden="true">↗</span></button>`).join('') : '<p class="floor-empty">Tidak ada tenant yang cocok di lantai ini.<br>Coba kategori, kata kunci, atau lantai lain.</p>';
    const tenant = floor.units.find(t => t.id === selected);
    section.querySelector('#floor-detail').innerHTML = tenant ? `<span class="detail-logo">${logo(tenant)}</span><div><span class="eyebrow">SELECTED PLACE</span><h3>${tenant.name}</h3><p>${floor.label} · Unit ${tenant.id} · ${categoryNames[tenant.category]}</p><small>Lokasi ilustratif pada demo directory.</small></div>` : '<p>Tidak ada unit yang dipilih.</p>';
    syncZoom();
  }
  zoomDialog.querySelector('#zoom-floor').onchange = event => { floorTabs[Number(event.target.value)].click(); };
  floorTabs.forEach((tab, i) => {
    tab.onclick = () => { floorIndex = i; category = 'all'; search.value = ''; resetCategories(); render(); };
    tab.onkeydown = event => {
      let next;
      if (event.key === 'ArrowRight') next = (i + 1) % floors.length;
      if (event.key === 'ArrowLeft') next = (i + floors.length - 1) % floors.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = floors.length - 1;
      if (next !== undefined) { event.preventDefault(); floorTabs[next].click(); floorTabs[next].focus(); }
    };
  });
  function resetCategories() { section.querySelectorAll('[data-category]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category))); }
  section.querySelectorAll('[data-category]').forEach(button => { button.onclick = () => { category = button.dataset.category; resetCategories(); render(); }; });
  search.oninput = render;
  section.addEventListener('click', event => { const unit = event.target.closest('[data-unit]'); if (unit && !unit.disabled) { selected = unit.dataset.unit; render(); section.querySelector(`${zoomDialog.open ? '.zoom-plan' : unit.closest('.floor-plan') ? '#floor-plan' : '#floor-tenant-list'} [data-unit="${selected}"]`)?.focus({ preventScroll: true }); } });
  render();
  section.after(brandSection());
}
