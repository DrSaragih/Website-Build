import './editorial.css';

const root = document.querySelector('#home-content');
const isHome = Boolean(root);
const page = location.pathname.split('/').pop();
const assets = [
  { file: 'mall-atrium', label: 'Ruang untuk bertemu', alt: 'Ilustrasi atrium mall tropis dengan cahaya alami' },
  { file: 'mall-fashion', label: 'Gaya yang terasa milikmu', alt: 'Ilustrasi koridor butik fashion dalam mall modern' },
  { file: 'mall-cafe', label: 'Jeda yang punya rasa', alt: 'Ilustrasi kopi dan hidangan di kafe mall' },
  { file: 'mall-garden', label: 'Sedikit lebih dekat dengan tenang', alt: 'Ilustrasi taman teras mall saat golden hour' },
  { file: 'mall-community', label: 'Momen yang mempertemukan', alt: 'Ilustrasi pertunjukan akustik di area komunal mall' },
  { file: 'mall-shopping', label: 'Bawa pulang rasa senang', alt: 'Ilustrasi tas belanja, kartu, dan kopi di area mall' },
];
const image = (asset, extra = '') => `<img src="/images/${asset.file}.webp" alt="${asset.alt}" width="1536" height="1024" loading="lazy" decoding="async" ${extra}>`;

if (isHome) {
  const welcome = document.createElement('section');
  welcome.className = 'editorial-welcome section';
  welcome.innerHTML = `<div class="welcome-kicker"><span class="eyebrow">YOUR DAY, YOUR PASKAL</span><span>BANDUNG · SINCE 2017</span></div><div class="welcome-columns"><h2>Satu tempat.<br><em>Banyak cara bahagia.</em></h2><div><p>Jadwal boleh penuh. Tapi selalu ada ruang untuk hal yang membuat hari terasa lebih baik.</p><p>Temukan gaya baru, bertemu di meja favorit, atau biarkan langkah kecil membawamu ke cerita berikutnya. Di 23 Paskal, nikmati hari dengan caramu sendiri.</p><a class="text-link" href="/mall.html">Kenali cerita kami <span>↗</span></a></div></div><div class="welcome-facts"><span><b>01</b>Tempat bertemu</span><span><b>02</b>Rasa untuk dijelajahi</span><span><b>03</b>Gaya untuk ditemukan</span></div>`;
  root.append(welcome);
  const experiences = document.createElement('section');
  experiences.className = 'home-experiences section';
  experiences.innerHTML = `<div class="editorial-section-heading"><div><span class="eyebrow">MAKE IT YOUR KIND OF DAY</span><h2>Pilih suasananya.<br><em>Ikuti ceritanya.</em></h2></div><p>Tak perlu banyak rencana.<br>Mulai dari yang paling kamu suka.</p></div><div class="experience-cards"><a class="experience-card" href="/directory.html?category=dining#directory"><div class="editorial-image">${image(assets[2])}</div><span>01 / TASTE</span><h3>Obrolan enak,<br>dimulai dari rasa.</h3><p>Dari teguk pertama hingga piring terakhir. Cari tempat untuk memperpanjang waktu bersama.</p><b>Jelajahi kuliner ↗</b></a><a class="experience-card" href="/directory.html?category=fashion#directory"><div class="editorial-image">${image(assets[1])}</div><span>02 / DISCOVER</span><h3>Temukan yang baru.<br>Tetap jadi dirimu.</h3><p>Sentuhan kecil, rasa percaya diri yang baru. Jelajahi pilihan yang cocok dengan gayamu.</p><b>Temukan gaya ↗</b></a><a class="experience-card" href="/whats-next.html"><div class="editorial-image">${image(assets[4])}</div><span>03 / CONNECT</span><h3>Datang bersama.<br>Pulang membawa cerita.</h3><p>Ide pengalaman dan momen komunal untuk membuat kunjungan terasa berbeda.</p><b>Intip pengalaman berikutnya ↗</b></a></div><small class="editorial-note">Visual dan agenda bersifat konseptual. Directory menggunakan data dummy.</small>`;
  root.append(experiences);
  const escape = document.createElement('section');
  escape.className = 'home-escape';
  escape.innerHTML = `<div class="escape-image">${image(assets[3], 'data-editorial-depth="0.1"')}</div><div class="escape-shade"></div><div class="escape-copy"><span class="eyebrow">A LITTLE PAUSE IN THE CITY</span><h2>Pelankan langkah.<br><em>Rasakan harinya.</em></h2><p>Terkadang, yang kita butuhkan hanyalah tempat yang tepat dan waktu yang tidak terburu-buru.</p><a href="/mall.html#visit">Rencanakan kunjunganmu ↗</a></div></section>`;
  root.append(escape);
  const guide = document.createElement('section');
  guide.className = 'home-visit-guide section';
  guide.innerHTML = `<div><span class="eyebrow">BEFORE YOUR NEXT STORY</span><h2>Siap singgah?</h2><p>Kami bantu langkah pertamamu.</p></div><div class="home-guide-links"><a href="/directory.html#directory"><span>01</span><div><b>Temukan tenant</b><p>Cari brand dan lihat denah per lantai.</p></div><span>↗</span></a><a href="/mall.html#visit"><span>02</span><div><b>Temukan jalannya</b><p>Lokasi mall dan petunjuk arah Google Maps.</p></div><span>↗</span></a><a href="/mall.html#bantuan"><span>03</span><div><b>Pertanyaan sebelum berkunjung</b><p>Jawaban praktis untuk merencanakan harimu.</p></div><span>↗</span></a></div>`;
  root.append(guide);
}

