import './layers.css';
const chapters=[
 {id:'mall',section:'mall',number:'01',label:'The Mall',title:'Singgah.<br><em>Jatuh hati.</em>',desc:'Datang untuk satu rencana. Pulang dengan cerita yang tak disangka. Inilah sisi Bandung yang ingin kamu temui lagi.',cta:'Mulai cerita di 23 Paskal',image:'mall',tag:'THE HEART OF BANDUNG',color:'#a5ad98'},
 {id:'directory',section:'directory',number:'02',label:'Directory',title:'Temukan<br><em>favoritmu.</em>',desc:'Kopi yang pas. Gaya yang kamu banget. Temukan tujuan kecil yang membuat harimu terasa istimewa.',cta:'Jelajahi tenant per lantai',image:'directory',tag:'A WORLD TO DISCOVER',color:'#c5b29b'},
 {id:'whats-next',section:'next',number:'03',label:'What’s Next',title:'Ada alasan<br><em>kembali.</em>',desc:'Agenda boleh berubah. Momen seru jangan terlewat. Sisakan ruang untuk kejutan berikutnya.',cta:'Intip yang akan datang',image:'events',tag:'MAKE ROOM FOR NEW MOMENTS',color:'#b16a4f'},
 {id:'shopping-program',section:'rewards',number:'04',label:'Shopping Program',title:'Belanja.<br><em>Lebih berarti.</em>',desc:'Untuk setiap pilihan yang bikin senang, selalu ada alasan menikmati sedikit lebih lama.',cta:'Temukan program belanja',image:'shopping',tag:'MORE REASONS TO RETURN',color:'#79836b'}
];
const route=location.pathname.split('/').pop().replace('.html','');const current=chapters.find(c=>c.id===route);const isHome=!current;
document.querySelector('header .brand').href='/';
document.querySelector('header nav').innerHTML=chapters.map(c=>`<a href="/${c.id}.html" ${current===c?'class="active" aria-current="page"':''}>${c.label}${c.id==='whats-next'?'<i></i>':''}</a>`).join('');
document.querySelector('header .visit').href='/mall.html#visit';
document.querySelectorAll('header nav a').forEach(a=>a.onclick=()=>document.body.classList.remove('menu-open'));
const photoMap={mall:'/images/mall-atrium.png',directory:'/images/mall-retail.png',events:'/images/mall-garden.png',shopping:'/images/mall-cafe.png'};
if(isHome){
 document.body.classList.add('experience-home');
 document.querySelector('main').hidden=true;document.querySelector('footer').hidden=true;
 const experience=document.createElement('div');experience.id='layer-experience';experience.innerHTML=`<div class="layer-sticky"><div class="experience-top"><span><i></i> FOUR LAYERS. ENDLESS POSSIBILITIES.</span><span>23 PASKAL · BANDUNG</span></div><span class="depth-number" aria-hidden="true">23</span><div class="layer-copy">${chapters.map((c,i)=>`<div class="chapter-copy ${i===0?'is-active':''}" data-copy="${i}" ${i?'inert':''}><div class="chapter-kicker">${c.number} / 04 &nbsp; — &nbsp; ${c.label.toUpperCase()}</div><h1>${c.title}</h1><p>${c.desc}</p><a class="chapter-cta" href="/${c.id}.html">${c.cta}<span>↗</span></a></div>`).join('')}</div><div class="photo-stack">${chapters.map((c,i)=>`<a href="/${c.id}.html" class="photo-layer" data-layer="${i}" aria-label="Buka halaman ${c.label}" style="--card-color:${c.color};--i:${i}"><div class="layer-photo" style="background-image:url('${photoMap[c.image]}')"></div><div class="photo-grain"></div><div class="photo-topline"><span>${c.tag}</span><span>${c.number} / 04</span></div><span class="photo-word">${c.label}</span><span class="photo-enter">Explore this layer <b>↗</b></span><span class="photo-note">ILLUSTRATIVE MALL PHOTOGRAPHY</span></a>`).join('')}</div><div class="experience-bottom"><div class="chapter-switcher" aria-label="Pilih layer">${chapters.map((c,i)=>`<a href="/${c.id}.html" data-goto="${i}" class="${i===0?'is-active':''}"><span>${c.number}</span>${c.label}</a>`).join('')}</div><span class="scroll-hint">SCROLL TO UNCOVER <span>↓</span></span></div><div class="scroll-progress"><i></i></div></div>`;
 document.body.append(experience);
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 const cards = [...document.querySelectorAll('.photo-layer')];
 const stack = document.querySelector('.photo-stack');
 let active = -1, progress = 0, target = 0, frame = 0, lastTime = 0;
 let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
 const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
 const smoothstep = n => n * n * (3 - 2 * n);
 function readTarget() {
   const range = Math.max(1, experience.offsetHeight - document.querySelector('.layer-sticky').offsetHeight);
   target = clamp((scrollY - experience.offsetTop) / range * 3, 0, 3);
   schedule();
 }
 function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
 function draw(time) {
   const dt = lastTime ? Math.min(64, time - lastTime) : 16;
   lastTime = time;
   const blend = motion.matches ? 1 : 1 - Math.exp(-dt / 105);
   progress += (target - progress) * blend;
   pointerX += (targetX - pointerX) * blend;
   pointerY += (targetY - pointerY) * blend;
   if (Math.abs(target - progress) < .0004) progress = target;
   const next = clamp(Math.round(progress), 0, 3);
   if (next !== active) {
     active = next;
     document.querySelectorAll('[data-copy]').forEach((el,i) => { el.classList.toggle('is-active', i === active); el.inert = i !== active; });
     document.querySelectorAll('[data-goto]').forEach((el,i) => { el.classList.toggle('is-active', i === active); if(i===active)el.setAttribute('aria-current','true');else el.removeAttribute('aria-current'); });
   }
   const compact = innerWidth <= 600;
   cards.forEach((card, i) => {
     const depth = Math.max(0, i - progress);
     const departing = smoothstep(clamp(progress - i, 0, 1));
     const fade = smoothstep(clamp((progress - i - .15) / .8, 0, 1));
     card.style.zIndex = String(10 - i);
     card.style.opacity = String(1 - fade);
     card.style.pointerEvents = i === active ? 'auto' : 'none';
     card.tabIndex = i === active ? 0 : -1;
     card.setAttribute('aria-hidden',String(i!==active));
     card.style.transform = motion.matches ? `translateY(${Math.max(0,i-active)*12}px) scale(${1-Math.max(0,i-active)*.025})` : `translate3d(${depth*(compact?5:12)}px,${depth*(compact?14:28)-departing*(compact?230:480)}px,${-depth*65}px) rotate(${depth*1.4-departing*3}deg) scale(${1-depth*.035-departing*.06})`;
     card.querySelector('.layer-photo').style.transform = motion.matches ? 'none' : `scale(1.12) translateY(${(progress-i)*24}px)`;
   });
   stack.style.setProperty('--pointer-x',`${motion.matches?0:pointerX}px`);
   stack.style.setProperty('--pointer-y',`${motion.matches?0:pointerY}px`);
   document.querySelector('.depth-number').style.transform = motion.matches ? 'none' : `translateY(${-progress*30}px)`;
   document.querySelector('.scroll-progress i').style.width = `${(progress+1)/4*100}%`;
   frame = 0;
   if (Math.abs(target-progress)>.0001 || Math.abs(targetX-pointerX)>.05 || Math.abs(targetY-pointerY)>.05) schedule();
   else lastTime = 0;
 }
 addEventListener('scroll', readTarget, {passive:true});
 addEventListener('resize', readTarget);
 motion.addEventListener('change',readTarget);
 stack.addEventListener('pointermove',e=>{
   if(motion.matches || e.pointerType==='touch')return;
   const rect=stack.getBoundingClientRect();
   targetX=(e.clientX-rect.left-rect.width/2)*.018;
   targetY=(e.clientY-rect.top-rect.height/2)*.018;
   schedule();
 });
 stack.addEventListener('pointerleave',()=>{targetX=0;targetY=0;schedule();});
 readTarget();

}else{
 document.body.classList.add('chapter-page');document.title=`${current.label} — 23 Paskal`;
 document.querySelectorAll('main > section').forEach(s=>{s.hidden=s.id!==current.section&&s.id!=='visit';});
 const banner=document.createElement('section');banner.className='page-banner';banner.innerHTML=`<img src="${photoMap[current.image]}" alt="Ilustrasi fotografis interior mall modern"/><div class="page-banner-shade"></div><a class="back-experience" href="/">← Back to the layers</a><div class="page-banner-content"><span>${current.number} / 04 — ${current.tag}</span><h1>${current.title}</h1><p>${current.desc}</p></div><a href="#${current.section}" class="page-down" aria-label="Jelajahi halaman">↓</a>`;document.querySelector('main').prepend(banner);
 const index=chapters.indexOf(current),next=chapters[(index+1)%4];const navigation=document.createElement('section');navigation.className='next-chapter';navigation.innerHTML=`<a href="/">← All layers</a><a href="/${next.id}.html"><small>NEXT LAYER · ${next.number} / 04</small><span>${next.label} ↗</span></a>`;document.querySelector('main').append(navigation);
 const destinations={'#mall':'/mall.html','#directory':'/directory.html','#next':'/whats-next.html','#rewards':'/shopping-program.html'};document.querySelectorAll('a').forEach(a=>{const target=destinations[a.getAttribute('href')];if(target&&a.getAttribute('href')!==`#${current.section}`)a.href=target;});
 document.querySelectorAll('.tenant-image').forEach((el,i)=>el.style.backgroundImage=`url('${photoMap[chapters[i%4].image]}')`);
 const applyPhotos=()=>document.querySelectorAll('.tenant-image').forEach((el,i)=>el.style.backgroundImage=`url('${photoMap[chapters[i%4].image]}')`);document.querySelectorAll('[data-filter],#search').forEach(el=>el.addEventListener(el.id==='search'?'input':'click',applyPhotos));
}
