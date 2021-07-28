"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[724],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return u}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),d=s(n),u=a,f=d["".concat(c,".").concat(u)]||d[u]||p[u]||o;return n?r.createElement(f,i(i({ref:t},m),{},{components:n})):r.createElement(f,i({ref:t},m))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2912:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return m},default:function(){return d}});var r=n(2122),a=n(9756),o=(n(7294),n(3905)),i=["components"],l={title:"Dev Command",slug:"dev",sidebar_label:"Dev"},c=void 0,s={unversionedId:"commands/dev",id:"commands/dev",isDocsHomePage:!1,title:"Dev Command",description:"`bash",source:"@site/docs/commands/dev.md",sourceDirName:"commands",slug:"/commands/dev",permalink:"/chayns-toolkit/docs/commands/dev",editUrl:"https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/docs/commands/dev.md",version:"current",frontMatter:{title:"Dev Command",slug:"dev",sidebar_label:"Dev"},sidebar:"docs",previous:{title:"Environment Variables",permalink:"/chayns-toolkit/docs/features/env-vars"},next:{title:"Build",permalink:"/chayns-toolkit/docs/commands/build"}},m=[{value:"Parameters",id:"parameters",children:[]}],p={toc:m};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"chayns-toolkit dev\n")),(0,o.kt)("p",null,"Starts a development server on\n",(0,o.kt)("a",{parentName:"p",href:"http://localhost:1234/"},(0,o.kt)("inlineCode",{parentName:"a"},"http://localhost:1234/"))," or\n",(0,o.kt)("a",{parentName:"p",href:"https://0.0.0.0:1234/"},(0,o.kt)("inlineCode",{parentName:"a"},"https://0.0.0.0:1234/"))," if SSL certificates are\nconfigured."),(0,o.kt)("p",null,"Fast Refresh is automatically enabled, so you can make edits to your project and\nsee them in real time."),(0,o.kt)("p",null,"You can configure SSL certificates, host and port in the ",(0,o.kt)("inlineCode",{parentName:"p"},"toolkit.config.js"),"\nconfiguration file:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'{3,4,5,6} title="/toolkit.config.js"',"{3,4,5,6}":!0,title:'"/toolkit.config.js"'},'module.exports = {\n    development: {\n        host: "123.4.5.6",\n        port: 1337,\n        cert: "/path/to/cert.crt",\n        key: "/path/to/key.key",\n    },\n    // ...\n}\n')),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"To achieve faster (re-)build times during development this command only\ntranspiles your code to work with the latest versions of Chrome, Safari and\nFirefox."))),(0,o.kt)("h2",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Parameters"),(0,o.kt)("th",{parentName:"tr",align:null},"Function"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"-d"),", ",(0,o.kt)("inlineCode",{parentName:"td"},"--devtools")),(0,o.kt)("td",{parentName:"tr",align:null},"Debug your application with the standalone React Devtools. ",(0,o.kt)("a",{parentName:"td",href:"../features/devtools"},"Read more"))))))}d.isMDXComponent=!0}}]);