const gallerySets = {
  'mall.html': [0, 3, 1],
  'directory.html': [1, 2, 5],
  'whats-next.html': [4, 3, 2],
  'shopping-program.html': [5, 1, 2],
};
const chosen = gallerySets[page];
if (chosen) {
  const gallery = document.createElement('section');
  gallery.className = 'chapter-gallery section';
  gallery.innerHTML = `<div class="editorial-section-heading"><div><span class="eyebrow">THE PASKAL MOODBOARD</span><h2>Bayangkan harimu.<br><em>Temukan inspirasinya.</em></h2></div><p>Klik foto untuk melihat lebih dekat.<br>Setiap sudut, sebuah kemungkinan.</p></div><div class="gallery-tiles">${chosen.map(index => `<button class="gallery-tile" data-gallery="${index}" aria-label="Lihat foto: ${assets[index].label}"><div class="editorial-image">${image(assets[index])}<span aria-hidden="true">+</span></div><span>${assets[index].label}</span></button>`).join('')}</div><small class="editorial-note">Seluruh foto adalah visual AI konseptual, bukan dokumentasi bangunan atau acara asli 23 Paskal.</small>`;
  document.querySelector('.customer-faq').before(gallery);
  const dialog = document.createElement('dialog');
  dialog.className = 'photo-lightbox';
  dialog.setAttribute('aria-label', 'Galeri foto konseptual');
  dialog.innerHTML = `<button class="lightbox-close" aria-label="Tutup galeri">×</button><figure><img alt=""><figcaption aria-live="polite"></figcaption></figure><div class="lightbox-controls"><button class="lightbox-prev" aria-label="Foto sebelumnya">← Sebelumnya</button><span class="lightbox-position" aria-live="polite"></span><button class="lightbox-next" aria-label="Foto berikutnya">Berikutnya →</button></div><small>Visual AI konseptual · bukan foto asli mall.</small>`;
  document.body.append(dialog);
  let position = 0;
  function display() {
    const asset = assets[chosen[position]];
    dialog.querySelector('img').src = `/images/${asset.file}.webp`;
    dialog.querySelector('img').alt = asset.alt;
    dialog.querySelector('figcaption').textContent = asset.label;
    dialog.querySelector('.lightbox-position').textContent = `${position + 1} / ${chosen.length}`;
  }
  function step(direction) { position = (position + direction + chosen.length) % chosen.length; display(); }
  gallery.querySelectorAll('[data-gallery]').forEach(button => { button.onclick = () => { position = chosen.indexOf(Number(button.dataset.gallery)); display(); dialog.showModal(); }; });
  dialog.querySelector('.lightbox-close').onclick = () => dialog.close();
  dialog.querySelector('.lightbox-prev').onclick = () => step(-1);
  dialog.querySelector('.lightbox-next').onclick = () => step(1);
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); step(event.key === 'ArrowLeft' ? -1 : 1); } });
}

// Reveal only while approaching the viewport; keyboard focus always reveals content.
const revealTargets = [...document.querySelectorAll('.welcome-columns, .experience-card, .home-guide-links a, .gallery-tile')];
const motion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); } }), { rootMargin: '80px', threshold: .05 });
  revealTargets.forEach(element => { element.classList.add('editorial-reveal'); observer.observe(element); element.addEventListener('focusin', () => element.classList.add('is-revealed')); });
  motion.addEventListener('change', () => { if (motion.matches) { revealTargets.forEach(el => el.classList.add('is-revealed')); observer.disconnect(); } });
}

const depthImages = [...document.querySelectorAll('[data-editorial-depth]')];
if (depthImages.length) {
  let frame = 0, last = 0;
  const values = new Map(depthImages.map(image => [image, 0]));
  function draw(time) {
    const dt = last ? Math.min(64, time - last) : 16;
    last = time;
    let moving = false;
    depthImages.forEach(photo => {
      const rect = photo.parentElement.getBoundingClientRect();
      const target = motion.matches ? 0 : Math.max(-65, Math.min(65, (innerHeight / 2 - rect.top - rect.height / 2) * Number(photo.dataset.editorialDepth)));
      const value = values.get(photo) + (target - values.get(photo)) * (1 - Math.exp(-dt / 120));
      values.set(photo, value);
      photo.style.transform = motion.matches ? 'none' : `scale(1.15) translateY(${value}px)`;
      moving ||= Math.abs(value - target) > .08;
    });
    frame = 0;
    if (moving) schedule(); else last = 0;
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  schedule();
}

// Keep section links accurate after the final page content has been added.
if (['#directory', '#visit', '#bantuan'].includes(location.hash)) requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());

// Consistent footer navigation on every chapter and the home page.
document.querySelector('footer .brand').href = '/';
document.querySelector('footer > a:last-child').href = '#';
