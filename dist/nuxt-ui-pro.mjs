function Pt(e){return e}function Y(e,n,t){return{name:e,props:n??{},children:t??[]}}function H(e,n){if(n===void 0)return!0;if(typeof e=="string"){if(Array.isArray(n))return n.includes(e);if(n instanceof RegExp)return n.test(e)}return e===n}function _(e,n){return typeof n=="function"?n(e):H(e.type,n.type)&&H(e.name,n.name)&&H(e.visible,n.visible??!0)}function v(e,n){return e.children.find(t=>_(t,n))??null}function I(e,n){return e.children.filter(t=>_(t,n))}function z(e,n){for(const t of e.children){if(_(t,n))return t;if("children"in t){const o=z(t,n);if(o)return o}}return null}function L(e,n){const t=[];for(const o of e.children)_(o,n)&&t.push(o),"children"in o&&t.push(...L(o,n));return t}function R(e,n){if(n.length===0)return[];let t=[e];for(const o of n){const i=new Set,r=[];for(const a of t)if("children"in a)if(i.add(a),o.query==="child"||o.query==="one"){const l=o.query==="child"?v(a,o):z(a,o);l&&!i.has(l)&&(i.add(l),r.push(l))}else{const l=o.query==="children"?I(a,o):L(a,o);for(const s of l)i.has(s)||(i.add(s),r.push(s))}t=r}return t}function q(e,n){return R(e,n)[0]}function Ne(e){return Array.isArray(e)?e.slice():e instanceof Object?{...e}:e}function Ie(e,n){let t={};return Object.keys(e||t).forEach(o=>t[n(e[o],o)]=e[o]),t}function x(e,...n){const t=Ne(e)??{};for(const o of n)delete t[o];return t}function Se(e,...n){const t={};if(e!=null)for(const o of n)t[o]=e[o];return t}function ee(e){return h("UIcon",{name:b(e.name)},{})}function b(e){if(e)return`i-lucide-${e}`}function u(e,n){return Ie(e,(t,o)=>{if(n&&o in n)return n[o]??o;const i=o.replace(/^[^ ]+ /,"").replace(/[ /]+(.)/g,(r,a)=>a.toUpperCase());return i.charAt(0).toLowerCase()+i.slice(1)})}function E(e,n,t){const o=t?n:null,i=t??n;return Y("template",{[`#${e}`]:o??!0},i)}function X(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/(\d)([a-z])/gi,"$1-$2").replace(/([a-z])(\d)/gi,"$1-$2").replace(/[_\s]/g,"-").toLowerCase()}function m(e){return e.toLowerCase()}function A(e,n){const t={};for(const o in e)e[o]!==void 0&&e[o]!==n[o]&&(t[o]=e[o]);return t}const O="Lorem ipsum",$="Lorem ipsum dolor sit amet, consectetur adipiscing elit.";function h(e,n,t,o){return Y(e,A(n,t),o)}function w(e,n){return e.find(t=>t[n]!=null)?.[n]}function W(e,n){return e.reduce((t,o)=>({...t,[o]:n}),{})}function te(e){return e.type==="INSTANCE"&&e.children.length===1&&e.children[0].type==="VECTOR"&&e.children[0].name==="Vector"}function Ce(e){return({component:n})=>{try{if(te(n))return ee(n);const t=e[n.name.replaceAll(" ","")];return t?t(n):""}catch(t){return console.error(t),""}}}function Te(e){return/^\d+$/.test(String(e))}const y={icons:{arrowRight:"i-lucide-arrow-right",arrowLeft:"i-lucide-arrow-left",check:"i-lucide-check",chevronDoubleRight:"i-lucide-chevrons-right",chevronDown:"i-lucide-chevron-down",chevronDoubleLeft:"i-lucide-chevrons-left",chevronRight:"i-lucide-chevron-right",chevronLeft:"i-lucide-chevron-left",close:"i-lucide-x",ellipsis:"i-lucide-ellipsis",minus:"i-lucide-minus",plus:"i-lucide-plus",search:"i-lucide-search"}};function Ae(e){const n=I(e,{type:"INSTANCE",name:"Collapsible_panel"});let t=0;const o=n.map(i=>{const{properties:r}=i,{state:a,label:l,description:s,iconLeading:c,iconLeadingName:p,iconTrailingName:d}=u(r);return a==="Open"&&t++,A({label:l||O,content:s||$,icon:c?b(p.name):void 0,trailingIcon:b(d.name),disabled:a==="Disable"},{disabled:!1,trailingIcon:y.icons.chevronDown})});return h("UAccordion",{items:o,type:t>1?"multiple":"single"},{type:"single"})}function K(e,n={}){const{variant:t,size:o,iconName:i,chipPosition:r}=u(e.properties),a=v(e,{type:"TEXT"})?.characters,l=h("UAvatar",{icon:t==="Icon"?b(i.name):void 0,alt:t==="Alt"?a:void 0,...t==="Image"?F():{},size:o},{size:"md",...n});if(r==="None")return l;const s=m(r);return h("UChip",{inset:!0,position:s},{position:"top-right"},[l])}const ne=["benjamincanac","romhml","smarroufin","atinux","Haythamasalama","hywax","danielroe","sandros94","malik-jouda","connerblanton","antfu","Justineo"];function Ee(e){return{src:`https://github.com/${e}.png`,alt:`@${e}`}}function F(){return Ee(ne[Math.floor(Math.random()*ne.length)])}function oe(e,n={}){const{props:t,children:o}=K(e,n),i=o[0];return i&&typeof i!="string"&&i.name==="UAvatar"?{...i.props,chip:t}:t}const ie={ButtonPrimary:"primary",ButtonSecondary:"secondary",ButtonSuccess:"success",ButtonInfo:"info",ButtonWarning:"warning",ButtonError:"error",ButtonNeutral:"neutral"},C=Object.keys(ie);function k(e,n={}){const{variant:t,size:o,state:i,square:r,slot:a,iconLeading:l,iconLeadingName:s,iconTrailing:c,iconTrailingName:p,avatarLeading:d}=u(e.properties),f=ie[e.name],g=a==="Icon"&&l?b(s.name):void 0,N=c?b(p.name):void 0,S=a==="Avatar"&&d?F():void 0,M=z(e,{type:"TEXT"})?.characters;return h("UButton",{variant:m(t),color:f,size:o,square:r==="True",icon:g,trailingIcon:N,avatar:S,disabled:i==="Disabled"},{color:"primary",variant:"solid",size:"md",square:!1,disabled:!1,...n},M?[M]:[])}function D(e,n={}){const{props:t,children:o}=k(e,n),i=o.map(r=>typeof r=="string"?r:void 0).filter(Boolean).join("");return{...i?{label:i}:{},...t}}function ze(e){const{props:{size:n,...t},children:o}=k(e);return h("UButton",t,{},o)}function Me(e){const{color:n,variant:t,leadingSlot:o,showDescription:i,action:r,title:a,description:l,closeButton:s,icon:c,iconName:p}=u(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),d=v(e,{type:"INSTANCE",name:C}),f=s&&d?D(d,{size:"md",color:"neutral",variant:"link"}):!1,g=f?f.icon:void 0,N=r==="True"?R(e,[{query:"one",type:"FRAME",name:"Actions"},{query:"children",type:"INSTANCE",name:C}]).map(S=>D(S,{size:"xs"})):[];return h("UAlert",{title:a,description:i&&l||void 0,icon:o==="Icon"&&c?b(p.name):void 0,avatar:o==="Avatar"?F():void 0,color:m(n),variant:m(t),close:f,closeIcon:g,actions:N.length>0?N:void 0},{color:"primary",variant:"solid",close:!1,closeIcon:y.icons.close})}function re(e){const{size:n}=u(e.properties),t=I(e,{type:"INSTANCE",name:"Avatar"}).map(r=>K(r));t.forEach(r=>{if("size"in r.props){const{size:a,...l}=r.props;r.props=l}});const o=t.at(-1)?.props,i=!Number.isNaN(Number.parseInt(o?.alt||"",10));return h("UAvatarGroup",{size:n,max:i?t.length-1:void 0},{size:"md"},i?t.slice(0,-1):t)}function J(e,n={}){const{color:t,variant:o,size:i,roundedFull:r,label:a,iconLeading:l,iconLeadingName:s,iconTrailing:c,iconTrailingName:p}=u(e.properties),d=l&&c?{leadingIcon:b(s.name),trailingIcon:b(p.name)}:{icon:l?b(s.name):c?b(p.name):void 0,trailing:c};return h("UBadge",{class:r==="True"?"rounded-full":void 0,color:m(t),variant:m(o),size:i,...d},{color:"primary",variant:"solid",size:"md",trailing:!1,...n},a?[a]:[])}function V(e,n={}){const{props:t,children:o}=J(e,n),i=o.map(r=>typeof r=="string"?r:void 0).filter(Boolean).join("")||void 0;return Object.keys(t).length===0?String(Number(i))===i?Number(i):i:{label:i,...t}}const we={"\u2318":"meta","\u2303":"ctrl","\u2325":"alt","\u229E":"win","\u21E7":"shift","\u21B5":"enter","\u2326":"delete","\u232B":"backspace","\u238B":"escape","\u21E5":"tab","\u21EA":"capslock","\u2191":"arrowup","\u2192":"arrowright","\u2193":"arrowdown","\u2190":"arrowleft","\u21DE":"pageup","\u21DF":"pagedown","\u2196":"home","\u2198":"end"};function ae(e){const{size:n,variant:t}=u(e.properties),o=v(e,{type:"TEXT"})?.characters;return h("UKbd",{value:o?we[o]||o:void 0,variant:m(t),size:n},{variant:"outline",size:"md"})}function De(e,n={}){const{props:t}=ae(e);return A(t,n)}function Z(e,n={}){const t=R(e,[{query:"child",type:"FRAME",name:"Kbd"},{query:"children",type:"INSTANCE",name:"Kbd"}]).map(o=>De(o,n));if(t.length!==0)return t.every(o=>Object.keys(o).length===1&&o.value)?t.map(o=>o.value):t.length>0?t:void 0}function Fe(e){const{properties:n}=e,{state:t,leadingSlot:o,trailingSlot:i,label:r,iconLeadingName:a,iconTrailingName:l}=u(n);return A({label:r,icon:o==="Icon"?b(a.name):void 0,avatar:o==="Avatar"?F():void 0,kbds:i==="Kbd"?Z(e):void 0,type:i==="Icon"&&l.name==="check"?"checkbox":"link",checked:i==="Icon"&&l.name==="check",disabled:t==="Disabled"},{type:"link",checked:!1,disabled:!1})}const Ue={"Bottom-start":"bottom","Bottom-end":"bottom",Right:"right","Top-start":"top",Left:"left"};function le(e,n={}){const{size:t,variant:o,alignment:i,arrow:r}=u(e.properties),a=A({side:Ue[i]},{side:"bottom"}),l=R(e,[{query:"child",type:"FRAME",name:"DropdownMenu"},{query:"children",type:"FRAME",name:/^Container/}]).map(c=>I(c,{type:"INSTANCE",name:"DropdownMenuItem"}).map(Fe)),s=[];if(o==="Button"){const c=r==="True"?v(e,{type:"FRAME",name:"Button + arrow"}):e,p=c?v(c,{type:"INSTANCE",name:C}):void 0;if(p){const d=k(p);d.props={...d.props,...n.button},s.push(d)}}else if(o==="Avatar"){const c=r==="True"?v(e,{type:"FRAME",name:"Avatar + arrow"}):e,p=c?v(c,{type:"INSTANCE",name:"Avatar"}):void 0;p&&s.push(K(p))}return h("UDropdownMenu",{size:t,items:l,content:a,arrow:r==="True"},{size:"md",arrow:!1},s)}function Be(e){const{leadingSlot:n,divider:t,separatorIconName:o,separatorSlot:i}=u(e.properties),r=I(e,{name:/^Link|^DropdownMenu/}),a=[],l=[];return r.forEach(s=>{const{type:c,name:p}=s;if(c==="FRAME"&&p.startsWith("Link")){const d=q(s,[{query:"child",type:"INSTANCE",name:"Link"},{query:"child",type:"TEXT",name:"Label"}])?.characters||void 0,f=n==="Icon"&&te(s.children[0])?b(s.children[0].name):void 0;a.push({label:d,icon:f})}else if(c==="INSTANCE"&&p==="Link")a.push({label:v(s,{type:"TEXT",name:"Label"})?.characters||void 0});else if(c==="INSTANCE"&&p==="DropdownMenu"){const d=le(s,{button:{icon:void 0,":icon":"item.icon"}});if(!d){a.push({icon:y.icons.ellipsis});return}const{items:f,...g}=d.props;d.props=g,d.props[":items"]="item.children",a.push({icon:y.icons.ellipsis,slot:"dropdown",children:f}),l.push(E("dropdown","{ item }",[d]))}}),t==="Span"&&i&&l.push(E("separator",[i])),h("UBreadcrumb",{items:a,separatorIcon:t==="Icon"?b(o.name):void 0},{separatorIcon:y.icons.chevronRight},l)}const se={InputOutline:"outline",InputSoft:"soft",InputNone:"none",InputGhost:"ghost",InputSubtle:"subtle"},j=Object.keys(se);function G(e,n={}){const t=se[e.name],{color:o,size:i,state:r,leadingSlot:a,trailingSlot:l,placeholder:s,placeholderLabel:c,completed:p,completedLabel:d,iconLeadingName:f,iconTrailingName:g,span:N}=u(e.properties),S=a==="Icon"?b(f.name):void 0,M=l==="Icon"?b(g.name):void 0,P=a==="Avatar"?F():void 0,U=[];return a==="Span"&&N?U.push(E("leading",[N])):l==="Span"&&N&&U.push(E("trailing",[N])),h("UInput",{type:p&&d&&/^\*+$/.test(d)?"password":"text",placeholder:s?c:void 0,color:m(o),variant:t,size:i,icon:S,trailingIcon:M,avatar:P,disabled:r==="Disabled"},{type:"text",color:"primary",variant:"outline",size:"md",disabled:!1,...n},U)}function ke(e){const{variant:n,size:t,orientation:o}=u(e.properties),i=[];if(n==="Buttons"){const r=I(e,{type:"INSTANCE",name:C});i.push(...r.map(a=>ze(a)))}else{const r=q(e,[{query:"child",type:"INSTANCE",name:"Input"},{query:"child",type:"INSTANCE",name:j}]);r&&i.push(G(r));const a=v(e,{type:"INSTANCE",name:C});a&&i.push(k(a))}return h("UButtonGroup",{size:t,orientation:m(o)},{size:"md",orientation:"horizontal"},i)}function Pe(e){const{color:n,variant:t,dateValue:o}=u(e.properties),i=Number(o);return{color:m(n),selected:t==="Data-selected",date:Number.isNaN(i)?0:i}}function Le(e){const{color:n,size:t,numberOfMonths:o,monthControls:i,yearControls:r}=u(e.properties),a=Number(o),l=L(e,{type:"INSTANCE",name:"calendar-item"}).map(p=>Pe(p)),{range:s,multiple:c}=Re(l);return h("UCalendar",{color:m(n),size:t,range:s,multiple:c,numberOfMonths:Number.isNaN(a)?1:a,monthControls:i,yearControls:r},{color:"primary",size:"md",range:!1,multiple:!1,numberOfMonths:1,monthControls:!0,yearControls:!0})}function Re(e){let n=-1;for(let t=0;t<e.length;t++)if(e[t].selected){if(n!==-1&&t-n>1)return{range:!1,multiple:!0};if(t>0&&e[t-1].selected)return{range:!0,multiple:!1};n=t}return{range:!1,multiple:!1}}function qe(e){const n=z(e,{type:"FRAME",name:"Header"}),t=z(e,{type:"FRAME",name:"Body"}),o=z(e,{type:"FRAME",name:"Footer"});return h("UCard",{},{},[...n?[E("header",[O])]:[],...t?[$]:[],...o?[E("footer",[O])]:[]])}function xe(e){const{variant:n,pagination:t,prevNext:o}=u(e.properties);let i={};if(o){const[r,a]=R(e,[{query:"child",type:"FRAME",name:"Carousel + prev/next"},{query:"children",type:"INSTANCE",name:C}]),l={size:"md",color:"neutral",variant:"link"},{icon:s,...c}=r?D(r,{...l,icon:y.icons.arrowLeft}):{},{icon:p,...d}=a?D(a,{...l,icon:y.icons.arrowRight}):{};i={prev:c,next:d,prevIcon:s,nextIcon:p}}return h("UCarousel",{items:[],arrows:o,dots:t,fade:n==="Fade",...i},{arrows:!1,dots:!1,fade:!1})}function Oe(e){const{color:n,size:t,state:o,label:i,description:r,descriptionSlot:a,required:l,icon:s}=u(e.properties);return h("UCheckbox",{label:i,description:r?a:void 0,color:m(n),size:t,icon:b(s.name),disabled:o==="Disabled",required:l},{color:"primary",size:"md",icon:y.icons.check,disabled:!1,required:!1})}function $e(e){const{color:n,size:t,isLabel:o,label:i}=u(e.properties);return h("UChip",{text:o==="True"?i:void 0,color:m(n),size:t},{color:"primary",size:"md"})}function je(e){const{open:n}=u(e.properties),t=v(e,{type:"INSTANCE",name:C});return h("UCollapsible",{open:n},{open:!1},t?[k(t)]:[])}function Ge(e){const{size:n,state:t}=u(e.properties);return h("UColorPicker",{size:n,disabled:t==="Disabled"},{size:"md",disabled:!1})}function _e(e){const{state:n,leadingSlot:t,trailingSlot:o,description:i,label:r,descriptionSlot:a,iconLeadingName:l,iconTrailingName:s}=u(e.properties);return A({label:r,suffix:i&&a||void 0,icon:t==="Icon"?b(l.name):void 0,avatar:t==="Avatar"?F():void 0,kbds:o==="Kbd"?Z(e):void 0,active:o==="Icon"&&s.name==="check",disabled:n==="Disabled"},{active:!1,disabled:!1})}function ce(e){const{open:n}=u(e.properties),t=n==="Default"?e:v(e,{type:"FRAME",name:"CommandPalette"}),o=t?v(t,{type:"INSTANCE",name:j}):void 0,i=o?G(o):void 0,{icon:r,placeholder:a,disabled:l}=i?.props||{},s=t?I(t,{type:"FRAME",name:/^Container/}):[];let c=0;const p=s.map(M=>{const P=v(M,{type:"TEXT",name:"Title"})?.characters,U=I(M,{type:"INSTANCE",name:"CommandPaletteItem"}).map(T=>{const B=_e(T);return B.active&&c++,B});return{id:X(P||""),label:P,items:U}}),d=z(e,{type:"INSTANCE",name:C}),f=d?D(d,{size:"md",color:"neutral",variant:"ghost"}):!1,{icon:g,square:N,...S}=f||{};return h("UCommandPalette",{icon:r,placeholder:a,close:d?Object.keys(S).length>0?S:!0:!1,closeIcon:g,groups:p,multiple:c>1,disabled:l},{icon:y.icons.search,placeholder:"Type a command or search...",close:!1,closeIcon:y.icons.close,multiple:!1,disabled:!1})}function Xe(e){const{direction:n,overlay:t,handle:o,heading:i,title:r,showDescription:a,description:l,buttons:s}=u(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),c=[E("body",[$])];if(s){const p=R(e,[{query:"one",type:"FRAME",name:"Buttons"},{query:"children",type:"INSTANCE",name:C}]);if(p.length>0){const d=p.map(f=>{const g=k(f);return g.props.class="justify-center",g});c.push(E("footer",d))}}return h("UDrawer",{title:i?r:void 0,description:a?l:void 0,overlay:t==="True",handle:o,direction:m(n)},{overlay:!0,handle:!0,direction:"bottom"},c)}function pe(e){const{color:n,variant:t,size:o,orientation:i,state:r,highlight:a,placeholder:l,placeholderText:s}=u(e.properties),[c,p]=I(e,{type:"INSTANCE",name:C}).map(S=>D(S,{variant:"link",square:!0,size:o})),{icon:d,...f}=c||{},{icon:g,...N}=p||{};return h("UInputNumber",{placeholder:l&&s||void 0,color:m(n),variant:m(t),size:o,highlight:a==="True",orientation:m(i),increment:N,incrementIcon:g,decrement:f,decrementIcon:d,disabled:r==="Disabled"},{color:"primary",variant:"outline",size:"md",highlight:!1,orientation:"horizontal",incrementIcon:y.icons.plus,decrementIcon:y.icons.minus,disabled:!1})}function Ke(e){const{color:n,variant:t,state:o,highlight:i,placeholder:r,placeholderText:a,completed:l,completedText:s,mask:c}=u(e.properties,{"\u{1F6A6}State":"state"});return{color:m(n),variant:m(t),highlight:i==="True",disabled:o==="Disabled",placeholder:r&&a||void 0,value:l&&s||void 0,mask:c}}function de(e){const n=I(e,{type:"INSTANCE",name:"PinInputItem"}).map(Ke),t=n.some(p=>p.value&&!/^\d$/.test(p.value))?"text":"number",o=n.find(p=>!!p.placeholder)?.placeholder,i=n.some(p=>p.mask),{size:r}=u(e.properties),{color:a,variant:l,highlight:s,disabled:c}=n[0];return h("UPinInput",{color:a,variant:l,size:r,length:n.length,highlight:s,type:t,disabled:c,placeholder:o,mask:i},{color:"primary",variant:"outline",size:"md",length:5,highlight:!1,type:"text",disabled:!1,mask:!1})}function Ve(e){const{size:n,input:t,error:o,label:i,required:r,hint:a,hintSlot:l,help:s,helpSlot:c,description:p,descriptionSlot:d}=u(e.properties),f=[];if(t==="Input"){const g=z(e,{type:"INSTANCE",name:j});g&&f.push(G(g))}else if(t==="InputNumber"){const g=z(e,{type:"INSTANCE",name:"InputNumber"});g&&f.push(pe(g))}else if(t==="PinInput"){const g=z(e,{type:"INSTANCE",name:"PinInput"});g&&f.push(de(g))}return h("UFormField",{label:i,description:p&&d||void 0,help:o==="False"&&s&&c||void 0,error:o==="True"&&(c||!0),hint:a&&l||void 0,size:n,required:r},{error:!1,size:"md",required:!1},f)}function He(e){const{state:n,leadingSlot:t,label:o,iconName:i}=u(e.properties);return A({label:o,icon:t==="Icon"?b(i.name):void 0,avatar:t==="Avatar"?F():void 0,chip:t==="Dot"?{color:"primary"}:void 0,disabled:n==="Disabled",selected:n==="Selected"},{disabled:!1,selected:!1})}function We(e){const{size:n}=u(e.properties),t=v(e,{type:"FRAME",name:"InputMenu"}),o=t?I(t,l=>l.type==="TEXT"&&l.name==="Title"||l.type==="INSTANCE"&&l.name==="InputMenuItem"&&l.visible===!0).map(l=>l.type==="TEXT"?{label:l.characters,type:"label"}:He(l)):[],i=[],r=v(e,{type:"INSTANCE",name:j}),a=r?G(r).props:{};return h("UInputMenu",{size:n,items:o,...a},{size:"md"},i)}function Je(e){const{color:n,state:t,label:o}=u(e.properties);return h("ULink",{active:m(n)==="primary",disabled:t==="Disabled"},{active:!1,disabled:!1},[o])}function Ze(e){const{header:n,body:t,footer:o}=u(e.properties);return h("UModal",{},{},[...n?[E("header",[O])]:[],...t?[E("body",[$])]:[],...o?[E("footer",[O])]:[]])}function Qe(e){const{icon:n,iconName:t,title:o,description:i,descriptionSlot:r}=u(e.properties);return{label:o,description:i&&r||void 0,icon:n?b(t.name):void 0}}function Ye(e){const{color:n,variant:t,state:o,active:i,highlight:r,iconLeading:a,iconLeadingName:l,iconTrailing:s,badge:c,label:p}=u(e.properties),d=c?q(e,[{query:"child",type:"FRAME",name:"Container"},{query:"child",type:"INSTANCE",name:"Badge"}]):void 0,f=d?V(d,{size:"sm",color:"neutral",variant:"outline"}):void 0,g=s?L(e,{type:"INSTANCE",name:"NavigationMenu(DropdownItem)"}).map(Qe):void 0;return A({label:p,icon:a?b(l.name):void 0,badge:f,children:g,active:i==="True",disabled:o==="Disabled",variant:m(t),color:m(n),highlight:r==="True"},{active:!1,disabled:!1,variant:"pill",color:"primary",highlight:!1})}function et(e){const{orientation:n,highlight:t}=u(e.properties),o=I(e,{type:"INSTANCE",name:"NavigationMenuItem"}).map(Ye);return h("UNavigationMenu",{items:o.map(i=>x(i,"variant","color","highlight")),color:w(o,"color"),variant:w(o,"variant"),orientation:m(n),highlight:t==="True"||!!w(o,"highlight")},{color:"primary",variant:"pill",orientation:"horizontal",highlight:!1})}function ue(e){if(!e)return[void 0,void 0];const[n,t]=e.split("-");return[n==="undefined"?void 0:n,t==="undefined"?void 0:t]}function tt(e){const{size:n}=u(e.properties),t=I(e,{type:"INSTANCE",name:C}).map(T=>D(T));let o=[];t.length>=5&&(o=[...t],o.splice(2,t.length-4),o=o.every(T=>!Te(T.label||""))?o:[]);const i=o.length===4,[r,a,l,s]=o,c=i?t.splice(2,t.length-4):t,p=c.find(({icon:T,label:B})=>T&&!/^\d+$/.test(B||"")),d=c.reduce((T,B)=>{const Q=`${B.color}-${B.variant}`;return T[Q]=(T[Q]||0)+1,T},{}),f=Object.entries(d).sort(([,T],[,B])=>B-T),[g,N]=f.map(([T])=>T),[S,M]=ue(g),[P,U]=ue(N);return h("UPagination",{color:S,variant:M,activeColor:P,activeVariant:U,size:n,showControls:i,disabled:c.every(T=>T.disabled),firstIcon:r?.icon,prevIcon:a?.icon,nextIcon:l?.icon,lastIcon:s?.icon,ellipsisIcon:p?.icon},{color:"neutral",variant:"outline",activeColor:"primary",activeVariant:"solid",size:"md",showControls:!0,disabled:!1,firstIcon:y.icons.chevronDoubleLeft,prevIcon:y.icons.chevronLeft,nextIcon:y.icons.chevronRight,lastIcon:y.icons.chevronDoubleRight,ellipsisIcon:y.icons.ellipsis})}function nt(e){const{position:n,arrow:t}=u(e.properties),o=A({side:m(n)},{side:"bottom"}),i=[E("content",[$])],r=v(e,{type:"INSTANCE",name:C});return r&&i.unshift(k(r)),h("UPopover",{content:o,arrow:t==="True"},{arrow:!1},i)}function ot(e){const{color:n,size:t,orientation:o,value:i,indicator:r}=u(e.properties);return h("UProgress",{modelValue:Number.parseInt(i,10),status:r,size:t,color:m(n),orientation:m(o)},{status:!1,size:"md",color:"primary",orientation:"horizontal"})}function it(e){const{color:n,state:t,label:o,description:i,descriptionSlot:r}=u(e.properties);return A({label:o,description:i&&r||void 0,disabled:t==="Disabled",color:m(n)},{color:"primary",disabled:!1})}function rt(e){const{size:n,align:t,legend:o,required:i}=u(e.properties),r=L(e,{type:"INSTANCE",name:"Radio"}).map(it),a=w(r,"color"),l=r.every(s=>s.disabled);return l&&r.forEach(s=>{delete s.disabled}),h("URadioGroup",{legend:o,items:r,size:n,color:a,orientation:m(t),disabled:l,required:i},{size:"md",color:"primary",orientation:"horizontal",disabled:!1,required:!1})}const me={SelectOutline:"outline",SelectSoft:"soft",SelectNone:"none",SelectGhost:"ghost",SelectSubtle:"subtle"},he=Object.keys(me);function fe(e,n={}){const t=me[e.name],{color:o,size:i,state:r,leadingSlot:a,placeholder:l,placeholderLabel:s,iconLeadingName:c,iconTrailingName:p}=u(e.properties),d=a==="Icon"?b(c.name):void 0,f=b(p.name),g=a==="Avatar"?F():void 0;return h("USelect",{placeholder:l?s:void 0,color:m(o),variant:t,size:i,icon:d,trailingIcon:f,avatar:g,disabled:r==="Disabled"},{color:"primary",variant:"outline",size:"md",trailingIcon:y.icons.chevronDown,disabled:!1,...n})}function at(e){const{properties:n}=e,{state:t,leadingSlot:o,label:i,iconName:r}=u(n);return A({label:i,icon:o==="Icon"?b(r.name):void 0,avatar:o==="Avatar"?F():void 0,disabled:t==="Disabled",selected:t==="Selected"},{disabled:!1})}function ve(e){const n=v(e,{type:"FRAME",name:"SelectMenu"}),t=n?v(n,{type:"FRAME",name:"Container"}):void 0,o=t?I(t,c=>c.type==="FRAME"&&c.name==="Title"&&c.visible===!0||c.type==="INSTANCE"&&c.name==="SelectMenuItem"&&c.visible===!0).map(c=>c.type==="FRAME"?{label:v(c,{type:"TEXT"})?.characters,type:"label"}:at(c)):[],i=v(e,{type:"INSTANCE",name:he}),r=n?q(n,[{query:"child",type:"INSTANCE",name:"Input"},{query:"child",type:"INSTANCE",name:j}]):void 0,{content:a,...l}=i?fe(i).props:{},s=r?G(r,{placeholder:"Search...",variant:"none"}).props:{};return h("USelectMenu",{...l,items:o,searchInput:s},{})}function lt(e){const{color:n,size:t,orientation:o,separator:i,slot:r,iconName:a,span:l}=u(e.properties),s=r==="Avatar"?v(e,{type:"INSTANCE",name:"Avatar"}):void 0,{chip:c,...p}=s?oe(s):{};return h("USeparator",{label:r==="Span"&&l||void 0,icon:r==="Icon"&&b(a.name)||void 0,avatar:Object.keys(p).length>0?p:void 0,color:m(n),size:t,type:m(i),orientation:m(o)},{color:"neutral",size:"xs",type:"solid",orientation:"horizontal"})}function st(e){return h("USkeleton",{},{})}function ct(e){const{variant:n,overlay:t}=u(e.properties),o=z(e,{type:"FRAME",name:"Header"}),i=z(e,{type:"FRAME",name:"Body"}),r=z(e,{type:"FRAME",name:"Footer"}),a=z(e,{type:"FRAME",name:"Title and description"}),l=o?v(o,{type:"INSTANCE",name:C}):void 0,s=l?D(l,{size:"md",color:"neutral",variant:"ghost"}):!1,{icon:c,square:p,...d}=s||{},[f,g]=a?I(a,{type:"TEXT"}):[],N=[];return i&&N.push(E("body",[$])),r&&N.push(E("footer",[O])),h("USlideover",{title:f?.characters,description:g?.characters,overlay:t==="True",side:m(n),close:s?Object.keys(d).length>0?d:!0:!1,closeIcon:c},{overlay:!0,side:"right",close:!0,closeIcon:y.icons.close},N)}function pt(e){const{color:n,size:t,orientation:o,state:i,indicatorPosition:r,indicator2:a}=u(e.properties),l=Number(r);return h("USlider",{modelValue:a?[0,l]:l,color:m(n),size:t,orientation:m(o),disabled:i==="Disabled"},{color:"primary",size:"md",orientation:"horizontal",disabled:!1})}function dt(e){const{properties:n}=e,{variant:t,state:o,iconName:i}=u(n,{"\u{1F6A6}State":"state"});return A({icon:t==="Icon"?b(i.name):void 0,disabled:o==="Disabled"},{disabled:!1})}function ut(e){const{color:n,size:t,step:o,orientation:i}=u(e.properties),r=I(e,{type:"FRAME",name:/^Step/}).map(a=>{const l=v(a,{type:"INSTANCE",name:"Stepper_Item"}),s=v(a,{type:"FRAME",name:"Title + description"}),[c,p]=s?I(s,{type:"TEXT"}):[];return l?{title:c?.characters,description:p?.characters,...dt(l)}:void 0}).filter(a=>a!=null);return h("UStepper",{modelValue:Number(o)-1,items:r,color:m(n),size:t,orientation:m(i)},{color:"primary",size:"md",orientation:"horizontal"})}function ge(e){const{color:n,size:t,state:o,title:i,showDescription:r,description:a,defaultIcon:l,defaultIconName:s,activeIcon:c,activeIconName:p,required:d}=u(e.properties,{"\u21B3 Description":"showDescription"});return h("USwitch",{label:i,description:r&&a||void 0,color:m(n),size:t,checkedIcon:l?b(p.name):void 0,uncheckedIcon:c?b(s.name):void 0,disabled:o==="Disabled",required:d},{color:"primary",size:"md",disabled:!1,required:!1})}function mt(e){const{state:n,leadingSlot:t,avatar:o,icon:i,iconName:r,label:a}=u(e.properties);return A({label:a,icon:t==="Icon"&&i?b(r.name):void 0,avatar:t==="Avatar"&&o?F():void 0,disabled:n==="Disabled"},{disabled:!1})}function ht(e){const{color:n,size:t,variant:o,align:i}=u(e.properties),r=[],a=[];return I(e,{type:"INSTANCE",name:"Tab"}).forEach(l=>{const s=mt(l),c=v(l,{type:"INSTANCE",name:"Badge"}),p=c?J(c):void 0;if(p){const d=X(s.label||"");s.slot=d,r.push(E(d,[p]))}a.push(s)}),h("UTabs",{items:a,color:m(n),variant:m(o),size:t,orientation:m(i)},{color:"primary",variant:"pill",size:"md",orientation:"horizontal"},r)}function ft(e){const{color:n,size:t,variant:o,state:i,placeholder:r,placeholderSlot:a}=u(e.properties);return h("UTextarea",{placeholder:r?a:void 0,color:m(n),variant:m(o),size:t,disabled:i==="Disabled"},{color:"primary",variant:"outline",size:"md",disabled:!1})}function vt(e){const{color:n,leadingSlot:t,description:o,title:i,showDescription:r,leadingIconName:a}=u(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),l=v(e,{type:"FRAME",name:"Content"}),s=v(l||e,{type:"INSTANCE",name:C}),c=s?D(s,{size:"md",color:"neutral",variant:"link"}):!1,p=c?c.icon:void 0,d=R(e,[{query:"one",type:"FRAME",name:"Actions"},{query:"children",type:"INSTANCE",name:C}]).map(f=>D(f,{size:"xs"}));return h("UToast",{title:i,description:r&&o||void 0,icon:t==="Icon"?b(a.name):void 0,avatar:t==="Avatar"?F():void 0,color:m(n),close:c,closeIcon:p,actions:d.length>0?d:void 0},{color:"primary",close:!0,closeIcon:y.icons.close})}const gt={top:"bottom",right:"left",bottom:"top",left:"right",none:"bottom"};function bt(e){const{properties:n}=e,{arrowPlacement:t,label:o}=u(n),i=A({side:gt[m(t)]},{side:"bottom"}),r=Z(e,{size:"sm"});return h("UTooltip",{text:o,content:i,arrow:t!=="None",kbds:r},{arrow:!1})}const yt={Accordion:Ae,Alert:Me,Avatar:K,AvatarGroup:re,Badge:J,Breadcrumb:Be,...W(C,k),ButtonGroup:ke,Calendar:Le,Card:qe,Carousel:xe,Checkbox:Oe,Chip:$e,Collapsible:je,ColorPicker:Ge,CommandPalette:ce,Drawer:Xe,DropdownMenu:le,FormField:Ve,Icon:ee,...W(j,G),InputMenu:We,InputNumber:pe,Kbd:ae,Link:Je,Modal:Ze,NavigationMenu:et,Pagination:tt,PinInput:de,Popover:nt,Progress:ot,RadioGroup:rt,...W(he,fe),SelectMenu:ve,Separator:lt,Skeleton:st,Slideover:ct,Slider:pt,Stepper:ut,Switch:ge,Tabs:ht,TextArea:ft,Toast:vt,Tooltip:bt};function Nt(e){const{iconLeading:n,iconLeadingName:t,close:o,title:i,color:r}=u(e.properties),a=I(e,{type:"INSTANCE",name:C}),l=(o?a.slice(0,-1):a).map(p=>D(p,{color:"neutral",size:"xs"})),{icon:s,...c}=o?D(a.at(-1),{size:"md",color:"neutral",variant:"ghost"}):{};return h("UBanner",{color:m(r),icon:n?b(t.name):void 0,title:i,actions:l.length>0?l:void 0,close:o&&Object.keys(c).length>0?c:o,closeIcon:s},{color:"primary",close:!1,closeIcon:y.icons.close})}function be(e){const{showDescription:n,description:t,name:o,size:i,orientation:r}=u(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),a=v(e,{type:"INSTANCE",name:"Avatar"}),{chip:l,...s}=a?x(oe(a),"size"):{};return h("UUser",{name:o,description:n&&t||void 0,avatar:Object.keys(s).length>0?s:void 0,chip:x(l,"size","inset"),size:m(i),orientation:m(r)},{size:"md",orientation:"horizontal"})}function It(e){const{props:{orientation:n,...t}}=be(e);return t}function ye(e){const{image:n,authors:t,title:o,showDescription:i,description:r,showDate:a,date:l,showBadge:s,variant:c,orientation:p,author:d}=u(e.properties,{"\u{1F441}\uFE0F Description":"showDescription","\u{1F441}\uFE0F Date":"showDate","\u{1F441}\uFE0F Badge":"showBadge"}),f=q(e,[{query:"one",type:"FRAME",name:"Date + badge"},{query:"one",type:"INSTANCE",name:"Badge"}]),g=s&&f?V(f,{color:"neutral",variant:"subtle"}):void 0,N=[];if(t){if(d==="One"){const S=q(e,[{query:"child",type:"FRAME",name:"Content"},{query:"child",type:"INSTANCE",name:"User"}]);S&&N.push(It(S))}else if(d==="Multiple"){const S=q(e,[{query:"child",type:"FRAME",name:"Content"},{query:"child",type:"INSTANCE",name:"AvatarGroup"}]);if(S){const M=re(S);M&&N.push(...M.children.map(P=>{const{props:U}=P;return{avatar:U}}))}}}return h("UBlogPost",{title:o,description:i?r:void 0,date:a?l:void 0,badge:typeof g=="number"?String(g):g,authors:N,image:n?"https://picsum.photos/540/360":void 0,orientation:m(p),variant:m(c)},{orientation:"vertical",variant:"outline"})}function St(e){const{props:{orientation:n,...t}}=ye(e);return t}function Ct(e){const{orientation:n}=u(e.properties),t=L(e,{type:"INSTANCE",name:"BlogPost"}).map(St);return h("UBlogPosts",{orientation:m(n),posts:t},{orientation:"horizontal"})}function Tt(e){const n=v(e,{type:"INSTANCE",name:"SelectMenu"}),{props:t={}}=n?ve(n):{};return h("UColorModeSelect",x(t,"items","icon"),{})}function At(e){const n=v(e,{type:"INSTANCE",name:"Switch"}),{props:t={}}=n?ge(n):{};return h("UColorModeSwitch",Se(t,"disabled","color","size"),{})}function Et(e){const{iconLeading:n,iconLeadingName:t,badge:o,label:i,color:r,variant:a,state:l,active:s,highlight:c}=u(e.properties),p=o?v(e,{type:"INSTANCE",name:"Badge"}):void 0,d=p?V(p,{color:"neutral",variant:"outline",size:"sm"}):void 0;return{title:i,path:`#${X(i)}`,...A({icon:n?b(t.name):void 0,badge:d,active:s==="True",disabled:l==="Disabled",color:m(r),variant:m(a),highlight:c==="True"},{active:!1,disabled:!1,color:"primary",variant:"pill",highlight:!1})}}function zt(e){const{iconTrailing:n,badge:t,iconLeading:o,label:i,iconLeadingName:r,active:a,highlightColor:l,variant:s}=u(e.properties,{"\u{1F6A6}State":"state"}),c=t?v(e,{type:"INSTANCE",name:"Badge"}):void 0,p=c?V(c,{color:"neutral",variant:"outline",size:"sm"}):void 0,d=e.children[e.children.length-1],f=n?b(d.name):void 0;return{title:i,path:`#${X(i)}`,...A({icon:o?b(r.name):void 0,badge:p,active:a==="True",highlightColor:m(l),variant:m(s),trailingIcon:f},{active:!1,highlightColor:"primary",variant:"pill",trailingIcon:y.icons.chevronDown})}}function Mt(e){const n=zt(v(e,{type:"INSTANCE",name:"ContentNavigationItem"})),t=L(e,{type:"INSTANCE",name:"ContentNavigationLink"}).map(Et),o=w(t,"color"),i=w(t,"variant")||n.variant,r=w(t,"highlight");return{...n,children:t.map(a=>x(a,"color","variant","highlight")),color:o,variant:i,highlight:r}}function wt(e){const n=I(e,{type:"INSTANCE",name:"ContentNavigationItems"}).map(Mt);return h("UContentNavigation",{navigation:n.map(t=>x(t,"color","variant","highlight","highlightColor","trailingIcon")),color:w(n,"color"),highlightColor:w(n,"highlightColor"),variant:w(n,"variant"),highlight:!!w(n,"highlight"),trailingIcon:w(n,"trailingIcon")},{color:"primary",highlightColor:"primary",variant:"pill",highlight:!1,trailingIcon:y.icons.chevronDown})}function Dt(e){const n=v(e,{type:"INSTANCE",name:"CommandPalette"}),t=n?ce(n).props:{};return h("UContentSearch",{...t},{})}function Ft(e){const n=v(e,{type:"INSTANCE",name:C}),t=n?k(n).props:{},{icon:o,label:i,color:r,variant:a,size:l,disabled:s}=t;return h("UContentSearchButton",{icon:o,label:i,color:r,variant:a,size:l,disabled:s},{icon:y.icons.search,color:"neutral",variant:"ghost"})}const Ut={...yt,Banner:Nt,BlogPost:ye,BlogPosts:Ct,ColorModeSelect:Tt,ColorModeSwitch:At,ContentNavigation:wt,ContentSearch:Dt,ContentSearchButton:Ft,User:be},Bt=Ce(Ut),kt={name:"Nuxt UI Pro",code:{component:{title:"Component",lang:"vue",transformComponent:Bt}}};export{kt as plugin};
