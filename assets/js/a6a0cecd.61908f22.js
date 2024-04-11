"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[428],{5680:(e,t,n)=>{n.d(t,{xA:()=>m,yg:()=>u});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),d=c(n),g=r,u=d["".concat(l,".").concat(g)]||d[g]||p[g]||o;return n?a.createElement(u,i(i({ref:t},m),{},{components:n})):a.createElement(u,i({ref:t},m))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:r,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},6898:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=n(8168),r=(n(6540),n(5680));const o={title:"Test Command",slug:"test",sidebar_label:"Test"},i=void 0,s={unversionedId:"commands/test",id:"commands/test",isDocsHomePage:!1,title:"Test Command",description:"`bash",source:"@site/docs/commands/test.md",sourceDirName:"commands",slug:"/commands/test",permalink:"/chayns-toolkit/docs/commands/test",editUrl:"https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/docs/commands/test.md",version:"current",frontMatter:{title:"Test Command",slug:"test",sidebar_label:"Test"},sidebar:"docs",previous:{title:"Lint",permalink:"/chayns-toolkit/docs/commands/lint"},next:{title:"Development",permalink:"/chayns-toolkit/docs/configuration/development"}},l=[{value:"Getting Started with Testing",id:"getting-started-with-testing",children:[]},{value:"Parameters",id:"parameters",children:[]},{value:"Customizing jest-Config",id:"customizing-jest-config",children:[]}],c={toc:l},m="wrapper";function d(e){let{components:t,...n}=e;return(0,r.yg)(m,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"chayns-toolkit test\n")),(0,r.yg)("div",{className:"admonition admonition-caution alert alert--warning"},(0,r.yg)("div",{parentName:"div",className:"admonition-heading"},(0,r.yg)("h5",{parentName:"div"},(0,r.yg)("span",{parentName:"h5",className:"admonition-icon"},(0,r.yg)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,r.yg)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,r.yg)("div",{parentName:"div",className:"admonition-content"},(0,r.yg)("p",{parentName:"div"},"This command is currently experimental. It is not semantically versioned and its\nAPI may change during any release."))),(0,r.yg)("p",null,"Runs all of your ",(0,r.yg)("a",{parentName:"p",href:"https://jestjs.io/"},"Jest")," test suites. Files matching one of\nthe following schemas are identified as test files:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Any file ending with ",(0,r.yg)("inlineCode",{parentName:"li"},".spec.@(js|jsx|ts|tsx)")," or ",(0,r.yg)("inlineCode",{parentName:"li"},".test.@(js|jsx|ts|tsx)")),(0,r.yg)("li",{parentName:"ul"},"Any JavaScript or TypeScript file in a folder named ",(0,r.yg)("inlineCode",{parentName:"li"},"__tests__"))),(0,r.yg)("p",null,"The matchers from\n",(0,r.yg)("a",{parentName:"p",href:"https://testing-library.com/docs/dom-testing-library/intro/"},(0,r.yg)("inlineCode",{parentName:"a"},"@testing-library/jest-dom")),"\nwill automatically be injected into the Jest environment, so you can write\nmeaningful assertions on the DOM like this:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'import { render } from "@testing-library/react"\nimport { MyComponent } from "./MyComponent"\n\ntest(\'should have "Click Me!" as its text\', () => {\n    const { getByRole } = render(<MyComponent />)\n\n    expect(getByRole("button")).toHaveTextContent("Click Me!")\n})\n')),(0,r.yg)("h2",{id:"getting-started-with-testing"},"Getting Started with Testing"),(0,r.yg)("p",null,"If you're new to testing in general, check out the\n",(0,r.yg)("a",{parentName:"p",href:"https://jestjs.io/docs/getting-started"},'"Getting Started" page')," from the Jest\ndocs."),(0,r.yg)("p",null,"After you learn the basic syntax and architecture of tests check out the\n",(0,r.yg)("a",{parentName:"p",href:"https://testing-library.com/docs/"},"Testing Library docs"),". Testing Library is a\ncollection of tools to help you write more meaningful tests for your frontend\ncode."),(0,r.yg)("p",null,"The general rule for testing frontend components is:"),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"The more your tests resemble the way your software is used, the more\nconfidence they can give you."),(0,r.yg)("p",{parentName:"blockquote"},(0,r.yg)("strong",{parentName:"p"},"Kent C. Dodds"),"\n(",(0,r.yg)("a",{parentName:"p",href:"https://twitter.com/kentcdodds/status/977018512689455106"},"source"),")")),(0,r.yg)("h2",{id:"parameters"},"Parameters"),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Parameters"),(0,r.yg)("th",{parentName:"tr",align:null},"Function"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"-w"),", ",(0,r.yg)("inlineCode",{parentName:"td"},"--watch")),(0,r.yg)("td",{parentName:"tr",align:null},"Runs Jest in ",(0,r.yg)("a",{parentName:"td",href:"https://jestjs.io/docs/cli#--watch"},"watch mode"))),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"--setupFile <path>")),(0,r.yg)("td",{parentName:"tr",align:null},"Executes the setup file specified by ",(0,r.yg)("inlineCode",{parentName:"td"},"<path>")," before any tests")))),(0,r.yg)("h2",{id:"customizing-jest-config"},"Customizing jest-Config"),(0,r.yg)("p",null,"Even though the included jest configuration will handle most cases, we also\nprovide the ability to modify it."),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"Please note that the jest configuration does not follow semantic versioning\nand can change with any release.")),(0,r.yg)("p",null,"Use the ",(0,r.yg)("inlineCode",{parentName:"p"},"jest")," property of the configuration object to specify a function that\nreceives the default jest configuration. Unlike the webpack function it\n(currently) does not receive additional information about the build. This\nmodifier function has to return the modified configuration."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-js",metastring:'title="/toolkit.config.js"',title:'"/toolkit.config.js"'},'module.exports = {\n    jest(config) {\n        config.transformIgnorePatterns = [\n            // required for node_modules with es6 syntax\n            "/node_modules/(?!lodash-es).+\\\\.js$",\n        ]\n\n        return config\n    },\n}\n')))}d.isMDXComponent=!0}}]);