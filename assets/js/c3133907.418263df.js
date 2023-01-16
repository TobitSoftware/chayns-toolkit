"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[898],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>v});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),m=a,v=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return n?r.createElement(v,i(i({ref:t},p),{},{components:n})):r.createElement(v,i({ref:t},p))}));function v(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9244:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const o={title:"Environment Variables",slug:"env-vars"},i=void 0,l={unversionedId:"features/environment",id:"features/environment",isDocsHomePage:!1,title:"Environment Variables",description:"All system environment variables as well as any variables specified in a",source:"@site/docs/features/environment.md",sourceDirName:"features",slug:"/features/env-vars",permalink:"/chayns-toolkit/docs/features/env-vars",editUrl:"https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/docs/features/environment.md",version:"current",frontMatter:{title:"Environment Variables",slug:"env-vars"},sidebar:"docs",previous:{title:"ESLint",permalink:"/chayns-toolkit/docs/features/eslint"},next:{title:"Dev",permalink:"/chayns-toolkit/docs/commands/dev"}},s=[{value:"Example",id:"example",children:[]},{value:"How to Use It Correctly",id:"how-to-use-it-correctly",children:[]},{value:"Caveats",id:"caveats",children:[]}],c={toc:s};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"All system environment variables as well as any variables specified in a\n",(0,a.kt)("inlineCode",{parentName:"p"},".env.local")," file in the root of your project directory will be available to\nyour code under ",(0,a.kt)("inlineCode",{parentName:"p"},"process.env.VAR_NAME"),"."),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("p",null,"Your ",(0,a.kt)("inlineCode",{parentName:"p"},".env.local")," file would look something like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-env",metastring:'title="/.env.local"',title:'"/.env.local"'},"GOOGLE_MAPS_API_KEY=1bc29b36f623ba82aaf6724fd3b16718\nOTHER_IMPORTANT_API_KEY=ca794fb2d950acf25c964ecc35f2d7e2\n... other values ...\n")),(0,a.kt)("p",null,"These values can be accessed in your code on the ",(0,a.kt)("inlineCode",{parentName:"p"},"process.env")," namespace:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"const API_KEY = process.env.GOOGLE_MAPS_API_KEY\n")),(0,a.kt)("h2",{id:"how-to-use-it-correctly"},"How to Use It Correctly"),(0,a.kt)("p",null,"Keep your ",(0,a.kt)("inlineCode",{parentName:"p"},".env.local")," in your ",(0,a.kt)("inlineCode",{parentName:"p"},".gitignore")," file and not push it to source\ncontrol."),(0,a.kt)("p",null,"Set environment variables in your CI/CD solution (e.g. Vercel, TeamCity)\ndirectly. Here's a guide on how to do that for\n",(0,a.kt)("a",{parentName:"p",href:"https://www.jetbrains.com/help/teamcity/configuring-build-parameters.html"},"TeamCity"),"."),(0,a.kt)("p",null,"If you want your app to behave differently for each build environment, e.g. use\na QA backend when doing QA tests, use an environment variable for it\n(",(0,a.kt)("inlineCode",{parentName:"p"},"BUILD_ENV")," for example). Set a different value for this environment variable\nfor every build environment (",(0,a.kt)("inlineCode",{parentName:"p"},"BUILD_ENV=qa"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"BUILD_ENV=production"),", etc.)."),(0,a.kt)("h2",{id:"caveats"},"Caveats"),(0,a.kt)("p",null,"During compilation, ",(0,a.kt)("inlineCode",{parentName:"p"},"chayns-toolkit")," will look at your source code and look for\nplaces where you access ",(0,a.kt)("inlineCode",{parentName:"p"},"process.env"),". It will then match these places with the\navailable environment variables and do a string replacement if it can find one."),(0,a.kt)("p",null,"In other words this means that you cannot access the variables with any other\nsyntax. Only ",(0,a.kt)("inlineCode",{parentName:"p"},"process.env.VAR_NAME")," will be replaced, but other syntax like\n",(0,a.kt)("inlineCode",{parentName:"p"},"const { VAR_NAME } = process.env")," will not be detected."))}p.isMDXComponent=!0}}]);