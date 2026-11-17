/* Rastreio do site My Broker: cada visita e clique vai para o painel (hubmybroker.com.br/painel).
   Guarda de onde a pessoa veio (utm_source, utm_medium, utm_campaign ou o site que mandou) durante a visita.
   Quem é da equipe (abriu o painel neste navegador) não entra nos números. */
(function () {
  var API = "https://www.gpsdoincorporador.com.br/api/evento";
  function get(store, k) { try { return window[store].getItem(k); } catch (e) { return null; } }
  function set(store, k, v) { try { window[store].setItem(k, v); } catch (e) {} }
  if (get("localStorage", "mb_equipe")) return;

  var id = get("localStorage", "mb_v");
  if (!id) {
    id = "";
    for (var i = 0; i < 20; i++) id += "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)];
    set("localStorage", "mb_v", id);
  }

  var q = new URLSearchParams(location.search);
  var origem = get("sessionStorage", "mb_o"), meio = get("sessionStorage", "mb_m") || "", campanha = get("sessionStorage", "mb_c") || "";
  if (!origem || q.get("utm_source")) {
    var src = (q.get("utm_source") || "").toLowerCase(), med = (q.get("utm_medium") || "").toLowerCase();
    var ref = ""; try { ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : ""; } catch (e) {}
    var pago = /paid|cpc|ads?|patrocinado/.test(med);
    if (src) {
      origem = /youtube|^yt$/.test(src) ? "youtube"
        : /instagram|^ig$/.test(src) ? (pago ? "anuncio" : "instagram")
        : /facebook|^fb$|meta/.test(src) ? (pago ? "anuncio" : "facebook")
        : /google/.test(src) ? "google" : /whats|^wa$/.test(src) ? "whatsapp" : "outro";
    } else if (q.get("fbclid")) origem = "anuncio";
    else if (q.get("gclid")) origem = "google";
    else if (/youtube|youtu\.be/.test(ref)) origem = "youtube";
    else if (/instagram/.test(ref)) origem = "instagram";
    else if (/facebook|fb\.com/.test(ref)) origem = "facebook";
    else if (/google\./.test(ref)) origem = "google";
    else if (/whatsapp|wa\.me/.test(ref)) origem = "whatsapp";
    else if (ref && !/hubmybroker/.test(ref)) origem = "outro";
    else origem = origem || "direto";
    meio = med || (src ? "" : ref && !/hubmybroker/.test(ref) ? "link" : meio);
    campanha = q.get("utm_campaign") || (src ? "" : campanha);
    set("sessionStorage", "mb_o", origem); set("sessionStorage", "mb_m", meio); set("sessionStorage", "mb_c", campanha);
  }

  function envia(tipo) {
    var body = JSON.stringify({site: "mybroker", tipo: tipo, visitante: id, origem: origem, meio: meio, campanha: campanha,
      pagina: location.pathname.replace(/^.*?(\/academia\/|\/[^\/]*$)/, "$1") || "/"});
    try { fetch(API, {method: "POST", mode: "no-cors", keepalive: true, body: body}); } catch (e) {}
  }
  envia("visita");

  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("a,[data-buy]") : null;
    if (!el) return;
    var buy = el.getAttribute("data-buy");
    if (buy) return envia("comprar_" + buy.toLowerCase());
    var href = el.getAttribute("href") || "";
    if (/wa\.me|whatsapp\.com/.test(href)) envia("whatsapp");
    else if (/mybroker-portal|portal/.test(href) && /^https?:/.test(href)) envia("portal");
  }, true);
  document.addEventListener("submit", function (e) {
    var p = location.pathname;
    envia(/franquia/.test(p) ? "form_franquia" : /corretor/.test(p) ? "form_corretor" : "whatsapp");
  }, true);
})();
