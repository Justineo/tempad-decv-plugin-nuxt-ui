function jt(e){return e}function Y(e,n,t){return{name:e,props:n??{},children:t??[]}}function H(e,n){if(n===void 0)return!0;if(typeof e=="string"){if(Array.isArray(n))return n.includes(e);if(n instanceof RegExp)return n.test(e)}return e===n}function _(e,n){return typeof n=="function"?n(e):H(e.type,n.type)&&H(e.name,n.name)&&H(e.visible,n.visible??!0)}function g(e,n){return e.children.find(t=>_(t,n))??null}function I(e,n){return e.children.filter(t=>_(t,n))}function M(e,n){for(const t of e.children){if(_(t,n))return t;if("children"in t){const o=M(t,n);if(o)return o}}return null}function P(e,n){const t=[];for(const o of e.children)_(o,n)&&t.push(o),"children"in o&&t.push(...P(o,n));return t}function R(e,n){if(n.length===0)return[];let t=[e];for(const o of n){const i=new Set,r=[];for(const a of t)if("children"in a)if(i.add(a),o.query==="child"||o.query==="one"){const l=o.query==="child"?g(a,o):M(a,o);l&&!i.has(l)&&(i.add(l),r.push(l))}else{const l=o.query==="children"?I(a,o):P(a,o);for(const s of l)i.has(s)||(i.add(s),r.push(s))}t=r}return t}function U(e,n){return R(e,n)[0]}function Ce(e){return Array.isArray(e)?e.slice():e instanceof Object?{...e}:e}function Se(e,n){let t={};return Object.keys(e||t).forEach(o=>t[n(e[o],o)]=e[o]),t}function x(e,...n){const t=Ce(e)??{};for(const o of n)delete t[o];return t}function Te(e,...n){const t={};if(e!=null)for(const o of n)t[o]=e[o];return t}function ee(e){return u("UIcon",{name:y(e.name)},{})}function y(e){if(e)return`i-lucide-${e}`}function d(e,n){return Se(e,(t,o)=>{if(n&&o in n)return n[o]??o;const i=o.trim().replace(/^[^0-9A-Z]+/i,"").replace(/[ /]+(.)/g,(r,a)=>a.toUpperCase());return i.charAt(0).toLowerCase()+i.slice(1)})}function E(e,n,t){const o=t?n:null,i=t??n;return Y("template",{[`#${e}`]:o??!0},i)}function O(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/(\d)([a-z])/gi,"$1-$2").replace(/([a-z])(\d)/gi,"$1-$2").replace(/[_\s]/g,"-").toLowerCase()}function h(e){return e.toLowerCase()}function S(e,n){const t={};for(const o in e)e[o]!==void 0&&e[o]!==n[o]&&(t[o]=e[o]);return t}const $="Lorem ipsum",j="Lorem ipsum dolor sit amet, consectetur adipiscing elit.";function u(e,n,t,o){return Y(e,S(n,t),o)}function z(e,n){return e.find(t=>t[n]!=null)?.[n]}function W(e,n){return e.reduce((t,o)=>({...t,[o]:n}),{})}function te(e){return e.type==="INSTANCE"&&e.children.length===1&&e.children[0].type==="VECTOR"&&e.children[0].name==="Vector"}function Ae(e){return({component:n})=>{try{if(te(n))return ee(n);const t=e[n.name.replaceAll(" ","")];return t?t(n):""}catch(t){return console.error(t),""}}}function Ee(e){return/^\d+$/.test(String(e))}const b={icons:{arrowRight:"i-lucide-arrow-right",arrowLeft:"i-lucide-arrow-left",check:"i-lucide-check",chevronDoubleRight:"i-lucide-chevrons-right",chevronDown:"i-lucide-chevron-down",chevronDoubleLeft:"i-lucide-chevrons-left",chevronRight:"i-lucide-chevron-right",chevronLeft:"i-lucide-chevron-left",close:"i-lucide-x",ellipsis:"i-lucide-ellipsis",minus:"i-lucide-minus",plus:"i-lucide-plus",search:"i-lucide-search"}};function ze(e){const n=I(e,{type:"INSTANCE",name:"Collapsible_panel"});let t=0;const o=n.map(i=>{const{state:r,label:a,description:l,iconLeading:s,iconLeadingName:c,iconTrailingName:p}=d(i.properties);return r==="Open"&&t++,S({label:a||$,content:l||j,icon:s?y(c.name):void 0,trailingIcon:y(p.name),disabled:r==="Disable"},{disabled:!1,trailingIcon:b.icons.chevronDown})});return u("UAccordion",{items:o,type:t>1?"multiple":"single"},{type:"single"})}function K(e,n={}){const{variant:t,size:o,iconName:i,chipPosition:r}=d(e.properties),a=g(e,{type:"TEXT"})?.characters,l=u("UAvatar",{icon:t==="Icon"?y(i.name):void 0,alt:t==="Alt"?a:void 0,...t==="Image"?D():{},size:o},{size:"md",...n});if(r==="None")return l;const s=h(r);return u("UChip",{inset:!0,position:s},{position:"top-right"},[l])}const ne=["benjamincanac","romhml","smarroufin","atinux","Haythamasalama","hywax","danielroe","sandros94","malik-jouda","connerblanton","antfu","Justineo"];function Me(e){return{src:`https://github.com/${e}.png`,alt:`@${e}`}}function D(){return Me(ne[Math.floor(Math.random()*ne.length)])}function oe(e,n={}){const{props:t,children:o}=K(e,n),i=o[0];return i&&typeof i!="string"&&i.name==="UAvatar"?{...i.props,chip:t}:t}const ie={ButtonPrimary:"primary",ButtonSecondary:"secondary",ButtonSuccess:"success",ButtonInfo:"info",ButtonWarning:"warning",ButtonError:"error",ButtonNeutral:"neutral"},C=Object.keys(ie);function k(e,n={}){const{variant:t,size:o,state:i,square:r,slot:a,iconLeading:l,iconLeadingName:s,iconTrailing:c,iconTrailingName:p,avatarLeading:m}=d(e.properties),f=ie[e.name],v=a==="Icon"&&l?y(s.name):void 0,N=c?y(p.name):void 0,T=a==="Avatar"&&m?D():void 0,F=M(e,{type:"TEXT"})?.characters;return u("UButton",{variant:h(t),color:f,size:o,square:r==="True",icon:v,trailingIcon:N,avatar:T,disabled:i==="Disabled"},{color:"primary",variant:"solid",size:"md",square:!1,disabled:!1,...n},F?[F]:[])}function w(e,n={}){const{props:t,children:o}=k(e),i=o.map(r=>typeof r=="string"?r:void 0).filter(Boolean).join("");return S({...i?{label:i}:{},...t},n)}function we(e){const{props:{size:n,...t},children:o}=k(e);return u("UButton",t,{},o)}function Fe(e){const{color:n,variant:t,leadingSlot:o,showDescription:i,action:r,title:a,description:l,closeButton:s,icon:c,iconName:p}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),m=g(e,{type:"INSTANCE",name:C}),f=s&&m?w(m,{size:"md",color:"neutral",variant:"link"}):!1,v=f?f.icon:void 0,N=r==="True"?R(e,[{query:"one",type:"FRAME",name:"Actions"},{query:"children",type:"INSTANCE",name:C}]).map(T=>w(T,{size:"xs"})):[];return u("UAlert",{title:a,description:i&&l||void 0,icon:o==="Icon"&&c?y(p.name):void 0,avatar:o==="Avatar"?D():void 0,color:h(n),variant:h(t),close:f,closeIcon:v,actions:N.length>0?N:void 0},{color:"primary",variant:"solid",close:!1,closeIcon:b.icons.close})}function re(e){const{size:n}=d(e.properties),t=I(e,{type:"INSTANCE",name:"Avatar"}).map(r=>K(r));t.forEach(r=>{if("size"in r.props){const{size:a,...l}=r.props;r.props=l}});const o=t.at(-1)?.props,i=!Number.isNaN(Number.parseInt(o?.alt||"",10));return u("UAvatarGroup",{size:n,max:i?t.length-1:void 0},{size:"md"},i?t.slice(0,-1):t)}function Z(e,n={}){const{color:t,variant:o,size:i,roundedFull:r,label:a,iconLeading:l,iconLeadingName:s,iconTrailing:c,iconTrailingName:p}=d(e.properties),m=l&&c?{leadingIcon:y(s.name),trailingIcon:y(p.name)}:{icon:l?y(s.name):c?y(p.name):void 0,trailing:c};return u("UBadge",{class:r==="True"?"rounded-full":void 0,color:h(t),variant:h(o),size:i,...m},{color:"primary",variant:"solid",size:"md",trailing:!1,...n},a?[a]:[])}function V(e,n={}){const{props:t,children:o}=Z(e,n),i=o.map(r=>typeof r=="string"?r:void 0).filter(Boolean).join("")||void 0;return Object.keys(t).length===0?String(Number(i))===i?Number(i):i:{label:i,...t}}const De={"\u2318":"meta","\u2303":"ctrl","\u2325":"alt","\u229E":"win","\u21E7":"shift","\u21B5":"enter","\u2326":"delete","\u232B":"backspace","\u238B":"escape","\u21E5":"tab","\u21EA":"capslock","\u2191":"arrowup","\u2192":"arrowright","\u2193":"arrowdown","\u2190":"arrowleft","\u21DE":"pageup","\u21DF":"pagedown","\u2196":"home","\u2198":"end"};function ae(e){const{size:n,variant:t}=d(e.properties),o=g(e,{type:"TEXT"})?.characters;return u("UKbd",{value:o?De[o]||o:void 0,variant:h(t),size:n},{variant:"outline",size:"md"})}function Ue(e,n={}){const{props:t}=ae(e);return S(t,n)}function J(e,n={}){const t=R(e,[{query:"child",type:"FRAME",name:"Kbd"},{query:"children",type:"INSTANCE",name:"Kbd"}]).map(o=>Ue(o,n));if(t.length!==0)return t.every(o=>Object.keys(o).length===1&&o.value)?t.map(o=>o.value):t.length>0?t:void 0}function ke(e){const{properties:n}=e,{state:t,leadingSlot:o,trailingSlot:i,label:r,iconLeadingName:a,iconTrailingName:l}=d(n);return S({label:r,icon:o==="Icon"?y(a.name):void 0,avatar:o==="Avatar"?D():void 0,kbds:i==="Kbd"?J(e):void 0,type:i==="Icon"&&l.name==="check"?"checkbox":"link",checked:i==="Icon"&&l.name==="check",disabled:t==="Disabled"},{type:"link",checked:!1,disabled:!1})}const Be={"Bottom-start":"bottom","Bottom-end":"bottom",Right:"right","Top-start":"top",Left:"left"};function le(e,n={}){const{size:t,variant:o,alignment:i,arrow:r}=d(e.properties),a=S({side:Be[i]},{side:"bottom"}),l=R(e,[{query:"child",type:"FRAME",name:"DropdownMenu"},{query:"children",type:"FRAME",name:/^Container/}]).map(c=>I(c,{type:"INSTANCE",name:"DropdownMenuItem"}).map(ke)),s=[];if(o==="Button"){const c=r==="True"?g(e,{type:"FRAME",name:"Button + arrow"}):e,p=c?g(c,{type:"INSTANCE",name:C}):void 0;if(p){const m=k(p);m.props={...m.props,...n.button},s.push(m)}}else if(o==="Avatar"){const c=r==="True"?g(e,{type:"FRAME",name:"Avatar + arrow"}):e,p=c?g(c,{type:"INSTANCE",name:"Avatar"}):void 0;p&&s.push(K(p))}return u("UDropdownMenu",{size:t,items:l,content:a,arrow:r==="True"},{size:"md",arrow:!1},s)}function Le(e){const{leadingSlot:n,divider:t,separatorIconName:o,separatorSlot:i}=d(e.properties),r=I(e,{name:/^Link|^DropdownMenu/}),a=[],l=[];return r.forEach(s=>{const{type:c,name:p}=s;if(c==="FRAME"&&p.startsWith("Link")){const m=U(s,[{query:"child",type:"INSTANCE",name:"Link"},{query:"child",type:"TEXT",name:"Label"}])?.characters||void 0,f=n==="Icon"&&te(s.children[0])?y(s.children[0].name):void 0;a.push({label:m,icon:f})}else if(c==="INSTANCE"&&p==="Link")a.push({label:g(s,{type:"TEXT",name:"Label"})?.characters||void 0});else if(c==="INSTANCE"&&p==="DropdownMenu"){const m=le(s,{button:{icon:void 0,":icon":"item.icon"}});if(!m){a.push({icon:b.icons.ellipsis});return}const{items:f,...v}=m.props;m.props=v,m.props[":items"]="item.children",a.push({icon:b.icons.ellipsis,slot:"dropdown",children:f}),l.push(E("dropdown","{ item }",[m]))}}),t==="Span"&&i&&l.push(E("separator",[i])),u("UBreadcrumb",{items:a,separatorIcon:t==="Icon"?y(o.name):void 0},{separatorIcon:b.icons.chevronRight},l)}const se={InputOutline:"outline",InputSoft:"soft",InputNone:"none",InputGhost:"ghost",InputSubtle:"subtle"},G=Object.keys(se);function X(e,n={}){const t=se[e.name],{color:o,size:i,state:r,leadingSlot:a,trailingSlot:l,placeholder:s,placeholderLabel:c,completed:p,completedLabel:m,iconLeadingName:f,iconTrailingName:v,span:N}=d(e.properties),T=a==="Icon"?y(f.name):void 0,F=l==="Icon"?y(v.name):void 0,q=a==="Avatar"?D():void 0,B=[];return a==="Span"&&N?B.push(E("leading",[N])):l==="Span"&&N&&B.push(E("trailing",[N])),u("UInput",{type:p&&m&&/^\*+$/.test(m)?"password":"text",placeholder:s?c:void 0,color:h(o),variant:t,size:i,icon:T,trailingIcon:F,avatar:q,disabled:r==="Disabled"},{type:"text",color:"primary",variant:"outline",size:"md",disabled:!1,...n},B)}function Re(e){const{variant:n,size:t,orientation:o}=d(e.properties),i=[];if(n==="Buttons"){const r=I(e,{type:"INSTANCE",name:C});i.push(...r.map(a=>we(a)))}else{const r=U(e,[{query:"child",type:"INSTANCE",name:"Input"},{query:"child",type:"INSTANCE",name:G}]);r&&i.push(X(r));const a=g(e,{type:"INSTANCE",name:C});a&&i.push(k(a))}return u("UButtonGroup",{size:t,orientation:h(o)},{size:"md",orientation:"horizontal"},i)}function qe(e){const{color:n,variant:t,dateValue:o}=d(e.properties),i=Number(o);return{color:h(n),selected:t==="Data-selected",date:Number.isNaN(i)?0:i}}function Pe(e){const{color:n,size:t,numberOfMonths:o,monthControls:i,yearControls:r}=d(e.properties),a=Number(o),l=P(e,{type:"INSTANCE",name:"calendar-item"}).map(p=>qe(p)),{range:s,multiple:c}=xe(l);return u("UCalendar",{color:h(n),size:t,range:s,multiple:c,numberOfMonths:Number.isNaN(a)?1:a,monthControls:i,yearControls:r},{color:"primary",size:"md",range:!1,multiple:!1,numberOfMonths:1,monthControls:!0,yearControls:!0})}function xe(e){let n=-1;for(let t=0;t<e.length;t++)if(e[t].selected){if(n!==-1&&t-n>1)return{range:!1,multiple:!0};if(t>0&&e[t-1].selected)return{range:!0,multiple:!1};n=t}return{range:!1,multiple:!1}}function Oe(e){const n=M(e,{type:"FRAME",name:"Header"}),t=M(e,{type:"FRAME",name:"Body"}),o=M(e,{type:"FRAME",name:"Footer"});return u("UCard",{},{},[...n?[E("header",[$])]:[],...t?[j]:[],...o?[E("footer",[$])]:[]])}function $e(e){const{variant:n,pagination:t,prevNext:o}=d(e.properties);let i={};if(o){const[r,a]=R(e,[{query:"child",type:"FRAME",name:"Carousel + prev/next"},{query:"children",type:"INSTANCE",name:C}]),l={size:"md",color:"neutral",variant:"link"},{icon:s,...c}=r?w(r,{...l,icon:b.icons.arrowLeft}):{},{icon:p,...m}=a?w(a,{...l,icon:b.icons.arrowRight}):{};i={prev:c,next:m,prevIcon:s,nextIcon:p}}return u("UCarousel",{items:[],arrows:o,dots:t,fade:n==="Fade",...i},{arrows:!1,dots:!1,fade:!1})}function je(e){const{color:n,size:t,state:o,label:i,description:r,descriptionSlot:a,required:l,icon:s}=d(e.properties);return u("UCheckbox",{label:i,description:r?a:void 0,color:h(n),size:t,icon:y(s.name),disabled:o==="Disabled",required:l},{color:"primary",size:"md",icon:b.icons.check,disabled:!1,required:!1})}function Ge(e){const{color:n,size:t,isLabel:o,label:i}=d(e.properties);return u("UChip",{text:o==="True"?i:void 0,color:h(n),size:t},{color:"primary",size:"md"})}function Xe(e){const{open:n}=d(e.properties),t=g(e,{type:"INSTANCE",name:C});return u("UCollapsible",{open:n},{open:!1},t?[k(t)]:[])}function _e(e){const{size:n,state:t}=d(e.properties);return u("UColorPicker",{size:n,disabled:t==="Disabled"},{size:"md",disabled:!1})}function Ke(e){const{state:n,leadingSlot:t,trailingSlot:o,description:i,label:r,descriptionSlot:a,iconLeadingName:l,iconTrailingName:s}=d(e.properties);return S({label:r,suffix:i&&a||void 0,icon:t==="Icon"?y(l.name):void 0,avatar:t==="Avatar"?D():void 0,kbds:o==="Kbd"?J(e):void 0,active:o==="Icon"&&s.name==="check",disabled:n==="Disabled"},{active:!1,disabled:!1})}function ce(e){const{open:n}=d(e.properties),t=n==="Default"?e:g(e,{type:"FRAME",name:"CommandPalette"}),o=t?g(t,{type:"INSTANCE",name:G}):void 0,i=o?X(o):void 0,{icon:r,placeholder:a,disabled:l}=i?.props||{},s=t?I(t,{type:"FRAME",name:/^Container/}):[];let c=0;const p=s.map(F=>{const q=g(F,{type:"TEXT",name:"Title"})?.characters,B=I(F,{type:"INSTANCE",name:"CommandPaletteItem"}).map(A=>{const L=Ke(A);return L.active&&c++,L});return{id:O(q||""),label:q,items:B}}),m=M(e,{type:"INSTANCE",name:C}),f=m?w(m,{size:"md",color:"neutral",variant:"ghost"}):!1,{icon:v,square:N,...T}=f||{};return u("UCommandPalette",{icon:r,placeholder:a,close:m?Object.keys(T).length>0?T:!0:!1,closeIcon:v,groups:p,multiple:c>1,disabled:l},{icon:b.icons.search,placeholder:"Type a command or search...",close:!1,closeIcon:b.icons.close,multiple:!1,disabled:!1})}function Ve(e){const{direction:n,overlay:t,handle:o,heading:i,title:r,showDescription:a,description:l,buttons:s}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),c=[E("body",[j])];if(s){const p=R(e,[{query:"one",type:"FRAME",name:"Buttons"},{query:"children",type:"INSTANCE",name:C}]);if(p.length>0){const m=p.map(f=>{const v=k(f);return v.props.class="justify-center",v});c.push(E("footer",m))}}return u("UDrawer",{title:i?r:void 0,description:a?l:void 0,overlay:t==="True",handle:o,direction:h(n)},{overlay:!0,handle:!0,direction:"bottom"},c)}function pe(e){const{color:n,variant:t,size:o,orientation:i,state:r,highlight:a,placeholder:l,placeholderText:s}=d(e.properties),[c,p]=I(e,{type:"INSTANCE",name:C}).map(T=>w(T,{variant:"link",square:!0,size:o})),{icon:m,...f}=c||{},{icon:v,...N}=p||{};return u("UInputNumber",{placeholder:l&&s||void 0,color:h(n),variant:h(t),size:o,highlight:a==="True",orientation:h(i),increment:N,incrementIcon:v,decrement:f,decrementIcon:m,disabled:r==="Disabled"},{color:"primary",variant:"outline",size:"md",highlight:!1,orientation:"horizontal",incrementIcon:b.icons.plus,decrementIcon:b.icons.minus,disabled:!1})}function He(e){const{color:n,variant:t,state:o,highlight:i,placeholder:r,placeholderText:a,completed:l,completedText:s,mask:c}=d(e.properties);return{color:h(n),variant:h(t),highlight:i==="True",disabled:o==="Disabled",placeholder:r&&a||void 0,value:l&&s||void 0,mask:c}}function de(e){const n=I(e,{type:"INSTANCE",name:"PinInputItem"}).map(He),t=n.some(p=>p.value&&!/^\d$/.test(p.value))?"text":"number",o=n.find(p=>!!p.placeholder)?.placeholder,i=n.some(p=>p.mask),{size:r}=d(e.properties),{color:a,variant:l,highlight:s,disabled:c}=n[0];return u("UPinInput",{color:a,variant:l,size:r,length:n.length,highlight:s,type:t,disabled:c,placeholder:o,mask:i},{color:"primary",variant:"outline",size:"md",length:5,highlight:!1,type:"text",disabled:!1,mask:!1})}function We(e){const{size:n,input:t,error:o,label:i,required:r,hint:a,hintSlot:l,help:s,helpSlot:c,description:p,descriptionSlot:m}=d(e.properties),f=[];if(t==="Input"){const v=M(e,{type:"INSTANCE",name:G});v&&f.push(X(v))}else if(t==="InputNumber"){const v=M(e,{type:"INSTANCE",name:"InputNumber"});v&&f.push(pe(v))}else if(t==="PinInput"){const v=M(e,{type:"INSTANCE",name:"PinInput"});v&&f.push(de(v))}return u("UFormField",{label:i,description:p&&m||void 0,help:o==="False"&&s&&c||void 0,error:o==="True"&&(c||!0),hint:a&&l||void 0,size:n,required:r},{error:!1,size:"md",required:!1},f)}function Ze(e){const{state:n,leadingSlot:t,label:o,iconName:i}=d(e.properties);return S({label:o,icon:t==="Icon"?y(i.name):void 0,avatar:t==="Avatar"?D():void 0,chip:t==="Dot"?{color:"primary"}:void 0,disabled:n==="Disabled",selected:n==="Selected"},{disabled:!1,selected:!1})}function Je(e){const{size:n}=d(e.properties),t=g(e,{type:"FRAME",name:"InputMenu"}),o=t?I(t,l=>l.type==="TEXT"&&l.name==="Title"||l.type==="INSTANCE"&&l.name==="InputMenuItem"&&l.visible===!0).map(l=>l.type==="TEXT"?{label:l.characters,type:"label"}:Ze(l)):[],i=[],r=g(e,{type:"INSTANCE",name:G}),a=r?X(r).props:{};return u("UInputMenu",{size:n,items:o,...a},{size:"md"},i)}function Qe(e){const{color:n,state:t,label:o}=d(e.properties);return u("ULink",{active:h(n)==="primary",disabled:t==="Disabled"},{active:!1,disabled:!1},[o])}function Ye(e){const{header:n,body:t,footer:o}=d(e.properties);return u("UModal",{},{},[...n?[E("header",[$])]:[],...t?[E("body",[j])]:[],...o?[E("footer",[$])]:[]])}function et(e){const{icon:n,iconName:t,title:o,description:i,descriptionSlot:r}=d(e.properties);return{label:o,description:i&&r||void 0,icon:n?y(t.name):void 0}}function tt(e){const{color:n,variant:t,state:o,active:i,highlight:r,iconLeading:a,iconLeadingName:l,iconTrailing:s,badge:c,label:p,external:m}=d(e.properties),f=c?U(e,[{query:"child",type:"FRAME",name:"Container"},{query:"child",type:"INSTANCE",name:"Badge"}]):void 0,v=f?V(f,{size:"sm",color:"neutral",variant:"outline"}):void 0,N=s?P(e,{type:"INSTANCE",name:"NavigationMenu(DropdownItem)"}).map(et):void 0;return S({label:p,icon:a?y(l.name):void 0,badge:v,external:m==="True",children:m==="True"?void 0:N,active:i==="True",disabled:o==="Disabled",variant:h(t),color:h(n),highlight:r==="True"},{external:!1,active:!1,disabled:!1,variant:"pill",color:"primary",highlight:!1})}function ue(e){const{orientation:n,highlight:t}=d(e.properties),o=I(e,{type:"INSTANCE",name:"NavigationMenuItem"}).map(tt);return u("UNavigationMenu",{items:o.map(i=>x(i,"variant","color","highlight")),color:z(o,"color"),variant:z(o,"variant"),orientation:h(n),highlight:t==="True"||!!z(o,"highlight")},{color:"primary",variant:"pill",orientation:"horizontal",highlight:!1})}function me(e){if(!e)return[void 0,void 0];const[n,t]=e.split("-");return[n==="undefined"?void 0:n,t==="undefined"?void 0:t]}function nt(e){const{size:n}=d(e.properties),t=I(e,{type:"INSTANCE",name:C}).map(A=>w(A));let o=[];t.length>=5&&(o=[...t],o.splice(2,t.length-4),o=o.every(A=>!Ee(A.label||""))?o:[]);const i=o.length===4,[r,a,l,s]=o,c=i?t.splice(2,t.length-4):t,p=c.find(({icon:A,label:L})=>A&&!/^\d+$/.test(L||"")),m=c.reduce((A,L)=>{const Q=`${L.color}-${L.variant}`;return A[Q]=(A[Q]||0)+1,A},{}),f=Object.entries(m).sort(([,A],[,L])=>L-A),[v,N]=f.map(([A])=>A),[T,F]=me(v),[q,B]=me(N);return u("UPagination",{color:T,variant:F,activeColor:q,activeVariant:B,size:n,showControls:i,disabled:c.every(A=>A.disabled),firstIcon:r?.icon,prevIcon:a?.icon,nextIcon:l?.icon,lastIcon:s?.icon,ellipsisIcon:p?.icon},{color:"neutral",variant:"outline",activeColor:"primary",activeVariant:"solid",size:"md",showControls:!0,disabled:!1,firstIcon:b.icons.chevronDoubleLeft,prevIcon:b.icons.chevronLeft,nextIcon:b.icons.chevronRight,lastIcon:b.icons.chevronDoubleRight,ellipsisIcon:b.icons.ellipsis})}function ot(e){const{position:n,arrow:t}=d(e.properties),o=S({side:h(n)},{side:"bottom"}),i=[E("content",[j])],r=g(e,{type:"INSTANCE",name:C});return r&&i.unshift(k(r)),u("UPopover",{content:o,arrow:t==="True"},{arrow:!1},i)}function it(e){const{color:n,size:t,orientation:o,value:i,indicator:r}=d(e.properties);return u("UProgress",{modelValue:Number.parseInt(i,10),status:r,size:t,color:h(n),orientation:h(o)},{status:!1,size:"md",color:"primary",orientation:"horizontal"})}function rt(e){const{color:n,state:t,label:o,description:i,descriptionSlot:r}=d(e.properties);return S({label:o,description:i&&r||void 0,disabled:t==="Disabled",color:h(n)},{color:"primary",disabled:!1})}function at(e){const{size:n,align:t,legend:o,required:i}=d(e.properties),r=P(e,{type:"INSTANCE",name:"Radio"}).map(rt),a=z(r,"color"),l=r.every(s=>s.disabled);return l&&r.forEach(s=>{delete s.disabled}),u("URadioGroup",{legend:o,items:r,size:n,color:a,orientation:h(t),disabled:l,required:i},{size:"md",color:"primary",orientation:"horizontal",disabled:!1,required:!1})}const he={SelectOutline:"outline",SelectSoft:"soft",SelectNone:"none",SelectGhost:"ghost",SelectSubtle:"subtle"},fe=Object.keys(he);function ge(e,n={}){const t=he[e.name],{color:o,size:i,state:r,leadingSlot:a,placeholder:l,placeholderLabel:s,iconLeadingName:c,iconTrailingName:p}=d(e.properties),m=a==="Icon"?y(c.name):void 0,f=y(p.name),v=a==="Avatar"?D():void 0;return u("USelect",{placeholder:l?s:void 0,color:h(o),variant:t,size:i,icon:m,trailingIcon:f,avatar:v,disabled:r==="Disabled"},{color:"primary",variant:"outline",size:"md",trailingIcon:b.icons.chevronDown,disabled:!1,...n})}function lt(e){const{properties:n}=e,{state:t,leadingSlot:o,label:i,iconName:r}=d(n);return S({label:i,icon:o==="Icon"?y(r.name):void 0,avatar:o==="Avatar"?D():void 0,disabled:t==="Disabled",selected:t==="Selected"},{disabled:!1})}function ve(e){const n=g(e,{type:"FRAME",name:"SelectMenu"}),t=n?g(n,{type:"FRAME",name:"Container"}):void 0,o=t?I(t,c=>c.type==="FRAME"&&c.name==="Title"&&c.visible===!0||c.type==="INSTANCE"&&c.name==="SelectMenuItem"&&c.visible===!0).map(c=>c.type==="FRAME"?{label:g(c,{type:"TEXT"})?.characters,type:"label"}:lt(c)):[],i=g(e,{type:"INSTANCE",name:fe}),r=n?U(n,[{query:"child",type:"INSTANCE",name:"Input"},{query:"child",type:"INSTANCE",name:G}]):void 0,{content:a,...l}=i?ge(i).props:{},s=r?X(r,{placeholder:"Search...",variant:"none"}).props:{};return u("USelectMenu",{...l,items:o,searchInput:s},{})}function st(e){const{color:n,size:t,orientation:o,separator:i,slot:r,iconName:a,span:l}=d(e.properties),s=r==="Avatar"?g(e,{type:"INSTANCE",name:"Avatar"}):void 0,{chip:c,...p}=s?oe(s):{};return u("USeparator",{label:r==="Span"&&l||void 0,icon:r==="Icon"&&y(a.name)||void 0,avatar:Object.keys(p).length>0?p:void 0,color:h(n),size:t,type:h(i),orientation:h(o)},{color:"neutral",size:"xs",type:"solid",orientation:"horizontal"})}function ct(e){return u("USkeleton",{},{})}function pt(e){const{variant:n,overlay:t}=d(e.properties),o=M(e,{type:"FRAME",name:"Header"}),i=M(e,{type:"FRAME",name:"Body"}),r=M(e,{type:"FRAME",name:"Footer"}),a=M(e,{type:"FRAME",name:"Title and description"}),l=o?g(o,{type:"INSTANCE",name:C}):void 0,s=l?w(l,{size:"md",color:"neutral",variant:"ghost"}):!1,{icon:c,square:p,...m}=s||{},[f,v]=a?I(a,{type:"TEXT"}):[],N=[];return i&&N.push(E("body",[j])),r&&N.push(E("footer",[$])),u("USlideover",{title:f?.characters,description:v?.characters,overlay:t==="True",side:h(n),close:s?Object.keys(m).length>0?m:!0:!1,closeIcon:c},{overlay:!0,side:"right",close:!0,closeIcon:b.icons.close},N)}function dt(e){const{color:n,size:t,orientation:o,state:i,indicatorPosition:r,indicator2:a}=d(e.properties),l=Number(r);return u("USlider",{modelValue:a?[0,l]:l,color:h(n),size:t,orientation:h(o),disabled:i==="Disabled"},{color:"primary",size:"md",orientation:"horizontal",disabled:!1})}function ut(e){const{properties:n}=e,{variant:t,state:o,iconName:i}=d(n,{"\u{1F6A6}State":"state"});return S({icon:t==="Icon"?y(i.name):void 0,disabled:o==="Disabled"},{disabled:!1})}function mt(e){const{color:n,size:t,step:o,orientation:i}=d(e.properties),r=I(e,{type:"FRAME",name:/^Step/}).map(a=>{const l=g(a,{type:"INSTANCE",name:"Stepper_Item"}),s=g(a,{type:"FRAME",name:"Title + description"}),[c,p]=s?I(s,{type:"TEXT"}):[];return l?{title:c?.characters,description:p?.characters,...ut(l)}:void 0}).filter(a=>a!=null);return u("UStepper",{modelValue:Number(o)-1,items:r,color:h(n),size:t,orientation:h(i)},{color:"primary",size:"md",orientation:"horizontal"})}function ye(e){const{color:n,size:t,state:o,title:i,showDescription:r,description:a,defaultIcon:l,defaultIconName:s,activeIcon:c,activeIconName:p,required:m}=d(e.properties,{"\u21B3 Description":"showDescription"});return u("USwitch",{label:i,description:r&&a||void 0,color:h(n),size:t,checkedIcon:l?y(p.name):void 0,uncheckedIcon:c?y(s.name):void 0,disabled:o==="Disabled",required:m},{color:"primary",size:"md",disabled:!1,required:!1})}function ht(e){const{state:n,leadingSlot:t,avatar:o,icon:i,iconName:r,label:a}=d(e.properties);return S({label:a,icon:t==="Icon"&&i?y(r.name):void 0,avatar:t==="Avatar"&&o?D():void 0,disabled:n==="Disabled"},{disabled:!1})}function ft(e){const{color:n,size:t,variant:o,align:i}=d(e.properties),r=[],a=[];return I(e,{type:"INSTANCE",name:"Tab"}).forEach(l=>{const s=ht(l),c=g(l,{type:"INSTANCE",name:"Badge"}),p=c?Z(c):void 0;if(p){const m=O(s.label||"");s.slot=m,r.push(E(m,[p]))}a.push(s)}),u("UTabs",{items:a,color:h(n),variant:h(o),size:t,orientation:h(i)},{color:"primary",variant:"pill",size:"md",orientation:"horizontal"},r)}function gt(e){const{color:n,size:t,variant:o,state:i,placeholder:r,placeholderSlot:a}=d(e.properties);return u("UTextarea",{placeholder:r?a:void 0,color:h(n),variant:h(o),size:t,disabled:i==="Disabled"},{color:"primary",variant:"outline",size:"md",disabled:!1})}function vt(e){const{color:n,leadingSlot:t,description:o,title:i,showDescription:r,leadingIconName:a}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),l=g(e,{type:"FRAME",name:"Content"}),s=g(l||e,{type:"INSTANCE",name:C}),c=s?w(s,{size:"md",color:"neutral",variant:"link"}):!1,p=c?c.icon:void 0,m=R(e,[{query:"one",type:"FRAME",name:"Actions"},{query:"children",type:"INSTANCE",name:C}]).map(f=>w(f,{size:"xs"}));return u("UToast",{title:i,description:r&&o||void 0,icon:t==="Icon"?y(a.name):void 0,avatar:t==="Avatar"?D():void 0,color:h(n),close:c,closeIcon:p,actions:m.length>0?m:void 0},{color:"primary",close:!0,closeIcon:b.icons.close})}const yt={top:"bottom",right:"left",bottom:"top",left:"right",none:"bottom"};function bt(e){const{properties:n}=e,{arrowPlacement:t,label:o}=d(n),i=S({side:yt[h(t)]},{side:"bottom"}),r=J(e,{size:"sm"});return u("UTooltip",{text:o,content:i,arrow:t!=="None",kbds:r},{arrow:!1})}const Nt={Accordion:ze,Alert:Fe,Avatar:K,AvatarGroup:re,Badge:Z,Breadcrumb:Le,...W(C,k),ButtonGroup:Re,Calendar:Pe,Card:Oe,Carousel:$e,Checkbox:je,Chip:Ge,Collapsible:Xe,ColorPicker:_e,CommandPalette:ce,Drawer:Ve,DropdownMenu:le,FormField:We,Icon:ee,...W(G,X),InputMenu:Je,InputNumber:pe,Kbd:ae,Link:Qe,Modal:Ye,NavigationMenu:ue,Pagination:nt,PinInput:de,Popover:ot,Progress:it,RadioGroup:at,...W(fe,ge),SelectMenu:ve,Separator:st,Skeleton:ct,Slideover:pt,Slider:dt,Stepper:mt,Switch:ye,Tabs:ft,TextArea:gt,Toast:vt,Tooltip:bt};function It(e){const{iconLeading:n,iconLeadingName:t,close:o,title:i,color:r}=d(e.properties),a=I(e,{type:"INSTANCE",name:C}),l=(o?a.slice(0,-1):a).map(p=>w(p,{color:"neutral",size:"xs"})),{icon:s,...c}=o?w(a.at(-1),{size:"md",color:"neutral",variant:"ghost"}):{};return u("UBanner",{color:h(r),icon:n?y(t.name):void 0,title:i,actions:l.length>0?l:void 0,close:o&&Object.keys(c).length>0?c:o,closeIcon:s},{color:"primary",close:!1,closeIcon:b.icons.close})}function be(e){const{showDescription:n,description:t,name:o,size:i,orientation:r}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),a=g(e,{type:"INSTANCE",name:"Avatar"}),{chip:l,...s}=a?x(oe(a),"size"):{};return u("UUser",{name:o,description:n&&t||void 0,avatar:Object.keys(s).length>0?s:void 0,chip:x(l,"size","inset"),size:h(i),orientation:h(r)},{size:"md",orientation:"horizontal"})}function Ct(e){const{props:{orientation:n,...t}}=be(e);return t}function Ne(e){const{image:n,authors:t,title:o,showDescription:i,description:r,showDate:a,date:l,showBadge:s,variant:c,orientation:p,author:m}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription","\u{1F441}\uFE0F Date":"showDate","\u{1F441}\uFE0F Badge":"showBadge"}),f=U(e,[{query:"one",type:"FRAME",name:"Date + badge"},{query:"one",type:"INSTANCE",name:"Badge"}]),v=s&&f?V(f,{color:"neutral",variant:"subtle"}):void 0,N=[];if(t){if(m==="One"){const T=U(e,[{query:"child",type:"FRAME",name:"Content"},{query:"child",type:"INSTANCE",name:"User"}]);T&&N.push(Ct(T))}else if(m==="Multiple"){const T=U(e,[{query:"child",type:"FRAME",name:"Content"},{query:"child",type:"INSTANCE",name:"AvatarGroup"}]);if(T){const F=re(T);F&&N.push(...F.children.map(q=>{const{props:B}=q;return{avatar:B}}))}}}return u("UBlogPost",{title:o,description:i?r:void 0,date:a?l:void 0,badge:typeof v=="number"?String(v):v,authors:N,image:n?"https://picsum.photos/540/360":void 0,orientation:h(p),variant:h(c)},{orientation:"vertical",variant:"outline"})}function St(e){const{props:{orientation:n,...t}}=Ne(e);return t}function Tt(e){const{orientation:n}=d(e.properties),t=P(e,{type:"INSTANCE",name:"BlogPost"}).map(St);return u("UBlogPosts",{orientation:h(n),posts:t},{orientation:"horizontal"})}function At(e){const n=g(e,{type:"INSTANCE",name:"SelectMenu"}),{props:t={}}=n?ve(n):{};return u("UColorModeSelect",x(t,"items","icon"),{})}function Et(e){const n=g(e,{type:"INSTANCE",name:"Switch"}),{props:t={}}=n?ye(n):{};return u("UColorModeSwitch",Te(t,"disabled","color","size"),{})}function zt(e){const{iconLeading:n,iconLeadingName:t,badge:o,label:i,color:r,variant:a,state:l,active:s,highlight:c}=d(e.properties),p=o?g(e,{type:"INSTANCE",name:"Badge"}):void 0,m=p?V(p,{color:"neutral",variant:"outline",size:"sm"}):void 0;return{title:i,path:`#${O(i)}`,...S({icon:n?y(t.name):void 0,badge:m,active:s==="True",disabled:l==="Disabled",color:h(r),variant:h(a),highlight:c==="True"},{active:!1,disabled:!1,color:"primary",variant:"pill",highlight:!1})}}function Mt(e){const{iconTrailing:n,badge:t,iconLeading:o,label:i,iconLeadingName:r,active:a,highlightColor:l,variant:s}=d(e.properties),c=t?g(e,{type:"INSTANCE",name:"Badge"}):void 0,p=c?V(c,{color:"neutral",variant:"outline",size:"sm"}):void 0,m=e.children[e.children.length-1],f=n?y(m.name):void 0;return{title:i,path:`#${O(i)}`,...S({icon:o?y(r.name):void 0,badge:p,active:a==="True",highlightColor:h(l),variant:h(s),trailingIcon:f},{active:!1,highlightColor:"primary",variant:"pill",trailingIcon:b.icons.chevronDown})}}function wt(e){const n=Mt(g(e,{type:"INSTANCE",name:"ContentNavigationItem"})),t=P(e,{type:"INSTANCE",name:"ContentNavigationLink"}).map(zt),o=z(t,"color"),i=z(t,"variant")||n.variant,r=z(t,"highlight");return{...n,children:t.map(a=>x(a,"color","variant","highlight")),color:o,variant:i,highlight:r}}function Ft(e){const n=I(e,{type:"INSTANCE",name:"ContentNavigationItems"}).map(wt);return u("UContentNavigation",{navigation:n.map(t=>x(t,"color","variant","highlight","highlightColor","trailingIcon")),color:z(n,"color"),highlightColor:z(n,"highlightColor"),variant:z(n,"variant"),highlight:!!z(n,"highlight"),trailingIcon:z(n,"trailingIcon")},{color:"primary",highlightColor:"primary",variant:"pill",highlight:!1,trailingIcon:b.icons.chevronDown})}function Dt(e){const n=g(e,{type:"INSTANCE",name:"CommandPalette"}),t=n?ce(n).props:{};return u("UContentSearch",{...t},{})}function Ut(e){const n=g(e,{type:"INSTANCE",name:C}),t=n?k(n).props:{},{icon:o,label:i,color:r,variant:a,size:l,disabled:s}=t;return u("UContentSearchButton",{icon:o,label:i,color:r,variant:a,size:l,disabled:s},{icon:b.icons.search,color:"neutral",variant:"ghost"})}function kt(e){const{title:n,description:t}=d(e.properties),o=U(e,[{query:"child",type:"FRAME",name:"Icon"},{query:"child",type:"INSTANCE"}]),i=o?y(o.name):void 0;return{title:n,description:t,path:`#${O(n)}`,icon:i}}function Bt(e){const n=I(e,{type:"INSTANCE",name:"ContentSurroundItem"}).map(kt),{icon:t,...o}=n[0],{icon:i,...r}=n[1];return u("UContentSurround",{prevIcon:t,nextIcon:i,surround:[o,r]},{prevIcon:b.icons.arrowLeft,nextIcon:b.icons.arrowRight})}function Ie(e){const{label:n,highlightColor:t}=d(e.properties);return{id:O(n),text:n,depth:3,...S({highlightColor:h(t)},{highlightColor:"primary"})}}function Lt(e){const{color:n}=d(e.properties),t=g(e,{type:"INSTANCE",name:"ContentTocLink"}),{id:o,text:i,highlightColor:r}=t?Ie(t):{},a=R(e,[{query:"child",type:"FRAME",name:"ContentTocList"},{query:"children",type:"INSTANCE",name:"ContentTocLink"}]).map(Ie),l=z(a,"highlightColor");return{id:o||"label",text:i||"Label",depth:2,children:a.map(s=>x(s,"highlightColor")),...S({color:h(n),highlightColor:l||r},{color:"primary",highlightColor:"primary"})}}function Rt(e){const{title:n}=d(e.properties),t=P(e,{type:"INSTANCE",name:"ContentTocItem"}).map(Lt),o=z(t,"color"),i=z(t,"highlightColor");return u("UContentToc",{title:n,links:t.map(r=>x(r,"color","highlightColor")),color:o,highlightColor:i},{title:"On this page",color:"primary",highlightColor:"primary"})}function qt(e){const{errorMessage:n,statusMessage:t,statusCode:o}=d(e.properties),i=g(e,{type:"INSTANCE",name:C}),r=i?w(i,{size:"lg",color:"primary",variant:"solid",label:"Back to home"}):!1;return u("UError",{error:{statusCode:o,statusMessage:t,message:n},clear:r?Object.keys(r).length>0?r:!0:!1},{clear:!0})}function Pt(e){const n=U(e,[{query:"child",type:"FRAME",name:"LeftSlot"},{query:"child",type:"TEXT"}])?.characters,t=R(e,[{query:"child",type:"FRAME",name:"RightSlot"},{query:"children",type:"INSTANCE",name:C}]).map(i=>k(i)),o=U(e,[{query:"child",type:"FRAME",name:"Default"},{query:"child",type:"INSTANCE",name:"NavigationMenu"}]);return u("UFooter",{},{},[...n?[E("left",[n])]:[],...o?[ue(o)]:[],...t.length?[E("right",t)]:[]])}const xt={...Nt,Banner:It,BlogPost:Ne,BlogPosts:Tt,ColorModeSelect:At,ColorModeSwitch:Et,ContentNavigation:Ft,ContentSearch:Dt,ContentSearchButton:Ut,ContentSurround:Bt,ContentToc:Rt,Error:qt,Footer:Pt,User:be},Ot=Ae(xt),$t={name:"Nuxt UI Pro",code:{component:{title:"Component",lang:"vue",transformComponent:Ot}}};export{$t as plugin};
