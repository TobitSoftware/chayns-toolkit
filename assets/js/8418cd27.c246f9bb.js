(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{101:function(e,t,n){"use strict";function r(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}t.a=function(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(a&&(a+=" "),a+=t);return a}},107:function(e,t,n){"use strict";var r=n(0),a=n(108);t.a=function(){var e=Object(r.useContext)(a.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},108:function(e,t,n){"use strict";var r=n(0),a=Object(r.createContext)(void 0);t.a=a},120:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(107),c=n(101),i=n(56),s=n.n(i);var l=37,u=39;t.a=function(e){var t=e.lazy,n=e.block,i=e.defaultValue,p=e.values,b=e.groupId,d=e.className,f=Object(o.a)(),m=f.tabGroupChoices,v=f.setTabGroupChoices,y=Object(r.useState)(i),h=y[0],O=y[1],g=r.Children.toArray(e.children),j=[];if(null!=b){var w=m[b];null!=w&&w!==h&&p.some((function(e){return e.value===w}))&&O(w)}var x=function(e){var t=e.target,n=j.indexOf(t),r=g[n].props.value;O(r),null!=b&&(v(b,r),setTimeout((function(){var e,n,r,a,o,c,i,l;(e=t.getBoundingClientRect(),n=e.top,r=e.left,a=e.bottom,o=e.right,c=window,i=c.innerHeight,l=c.innerWidth,n>=0&&o<=l&&a<=i&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(s.a.tabItemActive),setTimeout((function(){return t.classList.remove(s.a.tabItemActive)}),2e3))}),150))},k=function(e){var t,n;switch(e.keyCode){case u:var r=j.indexOf(e.target)+1;n=j[r]||j[0];break;case l:var a=j.indexOf(e.target)-1;n=j[a]||j[j.length-1]}null===(t=n)||void 0===t||t.focus()};return a.a.createElement("div",{className:"tabs-container"},a.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(c.a)("tabs",{"tabs--block":n},d)},p.map((function(e){var t=e.value,n=e.label;return a.a.createElement("li",{role:"tab",tabIndex:h===t?0:-1,"aria-selected":h===t,className:Object(c.a)("tabs__item",s.a.tabItem,{"tabs__item--active":h===t}),key:t,ref:function(e){return j.push(e)},onKeyDown:k,onFocus:x,onClick:x},n)}))),t?Object(r.cloneElement)(g.filter((function(e){return e.props.value===h}))[0],{className:"margin-vert--md"}):a.a.createElement("div",{className:"margin-vert--md"},g.map((function(e,t){return Object(r.cloneElement)(e,{key:t,hidden:e.props.value!==h})}))))}},121:function(e,t,n){"use strict";var r=n(0),a=n.n(r);t.a=function(e){var t=e.children,n=e.hidden,r=e.className;return a.a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},88:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return b}));var r=n(3),a=n(7),o=(n(0),n(99)),c=n(120),i=n(121),s={title:"Using React Devtools",slug:"react-devtools"},l={unversionedId:"features/devtools",id:"features/devtools",isDocsHomePage:!1,title:"Using React Devtools",description:"Sometimes you might not be able to use the React Devtools browser extension,",source:"@site/docs/features/devtools.mdx",slug:"/features/react-devtools",permalink:"/chayns-toolkit/docs/features/react-devtools",editUrl:"https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/docs/features/devtools.mdx",version:"current",sidebar:"docs",previous:{title:"Images and Assets",permalink:"/chayns-toolkit/docs/features/assets"},next:{title:"ESLint",permalink:"/chayns-toolkit/docs/features/eslint"}},u=[],p={toc:u};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Sometimes you might not be able to use the React Devtools browser extension,\ne.g. when developing content inside an iframe."),Object(o.b)("p",null,"For this case we support using the standalone React Devtools via the\n",Object(o.b)("a",{parentName:"p",href:"https://github.com/facebook/react/tree/master/packages/react-devtools"},Object(o.b)("inlineCode",{parentName:"a"},"react-devtools")),"\nNPM-package. To use it, first install it as a dev dependency of your project:"),Object(o.b)(c.a,{defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"NPM",value:"npm"}],mdxType:"Tabs"},Object(o.b)(i.a,{value:"yarn",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"yarn add react-devtools -D\n"))),Object(o.b)(i.a,{value:"npm",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-bash"},"npm install react-devtools -D\n")))),Object(o.b)("p",null,"Now you can pass the ",Object(o.b)("inlineCode",{parentName:"p"},"-d")," (or ",Object(o.b)("inlineCode",{parentName:"p"},"--devtools"),") option to the ",Object(o.b)("inlineCode",{parentName:"p"},"chayns-toolkit dev"),"\ncommand. It then starts the React Devtools window, which will connect to your\napplication once it has loaded in the browser."))}b.isMDXComponent=!0},99:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=u(n),d=r,f=p["".concat(c,".").concat(d)]||p[d]||b[d]||o;return n?a.a.createElement(f,i(i({ref:t},l),{},{components:n})):a.a.createElement(f,i({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var l=2;l<o;l++)c[l]=n[l];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);