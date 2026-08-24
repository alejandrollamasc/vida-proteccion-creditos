(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))p(d);new MutationObserver(d=>{for(const f of d)if(f.type==="childList")for(const _ of f.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&p(_)}).observe(document,{childList:!0,subtree:!0});function c(d){const f={};return d.integrity&&(f.integrity=d.integrity),d.referrerPolicy&&(f.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?f.credentials="include":d.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function p(d){if(d.ep)return;d.ep=!0;const f=c(d);fetch(d.href,f)}})();window.self===window.top||Be();function Be(){let a=!1,e=null,c=!1,p=[],d=[],f=!1,_={},y=null,k=1e4;const g=5,x=document.createElement("div");x.id="editor-toolbar",x.innerHTML="",x.style.cssText="display:none;position:fixed;z-index:99999;",document.body.appendChild(x);const v=document.createElement("div");v.id="resize-box",v.style.cssText="display:none;position:fixed;z-index:99998;pointer-events:none;border:2px solid #0a6741;",["nw","ne","sw","se","n","s","e","w"].forEach(t=>{const o=document.createElement("div");o.className="resize-handle",o.dataset.dir=t,o.style.cssText=`position:absolute;width:8px;height:8px;background:#0a6741;border-radius:2px;pointer-events:all;cursor:${t}-resize;`;const l={nw:"top:-4px;left:-4px;",ne:"top:-4px;right:-4px;",sw:"bottom:-4px;left:-4px;",se:"bottom:-4px;right:-4px;",n:"top:-4px;left:50%;transform:translateX(-50%);",s:"bottom:-4px;left:50%;transform:translateX(-50%);",e:"top:50%;right:-4px;transform:translateY(-50%);",w:"top:50%;left:-4px;transform:translateY(-50%);"};o.style.cssText+=l[t],v.appendChild(o)}),document.body.appendChild(v);const b=document.createElement("div");b.className="rotate-line",v.appendChild(b);const T=document.createElement("div");T.className="rotate-handle",v.appendChild(T),T.addEventListener("mousedown",t=>{if(!e)return;t.preventDefault(),t.stopPropagation();const o=e.getBoundingClientRect(),l=o.left+o.width/2,s=o.top+o.height/2;parseFloat(e.dataset.rotation||"0");const i=u=>{const m=Math.atan2(u.clientY-s,u.clientX-l)*(180/Math.PI)+90;e.style.transform=`rotate(${Math.round(m)}deg)`,e.dataset.rotation=Math.round(m),G(e)},r=()=>{document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",r),w("changeStyle",e,"transform",e.style.transform)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",r)});const $=document.createElement("div");$.style.cssText="display:none;position:fixed;z-index:99997;background:#E8C916;color:#333;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;pointer-events:none;",document.body.appendChild($);const M=document.createElement("div");M.id="alignment-guides",M.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99996;",document.body.appendChild(M);const q=document.createElement("div");q.id="text-cursor",q.style.cssText="display:none;position:fixed;z-index:99999;pointer-events:none;",q.innerHTML=`
  <div style="display:flex;align-items:center;gap:4px;">
    <div style="width:2px;height:20px;background:#0a6741;animation:blink 0.8s infinite;"></div>
    <span style="font-size:10px;color:#0a6741;font-weight:600;background:rgba(255,255,255,0.9);padding:1px 6px;border-radius:4px;white-space:nowrap;">Clic para insertar texto</span>
  </div>
`,document.body.appendChild(q);const U=document.createElement("style");U.textContent=`
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
`,document.head.appendChild(U);const W=document.createElement("div");W.id="sb-grid-overlay",W.classList.add("visible");for(let t=0;t<12;t++){const o=document.createElement("div");o.className="sb-grid-col",W.appendChild(o)}document.body.appendChild(W);const j=document.createElement("div");j.id="sb-smart-guides",j.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99994;",document.body.appendChild(j);const X=4;function Se(t,o,l,s){j.innerHTML="";const i=s.left+o,r=s.top+l,u=i+s.width,m=r+s.height,n=i+s.width/2,h=r+s.height/2,E=window.innerWidth/2,C=window.innerHeight/2;Math.abs(n-E)<X&&Q("v",E,"#E8C916","Centro"),Math.abs(h-C)<X&&Q("h",C,"#E8C916","Centro"),document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, img, div.admin-inserted, [class*="card"], [class*="btn"], [class*="hero"], [class*="section"]').forEach(L=>{if(L===t||L.contains(t)||t.contains(L)||L.closest("#sb-resize-box")||L.closest("#sb-smart-guides")||L.closest("#sb-grid-overlay"))return;const I=L.getBoundingClientRect();if(I.width<10||I.height<10)return;const P=I.left+I.width/2,R=I.top+I.height/2;Math.abs(n-P)<X&&Q("v",P,"#0a6741"),Math.abs(h-R)<X&&Q("h",R,"#0a6741"),Math.abs(i-I.left)<X&&Q("v",I.left,"#ff6b6b"),Math.abs(u-I.right)<X&&Q("v",I.right,"#ff6b6b"),Math.abs(r-I.top)<X&&Q("h",I.top,"#ff6b6b"),Math.abs(m-I.bottom)<X&&Q("h",I.bottom,"#ff6b6b")})}function Q(t,o,l,s){const i=document.createElement("div");if(t==="v"?i.style.cssText=`position:fixed;top:0;bottom:0;left:${o}px;width:1px;background:${l};opacity:0.7;`:i.style.cssText=`position:fixed;left:0;right:0;top:${o}px;height:1px;background:${l};opacity:0.7;`,j.appendChild(i),s){const r=document.createElement("div");r.textContent=s,r.style.cssText=`position:fixed;${t==="v"?"left:"+(o+4)+"px;top:8px":"top:"+(o+4)+"px;left:8px"};background:${l};color:#fff;font-size:9px;padding:1px 5px;border-radius:3px;font-family:sans-serif;`,j.appendChild(r)}}function Ce(){j.innerHTML=""}const te=document.createElement("div");te.className="cursor-guide-h",te.style.display="none",document.body.appendChild(te);const se=document.createElement("div");se.className="cursor-guide-v",se.style.display="none",document.body.appendChild(se);function K(t){if(t.id)return"#"+t.id;if(t.className&&typeof t.className=="string"){const s=t.className.trim().split(/\s+/).filter(i=>i!=="editor-highlight"&&i!=="editor-dragging");if(s.length){const i="."+s.join(".");try{if(document.querySelectorAll(i).length===1)return i}catch{}}}const o=[];let l=t;for(;l&&l!==document.body;){let s=l.tagName.toLowerCase();if(l.id){o.unshift("#"+l.id);break}const i=l.parentElement;if(i){const r=Array.from(i.children).filter(u=>u.tagName===l.tagName);r.length>1&&(s+=":nth-of-type("+(r.indexOf(l)+1)+")")}o.unshift(s),l=l.parentElement}return o.join(" > ")}function ie(t,o,l){p.push({selector:K(t),property:o,oldValue:l,newValue:o==="textContent"?t.textContent:o==="__fullStyle"?t.style.cssText:t.style[o]}),d=[]}function ue(t){p.push({selector:K(t),property:"__fullStyle",oldValue:t.style.cssText,newValue:""}),d=[]}function me(t){p.length>0&&(p[p.length-1].newValue=t.style.cssText)}function G(t){const o=t.getBoundingClientRect();v.style.display="block",v.style.left=o.left+"px",v.style.top=o.top+"px",v.style.width=o.width+"px",v.style.height=o.height+"px"}function Le(t){const o=t.parentElement;if(!o||o===document.body||o===document.documentElement||!["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(o.tagName))return;o.getBoundingClientRect(),t.getBoundingClientRect();const l=(parseFloat(t.style.left)||0)+t.offsetWidth,s=(parseFloat(t.style.top)||0)+t.offsetHeight;l>o.offsetWidth&&(o.style.minWidth=l+"px"),s>o.offsetHeight&&(o.style.minHeight=s+"px")}document.addEventListener("scroll",()=>{e&&!c&&G(e)},!0);function F(t){e&&(e.classList.remove("editor-highlight"),e.removeAttribute("contenteditable")),e=t,e.classList.add("editor-highlight"),G(t)}function ne(){e&&(e.classList.remove("editor-highlight","editor-dragging"),e.removeAttribute("contenteditable")),e=null,x.style.display="none",v.style.display="none",le()}function w(t,o,l,s){window.parent.postMessage({type:t==="info"?"ADMIN_INFO":"ADMIN_CHANGE",action:t,selector:o?K(o):"",property:l,value:s,description:t==="info"?s:`${t}: ${(o==null?void 0:o.tagName)||""}`},"*")}function ve(){const t=document.querySelectorAll("body *:not(#editor-toolbar):not(#resize-box):not(#alignment-guides):not(.guide-line):not(.guide-distance):not(.guide-marker):not(#text-cursor):not(script):not(style):not(link)");return Array.from(t).filter(o=>{if(o===e||o.contains(e)||e!=null&&e.contains(o)||o.offsetParent===null&&o.style.position!=="fixed")return!1;const l=o.getBoundingClientRect();return l.width>5&&l.height>5&&l.top<window.innerHeight+50&&l.bottom>-50&&l.left<window.innerWidth+50&&l.right>-50})}function le(){M.innerHTML=""}function fe(t){le();const o=ve(),l=t.left+t.width/2,s=t.top+t.height/2,i=window.innerWidth/2,r=window.innerHeight/2,u={h:new Set,v:new Set};Math.abs(l-i)<g&&D("v",i,"viewport"),Math.abs(s-r)<g&&D("h",r,"viewport"),Math.abs(t.left)<g&&D("v",0,"viewport"),Math.abs(t.right-window.innerWidth)<g&&D("v",window.innerWidth,"viewport"),Math.abs(t.top)<g&&D("h",0,"viewport"),o.forEach(m=>{const n=m.getBoundingClientRect(),h=n.left+n.width/2,E=n.top+n.height/2;Math.abs(s-E)<g&&!u.h.has(Math.round(E))&&(u.h.add(Math.round(E)),D("h",E,"center"),ce(l,E),ce(h,E)),Math.abs(t.top-n.top)<g&&!u.h.has(Math.round(n.top))&&(u.h.add(Math.round(n.top)),D("h",n.top,"edge")),Math.abs(t.bottom-n.bottom)<g&&!u.h.has(Math.round(n.bottom))&&(u.h.add(Math.round(n.bottom)),D("h",n.bottom,"edge")),Math.abs(t.top-n.bottom)<g&&!u.h.has(Math.round(n.bottom)+1e3)&&(u.h.add(Math.round(n.bottom)+1e3),D("h",n.bottom,"edge"),Z(l,n.bottom,0,"h")),Math.abs(t.bottom-n.top)<g&&!u.h.has(Math.round(n.top)+2e3)&&(u.h.add(Math.round(n.top)+2e3),D("h",n.top,"edge"),Z(l,n.top,0,"h")),Math.abs(l-h)<g&&!u.v.has(Math.round(h))&&(u.v.add(Math.round(h)),D("v",h,"center"),ce(h,s),ce(h,E)),Math.abs(t.left-n.left)<g&&!u.v.has(Math.round(n.left))&&(u.v.add(Math.round(n.left)),D("v",n.left,"edge")),Math.abs(t.right-n.right)<g&&!u.v.has(Math.round(n.right))&&(u.v.add(Math.round(n.right)),D("v",n.right,"edge")),Math.abs(t.left-n.right)<g&&!u.v.has(Math.round(n.right)+1e3)&&(u.v.add(Math.round(n.right)+1e3),D("v",n.right,"edge"),Z(n.right,s,0,"v")),Math.abs(t.right-n.left)<g&&!u.v.has(Math.round(n.left)+2e3)&&(u.v.add(Math.round(n.left)+2e3),D("v",n.left,"edge"),Z(n.left,s,0,"v"));const C=t.top-n.bottom,N=n.top-t.bottom,L=t.left-n.right,I=n.left-t.right;C>0&&C<60&&Z(l,n.bottom+C/2,Math.round(C),"h"),N>0&&N<60&&Z(l,t.bottom+N/2,Math.round(N),"h"),L>0&&L<60&&Z(n.right+L/2,s,Math.round(L),"v"),I>0&&I<60&&Z(t.right+I/2,s,Math.round(I),"v")})}function D(t,o,l){const s=document.createElement("div");s.className=`guide-line guide-line-${t} guide-line--${l||"edge"}`,t==="h"?s.style.top=o+"px":s.style.left=o+"px",M.appendChild(s)}function ce(t,o,l){const s=document.createElement("div");s.className="guide-marker guide-marker--center",s.style.left=t+"px",s.style.top=o+"px",M.appendChild(s)}function Z(t,o,l,s){if(l<=0)return;const i=document.createElement("div");i.className="guide-distance",i.textContent=l+"px",i.style.left=t+"px",i.style.top=o+"px",i.style.transform="translate(-50%, -50%)",M.appendChild(i)}function ge(t,o,l){const s=t.getBoundingClientRect(),i=s.width,r=s.height,u=ve();let m=o,n=l,h=!1;const E=o,C=l,N=o+i,L=l+r,I=o+i/2,P=l+r/2,R=window.innerWidth/2,B=window.innerHeight/2;return Math.abs(I-R)<g&&(m=R-i/2,h=!0),Math.abs(P-B)<g&&(n=B-r/2,h=!0),Math.abs(E)<g&&(m=0,h=!0),Math.abs(N-window.innerWidth)<g&&(m=window.innerWidth-i,h=!0),Math.abs(C)<g&&(n=0,h=!0),u.forEach(V=>{const S=V.getBoundingClientRect(),ae=S.left+S.width/2,A=S.top+S.height/2;Math.abs(P-A)<g&&(n=A-r/2,h=!0),Math.abs(C-S.top)<g&&(n=S.top,h=!0),Math.abs(L-S.bottom)<g&&(n=S.bottom-r,h=!0),Math.abs(C-S.bottom)<g&&(n=S.bottom,h=!0),Math.abs(L-S.top)<g&&(n=S.top-r,h=!0),Math.abs(I-ae)<g&&(m=ae-i/2,h=!0),Math.abs(E-S.left)<g&&(m=S.left,h=!0),Math.abs(N-S.right)<g&&(m=S.right-i,h=!0),Math.abs(E-S.right)<g&&(m=S.right,h=!0),Math.abs(N-S.left)<g&&(m=S.left-i,h=!0)}),{left:m,top:n,snapped:h}}let O=null;document.addEventListener("mouseover",t=>{!a||c||f||t.target===x||x.contains(t.target)||t.target===v||v.contains(t.target)||t.target!==e&&(O&&O!==e&&O.classList.remove("editor-hover"),O=t.target,O.classList.add("editor-hover"))}),document.addEventListener("mouseout",t=>{!a||c||t.target!==e&&O&&(O.classList.remove("editor-hover"),O=null)}),document.addEventListener("mousemove",t=>{if(!a){te.style.display="none",se.style.display="none";return}f&&y&&(y.style.display="block",y.style.left=t.clientX+12+"px",y.style.top=t.clientY+12+"px"),c||(te.style.display="block",se.style.display="block",te.style.top=t.clientY+"px",se.style.left=t.clientX+"px")}),document.addEventListener("mousedown",t=>{if(!a||t.target===x||x.contains(t.target)||t.target===v||v.contains(t.target)||f)return;t.preventDefault(),t.stopPropagation();const o=t.target;F(o),O&&(O.classList.remove("editor-hover"),O=null),te.style.display="none",se.style.display="none";const l=t.clientX,s=t.clientY,i=o.getBoundingClientRect().width;let r=!1;const u=n=>{const h=n.clientX-l,E=n.clientY-s;if(!r)if(Math.abs(h)>8||Math.abs(E)>8)r=!0,c=!0,o.classList.add("editor-dragging"),v.style.display="none",ue(o);else return;o.style.transform=`translate(${h}px, ${E}px)`,o.style.zIndex="99999",Se(o,h,E,o.getBoundingClientRect())},m=n=>{if(document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",m),!r)return;c=!1,o.classList.remove("editor-dragging");const h=n.clientX-l,E=n.clientY-s;if(o.style.transform="",o.style.position==="absolute"||o.style.position==="fixed"){const C=parseFloat(o.style.left)||0,N=parseFloat(o.style.top)||0;o.style.left=C+h+"px",o.style.top=N+E+"px"}else{const C=o.parentElement;if(C&&C!==document.body){(!C.style.position||C.style.position==="static")&&(C.style.position="relative");const N=document.createElement("div");N.style.cssText=`width:${i}px;height:${o.getBoundingClientRect().height}px;visibility:hidden;pointer-events:none;`,C.insertBefore(N,o);const L=o.getBoundingClientRect(),I=C.getBoundingClientRect(),P=L.left-I.left,R=L.top-I.top;o.style.position="absolute",o.style.left=P+h+"px",o.style.top=R+E+"px",o.style.width=i+"px",o.style.margin="0",o.style.zIndex="99999"}}le(),Ce(),me(o),G(o),w("changeStyle",o,"left",o.style.left),w("changeStyle",o,"top",o.style.top)};document.addEventListener("mousemove",u),document.addEventListener("mouseup",m)},!0),document.addEventListener("click",t=>{if(a&&((t.target.closest("a")||t.target.closest("button")||t.target.tagName==="A"||t.target.tagName==="BUTTON")&&(t.preventDefault(),t.stopPropagation()),!!f&&!(t.target===x||x.contains(t.target)||t.target===v||v.contains(t.target))&&(t.preventDefault(),t.stopPropagation(),f))){k++;const o=window.scrollX,l=window.scrollY,s=document.createElement("div");s.textContent=_.text||"Nuevo texto",s.style.cssText=`position:absolute;left:${t.clientX+o}px;top:${t.clientY+l}px;z-index:${k};font-family:${_.fontFamily||"Bolivar, sans-serif"};font-size:${_.fontSize||"16px"};font-weight:${_.fontWeight||"400"};color:${_.color||"#333"};padding:4px 8px;cursor:move;background:${_.backgroundColor||"transparent"};border-radius:4px;`,document.body.appendChild(s),f=!1,document.body.style.cursor="",y&&(y.style.display="none"),F(s),s.setAttribute("contenteditable","true"),s.focus(),s.addEventListener("blur",()=>{s.removeAttribute("contenteditable")},{once:!0}),w("info",null,"","📝 Texto insertado.")}},!0),document.addEventListener("dblclick",t=>{if(a||(a=!0,window.parent.postMessage({type:"ADMIN_INFO",message:"🎯 Modo edición activado automáticamente."},"*"),window.parent.postMessage({type:"EDIT_MODE_CHANGED",active:!0},"*")),t.target===x||x.contains(t.target)||t.target===v||v.contains(t.target))return;t.preventDefault(),t.stopPropagation();const o=t.target;F(o);const l=window.getComputedStyle(o),s=o.tagName==="IMG"||o.tagName==="SVG",i=["INPUT","SELECT","TEXTAREA"].includes(o.tagName),r=o.tagName==="BUTTON"||o.tagName==="A"||(o.className||"").includes("btn");window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:o.tagName.toLowerCase(),selector:K(o),textContent:(o.textContent||"").substring(0,200),className:o.className||"",id:o.id||"",src:o.src||"",isImage:s,isFormField:i,isText:!s&&!i&&!r,placeholder:o.placeholder||"",label:"",options:o.tagName==="SELECT"?Array.from(o.options).map(u=>u.textContent):[],styles:{color:l.color,backgroundColor:l.backgroundColor,fontSize:l.fontSize,fontWeight:l.fontWeight,fontFamily:l.fontFamily,width:o.style.width||l.width,height:o.style.height||l.height}},"*")},!0),x.addEventListener("click",t=>{const o=t.target.closest("button");if(!o||!e)return;const l=o.dataset.action;if(l==="edit"){const s=e.textContent;e.setAttribute("contenteditable","true"),e.focus(),e.addEventListener("blur",()=>{e.removeAttribute("contenteditable"),e.textContent!==s&&(ie(e,"textContent",s),w("changeText",e,"textContent",e.textContent))},{once:!0})}if(l==="move"){e.classList.add("editor-dragging"),c=!0;const s=e.getBoundingClientRect(),i=e.parentElement,r=s.width/2,u=s.height/2;let m=null;ue(e),e.style.position;const n=e.style.left,h=e.style.top,E=e.style.width,C=e.style.margin,N=e.style.zIndex;e.style.position="fixed",e.style.zIndex="999999",e.style.width=s.width+"px",e.style.left=s.left+"px",e.style.top=s.top+"px",e.style.margin="0";const L=P=>{const R=P.clientX-r,B=P.clientY-u;e.style.left=R+"px",e.style.top=B+"px";const V=e.getBoundingClientRect(),S=ge(e,V.left,V.top);S.snapped&&(e.style.left=R+S.left-V.left+"px",e.style.top=B+S.top-V.top+"px"),fe(e.getBoundingClientRect()),e.style.visibility="hidden";const ae=document.elementFromPoint(P.clientX,P.clientY);e.style.visibility="";let A=ae;for(;A&&A!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(A.tagName)&&A.offsetWidth>80&&A.offsetHeight>30&&A!==e);)A=A.parentElement;m&&m!==A&&m.classList.remove("frame-drop-highlight"),A&&A!==document.body&&A!==e&&A!==i?(A.classList.add("frame-drop-highlight"),m=A):m=null,G(e)},I=P=>{c=!1,e.classList.remove("editor-dragging"),le(),document.removeEventListener("mousemove",L),document.removeEventListener("mouseup",I),m&&m.classList.remove("frame-drop-highlight"),e.style.visibility="hidden";const R=document.elementFromPoint(P.clientX,P.clientY);e.style.visibility="";let B=R;for(;B&&B!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(B.tagName)&&B.offsetWidth>80&&B.offsetHeight>30&&B!==e);)B=B.parentElement;const V=e.getBoundingClientRect();if(B&&B!==document.body&&B!==i){const S=B.getBoundingClientRect();B.style.position=B.style.position||"relative",e.style.position="absolute",e.style.left=V.left-S.left+"px",e.style.top=V.top-S.top+"px",e.style.width=E,e.style.margin="0",e.style.zIndex="99999",B.appendChild(e)}else{const S=V.left-s.left,ae=V.top-s.top;e.style.position="relative",e.style.width=E,e.style.margin=C,e.style.zIndex=N||"",e.style.left=(parseFloat(n)||0)+S+"px",e.style.top=(parseFloat(h)||0)+ae+"px"}G(e),me(e),w("changeStyle",e,"left",e.style.left),w("changeStyle",e,"top",e.style.top),w("info",null,"","↕️ Elemento reubicado.")};document.addEventListener("mousemove",L),document.addEventListener("mouseup",I)}if(l==="copy"&&(localStorage.setItem("sb_clipboard",e.outerHTML),w("info",null,"","📋 Elemento copiado. Usa Ctrl+V para pegar.")),l==="duplicate"){const s=e.cloneNode(!0);s.classList.remove("editor-highlight"),s.style.position="relative",s.style.top="10px",e.parentNode.insertBefore(s,e.nextSibling),ie(e,"duplicate",""),w("info",null,"","⧉ Elemento duplicado.")}if(l==="delete"){const s=e.style.display;ie(e,"display",s),e.style.display="none",w("changeStyle",e,"display","none"),ne()}l==="settings"&&window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:e.tagName.toLowerCase(),selector:K(e),textContent:e.textContent,className:e.className,id:e.id},"*")});let de=!1,Y="",H={};v.addEventListener("mousedown",t=>{const o=t.target.closest(".resize-handle");!o||!e||(t.preventDefault(),t.stopPropagation(),de=!0,Y=o.dataset.dir,e.getBoundingClientRect(),H={x:t.clientX,y:t.clientY,w:e.offsetWidth,h:e.offsetHeight,left:parseFloat(e.style.left)||0,top:parseFloat(e.style.top)||0})}),document.addEventListener("mousemove",t=>{if(!de||!e)return;const o=t.clientX-H.x,l=t.clientY-H.y;if(Y.includes("e")&&!Y.includes("w")&&(e.style.width=Math.max(20,H.w+o)+"px"),Y.includes("w")&&!Y.includes("e")){const s=Math.max(20,H.w-o);e.style.width=s+"px",e.style.position=e.style.position||"relative",e.style.left=H.left+(H.w-s)+"px"}if(Y.includes("s")&&!Y.includes("n")&&(e.style.height=Math.max(20,H.h+l)+"px"),Y.includes("n")&&!Y.includes("s")){const s=Math.max(20,H.h-l);e.style.height=s+"px",e.style.position=e.style.position||"relative",e.style.top=H.top+(H.h-s)+"px"}G(e)}),document.addEventListener("mouseup",()=>{de&&e&&(de=!1,w("changeStyle",e,"width",e.style.width),e.style.height&&w("changeStyle",e,"height",e.style.height),e.style.left&&w("changeStyle",e,"left",e.style.left),e.style.top&&w("changeStyle",e,"top",e.style.top),Le(e))}),document.addEventListener("keydown",t=>{if(a){if(t.key==="Escape"&&ne(),t.key==="Delete"&&e&&!e.hasAttribute("contenteditable")&&(e.style.display="none",w("changeStyle",e,"display","none"),ne()),e&&!e.hasAttribute("contenteditable")&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.key)){t.preventDefault(),e.style.position="relative";const o=t.shiftKey?10:1;t.key==="ArrowUp"&&(e.style.top=(parseFloat(e.style.top)||0)-o+"px"),t.key==="ArrowDown"&&(e.style.top=(parseFloat(e.style.top)||0)+o+"px"),t.key==="ArrowLeft"&&(e.style.left=(parseFloat(e.style.left)||0)-o+"px"),t.key==="ArrowRight"&&(e.style.left=(parseFloat(e.style.left)||0)+o+"px");const l=e.getBoundingClientRect(),s=ge(e,l.left,l.top);if(s.snapped){const i=s.left-l.left,r=s.top-l.top;Math.abs(i)<g*2&&(e.style.left=(parseFloat(e.style.left)||0)+i+"px"),Math.abs(r)<g*2&&(e.style.top=(parseFloat(e.style.top)||0)+r+"px")}G(e),fe(e.getBoundingClientRect()),clearTimeout(window._guideTimer),window._guideTimer=setTimeout(le,800)}if(t.ctrlKey&&t.key==="z"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(t.preventDefault(),he()),t.ctrlKey&&t.key==="y"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(t.preventDefault(),_e()),t.ctrlKey&&t.key==="d"&&e){t.preventDefault();const o=e.cloneNode(!0);o.classList.remove("editor-highlight"),o.style.position="relative",o.style.top="10px",e.parentNode.insertBefore(o,e.nextSibling),w("info",null,"","⧉ Duplicado (Ctrl+D).")}}});function he(){if(p.length===0)return;const t=p.pop(),o=document.querySelector(t.selector);if(!o){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo deshacer (elemento no encontrado)."},"*");return}const l=t.property==="textContent"?o.textContent:o.style[t.property];d.push({...t,newValue:l}),t.property==="textContent"?o.textContent=t.oldValue:t.property==="__fullStyle"?o.style.cssText=t.oldValue:o.style[t.property]=t.oldValue,e&&G(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↩️ Deshecho."},"*")}function _e(){if(d.length===0)return;const t=d.pop(),o=document.querySelector(t.selector);if(!o){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo rehacer (elemento no encontrado)."},"*");return}p.push({...t}),t.property==="textContent"?o.textContent=t.newValue:t.property==="__fullStyle"?o.style.cssText=t.newValue:o.style[t.property]=t.newValue,e&&G(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↪️ Rehecho."},"*")}window.addEventListener("message",t=>{if(!t.data)return;if(t.data.type==="ENABLE_EDIT_MODE"&&(a=!0,W.classList.add("visible")),t.data.type==="DISABLE_EDIT_MODE"&&(a=!1,ne(),W.classList.remove("visible")),t.data.type==="UNDO_ACTION"&&he(),t.data.type==="REDO_ACTION"&&_e(),t.data.type==="DELETE_SELECTED"&&e&&(ie(e,"visibility",e.style.visibility),e.style.visibility="hidden",e.style.pointerEvents="none",w("changeStyle",e,"visibility","hidden"),ne()),t.data.type==="DUPLICATE_SELECTED"&&e){const s=e.cloneNode(!0);s.classList.remove("editor-highlight"),s.style.position="relative",s.style.top=(parseFloat(e.style.top)||0)+10+"px",s.style.left=(parseFloat(e.style.left)||0)+10+"px",e.parentNode.insertBefore(s,e.nextSibling),F(s),w("info",null,"","⧉ Elemento duplicado.")}if(t.data.type==="APPLY_EFFECT"&&e){const{effect:s,value:i}=t.data,r=e.style[s];e.style[s]=i,ie(e,s,r),w("changeStyle",e,s,i)}if(t.data.type==="LAYER_CHANGE"&&e){const s=t.data.direction,i=parseInt(e.style.zIndex)||0;s==="front"?e.style.zIndex="99999":s==="back"?e.style.zIndex="1":s==="up"?e.style.zIndex=String(i+1):s==="down"&&(e.style.zIndex=String(Math.max(0,i-1))),w("changeStyle",e,"zIndex",e.style.zIndex)}if(t.data.type==="EYEDROPPER_MODE"){document.body.style.cursor="crosshair";const s=i=>{i.preventDefault(),i.stopPropagation();const u=window.getComputedStyle(i.target).color;window.parent.postMessage({type:"EYEDROPPER_RESULT",color:u},"*"),document.body.style.cursor="",document.removeEventListener("click",s,!0)};document.addEventListener("click",s,!0)}if(t.data.type==="DROP_ELEMENT_AT"){a=!0;const{html:s,x:i,y:r}=t.data,u=document.createElement("div");u.innerHTML=s;const m=u.firstElementChild;if(!m)return;m.style.position="absolute",m.style.left=i+"px",m.style.top=r+"px",m.style.zIndex="99999",m.style.cursor="move",m.classList.add("admin-inserted");let n=document.elementFromPoint(i,r);for(;n&&n!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(n.tagName)&&n.offsetWidth>80&&n.offsetHeight>30);)n=n.parentElement;if(n&&n!==document.body){const h=n.getBoundingClientRect();n.style.position=n.style.position||"relative",m.style.left=i-h.left+"px",m.style.top=r-h.top+"px",n.appendChild(m)}else document.body.appendChild(m);F(m),p.push({selector:K(m),property:"display",oldValue:"none",newValue:""}),d=[],w("info",null,"","✅ Elemento insertado en el frame.")}if(t.data.type==="PASTE_CLIPBOARD"){const s=localStorage.getItem("sb_clipboard");if(!s)return;const i=document.createElement("div");i.innerHTML=s;const r=i.firstElementChild;if(!r)return;r.classList.remove("editor-highlight"),r.style.position="relative",r.style.top="10px",r.style.left="10px",r.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(r,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(r),F(r),p.push({selector:K(r),property:"display",oldValue:"none",newValue:""}),d=[],w("info",null,"","📌 Elemento pegado.")}t.data.type==="ENTER_TEXT_MODE"&&(a=!0,f=!0,_={text:t.data.text||"Nuevo texto",fontFamily:t.data.fontFamily||"Bolivar, sans-serif",fontSize:t.data.fontSize||"16px",fontWeight:t.data.fontWeight||"400",color:t.data.color||"#333333",backgroundColor:t.data.backgroundColor||"transparent"},document.body.style.cursor="text",y||(y=document.createElement("div"),y.style.cssText="position:fixed;pointer-events:none;z-index:99999;background:rgba(10,103,65,0.1);border:1px dashed #0a6741;border-radius:4px;padding:4px 10px;display:none;",document.body.appendChild(y)),y.textContent=_.text,y.style.fontFamily=_.fontFamily,y.style.fontSize=_.fontSize,y.style.fontWeight=_.fontWeight,y.style.color="#0a6741",window.parent.postMessage({type:"ADMIN_INFO",message:"📝 Haz clic donde quieras colocar el texto."},"*"));function o(){const s=document.getElementById("app-content")||document.querySelector("main")||document.querySelector(".main-content")||document.body,i=window.innerHeight/2,r=window.innerWidth/2,u=document.elementFromPoint(r,i);if(u&&u!==document.body&&u!==document.documentElement){let m=u;for(;m&&m!==s&&m!==document.body;){const n=m.parentElement;if(n&&["DIV","SECTION","MAIN","ARTICLE","FORM","HEADER"].includes(n.tagName)&&n.children.length>1)return{parent:n,refNode:m.nextSibling};m=n}}return{parent:s,refNode:s.firstChild}}function l(s,i){(!i.style.position||i.style.position==="static")&&(i.style.position="relative");const r=i.getBoundingClientRect(),u=Math.max(0,r.width/2-(s.offsetWidth||100)/2),m=Math.max(0,window.innerHeight/2-r.top);s.style.position="absolute",s.style.left=u+"px",s.style.top=m+"px",s.style.margin="0",i.appendChild(s)}if(t.data.type==="INSERT_TEXT"){const{text:s,fontSize:i,fontWeight:r,color:u,backgroundColor:m}=t.data,n=document.createElement("div");n.textContent=s||"Nuevo texto",n.style.cssText=`position:relative;margin:12px;width:fit-content;font-family:'Roboto Condensed',sans-serif;font-size:${i||"16px"};font-weight:${r||"400"};color:${u||"#1B1B1B"};background:${m||"transparent"};padding:8px 12px;cursor:move;z-index:99999;line-height:140%;`,n.classList.add("admin-inserted");const h=o();l(n,h.parent),F(n),w("info",null,"","📝 Texto insertado.")}if(t.data.type==="INSERT_SHAPE"){const s=document.createElement("div");s.classList.add("admin-inserted");const i=t.data.shape;i==="rect"?s.style.cssText="position:relative;margin:12px;width:200px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:8px;cursor:move;z-index:99999;box-shadow:0 1px 3px rgba(0,0,0,.15);":i==="circle"?s.style.cssText="position:relative;margin:12px;width:120px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:50%;cursor:move;z-index:99999;":s.style.cssText="position:relative;margin:12px;width:80%;max-width:600px;height:2px;background:#CCC;cursor:move;z-index:99999;";const r=o();l(s,r.parent),F(s),w("info",null,"","🔷 Figura insertada.")}if(t.data.type==="INSERT_IMAGE"){const s=document.createElement("img");s.src=t.data.src,s.alt=t.data.name||"",s.classList.add("admin-inserted"),s.style.cssText="position:relative;display:block;margin:12px;max-width:200px;height:auto;cursor:move;z-index:99999;";const i=o();l(s,i.parent),F(s),w("info",null,"","🖼 Imagen insertada.")}if(t.data.type==="INSERT_MODAL"){const s=document.createElement("div");s.classList.add("admin-inserted"),s.style.cssText="position:relative;margin:24px;width:500px;max-width:90%;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.2);padding:32px;cursor:move;z-index:99999;",s.innerHTML='<h3 style="font-family:Roboto Condensed,sans-serif;font-size:20px;color:#016D38;margin-bottom:16px;">Modal Stepper</h3><p style="font-size:14px;color:#666;">Contenido del modal.</p>';const i=o();l(s,i.parent),F(s),w("info",null,"","📋 Modal insertado.")}if(t.data.type==="INSERT_FORM_FIELD"){const{title:s,fieldType:i,placeholder:r,options:u,targetSelector:m}=t.data,n=i||"text",h=document.createElement("div");h.classList.add("admin-inserted"),h.style.cssText="position:relative;margin:12px;cursor:move;z-index:99999;width:311px;max-width:90%;";let E='<div style="display:flex;flex-direction:column;gap:8px;">';E+=`<label style="font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#1B1B1B;">${s||"Campo"}</label>`,n==="select"?E+=`<div style="position:relative;"><select style="width:100%;height:40px;padding:8px 40px 8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;appearance:none;">${(u||["Opción 1"]).map(L=>`<option>${L}</option>`).join("")}</select></div>`:n==="date"?E+=`<input type="date" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;">`:n==="toggle"?E+=`<div style="display:flex;align-items:center;gap:12px;"><div style="width:48px;height:26px;background:#016D38;border-radius:13px;position:relative;"><div style="width:20px;height:20px;background:#fff;border-radius:50%;position:absolute;top:3px;right:3px;box-shadow:0 1px 3px rgba(0,0,0,.2);"></div></div><span style="font-family:'Roboto Condensed',sans-serif;font-size:14px;">Sí</span></div>`:n==="radio"?(E+='<div style="display:flex;flex-direction:column;gap:12px;">',(u||["Opción 1","Opción 2"]).forEach((L,I)=>{E+=`<label style="display:flex;align-items:center;gap:8px;font-family:'Roboto Condensed',sans-serif;font-size:16px;color:#1B1B1B;cursor:pointer;"><div style="width:20px;height:20px;border-radius:50%;border:2px solid #016D38;${I===0?"background:#016D38;":""}"></div>${L}</label>`}),E+="</div>"):E+=`<input type="text" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;" placeholder="${r||"Ingrese aquí"}">`,E+="</div>",h.innerHTML=E;let C=null;if(m)try{C=document.querySelector(m)}catch{}const N=C||o().parent;l(h,N),F(h),w("info",null,"","📋 Campo insertado.")}if(t.data.type==="ADMIN_OVERRIDE"){const{selector:s,property:i,value:r}=t.data;try{if(i==="__appendHTML"){const u=document.createElement("div");u.innerHTML=r;const m=u.firstElementChild;if(m){m.classList.add("admin-inserted");const n=o();n.parent.insertBefore(m,n.refNode)}}else if(i==="__placeholder"){const u=document.querySelector(s);if(u){const m=u.querySelector("input,textarea")||u;m.setAttribute&&m.setAttribute("placeholder",r)}}else if(i==="__label"){const u=document.querySelector(s);if(u){const m=u.querySelector("label");m&&(m.textContent=r)}}else if(i==="__multiStyle"){const u=document.querySelector(s);if(u)try{const m=JSON.parse(r);Object.entries(m).forEach(([n,h])=>{u.style[n]=h})}catch{}}else{const u=document.querySelector(s);u&&(i==="textContent"?u.textContent=r:i==="src"?u.src=r:u.style[i]=r)}}catch{}}if(t.data.type==="UPDATE_PLACEHOLDER")try{const s=document.querySelector(t.data.selector);if(s){const i=s.querySelector("input,textarea")||s;i.setAttribute&&i.setAttribute("placeholder",t.data.value)}}catch{}if(t.data.type==="UPDATE_LABEL")try{const s=document.querySelector(t.data.selector);if(s){const i=s.querySelector("label");i&&(i.textContent=t.data.value)}}catch{}if(t.data.type==="UPDATE_SELECT_OPTIONS")try{const s=document.querySelector(t.data.selector);if(s){const i=s.querySelector("select")||s;i.tagName==="SELECT"&&(i.innerHTML=t.data.options.map(r=>`<option>${r}</option>`).join(""))}}catch{}}),document.addEventListener("keydown",t=>{if(t.ctrlKey&&t.key==="v"&&a){t.preventDefault();const o=localStorage.getItem("sb_clipboard");if(!o)return;const l=document.createElement("div");l.innerHTML=o;const s=l.firstElementChild;if(!s)return;s.classList.remove("editor-highlight"),s.style.position="relative",s.style.top="10px",s.style.left="10px",s.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(s,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(s),F(s),p.push({selector:K(s),property:"display",oldValue:"none",newValue:""}),d=[],w("info",null,"","📌 Pegado (Ctrl+V).")}t.ctrlKey&&t.key==="c"&&a&&e&&(t.preventDefault(),localStorage.setItem("sb_clipboard",e.outerHTML),w("info",null,"","📋 Copiado (Ctrl+C)."))})}function ke(a){a.innerHTML=`
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
  `,Te()}function Te(){let a=1;const e=document.getElementById("vc-phase-1"),c=document.getElementById("vc-phase-2"),p=document.getElementById("vc-next-btn"),d=document.getElementById("vc-back-btn"),f=document.getElementById("vc-phase-text"),_=document.getElementById("vc-progress"),y=document.getElementById("vc-dot-1"),k=document.getElementById("vc-dot-2");function g(x){a=x,x===1?(e.style.display="",c.style.display="none",d.style.display="none",p.textContent="Siguiente",f.textContent="Paso 1 de 2",_.style.width="50%",y.classList.add("vc-phase-dot--active"),k.classList.remove("vc-phase-dot--active")):(e.style.display="none",c.style.display="",d.style.display="",p.textContent="Continuar",f.textContent="Paso 2 de 2",_.style.width="100%",y.classList.remove("vc-phase-dot--active"),k.classList.add("vc-phase-dot--active"))}d.addEventListener("click",()=>g(1)),p.addEventListener("click",()=>{if(a===1){const x=document.getElementById("vc-doc-number").value.trim(),v=document.getElementById("vc-name").value.trim();if(!x||!v){ye(["vc-doc-number","vc-name"]);return}g(2)}else{const x=document.getElementById("vc-phone").value.trim(),v=document.getElementById("vc-email").value.trim(),b=document.getElementById("vc-birthdate").value,T=document.getElementById("vc-habeas").checked,$=document.getElementById("vc-sms").checked;if(!x||!v||!b||!T||!$){ye(["vc-phone","vc-email","vc-birthdate"]);return}const M=new Date(b),q=new Date;let U=q.getFullYear()-M.getFullYear();const W=q.getMonth()-M.getMonth();if((W<0||W===0&&q.getDate()<M.getDate())&&U--,U<18||U>65){alert("La edad debe estar entre 18 y 65 años para este producto.");return}localStorage.setItem("vc_docType",document.getElementById("vc-doc-type").value),localStorage.setItem("vc_docNumber",document.getElementById("vc-doc-number").value.trim()),localStorage.setItem("vc_name",document.getElementById("vc-name").value.trim()),localStorage.setItem("vc_phone",x),localStorage.setItem("vc_email",v),localStorage.setItem("vc_birthdate",b),localStorage.setItem("vc_age",String(U));const j=new URL(window.location);j.searchParams.set("page","credit-data"),window.location.href=j.toString()}})}function ye(a){a.forEach(e=>{const c=document.getElementById(e);if(c&&!c.value.trim()){const p=c.closest(".prot-field__input");p&&(p.style.borderColor="#E53935",setTimeout(()=>p.style.borderColor="",2e3))}})}const be={18:{life:.45,itp:.15},19:{life:.45,itp:.15},20:{life:.46,itp:.16},21:{life:.47,itp:.16},22:{life:.48,itp:.17},23:{life:.49,itp:.17},24:{life:.5,itp:.18},25:{life:.52,itp:.18},26:{life:.54,itp:.19},27:{life:.56,itp:.2},28:{life:.58,itp:.21},29:{life:.61,itp:.22},30:{life:.64,itp:.23},31:{life:.67,itp:.24},32:{life:.71,itp:.26},33:{life:.75,itp:.27},34:{life:.8,itp:.29},35:{life:.85,itp:.31},36:{life:.91,itp:.33},37:{life:.97,itp:.35},38:{life:1.04,itp:.38},39:{life:1.12,itp:.41},40:{life:1.2,itp:.44},41:{life:1.3,itp:.47},42:{life:1.4,itp:.51},43:{life:1.52,itp:.55},44:{life:1.65,itp:.6},45:{life:1.79,itp:.65},46:{life:1.95,itp:.71},47:{life:2.12,itp:.77},48:{life:2.31,itp:.84},49:{life:2.52,itp:.92},50:{life:2.75,itp:1},51:{life:3,itp:1.09},52:{life:3.28,itp:1.19},53:{life:3.58,itp:1.3},54:{life:3.91,itp:1.42},55:{life:4.27,itp:1.55},56:{life:4.66,itp:0},57:{life:5.09,itp:0},58:{life:5.56,itp:0},59:{life:6.07,itp:0},60:{life:6.63,itp:0},61:{life:7.24,itp:0},62:{life:7.9,itp:0},63:{life:8.63,itp:0},64:{life:9.42,itp:0},65:{life:10.29,itp:0}},Me=["Bancolombia","Banco de Bogotá","Davivienda","BBVA Colombia","Banco de Occidente","Banco Popular","Banco AV Villas","Scotiabank Colpatria","Banco Caja Social","Banco Falabella","Banco Itaú","Banco Pichincha","Banco W","Bancamía","Banco Agrario","Banco GNB Sudameris"];function Ne(a){const e=parseInt(localStorage.getItem("vc_age")||"35");a.innerHTML=`
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
                      ${Me.map(c=>`<div class="vc-autocomplete__item" data-bank="${c}">${c}</div>`).join("")}
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
  `,Ae(e)}function Ae(a){const e=document.getElementById("vc-bank"),c=document.getElementById("vc-bank-list"),p=document.getElementById("vc-debt"),d=document.getElementById("vc-insured-slider"),f=document.getElementById("vc-insured-display"),_=document.getElementById("vc-slider-min"),y=document.getElementById("vc-slider-max"),k=document.getElementById("vc-prima-display"),g=document.getElementById("vc-prima-annual");e.addEventListener("focus",()=>c.classList.add("vc-autocomplete__list--visible")),e.addEventListener("input",()=>{const v=e.value.toLowerCase();document.querySelectorAll(".vc-autocomplete__item").forEach(b=>{b.style.display=b.dataset.bank.toLowerCase().includes(v)?"":"none"}),c.classList.add("vc-autocomplete__list--visible")}),document.querySelectorAll(".vc-autocomplete__item").forEach(v=>{v.addEventListener("click",()=>{e.value=v.dataset.bank,c.classList.remove("vc-autocomplete__list--visible")})}),document.addEventListener("click",v=>{v.target.closest(".vc-autocomplete")||c.classList.remove("vc-autocomplete__list--visible")}),p.addEventListener("blur",()=>{const v=p.value.replace(/[^0-9]/g,"");if(v){const b=parseInt(v);p.value=oe(b),d.min=b,d.max=b*2,d.value=b,_.textContent=`Mín: ${oe(b)}`,y.textContent=`Máx: ${oe(b*2)}`,f.textContent=oe(b),x(b)}}),d.addEventListener("input",()=>{const v=parseInt(d.value);f.textContent=oe(v),x(v)});function x(v){const b=be[a]||be[35],T=b.life,$=b.itp,M=Math.round((T+$)*v/1e3),q=Math.round(M/12);k.textContent=oe(q),g.textContent=`Anual: ${oe(M)}`,localStorage.setItem("vc_insuredValue",String(v)),localStorage.setItem("vc_annualPrima",String(M)),localStorage.setItem("vc_monthlyPrima",String(q)),localStorage.setItem("vc_itpActive","1"),localStorage.setItem("vc_lifeRate",String(T)),localStorage.setItem("vc_itpRate",String($)),localStorage.setItem("vc_skipHealth",v<=15e7?"1":"0")}x(parseInt(d.value)),document.getElementById("cd-back").addEventListener("click",()=>{window.location.href=window.location.pathname}),document.getElementById("cd-continue").addEventListener("click",()=>{const v=e.value.trim(),b=p.value.replace(/[^0-9]/g,"");if(!v){e.style.borderColor="#E53935",setTimeout(()=>e.style.borderColor="",2e3);return}if(!b){p.closest(".prot-field__input").style.borderColor="#E53935",setTimeout(()=>p.closest(".prot-field__input").style.borderColor="",2e3);return}localStorage.setItem("vc_bank",v),localStorage.setItem("vc_debt",b);const T=new URL(window.location);T.searchParams.set("page","quotation"),window.location.href=T.toString()})}function oe(a){return"$"+a.toLocaleString("es-CO")}function De(a){const e=parseInt(localStorage.getItem("vc_monthlyPrima")||"37500"),c=parseInt(localStorage.getItem("vc_annualPrima")||"450000"),p=parseInt(localStorage.getItem("vc_insuredValue")||"50000000"),d=localStorage.getItem("vc_bank")||"Tu banco",_=(localStorage.getItem("vc_phone")||"3103025462").slice(-4),y=k=>"$"+k.toLocaleString("es-CO");a.innerHTML=`
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
              <p style="font-family:var(--prot-font);font-size:14px;color:#5B5B5B;text-align:center">Protección de crédito con ${d}</p>

              <!-- Price -->
              <div class="vc-quote-card__price">
                <span class="vc-quote-card__amount" id="qt-price-display">${y(e)}</span>
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
                Pago anual: ${y(c)} (ahorra 2 meses)
              </div>

              <!-- Coverages -->
              <div class="vc-quote-card__coverages">
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Muerte por cualquier causa</span>
                  <span class="vc-quote-coverage__value">${y(p)}</span>
                </div>
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Incapacidad total y permanente</span>
                  <span class="vc-quote-coverage__value">${y(p)}</span>
                </div>
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Beneficiario: ${d}</span>
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
              <span class="otp-modal__phone-number">*** *** ${_}</span>
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
  `,Pe(e,c)}function Pe(a,e){const c=b=>"$"+b.toLocaleString("es-CO");let p=!0;const d=document.getElementById("qt-price-display"),f=document.getElementById("qt-period-label"),_=document.getElementById("qt-alt-price"),y=document.getElementById("qt-period-toggle"),k=document.getElementById("qt-lbl-monthly"),g=document.getElementById("qt-lbl-annual");y.addEventListener("click",()=>{p=!p,y.classList.toggle("vc-toggle--active",p),p?(d.textContent=c(a),f.textContent="/mes",_.textContent=`Pago anual: ${c(e)} (ahorra 2 meses)`,k.style.color="#009056",k.style.fontWeight="700",g.style.color="#757575",g.style.fontWeight="400"):(d.textContent=c(e),f.textContent="/año",_.textContent=`Pago mensual: ${c(a)}`,g.style.color="#009056",g.style.fontWeight="700",k.style.color="#757575",k.style.fontWeight="400"),localStorage.setItem("vc_periodicity",p?"monthly":"annual")}),document.getElementById("qt-back").addEventListener("click",()=>{const b=new URL(window.location);b.searchParams.set("page","credit-data"),window.location.href=b.toString()}),document.getElementById("qt-save").addEventListener("click",()=>{alert("Tu cotización ha sido guardada. Podrás retomarla cuando quieras.")}),document.getElementById("qt-pdf").addEventListener("click",()=>{alert("Descargando PDF de tu cotización...")}),document.getElementById("qt-continue").addEventListener("click",()=>{localStorage.setItem("vc_periodicity",p?"monthly":"annual"),document.getElementById("otp-overlay").classList.add("otp-overlay--visible")});const x=document.getElementById("otp-input"),v=document.getElementById("otp-validate");x.addEventListener("input",()=>{const b=x.value.replace(/\D/g,"");x.value=b,b.length===6?(v.disabled=!1,v.classList.add("otp-modal__btn-validate--active")):(v.disabled=!0,v.classList.remove("otp-modal__btn-validate--active"))}),v.addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible"),document.getElementById("success-overlay").classList.add("otp-overlay--visible"),setTimeout(()=>{const b=new URL(window.location);b.searchParams.set("page","complementary"),window.location.href=b.toString()},2500)}),document.getElementById("otp-close").addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible")}),document.getElementById("otp-cancel").addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible")})}function ze(a){localStorage.getItem("vc_name"),localStorage.getItem("vc_email");const e=localStorage.getItem("vc_bank")||"Bancolombia",c=parseInt(localStorage.getItem("vc_debt")||"50000000"),p=parseInt(localStorage.getItem("vc_insuredValue")||"50000000"),d=p>c,f=Math.round(c/p*100),_=100-f,y=localStorage.getItem("vc_skipHealth")==="1";a.innerHTML=`
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
                  <div class="pd-field" ${y?'style="display:none"':""}>
                    <label class="pd-field__label">¿A qué te dedicas?</label>
                    <div class="pd-field__input">
                      <input type="text" id="comp-occupation" placeholder="Ej: Ingeniero de sistemas, Docente, Comerciante">
                    </div>
                  </div>
                  <div class="pd-field" ${y?'style="display:none"':""}>
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

            <!-- La Declaración de salud se movió a su propia pantalla (page=health),
                 mostrada solo cuando aplica (vc_skipHealth !== '1'). -->

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
                  <span class="vc-beneficiary-auto__text"><strong>${e}</strong> recibe el ${f}% del valor asegurado (equivalente a tu deuda).</span>
                </div>

                ${d?`
                <p style="font-size:13px;color:#5B5B5B;margin-bottom:12px">Como tu valor asegurado es mayor a tu deuda, designa un beneficiario libre para el ${_}% restante:</p>
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

        </main>
      </div>

      <!-- Footer (barra continua de extremo a extremo) -->
      <div class="pd-footer">
        <button class="pd-footer__btn" id="comp-continue">Continuar</button>
      </div>
    </div>
  `,qe()}function qe(){document.querySelectorAll(".vc-collapsible__header").forEach(a=>{a.addEventListener("click",()=>{a.closest(".vc-collapsible").classList.toggle("vc-collapsible--open")})}),document.querySelectorAll(".pd-chip").forEach(a=>{a.addEventListener("click",()=>{a.closest(".pd-field__chips").querySelectorAll(".pd-chip").forEach(e=>e.classList.remove("pd-chip--active")),a.classList.add("pd-chip--active")})}),document.getElementById("comp-back").addEventListener("click",()=>{const a=new URL(window.location);a.searchParams.set("page","quotation"),window.location.href=a.toString()}),document.getElementById("comp-continue").addEventListener("click",()=>{var x,v,b,T,$,M;const a=((x=document.querySelector(".pd-chip--active"))==null?void 0:x.dataset.value)||"F",e=((v=document.getElementById("comp-dept"))==null?void 0:v.value)||"",c=((b=document.getElementById("comp-city"))==null?void 0:b.value)||"",p=((T=document.getElementById("comp-address"))==null?void 0:T.value)||"",d=(($=document.getElementById("comp-occupation"))==null?void 0:$.value)||"",f=((M=document.getElementById("comp-credit-number"))==null?void 0:M.value)||"";localStorage.setItem("vc_gender",a),localStorage.setItem("vc_dept",e),localStorage.setItem("vc_city",c),localStorage.setItem("vc_address",p),localStorage.setItem("vc_occupation",d),localStorage.setItem("vc_creditNumber",f);const _=document.getElementById("comp-benef-name"),y=document.getElementById("comp-benef-rel");if(_){const q=_.value.trim(),U=(y==null?void 0:y.value)||"";localStorage.setItem("vc_hasSecondInsured","1"),localStorage.setItem("vc_insuredName",q||"Beneficiario"),localStorage.setItem("vc_beneficiaryRel",U),localStorage.removeItem("vc_insuredGender")}else localStorage.setItem("vc_hasSecondInsured","0"),localStorage.removeItem("vc_insuredName"),localStorage.removeItem("vc_beneficiaryRel"),localStorage.removeItem("vc_insuredGender");const k=localStorage.getItem("vc_skipHealth")==="1",g=new URL(window.location);g.searchParams.set("page",k?"summary":"health"),window.location.href=g.toString()})}const J="/vida-proteccion-creditos";function $e(){const a=localStorage.getItem("vc_name")||"Simón Andrés Bolívar Libertad",e=localStorage.getItem("vc_gender")||"M",c=[{id:"holder",name:a,gender:e,icon:`${J}/Iconos/user.png`}],p=localStorage.getItem("vc_hasSecondInsured"),d=localStorage.getItem("vc_insuredName");return(p==="1"||p===null&&!!d)&&c.push({id:"insured1",name:d||"Beneficiario",gender:localStorage.getItem("vc_insuredGender")||"",icon:`${J}/Iconos/Group 7272.png`}),c}const re=[{title:"¿Tiene, ha tenido o esta en estudio de enfermedades del corazón o del sistema cardiovascular?",detail:"Hipertensión arterial, arritmias, enfermedad coronaria, infarto cardíaco, angina, afecciones de las válvulas del corazón, evento cerebrovascular, tromboembolismo, trombosis, accidente isquémico transitorio, aneurismas."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades endocrinas, metabólicas?",detail:"Diabetes, pre diabetes, resistencia a la insulina, nódulos tiroideos, hipertiroidismo, hiperprolactinemia, Enfermedad de Graves, Obesidad, Enfermedad de Addison, Enfermedad de Cushing, Cirugía Bariátrica."},{title:"Está tomando algún medicamento actualmente o está bajo algún tratamiento médico, terapia y/o rehabilitación:",detail:"Física, psicología, fonoaudiología, ocupacional, neuropsicología. En caso afirmativo indique nombre de medicamento y/o tratamiento, y el diagnóstico."},{title:"¿Está embarazada actualmente o sospecha que está embarazada?",onlyGender:"F"},{title:"¿Tiene, ha tenido o esta en estudio de Enfermedades autoinmunes o el colágeno?",detail:"Lupus, artritis reumatoidea, vasculitis, espondilitis, colitis ulcerativa, esclerodermia, glomerulopatías o enfermedad del colágeno no determinada, miastenia gravis, síndrome de sjögren, esclerosis lateral amiotrófica, fibrosis quística, enfermedades tipificadas como huérfanas, artritis psoriásica, artritis reumatoidea, espondilitis anquilosante."},{title:"¿Tiene, ha tenido o esta en estudio de Enfermedades o eventos neurológicos?",detail:"Evento cerebrovascular, accidente isquémico transitorio, trombosis, epilepsia, convulsiones, esclerosis múltiple, alzheimer, guillain barre, parálisis, tumores cerebrales, migraña o cefaleas crónicas, neuralgias, meningitis, aneurismas cerebrales, fístulas, hidrocefalia, parkinson, TEC (Traumatismo craneoencefálico), neuropatías.",detail2Title:"¿y/ o Lesión en órganos de los sentidos?",detail2:"Pérdida o disminución visual, Pérdida o disminución auditiva, Desviación del Tabique nasal."},{title:"¿Tiene, ha tenido o esta en estudio de alteración del desarrollo y/o desorden psiquiátrico?",detail:"Depresión, ansiedad, trastorno bipolar, esquizofrenia, déficit de atención, hiperactividad, trastorno del espectro autista, alteraciones del lenguaje o desarrollo psicomotor, trastornos alimenticios, autismo, dependencia al alcohol, consumo y/o dependencia a drogas ilícitas, psicotrópicas, demencia."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades, amputaciones o lesiones de los huesos o articulaciones?",detail:"Hombro, tobillo, rodillas, cadera, codo, dedos de las manos, muñeca, dedos de los pies, afecciones en meniscos, luxaciones, artrosis, fracturas, alguna afección y/o desviación de la columna, hernias discales, osteoporosis, distrofia muscular, gota, artritis gotosa o síndrome de lobstein."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades pulmonares?",detail:"Asma, EPOC (enfermedad pulmonar obstructiva crónica), síndrome bronco obstructivo recurrente, nódulos pulmonares, Fibrosis pulmonar, enfisema pulmonar, trasplante pulmonar."},{title:"¿Cáncer o similares?",detail:"Linfoma, leucemia, tumores, masas, nódulos, quistes, lesiones premalignas, pólipos, lipomas, fibromas, nevos o lunares, mujeres (nódulos mamarios).",important:"De acuerdo con lo dispuesto en la ley 2475 del 2025, si terminó su tratamiento contra el cáncer hace más de 4 años sin recaídas posteriores (si el cáncer fue diagnosticado siendo menor de edad, el tiempo anterior se disminuirá a 2 años) no debe reportar este antecedente."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades de riñones, próstata (hombres) o aparato urogenital?",detail:"Cálculos, cólico renal, hiperplasia de la próstata, insuficiencia renal, glomerulonefritis, sangre en la orina, proteínas en la orina, síndrome nefrótico, Infección de vías urinarias recurrentes, incontinencia urinaria, cistocele, prolapso uterino, vejiga neurogénica."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades del hígado, gástricas, colón?",detail:"Cirrosis, hepatitis C, pólipos en colon, úlceras, colitis, divertículos, enfermedad por reflujo gastroesofágico, esófago de barrett, hernia(s) (diafragmática, hiatal, inguinal, umbilical), cálculos biliares, pancreatitis aguda y/o crónica,  enfermedad de crohn, sangrados del tubo digestivo, rectocele."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades de la sangre o infecciosa?",detail:"Trastornos de la coagulación, talasemia, trombocitopenia, leucopenia, anemia actual, leucemia, hemofilia, infección por VIH y/o VIH - SIDA, púrpura trombocitopénica, síndrome antifosfolípidos, virus del papiloma humano."},{title:"¿Algún tratamiento médico y/o quirúrgico pendiente?",detail:"y/o alguna enfermedad no mencionada en las preguntas anteriores o  enfermedades congénitas/genéticas o malformaciones."},{title:"¿Algún tipo de discapacidad que le impida desempeñar sus tareas diarias o ha tenido en el último año alguna incapacidad medica por tiempo mayor a 1 mes?",detail:"Detalle la discapacidad del titular y/o asegurado"}];let ee={},z=0;function Fe(a){if(localStorage.getItem("vc_skipHealth")==="1"){const e=new URL(window.location);e.searchParams.set("page","summary"),window.location.replace(e.toString());return}ee={},z=0,a.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo">
          <img src="${J}/images/logo-seguros-bolivar.png" alt="Seguros Bolívar">
        </div>
      </header>

      <div class="sp-content">
        <!-- STEPPER (5 pasos, "Complementa" activo) -->
        <aside class="sp-stepper">
          <div class="sp-stepper__list">
            <div class="sp-step"><div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div><span class="sp-step__label">Tus datos</span></div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step"><div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div><span class="sp-step__label">Tu crédito</span></div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step"><div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--completed"><span>&#10003;</span></div></div><span class="sp-step__label">Tu cotización</span></div>
            <div class="sp-step__line sp-step__line--completed"></div>
            <div class="sp-step sp-step--active"><div class="sp-step__container"><div class="sp-step__bullet sp-step__bullet--active"><span>4</span></div></div><span class="sp-step__label sp-step__label--active">Complementa</span></div>
            <div class="sp-step__line"></div>
            <div class="sp-step"><div class="sp-step__container"><div class="sp-step__bullet"><span>5</span></div></div><span class="sp-step__label">Paga y activa</span></div>
          </div>
        </aside>

        <main class="sp-main">
          <div class="sp-back" id="hs-back">
            <img src="${J}/Iconos/angle-left.png" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <div class="hs-wrapper">
            <div class="hs-title-row">
              <img src="${J}/Iconos/Latido.png" alt="" class="hs-title-icon" onerror="this.style.display='none'">
              <h1 class="hs-title">Declaración de salud</h1>
            </div>

            <div class="hs-card" id="hs-card"><!-- render dinámico --></div>
          </div>

        </main>
      </div>

      <!-- FOOTER con flechas de navegación (barra continua de extremo a extremo) -->
      <div class="pd-footer hs-footer">
        <button class="hs-nav hs-nav--prev" id="hs-prev" aria-label="Anterior">
          <img src="${J}/Iconos/angle-left.png" alt="" class="hs-nav__icon">
        </button>
        <button class="hs-nav hs-nav--next" id="hs-next" aria-label="Siguiente">
          <img src="${J}/Iconos/angle-left.png" alt="" class="hs-nav__icon hs-nav__icon--right">
        </button>
      </div>

      <!-- MODAL DE ENTRADA -->
      <div class="hs-modal-overlay" id="hs-modal-overlay">
        <div class="hs-modal">
          <button class="hs-modal__close" id="hs-modal-close" aria-label="Cerrar">&times;</button>
          <div class="hs-modal__content">
            <div class="hs-modal__pictogram">
              <svg class="hs-modal__check" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="32" cy="32" r="29" stroke="#FFE16F" stroke-width="4"/>
                <circle cx="32" cy="32" r="29" stroke="#038450" stroke-width="4" stroke-dasharray="118 200" stroke-linecap="round" transform="rotate(-90 32 32)"/>
                <path d="M21 32.5l7.5 7.5L44 24" stroke="#1B1B1B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="hs-modal__texts">
              <h2 class="hs-modal__title">Declaración de Salud</h2>
              <p class="hs-modal__body">
                Queremos conocer <strong>el estado de salud de los asegurados</strong> para ofrecerle la mejor cobertura.
                <strong>Le haremos algunas preguntas sencillas</strong> y, si es necesario, profundizaremos en algunos detalles.
              </p>
              <p class="hs-modal__note"><strong>Tenga en cuenta:</strong> Estas preguntas son obligatorias, las respuestas falsas o incompletas pueden anular el seguro.</p>
            </div>
            <div class="hs-modal__actions">
              <button class="hs-modal__btn" id="hs-modal-continue">Continuar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL DE RADICADO — Valoración médica -->
      <div class="hs-modal-overlay" id="hs-review-overlay">
        <div class="hs-modal">
          <div class="hs-modal__content">
            <div class="hs-modal__pictogram">
              <svg class="hs-modal__check" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="32" cy="32" r="29" stroke="#FFE16F" stroke-width="4"/>
                <circle cx="32" cy="32" r="29" stroke="#038450" stroke-width="4" stroke-dasharray="118 200" stroke-linecap="round" transform="rotate(-90 32 32)"/>
                <path d="M32 20v18" stroke="#1B1B1B" stroke-width="4" stroke-linecap="round"/>
                <circle cx="32" cy="45" r="2.4" fill="#1B1B1B"/>
              </svg>
            </div>
            <div class="hs-modal__texts">
              <h2 class="hs-modal__title">Su solicitud requiere valoración médica</h2>
              <p class="hs-modal__body">
                Con base en sus respuestas, su caso será revisado por nuestro equipo médico.
                Nos pondremos en contacto con usted para continuar con el proceso.
              </p>
              <div class="hs-review__case">
                <span class="hs-review__case-label">Número de radicado</span>
                <span class="hs-review__case-number" id="hs-review-case">VM-00000000-0000</span>
              </div>
              <p class="hs-modal__note">Guarde este número para hacer seguimiento a su solicitud.</p>
            </div>
            <div class="hs-modal__actions">
              <button class="hs-modal__btn" id="hs-review-home">Entendido</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,Re()}function Re(){var c,p,d,f,_;const a=document.getElementById("hs-modal-overlay");a.classList.add("hs-modal-overlay--visible");const e=()=>a.classList.remove("hs-modal-overlay--visible");(c=document.getElementById("hs-modal-close"))==null||c.addEventListener("click",e),(p=document.getElementById("hs-modal-continue"))==null||p.addEventListener("click",e),(d=document.getElementById("hs-back"))==null||d.addEventListener("click",()=>{const y=new URL(window.location);y.searchParams.set("page","complementary"),window.location.href=y.toString()}),(f=document.getElementById("hs-prev"))==null||f.addEventListener("click",Oe),(_=document.getElementById("hs-next"))==null||_.addEventListener("click",He),pe()}function we(a){const e=$e();return a.onlyGender?e.filter(c=>c.gender===a.onlyGender):e}function pe(){const a=re[z],e=document.getElementById("hs-card"),c=we(a),p=c.map(d=>{var _;const f=((_=ee[z])==null?void 0:_[d.id])||"";return`
      <div class="hs-person" data-person="${d.id}">
        <div class="hs-person__info">
          <img src="${d.icon}" alt="" class="hs-person__icon" onerror="this.style.display='none'">
          <span class="hs-person__name">${d.name}</span>
        </div>
        <div class="hs-person__options">
          <button class="hs-opt ${f==="S"?"hs-opt--active":""}" data-value="S">Sí</button>
          <button class="hs-opt ${f==="N"?"hs-opt--active":""}" data-value="N">No</button>
        </div>
      </div>
    `}).join("");e.innerHTML=`
    <div class="hs-counter">${z+1}/${re.length}</div>
    <div class="hs-question">
      <h3 class="hs-question__title">${a.title}</h3>
      ${a.detail?`<p class="hs-question__detail">${a.detail}</p>`:""}
      ${a.detail2Title?`<h3 class="hs-question__title hs-question__title--sub">${a.detail2Title}</h3>`:""}
      ${a.detail2?`<p class="hs-question__detail">${a.detail2}</p>`:""}
    </div>
    ${a.important?`
      <div class="hs-important">
        <img src="${J}/Iconos/info-circle.png" alt="" class="hs-important__icon" onerror="this.style.display='none'">
        <div class="hs-important__text">
          <span class="hs-important__label">Importante</span>
          <p>${a.important}</p>
        </div>
      </div>`:""}
    ${c.length?`<div class="hs-people">${p}</div>`:'<p class="hs-question__detail">Esta pregunta no aplica para los asegurados de esta póliza.</p>'}
  `,e.querySelectorAll(".hs-person").forEach(d=>{const f=d.dataset.person;d.querySelectorAll(".hs-opt").forEach(_=>{_.addEventListener("click",()=>{ee[z]||(ee[z]={}),ee[z][f]=_.dataset.value,d.querySelectorAll(".hs-opt").forEach(y=>y.classList.remove("hs-opt--active")),_.classList.add("hs-opt--active"),xe()})})}),xe()}function Ie(){const a=re[z],e=we(a),c=ee[z]||{};return e.every(p=>c[p.id]==="S"||c[p.id]==="N")}function xe(){const a=document.getElementById("hs-prev"),e=document.getElementById("hs-next");a.classList.toggle("hs-nav--disabled",z===0),a.disabled=z===0;const c=Ie();e.classList.toggle("hs-nav--active",c),e.disabled=!c}function Oe(){z!==0&&(z--,pe())}function He(){Ie()&&(z<re.length-1?(z++,pe()):Ge())}function Ve(){return Object.values(ee).some(a=>Object.values(a).some(e=>e==="S"))}function je(){const a=new Date,e=`${a.getFullYear()}${String(a.getMonth()+1).padStart(2,"0")}${String(a.getDate()).padStart(2,"0")}`,c=Math.floor(1e3+Math.random()*9e3);return`VM-${e}-${c}`}function Ge(){if(localStorage.setItem("vc_healthAnswers",JSON.stringify(ee)),Ve()){const e=je();localStorage.setItem("vc_medicalReviewCase",e),Ue(e);return}const a=new URL(window.location);a.searchParams.set("page","summary"),window.location.href=a.toString()}function Ue(a){var p;const e=document.getElementById("hs-review-overlay");if(!e)return;const c=document.getElementById("hs-review-case");c&&(c.textContent=a),e.classList.add("hs-modal-overlay--visible"),(p=document.getElementById("hs-review-home"))==null||p.addEventListener("click",()=>{const d=new URL(window.location);d.searchParams.set("page","home"),d.searchParams.delete("step"),window.location.href=d.toString()})}function We(a){const e=$=>"$"+parseInt($).toLocaleString("es-CO"),c=localStorage.getItem("vc_name")||"Simón Andrés Bolívar",p=localStorage.getItem("vc_docNumber")||"1032508877",d=localStorage.getItem("vc_phone")||"3103025462",f=localStorage.getItem("vc_email")||"correo@email.com",_=localStorage.getItem("vc_age")||"35",y=localStorage.getItem("vc_bank")||"Bancolombia",k=localStorage.getItem("vc_insuredValue")||"50000000",g=localStorage.getItem("vc_monthlyPrima")||"37500",x=localStorage.getItem("vc_annualPrima")||"450000",v=localStorage.getItem("vc_periodicity")||"monthly",b=localStorage.getItem("vc_city")||"Bogotá",T=localStorage.getItem("vc_creditNumber")||"12345678";a.innerHTML=`
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
                      <div class="conf-plan__row"><span class="conf-plan__label">Valor asegurado:</span><span class="conf-plan__value">${e(k)}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Prima ${v==="monthly"?"mensual":"anual"}:</span><span class="conf-plan__value">${e(v==="monthly"?g:x)}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Banco:</span><span class="conf-plan__value--bold">${y}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Crédito #:</span><span class="conf-plan__value--bold">${T}</span></div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px">
                      <span style="font-size:12px;font-weight:600;color:#0B613E">Coberturas incluidas:</span>
                      <div style="display:flex;align-items:center;gap:8px"><img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" style="width:16px"><span style="font-size:13px;color:#303030">Muerte por cualquier causa</span></div>
                      <div style="display:flex;align-items:center;gap:8px"><img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" style="width:16px"><span style="font-size:13px;color:#303030">Incapacidad total y permanente</span></div>
                    </div>
                  </div>
                </div>

                <!-- Right: User data -->
                <div style="flex:1;min-width:280px">
                  <div class="conf-data-card">
                    <div class="conf-data-card__header"><img src="/vida-proteccion-creditos/Iconos/user.png" alt="" class="conf-data-card__icon"><span class="conf-data-card__title">Tus datos</span></div>
                    <div class="conf-data-card__rows">
                      <div class="conf-data-row"><span class="conf-data-row__label">Nombre:</span><span class="conf-data-row__value">${c}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Cédula:</span><span class="conf-data-row__value">${p}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Celular:</span><span class="conf-data-row__value">${d}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Edad:</span><span class="conf-data-row__value">${_} años</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Ciudad:</span><span class="conf-data-row__value">${b}</span></div>
                    </div>
                    <div class="conf-data-card__email" style="margin-top:8px">
                      <span>Enviaremos la póliza a:</span>
                      <span style="font-weight:700;color:#414141">${f}</span>
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
                    <span class="pf-option__amount" style="font-size:28px">${e(x)}<span class="pf-option__period">/año</span></span>
                    <span class="pf-option__iva">IVA incluido</span>
                  </div>
                  <div class="pf-option" data-freq="monthly">
                    <div class="pf-option__top">
                      <span class="pf-option__tag pf-option__tag--hidden"></span>
                      <div class="pf-option__radio"></div>
                    </div>
                    <h2 class="pf-option__name" style="font-size:24px">Pago mensual</h2>
                    <span class="pf-option__amount" style="font-size:28px">${e(g)}<span class="pf-option__period">/mes</span></span>
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

        </main>
      </div>

      <!-- Footer (barra continua de extremo a extremo) -->
      <div class="pd-footer">
        <button class="pd-footer__btn pd-footer__btn--disabled" id="sum-pay" disabled>Ir a pagar</button>
      </div>
    </div>
  `,Ye()}function Ye(){const a=document.querySelectorAll(".pf-option"),e=document.querySelectorAll(".pf-check__input"),c=document.getElementById("sum-pay");a.forEach(d=>{d.addEventListener("click",()=>{a.forEach(f=>{f.classList.remove("pf-option--selected"),f.querySelector(".pf-option__radio").classList.remove("pf-option__radio--active")}),d.classList.add("pf-option--selected"),d.querySelector(".pf-option__radio").classList.add("pf-option__radio--active"),localStorage.setItem("vc_periodicity",d.dataset.freq==="annual"?"annual":"monthly"),p()})}),e.forEach(d=>d.addEventListener("change",p));function p(){const d=document.querySelector(".pf-option--selected"),f=[...e].every(_=>_.checked);d&&f?(c.disabled=!1,c.classList.remove("pd-footer__btn--disabled")):(c.disabled=!0,c.classList.add("pd-footer__btn--disabled"))}document.getElementById("sum-back").addEventListener("click",()=>{const d=localStorage.getItem("vc_skipHealth")==="1",f=new URL(window.location);f.searchParams.set("page",d?"complementary":"health"),window.location.href=f.toString()}),c.addEventListener("click",()=>{if(!c.disabled){const d=new URL(window.location);d.searchParams.set("page","success"),window.location.href=d.toString()}})}function Xe(a){var v,b;const e=T=>"$"+parseInt(T).toLocaleString("es-CO"),c=localStorage.getItem("vc_name")||"Simón Bolívar",p=localStorage.getItem("vc_bank")||"Bancolombia",d=localStorage.getItem("vc_email")||"correo@email.com",f=localStorage.getItem("vc_periodicity")||"monthly",_=localStorage.getItem("vc_monthlyPrima")||"37500",y=localStorage.getItem("vc_annualPrima")||"450000",k=e(f==="monthly"?_:y),g=f==="monthly"?"Mensual":"Anual",x="#VPC-2026-"+Math.floor(1e3+Math.random()*9e3);localStorage.setItem("vc_policyNumber",x),a.innerHTML=`
    <div class="success-page">
      <header class="sp-header">
        <div class="sp-header__logo"><img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar"></div>
      </header>

      <div class="success-banner">
        <div class="success-banner__confetti"></div>
        <div class="success-banner__text">
          <p class="success-banner__subtitle">¡Tu seguro fue activado!</p>
          <h1 class="success-banner__title">Bienvenido a Seguros Bolívar, ${c.split(" ")[0]}</h1>
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
            <div class="success-card__row"><span class="success-card__label">Pago ${g.toLowerCase()}:</span><span class="success-card__value">${k}</span></div>
            <div class="success-card__row"><span class="success-card__label">Banco protegido:</span><span class="success-card__value">${p}</span></div>
            <div class="success-card__row"><span class="success-card__label">Vigencia:</span><span class="success-card__value">18 jun 2026 – 18 jun 2027</span></div>
            <div class="success-card__row"><span class="success-card__label">No. póliza:</span><span class="success-card__value">${x}</span></div>
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
          <p>En un máximo de <strong>12 horas</strong>, enviaremos los detalles de tu seguro al correo electrónico <strong>${d}</strong>.</p>
        </div>

        <button class="success-home-btn" id="vc-home">
          <img src="/vida-proteccion-creditos/Iconos/angle-left.png" alt="" class="success-home-btn__icon">
          <span>Ir al inicio</span>
        </button>
      </div>
    </div>
  `,(v=document.getElementById("vc-copy"))==null||v.addEventListener("click",()=>{const T=document.querySelector(".success-card__code").textContent;navigator.clipboard.writeText(T).then(()=>{document.querySelector("#vc-copy span").textContent="¡Copiado!",setTimeout(()=>document.querySelector("#vc-copy span").textContent="Copiar",2e3)})}),(b=document.getElementById("vc-home"))==null||b.addEventListener("click",()=>{localStorage.clear(),window.location.href=window.location.pathname})}function Qe(){const e=new URLSearchParams(window.location.search).get("page")||"home",c=document.getElementById("app-content");switch(e){case"credit-data":Ne(c);break;case"quotation":De(c);break;case"complementary":ze(c);break;case"health":Fe(c);break;case"summary":We(c);break;case"success":Xe(c);break;case"home":default:ke(c);break}}window.addEventListener("message",a=>{var e;if(a.data){if(a.data.type==="SAVE_SNAPSHOT"){const c=((e=document.getElementById("app-content"))==null?void 0:e.innerHTML)||document.body.innerHTML;window.parent.postMessage({type:"SNAPSHOT_DATA",html:c,page:a.data.page,projectId:a.data.projectId},"*")}if(a.data.type==="RESTORE_SNAPSHOT"){const c=document.getElementById("app-content");c&&a.data.html&&(c.innerHTML=a.data.html)}if(a.data.type==="NAVIGATE_TO_STEP"){const c=a.data.page;if(c){const p=new URL(window.location);p.searchParams.set("page",c),window.location.href=p.toString()}}if(a.data.type==="ADMIN_OVERRIDE"){const{selector:c,property:p,value:d}=a.data;try{const f=document.querySelector(c);f&&(p==="textContent"?f.textContent=d:p==="src"?f.src=d:f.style.setProperty(p.replace(/([A-Z])/g,"-$1").toLowerCase(),d,"important"))}catch{}}}});function Ee(){Qe()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ee):Ee();
