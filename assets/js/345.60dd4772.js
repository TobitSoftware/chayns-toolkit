"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[345],{4676:(e,t,r)=>{r.d(t,{A:()=>f});var n=r(6540),o=r(4625),a=r(4586),s=r(6654),i=r(8193);const c=(0,n.createContext)({collectLink:()=>{}});var u=r(6025),l=r(440);const f=function(e){let{isNavLink:t,to:r,href:f,activeClassName:d,isActive:p,"data-noBrokenLinkCheck":v,autoAddBaseUrl:g=!0,...h}=e;var y;const{siteConfig:{trailingSlash:m,baseUrl:_}}=(0,a.A)(),{withBaseUrl:b}=(0,u.h)(),w=(0,n.useContext)(c),P=r||f,D=(0,s.A)(P),A=null==P?void 0:P.replace("pathname://","");let E=void 0!==A?(j=A,g&&(e=>e.startsWith("/"))(j)?b(j):j):void 0;var j;E&&D&&(E=(0,l.applyTrailingSlash)(E,{trailingSlash:m,baseUrl:_}));const O=(0,n.useRef)(!1),S=t?o.k2:o.N_,x=i.A.canUseIntersectionObserver;let V;(0,n.useEffect)((()=>(!x&&D&&null!=E&&window.docusaurus.prefetch(E),()=>{x&&V&&V.disconnect()})),[E,x,D]);const k=null!==(y=null==E?void 0:E.startsWith("#"))&&void 0!==y&&y,I=!E||!D||k;return E&&D&&!k&&!v&&w.collectLink(E),I?n.createElement("a",{href:E,...P&&!D&&{target:"_blank",rel:"noopener noreferrer"},...h}):n.createElement(S,{...h,onMouseEnter:()=>{O.current||null==E||(window.docusaurus.preload(E),O.current=!0)},innerRef:e=>{var t,r;x&&e&&D&&(t=e,r=()=>{null!=E&&window.docusaurus.prefetch(E)},V=new window.IntersectionObserver((e=>{e.forEach((e=>{t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(V.unobserve(t),V.disconnect(),r())}))})),V.observe(t))},to:E||"",...t&&{isActive:p,activeClassName:d}})}},4798:(e,t,r)=>{r.d(t,{A:()=>f,T:()=>l});var n=r(6540);const o=/{\w+}/g,a="{}";function s(e,t){const r=[],s=e.replace(o,(e=>{const o=e.substr(1,e.length-2),s=null==t?void 0:t[o];if(void 0!==s){const e=n.isValidElement(s)?s:String(s);return r.push(e),a}return e}));return 0===r.length?e:r.every((e=>"string"==typeof e))?s.split(a).reduce(((e,t,n)=>{var o;return e.concat(t).concat(null!==(o=r[n])&&void 0!==o?o:"")}),""):s.split(a).reduce(((e,t,o)=>[...e,n.createElement(n.Fragment,{key:o},t,r[o])]),[])}function i(e){let{children:t,values:r}=e;return s(t,r)}var c=r(2654);function u(e){let{id:t,message:r}=e;var n;return null!==(n=c[null!=t?t:r])&&void 0!==n?n:r}function l(e,t){let{message:r,id:n}=e;var o;return s(null!==(o=u({message:r,id:n}))&&void 0!==o?o:r,t)}function f(e){let{children:t,id:r,values:o}=e;var a;const s=null!==(a=u({message:t,id:r}))&&void 0!==a?a:t;return n.createElement(i,{values:o},s)}},6654:(e,t,r)=>{function n(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!n(e)}r.d(t,{A:()=>o,z:()=>n})},5567:(e,t,r)=>{r.r(t),r.d(t,{BrowserRouter:()=>n.Kd,HashRouter:()=>n.I9,Link:()=>n.N_,MemoryRouter:()=>n.fS,NavLink:()=>n.k2,Prompt:()=>n.XG,Redirect:()=>n.rd,Route:()=>n.qh,Router:()=>n.Ix,StaticRouter:()=>n.kO,Switch:()=>n.dO,generatePath:()=>n.tW,matchPath:()=>n.B6,useHistory:()=>n.W6,useLocation:()=>n.zy,useParams:()=>n.g,useRouteMatch:()=>n.W5,withRouter:()=>n.y});var n=r(4625)},6025:(e,t,r)=>{r.d(t,{A:()=>s,h:()=>a});var n=r(4586),o=r(6654);function a(){const{siteConfig:{baseUrl:e="/",url:t}={}}=(0,n.A)();return{withBaseUrl:(r,n)=>function(e,t,r,n){let{forcePrependBaseUrl:a=!1,absolute:s=!1}=void 0===n?{}:n;if(!r)return r;if(r.startsWith("#"))return r;if((0,o.z)(r))return r;if(a)return t+r;const i=r.startsWith(t)?r:t+r.replace(/^\//,"");return s?e+i:i}(t,e,r,n)}}function s(e,t){void 0===t&&(t={});const{withBaseUrl:r}=a();return r(e,t)}},6588:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a,useAllPluginInstancesData:()=>s,usePluginData:()=>i});var n=r(4586);const o="default";function a(){const{globalData:e}=(0,n.A)();if(!e)throw new Error("Docusaurus global data not found.");return e}function s(e){const t=a()[e];if(!t)throw new Error(`Docusaurus plugin global data not found for "${e}" plugin.`);return t}function i(e,t){void 0===t&&(t=o);const r=s(e)[t];if(!r)throw new Error(`Docusaurus plugin global data not found for "${e}" plugin with id "${t}".`);return r}},4733:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getDocVersionSuggestions=t.getActiveDocContext=t.getActiveVersion=t.getLatestVersion=t.getActivePlugin=void 0;const n=r(5567);t.getActivePlugin=function(e,t,r){void 0===r&&(r={});const o=Object.entries(e).find((e=>{let[r,o]=e;return!!n.matchPath(t,{path:o.path,exact:!1,strict:!1})})),a=o?{pluginId:o[0],pluginData:o[1]}:void 0;if(!a&&r.failfast)throw new Error(`Can't find active docs plugin for "${t}" pathname, while it was expected to be found. Maybe you tried to use a docs feature that can only be used on a docs-related page? Existing docs plugin paths are: ${Object.values(e).map((e=>e.path)).join(", ")}`);return a};t.getLatestVersion=e=>e.versions.find((e=>e.isLast));t.getActiveVersion=(e,r)=>{const o=t.getLatestVersion(e);return[...e.versions.filter((e=>e!==o)),o].find((e=>!!n.matchPath(r,{path:e.path,exact:!1,strict:!1})))};t.getActiveDocContext=(e,r)=>{const o=t.getActiveVersion(e,r),a=null==o?void 0:o.docs.find((e=>!!n.matchPath(r,{path:e.path,exact:!0,strict:!1})));return{activeVersion:o,activeDoc:a,alternateDocVersions:a?function(t){const r={};return e.versions.forEach((e=>{e.docs.forEach((n=>{n.id===t&&(r[e.name]=n)}))})),r}(a.id):{}}};t.getDocVersionSuggestions=(e,r)=>{const n=t.getLatestVersion(e),o=t.getActiveDocContext(e,r);return{latestDocSuggestion:null==o?void 0:o.alternateDocVersions[n.name],latestVersionSuggestion:n}}},727:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useDocVersionSuggestions=t.useActiveDocContext=t.useActiveVersion=t.useLatestVersion=t.useVersions=t.useActivePluginAndVersion=t.useActivePlugin=t.useDocsData=t.useAllDocsData=void 0;const n=r(1635),o=r(5567),a=n.__importStar(r(6588)),s=r(4733),i={};t.useAllDocsData=()=>{var e;return null!==(e=a.default()["docusaurus-plugin-content-docs"])&&void 0!==e?e:i};t.useDocsData=e=>a.usePluginData("docusaurus-plugin-content-docs",e);t.useActivePlugin=function(e){void 0===e&&(e={});const r=t.useAllDocsData(),{pathname:n}=o.useLocation();return s.getActivePlugin(r,n,e)};t.useActivePluginAndVersion=function(e){void 0===e&&(e={});const r=t.useActivePlugin(e),{pathname:n}=o.useLocation();if(r){return{activePlugin:r,activeVersion:s.getActiveVersion(r.pluginData,n)}}};t.useVersions=e=>t.useDocsData(e).versions;t.useLatestVersion=e=>{const r=t.useDocsData(e);return s.getLatestVersion(r)};t.useActiveVersion=e=>{const r=t.useDocsData(e),{pathname:n}=o.useLocation();return s.getActiveVersion(r,n)};t.useActiveDocContext=e=>{const r=t.useDocsData(e),{pathname:n}=o.useLocation();return s.getActiveDocContext(r,n)};t.useDocVersionSuggestions=e=>{const r=t.useDocsData(e),{pathname:n}=o.useLocation();return s.getDocVersionSuggestions(r,n)}},8139:(e,t,r)=>{r.d(t,{A:()=>i});var n=r(6540),o=r(2602),a=r(3155),s=r(6025);function i(e){let{title:t,description:r,keywords:i,image:c}=e;const{image:u}=(0,a.pN)(),l=(0,a.s$)(t),f=(0,s.A)(c||u,{absolute:!0});return n.createElement(o.A,null,t&&n.createElement("title",null,l),t&&n.createElement("meta",{property:"og:title",content:l}),r&&n.createElement("meta",{name:"description",content:r}),r&&n.createElement("meta",{property:"og:description",content:r}),i&&n.createElement("meta",{name:"keywords",content:Array.isArray(i)?i.join(","):i}),f&&n.createElement("meta",{property:"og:image",content:f}),f&&n.createElement("meta",{name:"twitter:image",content:f}))}},4098:(e,t,r)=>{r.d(t,{Gy:()=>n.useAllDocsData,HW:()=>n.useDocVersionSuggestions,gk:()=>n.useActivePluginAndVersion,ht:()=>n.useDocsData,ir:()=>n.useActiveVersion,jh:()=>n.useVersions,r7:()=>n.useLatestVersion,vT:()=>n.useActivePlugin,zK:()=>n.useActiveDocContext});var n=r(727)},3155:(e,t,r)=>{r.d(t,{oq:()=>K,Cy:()=>g,VQ:()=>R,GN:()=>N,Wf:()=>u,tU:()=>h,ys:()=>_,Eo:()=>l,wt:()=>v,oK:()=>d,Mj:()=>q,g1:()=>M,XK:()=>F,$G:()=>S,Ww:()=>j,ZC:()=>O,pN:()=>o,s$:()=>b});var n=r(4586);function o(){return(0,n.A)().siteConfig.themeConfig}const a="localStorage";function s(e){if(void 0===e&&(e=a),"undefined"==typeof window)throw new Error("Browser storage is not available on Node.js/Docusaurus SSR process.");if("none"===e)return null;try{return window[e]}catch(r){return t=r,i||(console.warn("Docusaurus browser storage is not available.\nPossible reasons: running Docusaurus in an iframe, in an incognito browser session, or using too strict browser privacy settings.",t),i=!0),null}var t}let i=!1;const c={get:()=>null,set:()=>{},del:()=>{}};const u=(e,t)=>{if("undefined"==typeof window)return function(e){function t(){throw new Error(`Illegal storage API usage for storage key "${e}".\nDocusaurus storage APIs are not supposed to be called on the server-rendering process.\nPlease only call storage APIs in effects and event handlers.`)}return{get:t,set:t,del:t}}(e);const r=s(null==t?void 0:t.persistence);return null===r?c:{get:()=>r.getItem(e),set:t=>r.setItem(e,t),del:()=>r.removeItem(e)}};function l(e){void 0===e&&(e=a);const t=s(e);if(!t)return[];const r=[];for(let n=0;n<t.length;n+=1){const e=t.key(n);null!==e&&r.push(e)}return r}var f=r(6347);function d(){const{siteConfig:{baseUrl:e,url:t},i18n:{defaultLocale:r,currentLocale:o}}=(0,n.A)(),{pathname:a}=(0,f.zy)(),s=o===r?e:e.replace(`/${o}/`,"/"),i=a.replace(e,"");return{createUrl:function(e){let{locale:n,fullyQualified:o}=e;return`${o?t:""}${function(e){return e===r?`${s}`:`${s}${e}/`}(n)}${i}`}}}const p=/title=(["'])(.*?)\1/;function v(e){var t,r;return null!==(r=null===(t=null==e?void 0:e.match(p))||void 0===t?void 0:t[2])&&void 0!==r?r:""}const g="default";function h(e,t){return`docs-${e}-${t}`}var y=r(4098);const m=!!y.Gy,_=(e,t)=>{const r=e=>!e||(null==e?void 0:e.endsWith("/"))?e:`${e}/`;return r(e)===r(t)},b=e=>{const{siteConfig:t={}}=(0,n.A)(),{title:r,titleDelimiter:o="|"}=t;return e&&e.trim().length?`${e.trim()} ${o} ${r}`:r};var w=r(6540);const P=["zero","one","two","few","many","other"];function D(e){return P.filter((t=>e.includes(t)))}const A={locale:"en",pluralForms:D(["one","other"]),select:e=>1===e?"one":"other"};function E(){const{i18n:{currentLocale:e}}=(0,n.A)();return(0,w.useMemo)((()=>{if(!Intl.PluralRules)return console.error("Intl.PluralRules not available!\nDocusaurus will fallback to a default/fallback (English) Intl.PluralRules implementation.\n        "),A;try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:D(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to a default/fallback (English) Intl.PluralRules implementation.\n`),A}}),[e])}function j(){const e=E();return{selectMessage:(t,r)=>function(e,t,r){const n=e.split("|");if(1===n.length)return n[0];{n.length>r.pluralForms.length&&console.error(`For locale=${r.locale}, a maximum of ${r.pluralForms.length} plural forms are expected (${r.pluralForms}), but the message contains ${n.length} plural forms: ${e} `);const o=r.select(t),a=r.pluralForms.indexOf(o);return n[Math.min(a,n.length-1)]}}(r,t,e)}}function O(e){const t=(0,w.useRef)();return(0,w.useEffect)((()=>{t.current=e})),t.current}function S(e){const t=(0,f.zy)(),r=O(t),n=(0,w.useRef)(!0);(0,w.useEffect)((()=>{n.current?n.current=!1:e({location:t,previousLocation:r})}),[t])}const x=e=>`docs-preferred-version-${e}`,V={save:(e,t,r)=>{u(x(e),{persistence:t}).set(r)},read:(e,t)=>u(x(e),{persistence:t}).get(),clear:(e,t)=>{u(x(e),{persistence:t}).del()}};function k(e){let{pluginIds:t,versionPersistence:r,allDocsData:n}=e;const o={};return t.forEach((e=>{o[e]=function(e){const t=V.read(e,r);return n[e].versions.some((e=>e.name===t))?{preferredVersionName:t}:(V.clear(e,r),{preferredVersionName:null})}(e)})),o}function I(){const e=(0,y.Gy)(),t=o().docs.versionPersistence,r=(0,w.useMemo)((()=>Object.keys(e)),[e]),[n,a]=(0,w.useState)((()=>function(e){const t={};return e.forEach((e=>{t[e]={preferredVersionName:null}})),t}(r)));(0,w.useEffect)((()=>{a(k({allDocsData:e,versionPersistence:t,pluginIds:r}))}),[e,t,r]);return[n,(0,w.useMemo)((()=>({savePreferredVersion:function(e,r){V.save(e,t,r),a((t=>({...t,[e]:{preferredVersionName:r}})))}})),[a])]}const C=(0,w.createContext)(null);function R(e){let{children:t}=e;return m?w.createElement($,null,t):w.createElement(w.Fragment,null,t)}function $(e){let{children:t}=e;const r=I();return w.createElement(C.Provider,{value:r},t)}function L(){const e=(0,w.useContext)(C);if(!e)throw new Error('Can\'t find docs preferred context, maybe you forgot to use the "DocsPreferredVersionContextProvider"?');return e}const T="default";function M(e){void 0===e&&(e=T);const t=(0,y.ht)(e),[r,n]=L(),{preferredVersionName:o}=r[e];return{preferredVersion:o?t.versions.find((e=>e.name===o)):null,savePreferredVersionName:(0,w.useCallback)((t=>{n.savePreferredVersion(e,t)}),[n])}}function F(){const e=(0,y.Gy)(),[t]=L();const r=Object.keys(e),n={};return r.forEach((r=>{n[r]=function(r){const n=e[r],{preferredVersionName:o}=t[r];return o?n.versions.find((e=>e.name===o)):null}(r)})),n}const N={page:{blogListPage:"blog-list-page",blogPostPage:"blog-post-page",blogTagsListPage:"blog-tags-list-page",blogTagsPostPage:"blog-tags-post-page",docPage:"doc-page",mdxPage:"mdx-page"},wrapper:{main:"main-wrapper",blogPages:"blog-wrapper",docPages:"docs-wrapper",mdxPages:"mdx-wrapper"}},B=u("docusaurus.announcement.dismiss"),W=u("docusaurus.announcement.id"),U=()=>"true"===B.get(),G=e=>B.set(String(e)),z=(0,w.createContext)(null),K=e=>{let{children:t}=e;const r=(()=>{const{announcementBar:e}=o(),{isClient:t}=(0,n.A)(),[r,a]=(0,w.useState)((()=>!!t&&U()));(0,w.useEffect)((()=>{a(U())}),[]);const s=(0,w.useCallback)((()=>{G(!0),a(!0)}),[]);return(0,w.useEffect)((()=>{if(!e)return;const{id:t}=e;let r=W.get();"annoucement-bar"===r&&(r="announcement-bar");const n=t!==r;W.set(t),n&&G(!1),!n&&U()||a(!1)}),[]),(0,w.useMemo)((()=>({isClosed:r,close:s})),[r])})();return w.createElement(z.Provider,{value:r},t)},q=()=>{const e=(0,w.useContext)(z);if(!e)throw new Error("useAnnouncementBar(): AnnouncementBar not found in React context: make sure to use the AnnouncementBarProvider on top of the tree");return e}},2983:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const{trailingSlash:r,baseUrl:n}=t;if(e.startsWith("#"))return e;if(void 0===r)return e;const[o]=e.split(/[#?]/),a="/"===o||o===n?o:(s=o,r?function(e){return e.endsWith("/")?e:`${e}/`}(s):function(e){return e.endsWith("/")?e.slice(0,-1):e}(s));var s;return e.replace(o,a)}},440:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.uniq=t.applyTrailingSlash=void 0;var o=r(2983);Object.defineProperty(t,"applyTrailingSlash",{enumerable:!0,get:function(){return n(o).default}});var a=r(5183);Object.defineProperty(t,"uniq",{enumerable:!0,get:function(){return n(a).default}})},5183:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return Array.from(new Set(e))}},53:(e,t,r)=>{function n(e){var t,r,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(r=n(e[t]))&&(o&&(o+=" "),o+=r);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}r.d(t,{A:()=>o});const o=function(){for(var e,t,r=0,o="";r<arguments.length;)(e=arguments[r++])&&(t=n(e))&&(o&&(o+=" "),o+=t);return o}},1635:(e,t,r)=>{r.r(t),r.d(t,{__addDisposableResource:()=>R,__assign:()=>a,__asyncDelegator:()=>E,__asyncGenerator:()=>A,__asyncValues:()=>j,__await:()=>D,__awaiter:()=>v,__classPrivateFieldGet:()=>k,__classPrivateFieldIn:()=>C,__classPrivateFieldSet:()=>I,__createBinding:()=>h,__decorate:()=>i,__disposeResources:()=>L,__esDecorate:()=>u,__exportStar:()=>y,__extends:()=>o,__generator:()=>g,__importDefault:()=>V,__importStar:()=>x,__makeTemplateObject:()=>O,__metadata:()=>p,__param:()=>c,__propKey:()=>f,__read:()=>_,__rest:()=>s,__rewriteRelativeImportExtension:()=>T,__runInitializers:()=>l,__setFunctionName:()=>d,__spread:()=>b,__spreadArray:()=>P,__spreadArrays:()=>w,__values:()=>m,default:()=>M});var n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)};function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var a=function(){return a=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a.apply(this,arguments)};function s(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r}function i(e,t,r,n){var o,a=arguments.length,s=a<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(s=(a<3?o(s):a>3?o(t,r,s):o(t,r))||s);return a>3&&s&&Object.defineProperty(t,r,s),s}function c(e,t){return function(r,n){t(r,n,e)}}function u(e,t,r,n,o,a){function s(e){if(void 0!==e&&"function"!=typeof e)throw new TypeError("Function expected");return e}for(var i,c=n.kind,u="getter"===c?"get":"setter"===c?"set":"value",l=!t&&e?n.static?e:e.prototype:null,f=t||(l?Object.getOwnPropertyDescriptor(l,n.name):{}),d=!1,p=r.length-1;p>=0;p--){var v={};for(var g in n)v[g]="access"===g?{}:n[g];for(var g in n.access)v.access[g]=n.access[g];v.addInitializer=function(e){if(d)throw new TypeError("Cannot add initializers after decoration has completed");a.push(s(e||null))};var h=(0,r[p])("accessor"===c?{get:f.get,set:f.set}:f[u],v);if("accessor"===c){if(void 0===h)continue;if(null===h||"object"!=typeof h)throw new TypeError("Object expected");(i=s(h.get))&&(f.get=i),(i=s(h.set))&&(f.set=i),(i=s(h.init))&&o.unshift(i)}else(i=s(h))&&("field"===c?o.unshift(i):f[u]=i)}l&&Object.defineProperty(l,n.name,f),d=!0}function l(e,t,r){for(var n=arguments.length>2,o=0;o<t.length;o++)r=n?t[o].call(e,r):t[o].call(e);return n?r:void 0}function f(e){return"symbol"==typeof e?e:"".concat(e)}function d(e,t,r){return"symbol"==typeof t&&(t=t.description?"[".concat(t.description,"]"):""),Object.defineProperty(e,"name",{configurable:!0,value:r?"".concat(r," ",t):t})}function p(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function v(e,t,r,n){return new(r||(r=Promise))((function(o,a){function s(e){try{c(n.next(e))}catch(t){a(t)}}function i(e){try{c(n.throw(e))}catch(t){a(t)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,i)}c((n=n.apply(e,t||[])).next())}))}function g(e,t){var r,n,o,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]},s=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return s.next=i(0),s.throw=i(1),s.return=i(2),"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s&&(s=0,i[0]&&(a=0)),a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(c){i=[6,c],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}var h=Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]};function y(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||h(t,e,r)}function m(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function _(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,a=r.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(n=a.next()).done;)s.push(n.value)}catch(i){o={error:i}}finally{try{n&&!n.done&&(r=a.return)&&r.call(a)}finally{if(o)throw o.error}}return s}function b(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(_(arguments[t]));return e}function w(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),o=0;for(t=0;t<r;t++)for(var a=arguments[t],s=0,i=a.length;s<i;s++,o++)n[o]=a[s];return n}function P(e,t,r){if(r||2===arguments.length)for(var n,o=0,a=t.length;o<a;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))}function D(e){return this instanceof D?(this.v=e,this):new D(e)}function A(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,o=r.apply(e,t||[]),a=[];return n=Object.create(("function"==typeof AsyncIterator?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",(function(e){return function(t){return Promise.resolve(t).then(e,u)}})),n[Symbol.asyncIterator]=function(){return this},n;function s(e,t){o[e]&&(n[e]=function(t){return new Promise((function(r,n){a.push([e,t,r,n])>1||i(e,t)}))},t&&(n[e]=t(n[e])))}function i(e,t){try{(r=o[e](t)).value instanceof D?Promise.resolve(r.value.v).then(c,u):l(a[0][2],r)}catch(n){l(a[0][3],n)}var r}function c(e){i("next",e)}function u(e){i("throw",e)}function l(e,t){e(t),a.shift(),a.length&&i(a[0][0],a[0][1])}}function E(e){var t,r;return t={},n("next"),n("throw",(function(e){throw e})),n("return"),t[Symbol.iterator]=function(){return this},t;function n(n,o){t[n]=e[n]?function(t){return(r=!r)?{value:D(e[n](t)),done:!1}:o?o(t):t}:o}}function j(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=m(e),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(r){t[r]=e[r]&&function(t){return new Promise((function(n,o){(function(e,t,r,n){Promise.resolve(n).then((function(t){e({value:t,done:r})}),t)})(n,o,(t=e[r](t)).done,t.value)}))}}}function O(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var S=Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t};function x(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&h(t,e,r);return S(t,e),t}function V(e){return e&&e.__esModule?e:{default:e}}function k(e,t,r,n){if("a"===r&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===r?n:"a"===r?n.call(e):n?n.value:t.get(e)}function I(e,t,r,n,o){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!o:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?o.call(e,r):o?o.value=r:t.set(e,r),r}function C(e,t){if(null===t||"object"!=typeof t&&"function"!=typeof t)throw new TypeError("Cannot use 'in' operator on non-object");return"function"==typeof e?t===e:e.has(t)}function R(e,t,r){if(null!=t){if("object"!=typeof t&&"function"!=typeof t)throw new TypeError("Object expected.");var n,o;if(r){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");n=t[Symbol.asyncDispose]}if(void 0===n){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");n=t[Symbol.dispose],r&&(o=n)}if("function"!=typeof n)throw new TypeError("Object not disposable.");o&&(n=function(){try{o.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:n,async:r})}else r&&e.stack.push({async:!0});return t}var $="function"==typeof SuppressedError?SuppressedError:function(e,t,r){var n=new Error(r);return n.name="SuppressedError",n.error=e,n.suppressed=t,n};function L(e){function t(t){e.error=e.hasError?new $(t,e.error,"An error was suppressed during disposal."):t,e.hasError=!0}var r,n=0;return function o(){for(;r=e.stack.pop();)try{if(!r.async&&1===n)return n=0,e.stack.push(r),Promise.resolve().then(o);if(r.dispose){var a=r.dispose.call(r.value);if(r.async)return n|=2,Promise.resolve(a).then(o,(function(e){return t(e),o()}))}else n|=1}catch(s){t(s)}if(1===n)return e.hasError?Promise.reject(e.error):Promise.resolve();if(e.hasError)throw e.error}()}function T(e,t){return"string"==typeof e&&/^\.\.?\//.test(e)?e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,(function(e,r,n,o,a){return r?t?".jsx":".js":!n||o&&a?n+o+"."+a.toLowerCase()+"js":e})):e}const M={__extends:o,__assign:a,__rest:s,__decorate:i,__param:c,__esDecorate:u,__runInitializers:l,__propKey:f,__setFunctionName:d,__metadata:p,__awaiter:v,__generator:g,__createBinding:h,__exportStar:y,__values:m,__read:_,__spread:b,__spreadArrays:w,__spreadArray:P,__await:D,__asyncGenerator:A,__asyncDelegator:E,__asyncValues:j,__makeTemplateObject:O,__importStar:x,__importDefault:V,__classPrivateFieldGet:k,__classPrivateFieldSet:I,__classPrivateFieldIn:C,__addDisposableResource:R,__disposeResources:L,__rewriteRelativeImportExtension:T}}}]);