"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[459],{5680:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>m});var r=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),u=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=u(e.components);return r.createElement(c.Provider,{value:n},e.children)},s="mdxType",y={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=u(t),g=o,m=s["".concat(c,".").concat(g)]||s[g]||y[g]||i;return t?r.createElement(m,a(a({ref:n},p),{},{components:t})):r.createElement(m,a({ref:n},p))}));function m(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=g;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l[s]="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=t[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},9113:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>a,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=t(8168),o=(t(6540),t(5680));const i={title:"Contributing",slug:"contributing"},a=void 0,l={unversionedId:"contributing",id:"contributing",isDocsHomePage:!1,title:"Contributing",description:"First you should",source:"@site/docs/contributing.md",sourceDirName:".",slug:"/contributing",permalink:"/chayns-toolkit/docs/contributing",editUrl:"https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/docs/contributing.md",version:"current",frontMatter:{title:"Contributing",slug:"contributing"},sidebar:"docs",previous:{title:"Webpack Customization",permalink:"/chayns-toolkit/docs/configuration/webpack-customization"}},c=[{value:"Releasing a new version",id:"releasing-a-new-version",children:[]}],u={toc:c},p="wrapper";function s(e){let{components:n,...t}=e;return(0,o.yg)(p,(0,r.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"First you should\n",(0,o.yg)("a",{parentName:"p",href:"https://github.com/tobitsoftware/chayns-toolkit/fork"},"fork the project")," to your\nown GitHub-Account to be able to commit changes to it."),(0,o.yg)("p",null,"Then clone the forked version to your computer. Install the packages by\nexecuting"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"# Install packages for `chayns-toolkit` project\nnpm i\n\n# Install packages for `example` project\nnpm --prefix example i\n")),(0,o.yg)("p",null,"If you want to test any changes you made with the example project you have to\nbuild ",(0,o.yg)("inlineCode",{parentName:"p"},"chayns-toolkit")," first. For that you can run ",(0,o.yg)("inlineCode",{parentName:"p"},"npm run build")," or let\n",(0,o.yg)("inlineCode",{parentName:"p"},"npm run watch")," run in the background to continously build it."),(0,o.yg)("p",null,"Now you can open a shell in the ",(0,o.yg)("inlineCode",{parentName:"p"},"example/")," directory and use ",(0,o.yg)("inlineCode",{parentName:"p"},"chayns-toolkit"),"\njust like you would on any other project."),(0,o.yg)("h2",{id:"releasing-a-new-version"},"Releasing a new version"),(0,o.yg)("p",null,"If you have enough permissions on GitHub and NPM you can release a new version."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Use ",(0,o.yg)("inlineCode",{parentName:"li"},"npm version (patch|minor|major)")," to increase the version."),(0,o.yg)("li",{parentName:"ol"},"Use ",(0,o.yg)("inlineCode",{parentName:"li"},"npm publish")," to release the new version.")),(0,o.yg)("p",null,"You do not have to build the project beforehand, that will be done pre-publish."))}s.isMDXComponent=!0}}]);