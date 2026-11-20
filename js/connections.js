(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const COL=['#FFC93C','#2ED8A3','#3BA7FF','#7C5CFF'],TXT=['#1E1B3A','#1E1B3A','#1E1B3A','#fff'],LVL=['Yellow','Green','Blue','Purple'];
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const ST='ubg-connections';
let S={p:0,w:0,s:0,b:0};try{S={...S,...JSON.parse(localStorage.getItem(ST))}}catch(e){}
const save=()=>{try{localStorage.setItem(ST,JSON.stringify(S))}catch(e){}};
let groups,tiles,sel,solved,miss,over;

function pick(){for(let k=0;k<80;k++){const used=new Set(),gs=[];let ok=true;
 for(let t=0;t<4&&ok;t++){const c=BANK[t][Math.random()*BANK[t].length|0],ws=shuf(c.w.filter(w=>!used.has(w))).slice(0,4);
  if(ws.length<4){ok=false;break}ws.forEach(w=>used.add(w));gs.push({t,n:c.n,w:ws})}
 if(ok)return gs}}
function start(){groups=pick();tiles=shuf(groups.flatMap((g,i)=>g.w.map(w=>({w,g:i}))));sel=new Set();solved=[];miss=0;over=false;msg('Select four words that share a connection.');draw()}
const msg=t=>$('#msg').textContent=t;
function draw(){const done=new Set(solved);
 $('#board').innerHTML=solved.map(i=>{const g=groups[i];return `<div class="solved" style="background:${COL[g.t]};color:${TXT[g.t]}"><b>${g.n.toUpperCase()}</b><span>${g.w.join(', ').toUpperCase()}</span></div>`}).join('')
  +tiles.filter(t=>!done.has(t.g)).map(t=>`<button class="tl" type="button" aria-pressed="${sel.has(t.w)}">${t.w}</button>`).join('');
 $('#dots').innerHTML=[0,1,2,3].map(i=>`<i class="${i<4-miss?'on':''}"></i>`).join('');
 $('#dots').setAttribute('aria-label',`${4-miss} mistakes remaining`);
 $('#submit').disabled=sel.size!==4||over;$('#again').hidden=!over;
 $('#shuffle').disabled=$('#clear').disabled=over}
function finish(win){over=true;S.p++;if(win){S.w++;S.s++;S.b=Math.max(S.b,S.s)}else S.s=0;save();stats();
 if(!win){groups.forEach((g,i)=>{if(!solved.includes(i))solved.push(i)});msg('Out of mistakes. Here are the answers. Try a new puzzle.')}
 else msg(miss?'Solved! Nice work.':'Perfect game! No mistakes.');draw()}
function submit(){if(sel.size!==4||over)return;const ch=tiles.filter(t=>sel.has(t.w)),cnt={};ch.forEach(t=>cnt[t.g]=(cnt[t.g]||0)+1);
 const top=Math.max(...Object.values(cnt)),g=+Object.keys(cnt).find(k=>cnt[k]===top);
 if(top===4){solved.push(g);sel.clear();msg(`Correct: ${groups[g].n}`);solved.length===4?finish(true):draw()}
 else{miss++;msg(top===3?'One away!':'Not a group. Try again.');const b=$('#board');b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');miss>=4?finish(false):draw()}}
$('#board').addEventListener('click',e=>{const b=e.target.closest('.tl');if(!b||over)return;const w=b.textContent;
 sel.has(w)?sel.delete(w):sel.size<4&&sel.add(w);draw()});
$('#submit').onclick=submit;
$('#clear').onclick=()=>{sel.clear();draw()};
$('#shuffle').onclick=()=>{tiles=shuf(tiles);draw()};
$('#again').onclick=start;$('#again2').onclick=()=>{start();$('#play').scrollIntoView()};

function stats(){const r=S.p?Math.round(S.w/S.p*100):0;
 $('#stats').innerHTML=[['Played',S.p],['Win rate',r+'%'],['Current streak',S.s],['Best streak',S.b]].map(([k,v])=>`<div class="box"><h3>${v}</h3><p>${k}</p></div>`).join('')}
// word bank section
const nW=BANK.flat().reduce((a,c)=>a+c.w.length,0),nC=BANK.flat().length;
$$('[data-words]').forEach(e=>e.textContent=nW.toLocaleString());$$('[data-cats]').forEach(e=>e.textContent=nC);
$('#bank').innerHTML=BANK.map((t,i)=>`<div class="box" style="border-top:6px solid ${COL[i]}"><h3>${LVL[i]} categories</h3><p><strong>${t.length}</strong> categories, ${t.reduce((a,c)=>a+c.w.length,0)} words</p><p class="cl">${t.map(c=>c.n).join(', ')}</p></div>`).join('');
// related games
$('#more').innerHTML=GAMES.filter(g=>g.n!=='Connections').slice(0,8).map(g=>{const i=GAMES.indexOf(g),c=PAL[i%6];
 return `<a class="card" style="--c:${c}" href="${gameUrl(g)}"><div class="thumb"><svg viewBox="0 0 120 90" role="img" aria-label="${g.n} Unlimited preview">${ART[g.a[0]](c,...g.a.slice(1))}</svg></div><div class="body"><span class="tag">${g.cat}</span><h3>${g.n} Unlimited</h3><p>${g.d}</p></div></a>`}).join('');
// FAQ schema from visible text
const s=document.createElement('script');s.type='application/ld+json';
s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:$$('#faq details').map(d=>({'@type':'Question',name:$('summary',d).textContent,acceptedAnswer:{'@type':'Answer',text:$('p',d).textContent}}))});
document.head.append(s);
stats();start();
})();
