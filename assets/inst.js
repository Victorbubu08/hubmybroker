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
