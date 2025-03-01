function _t(e){return e}function ee(e,n,t){return{name:e,props:n??{},children:t??[]}}function W(e,n){if(n===void 0)return!0;if(typeof e=="string"){if(Array.isArray(n))return n.includes(e);if(n instanceof RegExp)return n.test(e)}return e===n}function _(e,n){return typeof n=="function"?n(e):W(e.type,n.type)&&W(e.name,n.name)&&W(e.visible,n.visible??!0)}function g(e,n){return e.children.find(t=>_(t,n))??null}function C(e,n){return e.children.filter(t=>_(t,n))}function M(e,n){for(const t of e.children){if(_(t,n))return t;if("children"in t){const o=M(t,n);if(o)return o}}return null}function P(e,n){const t=[];for(const o of e.children)_(o,n)&&t.push(o),"children"in o&&t.push(...P(o,n));return t}function L(e,n){if(n.length===0)return[];let t=[e];for(const o of n){const i=new Set,r=[];for(const a of t)if("children"in a)if(i.add(a),o.query==="child"||o.query==="one"){const l=o.query==="child"?g(a,o):M(a,o);l&&!i.has(l)&&(i.add(l),r.push(l))}else{const l=o.query==="children"?C(a,o):P(a,o);for(const s of l)i.has(s)||(i.add(s),r.push(s))}t=r}return t}function U(e,n){return L(e,n)[0]}function Te(e){return Array.isArray(e)?e.slice():e instanceof Object?{...e}:e}function Ae(e,n){let t={};return Object.keys(e||t).forEach(o=>t[n(e[o],o)]=e[o]),t}function x(e,...n){const t=Te(e)??{};for(const o of n)delete t[o];return t}function Ee(e,...n){const t={};if(e!=null)for(const o of n)t[o]=e[o];return t}function te(e){return u("UIcon",{name:v(e.name)},{})}function v(e){if(e){if(e.includes("/")){const[n,t]=e.split("/");return`i-${n}-${t}`}return`i-lucide-${e}`}}function d(e,n){return Ae(e,(t,o)=>{if(n&&o in n)return n[o]??o;const i=o.trim().replace(/^[^0-9A-Z]+/i,"").replace(/[ /]+(.)/g,(r,a)=>a.toUpperCase());return i.charAt(0).toLowerCase()+i.slice(1)})}function A(e,n,t){const o=t?n:null,i=t??n;return ee("template",{[`#${e}`]:o??!0},i)}function K(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/(\d)([a-z])/gi,"$1-$2").replace(/([a-z])(\d)/gi,"$1-$2").replace(/[_\s]/g,"-").toLowerCase()}function h(e){return e.toLowerCase()}function T(e,n){const t={};for(const o in e)e[o]!==void 0&&e[o]!==n[o]&&(t[o]=e[o]);return t}const O="Lorem ipsum",$="Lorem ipsum dolor sit amet, consectetur adipiscing elit.";function u(e,n,t,o){return ee(e,T(n,t),o)}function z(e,n){return e.find(t=>t[n]!=null)?.[n]}function Z(e,n){return e.reduce((t,o)=>({...t,[o]:n}),{})}function ne(e){return e.type==="INSTANCE"&&e.children.length===1&&e.children[0].type==="VECTOR"&&e.children[0].name==="Vector"}function ze(e){return({component:n})=>{try{if(ne(n))return te(n);const t=e[n.name.replaceAll(" ","")];return t?t(n):""}catch(t){return console.error(t),""}}}function Me(e){return/^\d+$/.test(String(e))}const b={icons:{arrowRight:"i-lucide-arrow-right",arrowLeft:"i-lucide-arrow-left",check:"i-lucide-check",chevronDoubleRight:"i-lucide-chevrons-right",chevronDown:"i-lucide-chevron-down",chevronDoubleLeft:"i-lucide-chevrons-left",chevronRight:"i-lucide-chevron-right",chevronLeft:"i-lucide-chevron-left",close:"i-lucide-x",ellipsis:"i-lucide-ellipsis",minus:"i-lucide-minus",plus:"i-lucide-plus",search:"i-lucide-search"}};function we(e){const n=C(e,{type:"INSTANCE",name:"Collapsible_panel"});let t=0;const o=n.map(i=>{const{state:r,label:a,description:l,iconLeading:s,iconLeadingName:c,iconTrailingName:p}=d(i.properties);return r==="Open"&&t++,T({label:a||O,content:l||$,icon:s?v(c.name):void 0,trailingIcon:v(p.name),disabled:r==="Disable"},{disabled:!1,trailingIcon:b.icons.chevronDown})});return u("UAccordion",{items:o,type:t>1?"multiple":"single"},{type:"single"})}function V(e,n={}){const{variant:t,size:o,iconName:i,chipPosition:r}=d(e.properties),a=g(e,{type:"TEXT"})?.characters,l=u("UAvatar",{icon:t==="Icon"?v(i.name):void 0,alt:t==="Alt"?a:void 0,...t==="Image"?D():{},size:o},{size:"md",...n});if(r==="None")return l;const s=h(r);return u("UChip",{inset:!0,position:s},{position:"top-right"},[l])}const oe=["benjamincanac","romhml","smarroufin","atinux","Haythamasalama","hywax","danielroe","sandros94","malik-jouda","connerblanton","antfu","Justineo"];function Fe(e){return{src:`https://github.com/${e}.png`,alt:`@${e}`}}function D(){return Fe(oe[Math.floor(Math.random()*oe.length)])}function ie(e,n={}){const{props:t,children:o}=V(e,n),i=o[0];return i&&typeof i!="string"&&i.name==="UAvatar"?{...i.props,chip:t}:t}const re={ButtonPrimary:"primary",ButtonSecondary:"secondary",ButtonSuccess:"success",ButtonInfo:"info",ButtonWarning:"warning",ButtonError:"error",ButtonNeutral:"neutral"},S=Object.keys(re);function k(e,n={}){const{variant:t,size:o,state:i,square:r,slot:a,iconLeading:l,iconLeadingName:s,iconTrailing:c,iconTrailingName:p,avatarLeading:m}=d(e.properties),f=re[e.name],y=a==="Icon"&&l?v(s.name):void 0,N=c?v(p.name):void 0,I=a==="Avatar"&&m?D():void 0,F=M(e,{type:"TEXT"})?.characters;return u("UButton",{variant:h(t),color:f,size:o,square:r==="True",icon:y,trailingIcon:N,avatar:I,disabled:i==="Disabled"},{color:"primary",variant:"solid",size:"md",square:!1,disabled:!1,...n},F?[F]:[])}function w(e,n={}){const{props:t,children:o}=k(e),i=o.map(r=>typeof r=="string"?r:void 0).filter(Boolean).join("");return T({...i?{label:i}:{},...t},n)}function Ue(e){const{props:{size:n,...t},children:o}=k(e);return u("UButton",t,{},o)}function De(e){const{color:n,variant:t,leadingSlot:o,showDescription:i,action:r,title:a,description:l,closeButton:s,icon:c,iconName:p}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),m=g(e,{type:"INSTANCE",name:S}),f=s&&m?w(m,{size:"md",color:"neutral",variant:"link"}):!1,y=f?f.icon:void 0,N=r==="True"?L(e,[{query:"one",type:"FRAME",name:"Actions"},{query:"children",type:"INSTANCE",name:S}]).map(I=>w(I,{size:"xs"})):[];return u("UAlert",{title:a,description:i&&l||void 0,icon:o==="Icon"&&c?v(p.name):void 0,avatar:o==="Avatar"?D():void 0,color:h(n),variant:h(t),close:f,closeIcon:y,actions:N.length>0?N:void 0},{color:"primary",variant:"solid",close:!1,closeIcon:b.icons.close})}function ae(e){const{size:n}=d(e.properties),t=C(e,{type:"INSTANCE",name:"Avatar"}).map(r=>V(r));t.forEach(r=>{if("size"in r.props){const{size:a,...l}=r.props;r.props=l}});const o=t.at(-1)?.props,i=!Number.isNaN(Number.parseInt(o?.alt||"",10));return u("UAvatarGroup",{size:n,max:i?t.length-1:void 0},{size:"md"},i?t.slice(0,-1):t)}function J(e,n={}){const{color:t,variant:o,size:i,roundedFull:r,label:a,iconLeading:l,iconLeadingName:s,iconTrailing:c,iconTrailingName:p}=d(e.properties),m=l&&c?{leadingIcon:v(s.name),trailingIcon:v(p.name)}:{icon:l?v(s.name):c?v(p.name):void 0,trailing:c};return u("UBadge",{class:r==="True"?"rounded-full":void 0,color:h(t),variant:h(o),size:i,...m},{color:"primary",variant:"solid",size:"md",trailing:!1,...n},a?[a]:[])}function H(e,n={}){const{props:t,children:o}=J(e,n),i=o.map(r=>typeof r=="string"?r:void 0).filter(Boolean).join("")||void 0;return Object.keys(t).length===0?String(Number(i))===i?Number(i):i:{label:i,...t}}const ke={"\u2318":"meta","\u2303":"ctrl","\u2325":"alt","\u229E":"win","\u21E7":"shift","\u21B5":"enter","\u2326":"delete","\u232B":"backspace","\u238B":"escape","\u21E5":"tab","\u21EA":"capslock","\u2191":"arrowup","\u2192":"arrowright","\u2193":"arrowdown","\u2190":"arrowleft","\u21DE":"pageup","\u21DF":"pagedown","\u2196":"home","\u2198":"end"};function le(e){const{size:n,variant:t}=d(e.properties),o=g(e,{type:"TEXT"})?.characters;return u("UKbd",{value:o?ke[o]||o:void 0,variant:h(t),size:n},{variant:"outline",size:"md"})}function Le(e,n={}){const{props:t}=le(e);return T(t,n)}function Q(e,n={}){const t=L(e,[{query:"child",type:"FRAME",name:"Kbd"},{query:"children",type:"INSTANCE",name:"Kbd"}]).map(o=>Le(o,n));if(t.length!==0)return t.every(o=>Object.keys(o).length===1&&o.value)?t.map(o=>o.value):t.length>0?t:void 0}function Be(e){const{properties:n}=e,{state:t,leadingSlot:o,trailingSlot:i,label:r,iconLeadingName:a,iconTrailingName:l}=d(n);return T({label:r,icon:o==="Icon"?v(a.name):void 0,avatar:o==="Avatar"?D():void 0,kbds:i==="Kbd"?Q(e):void 0,type:i==="Icon"&&l.name==="check"?"checkbox":"link",checked:i==="Icon"&&l.name==="check",disabled:t==="Disabled"},{type:"link",checked:!1,disabled:!1})}const Re={"Bottom-start":"bottom","Bottom-end":"bottom",Right:"right","Top-start":"top",Left:"left"};function se(e,n={}){const{size:t,variant:o,alignment:i,arrow:r}=d(e.properties),a=T({side:Re[i]},{side:"bottom"}),l=L(e,[{query:"child",type:"FRAME",name:"DropdownMenu"},{query:"children",type:"FRAME",name:/^Container/}]).map(c=>C(c,{type:"INSTANCE",name:"DropdownMenuItem"}).map(Be)),s=[];if(o==="Button"){const c=r==="True"?g(e,{type:"FRAME",name:"Button + arrow"}):e,p=c?g(c,{type:"INSTANCE",name:S}):void 0;if(p){const m=k(p);m.props={...m.props,...n.button},s.push(m)}}else if(o==="Avatar"){const c=r==="True"?g(e,{type:"FRAME",name:"Avatar + arrow"}):e,p=c?g(c,{type:"INSTANCE",name:"Avatar"}):void 0;p&&s.push(V(p))}return u("UDropdownMenu",{size:t,items:l,content:a,arrow:r==="True"},{size:"md",arrow:!1},s)}function qe(e){const{leadingSlot:n,divider:t,separatorIconName:o,separatorSlot:i}=d(e.properties),r=C(e,{name:/^Link|^DropdownMenu/}),a=[],l=[];return r.forEach(s=>{const{type:c,name:p}=s;if(c==="FRAME"&&p.startsWith("Link")){const m=U(s,[{query:"child",type:"INSTANCE",name:"Link"},{query:"child",type:"TEXT",name:"Label"}])?.characters||void 0,f=n==="Icon"&&ne(s.children[0])?v(s.children[0].name):void 0;a.push({label:m,icon:f})}else if(c==="INSTANCE"&&p==="Link")a.push({label:g(s,{type:"TEXT",name:"Label"})?.characters||void 0});else if(c==="INSTANCE"&&p==="DropdownMenu"){const m=se(s,{button:{icon:void 0,":icon":"item.icon"}});if(!m){a.push({icon:b.icons.ellipsis});return}const{items:f,...y}=m.props;m.props=y,m.props[":items"]="item.children",a.push({icon:b.icons.ellipsis,slot:"dropdown",children:f}),l.push(A("dropdown","{ item }",[m]))}}),t==="Span"&&i&&l.push(A("separator",[i])),u("UBreadcrumb",{items:a,separatorIcon:t==="Icon"?v(o.name):void 0},{separatorIcon:b.icons.chevronRight},l)}const ce={InputOutline:"outline",InputSoft:"soft",InputNone:"none",InputGhost:"ghost",InputSubtle:"subtle"},j=Object.keys(ce);function G(e,n={}){const t=ce[e.name],{color:o,size:i,state:r,leadingSlot:a,trailingSlot:l,placeholder:s,placeholderLabel:c,completed:p,completedLabel:m,iconLeadingName:f,iconTrailingName:y,span:N}=d(e.properties),I=a==="Icon"?v(f.name):void 0,F=l==="Icon"?v(y.name):void 0,q=a==="Avatar"?D():void 0,B=[];return a==="Span"&&N?B.push(A("leading",[N])):l==="Span"&&N&&B.push(A("trailing",[N])),u("UInput",{type:p&&m&&/^\*+$/.test(m)?"password":"text",placeholder:s?c:void 0,color:h(o),variant:t,size:i,icon:I,trailingIcon:F,avatar:q,disabled:r==="Disabled"},{type:"text",color:"primary",variant:"outline",size:"md",disabled:!1,...n},B)}function Pe(e){const{variant:n,size:t,orientation:o}=d(e.properties),i=[];if(n==="Buttons"){const r=C(e,{type:"INSTANCE",name:S});i.push(...r.map(a=>Ue(a)))}else{const r=U(e,[{query:"child",type:"INSTANCE",name:"Input"},{query:"child",type:"INSTANCE",name:j}]);r&&i.push(G(r));const a=g(e,{type:"INSTANCE",name:S});a&&i.push(k(a))}return u("UButtonGroup",{size:t,orientation:h(o)},{size:"md",orientation:"horizontal"},i)}function xe(e){const{color:n,variant:t,dateValue:o}=d(e.properties),i=Number(o);return{color:h(n),selected:t==="Data-selected",date:Number.isNaN(i)?0:i}}function Oe(e){const{color:n,size:t,numberOfMonths:o,monthControls:i,yearControls:r}=d(e.properties),a=Number(o),l=P(e,{type:"INSTANCE",name:"calendar-item"}).map(p=>xe(p)),{range:s,multiple:c}=$e(l);return u("UCalendar",{color:h(n),size:t,range:s,multiple:c,numberOfMonths:Number.isNaN(a)?1:a,monthControls:i,yearControls:r},{color:"primary",size:"md",range:!1,multiple:!1,numberOfMonths:1,monthControls:!0,yearControls:!0})}function $e(e){let n=-1;for(let t=0;t<e.length;t++)if(e[t].selected){if(n!==-1&&t-n>1)return{range:!1,multiple:!0};if(t>0&&e[t-1].selected)return{range:!0,multiple:!1};n=t}return{range:!1,multiple:!1}}function je(e){const n=M(e,{type:"FRAME",name:"Header"}),t=M(e,{type:"FRAME",name:"Body"}),o=M(e,{type:"FRAME",name:"Footer"});return u("UCard",{},{},[...n?[A("header",[O])]:[],...t?[$]:[],...o?[A("footer",[O])]:[]])}function Ge(e){const{variant:n,pagination:t,prevNext:o}=d(e.properties);let i={};if(o){const[r,a]=L(e,[{query:"child",type:"FRAME",name:"Carousel + prev/next"},{query:"children",type:"INSTANCE",name:S}]),l={size:"md",color:"neutral",variant:"link"},{icon:s,...c}=r?w(r,{...l,icon:b.icons.arrowLeft}):{},{icon:p,...m}=a?w(a,{...l,icon:b.icons.arrowRight}):{};i={prev:c,next:m,prevIcon:s,nextIcon:p}}return u("UCarousel",{items:[],arrows:o,dots:t,fade:n==="Fade",...i},{arrows:!1,dots:!1,fade:!1})}function Xe(e){const{color:n,size:t,state:o,label:i,description:r,descriptionSlot:a,required:l,icon:s}=d(e.properties);return u("UCheckbox",{label:i,description:r?a:void 0,color:h(n),size:t,icon:v(s.name),disabled:o==="Disabled",required:l},{color:"primary",size:"md",icon:b.icons.check,disabled:!1,required:!1})}function _e(e){const{color:n,size:t,isLabel:o,label:i}=d(e.properties);return u("UChip",{text:o==="True"?i:void 0,color:h(n),size:t},{color:"primary",size:"md"})}function Ke(e){const{open:n}=d(e.properties),t=g(e,{type:"INSTANCE",name:S});return u("UCollapsible",{open:n},{open:!1},t?[k(t)]:[])}function Ve(e){const{size:n,state:t}=d(e.properties);return u("UColorPicker",{size:n,disabled:t==="Disabled"},{size:"md",disabled:!1})}function He(e){const{state:n,leadingSlot:t,trailingSlot:o,description:i,label:r,descriptionSlot:a,iconLeadingName:l,iconTrailingName:s}=d(e.properties);return T({label:r,suffix:i&&a||void 0,icon:t==="Icon"?v(l.name):void 0,avatar:t==="Avatar"?D():void 0,kbds:o==="Kbd"?Q(e):void 0,active:o==="Icon"&&s.name==="check",disabled:n==="Disabled"},{active:!1,disabled:!1})}function pe(e){const{open:n}=d(e.properties),t=n==="Default"?e:g(e,{type:"FRAME",name:"CommandPalette"}),o=t?g(t,{type:"INSTANCE",name:j}):void 0,i=o?G(o):void 0,{icon:r,placeholder:a,disabled:l}=i?.props||{},s=t?C(t,{type:"FRAME",name:/^Container/}):[];let c=0;const p=s.map(F=>{const q=g(F,{type:"TEXT",name:"Title"})?.characters,B=C(F,{type:"INSTANCE",name:"CommandPaletteItem"}).map(E=>{const R=He(E);return R.active&&c++,R});return{id:K(q||""),label:q,items:B}}),m=M(e,{type:"INSTANCE",name:S}),f=m?w(m,{size:"md",color:"neutral",variant:"ghost"}):!1,{icon:y,square:N,...I}=f||{};return u("UCommandPalette",{icon:r,placeholder:a,close:m?Object.keys(I).length>0?I:!0:!1,closeIcon:y,groups:p,multiple:c>1,disabled:l},{icon:b.icons.search,placeholder:"Type a command or search...",close:!1,closeIcon:b.icons.close,multiple:!1,disabled:!1})}function We(e){const{direction:n,overlay:t,handle:o,heading:i,title:r,showDescription:a,description:l,buttons:s}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),c=[A("body",[$])];if(s){const p=L(e,[{query:"one",type:"FRAME",name:"Buttons"},{query:"children",type:"INSTANCE",name:S}]);if(p.length>0){const m=p.map(f=>{const y=k(f);return y.props.class="justify-center",y});c.push(A("footer",m))}}return u("UDrawer",{title:i?r:void 0,description:a?l:void 0,overlay:t==="True",handle:o,direction:h(n)},{overlay:!0,handle:!0,direction:"bottom"},c)}function de(e){const{color:n,variant:t,size:o,orientation:i,state:r,highlight:a,placeholder:l,placeholderText:s}=d(e.properties),[c,p]=C(e,{type:"INSTANCE",name:S}).map(I=>w(I,{variant:"link",square:!0,size:o})),{icon:m,...f}=c||{},{icon:y,...N}=p||{};return u("UInputNumber",{placeholder:l&&s||void 0,color:h(n),variant:h(t),size:o,highlight:a==="True",orientation:h(i),increment:N,incrementIcon:y,decrement:f,decrementIcon:m,disabled:r==="Disabled"},{color:"primary",variant:"outline",size:"md",highlight:!1,orientation:"horizontal",incrementIcon:b.icons.plus,decrementIcon:b.icons.minus,disabled:!1})}function Ze(e){const{color:n,variant:t,state:o,highlight:i,placeholder:r,placeholderText:a,completed:l,completedText:s,mask:c}=d(e.properties);return{color:h(n),variant:h(t),highlight:i==="True",disabled:o==="Disabled",placeholder:r&&a||void 0,value:l&&s||void 0,mask:c}}function ue(e){const n=C(e,{type:"INSTANCE",name:"PinInputItem"}).map(Ze),t=n.some(p=>p.value&&!/^\d$/.test(p.value))?"text":"number",o=n.find(p=>!!p.placeholder)?.placeholder,i=n.some(p=>p.mask),{size:r}=d(e.properties),{color:a,variant:l,highlight:s,disabled:c}=n[0];return u("UPinInput",{color:a,variant:l,size:r,length:n.length,highlight:s,type:t,disabled:c,placeholder:o,mask:i},{color:"primary",variant:"outline",size:"md",length:5,highlight:!1,type:"text",disabled:!1,mask:!1})}function me(e){const{size:n,input:t,error:o,label:i,required:r,hint:a,hintSlot:l,help:s,helpSlot:c,description:p,descriptionSlot:m}=d(e.properties),f=[];if(t==="Input"){const y=M(e,{type:"INSTANCE",name:j});y&&f.push(G(y))}else if(t==="InputNumber"){const y=M(e,{type:"INSTANCE",name:"InputNumber"});y&&f.push(de(y))}else if(t==="PinInput"){const y=M(e,{type:"INSTANCE",name:"PinInput"});y&&f.push(ue(y))}return u("UFormField",{label:i,description:p&&m||void 0,help:o==="False"&&s&&c||void 0,error:o==="True"&&(c||!0),hint:a&&l||void 0,size:n,required:r},{error:!1,size:"md",required:!1},f)}function Je(e){const{state:n,leadingSlot:t,label:o,iconName:i}=d(e.properties);return T({label:o,icon:t==="Icon"?v(i.name):void 0,avatar:t==="Avatar"?D():void 0,chip:t==="Dot"?{color:"primary"}:void 0,disabled:n==="Disabled",selected:n==="Selected"},{disabled:!1,selected:!1})}function Qe(e){const{size:n}=d(e.properties),t=g(e,{type:"FRAME",name:"InputMenu"}),o=t?C(t,l=>l.type==="TEXT"&&l.name==="Title"||l.type==="INSTANCE"&&l.name==="InputMenuItem"&&l.visible===!0).map(l=>l.type==="TEXT"?{label:l.characters,type:"label"}:Je(l)):[],i=[],r=g(e,{type:"INSTANCE",name:j}),a=r?G(r).props:{};return u("UInputMenu",{size:n,items:o,...a},{size:"md"},i)}function Ye(e){const{color:n,state:t,label:o}=d(e.properties);return u("ULink",{active:h(n)==="primary",disabled:t==="Disabled"},{active:!1,disabled:!1},[o])}function X(e,n="path"){const t=K(e);switch(n){case"external":return`https://example.com/${t}`;case"hash":return`#${t}`;default:return`/${t}`}}function et(e){const{header:n,body:t,footer:o}=d(e.properties);return u("UModal",{},{},[...n?[A("header",[O])]:[],...t?[A("body",[$])]:[],...o?[A("footer",[O])]:[]])}function tt(e){const{icon:n,iconName:t,title:o,description:i,descriptionSlot:r}=d(e.properties);return{label:o,description:i&&r||void 0,icon:n?v(t.name):void 0}}function nt(e){const{color:n,variant:t,state:o,active:i,highlight:r,iconLeading:a,iconLeadingName:l,iconTrailing:s,badge:c,label:p,external:m}=d(e.properties),f=c?U(e,[{query:"child",type:"FRAME",name:"Container"},{query:"child",type:"INSTANCE",name:"Badge"}]):void 0,y=f?H(f,{size:"sm",color:"neutral",variant:"outline"}):void 0,N=s?P(e,{type:"INSTANCE",name:"NavigationMenu(DropdownItem)"}).map(tt):void 0,I=m==="True";return T({label:p,icon:a?v(l.name):void 0,to:X(p,I?"external":"path"),badge:y,external:I,children:I?void 0:N,active:i==="True",disabled:o==="Disabled",variant:h(t),color:h(n),highlight:r==="True"},{external:!1,active:!1,disabled:!1,variant:"pill",color:"primary",highlight:!1})}function he(e){const{orientation:n,highlight:t}=d(e.properties),o=C(e,{type:"INSTANCE",name:"NavigationMenuItem"}).map(nt);return u("UNavigationMenu",{items:o.map(i=>x(i,"variant","color","highlight")),color:z(o,"color"),variant:z(o,"variant"),orientation:h(n),highlight:t==="True"||!!z(o,"highlight")},{color:"primary",variant:"pill",orientation:"horizontal",highlight:!1})}function fe(e){if(!e)return[void 0,void 0];const[n,t]=e.split("-");return[n==="undefined"?void 0:n,t==="undefined"?void 0:t]}function ot(e){const{size:n}=d(e.properties),t=C(e,{type:"INSTANCE",name:S}).map(E=>w(E));let o=[];t.length>=5&&(o=[...t],o.splice(2,t.length-4),o=o.every(E=>!Me(E.label||""))?o:[]);const i=o.length===4,[r,a,l,s]=o,c=i?t.splice(2,t.length-4):t,p=c.find(({icon:E,label:R})=>E&&!/^\d+$/.test(R||"")),m=c.reduce((E,R)=>{const Y=`${R.color}-${R.variant}`;return E[Y]=(E[Y]||0)+1,E},{}),f=Object.entries(m).sort(([,E],[,R])=>R-E),[y,N]=f.map(([E])=>E),[I,F]=fe(y),[q,B]=fe(N);return u("UPagination",{color:I,variant:F,activeColor:q,activeVariant:B,size:n,showControls:i,disabled:c.every(E=>E.disabled),firstIcon:r?.icon,prevIcon:a?.icon,nextIcon:l?.icon,lastIcon:s?.icon,ellipsisIcon:p?.icon},{color:"neutral",variant:"outline",activeColor:"primary",activeVariant:"solid",size:"md",showControls:!0,disabled:!1,firstIcon:b.icons.chevronDoubleLeft,prevIcon:b.icons.chevronLeft,nextIcon:b.icons.chevronRight,lastIcon:b.icons.chevronDoubleRight,ellipsisIcon:b.icons.ellipsis})}function it(e){const{position:n,arrow:t}=d(e.properties),o=T({side:h(n)},{side:"bottom"}),i=[A("content",[$])],r=g(e,{type:"INSTANCE",name:S});return r&&i.unshift(k(r)),u("UPopover",{content:o,arrow:t==="True"},{arrow:!1},i)}function rt(e){const{color:n,size:t,orientation:o,value:i,indicator:r}=d(e.properties);return u("UProgress",{modelValue:Number.parseInt(i,10),status:r,size:t,color:h(n),orientation:h(o)},{status:!1,size:"md",color:"primary",orientation:"horizontal"})}function at(e){const{color:n,state:t,label:o,description:i,descriptionSlot:r}=d(e.properties);return T({label:o,description:i&&r||void 0,disabled:t==="Disabled",color:h(n)},{color:"primary",disabled:!1})}function lt(e){const{size:n,align:t,legend:o,required:i}=d(e.properties),r=P(e,{type:"INSTANCE",name:"Radio"}).map(at),a=z(r,"color"),l=r.every(s=>s.disabled);return l&&r.forEach(s=>{delete s.disabled}),u("URadioGroup",{legend:o,items:r,size:n,color:a,orientation:h(t),disabled:l,required:i},{size:"md",color:"primary",orientation:"horizontal",disabled:!1,required:!1})}const ge={SelectOutline:"outline",SelectSoft:"soft",SelectNone:"none",SelectGhost:"ghost",SelectSubtle:"subtle"},ve=Object.keys(ge);function ye(e,n={}){const t=ge[e.name],{color:o,size:i,state:r,leadingSlot:a,placeholder:l,placeholderLabel:s,iconLeadingName:c,iconTrailingName:p}=d(e.properties),m=a==="Icon"?v(c.name):void 0,f=v(p.name),y=a==="Avatar"?D():void 0;return u("USelect",{placeholder:l?s:void 0,color:h(o),variant:t,size:i,icon:m,trailingIcon:f,avatar:y,disabled:r==="Disabled"},{color:"primary",variant:"outline",size:"md",trailingIcon:b.icons.chevronDown,disabled:!1,...n})}function st(e){const{properties:n}=e,{state:t,leadingSlot:o,label:i,iconName:r}=d(n);return T({label:i,icon:o==="Icon"?v(r.name):void 0,avatar:o==="Avatar"?D():void 0,disabled:t==="Disabled",selected:t==="Selected"},{disabled:!1})}function be(e){const n=g(e,{type:"FRAME",name:"SelectMenu"}),t=n?g(n,{type:"FRAME",name:"Container"}):void 0,o=t?C(t,c=>c.type==="FRAME"&&c.name==="Title"&&c.visible===!0||c.type==="INSTANCE"&&c.name==="SelectMenuItem"&&c.visible===!0).map(c=>c.type==="FRAME"?{label:g(c,{type:"TEXT"})?.characters,type:"label"}:st(c)):[],i=g(e,{type:"INSTANCE",name:ve}),r=n?U(n,[{query:"child",type:"INSTANCE",name:"Input"},{query:"child",type:"INSTANCE",name:j}]):void 0,{content:a,...l}=i?ye(i).props:{},s=r?G(r,{placeholder:"Search...",variant:"none"}).props:{};return u("USelectMenu",{...l,items:o,searchInput:s},{})}function ct(e){const{color:n,size:t,orientation:o,separator:i,slot:r,iconName:a,span:l}=d(e.properties),s=r==="Avatar"?g(e,{type:"INSTANCE",name:"Avatar"}):void 0,{chip:c,...p}=s?ie(s):{};return u("USeparator",{label:r==="Span"&&l||void 0,icon:r==="Icon"&&v(a.name)||void 0,avatar:Object.keys(p).length>0?p:void 0,color:h(n),size:t,type:h(i),orientation:h(o)},{color:"neutral",size:"xs",type:"solid",orientation:"horizontal"})}function pt(e){return u("USkeleton",{},{})}function dt(e){const{variant:n,overlay:t}=d(e.properties),o=M(e,{type:"FRAME",name:"Header"}),i=M(e,{type:"FRAME",name:"Body"}),r=M(e,{type:"FRAME",name:"Footer"}),a=M(e,{type:"FRAME",name:"Title and description"}),l=o?g(o,{type:"INSTANCE",name:S}):void 0,s=l?w(l,{size:"md",color:"neutral",variant:"ghost"}):!1,{icon:c,square:p,...m}=s||{},[f,y]=a?C(a,{type:"TEXT"}):[],N=[];return i&&N.push(A("body",[$])),r&&N.push(A("footer",[O])),u("USlideover",{title:f?.characters,description:y?.characters,overlay:t==="True",side:h(n),close:s?Object.keys(m).length>0?m:!0:!1,closeIcon:c},{overlay:!0,side:"right",close:!0,closeIcon:b.icons.close},N)}function ut(e){const{color:n,size:t,orientation:o,state:i,indicatorPosition:r,indicator2:a}=d(e.properties),l=Number(r);return u("USlider",{modelValue:a?[0,l]:l,color:h(n),size:t,orientation:h(o),disabled:i==="Disabled"},{color:"primary",size:"md",orientation:"horizontal",disabled:!1})}function mt(e){const{properties:n}=e,{variant:t,state:o,iconName:i}=d(n,{"\u{1F6A6}State":"state"});return T({icon:t==="Icon"?v(i.name):void 0,disabled:o==="Disabled"},{disabled:!1})}function ht(e){const{color:n,size:t,step:o,orientation:i}=d(e.properties),r=C(e,{type:"FRAME",name:/^Step/}).map(a=>{const l=g(a,{type:"INSTANCE",name:"Stepper_Item"}),s=g(a,{type:"FRAME",name:"Title + description"}),[c,p]=s?C(s,{type:"TEXT"}):[];return l?{title:c?.characters,description:p?.characters,...mt(l)}:void 0}).filter(a=>a!=null);return u("UStepper",{modelValue:Number(o)-1,items:r,color:h(n),size:t,orientation:h(i)},{color:"primary",size:"md",orientation:"horizontal"})}function Ne(e){const{color:n,size:t,state:o,title:i,showDescription:r,description:a,defaultIcon:l,defaultIconName:s,activeIcon:c,activeIconName:p,required:m}=d(e.properties,{"\u21B3 Description":"showDescription"});return u("USwitch",{label:i,description:r&&a||void 0,color:h(n),size:t,checkedIcon:l?v(p.name):void 0,uncheckedIcon:c?v(s.name):void 0,disabled:o==="Disabled",required:m},{color:"primary",size:"md",disabled:!1,required:!1})}function ft(e){const{state:n,leadingSlot:t,avatar:o,icon:i,iconName:r,label:a}=d(e.properties);return T({label:a,icon:t==="Icon"&&i?v(r.name):void 0,avatar:t==="Avatar"&&o?D():void 0,disabled:n==="Disabled"},{disabled:!1})}function gt(e){const{color:n,size:t,variant:o,align:i}=d(e.properties),r=[],a=[];return C(e,{type:"INSTANCE",name:"Tab"}).forEach(l=>{const s=ft(l),c=g(l,{type:"INSTANCE",name:"Badge"}),p=c?J(c):void 0;if(p){const m=K(s.label||"");s.slot=m,r.push(A(m,[p]))}a.push(s)}),u("UTabs",{items:a,color:h(n),variant:h(o),size:t,orientation:h(i)},{color:"primary",variant:"pill",size:"md",orientation:"horizontal"},r)}function vt(e){const{color:n,size:t,variant:o,state:i,placeholder:r,placeholderSlot:a}=d(e.properties);return u("UTextarea",{placeholder:r?a:void 0,color:h(n),variant:h(o),size:t,disabled:i==="Disabled"},{color:"primary",variant:"outline",size:"md",disabled:!1})}function yt(e){const{color:n,leadingSlot:t,description:o,title:i,showDescription:r,leadingIconName:a}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),l=g(e,{type:"FRAME",name:"Content"}),s=g(l||e,{type:"INSTANCE",name:S}),c=s?w(s,{size:"md",color:"neutral",variant:"link"}):!1,p=c?c.icon:void 0,m=L(e,[{query:"one",type:"FRAME",name:"Actions"},{query:"children",type:"INSTANCE",name:S}]).map(f=>w(f,{size:"xs"}));return u("UToast",{title:i,description:r&&o||void 0,icon:t==="Icon"?v(a.name):void 0,avatar:t==="Avatar"?D():void 0,color:h(n),close:c,closeIcon:p,actions:m.length>0?m:void 0},{color:"primary",close:!0,closeIcon:b.icons.close})}const bt={top:"bottom",right:"left",bottom:"top",left:"right",none:"bottom"};function Nt(e){const{properties:n}=e,{arrowPlacement:t,label:o}=d(n),i=T({side:bt[h(t)]},{side:"bottom"}),r=Q(e,{size:"sm"});return u("UTooltip",{text:o,content:i,arrow:t!=="None",kbds:r},{arrow:!1})}const It={Accordion:we,Alert:De,Avatar:V,AvatarGroup:ae,Badge:J,Breadcrumb:qe,...Z(S,k),ButtonGroup:Pe,Calendar:Oe,Card:je,Carousel:Ge,Checkbox:Xe,Chip:_e,Collapsible:Ke,ColorPicker:Ve,CommandPalette:pe,Drawer:We,DropdownMenu:se,FormField:me,Icon:te,...Z(j,G),InputMenu:Qe,InputNumber:de,Kbd:le,Link:Ye,Modal:et,NavigationMenu:he,Pagination:ot,PinInput:ue,Popover:it,Progress:rt,RadioGroup:lt,...Z(ve,ye),SelectMenu:be,Separator:ct,Skeleton:pt,Slideover:dt,Slider:ut,Stepper:ht,Switch:Ne,Tabs:gt,TextArea:vt,Toast:yt,Tooltip:Nt};function Ct(e){const{iconLeading:n,iconLeadingName:t,close:o,title:i,color:r}=d(e.properties),a=C(e,{type:"INSTANCE",name:S}),l=(o?a.slice(0,-1):a).map(p=>w(p,{color:"neutral",size:"xs"})),{icon:s,...c}=o?w(a.at(-1),{size:"md",color:"neutral",variant:"ghost"}):{};return u("UBanner",{color:h(r),icon:n?v(t.name):void 0,title:i,actions:l.length>0?l:void 0,close:o&&Object.keys(c).length>0?c:o,closeIcon:s},{color:"primary",close:!1,closeIcon:b.icons.close})}function Ie(e){const{showDescription:n,description:t,name:o,size:i,orientation:r}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),a=g(e,{type:"INSTANCE",name:"Avatar"}),{chip:l,...s}=a?x(ie(a),"size"):{};return u("UUser",{name:o,description:n&&t||void 0,avatar:Object.keys(s).length>0?s:void 0,chip:x(l,"size","inset"),size:h(i),orientation:h(r)},{size:"md",orientation:"horizontal"})}function St(e){const{props:{orientation:n,...t}}=Ie(e);return t}function Ce(e){const{image:n,authors:t,title:o,showDescription:i,description:r,showDate:a,date:l,showBadge:s,variant:c,orientation:p,author:m}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription","\u{1F441}\uFE0F Date":"showDate","\u{1F441}\uFE0F Badge":"showBadge"}),f=U(e,[{query:"one",type:"FRAME",name:"Date + badge"},{query:"one",type:"INSTANCE",name:"Badge"}]),y=s&&f?H(f,{color:"neutral",variant:"subtle"}):void 0,N=[];if(t){if(m==="One"){const I=U(e,[{query:"child",type:"FRAME",name:"Content"},{query:"child",type:"INSTANCE",name:"User"}]);I&&N.push(St(I))}else if(m==="Multiple"){const I=U(e,[{query:"child",type:"FRAME",name:"Content"},{query:"child",type:"INSTANCE",name:"AvatarGroup"}]);if(I){const F=ae(I);F&&N.push(...F.children.map(q=>{const{props:B}=q;return{avatar:B}}))}}}return u("UBlogPost",{title:o,description:i?r:void 0,date:a?l:void 0,badge:typeof y=="number"?String(y):y,authors:N,image:n?"https://picsum.photos/540/360":void 0,orientation:h(p),variant:h(c)},{orientation:"vertical",variant:"outline"})}function Tt(e){const{props:{orientation:n,...t}}=Ce(e);return t}function At(e){const{orientation:n}=d(e.properties),t=P(e,{type:"INSTANCE",name:"BlogPost"}).map(Tt);return u("UBlogPosts",{orientation:h(n),posts:t},{orientation:"horizontal"})}function Et(e){const n=g(e,{type:"INSTANCE",name:"SelectMenu"}),{props:t={}}=n?be(n):{};return u("UColorModeSelect",x(t,"items","icon"),{})}function zt(e){const n=g(e,{type:"INSTANCE",name:"Switch"}),{props:t={}}=n?Ne(n):{};return u("UColorModeSwitch",Ee(t,"disabled","color","size"),{})}function Mt(e){const{iconLeading:n,iconLeadingName:t,badge:o,label:i,color:r,variant:a,state:l,active:s,highlight:c}=d(e.properties),p=o?g(e,{type:"INSTANCE",name:"Badge"}):void 0,m=p?H(p,{color:"neutral",variant:"outline",size:"sm"}):void 0;return{title:i,path:X(i,"hash"),...T({icon:n?v(t.name):void 0,badge:m,active:s==="True",disabled:l==="Disabled",color:h(r),variant:h(a),highlight:c==="True"},{active:!1,disabled:!1,color:"primary",variant:"pill",highlight:!1})}}function wt(e){const{iconTrailing:n,badge:t,iconLeading:o,label:i,iconLeadingName:r,active:a,highlightColor:l,variant:s}=d(e.properties),c=t?g(e,{type:"INSTANCE",name:"Badge"}):void 0,p=c?H(c,{color:"neutral",variant:"outline",size:"sm"}):void 0,m=e.children[e.children.length-1],f=n?v(m.name):void 0;return{title:i,path:X(i,"hash"),...T({icon:o?v(r.name):void 0,badge:p,active:a==="True",highlightColor:h(l),variant:h(s),trailingIcon:f},{active:!1,highlightColor:"primary",variant:"pill",trailingIcon:b.icons.chevronDown})}}function Ft(e){const n=wt(g(e,{type:"INSTANCE",name:"ContentNavigationItem"})),t=P(e,{type:"INSTANCE",name:"ContentNavigationLink"}).map(Mt),o=z(t,"color"),i=z(t,"variant")||n.variant,r=z(t,"highlight");return{...n,children:t.map(a=>x(a,"color","variant","highlight")),color:o,variant:i,highlight:r}}function Ut(e){const n=C(e,{type:"INSTANCE",name:"ContentNavigationItems"}).map(Ft);return u("UContentNavigation",{navigation:n.map(t=>x(t,"color","variant","highlight","highlightColor","trailingIcon")),color:z(n,"color"),highlightColor:z(n,"highlightColor"),variant:z(n,"variant"),highlight:!!z(n,"highlight"),trailingIcon:z(n,"trailingIcon")},{color:"primary",highlightColor:"primary",variant:"pill",highlight:!1,trailingIcon:b.icons.chevronDown})}function Dt(e){const n=g(e,{type:"INSTANCE",name:"CommandPalette"}),t=n?pe(n).props:{};return u("UContentSearch",{...t},{})}function kt(e){const n=g(e,{type:"INSTANCE",name:S}),t=n?k(n).props:{},{icon:o,label:i,color:r,variant:a,size:l,disabled:s}=t;return u("UContentSearchButton",{icon:o,label:i,color:r,variant:a,size:l,disabled:s},{icon:b.icons.search,color:"neutral",variant:"ghost"})}function Lt(e){const{title:n,description:t}=d(e.properties),o=U(e,[{query:"child",type:"FRAME",name:"Icon"},{query:"child",type:"INSTANCE"}]),i=o?v(o.name):void 0;return{title:n,description:t,path:X(n,"hash"),icon:i}}function Bt(e){const n=C(e,{type:"INSTANCE",name:"ContentSurroundItem"}).map(Lt),{icon:t,...o}=n[0],{icon:i,...r}=n[1];return u("UContentSurround",{prevIcon:t,nextIcon:i,surround:[o,r]},{prevIcon:b.icons.arrowLeft,nextIcon:b.icons.arrowRight})}function Se(e){const{label:n,highlightColor:t}=d(e.properties);return{id:K(n),text:n,depth:3,...T({highlightColor:h(t)},{highlightColor:"primary"})}}function Rt(e){const{color:n}=d(e.properties),t=g(e,{type:"INSTANCE",name:"ContentTocLink"}),{id:o,text:i,highlightColor:r}=t?Se(t):{},a=L(e,[{query:"child",type:"FRAME",name:"ContentTocList"},{query:"children",type:"INSTANCE",name:"ContentTocLink"}]).map(Se),l=z(a,"highlightColor");return{id:o||"label",text:i||"Label",depth:2,children:a.map(s=>x(s,"highlightColor")),...T({color:h(n),highlightColor:l||r},{color:"primary",highlightColor:"primary"})}}function qt(e){const{title:n}=d(e.properties),t=P(e,{type:"INSTANCE",name:"ContentTocItem"}).map(Rt),o=z(t,"color"),i=z(t,"highlightColor");return u("UContentToc",{title:n,links:t.map(r=>x(r,"color","highlightColor")),color:o,highlightColor:i},{title:"On this page",color:"primary",highlightColor:"primary"})}function Pt(e){const{errorMessage:n,statusMessage:t,statusCode:o}=d(e.properties),i=g(e,{type:"INSTANCE",name:S}),r=i?w(i,{size:"lg",color:"primary",variant:"solid",label:"Back to home"}):!1;return u("UError",{error:{statusCode:o,statusMessage:t,message:n},clear:r?Object.keys(r).length>0?r:!0:!1},{clear:!0})}function xt(e){const n=U(e,[{query:"child",type:"FRAME",name:"LeftSlot"},{query:"child",type:"TEXT"}])?.characters,t=L(e,[{query:"child",type:"FRAME",name:"RightSlot"},{query:"children",type:"INSTANCE",name:S}]).map(i=>k(i)),o=U(e,[{query:"child",type:"FRAME",name:"Default"},{query:"child",type:"INSTANCE",name:"NavigationMenu"}]);return u("UFooter",{},{},[...n?[A("left",[n])]:[],...o?[he(o)]:[],...t.length?[A("right",t)]:[]])}function Ot(e){const{label:n,iconLeadingName:t,iconLeading:o,external:i}=d(e.properties);return{label:n,to:X(n,i?"external":"path"),icon:o?v(t.name):void 0,external:i}}function $t(e){const n=d(e.properties),t=C(e,{type:"FRAME",name:/^Column /}).map((i,r)=>{const a=r+1,l=n[`titleSection${a}`],s=L(i,[{query:"child",type:"FRAME",name:"Links"},{query:"children",type:"INSTANCE",name:"FooterColumnsLink"}]).map(Ot);return{label:l,children:s}}),o=[];if(n.newsletter){const i=U(e,[{query:"child",type:"FRAME",name:"Newsletter"},{query:"child",type:"INSTANCE",name:"FormField"}]),r=U(e,[{query:"child",type:"FRAME",name:"Newsletter"},{query:"child",type:"INSTANCE",name:S}]);if(i){const a=me(i);if(r){const l=k(r),s=a.children.find(c=>typeof c!="string"&&c.name==="UInput");s&&s.children.push(A("right",[l]))}}}return u("UFooterColumns",{columns:t},{},o)}const jt={...It,Banner:Ct,BlogPost:Ce,BlogPosts:At,ColorModeSelect:Et,ColorModeSwitch:zt,ContentNavigation:Ut,ContentSearch:Dt,ContentSearchButton:kt,ContentSurround:Bt,ContentToc:qt,Error:Pt,Footer:xt,FooterColumns:$t,User:Ie},Gt=ze(jt),Xt={name:"Nuxt UI Pro",code:{component:{title:"Component",lang:"vue",transformComponent:Gt}}};export{Xt as plugin};
