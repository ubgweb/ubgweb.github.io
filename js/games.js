const PAL=['#7C5CFF','#FF5C93','#FF9F43','#2ED8A3','#3BA7FF','#FFC93C'];
const R=(x,y,w,h,f,rx=3,st)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"${st?` stroke="${st}" stroke-width="1.5"`:''}/>`;
const T=(x,y,s,f,t)=>`<text x="${x}" y="${y}" font-size="${s}" fill="${f}" text-anchor="middle" font-weight="800" font-family="Bricolage Grotesque,Arial,sans-serif">${t}</text>`;
const HEX=(cx,cy,r)=>[0,1,2,3,4,5].map(i=>{const a=Math.PI/180*(60*i+30);return(cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1)}).join(' ');
const ART={
 // multi-board letter grids (Wordle family)
 w(c,b,word=''){const[gx,gy]={1:[1,1],2:[2,1],4:[2,2],8:[4,2]}[b],cw=116/gx,ch=86/gy,s=Math.min((cw-3)/5.4,(ch-3)/4.4),g=s*.12,bw=5*s+4*g,bh=4*s+3*g;let o='';
  for(let k=0;k<b;k++){const ox=2+(k%gx)*cw+(cw-bw)/2,oy=2+Math.floor(k/gx)*ch+(ch-bh)/2;
   for(let j=0;j<4;j++)for(let i=0;i<5;i++){const x=ox+i*(s+g),y=oy+j*(s+g);
    o+=j==3?R(x,y,s,s,'#fff',s*.2,'#DCDFF0'):R(x,y,s,s,['#2ED8A3','#FFC93C','#C9CDE3'][(i*3+j*5+k*2)%3],s*.2);
    if(b==1&&j==0)o+=T(x+s/2,y+s*.72,s*.6,'#fff',word[i]||'')}}
  return o},
 // hexagon / flower letter clusters
 h(c,L,circ){let o='';const d=22.5,pos=[[60,45],...[0,1,2,3,4,5].map(i=>[60+d*Math.cos(Math.PI/3*i),45+d*Math.sin(Math.PI/3*i)])];
  pos.forEach(([x,y],i)=>{const f=i?(circ?PAL[i%6]:'#fff'):'#FFC93C';
   o+=circ?`<circle cx="${x}" cy="${y}" r="11.5" fill="${f}"/>`:`<polygon points="${HEX(x,y,13)}" fill="${f}" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>`;
   o+=T(x,y+4.5,13,circ&&i?'#fff':'#1E1B3A',L[i])});return o},
 // dot / tile grids with a drawn path (Strands, Squaredle)
 d(c,n,path,L=''){const s=n==3?26:18,x0=60-(n-1)*s/2,y0=45-(n-1)*s/2,P=path.map(i=>[x0+(i%n)*s,y0+Math.floor(i/n)*s]);
  let o=`<polyline points="${P.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${c}" stroke-width="${n==3?9:6}" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>`;
  for(let i=0;i<n*n;i++){const x=x0+(i%n)*s,y=y0+Math.floor(i/n)*s,on=path.includes(i);
   o+=n==3?R(x-10,y-10,20,20,'#fff',6,on?c:'#DCDFF0')+T(x,y+5,14,c,L[i]):`<circle cx="${x}" cy="${y}" r="${on?4.5:3.5}" fill="${on?'#fff':'#B9BDD8'}" stroke="${on?c:'none'}" stroke-width="2"/>`}
  return o},
 // block grids (Connections, Waffle, Knotwords)
 b(c,m){let o='';
  if(m=='f'){for(let j=0;j<5;j++)for(let i=0;i<5;i++){if(i%2&&j%2)continue;o+=R(20+i*16.5,5+j*16.5,14,14,(i+j)%4?'#2ED8A3':'#FFC93C',3)}}
  else for(let j=0;j<4;j++)for(let i=0;i<4;i++){const k=(i*5+j*3)%7==0;
   o+=m=='c'?R(19.5+i*21,4.5+j*21,18,18,['#FFC93C','#2ED8A3','#3BA7FF','#7C5CFF'][j],4):R(19.5+i*21,4.5+j*21,18,18,k?c:'#fff',4,k?'':'#DCDFF0')}
  return o},
 // bars (Contexto, Redactle, Phrazle)
 r(c,m){let o='';
  if(m=='c')[92,74,58,42,28,16].forEach((w,i)=>o+=R(14,8+i*13.5,w,10,['#2ED8A3','#8BE04E','#FFC93C','#FF9F43','#FF7A59','#FF5C93'][i],5));
  else if(m=='r')for(let j=0;j<6;j++){let x=14;for(let i=0;i<3;i++){const w=12+((j*7+i*11)%16);o+=R(x,12+j*12,w,7,(i+j)%2?'#1E1B3A':'#C9CDE3',2);x+=w+5}}
  else[[30,22,30],[22,38,18],[40,26],[18,30,24]].forEach((row,j)=>{let x=12;row.forEach((w,i)=>{o+=R(x,10+j*19,w,14,j==0?'#2ED8A3':(i+j)%2?'#FFC93C':'#fff',5,j?'#C9CDE3':'');x+=w+6})});
  return o},
 // math equations (Nerdle, Mathler)
 m(c,t){let o='';for(let j=0;j<3;j++)for(let i=0;i<6;i++){const x=4.5+i*19,y=13+j*21;
  o+=j?R(x,y,16,16,'#fff',4,'#DCDFF0'):R(x,y,16,16,['#2ED8A3','#FFC93C','#8D90AD'][(i*2)%3],4)+T(x+8,y+12,11,'#fff',t[i])}return o},
 // globe (Globle, Travle)
 g(c,rt){let o=`<circle cx="60" cy="45" r="34" fill="#BFE3FF"/><path d="M40 28c8-6 16-2 14 6s-12 8-16 14c-6-6-6-14 2-20zM68 52c8-4 16 2 12 10s-12 8-14 2 0-10 2-12z" fill="#2ED8A3"/><ellipse cx="60" cy="45" rx="16" ry="34" fill="none" stroke="#fff" stroke-width="1.5"/><path d="M26 45h68M60 11v68" stroke="#fff" stroke-width="1.5"/><circle cx="60" cy="45" r="34" fill="none" stroke="${c}" stroke-width="3"/>`;
  if(rt)o+=`<path d="M38 62Q56 28 84 34" fill="none" stroke="#1E1B3A" stroke-width="2.5" stroke-dasharray="4 4"/><circle cx="38" cy="62" r="4.5" fill="${c}"/><circle cx="84" cy="34" r="4.5" fill="#FF5C93"/>`;
  return o},
 // letter box (Letter Boxed)
 x(c){let o=R(32,20,56,50,4,'#fff',c).replace('stroke-width="1.5"','stroke-width="2.5"');
  o+=`<polyline points="44,20 60,70 88,45 76,20 32,45" fill="none" stroke="${c}" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round"/>`;
  [[44,20],[60,20],[76,20],[44,70],[60,70],[76,70],[32,32],[32,45],[32,58],[88,32],[88,45],[88,58]].forEach(([x,y])=>o+=`<circle cx="${x}" cy="${y}" r="4" fill="${c}"/>`);return o}
};
const GAMES=[
 {n:'Connections',cat:'Logic',d:'Sort sixteen words into four hidden groups.',a:['b','c']},
 {n:'Spelling Bee',cat:'Word',d:'Build words from seven letters and find the pangram.',a:['h','RAPLECT']},
 {n:'Wordle',cat:'Word',d:'Guess the five-letter word in six tries.',a:['w',1,'WORDS']},
 {n:'Strands',cat:'Logic',d:'Trace a theme through a grid of letters.',a:['d',5,[0,6,12,13,19,18]]},
 {n:'Contexto',cat:'Word',d:'Find the secret word by how close its meaning is.',a:['r','c']},
 {n:'Squaredle',cat:'Logic',d:'Swipe through a square to find every hidden word.',a:['d',3,[0,1,4,5,8],'CATRSEDOG']},
 {n:'Letter Boxed',cat:'Logic',d:'Chain words around the box using every letter.',a:['x']},
 {n:'Waffle',cat:'Logic',d:'Swap letters until every word clicks into place.',a:['b','f']},
 {n:'Quordle',cat:'Word',d:'Solve four Wordle boards at the same time.',a:['w',4]},
 {n:'Octordle',cat:'Word',d:'Eight boards, thirteen guesses, zero mercy.',a:['w',8]},
 {n:'Dordle',cat:'Word',d:'Two boards at once. A gentle step up from Wordle.',a:['w',2]},
 {n:'Phrazle',cat:'Word',d:'Decode a full phrase, one word at a time.',a:['r','p']},
 {n:'Crosswordle',cat:'Word',d:'Wordle clues meet a crossword grid.',a:['w',1,'CROSS']},
 {n:'Redactle',cat:'Word',d:'Name the article hidden behind black bars.',a:['r','r']},
 {n:'Antiwordle',cat:'Word',d:'Dodge the answer for as long as you can.',a:['w',1,'AVOID']},
 {n:'Blossom',cat:'Word',d:'Grow a flower of words from seven petals.',a:['h','FLORAYT',1]},
 {n:'Knotwords',cat:'Logic',d:'Crossword clues with a twist: letters are shared.',a:['b','k']},
 {n:'Nerdle',cat:'Math',d:'Guess the hidden equation in six tries.',a:['m','4+8=12']},
 {n:'Mathler',cat:'Math',d:'Reach the target number with the right expression.',a:['m','9*7=63']},
 {n:'Globle',cat:'Geography',d:'Find the mystery country with hot-and-cold clues.',a:['g']},
 {n:'Travle',cat:'Geography',d:'Link two countries with the fewest border hops.',a:['g',1]}
];
const gameUrl=g=>'/'+g.n.toLowerCase().replace(/\s+/g,'-')+'-unlimited/';
