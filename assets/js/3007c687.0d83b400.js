(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{78:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return p})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return l}));var a=n(3),r=n(7),o=(n(0),n(95)),i={title:"TypeScript Support",slug:"typescript"},p={unversionedId:"features/typescript",id:"features/typescript",isDocsHomePage:!1,title:"TypeScript Support",description:"TypeScript is fully supported out of the box and can be enabled in a breeze.",source:"@site/docs/features/typescript.md",slug:"/features/typescript",permalink:"/docs/features/typescript",editUrl:"https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/docs/features/typescript.md",version:"current",sidebar:"docs",previous:{title:"Getting Started",permalink:"/docs/"},next:{title:"CSS & Sass Support",permalink:"/docs/features/css"}},c=[{value:"Getting Started",id:"getting-started",children:[]},{value:"Caveats",id:"caveats",children:[]},{value:"Support for custom path aliases",id:"support-for-custom-path-aliases",children:[]}],s={toc:c};function l(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"TypeScript is fully supported out of the box and can be enabled in a breeze."),Object(o.b)("h2",{id:"getting-started"},"Getting Started"),Object(o.b)("p",null,"To start using TypeScript in your project, create a ",Object(o.b)("inlineCode",{parentName:"p"},"tsconfig.json")," file in the\nroot of your project."),Object(o.b)("p",null,"The next time you start the ",Object(o.b)("inlineCode",{parentName:"p"},"chayns-toolkit dev")," command, we will automatically\npopulate the ",Object(o.b)("inlineCode",{parentName:"p"},"tsconfig.json"),"-file with our recommended configuration."),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"Even though you can use ",Object(o.b)("inlineCode",{parentName:"p"},".ts")," or ",Object(o.b)("inlineCode",{parentName:"p"},".tsx")," files without a ",Object(o.b)("inlineCode",{parentName:"p"},"tsconfig.json")," it is\nhighly recommended to set it up. This will give you better editor support and\nESLint warnings."))),Object(o.b)("p",null,"\ud83c\udf89 ",Object(o.b)("strong",{parentName:"p"},"Congrats!")," You are now ready to use TypeScript in your ",Object(o.b)("inlineCode",{parentName:"p"},".ts")," and ",Object(o.b)("inlineCode",{parentName:"p"},".tsx"),"\nfiles!"),Object(o.b)("h2",{id:"caveats"},"Caveats"),Object(o.b)("p",null,"The TypeScript transpilation is done by Babel with\n",Object(o.b)("a",{parentName:"p",href:"https://babeljs.io/docs/en/babel-preset-typescript"},Object(o.b)("inlineCode",{parentName:"a"},"@babel/preset-typescript")),".\nThis has some caveats, mainly not being able to use these features:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"const enum")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"export =")," and ",Object(o.b)("inlineCode",{parentName:"li"},"import =")),Object(o.b)("li",{parentName:"ul"},"TypeScript namespaces")),Object(o.b)("p",null,"The automatically generated ",Object(o.b)("inlineCode",{parentName:"p"},"tsconfig.json")," includes the\n",Object(o.b)("inlineCode",{parentName:"p"},'"isolatedModules": true')," option in the TypeScript compiler options so you will\nget warned when using these unsupported features."),Object(o.b)("p",null,'Refer to the "Caveats" section in the\n',Object(o.b)("a",{parentName:"p",href:"https://babeljs.io/docs/en/babel-plugin-transform-typescript#caveats"},"Babel documentation"),"\nfor more information."),Object(o.b)("h2",{id:"support-for-custom-path-aliases"},"Support for custom path aliases"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"chayns-toolkit")," supports the ",Object(o.b)("inlineCode",{parentName:"p"},"paths")," and ",Object(o.b)("inlineCode",{parentName:"p"},"baseUrl")," options from ",Object(o.b)("inlineCode",{parentName:"p"},"tsconfig.json"),"\nor ",Object(o.b)("inlineCode",{parentName:"p"},"jsconfig.json")," to create more readable paths."),Object(o.b)("p",null,"You can set the ",Object(o.b)("inlineCode",{parentName:"p"},"baseUrl")," like so in your ",Object(o.b)("inlineCode",{parentName:"p"},"tsconfig.json")," or ",Object(o.b)("inlineCode",{parentName:"p"},"jsconfig.json"),":"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-json",metastring:'{3} title="/tsconfig.json"',"{3}":!0,title:'"/tsconfig.json"'},'{\n    "compilerOptions": {\n        "baseUrl": "./src"\n    }\n}\n')),Object(o.b)("p",null,"Then you can import files based on your ",Object(o.b)("inlineCode",{parentName:"p"},"baseUrl"),":"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},'import { MyComponent } from "components/MyComponent"\n// Instead of "../../components/MyComponent" or something along those lines\n')),Object(o.b)("p",null,"If you want to know more about\n",Object(o.b)("a",{parentName:"p",href:"https://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url"},Object(o.b)("inlineCode",{parentName:"a"},"baseUrl")),"\nand\n",Object(o.b)("a",{parentName:"p",href:"https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping"},Object(o.b)("inlineCode",{parentName:"a"},"paths")),"\ncheck the TypeScript docs."))}l.isMDXComponent=!0},95:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),l=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},b=function(e){var t=l(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),b=l(n),d=a,m=b["".concat(i,".").concat(d)]||b[d]||u[d]||o;return n?r.a.createElement(m,p(p({ref:t},s),{},{components:n})):r.a.createElement(m,p({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var s=2;s<o;s++)i[s]=n[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);