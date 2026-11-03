import './customer.css';
import { floors, categoryNames } from './directory-data.js';

const tenants = floors.flatMap(floor => floor.units.map(unit => ({ ...unit, floor: floor.id, floorLabel: floor.label })));
const address = '23 Paskal Shopping Center, Paskal Hyper Square, Jl. Pasir Kaliki No. 25–27, Bandung, Jawa Barat';
const key = tenant => `${tenant.floor}:${tenant.id}`;
let saved;
try { const value = JSON.parse(localStorage.getItem('paskal-places') || '[]'); saved = new Set(Array.isArray(value) ? value.filter(v => typeof v === 'string') : []); } catch { saved = new Set(); }
let onlySaved = false;
let category = 'all';
const search = document.createElement('dialog');
search.className = 'customer-search';
search.setAttribute('aria-labelledby', 'customer-search-title');
search.innerHTML = `<div class="customer-dialog-heading"><div><span class="eyebrow">YOUR VISIT, MADE SIMPLE</span><h2 id="customer-search-title">Temukan tujuanmu.</h2></div><button class="customer-close" aria-label="Tutup pencarian">×</button></div><label class="customer-search-label">Cari tenant di semua lantai<input id="customer-query" type="search" placeholder="Coba: kopi, fashion, Nike…" autocomplete="off"></label><div class="customer-search-tools"><select id="customer-category" aria-label="Kategori"><option value="all">Semua kategori</option>${Object.entries(categoryNames).map(([id, name]) => `<option value="${id}">${name}</option>`).join('')}</select><button id="saved-filter" aria-pressed="false">Tersimpan <span>0</span></button></div><p class="customer-demo">Demo directory · Lokasi tenant merupakan data ilustratif.</p><p id="customer-result-count" role="status" aria-live="polite"></p><div id="customer-results"></div><p id="customer-feedback" role="status" aria-live="polite"></p>`;
document.body.append(search);
const query = search.querySelector('#customer-query');
function render() {
  const text = query.value.trim().toLocaleLowerCase();
  const aliases = { dining: 'kopi makan minum kuliner restoran coffee food drink', fashion: 'baju pakaian sepatu gaya olahraga fashion', lifestyle: 'elektronik gadget teknologi lifestyle' };
  const results = tenants.filter(t => (!onlySaved || saved.has(key(t))) && (category === 'all' || category === t.category) && `${t.name} ${t.floorLabel} ${categoryNames[t.category]} ${aliases[t.category]}`.toLocaleLowerCase().includes(text));
  search.querySelector('#customer-result-count').textContent = `${results.length} lokasi ${onlySaved ? 'tersimpan' : 'ditemukan'}`;
  search.querySelector('#saved-filter span').textContent = String(tenants.filter(t => saved.has(key(t))).length);
  search.querySelector('#customer-results').innerHTML = results.length ? results.map(t => `<article class="customer-result"><img src="/logos/${t.logo}.svg" alt="" width="44" height="35"><div><h3>${t.name}</h3><p>${t.floorLabel} · Unit ${t.id} · ${categoryNames[t.category]}</p><a href="/directory.html?floor=${t.floor}&unit=${t.id}#directory">Lihat di denah ↗</a></div><button data-save="${key(t)}" aria-label="${saved.has(key(t)) ? 'Hapus' : 'Simpan'} ${t.name}, ${t.floorLabel}" aria-pressed="${saved.has(key(t))}">${saved.has(key(t)) ? 'Tersimpan ✓' : 'Simpan +'}</button></article>`).join('') : `<div class="customer-empty"><h3>${onlySaved ? 'Belum ada tujuan tersimpan.' : 'Belum menemukan yang cocok.'}</h3><p>${onlySaved ? 'Tekan Simpan pada tenant pilihan untuk merencanakan kunjunganmu.' : 'Coba nama brand, kategori lain, atau kata “kopi” dan “sepatu”.'}</p><button id="reset-customer-search">Lihat semua tenant</button></div>`;
  search.querySelector('#reset-customer-search')?.addEventListener('click', () => { onlySaved = false; category = 'all'; query.value = ''; search.querySelector('#customer-category').value = 'all'; search.querySelector('#saved-filter').setAttribute('aria-pressed', 'false'); render(); });
}
function openSearch() { render(); search.showModal(); query.focus(); }
search.querySelector('.customer-close').onclick = () => search.close();
search.addEventListener('click', event => {
  if (event.target === search) search.close();
  const button = event.target.closest('[data-save]');
  if (!button) return;
  const id = button.dataset.save;
  saved.has(id) ? saved.delete(id) : saved.add(id);
  let persisted = true;
  try { localStorage.setItem('paskal-places', JSON.stringify([...saved])); } catch { persisted = false; }
  render();
  search.querySelector('#customer-feedback').textContent = persisted ? 'Daftar tujuan diperbarui di perangkat ini.' : 'Daftar tersimpan untuk sesi ini; penyimpanan perangkat tidak tersedia.';
  search.querySelector(`[data-save="${id}"]`)?.focus({ preventScroll: true });
});
query.oninput = render;
search.querySelector('#customer-category').onchange = event => { category = event.target.value; render(); };
search.querySelector('#saved-filter').onclick = event => { onlySaved = !onlySaved; event.currentTarget.setAttribute('aria-pressed', String(onlySaved)); render(); };

