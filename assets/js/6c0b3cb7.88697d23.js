"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[233],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=o.createContext({}),c=function(e){var t=o.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=c(e.components);return o.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),f=c(n),d=r,m=f["".concat(p,".").concat(d)]||f[d]||u[d]||i;return n?o.createElement(m,l(l({ref:t},s),{},{components:n})):o.createElement(m,l({ref:t},s))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=f;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a.mdxType="string"==typeof e?e:r,l[1]=a;for(var c=2;c<i;c++)l[c]=n[c];return o.createElement.apply(null,l)}return o.createElement.apply(null,n)}f.displayName="MDXCreateElement"},2532:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>a,toc:()=>p});var o=n(7462),r=(n(7294),n(3905));const i={title:"Development Options",slug:"development",sidebar_label:"Development"},l=void 0,a={unversionedId:"configuration/development",id:"configuration/development",isDocsHomePage:!1,title:"Development Options",description:"These options configure your development server started with",source:"@site/docs/configuration/development.md",sourceDirName:"configuration",slug:"/configuration/development",permalink:"/chayns-toolkit/docs/configuration/development",editUrl:"https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/docs/configuration/development.md",version:"current",frontMatter:{title:"Development Options",slug:"development",sidebar_label:"Development"},sidebar:"docs",previous:{title:"Test",permalink:"/chayns-toolkit/docs/commands/test"},next:{title:"Output",permalink:"/chayns-toolkit/docs/configuration/output"}},p=[],c={toc:p};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,o.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"These options configure your development server started with\n",(0,r.kt)("inlineCode",{parentName:"p"},"chayns-toolkit dev"),"."),(0,r.kt)("p",null,"All options aswell as the ",(0,r.kt)("inlineCode",{parentName:"p"},"toolkit.config.js")," file itself are optional."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="/toolkit.config.js"',title:'"/toolkit.config.js"'},'module.exports = {\n    development: {\n        /**\n         * The hostname of your development server. Defaults to `localhost` or\n         * `0.0.0.0` if both `cert` and `key` are provided.\n         *\n         * @type {string}\n         */\n        host: "123.0.0.1",\n\n        /**\n         * The port the development server will run on. Defaults to `1234`.\n         *\n         * @type {number}\n         */\n        port: 1337,\n\n        /**\n         * The path to a SSL certificate file for your development server. Not\n         * specified by default.\n         *\n         * @type {string}\n         */\n        cert: "//path/to/ssl/cert",\n\n        /**\n         * The path to a SSL key file for your development server. Not specified\n         * by default.\n         *\n         * @type {string}\n         */\n        key: "//path/to/ssl/key",\n    },\n    // ... other options ...\n}\n')))}s.isMDXComponent=!0}}]);