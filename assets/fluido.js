/* Abertura: fluido azul granulado em WebGL. Manchas de tinta que se dobram devagar, com grão de impressão por cima,
   nas cores da My Broker (marinho, azul da marca, azul claro). Responde de leve ao mouse.
   Sem WebGL, fica o degradê azul do CSS. Com "reduzir movimento", um quadro parado. */
(function(){
  var tela = document.getElementById("heroOndas");
  if (!tela) return;
  var gl = tela.getContext("webgl", { antialias:false, alpha:false, powerPreference:"low-power", preserveDrawingBuffer:false });
  if (!gl) return;

  var VERT = "attribute vec2 a; void main(){ gl_Position = vec4(a,0.,1.); }";
  var FRAG = [
    "precision highp float;",
    "uniform vec2 r; uniform float t; uniform vec2 m;",
    "float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }",
    "float n(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);",
    "  return mix(mix(h(i),h(i+vec2(1,0)),u.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x), u.y); }",
    "float fbm(vec2 p){ float v=0., a=.5; mat2 R=mat2(.8,.6,-.6,.8);",
    "  for(int k=0;k<5;k++){ v+=a*n(p); p=R*p*2.03+3.1; a*=.5; } return v; }",
    "vec3 rampa(float x){",
    "  vec3 c0=vec3(.016,.031,.20), c1=vec3(.04,.06,.63), c2=vec3(.165,.227,.882), c3=vec3(.52,.58,1.), c4=vec3(.93,.94,1.);",
    "  x=clamp(x,0.,1.);",
    "  if(x<.35) return mix(c0,c1,x/.35);",
    "  if(x<.62) return mix(c1,c2,(x-.35)/.27);",
    "  if(x<.84) return mix(c2,c3,(x-.62)/.22);",
    "  return mix(c3,c4,(x-.84)/.16); }",
    "void main(){",
    "  vec2 uv = gl_FragCoord.xy / r.y; vec2 mm = (m - .5) * vec2(r.x/r.y, 1.);",
    "  float s = t*.035;",
    "  vec2 q = vec2(fbm(uv*1.4 + vec2(0., s)), fbm(uv*1.4 + vec2(5.2,1.3) - s));",
    "  vec2 w = vec2(fbm(uv*1.4 + 3.6*q + vec2(1.7,9.2) + s*1.3 + mm*.35), fbm(uv*1.4 + 3.6*q + vec2(8.3,2.8) - s*.9));",
    "  float f = fbm(uv*1.4 + 3.4*w);",
    "  float v = f*f*1.55 + .35*q.x*w.y - .08;",
    "  v += .18 * smoothstep(.55, .0, length(uv - vec2(r.x/r.y*.78, .55) - mm*.15));",
    "  float g = h(floor(gl_FragCoord.xy) + fract(t*7.)*61.);",
    "  float grao = (g - .5) * .22;",
    "  vec3 c = rampa(v + grao);",
    "  c *= 1. - .25 * smoothstep(.2, .0, gl_FragCoord.y / r.y);",
    "  gl_FragColor = vec4(c, 1.);",
    "}"
  ].join("\n");

  function sh(tipo, src){ var o = gl.createShader(tipo); gl.shaderSource(o, src); gl.compileShader(o); return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null; }
  var vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;
  var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  var la = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(la); gl.vertexAttribPointer(la, 2, gl.FLOAT, false, 0, 0);
  var uR = gl.getUniformLocation(pr, "r"), uT = gl.getUniformLocation(pr, "t"), uM = gl.getUniformLocation(pr, "m");

  var mx = .5, my = .5, alvoX = .5, alvoY = .5;
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function medir(){
    var q = Math.min(window.devicePixelRatio || 1, 1.5) * .8;
    var w = Math.max(1, Math.round(tela.clientWidth * q)), hh = Math.max(1, Math.round(tela.clientHeight * q));
    if (tela.width !== w || tela.height !== hh){ tela.width = w; tela.height = hh; gl.viewport(0, 0, w, hh); }
  }
  var host = tela.parentElement;
  host.addEventListener("pointermove", function(e){
    var b = host.getBoundingClientRect(); alvoX = (e.clientX - b.left) / b.width; alvoY = 1 - (e.clientY - b.top) / b.height;
  });
  var visivel = true;
  if ("IntersectionObserver" in window){ new IntersectionObserver(function(es){ visivel = es[0].isIntersecting; if (visivel && !reduz) requestAnimationFrame(quadro); }).observe(tela); }
  var t0 = performance.now(), ultimo = 0;
  function desenhar(seg){
    medir();
    mx += (alvoX - mx) * .04; my += (alvoY - my) * .04;
    gl.uniform2f(uR, tela.width, tela.height); gl.uniform1f(uT, seg); gl.uniform2f(uM, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function quadro(agora){
    if (!visivel) return;
    if (agora - ultimo > 32){ ultimo = agora; desenhar((agora - t0) / 1000 + 20); }
    requestAnimationFrame(quadro);
  }
  window.addEventListener("resize", function(){ if (reduz) desenhar(20); });
  desenhar(20); tela.classList.add("pronta");
  if (!reduz) requestAnimationFrame(quadro);
})();
