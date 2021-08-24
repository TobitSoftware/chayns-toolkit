(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[358],{5318:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7378);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),f=l(n),d=o,m=f["".concat(c,".").concat(d)]||f[d]||p[d]||a;return n?r.createElement(m,i(i({ref:t},u),{},{components:n})):r.createElement(m,i({ref:t},u))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},517:function(e,t,n){"use strict";var r=n(7378);t.Z=function(e){var t=e.children,n=e.hidden,o=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:o},t)}},2275:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var r=n(7378),o=n(4309),a=n(8944),i="tabItem_c0e5",s="tabItemActive_28AG";var c=37,l=39;var u=function(e){var t=e.lazy,n=e.block,u=e.defaultValue,p=e.values,f=e.groupId,d=e.className,m=(0,o.Z)(),v=m.tabGroupChoices,b=m.setTabGroupChoices,y=(0,r.useState)(u),h=y[0],g=y[1],k=r.Children.toArray(e.children),w=[];if(null!=f){var O=v[f];null!=O&&O!==h&&p.some((function(e){return e.value===O}))&&g(O)}var x=function(e){var t=e.currentTarget,n=w.indexOf(t),r=p[n].value;g(r),null!=f&&(b(f,r),setTimeout((function(){var e,n,r,o,a,i,c,l;(e=t.getBoundingClientRect(),n=e.top,r=e.left,o=e.bottom,a=e.right,i=window,c=i.innerHeight,l=i.innerWidth,n>=0&&a<=l&&o<=c&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(s),setTimeout((function(){return t.classList.remove(s)}),2e3))}),150))},N=function(e){var t,n;switch(e.keyCode){case l:var r=w.indexOf(e.target)+1;n=w[r]||w[0];break;case c:var o=w.indexOf(e.target)-1;n=w[o]||w[w.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":n},d)},p.map((function(e){var t=e.value,n=e.label;return r.createElement("li",{role:"tab",tabIndex:h===t?0:-1,"aria-selected":h===t,className:(0,a.Z)("tabs__item",i,{"tabs__item--active":h===t}),key:t,ref:function(e){return w.push(e)},onKeyDown:N,onFocus:x,onClick:x},n)}))),t?(0,r.cloneElement)(k.filter((function(e){return e.props.value===h}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},k.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==h})}))))}},4956:function(e,t,n){"use strict";var r=(0,n(7378).createContext)(void 0);t.Z=r},4309:function(e,t,n){"use strict";var r=n(7378),o=n(4956);t.Z=function(){var e=(0,r.useContext)(o.Z);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},9081:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return f}});var r=n(9603),o=n(120),a=(n(7378),n(5318)),i=n(2275),s=n(517),c={title:"Using React Devtools",slug:"react-devtools"},l={unversionedId:"features/devtools",id:"features/devtools",isDocsHomePage:!1,title:"Using React Devtools",description:"Sometimes you might not be able to use the React Devtools browser extension,",source:"@site/docs/features/devtools.mdx",sourceDirName:"features",slug:"/features/react-devtools",permalink:"/chayns-toolkit/docs/features/react-devtools",editUrl:"https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/docs/features/devtools.mdx",version:"current",frontMatter:{title:"Using React Devtools",slug:"react-devtools"},sidebar:"docs",previous:{title:"Images and Assets",permalink:"/chayns-toolkit/docs/features/assets"},next:{title:"ESLint",permalink:"/chayns-toolkit/docs/features/eslint"}},u=[],p={toc:u};function f(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Sometimes you might not be able to use the React Devtools browser extension,\ne.g. when developing content inside an iframe."),(0,a.kt)("p",null,"For this case we support using the standalone React Devtools via the\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/facebook/react/tree/master/packages/react-devtools"},(0,a.kt)("inlineCode",{parentName:"a"},"react-devtools")),"\nNPM-package. To use it, first install it as a dev dependency of your project:"),(0,a.kt)(i.Z,{defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"NPM",value:"npm"}],mdxType:"Tabs"},(0,a.kt)(s.Z,{value:"yarn",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add react-devtools -D\n"))),(0,a.kt)(s.Z,{value:"npm",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm install react-devtools -D\n")))),(0,a.kt)("p",null,"Now you can pass the ",(0,a.kt)("inlineCode",{parentName:"p"},"-d")," (or ",(0,a.kt)("inlineCode",{parentName:"p"},"--devtools"),") option to the ",(0,a.kt)("inlineCode",{parentName:"p"},"chayns-toolkit dev"),"\ncommand. It then starts the React Devtools window, which will connect to your\napplication once it has loaded in the browser."))}f.isMDXComponent=!0},8944:function(e,t,n){"use strict";function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function o(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}n.d(t,{Z:function(){return o}})}}]);