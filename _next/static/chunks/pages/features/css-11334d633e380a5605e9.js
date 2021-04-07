(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[142],{9961:function(e,t,n){"use strict";var o=n(5893);t.Z={repository:"https://github.com/TobitSoftware/chayns-toolkit",docsRepository:"https://github.com/TobitSoftware/chayns-toolkit",branch:"master",path:"/",titleSuffix:" \u2013 chayns-toolkit",nextLinks:!0,prevLinks:!0,search:!0,customSearch:null,darkMode:!0,footer:!0,footerText:"MIT 2021 \xa9 Tobit Software Laboratories AG",footerEditOnGitHubLink:!0,logo:(0,o.jsx)("img",{src:"/logo.png",style:{height:32},alt:"chayns-toolkit"}),head:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,o.jsx)("meta",{name:"description",content:"A zero-config toolchain for developing chayns\xae apps."}),(0,o.jsx)("meta",{name:"og:title",content:"chayns-toolkit"})]})}},5566:function(e,t,n){"use strict";n.r(t);var o=n(6156),s=n(7375),r=(n(7294),n(2763)),a=n(7829),i=n.n(a),u=n(3805),c=n(9961);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var l=function(e){return(0,u.withSSG)(i()({filename:"css.md",route:"/features/css",meta:{},pageMap:[{name:"_app",route:"/_app"},{name:"commands",children:[{name:"build",route:"/commands/build"},{name:"dev",route:"/commands/dev"},{name:"lint",route:"/commands/lint"},{name:"meta.json",meta:{dev:"Dev",build:"Build",lint:"Lint",test:"Test"}},{name:"test",route:"/commands/test"}],route:"/commands"},{name:"configuration",children:[{name:"development",route:"/configuration/development"},{name:"meta.json",meta:{development:"Development",output:"Build Output",webpack:"Customizing Webpack"}},{name:"output",route:"/configuration/output"},{name:"webpack",route:"/configuration/webpack"}],route:"/configuration"},{name:"contributing",route:"/contributing"},{name:"features",children:[{name:"assets",route:"/features/assets"},{name:"css",route:"/features/css"},{name:"devtools",route:"/features/devtools"},{name:"environment",route:"/features/environment"},{name:"eslint",route:"/features/eslint"},{name:"meta.json",meta:{typescript:"TypeScript",css:"(S)CSS Support",assets:"Images and Assets",devtools:"React Devtools",eslint:"ESLint Integration",environment:"Environment Variables"}},{name:"typescript",route:"/features/typescript"}],route:"/features"},{name:"getting-started",route:"/getting-started"},{name:"index",route:"/"},{name:"meta.json",meta:{index:"Welcome","getting-started":"Getting Started",features:"Features",commands:"Commands",configuration:"Configuration",contributing:"Contributing"}}]},c.Z))(e)};function p(e){var t=e.components,n=(0,s.Z)(e,["components"]);return(0,r.kt)(l,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){(0,o.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({components:t},n),(0,r.kt)("h1",null,"(S)CSS Support"),(0,r.kt)("p",null,"You can import ",(0,r.kt)("inlineCode",{parentName:"p"},".css")," and ",(0,r.kt)("inlineCode",{parentName:"p"},".scss")," files into your JavaScript/TypeScript files to\ninclude them in your bundle:"),(0,r.kt)("pre",null,(0,r.kt)("code",{className:"language-js",parentName:"pre"},'import "./my-styles.scss"\n')),(0,r.kt)("h2",null,"CSS Modules"),(0,r.kt)("p",null,"Any file ending with ",(0,r.kt)("inlineCode",{parentName:"p"},".module.css")," or ",(0,r.kt)("inlineCode",{parentName:"p"},".module.scss")," will be treated as a\n",(0,r.kt)("a",{href:"https://github.com/css-modules/css-modules",parentName:"p"},"CSS module"),". You can import the\nclass names from the module like so:"),(0,r.kt)("pre",null,(0,r.kt)("code",{className:"language-jsx",parentName:"pre"},'import styles from "./styles.css"\n\nexport function MyComponent() {\n    return <div className={styles.box}>I am styled with CSS modules!</div>\n}\n')),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"For more information on CSS Modules check out\n",(0,r.kt)("a",{href:"https://css-tricks.com/css-modules-part-1-need/",parentName:"p"},"this article"),".")))}p.isMDXComponent=!0,t.default=p},8521:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/features/css",function(){return n(5566)}])}},0,[[8521,272,774,351,503]]]);