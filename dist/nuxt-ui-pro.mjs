function Jt(e){return e}function W(e,n,t){return{name:e,props:n??{},children:t??[]}}function Z(e,n){if(n===void 0)return!0;if(typeof e=="string"){if(Array.isArray(n))return n.includes(e);if(n instanceof RegExp)return n.test(e)}return e===n}function _(e,n){return typeof n=="function"?n(e):Z(e.type,n.type)&&Z(e.name,n.name)&&Z(e.visible,n.visible??!0)}function g(e,n){return e.children.find(t=>_(t,n))??null}function b(e,n){return e.children.filter(t=>_(t,n))}function w(e,n){for(const t of e.children){if(_(t,n))return t;if("children"in t){const o=w(t,n);if(o)return o}}return null}function x(e,n){const t=[];for(const o of e.children)_(o,n)&&t.push(o),"children"in o&&t.push(...x(o,n));return t}function U(e,n){if(n.length===0)return[];let t=[e];for(const o of n){const i=new Set,r=[];for(const a of t)if("children"in a)if(i.add(a),o.query==="child"||o.query==="one"){const l=o.query==="child"?g(a,o):w(a,o);l&&!i.has(l)&&(i.add(l),r.push(l))}else{const l=o.query==="children"?b(a,o):x(a,o);for(const c of l)i.has(c)||(i.add(c),r.push(c))}t=r}return t}function k(e,n){return U(e,n)[0]}function ke(e){return Array.isArray(e)?e.slice():e instanceof Object?{...e}:e}function Le(e,n){let t={};return Object.keys(e||t).forEach(o=>t[n(e[o],o)]=e[o]),t}function P(e,...n){const t=ke(e)??{};for(const o of n)delete t[o];return t}function ie(e,...n){const t={};if(e!=null)for(const o of n)t[o]=e[o];return t}function re(e){return u("UIcon",{name:v(e.name)},{})}function v(e){if(e){if(e.includes("/")){const[n,t]=e.split("/");return`i-${n}-${t}`}return`i-lucide-${e}`}}function d(e,n){return Le(e,(t,o)=>{if(n&&o in n)return n[o]??o;const i=o.trim().replace(/^[^0-9A-Z]+/i,"").replace(/[ /]+(.)/g,(r,a)=>a.toUpperCase());return i.charAt(0).toLowerCase()+i.slice(1)})}function S(e,n,t){const o=t?n:null,i=t??n;return W("template",{[`#${e}`]:o??!0},i)}function K(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/(\d)([a-z])/gi,"$1-$2").replace(/([a-z])(\d)/gi,"$1-$2").replace(/[_\s]/g,"-").toLowerCase()}function h(e){return e.toLowerCase()}function T(e,n){const t={};for(const o in e)e[o]!==void 0&&e[o]!==n[o]&&(t[o]=e[o]);return t}const O="Lorem ipsum",$="Lorem ipsum dolor sit amet, consectetur adipiscing elit.";function u(e,n,t,o){return W(e,T(n,t),o)}function E(e,n){return e.find(t=>t[n]!=null)?.[n]}function J(e,n){return e.reduce((t,o)=>({...t,[o]:n}),{})}function ae(e){return e.type==="INSTANCE"&&e.children.length===1&&e.children[0].type==="VECTOR"&&e.children[0].name==="Vector"}function De(e){return({component:n})=>{try{if(ae(n))return re(n);const t=e[n.name.replaceAll(" ","")];return t?t(n):""}catch(t){return console.error(t),""}}}function Pe(e){return/^\d+$/.test(String(e))}const N={icons:{arrowRight:"i-lucide-arrow-right",arrowLeft:"i-lucide-arrow-left",check:"i-lucide-check",chevronDoubleRight:"i-lucide-chevrons-right",chevronDown:"i-lucide-chevron-down",chevronDoubleLeft:"i-lucide-chevrons-left",chevronRight:"i-lucide-chevron-right",chevronLeft:"i-lucide-chevron-left",close:"i-lucide-x",ellipsis:"i-lucide-ellipsis",minus:"i-lucide-minus",plus:"i-lucide-plus",search:"i-lucide-search"}};function le(e){const n=b(e,{type:"INSTANCE",name:["Collapsible_panel","PageAccordionItem"]});let t=0;const o=n.map(i=>{const{state:r,label:a,description:l,iconLeading:c,iconLeadingName:s,iconTrailingName:p}=d(i.properties);return r==="Open"&&t++,T({label:a||O,content:l||$,icon:c?v(s.name):void 0,trailingIcon:v(p.name),disabled:r==="Disable"},{disabled:!1,trailingIcon:N.icons.chevronDown})});return u("UAccordion",{items:o,type:t>1?"multiple":"single"},{type:"single"})}function H(e,n={}){const{variant:t,size:o,iconName:i,chipPosition:r}=d(e.properties),a=g(e,{type:"TEXT"})?.characters,l=u("UAvatar",{icon:t==="Icon"?v(i.name):void 0,alt:t==="Alt"?a:void 0,...t==="Image"?D():{},size:o},{size:"md",...n});if(r==="None")return l;const c=h(r);return u("UChip",{inset:!0,position:c},{position:"top-right"},[l])}const ce=["benjamincanac","romhml","smarroufin","atinux","Haythamasalama","hywax","danielroe","sandros94","malik-jouda","connerblanton","antfu","Justineo"];function qe(e){return{src:`https://github.com/${e}.png`,alt:`@${e}`}}function D(){return qe(ce[Math.floor(Math.random()*ce.length)])}function se(e,n={}){const{props:t,children:o}=H(e,n),i=o[0];return i&&typeof i!="string"&&i.name==="UAvatar"?{...i.props,chip:t}:t}const pe={ButtonPrimary:"primary",ButtonSecondary:"secondary",ButtonSuccess:"success",ButtonInfo:"info",ButtonWarning:"warning",ButtonError:"error",ButtonNeutral:"neutral"},C=Object.keys(pe);function L(e,n={}){const{variant:t,size:o,state:i,square:r,slot:a,iconLeading:l,iconLeadingName:c,iconTrailing:s,iconTrailingName:p,avatarLeading:m}=d(e.properties),f=pe[e.name],y=a==="Icon"&&l?v(c.name):void 0,I=s?v(p.name):void 0,A=a==="Avatar"&&m?D():void 0,M=w(e,{type:"TEXT"})?.characters;return u("UButton",{variant:h(t),color:f,size:o,square:r==="True",icon:y,trailingIcon:I,avatar:A,disabled:i==="Disabled"},{color:"primary",variant:"solid",size:"md",square:!1,disabled:!1,...n},M?[M]:[])}function F(e,n={}){const{props:t,children:o}=L(e),i=o.map(r=>typeof r=="string"?r:void 0).filter(Boolean).join("");return T({...i?{label:i}:{},...t},n)}function Be(e){const{props:{size:n,...t},children:o}=L(e);return u("UButton",t,{},o)}function Re(e){const{color:n,variant:t,leadingSlot:o,showDescription:i,action:r,title:a,description:l,closeButton:c,icon:s,iconName:p}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),m=g(e,{type:"INSTANCE",name:C}),f=c&&m?F(m,{size:"md",color:"neutral",variant:"link"}):!1,y=f?f.icon:void 0,I=r==="True"?U(e,[{query:"one",type:"FRAME",name:"Actions"},{query:"children",type:"INSTANCE",name:C}]).map(A=>F(A,{size:"xs"})):[];return u("UAlert",{title:a,description:i&&l||void 0,icon:o==="Icon"&&s?v(p.name):void 0,avatar:o==="Avatar"?D():void 0,color:h(n),variant:h(t),close:f,closeIcon:y,actions:I.length>0?I:void 0},{color:"primary",variant:"solid",close:!1,closeIcon:N.icons.close})}function de(e){const{size:n}=d(e.properties),t=b(e,{type:"INSTANCE",name:"Avatar"}).map(r=>H(r));t.forEach(r=>{if("size"in r.props){const{size:a,...l}=r.props;r.props=l}});const o=t.at(-1)?.props,i=!Number.isNaN(Number.parseInt(o?.alt||"",10));return u("UAvatarGroup",{size:n,max:i?t.length-1:void 0},{size:"md"},i?t.slice(0,-1):t)}function Q(e,n={}){const{color:t,variant:o,size:i,roundedFull:r,label:a,iconLeading:l,iconLeadingName:c,iconTrailing:s,iconTrailingName:p}=d(e.properties),m=l&&s?{leadingIcon:v(c.name),trailingIcon:v(p.name)}:{icon:l?v(c.name):s?v(p.name):void 0,trailing:s};return u("UBadge",{class:r==="True"?"rounded-full":void 0,color:h(t),variant:h(o),size:i,...m},{color:"primary",variant:"solid",size:"md",trailing:!1,...n},a?[a]:[])}function V(e,n={}){const{props:t,children:o}=Q(e,n),i=o.map(r=>typeof r=="string"?r:void 0).filter(Boolean).join("")||void 0;return Object.keys(t).length===0?String(Number(i))===i?Number(i):i:{label:i,...t}}const xe={"\u2318":"meta","\u2303":"ctrl","\u2325":"alt","\u229E":"win","\u21E7":"shift","\u21B5":"enter","\u2326":"delete","\u232B":"backspace","\u238B":"escape","\u21E5":"tab","\u21EA":"capslock","\u2191":"arrowup","\u2192":"arrowright","\u2193":"arrowdown","\u2190":"arrowleft","\u21DE":"pageup","\u21DF":"pagedown","\u2196":"home","\u2198":"end"};function ue(e){const{size:n,variant:t}=d(e.properties),o=g(e,{type:"TEXT"})?.characters;return u("UKbd",{value:o?xe[o]||o:void 0,variant:h(t),size:n},{variant:"outline",size:"md"})}function Oe(e,n={}){const{props:t}=ue(e);return T(t,n)}function Y(e,n={}){const t=U(e,[{query:"child",type:"FRAME",name:"Kbd"},{query:"children",type:"INSTANCE",name:"Kbd"}]).map(o=>Oe(o,n));if(t.length!==0)return t.every(o=>Object.keys(o).length===1&&o.value)?t.map(o=>o.value):t.length>0?t:void 0}function $e(e){const{properties:n}=e,{state:t,leadingSlot:o,trailingSlot:i,label:r,iconLeadingName:a,iconTrailingName:l}=d(n);return T({label:r,icon:o==="Icon"?v(a.name):void 0,avatar:o==="Avatar"?D():void 0,kbds:i==="Kbd"?Y(e):void 0,type:i==="Icon"&&l.name==="check"?"checkbox":"link",checked:i==="Icon"&&l.name==="check",disabled:t==="Disabled"},{type:"link",checked:!1,disabled:!1})}const je={"Bottom-start":"bottom","Bottom-end":"bottom",Right:"right","Top-start":"top",Left:"left"};function me(e,n={}){const{size:t,variant:o,alignment:i,arrow:r}=d(e.properties),a=T({side:je[i]},{side:"bottom"}),l=U(e,[{query:"child",type:"FRAME",name:"DropdownMenu"},{query:"children",type:"FRAME",name:/^Container/}]).map(s=>b(s,{type:"INSTANCE",name:"DropdownMenuItem"}).map($e)),c=[];if(o==="Button"){const s=r==="True"?g(e,{type:"FRAME",name:"Button + arrow"}):e,p=s?g(s,{type:"INSTANCE",name:C}):void 0;if(p){const m=L(p);m.props={...m.props,...n.button},c.push(m)}}else if(o==="Avatar"){const s=r==="True"?g(e,{type:"FRAME",name:"Avatar + arrow"}):e,p=s?g(s,{type:"INSTANCE",name:"Avatar"}):void 0;p&&c.push(H(p))}return u("UDropdownMenu",{size:t,items:l,content:a,arrow:r==="True"},{size:"md",arrow:!1},c)}function Ge(e){const{leadingSlot:n,divider:t,separatorIconName:o,separatorSlot:i}=d(e.properties),r=b(e,{name:/^Link|^DropdownMenu/}),a=[],l=[];return r.forEach(c=>{const{type:s,name:p}=c;if(s==="FRAME"&&p.startsWith("Link")){const m=k(c,[{query:"child",type:"INSTANCE",name:"Link"},{query:"child",type:"TEXT",name:"Label"}])?.characters||void 0,f=n==="Icon"&&ae(c.children[0])?v(c.children[0].name):void 0;a.push({label:m,icon:f})}else if(s==="INSTANCE"&&p==="Link")a.push({label:g(c,{type:"TEXT",name:"Label"})?.characters||void 0});else if(s==="INSTANCE"&&p==="DropdownMenu"){const m=me(c,{button:{icon:void 0,":icon":"item.icon"}});if(!m){a.push({icon:N.icons.ellipsis});return}const{items:f,...y}=m.props;m.props=y,m.props[":items"]="item.children",a.push({icon:N.icons.ellipsis,slot:"dropdown",children:f}),l.push(S("dropdown","{ item }",[m]))}}),t==="Span"&&i&&l.push(S("separator",[i])),u("UBreadcrumb",{items:a,separatorIcon:t==="Icon"?v(o.name):void 0},{separatorIcon:N.icons.chevronRight},l)}const he={InputOutline:"outline",InputSoft:"soft",InputNone:"none",InputGhost:"ghost",InputSubtle:"subtle"},j=Object.keys(he);function G(e,n={}){const t=he[e.name],{color:o,size:i,state:r,leadingSlot:a,trailingSlot:l,placeholder:c,placeholderLabel:s,completed:p,completedLabel:m,iconLeadingName:f,iconTrailingName:y,span:I}=d(e.properties),A=a==="Icon"?v(f.name):void 0,M=l==="Icon"?v(y.name):void 0,R=a==="Avatar"?D():void 0,q=[];return a==="Span"&&I?q.push(S("leading",[I])):l==="Span"&&I&&q.push(S("trailing",[I])),u("UInput",{type:p&&m&&/^\*+$/.test(m)?"password":"text",placeholder:c?s:void 0,color:h(o),variant:t,size:i,icon:A,trailingIcon:M,avatar:R,disabled:r==="Disabled"},{type:"text",color:"primary",variant:"outline",size:"md",disabled:!1,...n},q)}function Xe(e){const{variant:n,size:t,orientation:o}=d(e.properties),i=[];if(n==="Buttons"){const r=b(e,{type:"INSTANCE",name:C});i.push(...r.map(a=>Be(a)))}else{const r=k(e,[{query:"child",type:"INSTANCE",name:"Input"},{query:"child",type:"INSTANCE",name:j}]);r&&i.push(G(r));const a=g(e,{type:"INSTANCE",name:C});a&&i.push(L(a))}return u("UButtonGroup",{size:t,orientation:h(o)},{size:"md",orientation:"horizontal"},i)}function _e(e){const{color:n,variant:t,dateValue:o}=d(e.properties),i=Number(o);return{color:h(n),selected:t==="Data-selected",date:Number.isNaN(i)?0:i}}function Ke(e){const{color:n,size:t,numberOfMonths:o,monthControls:i,yearControls:r}=d(e.properties),a=Number(o),l=x(e,{type:"INSTANCE",name:"calendar-item"}).map(p=>_e(p)),{range:c,multiple:s}=He(l);return u("UCalendar",{color:h(n),size:t,range:c,multiple:s,numberOfMonths:Number.isNaN(a)?1:a,monthControls:i,yearControls:r},{color:"primary",size:"md",range:!1,multiple:!1,numberOfMonths:1,monthControls:!0,yearControls:!0})}function He(e){let n=-1;for(let t=0;t<e.length;t++)if(e[t].selected){if(n!==-1&&t-n>1)return{range:!1,multiple:!0};if(t>0&&e[t-1].selected)return{range:!0,multiple:!1};n=t}return{range:!1,multiple:!1}}function Ve(e){const n=w(e,{type:"FRAME",name:"Header"}),t=w(e,{type:"FRAME",name:"Body"}),o=w(e,{type:"FRAME",name:"Footer"});return u("UCard",{},{},[...n?[S("header",[O])]:[],...t?[$]:[],...o?[S("footer",[O])]:[]])}function We(e){const{variant:n,pagination:t,prevNext:o}=d(e.properties);let i={};if(o){const[r,a]=U(e,[{query:"child",type:"FRAME",name:"Carousel + prev/next"},{query:"children",type:"INSTANCE",name:C}]),l={size:"md",color:"neutral",variant:"link"},{icon:c,...s}=r?F(r,{...l,icon:N.icons.arrowLeft}):{},{icon:p,...m}=a?F(a,{...l,icon:N.icons.arrowRight}):{};i={prev:s,next:m,prevIcon:c,nextIcon:p}}return u("UCarousel",{items:[],arrows:o,dots:t,fade:n==="Fade",...i},{arrows:!1,dots:!1,fade:!1})}function Ze(e){const{color:n,size:t,state:o,label:i,description:r,descriptionSlot:a,required:l,icon:c}=d(e.properties);return u("UCheckbox",{label:i,description:r?a:void 0,color:h(n),size:t,icon:v(c.name),disabled:o==="Disabled",required:l},{color:"primary",size:"md",icon:N.icons.check,disabled:!1,required:!1})}function Je(e){const{color:n,size:t,isLabel:o,label:i}=d(e.properties);return u("UChip",{text:o==="True"?i:void 0,color:h(n),size:t},{color:"primary",size:"md"})}function Qe(e){const{open:n}=d(e.properties),t=g(e,{type:"INSTANCE",name:C});return u("UCollapsible",{open:n},{open:!1},t?[L(t)]:[])}function Ye(e){const{size:n,state:t}=d(e.properties);return u("UColorPicker",{size:n,disabled:t==="Disabled"},{size:"md",disabled:!1})}function et(e){const{state:n,leadingSlot:t,trailingSlot:o,description:i,label:r,descriptionSlot:a,iconLeadingName:l,iconTrailingName:c}=d(e.properties);return T({label:r,suffix:i&&a||void 0,icon:t==="Icon"?v(l.name):void 0,avatar:t==="Avatar"?D():void 0,kbds:o==="Kbd"?Y(e):void 0,active:o==="Icon"&&c.name==="check",disabled:n==="Disabled"},{active:!1,disabled:!1})}function fe(e){const{open:n}=d(e.properties),t=n==="Default"?e:g(e,{type:"FRAME",name:"CommandPalette"}),o=t?g(t,{type:"INSTANCE",name:j}):void 0,i=o?G(o):void 0,{icon:r,placeholder:a,disabled:l}=i?.props||{},c=t?b(t,{type:"FRAME",name:/^Container/}):[];let s=0;const p=c.map(M=>{const R=g(M,{type:"TEXT",name:"Title"})?.characters,q=b(M,{type:"INSTANCE",name:"CommandPaletteItem"}).map(z=>{const B=et(z);return B.active&&s++,B});return{id:K(R||""),label:R,items:q}}),m=w(e,{type:"INSTANCE",name:C}),f=m?F(m,{size:"md",color:"neutral",variant:"ghost"}):!1,{icon:y,square:I,...A}=f||{};return u("UCommandPalette",{icon:r,placeholder:a,close:m?Object.keys(A).length>0?A:!0:!1,closeIcon:y,groups:p,multiple:s>1,disabled:l},{icon:N.icons.search,placeholder:"Type a command or search...",close:!1,closeIcon:N.icons.close,multiple:!1,disabled:!1})}function ge(e){const{direction:n,overlay:t,handle:o,heading:i,title:r,showDescription:a,description:l,buttons:c}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),s=[S("body",[$])];if(c){const p=U(e,[{query:"one",type:"FRAME",name:"Buttons"},{query:"children",type:"INSTANCE",name:C}]);if(p.length>0){const m=p.map(f=>{const y=L(f);return y.props.class="justify-center",y});s.push(S("footer",m))}}return u("UDrawer",{title:i?r:void 0,description:a?l:void 0,overlay:t==="True",handle:o,direction:h(n)},{overlay:!0,handle:!0,direction:"bottom"},s)}function ve(e){const{color:n,variant:t,size:o,orientation:i,state:r,highlight:a,placeholder:l,placeholderText:c}=d(e.properties),[s,p]=b(e,{type:"INSTANCE",name:C}).map(A=>F(A,{variant:"link",square:!0,size:o})),{icon:m,...f}=s||{},{icon:y,...I}=p||{};return u("UInputNumber",{placeholder:l&&c||void 0,color:h(n),variant:h(t),size:o,highlight:a==="True",orientation:h(i),increment:I,incrementIcon:y,decrement:f,decrementIcon:m,disabled:r==="Disabled"},{color:"primary",variant:"outline",size:"md",highlight:!1,orientation:"horizontal",incrementIcon:N.icons.plus,decrementIcon:N.icons.minus,disabled:!1})}function tt(e){const{color:n,variant:t,state:o,highlight:i,placeholder:r,placeholderText:a,completed:l,completedText:c,mask:s}=d(e.properties);return{color:h(n),variant:h(t),highlight:i==="True",disabled:o==="Disabled",placeholder:r&&a||void 0,value:l&&c||void 0,mask:s}}function ye(e){const n=b(e,{type:"INSTANCE",name:"PinInputItem"}).map(tt),t=n.some(p=>p.value&&!/^\d$/.test(p.value))?"text":"number",o=n.find(p=>!!p.placeholder)?.placeholder,i=n.some(p=>p.mask),{size:r}=d(e.properties),{color:a,variant:l,highlight:c,disabled:s}=n[0];return u("UPinInput",{color:a,variant:l,size:r,length:n.length,highlight:c,type:t,disabled:s,placeholder:o,mask:i},{color:"primary",variant:"outline",size:"md",length:5,highlight:!1,type:"text",disabled:!1,mask:!1})}function Ne(e){const{size:n,input:t,error:o,label:i,required:r,hint:a,hintSlot:l,help:c,helpSlot:s,description:p,descriptionSlot:m}=d(e.properties),f=[];if(t==="Input"){const y=w(e,{type:"INSTANCE",name:j});y&&f.push(G(y))}else if(t==="InputNumber"){const y=w(e,{type:"INSTANCE",name:"InputNumber"});y&&f.push(ve(y))}else if(t==="PinInput"){const y=w(e,{type:"INSTANCE",name:"PinInput"});y&&f.push(ye(y))}return u("UFormField",{label:i,description:p&&m||void 0,help:o==="False"&&c&&s||void 0,error:o==="True"&&(s||!0),hint:a&&l||void 0,size:n,required:r},{error:!1,size:"md",required:!1},f)}function nt(e){const{state:n,leadingSlot:t,label:o,iconName:i}=d(e.properties);return T({label:o,icon:t==="Icon"?v(i.name):void 0,avatar:t==="Avatar"?D():void 0,chip:t==="Dot"?{color:"primary"}:void 0,disabled:n==="Disabled",selected:n==="Selected"},{disabled:!1,selected:!1})}function ot(e){const{size:n}=d(e.properties),t=g(e,{type:"FRAME",name:"InputMenu"}),o=t?b(t,l=>l.type==="TEXT"&&l.name==="Title"||l.type==="INSTANCE"&&l.name==="InputMenuItem"&&l.visible===!0).map(l=>l.type==="TEXT"?{label:l.characters,type:"label"}:nt(l)):[],i=[],r=g(e,{type:"INSTANCE",name:j}),a=r?G(r).props:{};return u("UInputMenu",{size:n,items:o,...a},{size:"md"},i)}function it(e){const{color:n,state:t,label:o}=d(e.properties);return u("ULink",{active:h(n)==="primary",disabled:t==="Disabled"},{active:!1,disabled:!1},[o])}function X(e,n="path"){const t=K(e);switch(n){case"external":return`https://example.com/${t}`;case"hash":return`#${t}`;default:return`/${t}`}}function Ie(e){const{header:n,body:t,footer:o}=d(e.properties);return u("UModal",{},{},[...n?[S("header",[O])]:[],...t?[S("body",[$])]:[],...o?[S("footer",[O])]:[]])}function rt(e){const{icon:n,iconName:t,title:o,description:i,descriptionSlot:r}=d(e.properties);return{label:o,description:i&&r||void 0,icon:n?v(t.name):void 0}}function ee(e){const{color:n,variant:t,state:o,active:i,highlight:r,iconLeading:a,iconLeadingName:l,iconTrailing:c,badge:s,label:p,external:m,children:f}=d(e.properties),y=s?k(e,[{query:"child",type:"FRAME",name:"Container"},{query:"child",type:"INSTANCE",name:"Badge"}]):void 0,I=y?V(y,{size:"sm",color:"neutral",variant:"outline"}):void 0,A=c&&f?x(e,{type:"INSTANCE",name:"NavigationMenu(DropdownItem)"}).map(rt):void 0,M=m==="True";return T({label:p,icon:a?v(l.name):void 0,to:X(p,M?"external":"path"),badge:I,external:M,children:M?void 0:A,active:i==="True",disabled:o==="Disabled",variant:h(t),color:h(n),highlight:r==="True"},{external:!1,active:!1,disabled:!1,variant:"pill",color:"primary",highlight:!1})}function te(e){const{orientation:n,highlight:t}=d(e.properties),o=[];return n==="Horizontal"?o.push(...b(e,{type:"INSTANCE",name:"NavigationMenuItem"}).map(ee)):o.push(...b(e,{type:"INSTANCE",name:"Collapsible"}).map(i=>{const r=ee(g(i,{type:"INSTANCE",name:"NavigationMenuItem"})),a=U(i,[{query:"child",type:"INSTANCE",name:"NavigationMenu(ChildList)"},{query:"children",type:"INSTANCE",name:"NavigationMenuItem"}]).map(ee),l=E(a,"variant"),c=E(a,"color"),s=E(a,"highlight");return{...r,children:r.external?void 0:a,variant:l||r.variant,color:c||r.color,highlight:s||r.highlight}})),u("UNavigationMenu",{items:o.map(i=>P(i,"variant","color","highlight")),color:E(o,"color"),variant:E(o,"variant"),orientation:h(n),highlight:t==="True"||!!E(o,"highlight")},{color:"primary",variant:"pill",orientation:"horizontal",highlight:!1})}function be(e){if(!e)return[void 0,void 0];const[n,t]=e.split("-");return[n==="undefined"?void 0:n,t==="undefined"?void 0:t]}function at(e){const{size:n}=d(e.properties),t=b(e,{type:"INSTANCE",name:C}).map(z=>F(z));let o=[];t.length>=5&&(o=[...t],o.splice(2,t.length-4),o=o.every(z=>!Pe(z.label||""))?o:[]);const i=o.length===4,[r,a,l,c]=o,s=i?t.splice(2,t.length-4):t,p=s.find(({icon:z,label:B})=>z&&!/^\d+$/.test(B||"")),m=s.reduce((z,B)=>{const oe=`${B.color}-${B.variant}`;return z[oe]=(z[oe]||0)+1,z},{}),f=Object.entries(m).sort(([,z],[,B])=>B-z),[y,I]=f.map(([z])=>z),[A,M]=be(y),[R,q]=be(I);return u("UPagination",{color:A,variant:M,activeColor:R,activeVariant:q,size:n,showControls:i,disabled:s.every(z=>z.disabled),firstIcon:r?.icon,prevIcon:a?.icon,nextIcon:l?.icon,lastIcon:c?.icon,ellipsisIcon:p?.icon},{color:"neutral",variant:"outline",activeColor:"primary",activeVariant:"solid",size:"md",showControls:!0,disabled:!1,firstIcon:N.icons.chevronDoubleLeft,prevIcon:N.icons.chevronLeft,nextIcon:N.icons.chevronRight,lastIcon:N.icons.chevronDoubleRight,ellipsisIcon:N.icons.ellipsis})}function lt(e){const{position:n,arrow:t}=d(e.properties),o=T({side:h(n)},{side:"bottom"}),i=[S("content",[$])],r=g(e,{type:"INSTANCE",name:C});return r&&i.unshift(L(r)),u("UPopover",{content:o,arrow:t==="True"},{arrow:!1},i)}function ct(e){const{color:n,size:t,orientation:o,value:i,indicator:r}=d(e.properties);return u("UProgress",{modelValue:Number.parseInt(i,10),status:r,size:t,color:h(n),orientation:h(o)},{status:!1,size:"md",color:"primary",orientation:"horizontal"})}function st(e){const{color:n,state:t,label:o,description:i,descriptionSlot:r}=d(e.properties);return T({label:o,description:i&&r||void 0,disabled:t==="Disabled",color:h(n)},{color:"primary",disabled:!1})}function pt(e){const{size:n,align:t,legend:o,required:i}=d(e.properties),r=x(e,{type:"INSTANCE",name:"Radio"}).map(st),a=E(r,"color"),l=r.every(c=>c.disabled);return l&&r.forEach(c=>{delete c.disabled}),u("URadioGroup",{legend:o,items:r,size:n,color:a,orientation:h(t),disabled:l,required:i},{size:"md",color:"primary",orientation:"horizontal",disabled:!1,required:!1})}const Ce={SelectOutline:"outline",SelectSoft:"soft",SelectNone:"none",SelectGhost:"ghost",SelectSubtle:"subtle"},Se=Object.keys(Ce);function Ae(e,n={}){const t=Ce[e.name],{color:o,size:i,state:r,leadingSlot:a,placeholder:l,placeholderLabel:c,iconLeadingName:s,iconTrailingName:p}=d(e.properties),m=a==="Icon"?v(s.name):void 0,f=v(p.name),y=a==="Avatar"?D():void 0;return u("USelect",{placeholder:l?c:void 0,color:h(o),variant:t,size:i,icon:m,trailingIcon:f,avatar:y,disabled:r==="Disabled"},{color:"primary",variant:"outline",size:"md",trailingIcon:N.icons.chevronDown,disabled:!1,...n})}function dt(e){const{properties:n}=e,{state:t,leadingSlot:o,label:i,iconName:r}=d(n),a=t==="Selected"?g(e,{type:"INSTANCE"}):void 0;return T({label:i,icon:o==="Icon"?v(r.name):void 0,avatar:o==="Avatar"?D():void 0,disabled:t==="Disabled",selected:t==="Selected",trailingIcon:a?v(a.name):void 0},{disabled:!1,selected:!1})}function ne(e){const n=g(e,{type:"FRAME",name:"SelectMenu"}),t=n?g(n,{type:"FRAME",name:"Container"}):void 0,o=t?b(t,p=>p.type==="FRAME"&&p.name==="Title"||p.type==="INSTANCE"&&p.name==="SelectMenuItem").map(p=>p.type==="FRAME"?{label:g(p,{type:"TEXT"})?.characters,type:"label"}:dt(p)):[],i=E(o,"trailingIcon"),r=g(e,{type:"INSTANCE",name:Se}),a=n?k(n,[{query:"child",type:"INSTANCE",name:"Input"},{query:"child",type:"INSTANCE",name:j}]):void 0,{content:l,...c}=r?Ae(r).props:{},s=a?G(a,{placeholder:"Search...",variant:"none"}).props:{};return u("USelectMenu",{...c,items:o.map(p=>P(p,"selected","trailingIcon")),selectedIcon:i,searchInput:s},{selectedIcon:N.icons.check})}function ut(e){const{color:n,size:t,orientation:o,separator:i,slot:r,iconName:a,span:l}=d(e.properties),c=r==="Avatar"?g(e,{type:"INSTANCE",name:"Avatar"}):void 0,{chip:s,...p}=c?se(c):{};return u("USeparator",{label:r==="Span"&&l||void 0,icon:r==="Icon"&&v(a.name)||void 0,avatar:Object.keys(p).length>0?p:void 0,color:h(n),size:t,type:h(i),orientation:h(o)},{color:"neutral",size:"xs",type:"solid",orientation:"horizontal"})}function mt(e){return u("USkeleton",{},{})}function Te(e){const{variant:n,overlay:t}=d(e.properties),o=w(e,{type:"FRAME",name:"Header"}),i=w(e,{type:"FRAME",name:"Body"}),r=w(e,{type:"FRAME",name:"Footer"}),a=w(e,{type:"FRAME",name:"Title and description"}),l=o?g(o,{type:"INSTANCE",name:C}):void 0,c=l?F(l,{size:"md",color:"neutral",variant:"ghost"}):!1,{icon:s,square:p,...m}=c||{},[f,y]=a?b(a,{type:"TEXT"}):[],I=[];return i&&I.push(S("body",[$])),r&&I.push(S("footer",[O])),u("USlideover",{title:f?.characters,description:y?.characters,overlay:t==="True",side:h(n),close:c?Object.keys(m).length>0?m:!0:!1,closeIcon:s},{overlay:!0,side:"right",close:!0,closeIcon:N.icons.close},I)}function ht(e){const{color:n,size:t,orientation:o,state:i,indicatorPosition:r,indicator2:a}=d(e.properties),l=Number(r);return u("USlider",{modelValue:a?[0,l]:l,color:h(n),size:t,orientation:h(o),disabled:i==="Disabled"},{color:"primary",size:"md",orientation:"horizontal",disabled:!1})}function ft(e){const{properties:n}=e,{variant:t,state:o,iconName:i}=d(n,{"\u{1F6A6}State":"state"});return T({icon:t==="Icon"?v(i.name):void 0,disabled:o==="Disabled"},{disabled:!1})}function gt(e){const{color:n,size:t,step:o,orientation:i}=d(e.properties),r=b(e,{type:"FRAME",name:/^Step/}).map(a=>{const l=g(a,{type:"INSTANCE",name:"Stepper_Item"}),c=g(a,{type:"FRAME",name:"Title + description"}),[s,p]=c?b(c,{type:"TEXT"}):[];return l?{title:s?.characters,description:p?.characters,...ft(l)}:void 0}).filter(a=>a!=null);return u("UStepper",{modelValue:Number(o)-1,items:r,color:h(n),size:t,orientation:h(i)},{color:"primary",size:"md",orientation:"horizontal"})}function Ee(e){const{color:n,size:t,state:o,title:i,showDescription:r,description:a,defaultIcon:l,defaultIconName:c,activeIcon:s,activeIconName:p,required:m}=d(e.properties,{"\u21B3 Description":"showDescription"});return u("USwitch",{label:i,description:r&&a||void 0,color:h(n),size:t,checkedIcon:l?v(p.name):void 0,uncheckedIcon:s?v(c.name):void 0,disabled:o==="Disabled",required:m},{color:"primary",size:"md",disabled:!1,required:!1})}function vt(e){const{state:n,leadingSlot:t,avatar:o,icon:i,iconName:r,label:a}=d(e.properties);return T({label:a,icon:t==="Icon"&&i?v(r.name):void 0,avatar:t==="Avatar"&&o?D():void 0,disabled:n==="Disabled"},{disabled:!1})}function yt(e){const{color:n,size:t,variant:o,align:i}=d(e.properties),r=[],a=[];return b(e,{type:"INSTANCE",name:"Tab"}).forEach(l=>{const c=vt(l),s=g(l,{type:"INSTANCE",name:"Badge"}),p=s?Q(s):void 0;if(p){const m=K(c.label||"");c.slot=m,r.push(S(m,[p]))}a.push(c)}),u("UTabs",{items:a,color:h(n),variant:h(o),size:t,orientation:h(i)},{color:"primary",variant:"pill",size:"md",orientation:"horizontal"},r)}function Nt(e){const{color:n,size:t,variant:o,state:i,placeholder:r,placeholderSlot:a}=d(e.properties);return u("UTextarea",{placeholder:r?a:void 0,color:h(n),variant:h(o),size:t,disabled:i==="Disabled"},{color:"primary",variant:"outline",size:"md",disabled:!1})}function It(e){const{color:n,leadingSlot:t,description:o,title:i,showDescription:r,leadingIconName:a}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),l=g(e,{type:"FRAME",name:"Content"}),c=g(l||e,{type:"INSTANCE",name:C}),s=c?F(c,{size:"md",color:"neutral",variant:"link"}):!1,p=s?s.icon:void 0,m=U(e,[{query:"one",type:"FRAME",name:"Actions"},{query:"children",type:"INSTANCE",name:C}]).map(f=>F(f,{size:"xs"}));return u("UToast",{title:i,description:r&&o||void 0,icon:t==="Icon"?v(a.name):void 0,avatar:t==="Avatar"?D():void 0,color:h(n),close:s,closeIcon:p,actions:m.length>0?m:void 0},{color:"primary",close:!0,closeIcon:N.icons.close})}const bt={top:"bottom",right:"left",bottom:"top",left:"right",none:"bottom"};function Ct(e){const{properties:n}=e,{arrowPlacement:t,label:o}=d(n),i=T({side:bt[h(t)]},{side:"bottom"}),r=Y(e,{size:"sm"});return u("UTooltip",{text:o,content:i,arrow:t!=="None",kbds:r},{arrow:!1})}const St={Accordion:le,Alert:Re,Avatar:H,AvatarGroup:de,Badge:Q,Breadcrumb:Ge,...J(C,L),ButtonGroup:Xe,Calendar:Ke,Card:Ve,Carousel:We,Checkbox:Ze,Chip:Je,Collapsible:Qe,ColorPicker:Ye,CommandPalette:fe,Drawer:ge,DropdownMenu:me,FormField:Ne,Icon:re,...J(j,G),InputMenu:ot,InputNumber:ve,Kbd:ue,Link:it,Modal:Ie,NavigationMenu:te,Pagination:at,PinInput:ye,Popover:lt,Progress:ct,RadioGroup:pt,...J(Se,Ae),SelectMenu:ne,Separator:ut,Skeleton:mt,Slideover:Te,Slider:ht,Stepper:gt,Switch:Ee,Tabs:yt,TextArea:Nt,Toast:It,Tooltip:Ct};function At(e){const{iconLeading:n,iconLeadingName:t,close:o,title:i,color:r}=d(e.properties),a=b(e,{type:"INSTANCE",name:C}),l=(o?a.slice(0,-1):a).map(p=>F(p,{color:"neutral",size:"xs"})),{icon:c,...s}=o?F(a.at(-1),{size:"md",color:"neutral",variant:"ghost"}):{};return u("UBanner",{color:h(r),icon:n?v(t.name):void 0,title:i,actions:l.length>0?l:void 0,close:o&&Object.keys(s).length>0?s:o,closeIcon:c},{color:"primary",close:!1,closeIcon:N.icons.close})}function ze(e){const{showDescription:n,description:t,name:o,size:i,orientation:r}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription"}),a=g(e,{type:"INSTANCE",name:"Avatar"}),{chip:l,...c}=a?P(se(a),"size"):{};return u("UUser",{name:o,description:n&&t||void 0,avatar:Object.keys(c).length>0?c:void 0,chip:P(l,"size","inset"),size:h(i),orientation:h(r)},{size:"md",orientation:"horizontal"})}function Tt(e){const{props:{orientation:n,...t}}=ze(e);return t}function Me(e){const{image:n,authors:t,title:o,showDescription:i,description:r,showDate:a,date:l,showBadge:c,variant:s,orientation:p,author:m}=d(e.properties,{"\u{1F441}\uFE0F Description":"showDescription","\u{1F441}\uFE0F Date":"showDate","\u{1F441}\uFE0F Badge":"showBadge"}),f=k(e,[{query:"one",type:"FRAME",name:"Date + badge"},{query:"one",type:"INSTANCE",name:"Badge"}]),y=c&&f?V(f,{color:"neutral",variant:"subtle"}):void 0,I=[];if(t){if(m==="One"){const A=k(e,[{query:"child",type:"FRAME",name:"Content"},{query:"child",type:"INSTANCE",name:"User"}]);A&&I.push(Tt(A))}else if(m==="Multiple"){const A=k(e,[{query:"child",type:"FRAME",name:"Content"},{query:"child",type:"INSTANCE",name:"AvatarGroup"}]);if(A){const M=de(A);M&&I.push(...M.children.map(R=>{const{props:q}=R;return{avatar:q}}))}}}return u("UBlogPost",{title:o,description:i?r:void 0,date:a?l:void 0,badge:typeof y=="number"?String(y):y,authors:I,image:n?"https://picsum.photos/540/360":void 0,orientation:h(p),variant:h(s)},{orientation:"vertical",variant:"outline"})}function Et(e){const{props:{orientation:n,...t}}=Me(e);return t}function zt(e){const{orientation:n}=d(e.properties),t=x(e,{type:"INSTANCE",name:"BlogPost"}).map(Et);return u("UBlogPosts",{orientation:h(n),posts:t},{orientation:"horizontal"})}function Mt(e){const n=g(e,{type:"INSTANCE",name:"SelectMenu"}),{props:t={}}=n?ne(n):{};return u("UColorModeSelect",P(t,"items","icon"),{})}function wt(e){const n=g(e,{type:"INSTANCE",name:"Switch"}),{props:t={}}=n?Ee(n):{};return u("UColorModeSwitch",ie(t,"disabled","color","size"),{})}function Ft(e){const{iconLeading:n,iconLeadingName:t,badge:o,label:i,color:r,variant:a,state:l,active:c,highlight:s}=d(e.properties),p=o?g(e,{type:"INSTANCE",name:"Badge"}):void 0,m=p?V(p,{color:"neutral",variant:"outline",size:"sm"}):void 0;return{title:i,path:X(i,"hash"),...T({icon:n?v(t.name):void 0,badge:m,active:c==="True",disabled:l==="Disabled",color:h(r),variant:h(a),highlight:s==="True"},{active:!1,disabled:!1,color:"primary",variant:"pill",highlight:!1})}}function Ut(e){const{iconTrailing:n,badge:t,iconLeading:o,label:i,iconLeadingName:r,active:a,highlightColor:l,variant:c}=d(e.properties),s=t?g(e,{type:"INSTANCE",name:"Badge"}):void 0,p=s?V(s,{color:"neutral",variant:"outline",size:"sm"}):void 0,m=e.children[e.children.length-1],f=n?v(m.name):void 0;return{title:i,path:X(i,"hash"),...T({icon:o?v(r.name):void 0,badge:p,active:a==="True",highlightColor:h(l),variant:h(c),trailingIcon:f},{active:!1,highlightColor:"primary",variant:"pill",trailingIcon:N.icons.chevronDown})}}function kt(e){const n=Ut(g(e,{type:"INSTANCE",name:"ContentNavigationItem"})),t=x(e,{type:"INSTANCE",name:"ContentNavigationLink"}).map(Ft),o=E(t,"color"),i=E(t,"variant")||n.variant,r=E(t,"highlight");return{...n,children:t.map(a=>P(a,"color","variant","highlight")),color:o,variant:i,highlight:r}}function Lt(e){const n=b(e,{type:"INSTANCE",name:"ContentNavigationItems"}).map(kt);return u("UContentNavigation",{navigation:n.map(t=>P(t,"color","variant","highlight","highlightColor","trailingIcon")),color:E(n,"color"),highlightColor:E(n,"highlightColor"),variant:E(n,"variant"),highlight:!!E(n,"highlight"),trailingIcon:E(n,"trailingIcon")},{color:"primary",highlightColor:"primary",variant:"pill",highlight:!1,trailingIcon:N.icons.chevronDown})}function Dt(e){const n=g(e,{type:"INSTANCE",name:"CommandPalette"}),t=n?fe(n).props:{};return u("UContentSearch",{...t},{})}function Pt(e){const n=g(e,{type:"INSTANCE",name:C}),t=n?L(n).props:{},{icon:o,label:i,color:r,variant:a,size:l,disabled:c}=t;return u("UContentSearchButton",{icon:o,label:i,color:r,variant:a,size:l,disabled:c},{icon:N.icons.search,color:"neutral",variant:"ghost"})}function qt(e){const{title:n,description:t}=d(e.properties),o=k(e,[{query:"child",type:"FRAME",name:"Icon"},{query:"child",type:"INSTANCE"}]),i=o?v(o.name):void 0;return{title:n,description:t,path:X(n,"hash"),icon:i}}function Bt(e){const n=b(e,{type:"INSTANCE",name:"ContentSurroundItem"}).map(qt),{icon:t,...o}=n[0],{icon:i,...r}=n[1];return u("UContentSurround",{prevIcon:t,nextIcon:i,surround:[o,r]},{prevIcon:N.icons.arrowLeft,nextIcon:N.icons.arrowRight})}function we(e){const{label:n,highlightColor:t}=d(e.properties);return{id:K(n),text:n,depth:3,...T({highlightColor:h(t)},{highlightColor:"primary"})}}function Rt(e){const{color:n}=d(e.properties),t=g(e,{type:"INSTANCE",name:"ContentTocLink"}),{id:o,text:i,highlightColor:r}=t?we(t):{},a=U(e,[{query:"child",type:"FRAME",name:"ContentTocList"},{query:"children",type:"INSTANCE",name:"ContentTocLink"}]).map(we),l=E(a,"highlightColor");return{id:o||"label",text:i||"Label",depth:2,children:a.map(c=>P(c,"highlightColor")),...T({color:h(n),highlightColor:l||r},{color:"primary",highlightColor:"primary"})}}function xt(e){const{title:n}=d(e.properties),t=x(e,{type:"INSTANCE",name:"ContentTocItem"}).map(Rt),o=E(t,"color"),i=E(t,"highlightColor");return u("UContentToc",{title:n,links:t.map(r=>P(r,"color","highlightColor")),color:o,highlightColor:i},{title:"On this page",color:"primary",highlightColor:"primary"})}function Ot(e){const{errorMessage:n,statusMessage:t,statusCode:o}=d(e.properties),i=g(e,{type:"INSTANCE",name:C}),r=i?F(i,{size:"lg",color:"primary",variant:"solid",label:"Back to home"}):!1;return u("UError",{error:{statusCode:o,statusMessage:t,message:n},clear:r?Object.keys(r).length>0?r:!0:!1},{clear:!0})}function $t(e){const n=k(e,[{query:"child",type:"FRAME",name:"LeftSlot"},{query:"child",type:"TEXT"}])?.characters,t=U(e,[{query:"child",type:"FRAME",name:"RightSlot"},{query:"children",type:"INSTANCE",name:C}]).map(i=>L(i)),o=k(e,[{query:"child",type:"FRAME",name:"Default"},{query:"child",type:"INSTANCE",name:"NavigationMenu"}]);return u("UFooter",{},{},[...n?[S("left",[n])]:[],...o?[te(o)]:[],...t.length?[S("right",t)]:[]])}function jt(e){const{label:n,iconLeadingName:t,iconLeading:o,external:i}=d(e.properties);return{label:n,to:X(n,i?"external":"path"),icon:o?v(t.name):void 0,external:i}}function Gt(e){const n=d(e.properties),t=b(e,{type:"FRAME",name:/^Column /}).map((i,r)=>{const a=r+1,l=n[`titleSection${a}`],c=U(i,[{query:"child",type:"FRAME",name:"Links"},{query:"children",type:"INSTANCE",name:"FooterColumnsLink"}]).map(jt);return{label:l,children:c}}),o=[];if(n.newsletter){const i=k(e,[{query:"child",type:"FRAME",name:"Newsletter"},{query:"child",type:"INSTANCE",name:"FormField"}]),r=k(e,[{query:"child",type:"FRAME",name:"Newsletter"},{query:"child",type:"INSTANCE",name:C}]);if(i){const a=Ne(i);if(r){const l=L(r),c=a.children.find(s=>typeof s!="string"&&s.name==="UInput");c&&c.children.push(S("trailing",[l]))}o.push(S("right",[a]))}}return u("UFooterColumns",{columns:t},{},o)}function Fe(e){return["drawer","slideover","modal"].includes(e)}function Xt(e){const{title:n,leftSlot:t,mode:o,variant:i}=d(e.properties),r=h(o),a=Fe(r),l=a?g(e,{type:"FRAME",name:"Header"}):e,c=i==="Logo"?W("Logo"):null,s=U(l,[{query:"child",type:"FRAME",name:"RightSlot"},{query:"children",type:"INSTANCE",name:C}]).map(f=>L(f)),p=w(e,{type:"INSTANCE",name:"NavigationMenu"});let m;if(Fe(r))switch(r){case"modal":{const f=g(e,{type:"INSTANCE",name:"Modal"});m=(f?Ie(f):{}).props;break}case"slideover":{const f=g(e,{type:"INSTANCE",name:"Slideover"});m=(f?Te(f):{}).props;break}case"drawer":{const f=g(e,{type:"INSTANCE",name:"Drawer"});m=(f?ge(f):{}).props;break}}return u("UHeader",{title:t&&n||"",mode:a?r:void 0,menu:m},{title:"Nuxt UI Pro",mode:"modal"},[...c?[S("left",[c])]:[],...p?[te(p)]:[],...s.length?[S("right",s)]:[]])}function Ue(e){const n=g(e,{type:"INSTANCE",name:"SelectMenu"}),{props:t={}}=n?ne(n):{};return u("ULocaleSelect",{locales:[],...ie(t,"color","variant","size","trailingIcon","selectedIcon","content","arrow","portal","disabled","ui")},{})}function _t(e){const n=le(e);return u("UPageAccordion",P(n.props,"ui"),{})}function Kt(e){const{label:n,external:t,iconLeadingName:o}=d(e.properties);return{label:n,icon:o?v(o.name):void 0,external:t,to:X(n,t?"external":"path")}}function Ht(e){const n=b(e,{type:"INSTANCE",name:"PageAnchorsItem"}).map(Kt);return u("UPageAnchors",{links:n},{})}const Vt={...St,Banner:At,BlogPost:Me,BlogPosts:zt,ColorModeSelect:Mt,ColorModeSwitch:wt,ContentNavigation:Lt,ContentSearch:Dt,ContentSearchButton:Pt,ContentSurround:Bt,ContentToc:xt,Error:Ot,Footer:$t,FooterColumns:Gt,Header:Xt,LocalSelect:Ue,LocaleSelect:Ue,PageAccordion:_t,PageAnchors:Ht,User:ze},Wt=De(Vt),Zt={name:"Nuxt UI Pro",code:{component:{title:"Component",lang:"vue",transformComponent:Wt}}};export{Zt as plugin};
