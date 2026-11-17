/* Comportamentos da capa institucional: contagem da Academia, mapa das cidades e formulários para o WhatsApp */
(function(){
  var WHATSAPP = "5562998810378"; /* WhatsApp da IA do Ronaldo Dantas */
  var VIRA = new Date("2026-11-20T23:59:59-03:00").getTime(), EVENTO = new Date("2027-01-13T08:00:00-03:00").getTime();
  var rel = document.querySelectorAll("[data-relogio]");
  function p(n){ return String(n).padStart(2,"0"); }
  function tique(){
    var alvo = Date.now() < VIRA ? VIRA : EVENTO, t = Math.max(0, Math.floor((alvo - Date.now())/1000));
    var d = [Math.floor(t/86400), Math.floor(t%86400/3600), Math.floor(t%3600/60), t%60];
    rel.forEach(function(r){ r.innerHTML = ["dias","horas","min","seg"].map(function(u,i){ return '<span><b>'+p(d[i])+'</b><small>'+u+'</small></span>'; }).join(""); });
    document.querySelectorAll("[data-relogio-rotulo]").forEach(function(e){ e.textContent = Date.now() < VIRA ? "O 3º lote vira em" : "Faltam para o evento"; });
  }
  if (rel.length){ tique(); setInterval(tique, 1000); }

  /* mapa: botão da lista acende o pino e vice-versa */
  var pinos = document.querySelectorAll(".i-pino"), botoes = document.querySelectorAll(".i-regiao button");
  function acende(i){
    pinos.forEach(function(g){ g.classList.toggle("on", g.dataset.i === String(i)); });
    botoes.forEach(function(b){ b.classList.toggle("on", b.dataset.i === String(i)); });
  }
  botoes.forEach(function(b){ b.addEventListener("click", function(){ acende(b.dataset.i); }); b.addEventListener("mouseenter", function(){ acende(b.dataset.i); }); });
  pinos.forEach(function(g){ g.style.cursor = "pointer"; g.addEventListener("click", function(){ acende(g.dataset.i); }); });

  /* formulários: montam a mensagem e abrem o WhatsApp */
  document.querySelectorAll("form[data-whatsapp]").forEach(function(f){
    f.addEventListener("submit", function(e){
      e.preventDefault();
      if (!f.checkValidity()){ f.reportValidity(); return; }
      var linhas = [f.getAttribute("data-whatsapp")];
      f.querySelectorAll("input:not([type=hidden]),select,textarea").forEach(function(c){
        if (!c.value) return;
        var l = f.querySelector('label[for="'+c.id+'"]');
        linhas.push((l ? l.textContent.trim() : c.name) + ": " + c.value.trim());
      });
      var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(linhas.join("\n"));
      var ok = f.querySelector(".i-ok");
      if (!ok){ ok = document.createElement("p"); ok.className = "i-ok"; f.appendChild(ok); }
      ok.textContent = "Mensagem pronta. ";
      var a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Abrir o WhatsApp";
      ok.appendChild(a);
      window.open(url, "_blank");
    });
  });
})();

/* cards dos caminhos: as fotos se revezam, cada card no seu tempo */
(function(){
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll("[data-fotos]").forEach(function(box, n){
    var fotos = box.querySelectorAll("img"); if (fotos.length < 2) return;
    var i = 0;
    setTimeout(function(){ setInterval(function(){
      fotos[i].classList.remove("on"); i = (i + 1) % fotos.length; fotos[i].classList.add("on");
    }, 4200); }, n * 900);
  });
})();

/* topo no celular: botão Menu, barra compacta ao rolar, some ao descer e volta ao subir */
(function () {
  var topo = document.querySelector(".topo"), nav = topo && topo.querySelector("nav");
  if (!topo || !nav) return;
  var portal = topo.querySelector(".topo__acoes a");
  if (portal) {   /* o portal de imóveis entra na lista do menu no celular */
    var li = document.createElement("li"); li.className = "i-so-cel";
    li.innerHTML = portal.outerHTML; nav.querySelector("ul").appendChild(li);
  }
  var btn = document.createElement("button");
  btn.type = "button"; btn.className = "i-menu-btn"; btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "menu");
  btn.innerHTML = '<i class="ph ph-list" aria-hidden="true"></i><span>Menu</span>';
  topo.appendChild(btn);
  function abre(sim) {
    topo.classList.toggle("aberto", sim); btn.setAttribute("aria-expanded", String(sim));
    btn.querySelector("i").className = "ph " + (sim ? "ph-x" : "ph-list");
    if (sim) topo.classList.remove("some");
  }
  btn.addEventListener("click", function () { abre(!topo.classList.contains("aberto")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) abre(false); });
  document.addEventListener("click", function (e) { if (!topo.contains(e.target)) abre(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") abre(false); });
  var ultimo = window.scrollY, pedido = false;
  function rola() {
    pedido = false;
    var y = window.scrollY, celular = window.matchMedia("(max-width:760px)").matches;
    topo.classList.toggle("rolou", celular && y > 10);
    if (celular && !topo.classList.contains("aberto")) topo.classList.toggle("some", y > 140 && y > ultimo + 4 ? true : y < ultimo - 4 ? false : topo.classList.contains("some"));
    else topo.classList.remove("some");
    ultimo = y;
  }
  window.addEventListener("scroll", function () { if (!pedido) { pedido = true; requestAnimationFrame(rola); } }, {passive: true});
  rola();
})();
