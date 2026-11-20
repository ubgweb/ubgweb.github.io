const LOGO='<svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true"><rect x="2" y="2" width="13" height="13" rx="4" fill="#7C5CFF"/><rect x="17" y="2" width="13" height="13" rx="4" fill="#FF5C93"/><rect x="2" y="17" width="13" height="13" rx="4" fill="#2ED8A3"/><rect x="17" y="17" width="13" height="13" rx="4" fill="#FFC93C"/></svg>';
class SiteHeader extends HTMLElement{
 connectedCallback(){
  this.innerHTML=`<header class="hd"><div class="wrap hd-in">
   <a class="logo" href="/" aria-label="UBGWeb home">${LOGO}<span>UBG<b>Web</b></span></a>
   <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
   <nav class="nav" id="nav" aria-label="Main">
    <a href="/#games">Games</a><a href="/#why">Why Unlimited</a><a href="/#how">How it works</a><a href="/#faq">FAQ</a>
    <a class="btn sm" href="/#games">Play now</a>
   </nav></div></header>`;
  const b=this.querySelector('.burger'),n=this.querySelector('.nav');
  b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu')});
  n.addEventListener('click',e=>{if(e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded',false)}});
 }
}
customElements.define('site-header',SiteHeader);
