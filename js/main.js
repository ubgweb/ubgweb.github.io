(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
document.documentElement.classList.add('js');
const I={
 inf:'<path d="M18.2 8.2c-3.1 0-4.7 3.8-6.2 3.8S8.9 8.2 5.8 8.2a3.8 3.8 0 0 0 0 7.6c3.1 0 4.7-3.8 6.2-3.8s3.1 3.8 6.2 3.8a3.8 3.8 0 0 0 0-7.6z"/>',
 open:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
 phone:'<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
 tablet:'<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M11 18h2"/>',
 laptop:'<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 20h20"/>',
 bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
 word:'<path d="M5 19 12 5l7 14M8 14h8"/>',
 logic:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 math:'<path d="M4 8h8M8 4v8M14 18h6M14 7h6"/>',
 geo:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 yes:'<path d="m5 12 5 5 9-10"/>'
};
$$('[data-i]').forEach(e=>e.innerHTML=`<svg viewBox="0 0 24 24" width="${e.dataset.s||28}" height="${e.dataset.s||28}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[e.dataset.i]}</svg>`);

// hero tile board (one orchestrated flip on load)
const B=$('#board');
if(B){let n=0;B.dataset.rows.split(',').forEach(w=>{const r=document.createElement('div');r.className='row';
 [...w].forEach(ch=>{const t=document.createElement('span');t.className='tile';t.textContent=ch;t.style.background=PAL[n%6];t.style.setProperty('--d',(n*.12+.2)+'s');n++;r.append(t)});B.append(r)})}

// game grid
const G=$('#grid');
G.innerHTML=GAMES.map((g,i)=>{const c=PAL[i%6];
 return `<a class="card rv" data-cat="${g.cat}" style="--c:${c}" href="${gameUrl(g)}"><div class="thumb"><svg viewBox="0 0 120 90" role="img" aria-label="${g.n} Unlimited preview">${ART[g.a[0]](c,...g.a.slice(1))}</svg></div><div class="body"><span class="tag">${g.cat}</span><h3>${g.n} Unlimited</h3><p>${g.d}</p></div></a>`}).join('');

// filters + category cards
const f=v=>{$$('.chip').forEach(c=>c.setAttribute('aria-pressed',c.dataset.f===v));$$('.card',G).forEach(c=>c.hidden=v!=='All'&&c.dataset.cat!==v)};
$$('[data-f]').forEach(b=>b.addEventListener('click',()=>{f(b.dataset.f);if(b.closest('.cats'))$('#games').scrollIntoView()}));
$$('[data-count]').forEach(e=>e.textContent=GAMES.filter(g=>g.cat===e.dataset.count).length+' games');
$$('[data-total]').forEach(e=>e.textContent=GAMES.length);

// scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%4)*60+'ms';io.observe(e)});

// schema generated from the same data the page shows
const base='https://ubgweb.github.io',ld=o=>{const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(o);document.head.append(s)};
ld({'@context':'https://schema.org','@type':'ItemList',name:'Unlimited & Unblocked Web Games',itemListElement:GAMES.map((g,i)=>({'@type':'ListItem',position:i+1,name:g.n+' Unlimited',url:base+gameUrl(g)}))});
ld({'@context':'https://schema.org','@type':'FAQPage',mainEntity:$$('#faq details').map(d=>({'@type':'Question',name:$('summary',d).textContent,acceptedAnswer:{'@type':'Answer',text:$('p',d).textContent}}))});
})();
