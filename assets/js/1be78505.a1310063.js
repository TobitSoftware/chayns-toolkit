(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[714,90],{5680:(e,t,n)=>{"use strict";n.d(t,{xA:()=>d,yg:()=>h});var a=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(n),m=o,h=u["".concat(s,".").concat(m)]||u[m]||p[m]||r;return n?a.createElement(h,l(l({ref:t},d),{},{components:n})):a.createElement(h,l({ref:t},d))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,l=new Array(r);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[u]="string"==typeof e?e:o,l[1]=i;for(var c=2;c<r;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5894:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>se});var a=n(6540),o=n(5680),r=n(4586),l=n(5920),i=n(204),s=n(8168),c=n(53),d=n(3155),u=n(4911),p=n(9312),m=n(5515),h=n(4676),b=n(6654),y=n(1773);const g=e=>a.createElement("svg",(0,s.A)({width:"20",height:"20","aria-hidden":"true"},e),a.createElement("g",{fill:"#7a7a7a"},a.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),a.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})));var f=n(1952),v=n(6359),k=n(4798);const E={sidebar:"sidebar_a3j0",sidebarWithHideableNavbar:"sidebarWithHideableNavbar_VlPv",sidebarHidden:"sidebarHidden_OqfG",sidebarLogo:"sidebarLogo_hmkv",menu:"menu_cyFh",menuLinkText:"menuLinkText_lRH+",menuWithAnnouncementBar:"menuWithAnnouncementBar_+O1J",collapseSidebarButton:"collapseSidebarButton_eoK2",collapseSidebarButtonIcon:"collapseSidebarButtonIcon_e+kA",sidebarMenuIcon:"sidebarMenuIcon_iZzd",sidebarMenuCloseIcon:"sidebarMenuCloseIcon_6kU2"},A=24,C=(e,t)=>"link"===e.type?(0,d.ys)(e.href,t):"category"===e.type&&e.items.some((e=>C(e,t))),N=(0,a.memo)((function(e){let{items:t,...n}=e;return t.map(((e,t)=>a.createElement(T,(0,s.A)({key:t,item:e},n))))}));function T(e){return"category"===e.item.type?a.createElement(S,e):a.createElement(_,e)}function S(e){let{item:t,onItemClick:n,collapsible:o,activePath:r,...l}=e;const{items:i,label:u}=t,p=C(t,r),m=(0,d.ZC)(p),[h,b]=(0,a.useState)((()=>!!o&&(!p&&t.collapsed))),y=(0,a.useRef)(null),[g,f]=(0,a.useState)(void 0),v=function(e){void 0===e&&(e=!0),f(e?`${y.current?.scrollHeight}px`:void 0)};(0,a.useEffect)((()=>{p&&!m&&h&&b(!1)}),[p,m,h]);const k=(0,a.useCallback)((e=>{e.preventDefault(),g||v(),setTimeout((()=>b((e=>!e))),100)}),[g]);return 0===i.length?null:a.createElement("li",{className:(0,c.A)("menu__list-item",{"menu__list-item--collapsed":h})},a.createElement("a",(0,s.A)({className:(0,c.A)("menu__link",{"menu__link--sublist":o,"menu__link--active":o&&p,[E.menuLinkText]:!o}),onClick:o?k:void 0,href:o?"#":void 0},l),u),a.createElement("ul",{className:"menu__list",ref:y,style:{height:g},onTransitionEnd:()=>{h||v(!1)}},a.createElement(N,{items:i,tabIndex:h?"-1":"0",onItemClick:n,collapsible:o,activePath:r})))}function _(e){let{item:t,onItemClick:n,activePath:o,collapsible:r,...l}=e;const{href:i,label:d}=t,u=C(t,o);return a.createElement("li",{className:"menu__list-item",key:d},a.createElement(h.A,(0,s.A)({className:(0,c.A)("menu__link",{"menu__link--active":u}),to:i},(0,b.A)(i)&&{isNavLink:!0,exact:!0,onClick:n},l),(0,b.A)(i)?d:a.createElement("span",null,d,a.createElement(v.A,null))))}function x(e){let{onClick:t}=e;return a.createElement("button",{type:"button",title:(0,k.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,k.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,c.A)("button button--secondary button--outline",E.collapseSidebarButton),onClick:t},a.createElement(g,{className:E.collapseSidebarButtonIcon}))}function j(e){let{responsiveSidebarOpened:t,onClick:n}=e;return a.createElement("button",{"aria-label":t?(0,k.T)({id:"theme.docs.sidebar.responsiveCloseButtonLabel",message:"Close menu",description:"The ARIA label for close button of mobile doc sidebar"}):(0,k.T)({id:"theme.docs.sidebar.responsiveOpenButtonLabel",message:"Open menu",description:"The ARIA label for open button of mobile doc sidebar"}),"aria-haspopup":"true",className:"button button--secondary button--sm menu__button",type:"button",onClick:n},t?a.createElement("span",{className:(0,c.A)(E.sidebarMenuIcon,E.sidebarMenuCloseIcon)},"\xd7"):a.createElement(f.A,{className:E.sidebarMenuIcon,height:A,width:A}))}const O=function(e){let{path:t,sidebar:n,sidebarCollapsible:o=!0,onCollapse:r,isHidden:l}=e;const i=function(){const{isClosed:e}=(0,d.Mj)(),[t,n]=(0,a.useState)(!e);return(0,m.A)((t=>{let{scrollY:a}=t;e||n(0===a)})),t}(),{navbar:{hideOnScroll:s},hideableSidebar:h}=(0,d.pN)(),{isClosed:b}=(0,d.Mj)(),{showResponsiveSidebar:g,closeResponsiveSidebar:f,toggleResponsiveSidebar:v}=function(){const[e,t]=(0,a.useState)(!1);(0,u.A)(e);const n=(0,p.A)();return(0,a.useEffect)((()=>{n===p.X.desktop&&t(!1)}),[n]),{showResponsiveSidebar:e,closeResponsiveSidebar:(0,a.useCallback)((e=>{e.target.blur(),t(!1)}),[t]),toggleResponsiveSidebar:(0,a.useCallback)((()=>{t((e=>!e))}),[t])}}();return a.createElement("div",{className:(0,c.A)(E.sidebar,{[E.sidebarWithHideableNavbar]:s,[E.sidebarHidden]:l})},s&&a.createElement(y.A,{tabIndex:-1,className:E.sidebarLogo}),a.createElement("nav",{className:(0,c.A)("menu","menu--responsive","thin-scrollbar",E.menu,{"menu--show":g,[E.menuWithAnnouncementBar]:!b&&i}),"aria-label":(0,k.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Sidebar navigation",description:"The ARIA label for documentation menu"})},a.createElement(j,{responsiveSidebarOpened:g,onClick:v}),a.createElement("ul",{className:"menu__list"},a.createElement(N,{items:n,onItemClick:f,collapsible:o,activePath:t}))),h&&a.createElement(x,{onClick:r}))};const w={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","atrule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var P={Prism:n(1258).A,theme:w};function I(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function B(){return B=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},B.apply(this,arguments)}var L=/\r\n|\r|\n/,D=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},M=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)};function R(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}var H=function(e){function t(){for(var t=this,n=[],a=arguments.length;a--;)n[a]=arguments[a];e.apply(this,n),I(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?function(e,t){var n=e.plain,a=Object.create(null),o=e.styles.reduce((function(e,n){var a=n.languages,o=n.style;return a&&!a.includes(t)||n.types.forEach((function(t){var n=B({},e[t],o);e[t]=n})),e}),a);return o.root=n,o.plain=B({},n,{backgroundColor:null}),o}(e.theme,e.language):void 0;return t.themeDict=n})),I(this,"getLineProps",(function(e){var n=e.key,a=e.className,o=e.style,r=B({},R(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(r.style=l.plain),void 0!==o&&(r.style=void 0!==r.style?B({},r.style,o):o),void 0!==n&&(r.key=n),a&&(r.className+=" "+a),r})),I(this,"getStyleForToken",(function(e){var n=e.types,a=e.empty,o=n.length,r=t.getThemeDict(t.props);if(void 0!==r){if(1===o&&"plain"===n[0])return a?{display:"inline-block"}:void 0;if(1===o&&!a)return r[n[0]];var l=a?{display:"inline-block"}:{},i=n.map((function(e){return r[e]}));return Object.assign.apply(Object,[l].concat(i))}})),I(this,"getTokenProps",(function(e){var n=e.key,a=e.className,o=e.style,r=e.token,l=B({},R(e,["key","className","style","token"]),{className:"token "+r.types.join(" "),children:r.content,style:t.getStyleForToken(r),key:void 0});return void 0!==o&&(l.style=void 0!==l.style?B({},l.style,o):o),void 0!==n&&(l.key=n),a&&(l.className+=" "+a),l})),I(this,"tokenize",(function(e,t,n,a){var o={code:t,grammar:n,language:a,tokens:[]};e.hooks.run("before-tokenize",o);var r=o.tokens=e.tokenize(o.code,o.grammar,o.language);return e.hooks.run("after-tokenize",o),r}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,a=e.code,o=e.children,r=this.getThemeDict(this.props),l=t.languages[n];return o({tokens:function(e){for(var t=[[]],n=[e],a=[0],o=[e.length],r=0,l=0,i=[],s=[i];l>-1;){for(;(r=a[l]++)<o[l];){var c=void 0,d=t[l],u=n[l][r];if("string"==typeof u?(d=l>0?d:["plain"],c=u):(d=M(d,u.type),u.alias&&(d=M(d,u.alias)),c=u.content),"string"==typeof c){var p=c.split(L),m=p.length;i.push({types:d,content:p[0]});for(var h=1;h<m;h++)D(i),s.push(i=[]),i.push({types:d,content:p[h]})}else l++,t.push(d),n.push(c),a.push(0),o.push(c.length)}l--,t.pop(),n.pop(),a.pop(),o.pop()}return D(i),s}(void 0!==l?this.tokenize(t,a,l,n):[a]),className:"prism-code language-"+n,style:void 0!==r?r.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(a.Component);const W=H;var $=n(8426),z=n.n($);const F={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]};var Z=n(4785);const U=()=>{const{prism:e}=(0,d.pN)(),{isDarkTheme:t}=(0,Z.A)(),n=e.theme||F,a=e.darkTheme||n;return t?a:n},V="codeBlockContainer_J+bg",G="codeBlockContent_csEI",J="codeBlockTitle_oQzk",X="codeBlock_rtdJ",q="codeBlockWithTitle_ZT05",K="copyButton_M3SB",Q="codeBlockLines_1zSZ",Y=/{([\d,-]+)}/,ee=function(e){void 0===e&&(e=["js","jsBlock","jsx","python","html"]);const t={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},n=["highlight-next-line","highlight-start","highlight-end"].join("|"),a=e.map((e=>`(?:${t[e].start}\\s*(${n})\\s*${t[e].end})`)).join("|");return new RegExp(`^\\s*(?:${a})\\s*$`)};function te(e){let{children:t,className:n,metastring:o,title:r}=e;const{prism:l}=(0,d.pN)(),[i,u]=(0,a.useState)(!1),[p,m]=(0,a.useState)(!1);(0,a.useEffect)((()=>{m(!0)}),[]);const h=(0,d.wt)(o)||r,b=(0,a.useRef)(null);let y=[];const g=U(),f=Array.isArray(t)?t.join(""):t;if(o&&Y.test(o)){const e=o.match(Y)[1];y=z()(e).filter((e=>e>0))}let v=n&&n.replace(/language-/,"");!v&&l.defaultLanguage&&(v=l.defaultLanguage);let E=f.replace(/\n$/,"");if(0===y.length&&void 0!==v){let e="";const t=(e=>{switch(e){case"js":case"javascript":case"ts":case"typescript":return ee(["js","jsBlock"]);case"jsx":case"tsx":return ee(["js","jsBlock","jsx"]);case"html":return ee(["js","jsBlock","html"]);case"python":case"py":return ee(["python"]);default:return ee()}})(v),n=f.replace(/\n$/,"").split("\n");let a;for(let o=0;o<n.length;){const r=o+1,l=n[o].match(t);if(null!==l){switch(l.slice(1).reduce(((e,t)=>e||t),void 0)){case"highlight-next-line":e+=`${r},`;break;case"highlight-start":a=r;break;case"highlight-end":e+=`${a}-${r-1},`}n.splice(o,1)}else o+=1}y=z()(e),E=n.join("\n")}const A=()=>{!function(e,t){let{target:n=document.body}=void 0===t?{}:t;if("string"!=typeof e)throw new TypeError(`Expected parameter \`text\` to be a \`string\`, got \`${typeof e}\`.`);const a=document.createElement("textarea"),o=document.activeElement;a.value=e,a.setAttribute("readonly",""),a.style.contain="strict",a.style.position="absolute",a.style.left="-9999px",a.style.fontSize="12pt";const r=document.getSelection(),l=r.rangeCount>0&&r.getRangeAt(0);n.append(a),a.select(),a.selectionStart=0,a.selectionEnd=e.length;let i=!1;try{i=document.execCommand("copy")}catch{}a.remove(),l&&(r.removeAllRanges(),r.addRange(l)),o&&o.focus()}(E),u(!0),setTimeout((()=>u(!1)),2e3)};return a.createElement(W,(0,s.A)({},P,{key:String(p),theme:g,code:E,language:v}),(e=>{let{className:t,style:n,tokens:o,getLineProps:r,getTokenProps:l}=e;return a.createElement("div",{className:V},h&&a.createElement("div",{style:n,className:J},h),a.createElement("div",{className:(0,c.A)(G,v)},a.createElement("pre",{tabIndex:0,className:(0,c.A)(t,X,"thin-scrollbar",{[q]:h}),style:n},a.createElement("code",{className:Q},o.map(((e,t)=>{1===e.length&&""===e[0].content&&(e[0].content="\n");const n=r({line:e,key:t});return y.includes(t+1)&&(n.className+=" docusaurus-highlight-code-line"),a.createElement("span",(0,s.A)({key:t},n),e.map(((e,t)=>a.createElement("span",(0,s.A)({key:t},l({token:e,key:t}))))))})))),a.createElement("button",{ref:b,type:"button","aria-label":(0,k.T)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,c.A)(K,"clean-btn"),onClick:A},i?a.createElement(k.A,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):a.createElement(k.A,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}var ne=n(6287);const ae={code:e=>{const{children:t}=e;return(0,a.isValidElement)(t)?t:t.includes("\n")?a.createElement(te,e):a.createElement("code",e)},a:e=>a.createElement(h.A,e),pre:e=>{const{children:t}=e;return(0,a.isValidElement)(t?.props?.children)?t?.props.children:a.createElement(te,(0,a.isValidElement)(t)?t?.props:{children:t})},h1:(0,ne.A)("h1"),h2:(0,ne.A)("h2"),h3:(0,ne.A)("h3"),h4:(0,ne.A)("h4"),h5:(0,ne.A)("h5"),h6:(0,ne.A)("h6")};var oe=n(9090),re=n(6347);const le={docPage:"docPage_lDyR",docMainContainer:"docMainContainer_r8cw",docMainContainerEnhanced:"docMainContainerEnhanced_SOUu",docSidebarContainer:"docSidebarContainer_0YBq",docSidebarContainerHidden:"docSidebarContainerHidden_Qlt2",collapsedDocSidebar:"collapsedDocSidebar_zZpm",expandSidebarButtonIcon:"expandSidebarButtonIcon_cxi8",docItemWrapperEnhanced:"docItemWrapperEnhanced_aT5H"};function ie(e){let{currentDocRoute:t,versionMetadata:n,children:l}=e;const{siteConfig:s,isClient:u}=(0,r.A)(),{pluginId:p,version:m}=n,{sidebarName:h,sidebar:b}=function(e){let{versionMetadata:t,currentDocRoute:n}=e;const{permalinkToSidebar:a,docsSidebars:o}=t,r=a[n.path]||a[(l=n.path,l.endsWith("/")?l:`${l}/`)]||a[function(e){return e.endsWith("/")?e.slice(0,-1):e}(n.path)];var l;return{sidebar:o[r],sidebarName:r}}({versionMetadata:n,currentDocRoute:t}),[y,f]=(0,a.useState)(!1),[v,E]=(0,a.useState)(!1),A=(0,a.useCallback)((()=>{v&&E(!1),f(!y)}),[v]);return a.createElement(i.A,{key:u,wrapperClassName:d.GN.wrapper.docPages,pageClassName:d.GN.page.docPage,searchMetadatas:{version:m,tag:(0,d.tU)(p,m)}},a.createElement("div",{className:le.docPage},b&&a.createElement("aside",{className:(0,c.A)(le.docSidebarContainer,{[le.docSidebarContainerHidden]:y}),onTransitionEnd:e=>{e.currentTarget.classList.contains(le.docSidebarContainer)&&y&&E(!0)}},a.createElement(O,{key:h,sidebar:b,path:t.path,sidebarCollapsible:s.themeConfig?.sidebarCollapsible??!0,onCollapse:A,isHidden:v}),v&&a.createElement("div",{className:le.collapsedDocSidebar,title:(0,k.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,k.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:A,onClick:A},a.createElement(g,{className:le.expandSidebarButtonIcon}))),a.createElement("main",{className:(0,c.A)(le.docMainContainer,{[le.docMainContainerEnhanced]:y||!b})},a.createElement("div",{className:(0,c.A)("container padding-top--md padding-bottom--lg",le.docItemWrapper,{[le.docItemWrapperEnhanced]:y})},a.createElement(o.xA,{components:ae},l)))))}const se=function(e){const{route:{routes:t},versionMetadata:n,location:o}=e,r=t.find((e=>(0,re.B6)(o.pathname,e)));return r?a.createElement(ie,{currentDocRoute:r,versionMetadata:n},(0,l.A)(t,{versionMetadata:n})):a.createElement(oe.default,e)}},6287:(e,t,n)=>{"use strict";n.d(t,{e:()=>d,A:()=>u});var a=n(8168),o=n(6540),r=n(53),l=n(4798),i=n(3155);const s="enhancedAnchor_WiXH",c="h1Heading_dC7a",d=function(e){let{...t}=e;return o.createElement("header",null,o.createElement("h1",(0,a.A)({},t,{id:void 0,className:c}),t.children))},u=e=>{return"h1"===e?d:(t=e,function(e){let{id:n,...a}=e;const{navbar:{hideOnScroll:c}}=(0,i.pN)();return n?o.createElement(t,a,o.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:(0,r.A)("anchor",{[s]:!c}),id:n}),a.children,o.createElement("a",{className:"hash-link",href:`#${n}`,title:(0,l.T)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"#")):o.createElement(t,a)});var t}},9090:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>l});var a=n(6540),o=n(204),r=n(4798);const l=function(){return a.createElement(o.A,{title:(0,r.T)({id:"theme.NotFound.title",message:"Page Not Found"})},a.createElement("main",{className:"container margin-vert--xl"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col col--6 col--offset-3"},a.createElement("h1",{className:"hero__title"},a.createElement(r.A,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),a.createElement("p",null,a.createElement(r.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),a.createElement("p",null,a.createElement(r.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."))))))}},8426:(e,t)=>{function n(e){let t,n=[];for(let a of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(a))n.push(parseInt(a,10));else if(t=a.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,a,o,r]=t;if(a&&r){a=parseInt(a),r=parseInt(r);const e=a<r?1:-1;"-"!==o&&".."!==o&&"\u2025"!==o||(r+=e);for(let t=a;t!==r;t+=e)n.push(t)}}return n}t.default=n,e.exports=n}}]);