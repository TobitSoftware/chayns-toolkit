"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[486],{6742:(e,t,n)=>{n.d(t,{Z:()=>f});var r=n(7294),o=n(3727),a=n(2263),i=n(3919),s=n(412);const u=(0,r.createContext)({collectLink:()=>{}});var c=n(4996),l=n(8780);const f=function(e){let{isNavLink:t,to:n,href:f,activeClassName:d,isActive:p,"data-noBrokenLinkCheck":v,autoAddBaseUrl:g=!0,...h}=e;var m;const{siteConfig:{trailingSlash:y,baseUrl:b}}=(0,a.Z)(),{withBaseUrl:w}=(0,c.C)(),P=(0,r.useContext)(u),_=n||f,D=(0,i.Z)(_),A=null==_?void 0:_.replace("pathname://","");let E=void 0!==A?(O=A,g&&(e=>e.startsWith("/"))(O)?w(O):O):void 0;var O;E&&D&&(E=(0,l.applyTrailingSlash)(E,{trailingSlash:y,baseUrl:b}));const S=(0,r.useRef)(!1),V=t?o.OL:o.rU,x=s.Z.canUseIntersectionObserver;let j;(0,r.useEffect)((()=>(!x&&D&&null!=E&&window.docusaurus.prefetch(E),()=>{x&&j&&j.disconnect()})),[E,x,D]);const C=null!==(m=null==E?void 0:E.startsWith("#"))&&void 0!==m&&m,L=!E||!D||C;return E&&D&&!C&&!v&&P.collectLink(E),L?r.createElement("a",{href:E,..._&&!D&&{target:"_blank",rel:"noopener noreferrer"},...h}):r.createElement(V,{...h,onMouseEnter:()=>{S.current||null==E||(window.docusaurus.preload(E),S.current=!0)},innerRef:e=>{var t,n;x&&e&&D&&(t=e,n=()=>{null!=E&&window.docusaurus.prefetch(E)},j=new window.IntersectionObserver((e=>{e.forEach((e=>{t===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(j.unobserve(t),j.disconnect(),n())}))})),j.observe(t))},to:E||"",...t&&{isActive:p,activeClassName:d}})}},4973:(e,t,n)=>{n.d(t,{Z:()=>f,I:()=>l});var r=n(7294);const o=/{\w+}/g,a="{}";function i(e,t){const n=[],i=e.replace(o,(e=>{const o=e.substr(1,e.length-2),i=null==t?void 0:t[o];if(void 0!==i){const e=r.isValidElement(i)?i:String(i);return n.push(e),a}return e}));return 0===n.length?e:n.every((e=>"string"==typeof e))?i.split(a).reduce(((e,t,r)=>{var o;return e.concat(t).concat(null!==(o=n[r])&&void 0!==o?o:"")}),""):i.split(a).reduce(((e,t,o)=>[...e,r.createElement(r.Fragment,{key:o},t,n[o])]),[])}function s(e){let{children:t,values:n}=e;return i(t,n)}var u=n(7529);function c(e){let{id:t,message:n}=e;var r;return null!==(r=u[null!=t?t:n])&&void 0!==r?r:n}function l(e,t){let{message:n,id:r}=e;var o;return i(null!==(o=c({message:n,id:r}))&&void 0!==o?o:n,t)}function f(e){let{children:t,id:n,values:o}=e;var a;const i=null!==(a=c({message:t,id:n}))&&void 0!==a?a:t;return r.createElement(s,{values:o},i)}},3919:(e,t,n)=>{function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!r(e)}n.d(t,{Z:()=>o,b:()=>r})},8143:(e,t,n)=>{n.r(t),n.d(t,{BrowserRouter:()=>r.VK,HashRouter:()=>r.UT,Link:()=>r.rU,MemoryRouter:()=>r.VA,NavLink:()=>r.OL,Prompt:()=>r.NL,Redirect:()=>r.l_,Route:()=>r.AW,Router:()=>r.F0,StaticRouter:()=>r.gx,Switch:()=>r.rs,generatePath:()=>r.Gn,matchPath:()=>r.LX,useHistory:()=>r.k6,useLocation:()=>r.TH,useParams:()=>r.UO,useRouteMatch:()=>r.$B,withRouter:()=>r.EN});var r=n(3727)},4996:(e,t,n)=>{n.d(t,{C:()=>a,Z:()=>i});var r=n(2263),o=n(3919);function a(){const{siteConfig:{baseUrl:e="/",url:t}={}}=(0,r.Z)();return{withBaseUrl:(n,r)=>function(e,t,n,r){let{forcePrependBaseUrl:a=!1,absolute:i=!1}=void 0===r?{}:r;if(!n)return n;if(n.startsWith("#"))return n;if((0,o.b)(n))return n;if(a)return t+n;const s=n.startsWith(t)?n:t+n.replace(/^\//,"");return i?e+s:s}(t,e,n,r)}}function i(e,t){void 0===t&&(t={});const{withBaseUrl:n}=a();return n(e,t)}},8084:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o,useAllPluginInstancesData:()=>a,usePluginData:()=>i});var r=n(2263);function o(){const{globalData:e}=(0,r.Z)();if(!e)throw new Error("Docusaurus global data not found.");return e}function a(e){const t=o()[e];if(!t)throw new Error(`Docusaurus plugin global data not found for "${e}" plugin.`);return t}function i(e,t){void 0===t&&(t="default");const n=a(e)[t];if(!n)throw new Error(`Docusaurus plugin global data not found for "${e}" plugin with id "${t}".`);return n}},8408:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getDocVersionSuggestions=t.getActiveDocContext=t.getActiveVersion=t.getLatestVersion=t.getActivePlugin=void 0;const r=n(8143);t.getActivePlugin=function(e,t,n){void 0===n&&(n={});const o=Object.entries(e).find((e=>{let[n,o]=e;return!!r.matchPath(t,{path:o.path,exact:!1,strict:!1})})),a=o?{pluginId:o[0],pluginData:o[1]}:void 0;if(!a&&n.failfast)throw new Error(`Can't find active docs plugin for "${t}" pathname, while it was expected to be found. Maybe you tried to use a docs feature that can only be used on a docs-related page? Existing docs plugin paths are: ${Object.values(e).map((e=>e.path)).join(", ")}`);return a};t.getLatestVersion=e=>e.versions.find((e=>e.isLast));t.getActiveVersion=(e,n)=>{const o=t.getLatestVersion(e);return[...e.versions.filter((e=>e!==o)),o].find((e=>!!r.matchPath(n,{path:e.path,exact:!1,strict:!1})))};t.getActiveDocContext=(e,n)=>{const o=t.getActiveVersion(e,n),a=null==o?void 0:o.docs.find((e=>!!r.matchPath(n,{path:e.path,exact:!0,strict:!1})));return{activeVersion:o,activeDoc:a,alternateDocVersions:a?function(t){const n={};return e.versions.forEach((e=>{e.docs.forEach((r=>{r.id===t&&(n[e.name]=r)}))})),n}(a.id):{}}};t.getDocVersionSuggestions=(e,n)=>{const r=t.getLatestVersion(e),o=t.getActiveDocContext(e,n);return{latestDocSuggestion:null==o?void 0:o.alternateDocVersions[r.name],latestVersionSuggestion:r}}},6730:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.useDocVersionSuggestions=t.useActiveDocContext=t.useActiveVersion=t.useLatestVersion=t.useVersions=t.useActivePluginAndVersion=t.useActivePlugin=t.useDocsData=t.useAllDocsData=void 0;const r=n(655),o=n(8143),a=r.__importStar(n(8084)),i=n(8408),s={};t.useAllDocsData=()=>{var e;return null!==(e=a.default()["docusaurus-plugin-content-docs"])&&void 0!==e?e:s};t.useDocsData=e=>a.usePluginData("docusaurus-plugin-content-docs",e);t.useActivePlugin=function(e){void 0===e&&(e={});const n=t.useAllDocsData(),{pathname:r}=o.useLocation();return i.getActivePlugin(n,r,e)};t.useActivePluginAndVersion=function(e){void 0===e&&(e={});const n=t.useActivePlugin(e),{pathname:r}=o.useLocation();if(n){return{activePlugin:n,activeVersion:i.getActiveVersion(n.pluginData,r)}}};t.useVersions=e=>t.useDocsData(e).versions;t.useLatestVersion=e=>{const n=t.useDocsData(e);return i.getLatestVersion(n)};t.useActiveVersion=e=>{const n=t.useDocsData(e),{pathname:r}=o.useLocation();return i.getActiveVersion(n,r)};t.useActiveDocContext=e=>{const n=t.useDocsData(e),{pathname:r}=o.useLocation();return i.getActiveDocContext(n,r)};t.useDocVersionSuggestions=e=>{const n=t.useDocsData(e),{pathname:r}=o.useLocation();return i.getDocVersionSuggestions(n,r)}},1217:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(7294),o=n(9105),a=n(9306),i=n(4996);function s(e){let{title:t,description:n,keywords:s,image:u}=e;const{image:c}=(0,a.LU)(),l=(0,a.pe)(t),f=(0,i.Z)(u||c,{absolute:!0});return r.createElement(o.Z,null,t&&r.createElement("title",null,l),t&&r.createElement("meta",{property:"og:title",content:l}),n&&r.createElement("meta",{name:"description",content:n}),n&&r.createElement("meta",{property:"og:description",content:n}),s&&r.createElement("meta",{name:"keywords",content:Array.isArray(s)?s.join(","):s}),f&&r.createElement("meta",{property:"og:image",content:f}),f&&r.createElement("meta",{name:"twitter:image",content:f}))}},907:(e,t,n)=>{n.d(t,{Iw:()=>r.useActiveDocContext,Jo:()=>r.useDocVersionSuggestions,WS:()=>r.useActivePluginAndVersion,_r:()=>r.useAllDocsData,gA:()=>r.useActivePlugin,gB:()=>r.useVersions,yW:()=>r.useLatestVersion,zh:()=>r.useDocsData,zu:()=>r.useActiveVersion});var r=n(6730)},9306:(e,t,n)=>{n.d(t,{pl:()=>H,HX:()=>g,L5:()=>I,kM:()=>U,WA:()=>c,os:()=>h,Mg:()=>b,_f:()=>l,bc:()=>v,l5:()=>d,nT:()=>z,J:()=>T,Oh:()=>M,SL:()=>V,c2:()=>O,D9:()=>S,LU:()=>o,pe:()=>w});var r=n(2263);function o(){return(0,r.Z)().siteConfig.themeConfig}const a="localStorage";function i(e){if(void 0===e&&(e=a),"undefined"==typeof window)throw new Error("Browser storage is not available on Node.js/Docusaurus SSR process.");if("none"===e)return null;try{return window[e]}catch(n){return t=n,s||(console.warn("Docusaurus browser storage is not available.\nPossible reasons: running Docusaurus in an iframe, in an incognito browser session, or using too strict browser privacy settings.",t),s=!0),null}var t}let s=!1;const u={get:()=>null,set:()=>{},del:()=>{}};const c=(e,t)=>{if("undefined"==typeof window)return function(e){function t(){throw new Error(`Illegal storage API usage for storage key "${e}".\nDocusaurus storage APIs are not supposed to be called on the server-rendering process.\nPlease only call storage APIs in effects and event handlers.`)}return{get:t,set:t,del:t}}(e);const n=i(null==t?void 0:t.persistence);return null===n?u:{get:()=>n.getItem(e),set:t=>n.setItem(e,t),del:()=>n.removeItem(e)}};function l(e){void 0===e&&(e=a);const t=i(e);if(!t)return[];const n=[];for(let r=0;r<t.length;r+=1){const e=t.key(r);null!==e&&n.push(e)}return n}var f=n(6550);function d(){const{siteConfig:{baseUrl:e,url:t},i18n:{defaultLocale:n,currentLocale:o}}=(0,r.Z)(),{pathname:a}=(0,f.TH)(),i=o===n?e:e.replace(`/${o}/`,"/"),s=a.replace(e,"");return{createUrl:function(e){let{locale:r,fullyQualified:o}=e;return`${o?t:""}${function(e){return e===n?`${i}`:`${i}${e}/`}(r)}${s}`}}}const p=/title=(["'])(.*?)\1/;function v(e){var t,n;return null!==(n=null===(t=null==e?void 0:e.match(p))||void 0===t?void 0:t[2])&&void 0!==n?n:""}const g="default";function h(e,t){return`docs-${e}-${t}`}var m=n(907);const y=!!m._r,b=(e,t)=>{const n=e=>!e||(null==e?void 0:e.endsWith("/"))?e:`${e}/`;return n(e)===n(t)},w=e=>{const{siteConfig:t={}}=(0,r.Z)(),{title:n,titleDelimiter:o="|"}=t;return e&&e.trim().length?`${e.trim()} ${o} ${n}`:n};var P=n(7294);const _=["zero","one","two","few","many","other"];function D(e){return _.filter((t=>e.includes(t)))}const A={locale:"en",pluralForms:D(["one","other"]),select:e=>1===e?"one":"other"};function E(){const{i18n:{currentLocale:e}}=(0,r.Z)();return(0,P.useMemo)((()=>{if(!Intl.PluralRules)return console.error("Intl.PluralRules not available!\nDocusaurus will fallback to a default/fallback (English) Intl.PluralRules implementation.\n        "),A;try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:D(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to a default/fallback (English) Intl.PluralRules implementation.\n`),A}}),[e])}function O(){const e=E();return{selectMessage:(t,n)=>function(e,t,n){const r=e.split("|");if(1===r.length)return r[0];{r.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms}), but the message contains ${r.length} plural forms: ${e} `);const o=n.select(t),a=n.pluralForms.indexOf(o);return r[Math.min(a,r.length-1)]}}(n,t,e)}}function S(e){const t=(0,P.useRef)();return(0,P.useEffect)((()=>{t.current=e})),t.current}function V(e){const t=(0,f.TH)(),n=S(t),r=(0,P.useRef)(!0);(0,P.useEffect)((()=>{r.current?r.current=!1:e({location:t,previousLocation:n})}),[t])}const x=e=>`docs-preferred-version-${e}`,j={save:(e,t,n)=>{c(x(e),{persistence:t}).set(n)},read:(e,t)=>c(x(e),{persistence:t}).get(),clear:(e,t)=>{c(x(e),{persistence:t}).del()}};function C(e){let{pluginIds:t,versionPersistence:n,allDocsData:r}=e;const o={};return t.forEach((e=>{o[e]=function(e){const t=j.read(e,n);return r[e].versions.some((e=>e.name===t))?{preferredVersionName:t}:(j.clear(e,n),{preferredVersionName:null})}(e)})),o}function L(){const e=(0,m._r)(),t=o().docs.versionPersistence,n=(0,P.useMemo)((()=>Object.keys(e)),[e]),[r,a]=(0,P.useState)((()=>function(e){const t={};return e.forEach((e=>{t[e]={preferredVersionName:null}})),t}(n)));(0,P.useEffect)((()=>{a(C({allDocsData:e,versionPersistence:t,pluginIds:n}))}),[e,t,n]);return[r,(0,P.useMemo)((()=>({savePreferredVersion:function(e,n){j.save(e,t,n),a((t=>({...t,[e]:{preferredVersionName:n}})))}})),[a])]}const k=(0,P.createContext)(null);function I(e){let{children:t}=e;return y?P.createElement(R,null,t):P.createElement(P.Fragment,null,t)}function R(e){let{children:t}=e;const n=L();return P.createElement(k.Provider,{value:n},t)}function $(){const e=(0,P.useContext)(k);if(!e)throw new Error('Can\'t find docs preferred context, maybe you forgot to use the "DocsPreferredVersionContextProvider"?');return e}function T(e){void 0===e&&(e="default");const t=(0,m.zh)(e),[n,r]=$(),{preferredVersionName:o}=n[e];return{preferredVersion:o?t.versions.find((e=>e.name===o)):null,savePreferredVersionName:(0,P.useCallback)((t=>{r.savePreferredVersion(e,t)}),[r])}}function M(){const e=(0,m._r)(),[t]=$();const n=Object.keys(e),r={};return n.forEach((n=>{r[n]=function(n){const r=e[n],{preferredVersionName:o}=t[n];return o?r.versions.find((e=>e.name===o)):null}(n)})),r}const U={page:{blogListPage:"blog-list-page",blogPostPage:"blog-post-page",blogTagsListPage:"blog-tags-list-page",blogTagsPostPage:"blog-tags-post-page",docPage:"doc-page",mdxPage:"mdx-page"},wrapper:{main:"main-wrapper",blogPages:"blog-wrapper",docPages:"docs-wrapper",mdxPages:"mdx-wrapper"}},Z=c("docusaurus.announcement.dismiss"),B=c("docusaurus.announcement.id"),F=()=>"true"===Z.get(),N=e=>Z.set(String(e)),W=(0,P.createContext)(null),H=e=>{let{children:t}=e;const n=(()=>{const{announcementBar:e}=o(),{isClient:t}=(0,r.Z)(),[n,a]=(0,P.useState)((()=>!!t&&F()));(0,P.useEffect)((()=>{a(F())}),[]);const i=(0,P.useCallback)((()=>{N(!0),a(!0)}),[]);return(0,P.useEffect)((()=>{if(!e)return;const{id:t}=e;let n=B.get();"annoucement-bar"===n&&(n="announcement-bar");const r=t!==n;B.set(t),r&&N(!1),!r&&F()||a(!1)}),[]),(0,P.useMemo)((()=>({isClosed:n,close:i})),[n])})();return P.createElement(W.Provider,{value:n},t)},z=()=>{const e=(0,P.useContext)(W);if(!e)throw new Error("useAnnouncementBar(): AnnouncementBar not found in React context: make sure to use the AnnouncementBarProvider on top of the tree");return e}},8802:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const{trailingSlash:n,baseUrl:r}=t;if(e.startsWith("#"))return e;if(void 0===n)return e;const[o]=e.split(/[#?]/),a="/"===o||o===r?o:(i=o,n?function(e){return e.endsWith("/")?e:`${e}/`}(i):function(e){return e.endsWith("/")?e.slice(0,-1):e}(i));var i;return e.replace(o,a)}},8780:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.uniq=t.applyTrailingSlash=void 0;var o=n(8802);Object.defineProperty(t,"applyTrailingSlash",{enumerable:!0,get:function(){return r(o).default}});var a=n(9964);Object.defineProperty(t,"uniq",{enumerable:!0,get:function(){return r(a).default}})},9964:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return Array.from(new Set(e))}},6010:(e,t,n)=>{function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}n.d(t,{Z:()=>o});const o=function(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}},655:(e,t,n)=>{n.r(t),n.d(t,{__assign:()=>a,__asyncDelegator:()=>P,__asyncGenerator:()=>w,__asyncValues:()=>_,__await:()=>b,__awaiter:()=>l,__classPrivateFieldGet:()=>S,__classPrivateFieldIn:()=>x,__classPrivateFieldSet:()=>V,__createBinding:()=>d,__decorate:()=>s,__exportStar:()=>p,__extends:()=>o,__generator:()=>f,__importDefault:()=>O,__importStar:()=>E,__makeTemplateObject:()=>D,__metadata:()=>c,__param:()=>u,__read:()=>g,__rest:()=>i,__spread:()=>h,__spreadArray:()=>y,__spreadArrays:()=>m,__values:()=>v});var r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)};function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var a=function(){return a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a.apply(this,arguments)};function i(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}function s(e,t,n,r){var o,a=arguments.length,i=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(i=(a<3?o(i):a>3?o(t,n,i):o(t,n))||i);return a>3&&i&&Object.defineProperty(t,n,i),i}function u(e,t){return function(n,r){t(n,r,e)}}function c(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function l(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{u(r.next(e))}catch(t){a(t)}}function s(e){try{u(r.throw(e))}catch(t){a(t)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,s)}u((r=r.apply(e,t||[])).next())}))}function f(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(u){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(u){s=[6,u],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,u])}}}var d=Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]};function p(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||d(t,e,n)}function v(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function g(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(s){o={error:s}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i}function h(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(g(arguments[t]));return e}function m(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var a=arguments[t],i=0,s=a.length;i<s;i++,o++)r[o]=a[i];return r}function y(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}function b(e){return this instanceof b?(this.v=e,this):new b(e)}function w(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=n.apply(e,t||[]),a=[];return r={},i("next"),i("throw"),i("return"),r[Symbol.asyncIterator]=function(){return this},r;function i(e){o[e]&&(r[e]=function(t){return new Promise((function(n,r){a.push([e,t,n,r])>1||s(e,t)}))})}function s(e,t){try{(n=o[e](t)).value instanceof b?Promise.resolve(n.value.v).then(u,c):l(a[0][2],n)}catch(r){l(a[0][3],r)}var n}function u(e){s("next",e)}function c(e){s("throw",e)}function l(e,t){e(t),a.shift(),a.length&&s(a[0][0],a[0][1])}}function P(e){var t,n;return t={},r("next"),r("throw",(function(e){throw e})),r("return"),t[Symbol.iterator]=function(){return this},t;function r(r,o){t[r]=e[r]?function(t){return(n=!n)?{value:b(e[r](t)),done:"return"===r}:o?o(t):t}:o}}function _(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e=v(e),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,o){(function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)})(r,o,(t=e[n](t)).done,t.value)}))}}}function D(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var A=Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t};function E(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&d(t,e,n);return A(t,e),t}function O(e){return e&&e.__esModule?e:{default:e}}function S(e,t,n,r){if("a"===n&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!r:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?r:"a"===n?r.call(e):r?r.value:t.get(e)}function V(e,t,n,r,o){if("m"===r)throw new TypeError("Private method is not writable");if("a"===r&&!o)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!o:!t.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?o.call(e,n):o?o.value=n:t.set(e,n),n}function x(e,t){if(null===t||"object"!=typeof t&&"function"!=typeof t)throw new TypeError("Cannot use 'in' operator on non-object");return"function"==typeof e?t===e:e.has(t)}}}]);