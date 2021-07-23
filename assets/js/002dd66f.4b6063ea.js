(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[376],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return l},kt:function(){return d}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),c=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=c(n),d=r,f=u["".concat(p,".").concat(d)]||u[d]||m[d]||i;return n?a.createElement(f,o(o({ref:t},l),{},{components:n})):a.createElement(f,o({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3872:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return l},default:function(){return u}});var a=n(2122),r=n(9756),i=(n(7294),n(3905)),o=["components"],s={title:"Images and Assets",slug:"assets"},p=void 0,c={unversionedId:"features/assets",id:"features/assets",isDocsHomePage:!1,title:"Images and Assets",description:"Images that have a .png, .jpg, .jpeg, .gif or .webp extension can be",source:"@site/docs/features/assets.md",sourceDirName:"features",slug:"/features/assets",permalink:"/chayns-toolkit/docs/features/assets",editUrl:"https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/docs/features/assets.md",version:"current",frontMatter:{title:"Images and Assets",slug:"assets"},sidebar:"docs",previous:{title:"CSS & Sass Support",permalink:"/chayns-toolkit/docs/features/css"},next:{title:"Using React Devtools",permalink:"/chayns-toolkit/docs/features/react-devtools"}},l=[{value:"SVG Support",id:"svg-support",children:[]}],m={toc:l};function u(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Images that have a ",(0,i.kt)("inlineCode",{parentName:"p"},".png"),", ",(0,i.kt)("inlineCode",{parentName:"p"},".jpg"),", ",(0,i.kt)("inlineCode",{parentName:"p"},".jpeg"),", ",(0,i.kt)("inlineCode",{parentName:"p"},".gif")," or ",(0,i.kt)("inlineCode",{parentName:"p"},".webp")," extension can be\nimported into your components. The default export of an image module is its\nresulting URL, which you can use as the ",(0,i.kt)("inlineCode",{parentName:"p"},"src")," attribute for ",(0,i.kt)("inlineCode",{parentName:"p"},"<img>")," tags for\nexample:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'import imgSrc from "./my-image.png"\n\nexport function MyImage() {\n    return <img src={imgSrc} alt="" />\n}\n')),(0,i.kt)("p",null,"The filename of the image will be changed and it will be output into the build\ndirectory."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"To improve loading times, small images (< 10 KB) will be inlined into the\nJavaScript code with data-urls and therefore won't appear as files in your\noutput."))),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"When ",(0,i.kt)("a",{parentName:"p",href:"../configuration/output#single-file-builds"},"single-file mode")," is\nactivated, all images will be inlined."))),(0,i.kt)("h2",{id:"svg-support"},"SVG Support"),(0,i.kt)("p",null,"Importing a ",(0,i.kt)("inlineCode",{parentName:"p"},".svg"),"-file automatically convert it into a React component. You can\npass them any props a regular ",(0,i.kt)("inlineCode",{parentName:"p"},"<svg>"),"-element would take:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},'import Icon from "./my-icon.svg"\n\nexport function MyIcon() {\n    return <Icon className="icon" />\n}\n')))}u.isMDXComponent=!0}}]);