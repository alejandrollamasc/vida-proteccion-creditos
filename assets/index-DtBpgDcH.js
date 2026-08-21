(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))m(r);new MutationObserver(r=>{for(const g of r)if(g.type==="childList")for(const x of g.addedNodes)x.tagName==="LINK"&&x.rel==="modulepreload"&&m(x)}).observe(document,{childList:!0,subtree:!0});function u(r){const g={};return r.integrity&&(g.integrity=r.integrity),r.referrerPolicy&&(g.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?g.credentials="include":r.crossOrigin==="anonymous"?g.credentials="omit":g.credentials="same-origin",g}function m(r){if(r.ep)return;r.ep=!0;const g=u(r);fetch(r.href,g)}})();window.self===window.top||be();function be(){let d=!1,e=null,u=!1,m=[],r=[],g=!1,x={},b=null,B=1e4;const f=5,y=document.createElement("div");y.id="editor-toolbar",y.innerHTML="",y.style.cssText="display:none;position:fixed;z-index:99999;",document.body.appendChild(y);const v=document.createElement("div");v.id="resize-box",v.style.cssText="display:none;position:fixed;z-index:99998;pointer-events:none;border:2px solid #0a6741;",["nw","ne","sw","se","n","s","e","w"].forEach(t=>{const o=document.createElement("div");o.className="resize-handle",o.dataset.dir=t,o.style.cssText=`position:absolute;width:8px;height:8px;background:#0a6741;border-radius:2px;pointer-events:all;cursor:${t}-resize;`;const n={nw:"top:-4px;left:-4px;",ne:"top:-4px;right:-4px;",sw:"bottom:-4px;left:-4px;",se:"bottom:-4px;right:-4px;",n:"top:-4px;left:50%;transform:translateX(-50%);",s:"bottom:-4px;left:50%;transform:translateX(-50%);",e:"top:50%;right:-4px;transform:translateY(-50%);",w:"top:50%;left:-4px;transform:translateY(-50%);"};o.style.cssText+=n[t],v.appendChild(o)}),document.body.appendChild(v);const _=document.createElement("div");_.className="rotate-line",v.appendChild(_);const N=document.createElement("div");N.className="rotate-handle",v.appendChild(N),N.addEventListener("mousedown",t=>{if(!e)return;t.preventDefault(),t.stopPropagation();const o=e.getBoundingClientRect(),n=o.left+o.width/2,s=o.top+o.height/2;parseFloat(e.dataset.rotation||"0");const a=c=>{const p=Math.atan2(c.clientY-s,c.clientX-n)*(180/Math.PI)+90;e.style.transform=`rotate(${Math.round(p)}deg)`,e.dataset.rotation=Math.round(p),V(e)},l=()=>{document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",l),w("changeStyle",e,"transform",e.style.transform)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",l)});const W=document.createElement("div");W.style.cssText="display:none;position:fixed;z-index:99997;background:#E8C916;color:#333;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;pointer-events:none;",document.body.appendChild(W);const A=document.createElement("div");A.id="alignment-guides",A.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99996;",document.body.appendChild(A);const F=document.createElement("div");F.id="text-cursor",F.style.cssText="display:none;position:fixed;z-index:99999;pointer-events:none;",F.innerHTML=`
  <div style="display:flex;align-items:center;gap:4px;">
    <div style="width:2px;height:20px;background:#0a6741;animation:blink 0.8s infinite;"></div>
    <span style="font-size:10px;color:#0a6741;font-weight:600;background:rgba(255,255,255,0.9);padding:1px 6px;border-radius:4px;white-space:nowrap;">Clic para insertar texto</span>
  </div>
`,document.body.appendChild(F);const Q=document.createElement("style");Q.textContent=`
  #editor-toolbar button { width:30px;height:30px;border:none;background:transparent;border-radius:6px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:background 0.1s; }
  #editor-toolbar button:hover { background:#f0f0f0; }
  [contenteditable=true] { outline:1.5px dashed #0a6741 !important; outline-offset:2px; background:rgba(10,103,65,0.02) !important; cursor:text !important; border-radius:4px; }
  .editor-highlight { outline:1.5px solid rgba(10,103,65,0.4) !important; outline-offset:1px; border-radius:2px; }
  .editor-hover { outline:1px solid rgba(10,103,65,0.15) !important; outline-offset:1px; border-radius:2px; }
  .editor-dragging { opacity:0.85; cursor:move !important; outline:1.5px dashed rgba(10,103,65,0.6) !important; }
  .guide-line { position:fixed; background:#ff4081; z-index:99996; pointer-events:none; opacity:0.9; }
  .guide-line-h { height:1px; left:0; right:0; }
  .guide-line-v { width:1px; top:0; bottom:0; }
  .guide-line--center { background:#2196F3; }
  .guide-line--edge { background:#ff4081; }
  .guide-line--viewport { background:#9C27B0; opacity:0.6; }
  .guide-line--cursor { background:rgba(10,103,65,0.3); }
  .guide-distance { position:fixed; background:#ff4081; color:#fff; font-size:9px; padding:1px 4px; border-radius:3px; pointer-events:none; z-index:99997; white-space:nowrap; }
  .guide-distance--center { background:#2196F3; }
  .guide-marker { position:fixed; width:6px; height:6px; background:#ff4081; border-radius:50%; pointer-events:none; z-index:99997; transform:translate(-50%,-50%); }
  .guide-marker--center { background:#2196F3; }
  @keyframes guide-pulse { 0%,100%{opacity:0.9} 50%{opacity:0.5} }
  .guide-line--snapped { animation: guide-pulse 0.6s ease-in-out; box-shadow: 0 0 4px currentColor; }
  .frame-drop-highlight { outline:1.5px dashed #016D38 !important; outline-offset:4px; background:rgba(10,103,65,0.03) !important; border-radius:6px; transition:background 0.15s; }
  .cursor-guide-h { position:fixed; left:0; right:0; height:1px; background:rgba(10,103,65,0.2); pointer-events:none; z-index:99995; }
  .cursor-guide-v { position:fixed; top:0; bottom:0; width:1px; background:rgba(10,103,65,0.2); pointer-events:none; z-index:99995; }
  .rotate-handle { position:absolute; top:-28px; left:50%; transform:translateX(-50%); width:20px; height:20px; background:#0a6741; border-radius:50%; cursor:grab; pointer-events:all; display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; box-shadow:0 2px 6px rgba(0,0,0,0.2); }
  .rotate-handle::before { content:'↻'; }
  .rotate-line { position:absolute; top:-12px; left:50%; width:1px; height:12px; background:#0a6741; pointer-events:none; }

  /* 12-Column Grid Overlay */
  #sb-grid-overlay { position:fixed; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:99990; display:none; }
  #sb-grid-overlay.visible { display:flex; }
  .sb-grid-col { flex:1; border-left:1px solid rgba(10,103,65,0.06); border-right:1px solid rgba(10,103,65,0.06); background:rgba(10,103,65,0.015); height:100%; }
  .sb-grid-col:first-child { border-left:none; }
  .sb-grid-col:last-child { border-right:none; }
`,document.head.appendChild(Q);const Y=document.createElement("div");Y.id="sb-grid-overlay",Y.classList.add("visible");for(let t=0;t<12;t++){const o=document.createElement("div");o.className="sb-grid-col",Y.appendChild(o)}document.body.appendChild(Y);const H=document.createElement("div");H.id="sb-smart-guides",H.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99994;",document.body.appendChild(H);const X=4;function he(t,o,n,s){H.innerHTML="";const a=s.left+o,l=s.top+n,c=a+s.width,p=l+s.height,i=a+s.width/2,h=l+s.height/2,E=window.innerWidth/2,S=window.innerHeight/2;Math.abs(i-E)<X&&G("v",E,"#E8C916","Centro"),Math.abs(h-S)<X&&G("h",S,"#E8C916","Centro"),document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, img, div.admin-inserted, [class*="card"], [class*="btn"], [class*="hero"], [class*="section"]').forEach(L=>{if(L===t||L.contains(t)||t.contains(L)||L.closest("#sb-resize-box")||L.closest("#sb-smart-guides")||L.closest("#sb-grid-overlay"))return;const I=L.getBoundingClientRect();if(I.width<10||I.height<10)return;const z=I.left+I.width/2,D=I.top+I.height/2;Math.abs(i-z)<X&&G("v",z,"#0a6741"),Math.abs(h-D)<X&&G("h",D,"#0a6741"),Math.abs(a-I.left)<X&&G("v",I.left,"#ff6b6b"),Math.abs(c-I.right)<X&&G("v",I.right,"#ff6b6b"),Math.abs(l-I.top)<X&&G("h",I.top,"#ff6b6b"),Math.abs(p-I.bottom)<X&&G("h",I.bottom,"#ff6b6b")})}function G(t,o,n,s){const a=document.createElement("div");if(t==="v"?a.style.cssText=`position:fixed;top:0;bottom:0;left:${o}px;width:1px;background:${n};opacity:0.7;`:a.style.cssText=`position:fixed;left:0;right:0;top:${o}px;height:1px;background:${n};opacity:0.7;`,H.appendChild(a),s){const l=document.createElement("div");l.textContent=s,l.style.cssText=`position:fixed;${t==="v"?"left:"+(o+4)+"px;top:8px":"top:"+(o+4)+"px;left:8px"};background:${n};color:#fff;font-size:9px;padding:1px 5px;border-radius:3px;font-family:sans-serif;`,H.appendChild(l)}}function _e(){H.innerHTML=""}const Z=document.createElement("div");Z.className="cursor-guide-h",Z.style.display="none",document.body.appendChild(Z);const J=document.createElement("div");J.className="cursor-guide-v",J.style.display="none",document.body.appendChild(J);function j(t){if(t.id)return"#"+t.id;if(t.className&&typeof t.className=="string"){const s=t.className.trim().split(/\s+/).filter(a=>a!=="editor-highlight"&&a!=="editor-dragging");if(s.length){const a="."+s.join(".");try{if(document.querySelectorAll(a).length===1)return a}catch{}}}const o=[];let n=t;for(;n&&n!==document.body;){let s=n.tagName.toLowerCase();if(n.id){o.unshift("#"+n.id);break}const a=n.parentElement;if(a){const l=Array.from(a.children).filter(c=>c.tagName===n.tagName);l.length>1&&(s+=":nth-of-type("+(l.indexOf(n)+1)+")")}o.unshift(s),n=n.parentElement}return o.join(" > ")}function se(t,o,n){m.push({selector:j(t),property:o,oldValue:n,newValue:o==="textContent"?t.textContent:o==="__fullStyle"?t.style.cssText:t.style[o]}),r=[]}function le(t){m.push({selector:j(t),property:"__fullStyle",oldValue:t.style.cssText,newValue:""}),r=[]}function ce(t){m.length>0&&(m[m.length-1].newValue=t.style.cssText)}function V(t){const o=t.getBoundingClientRect();v.style.display="block",v.style.left=o.left+"px",v.style.top=o.top+"px",v.style.width=o.width+"px",v.style.height=o.height+"px"}function ye(t){const o=t.parentElement;if(!o||o===document.body||o===document.documentElement||!["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(o.tagName))return;o.getBoundingClientRect(),t.getBoundingClientRect();const n=(parseFloat(t.style.left)||0)+t.offsetWidth,s=(parseFloat(t.style.top)||0)+t.offsetHeight;n>o.offsetWidth&&(o.style.minWidth=n+"px"),s>o.offsetHeight&&(o.style.minHeight=s+"px")}document.addEventListener("scroll",()=>{e&&!u&&V(e)},!0);function P(t){e&&(e.classList.remove("editor-highlight"),e.removeAttribute("contenteditable")),e=t,e.classList.add("editor-highlight"),V(t)}function oe(){e&&(e.classList.remove("editor-highlight","editor-dragging"),e.removeAttribute("contenteditable")),e=null,y.style.display="none",v.style.display="none",ae()}function w(t,o,n,s){window.parent.postMessage({type:t==="info"?"ADMIN_INFO":"ADMIN_CHANGE",action:t,selector:o?j(o):"",property:n,value:s,description:t==="info"?s:`${t}: ${(o==null?void 0:o.tagName)||""}`},"*")}function de(){const t=document.querySelectorAll("body *:not(#editor-toolbar):not(#resize-box):not(#alignment-guides):not(.guide-line):not(.guide-distance):not(.guide-marker):not(#text-cursor):not(script):not(style):not(link)");return Array.from(t).filter(o=>{if(o===e||o.contains(e)||e!=null&&e.contains(o)||o.offsetParent===null&&o.style.position!=="fixed")return!1;const n=o.getBoundingClientRect();return n.width>5&&n.height>5&&n.top<window.innerHeight+50&&n.bottom>-50&&n.left<window.innerWidth+50&&n.right>-50})}function ae(){A.innerHTML=""}function re(t){ae();const o=de(),n=t.left+t.width/2,s=t.top+t.height/2,a=window.innerWidth/2,l=window.innerHeight/2,c={h:new Set,v:new Set};Math.abs(n-a)<f&&q("v",a,"viewport"),Math.abs(s-l)<f&&q("h",l,"viewport"),Math.abs(t.left)<f&&q("v",0,"viewport"),Math.abs(t.right-window.innerWidth)<f&&q("v",window.innerWidth,"viewport"),Math.abs(t.top)<f&&q("h",0,"viewport"),o.forEach(p=>{const i=p.getBoundingClientRect(),h=i.left+i.width/2,E=i.top+i.height/2;Math.abs(s-E)<f&&!c.h.has(Math.round(E))&&(c.h.add(Math.round(E)),q("h",E,"center"),ie(n,E),ie(h,E)),Math.abs(t.top-i.top)<f&&!c.h.has(Math.round(i.top))&&(c.h.add(Math.round(i.top)),q("h",i.top,"edge")),Math.abs(t.bottom-i.bottom)<f&&!c.h.has(Math.round(i.bottom))&&(c.h.add(Math.round(i.bottom)),q("h",i.bottom,"edge")),Math.abs(t.top-i.bottom)<f&&!c.h.has(Math.round(i.bottom)+1e3)&&(c.h.add(Math.round(i.bottom)+1e3),q("h",i.bottom,"edge"),K(n,i.bottom,0,"h")),Math.abs(t.bottom-i.top)<f&&!c.h.has(Math.round(i.top)+2e3)&&(c.h.add(Math.round(i.top)+2e3),q("h",i.top,"edge"),K(n,i.top,0,"h")),Math.abs(n-h)<f&&!c.v.has(Math.round(h))&&(c.v.add(Math.round(h)),q("v",h,"center"),ie(h,s),ie(h,E)),Math.abs(t.left-i.left)<f&&!c.v.has(Math.round(i.left))&&(c.v.add(Math.round(i.left)),q("v",i.left,"edge")),Math.abs(t.right-i.right)<f&&!c.v.has(Math.round(i.right))&&(c.v.add(Math.round(i.right)),q("v",i.right,"edge")),Math.abs(t.left-i.right)<f&&!c.v.has(Math.round(i.right)+1e3)&&(c.v.add(Math.round(i.right)+1e3),q("v",i.right,"edge"),K(i.right,s,0,"v")),Math.abs(t.right-i.left)<f&&!c.v.has(Math.round(i.left)+2e3)&&(c.v.add(Math.round(i.left)+2e3),q("v",i.left,"edge"),K(i.left,s,0,"v"));const S=t.top-i.bottom,M=i.top-t.bottom,L=t.left-i.right,I=i.left-t.right;S>0&&S<60&&K(n,i.bottom+S/2,Math.round(S),"h"),M>0&&M<60&&K(n,t.bottom+M/2,Math.round(M),"h"),L>0&&L<60&&K(i.right+L/2,s,Math.round(L),"v"),I>0&&I<60&&K(t.right+I/2,s,Math.round(I),"v")})}function q(t,o,n){const s=document.createElement("div");s.className=`guide-line guide-line-${t} guide-line--${n||"edge"}`,t==="h"?s.style.top=o+"px":s.style.left=o+"px",A.appendChild(s)}function ie(t,o,n){const s=document.createElement("div");s.className="guide-marker guide-marker--center",s.style.left=t+"px",s.style.top=o+"px",A.appendChild(s)}function K(t,o,n,s){if(n<=0)return;const a=document.createElement("div");a.className="guide-distance",a.textContent=n+"px",a.style.left=t+"px",a.style.top=o+"px",a.style.transform="translate(-50%, -50%)",A.appendChild(a)}function pe(t,o,n){const s=t.getBoundingClientRect(),a=s.width,l=s.height,c=de();let p=o,i=n,h=!1;const E=o,S=n,M=o+a,L=n+l,I=o+a/2,z=n+l/2,D=window.innerWidth/2,k=window.innerHeight/2;return Math.abs(I-D)<f&&(p=D-a/2,h=!0),Math.abs(z-k)<f&&(i=k-l/2,h=!0),Math.abs(E)<f&&(p=0,h=!0),Math.abs(M-window.innerWidth)<f&&(p=window.innerWidth-a,h=!0),Math.abs(S)<f&&(i=0,h=!0),c.forEach(O=>{const C=O.getBoundingClientRect(),te=C.left+C.width/2,T=C.top+C.height/2;Math.abs(z-T)<f&&(i=T-l/2,h=!0),Math.abs(S-C.top)<f&&(i=C.top,h=!0),Math.abs(L-C.bottom)<f&&(i=C.bottom-l,h=!0),Math.abs(S-C.bottom)<f&&(i=C.bottom,h=!0),Math.abs(L-C.top)<f&&(i=C.top-l,h=!0),Math.abs(I-te)<f&&(p=te-a/2,h=!0),Math.abs(E-C.left)<f&&(p=C.left,h=!0),Math.abs(M-C.right)<f&&(p=C.right-a,h=!0),Math.abs(E-C.right)<f&&(p=C.right,h=!0),Math.abs(M-C.left)<f&&(p=C.left-a,h=!0)}),{left:p,top:i,snapped:h}}let $=null;document.addEventListener("mouseover",t=>{!d||u||g||t.target===y||y.contains(t.target)||t.target===v||v.contains(t.target)||t.target!==e&&($&&$!==e&&$.classList.remove("editor-hover"),$=t.target,$.classList.add("editor-hover"))}),document.addEventListener("mouseout",t=>{!d||u||t.target!==e&&$&&($.classList.remove("editor-hover"),$=null)}),document.addEventListener("mousemove",t=>{if(!d){Z.style.display="none",J.style.display="none";return}g&&b&&(b.style.display="block",b.style.left=t.clientX+12+"px",b.style.top=t.clientY+12+"px"),u||(Z.style.display="block",J.style.display="block",Z.style.top=t.clientY+"px",J.style.left=t.clientX+"px")}),document.addEventListener("mousedown",t=>{if(!d||t.target===y||y.contains(t.target)||t.target===v||v.contains(t.target)||g)return;t.preventDefault(),t.stopPropagation();const o=t.target;P(o),$&&($.classList.remove("editor-hover"),$=null),Z.style.display="none",J.style.display="none";const n=t.clientX,s=t.clientY,a=o.getBoundingClientRect().width;let l=!1;const c=i=>{const h=i.clientX-n,E=i.clientY-s;if(!l)if(Math.abs(h)>8||Math.abs(E)>8)l=!0,u=!0,o.classList.add("editor-dragging"),v.style.display="none",le(o);else return;o.style.transform=`translate(${h}px, ${E}px)`,o.style.zIndex="99999",he(o,h,E,o.getBoundingClientRect())},p=i=>{if(document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",p),!l)return;u=!1,o.classList.remove("editor-dragging");const h=i.clientX-n,E=i.clientY-s;if(o.style.transform="",o.style.position==="absolute"||o.style.position==="fixed"){const S=parseFloat(o.style.left)||0,M=parseFloat(o.style.top)||0;o.style.left=S+h+"px",o.style.top=M+E+"px"}else{const S=o.parentElement;if(S&&S!==document.body){(!S.style.position||S.style.position==="static")&&(S.style.position="relative");const M=document.createElement("div");M.style.cssText=`width:${a}px;height:${o.getBoundingClientRect().height}px;visibility:hidden;pointer-events:none;`,S.insertBefore(M,o);const L=o.getBoundingClientRect(),I=S.getBoundingClientRect(),z=L.left-I.left,D=L.top-I.top;o.style.position="absolute",o.style.left=z+h+"px",o.style.top=D+E+"px",o.style.width=a+"px",o.style.margin="0",o.style.zIndex="99999"}}ae(),_e(),ce(o),V(o),w("changeStyle",o,"left",o.style.left),w("changeStyle",o,"top",o.style.top)};document.addEventListener("mousemove",c),document.addEventListener("mouseup",p)},!0),document.addEventListener("click",t=>{if(d&&((t.target.closest("a")||t.target.closest("button")||t.target.tagName==="A"||t.target.tagName==="BUTTON")&&(t.preventDefault(),t.stopPropagation()),!!g&&!(t.target===y||y.contains(t.target)||t.target===v||v.contains(t.target))&&(t.preventDefault(),t.stopPropagation(),g))){B++;const o=window.scrollX,n=window.scrollY,s=document.createElement("div");s.textContent=x.text||"Nuevo texto",s.style.cssText=`position:absolute;left:${t.clientX+o}px;top:${t.clientY+n}px;z-index:${B};font-family:${x.fontFamily||"Bolivar, sans-serif"};font-size:${x.fontSize||"16px"};font-weight:${x.fontWeight||"400"};color:${x.color||"#333"};padding:4px 8px;cursor:move;background:${x.backgroundColor||"transparent"};border-radius:4px;`,document.body.appendChild(s),g=!1,document.body.style.cursor="",b&&(b.style.display="none"),P(s),s.setAttribute("contenteditable","true"),s.focus(),s.addEventListener("blur",()=>{s.removeAttribute("contenteditable")},{once:!0}),w("info",null,"","📝 Texto insertado.")}},!0),document.addEventListener("dblclick",t=>{if(d||(d=!0,window.parent.postMessage({type:"ADMIN_INFO",message:"🎯 Modo edición activado automáticamente."},"*"),window.parent.postMessage({type:"EDIT_MODE_CHANGED",active:!0},"*")),t.target===y||y.contains(t.target)||t.target===v||v.contains(t.target))return;t.preventDefault(),t.stopPropagation();const o=t.target;P(o);const n=window.getComputedStyle(o),s=o.tagName==="IMG"||o.tagName==="SVG",a=["INPUT","SELECT","TEXTAREA"].includes(o.tagName),l=o.tagName==="BUTTON"||o.tagName==="A"||(o.className||"").includes("btn");window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:o.tagName.toLowerCase(),selector:j(o),textContent:(o.textContent||"").substring(0,200),className:o.className||"",id:o.id||"",src:o.src||"",isImage:s,isFormField:a,isText:!s&&!a&&!l,placeholder:o.placeholder||"",label:"",options:o.tagName==="SELECT"?Array.from(o.options).map(c=>c.textContent):[],styles:{color:n.color,backgroundColor:n.backgroundColor,fontSize:n.fontSize,fontWeight:n.fontWeight,fontFamily:n.fontFamily,width:o.style.width||n.width,height:o.style.height||n.height}},"*")},!0),y.addEventListener("click",t=>{const o=t.target.closest("button");if(!o||!e)return;const n=o.dataset.action;if(n==="edit"){const s=e.textContent;e.setAttribute("contenteditable","true"),e.focus(),e.addEventListener("blur",()=>{e.removeAttribute("contenteditable"),e.textContent!==s&&(se(e,"textContent",s),w("changeText",e,"textContent",e.textContent))},{once:!0})}if(n==="move"){e.classList.add("editor-dragging"),u=!0;const s=e.getBoundingClientRect(),a=e.parentElement,l=s.width/2,c=s.height/2;let p=null;le(e),e.style.position;const i=e.style.left,h=e.style.top,E=e.style.width,S=e.style.margin,M=e.style.zIndex;e.style.position="fixed",e.style.zIndex="999999",e.style.width=s.width+"px",e.style.left=s.left+"px",e.style.top=s.top+"px",e.style.margin="0";const L=z=>{const D=z.clientX-l,k=z.clientY-c;e.style.left=D+"px",e.style.top=k+"px";const O=e.getBoundingClientRect(),C=pe(e,O.left,O.top);C.snapped&&(e.style.left=D+C.left-O.left+"px",e.style.top=k+C.top-O.top+"px"),re(e.getBoundingClientRect()),e.style.visibility="hidden";const te=document.elementFromPoint(z.clientX,z.clientY);e.style.visibility="";let T=te;for(;T&&T!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(T.tagName)&&T.offsetWidth>80&&T.offsetHeight>30&&T!==e);)T=T.parentElement;p&&p!==T&&p.classList.remove("frame-drop-highlight"),T&&T!==document.body&&T!==e&&T!==a?(T.classList.add("frame-drop-highlight"),p=T):p=null,V(e)},I=z=>{u=!1,e.classList.remove("editor-dragging"),ae(),document.removeEventListener("mousemove",L),document.removeEventListener("mouseup",I),p&&p.classList.remove("frame-drop-highlight"),e.style.visibility="hidden";const D=document.elementFromPoint(z.clientX,z.clientY);e.style.visibility="";let k=D;for(;k&&k!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(k.tagName)&&k.offsetWidth>80&&k.offsetHeight>30&&k!==e);)k=k.parentElement;const O=e.getBoundingClientRect();if(k&&k!==document.body&&k!==a){const C=k.getBoundingClientRect();k.style.position=k.style.position||"relative",e.style.position="absolute",e.style.left=O.left-C.left+"px",e.style.top=O.top-C.top+"px",e.style.width=E,e.style.margin="0",e.style.zIndex="99999",k.appendChild(e)}else{const C=O.left-s.left,te=O.top-s.top;e.style.position="relative",e.style.width=E,e.style.margin=S,e.style.zIndex=M||"",e.style.left=(parseFloat(i)||0)+C+"px",e.style.top=(parseFloat(h)||0)+te+"px"}V(e),ce(e),w("changeStyle",e,"left",e.style.left),w("changeStyle",e,"top",e.style.top),w("info",null,"","↕️ Elemento reubicado.")};document.addEventListener("mousemove",L),document.addEventListener("mouseup",I)}if(n==="copy"&&(localStorage.setItem("sb_clipboard",e.outerHTML),w("info",null,"","📋 Elemento copiado. Usa Ctrl+V para pegar.")),n==="duplicate"){const s=e.cloneNode(!0);s.classList.remove("editor-highlight"),s.style.position="relative",s.style.top="10px",e.parentNode.insertBefore(s,e.nextSibling),se(e,"duplicate",""),w("info",null,"","⧉ Elemento duplicado.")}if(n==="delete"){const s=e.style.display;se(e,"display",s),e.style.display="none",w("changeStyle",e,"display","none"),oe()}n==="settings"&&window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:e.tagName.toLowerCase(),selector:j(e),textContent:e.textContent,className:e.className,id:e.id},"*")});let ne=!1,U="",R={};v.addEventListener("mousedown",t=>{const o=t.target.closest(".resize-handle");!o||!e||(t.preventDefault(),t.stopPropagation(),ne=!0,U=o.dataset.dir,e.getBoundingClientRect(),R={x:t.clientX,y:t.clientY,w:e.offsetWidth,h:e.offsetHeight,left:parseFloat(e.style.left)||0,top:parseFloat(e.style.top)||0})}),document.addEventListener("mousemove",t=>{if(!ne||!e)return;const o=t.clientX-R.x,n=t.clientY-R.y;if(U.includes("e")&&!U.includes("w")&&(e.style.width=Math.max(20,R.w+o)+"px"),U.includes("w")&&!U.includes("e")){const s=Math.max(20,R.w-o);e.style.width=s+"px",e.style.position=e.style.position||"relative",e.style.left=R.left+(R.w-s)+"px"}if(U.includes("s")&&!U.includes("n")&&(e.style.height=Math.max(20,R.h+n)+"px"),U.includes("n")&&!U.includes("s")){const s=Math.max(20,R.h-n);e.style.height=s+"px",e.style.position=e.style.position||"relative",e.style.top=R.top+(R.h-s)+"px"}V(e)}),document.addEventListener("mouseup",()=>{ne&&e&&(ne=!1,w("changeStyle",e,"width",e.style.width),e.style.height&&w("changeStyle",e,"height",e.style.height),e.style.left&&w("changeStyle",e,"left",e.style.left),e.style.top&&w("changeStyle",e,"top",e.style.top),ye(e))}),document.addEventListener("keydown",t=>{if(d){if(t.key==="Escape"&&oe(),t.key==="Delete"&&e&&!e.hasAttribute("contenteditable")&&(e.style.display="none",w("changeStyle",e,"display","none"),oe()),e&&!e.hasAttribute("contenteditable")&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.key)){t.preventDefault(),e.style.position="relative";const o=t.shiftKey?10:1;t.key==="ArrowUp"&&(e.style.top=(parseFloat(e.style.top)||0)-o+"px"),t.key==="ArrowDown"&&(e.style.top=(parseFloat(e.style.top)||0)+o+"px"),t.key==="ArrowLeft"&&(e.style.left=(parseFloat(e.style.left)||0)-o+"px"),t.key==="ArrowRight"&&(e.style.left=(parseFloat(e.style.left)||0)+o+"px");const n=e.getBoundingClientRect(),s=pe(e,n.left,n.top);if(s.snapped){const a=s.left-n.left,l=s.top-n.top;Math.abs(a)<f*2&&(e.style.left=(parseFloat(e.style.left)||0)+a+"px"),Math.abs(l)<f*2&&(e.style.top=(parseFloat(e.style.top)||0)+l+"px")}V(e),re(e.getBoundingClientRect()),clearTimeout(window._guideTimer),window._guideTimer=setTimeout(ae,800)}if(t.ctrlKey&&t.key==="z"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(t.preventDefault(),ue()),t.ctrlKey&&t.key==="y"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(t.preventDefault(),ve()),t.ctrlKey&&t.key==="d"&&e){t.preventDefault();const o=e.cloneNode(!0);o.classList.remove("editor-highlight"),o.style.position="relative",o.style.top="10px",e.parentNode.insertBefore(o,e.nextSibling),w("info",null,"","⧉ Duplicado (Ctrl+D).")}}});function ue(){if(m.length===0)return;const t=m.pop(),o=document.querySelector(t.selector);if(!o){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo deshacer (elemento no encontrado)."},"*");return}const n=t.property==="textContent"?o.textContent:o.style[t.property];r.push({...t,newValue:n}),t.property==="textContent"?o.textContent=t.oldValue:t.property==="__fullStyle"?o.style.cssText=t.oldValue:o.style[t.property]=t.oldValue,e&&V(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↩️ Deshecho."},"*")}function ve(){if(r.length===0)return;const t=r.pop(),o=document.querySelector(t.selector);if(!o){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo rehacer (elemento no encontrado)."},"*");return}m.push({...t}),t.property==="textContent"?o.textContent=t.newValue:t.property==="__fullStyle"?o.style.cssText=t.newValue:o.style[t.property]=t.newValue,e&&V(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↪️ Rehecho."},"*")}window.addEventListener("message",t=>{if(!t.data)return;if(t.data.type==="ENABLE_EDIT_MODE"&&(d=!0,Y.classList.add("visible")),t.data.type==="DISABLE_EDIT_MODE"&&(d=!1,oe(),Y.classList.remove("visible")),t.data.type==="UNDO_ACTION"&&ue(),t.data.type==="REDO_ACTION"&&ve(),t.data.type==="DELETE_SELECTED"&&e&&(se(e,"visibility",e.style.visibility),e.style.visibility="hidden",e.style.pointerEvents="none",w("changeStyle",e,"visibility","hidden"),oe()),t.data.type==="DUPLICATE_SELECTED"&&e){const s=e.cloneNode(!0);s.classList.remove("editor-highlight"),s.style.position="relative",s.style.top=(parseFloat(e.style.top)||0)+10+"px",s.style.left=(parseFloat(e.style.left)||0)+10+"px",e.parentNode.insertBefore(s,e.nextSibling),P(s),w("info",null,"","⧉ Elemento duplicado.")}if(t.data.type==="APPLY_EFFECT"&&e){const{effect:s,value:a}=t.data,l=e.style[s];e.style[s]=a,se(e,s,l),w("changeStyle",e,s,a)}if(t.data.type==="LAYER_CHANGE"&&e){const s=t.data.direction,a=parseInt(e.style.zIndex)||0;s==="front"?e.style.zIndex="99999":s==="back"?e.style.zIndex="1":s==="up"?e.style.zIndex=String(a+1):s==="down"&&(e.style.zIndex=String(Math.max(0,a-1))),w("changeStyle",e,"zIndex",e.style.zIndex)}if(t.data.type==="EYEDROPPER_MODE"){document.body.style.cursor="crosshair";const s=a=>{a.preventDefault(),a.stopPropagation();const c=window.getComputedStyle(a.target).color;window.parent.postMessage({type:"EYEDROPPER_RESULT",color:c},"*"),document.body.style.cursor="",document.removeEventListener("click",s,!0)};document.addEventListener("click",s,!0)}if(t.data.type==="DROP_ELEMENT_AT"){d=!0;const{html:s,x:a,y:l}=t.data,c=document.createElement("div");c.innerHTML=s;const p=c.firstElementChild;if(!p)return;p.style.position="absolute",p.style.left=a+"px",p.style.top=l+"px",p.style.zIndex="99999",p.style.cursor="move",p.classList.add("admin-inserted");let i=document.elementFromPoint(a,l);for(;i&&i!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(i.tagName)&&i.offsetWidth>80&&i.offsetHeight>30);)i=i.parentElement;if(i&&i!==document.body){const h=i.getBoundingClientRect();i.style.position=i.style.position||"relative",p.style.left=a-h.left+"px",p.style.top=l-h.top+"px",i.appendChild(p)}else document.body.appendChild(p);P(p),m.push({selector:j(p),property:"display",oldValue:"none",newValue:""}),r=[],w("info",null,"","✅ Elemento insertado en el frame.")}if(t.data.type==="PASTE_CLIPBOARD"){const s=localStorage.getItem("sb_clipboard");if(!s)return;const a=document.createElement("div");a.innerHTML=s;const l=a.firstElementChild;if(!l)return;l.classList.remove("editor-highlight"),l.style.position="relative",l.style.top="10px",l.style.left="10px",l.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(l,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(l),P(l),m.push({selector:j(l),property:"display",oldValue:"none",newValue:""}),r=[],w("info",null,"","📌 Elemento pegado.")}t.data.type==="ENTER_TEXT_MODE"&&(d=!0,g=!0,x={text:t.data.text||"Nuevo texto",fontFamily:t.data.fontFamily||"Bolivar, sans-serif",fontSize:t.data.fontSize||"16px",fontWeight:t.data.fontWeight||"400",color:t.data.color||"#333333",backgroundColor:t.data.backgroundColor||"transparent"},document.body.style.cursor="text",b||(b=document.createElement("div"),b.style.cssText="position:fixed;pointer-events:none;z-index:99999;background:rgba(10,103,65,0.1);border:1px dashed #0a6741;border-radius:4px;padding:4px 10px;display:none;",document.body.appendChild(b)),b.textContent=x.text,b.style.fontFamily=x.fontFamily,b.style.fontSize=x.fontSize,b.style.fontWeight=x.fontWeight,b.style.color="#0a6741",window.parent.postMessage({type:"ADMIN_INFO",message:"📝 Haz clic donde quieras colocar el texto."},"*"));function o(){const s=document.getElementById("app-content")||document.querySelector("main")||document.querySelector(".main-content")||document.body,a=window.innerHeight/2,l=window.innerWidth/2,c=document.elementFromPoint(l,a);if(c&&c!==document.body&&c!==document.documentElement){let p=c;for(;p&&p!==s&&p!==document.body;){const i=p.parentElement;if(i&&["DIV","SECTION","MAIN","ARTICLE","FORM","HEADER"].includes(i.tagName)&&i.children.length>1)return{parent:i,refNode:p.nextSibling};p=i}}return{parent:s,refNode:s.firstChild}}function n(s,a){(!a.style.position||a.style.position==="static")&&(a.style.position="relative");const l=a.getBoundingClientRect(),c=Math.max(0,l.width/2-(s.offsetWidth||100)/2),p=Math.max(0,window.innerHeight/2-l.top);s.style.position="absolute",s.style.left=c+"px",s.style.top=p+"px",s.style.margin="0",a.appendChild(s)}if(t.data.type==="INSERT_TEXT"){const{text:s,fontSize:a,fontWeight:l,color:c,backgroundColor:p}=t.data,i=document.createElement("div");i.textContent=s||"Nuevo texto",i.style.cssText=`position:relative;margin:12px;width:fit-content;font-family:'Roboto Condensed',sans-serif;font-size:${a||"16px"};font-weight:${l||"400"};color:${c||"#1B1B1B"};background:${p||"transparent"};padding:8px 12px;cursor:move;z-index:99999;line-height:140%;`,i.classList.add("admin-inserted");const h=o();n(i,h.parent),P(i),w("info",null,"","📝 Texto insertado.")}if(t.data.type==="INSERT_SHAPE"){const s=document.createElement("div");s.classList.add("admin-inserted");const a=t.data.shape;a==="rect"?s.style.cssText="position:relative;margin:12px;width:200px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:8px;cursor:move;z-index:99999;box-shadow:0 1px 3px rgba(0,0,0,.15);":a==="circle"?s.style.cssText="position:relative;margin:12px;width:120px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:50%;cursor:move;z-index:99999;":s.style.cssText="position:relative;margin:12px;width:80%;max-width:600px;height:2px;background:#CCC;cursor:move;z-index:99999;";const l=o();n(s,l.parent),P(s),w("info",null,"","🔷 Figura insertada.")}if(t.data.type==="INSERT_IMAGE"){const s=document.createElement("img");s.src=t.data.src,s.alt=t.data.name||"",s.classList.add("admin-inserted"),s.style.cssText="position:relative;display:block;margin:12px;max-width:200px;height:auto;cursor:move;z-index:99999;";const a=o();n(s,a.parent),P(s),w("info",null,"","🖼 Imagen insertada.")}if(t.data.type==="INSERT_MODAL"){const s=document.createElement("div");s.classList.add("admin-inserted"),s.style.cssText="position:relative;margin:24px;width:500px;max-width:90%;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.2);padding:32px;cursor:move;z-index:99999;",s.innerHTML='<h3 style="font-family:Roboto Condensed,sans-serif;font-size:20px;color:#016D38;margin-bottom:16px;">Modal Stepper</h3><p style="font-size:14px;color:#666;">Contenido del modal.</p>';const a=o();n(s,a.parent),P(s),w("info",null,"","📋 Modal insertado.")}if(t.data.type==="INSERT_FORM_FIELD"){const{title:s,fieldType:a,placeholder:l,options:c,targetSelector:p}=t.data,i=a||"text",h=document.createElement("div");h.classList.add("admin-inserted"),h.style.cssText="position:relative;margin:12px;cursor:move;z-index:99999;width:311px;max-width:90%;";let E='<div style="display:flex;flex-direction:column;gap:8px;">';E+=`<label style="font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#1B1B1B;">${s||"Campo"}</label>`,i==="select"?E+=`<div style="position:relative;"><select style="width:100%;height:40px;padding:8px 40px 8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;appearance:none;">${(c||["Opción 1"]).map(L=>`<option>${L}</option>`).join("")}</select></div>`:i==="date"?E+=`<input type="date" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;">`:i==="toggle"?E+=`<div style="display:flex;align-items:center;gap:12px;"><div style="width:48px;height:26px;background:#016D38;border-radius:13px;position:relative;"><div style="width:20px;height:20px;background:#fff;border-radius:50%;position:absolute;top:3px;right:3px;box-shadow:0 1px 3px rgba(0,0,0,.2);"></div></div><span style="font-family:'Roboto Condensed',sans-serif;font-size:14px;">Sí</span></div>`:i==="radio"?(E+='<div style="display:flex;flex-direction:column;gap:12px;">',(c||["Opción 1","Opción 2"]).forEach((L,I)=>{E+=`<label style="display:flex;align-items:center;gap:8px;font-family:'Roboto Condensed',sans-serif;font-size:16px;color:#1B1B1B;cursor:pointer;"><div style="width:20px;height:20px;border-radius:50%;border:2px solid #016D38;${I===0?"background:#016D38;":""}"></div>${L}</label>`}),E+="</div>"):E+=`<input type="text" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;" placeholder="${l||"Ingrese aquí"}">`,E+="</div>",h.innerHTML=E;let S=null;if(p)try{S=document.querySelector(p)}catch{}const M=S||o().parent;n(h,M),P(h),w("info",null,"","📋 Campo insertado.")}if(t.data.type==="ADMIN_OVERRIDE"){const{selector:s,property:a,value:l}=t.data;try{if(a==="__appendHTML"){const c=document.createElement("div");c.innerHTML=l;const p=c.firstElementChild;if(p){p.classList.add("admin-inserted");const i=o();i.parent.insertBefore(p,i.refNode)}}else if(a==="__placeholder"){const c=document.querySelector(s);if(c){const p=c.querySelector("input,textarea")||c;p.setAttribute&&p.setAttribute("placeholder",l)}}else if(a==="__label"){const c=document.querySelector(s);if(c){const p=c.querySelector("label");p&&(p.textContent=l)}}else if(a==="__multiStyle"){const c=document.querySelector(s);if(c)try{const p=JSON.parse(l);Object.entries(p).forEach(([i,h])=>{c.style[i]=h})}catch{}}else{const c=document.querySelector(s);c&&(a==="textContent"?c.textContent=l:a==="src"?c.src=l:c.style[a]=l)}}catch{}}if(t.data.type==="UPDATE_PLACEHOLDER")try{const s=document.querySelector(t.data.selector);if(s){const a=s.querySelector("input,textarea")||s;a.setAttribute&&a.setAttribute("placeholder",t.data.value)}}catch{}if(t.data.type==="UPDATE_LABEL")try{const s=document.querySelector(t.data.selector);if(s){const a=s.querySelector("label");a&&(a.textContent=t.data.value)}}catch{}if(t.data.type==="UPDATE_SELECT_OPTIONS")try{const s=document.querySelector(t.data.selector);if(s){const a=s.querySelector("select")||s;a.tagName==="SELECT"&&(a.innerHTML=t.data.options.map(l=>`<option>${l}</option>`).join(""))}}catch{}}),document.addEventListener("keydown",t=>{if(t.ctrlKey&&t.key==="v"&&d){t.preventDefault();const o=localStorage.getItem("sb_clipboard");if(!o)return;const n=document.createElement("div");n.innerHTML=o;const s=n.firstElementChild;if(!s)return;s.classList.remove("editor-highlight"),s.style.position="relative",s.style.top="10px",s.style.left="10px",s.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(s,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(s),P(s),m.push({selector:j(s),property:"display",oldValue:"none",newValue:""}),r=[],w("info",null,"","📌 Pegado (Ctrl+V).")}t.ctrlKey&&t.key==="c"&&d&&e&&(t.preventDefault(),localStorage.setItem("sb_clipboard",e.outerHTML),w("info",null,"","📋 Copiado (Ctrl+C)."))})}function xe(d){d.innerHTML=`
    <div class="prot-home">
      <!-- HEADER -->
      <header class="prot-header">
        <nav class="prot-nav">
          <img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="prot-nav__logo">
          <button class="prot-btn prot-btn--cta prot-btn--pill">Cotiza en 30 segundos</button>
        </nav>
        <div class="prot-divider"></div>
      </header>

      <!-- HERO BANNER -->
      <section class="prot-hero">
        <div class="prot-hero__text">
          <h1 class="prot-hero__title">
            <span class="prot-hero__title--highlight">Protege tu crédito,</span>
            <span class="prot-hero__title--white">protege a tu familia</span>
          </h1>
          <p class="prot-hero__subtitle">Si algo te pasa, tu deuda no será la herencia. Este seguro cubre el saldo de tu crédito para que tu familia no tenga que pagarlo.</p>
        </div>

        <!-- FORM CARD — 2 Phases -->
        <div class="prot-form-card">
          <div class="prot-form-card__inner">
            <div class="prot-form-card__header">
              <h2 class="prot-form-card__title">¿Quién eres?</h2>
              <p class="prot-form-card__step" id="vc-phase-text">Paso 1 de 2</p>
            </div>
            <!-- Phase indicators -->
            <div class="vc-phase-indicator">
              <div class="vc-phase-dot vc-phase-dot--active" id="vc-dot-1"></div>
              <div class="vc-phase-dot" id="vc-dot-2"></div>
            </div>
            <div class="prot-progress">
              <div class="prot-progress__bar" id="vc-progress" style="width:50%"></div>
            </div>

            <!-- PHASE 1: 3 campos -->
            <div class="prot-form-card__fields" id="vc-phase-1">
              <div class="prot-field">
                <label class="prot-field__label">Tipo de documento</label>
                <div class="prot-field__input">
                  <img src="/vida-proteccion-creditos/Iconos/Name-icon (5).png" alt="" class="prot-icon prot-icon--field">
                  <select id="vc-doc-type" style="flex:1;border:none;outline:none;font-family:var(--prot-font);font-size:16px;background:transparent;">
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="CE">Cédula de extranjería</option>
                    <option value="PA">Pasaporte</option>
                  </select>
                </div>
              </div>
              <div class="prot-field">
                <label class="prot-field__label">Número de documento</label>
                <div class="prot-field__input">
                  <img src="/vida-proteccion-creditos/Iconos/Name-icon (5).png" alt="" class="prot-icon prot-icon--field">
                  <input type="text" id="vc-doc-number" placeholder="Ej: 1032508877">
                </div>
              </div>
              <div class="prot-field">
                <label class="prot-field__label">Nombre completo</label>
                <div class="prot-field__input">
                  <img src="/vida-proteccion-creditos/Iconos/user.png" alt="" class="prot-icon prot-icon--field">
                  <input type="text" id="vc-name" placeholder="Simón Andrés Bolívar Libertador">
                </div>
              </div>
            </div>

            <!-- PHASE 2: 3 campos + checks -->
            <div class="prot-form-card__fields" id="vc-phase-2" style="display:none">
              <div class="prot-field">
                <label class="prot-field__label">Número de celular</label>
                <div class="prot-field__input">
                  <img src="/vida-proteccion-creditos/Iconos/Name-icon (3).png" alt="" class="prot-icon prot-icon--field">
                  <input type="tel" id="vc-phone" placeholder="3103025462">
                </div>
              </div>
              <div class="prot-field">
                <label class="prot-field__label">Correo electrónico</label>
                <div class="prot-field__input">
                  <img src="/vida-proteccion-creditos/Iconos/Name-icon (4).png" alt="" class="prot-icon prot-icon--field">
                  <input type="email" id="vc-email" placeholder="tucorreo@email.com">
                </div>
              </div>
              <div class="prot-field">
                <label class="prot-field__label">Fecha de nacimiento</label>
                <div class="prot-field__input">
                  <img src="/vida-proteccion-creditos/Iconos/calendar-day.png" alt="" class="prot-icon prot-icon--field">
                  <input type="date" id="vc-birthdate">
                </div>
              </div>
              <div class="prot-checks">
                <label class="prot-check"><input type="checkbox" id="vc-habeas"><span>Autorizo el <a href="#">tratamiento de mis datos personales</a> y acepto la <a href="#">política de privacidad.</a></span></label>
                <label class="prot-check"><input type="checkbox" id="vc-sms"><span>Autorizo el envío de comunicaciones por SMS y correo electrónico.</span></label>
              </div>
            </div>

            <!-- ACTIONS -->
            <div class="prot-form-card__actions">
              <button class="prot-btn prot-btn--ghost prot-btn--pill" id="vc-back-btn" style="display:none">Anterior</button>
              <button class="prot-btn prot-btn--cta prot-btn--pill" id="vc-next-btn">Siguiente</button>
            </div>
          </div>
        </div>
      </section>

      <!-- BENEFITS SECTION -->
      <section class="prot-pricing">
        <div class="prot-pricing__header">
          <h2 class="prot-pricing__title">¿Por qué proteger tu crédito?</h2>
        </div>
        <div class="prot-pricing__cards">
          <div class="prot-card" style="height:auto;cursor:default">
            <div class="prot-card__price" style="gap:12px">
              <img src="/vida-proteccion-creditos/Iconos/shield-dog.png" alt="" style="width:40px;height:40px">
              <span class="prot-card__title" style="font-size:18px">Cubre el 100% del saldo</span>
              <span class="prot-card__period">Si falleces, el seguro paga tu deuda al banco. Tu familia queda libre.</span>
            </div>
          </div>
          <div class="prot-card" style="height:auto;cursor:default">
            <div class="prot-card__price" style="gap:12px">
              <img src="/vida-proteccion-creditos/Iconos/Latido.png" alt="" style="width:40px;height:40px">
              <span class="prot-card__title" style="font-size:18px">Incapacidad total</span>
              <span class="prot-card__period">Si quedas en incapacidad total y permanente, también se cubre tu deuda.</span>
            </div>
          </div>
          <div class="prot-card" style="height:auto;cursor:default">
            <div class="prot-card__price" style="gap:12px">
              <img src="/vida-proteccion-creditos/Iconos/Group 5726.png" alt="" style="width:40px;height:40px">
              <span class="prot-card__title" style="font-size:18px">Desde $37.500/mes</span>
              <span class="prot-card__period">Prima accesible que se ajusta al valor de tu crédito y tu edad.</span>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="prot-footer">
        <p class="prot-footer__text">&copy; 2026 Compañía de Seguros Bolívar S.A. – Respaldado por Grupo Bolívar – Todos los derechos reservados</p>
      </footer>
    </div>
  `,Ee()}function Ee(){let d=1;const e=document.getElementById("vc-phase-1"),u=document.getElementById("vc-phase-2"),m=document.getElementById("vc-next-btn"),r=document.getElementById("vc-back-btn"),g=document.getElementById("vc-phase-text"),x=document.getElementById("vc-progress"),b=document.getElementById("vc-dot-1"),B=document.getElementById("vc-dot-2");function f(y){d=y,y===1?(e.style.display="",u.style.display="none",r.style.display="none",m.textContent="Siguiente",g.textContent="Paso 1 de 2",x.style.width="50%",b.classList.add("vc-phase-dot--active"),B.classList.remove("vc-phase-dot--active")):(e.style.display="none",u.style.display="",r.style.display="",m.textContent="Continuar",g.textContent="Paso 2 de 2",x.style.width="100%",b.classList.remove("vc-phase-dot--active"),B.classList.add("vc-phase-dot--active"))}r.addEventListener("click",()=>f(1)),m.addEventListener("click",()=>{if(d===1){const y=document.getElementById("vc-doc-number").value.trim(),v=document.getElementById("vc-name").value.trim();if(!y||!v){me(["vc-doc-number","vc-name"]);return}f(2)}else{const y=document.getElementById("vc-phone").value.trim(),v=document.getElementById("vc-email").value.trim(),_=document.getElementById("vc-birthdate").value,N=document.getElementById("vc-habeas").checked,W=document.getElementById("vc-sms").checked;if(!y||!v||!_||!N||!W){me(["vc-phone","vc-email","vc-birthdate"]);return}const A=new Date(_),F=new Date;let Q=F.getFullYear()-A.getFullYear();const Y=F.getMonth()-A.getMonth();if((Y<0||Y===0&&F.getDate()<A.getDate())&&Q--,Q<18||Q>65){alert("La edad debe estar entre 18 y 65 años para este producto.");return}localStorage.setItem("vc_docType",document.getElementById("vc-doc-type").value),localStorage.setItem("vc_docNumber",document.getElementById("vc-doc-number").value.trim()),localStorage.setItem("vc_name",document.getElementById("vc-name").value.trim()),localStorage.setItem("vc_phone",y),localStorage.setItem("vc_email",v),localStorage.setItem("vc_birthdate",_),localStorage.setItem("vc_age",String(Q));const H=new URL(window.location);H.searchParams.set("page","credit-data"),window.location.href=H.toString()}})}function me(d){d.forEach(e=>{const u=document.getElementById(e);if(u&&!u.value.trim()){const m=u.closest(".prot-field__input");m&&(m.style.borderColor="#E53935",setTimeout(()=>m.style.borderColor="",2e3))}})}const fe={18:{life:.45,itp:.15},19:{life:.45,itp:.15},20:{life:.46,itp:.16},21:{life:.47,itp:.16},22:{life:.48,itp:.17},23:{life:.49,itp:.17},24:{life:.5,itp:.18},25:{life:.52,itp:.18},26:{life:.54,itp:.19},27:{life:.56,itp:.2},28:{life:.58,itp:.21},29:{life:.61,itp:.22},30:{life:.64,itp:.23},31:{life:.67,itp:.24},32:{life:.71,itp:.26},33:{life:.75,itp:.27},34:{life:.8,itp:.29},35:{life:.85,itp:.31},36:{life:.91,itp:.33},37:{life:.97,itp:.35},38:{life:1.04,itp:.38},39:{life:1.12,itp:.41},40:{life:1.2,itp:.44},41:{life:1.3,itp:.47},42:{life:1.4,itp:.51},43:{life:1.52,itp:.55},44:{life:1.65,itp:.6},45:{life:1.79,itp:.65},46:{life:1.95,itp:.71},47:{life:2.12,itp:.77},48:{life:2.31,itp:.84},49:{life:2.52,itp:.92},50:{life:2.75,itp:1},51:{life:3,itp:1.09},52:{life:3.28,itp:1.19},53:{life:3.58,itp:1.3},54:{life:3.91,itp:1.42},55:{life:4.27,itp:1.55},56:{life:4.66,itp:0},57:{life:5.09,itp:0},58:{life:5.56,itp:0},59:{life:6.07,itp:0},60:{life:6.63,itp:0},61:{life:7.24,itp:0},62:{life:7.9,itp:0},63:{life:8.63,itp:0},64:{life:9.42,itp:0},65:{life:10.29,itp:0}},we=["Bancolombia","Banco de Bogotá","Davivienda","BBVA Colombia","Banco de Occidente","Banco Popular","Banco AV Villas","Scotiabank Colpatria","Banco Caja Social","Banco Falabella","Banco Itaú","Banco Pichincha","Banco W","Bancamía","Banco Agrario","Banco GNB Sudameris"];function Ie(d){const e=parseInt(localStorage.getItem("vc_age")||"35");d.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo">
          <img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar">
        </div>
      </header>

      <div class="sp-content">
        <aside class="sp-stepper">
          <div class="sp-stepper__list">
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div>
              <span class="sp-step__label">Tus datos</span>
            </div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step sp-step--active">
              <div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--active"><span>2</span></div></div>
              <span class="sp-step__label sp-step__label--active">Tu crédito</span>
            </div>
            <div class="sp-step__line"></div>
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet"><span>3</span></div></div>
              <span class="sp-step__label">Tu cotización</span>
            </div>
            <div class="sp-step__line"></div>
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet"><span>4</span></div></div>
              <span class="sp-step__label">Complementa</span>
            </div>
            <div class="sp-step__line"></div>
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet"><span>5</span></div></div>
              <span class="sp-step__label">Paga y activa</span>
            </div>
          </div>
        </aside>

        <main class="sp-main">
          <div class="sp-back" id="cd-back">
            <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <div class="pd-form-wrapper">
            <div class="pd-form-card">
              <div class="pd-form-card__header">
                <div class="pd-form-card__title-row">
                  <h1 class="pd-form-card__title">Tu crédito</h1>
                  <img src="/vida-proteccion-creditos/Iconos/info-circle.png" alt="Info" class="pd-form-card__info">
                </div>
                <p class="pd-form-card__subtitle">Ingresa los datos de tu crédito para calcular tu prima.</p>
              </div>

              <div class="pd-form-card__fields">
                <!-- Banco -->
                <div class="prot-field">
                  <label class="prot-field__label">¿En qué banco tienes tu crédito?</label>
                  <div class="vc-autocomplete">
                    <div class="prot-field__input">
                      <img src="/vida-proteccion-creditos/Iconos/Name-icon (6).png" alt="" class="prot-icon prot-icon--field">
                      <input type="text" id="vc-bank" placeholder="Escribe el nombre de tu banco" autocomplete="off">
                    </div>
                    <div class="vc-autocomplete__list" id="vc-bank-list">
                      ${we.map(u=>`<div class="vc-autocomplete__item" data-bank="${u}">${u}</div>`).join("")}
                    </div>
                  </div>
                </div>

                <!-- Cuánto debes -->
                <div class="prot-field">
                  <label class="prot-field__label">¿Cuánto debes actualmente?</label>
                  <div class="prot-field__input">
                    <img src="/vida-proteccion-creditos/Iconos/copy.png" alt="" class="prot-icon prot-icon--field">
                    <input type="text" id="vc-debt" placeholder="$50.000.000">
                  </div>
                </div>

                <!-- Por cuánto te aseguras (slider) -->
                <div class="prot-field">
                  <label class="prot-field__label">¿Por cuánto te aseguras?</label>
                  <div class="vc-slider-wrapper">
                    <div class="vc-slider-value" id="vc-insured-display">$50.000.000</div>
                    <input type="range" class="vc-slider" id="vc-insured-slider" min="50000000" max="100000000" value="50000000" step="1000000">
                    <div class="vc-slider-labels">
                      <span id="vc-slider-min">Mín: $50.000.000</span>
                      <span id="vc-slider-max">Máx: $100.000.000</span>
                    </div>
                  </div>
                </div>

                <!-- ITP Obligatoria -->
                <div class="prot-field">
                  <div class="vc-toggle vc-toggle--active" style="cursor:default;opacity:1">
                    <div class="vc-toggle__switch"></div>
                    <span class="vc-toggle__label">Protección por incapacidad total y permanente <strong>(incluida)</strong></span>
                  </div>
                  <span style="font-size:12px;color:#414141;margin-top:4px">Cobertura obligatoria requerida por las entidades financieras.</span>
                </div>

                <!-- Prima estimada (real-time) -->
                <div class="prot-field" style="background:#E6FBF1;padding:16px;border-radius:12px;margin-top:8px">
                  <div style="display:flex;justify-content:space-between;align-items:center">
                    <span style="font-weight:600;font-size:14px;color:#0B613E">Prima estimada mensual:</span>
                    <span style="font-weight:700;font-size:24px;color:#0B613E" id="vc-prima-display">$37.500</span>
                  </div>
                  <span style="font-size:12px;color:#414141;margin-top:4px" id="vc-prima-annual">Anual: $450.000</span>
                </div>
              </div>

              <!-- Footer -->
              <div style="display:flex;justify-content:flex-end;margin-top:16px">
                <button class="prot-btn prot-btn--cta prot-btn--pill" id="cd-continue">Cotizar mi seguro</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,Ce(e)}function Ce(d){const e=document.getElementById("vc-bank"),u=document.getElementById("vc-bank-list"),m=document.getElementById("vc-debt"),r=document.getElementById("vc-insured-slider"),g=document.getElementById("vc-insured-display"),x=document.getElementById("vc-slider-min"),b=document.getElementById("vc-slider-max"),B=document.getElementById("vc-prima-display"),f=document.getElementById("vc-prima-annual");e.addEventListener("focus",()=>u.classList.add("vc-autocomplete__list--visible")),e.addEventListener("input",()=>{const v=e.value.toLowerCase();document.querySelectorAll(".vc-autocomplete__item").forEach(_=>{_.style.display=_.dataset.bank.toLowerCase().includes(v)?"":"none"}),u.classList.add("vc-autocomplete__list--visible")}),document.querySelectorAll(".vc-autocomplete__item").forEach(v=>{v.addEventListener("click",()=>{e.value=v.dataset.bank,u.classList.remove("vc-autocomplete__list--visible")})}),document.addEventListener("click",v=>{v.target.closest(".vc-autocomplete")||u.classList.remove("vc-autocomplete__list--visible")}),m.addEventListener("blur",()=>{const v=m.value.replace(/[^0-9]/g,"");if(v){const _=parseInt(v);m.value=ee(_),r.min=_,r.max=_*2,r.value=_,x.textContent=`Mín: ${ee(_)}`,b.textContent=`Máx: ${ee(_*2)}`,g.textContent=ee(_),y(_)}}),r.addEventListener("input",()=>{const v=parseInt(r.value);g.textContent=ee(v),y(v)});function y(v){const _=fe[d]||fe[35],N=_.life,W=_.itp,A=Math.round((N+W)*v/1e3),F=Math.round(A/12);B.textContent=ee(F),f.textContent=`Anual: ${ee(A)}`,localStorage.setItem("vc_insuredValue",String(v)),localStorage.setItem("vc_annualPrima",String(A)),localStorage.setItem("vc_monthlyPrima",String(F)),localStorage.setItem("vc_itpActive","1"),localStorage.setItem("vc_lifeRate",String(N)),localStorage.setItem("vc_itpRate",String(W)),localStorage.setItem("vc_skipHealth",v<=15e7?"1":"0")}y(parseInt(r.value)),document.getElementById("cd-back").addEventListener("click",()=>{window.location.href=window.location.pathname}),document.getElementById("cd-continue").addEventListener("click",()=>{const v=e.value.trim(),_=m.value.replace(/[^0-9]/g,"");if(!v){e.style.borderColor="#E53935",setTimeout(()=>e.style.borderColor="",2e3);return}if(!_){m.closest(".prot-field__input").style.borderColor="#E53935",setTimeout(()=>m.closest(".prot-field__input").style.borderColor="",2e3);return}localStorage.setItem("vc_bank",v),localStorage.setItem("vc_debt",_);const N=new URL(window.location);N.searchParams.set("page","quotation"),window.location.href=N.toString()})}function ee(d){return"$"+d.toLocaleString("es-CO")}function Se(d){const e=parseInt(localStorage.getItem("vc_monthlyPrima")||"37500"),u=parseInt(localStorage.getItem("vc_annualPrima")||"450000"),m=parseInt(localStorage.getItem("vc_insuredValue")||"50000000"),r=localStorage.getItem("vc_itpActive")==="1",g=localStorage.getItem("vc_bank")||"Tu banco",b=(localStorage.getItem("vc_phone")||"3103025462").slice(-4),B=f=>"$"+f.toLocaleString("es-CO");d.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo">
          <img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar">
        </div>
      </header>

      <div class="sp-content">
        <aside class="sp-stepper">
          <div class="sp-stepper__list">
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div>
              <span class="sp-step__label">Tus datos</span>
            </div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div>
              <span class="sp-step__label">Tu crédito</span>
            </div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step sp-step--active">
              <div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--active"><span>3</span></div></div>
              <span class="sp-step__label sp-step__label--active">Tu cotización</span>
            </div>
            <div class="sp-step__line"></div>
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet"><span>4</span></div></div>
              <span class="sp-step__label">Complementa</span>
            </div>
            <div class="sp-step__line"></div>
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet"><span>5</span></div></div>
              <span class="sp-step__label">Paga y activa</span>
            </div>
          </div>
        </aside>

        <main class="sp-main">
          <div class="sp-back" id="qt-back">
            <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <div class="pd-form-wrapper">
            <!-- Quotation result card -->
            <div class="vc-quote-card">
              <h2 style="font-family:var(--prot-font);font-weight:600;font-size:24px;color:#1B1B1B;text-align:center">Tu cotización</h2>
              <p style="font-family:var(--prot-font);font-size:14px;color:#5B5B5B;text-align:center">Protección de crédito con ${g}</p>

              <!-- Price -->
              <div class="vc-quote-card__price">
                <span class="vc-quote-card__amount" id="qt-price-display">${B(e)}</span>
                <span class="vc-quote-card__period" id="qt-period-label">/mes</span>
              </div>

              <!-- Toggle periodicidad -->
              <div style="display:flex;align-items:center;gap:12px;padding:8px 16px;background:#F5F5F5;border-radius:8px">
                <span style="font-size:14px;color:#009056;font-weight:700" id="qt-lbl-monthly">Mensual</span>
                <div class="vc-toggle vc-toggle--active" id="qt-period-toggle" style="cursor:pointer">
                  <div class="vc-toggle__switch" style="width:36px;height:20px"></div>
                </div>
                <span style="font-size:14px;color:#757575" id="qt-lbl-annual">Anual</span>
              </div>

              <div class="vc-quote-card__alt-price" id="qt-alt-price">
                Pago anual: ${B(u)} (ahorra 2 meses)
              </div>

              <!-- Coverages -->
              <div class="vc-quote-card__coverages">
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Muerte por cualquier causa</span>
                  <span class="vc-quote-coverage__value">${B(m)}</span>
                </div>
                ${r?`
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Incapacidad total y permanente</span>
                  <span class="vc-quote-coverage__value">${B(m)}</span>
                </div>`:""}
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Beneficiario: ${g}</span>
                  <span class="vc-quote-coverage__value">100%</span>
                </div>
              </div>

              <!-- CTAs -->
              <div style="display:flex;flex-direction:column;gap:12px;width:100%;margin-top:8px">
                <button class="prot-btn prot-btn--cta prot-btn--pill prot-btn--block" id="qt-continue" style="min-height:48px;font-size:18px">Quiero este seguro</button>
                <div style="display:flex;gap:12px;width:100%">
                  <button class="prot-btn prot-btn--ghost prot-btn--pill" id="qt-save" style="flex:1;font-size:13px">Guardar y decidir después</button>
                  <button class="prot-btn prot-btn--ghost prot-btn--pill" id="qt-pdf" style="flex:1;font-size:13px">
                    <img src="/vida-proteccion-creditos/Iconos/download.png" alt="" style="width:16px;height:16px"> Descargar PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- OTP MODAL -->
      <div class="otp-overlay" id="otp-overlay">
        <div class="otp-modal">
          <div class="otp-modal__header">
            <span class="otp-modal__close-text">Cerrar</span>
            <button class="otp-modal__close" id="otp-close">&times;</button>
          </div>
          <div class="otp-modal__body">
            <h2 class="otp-modal__title">Verifica tu identidad</h2>
            <p class="otp-modal__subtitle">Enviamos un código a:</p>
            <div class="otp-modal__phone">
              <img src="/vida-proteccion-creditos/Iconos/mobile-button.png" alt="" class="otp-modal__phone-icon">
              <span class="otp-modal__phone-number">*** *** ${b}</span>
            </div>
          </div>
          <div class="otp-modal__input-section">
            <label class="otp-modal__label">Ingresa el código de 6 dígitos:</label>
            <div class="otp-modal__input-wrapper">
              <input type="text" id="otp-input" class="otp-modal__input" placeholder="Ej: 111111" maxlength="6">
              <img src="/vida-proteccion-creditos/Iconos/keyboard.png" alt="" class="otp-modal__keyboard-icon">
            </div>
            <span class="otp-modal__help">El código estará activo por 80 segundos</span>
          </div>
          <div class="otp-modal__resend">
            <span>¿No recibiste el código? <a href="#" class="otp-modal__resend-link">Reenviar código.</a></span>
          </div>
          <div class="otp-modal__actions">
            <button class="otp-modal__btn-link" id="otp-cancel">Cancelar</button>
            <button class="otp-modal__btn-validate" id="otp-validate" disabled>Validar código</button>
          </div>
        </div>
      </div>

      <!-- SUCCESS MODAL -->
      <div class="otp-overlay" id="success-overlay">
        <div class="otp-success-modal">
          <div class="otp-success__icon">
            <img src="/vida-proteccion-creditos/Iconos/shield-dog (1).png" alt="" class="otp-success__pictogram">
          </div>
          <div class="otp-success__body">
            <h2 class="otp-success__title">Identidad verificada</h2>
            <p class="otp-success__text">Preparando tu solicitud...</p>
          </div>
          <div class="otp-success__spinner">
            <img src="/vida-proteccion-creditos/Iconos/Ellipse 350.png" alt="" class="otp-success__spinner-img">
          </div>
        </div>
      </div>
    </div>
  `,Le(e,u)}function Le(d,e){const u=_=>"$"+_.toLocaleString("es-CO");let m=!0;const r=document.getElementById("qt-price-display"),g=document.getElementById("qt-period-label"),x=document.getElementById("qt-alt-price"),b=document.getElementById("qt-period-toggle"),B=document.getElementById("qt-lbl-monthly"),f=document.getElementById("qt-lbl-annual");b.addEventListener("click",()=>{m=!m,b.classList.toggle("vc-toggle--active",m),m?(r.textContent=u(d),g.textContent="/mes",x.textContent=`Pago anual: ${u(e)} (ahorra 2 meses)`,B.style.color="#009056",B.style.fontWeight="700",f.style.color="#757575",f.style.fontWeight="400"):(r.textContent=u(e),g.textContent="/año",x.textContent=`Pago mensual: ${u(d)}`,f.style.color="#009056",f.style.fontWeight="700",B.style.color="#757575",B.style.fontWeight="400"),localStorage.setItem("vc_periodicity",m?"monthly":"annual")}),document.getElementById("qt-back").addEventListener("click",()=>{const _=new URL(window.location);_.searchParams.set("page","credit-data"),window.location.href=_.toString()}),document.getElementById("qt-save").addEventListener("click",()=>{alert("Tu cotización ha sido guardada. Podrás retomarla cuando quieras.")}),document.getElementById("qt-pdf").addEventListener("click",()=>{alert("Descargando PDF de tu cotización...")}),document.getElementById("qt-continue").addEventListener("click",()=>{localStorage.setItem("vc_periodicity",m?"monthly":"annual"),document.getElementById("otp-overlay").classList.add("otp-overlay--visible")});const y=document.getElementById("otp-input"),v=document.getElementById("otp-validate");y.addEventListener("input",()=>{const _=y.value.replace(/\D/g,"");y.value=_,_.length===6?(v.disabled=!1,v.classList.add("otp-modal__btn-validate--active")):(v.disabled=!0,v.classList.remove("otp-modal__btn-validate--active"))}),v.addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible"),document.getElementById("success-overlay").classList.add("otp-overlay--visible"),setTimeout(()=>{const _=new URL(window.location);_.searchParams.set("page","complementary"),window.location.href=_.toString()},2500)}),document.getElementById("otp-close").addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible")}),document.getElementById("otp-cancel").addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible")})}function Be(d){localStorage.getItem("vc_name"),localStorage.getItem("vc_email");const e=localStorage.getItem("vc_bank")||"Bancolombia",u=parseInt(localStorage.getItem("vc_debt")||"50000000"),m=parseInt(localStorage.getItem("vc_insuredValue")||"50000000"),r=m>u,g=Math.round(u/m*100),x=100-g,b=localStorage.getItem("vc_skipHealth")==="1";d.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo">
          <img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar">
        </div>
      </header>

      <div class="sp-content">
        <aside class="sp-stepper">
          <div class="sp-stepper__list">
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div>
              <span class="sp-step__label">Tus datos</span>
            </div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div>
              <span class="sp-step__label">Tu crédito</span>
            </div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div>
              <span class="sp-step__label">Tu cotización</span>
            </div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step sp-step--active">
              <div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--active"><span>4</span></div></div>
              <span class="sp-step__label sp-step__label--active">Complementa</span>
            </div>
            <div class="sp-step__line"></div>
            <div class="sp-step">
              <div class="sp-step__container"><div class="sp-step__bullet"><span>5</span></div></div>
              <span class="sp-step__label">Paga y activa</span>
            </div>
          </div>
        </aside>

        <main class="sp-main">
          <div class="sp-back" id="comp-back">
            <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <div class="pd-form-wrapper" style="max-width:600px">
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:24px">
              <h1 style="font-family:var(--prot-font);font-weight:600;font-size:28px;color:#1B1B1B">Complementa tus datos</h1>
              <p style="font-family:var(--prot-font);font-size:16px;color:#414141">Completa la información para activar tu seguro.</p>
            </div>

            <!-- SECTION A: Datos personales faltantes -->
            <div class="vc-collapsible vc-collapsible--open" id="sec-personal">
              <div class="vc-collapsible__header">
                <div class="vc-collapsible__title">
                  <img src="/vida-proteccion-creditos/Iconos/user.png" alt="">
                  <span>Datos personales</span>
                </div>
                <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="vc-collapsible__chevron">
              </div>
              <div class="vc-collapsible__body">
                <div style="display:flex;flex-direction:column;gap:16px">
                  <div class="pd-field">
                    <label class="pd-field__label">Género</label>
                    <div class="pd-field__chips">
                      <button class="pd-chip" data-value="M">Masculino</button>
                      <button class="pd-chip pd-chip--active" data-value="F">Femenino</button>
                    </div>
                  </div>
                  <div class="pd-field">
                    <label class="pd-field__label">Departamento</label>
                    <div class="pd-field__select">
                      <select id="comp-dept">
                        <option value="" disabled selected>Selecciona</option>
                        <option>Cundinamarca</option><option>Antioquia</option><option>Valle del Cauca</option>
                        <option>Atlántico</option><option>Santander</option><option>Bolívar</option>
                      </select>
                      <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="pd-field__chevron">
                    </div>
                  </div>
                  <div class="pd-field">
                    <label class="pd-field__label">Ciudad</label>
                    <div class="pd-field__select">
                      <select id="comp-city">
                        <option value="" disabled selected>Selecciona</option>
                        <option>Bogotá</option><option>Medellín</option><option>Cali</option>
                        <option>Barranquilla</option><option>Bucaramanga</option>
                      </select>
                      <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="pd-field__chevron">
                    </div>
                  </div>
                  <div class="pd-field">
                    <label class="pd-field__label">Dirección de residencia</label>
                    <div class="pd-field__input">
                      <input type="text" id="comp-address" placeholder="Ej: Calle 100 # 15-20 Apto 301">
                    </div>
                  </div>
                  <div class="pd-field" ${b?'style="display:none"':""}>
                    <label class="pd-field__label">¿A qué te dedicas?</label>
                    <div class="pd-field__input">
                      <input type="text" id="comp-occupation" placeholder="Ej: Ingeniero de sistemas, Docente, Comerciante">
                    </div>
                  </div>
                  <div class="pd-field" ${b?'style="display:none"':""}>
                    <label class="pd-field__label">Situación laboral</label>
                    <div class="pd-field__select">
                      <select id="comp-labor">
                        <option value="" disabled selected>Selecciona</option>
                        <option>Empleado</option><option>Independiente</option><option>Servidor público</option>
                      </select>
                      <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="pd-field__chevron">
                    </div>
                  </div>
              </div>
            </div>

            <!-- SECTION B: Declaración de salud (hidden if <= 150M) -->
            <div class="vc-collapsible" id="sec-health" ${b?'style="display:none"':""}>
              <div class="vc-collapsible__header">
                <div class="vc-collapsible__title">
                  <img src="/vida-proteccion-creditos/Iconos/Latido.png" alt="">
                  <span>Declaración de salud</span>
                </div>
                <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="vc-collapsible__chevron">
              </div>
              <div class="vc-collapsible__body">
                <div style="display:flex;flex-direction:column;gap:0">
                  <div class="vc-health-question">
                    <span class="vc-health-question__text">¿Te han diagnosticado alguna enfermedad del corazón, hipertensión o diabetes?</span>
                    <div class="vc-health-question__options">
                      <label class="vc-health-radio"><input type="radio" name="q1" value="N" checked><span>No</span></label>
                      <label class="vc-health-radio"><input type="radio" name="q1" value="S"><span>Sí</span></label>
                    </div>
                  </div>
                  <div class="vc-health-question">
                    <span class="vc-health-question__text">¿Te han realizado cirugías en los últimos 5 años?</span>
                    <div class="vc-health-question__options">
                      <label class="vc-health-radio"><input type="radio" name="q2" value="N" checked><span>No</span></label>
                      <label class="vc-health-radio"><input type="radio" name="q2" value="S"><span>Sí</span></label>
                    </div>
                  </div>
                  <div class="vc-health-question">
                    <span class="vc-health-question__text">¿Estás actualmente en tratamiento médico o tomas medicamentos de forma regular?</span>
                    <div class="vc-health-question__options">
                      <label class="vc-health-radio"><input type="radio" name="q3" value="N" checked><span>No</span></label>
                      <label class="vc-health-radio"><input type="radio" name="q3" value="S"><span>Sí</span></label>
                    </div>
                  </div>
                  <div class="vc-health-question">
                    <span class="vc-health-question__text">¿Te han diagnosticado cáncer o alguna enfermedad terminal?</span>
                    <div class="vc-health-question__options">
                      <label class="vc-health-radio"><input type="radio" name="q4" value="N" checked><span>No</span></label>
                      <label class="vc-health-radio"><input type="radio" name="q4" value="S"><span>Sí</span></label>
                    </div>
                  </div>
                  <div class="vc-health-question">
                    <span class="vc-health-question__text">¿Fumas actualmente?</span>
                    <div class="vc-health-question__options">
                      <label class="vc-health-radio"><input type="radio" name="q5" value="N" checked><span>No</span></label>
                      <label class="vc-health-radio"><input type="radio" name="q5" value="S"><span>Sí</span></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- SECTION C: Beneficiarios -->
            <div class="vc-collapsible" id="sec-beneficiaries">
              <div class="vc-collapsible__header">
                <div class="vc-collapsible__title">
                  <img src="/vida-proteccion-creditos/Iconos/Group 7272.png" alt="">
                  <span>Beneficiarios</span>
                </div>
                <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="vc-collapsible__chevron">
              </div>
              <div class="vc-collapsible__body">
                <!-- Auto beneficiary (bank) -->
                <div class="vc-beneficiary-auto">
                  <img src="/vida-proteccion-creditos/Iconos/shield-dog.png" alt="" class="vc-beneficiary-auto__icon">
                  <span class="vc-beneficiary-auto__text"><strong>${e}</strong> recibe el ${g}% del valor asegurado (equivalente a tu deuda).</span>
                </div>

                ${r?`
                <p style="font-size:13px;color:#5B5B5B;margin-bottom:12px">Como tu valor asegurado es mayor a tu deuda, designa un beneficiario libre para el ${x}% restante:</p>
                <div style="display:flex;flex-direction:column;gap:12px">
                  <div class="pd-field">
                    <label class="pd-field__label">Nombre completo del beneficiario</label>
                    <div class="pd-field__input"><input type="text" id="comp-benef-name" placeholder="Ana María Velásquez"></div>
                  </div>
                  <div class="pd-field">
                    <label class="pd-field__label">Parentesco</label>
                    <div class="pd-field__select">
                      <select id="comp-benef-rel">
                        <option value="" disabled selected>Selecciona</option>
                        <option>Cónyuge</option><option>Hijo/a</option><option>Padre/Madre</option><option>Hermano/a</option><option>Otro</option>
                      </select>
                      <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="pd-field__chevron">
                    </div>
                  </div>
                </div>`:`
                <p style="font-size:13px;color:#5B5B5B">Tu banco recibirá el 100% del valor asegurado ya que coincide con tu deuda.</p>
                `}
              </div>
            </div>

            <!-- SECTION D: Número de crédito -->
            <div class="vc-collapsible" id="sec-credit">
              <div class="vc-collapsible__header">
                <div class="vc-collapsible__title">
                  <img src="/vida-proteccion-creditos/Iconos/copy.png" alt="">
                  <span>Número de crédito</span>
                </div>
                <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="vc-collapsible__chevron">
              </div>
              <div class="vc-collapsible__body">
                <div class="pd-field">
                  <label class="pd-field__label">Número de obligación o crédito con ${e}</label>
                  <div class="pd-field__input">
                    <input type="text" id="comp-credit-number" placeholder="Ej: 12345678">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="pd-footer">
            <button class="pd-footer__btn" id="comp-continue">Continuar</button>
          </div>
        </main>
      </div>
    </div>
  `,ke()}function ke(){document.querySelectorAll(".vc-collapsible__header").forEach(d=>{d.addEventListener("click",()=>{d.closest(".vc-collapsible").classList.toggle("vc-collapsible--open")})}),document.querySelectorAll(".pd-chip").forEach(d=>{d.addEventListener("click",()=>{d.closest(".pd-field__chips").querySelectorAll(".pd-chip").forEach(e=>e.classList.remove("pd-chip--active")),d.classList.add("pd-chip--active")})}),document.getElementById("comp-back").addEventListener("click",()=>{const d=new URL(window.location);d.searchParams.set("page","quotation"),window.location.href=d.toString()}),document.getElementById("comp-continue").addEventListener("click",()=>{var b,B,f,y,v,_;const d=((b=document.querySelector(".pd-chip--active"))==null?void 0:b.dataset.value)||"F",e=((B=document.getElementById("comp-dept"))==null?void 0:B.value)||"",u=((f=document.getElementById("comp-city"))==null?void 0:f.value)||"",m=((y=document.getElementById("comp-address"))==null?void 0:y.value)||"",r=((v=document.getElementById("comp-occupation"))==null?void 0:v.value)||"",g=((_=document.getElementById("comp-credit-number"))==null?void 0:_.value)||"";localStorage.setItem("vc_gender",d),localStorage.setItem("vc_dept",e),localStorage.setItem("vc_city",u),localStorage.setItem("vc_address",m),localStorage.setItem("vc_occupation",r),localStorage.setItem("vc_creditNumber",g);const x=new URL(window.location);x.searchParams.set("page","summary"),window.location.href=x.toString()})}function Me(d){const e=A=>"$"+parseInt(A).toLocaleString("es-CO"),u=localStorage.getItem("vc_name")||"Simón Andrés Bolívar",m=localStorage.getItem("vc_docNumber")||"1032508877",r=localStorage.getItem("vc_phone")||"3103025462",g=localStorage.getItem("vc_email")||"correo@email.com",x=localStorage.getItem("vc_age")||"35",b=localStorage.getItem("vc_bank")||"Bancolombia",B=localStorage.getItem("vc_insuredValue")||"50000000",f=localStorage.getItem("vc_monthlyPrima")||"37500",y=localStorage.getItem("vc_annualPrima")||"450000",v=localStorage.getItem("vc_periodicity")||"monthly",_=localStorage.getItem("vc_city")||"Bogotá",N=localStorage.getItem("vc_creditNumber")||"12345678",W=localStorage.getItem("vc_itpActive")==="1";d.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo"><img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar"></div>
      </header>
      <div class="sp-content">
        <aside class="sp-stepper">
          <div class="sp-stepper__list">
            <div class="sp-step"><div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div><span class="sp-step__label">Tus datos</span></div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step"><div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div><span class="sp-step__label">Tu crédito</span></div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step"><div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div><span class="sp-step__label">Tu cotización</span></div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step"><div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div><span class="sp-step__label">Complementa</span></div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step sp-step--active"><div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--active"><span>5</span></div></div><span class="sp-step__label sp-step__label--active">Paga y activa</span></div>
          </div>
        </aside>

        <main class="sp-main">
          <div class="sp-back" id="sum-back"><img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="sp-back__icon"><span class="sp-back__text">Volver</span></div>

          <div class="pf-card" style="max-width:860px">
            <div class="pf-card__content" style="gap:24px">
              <!-- Header -->
              <div style="display:flex;align-items:flex-start;gap:8px;width:100%">
                <img src="/vida-proteccion-creditos/Iconos/Name-icon (12).png" alt="" style="width:42px;height:42px">
                <div>
                  <h1 style="font-family:var(--prot-font);font-weight:700;font-size:28px;color:#1B1B1B">Resumen de tu seguro</h1>
                  <p style="font-family:var(--prot-font);font-size:16px;color:#414141">Verifica que todo esté correcto antes de pagar.</p>
                </div>
              </div>

              <!-- Two columns -->
              <div style="display:flex;gap:24px;width:100%;flex-wrap:wrap">
                <!-- Left: Plan -->
                <div style="flex:1;min-width:280px">
                  <div class="conf-plan">
                    <div class="conf-plan__header">
                      <img src="/vida-proteccion-creditos/Iconos/shield-dog.png" alt="" class="conf-plan__icon">
                      <span class="conf-plan__name">Vida Protección Créditos</span>
                    </div>
                    <div class="conf-plan__details">
                      <div class="conf-plan__row"><span class="conf-plan__label">Valor asegurado:</span><span class="conf-plan__value">${e(B)}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Prima ${v==="monthly"?"mensual":"anual"}:</span><span class="conf-plan__value">${e(v==="monthly"?f:y)}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Banco:</span><span class="conf-plan__value--bold">${b}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Crédito #:</span><span class="conf-plan__value--bold">${N}</span></div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px">
                      <div style="display:flex;align-items:center;gap:8px"><img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" style="width:16px"><span style="font-size:13px;color:#303030">Muerte por cualquier causa</span></div>
                      ${W?'<div style="display:flex;align-items:center;gap:8px"><img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" style="width:16px"><span style="font-size:13px;color:#303030">Incapacidad total y permanente</span></div>':""}
                    </div>
                  </div>
                </div>

                <!-- Right: User data -->
                <div style="flex:1;min-width:280px">
                  <div class="conf-data-card">
                    <div class="conf-data-card__header"><img src="/vida-proteccion-creditos/Iconos/user.png" alt="" class="conf-data-card__icon"><span class="conf-data-card__title">Tus datos</span></div>
                    <div class="conf-data-card__rows">
                      <div class="conf-data-row"><span class="conf-data-row__label">Nombre:</span><span class="conf-data-row__value">${u}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Cédula:</span><span class="conf-data-row__value">${m}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Celular:</span><span class="conf-data-row__value">${r}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Edad:</span><span class="conf-data-row__value">${x} años</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Ciudad:</span><span class="conf-data-row__value">${_}</span></div>
                    </div>
                    <div class="conf-data-card__email" style="margin-top:8px">
                      <span>Enviaremos la póliza a:</span>
                      <span style="font-weight:700;color:#414141">${g}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Frequency selection -->
              <div style="width:100%">
                <h3 style="font-family:var(--prot-font);font-weight:600;font-size:20px;color:#1B1B1B;margin-bottom:16px">Elige tu frecuencia de pago</h3>
                <div class="pf-options">
                  <div class="pf-option pf-option--selected" data-freq="annual">
                    <div class="pf-option__top">
                      <span class="pf-option__tag">Ahorra 2 meses</span>
                      <div class="pf-option__radio pf-option__radio--active"></div>
                    </div>
                    <h2 class="pf-option__name" style="font-size:24px">Pago anual</h2>
                    <span class="pf-option__amount" style="font-size:28px">${e(y)}<span class="pf-option__period">/año</span></span>
                    <span class="pf-option__iva">IVA incluido</span>
                  </div>
                  <div class="pf-option" data-freq="monthly">
                    <div class="pf-option__top">
                      <span class="pf-option__tag pf-option__tag--hidden"></span>
                      <div class="pf-option__radio"></div>
                    </div>
                    <h2 class="pf-option__name" style="font-size:24px">Pago mensual</h2>
                    <span class="pf-option__amount" style="font-size:28px">${e(f)}<span class="pf-option__period">/mes</span></span>
                    <span class="pf-option__iva">IVA incluido</span>
                  </div>
                </div>
              </div>

              <!-- Checks -->
              <div class="pf-checks" style="width:100%">
                <label class="pf-check"><input type="checkbox" class="pf-check__input"><span>Acepto los <a href="#" style="color:#038450;font-weight:700">Términos y Condiciones</a> del Seguro Vida Protección Créditos.</span></label>
                <label class="pf-check"><input type="checkbox" class="pf-check__input"><span>Doy mi consentimiento para firmar electrónicamente la solicitud del seguro.</span></label>
                <label class="pf-check"><input type="checkbox" class="pf-check__input"><span>Autorizo a Seguros Bolívar a debitar automáticamente el pago de mi póliza.</span></label>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="pd-footer">
            <button class="pd-footer__btn pd-footer__btn--disabled" id="sum-pay" disabled>Ir a pagar</button>
          </div>
        </main>
      </div>
    </div>
  `,Te()}function Te(){const d=document.querySelectorAll(".pf-option"),e=document.querySelectorAll(".pf-check__input"),u=document.getElementById("sum-pay");d.forEach(r=>{r.addEventListener("click",()=>{d.forEach(g=>{g.classList.remove("pf-option--selected"),g.querySelector(".pf-option__radio").classList.remove("pf-option__radio--active")}),r.classList.add("pf-option--selected"),r.querySelector(".pf-option__radio").classList.add("pf-option__radio--active"),localStorage.setItem("vc_periodicity",r.dataset.freq==="annual"?"annual":"monthly"),m()})}),e.forEach(r=>r.addEventListener("change",m));function m(){const r=document.querySelector(".pf-option--selected"),g=[...e].every(x=>x.checked);r&&g?(u.disabled=!1,u.classList.remove("pd-footer__btn--disabled")):(u.disabled=!0,u.classList.add("pd-footer__btn--disabled"))}document.getElementById("sum-back").addEventListener("click",()=>{const r=new URL(window.location);r.searchParams.set("page","complementary"),window.location.href=r.toString()}),u.addEventListener("click",()=>{if(!u.disabled){const r=new URL(window.location);r.searchParams.set("page","success"),window.location.href=r.toString()}})}function Ne(d){var v,_;const e=N=>"$"+parseInt(N).toLocaleString("es-CO"),u=localStorage.getItem("vc_name")||"Simón Bolívar",m=localStorage.getItem("vc_bank")||"Bancolombia",r=localStorage.getItem("vc_email")||"correo@email.com",g=localStorage.getItem("vc_periodicity")||"monthly",x=localStorage.getItem("vc_monthlyPrima")||"37500",b=localStorage.getItem("vc_annualPrima")||"450000",B=e(g==="monthly"?x:b),f=g==="monthly"?"Mensual":"Anual",y="#VPC-2026-"+Math.floor(1e3+Math.random()*9e3);localStorage.setItem("vc_policyNumber",y),d.innerHTML=`
    <div class="success-page">
      <header class="sp-header">
        <div class="sp-header__logo"><img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar"></div>
      </header>

      <div class="success-banner">
        <div class="success-banner__confetti"></div>
        <div class="success-banner__text">
          <p class="success-banner__subtitle">¡Tu seguro fue activado!</p>
          <h1 class="success-banner__title">Bienvenido a Seguros Bolívar, ${u.split(" ")[0]}</h1>
        </div>
      </div>

      <div class="success-content">
        <div class="success-card">
          <div class="success-card__header">
            <img src="/vida-proteccion-creditos/Iconos/shield-dog (1).png" alt="" class="success-card__icon">
            <span class="success-card__title">Detalles de tu póliza</span>
          </div>
          <div class="success-card__details">
            <div class="success-card__row"><span class="success-card__label">Producto:</span><span class="success-card__value">Vida Protección Créditos</span></div>
            <div class="success-card__row"><span class="success-card__label">Pago ${f.toLowerCase()}:</span><span class="success-card__value">${B}</span></div>
            <div class="success-card__row"><span class="success-card__label">Banco protegido:</span><span class="success-card__value">${m}</span></div>
            <div class="success-card__row"><span class="success-card__label">Vigencia:</span><span class="success-card__value">18 jun 2026 – 18 jun 2027</span></div>
            <div class="success-card__row"><span class="success-card__label">No. póliza:</span><span class="success-card__value">${y}</span></div>
          </div>
          <div class="success-card__divider"></div>
          <div class="success-card__approval">
            <div class="success-card__approval-label">
              <img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" class="success-card__approval-icon">
              <span>Número de aprobación de la compra</span>
            </div>
            <div class="success-card__approval-code">
              <span class="success-card__code">${Math.floor(1e10+Math.random()*9e10)}</span>
              <button class="success-card__copy" id="vc-copy">
                <img src="/vida-proteccion-creditos/Iconos/copy.png" alt="" class="success-card__copy-icon">
                <span>Copiar</span>
              </button>
            </div>
          </div>
        </div>

        <div class="success-info">
          <p>En un máximo de <strong>12 horas</strong>, enviaremos los detalles de tu seguro al correo electrónico <strong>${r}</strong>.</p>
        </div>

        <button class="success-home-btn" id="vc-home">
          <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="success-home-btn__icon">
          <span>Ir al inicio</span>
        </button>
      </div>
    </div>
  `,(v=document.getElementById("vc-copy"))==null||v.addEventListener("click",()=>{const N=document.querySelector(".success-card__code").textContent;navigator.clipboard.writeText(N).then(()=>{document.querySelector("#vc-copy span").textContent="¡Copiado!",setTimeout(()=>document.querySelector("#vc-copy span").textContent="Copiar",2e3)})}),(_=document.getElementById("vc-home"))==null||_.addEventListener("click",()=>{localStorage.clear(),window.location.href=window.location.pathname})}function Ae(){const e=new URLSearchParams(window.location.search).get("page")||"home",u=document.getElementById("app-content");switch(e){case"credit-data":Ie(u);break;case"quotation":Se(u);break;case"complementary":Be(u);break;case"summary":Me(u);break;case"success":Ne(u);break;case"home":default:xe(u);break}}window.addEventListener("message",d=>{var e;if(d.data){if(d.data.type==="SAVE_SNAPSHOT"){const u=((e=document.getElementById("app-content"))==null?void 0:e.innerHTML)||document.body.innerHTML;window.parent.postMessage({type:"SNAPSHOT_DATA",html:u,page:d.data.page,projectId:d.data.projectId},"*")}if(d.data.type==="RESTORE_SNAPSHOT"){const u=document.getElementById("app-content");u&&d.data.html&&(u.innerHTML=d.data.html)}if(d.data.type==="NAVIGATE_TO_STEP"){const u=d.data.page;if(u){const m=new URL(window.location);m.searchParams.set("page",u),window.location.href=m.toString()}}if(d.data.type==="ADMIN_OVERRIDE"){const{selector:u,property:m,value:r}=d.data;try{const g=document.querySelector(u);g&&(m==="textContent"?g.textContent=r:m==="src"?g.src=r:g.style.setProperty(m.replace(/([A-Z])/g,"-$1").toLowerCase(),r,"important"))}catch{}}}});function ge(){Ae()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ge):ge();
