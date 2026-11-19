/* Topo, rodapé e comportamentos comuns das páginas institucionais da My Broker */
(function(){
  var WHATSAPP = "5562998810378"; /* WhatsApp da IA do Ronaldo Dantas */
  var cfg = window.MB || {};
  var raiz = cfg.raiz || "";
  var aqui = cfg.pagina || "";

  var I = {
    historia:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>',
    evento:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 17v2M13 11v2"/></svg>',
    franquia:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/><path d="M9 10h.01M15 10h.01"/></svg>',
    corretor:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/><path d="M16 3.5l1.5 1.5L20 2.5"/></svg>',
    instituto:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>',
    casa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    seta:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    zap:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z"/></svg>'
  };
  window.MB_ICONES = I;

  var links = [
    ["historia", raiz+"index.html#historia", "Nossa história", "historia"],
    ["evento", raiz+"academia/index.html", "Academia de Vendas 27", "evento"],
    ["ronaldo", raiz+"ronaldo.html", "Ronaldo Dantas", "corretor"],
    ["franquia", raiz+"franquia.html", "Seja franqueado", "franquia"],
    ["corretor", raiz+"corretor.html", "Seja corretor", "corretor"],
    ["instituto", "https://membros.institutomybroker.com.br/area/vitrine/home", "Broker Academy", "instituto"]
  ];
  var topo = document.getElementById("topo");
  if (topo){
    topo.className = "topo";
    topo.innerHTML = '<div class="wrap"><a class="marca" href="'+raiz+'index.html" aria-label="My Broker, página inicial"><img src="'+raiz+'assets/my-broker-v1-480.webp" alt="My Broker" width="960" height="212"></a>'+
      '<nav aria-label="Principal"><ul class="menu" id="menu">'+links.map(function(l){
        var ext = l[1].indexOf("http")===0;
        return '<li><a href="'+l[1]+'"'+(l[0]==="evento"?' class="evento"':'')+(aqui===l[0]?' aria-current="page"':'')+(ext?' target="_blank" rel="noopener"':'')+'>'+I[l[3]]+'<span>'+l[2]+'</span></a></li>';
      }).join("")+'</ul></nav>'+
      '<a class="acao" href="https://mybroker-portal.vercel.app/prototipos-portal/inicio.html" target="_blank" rel="noopener">'+I.casa+'Portal de imóveis</a>'+
      '<button class="burger" type="button" aria-label="Abrir o menu" aria-expanded="false" aria-controls="menu">'+I.menu+'</button></div>';
    var b = topo.querySelector(".burger");
    b.addEventListener("click", function(){ var a = topo.classList.toggle("aberto"); b.setAttribute("aria-expanded", a?"true":"false"); });
    topo.querySelectorAll(".menu a").forEach(function(a){ a.addEventListener("click", function(){ topo.classList.remove("aberto"); }); });
  }

  var rod = document.getElementById("rodape");
  if (rod){
    rod.className = "rodape";
    rod.innerHTML = '<div class="wrap"><div><img src="'+raiz+'assets/my-broker-v1-480.webp" alt="My Broker"><p>Bem-vindo ao seu ecossistema de prosperidade. Formação, orientação, comunidade, tecnologia, execução e resultados.</p></div>'+
      '<div><h4>Institucional</h4><ul><li><a href="'+raiz+'index.html#historia">Nossa história</a></li><li><a href="'+raiz+'index.html#reconhecimentos">Reconhecimentos</a></li><li><a href="'+raiz+'ronaldo.html">Palestras e mentorias</a></li><li><a href="'+raiz+'divulgar.html">Kit de divulgação</a></li><li><a href="https://www.youtube.com/@ronaldodantasmb" target="_blank" rel="noopener">Canal no YouTube</a></li></ul></div>'+
      '<div><h4>Faça parte</h4><ul><li><a href="'+raiz+'franquia.html">Seja franqueado</a></li><li><a href="'+raiz+'corretor.html">Seja corretor</a></li><li><a href="'+raiz+'academia/index.html">Academia de Vendas 27</a></li></ul></div>'+
      '<div><h4>Para você</h4><ul><li><a href="https://mybroker-portal.vercel.app/prototipos-portal/inicio.html" target="_blank" rel="noopener">Portal de imóveis</a></li><li><a href="https://membros.institutomybroker.com.br/area/vitrine/home" target="_blank" rel="noopener">Broker Academy</a></li></ul></div><p class="nome" aria-hidden="true">My Broker</p><p class="legal">© 2026 My Broker · CRECI 29886</p></div>';
  }

  /* contagem até a virada do 3º lote (20/11) e depois até o evento */
  var VIRA = new Date("2026-11-20T23:59:59-03:00").getTime(), EVENTO = new Date("2027-01-13T08:00:00-03:00").getTime();
  var rel = document.querySelectorAll("[data-relogio]");
  if (rel.length){
    var p = function(n){ return String(n).padStart(2,"0"); };
    var tique = function(){
      var alvo = Date.now() < VIRA ? VIRA : EVENTO;
      var t = Math.max(0, Math.floor((alvo - Date.now())/1000));
      var d = [Math.floor(t/86400), Math.floor(t%86400/3600), Math.floor(t%3600/60), t%60];
      rel.forEach(function(r){
        r.innerHTML = ["dias","horas","min","seg"].map(function(u,i){ return '<span><b>'+p(d[i])+'</b><small>'+u+'</small></span>'; }).join("");
      });
      document.querySelectorAll("[data-relogio-rotulo]").forEach(function(e){ e.textContent = Date.now() < VIRA ? "O 3º lote vira em" : "Faltam para o evento"; });
    };
    tique(); setInterval(tique, 1000);
  }

  /* formulários: montam a mensagem e abrem o WhatsApp */
  document.querySelectorAll("form[data-whatsapp]").forEach(function(f){
    f.addEventListener("submit", function(e){
      e.preventDefault();
      var linhas = [f.getAttribute("data-whatsapp")];
      f.querySelectorAll("input,select,textarea").forEach(function(c){
        if (c.value && c.name) linhas.push(c.name + ": " + c.value.trim());
      });
      var url = "https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(linhas.join("\n"));
      var ok = f.querySelector(".ok");
      var a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Abrir o WhatsApp com a mensagem";
      if (ok){ ok.hidden = false; ok.innerHTML = "Mensagem pronta. "; ok.appendChild(a); }
      window.open(url, "_blank");
    });
  });
  /* WhatsApp do Ronaldo, sempre à mão */
  var zap = document.createElement("a");
  zap.className = "i-zap"; zap.target = "_blank"; zap.rel = "noopener";
  zap.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Olá, Ronaldo! Vim pelo site da My Broker.");
  zap.setAttribute("aria-label", "Falar com o Ronaldo Dantas no WhatsApp");
  zap.innerHTML = '<img src="'+raiz+'assets/ronaldo-avatar.jpg" alt="" width="52" height="52"><span class="i-zap__txt"><b>Fale com o Ronaldo</b><small>Responde no WhatsApp</small></span><span class="i-zap__ico" aria-hidden="true">'+I.zap+'</span>';
  document.body.appendChild(zap);
  /* entrada em cascata das partes de cada seção, uma vez, quando a seção aparece */
  document.documentElement.classList.add("js");
  var partes = document.querySelectorAll(".entra");
  if ("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("dentro"); io.unobserve(e.target); } }); }, {rootMargin:"0px 0px -8% 0px"});
    partes.forEach(function(el){ io.observe(el); });
  } else partes.forEach(function(el){ el.classList.add("dentro"); });
  document.querySelectorAll("[data-icone]").forEach(function(el){ el.insertAdjacentHTML("afterbegin", I[el.getAttribute("data-icone")] || ""); });
})();
