(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))d(c);new MutationObserver(c=>{for(const m of c)if(m.type==="childList")for(const h of m.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&d(h)}).observe(document,{childList:!0,subtree:!0});function i(c){const m={};return c.integrity&&(m.integrity=c.integrity),c.referrerPolicy&&(m.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?m.credentials="include":c.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function d(c){if(c.ep)return;c.ep=!0;const m=i(c);fetch(c.href,m)}})();window.self===window.top||ke();function ke(){let o=!1,e=null,i=!1,d=[],c=[],m=!1,h={},b=null,L=1e4;const g=5,x=document.createElement("div");x.id="editor-toolbar",x.innerHTML="",x.style.cssText="display:none;position:fixed;z-index:99999;",document.body.appendChild(x);const _=document.createElement("div");_.id="resize-box",_.style.cssText="display:none;position:fixed;z-index:99998;pointer-events:none;border:2px solid #0a6741;",["nw","ne","sw","se","n","s","e","w"].forEach(t=>{const s=document.createElement("div");s.className="resize-handle",s.dataset.dir=t,s.style.cssText=`position:absolute;width:8px;height:8px;background:#0a6741;border-radius:2px;pointer-events:all;cursor:${t}-resize;`;const r={nw:"top:-4px;left:-4px;",ne:"top:-4px;right:-4px;",sw:"bottom:-4px;left:-4px;",se:"bottom:-4px;right:-4px;",n:"top:-4px;left:50%;transform:translateX(-50%);",s:"bottom:-4px;left:50%;transform:translateX(-50%);",e:"top:50%;right:-4px;transform:translateY(-50%);",w:"top:50%;left:-4px;transform:translateY(-50%);"};s.style.cssText+=r[t],_.appendChild(s)}),document.body.appendChild(_);const y=document.createElement("div");y.className="rotate-line",_.appendChild(y);const C=document.createElement("div");C.className="rotate-handle",_.appendChild(C),C.addEventListener("mousedown",t=>{if(!e)return;t.preventDefault(),t.stopPropagation();const s=e.getBoundingClientRect(),r=s.left+s.width/2,a=s.top+s.height/2;parseFloat(e.dataset.rotation||"0");const n=u=>{const v=Math.atan2(u.clientY-a,u.clientX-r)*(180/Math.PI)+90;e.style.transform=`rotate(${Math.round(v)}deg)`,e.dataset.rotation=Math.round(v),Y(e)},p=()=>{document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",p),E("changeStyle",e,"transform",e.style.transform)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",p)});const P=document.createElement("div");P.style.cssText="display:none;position:fixed;z-index:99997;background:#E8C916;color:#333;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;pointer-events:none;",document.body.appendChild(P);const M=document.createElement("div");M.id="alignment-guides",M.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99996;",document.body.appendChild(M);const F=document.createElement("div");F.id="text-cursor",F.style.cssText="display:none;position:fixed;z-index:99999;pointer-events:none;",F.innerHTML=`
  <div style="display:flex;align-items:center;gap:4px;">
    <div style="width:2px;height:20px;background:#0a6741;animation:blink 0.8s infinite;"></div>
    <span style="font-size:10px;color:#0a6741;font-weight:600;background:rgba(255,255,255,0.9);padding:1px 6px;border-radius:4px;white-space:nowrap;">Clic para insertar texto</span>
  </div>
`,document.body.appendChild(F);const V=document.createElement("style");V.textContent=`
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
`,document.head.appendChild(V);const q=document.createElement("div");q.id="sb-grid-overlay",q.classList.add("visible");for(let t=0;t<12;t++){const s=document.createElement("div");s.className="sb-grid-col",q.appendChild(s)}document.body.appendChild(q);const U=document.createElement("div");U.id="sb-smart-guides",U.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99994;",document.body.appendChild(U);const W=4;function Ae(t,s,r,a){U.innerHTML="";const n=a.left+s,p=a.top+r,u=n+a.width,v=p+a.height,l=n+a.width/2,f=p+a.height/2,S=window.innerWidth/2,B=window.innerHeight/2;Math.abs(l-S)<W&&X("v",S,"#E8C916","Centro"),Math.abs(f-B)<W&&X("h",B,"#E8C916","Centro"),document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, img, div.admin-inserted, [class*="card"], [class*="btn"], [class*="hero"], [class*="section"]').forEach(A=>{if(A===t||A.contains(t)||t.contains(A)||A.closest("#sb-resize-box")||A.closest("#sb-smart-guides")||A.closest("#sb-grid-overlay"))return;const w=A.getBoundingClientRect();if(w.width<10||w.height<10)return;const R=w.left+w.width/2,$=w.top+w.height/2;Math.abs(l-R)<W&&X("v",R,"#0a6741"),Math.abs(f-$)<W&&X("h",$,"#0a6741"),Math.abs(n-w.left)<W&&X("v",w.left,"#ff6b6b"),Math.abs(u-w.right)<W&&X("v",w.right,"#ff6b6b"),Math.abs(p-w.top)<W&&X("h",w.top,"#ff6b6b"),Math.abs(v-w.bottom)<W&&X("h",w.bottom,"#ff6b6b")})}function X(t,s,r,a){const n=document.createElement("div");if(t==="v"?n.style.cssText=`position:fixed;top:0;bottom:0;left:${s}px;width:1px;background:${r};opacity:0.7;`:n.style.cssText=`position:fixed;left:0;right:0;top:${s}px;height:1px;background:${r};opacity:0.7;`,U.appendChild(n),a){const p=document.createElement("div");p.textContent=a,p.style.cssText=`position:fixed;${t==="v"?"left:"+(s+4)+"px;top:8px":"top:"+(s+4)+"px;left:8px"};background:${r};color:#fff;font-size:9px;padding:1px 5px;border-radius:3px;font-family:sans-serif;`,U.appendChild(p)}}function Te(){U.innerHTML=""}const te=document.createElement("div");te.className="cursor-guide-h",te.style.display="none",document.body.appendChild(te);const ae=document.createElement("div");ae.className="cursor-guide-v",ae.style.display="none",document.body.appendChild(ae);function Q(t){if(t.id)return"#"+t.id;if(t.className&&typeof t.className=="string"){const a=t.className.trim().split(/\s+/).filter(n=>n!=="editor-highlight"&&n!=="editor-dragging");if(a.length){const n="."+a.join(".");try{if(document.querySelectorAll(n).length===1)return n}catch{}}}const s=[];let r=t;for(;r&&r!==document.body;){let a=r.tagName.toLowerCase();if(r.id){s.unshift("#"+r.id);break}const n=r.parentElement;if(n){const p=Array.from(n.children).filter(u=>u.tagName===r.tagName);p.length>1&&(a+=":nth-of-type("+(p.indexOf(r)+1)+")")}s.unshift(a),r=r.parentElement}return s.join(" > ")}function ie(t,s,r){d.push({selector:Q(t),property:s,oldValue:r,newValue:s==="textContent"?t.textContent:s==="__fullStyle"?t.style.cssText:t.style[s]}),c=[]}function ve(t){d.push({selector:Q(t),property:"__fullStyle",oldValue:t.style.cssText,newValue:""}),c=[]}function ge(t){d.length>0&&(d[d.length-1].newValue=t.style.cssText)}function Y(t){const s=t.getBoundingClientRect();_.style.display="block",_.style.left=s.left+"px",_.style.top=s.top+"px",_.style.width=s.width+"px",_.style.height=s.height+"px"}function Pe(t){const s=t.parentElement;if(!s||s===document.body||s===document.documentElement||!["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(s.tagName))return;s.getBoundingClientRect(),t.getBoundingClientRect();const r=(parseFloat(t.style.left)||0)+t.offsetWidth,a=(parseFloat(t.style.top)||0)+t.offsetHeight;r>s.offsetWidth&&(s.style.minWidth=r+"px"),a>s.offsetHeight&&(s.style.minHeight=a+"px")}document.addEventListener("scroll",()=>{e&&!i&&Y(e)},!0);function O(t){e&&(e.classList.remove("editor-highlight"),e.removeAttribute("contenteditable")),e=t,e.classList.add("editor-highlight"),Y(t)}function ne(){e&&(e.classList.remove("editor-highlight","editor-dragging"),e.removeAttribute("contenteditable")),e=null,x.style.display="none",_.style.display="none",le()}function E(t,s,r,a){window.parent.postMessage({type:t==="info"?"ADMIN_INFO":"ADMIN_CHANGE",action:t,selector:s?Q(s):"",property:r,value:a,description:t==="info"?a:`${t}: ${(s==null?void 0:s.tagName)||""}`},"*")}function fe(){const t=document.querySelectorAll("body *:not(#editor-toolbar):not(#resize-box):not(#alignment-guides):not(.guide-line):not(.guide-distance):not(.guide-marker):not(#text-cursor):not(script):not(style):not(link)");return Array.from(t).filter(s=>{if(s===e||s.contains(e)||e!=null&&e.contains(s)||s.offsetParent===null&&s.style.position!=="fixed")return!1;const r=s.getBoundingClientRect();return r.width>5&&r.height>5&&r.top<window.innerHeight+50&&r.bottom>-50&&r.left<window.innerWidth+50&&r.right>-50})}function le(){M.innerHTML=""}function he(t){le();const s=fe(),r=t.left+t.width/2,a=t.top+t.height/2,n=window.innerWidth/2,p=window.innerHeight/2,u={h:new Set,v:new Set};Math.abs(r-n)<g&&z("v",n,"viewport"),Math.abs(a-p)<g&&z("h",p,"viewport"),Math.abs(t.left)<g&&z("v",0,"viewport"),Math.abs(t.right-window.innerWidth)<g&&z("v",window.innerWidth,"viewport"),Math.abs(t.top)<g&&z("h",0,"viewport"),s.forEach(v=>{const l=v.getBoundingClientRect(),f=l.left+l.width/2,S=l.top+l.height/2;Math.abs(a-S)<g&&!u.h.has(Math.round(S))&&(u.h.add(Math.round(S)),z("h",S,"center"),de(r,S),de(f,S)),Math.abs(t.top-l.top)<g&&!u.h.has(Math.round(l.top))&&(u.h.add(Math.round(l.top)),z("h",l.top,"edge")),Math.abs(t.bottom-l.bottom)<g&&!u.h.has(Math.round(l.bottom))&&(u.h.add(Math.round(l.bottom)),z("h",l.bottom,"edge")),Math.abs(t.top-l.bottom)<g&&!u.h.has(Math.round(l.bottom)+1e3)&&(u.h.add(Math.round(l.bottom)+1e3),z("h",l.bottom,"edge"),Z(r,l.bottom,0,"h")),Math.abs(t.bottom-l.top)<g&&!u.h.has(Math.round(l.top)+2e3)&&(u.h.add(Math.round(l.top)+2e3),z("h",l.top,"edge"),Z(r,l.top,0,"h")),Math.abs(r-f)<g&&!u.v.has(Math.round(f))&&(u.v.add(Math.round(f)),z("v",f,"center"),de(f,a),de(f,S)),Math.abs(t.left-l.left)<g&&!u.v.has(Math.round(l.left))&&(u.v.add(Math.round(l.left)),z("v",l.left,"edge")),Math.abs(t.right-l.right)<g&&!u.v.has(Math.round(l.right))&&(u.v.add(Math.round(l.right)),z("v",l.right,"edge")),Math.abs(t.left-l.right)<g&&!u.v.has(Math.round(l.right)+1e3)&&(u.v.add(Math.round(l.right)+1e3),z("v",l.right,"edge"),Z(l.right,a,0,"v")),Math.abs(t.right-l.left)<g&&!u.v.has(Math.round(l.left)+2e3)&&(u.v.add(Math.round(l.left)+2e3),z("v",l.left,"edge"),Z(l.left,a,0,"v"));const B=t.top-l.bottom,k=l.top-t.bottom,A=t.left-l.right,w=l.left-t.right;B>0&&B<60&&Z(r,l.bottom+B/2,Math.round(B),"h"),k>0&&k<60&&Z(r,t.bottom+k/2,Math.round(k),"h"),A>0&&A<60&&Z(l.right+A/2,a,Math.round(A),"v"),w>0&&w<60&&Z(t.right+w/2,a,Math.round(w),"v")})}function z(t,s,r){const a=document.createElement("div");a.className=`guide-line guide-line-${t} guide-line--${r||"edge"}`,t==="h"?a.style.top=s+"px":a.style.left=s+"px",M.appendChild(a)}function de(t,s,r){const a=document.createElement("div");a.className="guide-marker guide-marker--center",a.style.left=t+"px",a.style.top=s+"px",M.appendChild(a)}function Z(t,s,r,a){if(r<=0)return;const n=document.createElement("div");n.className="guide-distance",n.textContent=r+"px",n.style.left=t+"px",n.style.top=s+"px",n.style.transform="translate(-50%, -50%)",M.appendChild(n)}function be(t,s,r){const a=t.getBoundingClientRect(),n=a.width,p=a.height,u=fe();let v=s,l=r,f=!1;const S=s,B=r,k=s+n,A=r+p,w=s+n/2,R=r+p/2,$=window.innerWidth/2,T=window.innerHeight/2;return Math.abs(w-$)<g&&(v=$-n/2,f=!0),Math.abs(R-T)<g&&(l=T-p/2,f=!0),Math.abs(S)<g&&(v=0,f=!0),Math.abs(k-window.innerWidth)<g&&(v=window.innerWidth-n,f=!0),Math.abs(B)<g&&(l=0,f=!0),u.forEach(j=>{const I=j.getBoundingClientRect(),oe=I.left+I.width/2,N=I.top+I.height/2;Math.abs(R-N)<g&&(l=N-p/2,f=!0),Math.abs(B-I.top)<g&&(l=I.top,f=!0),Math.abs(A-I.bottom)<g&&(l=I.bottom-p,f=!0),Math.abs(B-I.bottom)<g&&(l=I.bottom,f=!0),Math.abs(A-I.top)<g&&(l=I.top-p,f=!0),Math.abs(w-oe)<g&&(v=oe-n/2,f=!0),Math.abs(S-I.left)<g&&(v=I.left,f=!0),Math.abs(k-I.right)<g&&(v=I.right-n,f=!0),Math.abs(S-I.right)<g&&(v=I.right,f=!0),Math.abs(k-I.left)<g&&(v=I.left-n,f=!0)}),{left:v,top:l,snapped:f}}let G=null;document.addEventListener("mouseover",t=>{!o||i||m||t.target===x||x.contains(t.target)||t.target===_||_.contains(t.target)||t.target!==e&&(G&&G!==e&&G.classList.remove("editor-hover"),G=t.target,G.classList.add("editor-hover"))}),document.addEventListener("mouseout",t=>{!o||i||t.target!==e&&G&&(G.classList.remove("editor-hover"),G=null)}),document.addEventListener("mousemove",t=>{if(!o){te.style.display="none",ae.style.display="none";return}m&&b&&(b.style.display="block",b.style.left=t.clientX+12+"px",b.style.top=t.clientY+12+"px"),i||(te.style.display="block",ae.style.display="block",te.style.top=t.clientY+"px",ae.style.left=t.clientX+"px")}),document.addEventListener("mousedown",t=>{if(!o||t.target===x||x.contains(t.target)||t.target===_||_.contains(t.target)||m)return;t.preventDefault(),t.stopPropagation();const s=t.target;O(s),G&&(G.classList.remove("editor-hover"),G=null),te.style.display="none",ae.style.display="none";const r=t.clientX,a=t.clientY,n=s.getBoundingClientRect().width;let p=!1;const u=l=>{const f=l.clientX-r,S=l.clientY-a;if(!p)if(Math.abs(f)>8||Math.abs(S)>8)p=!0,i=!0,s.classList.add("editor-dragging"),_.style.display="none",ve(s);else return;s.style.transform=`translate(${f}px, ${S}px)`,s.style.zIndex="99999",Ae(s,f,S,s.getBoundingClientRect())},v=l=>{if(document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",v),!p)return;i=!1,s.classList.remove("editor-dragging");const f=l.clientX-r,S=l.clientY-a;if(s.style.transform="",s.style.position==="absolute"||s.style.position==="fixed"){const B=parseFloat(s.style.left)||0,k=parseFloat(s.style.top)||0;s.style.left=B+f+"px",s.style.top=k+S+"px"}else{const B=s.parentElement;if(B&&B!==document.body){(!B.style.position||B.style.position==="static")&&(B.style.position="relative");const k=document.createElement("div");k.style.cssText=`width:${n}px;height:${s.getBoundingClientRect().height}px;visibility:hidden;pointer-events:none;`,B.insertBefore(k,s);const A=s.getBoundingClientRect(),w=B.getBoundingClientRect(),R=A.left-w.left,$=A.top-w.top;s.style.position="absolute",s.style.left=R+f+"px",s.style.top=$+S+"px",s.style.width=n+"px",s.style.margin="0",s.style.zIndex="99999"}}le(),Te(),ge(s),Y(s),E("changeStyle",s,"left",s.style.left),E("changeStyle",s,"top",s.style.top)};document.addEventListener("mousemove",u),document.addEventListener("mouseup",v)},!0),document.addEventListener("click",t=>{if(o&&((t.target.closest("a")||t.target.closest("button")||t.target.tagName==="A"||t.target.tagName==="BUTTON")&&(t.preventDefault(),t.stopPropagation()),!!m&&!(t.target===x||x.contains(t.target)||t.target===_||_.contains(t.target))&&(t.preventDefault(),t.stopPropagation(),m))){L++;const s=window.scrollX,r=window.scrollY,a=document.createElement("div");a.textContent=h.text||"Nuevo texto",a.style.cssText=`position:absolute;left:${t.clientX+s}px;top:${t.clientY+r}px;z-index:${L};font-family:${h.fontFamily||"Bolivar, sans-serif"};font-size:${h.fontSize||"16px"};font-weight:${h.fontWeight||"400"};color:${h.color||"#333"};padding:4px 8px;cursor:move;background:${h.backgroundColor||"transparent"};border-radius:4px;`,document.body.appendChild(a),m=!1,document.body.style.cursor="",b&&(b.style.display="none"),O(a),a.setAttribute("contenteditable","true"),a.focus(),a.addEventListener("blur",()=>{a.removeAttribute("contenteditable")},{once:!0}),E("info",null,"","📝 Texto insertado.")}},!0),document.addEventListener("dblclick",t=>{if(o||(o=!0,window.parent.postMessage({type:"ADMIN_INFO",message:"🎯 Modo edición activado automáticamente."},"*"),window.parent.postMessage({type:"EDIT_MODE_CHANGED",active:!0},"*")),t.target===x||x.contains(t.target)||t.target===_||_.contains(t.target))return;t.preventDefault(),t.stopPropagation();const s=t.target;O(s);const r=window.getComputedStyle(s),a=s.tagName==="IMG"||s.tagName==="SVG",n=["INPUT","SELECT","TEXTAREA"].includes(s.tagName),p=s.tagName==="BUTTON"||s.tagName==="A"||(s.className||"").includes("btn");window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:s.tagName.toLowerCase(),selector:Q(s),textContent:(s.textContent||"").substring(0,200),className:s.className||"",id:s.id||"",src:s.src||"",isImage:a,isFormField:n,isText:!a&&!n&&!p,placeholder:s.placeholder||"",label:"",options:s.tagName==="SELECT"?Array.from(s.options).map(u=>u.textContent):[],styles:{color:r.color,backgroundColor:r.backgroundColor,fontSize:r.fontSize,fontWeight:r.fontWeight,fontFamily:r.fontFamily,width:s.style.width||r.width,height:s.style.height||r.height}},"*")},!0),x.addEventListener("click",t=>{const s=t.target.closest("button");if(!s||!e)return;const r=s.dataset.action;if(r==="edit"){const a=e.textContent;e.setAttribute("contenteditable","true"),e.focus(),e.addEventListener("blur",()=>{e.removeAttribute("contenteditable"),e.textContent!==a&&(ie(e,"textContent",a),E("changeText",e,"textContent",e.textContent))},{once:!0})}if(r==="move"){e.classList.add("editor-dragging"),i=!0;const a=e.getBoundingClientRect(),n=e.parentElement,p=a.width/2,u=a.height/2;let v=null;ve(e),e.style.position;const l=e.style.left,f=e.style.top,S=e.style.width,B=e.style.margin,k=e.style.zIndex;e.style.position="fixed",e.style.zIndex="999999",e.style.width=a.width+"px",e.style.left=a.left+"px",e.style.top=a.top+"px",e.style.margin="0";const A=R=>{const $=R.clientX-p,T=R.clientY-u;e.style.left=$+"px",e.style.top=T+"px";const j=e.getBoundingClientRect(),I=be(e,j.left,j.top);I.snapped&&(e.style.left=$+I.left-j.left+"px",e.style.top=T+I.top-j.top+"px"),he(e.getBoundingClientRect()),e.style.visibility="hidden";const oe=document.elementFromPoint(R.clientX,R.clientY);e.style.visibility="";let N=oe;for(;N&&N!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(N.tagName)&&N.offsetWidth>80&&N.offsetHeight>30&&N!==e);)N=N.parentElement;v&&v!==N&&v.classList.remove("frame-drop-highlight"),N&&N!==document.body&&N!==e&&N!==n?(N.classList.add("frame-drop-highlight"),v=N):v=null,Y(e)},w=R=>{i=!1,e.classList.remove("editor-dragging"),le(),document.removeEventListener("mousemove",A),document.removeEventListener("mouseup",w),v&&v.classList.remove("frame-drop-highlight"),e.style.visibility="hidden";const $=document.elementFromPoint(R.clientX,R.clientY);e.style.visibility="";let T=$;for(;T&&T!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(T.tagName)&&T.offsetWidth>80&&T.offsetHeight>30&&T!==e);)T=T.parentElement;const j=e.getBoundingClientRect();if(T&&T!==document.body&&T!==n){const I=T.getBoundingClientRect();T.style.position=T.style.position||"relative",e.style.position="absolute",e.style.left=j.left-I.left+"px",e.style.top=j.top-I.top+"px",e.style.width=S,e.style.margin="0",e.style.zIndex="99999",T.appendChild(e)}else{const I=j.left-a.left,oe=j.top-a.top;e.style.position="relative",e.style.width=S,e.style.margin=B,e.style.zIndex=k||"",e.style.left=(parseFloat(l)||0)+I+"px",e.style.top=(parseFloat(f)||0)+oe+"px"}Y(e),ge(e),E("changeStyle",e,"left",e.style.left),E("changeStyle",e,"top",e.style.top),E("info",null,"","↕️ Elemento reubicado.")};document.addEventListener("mousemove",A),document.addEventListener("mouseup",w)}if(r==="copy"&&(localStorage.setItem("sb_clipboard",e.outerHTML),E("info",null,"","📋 Elemento copiado. Usa Ctrl+V para pegar.")),r==="duplicate"){const a=e.cloneNode(!0);a.classList.remove("editor-highlight"),a.style.position="relative",a.style.top="10px",e.parentNode.insertBefore(a,e.nextSibling),ie(e,"duplicate",""),E("info",null,"","⧉ Elemento duplicado.")}if(r==="delete"){const a=e.style.display;ie(e,"display",a),e.style.display="none",E("changeStyle",e,"display","none"),ne()}r==="settings"&&window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:e.tagName.toLowerCase(),selector:Q(e),textContent:e.textContent,className:e.className,id:e.id},"*")});let pe=!1,J="",H={};_.addEventListener("mousedown",t=>{const s=t.target.closest(".resize-handle");!s||!e||(t.preventDefault(),t.stopPropagation(),pe=!0,J=s.dataset.dir,e.getBoundingClientRect(),H={x:t.clientX,y:t.clientY,w:e.offsetWidth,h:e.offsetHeight,left:parseFloat(e.style.left)||0,top:parseFloat(e.style.top)||0})}),document.addEventListener("mousemove",t=>{if(!pe||!e)return;const s=t.clientX-H.x,r=t.clientY-H.y;if(J.includes("e")&&!J.includes("w")&&(e.style.width=Math.max(20,H.w+s)+"px"),J.includes("w")&&!J.includes("e")){const a=Math.max(20,H.w-s);e.style.width=a+"px",e.style.position=e.style.position||"relative",e.style.left=H.left+(H.w-a)+"px"}if(J.includes("s")&&!J.includes("n")&&(e.style.height=Math.max(20,H.h+r)+"px"),J.includes("n")&&!J.includes("s")){const a=Math.max(20,H.h-r);e.style.height=a+"px",e.style.position=e.style.position||"relative",e.style.top=H.top+(H.h-a)+"px"}Y(e)}),document.addEventListener("mouseup",()=>{pe&&e&&(pe=!1,E("changeStyle",e,"width",e.style.width),e.style.height&&E("changeStyle",e,"height",e.style.height),e.style.left&&E("changeStyle",e,"left",e.style.left),e.style.top&&E("changeStyle",e,"top",e.style.top),Pe(e))}),document.addEventListener("keydown",t=>{if(o){if(t.key==="Escape"&&ne(),t.key==="Delete"&&e&&!e.hasAttribute("contenteditable")&&(e.style.display="none",E("changeStyle",e,"display","none"),ne()),e&&!e.hasAttribute("contenteditable")&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.key)){t.preventDefault(),e.style.position="relative";const s=t.shiftKey?10:1;t.key==="ArrowUp"&&(e.style.top=(parseFloat(e.style.top)||0)-s+"px"),t.key==="ArrowDown"&&(e.style.top=(parseFloat(e.style.top)||0)+s+"px"),t.key==="ArrowLeft"&&(e.style.left=(parseFloat(e.style.left)||0)-s+"px"),t.key==="ArrowRight"&&(e.style.left=(parseFloat(e.style.left)||0)+s+"px");const r=e.getBoundingClientRect(),a=be(e,r.left,r.top);if(a.snapped){const n=a.left-r.left,p=a.top-r.top;Math.abs(n)<g*2&&(e.style.left=(parseFloat(e.style.left)||0)+n+"px"),Math.abs(p)<g*2&&(e.style.top=(parseFloat(e.style.top)||0)+p+"px")}Y(e),he(e.getBoundingClientRect()),clearTimeout(window._guideTimer),window._guideTimer=setTimeout(le,800)}if(t.ctrlKey&&t.key==="z"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(t.preventDefault(),_e()),t.ctrlKey&&t.key==="y"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(t.preventDefault(),ye()),t.ctrlKey&&t.key==="d"&&e){t.preventDefault();const s=e.cloneNode(!0);s.classList.remove("editor-highlight"),s.style.position="relative",s.style.top="10px",e.parentNode.insertBefore(s,e.nextSibling),E("info",null,"","⧉ Duplicado (Ctrl+D).")}}});function _e(){if(d.length===0)return;const t=d.pop(),s=document.querySelector(t.selector);if(!s){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo deshacer (elemento no encontrado)."},"*");return}const r=t.property==="textContent"?s.textContent:s.style[t.property];c.push({...t,newValue:r}),t.property==="textContent"?s.textContent=t.oldValue:t.property==="__fullStyle"?s.style.cssText=t.oldValue:s.style[t.property]=t.oldValue,e&&Y(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↩️ Deshecho."},"*")}function ye(){if(c.length===0)return;const t=c.pop(),s=document.querySelector(t.selector);if(!s){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo rehacer (elemento no encontrado)."},"*");return}d.push({...t}),t.property==="textContent"?s.textContent=t.newValue:t.property==="__fullStyle"?s.style.cssText=t.newValue:s.style[t.property]=t.newValue,e&&Y(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↪️ Rehecho."},"*")}window.addEventListener("message",t=>{if(!t.data)return;if(t.data.type==="ENABLE_EDIT_MODE"&&(o=!0,q.classList.add("visible")),t.data.type==="DISABLE_EDIT_MODE"&&(o=!1,ne(),q.classList.remove("visible")),t.data.type==="UNDO_ACTION"&&_e(),t.data.type==="REDO_ACTION"&&ye(),t.data.type==="DELETE_SELECTED"&&e&&(ie(e,"visibility",e.style.visibility),e.style.visibility="hidden",e.style.pointerEvents="none",E("changeStyle",e,"visibility","hidden"),ne()),t.data.type==="DUPLICATE_SELECTED"&&e){const a=e.cloneNode(!0);a.classList.remove("editor-highlight"),a.style.position="relative",a.style.top=(parseFloat(e.style.top)||0)+10+"px",a.style.left=(parseFloat(e.style.left)||0)+10+"px",e.parentNode.insertBefore(a,e.nextSibling),O(a),E("info",null,"","⧉ Elemento duplicado.")}if(t.data.type==="APPLY_EFFECT"&&e){const{effect:a,value:n}=t.data,p=e.style[a];e.style[a]=n,ie(e,a,p),E("changeStyle",e,a,n)}if(t.data.type==="LAYER_CHANGE"&&e){const a=t.data.direction,n=parseInt(e.style.zIndex)||0;a==="front"?e.style.zIndex="99999":a==="back"?e.style.zIndex="1":a==="up"?e.style.zIndex=String(n+1):a==="down"&&(e.style.zIndex=String(Math.max(0,n-1))),E("changeStyle",e,"zIndex",e.style.zIndex)}if(t.data.type==="EYEDROPPER_MODE"){document.body.style.cursor="crosshair";const a=n=>{n.preventDefault(),n.stopPropagation();const u=window.getComputedStyle(n.target).color;window.parent.postMessage({type:"EYEDROPPER_RESULT",color:u},"*"),document.body.style.cursor="",document.removeEventListener("click",a,!0)};document.addEventListener("click",a,!0)}if(t.data.type==="DROP_ELEMENT_AT"){o=!0;const{html:a,x:n,y:p}=t.data,u=document.createElement("div");u.innerHTML=a;const v=u.firstElementChild;if(!v)return;v.style.position="absolute",v.style.left=n+"px",v.style.top=p+"px",v.style.zIndex="99999",v.style.cursor="move",v.classList.add("admin-inserted");let l=document.elementFromPoint(n,p);for(;l&&l!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(l.tagName)&&l.offsetWidth>80&&l.offsetHeight>30);)l=l.parentElement;if(l&&l!==document.body){const f=l.getBoundingClientRect();l.style.position=l.style.position||"relative",v.style.left=n-f.left+"px",v.style.top=p-f.top+"px",l.appendChild(v)}else document.body.appendChild(v);O(v),d.push({selector:Q(v),property:"display",oldValue:"none",newValue:""}),c=[],E("info",null,"","✅ Elemento insertado en el frame.")}if(t.data.type==="PASTE_CLIPBOARD"){const a=localStorage.getItem("sb_clipboard");if(!a)return;const n=document.createElement("div");n.innerHTML=a;const p=n.firstElementChild;if(!p)return;p.classList.remove("editor-highlight"),p.style.position="relative",p.style.top="10px",p.style.left="10px",p.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(p,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(p),O(p),d.push({selector:Q(p),property:"display",oldValue:"none",newValue:""}),c=[],E("info",null,"","📌 Elemento pegado.")}t.data.type==="ENTER_TEXT_MODE"&&(o=!0,m=!0,h={text:t.data.text||"Nuevo texto",fontFamily:t.data.fontFamily||"Bolivar, sans-serif",fontSize:t.data.fontSize||"16px",fontWeight:t.data.fontWeight||"400",color:t.data.color||"#333333",backgroundColor:t.data.backgroundColor||"transparent"},document.body.style.cursor="text",b||(b=document.createElement("div"),b.style.cssText="position:fixed;pointer-events:none;z-index:99999;background:rgba(10,103,65,0.1);border:1px dashed #0a6741;border-radius:4px;padding:4px 10px;display:none;",document.body.appendChild(b)),b.textContent=h.text,b.style.fontFamily=h.fontFamily,b.style.fontSize=h.fontSize,b.style.fontWeight=h.fontWeight,b.style.color="#0a6741",window.parent.postMessage({type:"ADMIN_INFO",message:"📝 Haz clic donde quieras colocar el texto."},"*"));function s(){const a=document.getElementById("app-content")||document.querySelector("main")||document.querySelector(".main-content")||document.body,n=window.innerHeight/2,p=window.innerWidth/2,u=document.elementFromPoint(p,n);if(u&&u!==document.body&&u!==document.documentElement){let v=u;for(;v&&v!==a&&v!==document.body;){const l=v.parentElement;if(l&&["DIV","SECTION","MAIN","ARTICLE","FORM","HEADER"].includes(l.tagName)&&l.children.length>1)return{parent:l,refNode:v.nextSibling};v=l}}return{parent:a,refNode:a.firstChild}}function r(a,n){(!n.style.position||n.style.position==="static")&&(n.style.position="relative");const p=n.getBoundingClientRect(),u=Math.max(0,p.width/2-(a.offsetWidth||100)/2),v=Math.max(0,window.innerHeight/2-p.top);a.style.position="absolute",a.style.left=u+"px",a.style.top=v+"px",a.style.margin="0",n.appendChild(a)}if(t.data.type==="INSERT_TEXT"){const{text:a,fontSize:n,fontWeight:p,color:u,backgroundColor:v}=t.data,l=document.createElement("div");l.textContent=a||"Nuevo texto",l.style.cssText=`position:relative;margin:12px;width:fit-content;font-family:'Roboto Condensed',sans-serif;font-size:${n||"16px"};font-weight:${p||"400"};color:${u||"#1B1B1B"};background:${v||"transparent"};padding:8px 12px;cursor:move;z-index:99999;line-height:140%;`,l.classList.add("admin-inserted");const f=s();r(l,f.parent),O(l),E("info",null,"","📝 Texto insertado.")}if(t.data.type==="INSERT_SHAPE"){const a=document.createElement("div");a.classList.add("admin-inserted");const n=t.data.shape;n==="rect"?a.style.cssText="position:relative;margin:12px;width:200px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:8px;cursor:move;z-index:99999;box-shadow:0 1px 3px rgba(0,0,0,.15);":n==="circle"?a.style.cssText="position:relative;margin:12px;width:120px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:50%;cursor:move;z-index:99999;":a.style.cssText="position:relative;margin:12px;width:80%;max-width:600px;height:2px;background:#CCC;cursor:move;z-index:99999;";const p=s();r(a,p.parent),O(a),E("info",null,"","🔷 Figura insertada.")}if(t.data.type==="INSERT_IMAGE"){const a=document.createElement("img");a.src=t.data.src,a.alt=t.data.name||"",a.classList.add("admin-inserted"),a.style.cssText="position:relative;display:block;margin:12px;max-width:200px;height:auto;cursor:move;z-index:99999;";const n=s();r(a,n.parent),O(a),E("info",null,"","🖼 Imagen insertada.")}if(t.data.type==="INSERT_MODAL"){const a=document.createElement("div");a.classList.add("admin-inserted"),a.style.cssText="position:relative;margin:24px;width:500px;max-width:90%;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.2);padding:32px;cursor:move;z-index:99999;",a.innerHTML='<h3 style="font-family:Roboto Condensed,sans-serif;font-size:20px;color:#016D38;margin-bottom:16px;">Modal Stepper</h3><p style="font-size:14px;color:#666;">Contenido del modal.</p>';const n=s();r(a,n.parent),O(a),E("info",null,"","📋 Modal insertado.")}if(t.data.type==="INSERT_FORM_FIELD"){const{title:a,fieldType:n,placeholder:p,options:u,targetSelector:v}=t.data,l=n||"text",f=document.createElement("div");f.classList.add("admin-inserted"),f.style.cssText="position:relative;margin:12px;cursor:move;z-index:99999;width:311px;max-width:90%;";let S='<div style="display:flex;flex-direction:column;gap:8px;">';S+=`<label style="font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#1B1B1B;">${a||"Campo"}</label>`,l==="select"?S+=`<div style="position:relative;"><select style="width:100%;height:40px;padding:8px 40px 8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;appearance:none;">${(u||["Opción 1"]).map(A=>`<option>${A}</option>`).join("")}</select></div>`:l==="date"?S+=`<input type="date" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;">`:l==="toggle"?S+=`<div style="display:flex;align-items:center;gap:12px;"><div style="width:48px;height:26px;background:#016D38;border-radius:13px;position:relative;"><div style="width:20px;height:20px;background:#fff;border-radius:50%;position:absolute;top:3px;right:3px;box-shadow:0 1px 3px rgba(0,0,0,.2);"></div></div><span style="font-family:'Roboto Condensed',sans-serif;font-size:14px;">Sí</span></div>`:l==="radio"?(S+='<div style="display:flex;flex-direction:column;gap:12px;">',(u||["Opción 1","Opción 2"]).forEach((A,w)=>{S+=`<label style="display:flex;align-items:center;gap:8px;font-family:'Roboto Condensed',sans-serif;font-size:16px;color:#1B1B1B;cursor:pointer;"><div style="width:20px;height:20px;border-radius:50%;border:2px solid #016D38;${w===0?"background:#016D38;":""}"></div>${A}</label>`}),S+="</div>"):S+=`<input type="text" style="width:100%;height:40px;padding:8px 16px;font-family:'Roboto Condensed',sans-serif;font-size:14px;color:#333;background:#FFF;border:1px solid #999;border-radius:5px;" placeholder="${p||"Ingrese aquí"}">`,S+="</div>",f.innerHTML=S;let B=null;if(v)try{B=document.querySelector(v)}catch{}const k=B||s().parent;r(f,k),O(f),E("info",null,"","📋 Campo insertado.")}if(t.data.type==="ADMIN_OVERRIDE"){const{selector:a,property:n,value:p}=t.data;try{if(n==="__appendHTML"){const u=document.createElement("div");u.innerHTML=p;const v=u.firstElementChild;if(v){v.classList.add("admin-inserted");const l=s();l.parent.insertBefore(v,l.refNode)}}else if(n==="__placeholder"){const u=document.querySelector(a);if(u){const v=u.querySelector("input,textarea")||u;v.setAttribute&&v.setAttribute("placeholder",p)}}else if(n==="__label"){const u=document.querySelector(a);if(u){const v=u.querySelector("label");v&&(v.textContent=p)}}else if(n==="__multiStyle"){const u=document.querySelector(a);if(u)try{const v=JSON.parse(p);Object.entries(v).forEach(([l,f])=>{u.style[l]=f})}catch{}}else{const u=document.querySelector(a);u&&(n==="textContent"?u.textContent=p:n==="src"?u.src=p:u.style[n]=p)}}catch{}}if(t.data.type==="UPDATE_PLACEHOLDER")try{const a=document.querySelector(t.data.selector);if(a){const n=a.querySelector("input,textarea")||a;n.setAttribute&&n.setAttribute("placeholder",t.data.value)}}catch{}if(t.data.type==="UPDATE_LABEL")try{const a=document.querySelector(t.data.selector);if(a){const n=a.querySelector("label");n&&(n.textContent=t.data.value)}}catch{}if(t.data.type==="UPDATE_SELECT_OPTIONS")try{const a=document.querySelector(t.data.selector);if(a){const n=a.querySelector("select")||a;n.tagName==="SELECT"&&(n.innerHTML=t.data.options.map(p=>`<option>${p}</option>`).join(""))}}catch{}}),document.addEventListener("keydown",t=>{if(t.ctrlKey&&t.key==="v"&&o){t.preventDefault();const s=localStorage.getItem("sb_clipboard");if(!s)return;const r=document.createElement("div");r.innerHTML=s;const a=r.firstElementChild;if(!a)return;a.classList.remove("editor-highlight"),a.style.position="relative",a.style.top="10px",a.style.left="10px",a.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(a,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(a),O(a),d.push({selector:Q(a),property:"display",oldValue:"none",newValue:""}),c=[],E("info",null,"","📌 Pegado (Ctrl+V).")}t.ctrlKey&&t.key==="c"&&o&&e&&(t.preventDefault(),localStorage.setItem("sb_clipboard",e.outerHTML),E("info",null,"","📋 Copiado (Ctrl+C)."))})}function Ne(o){o.innerHTML=`
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
  `,qe()}function qe(){let o=1;const e=document.getElementById("vc-phase-1"),i=document.getElementById("vc-phase-2"),d=document.getElementById("vc-next-btn"),c=document.getElementById("vc-back-btn"),m=document.getElementById("vc-phase-text"),h=document.getElementById("vc-progress"),b=document.getElementById("vc-dot-1"),L=document.getElementById("vc-dot-2");function g(x){o=x,x===1?(e.style.display="",i.style.display="none",c.style.display="none",d.textContent="Siguiente",m.textContent="Paso 1 de 2",h.style.width="50%",b.classList.add("vc-phase-dot--active"),L.classList.remove("vc-phase-dot--active")):(e.style.display="none",i.style.display="",c.style.display="",d.textContent="Continuar",m.textContent="Paso 2 de 2",h.style.width="100%",b.classList.remove("vc-phase-dot--active"),L.classList.add("vc-phase-dot--active"))}c.addEventListener("click",()=>g(1)),d.addEventListener("click",()=>{if(o===1){const x=document.getElementById("vc-doc-number").value.trim(),_=document.getElementById("vc-name").value.trim();if(!x||!_){xe(["vc-doc-number","vc-name"]);return}g(2)}else{const x=document.getElementById("vc-phone").value.trim(),_=document.getElementById("vc-email").value.trim(),y=document.getElementById("vc-birthdate").value,C=document.getElementById("vc-habeas").checked,P=document.getElementById("vc-sms").checked;if(!x||!_||!y||!C||!P){xe(["vc-phone","vc-email","vc-birthdate"]);return}const M=new Date(y),F=new Date;let V=F.getFullYear()-M.getFullYear();const q=F.getMonth()-M.getMonth();if((q<0||q===0&&F.getDate()<M.getDate())&&V--,V<18||V>65){alert("La edad debe estar entre 18 y 65 años para este producto.");return}localStorage.setItem("vc_docType",document.getElementById("vc-doc-type").value),localStorage.setItem("vc_docNumber",document.getElementById("vc-doc-number").value.trim()),localStorage.setItem("vc_name",document.getElementById("vc-name").value.trim()),localStorage.setItem("vc_phone",x),localStorage.setItem("vc_email",_),localStorage.setItem("vc_birthdate",y),localStorage.setItem("vc_age",String(V));const U=new URL(window.location);U.searchParams.set("page","credit-data"),window.location.href=U.toString()}})}function xe(o){o.forEach(e=>{const i=document.getElementById(e);if(i&&!i.value.trim()){const d=i.closest(".prot-field__input");d&&(d.style.borderColor="#E53935",setTimeout(()=>d.style.borderColor="",2e3))}})}const Se={18:{life:.45,itp:.15},19:{life:.45,itp:.15},20:{life:.46,itp:.16},21:{life:.47,itp:.16},22:{life:.48,itp:.17},23:{life:.49,itp:.17},24:{life:.5,itp:.18},25:{life:.52,itp:.18},26:{life:.54,itp:.19},27:{life:.56,itp:.2},28:{life:.58,itp:.21},29:{life:.61,itp:.22},30:{life:.64,itp:.23},31:{life:.67,itp:.24},32:{life:.71,itp:.26},33:{life:.75,itp:.27},34:{life:.8,itp:.29},35:{life:.85,itp:.31},36:{life:.91,itp:.33},37:{life:.97,itp:.35},38:{life:1.04,itp:.38},39:{life:1.12,itp:.41},40:{life:1.2,itp:.44},41:{life:1.3,itp:.47},42:{life:1.4,itp:.51},43:{life:1.52,itp:.55},44:{life:1.65,itp:.6},45:{life:1.79,itp:.65},46:{life:1.95,itp:.71},47:{life:2.12,itp:.77},48:{life:2.31,itp:.84},49:{life:2.52,itp:.92},50:{life:2.75,itp:1},51:{life:3,itp:1.09},52:{life:3.28,itp:1.19},53:{life:3.58,itp:1.3},54:{life:3.91,itp:1.42},55:{life:4.27,itp:1.55},56:{life:4.66,itp:0},57:{life:5.09,itp:0},58:{life:5.56,itp:0},59:{life:6.07,itp:0},60:{life:6.63,itp:0},61:{life:7.24,itp:0},62:{life:7.9,itp:0},63:{life:8.63,itp:0},64:{life:9.42,itp:0},65:{life:10.29,itp:0}},ze=["Bancolombia","Banco de Bogotá","Davivienda","BBVA Colombia","Banco de Occidente","Banco Popular","Banco AV Villas","Scotiabank Colpatria","Banco Caja Social","Banco Falabella","Banco Itaú","Banco Pichincha","Banco W","Bancamía","Banco Agrario","Banco GNB Sudameris"];function Re(o){const e=parseInt(localStorage.getItem("vc_age")||"35");o.innerHTML=`
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
                    <img src="/vida-proteccion-creditos/Iconos/Name-icon (6).svg" alt="" class="cd-input__icon">
                    <input type="text" id="vc-bank" placeholder="Escribe el nombre de tu banco" autocomplete="off">
                  </div>
                  <div class="vc-autocomplete__list" id="vc-bank-list">
                    ${ze.map(i=>`<div class="vc-autocomplete__item" data-bank="${i}">${i}</div>`).join("")}
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
  `,De(e)}function De(o){const e=document.getElementById("vc-bank"),i=document.getElementById("vc-bank-list"),d=document.getElementById("vc-debt"),c=document.getElementById("vc-insured-slider"),m=document.getElementById("vc-insured-display"),h=document.getElementById("vc-slider-min"),b=document.getElementById("vc-slider-max"),L=document.getElementById("vc-prima-display"),g=document.getElementById("vc-prima-annual");e.addEventListener("focus",()=>i.classList.add("vc-autocomplete__list--visible")),e.addEventListener("input",()=>{const y=e.value.toLowerCase();document.querySelectorAll(".vc-autocomplete__item").forEach(C=>{C.style.display=C.dataset.bank.toLowerCase().includes(y)?"":"none"}),i.classList.add("vc-autocomplete__list--visible")}),document.querySelectorAll(".vc-autocomplete__item").forEach(y=>{y.addEventListener("click",()=>{e.value=y.dataset.bank,i.classList.remove("vc-autocomplete__list--visible")})}),document.addEventListener("click",y=>{y.target.closest(".vc-autocomplete")||i.classList.remove("vc-autocomplete__list--visible")});const x=document.getElementById("vc-quote-insured");d.addEventListener("input",()=>{const y=d.value.replace(/[^0-9]/g,"");if(!y){d.value="";return}const C=parseInt(y,10);d.value=K(C),c.min=C,c.max=C*2,(parseInt(c.value,10)<C||parseInt(c.value,10)>C*2)&&(c.value=C),h.textContent=`Mín: ${K(C)}`,b.textContent=`Máx: ${K(C*2)}`;const P=parseInt(c.value,10);m.textContent=K(P),_(P)}),c.addEventListener("input",()=>{const y=parseInt(c.value,10);m.textContent=K(y),_(y)});function _(y){const C=Se[o]||Se[35],P=C.life,M=C.itp,F=Math.round((P+M)*y/1e3),V=Math.round(F/12);L.textContent=K(V),g.textContent=`Anual: ${K(F)}`,x&&(x.textContent=K(y));const q=L.closest(".cd-quote__amount");q&&(q.classList.add("cd-quote__amount--pulse"),clearTimeout(q._pulseT),q._pulseT=setTimeout(()=>q.classList.remove("cd-quote__amount--pulse"),200)),localStorage.setItem("vc_insuredValue",String(y)),localStorage.setItem("vc_annualPrima",String(F)),localStorage.setItem("vc_monthlyPrima",String(V)),localStorage.setItem("vc_itpActive","1"),localStorage.setItem("vc_lifeRate",String(P)),localStorage.setItem("vc_itpRate",String(M)),localStorage.setItem("vc_skipHealth",y<=15e7?"1":"0")}_(parseInt(c.value)),document.getElementById("cd-back").addEventListener("click",()=>{window.location.href=window.location.pathname}),document.getElementById("cd-continue").addEventListener("click",()=>{const y=e.value.trim(),C=d.value.replace(/[^0-9]/g,"");if(!y){const M=e.closest(".cd-input");M&&(M.style.borderColor="#E53935",setTimeout(()=>M.style.borderColor="",2e3));return}if(!C){const M=d.closest(".cd-input");M&&(M.style.borderColor="#E53935",setTimeout(()=>M.style.borderColor="",2e3));return}localStorage.setItem("vc_bank",y),localStorage.setItem("vc_debt",C);const P=new URL(window.location);P.searchParams.set("page","quotation"),window.location.href=P.toString()})}function K(o){return"$"+o.toLocaleString("es-CO")}function Fe(o){const e=parseInt(localStorage.getItem("vc_monthlyPrima")||"37500"),i=parseInt(localStorage.getItem("vc_annualPrima")||"450000"),d=parseInt(localStorage.getItem("vc_insuredValue")||"50000000"),c=localStorage.getItem("vc_bank")||"Tu banco",h=(localStorage.getItem("vc_phone")||"3103025462").slice(-4),b=L=>"$"+L.toLocaleString("es-CO");o.innerHTML=`
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
              <p style="font-family:var(--prot-font);font-size:14px;color:#5B5B5B;text-align:center">Protección de crédito con ${c}</p>

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
                Pago anual: ${b(i)} (ahorra 2 meses)
              </div>

              <!-- Coverages -->
              <div class="vc-quote-card__coverages">
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).svg" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Muerte por cualquier causa</span>
                  <span class="vc-quote-coverage__value">${b(d)}</span>
                </div>
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).svg" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Incapacidad total y permanente</span>
                  <span class="vc-quote-coverage__value">${b(d)}</span>
                </div>
                <div class="vc-quote-coverage">
                  <img src="/vida-proteccion-creditos/Iconos/name-icon (8).svg" alt="" class="vc-quote-coverage__icon">
                  <span class="vc-quote-coverage__text">Beneficiario: ${c}</span>
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
              <span class="otp-modal__phone-number">*** *** ${h}</span>
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
  `,Ve(e,i)}function Ve(o,e){const i=y=>"$"+y.toLocaleString("es-CO");let d=!0;const c=document.getElementById("qt-price-display"),m=document.getElementById("qt-period-label"),h=document.getElementById("qt-alt-price"),b=document.getElementById("qt-period-toggle"),L=document.getElementById("qt-lbl-monthly"),g=document.getElementById("qt-lbl-annual");b.addEventListener("click",()=>{d=!d,b.classList.toggle("vc-toggle--active",d),d?(c.textContent=i(o),m.textContent="/mes",h.textContent=`Pago anual: ${i(e)} (ahorra 2 meses)`,L.style.color="#009056",L.style.fontWeight="700",g.style.color="#757575",g.style.fontWeight="400"):(c.textContent=i(e),m.textContent="/año",h.textContent=`Pago mensual: ${i(o)}`,g.style.color="#009056",g.style.fontWeight="700",L.style.color="#757575",L.style.fontWeight="400"),localStorage.setItem("vc_periodicity",d?"monthly":"annual")}),document.getElementById("qt-back").addEventListener("click",()=>{const y=new URL(window.location);y.searchParams.set("page","credit-data"),window.location.href=y.toString()}),document.getElementById("qt-save").addEventListener("click",()=>{alert("Tu cotización ha sido guardada. Podrás retomarla cuando quieras.")}),document.getElementById("qt-pdf").addEventListener("click",()=>{alert("Descargando PDF de tu cotización...")}),document.getElementById("qt-continue").addEventListener("click",()=>{localStorage.setItem("vc_periodicity",d?"monthly":"annual"),document.getElementById("otp-overlay").classList.add("otp-overlay--visible")});const x=document.getElementById("otp-input"),_=document.getElementById("otp-validate");x.addEventListener("input",()=>{const y=x.value.replace(/\D/g,"");x.value=y,y.length===6?(_.disabled=!1,_.classList.add("otp-modal__btn-validate--active")):(_.disabled=!0,_.classList.remove("otp-modal__btn-validate--active"))}),_.addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible"),document.getElementById("success-overlay").classList.add("otp-overlay--visible"),setTimeout(()=>{const y=new URL(window.location);y.searchParams.set("page","complementary"),window.location.href=y.toString()},2500)}),document.getElementById("otp-close").addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible")}),document.getElementById("otp-cancel").addEventListener("click",()=>{document.getElementById("otp-overlay").classList.remove("otp-overlay--visible")})}const Le={Amazonas:["El Encanto","La Chorrera","La Pedrera","La Victoria","Leticia","Miriti Paraná","Puerto Alegría","Puerto Arica","Puerto Nariño","Puerto Santander","Tarapacá"],Antioquia:["Abejorral","Abriaquí","Alejandría","Amagá","Amalfi","Andes","Angelópolis","Angostura","Anorí","Anza","Apartadó","Arboletes","Argelia","Armenia","Barbosa","Bello","Belmira","Betania","Betulia","Briceño","Buriticá","Caicedo","Caldas","Campamento","Caracolí","Caramanta","Carepa","Carolina","Caucasia","Cañasgordas","Chigorodó","Cisneros","Ciudad Bolívar","Cocorná","Concepción","Concordia","Copacabana","Cáceres","Dabeiba","Don Matías","Ebéjico","El Bagre","El Carmen de Viboral","El Santuario","Entrerrios","Envigado","Fredonia","Frontino","Giraldo","Girardota","Granada","Guadalupe","Guarne","Guatapé","Gómez Plata","Heliconia","Hispania","Itagui","Ituango","Jardín","Jericó","La Ceja","La Estrella","La Pintada","La Unión","Liborina","Maceo","Marinilla","Medellín","Montebello","Murindó","Mutatá","Nariño","Nechí","Necoclí","Olaya","Peque","Peñol","Pueblorrico","Puerto Berrío","Puerto Nare","Puerto Triunfo","Remedios","Retiro","Rionegro","Sabanalarga","Sabaneta","Salgar","San Andrés de Cuerquía","San Carlos","San Francisco","San Jerónimo","San José de La Montaña","San Juan de Urabá","San Luis","San Pedro","San Pedro de Uraba","San Rafael","San Roque","San Vicente","Santa Bárbara","Santa Rosa de Osos","Santafé de Antioquia","Santo Domingo","Segovia","Sonsón","Sopetrán","Tarazá","Tarso","Titiribí","Toledo","Turbo","Támesis","Uramita","Urrao","Valdivia","Valparaíso","Vegachí","Venecia","Vigía del Fuerte","Yalí","Yarumal","Yolombó","Yondó","Zaragoza"],Arauca:["Arauca","Arauquita","Cravo Norte","Fortul","Puerto Rondón","Saravena","Tame"],Atlántico:["Baranoa","Barranquilla","Campo de La Cruz","Candelaria","Galapa","Juan de Acosta","Luruaco","Malambo","Manatí","Palmar de Varela","Piojó","Polonuevo","Ponedera","Puerto Colombia","Repelón","Sabanagrande","Sabanalarga","Santa Lucía","Santo Tomás","Soledad","Suan","Tubará","Usiacurí"],"Bogotá D.C.":["Bogotá D.C."],Bolívar:["Achí","Altos del Rosario","Arenal","Arjona","Arroyohondo","Barranco de Loba","Calamar","Cantagallo","Cartagena","Cicuco","Clemencia","Córdoba","El Carmen de Bolívar","El Guamo","El Peñón","Hatillo de Loba","Magangué","Mahates","Margarita","María la Baja","Mompós","Montecristo","Morales","Norosí","Pinillos","Regidor","Río Viejo","San Cristóbal","San Estanislao","San Fernando","San Jacinto","San Jacinto del Cauca","San Juan Nepomuceno","San Martín de Loba","San Pablo de Borbur","Santa Catalina","Santa Rosa","Santa Rosa del Sur","Simití","Soplaviento","Talaigua Nuevo","Tiquisio","Turbaco","Turbaná","Villanueva","Zambrano"],Boyacá:["Almeida","Aquitania","Arcabuco","Belén","Berbeo","Betéitiva","Boavita","Boyacá","Briceño","Buena Vista","Busbanzá","Caldas","Campohermoso","Cerinza","Chinavita","Chiquinquirá","Chiscas","Chita","Chitaraque","Chivatá","Chivor","Chíquiza","Ciénega","Coper","Corrales","Covarachía","Cubará","Cucaita","Cuítiva","Cómbita","Duitama","El Cocuy","El Espino","Firavitoba","Floresta","Gachantivá","Gameza","Garagoa","Guacamayas","Guateque","Guayatá","Güicán","Iza","Jenesano","Jericó","La Capilla","La Uvita","La Victoria","Labranzagrande","Macanal","Maripí","Miraflores","Mongua","Monguí","Moniquirá","Motavita","Muzo","Nobsa","Nuevo Colón","Oicatá","Otanche","Pachavita","Paipa","Pajarito","Panqueba","Pauna","Paya","Paz de Río","Pesca","Pisba","Puerto Boyacá","Páez","Quípama","Ramiriquí","Rondón","Ráquira","Saboyá","Samacá","San Eduardo","San José de Pare","San Luis de Gaceno","San Mateo","San Miguel de Sema","San Pablo de Borbur","Santa María","Santa Rosa de Viterbo","Santa Sofía","Santana","Sativanorte","Sativasur","Siachoque","Soatá","Socha","Socotá","Sogamoso","Somondoco","Sora","Soracá","Sotaquirá","Susacón","Sutamarchán","Sutatenza","Sáchica","Tasco","Tenza","Tibaná","Tibasosa","Tinjacá","Tipacoque","Toca","Togüí","Tota","Tunja","Tununguá","Turmequé","Tuta","Tutazá","Tópaga","Umbita","Ventaquemada","Villa de Leyva","Viracachá","Zetaquira"],Caldas:["Aguadas","Anserma","Aranzazu","Belalcázar","Chinchiná","Filadelfia","La Dorada","La Merced","Manizales","Manzanares","Marmato","Marquetalia","Marulanda","Neira","Norcasia","Palestina","Pensilvania","Pácora","Riosucio","Risaralda","Salamina","Samaná","San José","Supía","Victoria","Villamaría","Viterbo"],Caquetá:["Albania","Belén de Los Andaquies","Cartagena del Chairá","Curillo","El Doncello","El Paujil","Florencia","La Montañita","Milán","Morelia","Puerto Rico","San José del Fragua","San Vicente del Caguán","Solano","Solita","Valparaíso"],Casanare:["Aguazul","Chámeza","Hato Corozal","La Salina","Maní","Monterrey","Nunchía","Orocué","Paz de Ariporo","Pore","Recetor","Sabanalarga","San Luis de Gaceno","Sácama","Tauramena","Trinidad","Támara","Villanueva","Yopal"],Cauca:["Almaguer","Argelia","Balboa","Bolívar","Buenos Aires","Cajibío","Caldono","Caloto","Corinto","El Tambo","Florencia","Guachené","Guapi","Inzá","Jambaló","La Sierra","La Vega","López","Mercaderes","Miranda","Morales","Padilla","Patía","Piamonte","Piendamó","Popayán","Puerto Tejada","Puracé","Páez","Rosas","San Sebastián","Santa Rosa","Santander de Quilichao","Silvia","Sotara","Sucre","Suárez","Timbiquí","Timbío","Toribio","Totoró","Villa Rica"],Cesar:["Aguachica","Agustín Codazzi","Astrea","Becerril","Bosconia","Chimichagua","Chiriguaná","Curumaní","El Copey","El Paso","Gamarra","González","La Gloria","La Jagua de Ibirico","La Paz","Manaure","Pailitas","Pelaya","Pueblo Bello","Río de Oro","San Alberto","San Diego","San Martín","Tamalameque","Valledupar"],Chocó:["Acandí","Alto Baudo","Atrato","Bagadó","Bahía Solano","Bajo Baudó","Belén de Bajira","Bojaya","Carmen del Darien","Condoto","Cértegui","El Cantón del San Pablo","El Carmen de Atrato","El Litoral del San Juan","Istmina","Juradó","Lloró","Medio Atrato","Medio Baudó","Medio San Juan","Nuquí","Nóvita","Quibdó","Riosucio","Río Iro","Río Quito","San José del Palmar","Sipí","Tadó","Unguía","Unión Panamericana"],Cundinamarca:["Agua de Dios","Albán","Anapoima","Anolaima","Apulo","Arbeláez","Beltrán","Bituima","Bojacá","Cabrera","Cachipay","Cajicá","Caparrapí","Caqueza","Carmen de Carupa","Chaguaní","Chipaque","Choachí","Chocontá","Chía","Cogua","Cota","Cucunubá","El Colegio","El Peñón","El Rosal","Facatativá","Fomeque","Fosca","Funza","Fusagasugá","Fúquene","Gachala","Gachancipá","Gachetá","Gama","Girardot","Granada","Guachetá","Guaduas","Guasca","Guataquí","Guatavita","Guayabal de Siquima","Guayabetal","Gutiérrez","Jerusalén","Junín","La Calera","La Mesa","La Palma","La Peña","La Vega","Lenguazaque","Macheta","Madrid","Manta","Medina","Mosquera","Nariño","Nemocón","Nilo","Nimaima","Nocaima","Pacho","Paime","Pandi","Paratebueno","Pasca","Puerto Salgar","Pulí","Quebradanegra","Quetame","Quipile","Ricaurte","San Antonio del Tequendama","San Bernardo","San Cayetano","San Francisco","San Juan de Río Seco","Sasaima","Sesquilé","Sibaté","Silvania","Simijaca","Soacha","Sopó","Subachoque","Suesca","Supatá","Susa","Sutatausa","Tabio","Tausa","Tena","Tenjo","Tibacuy","Tibirita","Tocaima","Tocancipá","Topaipí","Ubalá","Ubaque","Une","Venecia","Vergara","Vianí","Villa de San Diego de Ubate","Villagómez","Villapinzón","Villeta","Viotá","Yacopí","Zipacón","Zipaquirá","Útica"],Córdoba:["Ayapel","Buenavista","Canalete","Cereté","Chimá","Chinú","Ciénaga de Oro","Cotorra","La Apartada","Lorica","Los Córdobas","Momil","Montelíbano","Montería","Moñitos","Planeta Rica","Pueblo Nuevo","Puerto Escondido","Puerto Libertador","Purísima","Sahagún","San Andrés Sotavento","San Antero","San Bernardo del Viento","San Carlos","San José de Uré","San Pelayo","Tierralta","Tuchín","Valencia"],Guainía:["Barranco Minas","Cacahual","Inírida","La Guadalupe","Mapiripana","Morichal","Pana Pana","Puerto Colombia","San Felipe"],Guaviare:["Calamar","El Retorno","Miraflores","San José del Guaviare"],Huila:["Acevedo","Agrado","Aipe","Algeciras","Altamira","Baraya","Campoalegre","Colombia","Elías","Garzón","Gigante","Guadalupe","Hobo","Iquira","Isnos","La Argentina","La Plata","Neiva","Nátaga","Oporapa","Paicol","Palermo","Palestina","Pital","Pitalito","Rivera","Saladoblanco","San Agustín","Santa María","Suaza","Tarqui","Tello","Teruel","Tesalia","Timaná","Villavieja","Yaguará"],"La Guajira":["Albania","Barrancas","Dibula","Distracción","El Molino","Fonseca","Hatonuevo","La Jagua del Pilar","Maicao","Manaure","Riohacha","San Juan del Cesar","Uribia","Urumita","Villanueva"],Magdalena:["Algarrobo","Aracataca","Ariguaní","Cerro San Antonio","Chivolo","Ciénaga","Concordia","El Banco","El Piñon","El Retén","Fundación","Guamal","Nueva Granada","Pedraza","Pijiño del Carmen","Pivijay","Plato","Pueblo Viejo","Remolino","Sabanas de San Angel","Salamina","San Sebastián de Buenavista","San Zenón","Santa Ana","Santa Bárbara de Pinto","Santa Marta","Sitionuevo","Tenerife","Zapayán","Zona Bananera"],Meta:["Acacias","Barranca de Upía","Cabuyaro","Castilla la Nueva","Cubarral","Cumaral","El Calvario","El Castillo","El Dorado","Fuente de Oro","Granada","Guamal","La Macarena","Lejanías","Mapiripán","Mesetas","Puerto Concordia","Puerto Gaitán","Puerto Lleras","Puerto López","Puerto Rico","Restrepo","San Carlos de Guaroa","San Juan de Arama","San Juanito","San Martín","Uribe","Villavicencio","Vista Hermosa"],Nariño:["Albán","Aldana","Ancuyá","Arboleda","Barbacoas","Belén","Buesaco","Chachagüí","Colón","Consaca","Contadero","Cuaspud","Cumbal","Cumbitara","Córdoba","El Charco","El Peñol","El Rosario","El Tablón de Gómez","El Tambo","Francisco Pizarro","Funes","Guachucal","Guaitarilla","Gualmatán","Iles","Imués","Ipiales","La Cruz","La Florida","La Llanada","La Tola","La Unión","Leiva","Linares","Los Andes","Magüí","Mallama","Mosquera","Nariño","Olaya Herrera","Ospina","Pasto","Policarpa","Potosí","Providencia","Puerres","Pupiales","Ricaurte","Roberto Payán","Samaniego","San Andrés de Tumaco","San Bernardo","San Lorenzo","San Pablo","San Pedro de Cartago","Sandoná","Santa Bárbara","Santacruz","Sapuyes","Taminango","Tangua","Túquerres","Yacuanquer"],"Norte de Santander":["Abrego","Arboledas","Bochalema","Bucarasica","Cachirá","Chinácota","Chitagá","Convención","Cucutilla","Cácota","Cúcuta","Durania","El Carmen","El Tarra","El Zulia","Gramalote","Hacarí","Herrán","La Esperanza","La Playa","Labateca","Los Patios","Lourdes","Mutiscua","Ocaña","Pamplona","Pamplonita","Puerto Santander","Ragonvalia","Salazar","San Calixto","San Cayetano","Santiago","Sardinata","Silos","Teorama","Tibú","Toledo","Villa Caro","Villa del Rosario"],"Providencia y Santa Catalina":["Providencia, Archipiélago de San Andrés","San Andrés, Archipiélago de San Andrés"],Putumayo:["Colón","Leguízamo","Mocoa","Orito","Puerto Asís","Puerto Caicedo","Puerto Guzmán","San Francisco","San Miguel","Santiago","Sibundoy","Valle de Guamez","Villagarzón"],Quindío:["Armenia","Buenavista","Calarcá","Circasia","Córdoba","Filandia","Génova","La Tebaida","Montenegro","Pijao","Quimbaya","Salento"],Risaralda:["Apía","Balboa","Belén de Umbría","Dosquebradas","Guática","La Celia","La Virginia","Marsella","Mistrató","Pereira","Pueblo Rico","Quinchía","Santa Rosa de Cabal","Santuario"],Santander:["Aguada","Albania","Aratoca","Barbosa","Barichara","Barrancabermeja","Betulia","Bolívar","Bucaramanga","Cabrera","California","Capitanejo","Carcasí","Cepitá","Cerrito","Charalá","Charta","Chimá","Chipatá","Cimitarra","Concepción","Confines","Contratación","Coromoro","Curití","El Carmen de Chucurí","El Guacamayo","El Peñón","El Playón","Encino","Enciso","Floridablanca","Florián","Galán","Gambita","Girón","Guaca","Guadalupe","Guapotá","Guavatá","Güepsa","Hato","Jesús María","Jordán","La Belleza","La Paz","Landázuri","Lebríja","Los Santos","Macaravita","Matanza","Mogotes","Molagavita","Málaga","Ocamonte","Oiba","Onzaga","Palmar","Palmas del Socorro","Piedecuesta","Pinchote","Puente Nacional","Puerto Parra","Puerto Wilches","Páramo","Rionegro","Sabana de Torres","San Andrés","San Benito","San Gil","San Joaquín","San José de Miranda","San Miguel","San Vicente de Chucurí","Santa Bárbara","Santa Helena del Opón","Simacota","Socorro","Suaita","Sucre","Suratá","Tona","Valle de San José","Vetas","Villanueva","Vélez","Zapatoca"],Sucre:["Buenavista","Caimito","Chalán","Coloso","Corozal","Coveñas","El Roble","Galeras","Guaranda","La Unión","Los Palmitos","Majagual","Morroa","Ovejas","Palmito","Sampués","San Benito Abad","San Juan de Betulia","San Luis de Sincé","San Marcos","San Onofre","San Pedro","Santiago de Tolú","Sincelejo","Sucre","Tolú Viejo"],Tolima:["Alpujarra","Alvarado","Ambalema","Anzoátegui","Armero","Ataco","Cajamarca","Carmen de Apicala","Casabianca","Chaparral","Coello","Coyaima","Cunday","Dolores","Espinal","Falan","Flandes","Fresno","Guamo","Herveo","Honda","Ibagué","Icononzo","Lérida","Líbano","Mariquita","Melgar","Murillo","Natagaima","Ortega","Palocabildo","Piedras","Planadas","Prado","Purificación","Rio Blanco","Roncesvalles","Rovira","Saldaña","San Antonio","San Luis","Santa Isabel","Suárez","Valle de San Juan","Venadillo","Villahermosa","Villarrica"],"Valle del Cauca":["Alcalá","Andalucía","Ansermanuevo","Argelia","Bolívar","Buenaventura","Bugalagrande","Caicedonia","Cali","Calima","Candelaria","Cartago","Dagua","El Cairo","El Cerrito","El Dovio","El Águila","Florida","Ginebra","Guacarí","Guadalajara de Buga","Jamundí","La Cumbre","La Unión","La Victoria","Obando","Palmira","Pradera","Restrepo","Riofrío","Roldanillo","San Pedro","Sevilla","Toro","Trujillo","Tuluá","Ulloa","Versalles","Vijes","Yotoco","Yumbo","Zarzal"],Vaupés:["Caruru","Mitú","Pacoa","Papunaua","Taraira","Yavaraté"],Vichada:["Cumaribo","La Primavera","Puerto Carreño","Santa Rosalía"]},Oe=Object.keys(Le);function $e(o){return Le[o]||[]}function Ce(o){return(o||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function Ge(o,e){const i=Ce(e);return i?o.filter(d=>Ce(d).includes(i)):o.slice()}function He(o){localStorage.getItem("vc_name"),localStorage.getItem("vc_email");const e=localStorage.getItem("vc_bank")||"Bancolombia",i=parseInt(localStorage.getItem("vc_debt")||"50000000"),d=parseInt(localStorage.getItem("vc_insuredValue")||"50000000"),c=d>i,m=Math.round(i/d*100),h=100-m,b=localStorage.getItem("vc_skipHealth")==="1";o.innerHTML=`
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
                      <button class="pd-chip pd-chip--active" data-value="F">Femenino</button>
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
                  <span class="vc-beneficiary-auto__text"><strong>${e}</strong> recibe el ${m}% del valor asegurado (equivalente a tu deuda).</span>
                </div>

                ${c?`
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
          <button class="pd-footer__btn" id="comp-continue">Continuar</button>
        </div>
      </div>
    </div>
  `,je()}function je(){Xe(),Ue(),We(),document.getElementById("comp-back").addEventListener("click",()=>{const o=new URL(window.location);o.searchParams.set("page","quotation"),window.location.href=o.toString()}),document.getElementById("comp-continue").addEventListener("click",Qe)}function Ue(){document.querySelectorAll(".vc-collapsible__header").forEach(o=>{o.addEventListener("click",()=>{const e=o.closest(".vc-collapsible");if(e.classList.contains("vc-collapsible--locked"))return;const i=!e.classList.contains("vc-collapsible--open");document.querySelectorAll(".vc-collapsible").forEach(d=>d.classList.remove("vc-collapsible--open")),i&&e.classList.add("vc-collapsible--open")})}),document.querySelectorAll("#sec-personal input, #sec-personal .pd-chip").forEach(o=>{o.addEventListener("input",re),o.addEventListener("click",re)}),re()}function Ye(){var d,c,m;const o=(d=document.getElementById("comp-dept"))==null?void 0:d.value.trim(),e=(c=document.getElementById("comp-city"))==null?void 0:c.value.trim(),i=(m=document.getElementById("comp-address"))==null?void 0:m.value.trim();return!!(o&&e&&i)}function re(){var i;const o=document.getElementById("sec-beneficiaries");if(!o)return;const e=o.classList.contains("vc-collapsible--locked");if(Ye())o.classList.remove("vc-collapsible--locked"),e&&((i=document.getElementById("sec-personal"))==null||i.classList.remove("vc-collapsible--open"),o.classList.add("vc-collapsible--open"));else{o.classList.add("vc-collapsible--locked"),o.classList.remove("vc-collapsible--open");const d=document.getElementById("sec-credit");d==null||d.classList.add("vc-collapsible--locked"),d==null||d.classList.remove("vc-collapsible--open")}}function Je(){var c;const o=document.getElementById("comp-benef-name"),e=!o||o.value.trim().length>0,i=document.getElementById("sec-credit");if(!i)return;const d=i.classList.contains("vc-collapsible--locked");e&&(i.classList.remove("vc-collapsible--locked"),d&&((c=document.getElementById("sec-beneficiaries"))==null||c.classList.remove("vc-collapsible--open"),i.classList.add("vc-collapsible--open")))}function We(){var o;document.querySelectorAll(".pd-chip").forEach(e=>{e.addEventListener("click",()=>{e.closest(".pd-field__chips").querySelectorAll(".pd-chip").forEach(i=>i.classList.remove("pd-chip--active")),e.classList.add("pd-chip--active")})}),(o=document.getElementById("comp-benef-name"))==null||o.addEventListener("input",Je)}function Xe(){const o=document.getElementById("comp-dept"),e=document.getElementById("comp-city"),i=document.getElementById("comp-dept-list"),d=document.getElementById("comp-city-list"),c=()=>{ce(o,i),ce(e,d)};Ee(o,i,()=>Oe,m=>{o.value=m,e.value="",e.disabled=!1,e.placeholder="Selecciona o escribe",ce(o,i),re()}),Ee(e,d,()=>$e(o.value.trim()),m=>{e.value=m,ce(e,d),re()}),document.addEventListener("click",m=>{m.target.closest(".vc-ac")||c()})}function Ee(o,e,i,d){const c=m=>{const h=i(),b=Ge(h,m);e.innerHTML=b.map(L=>`<li class="vc-ac__item" role="option" tabindex="-1" data-value="${L}">${L}</li>`).join(""),b.length?(e.classList.add("vc-ac__list--visible"),o.setAttribute("aria-expanded","true")):ce(o,e),e.querySelectorAll(".vc-ac__item").forEach(L=>{L.addEventListener("mousedown",g=>{g.preventDefault(),d(L.dataset.value)})})};o.addEventListener("focus",()=>{o.disabled||c("")}),o.addEventListener("click",()=>{o.disabled||c(o.value)}),o.addEventListener("input",()=>c(o.value))}function ce(o,e){e.classList.remove("vc-ac__list--visible"),e.innerHTML="",o.setAttribute("aria-expanded","false")}function Qe(){var x,_,y,C,P,M;const o=((x=document.querySelector(".pd-chip--active"))==null?void 0:x.dataset.value)||"F",e=((_=document.getElementById("comp-dept"))==null?void 0:_.value.trim())||"",i=((y=document.getElementById("comp-city"))==null?void 0:y.value.trim())||"",d=((C=document.getElementById("comp-address"))==null?void 0:C.value)||"",c=((P=document.getElementById("comp-occupation"))==null?void 0:P.value)||"",m=((M=document.getElementById("comp-credit-number"))==null?void 0:M.value)||"";localStorage.setItem("vc_gender",o),localStorage.setItem("vc_dept",e),localStorage.setItem("vc_city",i),localStorage.setItem("vc_address",d),localStorage.setItem("vc_occupation",c),localStorage.setItem("vc_creditNumber",m);const h=document.getElementById("comp-benef-name"),b=document.getElementById("comp-benef-rel");if(h){const F=h.value.trim(),V=(b==null?void 0:b.value)||"";localStorage.setItem("vc_hasSecondInsured","1"),localStorage.setItem("vc_insuredName",F||"Beneficiario"),localStorage.setItem("vc_beneficiaryRel",V),localStorage.removeItem("vc_insuredGender")}else localStorage.setItem("vc_hasSecondInsured","0"),localStorage.removeItem("vc_insuredName"),localStorage.removeItem("vc_beneficiaryRel"),localStorage.removeItem("vc_insuredGender");const L=localStorage.getItem("vc_skipHealth")==="1",g=new URL(window.location);g.searchParams.set("page",L?"summary":"health"),window.location.href=g.toString()}const se="/vida-proteccion-creditos";function Ze(){const o=localStorage.getItem("vc_name")||"Simón Andrés Bolívar Libertad",e=localStorage.getItem("vc_gender")||"M";return[{id:"holder",name:o,gender:e,icon:`${se}/Iconos/user-shield.svg`}]}const ue=[{title:"¿Tiene, ha tenido o esta en estudio de enfermedades del corazón o del sistema cardiovascular?",detail:"Hipertensión arterial, arritmias, enfermedad coronaria, infarto cardíaco, angina, afecciones de las válvulas del corazón, evento cerebrovascular, tromboembolismo, trombosis, accidente isquémico transitorio, aneurismas."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades endocrinas, metabólicas?",detail:"Diabetes, pre diabetes, resistencia a la insulina, nódulos tiroideos, hipertiroidismo, hiperprolactinemia, Enfermedad de Graves, Obesidad, Enfermedad de Addison, Enfermedad de Cushing, Cirugía Bariátrica."},{title:"Está tomando algún medicamento actualmente o está bajo algún tratamiento médico, terapia y/o rehabilitación:",detail:"Física, psicología, fonoaudiología, ocupacional, neuropsicología. En caso afirmativo indique nombre de medicamento y/o tratamiento, y el diagnóstico."},{title:"¿Está embarazada actualmente o sospecha que está embarazada?",onlyGender:"F"},{title:"¿Tiene, ha tenido o esta en estudio de Enfermedades autoinmunes o el colágeno?",detail:"Lupus, artritis reumatoidea, vasculitis, espondilitis, colitis ulcerativa, esclerodermia, glomerulopatías o enfermedad del colágeno no determinada, miastenia gravis, síndrome de sjögren, esclerosis lateral amiotrófica, fibrosis quística, enfermedades tipificadas como huérfanas, artritis psoriásica, artritis reumatoidea, espondilitis anquilosante."},{title:"¿Tiene, ha tenido o esta en estudio de Enfermedades o eventos neurológicos?",detail:"Evento cerebrovascular, accidente isquémico transitorio, trombosis, epilepsia, convulsiones, esclerosis múltiple, alzheimer, guillain barre, parálisis, tumores cerebrales, migraña o cefaleas crónicas, neuralgias, meningitis, aneurismas cerebrales, fístulas, hidrocefalia, parkinson, TEC (Traumatismo craneoencefálico), neuropatías.",detail2Title:"¿y/ o Lesión en órganos de los sentidos?",detail2:"Pérdida o disminución visual, Pérdida o disminución auditiva, Desviación del Tabique nasal."},{title:"¿Tiene, ha tenido o esta en estudio de alteración del desarrollo y/o desorden psiquiátrico?",detail:"Depresión, ansiedad, trastorno bipolar, esquizofrenia, déficit de atención, hiperactividad, trastorno del espectro autista, alteraciones del lenguaje o desarrollo psicomotor, trastornos alimenticios, autismo, dependencia al alcohol, consumo y/o dependencia a drogas ilícitas, psicotrópicas, demencia."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades, amputaciones o lesiones de los huesos o articulaciones?",detail:"Hombro, tobillo, rodillas, cadera, codo, dedos de las manos, muñeca, dedos de los pies, afecciones en meniscos, luxaciones, artrosis, fracturas, alguna afección y/o desviación de la columna, hernias discales, osteoporosis, distrofia muscular, gota, artritis gotosa o síndrome de lobstein."},{title:"¿Tiene, ha tenido o esta en estudio de enfermedades pulmonares?",detail:"Asma, EPOC (enfermedad pulmonar obstructiva crónica), síndrome bronco obstructivo recurrente, nódulos pulmonares, Fibrosis pulmonar, enfisema pulmonar, trasplante pulmonar."},{title:"¿Cáncer o similares?",detail:"Linfoma, leucemia, tumores, masas, nódulos, quistes, lesiones premalignas, pólipos, lipomas, fibromas, nevos o lunares, mujeres (nódulos mamarios).",important:"De acuerdo con lo dispuesto en la ley 2475 del 2025, si terminó su tratamiento contra el cáncer hace más de 4 años sin recaídas posteriores (si el cáncer fue diagnosticado siendo menor de edad, el tiempo anterior se disminuirá a 2 años) no debe reportar este antecedente."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades de riñones, próstata (hombres) o aparato urogenital?",detail:"Cálculos, cólico renal, hiperplasia de la próstata, insuficiencia renal, glomerulonefritis, sangre en la orina, proteínas en la orina, síndrome nefrótico, Infección de vías urinarias recurrentes, incontinencia urinaria, cistocele, prolapso uterino, vejiga neurogénica."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades del hígado, gástricas, colón?",detail:"Cirrosis, hepatitis C, pólipos en colon, úlceras, colitis, divertículos, enfermedad por reflujo gastroesofágico, esófago de barrett, hernia(s) (diafragmática, hiatal, inguinal, umbilical), cálculos biliares, pancreatitis aguda y/o crónica,  enfermedad de crohn, sangrados del tubo digestivo, rectocele."},{title:"¿Tiene, ha tenido o esta en estudio de  enfermedades de la sangre o infecciosa?",detail:"Trastornos de la coagulación, talasemia, trombocitopenia, leucopenia, anemia actual, leucemia, hemofilia, infección por VIH y/o VIH - SIDA, púrpura trombocitopénica, síndrome antifosfolípidos, virus del papiloma humano."},{title:"¿Algún tratamiento médico y/o quirúrgico pendiente?",detail:"y/o alguna enfermedad no mencionada en las preguntas anteriores o  enfermedades congénitas/genéticas o malformaciones."},{title:"¿Algún tipo de discapacidad que le impida desempeñar sus tareas diarias o ha tenido en el último año alguna incapacidad medica por tiempo mayor a 1 mes?",detail:"Detalle la discapacidad del titular y/o asegurado"}];let ee={},D=0;function Ke(o){if(localStorage.getItem("vc_skipHealth")==="1"){const e=new URL(window.location);e.searchParams.set("page","summary"),window.location.replace(e.toString());return}ee={},D=0,o.innerHTML=`
    <div class="sp-page">
      <header class="sp-header">
        <div class="sp-header__logo">
          <img src="${se}/images/logo-seguros-bolivar.png" alt="Seguros Bolívar">
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
            <img src="${se}/Iconos/angle-left.svg" alt="Volver" class="sp-back__icon">
            <span class="sp-back__text">Volver</span>
          </div>

          <div class="hs-wrapper">
            <div class="hs-title-row">
              <img src="${se}/Iconos/Latido.svg" alt="" class="hs-title-icon" onerror="this.style.display='none'">
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
            <img src="${se}/Iconos/angle-left.svg" alt="" class="hs-nav__icon">
          </button>
          <button class="hs-nav hs-nav--next" id="hs-next" aria-label="Siguiente">
            <img src="${se}/Iconos/angle-right.svg" alt="" class="hs-nav__icon">
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
  `,et()}function et(){var i,d,c,m,h;const o=document.getElementById("hs-modal-overlay");o.classList.add("hs-modal-overlay--visible");const e=()=>o.classList.remove("hs-modal-overlay--visible");(i=document.getElementById("hs-modal-close"))==null||i.addEventListener("click",e),(d=document.getElementById("hs-modal-continue"))==null||d.addEventListener("click",e),(c=document.getElementById("hs-back"))==null||c.addEventListener("click",()=>{const b=new URL(window.location);b.searchParams.set("page","complementary"),window.location.href=b.toString()}),(m=document.getElementById("hs-prev"))==null||m.addEventListener("click",tt),(h=document.getElementById("hs-next"))==null||h.addEventListener("click",at),me()}function Be(o){const e=Ze();return o.onlyGender?e.filter(i=>i.gender===o.onlyGender):e}function me(){const o=ue[D],e=document.getElementById("hs-card"),i=Be(o),d=i.map(c=>{var h;const m=((h=ee[D])==null?void 0:h[c.id])||"";return`
      <div class="hs-person" data-person="${c.id}">
        <div class="hs-person__info">
          <img src="${c.icon}" alt="" class="hs-person__icon" onerror="this.style.display='none'">
          <span class="hs-person__name">${c.name}</span>
        </div>
        <div class="hs-person__options">
          <button class="hs-opt ${m==="S"?"hs-opt--active":""}" data-value="S">Sí</button>
          <button class="hs-opt ${m==="N"?"hs-opt--active":""}" data-value="N">No</button>
        </div>
      </div>
    `}).join("");e.innerHTML=`
    <div class="hs-counter">${D+1}/${ue.length}</div>
    <div class="hs-question">
      <h3 class="hs-question__title">${o.title}</h3>
      ${o.detail?`<p class="hs-question__detail">${o.detail}</p>`:""}
      ${o.detail2Title?`<h3 class="hs-question__title hs-question__title--sub">${o.detail2Title}</h3>`:""}
      ${o.detail2?`<p class="hs-question__detail">${o.detail2}</p>`:""}
    </div>
    ${o.important?`
      <div class="hs-important">
        <img src="${se}/Iconos/info-circle.svg" alt="" class="hs-important__icon" onerror="this.style.display='none'">
        <div class="hs-important__text">
          <span class="hs-important__label">Importante</span>
          <p>${o.important}</p>
        </div>
      </div>`:""}
    ${i.length?`<div class="hs-people">${d}</div>`:'<p class="hs-question__detail">Esta pregunta no aplica para los asegurados de esta póliza.</p>'}
  `,e.querySelectorAll(".hs-person").forEach(c=>{const m=c.dataset.person;c.querySelectorAll(".hs-opt").forEach(h=>{h.addEventListener("click",()=>{ee[D]||(ee[D]={}),ee[D][m]=h.dataset.value,c.querySelectorAll(".hs-opt").forEach(b=>b.classList.remove("hs-opt--active")),h.classList.add("hs-opt--active"),we()})})}),we()}function Me(){const o=ue[D],e=Be(o),i=ee[D]||{};return e.every(d=>i[d.id]==="S"||i[d.id]==="N")}function we(){const o=document.getElementById("hs-prev"),e=document.getElementById("hs-next");o.classList.toggle("hs-nav--disabled",D===0),o.disabled=D===0;const i=Me();e.classList.toggle("hs-nav--active",i),e.disabled=!i}function tt(){D!==0&&(D--,me())}function at(){Me()&&(D<ue.length-1?(D++,me()):it())}function st(){return Object.values(ee).some(o=>Object.values(o).some(e=>e==="S"))}function ot(){const o=new Date,e=`${o.getFullYear()}${String(o.getMonth()+1).padStart(2,"0")}${String(o.getDate()).padStart(2,"0")}`,i=Math.floor(1e3+Math.random()*9e3);return`VM-${e}-${i}`}function it(){if(localStorage.setItem("vc_healthAnswers",JSON.stringify(ee)),st()){const e=ot();localStorage.setItem("vc_medicalReviewCase",e),nt(e);return}const o=new URL(window.location);o.searchParams.set("page","summary"),window.location.href=o.toString()}function nt(o){var d;const e=document.getElementById("hs-review-overlay");if(!e)return;const i=document.getElementById("hs-review-case");i&&(i.textContent=o),e.classList.add("hs-modal-overlay--visible"),(d=document.getElementById("hs-review-home"))==null||d.addEventListener("click",()=>{const c=new URL(window.location);c.searchParams.set("page","home"),c.searchParams.delete("step"),window.location.href=c.toString()})}function lt(o){const e=P=>"$"+parseInt(P).toLocaleString("es-CO"),i=localStorage.getItem("vc_name")||"Simón Andrés Bolívar",d=localStorage.getItem("vc_docNumber")||"1032508877",c=localStorage.getItem("vc_phone")||"3103025462",m=localStorage.getItem("vc_email")||"correo@email.com",h=localStorage.getItem("vc_age")||"35",b=localStorage.getItem("vc_bank")||"Bancolombia",L=localStorage.getItem("vc_insuredValue")||"50000000",g=localStorage.getItem("vc_monthlyPrima")||"37500",x=localStorage.getItem("vc_annualPrima")||"450000",_=localStorage.getItem("vc_periodicity")||"monthly",y=localStorage.getItem("vc_city")||"Bogotá",C=localStorage.getItem("vc_creditNumber")||"12345678";o.innerHTML=`
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
                      <img src="/vida-proteccion-creditos/Iconos/shield-dog.svg" alt="" class="conf-plan__icon">
                      <span class="conf-plan__name">Vida Protección Créditos</span>
                    </div>
                    <div class="conf-plan__details">
                      <div class="conf-plan__row"><span class="conf-plan__label">Valor asegurado:</span><span class="conf-plan__value">${e(L)}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Prima ${_==="monthly"?"mensual":"anual"}:</span><span class="conf-plan__value">${e(_==="monthly"?g:x)}</span></div>
                      <div class="conf-plan__row"><span class="conf-plan__label">Banco:</span><span class="conf-plan__value--bold">${b}</span></div>
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
                      <div class="conf-data-row"><span class="conf-data-row__label">Nombre:</span><span class="conf-data-row__value">${i}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Cédula:</span><span class="conf-data-row__value">${d}</span></div>
                      <div class="conf-data-row"><span class="conf-data-row__label">Celular:</span><span class="conf-data-row__value">${c}</span></div>
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
  `,ct()}function ct(){const o=document.querySelectorAll(".pf-option"),e=document.querySelectorAll(".pf-check__input"),i=document.getElementById("sum-pay");o.forEach(c=>{c.addEventListener("click",()=>{o.forEach(m=>{m.classList.remove("pf-option--selected"),m.querySelector(".pf-option__radio").classList.remove("pf-option__radio--active")}),c.classList.add("pf-option--selected"),c.querySelector(".pf-option__radio").classList.add("pf-option__radio--active"),localStorage.setItem("vc_periodicity",c.dataset.freq==="annual"?"annual":"monthly"),d()})}),e.forEach(c=>c.addEventListener("change",d));function d(){const c=document.querySelector(".pf-option--selected"),m=[...e].every(h=>h.checked);c&&m?(i.disabled=!1,i.classList.remove("pd-footer__btn--disabled")):(i.disabled=!0,i.classList.add("pd-footer__btn--disabled"))}document.getElementById("sum-back").addEventListener("click",()=>{const c=localStorage.getItem("vc_skipHealth")==="1",m=new URL(window.location);m.searchParams.set("page",c?"complementary":"health"),window.location.href=m.toString()}),i.addEventListener("click",()=>{if(!i.disabled){const c=new URL(window.location);c.searchParams.set("page","success"),window.location.href=c.toString()}})}function rt(o){var _,y;const e=C=>"$"+parseInt(C).toLocaleString("es-CO"),i=localStorage.getItem("vc_name")||"Simón Bolívar",d=localStorage.getItem("vc_bank")||"Bancolombia",c=localStorage.getItem("vc_email")||"correo@email.com",m=localStorage.getItem("vc_periodicity")||"monthly",h=localStorage.getItem("vc_monthlyPrima")||"37500",b=localStorage.getItem("vc_annualPrima")||"450000",L=e(m==="monthly"?h:b),g=m==="monthly"?"Mensual":"Anual",x="#VPC-2026-"+Math.floor(1e3+Math.random()*9e3);localStorage.setItem("vc_policyNumber",x),o.innerHTML=`
    <div class="success-page">
      <header class="sp-header">
        <div class="sp-header__logo"><img src="/vida-proteccion-creditos/images/logo-seguros-bolivar.png" alt="Seguros Bolívar"></div>
      </header>

      <div class="success-banner">
        <div class="success-banner__confetti"></div>
        <div class="success-banner__text">
          <p class="success-banner__subtitle">¡Tu seguro fue activado!</p>
          <h1 class="success-banner__title">Bienvenido a Seguros Bolívar, ${i.split(" ")[0]}</h1>
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
            <div class="success-card__row"><span class="success-card__label">Pago ${g.toLowerCase()}:</span><span class="success-card__value">${L}</span></div>
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
          <p>En un máximo de <strong>12 horas</strong>, enviaremos los detalles de tu seguro al correo electrónico <strong>${c}</strong>.</p>
        </div>

        <button class="success-home-btn" id="vc-home">
          <img src="/vida-proteccion-creditos/Iconos/angle-left.svg" alt="" class="success-home-btn__icon">
          <span>Ir al inicio</span>
        </button>
      </div>
    </div>
  `,(_=document.getElementById("vc-copy"))==null||_.addEventListener("click",()=>{const C=document.querySelector(".success-card__code").textContent;navigator.clipboard.writeText(C).then(()=>{document.querySelector("#vc-copy span").textContent="¡Copiado!",setTimeout(()=>document.querySelector("#vc-copy span").textContent="Copiar",2e3)})}),(y=document.getElementById("vc-home"))==null||y.addEventListener("click",()=>{localStorage.clear(),window.location.href=window.location.pathname})}function dt(){const e=new URLSearchParams(window.location.search).get("page")||"home",i=document.getElementById("app-content");switch(e){case"credit-data":Re(i);break;case"quotation":Fe(i);break;case"complementary":He(i);break;case"health":Ke(i);break;case"summary":lt(i);break;case"success":rt(i);break;case"home":default:Ne(i);break}}window.addEventListener("message",o=>{var e;if(o.data){if(o.data.type==="SAVE_SNAPSHOT"){const i=((e=document.getElementById("app-content"))==null?void 0:e.innerHTML)||document.body.innerHTML;window.parent.postMessage({type:"SNAPSHOT_DATA",html:i,page:o.data.page,projectId:o.data.projectId},"*")}if(o.data.type==="RESTORE_SNAPSHOT"){const i=document.getElementById("app-content");i&&o.data.html&&(i.innerHTML=o.data.html)}if(o.data.type==="NAVIGATE_TO_STEP"){const i=o.data.page;if(i){const d=new URL(window.location);d.searchParams.set("page",i),window.location.href=d.toString()}}if(o.data.type==="ADMIN_OVERRIDE"){const{selector:i,property:d,value:c}=o.data;try{const m=document.querySelector(i);m&&(d==="textContent"?m.textContent=c:d==="src"?m.src=c:m.style.setProperty(d.replace(/([A-Z])/g,"-$1").toLowerCase(),c,"important"))}catch{}}}});function Ie(){dt()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ie):Ie();
