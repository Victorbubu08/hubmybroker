/* My Broker Store: produtos desenhados em código (SVG com a marca), provador de kits em arco, prateleira em 3D,
   categorias, vitrine e sacola que fecha o pedido pelo WhatsApp do Ronaldo. */
(function () {
  var WHATS = "5562998810378";
  var SIMB = "assets/portal/simbolo-branco.png";
  var C = {preto: "#141414", branco: "#ffffff", azul: "#2a3ae1", cinza: "#c9c9c4", areia: "#e6dfd2", grafite: "#3a3a3d", inox: "#d9dadc"};

  /* ---------- desenhos (viewBox 0 0 400 500) ---------- */
  function marca(cx, cy, s, claro, texto) {
    // o símbolo é branco; em peça clara, invertemos para preto
    var f = claro ? ' style="filter:invert(1)"' : '';
    var t = texto === false ? '' : '<text x="' + cx + '" y="' + (cy + s * .78) + '" text-anchor="middle" font-family="Hanken Grotesk, Arial, sans-serif" font-weight="700" font-size="' + (s * .26) + '" letter-spacing="' + (s * .02) + '" fill="' + (claro ? "#141414" : "#fff") + '">MY BROKER</text>';
    return '<image href="' + SIMB + '" x="' + (cx - s / 2) + '" y="' + (cy - s / 2) + '" width="' + s + '" height="' + (s * 1.046) + '"' + f + '/>' + t;
  }
  function claro(c) { return c === C.branco || c === C.areia || c === C.cinza || c === C.inox; }
  function sombra(cx, cy, rx) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + (rx * .09) + '" fill="#000" opacity=".12"/>'; }
  var D = {
    camiseta: function (c, logo) {
      return sombra(200, 452, 120) + '<path d="M135 92 L95 108 L40 158 L76 206 L110 182 L110 440 L290 440 L290 182 L324 206 L360 158 L305 108 L265 92 C255 116 230 128 200 128 C170 128 145 116 135 92 Z" fill="' + c + '" stroke="rgba(0,0,0,.12)" stroke-width="2"/>' +
        '<path d="M135 92 C145 116 170 128 200 128 C230 128 255 116 265 92" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="6"/>' + (logo ? marca(200, 230, 70, claro(c)) : '');
    },
    polo: function (c, logo) {
      return D.camiseta(c, false) + '<path d="M160 96 L200 150 L240 96" fill="none" stroke="rgba(0,0,0,.22)" stroke-width="5"/><path d="M200 150 L200 205" stroke="rgba(0,0,0,.2)" stroke-width="3"/><circle cx="200" cy="168" r="4" fill="rgba(0,0,0,.35)"/><circle cx="200" cy="190" r="4" fill="rgba(0,0,0,.35)"/>' +
        (logo ? marca(262, 200, 34, claro(c), false) : '');
    },
    moletom: function (c, logo) {
      return sombra(200, 456, 130) + '<path d="M140 100 L92 118 L46 300 L62 420 L102 416 L112 300 L112 444 L288 444 L288 300 L298 416 L338 420 L354 300 L308 118 L260 100 Z" fill="' + c + '" stroke="rgba(0,0,0,.12)" stroke-width="2"/>' +
        '<path d="M140 100 C140 50 260 50 260 100 C250 128 150 128 140 100 Z" fill="' + c + '" stroke="rgba(0,0,0,.2)" stroke-width="4"/>' +
        '<path d="M150 360 L250 360 L262 420 L138 420 Z" fill="rgba(0,0,0,.08)"/>' + (logo ? marca(200, 230, 70, claro(c)) : '');
    },
    jaqueta: function (c, logo) {
      return D.moletom(c, false) + '<path d="M200 118 L200 444" stroke="rgba(0,0,0,.35)" stroke-width="4"/><rect x="194" y="124" width="12" height="22" rx="3" fill="#bbb"/>' + (logo ? marca(250, 200, 40, claro(c), false) : '');
    },
    bone: function (c, logo) {
      return sombra(200, 380, 140) + '<path d="M90 300 C90 170 310 170 310 300 Z" fill="' + c + '" stroke="rgba(0,0,0,.15)" stroke-width="3"/><path d="M80 300 C140 290 300 290 340 304 C360 330 300 352 200 344 C120 338 70 326 80 300 Z" fill="' + c + '" stroke="rgba(0,0,0,.25)" stroke-width="3"/>' +
        '<circle cx="200" cy="176" r="8" fill="rgba(0,0,0,.25)"/>' + (logo ? marca(200, 248, 46, claro(c), false) : '');
    },
    caneca: function (c, logo) {
      return sombra(190, 420, 110) + '<path d="M290 200 C360 200 360 330 290 330" fill="none" stroke="' + c + '" stroke-width="26"/><path d="M290 200 C360 200 360 330 290 330" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="2"/>' +
        '<rect x="100" y="150" width="200" height="262" rx="18" fill="' + c + '" stroke="rgba(0,0,0,.14)" stroke-width="2"/><ellipse cx="200" cy="152" rx="100" ry="14" fill="rgba(0,0,0,.18)"/>' + (logo ? marca(200, 262, 64, claro(c)) : '');
    },
    garrafa: function (c, logo) {
      return sombra(200, 464, 70) + '<rect x="160" y="52" width="80" height="46" rx="10" fill="#222"/><path d="M150 108 C150 94 250 94 250 108 L262 150 L262 440 C262 456 138 456 138 440 L138 150 Z" fill="' + c + '" stroke="rgba(0,0,0,.14)" stroke-width="2"/>' +
        '<rect x="148" y="150" width="10" height="270" rx="5" fill="rgba(255,255,255,.25)"/>' + (logo ? marca(200, 280, 58, claro(c)) : '');
    },
    copo: function (c, logo) {
      return sombra(200, 452, 80) + '<rect x="122" y="86" width="156" height="34" rx="12" fill="#2b2b2b"/><path d="M128 122 L272 122 L252 440 C252 450 148 450 148 440 Z" fill="' + c + '" stroke="rgba(0,0,0,.14)" stroke-width="2"/>' + (logo ? marca(200, 270, 56, claro(c)) : '');
    },
    planner: function (c, logo) {
      return sombra(200, 458, 130) + '<rect x="92" y="70" width="216" height="380" rx="12" fill="' + c + '" stroke="rgba(0,0,0,.16)" stroke-width="2"/><rect x="270" y="70" width="12" height="380" fill="rgba(0,0,0,.28)"/>' +
        '<rect x="92" y="70" width="16" height="380" fill="rgba(0,0,0,.12)"/>' + (logo ? marca(190, 220, 70, claro(c)) + '<text x="190" y="330" text-anchor="middle" font-family="Hanken Grotesk, Arial" font-weight="700" font-size="30" fill="' + (claro(c) ? "#141414" : "#fff") + '">2027</text>' : '');
    },
    caderno: function (c, logo) {
      return sombra(200, 452, 120) + '<rect x="104" y="86" width="196" height="356" rx="8" fill="' + c + '" stroke="rgba(0,0,0,.16)" stroke-width="2"/>' +
        Array.apply(null, Array(12)).map(function (_, i) { return '<circle cx="104" cy="' + (110 + i * 28) + '" r="7" fill="none" stroke="#888" stroke-width="3"/>'; }).join('') + (logo ? marca(204, 240, 64, claro(c)) : '');
    },
    caneta: function (c, logo) {
      return sombra(200, 430, 150) + '<g transform="rotate(-32 200 260)"><rect x="70" y="244" width="250" height="32" rx="16" fill="' + c + '" stroke="rgba(0,0,0,.18)" stroke-width="2"/><path d="M320 244 L362 260 L320 276 Z" fill="#c9c9c9"/>' +
        '<rect x="90" y="236" width="90" height="10" rx="5" fill="#b9b9b9"/><text x="230" y="267" text-anchor="middle" font-family="Hanken Grotesk, Arial" font-weight="700" font-size="16" fill="' + (claro(c) ? "#141414" : "#fff") + '">MY BROKER</text></g>';
    },
    mousepad: function (c, logo) {
      return sombra(200, 380, 170) + '<rect x="40" y="150" width="320" height="220" rx="22" fill="' + c + '" stroke="rgba(0,0,0,.16)" stroke-width="2"/>' + (logo ? marca(200, 250, 70, claro(c)) : '');
    },
    mochila: function (c, logo) {
      return sombra(200, 462, 120) + '<path d="M160 90 C160 50 240 50 240 90" fill="none" stroke="#222" stroke-width="14"/><rect x="100" y="90" width="200" height="360" rx="44" fill="' + c + '" stroke="rgba(0,0,0,.16)" stroke-width="2"/>' +
        '<rect x="128" y="290" width="144" height="120" rx="20" fill="rgba(0,0,0,.14)"/><path d="M128 300 L272 300" stroke="rgba(0,0,0,.3)" stroke-width="4"/>' + (logo ? marca(200, 190, 60, claro(c)) : '');
    },
    ecobag: function (c, logo) {
      return sombra(200, 460, 120) + '<path d="M150 170 C150 70 250 70 250 170" fill="none" stroke="' + (claro(c) ? "#bdb5a6" : "#222") + '" stroke-width="12"/><path d="M110 160 L290 160 L304 448 L96 448 Z" fill="' + c + '" stroke="rgba(0,0,0,.14)" stroke-width="2"/>' + (logo ? marca(200, 300, 74, claro(c)) : '');
    },
    chaveiro: function (c, logo) {
      return sombra(200, 440, 70) + '<circle cx="200" cy="110" r="38" fill="none" stroke="#b5b5b5" stroke-width="10"/><rect x="190" y="146" width="20" height="40" fill="#b5b5b5"/>' +
        '<path d="M130 190 L270 190 L270 330 L200 400 L130 330 Z" fill="' + c + '" stroke="rgba(0,0,0,.16)" stroke-width="2"/>' + (logo ? marca(200, 270, 56, claro(c), false) : '');
    },
    carregador: function (c, logo) {
      return sombra(200, 450, 100) + '<rect x="120" y="90" width="160" height="340" rx="26" fill="' + c + '" stroke="rgba(0,0,0,.16)" stroke-width="2"/>' +
        [0, 1, 2, 3].map(function (i) { return '<circle cx="' + (170 + i * 20) + '" cy="390" r="5" fill="' + (i < 3 ? "#4ade80" : "rgba(255,255,255,.3)") + '"/>'; }).join('') + '<rect x="180" y="80" width="40" height="12" rx="4" fill="#555"/>' + (logo ? marca(200, 230, 62, claro(c)) : '');
    }
  };
  function svg(tipo, cor, logo, extra) {
    return '<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"' + (extra || '') + '>' + D[tipo](cor, logo !== false) + '</svg>';
  }

  /* ---------- catálogo ---------- */
  var P = [
    {id: "camiseta-elite", nome: "Camiseta Corretor de Elite", cat: "Vestuário", preco: 89, t: "camiseta", c: C.preto, d: "Algodão penteado, estampa do símbolo no peito."},
    {id: "camiseta-49", nome: "Camiseta 49 Minutos", cat: "Vestuário", preco: 89, t: "camiseta", c: C.branco, d: "A frase da rede nas costas: uma venda a cada 49 minutos."},
    {id: "polo-plantao", nome: "Polo Plantão", cat: "Vestuário", preco: 139, t: "polo", c: C.azul, d: "Piquet com o símbolo bordado. Feita para o plantão de vendas."},
    {id: "moletom-mb", nome: "Moletom My Broker", cat: "Vestuário", preco: 249, t: "moletom", c: C.grafite, d: "Moletom com capuz, felpado por dentro, símbolo grande no peito."},
    {id: "corta-vento", nome: "Jaqueta Corta-vento", cat: "Vestuário", preco: 289, t: "jaqueta", c: C.preto, d: "Leve, dobra na mochila. Para visita a obra e a terreno."},
    {id: "bone-trucker", nome: "Boné Trucker", cat: "Vestuário", preco: 79, t: "bone", c: C.azul, d: "Aba curva, regulagem atrás, símbolo bordado."},
    {id: "planner-2027", nome: "Planner do Corretor 2027", cat: "Escritório", preco: 99, t: "planner", c: C.azul, d: "Metas do mês, funil semanal e a rotina de captação da Broker Academy."},
    {id: "caderno-captacao", nome: "Caderno Captação", cat: "Escritório", preco: 49, t: "caderno", c: C.preto, d: "Espiral, 120 folhas pontilhadas, para as visitas de captação."},
    {id: "caneta-fechamento", nome: "Caneta Fechamento", cat: "Escritório", preco: 39, t: "caneta", c: C.preto, d: "Metal com tinta azul. A caneta da assinatura do contrato."},
    {id: "mousepad", nome: "Mousepad Mesa de Vendas", cat: "Escritório", preco: 45, t: "mousepad", c: C.azul, d: "Base emborrachada, 32 × 22 cm."},
    {id: "caneca-49", nome: "Caneca 49 Minutos", cat: "Casa", preco: 49, t: "caneca", c: C.branco, d: "Porcelana, 350 ml. Para o café antes da primeira ligação."},
    {id: "garrafa-termica", nome: "Garrafa Térmica 750 ml", cat: "Casa", preco: 119, t: "garrafa", c: C.azul, d: "Aço inox, 12 h gelada, 6 h quente."},
    {id: "copo-termico", nome: "Copo Térmico", cat: "Casa", preco: 89, t: "copo", c: C.preto, d: "473 ml com tampa, cabe no porta-copo do carro."},
    {id: "mochila-exec", nome: "Mochila Executiva", cat: "Acessórios", preco: 329, t: "mochila", c: C.preto, d: "Bolso acolchoado para notebook de 15,6” e saída para carregador."},
    {id: "ecobag", nome: "Ecobag Academia", cat: "Acessórios", preco: 39, t: "ecobag", c: C.areia, d: "Lona de algodão, alça longa."},
    {id: "chaveiro", nome: "Chaveiro Chave Entregue", cat: "Acessórios", preco: 29, t: "chaveiro", c: C.azul, d: "Metal esmaltado. Para a entrega das chaves ao cliente."},
    {id: "carregador", nome: "Carregador Portátil", cat: "Acessórios", preco: 149, t: "carregador", c: C.grafite, d: "10.000 mAh, USB-C. O celular não morre no plantão."}
  ];
  var K = [
    {id: "kit-boas-vindas", nome: "Boas-vindas", bg: "#2a3ae1", tinta: "#fff", selo: "Primeiro dia", frase: "Para o corretor que acabou de entrar na rede.", itens: ["camiseta-elite", "caderno-captacao", "caneta-fechamento", "caneca-49"]},
    {id: "kit-plantao", nome: "Plantão", bg: "#111111", tinta: "#fff", selo: "Estande o dia todo", frase: "O dia inteiro no estande, com estilo e café gelado.", itens: ["polo-plantao", "garrafa-termica", "bone-trucker"]},
    {id: "kit-academia", nome: "Academia 27", bg: "#FC9C55", tinta: "#111", selo: "13 e 14 de janeiro", frase: "Para os dois dias no Flamboyant Hall.", itens: ["camiseta-49", "copo-termico", "ecobag", "caderno-captacao"]},
    {id: "kit-escritorio", nome: "Escritório", bg: "#e6dfd2", tinta: "#111", selo: "Mesa de quem fecha", frase: "A mesa de quem fecha negócio.", itens: ["planner-2027", "caneca-49", "mousepad", "caneta-fechamento"]},
    {id: "kit-viagem", nome: "Viagem", bg: "#3a3a3d", tinta: "#fff", selo: "Visita a terreno", frase: "Visita a terreno, lançamento em outra cidade, voo cedo.", itens: ["mochila-exec", "corta-vento", "garrafa-termica", "carregador"]},
    {id: "kit-gestor", nome: "Gestor", bg: "#0b1350", tinta: "#fff", selo: "Reunião de segunda", frase: "Para quem lidera o time na reunião de segunda.", itens: ["moletom-mb", "planner-2027", "copo-termico", "chaveiro"]}
  ];
  var byId = {}; P.forEach(function (p) { byId[p.id] = p; });
  function brl(v) { return v.toLocaleString("pt-BR", {style: "currency", currency: "BRL"}); }
  function arte(p, extra) { return svg(p.t, p.c, true, extra); }
  function kitArte(k) {
    /* cartaz do kit: campo de cor, o nome gigante atrás, as peças arrumadas em flat lay com sombra, selo e desconto */
    var n = k.itens.length, uid = k.id;
    var lay = n === 3 ? [[40, 150, 210, 0], [200, 120, 180, 8], [150, 300, 150, -6]] : [[18, 140, 190, -4], [196, 118, 186, 6], [40, 300, 150, 5], [210, 292, 150, -7]];
    var nome = k.nome.toUpperCase();
    var fs = nome.length > 9 ? 74 : nome.length > 6 ? 92 : 112;
    var pecas = k.itens.map(function (id, i) {
      var p = byId[id], q = lay[i];
      return '<g transform="rotate(' + q[3] + ' ' + (q[0] + q[2] / 2) + ' ' + (q[1] + q[2] * .62) + ')" filter="url(#sb-' + uid + ')"><svg x="' + q[0] + '" y="' + q[1] + '" width="' + q[2] + '" height="' + (q[2] * 1.25) + '" viewBox="0 0 400 500">' + D[p.t](p.c, true) + '</svg></g>';
    }).join('');
    var t = k.tinta, linha = t === "#fff" ? "rgba(255,255,255,.16)" : "rgba(0,0,0,.12)";
    return '<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kit ' + k.nome + '">' +
      '<defs><filter id="sb-' + uid + '" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#000" flood-opacity=".28"/></filter>' +
      '<radialGradient id="lz-' + uid + '" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="400" height="500" rx="26" fill="' + k.bg + '"/><rect width="400" height="500" rx="26" fill="url(#lz-' + uid + ')"/>' +
      '<text x="200" y="118" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="' + fs + '" fill="' + linha + '">' + nome + '</text>' +
      '<text x="24" y="40" font-family="Hanken Grotesk, Arial" font-weight="700" font-size="15" letter-spacing="2" fill="' + t + '">KIT</text>' +
      '<text x="376" y="40" text-anchor="end" font-family="Hanken Grotesk, Arial" font-weight="600" font-size="14" fill="' + t + '" opacity=".8">' + k.selo + '</text>' +
      pecas +
      '<rect x="20" y="446" width="360" height="36" rx="18" fill="' + (t === "#fff" ? "#fff" : "#111") + '"/>' +
      '<text x="36" y="469" font-family="Hanken Grotesk, Arial" font-weight="700" font-size="15" fill="' + (t === "#fff" ? "#111" : "#fff") + '">' + n + ' peças · Kit ' + k.nome + '</text>' +
      '<text x="364" y="469" text-anchor="end" font-family="Hanken Grotesk, Arial" font-weight="800" font-size="15" fill="' + (t === "#fff" ? "#2a3ae1" : "#FC9C55") + '">−10%</text></svg>';
  }
  function soma(k) { return k.itens.reduce(function (t, id) { return t + byId[id].preco; }, 0); }

  /* ---------- sacola ---------- */
  var sacola = [];
  try { sacola = JSON.parse(localStorage.getItem("mb_sacola") || "[]"); } catch (e) {}
  function salva() { try { localStorage.setItem("mb_sacola", JSON.stringify(sacola)); } catch (e) {} desenhaSacola(); }
  function add(item) {
    var j = sacola.find(function (x) { return x.id === item.id; });
    if (j) j.qtd++; else sacola.push({id: item.id, nome: item.nome, preco: item.preco, qtd: 1});
    salva(); pulso();
    try { if (window.fbq) fbq("track", "AddToCart", {content_name: item.nome, value: item.preco, currency: "BRL"}); } catch (e) {}
  }
  function total() { return sacola.reduce(function (t, x) { return t + x.preco * x.qtd; }, 0); }
  var elConta = document.getElementById("st-conta"), elLista = document.getElementById("st-lista"), elTotal = document.getElementById("st-total"), gaveta = document.getElementById("st-gaveta");
  function desenhaSacola() {
    var n = sacola.reduce(function (t, x) { return t + x.qtd; }, 0);
    elConta.textContent = n;
    elLista.innerHTML = n ? sacola.map(function (x, i) {
      return '<li><div><b>' + x.nome + '</b><span>' + brl(x.preco) + '</span></div><div class="qtd"><button type="button" data-m="' + i + '" aria-label="Tirar um">−</button><span>' + x.qtd + '</span><button type="button" data-p="' + i + '" aria-label="Pôr mais um">+</button></div></li>';
    }).join('') : '<li class="vazia">A sacola está vazia.</li>';
    elTotal.textContent = brl(total());
    document.getElementById("st-fechar-pedido").disabled = !n;
  }
  elLista.addEventListener("click", function (e) {
    var m = e.target.getAttribute("data-m"), p = e.target.getAttribute("data-p");
    if (m !== null) { var x = sacola[+m]; x.qtd--; if (!x.qtd) sacola.splice(+m, 1); salva(); }
    if (p !== null) { sacola[+p].qtd++; salva(); }
  });
  function abreSacola(v) { gaveta.classList.toggle("aberta", v); gaveta.setAttribute("aria-hidden", v ? "false" : "true"); if (v) gaveta.querySelector("button").focus(); }
  document.getElementById("st-sacola").addEventListener("click", function () { abreSacola(true); });
  gaveta.querySelector(".fechar").addEventListener("click", function () { abreSacola(false); });
  document.getElementById("st-fechar-pedido").addEventListener("click", function () {
    var linhas = ["Olá! Quero fazer um pedido na My Broker Store:"].concat(sacola.map(function (x) { return x.qtd + "x " + x.nome + " (" + brl(x.preco * x.qtd) + ")"; }), ["Total: " + brl(total()), "Pode me passar o frete e a forma de pagamento?"]);
    try { if (window.fbq) fbq("track", "InitiateCheckout", {value: total(), currency: "BRL", content_name: "My Broker Store"}); } catch (e) {}
    window.open("https://wa.me/" + WHATS + "?text=" + encodeURIComponent(linhas.join("\n")), "_blank");
  });
  function pulso() { var b = document.getElementById("st-sacola"); b.classList.remove("pulsa"); void b.offsetWidth; b.classList.add("pulsa"); }

  /* ---------- provador de kits ---------- */
  var reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fila = document.getElementById("st-fila"), trilho = document.getElementById("st-trilho"), atual = 0, timer, foco = false;
  fila.innerHTML = K.map(function (k, i) { return '<button type="button" class="st-vaga" data-i="' + i + '" aria-label="Kit ' + k.nome + '">' + kitArte(k) + '</button>'; }).join('');
  trilho.innerHTML = K.map(function (k, i) { return '<button type="button" data-i="' + i + '" aria-label="Kit ' + k.nome + '"><span>' + k.nome + '</span></button>'; }).join('');
  var vagas = [].slice.call(fila.children);
  function posiciona() {
    var n = K.length;
    vagas.forEach(function (v, i) {
      var d = ((i - atual) % n + n) % n; if (d > n / 2) d -= n;
      var a = Math.abs(d), s = foco ? (d ? 0.6 : 1.04) : [1, .6, .44, .36][Math.min(a, 3)];
      var x = foco ? d * 70 : d * 44, y = foco ? 0 : -[0, 10, 16, 18][Math.min(a, 3)];
      v.style.transform = "translate(-50%,0) translate(" + x + "%, " + y + "%) scale(" + s + ")";
      v.style.filter = a ? "blur(" + [0, 2.5, 4.5, 8][Math.min(a, 3)] + "px)" : "none";
      v.style.opacity = foco ? (d ? 0 : 1) : [1, .7, .3, 0][Math.min(a, 3)];
      v.style.zIndex = 10 - a;
      v.tabIndex = d ? -1 : 0;
      v.classList.toggle("meio", !d);
    });
    [].forEach.call(trilho.children, function (b, i) { b.classList.toggle("ativo", i === atual); b.setAttribute("aria-current", i === atual ? "true" : "false"); });
    document.getElementById("st-kit-nome").textContent = "Kit " + K[atual].nome;
    document.getElementById("st-kit-frase").textContent = K[atual].frase;
    document.getElementById("st-kit-n").textContent = String(atual + 1).padStart(2, "0") + " / " + String(K.length).padStart(2, "0");
    painel();
  }
  function vai(n) { atual = (n + K.length) % K.length; posiciona(); }
  function painel() {
    var k = K[atual], s = soma(k), lista = document.getElementById("st-pecas");
    lista.classList.remove("entra"); void lista.offsetWidth;
    lista.innerHTML = k.itens.map(function (id, i) {
      var p = byId[id];
      return '<li style="--i:' + i + '"><span class="mini">' + arte(p) + '</span><span class="txt"><b>' + p.nome + '</b><small>' + p.cat + '</small></span><span class="pr">' + brl(p.preco) + '</span><button type="button" class="mais" data-add="' + id + '" aria-label="Pôr ' + p.nome + ' na sacola">+</button></li>';
    }).join('');
    lista.classList.add("entra");
    document.getElementById("st-de").textContent = brl(s);
    document.getElementById("st-por").textContent = brl(Math.round(s * 90) / 100);
  }
  document.getElementById("st-pecas").addEventListener("click", function (e) { var id = e.target.getAttribute("data-add"); if (id) add(byId[id]); });
  document.getElementById("st-add-kit").addEventListener("click", function () {
    var k = K[atual]; add({id: k.id, nome: "Kit " + k.nome + " (" + k.itens.map(function (id) { return byId[id].nome; }).join(", ") + ")", preco: Math.round(soma(k) * 90) / 100});
  });
  function auto() { clearInterval(timer); if (!reduz && !foco && document.getElementById("st-play").getAttribute("aria-pressed") === "true") timer = setInterval(function () { vai(atual + 1); }, 5000); }
  document.getElementById("st-ant").addEventListener("click", function () { vai(atual - 1); auto(); });
  document.getElementById("st-prox").addEventListener("click", function () { vai(atual + 1); auto(); });
  document.getElementById("st-play").addEventListener("click", function () { var p = this.getAttribute("aria-pressed") !== "true"; this.setAttribute("aria-pressed", p); this.textContent = p ? "Pausar" : "Tocar"; auto(); });
  trilho.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { vai(+b.getAttribute("data-i")); auto(); } });
  function abreFoco(v) { foco = v; document.getElementById("st-palco").classList.toggle("foco", v); posiciona(); auto(); }
  fila.addEventListener("click", function (e) {
    var b = e.target.closest(".st-vaga"); if (!b) return;
    var i = +b.getAttribute("data-i");
    if (i === atual) abreFoco(!foco); else { if (foco) abreFoco(false); vai(i); auto(); }
  });
  document.getElementById("st-fechar-foco").addEventListener("click", function () { abreFoco(false); });
  var palco = document.getElementById("st-palco");
  palco.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { vai(atual - 1); auto(); } else if (e.key === "ArrowRight") { vai(atual + 1); auto(); } else if (e.key === "Escape") abreFoco(false);
  });
  var x0 = null;
  palco.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
  palco.addEventListener("pointerup", function (e) { if (x0 !== null && Math.abs(e.clientX - x0) > 50) { vai(atual + (e.clientX < x0 ? 1 : -1)); auto(); } x0 = null; });
  var rodaT = 0;
  palco.addEventListener("wheel", function (e) { if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20 && Date.now() - rodaT > 700) { rodaT = Date.now(); vai(atual + (e.deltaX > 0 ? 1 : -1)); auto(); e.preventDefault(); } }, {passive: false});
  posiciona(); auto();

  /* ---------- manifesto que acende letra a letra ---------- */
  var man = document.getElementById("st-manifesto"), frase = man.querySelector("p");
  frase.innerHTML = frase.textContent.split("").map(function (ch) { return ch === " " ? " " : '<span>' + ch + '</span>'; }).join("");
  var letras = frase.querySelectorAll("span");
  function acende() {
    var r = man.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height * .9)));
    var n = Math.round(p * letras.length);
    letras.forEach(function (l, i) { l.classList.toggle("on", reduz || i < n); });
  }
  addEventListener("scroll", acende, {passive: true}); acende();

  /* ---------- prateleira em 3D ---------- */
  var prat = document.getElementById("st-prateleira");
  var destaque = ["moletom-mb", "garrafa-termica", "camiseta-elite", "mochila-exec", "planner-2027", "caneca-49", "bone-trucker", "carregador"];
  prat.innerHTML = destaque.map(function (id) { var p = byId[id]; return '<button type="button" class="st-peca" data-id="' + id + '" aria-label="' + p.nome + ', ' + brl(p.preco) + '"><span class="giro">' + arte(p) + '</span><span class="nome">' + p.nome + '</span></button>'; }).join('');
  var modal = document.getElementById("st-modal");
  prat.addEventListener("click", function (e) {
    var b = e.target.closest(".st-peca"); if (!b) return;
    var p = byId[b.getAttribute("data-id")];
    modal.querySelector(".obj").innerHTML = '<span class="frente">' + arte(p) + '</span><span class="costas">' + svg(p.t, p.c, false) + '</span>';
    modal.querySelector("h3").textContent = p.nome;
    modal.querySelector(".desc").textContent = p.d;
    modal.querySelector(".preco").textContent = brl(p.preco);
    modal.querySelector(".add").onclick = function () { add(p); };
    modal.showModal ? modal.showModal() : modal.setAttribute("open", "");
  });
  modal.querySelector(".fechar").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
  /* arrastar o objeto do modal gira no dedo */
  var obj = modal.querySelector(".obj"), gx = null, ang = 0;
  obj.addEventListener("pointerdown", function (e) { gx = e.clientX; obj.classList.add("mao"); obj.setPointerCapture(e.pointerId); });
  obj.addEventListener("pointermove", function (e) { if (gx === null) return; ang += (e.clientX - gx) * .8; gx = e.clientX; obj.style.transform = "rotateY(" + ang + "deg)"; });
  obj.addEventListener("pointerup", function () { gx = null; obj.classList.remove("mao"); obj.style.transform = ""; ang = 0; });

  /* ---------- categorias e vitrine ---------- */
  var cats = ["Tudo", "Vestuário", "Escritório", "Casa", "Acessórios"], filtro = "Tudo", pagina = 0, POR = 4;
  var lc = document.getElementById("st-cats");
  lc.innerHTML = cats.map(function (c) { var n = c === "Tudo" ? P.length : P.filter(function (p) { return p.cat === c; }).length; return '<li><button type="button" data-c="' + c + '">' + c + '<sup>' + n + '</sup></button></li>'; }).join('');
  var chips = document.getElementById("st-chips");
  chips.innerHTML = cats.map(function (c) { return '<button type="button" data-c="' + c + '">' + c + '</button>'; }).join('');
  function filtra(c, rola) {
    filtro = c; pagina = 0;
    [].forEach.call(lc.querySelectorAll("button"), function (b) { b.classList.toggle("ativo", b.getAttribute("data-c") === c); });
    [].forEach.call(chips.children, function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-c") === c); });
    vitrine();
    if (rola) document.getElementById("vitrine").scrollIntoView({behavior: reduz ? "auto" : "smooth"});
  }
  lc.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) filtra(b.getAttribute("data-c"), true); });
  chips.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) filtra(b.getAttribute("data-c")); });
  function lista() { return P.filter(function (p) { return filtro === "Tudo" || p.cat === filtro; }); }
  function vitrine() {
    var l = lista(), tot = Math.ceil(l.length / POR), g = document.getElementById("st-grade");
    pagina = Math.min(pagina, tot - 1);
    var pag = l.slice(pagina * POR, pagina * POR + POR);
    g.classList.remove("troca"); void g.offsetWidth; g.classList.add("troca");
    g.innerHTML = pag.map(function (p) { return '<article class="st-card"><div class="foto">' + arte(p) + '<button type="button" class="mais" data-add="' + p.id + '" aria-label="Pôr ' + p.nome + ' na sacola">+</button></div><h3>' + p.nome + '</h3><p class="cat">' + p.cat + '</p><p class="d">' + p.d + '</p><p class="pr">' + brl(p.preco) + '</p></article>'; }).join('');
    document.getElementById("st-pag").textContent = (pagina * POR + 1) + "–" + (pagina * POR + pag.length) + " de " + l.length;
    document.getElementById("st-v-ant").disabled = pagina === 0;
    document.getElementById("st-v-prox").disabled = pagina >= tot - 1;
  }
  document.getElementById("st-grade").addEventListener("click", function (e) { var id = e.target.getAttribute("data-add"); if (id) add(byId[id]); });
  document.getElementById("st-v-ant").addEventListener("click", function () { pagina--; vitrine(); });
  document.getElementById("st-v-prox").addEventListener("click", function () { pagina++; vitrine(); });
  filtra("Tudo");
  desenhaSacola();
})();
