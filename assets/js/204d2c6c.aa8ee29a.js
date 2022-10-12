"use strict";(self.webpackChunk_matano_website=self.webpackChunk_matano_website||[]).push([[1103],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var a=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var m=a.createContext({}),c=function(e){var t=a.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(m.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,m=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=c(n),u=o,f=s["".concat(m,".").concat(u)]||s[u]||d[u]||r;return n?a.createElement(f,i(i({ref:t},p),{},{components:n})):a.createElement(f,i({ref:t},p))}));function u(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=s;var l={};for(var m in t)hasOwnProperty.call(t,m)&&(l[m]=t[m]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},95407:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var a=n(87462),o=(n(67294),n(3905));const r={sidebar_position:1,title:"Matano CLI reference"},i=void 0,l={unversionedId:"reference/cli-reference",id:"reference/cli-reference",title:"Matano CLI reference",description:"Commands",source:"@site/docs/reference/cli-reference.md",sourceDirName:"reference",slug:"/reference/cli-reference",permalink:"/docs/reference/cli-reference",draft:!1,editUrl:"https://github.com/matanolabs/matano/tree/main/website/docs/reference/cli-reference.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Matano CLI reference"},sidebar:"tutorialSidebar",previous:{title:"Authoring detections",permalink:"/docs/detections/authoring"}},m={},c=[{value:"Commands",id:"commands",level:2},{value:"<code>matano autocomplete [SHELL]</code>",id:"matano-autocomplete-shell",level:2},{value:"<code>matano deploy</code>",id:"matano-deploy",level:2},{value:"<code>matano diff</code>",id:"matano-diff",level:2},{value:"<code>matano generate:matano-dir DIRECTORY-NAME</code>",id:"matano-generatematano-dir-directory-name",level:2},{value:"<code>matano help [COMMAND]</code>",id:"matano-help-command",level:2},{value:"<code>matano info</code>",id:"matano-info",level:2},{value:"<code>matano init</code>",id:"matano-init",level:2},{value:"<code>matano refresh-context</code>",id:"matano-refresh-context",level:2}],p={toc:c};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"commands"},"Commands"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-autocomplete-shell"},(0,o.kt)("inlineCode",{parentName:"a"},"matano autocomplete [SHELL]"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-deploy"},(0,o.kt)("inlineCode",{parentName:"a"},"matano deploy"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-diff"},(0,o.kt)("inlineCode",{parentName:"a"},"matano diff"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-generatematano-dir-directory-name"},(0,o.kt)("inlineCode",{parentName:"a"},"matano generate:matano-dir DIRECTORY-NAME"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-help-command"},(0,o.kt)("inlineCode",{parentName:"a"},"matano help [COMMAND]"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-info"},(0,o.kt)("inlineCode",{parentName:"a"},"matano info"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-init"},(0,o.kt)("inlineCode",{parentName:"a"},"matano init"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"#matano-refresh-context"},(0,o.kt)("inlineCode",{parentName:"a"},"matano refresh-context")))),(0,o.kt)("h2",{id:"matano-autocomplete-shell"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano autocomplete [SHELL]")),(0,o.kt)("p",null,"display autocomplete installation instructions"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano autocomplete [SHELL] [-r]\n\nARGUMENTS\n  SHELL  shell type\n\nFLAGS\n  -r, --refresh-cache  Refresh cache (ignores displaying instructions)\n\nDESCRIPTION\n  display autocomplete installation instructions\n\nEXAMPLES\n  $ matano autocomplete\n\n  $ matano autocomplete bash\n\n  $ matano autocomplete zsh\n\n  $ matano autocomplete --refresh-cache\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/oclif/plugin-autocomplete/blob/v1.3.0/src/commands/autocomplete/index.ts"},"@oclif/plugin-autocomplete"))),(0,o.kt)("h2",{id:"matano-deploy"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano deploy")),(0,o.kt)("p",null,"Deploys matano."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano deploy [--debug] [-p <value>] [--user-directory <value>]\n\nFLAGS\n  -p, --profile=<value>     AWS Profile to use for credentials.\n  --debug                   View debug information.\n  --user-directory=<value>  Matano user directory to use.\n\nDESCRIPTION\n  Deploys matano.\n\nEXAMPLES\n  $ matano deploy\n\n  $ matano deploy --profile prod\n\n  $ matano deploy --profile prod --user-directory matano-directory\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/matanolabs/matano/blob/main/cli/src/commands/deploy.ts"},"dist/commands/deploy.ts"))),(0,o.kt)("h2",{id:"matano-diff"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano diff")),(0,o.kt)("p",null,"Shows differences in your Matano deployment."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano diff [--debug] [-p <value>] [--user-directory <value>]\n\nFLAGS\n  -p, --profile=<value>     AWS Profile to use for credentials.\n  --debug                   View debug information.\n  --user-directory=<value>  Matano user directory to use.\n\nDESCRIPTION\n  Shows differences in your Matano deployment.\n\nEXAMPLES\n  $ matano diff\n\n  $ matano diff --profile prod\n\n  $ matano diff --profile prod --user-directory matano-directory\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/matanolabs/matano/blob/main/cli/src/commands/diff.ts"},"dist/commands/diff.ts"))),(0,o.kt)("h2",{id:"matano-generatematano-dir-directory-name"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano generate:matano-dir DIRECTORY-NAME")),(0,o.kt)("p",null,"Generates a sample Matano directory to get started."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano generate:matano-dir [DIRECTORY-NAME]\n\nARGUMENTS\n  DIRECTORY-NAME  The name of the directory to create\n\nDESCRIPTION\n  Generates a sample Matano directory to get started.\n\nEXAMPLES\n  $ matano generate:matano-dir\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/matanolabs/matano/blob/main/cli/src/commands/generate/matano-dir.ts"},"dist/commands/generate/matano-dir.ts"))),(0,o.kt)("h2",{id:"matano-help-command"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano help [COMMAND]")),(0,o.kt)("p",null,"Display help for matano."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano help [COMMAND] [-n]\n\nARGUMENTS\n  COMMAND  Command to show help for.\n\nFLAGS\n  -n, --nested-commands  Include all nested commands in the output.\n\nDESCRIPTION\n  Display help for matano.\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts"},"@oclif/plugin-help"))),(0,o.kt)("h2",{id:"matano-info"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano info")),(0,o.kt)("p",null,"Retrieves information about your Matano deployment in structured format."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano info [--debug] [-p <value>] [--user-directory <value>] [--output csv|json|yaml |  | ]\n\nFLAGS\n  -p, --profile=<value>     AWS Profile to use for credentials.\n  --debug                   View debug information.\n  --output=<option>         output in a more machine friendly format\n                            <options: csv|json|yaml>\n  --user-directory=<value>  Matano user directory to use.\n\nDESCRIPTION\n  Retrieves information about your Matano deployment in structured format.\n\nEXAMPLES\n  $ matano info\n\n  $ matano info --profile prod\n\n  $ matano info --output json\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/matanolabs/matano/blob/main/cli/src/commands/info.ts"},"dist/commands/info.ts"))),(0,o.kt)("h2",{id:"matano-init"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano init")),(0,o.kt)("p",null,"Wizard to get started with Matano. Creates resources, initializes your account, and deploys Matano."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano init [--debug] [-p <value>]\n\nFLAGS\n  -p, --profile=<value>  AWS Profile to use for credentials.\n  --debug                View debug information.\n\nDESCRIPTION\n  Wizard to get started with Matano. Creates resources, initializes your account, and deploys Matano.\n\nEXAMPLES\n  $ matano init\n\n  $ matano init --profile prod\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/matanolabs/matano/blob/main/cli/src/commands/init.ts"},"dist/commands/init.ts"))),(0,o.kt)("h2",{id:"matano-refresh-context"},(0,o.kt)("inlineCode",{parentName:"h2"},"matano refresh-context")),(0,o.kt)("p",null,"Refreshes Matano context."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"USAGE\n  $ matano refresh-context [--debug] [-p <value>] [-a <value>] [-r <value>] [--user-directory <value>]\n\nFLAGS\n  -a, --account=<value>     AWS Account to deploy to.\n  -p, --profile=<value>     AWS Profile to use for credentials.\n  -r, --region=<value>      AWS Region to deploy to.\n  --debug                   View debug information.\n  --user-directory=<value>  Matano user directory to use.\n\nDESCRIPTION\n  Refreshes Matano context.\n\nEXAMPLES\n  $ matano refresh-context\n\n  $ matano refresh-context --profile prod\n\n  $ matano refresh-context --profile prod --user-directory my-matano-directory\n\n  $ matano refresh-context --profile prod --region eu-central-1 --account 12345678901\n")),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"See code: ",(0,o.kt)("a",{parentName:"em",href:"https://github.com/matanolabs/matano/blob/main/cli/src/commands/refresh-context.ts"},"dist/commands/refresh-context.ts"))))}d.isMDXComponent=!0}}]);