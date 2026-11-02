import './experience.css';

const isHome = Boolean(document.querySelector('#layer-experience'));
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function visitMarkup() {
  return `<div class="visit-heading"><span class="eyebrow">23 PASKAL · BANDUNG</span><h2>Tujuannya di sini.<br><em>Ceritanya bersamamu.</em></h2><p>Di tengah ritme kota, ada tempat untuk melambat.<br>Atur pertemuanmu. Kami tunjukkan jalannya.</p></div><div class="visit-map-layout"><div class="visit-address"><span class="visit-pin" aria-hidden="true">23</span><h3>23 Paskal<br>Shopping Center</h3><address>Paskal Hyper Square<br>Jl. Pasir Kaliki No. 25–27<br>Bandung, Jawa Barat</address><a class="pill" href="https://www.google.com/maps/dir/?api=1&destination=23+Paskal+Shopping+Center+Bandung" target="_blank" rel="noopener noreferrer">Arahkan langkahmu ke sini <span aria-hidden="true">↗</span></a><a class="map-external" href="https://www.google.com/maps/search/?api=1&query=23+Paskal+Shopping+Center+Bandung" target="_blank" rel="noopener noreferrer">Buka lokasi di Google Maps ↗</a><small>Gunakan Google Maps untuk informasi rute dan kondisi perjalanan terbaru.</small></div><div class="google-map"><iframe title="Google Maps — lokasi 23 Paskal Shopping Center Bandung" src="https://www.google.com/maps?q=23%20Paskal%20Shopping%20Center%20Bandung&z=16&output=embed" width="900" height="520" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><div class="map-caption"><span>FIND US IN THE HEART OF BANDUNG</span><a href="https://www.google.com/maps/search/?api=1&query=23+Paskal+Shopping+Center+Bandung" target="_blank" rel="noopener noreferrer">Buka peta ↗</a></div></div></div>`;
}

document.querySelectorAll('main > #visit').forEach(section => {
  section.className = 'section visit-map-section';
  section.innerHTML = visitMarkup();
});

function photoStories() {
  const section = document.createElement('section');
  section.className = 'photo-stories section';
  section.innerHTML = `<div class="stories-heading"><span class="eyebrow">THE ART OF A GOOD DAY</span><h2>Tak harus jauh.<br><em>Cukup terasa berbeda.</em></h2><p>Secangkir yang menghangatkan obrolan. Sudut hijau yang menenangkan pikiran. Kadang, hari terbaik dimulai tanpa rencana besar.</p></div><div class="story-photo-grid"><a class="story-photo story-photo-tall" href="/directory.html"><div class="photo-window"><img src="/images/mall-cafe.png" alt="Ilustrasi fotografis kopi dan hidangan di kafe mall" loading="lazy" data-scene-depth="0.16"></div><span class="photo-index">01 / SAVOR</span><h3>Satu kopi. Obrolan berjam-jam.</h3><p>Temukan tempat untuk rasa baru dan cerita yang belum selesai.</p><span class="story-link">Jelajahi food & drink ↗</span></a><a class="story-photo story-photo-offset" href="/mall.html"><div class="photo-window"><img src="/images/mall-garden.png" alt="Ilustrasi fotografis taman teras mall tropis pada sore hari" loading="lazy" data-scene-depth="-0.12"></div><span class="photo-index">02 / SLOW DOWN</span><h3>Beri harimu ruang bernapas.</h3><p>Pelankan langkah. Nikmati jeda. Lanjutkan hari dengan rasa berbeda.</p><span class="story-link">Kenali cerita 23 Paskal ↗</span></a></div><small class="photo-disclosure">Visual fotografis konseptual, bukan dokumentasi asli 23 Paskal.</small>`;
  return section;
}

