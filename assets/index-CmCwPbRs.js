(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))u(d);new MutationObserver(d=>{for(const m of d)if(m.type==="childList")for(const h of m.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&u(h)}).observe(document,{childList:!0,subtree:!0});function c(d){const m={};return d.integrity&&(m.integrity=d.integrity),d.referrerPolicy&&(m.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?m.credentials="include":d.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function u(d){if(d.ep)return;d.ep=!0;const m=c(d);fetch(d.href,m)}})();window.self===window.top||ke();function ke(){let o=!1,e=null,c=!1,u=[],d=[],m=!1,h={},b=null,T=1e4;const g=5,x=document.createElement("div");x.id="editor-toolbar",x.innerHTML="",x.style.cssText="display:none;position:fixed;z-index:99999;",document.body.appendChild(x);const _=document.createElement("div");_.id="resize-box",_.style.cssText="display:none;position:fixed;z-index:99998;pointer-events:none;border:2px solid #0a6741;",["nw","ne","sw","se","n","s","e","w"].forEach(t=>{const a=document.createElement("div");a.className="resize-handle",a.dataset.dir=t,a.style.cssText=`position:absolute;width:8px;height:8px;background:#0a6741;border-radius:2px;pointer-events:all;cursor:${t}-resize;`;const l={nw:"top:-4px;left:-4px;",ne:"top:-4px;right:-4px;",sw:"bottom:-4px;left:-4px;",se:"bottom:-4px;right:-4px;",n:"top:-4px;left:50%;transform:translateX(-50%);",s:"bottom:-4px;left:50%;transform:translateX(-50%);",e:"top:50%;right:-4px;transform:translateY(-50%);",w:"top:50%;left:-4px;transform:translateY(-50%);"};a.style.cssText+=l[t],_.appendChild(a)}),document.body.appendChild(_);const y=document.createElement("div");y.className="rotate-line",_.appendChild(y);const w=document.createElement("div");w.className="rotate-handle",_.appendChild(w),w.addEventListener("mousedown",t=>{if(!e)return;t.preventDefault(),t.stopPropagation();const a=e.getBoundingClientRect(),l=a.left+a.width/2,s=a.top+a.height/2;parseFloat(e.dataset.rotation||"0");const i=p=>{const v=Math.atan2(p.clientY-s,p.clientX-l)*(180/Math.PI)+90;e.style.transform=`rotate(${Math.round(v)}deg)`,e.dataset.rotation=Math.round(v),G(e)},r=()=>{document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",r),I("changeStyle",e,"transform",e.style.transform)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",r)});const A=document.createElement("div");A.style.cssText="display:none;position:fixed;z-index:99997;background:#E8C916;color:#333;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;pointer-events:none;",document.body.appendChild(A);const k=document.createElement("div");k.id="alignment-guides",k.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99996;",document.body.appendChild(k);const R=document.createElement("div");R.id="text-cursor",R.style.cssText="display:none;position:fixed;z-index:99999;pointer-events:none;",R.innerHTML=`
  <div style="display:flex;align-items:center;gap:4px;">
    <div style="width:2px;height:20px;background:#0a6741;animation:blink 0.8s infinite;"></div>
    <span style="font-size:10px;color:#0a6741;font-weight:600;background:rgba(255,255,255,0.9);padding:1px 6px;border-radius:4px;white-space:nowrap;">Clic para insertar texto</span>
  </div>
`,document.body.appendChild(R);const F=document.createElement("style");F.textContent=`
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
`,document.head.appendChild(F);const D=document.createElement("div");D.id="sb-grid-overlay",D.classList.add("visible");for(let t=0;t<12;t++){const a=document.createElement("div");a.className="sb-grid-col",D.appendChild(a)}document.body.appendChild(D);const j=document.createElement("div");j.id="sb-smart-guides",j.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99994;",document.body.appendChild(j);const X=4;function Se(t,a,l,s){j.innerHTML="";const i=s.left+a,r=s.top+l,p=i+s.width,v=r+s.height,n=i+s.width/2,f=r+s.height/2,E=window.innerWidth/2,L=window.innerHeight/2;Math.abs(n-E)<X&&Q("v",E,"#E8C916","Centro"),Math.abs(f-L)<X&&Q("h",L,"#E8C916","Centro"),document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, img, div.admin-inserted, [class*="card"], [class*="btn"], [class*="hero"], [class*="section"]').forEach(B=>{if(B===t||B.contains(t)||t.contains(B)||B.closest("#sb-resize-box")||B.closest("#sb-smart-guides")||B.closest("#sb-grid-overlay"))return;const S=B.getBoundingClientRect();if(S.width<10||S.height<10)return;const z=S.left+S.width/2,H=S.top+S.height/2;Math.abs(n-z)<X&&Q("v",z,"#0a6741"),Math.abs(f-H)<X&&Q("h",H,"#0a6741"),Math.abs(i-S.left)<X&&Q("v",S.left,"#ff6b6b"),Math.abs(p-S.right)<X&&Q("v",S.right,"#ff6b6b"),Math.abs(r-S.top)<X&&Q("h",S.top,"#ff6b6b"),Math.abs(v-S.bottom)<X&&Q("h",S.bottom,"#ff6b6b")})}function Q(t,a,l,s){const i=document.createElement("div");if(t==="v"?i.style.cssText=`position:fixed;top:0;bottom:0;left:${a}px;width:1px;background:${l};opacity:0.7;`:i.style.cssText=`position:fixed;left:0;right:0;top:${a}px;height:1px;background:${l};opacity:0.7;`,j.appendChild(i),s){const r=document.createElement("div");r.textContent=s,r.style.cssText=`position:fixed;${t==="v"?"left:"+(a+4)+"px;top:8px":"top:"+(a+4)+"px;left:8px"};background:${l};color:#fff;font-size:9px;padding:1px 5px;border-radius:3px;font-family:sans-serif;`,j.appendChild(r)}}function Ce(){j.innerHTML=""}const te=document.createElement("div");te.className="cursor-guide-h",te.style.display="none",document.body.appendChild(te);const se=document.createElement("div");se.className="cursor-guide-v",se.style.display="none",document.body.appendChild(se);function K(t){if(t.id)return"#"+t.id;if(t.className&&typeof t.className=="string"){const s=t.className.trim().split(/\s+/).filter(i=>i!=="editor-highlight"&&i!=="editor-dragging");if(s.length){const i="."+s.join(".");try{if(document.querySelectorAll(i).length===1)return i}catch{}}}const a=[];let l=t;for(;l&&l!==document.body;){let s=l.tagName.toLowerCase();if(l.id){a.unshift("#"+l.id);break}const i=l.parentElement;if(i){const r=Array.from(i.children).filter(p=>p.tagName===l.tagName);r.length>1&&(s+=":nth-of-type("+(r.indexOf(l)+1)+")")}a.unshift(s),l=l.parentElement}return a.join(" > ")}function ie(t,a,l){u.push({selector:K(t),property:a,oldValue:l,newValue:a==="textContent"?t.textContent:a==="__fullStyle"?t.style.cssText:t.style[a]}),d=[]}function ue(t){u.push({selector:K(t),property:"__fullStyle",oldValue:t.style.cssText,newValue:""}),d=[]}function ve(t){u.length>0&&(u[u.length-1].newValue=t.style.cssText)}function G(t){const a=t.getBoundingClientRect();_.style.display="block",_.style.left=a.left+"px",_.style.top=a.top+"px",_.style.width=a.width+"px",_.style.height=a.height+"px"}function Le(t){const a=t.parentElement;if(!a||a===document.body||a===document.documentElement||!["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(a.tagName))return;a.getBoundingClientRect(),t.getBoundingClientRect();const l=(parseFloat(t.style.left)||0)+t.offsetWidth,s=(parseFloat(t.style.top)||0)+t.offsetHeight;l>a.offsetWidth&&(a.style.minWidth=l+"px"),s>a.offsetHeight&&(a.style.minHeight=s+"px")}document.addEventListener("scroll",()=>{e&&!c&&G(e)},!0);function O(t){e&&(e.classList.remove("editor-highlight"),e.removeAttribute("contenteditable")),e=t,e.classList.add("editor-highlight"),G(t)}function ne(){e&&(e.classList.remove("editor-highlight","editor-dragging"),e.removeAttribute("contenteditable")),e=null,x.style.display="none",_.style.display="none",le()}function I(t,a,l,s){window.parent.postMessage({type:t==="info"?"ADMIN_INFO":"ADMIN_CHANGE",action:t,selector:a?K(a):"",property:l,value:s,description:t==="info"?s:`${t}: ${(a==null?void 0:a.tagName)||""}`},"*")}function me(){const t=document.querySelectorAll("body *:not(#editor-toolbar):not(#resize-box):not(#alignment-guides):not(.guide-line):not(.guide-distance):not(.guide-marker):not(#text-cursor):not(script):not(style):not(link)");return Array.from(t).filter(a=>{if(a===e||a.contains(e)||e!=null&&e.contains(a)||a.offsetParent===null&&a.style.position!=="fixed")return!1;const l=a.getBoundingClientRect();return l.width>5&&l.height>5&&l.top<window.innerHeight+50&&l.bottom>-50&&l.left<window.innerWidth+50&&l.right>-50})}function le(){k.innerHTML=""}function ge(t){le();const a=me(),l=t.left+t.width/2,s=t.top+t.height/2,i=window.innerWidth/2,r=window.innerHeight/2,p={h:new Set,v:new Set};Math.abs(l-i)<g&&P("v",i,"viewport"),Math.abs(s-r)<g&&P("h",r,"viewport"),Math.abs(t.left)<g&&P("v",0,"viewport"),Math.abs(t.right-window.innerWidth)<g&&P("v",window.innerWidth,"viewport"),Math.abs(t.top)<g&&P("h",0,"viewport"),a.forEach(v=>{const n=v.getBoundingClientRect(),f=n.left+n.width/2,E=n.top+n.height/2;Math.abs(s-E)<g&&!p.h.has(Math.round(E))&&(p.h.add(Math.round(E)),P("h",E,"center"),ce(l,E),ce(f,E)),Math.abs(t.top-n.top)<g&&!p.h.has(Math.round(n.top))&&(p.h.add(Math.round(n.top)),P("h",n.top,"edge")),Math.abs(t.bottom-n.bottom)<g&&!p.h.has(Math.round(n.bottom))&&(p.h.add(Math.round(n.bottom)),P("h",n.bottom,"edge")),Math.abs(t.top-n.bottom)<g&&!p.h.has(Math.round(n.bottom)+1e3)&&(p.h.add(Math.round(n.bottom)+1e3),P("h",n.bottom,"edge"),Z(l,n.bottom,0,"h")),Math.abs(t.bottom-n.top)<g&&!p.h.has(Math.round(n.top)+2e3)&&(p.h.add(Math.round(n.top)+2e3),P("h",n.top,"edge"),Z(l,n.top,0,"h")),Math.abs(l-f)<g&&!p.v.has(Math.round(f))&&(p.v.add(Math.round(f)),P("v",f,"center"),ce(f,s),ce(f,E)),Math.abs(t.left-n.left)<g&&!p.v.has(Math.round(n.left))&&(p.v.add(Math.round(n.left)),P("v",n.left,"edge")),Math.abs(t.right-n.right)<g&&!p.v.has(Math.round(n.right))&&(p.v.add(Math.round(n.right)),P("v",n.right,"edge")),Math.abs(t.left-n.right)<g&&!p.v.has(Math.round(n.right)+1e3)&&(p.v.add(Math.round(n.right)+1e3),P("v",n.right,"edge"),Z(n.right,s,0,"v")),Math.abs(t.right-n.left)<g&&!p.v.has(Math.round(n.left)+2e3)&&(p.v.add(Math.round(n.left)+2e3),P("v",n.left,"edge"),Z(n.left,s,0,"v"));const L=t.top-n.bottom,N=n.top-t.bottom,B=t.left-n.right,S=n.left-t.right;L>0&&L<60&&Z(l,n.bottom+L/2,Math.round(L),"h"),N>0&&N<60&&Z(l,t.bottom+N/2,Math.round(N),"h"),B>0&&B<60&&Z(n.right+B/2,s,Math.round(B),"v"),S>0&&S<60&&Z(t.right+S/2,s,Math.round(S),"v")})}function P(t,a,l){const s=document.createElement("div");s.className=`guide-line guide-line-${t} guide-line--${l||"edge"}`,t==="h"?s.style.top=a+"px":s.style.left=a+"px",k.appendChild(s)}function ce(t,a,l){const s=document.createElement("div");s.className="guide-marker guide-marker--center",s.style.left=t+"px",s.style.top=a+"px",k.appendChild(s)}function Z(t,a,l,s){if(l<=0)return;const i=document.createElement("div");i.className="guide-distance",i.textContent=l+"px",i.style.left=t+"px",i.style.top=a+"px",i.style.transform="translate(-50%, -50%)",k.appendChild(i)}function fe(t,a,l){const s=t.getBoundingClientRect(),i=s.width,r=s.height,p=me();let v=a,n=l,f=!1;const E=a,L=l,N=a+i,B=l+r,S=a+i/2,z=l+r/2,H=window.innerWidth/2,M=window.innerHeight/2;return Math.abs(S-H)<g&&(v=H-i/2,f=!0),Math.abs(z-M)<g&&(n=M-r/2,f=!0),Math.abs(E)<g&&(v=0,f=!0),Math.abs(N-window.innerWidth)<g&&(v=window.innerWidth-i,f=!0),Math.abs(L)<g&&(n=0,f=!0),p.forEach(W=>{const C=W.getBoundingClientRect(),oe=C.left+C.width/2,q=C.top+C.height/2;Math.abs(z-q)<g&&(n=q-r/2,f=!0),Math.abs(L-C.top)<g&&(n=C.top,f=!0),Math.abs(B-C.bottom)<g&&(n=C.bottom-r,f=!0),Math.abs(L-C.bottom)<g&&(n=C.bottom,f=!0),Math.abs(B-C.top)<g&&(n=C.top-r,f=!0),Math.abs(S-oe)<g&&(v=oe-i/2,f=!0),Math.abs(E-C.left)<g&&(v=C.left,f=!0),Math.abs(N-C.right)<g&&(v=C.right-i,f=!0),Math.abs(E-C.right)<g&&(v=C.right,f=!0),Math.abs(N-C.left)<g&&(v=C.left-i,f=!0)}),{left:v,top:n,snapped:f}}let V=null;document.addEventListener("mouseover",t=>{!o||c||m||t.target===x||x.contains(t.target)||t.target===_||_.contains(t.target)||t.target!==e&&(V&&V!==e&&V.classList.remove("editor-hover"),V=t.target,V.classList.add("editor-hover"))}),document.addEventListener("mouseout",t=>{!o||c||t.target!==e&&V&&(V.classList.remove("editor-hover"),V=null)}),document.addEventListener("mousemove",t=>{if(!o){te.style.display="none",se.style.display="none";return}m&&b&&(b.style.display="block",b.style.left=t.clientX+12+"px",b.style.top=t.clientY+12+"px"),c||(te.style.display="block",se.style.display="block",te.style.top=t.clientY+"px",se.style.left=t.clientX+"px")}),document.addEventListener("mousedown",t=>{if(!o||t.target===x||x.contains(t.target)||t.target===_||_.contains(t.target)||m)return;t.preventDefault(),t.stopPropagation();const a=t.target;O(a),V&&(V.classList.remove("editor-hover"),V=null),te.style.display="none",se.style.display="none";const l=t.clientX,s=t.clientY,i=a.getBoundingClientRect().width;let r=!1;const p=n=>{const f=n.clientX-l,E=n.clientY-s;if(!r)if(Math.abs(f)>8||Math.abs(E)>8)r=!0,c=!0,a.classList.add("editor-dragging"),_.style.display="none",ue(a);else return;a.style.transform=`translate(${f}px, ${E}px)`,a.style.zIndex="99999",Se(a,f,E,a.getBoundingClientRect())},v=n=>{if(document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",v),!r)return;c=!1,a.classList.remove("editor-dragging");const f=n.clientX-l,E=n.clientY-s;if(a.style.transform="",a.style.position==="absolute"||a.style.position==="fixed"){const L=parseFloat(a.style.left)||0,N=parseFloat(a.style.top)||0;a.style.left=L+f+"px",a.style.top=N+E+"px"}else{const L=a.parentElement;if(L&&L!==document.body){(!L.style.position||L.style.position==="static")&&(L.style.position="relative");const N=document.createElement("div");N.style.cssText=`width:${i}px;height:${a.getBoundingClientRect().height}px;visibility:hidden;pointer-events:none;`,L.insertBefore(N,a);const B=a.getBoundingClientRect(),S=L.getBoundingClientRect(),z=B.left-S.left,H=B.top-S.top;a.style.position="absolute",a.style.left=z+f+"px",a.style.top=H+E+"px",a.style.width=i+"px",a.style.margin="0",a.style.zIndex="99999"}}le(),Ce(),ve(a),G(a),I("changeStyle",a,"left",a.style.left),I("changeStyle",a,"top",a.style.top)};document.addEventListener("mousemove",p),document.addEventListener("mouseup",v)},!0),document.addEventListener("click",t=>{if(o&&((t.target.closest("a")||t.target.closest("button")||t.target.tagName==="A"||t.target.tagName==="BUTTON")&&(t.preventDefault(),t.stopPropagation()),!!m&&!(t.target===x||x.contains(t.target)||t.target===_||_.contains(t.target))&&(t.preventDefault(),t.stopPropagation(),m))){T++;const a=window.scrollX,l=window.scrollY,s=document.createElement("div");s.textContent=h.text||"Nuevo texto",s.style.cssText=`position:absolute;left:${t.clientX+a}px;top:${t.clientY+l}px;z-index:${T};font-family:${h.fontFamily||"Bolivar, sans-serif"};font-size:${h.fontSize||"16px"};font-weight:${h.fontWeight||"400"};color:${h.color||"#333"};padding:4px 8px;cursor:move;background:${h.backgroundColor||"transparent"};border-radius:4px;`,document.body.appendChild(s),m=!1,document.body.style.cursor="",b&&(b.style.display="none"),O(s),s.setAttribute("contenteditable","true"),s.focus(),s.addEventListener("blur",()=>{s.removeAttribute("contenteditable")},{once:!0}),I("info",null,"","📝 Texto insertado.")}},!0),document.addEventListener("dblclick",t=>{if(o||(o=!0,window.parent.postMessage({type:"ADMIN_INFO",message:"🎯 Modo edición activado automáticamente."},"*"),window.parent.postMessage({type:"EDIT_MODE_CHANGED",active:!0},"*")),t.target===x||x.contains(t.target)||t.target===_||_.contains(t.target))return;t.preventDefault(),t.stopPropagation();const a=t.target;O(a);const l=window.getComputedStyle(a),s=a.tagName==="IMG"||a.tagName==="SVG",i=["INPUT","SELECT","TEXTAREA"].includes(a.tagName),r=a.tagName==="BUTTON"||a.tagName==="A"||(a.className||"").includes("btn");window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:a.tagName.toLowerCase(),selector:K(a),textContent:(a.textContent||"").substring(0,200),className:a.className||"",id:a.id||"",src:a.src||"",isImage:s,isFormField:i,isText:!s&&!i&&!r,placeholder:a.placeholder||"",label:"",options:a.tagName==="SELECT"?Array.from(a.options).map(p=>p.textContent):[],styles:{color:l.color,backgroundColor:l.backgroundColor,fontSize:l.fontSize,fontWeight:l.fontWeight,fontFamily:l.fontFamily,width:a.style.width||l.width,height:a.style.height||l.height}},"*")},!0),x.addEventListener("click",t=>{const a=t.target.closest("button");if(!a||!e)return;const l=a.dataset.action;if(l==="edit"){const s=e.textContent;e.setAttribute("contenteditable","true"),e.focus(),e.addEventListener("blur",()=>{e.removeAttribute("contenteditable"),e.textContent!==s&&(ie(e,"textContent",s),I("changeText",e,"textContent",e.textContent))},{once:!0})}if(l==="move"){e.classList.add("editor-dragging"),c=!0;const s=e.getBoundingClientRect(),i=e.parentElement,r=s.width/2,p=s.height/2;let v=null;ue(e),e.style.position;const n=e.style.left,f=e.style.top,E=e.style.width,L=e.style.margin,N=e.style.zIndex;e.style.position="fixed",e.style.zIndex="999999",e.style.width=s.width+"px",e.style.left=s.left+"px",e.style.top=s.top+"px",e.style.margin="0";const B=z=>{const H=z.clientX-r,M=z.clientY-p;e.style.left=H+"px",e.style.top=M+"px";const W=e.getBoundingClientRect(),C=fe(e,W.left,W.top);C.snapped&&(e.style.left=H+C.left-W.left+"px",e.style.top=M+C.top-W.top+"px"),ge(e.getBoundingClientRect()),e.style.visibility="hidden";const oe=document.elementFromPoint(z.clientX,z.clientY);e.style.visibility="";let q=oe;for(;q&&q!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(q.tagName)&&q.offsetWidth>80&&q.offsetHeight>30&&q!==e);)q=q.parentElement;v&&v!==q&&v.classList.remove("frame-drop-highlight"),q&&q!==document.body&&q!==e&&q!==i?(q.classList.add("frame-drop-highlight"),v=q):v=null,G(e)},S=z=>{c=!1,e.classList.remove("editor-dragging"),le(),document.removeEventListener("mousemove",B),document.removeEventListener("mouseup",S),v&&v.classList.remove("frame-drop-highlight"),e.style.visibility="hidden";const H=document.elementFromPoint(z.clientX,z.clientY);e.style.visibility="";let M=H;for(;M&&M!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(M.tagName)&&M.offsetWidth>80&&M.offsetHeight>30&&M!==e);)M=M.parentElement;const W=e.getBoundingClientRect();if(M&&M!==document.body&&M!==i){const C=M.getBoundingClientRect();M.style.position=M.style.position||"relative",e.style.position="absolute",e.style.left=W.left-C.left+"px",e.style.top=W.top-C.top+"px",e.style.width=E,e.style.margin="0",e.style.zIndex="99999",M.appendChild(e)}else{const C=W.left-s.left,oe=W.top-s.top;e.style.position="relative",e.style.width=E,e.style.margin=L,e.style.zIndex=N||"",e.style.left=(parseFloat(n)||0)+C+"px",e.style.top=(parseFloat(f)||0)+oe+"px"}G(e),ve(e),I("changeStyle",e,"left",e.style.left),I("changeStyle",e,"top",e.style.top),I("info",null,"","↕️ Elemento reubicado.")};document.addEventListener("mousemove",B),document.addEventListener("mouseup",S)}if(l==="copy"&&(localStorage.setItem("sb_clipboard",e.outerHTML),I("info",null,"","📋 Elemento copiado. Usa Ctrl+V para pegar.")),l==="duplicate"){const s=e.cloneNode(!0);s.classList.remove("editor-highlight"),s.style.position="relative",s.style.top="10px",e.parentNode.insertBefore(s,e.nextSibling),ie(e,"duplicate",""),I("info",null,"","⧉ Elemento duplicado.")}if(l==="delete"){const s=e.style.display;ie(e,"display",s),e.style.display="none",I("changeStyle",e,"display","none"),ne()}l==="settings"&&window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:e.tagName.toLowerCase(),selector:K(e),textContent:e.textContent,className:e.className,id:e.id},"*")});let de=!1,Y="",U={};_.addEventListener("mousedown",t=>{const a=t.target.closest(".resize-handle");!a||!e||(t.preventDefault(),t.stopPropagation(),de=!0,Y=a.dataset.dir,e.getBoundingClientRect(),U={x:t.clientX,y:t.clientY,w:e.offsetWidth,h:e.offsetHeight,left:parseFloat(e.style.left)||0,top:parseFloat(e.style.top)||0})}),document.addEventListener("mousemove",t=>{if(!de||!e)return;const a=t.clientX-U.x,l=t.clientY-U.y;if(Y.includes("e")&&!Y.includes("w")&&(e.style.width=Math.max(20,U.w+a)+"px"),Y.includes("w")&&!Y.includes("e")){const s=Math.max(20,U.w-a);e.style.width=s+"px",e.style.position=e.style.position||"relative",e.style.left=U.left+(U.w-s)+"px"}if(Y.includes("s")&&!Y.includes("n")&&(e.style.height=Math.max(20,U.h+l)+"px"),Y.includes("n")&&!Y.includes("s")){const s=Math.max(20,U.h-l);e.style.height=s+"px",e.style.position=e.style.position||"relative",e.style.top=U.top+(U.h-s)+"px"}G(e)}),document.addEventListener("mouseup",()=>{de&&e&&(de=!1,I("changeStyle",e,"width",e.style.width),e.style.height&&I("changeStyle",e,"height",e.style.height),e.style.left&&I("changeStyle",e,"left",e.style.left),e.style.top&&I("changeStyle",e,"top",e.style.top),Le(e))}),document.addEventListener("keydown",t=>{if(o){if(t.key==="Escape"&&ne(),t.key==="Delete"&&e&&!e.hasAttribute("contenteditable")&&(e.style.display="none",I("changeStyle",e,"display","none"),ne()),e&&!e.hasAttribute("contenteditable")&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.key)){t.preventDefault(),e.style.position="relative";const a=t.shiftKey?10:1;t.key==="ArrowUp"&&(e.style.top=(parseFloat(e.style.top)||0)-a+"px"),t.key==="ArrowDown"&&(e.style.top=(parseFloat(e.style.top)||0)+a+"px"),t.key==="ArrowLeft"&&(e.style.left=(parseFloat(e.style.left)||0)-a+"px"),t.key==="ArrowRight"&&(e.style.left=(parseFloat(e.style.left)||0)+a+"px");const l=e.getBoundingClientRect(),s=fe(e,l.left,l.top);if(s.snapped){const i=s.left-l.left,r=s.top-l.top;Math.abs(i)<g*2&&(e.style.left=(parseFloat(e.style.left)||0)+i+"px"),Math.abs(r)<g*2&&(e.style.top=(parseFloat(e.style.top)||0)+r+"px")}G(e),ge(e.getBoundingClientRect()),clearTimeout(window._guideTimer),window._guideTimer=setTimeout(le,800)}if(t.ctrlKey&&t.key==="z"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(t.preventDefault(),he()),t.ctrlKey&&t.key==="y"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(t.preventDefault(),_e()),t.ctrlKey&&t.key==="d"&&e){t.preventDefault();const a=e.cloneNode(!0);a.classList.remove("editor-highlight"),a.style.position="relative",a.style.top="10px",e.parentNode.insertBefore(a,e.nextSibling),I("info",null,"","⧉ Duplicado (Ctrl+D).")}}});function he(){if(u.length===0)return;const t=u.pop(),a=document.querySelector(t.selector);if(!a){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo deshacer (elemento no encontrado)."},"*");return}const l=t.property==="textContent"?a.textContent:a.style[t.property];d.push({...t,newValue:l}),t.property==="textContent"?a.textContent=t.oldValue:t.property==="__fullStyle"?a.style.cssText=t.oldValue:a.style[t.property]=t.oldValue,e&&G(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↩️ Deshecho."},"*")}function _e(){if(d.length===0)return;const t=d.pop(),a=document.querySelector(t.selector);if(!a){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo rehacer (elemento no encontrado)."},"*");return}u.push({...t}),t.property==="textContent"?a.textContent=t.newValue:t.property==="__fullStyle"?a.style.cssText=t.newValue:a.style[t.property]=t.newValue,e&&G(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↪️ Rehecho."},"*")}window.addEventListener("message",t=>{if(!t.data)return;if(t.data.type==="ENABLE_EDIT_MODE"&&(o=!0,D.classList.add("visible")),t.data.type==="DISABLE_EDIT_MODE"&&(o=!1,ne(),D.classList.remove("visible")),t.data.type==="UNDO_ACTION"&&he(),t.data.type==="REDO_ACTION"&&_e(),t.data.type==="DELETE_SELECTED"&&e&&(ie(e,"visibility",e.style.visibility),e.style.visibility="hidden",e.style.pointerEvents="none",I("changeStyle",e,"visibility","hidden"),ne()),t.data.type==="DUPLICATE_SELECTED"&&e){const s=e.cloneNode(!0);s.classList.remove("editor-highlight"),s.style.position="relative",s.style.top=(parseFloat(e.style.top)||0)+10+"px",s.style.left=(parseFloat(e.style.left)||0)+10+"px",e.parentNode.insertBefore(s,e.nextSibling),O(s),I("info",null,"","⧉ Elemento duplicado.")}if(t.data.type==="APPLY_EFFECT"&&e){const{effect:s,value:i}=t.data,r=e.style[s];e.style[s]=i,ie(e,s,r),I("changeStyle",e,s,i)}if(t.data.type==="LAYER_CHANGE"&&e){const s=t.data.direction,i=parseInt(e.style.zIndex)||0;s==="front"?e.style.zIndex="99999":s==="back"?e.style.zIndex="1":s==="up"?e.style.zIndex=String(i+1):s==="down"&&(e.style.zIndex=String(Math.max(0,i-1))),I("changeStyle",e,"zIndex",e.style.zIndex)}if(t.data.type==="EYEDROPPER_MODE"){document.body.style.cursor="crosshair";const s=i=>{i.preventDefault(),i.stopPropagation();const p=window.getComputedStyle(i.target).color;window.parent.postMessage({type:"EYEDROPPER_RESULT",color:p},"*"),document.body.style.cursor="",document.removeEventListener("click",s,!0)};document.addEventListener("click",s,!0)}if(t.data.type==="DROP_ELEMENT_AT"){o=!0;const{html:s,x:i,y:r}=t.data,p=document.createElement("div");p.innerHTML=s;const v=p.firstElementChild;if(!v)return;v.style.position="absolute",v.style.left=i+"px",v.style.top=r+"px",v.style.zIndex="99999",v.style.cursor="move",v.classList.add("admin-inserted");let n=document.elementFromPoint(i,r);for(;n&&n!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(n.tagName)&&n.offsetWidth>80&&n.offsetHeight>30);)n=n.parentElement;if(n&&n!==document.body){const f=n.getBoundingClientRect();n.style.position=n.style.position||"relative",v.style.left=i-f.left+"px",v.style.top=r-f.top+"px",n.appendChild(v)}else document.body.appendChild(v);O(v),u.push({selector:K(v),property:"display",oldValue:"none",newValue:""}),d=[],I("info",null,"","✅ Elemento insertado en el frame.")}if(t.data.type==="PASTE_CLIPBOARD"){const s=localStorage.getItem("sb_clipboard");if(!s)return;const i=document.createElement("div");i.innerHTML=s;const r=i.firstElementChild;if(!r)return;r.classList.remove("editor-highlight"),r.style.position="relative",r.style.top="10px",r.style.left="10px",r.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(r,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(r),O(r),u.push({selector:K(r),property:"display",oldValue:"none",newValue:""}),d=[],I("info",null,"","📌 Elemento pegado.")}t.data.type==="ENTER_TEXT_MODE"&&(o=!0,m=!0,h={text:t.data.text||"Nuevo texto",fontFamily:t.data.fontFamily||"Bolivar, sans-serif",fontSize:t.data.fontSize||"16px",fontWeight:t.data.fontWeight||"400",color:t.data.color||"#333333",backgroundColor:t.data.backgroundColor||"transparent"},document.body.style.cursor="text",b||(b=document.createElement("div"),b.style.cssText="position:fixed;pointer-events:none;z-index:99999;background:rgba(10,103,65,0.1);border:1px dashed #0a6741;border-radius:4px;padding:4px 10px;display:none;",document.body.appendChild(b)),b.textContent=h.text,b.style.fontFamily=h.fontFamily,b.style.fontSize=h.fontSize,b.style.fontWeight=h.fontWeight,b.style.color="#0a6741",window.parent.postMessage({type:"ADMIN_INFO",message:"📝 Haz clic donde quieras colocar el texto."},"*"));function a(){const s=document.getElementById("app-content")||document.querySelector("main")||document.querySelector(".main-content")||document.body,i=window.innerHeight/2,r=window.innerWidth/2,p=document.elementFromPoint(r,i);if(p&&p!==document.body&&p!==document.documentElement){let v=p;for(;v&&v!==s&&v!==document.body;){const n=v.parentElement;if(n&&["DIV","SECTION","MAIN","ARTICLE","FORM","HEADER"].includes(n.tagName)&&n.children.length>1)return{parent:n,refNode:v.nextSibling};v=n}}return{parent:s,refNode:s.firstChild}}function l(s,i){(!i.style.position||i.style.position==="static")&&(i.style.position="relative");const r=i.getBoundingClientRect(),p=Math.max(0,r.width/2-(s.offsetWidth||100)/2),v=Math.max(0,window.innerHeight/2-r.top);s.style.position="absolute",s.style.left=p+"px",s.style.top=v+"px",s.style.margin="0",i.appendChild(s)}if(t.data.type==="INSERT_TEXT"){const{text:s,fontSize:i,fontWeight:r,color:p,backgroundColor:v}=t.data,n=document.createElement("div");n.textContent=s||"Nuevo texto",n.style.cssText=`position:relative;margin:12px;width:fit-content;font-family:'Roboto Condensed',sans-serif;font-size:${i||"16px"};font-weight:${r||"400"};color:${p||"#1B1B1B"};background:${v||"transparent"};padding:8px 12px;cursor:move;z-index:99999;line-height:140%;`,n.classList.add("admin-inserted");const f=a();l(n,f.parent),O(n),I("info",null,"","📝 Texto insertado.")}if(t.data.type==="INSERT_SHAPE"){const s=document.createElement("div");s.classList.add("admin-inserted");const i=t.data.shape;i==="rect"?s.style.cssText="position:relative;margin:12px;width:200px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:8px;cursor:move;z-index:99999;box-shadow:0 1px 3px rgba(0,0,0,.15);":i==="circle"?s.style.cssText="position:relative;margin:12px;width:120px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:50%;cursor:move;z-index:99999;":s.style.cssText="position:relative;margin:12px;width:80%;max-width:600px;height:2px;background:#CCC;cursor:move;z-index:99999;";const r=a();l(s,r.parent),O(s),I("info",null,"","🔷 Figura insertada.")}if(t.data.type==="INSERT_IMAGE"){const s=document.createElement("img");s.src=t.data.src,s.alt=t.data.name||"",s.classList.add("admin-inserted"),s.style.cssText="position:relative;display:block;margin:12px;max-width:200px;height:auto;cursor:move;z-index:99999;";const i=a();l(s,i.parent),O(s),I("info",null,"","🖼 Imagen insertada.")}if(t.data.type==="INSERT_MODAL"){const s=document.createElement("div");s.classList.add("admin-inserted"),s.style.cssText="position:relative;margin:24px;width:500px;max-width:90%;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.2);padding:32px;cursor:move;z-index:99999;",s.innerHTML='<h3 style="font-family:Roboto Condensed,sans-serif;font-size:20px;color:#016D38;margin-bottom:16px;">Modal Stepper</h3><p style="font-size:14px;color:#666;">Contenido del modal.</p>';const i=a();l(s,i.parent),O(s),I("info",null,"","📋 Modal insertado.")}if(t.data.type==="INSERT_FORM_FIELD"){const{title:s,fieldType:i,placeholder:r,options:p,targetSelector:v}=t.data,n=i||"text",f=document.createElement("div");f.classList.add("admin-inserted"),f.style.cssText="position:relative;margin:12px;cursor:move;z-index:99999;width:311px;max-width:90%;";let E='<div style="display:flex;flex-direction:column;gap:8px;">';E+=`<label style="font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#1B1B1B;">${s||"Campo"}</label>`,n==="select"?E+=`<div style="position:relative;"><select style="width:100%;height:40px;padding:8px 40px 8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;appearance:none;">${(p||["Opción 1"]).map(B=>`<option>${B}</option>`).join("")}</select></div>`:n==="date"?E+=`<input type="date" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;">`:n==="toggle"?E+=`<div style="display:flex;align-items:center;gap:12px;"><div style="width:48px;height:26px;background:#016D38;border-radius:13px;position:relative;"><div style="width:20px;height:20px;background:#fff;border-radius:50%;position:absolute;top:3px;right:3px;box-shadow:0 1px 3px rgba(0,0,0,.2);"></div></div><span style="font-family:'Roboto Condensed',sans-serif;font-size:14px;">Sí</span></div>`:n==="radio"?(E+='<div style="display:flex;flex-direction:column;gap:12px;">',(p||["Opción 1","Opción 2"]).forEach((B,S)=>{E+=`<label style="display:flex;align-items:center;gap:8px;font-family:'Roboto Condensed',sans-serif;font-size:16px;color:#1B1B1B;cursor:pointer;"><div style="width:20px;height:20px;border-radius:50%;border:2px solid #016D38;${S===0?"background:#016D38;":""}"></div>${B}</label>`}),E+="</div>"):E+=`<input type="text" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;" placeholder="${r||"Ingrese aquí"}">`,E+="</div>",f.innerHTML=E;let L=null;if(v)try{L=document.querySelector(v)}catch{}const N=L||a().parent;l(f,N),O(f),I("info",null,"","📋 Campo insertado.")}if(t.data.type==="ADMIN_OVERRIDE"){const{selector:s,property:i,value:r}=t.data;try{if(i==="__appendHTML"){const p=document.createElement("div");p.innerHTML=r;const v=p.firstElementChild;if(v){v.classList.add("admin-inserted");const n=a();n.parent.insertBefore(v,n.refNode)}}else if(i==="__placeholder"){const p=document.querySelector(s);if(p){const v=p.querySelector("input,textarea")||p;v.setAttribute&&v.setAttribute("placeholder",r)}}else if(i==="__label"){const p=document.querySelector(s);if(p){const v=p.querySelector("label");v&&(v.textContent=r)}}else if(i==="__multiStyle"){const p=document.querySelector(s);if(p)try{const v=JSON.parse(r);Object.entries(v).forEach(([n,f])=>{p.style[n]=f})}catch{}}else{const p=document.querySelector(s);p&&(i==="textContent"?p.textContent=r:i==="src"?p.src=r:p.style[i]=r)}}catch{}}if(t.data.type==="UPDATE_PLACEHOLDER")try{const s=document.querySelector(t.data.selector);if(s){const i=s.querySelector("input,textarea")||s;i.setAttribute&&i.setAttribute("placeholder",t.data.value)}}catch{}if(t.data.type==="UPDATE_LABEL")try{const s=document.querySelector(t.data.selector);if(s){const i=s.querySelector("label");i&&(i.textContent=t.data.value)}}catch{}if(t.data.type==="UPDATE_SELECT_OPTIONS")try{const s=document.querySelector(t.data.selector);if(s){const i=s.querySelector("select")||s;i.tagName==="SELECT"&&(i.innerHTML=t.data.options.map(r=>`<option>${r}</option>`).join(""))}}catch{}}),document.addEventListener("keydown",t=>{if(t.ctrlKey&&t.key==="v"&&o){t.preventDefault();const a=localStorage.getItem("sb_clipboard");if(!a)return;const l=document.createElement("div");l.innerHTML=a;const s=l.firstElementChild;if(!s)return;s.classList.remove("editor-highlight"),s.style.position="relative",s.style.top="10px",s.style.left="10px",s.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(s,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(s),O(s),u.push({selector:K(s),property:"display",oldValue:"none",newValue:""}),d=[],I("info",null,"","📌 Pegado (Ctrl+V).")}t.ctrlKey&&t.key==="c"&&o&&e&&(t.preventDefault(),localStorage.setItem("sb_clipboard",e.outerHTML),I("info",null,"","📋 Copiado (Ctrl+C)."))})}function Be(o){o.innerHTML=`
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
  `,Te()}function Te(){let o=1;const e=document.getElementById("vc-phase-1"),c=document.getElementById("vc-phase-2"),u=document.getElementById("vc-next-btn"),d=document.getElementById("vc-back-btn"),m=document.getElementById("vc-phase-text"),h=document.getElementById("vc-progress"),b=document.getElementById("vc-dot-1"),T=document.getElementById("vc-dot-2");function g(x){o=x,x===1?(e.style.display="",c.style.display="none",d.style.display="none",u.textContent="Siguiente",m.textContent="Paso 1 de 2",h.style.width="50%",b.classList.add("vc-phase-dot--active"),T.classList.remove("vc-phase-dot--active")):(e.style.display="none",c.style.display="",d.style.display="",u.textContent="Continuar",m.textContent="Paso 2 de 2",h.style.width="100%",b.classList.remove("vc-phase-dot--active"),T.classList.add("vc-phase-dot--active"))}d.addEventListener("click",()=>g(1)),u.addEventListener("click",()=>{if(o===1){const x=document.getElementById("vc-doc-number").value.trim(),_=document.getElementById("vc-name").value.trim();if(!x||!_){ye(["vc-doc-number","vc-name"]);return}g(2)}else{const x=document.getElementById("vc-phone").value.trim(),_=document.getElementById("vc-email").value.trim(),y=document.getElementById("vc-birthdate").value,w=document.getElementById("vc-habeas").checked,A=document.getElementById("vc-sms").checked;if(!x||!_||!y||!w||!A){ye(["vc-phone","vc-email","vc-birthdate"]);return}const k=new Date(y),R=new Date;let F=R.getFullYear()-k.getFullYear();const D=R.getMonth()-k.getMonth();if((D<0||D===0&&R.getDate()<k.getDate())&&F--,F<18||F>65){alert("La edad debe estar entre 18 y 65 años para este producto.");return}localStorage.setItem("vc_docType",document.getElementById("vc-doc-type").value),localStorage.setItem("vc_docNumber",document.getElementById("vc-doc-number").value.trim()),localStorage.setItem("vc_name",document.getElementById("vc-name").value.trim()),localStorage.setItem("vc_phone",x),localStorage.setItem("vc_email",_),localStorage.setItem("vc_birthdate",y),localStorage.setItem("vc_age",String(F));const j=new URL(window.location);j.searchParams.set("page","credit-data"),window.location.href=j.toString()}})}function ye(o){o.forEach(e=>{const c=document.getElementById(e);if(c&&!c.value.trim()){const u=c.closest(".prot-field__input");u&&(u.style.borderColor="#E53935",setTimeout(()=>u.style.borderColor="",2e3))}})}const be={18:{life:.45,itp:.15},19:{life:.45,itp:.15},20:{life:.46,itp:.16},21:{life:.47,itp:.16},22:{life:.48,itp:.17},23:{life:.49,itp:.17},24:{life:.5,itp:.18},25:{life:.52,itp:.18},26:{life:.54,itp:.19},27:{life:.56,itp:.2},28:{life:.58,itp:.21},29:{life:.61,itp:.22},30:{life:.64,itp:.23},31:{life:.67,itp:.24},32:{life:.71,itp:.26},33:{life:.75,itp:.27},34:{life:.8,itp:.29},35:{life:.85,itp:.31},36:{life:.91,itp:.33},37:{life:.97,itp:.35},38:{life:1.04,itp:.38},39:{life:1.12,itp:.41},40:{life:1.2,itp:.44},41:{life:1.3,itp:.47},42:{life:1.4,itp:.51},43:{life:1.52,itp:.55},44:{life:1.65,itp:.6},45:{life:1.79,itp:.65},46:{life:1.95,itp:.71},47:{life:2.12,itp:.77},48:{life:2.31,itp:.84},49:{life:2.52,itp:.92},50:{life:2.75,itp:1},51:{life:3,itp:1.09},52:{life:3.28,itp:1.19},53:{life:3.58,itp:1.3},54:{life:3.91,itp:1.42},55:{life:4.27,itp:1.55},56:{life:4.66,itp:0},57:{life:5.09,itp:0},58:{life:5.56,itp:0},59:{life:6.07,itp:0},60:{life:6.63,itp:0},61:{life:7.24,itp:0},62:{life:7.9,itp:0},63:{life:8.63,itp:0},64:{life:9.42,itp:0},65:{life:10.29,itp:0}},Me=["Bancolombia","Banco de Bogotá","Davivienda","BBVA Colombia","Banco de Occidente","Banco Popular","Banco AV Villas","Scotiabank Colpatria","Banco Caja Social","Banco Falabella","Banco Itaú","Banco Pichincha","Banco W","Bancamía","Banco Agrario","Banco GNB Sudameris"];function Ae(o){const e=parseInt(localStorage.getItem("vc_age")||"35");o.innerHTML=`
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
                    <img src="/vida-proteccion-creditos/Iconos/Name-icon (6).png" alt="" class="cd-input__icon">
                    <input type="text" id="vc-bank" placeholder="Escribe el nombre de tu banco" autocomplete="off">
                  </div>
                  <div class="vc-autocomplete__list" id="vc-bank-list">
                    ${Me.map(c=>`<div class="vc-autocomplete__item" data-bank="${c}">${c}</div>`).join("")}
                  </div>
                </div>
              </div>

              <!-- Cuánto debes -->
              <div class="cd-field">
                <label class="cd-field__label">¿Cuánto debes actualmente?</label>
                <div class="cd-input">
                  <img src="/vida-proteccion-creditos/Iconos/copy.png" alt="" class="cd-input__icon">
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
                <img src="/vida-proteccion-creditos/Iconos/shield-dog.png" alt="" onerror="this.style.display='none'">
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
  `,Ne(e)}function Ne(o){const e=document.getElementById("vc-bank"),c=document.getElementById("vc-bank-list"),u=document.getElementById("vc-debt"),d=document.getElementById("vc-insured-slider"),m=document.getElementById("vc-insured-display"),h=document.getElementById("vc-slider-min"),b=document.getElementById("vc-slider-max"),T=document.getElementById("vc-prima-display"),g=document.getElementById("vc-prima-annual");e.addEventListener("focus",()=>c.classList.add("vc-autocomplete__list--visible")),e.addEventListener("input",()=>{const y=e.value.toLowerCase();document.querySelectorAll(".vc-autocomplete__item").forEach(w=>{w.style.display=w.dataset.bank.toLowerCase().includes(y)?"":"none"}),c.classList.add("vc-autocomplete__list--visible")}),document.querySelectorAll(".vc-autocomplete__item").forEach(y=>{y.addEventListener("click",()=>{e.value=y.dataset.bank,c.classList.remove("vc-autocomplete__list--visible")})}),document.addEventListener("click",y=>{y.target.closest(".vc-autocomplete")||c.classList.remove("vc-autocomplete__list--visible")});const x=document.getElementById("vc-quote-insured");u.addEventListener("input",()=>{const y=u.value.replace(/[^0-9]/g,"");if(!y){u.value="";return}const w=parseInt(y,10);u.value=J(w),d.min=w,d.max=w*2,(parseInt(d.value,10)<w||parseInt(d.value,10)>w*2)&&(d.value=w),h.textContent=`Mín: ${J(w)}`,b.textContent=`Máx: ${J(w*2)}`;const A=parseInt(d.value,10);m.textContent=J(A),_(A)}),d.addEventListener("input",()=>{const y=parseInt(d.value,10);m.textContent=J(y),_(y)});function _(y){const w=be[o]||be[35],A=w.life,k=w.itp,R=Math.round((A+k)*y/1e3),F=Math.round(R/12);T.textContent=J(F),g.textContent=`Anual: ${J(R)}`,x&&(x.textContent=J(y));const D=T.closest(".cd-quote__amount");D&&(D.classList.add("cd-quote__amount--pulse"),clearTimeout(D._pulseT),D._pulseT=setTimeout(()=>D.classList.remove("cd-quote__amount--pulse"),200)),localStorage.setItem("vc_insuredValue",String(y)),localStorage.setItem("vc_annualPrima",String(R)),localStorage.setItem("vc_monthlyPrima",String(F)),localStorage.setItem("vc_itpActive","1"),localStorage.setItem("vc_lifeRate",String(A)),localStorage.setItem("vc_itpRate",String(k)),localStorage.setItem("vc_skipHealth",y<=15e7?"1":"0")}_(parseInt(d.value)),document.getElementById("cd-back").addEventListener("click",()=>{window.location.href=window.location.pathname}),document.getElementById("cd-continue").addEventListener("click",()=>{const y=e.value.trim(),w=u.value.replace(/[^0-9]/g,"");if(!y){const k=e.closest(".cd-input");k&&(k.style.borderColor="#E53935",setTimeout(()=>k.style.borderColor="",2e3));return}if(!w){const k=u.closest(".cd-input");k&&(k.style.borderColor="#E53935",setTimeout(()=>k.style.borderColor="",2e3));return}localStorage.setItem("vc_bank",y),localStorage.setItem("vc_debt",w);const A=new URL(window.location);A.searchParams.set("page","quotation"),window.location.href=A.toString()})}function J(o){return"$"+o.toLocaleString("es-CO")}function qe(o){const e=parseInt(localStorage.getItem("vc_monthlyPrima")||"37500"),c=parseInt(localStorage.getItem("vc_annualPrima")||"450000"),u=parseInt(localStorage.getItem("vc_insuredValue")||"50000000"),d=localStorage.getItem("vc_bank")||"Tu banco",h=(localStorage.getItem("vc_phone")||"3103025462").slice(-4),b=T=>"$"+T.toLocaleString("es-CO");o.innerHTML=`
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
            <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <div class="pd-form-wrapper">
            <!-- Quotation result card -->
            <div class="vc-quote-card">
              <h2 style="font-family:var(--prot-font);font-weight:600;font-size:24px;color:#1B1B1B;text-align:center">Tu cotización</h2>
              <p style="font-family:var(--prot-font);font-size:14px;color:#5B5B5B;text-align:center">Protección de crédito con ${d}</p>

              <!-- Price -->
              <div class="vc-quote-card__price">
                <span class="vc-quote-card__amount" id="qt-price-display">${b(e)}</span>
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
                Pago anual: ${b(c)} (ahorra 2 meses)
              </div>

              <!-- Coverages -->
              <div class="vc-quote-card__coverages">
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Muerte por cualquier causa</span>
                  <span class="vc-quote-coverage__value">${b(u)}</span>
                </div>
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).png" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Incapacidad total y permanente</span>
                  <span class="vc-quote-coverage__value">${b(u)}</span>
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
              <span class="otp-modal__phone-number">*** *** ${h}</span>
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
  `,De(e,c)}function De(o,e){const c=y=>"$"+y.toLocaleString("es-CO");let u=!0;const d=document.getElementById("qt-price-display"),m=document.getElementById("qt-period-label"),h=document.getElementById("qt-alt-price"),b=document.getElementById("qt-period-toggle"),T=document.getElementById("qt-lbl-monthly"),g=document.getElementById("qt-lbl-annual");b.addEventListener("click",()=>{u=!u,b.classList.toggle("vc-toggle--active",u),u?(d.textContent=c(o),m.textContent="/mes",h.textContent=`Pago anual: ${c(e)} (ahorra 2 meses)`,T.style.color="#009056",T.style.fontWeight="700",g.style.color="#757575",g.style.fontWeight="400"):(d.textContent=c(e),m.textContent="/año",h.textContent=`Pago mensual: ${c(o)}`,g.style.color="#009056",g.style.fontWeight="700",T.style.color="#757575",T.style.fontWeight="400"),localStorage.setItem("vc_periodicity",u?"monthly":"annual")}),document.getElementById("qt-back").addEventListener("click",()=>{const y=new URL(window.location);y.searchParams.set("page","credit-data"),window.location.href=y.toString()}),document.getElementById("qt-save").addEventListener("click",()=>{alert("Tu cotización ha sido guardada. Podrás retomarla cuando quieras.")}),document.getElementById("qt-pdf").addEventListener("click",()=>{alert("Descargando PDF de tu cotización...")}),document.getElementById("qt-continue").addEventListener("click",()=>{localStorage.setItem("vc_periodicity",u?"monthly":"annual"),document.getElementById("otp-overlay").classList.add("otp-overlay--visible")});const x=document.getElementById("otp-input"),_=document.getElementById("otp-validate");x.addEventListener("input",()=>{const y=x.value.replace(/\D/g,"");x.value=y,y.length===6?(_.disabled=!1,_.classList.add("otp-modal__btn-validate--active")):(_.disabled=!0,_.classList.remove("otp-modal__btn-validate--active"))}),_.addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible"),document.getElementById("success-overlay").classList.add("otp-overlay--visible"),setTimeout(()=>{const y=new URL(window.location);y.searchParams.set("page","complementary"),window.location.href=y.toString()},2500)}),document.getElementById("otp-close").addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible")}),document.getElementById("otp-cancel").addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible")})}function Pe(o){localStorage.getItem("vc_name"),localStorage.getItem("vc_email");const e=localStorage.getItem("vc_bank")||"Bancolombia",c=parseInt(localStorage.getItem("vc_debt")||"50000000"),u=parseInt(localStorage.getItem("vc_insuredValue")||"50000000"),d=u>c,m=Math.round(c/u*100),h=100-m,b=localStorage.getItem("vc_skipHealth")==="1";o.innerHTML=`
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
            <div class="vc-collapsible vc-collapsible--open" id="sec-personal">
              <div class="vc-collapsible__header">
                <div class="vc-collapsible__title">
                  <img src="/vida-proteccion-creditos/Iconos/user.png" alt="">
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
                      <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="pd-field__chevron">
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
                      <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="pd-field__chevron">
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
                      <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="pd-field__chevron">
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
                <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="vc-collapsible__chevron">
              </div>
              <div class="vc-collapsible__body">
                <!-- Auto beneficiary (bank) -->
                <div class="vc-beneficiary-auto">
                  <img src="/vida-proteccion-creditos/Iconos/shield-dog.png" alt="" class="vc-beneficiary-auto__icon">
                  <span class="vc-beneficiary-auto__text"><strong>${e}</strong> recibe el ${m}% del valor asegurado (equivalente a tu deuda).</span>
                </div>

                ${d?`
                <p style="font-size:13px;color:#5B5B5B;margin-bottom:12px">Como tu valor asegurado es mayor a tu deuda, designa un beneficiario libre para el ${h}% restante:</p>
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
            <div class="vc-collapsible" id="sec-credit">
              <div class="vc-collapsible__header">
                <div class="vc-collapsible__title">
                  <img src="/vida-proteccion-creditos/Iconos/copy.png" alt="">
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
          <button class="pd-footer__btn" id="comp-continue">Continuar</button>
        </div>
      </div>
    </div>
  `,ze()}function ze(){document.querySelectorAll(".vc-collapsible__header").forEach(o=>{o.addEventListener("click",()=>{o.closest(".vc-collapsible").classList.toggle("vc-collapsible--open")})}),document.querySelectorAll(".pd-chip").forEach(o=>{o.addEventListener("click",()=>{o.closest(".pd-field__chips").querySelectorAll(".pd-chip").forEach(e=>e.classList.remove("pd-chip--active")),o.classList.add("pd-chip--active")})}),document.getElementById("comp-back").addEventListener("click",()=>{const o=new URL(window.location);o.searchParams.set("page","quotation"),window.location.href=o.toString()}),document.getElementById("comp-continue").addEventListener("click",()=>{var x,_,y,w,A,k;const o=((x=document.querySelector(".pd-chip--active"))==null?void 0:x.dataset.value)||"F",e=((_=document.getElementById("comp-dept"))==null?void 0:_.value)||"",c=((y=document.getElementById("comp-city"))==null?void 0:y.value)||"",u=((w=document.getElementById("comp-address"))==null?void 0:w.value)||"",d=((A=document.getElementById("comp-occupation"))==null?void 0:A.value)||"",m=((k=document.getElementById("comp-credit-number"))==null?void 0:k.value)||"";localStorage.setItem("vc_gender",o),localStorage.setItem("vc_dept",e),localStorage.setItem("vc_city",c),localStorage.setItem("vc_address",u),localStorage.setItem("vc_occupation",d),localStorage.setItem("vc_creditNumber",m);const h=document.getElementById("comp-benef-name"),b=document.getElementById("comp-benef-rel");if(h){const R=h.value.trim(),F=(b==null?void 0:b.value)||"";localStorage.setItem("vc_hasSecondInsured","1"),localStorage.setItem("vc_insuredName",R||"Beneficiario"),localStorage.setItem("vc_beneficiaryRel",F),localStorage.removeItem("vc_insuredGender")}else localStorage.setItem("vc_hasSecondInsured","0"),localStorage.removeItem("vc_insuredName"),localStorage.removeItem("vc_beneficiaryRel"),localStorage.removeItem("vc_insuredGender");const T=localStorage.getItem("vc_skipHealth")==="1",g=new URL(window.location);g.searchParams.set("page",T?"summary":"health"),window.location.href=g.toString()})}const ae="/vida-proteccion-creditos";function $e(){const o=localStorage.getItem("vc_name")||"Simón Andrés Bolívar Libertad",e=localStorage.getItem("vc_gender")||"M";return[{id:"holder",name:o,gender:e,icon:`${ae}/Iconos/user-shield.svg`}]}const re=[{title:"¿Tiene, ha tenido o esta en estudio de enfermedades del corazón o del sistema cardiovascular?",detail:"Hipertensión arterial, arritmias, enfermedad coronaria, infarto cardíaco, angina, afecciones de las válvulas del corazón, evento cerebrovascular, tromboembolismo, trombosis, accidente isquémico transitorio, aneurismas."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades endocrinas, metabólicas?",detail:"Diabetes, pre diabetes, resistencia a la insulina, nódulos tiroideos, hipertiroidismo, hiperprolactinemia, Enfermedad de Graves, Obesidad, Enfermedad de Addison, Enfermedad de Cushing, Cirugía Bariátrica."},{title:"Está tomando algún medicamento actualmente o está bajo algún tratamiento médico, terapia y/o rehabilitación:",detail:"Física, psicología, fonoaudiología, ocupacional, neuropsicología. En caso afirmativo indique nombre de medicamento y/o tratamiento, y el diagnóstico."},{title:"¿Está embarazada actualmente o sospecha que está embarazada?",onlyGender:"F"},{title:"¿Tiene, ha tenido o esta en estudio de Enfermedades autoinmunes o el colágeno?",detail:"Lupus, artritis reumatoidea, vasculitis, espondilitis, colitis ulcerativa, esclerodermia, glomerulopatías o enfermedad del colágeno no determinada, miastenia gravis, síndrome de sjögren, esclerosis lateral amiotrófica, fibrosis quística, enfermedades tipificadas como huérfanas, artritis psoriásica, artritis reumatoidea, espondilitis anquilosante."},{title:"¿Tiene, ha tenido o esta en estudio de Enfermedades o eventos neurológicos?",detail:"Evento cerebrovascular, accidente isquémico transitorio, trombosis, epilepsia, convulsiones, esclerosis múltiple, alzheimer, guillain barre, parálisis, tumores cerebrales, migraña o cefaleas crónicas, neuralgias, meningitis, aneurismas cerebrales, fístulas, hidrocefalia, parkinson, TEC (Traumatismo craneoencefálico), neuropatías.",detail2Title:"¿y/ o Lesión en órganos de los sentidos?",detail2:"Pérdida o disminución visual, Pérdida o disminución auditiva, Desviación del Tabique nasal."},{title:"¿Tiene, ha tenido o esta en estudio de alteración del desarrollo y/o desorden psiquiátrico?",detail:"Depresión, ansiedad, trastorno bipolar, esquizofrenia, déficit de atención, hiperactividad, trastorno del espectro autista, alteraciones del lenguaje o desarrollo psicomotor, trastornos alimenticios, autismo, dependencia al alcohol, consumo y/o dependencia a drogas ilícitas, psicotrópicas, demencia."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades, amputaciones o lesiones de los huesos o articulaciones?",detail:"Hombro, tobillo, rodillas, cadera, codo, dedos de las manos, muñeca, dedos de los pies, afecciones en meniscos, luxaciones, artrosis, fracturas, alguna afección y/o desviación de la columna, hernias discales, osteoporosis, distrofia muscular, gota, artritis gotosa o síndrome de lobstein."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades pulmonares?",detail:"Asma, EPOC (enfermedad pulmonar obstructiva crónica), síndrome bronco obstructivo recurrente, nódulos pulmonares, Fibrosis pulmonar, enfisema pulmonar, trasplante pulmonar."},{title:"¿Cáncer o similares?",detail:"Linfoma, leucemia, tumores, masas, nódulos, quistes, lesiones premalignas, pólipos, lipomas, fibromas, nevos o lunares, mujeres (nódulos mamarios).",important:"De acuerdo con lo dispuesto en la ley 2475 del 2025, si terminó su tratamiento contra el cáncer hace más de 4 años sin recaídas posteriores (si el cáncer fue diagnosticado siendo menor de edad, el tiempo anterior se disminuirá a 2 años) no debe reportar este antecedente."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades de riñones, próstata (hombres) o aparato urogenital?",detail:"Cálculos, cólico renal, hiperplasia de la próstata, insuficiencia renal, glomerulonefritis, sangre en la orina, proteínas en la orina, síndrome nefrótico, Infección de vías urinarias recurrentes, incontinencia urinaria, cistocele, prolapso uterino, vejiga neurogénica."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades del hígado, gástricas, colón?",detail:"Cirrosis, hepatitis C, pólipos en colon, úlceras, colitis, divertículos, enfermedad por reflujo gastroesofágico, esófago de barrett, hernia(s) (diafragmática, hiatal, inguinal, umbilical), cálculos biliares, pancreatitis aguda y/o crónica,  enfermedad de crohn, sangrados del tubo digestivo, rectocele."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades de la sangre o infecciosa?",detail:"Trastornos de la coagulación, talasemia, trombocitopenia, leucopenia, anemia actual, leucemia, hemofilia, infección por VIH y/o VIH - SIDA, púrpura trombocitopénica, síndrome antifosfolípidos, virus del papiloma humano."},{title:"¿Algún tratamiento médico y/o quirúrgico pendiente?",detail:"y/o alguna enfermedad no mencionada en las preguntas anteriores o  enfermedades congénitas/genéticas o malformaciones."},{title:"¿Algún tipo de discapacidad que le impida desempeñar sus tareas diarias o ha tenido en el último año alguna incapacidad medica por tiempo mayor a 1 mes?",detail:"Detalle la discapacidad del titular y/o asegurado"}];let ee={},$=0;function Re(o){if(localStorage.getItem("vc_skipHealth")==="1"){const e=new URL(window.location);e.searchParams.set("page","summary"),window.location.replace(e.toString());return}ee={},$=0,o.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo">
          <img src="${ae}/images/logo-seguros-bolivar.png" alt="Seguros Bolívar">
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
            <img src="${ae}/Iconos/angle-left.svg" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <div class="hs-wrapper">
            <div class="hs-title-row">
              <img src="${ae}/Iconos/Latido.png" alt="" class="hs-title-icon" onerror="this.style.display='none'">
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
            <img src="${ae}/Iconos/angle-left.svg" alt="" class="hs-nav__icon">
          </button>
          <button class="hs-nav hs-nav--next" id="hs-next" aria-label="Siguiente">
            <img src="${ae}/Iconos/angle-right.svg" alt="" class="hs-nav__icon">
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
  `,Fe()}function Fe(){var c,u,d,m,h;const o=document.getElementById("hs-modal-overlay");o.classList.add("hs-modal-overlay--visible");const e=()=>o.classList.remove("hs-modal-overlay--visible");(c=document.getElementById("hs-modal-close"))==null||c.addEventListener("click",e),(u=document.getElementById("hs-modal-continue"))==null||u.addEventListener("click",e),(d=document.getElementById("hs-back"))==null||d.addEventListener("click",()=>{const b=new URL(window.location);b.searchParams.set("page","complementary"),window.location.href=b.toString()}),(m=document.getElementById("hs-prev"))==null||m.addEventListener("click",Oe),(h=document.getElementById("hs-next"))==null||h.addEventListener("click",He),pe()}function we(o){const e=$e();return o.onlyGender?e.filter(c=>c.gender===o.onlyGender):e}function pe(){const o=re[$],e=document.getElementById("hs-card"),c=we(o),u=c.map(d=>{var h;const m=((h=ee[$])==null?void 0:h[d.id])||"";return`
      <div class="hs-person" data-person="${d.id}">
        <div class="hs-person__info">
          <img src="${d.icon}" alt="" class="hs-person__icon" onerror="this.style.display='none'">
          <span class="hs-person__name">${d.name}</span>
        </div>
        <div class="hs-person__options">
          <button class="hs-opt ${m==="S"?"hs-opt--active":""}" data-value="S">Sí</button>
          <button class="hs-opt ${m==="N"?"hs-opt--active":""}" data-value="N">No</button>
        </div>
      </div>
    `}).join("");e.innerHTML=`
    <div class="hs-counter">${$+1}/${re.length}</div>
    <div class="hs-question">
      <h3 class="hs-question__title">${o.title}</h3>
      ${o.detail?`<p class="hs-question__detail">${o.detail}</p>`:""}
      ${o.detail2Title?`<h3 class="hs-question__title hs-question__title--sub">${o.detail2Title}</h3>`:""}
      ${o.detail2?`<p class="hs-question__detail">${o.detail2}</p>`:""}
    </div>
    ${o.important?`
      <div class="hs-important">
        <img src="${ae}/Iconos/info-circle.png" alt="" class="hs-important__icon" onerror="this.style.display='none'">
        <div class="hs-important__text">
          <span class="hs-important__label">Importante</span>
          <p>${o.important}</p>
        </div>
      </div>`:""}
    ${c.length?`<div class="hs-people">${u}</div>`:'<p class="hs-question__detail">Esta pregunta no aplica para los asegurados de esta póliza.</p>'}
  `,e.querySelectorAll(".hs-person").forEach(d=>{const m=d.dataset.person;d.querySelectorAll(".hs-opt").forEach(h=>{h.addEventListener("click",()=>{ee[$]||(ee[$]={}),ee[$][m]=h.dataset.value,d.querySelectorAll(".hs-opt").forEach(b=>b.classList.remove("hs-opt--active")),h.classList.add("hs-opt--active"),xe()})})}),xe()}function Ie(){const o=re[$],e=we(o),c=ee[$]||{};return e.every(u=>c[u.id]==="S"||c[u.id]==="N")}function xe(){const o=document.getElementById("hs-prev"),e=document.getElementById("hs-next");o.classList.toggle("hs-nav--disabled",$===0),o.disabled=$===0;const c=Ie();e.classList.toggle("hs-nav--active",c),e.disabled=!c}function Oe(){$!==0&&($--,pe())}function He(){Ie()&&($<re.length-1?($++,pe()):We())}function Ve(){return Object.values(ee).some(o=>Object.values(o).some(e=>e==="S"))}function Ue(){const o=new Date,e=`${o.getFullYear()}${String(o.getMonth()+1).padStart(2,"0")}${String(o.getDate()).padStart(2,"0")}`,c=Math.floor(1e3+Math.random()*9e3);return`VM-${e}-${c}`}function We(){if(localStorage.setItem("vc_healthAnswers",JSON.stringify(ee)),Ve()){const e=Ue();localStorage.setItem("vc_medicalReviewCase",e),je(e);return}const o=new URL(window.location);o.searchParams.set("page","summary"),window.location.href=o.toString()}function je(o){var u;const e=document.getElementById("hs-review-overlay");if(!e)return;const c=document.getElementById("hs-review-case");c&&(c.textContent=o),e.classList.add("hs-modal-overlay--visible"),(u=document.getElementById("hs-review-home"))==null||u.addEventListener("click",()=>{const d=new URL(window.location);d.searchParams.set("page","home"),d.searchParams.delete("step"),window.location.href=d.toString()})}function Ge(o){const e=A=>"$"+parseInt(A).toLocaleString("es-CO"),c=localStorage.getItem("vc_name")||"Simón Andrés Bolívar",u=localStorage.getItem("vc_docNumber")||"1032508877",d=localStorage.getItem("vc_phone")||"3103025462",m=localStorage.getItem("vc_email")||"correo@email.com",h=localStorage.getItem("vc_age")||"35",b=localStorage.getItem("vc_bank")||"Bancolombia",T=localStorage.getItem("vc_insuredValue")||"50000000",g=localStorage.getItem("vc_monthlyPrima")||"37500",x=localStorage.getItem("vc_annualPrima")||"450000",_=localStorage.getItem("vc_periodicity")||"monthly",y=localStorage.getItem("vc_city")||"Bogotá",w=localStorage.getItem("vc_creditNumber")||"12345678";o.innerHTML=`
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
                      <img src="/vida-proteccion-creditos/Iconos/shield-dog.png" alt="" class="conf-plan__icon">
                      <span class="conf-plan__name">Vida Protección Créditos</span>
                    </div>
                    <div class="conf-plan__details">
                      <div class="conf-plan__row"><span class="conf-plan__label">Valor asegurado:</span><span class="conf-plan__value">${e(T)}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Prima ${_==="monthly"?"mensual":"anual"}:</span><span class="conf-plan__value">${e(_==="monthly"?g:x)}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Banco:</span><span class="conf-plan__value--bold">${b}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Crédito #:</span><span class="conf-plan__value--bold">${w}</span></div>
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
                      <div class="conf-data-row"><span class="conf-data-row__label">Cédula:</span><span class="conf-data-row__value">${u}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Celular:</span><span class="conf-data-row__value">${d}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Edad:</span><span class="conf-data-row__value">${h} años</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Ciudad:</span><span class="conf-data-row__value">${y}</span></div>
                    </div>
                    <div class="conf-data-card__email" style="margin-top:8px">
                      <span>Enviaremos la póliza a:</span>
                      <span style="font-weight:700;color:#414141">${m}</span>
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
        <div class="pd-footer__inner">
          <button class="pd-footer__btn pd-footer__btn--disabled" id="sum-pay" disabled>Ir a pagar</button>
        </div>
      </div>
    </div>
  `,Ye()}function Ye(){const o=document.querySelectorAll(".pf-option"),e=document.querySelectorAll(".pf-check__input"),c=document.getElementById("sum-pay");o.forEach(d=>{d.addEventListener("click",()=>{o.forEach(m=>{m.classList.remove("pf-option--selected"),m.querySelector(".pf-option__radio").classList.remove("pf-option__radio--active")}),d.classList.add("pf-option--selected"),d.querySelector(".pf-option__radio").classList.add("pf-option__radio--active"),localStorage.setItem("vc_periodicity",d.dataset.freq==="annual"?"annual":"monthly"),u()})}),e.forEach(d=>d.addEventListener("change",u));function u(){const d=document.querySelector(".pf-option--selected"),m=[...e].every(h=>h.checked);d&&m?(c.disabled=!1,c.classList.remove("pd-footer__btn--disabled")):(c.disabled=!0,c.classList.add("pd-footer__btn--disabled"))}document.getElementById("sum-back").addEventListener("click",()=>{const d=localStorage.getItem("vc_skipHealth")==="1",m=new URL(window.location);m.searchParams.set("page",d?"complementary":"health"),window.location.href=m.toString()}),c.addEventListener("click",()=>{if(!c.disabled){const d=new URL(window.location);d.searchParams.set("page","success"),window.location.href=d.toString()}})}function Xe(o){var _,y;const e=w=>"$"+parseInt(w).toLocaleString("es-CO"),c=localStorage.getItem("vc_name")||"Simón Bolívar",u=localStorage.getItem("vc_bank")||"Bancolombia",d=localStorage.getItem("vc_email")||"correo@email.com",m=localStorage.getItem("vc_periodicity")||"monthly",h=localStorage.getItem("vc_monthlyPrima")||"37500",b=localStorage.getItem("vc_annualPrima")||"450000",T=e(m==="monthly"?h:b),g=m==="monthly"?"Mensual":"Anual",x="#VPC-2026-"+Math.floor(1e3+Math.random()*9e3);localStorage.setItem("vc_policyNumber",x),o.innerHTML=`
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
            <div class="success-card__row"><span class="success-card__label">Pago ${g.toLowerCase()}:</span><span class="success-card__value">${T}</span></div>
            <div class="success-card__row"><span class="success-card__label">Banco protegido:</span><span class="success-card__value">${u}</span></div>
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
          <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="success-home-btn__icon">
          <span>Ir al inicio</span>
        </button>
      </div>
    </div>
  `,(_=document.getElementById("vc-copy"))==null||_.addEventListener("click",()=>{const w=document.querySelector(".success-card__code").textContent;navigator.clipboard.writeText(w).then(()=>{document.querySelector("#vc-copy span").textContent="¡Copiado!",setTimeout(()=>document.querySelector("#vc-copy span").textContent="Copiar",2e3)})}),(y=document.getElementById("vc-home"))==null||y.addEventListener("click",()=>{localStorage.clear(),window.location.href=window.location.pathname})}function Qe(){const e=new URLSearchParams(window.location.search).get("page")||"home",c=document.getElementById("app-content");switch(e){case"credit-data":Ae(c);break;case"quotation":qe(c);break;case"complementary":Pe(c);break;case"health":Re(c);break;case"summary":Ge(c);break;case"success":Xe(c);break;case"home":default:Be(c);break}}window.addEventListener("message",o=>{var e;if(o.data){if(o.data.type==="SAVE_SNAPSHOT"){const c=((e=document.getElementById("app-content"))==null?void 0:e.innerHTML)||document.body.innerHTML;window.parent.postMessage({type:"SNAPSHOT_DATA",html:c,page:o.data.page,projectId:o.data.projectId},"*")}if(o.data.type==="RESTORE_SNAPSHOT"){const c=document.getElementById("app-content");c&&o.data.html&&(c.innerHTML=o.data.html)}if(o.data.type==="NAVIGATE_TO_STEP"){const c=o.data.page;if(c){const u=new URL(window.location);u.searchParams.set("page",c),window.location.href=u.toString()}}if(o.data.type==="ADMIN_OVERRIDE"){const{selector:c,property:u,value:d}=o.data;try{const m=document.querySelector(c);m&&(u==="textContent"?m.textContent=d:u==="src"?m.src=d:m.style.setProperty(u.replace(/([A-Z])/g,"-$1").toLowerCase(),d,"important"))}catch{}}}});function Ee(){Qe()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ee):Ee();