const headerButton = document.createElement('button');
headerButton.className = 'header-tenant-search';
headerButton.textContent = 'Cari tenant';
headerButton.onclick = openSearch;
document.querySelector('header .visit').before(headerButton);

const home = document.querySelector('#home-content');
if (location.pathname.endsWith('/directory.html')) {
  const tools = document.createElement('div');
  tools.className = 'directory-quick-tools';
  tools.innerHTML = '<p>Cari lintas lantai atau lanjutkan daftar tujuanmu.</p><button class="open-all-tenants">Cari semua lantai</button><button class="open-saved-tenants">Tujuan tersimpan</button>';
  document.querySelector('.directory-heading').after(tools);
  tools.querySelector('.open-all-tenants').onclick = openSearch;
  tools.querySelector('.open-saved-tenants').onclick = () => { onlySaved = true; search.querySelector('#saved-filter').setAttribute('aria-pressed', 'true'); openSearch(); };
}

if (!home) {
const faq = document.createElement('section');
faq.id = 'bantuan';
faq.className = 'customer-faq section';
faq.innerHTML = `<div><span class="eyebrow">BEFORE YOU GO</span><h2>Informasi jelas.<br><em>Kunjungan nyaman.</em></h2><p>Hal-hal kecil yang membantu merencanakan hari.</p><button class="faq-search">Cari tenant sekarang ↗</button></div><div class="faq-items"><details><summary>Di mana lokasi 23 Paskal?</summary><p>${address}.</p><a href="https://www.google.com/maps/dir/?api=1&destination=23+Paskal+Shopping+Center+Bandung" target="_blank" rel="noopener noreferrer">Buka petunjuk arah di Google Maps ↗</a></details><details><summary>Bagaimana menemukan tenant dan lantainya?</summary><p>Gunakan “Cari tenant” untuk mencari di semua lantai. Pilih “Lihat di denah” untuk membuka lantai dan menyorot unit yang dipilih. Directory ini menggunakan data dummy.</p><a href="/directory.html#directory">Buka directory & denah ↗</a></details><details><summary>Bisakah saya menyimpan tenant pilihan?</summary><p>Bisa. Tekan “Simpan” di hasil pencarian, lalu buka tab “Tersimpan”. Daftar disimpan pada browser perangkat ini, tanpa membuat akun.</p></details><details><summary>Jam berapa mall buka dan tutup?</summary><p>Jam operasional resmi belum ditambahkan ke website ini. Periksa informasi terbaru sebelum berangkat, terutama saat hari libur.</p><a href="https://www.google.com/maps/search/?api=1&query=23+Paskal+Shopping+Center+Bandung" target="_blank" rel="noopener noreferrer">Periksa informasi di Google Maps ↗</a></details><details><summary>Apakah denah, tenant, dan acara sudah resmi?</summary><p>Website ini masih berupa demo. Penempatan tenant dan denah bersifat ilustratif; acara serta program belanja masih konsep. Foto merupakan visual AI, bukan dokumentasi asli mall.</p></details></div>`;
faq.querySelector('.faq-search').onclick = openSearch;
const visit = document.querySelector('main > #visit');
visit.before(faq);
}


document.querySelectorAll('.visit-address').forEach(section => {
  const button = document.createElement('button');
  button.className = 'copy-address';
  button.textContent = 'Salin alamat';
  const status = document.createElement('p');
  status.className = 'copy-status';
  status.setAttribute('role', 'status');
  button.onclick = async () => {
    try { await navigator.clipboard.writeText(address); status.textContent = 'Alamat berhasil disalin.'; }
    catch { status.textContent = `Silakan salin alamat ini: ${address}`; }
  };
  section.append(button, status);
});

const directory = document.querySelector('.floor-directory')?.closest('section');
if (directory) {
  const params = new URLSearchParams(location.search);
  const floor = floors.find(f => f.id === params.get('floor'));
  if (floor) {
    directory.querySelector(`[data-floor="${floor.id}"]`).click();
    if (floor.units.some(unit => unit.id === params.get('unit'))) directory.querySelector(`#floor-plan [data-unit="${params.get('unit')}"]`).click();
  }
  const requestedCategory = params.get('category');
  if (['dining', 'fashion', 'lifestyle'].includes(requestedCategory)) directory.querySelector(`[data-category="${requestedCategory}"]`)?.click();
  if (location.hash === '#directory') requestAnimationFrame(() => directory.scrollIntoView());
}

import "./clean.css";