if (isHome) {
  const journey = document.createElement('section');
  journey.className = 'journey-scroll';
  journey.setAttribute('aria-label', 'Pengalaman parallax 23 Paskal');
  journey.innerHTML = `<div class="journey-stage"><img class="journey-background" src="/images/mall-garden.png" alt="" loading="lazy"><div class="journey-shade"></div><span class="journey-word" aria-hidden="true">STAY A LITTLE LONGER</span><div class="journey-copy"><span class="eyebrow">LEAVE THE ORDINARY AT THE DOOR</span><h2>Rencananya<br>sebentar.<br><em>Betahnya lama.</em></h2><p>Ada tempat yang kita datangi.<br>Ada tempat yang ingin kita datangi lagi.</p><a class="journey-link" href="/mall.html">Rasakan sisi lain harimu ↗</a></div><div class="journey-portrait"><img src="/images/mall-retail.png" alt="Ilustrasi suasana berjalan santai di dalam mall" loading="lazy"><span>A DAY, WELL SPENT.</span></div><div class="journey-closeup"><img src="/images/mall-cafe.png" alt="Ilustrasi kopi dan hidangan untuk jeda sore" loading="lazy"></div><span class="journey-counter" aria-hidden="true">23 / PASKAL</span></div>`;
  document.querySelector('#layer-experience').after(journey);
  const stories = photoStories();
  document.querySelector('.home-history').after(stories);
  const visit = document.createElement('section');
  visit.id = 'find-us';
  visit.className = 'section visit-map-section';
  visit.innerHTML = visitMarkup();
  stories.after(visit);
  document.querySelector('header .visit').href = '#find-us';
  const homeContent = document.createElement('main');
  homeContent.id = 'home-content';
  const experience = document.querySelector('#layer-experience');
  experience.before(homeContent);
  [experience, journey, document.querySelector('.brand-section'), document.querySelector('.home-history'), stories, visit].forEach(section => homeContent.append(section));
} else if (location.pathname.endsWith('/mall.html')) {
  document.querySelector('#visit').before(photoStories());
}

// Keep original event interactions while giving their concepts photographic context.
document.querySelectorAll('.event-art').forEach(el => el.classList.add('event-garden-photo'));
document.querySelectorAll('.food-art').forEach(el => el.classList.add('event-cafe-photo'));

if (!reducedMotion.matches) {
  const journey = document.querySelector('.journey-scroll');
  const depthPhotos = [...document.querySelectorAll('[data-scene-depth]')];
  const banner = document.querySelector('.page-banner');
  let requested = false;
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  function draw() {
    if (journey) {
      const rect = journey.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const progress = clamp(-rect.top / Math.max(1, journey.offsetHeight - innerHeight), 0, 1);
        journey.querySelector('.journey-background').style.transform = `scale(${1.2 - progress * .14}) translateY(${progress * -100}px)`;
        const mobile = innerWidth <= 600;
        journey.querySelector('.journey-portrait').style.transform = `translateY(${mobile ? 80 - progress * 130 : 140 - progress * 300}px) rotate(${5 - progress * 9}deg)`;
        journey.querySelector('.journey-closeup').style.transform = `translateY(${mobile ? -10 + progress * 90 : -60 + progress * 200}px) rotate(${-7 + progress * 12}deg)`;
        journey.querySelector('.journey-word').style.transform = `translateX(${-progress * 350}px)`;
        journey.querySelector('.journey-copy').style.transform = `translateY(${progress * -55}px)`;
      }
    }
    depthPhotos.forEach(photo => {
      const rect = photo.parentElement.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < innerHeight) {
        const shift = clamp((innerHeight / 2 - rect.top - rect.height / 2) * Number(photo.dataset.sceneDepth), -85, 85);
        photo.style.transform = `scale(1.2) translateY(${shift}px)`;
      }
    });
    if (banner) {
      const rect = banner.getBoundingClientRect();
      if (rect.bottom > 0) banner.querySelector('img').style.transform = `scale(1.12) translateY(${clamp(-rect.top * .3, 0, 170)}px)`;
    }
    requested = false;
  }
  addEventListener('scroll', () => { if (!requested) { requested = true; requestAnimationFrame(draw); } }, { passive: true });
  addEventListener('resize', draw);
  draw();
}

// Deferred imports may finish after a native anchor navigation; restore its target.
if (location.hash === '#visit' || location.hash === '#find-us') {
  requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
}
