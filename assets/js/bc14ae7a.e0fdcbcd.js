"use strict";(self.webpackChunk_matano_website=self.webpackChunk_matano_website||[]).push([[3027],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var a=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,a,o=function(e,t){if(null==e)return{};var r,a,o={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=a.createContext({}),u=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var r=e.components,o=e.mdxType,n=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),p=u(r),m=o,g=p["".concat(s,".").concat(m)]||p[m]||d[m]||n;return r?a.createElement(g,l(l({ref:t},c),{},{components:r})):a.createElement(g,l({ref:t},c))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=r.length,l=new Array(n);l[0]=p;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var u=2;u<n;u++)l[u]=r[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}p.displayName="MDXCreateElement"},74308:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>n,metadata:()=>i,toc:()=>u});var a=r(87462),o=(r(67294),r(3905));const n={title:"CloudTrail"},l=void 0,i={unversionedId:"log-sources/managed-log-sources/cloudtrail",id:"log-sources/managed-log-sources/cloudtrail",title:"CloudTrail",description:"The CloudTrail Matano managed log source lets you ingest your AWS CloudTrail logs directly into Matano.",source:"@site/docs/log-sources/managed-log-sources/cloudtrail.md",sourceDirName:"log-sources/managed-log-sources",slug:"/log-sources/managed-log-sources/cloudtrail",permalink:"/docs/log-sources/managed-log-sources/cloudtrail",draft:!1,editUrl:"https://github.com/matanolabs/matano/tree/main/website/docs/log-sources/managed-log-sources/cloudtrail.md",tags:[],version:"current",frontMatter:{title:"CloudTrail"},sidebar:"tutorialSidebar",previous:{title:"Log sources",permalink:"/docs/log-sources/managed-log-sources/"},next:{title:"Querying tables",permalink:"/docs/tables/querying"}},s={},u=[{value:"Usage",id:"usage",level:2},{value:"Transformation",id:"transformation",level:2},{value:"Tables",id:"tables",level:2}],c={toc:u};function d(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,a.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The CloudTrail Matano managed log source lets you ingest your AWS CloudTrail logs directly into Matano."),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"Use the managed log source by specifying the ",(0,o.kt)("inlineCode",{parentName:"p"},"managed.type")," property in your ",(0,o.kt)("inlineCode",{parentName:"p"},"log_source")," as ",(0,o.kt)("inlineCode",{parentName:"p"},"AWS_CLOUDTRAIL"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml"},'managed:\n  type: "AWS_CLOUDTRAIL"\n')),(0,o.kt)("h2",{id:"transformation"},"Transformation"),(0,o.kt)("p",null,"CloudTrail data is normalized to standard ECS fields. Custom fields are normalized into the ",(0,o.kt)("inlineCode",{parentName:"p"},"aws")," field. You can view the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/matanolabs/matano/blob/main/data/managed/aws_cloudtrail/log_source.yml"},"complete mapping")," to see the specific field mappings."),(0,o.kt)("h2",{id:"tables"},"Tables"),(0,o.kt)("p",null,"The AWS CloudTrail managed log source creates the following Matano tables:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"CloudTrail Logs"),". A table is created for actual CloudTrail logs."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"CloudTrail Digest"),". Your CloudTrail digest files are transformed into a separate Matano table."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"CloudTrail Insights"),". CloudTrail insights files are processed into a Matano table.")),(0,o.kt)("p",null,"Matano automatically ingests data in your CloudTrail bucket into the corresponding table."))}d.isMDXComponent=!0}}]);