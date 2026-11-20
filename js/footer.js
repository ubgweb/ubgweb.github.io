class SiteFooter extends HTMLElement{
 connectedCallback(){
  const links=GAMES.map(g=>`<li><a href="${gameUrl(g)}">${g.n} Unlimited</a></li>`).join('');
  this.innerHTML=`<footer class="ft"><div class="wrap">
   <div class="ft-top">
    <div><a class="logo" href="/" aria-label="UBGWeb home">${LOGO}<span>UBG<b>Web</b></span></a>
     <p style="color:var(--mut);margin-top:14px;max-width:34ch">Unlimited and unblocked word, logic, math and geography games. Play as many puzzles as you like.</p></div>
    <nav aria-label="Games"><ul>${links}</ul></nav>
   </div>
   <small>&copy; ${new Date().getFullYear()} UBGWeb. <a href="/about/">About</a> &nbsp; <a href="/privacy/">Privacy</a> &nbsp; <a href="/terms/">Terms</a> &nbsp; <a href="/contact/">Contact</a><br>
   UBGWeb is an independent fan project and is not affiliated with The New York Times or the creators of the original games. All game names belong to their respective owners.</small>
  </div></footer>`;
 }
}
customElements.define('site-footer',SiteFooter);
