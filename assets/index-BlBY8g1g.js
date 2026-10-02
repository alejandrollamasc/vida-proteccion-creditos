(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))d(n);new MutationObserver(n=>{for(const p of n)if(p.type==="childList")for(const f of p.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&d(f)}).observe(document,{childList:!0,subtree:!0});function s(n){const p={};return n.integrity&&(p.integrity=n.integrity),n.referrerPolicy&&(p.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?p.credentials="include":n.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function d(n){if(n.ep)return;n.ep=!0;const p=s(n);fetch(n.href,p)}})();window.self===window.top||De();function De(){let i=!1,e=null,s=!1,d=[],n=[],p=!1,f={},h=null,E=1e4;const g=5,x=document.createElement("div");x.id="editor-toolbar",x.innerHTML="",x.style.cssText="display:none;position:fixed;z-index:99999;",document.body.appendChild(x);const y=document.createElement("div");y.id="resize-box",y.style.cssText="display:none;position:fixed;z-index:99998;pointer-events:none;border:2px solid #0a6741;",["nw","ne","sw","se","n","s","e","w"].forEach(t=>{const o=document.createElement("div");o.className="resize-handle",o.dataset.dir=t,o.style.cssText=`position:absolute;width:8px;height:8px;background:#0a6741;border-radius:2px;pointer-events:all;cursor:${t}-resize;`;const r={nw:"top:-4px;left:-4px;",ne:"top:-4px;right:-4px;",sw:"bottom:-4px;left:-4px;",se:"bottom:-4px;right:-4px;",n:"top:-4px;left:50%;transform:translateX(-50%);",s:"bottom:-4px;left:50%;transform:translateX(-50%);",e:"top:50%;right:-4px;transform:translateY(-50%);",w:"top:50%;left:-4px;transform:translateY(-50%);"};o.style.cssText+=r[t],y.appendChild(o)}),document.body.appendChild(y);const _=document.createElement("div");_.className="rotate-line",y.appendChild(_);const C=document.createElement("div");C.className="rotate-handle",y.appendChild(C),C.addEventListener("mousedown",t=>{if(!e)return;t.preventDefault(),t.stopPropagation();const o=e.getBoundingClientRect(),r=o.left+o.width/2,a=o.top+o.height/2;parseFloat(e.dataset.rotation||"0");const l=m=>{const v=Math.atan2(m.clientY-a,m.clientX-r)*(180/Math.PI)+90;e.style.transform=`rotate(${Math.round(v)}deg)`,e.dataset.rotation=Math.round(v),J(e)},u=()=>{document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",u),I("changeStyle",e,"transform",e.style.transform)};document.addEventListener("mousemove",l),document.addEventListener("mouseup",u)});const P=document.createElement("div");P.style.cssText="display:none;position:fixed;z-index:99997;background:#E8C916;color:#333;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;pointer-events:none;",document.body.appendChild(P);const M=document.createElement("div");M.id="alignment-guides",M.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99996;",document.body.appendChild(M);const F=document.createElement("div");F.id="text-cursor",F.style.cssText="display:none;position:fixed;z-index:99999;pointer-events:none;",F.innerHTML=`
  <div style="display:flex;align-items:center;gap:4px;">
    <div style="width:2px;height:20px;background:#0a6741;animation:blink 0.8s infinite;"></div>
    <span style="font-size:10px;color:#0a6741;font-weight:600;background:rgba(255,255,255,0.9);padding:1px 6px;border-radius:4px;white-space:nowrap;">Clic para insertar texto</span>
  </div>
`,document.body.appendChild(F);const O=document.createElement("style");O.textContent=`
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
`,document.head.appendChild(O);const q=document.createElement("div");q.id="sb-grid-overlay",q.classList.add("visible");for(let t=0;t<12;t++){const o=document.createElement("div");o.className="sb-grid-col",q.appendChild(o)}document.body.appendChild(q);const Y=document.createElement("div");Y.id="sb-smart-guides",Y.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99994;",document.body.appendChild(Y);const X=4;function qe(t,o,r,a){Y.innerHTML="";const l=a.left+o,u=a.top+r,m=l+a.width,v=u+a.height,c=l+a.width/2,b=u+a.height/2,S=window.innerWidth/2,B=window.innerHeight/2;Math.abs(c-S)<X&&Q("v",S,"#E8C916","Centro"),Math.abs(b-B)<X&&Q("h",B,"#E8C916","Centro"),document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, img, div.admin-inserted, [class*="card"], [class*="btn"], [class*="hero"], [class*="section"]').forEach(A=>{if(A===t||A.contains(t)||t.contains(A)||A.closest("#sb-resize-box")||A.closest("#sb-smart-guides")||A.closest("#sb-grid-overlay"))return;const w=A.getBoundingClientRect();if(w.width<10||w.height<10)return;const R=w.left+w.width/2,V=w.top+w.height/2;Math.abs(c-R)<X&&Q("v",R,"#0a6741"),Math.abs(b-V)<X&&Q("h",V,"#0a6741"),Math.abs(l-w.left)<X&&Q("v",w.left,"#ff6b6b"),Math.abs(m-w.right)<X&&Q("v",w.right,"#ff6b6b"),Math.abs(u-w.top)<X&&Q("h",w.top,"#ff6b6b"),Math.abs(v-w.bottom)<X&&Q("h",w.bottom,"#ff6b6b")})}function Q(t,o,r,a){const l=document.createElement("div");if(t==="v"?l.style.cssText=`position:fixed;top:0;bottom:0;left:${o}px;width:1px;background:${r};opacity:0.7;`:l.style.cssText=`position:fixed;left:0;right:0;top:${o}px;height:1px;background:${r};opacity:0.7;`,Y.appendChild(l),a){const u=document.createElement("div");u.textContent=a,u.style.cssText=`position:fixed;${t==="v"?"left:"+(o+4)+"px;top:8px":"top:"+(o+4)+"px;left:8px"};background:${r};color:#fff;font-size:9px;padding:1px 5px;border-radius:3px;font-family:sans-serif;`,Y.appendChild(u)}}function ze(){Y.innerHTML=""}const ae=document.createElement("div");ae.className="cursor-guide-h",ae.style.display="none",document.body.appendChild(ae);const oe=document.createElement("div");oe.className="cursor-guide-v",oe.style.display="none",document.body.appendChild(oe);function Z(t){if(t.id)return"#"+t.id;if(t.className&&typeof t.className=="string"){const a=t.className.trim().split(/\s+/).filter(l=>l!=="editor-highlight"&&l!=="editor-dragging");if(a.length){const l="."+a.join(".");try{if(document.querySelectorAll(l).length===1)return l}catch{}}}const o=[];let r=t;for(;r&&r!==document.body;){let a=r.tagName.toLowerCase();if(r.id){o.unshift("#"+r.id);break}const l=r.parentElement;if(l){const u=Array.from(l.children).filter(m=>m.tagName===r.tagName);u.length>1&&(a+=":nth-of-type("+(u.indexOf(r)+1)+")")}o.unshift(a),r=r.parentElement}return o.join(" > ")}function le(t,o,r){d.push({selector:Z(t),property:o,oldValue:r,newValue:o==="textContent"?t.textContent:o==="__fullStyle"?t.style.cssText:t.style[o]}),n=[]}function he(t){d.push({selector:Z(t),property:"__fullStyle",oldValue:t.style.cssText,newValue:""}),n=[]}function be(t){d.length>0&&(d[d.length-1].newValue=t.style.cssText)}function J(t){const o=t.getBoundingClientRect();y.style.display="block",y.style.left=o.left+"px",y.style.top=o.top+"px",y.style.width=o.width+"px",y.style.height=o.height+"px"}function Re(t){const o=t.parentElement;if(!o||o===document.body||o===document.documentElement||!["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(o.tagName))return;o.getBoundingClientRect(),t.getBoundingClientRect();const r=(parseFloat(t.style.left)||0)+t.offsetWidth,a=(parseFloat(t.style.top)||0)+t.offsetHeight;r>o.offsetWidth&&(o.style.minWidth=r+"px"),a>o.offsetHeight&&(o.style.minHeight=a+"px")}document.addEventListener("scroll",()=>{e&&!s&&J(e)},!0);function $(t){e&&(e.classList.remove("editor-highlight"),e.removeAttribute("contenteditable")),e=t,e.classList.add("editor-highlight"),J(t)}function ce(){e&&(e.classList.remove("editor-highlight","editor-dragging"),e.removeAttribute("contenteditable")),e=null,x.style.display="none",y.style.display="none",re()}function I(t,o,r,a){window.parent.postMessage({type:t==="info"?"ADMIN_INFO":"ADMIN_CHANGE",action:t,selector:o?Z(o):"",property:r,value:a,description:t==="info"?a:`${t}: ${(o==null?void 0:o.tagName)||""}`},"*")}function ye(){const t=document.querySelectorAll("body *:not(#editor-toolbar):not(#resize-box):not(#alignment-guides):not(.guide-line):not(.guide-distance):not(.guide-marker):not(#text-cursor):not(script):not(style):not(link)");return Array.from(t).filter(o=>{if(o===e||o.contains(e)||e!=null&&e.contains(o)||o.offsetParent===null&&o.style.position!=="fixed")return!1;const r=o.getBoundingClientRect();return r.width>5&&r.height>5&&r.top<window.innerHeight+50&&r.bottom>-50&&r.left<window.innerWidth+50&&r.right>-50})}function re(){M.innerHTML=""}function _e(t){re();const o=ye(),r=t.left+t.width/2,a=t.top+t.height/2,l=window.innerWidth/2,u=window.innerHeight/2,m={h:new Set,v:new Set};Math.abs(r-l)<g&&z("v",l,"viewport"),Math.abs(a-u)<g&&z("h",u,"viewport"),Math.abs(t.left)<g&&z("v",0,"viewport"),Math.abs(t.right-window.innerWidth)<g&&z("v",window.innerWidth,"viewport"),Math.abs(t.top)<g&&z("h",0,"viewport"),o.forEach(v=>{const c=v.getBoundingClientRect(),b=c.left+c.width/2,S=c.top+c.height/2;Math.abs(a-S)<g&&!m.h.has(Math.round(S))&&(m.h.add(Math.round(S)),z("h",S,"center"),ue(r,S),ue(b,S)),Math.abs(t.top-c.top)<g&&!m.h.has(Math.round(c.top))&&(m.h.add(Math.round(c.top)),z("h",c.top,"edge")),Math.abs(t.bottom-c.bottom)<g&&!m.h.has(Math.round(c.bottom))&&(m.h.add(Math.round(c.bottom)),z("h",c.bottom,"edge")),Math.abs(t.top-c.bottom)<g&&!m.h.has(Math.round(c.bottom)+1e3)&&(m.h.add(Math.round(c.bottom)+1e3),z("h",c.bottom,"edge"),K(r,c.bottom,0,"h")),Math.abs(t.bottom-c.top)<g&&!m.h.has(Math.round(c.top)+2e3)&&(m.h.add(Math.round(c.top)+2e3),z("h",c.top,"edge"),K(r,c.top,0,"h")),Math.abs(r-b)<g&&!m.v.has(Math.round(b))&&(m.v.add(Math.round(b)),z("v",b,"center"),ue(b,a),ue(b,S)),Math.abs(t.left-c.left)<g&&!m.v.has(Math.round(c.left))&&(m.v.add(Math.round(c.left)),z("v",c.left,"edge")),Math.abs(t.right-c.right)<g&&!m.v.has(Math.round(c.right))&&(m.v.add(Math.round(c.right)),z("v",c.right,"edge")),Math.abs(t.left-c.right)<g&&!m.v.has(Math.round(c.right)+1e3)&&(m.v.add(Math.round(c.right)+1e3),z("v",c.right,"edge"),K(c.right,a,0,"v")),Math.abs(t.right-c.left)<g&&!m.v.has(Math.round(c.left)+2e3)&&(m.v.add(Math.round(c.left)+2e3),z("v",c.left,"edge"),K(c.left,a,0,"v"));const B=t.top-c.bottom,k=c.top-t.bottom,A=t.left-c.right,w=c.left-t.right;B>0&&B<60&&K(r,c.bottom+B/2,Math.round(B),"h"),k>0&&k<60&&K(r,t.bottom+k/2,Math.round(k),"h"),A>0&&A<60&&K(c.right+A/2,a,Math.round(A),"v"),w>0&&w<60&&K(t.right+w/2,a,Math.round(w),"v")})}function z(t,o,r){const a=document.createElement("div");a.className=`guide-line guide-line-${t} guide-line--${r||"edge"}`,t==="h"?a.style.top=o+"px":a.style.left=o+"px",M.appendChild(a)}function ue(t,o,r){const a=document.createElement("div");a.className="guide-marker guide-marker--center",a.style.left=t+"px",a.style.top=o+"px",M.appendChild(a)}function K(t,o,r,a){if(r<=0)return;const l=document.createElement("div");l.className="guide-distance",l.textContent=r+"px",l.style.left=t+"px",l.style.top=o+"px",l.style.transform="translate(-50%, -50%)",M.appendChild(l)}function xe(t,o,r){const a=t.getBoundingClientRect(),l=a.width,u=a.height,m=ye();let v=o,c=r,b=!1;const S=o,B=r,k=o+l,A=r+u,w=o+l/2,R=r+u/2,V=window.innerWidth/2,T=window.innerHeight/2;return Math.abs(w-V)<g&&(v=V-l/2,b=!0),Math.abs(R-T)<g&&(c=T-u/2,b=!0),Math.abs(S)<g&&(v=0,b=!0),Math.abs(k-window.innerWidth)<g&&(v=window.innerWidth-l,b=!0),Math.abs(B)<g&&(c=0,b=!0),m.forEach(U=>{const L=U.getBoundingClientRect(),ne=L.left+L.width/2,N=L.top+L.height/2;Math.abs(R-N)<g&&(c=N-u/2,b=!0),Math.abs(B-L.top)<g&&(c=L.top,b=!0),Math.abs(A-L.bottom)<g&&(c=L.bottom-u,b=!0),Math.abs(B-L.bottom)<g&&(c=L.bottom,b=!0),Math.abs(A-L.top)<g&&(c=L.top-u,b=!0),Math.abs(w-ne)<g&&(v=ne-l/2,b=!0),Math.abs(S-L.left)<g&&(v=L.left,b=!0),Math.abs(k-L.right)<g&&(v=L.right-l,b=!0),Math.abs(S-L.right)<g&&(v=L.right,b=!0),Math.abs(k-L.left)<g&&(v=L.left-l,b=!0)}),{left:v,top:c,snapped:b}}let G=null;document.addEventListener("mouseover",t=>{!i||s||p||t.target===x||x.contains(t.target)||t.target===y||y.contains(t.target)||t.target!==e&&(G&&G!==e&&G.classList.remove("editor-hover"),G=t.target,G.classList.add("editor-hover"))}),document.addEventListener("mouseout",t=>{!i||s||t.target!==e&&G&&(G.classList.remove("editor-hover"),G=null)}),document.addEventListener("mousemove",t=>{if(!i){ae.style.display="none",oe.style.display="none";return}p&&h&&(h.style.display="block",h.style.left=t.clientX+12+"px",h.style.top=t.clientY+12+"px"),s||(ae.style.display="block",oe.style.display="block",ae.style.top=t.clientY+"px",oe.style.left=t.clientX+"px")}),document.addEventListener("mousedown",t=>{if(!i||t.target===x||x.contains(t.target)||t.target===y||y.contains(t.target)||p)return;t.preventDefault(),t.stopPropagation();const o=t.target;$(o),G&&(G.classList.remove("editor-hover"),G=null),ae.style.display="none",oe.style.display="none";const r=t.clientX,a=t.clientY,l=o.getBoundingClientRect().width;let u=!1;const m=c=>{const b=c.clientX-r,S=c.clientY-a;if(!u)if(Math.abs(b)>8||Math.abs(S)>8)u=!0,s=!0,o.classList.add("editor-dragging"),y.style.display="none",he(o);else return;o.style.transform=`translate(${b}px, ${S}px)`,o.style.zIndex="99999",qe(o,b,S,o.getBoundingClientRect())},v=c=>{if(document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",v),!u)return;s=!1,o.classList.remove("editor-dragging");const b=c.clientX-r,S=c.clientY-a;if(o.style.transform="",o.style.position==="absolute"||o.style.position==="fixed"){const B=parseFloat(o.style.left)||0,k=parseFloat(o.style.top)||0;o.style.left=B+b+"px",o.style.top=k+S+"px"}else{const B=o.parentElement;if(B&&B!==document.body){(!B.style.position||B.style.position==="static")&&(B.style.position="relative");const k=document.createElement("div");k.style.cssText=`width:${l}px;height:${o.getBoundingClientRect().height}px;visibility:hidden;pointer-events:none;`,B.insertBefore(k,o);const A=o.getBoundingClientRect(),w=B.getBoundingClientRect(),R=A.left-w.left,V=A.top-w.top;o.style.position="absolute",o.style.left=R+b+"px",o.style.top=V+S+"px",o.style.width=l+"px",o.style.margin="0",o.style.zIndex="99999"}}re(),ze(),be(o),J(o),I("changeStyle",o,"left",o.style.left),I("changeStyle",o,"top",o.style.top)};document.addEventListener("mousemove",m),document.addEventListener("mouseup",v)},!0),document.addEventListener("click",t=>{if(i&&((t.target.closest("a")||t.target.closest("button")||t.target.tagName==="A"||t.target.tagName==="BUTTON")&&(t.preventDefault(),t.stopPropagation()),!!p&&!(t.target===x||x.contains(t.target)||t.target===y||y.contains(t.target))&&(t.preventDefault(),t.stopPropagation(),p))){E++;const o=window.scrollX,r=window.scrollY,a=document.createElement("div");a.textContent=f.text||"Nuevo texto",a.style.cssText=`position:absolute;left:${t.clientX+o}px;top:${t.clientY+r}px;z-index:${E};font-family:${f.fontFamily||"Bolivar, sans-serif"};font-size:${f.fontSize||"16px"};font-weight:${f.fontWeight||"400"};color:${f.color||"#333"};padding:4px 8px;cursor:move;background:${f.backgroundColor||"transparent"};border-radius:4px;`,document.body.appendChild(a),p=!1,document.body.style.cursor="",h&&(h.style.display="none"),$(a),a.setAttribute("contenteditable","true"),a.focus(),a.addEventListener("blur",()=>{a.removeAttribute("contenteditable")},{once:!0}),I("info",null,"","📝 Texto insertado.")}},!0),document.addEventListener("dblclick",t=>{if(i||(i=!0,window.parent.postMessage({type:"ADMIN_INFO",message:"🎯 Modo edición activado automáticamente."},"*"),window.parent.postMessage({type:"EDIT_MODE_CHANGED",active:!0},"*")),t.target===x||x.contains(t.target)||t.target===y||y.contains(t.target))return;t.preventDefault(),t.stopPropagation();const o=t.target;$(o);const r=window.getComputedStyle(o),a=o.tagName==="IMG"||o.tagName==="SVG",l=["INPUT","SELECT","TEXTAREA"].includes(o.tagName),u=o.tagName==="BUTTON"||o.tagName==="A"||(o.className||"").includes("btn");window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:o.tagName.toLowerCase(),selector:Z(o),textContent:(o.textContent||"").substring(0,200),className:o.className||"",id:o.id||"",src:o.src||"",isImage:a,isFormField:l,isText:!a&&!l&&!u,placeholder:o.placeholder||"",label:"",options:o.tagName==="SELECT"?Array.from(o.options).map(m=>m.textContent):[],styles:{color:r.color,backgroundColor:r.backgroundColor,fontSize:r.fontSize,fontWeight:r.fontWeight,fontFamily:r.fontFamily,width:o.style.width||r.width,height:o.style.height||r.height}},"*")},!0),x.addEventListener("click",t=>{const o=t.target.closest("button");if(!o||!e)return;const r=o.dataset.action;if(r==="edit"){const a=e.textContent;e.setAttribute("contenteditable","true"),e.focus(),e.addEventListener("blur",()=>{e.removeAttribute("contenteditable"),e.textContent!==a&&(le(e,"textContent",a),I("changeText",e,"textContent",e.textContent))},{once:!0})}if(r==="move"){e.classList.add("editor-dragging"),s=!0;const a=e.getBoundingClientRect(),l=e.parentElement,u=a.width/2,m=a.height/2;let v=null;he(e),e.style.position;const c=e.style.left,b=e.style.top,S=e.style.width,B=e.style.margin,k=e.style.zIndex;e.style.position="fixed",e.style.zIndex="999999",e.style.width=a.width+"px",e.style.left=a.left+"px",e.style.top=a.top+"px",e.style.margin="0";const A=R=>{const V=R.clientX-u,T=R.clientY-m;e.style.left=V+"px",e.style.top=T+"px";const U=e.getBoundingClientRect(),L=xe(e,U.left,U.top);L.snapped&&(e.style.left=V+L.left-U.left+"px",e.style.top=T+L.top-U.top+"px"),_e(e.getBoundingClientRect()),e.style.visibility="hidden";const ne=document.elementFromPoint(R.clientX,R.clientY);e.style.visibility="";let N=ne;for(;N&&N!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(N.tagName)&&N.offsetWidth>80&&N.offsetHeight>30&&N!==e);)N=N.parentElement;v&&v!==N&&v.classList.remove("frame-drop-highlight"),N&&N!==document.body&&N!==e&&N!==l?(N.classList.add("frame-drop-highlight"),v=N):v=null,J(e)},w=R=>{s=!1,e.classList.remove("editor-dragging"),re(),document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",w),v&&v.classList.remove("frame-drop-highlight"),e.style.visibility="hidden";const V=document.elementFromPoint(R.clientX,R.clientY);e.style.visibility="";let T=V;for(;T&&T!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(T.tagName)&&T.offsetWidth>80&&T.offsetHeight>30&&T!==e);)T=T.parentElement;const U=e.getBoundingClientRect();if(T&&T!==document.body&&T!==l){const L=T.getBoundingClientRect();T.style.position=T.style.position||"relative",e.style.position="absolute",e.style.left=U.left-L.left+"px",e.style.top=U.top-L.top+"px",e.style.width=S,e.style.margin="0",e.style.zIndex="99999",T.appendChild(e)}else{const L=U.left-a.left,ne=U.top-a.top;e.style.position="relative",e.style.width=S,e.style.margin=B,e.style.zIndex=k||"",e.style.left=(parseFloat(c)||0)+L+"px",e.style.top=(parseFloat(b)||0)+ne+"px"}J(e),be(e),I("changeStyle",e,"left",e.style.left),I("changeStyle",e,"top",e.style.top),I("info",null,"","↕️ Elemento reubicado.")};document.addEventListener("mousemove",A),document.addEventListener("mouseup",w)}if(r==="copy"&&(localStorage.setItem("sb_clipboard",e.outerHTML),I("info",null,"","📋 Elemento copiado. Usa Ctrl+V para pegar.")),r==="duplicate"){const a=e.cloneNode(!0);a.classList.remove("editor-highlight"),a.style.position="relative",a.style.top="10px",e.parentNode.insertBefore(a,e.nextSibling),le(e,"duplicate",""),I("info",null,"","⧉ Elemento duplicado.")}if(r==="delete"){const a=e.style.display;le(e,"display",a),e.style.display="none",I("changeStyle",e,"display","none"),ce()}r==="settings"&&window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:e.tagName.toLowerCase(),selector:Z(e),textContent:e.textContent,className:e.className,id:e.id},"*")});let me=!1,W="",j={};y.addEventListener("mousedown",t=>{const o=t.target.closest(".resize-handle");!o||!e||(t.preventDefault(),t.stopPropagation(),me=!0,W=o.dataset.dir,e.getBoundingClientRect(),j={x:t.clientX,y:t.clientY,w:e.offsetWidth,h:e.offsetHeight,left:parseFloat(e.style.left)||0,top:parseFloat(e.style.top)||0})}),document.addEventListener("mousemove",t=>{if(!me||!e)return;const o=t.clientX-j.x,r=t.clientY-j.y;if(W.includes("e")&&!W.includes("w")&&(e.style.width=Math.max(20,j.w+o)+"px"),W.includes("w")&&!W.includes("e")){const a=Math.max(20,j.w-o);e.style.width=a+"px",e.style.position=e.style.position||"relative",e.style.left=j.left+(j.w-a)+"px"}if(W.includes("s")&&!W.includes("n")&&(e.style.height=Math.max(20,j.h+r)+"px"),W.includes("n")&&!W.includes("s")){const a=Math.max(20,j.h-r);e.style.height=a+"px",e.style.position=e.style.position||"relative",e.style.top=j.top+(j.h-a)+"px"}J(e)}),document.addEventListener("mouseup",()=>{me&&e&&(me=!1,I("changeStyle",e,"width",e.style.width),e.style.height&&I("changeStyle",e,"height",e.style.height),e.style.left&&I("changeStyle",e,"left",e.style.left),e.style.top&&I("changeStyle",e,"top",e.style.top),Re(e))}),document.addEventListener("keydown",t=>{if(i){if(t.key==="Escape"&&ce(),t.key==="Delete"&&e&&!e.hasAttribute("contenteditable")&&(e.style.display="none",I("changeStyle",e,"display","none"),ce()),e&&!e.hasAttribute("contenteditable")&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.key)){t.preventDefault(),e.style.position="relative";const o=t.shiftKey?10:1;t.key==="ArrowUp"&&(e.style.top=(parseFloat(e.style.top)||0)-o+"px"),t.key==="ArrowDown"&&(e.style.top=(parseFloat(e.style.top)||0)+o+"px"),t.key==="ArrowLeft"&&(e.style.left=(parseFloat(e.style.left)||0)-o+"px"),t.key==="ArrowRight"&&(e.style.left=(parseFloat(e.style.left)||0)+o+"px");const r=e.getBoundingClientRect(),a=xe(e,r.left,r.top);if(a.snapped){const l=a.left-r.left,u=a.top-r.top;Math.abs(l)<g*2&&(e.style.left=(parseFloat(e.style.left)||0)+l+"px"),Math.abs(u)<g*2&&(e.style.top=(parseFloat(e.style.top)||0)+u+"px")}J(e),_e(e.getBoundingClientRect()),clearTimeout(window._guideTimer),window._guideTimer=setTimeout(re,800)}if(t.ctrlKey&&t.key==="z"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(t.preventDefault(),Se()),t.ctrlKey&&t.key==="y"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(t.preventDefault(),Ee()),t.ctrlKey&&t.key==="d"&&e){t.preventDefault();const o=e.cloneNode(!0);o.classList.remove("editor-highlight"),o.style.position="relative",o.style.top="10px",e.parentNode.insertBefore(o,e.nextSibling),I("info",null,"","⧉ Duplicado (Ctrl+D).")}}});function Se(){if(d.length===0)return;const t=d.pop(),o=document.querySelector(t.selector);if(!o){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo deshacer (elemento no encontrado)."},"*");return}const r=t.property==="textContent"?o.textContent:o.style[t.property];n.push({...t,newValue:r}),t.property==="textContent"?o.textContent=t.oldValue:t.property==="__fullStyle"?o.style.cssText=t.oldValue:o.style[t.property]=t.oldValue,e&&J(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↩️ Deshecho."},"*")}function Ee(){if(n.length===0)return;const t=n.pop(),o=document.querySelector(t.selector);if(!o){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo rehacer (elemento no encontrado)."},"*");return}d.push({...t}),t.property==="textContent"?o.textContent=t.newValue:t.property==="__fullStyle"?o.style.cssText=t.newValue:o.style[t.property]=t.newValue,e&&J(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↪️ Rehecho."},"*")}window.addEventListener("message",t=>{if(!t.data)return;if(t.data.type==="ENABLE_EDIT_MODE"&&(i=!0,q.classList.add("visible")),t.data.type==="DISABLE_EDIT_MODE"&&(i=!1,ce(),q.classList.remove("visible")),t.data.type==="UNDO_ACTION"&&Se(),t.data.type==="REDO_ACTION"&&Ee(),t.data.type==="DELETE_SELECTED"&&e&&(le(e,"visibility",e.style.visibility),e.style.visibility="hidden",e.style.pointerEvents="none",I("changeStyle",e,"visibility","hidden"),ce()),t.data.type==="DUPLICATE_SELECTED"&&e){const a=e.cloneNode(!0);a.classList.remove("editor-highlight"),a.style.position="relative",a.style.top=(parseFloat(e.style.top)||0)+10+"px",a.style.left=(parseFloat(e.style.left)||0)+10+"px",e.parentNode.insertBefore(a,e.nextSibling),$(a),I("info",null,"","⧉ Elemento duplicado.")}if(t.data.type==="APPLY_EFFECT"&&e){const{effect:a,value:l}=t.data,u=e.style[a];e.style[a]=l,le(e,a,u),I("changeStyle",e,a,l)}if(t.data.type==="LAYER_CHANGE"&&e){const a=t.data.direction,l=parseInt(e.style.zIndex)||0;a==="front"?e.style.zIndex="99999":a==="back"?e.style.zIndex="1":a==="up"?e.style.zIndex=String(l+1):a==="down"&&(e.style.zIndex=String(Math.max(0,l-1))),I("changeStyle",e,"zIndex",e.style.zIndex)}if(t.data.type==="EYEDROPPER_MODE"){document.body.style.cursor="crosshair";const a=l=>{l.preventDefault(),l.stopPropagation();const m=window.getComputedStyle(l.target).color;window.parent.postMessage({type:"EYEDROPPER_RESULT",color:m},"*"),document.body.style.cursor="",document.removeEventListener("click",a,!0)};document.addEventListener("click",a,!0)}if(t.data.type==="DROP_ELEMENT_AT"){i=!0;const{html:a,x:l,y:u}=t.data,m=document.createElement("div");m.innerHTML=a;const v=m.firstElementChild;if(!v)return;v.style.position="absolute",v.style.left=l+"px",v.style.top=u+"px",v.style.zIndex="99999",v.style.cursor="move",v.classList.add("admin-inserted");let c=document.elementFromPoint(l,u);for(;c&&c!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(c.tagName)&&c.offsetWidth>80&&c.offsetHeight>30);)c=c.parentElement;if(c&&c!==document.body){const b=c.getBoundingClientRect();c.style.position=c.style.position||"relative",v.style.left=l-b.left+"px",v.style.top=u-b.top+"px",c.appendChild(v)}else document.body.appendChild(v);$(v),d.push({selector:Z(v),property:"display",oldValue:"none",newValue:""}),n=[],I("info",null,"","✅ Elemento insertado en el frame.")}if(t.data.type==="PASTE_CLIPBOARD"){const a=localStorage.getItem("sb_clipboard");if(!a)return;const l=document.createElement("div");l.innerHTML=a;const u=l.firstElementChild;if(!u)return;u.classList.remove("editor-highlight"),u.style.position="relative",u.style.top="10px",u.style.left="10px",u.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(u,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(u),$(u),d.push({selector:Z(u),property:"display",oldValue:"none",newValue:""}),n=[],I("info",null,"","📌 Elemento pegado.")}t.data.type==="ENTER_TEXT_MODE"&&(i=!0,p=!0,f={text:t.data.text||"Nuevo texto",fontFamily:t.data.fontFamily||"Bolivar, sans-serif",fontSize:t.data.fontSize||"16px",fontWeight:t.data.fontWeight||"400",color:t.data.color||"#333333",backgroundColor:t.data.backgroundColor||"transparent"},document.body.style.cursor="text",h||(h=document.createElement("div"),h.style.cssText="position:fixed;pointer-events:none;z-index:99999;background:rgba(10,103,65,0.1);border:1px dashed #0a6741;border-radius:4px;padding:4px 10px;display:none;",document.body.appendChild(h)),h.textContent=f.text,h.style.fontFamily=f.fontFamily,h.style.fontSize=f.fontSize,h.style.fontWeight=f.fontWeight,h.style.color="#0a6741",window.parent.postMessage({type:"ADMIN_INFO",message:"📝 Haz clic donde quieras colocar el texto."},"*"));function o(){const a=document.getElementById("app-content")||document.querySelector("main")||document.querySelector(".main-content")||document.body,l=window.innerHeight/2,u=window.innerWidth/2,m=document.elementFromPoint(u,l);if(m&&m!==document.body&&m!==document.documentElement){let v=m;for(;v&&v!==a&&v!==document.body;){const c=v.parentElement;if(c&&["DIV","SECTION","MAIN","ARTICLE","FORM","HEADER"].includes(c.tagName)&&c.children.length>1)return{parent:c,refNode:v.nextSibling};v=c}}return{parent:a,refNode:a.firstChild}}function r(a,l){(!l.style.position||l.style.position==="static")&&(l.style.position="relative");const u=l.getBoundingClientRect(),m=Math.max(0,u.width/2-(a.offsetWidth||100)/2),v=Math.max(0,window.innerHeight/2-u.top);a.style.position="absolute",a.style.left=m+"px",a.style.top=v+"px",a.style.margin="0",l.appendChild(a)}if(t.data.type==="INSERT_TEXT"){const{text:a,fontSize:l,fontWeight:u,color:m,backgroundColor:v}=t.data,c=document.createElement("div");c.textContent=a||"Nuevo texto",c.style.cssText=`position:relative;margin:12px;width:fit-content;font-family:'Roboto Condensed',sans-serif;font-size:${l||"16px"};font-weight:${u||"400"};color:${m||"#1B1B1B"};background:${v||"transparent"};padding:8px 12px;cursor:move;z-index:99999;line-height:140%;`,c.classList.add("admin-inserted");const b=o();r(c,b.parent),$(c),I("info",null,"","📝 Texto insertado.")}if(t.data.type==="INSERT_SHAPE"){const a=document.createElement("div");a.classList.add("admin-inserted");const l=t.data.shape;l==="rect"?a.style.cssText="position:relative;margin:12px;width:200px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:8px;cursor:move;z-index:99999;box-shadow:0 1px 3px rgba(0,0,0,.15);":l==="circle"?a.style.cssText="position:relative;margin:12px;width:120px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:50%;cursor:move;z-index:99999;":a.style.cssText="position:relative;margin:12px;width:80%;max-width:600px;height:2px;background:#CCC;cursor:move;z-index:99999;";const u=o();r(a,u.parent),$(a),I("info",null,"","🔷 Figura insertada.")}if(t.data.type==="INSERT_IMAGE"){const a=document.createElement("img");a.src=t.data.src,a.alt=t.data.name||"",a.classList.add("admin-inserted"),a.style.cssText="position:relative;display:block;margin:12px;max-width:200px;height:auto;cursor:move;z-index:99999;";const l=o();r(a,l.parent),$(a),I("info",null,"","🖼 Imagen insertada.")}if(t.data.type==="INSERT_MODAL"){const a=document.createElement("div");a.classList.add("admin-inserted"),a.style.cssText="position:relative;margin:24px;width:500px;max-width:90%;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.2);padding:32px;cursor:move;z-index:99999;",a.innerHTML='<h3 style="font-family:Roboto Condensed,sans-serif;font-size:20px;color:#016D38;margin-bottom:16px;">Modal Stepper</h3><p style="font-size:14px;color:#666;">Contenido del modal.</p>';const l=o();r(a,l.parent),$(a),I("info",null,"","📋 Modal insertado.")}if(t.data.type==="INSERT_FORM_FIELD"){const{title:a,fieldType:l,placeholder:u,options:m,targetSelector:v}=t.data,c=l||"text",b=document.createElement("div");b.classList.add("admin-inserted"),b.style.cssText="position:relative;margin:12px;cursor:move;z-index:99999;width:311px;max-width:90%;";let S='<div style="display:flex;flex-direction:column;gap:8px;">';S+=`<label style="font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#1B1B1B;">${a||"Campo"}</label>`,c==="select"?S+=`<div style="position:relative;"><select style="width:100%;height:40px;padding:8px 40px 8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;appearance:none;">${(m||["Opción 1"]).map(A=>`<option>${A}</option>`).join("")}</select></div>`:c==="date"?S+=`<input type="date" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;">`:c==="toggle"?S+=`<div style="display:flex;align-items:center;gap:12px;"><div style="width:48px;height:26px;background:#016D38;border-radius:13px;position:relative;"><div style="width:20px;height:20px;background:#fff;border-radius:50%;position:absolute;top:3px;right:3px;box-shadow:0 1px 3px rgba(0,0,0,.2);"></div></div><span style="font-family:'Roboto Condensed',sans-serif;font-size:14px;">Sí</span></div>`:c==="radio"?(S+='<div style="display:flex;flex-direction:column;gap:12px;">',(m||["Opción 1","Opción 2"]).forEach((A,w)=>{S+=`<label style="display:flex;align-items:center;gap:8px;font-family:'Roboto Condensed',sans-serif;font-size:16px;color:#1B1B1B;cursor:pointer;"><div style="width:20px;height:20px;border-radius:50%;border:2px solid #016D38;${w===0?"background:#016D38;":""}"></div>${A}</label>`}),S+="</div>"):S+=`<input type="text" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;" placeholder="${u||"Ingrese aquí"}">`,S+="</div>",b.innerHTML=S;let B=null;if(v)try{B=document.querySelector(v)}catch{}const k=B||o().parent;r(b,k),$(b),I("info",null,"","📋 Campo insertado.")}if(t.data.type==="ADMIN_OVERRIDE"){const{selector:a,property:l,value:u}=t.data;try{if(l==="__appendHTML"){const m=document.createElement("div");m.innerHTML=u;const v=m.firstElementChild;if(v){v.classList.add("admin-inserted");const c=o();c.parent.insertBefore(v,c.refNode)}}else if(l==="__placeholder"){const m=document.querySelector(a);if(m){const v=m.querySelector("input,textarea")||m;v.setAttribute&&v.setAttribute("placeholder",u)}}else if(l==="__label"){const m=document.querySelector(a);if(m){const v=m.querySelector("label");v&&(v.textContent=u)}}else if(l==="__multiStyle"){const m=document.querySelector(a);if(m)try{const v=JSON.parse(u);Object.entries(v).forEach(([c,b])=>{m.style[c]=b})}catch{}}else{const m=document.querySelector(a);m&&(l==="textContent"?m.textContent=u:l==="src"?m.src=u:m.style[l]=u)}}catch{}}if(t.data.type==="UPDATE_PLACEHOLDER")try{const a=document.querySelector(t.data.selector);if(a){const l=a.querySelector("input,textarea")||a;l.setAttribute&&l.setAttribute("placeholder",t.data.value)}}catch{}if(t.data.type==="UPDATE_LABEL")try{const a=document.querySelector(t.data.selector);if(a){const l=a.querySelector("label");l&&(l.textContent=t.data.value)}}catch{}if(t.data.type==="UPDATE_SELECT_OPTIONS")try{const a=document.querySelector(t.data.selector);if(a){const l=a.querySelector("select")||a;l.tagName==="SELECT"&&(l.innerHTML=t.data.options.map(u=>`<option>${u}</option>`).join(""))}}catch{}}),document.addEventListener("keydown",t=>{if(t.ctrlKey&&t.key==="v"&&i){t.preventDefault();const o=localStorage.getItem("sb_clipboard");if(!o)return;const r=document.createElement("div");r.innerHTML=o;const a=r.firstElementChild;if(!a)return;a.classList.remove("editor-highlight"),a.style.position="relative",a.style.top="10px",a.style.left="10px",a.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(a,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(a),$(a),d.push({selector:Z(a),property:"display",oldValue:"none",newValue:""}),n=[],I("info",null,"","📌 Pegado (Ctrl+V).")}t.ctrlKey&&t.key==="c"&&i&&e&&(t.preventDefault(),localStorage.setItem("sb_clipboard",e.outerHTML),I("info",null,"","📋 Copiado (Ctrl+C)."))})}function Fe(i){i.innerHTML=`
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
                  <img src="/vida-proteccion-creditos/Iconos/Name-icon (5).svg" alt="" class="prot-icon prot-icon--field">
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
                  <img src="/vida-proteccion-creditos/Iconos/Name-icon (5).svg" alt="" class="prot-icon prot-icon--field">
                  <input type="text" id="vc-doc-number" placeholder="Ej: 1032508877">
                </div>
              </div>
              <div class="prot-field">
                <label class="prot-field__label">Nombre completo</label>
                <div class="prot-field__input">
                  <img src="/vida-proteccion-creditos/Iconos/user.svg" alt="" class="prot-icon prot-icon--field">
                  <input type="text" id="vc-name" placeholder="Simón Andrés Bolívar Libertador">
                </div>
              </div>
            </div>

            <!-- PHASE 2: 3 campos + checks -->
            <div class="prot-form-card__fields" id="vc-phase-2" style="display:none">
              <div class="prot-field">
                <label class="prot-field__label">Número de celular</label>
                <div class="prot-field__input">
                  <img src="/vida-proteccion-creditos/Iconos/Name-icon (3).svg" alt="" class="prot-icon prot-icon--field">
                  <input type="tel" id="vc-phone" placeholder="3103025462">
                </div>
              </div>
              <div class="prot-field">
                <label class="prot-field__label">Correo electrónico</label>
                <div class="prot-field__input">
                  <img src="/vida-proteccion-creditos/Iconos/Name-icon (4).svg" alt="" class="prot-icon prot-icon--field">
                  <input type="email" id="vc-email" placeholder="tucorreo@email.com">
                </div>
              </div>
              <div class="prot-field">
                <label class="prot-field__label">Fecha de nacimiento</label>
                <div class="prot-field__input">
                  <img src="/vida-proteccion-creditos/Iconos/calendar-day.svg" alt="" class="prot-icon prot-icon--field">
                  <input type="date" id="vc-birthdate">
                </div>
              </div>
              <div class="prot-checks">
                <label class="prot-check"><input type="checkbox" id="vc-habeas" checked><span>Autorizo el <a href="#">tratamiento de mis datos personales</a> y acepto la <a href="#">política de privacidad.</a></span></label>
                <label class="prot-check"><input type="checkbox" id="vc-sms" checked><span>Autorizo el envío de comunicaciones por SMS y correo electrónico.</span></label>
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
              <img src="/vida-proteccion-creditos/Iconos/shield-dog.svg" alt="" style="width:40px;height:40px">
              <span class="prot-card__title" style="font-size:18px">Cubre el 100% del saldo</span>
              <span class="prot-card__period">Si falleces, el seguro paga tu deuda al banco. Tu familia queda libre.</span>
            </div>
          </div>
          <div class="prot-card" style="height:auto;cursor:default">
            <div class="prot-card__price" style="gap:12px">
              <img src="/vida-proteccion-creditos/Iconos/Latido.svg" alt="" style="width:40px;height:40px">
              <span class="prot-card__title" style="font-size:18px">Incapacidad total</span>
              <span class="prot-card__period">Si quedas en incapacidad total y permanente, también se cubre tu deuda.</span>
            </div>
          </div>
          <div class="prot-card" style="height:auto;cursor:default">
            <div class="prot-card__price" style="gap:12px">
              <img src="/vida-proteccion-creditos/Iconos/Group 5726.svg" alt="" style="width:40px;height:40px">
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
  `,Oe()}function Oe(){let i=1;const e=document.getElementById("vc-phase-1"),s=document.getElementById("vc-phase-2"),d=document.getElementById("vc-next-btn"),n=document.getElementById("vc-back-btn"),p=document.getElementById("vc-phase-text"),f=document.getElementById("vc-progress"),h=document.getElementById("vc-dot-1"),E=document.getElementById("vc-dot-2");function g(x){i=x,x===1?(e.style.display="",s.style.display="none",n.style.display="none",d.textContent="Siguiente",p.textContent="Paso 1 de 2",f.style.width="50%",h.classList.add("vc-phase-dot--active"),E.classList.remove("vc-phase-dot--active")):(e.style.display="none",s.style.display="",n.style.display="",d.textContent="Continuar",p.textContent="Paso 2 de 2",f.style.width="100%",h.classList.remove("vc-phase-dot--active"),E.classList.add("vc-phase-dot--active"))}n.addEventListener("click",()=>g(1)),d.addEventListener("click",()=>{if(i===1){const x=document.getElementById("vc-doc-number").value.trim(),y=document.getElementById("vc-name").value.trim();if(!x||!y){Ce(["vc-doc-number","vc-name"]);return}g(2)}else{const x=document.getElementById("vc-phone").value.trim(),y=document.getElementById("vc-email").value.trim(),_=document.getElementById("vc-birthdate").value,C=document.getElementById("vc-habeas").checked,P=document.getElementById("vc-sms").checked;if(!x||!y||!_||!C||!P){Ce(["vc-phone","vc-email","vc-birthdate"]);return}const M=new Date(_),F=new Date;let O=F.getFullYear()-M.getFullYear();const q=F.getMonth()-M.getMonth();if((q<0||q===0&&F.getDate()<M.getDate())&&O--,O<18||O>65){alert("La edad debe estar entre 18 y 65 años para este producto.");return}localStorage.setItem("vc_docType",document.getElementById("vc-doc-type").value),localStorage.setItem("vc_docNumber",document.getElementById("vc-doc-number").value.trim()),localStorage.setItem("vc_name",document.getElementById("vc-name").value.trim()),localStorage.setItem("vc_phone",x),localStorage.setItem("vc_email",y),localStorage.setItem("vc_birthdate",_),localStorage.setItem("vc_age",String(O));const Y=new URL(window.location);Y.searchParams.set("page","credit-data"),window.location.href=Y.toString()}})}function Ce(i){i.forEach(e=>{const s=document.getElementById(e);if(s&&!s.value.trim()){const d=s.closest(".prot-field__input");d&&(d.style.borderColor="#E53935",setTimeout(()=>d.style.borderColor="",2e3))}})}const H={HOME:"home",CREDIT:"credit",QUOTATION:"quotation",COMPLEMENTARY:"complementary",HEALTH:"health",PAYMENT:"payment"};function $e(){return localStorage.getItem("vc_skipHealth")!=="1"}function pe(i){const s=[{id:H.HOME,label:"Datos inicio"},{id:H.CREDIT,label:"Datos de tu crédito"},{id:H.QUOTATION,label:"Tu cotización"},{id:H.COMPLEMENTARY,label:"Datos complementarios"},{id:H.HEALTH,label:"Declaración de asegurabilidad",optional:!0},{id:H.PAYMENT,label:"Confirmación y pago"}].filter(p=>!(p.id===H.HEALTH&&!$e())),d=s.findIndex(p=>p.id===i),n=[];return s.forEach((p,f)=>{const h=f+1,E=f===d,g=d>-1&&f<d,x=g?"sp-step__bullet sp-step__bullet--completed":E?"sp-step__bullet sp-step__bullet--active":"sp-step__bullet",y=g?"&#10003;":String(h),_=E?"sp-step sp-step--active":"sp-step",C=E?"sp-step__label sp-step__label--active":"sp-step__label";n.push(`<div class="${_}"><div class="sp-step__container"><div class="${x}"><span>${y}</span></div></div><span class="${C}">${p.label}</span></div>`),f<s.length-1&&n.push(`<div class="sp-step__line${g?" sp-step__line--completed":""}"></div>`)}),`
    <aside class="sp-stepper">
      <div class="sp-stepper__list">
        ${n.join(`
        `)}
      </div>
    </aside>`}const Ie={18:{life:.45,itp:.15},19:{life:.45,itp:.15},20:{life:.46,itp:.16},21:{life:.47,itp:.16},22:{life:.48,itp:.17},23:{life:.49,itp:.17},24:{life:.5,itp:.18},25:{life:.52,itp:.18},26:{life:.54,itp:.19},27:{life:.56,itp:.2},28:{life:.58,itp:.21},29:{life:.61,itp:.22},30:{life:.64,itp:.23},31:{life:.67,itp:.24},32:{life:.71,itp:.26},33:{life:.75,itp:.27},34:{life:.8,itp:.29},35:{life:.85,itp:.31},36:{life:.91,itp:.33},37:{life:.97,itp:.35},38:{life:1.04,itp:.38},39:{life:1.12,itp:.41},40:{life:1.2,itp:.44},41:{life:1.3,itp:.47},42:{life:1.4,itp:.51},43:{life:1.52,itp:.55},44:{life:1.65,itp:.6},45:{life:1.79,itp:.65},46:{life:1.95,itp:.71},47:{life:2.12,itp:.77},48:{life:2.31,itp:.84},49:{life:2.52,itp:.92},50:{life:2.75,itp:1},51:{life:3,itp:1.09},52:{life:3.28,itp:1.19},53:{life:3.58,itp:1.3},54:{life:3.91,itp:1.42},55:{life:4.27,itp:1.55},56:{life:4.66,itp:0},57:{life:5.09,itp:0},58:{life:5.56,itp:0},59:{life:6.07,itp:0},60:{life:6.63,itp:0},61:{life:7.24,itp:0},62:{life:7.9,itp:0},63:{life:8.63,itp:0},64:{life:9.42,itp:0},65:{life:10.29,itp:0}},Ve=["Bancolombia","Banco de Bogotá","Davivienda","BBVA Colombia","Banco de Occidente","Banco Popular","Banco AV Villas","Scotiabank Colpatria","Banco Caja Social","Banco Falabella","Banco Itaú","Banco Pichincha","Banco W","Bancamía","Banco Agrario","Banco GNB Sudameris"];function He(i){const e=parseInt(localStorage.getItem("vc_age")||"35");i.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo">
          <img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar">
        </div>
      </header>

      <div class="sp-content">
        ${pe(H.CREDIT)}

        <main class="sp-main">
          <div class="sp-back" id="cd-back">
            <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <!-- Título alineado a la izquierda -->
          <div class="cd-heading">
            <h1 class="cd-heading__title">Tu crédito</h1>
            <p class="cd-heading__subtitle">Ingresa los datos de tu crédito para calcular tu prima.</p>
          </div>

          <!-- Layout dos columnas: formulario (izq) + cotización live (der) -->
          <div class="cd-layout">
            <!-- FORMULARIO -->
            <div class="cd-form">
              <!-- Banco -->
              <div class="cd-field">
                <label class="cd-field__label">¿En qué banco tienes tu crédito?</label>
                <div class="vc-autocomplete">
                  <div class="cd-input">
                    <img src="/vida-proteccion-creditos/Iconos/Name-icon (6).svg" alt="" class="cd-input__icon">
                    <input type="text" id="vc-bank" placeholder="Escribe el nombre de tu banco" autocomplete="off">
                  </div>
                  <div class="vc-autocomplete__list" id="vc-bank-list">
                    ${Ve.map(s=>`<div class="vc-autocomplete__item" data-bank="${s}">${s}</div>`).join("")}
                  </div>
                </div>
              </div>

              <!-- Cuánto debes -->
              <div class="cd-field">
                <label class="cd-field__label">¿Cuánto debes actualmente?</label>
                <div class="cd-input">
                  <img src="/vida-proteccion-creditos/Iconos/copy.svg" alt="" class="cd-input__icon">
                  <input type="text" id="vc-debt" inputmode="numeric" placeholder="$50.000.000">
                </div>
              </div>

              <!-- Por cuánto te aseguras (slider) -->
              <div class="cd-field">
                <label class="cd-field__label">¿Por cuánto te aseguras?</label>
                <div class="cd-slider">
                  <div class="cd-slider__value" id="vc-insured-display">$50.000.000</div>
                  <input type="range" class="vc-slider cd-slider__range" id="vc-insured-slider" min="50000000" max="100000000" value="50000000" step="1000000">
                  <div class="cd-slider__labels">
                    <span id="vc-slider-min">Mín: $50.000.000</span>
                    <span id="vc-slider-max">Máx: $100.000.000</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RECUADRO DE COTIZACIÓN (live) -->
            <aside class="cd-quote">
              <div class="cd-quote__badge">
                <img src="/vida-proteccion-creditos/Iconos/shield-dog.svg" alt="" onerror="this.style.display='none'">
                <span>Cotización</span>
              </div>
              <p class="cd-quote__label">Prima estimada mensual</p>
              <div class="cd-quote__amount">
                <span id="vc-prima-display">$37.500</span>
                <span class="cd-quote__period">/mes</span>
              </div>
              <p class="cd-quote__annual" id="vc-prima-annual">Anual: $450.000</p>
              <div class="cd-quote__divider"></div>
              <div class="cd-quote__row">
                <span>Valor asegurado</span>
                <strong id="vc-quote-insured">$50.000.000</strong>
              </div>
              <p class="cd-quote__note">El valor se actualiza en tiempo real según tus datos.</p>
              <button class="prot-btn prot-btn--cta prot-btn--pill prot-btn--block" id="cd-continue">Cotizar mi seguro</button>
            </aside>
          </div>
        </main>
      </div>
    </div>
  `,Ge(e)}function Ge(i){const e=document.getElementById("vc-bank"),s=document.getElementById("vc-bank-list"),d=document.getElementById("vc-debt"),n=document.getElementById("vc-insured-slider"),p=document.getElementById("vc-insured-display"),f=document.getElementById("vc-slider-min"),h=document.getElementById("vc-slider-max"),E=document.getElementById("vc-prima-display"),g=document.getElementById("vc-prima-annual");e.addEventListener("focus",()=>s.classList.add("vc-autocomplete__list--visible")),e.addEventListener("input",()=>{const _=e.value.toLowerCase();document.querySelectorAll(".vc-autocomplete__item").forEach(C=>{C.style.display=C.dataset.bank.toLowerCase().includes(_)?"":"none"}),s.classList.add("vc-autocomplete__list--visible")}),document.querySelectorAll(".vc-autocomplete__item").forEach(_=>{_.addEventListener("click",()=>{e.value=_.dataset.bank,s.classList.remove("vc-autocomplete__list--visible")})}),document.addEventListener("click",_=>{_.target.closest(".vc-autocomplete")||s.classList.remove("vc-autocomplete__list--visible")});const x=document.getElementById("vc-quote-insured");d.addEventListener("input",()=>{const _=d.value.replace(/[^0-9]/g,"");if(!_){d.value="";return}const C=parseInt(_,10);d.value=ee(C),n.min=C,n.max=C*2,(parseInt(n.value,10)<C||parseInt(n.value,10)>C*2)&&(n.value=C),f.textContent=`Mín: ${ee(C)}`,h.textContent=`Máx: ${ee(C*2)}`;const P=parseInt(n.value,10);p.textContent=ee(P),y(P)}),n.addEventListener("input",()=>{const _=parseInt(n.value,10);p.textContent=ee(_),y(_)});function y(_){const C=Ie[i]||Ie[35],P=C.life,M=C.itp,F=Math.round((P+M)*_/1e3),O=Math.round(F/12);E.textContent=ee(O),g.textContent=`Anual: ${ee(F)}`,x&&(x.textContent=ee(_));const q=E.closest(".cd-quote__amount");q&&(q.classList.add("cd-quote__amount--pulse"),clearTimeout(q._pulseT),q._pulseT=setTimeout(()=>q.classList.remove("cd-quote__amount--pulse"),200)),localStorage.setItem("vc_insuredValue",String(_)),localStorage.setItem("vc_annualPrima",String(F)),localStorage.setItem("vc_monthlyPrima",String(O)),localStorage.setItem("vc_itpActive","1"),localStorage.setItem("vc_lifeRate",String(P)),localStorage.setItem("vc_itpRate",String(M)),localStorage.setItem("vc_skipHealth",_<=15e7?"1":"0")}y(parseInt(n.value)),document.getElementById("cd-back").addEventListener("click",()=>{window.location.href=window.location.pathname}),document.getElementById("cd-continue").addEventListener("click",()=>{const _=e.value.trim(),C=d.value.replace(/[^0-9]/g,"");if(!_){const M=e.closest(".cd-input");M&&(M.style.borderColor="#E53935",setTimeout(()=>M.style.borderColor="",2e3));return}if(!C){const M=d.closest(".cd-input");M&&(M.style.borderColor="#E53935",setTimeout(()=>M.style.borderColor="",2e3));return}localStorage.setItem("vc_bank",_),localStorage.setItem("vc_debt",C);const P=new URL(window.location);P.searchParams.set("page","quotation"),window.location.href=P.toString()})}function ee(i){return"$"+i.toLocaleString("es-CO")}function je(i){const e=parseInt(localStorage.getItem("vc_monthlyPrima")||"37500"),s=parseInt(localStorage.getItem("vc_annualPrima")||"450000"),d=parseInt(localStorage.getItem("vc_insuredValue")||"50000000"),n=localStorage.getItem("vc_bank")||"Tu banco",f=(localStorage.getItem("vc_phone")||"3103025462").slice(-4),h=E=>"$"+E.toLocaleString("es-CO");i.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo">
          <img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar">
        </div>
      </header>

      <div class="sp-content">
        ${pe(H.QUOTATION)}

        <main class="sp-main">
          <div class="sp-back" id="qt-back">
            <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <div class="pd-form-wrapper">
            <!-- Quotation result card -->
            <div class="vc-quote-card">
              <h2 style="font-family:var(--prot-font);font-weight:600;font-size:24px;color:#1B1B1B;text-align:center">Tu cotización</h2>
              <p style="font-family:var(--prot-font);font-size:14px;color:#5B5B5B;text-align:center">Protección de crédito con ${n}</p>

              <!-- Price -->
              <div class="vc-quote-card__price">
                <span class="vc-quote-card__amount" id="qt-price-display">${h(e)}</span>
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
                Pago anual: ${h(s)} (ahorra 2 meses)
              </div>

              <!-- Coverages -->
              <div class="vc-quote-card__coverages">
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).svg" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Muerte por cualquier causa</span>
                  <span class="vc-quote-coverage__value">${h(d)}</span>
                </div>
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).svg" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Incapacidad total y permanente</span>
                  <span class="vc-quote-coverage__value">${h(d)}</span>
                </div>
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).svg" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Beneficiario: ${n}</span>
                  <span class="vc-quote-coverage__value">100%</span>
                </div>
              </div>

              <!-- CTAs -->
              <div style="display:flex;flex-direction:column;gap:12px;width:100%;margin-top:8px">
                <button class="prot-btn prot-btn--cta prot-btn--pill prot-btn--block" id="qt-continue" style="min-height:48px;font-size:18px">Quiero este seguro</button>
                <div style="display:flex;gap:12px;width:100%">
                  <button class="prot-btn prot-btn--ghost prot-btn--pill" id="qt-save" style="flex:1;font-size:13px">Guardar y decidir después</button>
                  <button class="prot-btn prot-btn--ghost prot-btn--pill" id="qt-pdf" style="flex:1;font-size:13px">
                    <img src="/vida-proteccion-creditos/Iconos/download.svg" alt="" style="width:16px;height:16px"> Descargar PDF
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
              <img src="/vida-proteccion-creditos/Iconos/mobile-button.svg" alt="" class="otp-modal__phone-icon">
              <span class="otp-modal__phone-number">*** *** ${f}</span>
            </div>
          </div>
          <div class="otp-modal__input-section">
            <label class="otp-modal__label">Ingresa el código de 6 dígitos:</label>
            <div class="otp-modal__input-wrapper">
              <input type="text" id="otp-input" class="otp-modal__input" placeholder="Ej: 111111" maxlength="6">
              <img src="/vida-proteccion-creditos/Iconos/keyboard.svg" alt="" class="otp-modal__keyboard-icon">
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
            <img src="/vida-proteccion-creditos/Iconos/shield-dog (1).svg" alt="" class="otp-success__pictogram">
          </div>
          <div class="otp-success__body">
            <h2 class="otp-success__title">Identidad verificada</h2>
            <p class="otp-success__text">Preparando tu solicitud...</p>
          </div>
          <div class="otp-success__spinner">
            <img src="/vida-proteccion-creditos/Iconos/Ellipse 350.svg" alt="" class="otp-success__spinner-img">
          </div>
        </div>
      </div>
    </div>
  `,Ue(e,s)}function Ue(i,e){const s=_=>"$"+_.toLocaleString("es-CO");let d=!0;const n=document.getElementById("qt-price-display"),p=document.getElementById("qt-period-label"),f=document.getElementById("qt-alt-price"),h=document.getElementById("qt-period-toggle"),E=document.getElementById("qt-lbl-monthly"),g=document.getElementById("qt-lbl-annual");h.addEventListener("click",()=>{d=!d,h.classList.toggle("vc-toggle--active",d),d?(n.textContent=s(i),p.textContent="/mes",f.textContent=`Pago anual: ${s(e)} (ahorra 2 meses)`,E.style.color="#009056",E.style.fontWeight="700",g.style.color="#757575",g.style.fontWeight="400"):(n.textContent=s(e),p.textContent="/año",f.textContent=`Pago mensual: ${s(i)}`,g.style.color="#009056",g.style.fontWeight="700",E.style.color="#757575",E.style.fontWeight="400"),localStorage.setItem("vc_periodicity",d?"monthly":"annual")}),document.getElementById("qt-back").addEventListener("click",()=>{const _=new URL(window.location);_.searchParams.set("page","credit-data"),window.location.href=_.toString()}),document.getElementById("qt-save").addEventListener("click",()=>{alert("Tu cotización ha sido guardada. Podrás retomarla cuando quieras.")}),document.getElementById("qt-pdf").addEventListener("click",()=>{alert("Descargando PDF de tu cotización...")}),document.getElementById("qt-continue").addEventListener("click",()=>{localStorage.setItem("vc_periodicity",d?"monthly":"annual"),document.getElementById("otp-overlay").classList.add("otp-overlay--visible")});const x=document.getElementById("otp-input"),y=document.getElementById("otp-validate");x.addEventListener("input",()=>{const _=x.value.replace(/\D/g,"");x.value=_,_.length===6?(y.disabled=!1,y.classList.add("otp-modal__btn-validate--active")):(y.disabled=!0,y.classList.remove("otp-modal__btn-validate--active"))}),y.addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible"),document.getElementById("success-overlay").classList.add("otp-overlay--visible"),setTimeout(()=>{const _=new URL(window.location);_.searchParams.set("page","complementary"),window.location.href=_.toString()},2500)}),document.getElementById("otp-close").addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible")}),document.getElementById("otp-cancel").addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible")})}const Te={Amazonas:["El Encanto","La Chorrera","La Pedrera","La Victoria","Leticia","Miriti Paraná","Puerto Alegría","Puerto Arica","Puerto Nariño","Puerto Santander","Tarapacá"],Antioquia:["Abejorral","Abriaquí","Alejandría","Amagá","Amalfi","Andes","Angelópolis","Angostura","Anorí","Anza","Apartadó","Arboletes","Argelia","Armenia","Barbosa","Bello","Belmira","Betania","Betulia","Briceño","Buriticá","Caicedo","Caldas","Campamento","Caracolí","Caramanta","Carepa","Carolina","Caucasia","Cañasgordas","Chigorodó","Cisneros","Ciudad Bolívar","Cocorná","Concepción","Concordia","Copacabana","Cáceres","Dabeiba","Don Matías","Ebéjico","El Bagre","El Carmen de Viboral","El Santuario","Entrerrios","Envigado","Fredonia","Frontino","Giraldo","Girardota","Granada","Guadalupe","Guarne","Guatapé","Gómez Plata","Heliconia","Hispania","Itagui","Ituango","Jardín","Jericó","La Ceja","La Estrella","La Pintada","La Unión","Liborina","Maceo","Marinilla","Medellín","Montebello","Murindó","Mutatá","Nariño","Nechí","Necoclí","Olaya","Peque","Peñol","Pueblorrico","Puerto Berrío","Puerto Nare","Puerto Triunfo","Remedios","Retiro","Rionegro","Sabanalarga","Sabaneta","Salgar","San Andrés de Cuerquía","San Carlos","San Francisco","San Jerónimo","San José de La Montaña","San Juan de Urabá","San Luis","San Pedro","San Pedro de Uraba","San Rafael","San Roque","San Vicente","Santa Bárbara","Santa Rosa de Osos","Santafé de Antioquia","Santo Domingo","Segovia","Sonsón","Sopetrán","Tarazá","Tarso","Titiribí","Toledo","Turbo","Támesis","Uramita","Urrao","Valdivia","Valparaíso","Vegachí","Venecia","Vigía del Fuerte","Yalí","Yarumal","Yolombó","Yondó","Zaragoza"],Arauca:["Arauca","Arauquita","Cravo Norte","Fortul","Puerto Rondón","Saravena","Tame"],Atlántico:["Baranoa","Barranquilla","Campo de La Cruz","Candelaria","Galapa","Juan de Acosta","Luruaco","Malambo","Manatí","Palmar de Varela","Piojó","Polonuevo","Ponedera","Puerto Colombia","Repelón","Sabanagrande","Sabanalarga","Santa Lucía","Santo Tomás","Soledad","Suan","Tubará","Usiacurí"],"Bogotá D.C.":["Bogotá D.C."],Bolívar:["Achí","Altos del Rosario","Arenal","Arjona","Arroyohondo","Barranco de Loba","Calamar","Cantagallo","Cartagena","Cicuco","Clemencia","Córdoba","El Carmen de Bolívar","El Guamo","El Peñón","Hatillo de Loba","Magangué","Mahates","Margarita","María la Baja","Mompós","Montecristo","Morales","Norosí","Pinillos","Regidor","Río Viejo","San Cristóbal","San Estanislao","San Fernando","San Jacinto","San Jacinto del Cauca","San Juan Nepomuceno","San Martín de Loba","San Pablo de Borbur","Santa Catalina","Santa Rosa","Santa Rosa del Sur","Simití","Soplaviento","Talaigua Nuevo","Tiquisio","Turbaco","Turbaná","Villanueva","Zambrano"],Boyacá:["Almeida","Aquitania","Arcabuco","Belén","Berbeo","Betéitiva","Boavita","Boyacá","Briceño","Buena Vista","Busbanzá","Caldas","Campohermoso","Cerinza","Chinavita","Chiquinquirá","Chiscas","Chita","Chitaraque","Chivatá","Chivor","Chíquiza","Ciénega","Coper","Corrales","Covarachía","Cubará","Cucaita","Cuítiva","Cómbita","Duitama","El Cocuy","El Espino","Firavitoba","Floresta","Gachantivá","Gameza","Garagoa","Guacamayas","Guateque","Guayatá","Güicán","Iza","Jenesano","Jericó","La Capilla","La Uvita","La Victoria","Labranzagrande","Macanal","Maripí","Miraflores","Mongua","Monguí","Moniquirá","Motavita","Muzo","Nobsa","Nuevo Colón","Oicatá","Otanche","Pachavita","Paipa","Pajarito","Panqueba","Pauna","Paya","Paz de Río","Pesca","Pisba","Puerto Boyacá","Páez","Quípama","Ramiriquí","Rondón","Ráquira","Saboyá","Samacá","San Eduardo","San José de Pare","San Luis de Gaceno","San Mateo","San Miguel de Sema","San Pablo de Borbur","Santa María","Santa Rosa de Viterbo","Santa Sofía","Santana","Sativanorte","Sativasur","Siachoque","Soatá","Socha","Socotá","Sogamoso","Somondoco","Sora","Soracá","Sotaquirá","Susacón","Sutamarchán","Sutatenza","Sáchica","Tasco","Tenza","Tibaná","Tibasosa","Tinjacá","Tipacoque","Toca","Togüí","Tota","Tunja","Tununguá","Turmequé","Tuta","Tutazá","Tópaga","Umbita","Ventaquemada","Villa de Leyva","Viracachá","Zetaquira"],Caldas:["Aguadas","Anserma","Aranzazu","Belalcázar","Chinchiná","Filadelfia","La Dorada","La Merced","Manizales","Manzanares","Marmato","Marquetalia","Marulanda","Neira","Norcasia","Palestina","Pensilvania","Pácora","Riosucio","Risaralda","Salamina","Samaná","San José","Supía","Victoria","Villamaría","Viterbo"],Caquetá:["Albania","Belén de Los Andaquies","Cartagena del Chairá","Curillo","El Doncello","El Paujil","Florencia","La Montañita","Milán","Morelia","Puerto Rico","San José del Fragua","San Vicente del Caguán","Solano","Solita","Valparaíso"],Casanare:["Aguazul","Chámeza","Hato Corozal","La Salina","Maní","Monterrey","Nunchía","Orocué","Paz de Ariporo","Pore","Recetor","Sabanalarga","San Luis de Gaceno","Sácama","Tauramena","Trinidad","Támara","Villanueva","Yopal"],Cauca:["Almaguer","Argelia","Balboa","Bolívar","Buenos Aires","Cajibío","Caldono","Caloto","Corinto","El Tambo","Florencia","Guachené","Guapi","Inzá","Jambaló","La Sierra","La Vega","López","Mercaderes","Miranda","Morales","Padilla","Patía","Piamonte","Piendamó","Popayán","Puerto Tejada","Puracé","Páez","Rosas","San Sebastián","Santa Rosa","Santander de Quilichao","Silvia","Sotara","Sucre","Suárez","Timbiquí","Timbío","Toribio","Totoró","Villa Rica"],Cesar:["Aguachica","Agustín Codazzi","Astrea","Becerril","Bosconia","Chimichagua","Chiriguaná","Curumaní","El Copey","El Paso","Gamarra","González","La Gloria","La Jagua de Ibirico","La Paz","Manaure","Pailitas","Pelaya","Pueblo Bello","Río de Oro","San Alberto","San Diego","San Martín","Tamalameque","Valledupar"],Chocó:["Acandí","Alto Baudo","Atrato","Bagadó","Bahía Solano","Bajo Baudó","Belén de Bajira","Bojaya","Carmen del Darien","Condoto","Cértegui","El Cantón del San Pablo","El Carmen de Atrato","El Litoral del San Juan","Istmina","Juradó","Lloró","Medio Atrato","Medio Baudó","Medio San Juan","Nuquí","Nóvita","Quibdó","Riosucio","Río Iro","Río Quito","San José del Palmar","Sipí","Tadó","Unguía","Unión Panamericana"],Cundinamarca:["Agua de Dios","Albán","Anapoima","Anolaima","Apulo","Arbeláez","Beltrán","Bituima","Bojacá","Cabrera","Cachipay","Cajicá","Caparrapí","Caqueza","Carmen de Carupa","Chaguaní","Chipaque","Choachí","Chocontá","Chía","Cogua","Cota","Cucunubá","El Colegio","El Peñón","El Rosal","Facatativá","Fomeque","Fosca","Funza","Fusagasugá","Fúquene","Gachala","Gachancipá","Gachetá","Gama","Girardot","Granada","Guachetá","Guaduas","Guasca","Guataquí","Guatavita","Guayabal de Siquima","Guayabetal","Gutiérrez","Jerusalén","Junín","La Calera","La Mesa","La Palma","La Peña","La Vega","Lenguazaque","Macheta","Madrid","Manta","Medina","Mosquera","Nariño","Nemocón","Nilo","Nimaima","Nocaima","Pacho","Paime","Pandi","Paratebueno","Pasca","Puerto Salgar","Pulí","Quebradanegra","Quetame","Quipile","Ricaurte","San Antonio del Tequendama","San Bernardo","San Cayetano","San Francisco","San Juan de Río Seco","Sasaima","Sesquilé","Sibaté","Silvania","Simijaca","Soacha","Sopó","Subachoque","Suesca","Supatá","Susa","Sutatausa","Tabio","Tausa","Tena","Tenjo","Tibacuy","Tibirita","Tocaima","Tocancipá","Topaipí","Ubalá","Ubaque","Une","Venecia","Vergara","Vianí","Villa de San Diego de Ubate","Villagómez","Villapinzón","Villeta","Viotá","Yacopí","Zipacón","Zipaquirá","Útica"],Córdoba:["Ayapel","Buenavista","Canalete","Cereté","Chimá","Chinú","Ciénaga de Oro","Cotorra","La Apartada","Lorica","Los Córdobas","Momil","Montelíbano","Montería","Moñitos","Planeta Rica","Pueblo Nuevo","Puerto Escondido","Puerto Libertador","Purísima","Sahagún","San Andrés Sotavento","San Antero","San Bernardo del Viento","San Carlos","San José de Uré","San Pelayo","Tierralta","Tuchín","Valencia"],Guainía:["Barranco Minas","Cacahual","Inírida","La Guadalupe","Mapiripana","Morichal","Pana Pana","Puerto Colombia","San Felipe"],Guaviare:["Calamar","El Retorno","Miraflores","San José del Guaviare"],Huila:["Acevedo","Agrado","Aipe","Algeciras","Altamira","Baraya","Campoalegre","Colombia","Elías","Garzón","Gigante","Guadalupe","Hobo","Iquira","Isnos","La Argentina","La Plata","Neiva","Nátaga","Oporapa","Paicol","Palermo","Palestina","Pital","Pitalito","Rivera","Saladoblanco","San Agustín","Santa María","Suaza","Tarqui","Tello","Teruel","Tesalia","Timaná","Villavieja","Yaguará"],"La Guajira":["Albania","Barrancas","Dibula","Distracción","El Molino","Fonseca","Hatonuevo","La Jagua del Pilar","Maicao","Manaure","Riohacha","San Juan del Cesar","Uribia","Urumita","Villanueva"],Magdalena:["Algarrobo","Aracataca","Ariguaní","Cerro San Antonio","Chivolo","Ciénaga","Concordia","El Banco","El Piñon","El Retén","Fundación","Guamal","Nueva Granada","Pedraza","Pijiño del Carmen","Pivijay","Plato","Pueblo Viejo","Remolino","Sabanas de San Angel","Salamina","San Sebastián de Buenavista","San Zenón","Santa Ana","Santa Bárbara de Pinto","Santa Marta","Sitionuevo","Tenerife","Zapayán","Zona Bananera"],Meta:["Acacias","Barranca de Upía","Cabuyaro","Castilla la Nueva","Cubarral","Cumaral","El Calvario","El Castillo","El Dorado","Fuente de Oro","Granada","Guamal","La Macarena","Lejanías","Mapiripán","Mesetas","Puerto Concordia","Puerto Gaitán","Puerto Lleras","Puerto López","Puerto Rico","Restrepo","San Carlos de Guaroa","San Juan de Arama","San Juanito","San Martín","Uribe","Villavicencio","Vista Hermosa"],Nariño:["Albán","Aldana","Ancuyá","Arboleda","Barbacoas","Belén","Buesaco","Chachagüí","Colón","Consaca","Contadero","Cuaspud","Cumbal","Cumbitara","Córdoba","El Charco","El Peñol","El Rosario","El Tablón de Gómez","El Tambo","Francisco Pizarro","Funes","Guachucal","Guaitarilla","Gualmatán","Iles","Imués","Ipiales","La Cruz","La Florida","La Llanada","La Tola","La Unión","Leiva","Linares","Los Andes","Magüí","Mallama","Mosquera","Nariño","Olaya Herrera","Ospina","Pasto","Policarpa","Potosí","Providencia","Puerres","Pupiales","Ricaurte","Roberto Payán","Samaniego","San Andrés de Tumaco","San Bernardo","San Lorenzo","San Pablo","San Pedro de Cartago","Sandoná","Santa Bárbara","Santacruz","Sapuyes","Taminango","Tangua","Túquerres","Yacuanquer"],"Norte de Santander":["Abrego","Arboledas","Bochalema","Bucarasica","Cachirá","Chinácota","Chitagá","Convención","Cucutilla","Cácota","Cúcuta","Durania","El Carmen","El Tarra","El Zulia","Gramalote","Hacarí","Herrán","La Esperanza","La Playa","Labateca","Los Patios","Lourdes","Mutiscua","Ocaña","Pamplona","Pamplonita","Puerto Santander","Ragonvalia","Salazar","San Calixto","San Cayetano","Santiago","Sardinata","Silos","Teorama","Tibú","Toledo","Villa Caro","Villa del Rosario"],"Providencia y Santa Catalina":["Providencia, Archipiélago de San Andrés","San Andrés, Archipiélago de San Andrés"],Putumayo:["Colón","Leguízamo","Mocoa","Orito","Puerto Asís","Puerto Caicedo","Puerto Guzmán","San Francisco","San Miguel","Santiago","Sibundoy","Valle de Guamez","Villagarzón"],Quindío:["Armenia","Buenavista","Calarcá","Circasia","Córdoba","Filandia","Génova","La Tebaida","Montenegro","Pijao","Quimbaya","Salento"],Risaralda:["Apía","Balboa","Belén de Umbría","Dosquebradas","Guática","La Celia","La Virginia","Marsella","Mistrató","Pereira","Pueblo Rico","Quinchía","Santa Rosa de Cabal","Santuario"],Santander:["Aguada","Albania","Aratoca","Barbosa","Barichara","Barrancabermeja","Betulia","Bolívar","Bucaramanga","Cabrera","California","Capitanejo","Carcasí","Cepitá","Cerrito","Charalá","Charta","Chimá","Chipatá","Cimitarra","Concepción","Confines","Contratación","Coromoro","Curití","El Carmen de Chucurí","El Guacamayo","El Peñón","El Playón","Encino","Enciso","Floridablanca","Florián","Galán","Gambita","Girón","Guaca","Guadalupe","Guapotá","Guavatá","Güepsa","Hato","Jesús María","Jordán","La Belleza","La Paz","Landázuri","Lebríja","Los Santos","Macaravita","Matanza","Mogotes","Molagavita","Málaga","Ocamonte","Oiba","Onzaga","Palmar","Palmas del Socorro","Piedecuesta","Pinchote","Puente Nacional","Puerto Parra","Puerto Wilches","Páramo","Rionegro","Sabana de Torres","San Andrés","San Benito","San Gil","San Joaquín","San José de Miranda","San Miguel","San Vicente de Chucurí","Santa Bárbara","Santa Helena del Opón","Simacota","Socorro","Suaita","Sucre","Suratá","Tona","Valle de San José","Vetas","Villanueva","Vélez","Zapatoca"],Sucre:["Buenavista","Caimito","Chalán","Coloso","Corozal","Coveñas","El Roble","Galeras","Guaranda","La Unión","Los Palmitos","Majagual","Morroa","Ovejas","Palmito","Sampués","San Benito Abad","San Juan de Betulia","San Luis de Sincé","San Marcos","San Onofre","San Pedro","Santiago de Tolú","Sincelejo","Sucre","Tolú Viejo"],Tolima:["Alpujarra","Alvarado","Ambalema","Anzoátegui","Armero","Ataco","Cajamarca","Carmen de Apicala","Casabianca","Chaparral","Coello","Coyaima","Cunday","Dolores","Espinal","Falan","Flandes","Fresno","Guamo","Herveo","Honda","Ibagué","Icononzo","Lérida","Líbano","Mariquita","Melgar","Murillo","Natagaima","Ortega","Palocabildo","Piedras","Planadas","Prado","Purificación","Rio Blanco","Roncesvalles","Rovira","Saldaña","San Antonio","San Luis","Santa Isabel","Suárez","Valle de San Juan","Venadillo","Villahermosa","Villarrica"],"Valle del Cauca":["Alcalá","Andalucía","Ansermanuevo","Argelia","Bolívar","Buenaventura","Bugalagrande","Caicedonia","Cali","Calima","Candelaria","Cartago","Dagua","El Cairo","El Cerrito","El Dovio","El Águila","Florida","Ginebra","Guacarí","Guadalajara de Buga","Jamundí","La Cumbre","La Unión","La Victoria","Obando","Palmira","Pradera","Restrepo","Riofrío","Roldanillo","San Pedro","Sevilla","Toro","Trujillo","Tuluá","Ulloa","Versalles","Vijes","Yotoco","Yumbo","Zarzal"],Vaupés:["Caruru","Mitú","Pacoa","Papunaua","Taraira","Yavaraté"],Vichada:["Cumaribo","La Primavera","Puerto Carreño","Santa Rosalía"]},Ye=Object.keys(Te);function Je(i){return Te[i]||[]}function we(i){return(i||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function We(i,e){const s=we(e);return s?i.filter(d=>we(d).includes(s)):i.slice()}function Xe(i){localStorage.getItem("vc_name"),localStorage.getItem("vc_email");const e=localStorage.getItem("vc_bank")||"Bancolombia",s=parseInt(localStorage.getItem("vc_debt")||"50000000"),d=parseInt(localStorage.getItem("vc_insuredValue")||"50000000"),n=d>s,p=Math.round(s/d*100),f=100-p,h=localStorage.getItem("vc_skipHealth")==="1";i.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo">
          <img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar">
        </div>
      </header>

      <div class="sp-content">
        ${pe(H.COMPLEMENTARY)}

        <main class="sp-main">
          <div class="sp-back" id="comp-back">
            <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <!-- Título alineado a la izquierda -->
          <div class="cd-heading">
            <h1 class="cd-heading__title">Complementa tus datos</h1>
            <p class="cd-heading__subtitle">Completa la información para activar tu seguro.</p>
          </div>

          <div class="cd-single">
            <!-- SECTION A: Datos personales faltantes -->
            <div class="vc-collapsible vc-collapsible--open" id="sec-personal" data-step="1">
              <div class="vc-collapsible__header">
                <div class="vc-collapsible__title">
                  <img src="/vida-proteccion-creditos/Iconos/user.svg" alt="">
                  <span>Datos personales</span>
                </div>
                <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="vc-collapsible__chevron">
              </div>
              <div class="vc-collapsible__body">
                <div style="display:flex;flex-direction:column;gap:16px">
                  <div class="pd-field">
                    <label class="pd-field__label">Género</label>
                    <div class="pd-field__chips">
                      <button class="pd-chip" data-value="M">Masculino</button>
                      <button class="pd-chip" data-value="F">Femenino</button>
                    </div>
                  </div>
                  <div class="pd-field">
                    <label class="pd-field__label" for="comp-dept">Departamento</label>
                    <div class="vc-ac" data-ac="dept">
                      <div class="pd-field__select">
                        <input type="text" id="comp-dept" class="vc-ac__input" placeholder="Selecciona o escribe"
                               autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list"
                               aria-controls="comp-dept-list" data-qa-id="vc-comp-input_departamento">
                        <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="pd-field__chevron">
                      </div>
                      <ul class="vc-ac__list" id="comp-dept-list" role="listbox" aria-label="Departamentos"></ul>
                    </div>
                  </div>
                  <div class="pd-field">
                    <label class="pd-field__label" for="comp-city">Ciudad</label>
                    <div class="vc-ac" data-ac="city">
                      <div class="pd-field__select">
                        <input type="text" id="comp-city" class="vc-ac__input" placeholder="Primero elige departamento"
                               autocomplete="off" role="combobox" aria-expanded="false" aria-autocomplete="list"
                               aria-controls="comp-city-list" disabled data-qa-id="vc-comp-input_ciudad">
                        <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="pd-field__chevron">
                      </div>
                      <ul class="vc-ac__list" id="comp-city-list" role="listbox" aria-label="Ciudades"></ul>
                    </div>
                  </div>
                  <div class="pd-field">
                    <label class="pd-field__label">Dirección de residencia</label>
                    <div class="pd-field__input">
                      <input type="text" id="comp-address" placeholder="Ej: Calle 100 # 15-20 Apto 301">
                    </div>
                  </div>
                  <div class="pd-field" ${h?'style="display:none"':""}>
                    <label class="pd-field__label">¿A qué te dedicas?</label>
                    <div class="pd-field__input">
                      <input type="text" id="comp-occupation" placeholder="Ej: Ingeniero de sistemas, Docente, Comerciante">
                    </div>
                  </div>
                  <div class="pd-field" ${h?'style="display:none"':""}>
                    <label class="pd-field__label">Situación laboral</label>
                    <div class="pd-field__select">
                      <select id="comp-labor">
                        <option value="" disabled selected>Selecciona</option>
                        <option>Empleado</option><option>Independiente</option><option>Servidor público</option>
                      </select>
                      <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="pd-field__chevron">
                    </div>
                  </div>
              </div>
            </div>

            <!-- La Declaración de salud se movió a su propia pantalla (page=health),
                 mostrada solo cuando aplica (vc_skipHealth !== '1'). -->

            <!-- SECTION C: Beneficiarios -->
            <div class="vc-collapsible vc-collapsible--locked" id="sec-beneficiaries" data-step="2">
              <div class="vc-collapsible__header">
                <div class="vc-collapsible__title">
                  <img src="/vida-proteccion-creditos/Iconos/Group 7272.svg" alt="">
                  <span>Beneficiarios</span>
                </div>
                <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="vc-collapsible__chevron">
              </div>
              <div class="vc-collapsible__body">
                <!-- Auto beneficiary (bank) -->
                <div class="vc-beneficiary-auto">
                  <img src="/vida-proteccion-creditos/Iconos/shield-dog.svg" alt="" class="vc-beneficiary-auto__icon">
                  <span class="vc-beneficiary-auto__text"><strong>${e}</strong> recibe el ${p}% del valor asegurado (equivalente a tu deuda).</span>
                </div>

                ${n?`
                <p style="font-size:13px;color:#5B5B5B;margin-bottom:12px">Como tu valor asegurado es mayor a tu deuda, designa un beneficiario libre para el ${f}% restante:</p>
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
                      <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="pd-field__chevron">
                    </div>
                  </div>
                </div>`:`
                <p style="font-size:13px;color:#5B5B5B">Tu banco recibirá el 100% del valor asegurado ya que coincide con tu deuda.</p>
                `}
              </div>
            </div>

            <!-- SECTION D: Número de crédito -->
            <div class="vc-collapsible vc-collapsible--locked" id="sec-credit" data-step="3">
              <div class="vc-collapsible__header">
                <div class="vc-collapsible__title">
                  <img src="/vida-proteccion-creditos/Iconos/copy.svg" alt="">
                  <span>Número de crédito</span>
                </div>
                <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="vc-collapsible__chevron">
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
        <div class="pd-footer__inner">
          <button class="pd-footer__btn pd-footer__btn--disabled" id="comp-continue" disabled>Continuar</button>
        </div>
      </div>
    </div>
  `,Qe()}function Qe(){at(),Ze(),tt(),document.getElementById("comp-back").addEventListener("click",()=>{const i=new URL(window.location);i.searchParams.set("page","quotation"),window.location.href=i.toString()}),document.getElementById("comp-continue").addEventListener("click",ot)}function Ze(){var i,e,s,d;document.querySelectorAll(".vc-collapsible__header").forEach(n=>{n.addEventListener("click",()=>{const p=n.closest(".vc-collapsible");if(p.classList.contains("vc-collapsible--locked"))return;const f=!p.classList.contains("vc-collapsible--open");document.querySelectorAll(".vc-collapsible").forEach(h=>h.classList.remove("vc-collapsible--open")),f&&p.classList.add("vc-collapsible--open")})}),document.querySelectorAll(".cd-single input, .cd-single select, .cd-single .pd-chip").forEach(n=>{n.addEventListener("input",se),n.addEventListener("change",se),n.addEventListener("click",se)}),(i=document.getElementById("sec-beneficiaries"))==null||i.classList.add("vc-collapsible--locked"),(e=document.getElementById("sec-beneficiaries"))==null||e.classList.remove("vc-collapsible--open"),(s=document.getElementById("sec-credit"))==null||s.classList.add("vc-collapsible--locked"),(d=document.getElementById("sec-credit"))==null||d.classList.remove("vc-collapsible--open"),se()}function ge(){var E,g,x;const i=document.querySelector(".pd-chip--active"),e=(E=document.getElementById("comp-dept"))==null?void 0:E.value.trim(),s=(g=document.getElementById("comp-city"))==null?void 0:g.value.trim(),d=(x=document.getElementById("comp-address"))==null?void 0:x.value.trim(),n=document.getElementById("comp-occupation"),p=document.getElementById("comp-labor"),f=!Le(n)||!!n.value.trim(),h=!Le(p)||!!p.value.trim();return!!(i&&e&&s&&d&&f&&h)}function Pe(){const i=document.getElementById("comp-benef-name");if(!i)return!0;const e=document.getElementById("comp-benef-rel");return!!(i.value.trim()&&e&&e.value.trim())}function Ke(){const i=document.getElementById("comp-credit-number");return!!(i&&i.value.trim())}function Le(i){return i?(i.closest(".pd-field")||i).offsetParent!==null:!1}function se(){var s,d;const i=document.getElementById("sec-beneficiaries"),e=document.getElementById("sec-credit");i&&(ge()?i.classList.contains("vc-collapsible--locked")&&(i.classList.remove("vc-collapsible--locked"),(s=document.getElementById("sec-personal"))==null||s.classList.remove("vc-collapsible--open"),i.classList.add("vc-collapsible--open")):(i.classList.add("vc-collapsible--locked"),i.classList.remove("vc-collapsible--open"))),e&&(ge()&&Pe()&&!(i!=null&&i.classList.contains("vc-collapsible--locked"))?e.classList.contains("vc-collapsible--locked")&&(e.classList.remove("vc-collapsible--locked"),(d=document.getElementById("sec-beneficiaries"))==null||d.classList.remove("vc-collapsible--open"),e.classList.add("vc-collapsible--open")):(e.classList.add("vc-collapsible--locked"),e.classList.remove("vc-collapsible--open"))),et()}function et(){const i=document.getElementById("comp-continue");if(!i)return;const e=ge()&&Pe()&&Ke();i.classList.toggle("pd-footer__btn--disabled",!e),i.disabled=!e}function tt(){document.querySelectorAll(".pd-chip").forEach(i=>{i.addEventListener("click",()=>{i.closest(".pd-field__chips").querySelectorAll(".pd-chip").forEach(e=>e.classList.remove("pd-chip--active")),i.classList.add("pd-chip--active"),se()})})}function at(){const i=document.getElementById("comp-dept"),e=document.getElementById("comp-city"),s=document.getElementById("comp-dept-list"),d=document.getElementById("comp-city-list"),n=()=>{de(i,s),de(e,d)};Be(i,s,()=>Ye,p=>{i.value=p,e.value="",e.disabled=!1,e.placeholder="Selecciona o escribe",de(i,s),se()}),Be(e,d,()=>Je(i.value.trim()),p=>{e.value=p,de(e,d),se()}),document.addEventListener("click",p=>{p.target.closest(".vc-ac")||n()})}function Be(i,e,s,d){const n=p=>{const f=s(),h=We(f,p);e.innerHTML=h.map(E=>`<li class="vc-ac__item" role="option" tabindex="-1" data-value="${E}">${E}</li>`).join(""),h.length?(e.classList.add("vc-ac__list--visible"),i.setAttribute("aria-expanded","true")):de(i,e),e.querySelectorAll(".vc-ac__item").forEach(E=>{E.addEventListener("mousedown",g=>{g.preventDefault(),d(E.dataset.value)})})};i.addEventListener("focus",()=>{i.disabled||n("")}),i.addEventListener("click",()=>{i.disabled||n(i.value)}),i.addEventListener("input",()=>n(i.value))}function de(i,e){e.classList.remove("vc-ac__list--visible"),e.innerHTML="",i.setAttribute("aria-expanded","false")}function ot(){var x,y,_,C,P,M;const i=((x=document.querySelector(".pd-chip--active"))==null?void 0:x.dataset.value)||"",e=((y=document.getElementById("comp-dept"))==null?void 0:y.value.trim())||"",s=((_=document.getElementById("comp-city"))==null?void 0:_.value.trim())||"",d=((C=document.getElementById("comp-address"))==null?void 0:C.value)||"",n=((P=document.getElementById("comp-occupation"))==null?void 0:P.value)||"",p=((M=document.getElementById("comp-credit-number"))==null?void 0:M.value)||"";localStorage.setItem("vc_gender",i),localStorage.setItem("vc_dept",e),localStorage.setItem("vc_city",s),localStorage.setItem("vc_address",d),localStorage.setItem("vc_occupation",n),localStorage.setItem("vc_creditNumber",p);const f=document.getElementById("comp-benef-name"),h=document.getElementById("comp-benef-rel");if(f){const F=f.value.trim(),O=(h==null?void 0:h.value)||"";localStorage.setItem("vc_hasSecondInsured","1"),localStorage.setItem("vc_insuredName",F||"Beneficiario"),localStorage.setItem("vc_beneficiaryRel",O),localStorage.removeItem("vc_insuredGender")}else localStorage.setItem("vc_hasSecondInsured","0"),localStorage.removeItem("vc_insuredName"),localStorage.removeItem("vc_beneficiaryRel"),localStorage.removeItem("vc_insuredGender");const E=localStorage.getItem("vc_skipHealth")==="1",g=new URL(window.location);g.searchParams.set("page",E?"summary":"health"),window.location.href=g.toString()}const ie="/vida-proteccion-creditos";function it(){const i=localStorage.getItem("vc_name")||"Simón Andrés Bolívar Libertad",e=localStorage.getItem("vc_gender")||"M";return[{id:"holder",name:i,gender:e,icon:`${ie}/Iconos/user-shield.svg`}]}const ve=[{title:"¿Tiene, ha tenido o esta en estudio de enfermedades del corazón o del sistema cardiovascular?",detail:"Hipertensión arterial, arritmias, enfermedad coronaria, infarto cardíaco, angina, afecciones de las válvulas del corazón, evento cerebrovascular, tromboembolismo, trombosis, accidente isquémico transitorio, aneurismas."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades endocrinas, metabólicas?",detail:"Diabetes, pre diabetes, resistencia a la insulina, nódulos tiroideos, hipertiroidismo, hiperprolactinemia, Enfermedad de Graves, Obesidad, Enfermedad de Addison, Enfermedad de Cushing, Cirugía Bariátrica."},{title:"Está tomando algún medicamento actualmente o está bajo algún tratamiento médico, terapia y/o rehabilitación:",detail:"Física, psicología, fonoaudiología, ocupacional, neuropsicología. En caso afirmativo indique nombre de medicamento y/o tratamiento, y el diagnóstico."},{title:"¿Está embarazada actualmente o sospecha que está embarazada?",onlyGender:"F"},{title:"¿Tiene, ha tenido o esta en estudio de Enfermedades autoinmunes o el colágeno?",detail:"Lupus, artritis reumatoidea, vasculitis, espondilitis, colitis ulcerativa, esclerodermia, glomerulopatías o enfermedad del colágeno no determinada, miastenia gravis, síndrome de sjögren, esclerosis lateral amiotrófica, fibrosis quística, enfermedades tipificadas como huérfanas, artritis psoriásica, artritis reumatoidea, espondilitis anquilosante."},{title:"¿Tiene, ha tenido o esta en estudio de Enfermedades o eventos neurológicos?",detail:"Evento cerebrovascular, accidente isquémico transitorio, trombosis, epilepsia, convulsiones, esclerosis múltiple, alzheimer, guillain barre, parálisis, tumores cerebrales, migraña o cefaleas crónicas, neuralgias, meningitis, aneurismas cerebrales, fístulas, hidrocefalia, parkinson, TEC (Traumatismo craneoencefálico), neuropatías.",detail2Title:"¿y/ o Lesión en órganos de los sentidos?",detail2:"Pérdida o disminución visual, Pérdida o disminución auditiva, Desviación del Tabique nasal."},{title:"¿Tiene, ha tenido o esta en estudio de alteración del desarrollo y/o desorden psiquiátrico?",detail:"Depresión, ansiedad, trastorno bipolar, esquizofrenia, déficit de atención, hiperactividad, trastorno del espectro autista, alteraciones del lenguaje o desarrollo psicomotor, trastornos alimenticios, autismo, dependencia al alcohol, consumo y/o dependencia a drogas ilícitas, psicotrópicas, demencia."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades, amputaciones o lesiones de los huesos o articulaciones?",detail:"Hombro, tobillo, rodillas, cadera, codo, dedos de las manos, muñeca, dedos de los pies, afecciones en meniscos, luxaciones, artrosis, fracturas, alguna afección y/o desviación de la columna, hernias discales, osteoporosis, distrofia muscular, gota, artritis gotosa o síndrome de lobstein."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades pulmonares?",detail:"Asma, EPOC (enfermedad pulmonar obstructiva crónica), síndrome bronco obstructivo recurrente, nódulos pulmonares, Fibrosis pulmonar, enfisema pulmonar, trasplante pulmonar."},{title:"¿Cáncer o similares?",detail:"Linfoma, leucemia, tumores, masas, nódulos, quistes, lesiones premalignas, pólipos, lipomas, fibromas, nevos o lunares, mujeres (nódulos mamarios).",important:"De acuerdo con lo dispuesto en la ley 2475 del 2025, si terminó su tratamiento contra el cáncer hace más de 4 años sin recaídas posteriores (si el cáncer fue diagnosticado siendo menor de edad, el tiempo anterior se disminuirá a 2 años) no debe reportar este antecedente."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades de riñones, próstata (hombres) o aparato urogenital?",detail:"Cálculos, cólico renal, hiperplasia de la próstata, insuficiencia renal, glomerulonefritis, sangre en la orina, proteínas en la orina, síndrome nefrótico, Infección de vías urinarias recurrentes, incontinencia urinaria, cistocele, prolapso uterino, vejiga neurogénica."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades del hígado, gástricas, colón?",detail:"Cirrosis, hepatitis C, pólipos en colon, úlceras, colitis, divertículos, enfermedad por reflujo gastroesofágico, esófago de barrett, hernia(s) (diafragmática, hiatal, inguinal, umbilical), cálculos biliares, pancreatitis aguda y/o crónica,  enfermedad de crohn, sangrados del tubo digestivo, rectocele."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades de la sangre o infecciosa?",detail:"Trastornos de la coagulación, talasemia, trombocitopenia, leucopenia, anemia actual, leucemia, hemofilia, infección por VIH y/o VIH - SIDA, púrpura trombocitopénica, síndrome antifosfolípidos, virus del papiloma humano."},{title:"¿Algún tratamiento médico y/o quirúrgico pendiente?",detail:"y/o alguna enfermedad no mencionada en las preguntas anteriores o  enfermedades congénitas/genéticas o malformaciones."},{title:"¿Algún tipo de discapacidad que le impida desempeñar sus tareas diarias o ha tenido en el último año alguna incapacidad medica por tiempo mayor a 1 mes?",detail:"Detalle la discapacidad del titular y/o asegurado"}];let te={},D=0;function st(i){if(localStorage.getItem("vc_skipHealth")==="1"){const e=new URL(window.location);e.searchParams.set("page","summary"),window.location.replace(e.toString());return}te={},D=0,i.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo">
          <img src="${ie}/images/logo-seguros-bolivar.png" alt="Seguros Bolívar">
        </div>
      </header>

      <div class="sp-content">
        <!-- STEPPER (5 pasos, "Complementa" activo) -->
        ${pe(H.HEALTH)}

        <main class="sp-main">
          <div class="sp-back" id="hs-back">
            <img src="${ie}/Iconos/angle-left.svg" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <div class="hs-wrapper">
            <div class="hs-title-row">
              <img src="${ie}/Iconos/Latido.svg" alt="" class="hs-title-icon" onerror="this.style.display='none'">
              <h1 class="hs-title">Declaración de salud</h1>
            </div>

            <div class="hs-card" id="hs-card"><!-- render dinámico --></div>
          </div>

        </main>
      </div>

      <!-- FOOTER con flechas de navegación (barra continua de extremo a extremo) -->
      <div class="pd-footer hs-footer">
        <div class="pd-footer__inner hs-footer__inner">
          <button class="hs-nav hs-nav--prev" id="hs-prev" aria-label="Anterior">
            <img src="${ie}/Iconos/angle-left.svg" alt="" class="hs-nav__icon">
          </button>
          <button class="hs-nav hs-nav--next" id="hs-next" aria-label="Siguiente">
            <img src="${ie}/Iconos/angle-right.svg" alt="" class="hs-nav__icon">
          </button>
        </div>
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
  `,nt()}function nt(){var s,d,n,p,f;const i=document.getElementById("hs-modal-overlay");i.classList.add("hs-modal-overlay--visible");const e=()=>i.classList.remove("hs-modal-overlay--visible");(s=document.getElementById("hs-modal-close"))==null||s.addEventListener("click",e),(d=document.getElementById("hs-modal-continue"))==null||d.addEventListener("click",e),(n=document.getElementById("hs-back"))==null||n.addEventListener("click",()=>{const h=new URL(window.location);h.searchParams.set("page","complementary"),window.location.href=h.toString()}),(p=document.getElementById("hs-prev"))==null||p.addEventListener("click",lt),(f=document.getElementById("hs-next"))==null||f.addEventListener("click",ct),fe()}function ke(i){const e=it();return i.onlyGender?e.filter(s=>s.gender===i.onlyGender):e}function fe(){const i=ve[D],e=document.getElementById("hs-card"),s=ke(i),d=s.map(n=>{var f;const p=((f=te[D])==null?void 0:f[n.id])||"";return`
      <div class="hs-person" data-person="${n.id}">
        <div class="hs-person__info">
          <img src="${n.icon}" alt="" class="hs-person__icon" onerror="this.style.display='none'">
          <span class="hs-person__name">${n.name}</span>
        </div>
        <div class="hs-person__options">
          <button class="hs-opt ${p==="S"?"hs-opt--active":""}" data-value="S">Sí</button>
          <button class="hs-opt ${p==="N"?"hs-opt--active":""}" data-value="N">No</button>
        </div>
      </div>
    `}).join("");e.innerHTML=`
    <div class="hs-counter">${D+1}/${ve.length}</div>
    <div class="hs-question">
      <h3 class="hs-question__title">${i.title}</h3>
      ${i.detail?`<p class="hs-question__detail">${i.detail}</p>`:""}
      ${i.detail2Title?`<h3 class="hs-question__title hs-question__title--sub">${i.detail2Title}</h3>`:""}
      ${i.detail2?`<p class="hs-question__detail">${i.detail2}</p>`:""}
    </div>
    ${i.important?`
      <div class="hs-important">
        <img src="${ie}/Iconos/info-circle.svg" alt="" class="hs-important__icon" onerror="this.style.display='none'">
        <div class="hs-important__text">
          <span class="hs-important__label">Importante</span>
          <p>${i.important}</p>
        </div>
      </div>`:""}
    ${s.length?`<div class="hs-people">${d}</div>`:'<p class="hs-question__detail">Esta pregunta no aplica para los asegurados de esta póliza.</p>'}
  `,e.querySelectorAll(".hs-person").forEach(n=>{const p=n.dataset.person;n.querySelectorAll(".hs-opt").forEach(f=>{f.addEventListener("click",()=>{te[D]||(te[D]={}),te[D][p]=f.dataset.value,n.querySelectorAll(".hs-opt").forEach(h=>h.classList.remove("hs-opt--active")),f.classList.add("hs-opt--active"),Me()})})}),Me()}function Ne(){const i=ve[D],e=ke(i),s=te[D]||{};return e.every(d=>s[d.id]==="S"||s[d.id]==="N")}function Me(){const i=document.getElementById("hs-prev"),e=document.getElementById("hs-next");i.classList.toggle("hs-nav--disabled",D===0),i.disabled=D===0;const s=Ne();e.classList.toggle("hs-nav--active",s),e.disabled=!s}function lt(){D!==0&&(D--,fe())}function ct(){Ne()&&(D<ve.length-1?(D++,fe()):pt())}function rt(){return Object.values(te).some(i=>Object.values(i).some(e=>e==="S"))}function dt(){const i=new Date,e=`${i.getFullYear()}${String(i.getMonth()+1).padStart(2,"0")}${String(i.getDate()).padStart(2,"0")}`,s=Math.floor(1e3+Math.random()*9e3);return`VM-${e}-${s}`}function pt(){if(localStorage.setItem("vc_healthAnswers",JSON.stringify(te)),rt()){const e=dt();localStorage.setItem("vc_medicalReviewCase",e),ut(e);return}const i=new URL(window.location);i.searchParams.set("page","summary"),window.location.href=i.toString()}function ut(i){var d;const e=document.getElementById("hs-review-overlay");if(!e)return;const s=document.getElementById("hs-review-case");s&&(s.textContent=i),e.classList.add("hs-modal-overlay--visible"),(d=document.getElementById("hs-review-home"))==null||d.addEventListener("click",()=>{const n=new URL(window.location);n.searchParams.set("page","home"),n.searchParams.delete("step"),window.location.href=n.toString()})}function mt(i){const e=P=>"$"+parseInt(P).toLocaleString("es-CO"),s=localStorage.getItem("vc_name")||"Simón Andrés Bolívar",d=localStorage.getItem("vc_docNumber")||"1032508877",n=localStorage.getItem("vc_phone")||"3103025462",p=localStorage.getItem("vc_email")||"correo@email.com",f=localStorage.getItem("vc_age")||"35",h=localStorage.getItem("vc_bank")||"Bancolombia",E=localStorage.getItem("vc_insuredValue")||"50000000",g=localStorage.getItem("vc_monthlyPrima")||"37500",x=localStorage.getItem("vc_annualPrima")||"450000",y=localStorage.getItem("vc_periodicity")||"monthly",_=localStorage.getItem("vc_city")||"Bogotá",C=localStorage.getItem("vc_creditNumber")||"12345678";i.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo"><img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar"></div>
      </header>
      <div class="sp-content">
        ${pe(H.PAYMENT)}

        <main class="sp-main">
          <div class="sp-back" id="sum-back"><img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="sp-back__icon"><span class="sp-back__text">Volver</span></div>

          <!-- Título alineado a la izquierda -->
          <div class="cd-heading" style="max-width:860px">
            <h1 class="cd-heading__title">Resumen de tu seguro</h1>
            <p class="cd-heading__subtitle">Verifica que todo esté correcto antes de pagar.</p>
          </div>

          <div class="pf-card cd-summary-card" style="max-width:860px">
            <div class="pf-card__content" style="gap:24px">
              <!-- Two columns -->
              <div style="display:flex;gap:24px;width:100%;flex-wrap:wrap">
                <!-- Left: Plan -->
                <div style="flex:1;min-width:280px">
                  <div class="conf-plan">
                    <div class="conf-plan__header">
                      <img src="/vida-proteccion-creditos/Iconos/shield-dog.svg" alt="" class="conf-plan__icon">
                      <span class="conf-plan__name">Vida Protección Créditos</span>
                    </div>
                    <div class="conf-plan__details">
                      <div class="conf-plan__row"><span class="conf-plan__label">Valor asegurado:</span><span class="conf-plan__value">${e(E)}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Prima ${y==="monthly"?"mensual":"anual"}:</span><span class="conf-plan__value">${e(y==="monthly"?g:x)}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Banco:</span><span class="conf-plan__value--bold">${h}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Crédito #:</span><span class="conf-plan__value--bold">${C}</span></div>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px">
                      <span style="font-size:12px;font-weight:600;color:#0B613E">Coberturas incluidas:</span>
                      <div style="display:flex;align-items:center;gap:8px"><img src="/vida-proteccion-creditos/Iconos/name-icon (8).svg" alt="" style="width:16px"><span style="font-size:13px;color:#303030">Muerte por cualquier causa</span></div>
                      <div style="display:flex;align-items:center;gap:8px"><img src="/vida-proteccion-creditos/Iconos/name-icon (8).svg" alt="" style="width:16px"><span style="font-size:13px;color:#303030">Incapacidad total y permanente</span></div>
                    </div>
                  </div>
                </div>

                <!-- Right: User data -->
                <div style="flex:1;min-width:280px">
                  <div class="conf-data-card">
                    <div class="conf-data-card__header"><img src="/vida-proteccion-creditos/Iconos/user.svg" alt="" class="conf-data-card__icon"><span class="conf-data-card__title">Tus datos</span></div>
                    <div class="conf-data-card__rows">
                      <div class="conf-data-row"><span class="conf-data-row__label">Nombre:</span><span class="conf-data-row__value">${s}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Cédula:</span><span class="conf-data-row__value">${d}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Celular:</span><span class="conf-data-row__value">${n}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Edad:</span><span class="conf-data-row__value">${f} años</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Ciudad:</span><span class="conf-data-row__value">${_}</span></div>
                    </div>
                    <div class="conf-data-card__email" style="margin-top:8px">
                      <span>Enviaremos la póliza a:</span>
                      <span style="font-weight:700;color:#414141">${p}</span>
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
                <label class="pf-check"><input type="checkbox" class="pf-check__input" checked><span>Acepto los <a href="#" style="color:#038450;font-weight:700">Términos y Condiciones</a> del Seguro Vida Protección Créditos.</span></label>
                <label class="pf-check"><input type="checkbox" class="pf-check__input" checked><span>Doy mi consentimiento para firmar electrónicamente la solicitud del seguro.</span></label>
                <label class="pf-check"><input type="checkbox" class="pf-check__input" checked><span>Autorizo a Seguros Bolívar a debitar automáticamente el pago de mi póliza.</span></label>
              </div>
            </div>
          </div>

        </main>
      </div>

      <!-- Footer (barra continua de extremo a extremo) -->
      <div class="pd-footer">
        <div class="pd-footer__inner">
          <button class="pd-footer__btn pd-footer__btn--disabled" id="sum-pay" disabled>Ir a pagar</button>
        </div>
      </div>
    </div>
  `,vt()}function vt(){const i=document.querySelectorAll(".pf-option"),e=document.querySelectorAll(".pf-check__input"),s=document.getElementById("sum-pay");i.forEach(n=>{n.addEventListener("click",()=>{i.forEach(p=>{p.classList.remove("pf-option--selected"),p.querySelector(".pf-option__radio").classList.remove("pf-option__radio--active")}),n.classList.add("pf-option--selected"),n.querySelector(".pf-option__radio").classList.add("pf-option__radio--active"),localStorage.setItem("vc_periodicity",n.dataset.freq==="annual"?"annual":"monthly"),d()})}),e.forEach(n=>n.addEventListener("change",d));function d(){const n=document.querySelector(".pf-option--selected"),p=[...e].every(f=>f.checked);n&&p?(s.disabled=!1,s.classList.remove("pd-footer__btn--disabled")):(s.disabled=!0,s.classList.add("pd-footer__btn--disabled"))}document.getElementById("sum-back").addEventListener("click",()=>{const n=localStorage.getItem("vc_skipHealth")==="1",p=new URL(window.location);p.searchParams.set("page",n?"complementary":"health"),window.location.href=p.toString()}),s.addEventListener("click",()=>{if(!s.disabled){const n=new URL(window.location);n.searchParams.set("page","success"),window.location.href=n.toString()}})}function gt(i){var y,_;const e=C=>"$"+parseInt(C).toLocaleString("es-CO"),s=localStorage.getItem("vc_name")||"Simón Bolívar",d=localStorage.getItem("vc_bank")||"Bancolombia",n=localStorage.getItem("vc_email")||"correo@email.com",p=localStorage.getItem("vc_periodicity")||"monthly",f=localStorage.getItem("vc_monthlyPrima")||"37500",h=localStorage.getItem("vc_annualPrima")||"450000",E=e(p==="monthly"?f:h),g=p==="monthly"?"Mensual":"Anual",x="#VPC-2026-"+Math.floor(1e3+Math.random()*9e3);localStorage.setItem("vc_policyNumber",x),i.innerHTML=`
    <div class="success-page">
      <header class="sp-header">
        <div class="sp-header__logo"><img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar"></div>
      </header>

      <div class="success-banner">
        <div class="success-banner__confetti"></div>
        <div class="success-banner__text">
          <p class="success-banner__subtitle">¡Tu seguro fue activado!</p>
          <h1 class="success-banner__title">Bienvenido a Seguros Bolívar, ${s.split(" ")[0]}</h1>
        </div>
      </div>

      <div class="success-content">
        <div class="success-card">
          <div class="success-card__header">
            <img src="/vida-proteccion-creditos/Iconos/shield-dog (1).svg" alt="" class="success-card__icon">
            <span class="success-card__title">Detalles de tu póliza</span>
          </div>
          <div class="success-card__details">
            <div class="success-card__row"><span class="success-card__label">Producto:</span><span class="success-card__value">Vida Protección Créditos</span></div>
            <div class="success-card__row"><span class="success-card__label">Pago ${g.toLowerCase()}:</span><span class="success-card__value">${E}</span></div>
            <div class="success-card__row"><span class="success-card__label">Banco protegido:</span><span class="success-card__value">${d}</span></div>
            <div class="success-card__row"><span class="success-card__label">Vigencia:</span><span class="success-card__value">18 jun 2026 – 18 jun 2027</span></div>
            <div class="success-card__row"><span class="success-card__label">No. póliza:</span><span class="success-card__value">${x}</span></div>
          </div>
          <div class="success-card__divider"></div>
          <div class="success-card__approval">
            <div class="success-card__approval-label">
              <img src="/vida-proteccion-creditos/Iconos/name-icon (8).svg" alt="" class="success-card__approval-icon">
              <span>Número de aprobación de la compra</span>
            </div>
            <div class="success-card__approval-code">
              <span class="success-card__code">${Math.floor(1e10+Math.random()*9e10)}</span>
              <button class="success-card__copy" id="vc-copy">
                <img src="/vida-proteccion-creditos/Iconos/copy.svg" alt="" class="success-card__copy-icon">
                <span>Copiar</span>
              </button>
            </div>
          </div>
        </div>

        <div class="success-info">
          <p>En un máximo de <strong>12 horas</strong>, enviaremos los detalles de tu seguro al correo electrónico <strong>${n}</strong>.</p>
        </div>

        <button class="success-home-btn" id="vc-home">
          <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="success-home-btn__icon">
          <span>Ir al inicio</span>
        </button>
      </div>
    </div>
  `,(y=document.getElementById("vc-copy"))==null||y.addEventListener("click",()=>{const C=document.querySelector(".success-card__code").textContent;navigator.clipboard.writeText(C).then(()=>{document.querySelector("#vc-copy span").textContent="¡Copiado!",setTimeout(()=>document.querySelector("#vc-copy span").textContent="Copiar",2e3)})}),(_=document.getElementById("vc-home"))==null||_.addEventListener("click",()=>{localStorage.clear(),window.location.href=window.location.pathname})}function ft(){const e=new URLSearchParams(window.location.search).get("page")||"home",s=document.getElementById("app-content");switch(e){case"credit-data":He(s);break;case"quotation":je(s);break;case"complementary":Xe(s);break;case"health":st(s);break;case"summary":mt(s);break;case"success":gt(s);break;case"home":default:Fe(s);break}}window.addEventListener("message",i=>{var e;if(i.data){if(i.data.type==="SAVE_SNAPSHOT"){const s=((e=document.getElementById("app-content"))==null?void 0:e.innerHTML)||document.body.innerHTML;window.parent.postMessage({type:"SNAPSHOT_DATA",html:s,page:i.data.page,projectId:i.data.projectId},"*")}if(i.data.type==="RESTORE_SNAPSHOT"){const s=document.getElementById("app-content");s&&i.data.html&&(s.innerHTML=i.data.html)}if(i.data.type==="NAVIGATE_TO_STEP"){const s=i.data.page;if(s){const d=new URL(window.location);d.searchParams.set("page",s),window.location.href=d.toString()}}if(i.data.type==="ADMIN_OVERRIDE"){const{selector:s,property:d,value:n}=i.data;try{const p=document.querySelector(s);p&&(d==="textContent"?p.textContent=n:d==="src"?p.src=n:p.style.setProperty(d.replace(/([A-Z])/g,"-$1").toLowerCase(),n,"important"))}catch{}}}});function Ae(){ft()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ae):Ae();
