(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3181],{89238:function(e,t,r){"use strict";var n=r(85982),o=r(77616),i=r(83893),a=r(68090)("pt:tsunami-sdk-drawCalculator");function s(e,t){var r=e.numberOfPicks;return a("numberOfPicksForDraw: "+JSON.stringify(r)+", normalizedBalance: "+t),n.BigNumber.from(r).mul(n.BigNumber.from(t)).div(n.constants.WeiPerEther).toNumber()}var u=r(68090)("pt:tsunami-sdk-drawCalculator");function c(e,t){u("computePick::address is "+e+" and pick "+t);var r=n.ethers.utils.solidityPack(["bytes32","uint256"],[e,t]),o=n.ethers.utils.solidityKeccak256(["address"],[r]);return u("computePick::userRandomNumber is "+n.BigNumber.from(o).toString()),{index:t,hash:o}}var l=r(68090)("pt:tsunami-sdk-drawCalculator");function f(e,t,r){l("generatePicks::normalizedBalance "+r);for(var o=s(e,r),i=n.ethers.utils.solidityKeccak256(["address"],[t]),a=[],u=0;u<o;u++)a.push(c(i,u));return a}function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function p(e,t){return t>0?(1<<e*t)-(1<<e*(t-1)):1}var g=r(68090)("pt:tsunami-sdk-drawCalculator");function C(e,t){var r=function(e,t){var r=p(t.bitRangeSize,e);g("numberOfPrizes for index ",r);var i=t.tiers[e];g("valueAtDistributionIndex ",n.utils.formatEther(i.toString()));var a=o.parseUnits(String(i),9).div(r);return g("fractionOfPrize: ",n.utils.formatEther(a)),a}(e,t);return n.BigNumber.from(t.prize).mul(r).div(n.ethers.constants.WeiPerEther)}var h=r(68090)("pt:tsunami-sdk-drawCalculator"),v=r(68090)("pt:tsunami-sdk-drawCalculator");function b(e,t,r,o){var i=r*o;v("indexOffset: ",i);var a=e.toHexString(),s=n.BigNumber.from(t).toHexString();v(a),v(s);var u=Math.pow(2,o)-1,c=BigInt(u)<<BigInt(i.toString()),l=BigInt(a)&BigInt(c),f=BigInt(s)&BigInt(c),d=l==f;return v("DrawCalculator:: matching "+l.toString()+" with "+f.toString()+": "+d),d}var y=r(68090)("pt:tsunami-sdk-drawCalculator");function w(e,t,r,o){for(var i=0,a=n.BigNumber.from(e),s=0;s<r.matchCardinality&&(y("winningRandomNumber: ",t.toString()),y("randomNumberThisPick: ",a.toString()),b(a,t,s,r.bitRangeSize));s++)i++;y("\n DrawCalculator:: Found "+i+" matches..");var u=function(e,t){var r=e.matchCardinality-t;if(h("distributionIndex: "+r+", : ("+e.matchCardinality+" - "+t+" )"),r<e.tiers.length)return{amount:C(r,e),distributionIndex:r}}(r,i);if(u)return y("user is receiving a prize! "+n.utils.formatEther(u.amount)),u}function F(e,t,r){for(var o={prizes:[],totalValue:n.ethers.constants.Zero,drawId:t.drawId},i=0;i<r.length;i++){var a=r[i],s=w(a.hash,t.winningRandomNumber,e);if(s){var u=d({},s,{pick:n.ethers.BigNumber.from(a.index)});o.totalValue=o.totalValue.add(u.amount),o.prizes.push(u)}}return o}var k=r(68090)("pt:tsunami-sdk-drawCalculator");function I(e,t,r,o){void 0===o&&(o=0),k("calculateDrawResults() called with args "+JSON.stringify(e)+", "+JSON.stringify(t)+", "+JSON.stringify(r));var i=function(e){if(e.bitRangeSize>=Math.floor(256/e.matchCardinality))return"DrawCalc/bitRangeSize-too-large";for(var t=n.BigNumber.from(0),r=0;r<e.tiers.length;r++)t=t.add(e.tiers[r]);return t.gt(n.ethers.utils.parseEther("1"))?"DrawCalc/tiers-gt-100%":""}(e);if(""!=i)throw new Error("draw-calculator-js PrizeDistribution invalid: "+i);r.picks=f(e,r.address,r.normalizedBalances[o]),k("user "+r.address+" has "+r.picks.length+" picks for drawId "+t.drawId+". Computing..");var a=F(e,t,r.picks);return k("user "+r.address+" has "+n.utils.formatEther(a.totalValue)+" prizes for this draw.."),a}var x=function(e,t){var r=e.sub(t);return r.isZero()?0:r.isNegative()?-1:1},E=r(68090)("pt:tsunami-sdk-drawCalculator"),S=function(e,t){return function(e,t){var r=t.sub(e);return r.isZero()?0:r.isNegative()?-1:1}(e.amount,t.amount)},O=function(e){return!e.amount.isZero()};t.calculateDrawResults=I,t.calculateNumberOfPrizesForIndex=p,t.calculatePrizeForDistributionIndex=C,t.filterResultsByValue=function(e,t){var r=e.prizes.filter(O).sort(S),o=e.totalValue;return e.prizes.length>t&&(E("user has more claims ("+e.prizes.length+") than the max picks per user ("+t+"). Sorting.."),o=(r=r.slice(0,t)).reduce((function(e,t){return e.add(t.amount)}),n.BigNumber.from(0))),d({},e,{totalValue:o,prizes:r})},t.prepareClaims=function(e,t){var r={userAddress:e.address,drawIds:[],encodedWinningPickIndices:"",winningPickIndices:[]};return 0==t.length||(t.forEach((function(e){if(e.totalValue.gt(n.BigNumber.from(0))){r.drawIds.push(e.drawId);for(var t,o=[],i=function(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return m(e,void 0);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,void 0):void 0}}(e))){r&&(e=r);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(e.prizes);!(t=i()).done;)o.push(t.value.pick);r.winningPickIndices.push(o)}})),r.winningPickIndices=r.winningPickIndices.map((function(e){return e.sort(x)})),r.encodedWinningPickIndices=i.defaultAbiCoder.encode(["uint256[][]"],[r.winningPickIndices])),r}},6933:function(e,t,r){"use strict";e.exports=r(89238)},35332:function(e,t,r){"use strict";r(60517);var n=Object.freeze({mainnet:1,homestead:1,ropsten:3,rinkeby:4,goerli:5,kovan:42,bsc:56,"poa-sokol":77,"bsc-testnet":97,poa:99,xdai:100,polygon:137,matic:137,optimism:420,avalanche:43114,fuji:43113,celo:42220,"celo-testnet":44787,mumbai:80001});n.mainnet,n.ropsten,n.rinkeby,n.goerli,n.kovan,n.polygon,n.mumbai,n.avalanche,n.fuji,n.celo,n["celo-testnet"]},68090:function(e,t,r){var n=r(34155);t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const r="color: "+this.color;t.splice(1,0,r,"color: inherit");let n=0,o=0;t[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(n++,"%c"===e&&(o=n))})),t.splice(o,0,r)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(r){}},t.load=function(){let e;try{e=t.storage.getItem("debug")}catch(r){}!e&&"undefined"!==typeof n&&"env"in n&&(e=n.env.DEBUG);return e},t.useColors=function(){if("undefined"!==typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!==typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!==typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!==typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!==typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!==typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=r(57782)(t);const{formatters:o}=e.exports;o.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}},57782:function(e,t,r){e.exports=function(e){function t(e){let r,o,i,a=null;function s(...e){if(!s.enabled)return;const n=s,o=Number(new Date),i=o-(r||o);n.diff=i,n.prev=r,n.curr=o,r=o,e[0]=t.coerce(e[0]),"string"!==typeof e[0]&&e.unshift("%O");let a=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,((r,o)=>{if("%%"===r)return"%";a++;const i=t.formatters[o];if("function"===typeof i){const t=e[a];r=i.call(n,t),e.splice(a,1),a--}return r})),t.formatArgs.call(n,e);(n.log||t.log).apply(n,e)}return s.namespace=e,s.useColors=t.useColors(),s.color=t.selectColor(e),s.extend=n,s.destroy=t.destroy,Object.defineProperty(s,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==a?a:(o!==t.namespaces&&(o=t.namespaces,i=t.enabled(e)),i),set:e=>{a=e}}),"function"===typeof t.init&&t.init(s),s}function n(e,r){const n=t(this.namespace+("undefined"===typeof r?":":r)+e);return n.log=this.log,n}function o(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},t.disable=function(){const e=[...t.names.map(o),...t.skips.map(o).map((e=>"-"+e))].join(",");return t.enable(""),e},t.enable=function(e){let r;t.save(e),t.namespaces=e,t.names=[],t.skips=[];const n=("string"===typeof e?e:"").split(/[\s,]+/),o=n.length;for(r=0;r<o;r++)n[r]&&("-"===(e=n[r].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){if("*"===e[e.length-1])return!0;let r,n;for(r=0,n=t.skips.length;r<n;r++)if(t.skips[r].test(e))return!1;for(r=0,n=t.names.length;r<n;r++)if(t.names[r].test(e))return!0;return!1},t.humanize=r(75226),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach((r=>{t[r]=e[r]})),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let r=0;for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t),r|=0;return t.colors[Math.abs(r)%t.colors.length]},t.enable(t.load()),t}},75226:function(e){var t=1e3,r=60*t,n=60*r,o=24*n,i=7*o,a=365.25*o;function s(e,t,r,n){var o=t>=1.5*r;return Math.round(e/r)+" "+n+(o?"s":"")}e.exports=function(e,u){u=u||{};var c=typeof e;if("string"===c&&e.length>0)return function(e){if((e=String(e)).length>100)return;var s=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!s)return;var u=parseFloat(s[1]);switch((s[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return u*a;case"weeks":case"week":case"w":return u*i;case"days":case"day":case"d":return u*o;case"hours":case"hour":case"hrs":case"hr":case"h":return u*n;case"minutes":case"minute":case"mins":case"min":case"m":return u*r;case"seconds":case"second":case"secs":case"sec":case"s":return u*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return u;default:return}}(e);if("number"===c&&isFinite(e))return u.long?function(e){var i=Math.abs(e);if(i>=o)return s(e,i,o,"day");if(i>=n)return s(e,i,n,"hour");if(i>=r)return s(e,i,r,"minute");if(i>=t)return s(e,i,t,"second");return e+" ms"}(e):function(e){var i=Math.abs(e);if(i>=o)return Math.round(e/o)+"d";if(i>=n)return Math.round(e/n)+"h";if(i>=r)return Math.round(e/r)+"m";if(i>=t)return Math.round(e/t)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},19400:function(e,t,r){"use strict";r.d(t,{J:function(){return u}});var n,o=r(81439),i=r(67294),a=r(79585),s=r(52178);function u(){!n&&function(){if(n=(0,a.B)(null),"undefined"!==typeof window)if(window.matchMedia){var e=window.matchMedia("(prefers-reduced-motion)"),t=function(){return n.set(e.matches)};e.addListener(t),t()}else n.set(!1)}();var e=(0,o.__read)((0,i.useState)(n.get()),2),t=e[0],r=e[1];return function(e,t){(0,i.useEffect)((function(){if((0,s.i)(e))return e.onChange(t)}),[t])}(n,r),t}},16071:function(e,t,r){"use strict";var n=r(53848),o=r(69448);t.default=void 0;var i=o(r(67294)),a=r(11689),s=r(72441),u=r(75749),c={};function l(e,t,r,n){if(e&&(0,a.isLocalURL)(t)){e.prefetch(t,r,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;c[t+"%"+r+(o?"%"+o:"")]=!0}}var f=function(e){var t=!1!==e.prefetch,r=(0,s.useRouter)(),o=r&&r.asPath||"/",f=i.default.useMemo((function(){var t=(0,a.resolveHref)(o,e.href,!0),r=n(t,2),i=r[0],s=r[1];return{href:i,as:e.as?(0,a.resolveHref)(o,e.as):s||i}}),[o,e.href,e.as]),d=f.href,m=f.as,p=e.children,g=e.replace,C=e.shallow,h=e.scroll,v=e.locale;"string"===typeof p&&(p=i.default.createElement("a",null,p));var b=i.Children.only(p),y=b&&"object"===typeof b&&b.ref,w=(0,u.useIntersection)({rootMargin:"200px"}),F=n(w,2),k=F[0],I=F[1],x=i.default.useCallback((function(e){k(e),y&&("function"===typeof y?y(e):"object"===typeof y&&(y.current=e))}),[y,k]);(0,i.useEffect)((function(){var e=I&&t&&(0,a.isLocalURL)(d),n="undefined"!==typeof v?v:r&&r.locale,o=c[d+"%"+m+(n?"%"+n:"")];e&&!o&&l(r,d,m,{locale:n})}),[m,d,I,v,t,r]);var E={ref:x,onClick:function(e){b.props&&"function"===typeof b.props.onClick&&b.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,i,s,u){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,a.isLocalURL)(r))&&(e.preventDefault(),null==s&&(s=n.indexOf("#")<0),t[o?"replace":"push"](r,n,{shallow:i,locale:u,scroll:s}))}(e,r,d,m,g,C,h,v)},onMouseEnter:function(e){(0,a.isLocalURL)(d)&&(b.props&&"function"===typeof b.props.onMouseEnter&&b.props.onMouseEnter(e),l(r,d,m,{priority:!0}))}};if(e.passHref||"a"===b.type&&!("href"in b.props)){var S="undefined"!==typeof v?v:r&&r.locale,O=r&&r.isLocaleDomain&&(0,a.getDomainLocale)(m,S,r&&r.locales,r&&r.domainLocales);E.href=O||(0,a.addBasePath)((0,a.addLocale)(m,S,r&&r.defaultLocale))}return i.default.cloneElement(b,E)};t.default=f},75749:function(e,t,r){"use strict";var n=r(53848);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,r=e.disabled||!a,u=(0,o.useRef)(),c=(0,o.useState)(!1),l=n(c,2),f=l[0],d=l[1],m=(0,o.useCallback)((function(e){u.current&&(u.current(),u.current=void 0),r||f||e&&e.tagName&&(u.current=function(e,t,r){var n=function(e){var t=e.rootMargin||"",r=s.get(t);if(r)return r;var n=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=n.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return s.set(t,r={id:t,observer:o,elements:n}),r}(r),o=n.id,i=n.observer,a=n.elements;return a.set(e,t),i.observe(e),function(){a.delete(e),i.unobserve(e),0===a.size&&(i.disconnect(),s.delete(o))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[r,t,f]);return(0,o.useEffect)((function(){if(!a&&!f){var e=(0,i.requestIdleCallback)((function(){return d(!0)}));return function(){return(0,i.cancelIdleCallback)(e)}}}),[f]),[m,f]};var o=r(67294),i=r(98391),a="undefined"!==typeof IntersectionObserver;var s=new Map},41664:function(e,t,r){e.exports=r(16071)},92447:function(e,t,r){"use strict";function n(e,t,r,n,o,i,a){try{var s=e[i](a),u=s.value}catch(c){return void r(c)}s.done?t(u):Promise.resolve(u).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(o,i){var a=e.apply(t,r);function s(e){n(a,o,i,s,u,"next",e)}function u(e){n(a,o,i,s,u,"throw",e)}s(void 0)}))}}r.d(t,{Z:function(){return o}})},38347:function(e,t,r){"use strict";function n(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}r.d(t,{Z:function(){return n}})}}]);