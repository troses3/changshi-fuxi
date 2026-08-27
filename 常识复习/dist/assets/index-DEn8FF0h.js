(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(i){if(i.ep)return;i.ep=!0;const l=t(i);fetch(i.href,l)}})();function _a(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ou={exports:{}},vi={},su={exports:{}},I={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pr=Symbol.for("react.element"),xa=Symbol.for("react.portal"),wa=Symbol.for("react.fragment"),Ca=Symbol.for("react.strict_mode"),Sa=Symbol.for("react.profiler"),Ea=Symbol.for("react.provider"),Da=Symbol.for("react.context"),Na=Symbol.for("react.forward_ref"),Aa=Symbol.for("react.suspense"),Ba=Symbol.for("react.memo"),Pa=Symbol.for("react.lazy"),Go=Symbol.iterator;function La(e){return e===null||typeof e!="object"?null:(e=Go&&e[Go]||e["@@iterator"],typeof e=="function"?e:null)}var uu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},cu=Object.assign,au={};function Ct(e,n,t){this.props=e,this.context=n,this.refs=au,this.updater=t||uu}Ct.prototype.isReactComponent={};Ct.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Ct.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function du(){}du.prototype=Ct.prototype;function bl(e,n,t){this.props=e,this.context=n,this.refs=au,this.updater=t||uu}var eo=bl.prototype=new du;eo.constructor=bl;cu(eo,Ct.prototype);eo.isPureReactComponent=!0;var Yo=Array.isArray,fu=Object.prototype.hasOwnProperty,no={current:null},pu={key:!0,ref:!0,__self:!0,__source:!0};function hu(e,n,t){var r,i={},l=null,o=null;if(n!=null)for(r in n.ref!==void 0&&(o=n.ref),n.key!==void 0&&(l=""+n.key),n)fu.call(n,r)&&!pu.hasOwnProperty(r)&&(i[r]=n[r]);var s=arguments.length-2;if(s===1)i.children=t;else if(1<s){for(var u=Array(s),d=0;d<s;d++)u[d]=arguments[d+2];i.children=u}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)i[r]===void 0&&(i[r]=s[r]);return{$$typeof:pr,type:e,key:l,ref:o,props:i,_owner:no.current}}function ja(e,n){return{$$typeof:pr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function to(e){return typeof e=="object"&&e!==null&&e.$$typeof===pr}function za(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Xo=/\/+/g;function Ti(e,n){return typeof e=="object"&&e!==null&&e.key!=null?za(""+e.key):n.toString(36)}function Ir(e,n,t,r,i){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case pr:case xa:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+Ti(o,0):r,Yo(i)?(t="",e!=null&&(t=e.replace(Xo,"$&/")+"/"),Ir(i,n,t,"",function(d){return d})):i!=null&&(to(i)&&(i=ja(i,t+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Xo,"$&/")+"/")+e)),n.push(i)),1;if(o=0,r=r===""?".":r+":",Yo(e))for(var s=0;s<e.length;s++){l=e[s];var u=r+Ti(l,s);o+=Ir(l,n,t,u,i)}else if(u=La(e),typeof u=="function")for(e=u.call(e),s=0;!(l=e.next()).done;)l=l.value,u=r+Ti(l,s++),o+=Ir(l,n,t,u,i);else if(l==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return o}function vr(e,n,t){if(e==null)return e;var r=[],i=0;return Ir(e,r,"","",function(l){return n.call(t,l,i++)}),r}function Ta(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var xe={current:null},Or={transition:null},Ma={ReactCurrentDispatcher:xe,ReactCurrentBatchConfig:Or,ReactCurrentOwner:no};function mu(){throw Error("act(...) is not supported in production builds of React.")}I.Children={map:vr,forEach:function(e,n,t){vr(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return vr(e,function(){n++}),n},toArray:function(e){return vr(e,function(n){return n})||[]},only:function(e){if(!to(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};I.Component=Ct;I.Fragment=wa;I.Profiler=Sa;I.PureComponent=bl;I.StrictMode=Ca;I.Suspense=Aa;I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ma;I.act=mu;I.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=cu({},e.props),i=e.key,l=e.ref,o=e._owner;if(n!=null){if(n.ref!==void 0&&(l=n.ref,o=no.current),n.key!==void 0&&(i=""+n.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(u in n)fu.call(n,u)&&!pu.hasOwnProperty(u)&&(r[u]=n[u]===void 0&&s!==void 0?s[u]:n[u])}var u=arguments.length-2;if(u===1)r.children=t;else if(1<u){s=Array(u);for(var d=0;d<u;d++)s[d]=arguments[d+2];r.children=s}return{$$typeof:pr,type:e.type,key:i,ref:l,props:r,_owner:o}};I.createContext=function(e){return e={$$typeof:Da,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Ea,_context:e},e.Consumer=e};I.createElement=hu;I.createFactory=function(e){var n=hu.bind(null,e);return n.type=e,n};I.createRef=function(){return{current:null}};I.forwardRef=function(e){return{$$typeof:Na,render:e}};I.isValidElement=to;I.lazy=function(e){return{$$typeof:Pa,_payload:{_status:-1,_result:e},_init:Ta}};I.memo=function(e,n){return{$$typeof:Ba,type:e,compare:n===void 0?null:n}};I.startTransition=function(e){var n=Or.transition;Or.transition={};try{e()}finally{Or.transition=n}};I.unstable_act=mu;I.useCallback=function(e,n){return xe.current.useCallback(e,n)};I.useContext=function(e){return xe.current.useContext(e)};I.useDebugValue=function(){};I.useDeferredValue=function(e){return xe.current.useDeferredValue(e)};I.useEffect=function(e,n){return xe.current.useEffect(e,n)};I.useId=function(){return xe.current.useId()};I.useImperativeHandle=function(e,n,t){return xe.current.useImperativeHandle(e,n,t)};I.useInsertionEffect=function(e,n){return xe.current.useInsertionEffect(e,n)};I.useLayoutEffect=function(e,n){return xe.current.useLayoutEffect(e,n)};I.useMemo=function(e,n){return xe.current.useMemo(e,n)};I.useReducer=function(e,n,t){return xe.current.useReducer(e,n,t)};I.useRef=function(e){return xe.current.useRef(e)};I.useState=function(e){return xe.current.useState(e)};I.useSyncExternalStore=function(e,n,t){return xe.current.useSyncExternalStore(e,n,t)};I.useTransition=function(){return xe.current.useTransition()};I.version="18.3.1";su.exports=I;var F=su.exports;const Ia=_a(F);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oa=F,Ra=Symbol.for("react.element"),Fa=Symbol.for("react.fragment"),qa=Object.prototype.hasOwnProperty,$a=Oa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ha={key:!0,ref:!0,__self:!0,__source:!0};function yu(e,n,t){var r,i={},l=null,o=null;t!==void 0&&(l=""+t),n.key!==void 0&&(l=""+n.key),n.ref!==void 0&&(o=n.ref);for(r in n)qa.call(n,r)&&!Ha.hasOwnProperty(r)&&(i[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps,n)i[r]===void 0&&(i[r]=n[r]);return{$$typeof:Ra,type:e,key:l,ref:o,props:i,_owner:$a.current}}vi.Fragment=Fa;vi.jsx=yu;vi.jsxs=yu;ou.exports=vi;var m=ou.exports,ol={},ku={exports:{}},ze={},vu={exports:{}},gu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(S,P){var x=S.length;S.push(P);e:for(;0<x;){var U=x-1>>>1,ee=S[U];if(0<i(ee,P))S[U]=P,S[x]=ee,x=U;else break e}}function t(S){return S.length===0?null:S[0]}function r(S){if(S.length===0)return null;var P=S[0],x=S.pop();if(x!==P){S[0]=x;e:for(var U=0,ee=S.length,pn=ee>>>1;U<pn;){var $e=2*(U+1)-1,Nt=S[$e],Ye=$e+1,Mn=S[Ye];if(0>i(Nt,x))Ye<ee&&0>i(Mn,Nt)?(S[U]=Mn,S[Ye]=x,U=Ye):(S[U]=Nt,S[$e]=x,U=$e);else if(Ye<ee&&0>i(Mn,x))S[U]=Mn,S[Ye]=x,U=Ye;else break e}}return P}function i(S,P){var x=S.sortIndex-P.sortIndex;return x!==0?x:S.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var u=[],d=[],k=1,y=null,p=3,w=!1,g=!1,E=!1,L=typeof setTimeout=="function"?setTimeout:null,a=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(S){for(var P=t(d);P!==null;){if(P.callback===null)r(d);else if(P.startTime<=S)r(d),P.sortIndex=P.expirationTime,n(u,P);else break;P=t(d)}}function v(S){if(E=!1,f(S),!g)if(t(u)!==null)g=!0,Z(C);else{var P=t(d);P!==null&&ve(v,P.startTime-S)}}function C(S,P){g=!1,E&&(E=!1,a(B),B=-1),w=!0;var x=p;try{for(f(P),y=t(u);y!==null&&(!(y.expirationTime>P)||S&&!se());){var U=y.callback;if(typeof U=="function"){y.callback=null,p=y.priorityLevel;var ee=U(y.expirationTime<=P);P=e.unstable_now(),typeof ee=="function"?y.callback=ee:y===t(u)&&r(u),f(P)}else r(u);y=t(u)}if(y!==null)var pn=!0;else{var $e=t(d);$e!==null&&ve(v,$e.startTime-P),pn=!1}return pn}finally{y=null,p=x,w=!1}}var N=!1,D=null,B=-1,K=5,j=-1;function se(){return!(e.unstable_now()-j<K)}function Ce(){if(D!==null){var S=e.unstable_now();j=S;var P=!0;try{P=D(!0,S)}finally{P?fn():(N=!1,D=null)}}else N=!1}var fn;if(typeof c=="function")fn=function(){c(Ce)};else if(typeof MessageChannel<"u"){var Tn=new MessageChannel,Dt=Tn.port2;Tn.port1.onmessage=Ce,fn=function(){Dt.postMessage(null)}}else fn=function(){L(Ce,0)};function Z(S){D=S,N||(N=!0,fn())}function ve(S,P){B=L(function(){S(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(S){S.callback=null},e.unstable_continueExecution=function(){g||w||(g=!0,Z(C))},e.unstable_forceFrameRate=function(S){0>S||125<S?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):K=0<S?Math.floor(1e3/S):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return t(u)},e.unstable_next=function(S){switch(p){case 1:case 2:case 3:var P=3;break;default:P=p}var x=p;p=P;try{return S()}finally{p=x}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(S,P){switch(S){case 1:case 2:case 3:case 4:case 5:break;default:S=3}var x=p;p=S;try{return P()}finally{p=x}},e.unstable_scheduleCallback=function(S,P,x){var U=e.unstable_now();switch(typeof x=="object"&&x!==null?(x=x.delay,x=typeof x=="number"&&0<x?U+x:U):x=U,S){case 1:var ee=-1;break;case 2:ee=250;break;case 5:ee=1073741823;break;case 4:ee=1e4;break;default:ee=5e3}return ee=x+ee,S={id:k++,callback:P,priorityLevel:S,startTime:x,expirationTime:ee,sortIndex:-1},x>U?(S.sortIndex=x,n(d,S),t(u)===null&&S===t(d)&&(E?(a(B),B=-1):E=!0,ve(v,x-U))):(S.sortIndex=ee,n(u,S),g||w||(g=!0,Z(C))),S},e.unstable_shouldYield=se,e.unstable_wrapCallback=function(S){var P=p;return function(){var x=p;p=P;try{return S.apply(this,arguments)}finally{p=x}}}})(gu);vu.exports=gu;var Ua=vu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Va=F,je=Ua;function _(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var _u=new Set,Xt={};function Gn(e,n){yt(e,n),yt(e+"Capture",n)}function yt(e,n){for(Xt[e]=n,e=0;e<n.length;e++)_u.add(n[e])}var sn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),sl=Object.prototype.hasOwnProperty,Wa=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Zo={},Jo={};function Qa(e){return sl.call(Jo,e)?!0:sl.call(Zo,e)?!1:Wa.test(e)?Jo[e]=!0:(Zo[e]=!0,!1)}function Ka(e,n,t,r){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ga(e,n,t,r){if(n===null||typeof n>"u"||Ka(e,n,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function we(e,n,t,r,i,l,o){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=l,this.removeEmptyString=o}var pe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){pe[e]=new we(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];pe[n]=new we(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){pe[e]=new we(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){pe[e]=new we(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){pe[e]=new we(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){pe[e]=new we(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){pe[e]=new we(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){pe[e]=new we(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){pe[e]=new we(e,5,!1,e.toLowerCase(),null,!1,!1)});var ro=/[\-:]([a-z])/g;function io(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(ro,io);pe[n]=new we(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(ro,io);pe[n]=new we(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(ro,io);pe[n]=new we(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){pe[e]=new we(e,1,!1,e.toLowerCase(),null,!1,!1)});pe.xlinkHref=new we("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){pe[e]=new we(e,1,!1,e.toLowerCase(),null,!0,!0)});function lo(e,n,t,r){var i=pe.hasOwnProperty(n)?pe[n]:null;(i!==null?i.type!==0:r||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Ga(n,t,i,r)&&(t=null),r||i===null?Qa(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):i.mustUseProperty?e[i.propertyName]=t===null?i.type===3?!1:"":t:(n=i.attributeName,r=i.attributeNamespace,t===null?e.removeAttribute(n):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,r?e.setAttributeNS(r,n,t):e.setAttribute(n,t))))}var dn=Va.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,gr=Symbol.for("react.element"),Jn=Symbol.for("react.portal"),bn=Symbol.for("react.fragment"),oo=Symbol.for("react.strict_mode"),ul=Symbol.for("react.profiler"),xu=Symbol.for("react.provider"),wu=Symbol.for("react.context"),so=Symbol.for("react.forward_ref"),cl=Symbol.for("react.suspense"),al=Symbol.for("react.suspense_list"),uo=Symbol.for("react.memo"),mn=Symbol.for("react.lazy"),Cu=Symbol.for("react.offscreen"),bo=Symbol.iterator;function At(e){return e===null||typeof e!="object"?null:(e=bo&&e[bo]||e["@@iterator"],typeof e=="function"?e:null)}var X=Object.assign,Mi;function Ot(e){if(Mi===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Mi=n&&n[1]||""}return`
`+Mi+e}var Ii=!1;function Oi(e,n){if(!e||Ii)return"";Ii=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(d){var r=d}Reflect.construct(e,[],n)}else{try{n.call()}catch(d){r=d}e.call(n.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var i=d.stack.split(`
`),l=r.stack.split(`
`),o=i.length-1,s=l.length-1;1<=o&&0<=s&&i[o]!==l[s];)s--;for(;1<=o&&0<=s;o--,s--)if(i[o]!==l[s]){if(o!==1||s!==1)do if(o--,s--,0>s||i[o]!==l[s]){var u=`
`+i[o].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=o&&0<=s);break}}}finally{Ii=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Ot(e):""}function Ya(e){switch(e.tag){case 5:return Ot(e.type);case 16:return Ot("Lazy");case 13:return Ot("Suspense");case 19:return Ot("SuspenseList");case 0:case 2:case 15:return e=Oi(e.type,!1),e;case 11:return e=Oi(e.type.render,!1),e;case 1:return e=Oi(e.type,!0),e;default:return""}}function dl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case bn:return"Fragment";case Jn:return"Portal";case ul:return"Profiler";case oo:return"StrictMode";case cl:return"Suspense";case al:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case wu:return(e.displayName||"Context")+".Consumer";case xu:return(e._context.displayName||"Context")+".Provider";case so:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case uo:return n=e.displayName||null,n!==null?n:dl(e.type)||"Memo";case mn:n=e._payload,e=e._init;try{return dl(e(n))}catch{}}return null}function Xa(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return dl(n);case 8:return n===oo?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function Bn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Su(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Za(e){var n=Su(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),r=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,l=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,l.call(this,o)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function _r(e){e._valueTracker||(e._valueTracker=Za(e))}function Eu(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),r="";return e&&(r=Su(e)?e.checked?"true":"false":e.value),e=r,e!==t?(n.setValue(e),!0):!1}function Gr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function fl(e,n){var t=n.checked;return X({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function es(e,n){var t=n.defaultValue==null?"":n.defaultValue,r=n.checked!=null?n.checked:n.defaultChecked;t=Bn(n.value!=null?n.value:t),e._wrapperState={initialChecked:r,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Du(e,n){n=n.checked,n!=null&&lo(e,"checked",n,!1)}function pl(e,n){Du(e,n);var t=Bn(n.value),r=n.type;if(t!=null)r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?hl(e,n.type,t):n.hasOwnProperty("defaultValue")&&hl(e,n.type,Bn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function ns(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var r=n.type;if(!(r!=="submit"&&r!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function hl(e,n,t){(n!=="number"||Gr(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Rt=Array.isArray;function at(e,n,t,r){if(e=e.options,n){n={};for(var i=0;i<t.length;i++)n["$"+t[i]]=!0;for(t=0;t<e.length;t++)i=n.hasOwnProperty("$"+e[t].value),e[t].selected!==i&&(e[t].selected=i),i&&r&&(e[t].defaultSelected=!0)}else{for(t=""+Bn(t),n=null,i=0;i<e.length;i++){if(e[i].value===t){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}n!==null||e[i].disabled||(n=e[i])}n!==null&&(n.selected=!0)}}function ml(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(_(91));return X({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ts(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(_(92));if(Rt(t)){if(1<t.length)throw Error(_(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:Bn(t)}}function Nu(e,n){var t=Bn(n.value),r=Bn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),r!=null&&(e.defaultValue=""+r)}function rs(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Au(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function yl(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Au(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var xr,Bu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,r,i){MSApp.execUnsafeLocalFunction(function(){return e(n,t,r,i)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(xr=xr||document.createElement("div"),xr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=xr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Zt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var $t={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ja=["Webkit","ms","Moz","O"];Object.keys($t).forEach(function(e){Ja.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),$t[n]=$t[e]})});function Pu(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||$t.hasOwnProperty(e)&&$t[e]?(""+n).trim():n+"px"}function Lu(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var r=t.indexOf("--")===0,i=Pu(t,n[t],r);t==="float"&&(t="cssFloat"),r?e.setProperty(t,i):e[t]=i}}var ba=X({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function kl(e,n){if(n){if(ba[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(_(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(_(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(_(61))}if(n.style!=null&&typeof n.style!="object")throw Error(_(62))}}function vl(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gl=null;function co(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var _l=null,dt=null,ft=null;function is(e){if(e=yr(e)){if(typeof _l!="function")throw Error(_(280));var n=e.stateNode;n&&(n=Ci(n),_l(e.stateNode,e.type,n))}}function ju(e){dt?ft?ft.push(e):ft=[e]:dt=e}function zu(){if(dt){var e=dt,n=ft;if(ft=dt=null,is(e),n)for(e=0;e<n.length;e++)is(n[e])}}function Tu(e,n){return e(n)}function Mu(){}var Ri=!1;function Iu(e,n,t){if(Ri)return e(n,t);Ri=!0;try{return Tu(e,n,t)}finally{Ri=!1,(dt!==null||ft!==null)&&(Mu(),zu())}}function Jt(e,n){var t=e.stateNode;if(t===null)return null;var r=Ci(t);if(r===null)return null;t=r[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(_(231,n,typeof t));return t}var xl=!1;if(sn)try{var Bt={};Object.defineProperty(Bt,"passive",{get:function(){xl=!0}}),window.addEventListener("test",Bt,Bt),window.removeEventListener("test",Bt,Bt)}catch{xl=!1}function ed(e,n,t,r,i,l,o,s,u){var d=Array.prototype.slice.call(arguments,3);try{n.apply(t,d)}catch(k){this.onError(k)}}var Ht=!1,Yr=null,Xr=!1,wl=null,nd={onError:function(e){Ht=!0,Yr=e}};function td(e,n,t,r,i,l,o,s,u){Ht=!1,Yr=null,ed.apply(nd,arguments)}function rd(e,n,t,r,i,l,o,s,u){if(td.apply(this,arguments),Ht){if(Ht){var d=Yr;Ht=!1,Yr=null}else throw Error(_(198));Xr||(Xr=!0,wl=d)}}function Yn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Ou(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function ls(e){if(Yn(e)!==e)throw Error(_(188))}function id(e){var n=e.alternate;if(!n){if(n=Yn(e),n===null)throw Error(_(188));return n!==e?null:e}for(var t=e,r=n;;){var i=t.return;if(i===null)break;var l=i.alternate;if(l===null){if(r=i.return,r!==null){t=r;continue}break}if(i.child===l.child){for(l=i.child;l;){if(l===t)return ls(i),e;if(l===r)return ls(i),n;l=l.sibling}throw Error(_(188))}if(t.return!==r.return)t=i,r=l;else{for(var o=!1,s=i.child;s;){if(s===t){o=!0,t=i,r=l;break}if(s===r){o=!0,r=i,t=l;break}s=s.sibling}if(!o){for(s=l.child;s;){if(s===t){o=!0,t=l,r=i;break}if(s===r){o=!0,r=l,t=i;break}s=s.sibling}if(!o)throw Error(_(189))}}if(t.alternate!==r)throw Error(_(190))}if(t.tag!==3)throw Error(_(188));return t.stateNode.current===t?e:n}function Ru(e){return e=id(e),e!==null?Fu(e):null}function Fu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Fu(e);if(n!==null)return n;e=e.sibling}return null}var qu=je.unstable_scheduleCallback,os=je.unstable_cancelCallback,ld=je.unstable_shouldYield,od=je.unstable_requestPaint,b=je.unstable_now,sd=je.unstable_getCurrentPriorityLevel,ao=je.unstable_ImmediatePriority,$u=je.unstable_UserBlockingPriority,Zr=je.unstable_NormalPriority,ud=je.unstable_LowPriority,Hu=je.unstable_IdlePriority,gi=null,be=null;function cd(e){if(be&&typeof be.onCommitFiberRoot=="function")try{be.onCommitFiberRoot(gi,e,void 0,(e.current.flags&128)===128)}catch{}}var Qe=Math.clz32?Math.clz32:fd,ad=Math.log,dd=Math.LN2;function fd(e){return e>>>=0,e===0?32:31-(ad(e)/dd|0)|0}var wr=64,Cr=4194304;function Ft(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Jr(e,n){var t=e.pendingLanes;if(t===0)return 0;var r=0,i=e.suspendedLanes,l=e.pingedLanes,o=t&268435455;if(o!==0){var s=o&~i;s!==0?r=Ft(s):(l&=o,l!==0&&(r=Ft(l)))}else o=t&~i,o!==0?r=Ft(o):l!==0&&(r=Ft(l));if(r===0)return 0;if(n!==0&&n!==r&&!(n&i)&&(i=r&-r,l=n&-n,i>=l||i===16&&(l&4194240)!==0))return n;if(r&4&&(r|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=r;0<n;)t=31-Qe(n),i=1<<t,r|=e[t],n&=~i;return r}function pd(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function hd(e,n){for(var t=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,l=e.pendingLanes;0<l;){var o=31-Qe(l),s=1<<o,u=i[o];u===-1?(!(s&t)||s&r)&&(i[o]=pd(s,n)):u<=n&&(e.expiredLanes|=s),l&=~s}}function Cl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Uu(){var e=wr;return wr<<=1,!(wr&4194240)&&(wr=64),e}function Fi(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function hr(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Qe(n),e[n]=t}function md(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<t;){var i=31-Qe(t),l=1<<i;n[i]=0,r[i]=-1,e[i]=-1,t&=~l}}function fo(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var r=31-Qe(t),i=1<<r;i&n|e[r]&n&&(e[r]|=n),t&=~i}}var q=0;function Vu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Wu,po,Qu,Ku,Gu,Sl=!1,Sr=[],xn=null,wn=null,Cn=null,bt=new Map,er=new Map,kn=[],yd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ss(e,n){switch(e){case"focusin":case"focusout":xn=null;break;case"dragenter":case"dragleave":wn=null;break;case"mouseover":case"mouseout":Cn=null;break;case"pointerover":case"pointerout":bt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":er.delete(n.pointerId)}}function Pt(e,n,t,r,i,l){return e===null||e.nativeEvent!==l?(e={blockedOn:n,domEventName:t,eventSystemFlags:r,nativeEvent:l,targetContainers:[i]},n!==null&&(n=yr(n),n!==null&&po(n)),e):(e.eventSystemFlags|=r,n=e.targetContainers,i!==null&&n.indexOf(i)===-1&&n.push(i),e)}function kd(e,n,t,r,i){switch(n){case"focusin":return xn=Pt(xn,e,n,t,r,i),!0;case"dragenter":return wn=Pt(wn,e,n,t,r,i),!0;case"mouseover":return Cn=Pt(Cn,e,n,t,r,i),!0;case"pointerover":var l=i.pointerId;return bt.set(l,Pt(bt.get(l)||null,e,n,t,r,i)),!0;case"gotpointercapture":return l=i.pointerId,er.set(l,Pt(er.get(l)||null,e,n,t,r,i)),!0}return!1}function Yu(e){var n=Rn(e.target);if(n!==null){var t=Yn(n);if(t!==null){if(n=t.tag,n===13){if(n=Ou(t),n!==null){e.blockedOn=n,Gu(e.priority,function(){Qu(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Rr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=El(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var r=new t.constructor(t.type,t);gl=r,t.target.dispatchEvent(r),gl=null}else return n=yr(t),n!==null&&po(n),e.blockedOn=t,!1;n.shift()}return!0}function us(e,n,t){Rr(e)&&t.delete(n)}function vd(){Sl=!1,xn!==null&&Rr(xn)&&(xn=null),wn!==null&&Rr(wn)&&(wn=null),Cn!==null&&Rr(Cn)&&(Cn=null),bt.forEach(us),er.forEach(us)}function Lt(e,n){e.blockedOn===n&&(e.blockedOn=null,Sl||(Sl=!0,je.unstable_scheduleCallback(je.unstable_NormalPriority,vd)))}function nr(e){function n(i){return Lt(i,e)}if(0<Sr.length){Lt(Sr[0],e);for(var t=1;t<Sr.length;t++){var r=Sr[t];r.blockedOn===e&&(r.blockedOn=null)}}for(xn!==null&&Lt(xn,e),wn!==null&&Lt(wn,e),Cn!==null&&Lt(Cn,e),bt.forEach(n),er.forEach(n),t=0;t<kn.length;t++)r=kn[t],r.blockedOn===e&&(r.blockedOn=null);for(;0<kn.length&&(t=kn[0],t.blockedOn===null);)Yu(t),t.blockedOn===null&&kn.shift()}var pt=dn.ReactCurrentBatchConfig,br=!0;function gd(e,n,t,r){var i=q,l=pt.transition;pt.transition=null;try{q=1,ho(e,n,t,r)}finally{q=i,pt.transition=l}}function _d(e,n,t,r){var i=q,l=pt.transition;pt.transition=null;try{q=4,ho(e,n,t,r)}finally{q=i,pt.transition=l}}function ho(e,n,t,r){if(br){var i=El(e,n,t,r);if(i===null)Yi(e,n,r,ei,t),ss(e,r);else if(kd(i,e,n,t,r))r.stopPropagation();else if(ss(e,r),n&4&&-1<yd.indexOf(e)){for(;i!==null;){var l=yr(i);if(l!==null&&Wu(l),l=El(e,n,t,r),l===null&&Yi(e,n,r,ei,t),l===i)break;i=l}i!==null&&r.stopPropagation()}else Yi(e,n,r,null,t)}}var ei=null;function El(e,n,t,r){if(ei=null,e=co(r),e=Rn(e),e!==null)if(n=Yn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Ou(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return ei=e,null}function Xu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(sd()){case ao:return 1;case $u:return 4;case Zr:case ud:return 16;case Hu:return 536870912;default:return 16}default:return 16}}var gn=null,mo=null,Fr=null;function Zu(){if(Fr)return Fr;var e,n=mo,t=n.length,r,i="value"in gn?gn.value:gn.textContent,l=i.length;for(e=0;e<t&&n[e]===i[e];e++);var o=t-e;for(r=1;r<=o&&n[t-r]===i[l-r];r++);return Fr=i.slice(e,1<r?1-r:void 0)}function qr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Er(){return!0}function cs(){return!1}function Te(e){function n(t,r,i,l,o){this._reactName=t,this._targetInst=i,this.type=r,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(t=e[s],this[s]=t?t(l):l[s]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Er:cs,this.isPropagationStopped=cs,this}return X(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Er)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Er)},persist:function(){},isPersistent:Er}),n}var St={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yo=Te(St),mr=X({},St,{view:0,detail:0}),xd=Te(mr),qi,$i,jt,_i=X({},mr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ko,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==jt&&(jt&&e.type==="mousemove"?(qi=e.screenX-jt.screenX,$i=e.screenY-jt.screenY):$i=qi=0,jt=e),qi)},movementY:function(e){return"movementY"in e?e.movementY:$i}}),as=Te(_i),wd=X({},_i,{dataTransfer:0}),Cd=Te(wd),Sd=X({},mr,{relatedTarget:0}),Hi=Te(Sd),Ed=X({},St,{animationName:0,elapsedTime:0,pseudoElement:0}),Dd=Te(Ed),Nd=X({},St,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Ad=Te(Nd),Bd=X({},St,{data:0}),ds=Te(Bd),Pd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ld={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function zd(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=jd[e])?!!n[e]:!1}function ko(){return zd}var Td=X({},mr,{key:function(e){if(e.key){var n=Pd[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=qr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ld[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ko,charCode:function(e){return e.type==="keypress"?qr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?qr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Md=Te(Td),Id=X({},_i,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),fs=Te(Id),Od=X({},mr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ko}),Rd=Te(Od),Fd=X({},St,{propertyName:0,elapsedTime:0,pseudoElement:0}),qd=Te(Fd),$d=X({},_i,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Hd=Te($d),Ud=[9,13,27,32],vo=sn&&"CompositionEvent"in window,Ut=null;sn&&"documentMode"in document&&(Ut=document.documentMode);var Vd=sn&&"TextEvent"in window&&!Ut,Ju=sn&&(!vo||Ut&&8<Ut&&11>=Ut),ps=" ",hs=!1;function bu(e,n){switch(e){case"keyup":return Ud.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ec(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var et=!1;function Wd(e,n){switch(e){case"compositionend":return ec(n);case"keypress":return n.which!==32?null:(hs=!0,ps);case"textInput":return e=n.data,e===ps&&hs?null:e;default:return null}}function Qd(e,n){if(et)return e==="compositionend"||!vo&&bu(e,n)?(e=Zu(),Fr=mo=gn=null,et=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Ju&&n.locale!=="ko"?null:n.data;default:return null}}var Kd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ms(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Kd[e.type]:n==="textarea"}function nc(e,n,t,r){ju(r),n=ni(n,"onChange"),0<n.length&&(t=new yo("onChange","change",null,t,r),e.push({event:t,listeners:n}))}var Vt=null,tr=null;function Gd(e){fc(e,0)}function xi(e){var n=rt(e);if(Eu(n))return e}function Yd(e,n){if(e==="change")return n}var tc=!1;if(sn){var Ui;if(sn){var Vi="oninput"in document;if(!Vi){var ys=document.createElement("div");ys.setAttribute("oninput","return;"),Vi=typeof ys.oninput=="function"}Ui=Vi}else Ui=!1;tc=Ui&&(!document.documentMode||9<document.documentMode)}function ks(){Vt&&(Vt.detachEvent("onpropertychange",rc),tr=Vt=null)}function rc(e){if(e.propertyName==="value"&&xi(tr)){var n=[];nc(n,tr,e,co(e)),Iu(Gd,n)}}function Xd(e,n,t){e==="focusin"?(ks(),Vt=n,tr=t,Vt.attachEvent("onpropertychange",rc)):e==="focusout"&&ks()}function Zd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return xi(tr)}function Jd(e,n){if(e==="click")return xi(n)}function bd(e,n){if(e==="input"||e==="change")return xi(n)}function ef(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Ge=typeof Object.is=="function"?Object.is:ef;function rr(e,n){if(Ge(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),r=Object.keys(n);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var i=t[r];if(!sl.call(n,i)||!Ge(e[i],n[i]))return!1}return!0}function vs(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function gs(e,n){var t=vs(e);e=0;for(var r;t;){if(t.nodeType===3){if(r=e+t.textContent.length,e<=n&&r>=n)return{node:t,offset:n-e};e=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=vs(t)}}function ic(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?ic(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function lc(){for(var e=window,n=Gr();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Gr(e.document)}return n}function go(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function nf(e){var n=lc(),t=e.focusedElem,r=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&ic(t.ownerDocument.documentElement,t)){if(r!==null&&go(t)){if(n=r.start,e=r.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var i=t.textContent.length,l=Math.min(r.start,i);r=r.end===void 0?l:Math.min(r.end,i),!e.extend&&l>r&&(i=r,r=l,l=i),i=gs(t,l);var o=gs(t,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(n=n.createRange(),n.setStart(i.node,i.offset),e.removeAllRanges(),l>r?(e.addRange(n),e.extend(o.node,o.offset)):(n.setEnd(o.node,o.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var tf=sn&&"documentMode"in document&&11>=document.documentMode,nt=null,Dl=null,Wt=null,Nl=!1;function _s(e,n,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Nl||nt==null||nt!==Gr(r)||(r=nt,"selectionStart"in r&&go(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Wt&&rr(Wt,r)||(Wt=r,r=ni(Dl,"onSelect"),0<r.length&&(n=new yo("onSelect","select",null,n,t),e.push({event:n,listeners:r}),n.target=nt)))}function Dr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var tt={animationend:Dr("Animation","AnimationEnd"),animationiteration:Dr("Animation","AnimationIteration"),animationstart:Dr("Animation","AnimationStart"),transitionend:Dr("Transition","TransitionEnd")},Wi={},oc={};sn&&(oc=document.createElement("div").style,"AnimationEvent"in window||(delete tt.animationend.animation,delete tt.animationiteration.animation,delete tt.animationstart.animation),"TransitionEvent"in window||delete tt.transitionend.transition);function wi(e){if(Wi[e])return Wi[e];if(!tt[e])return e;var n=tt[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in oc)return Wi[e]=n[t];return e}var sc=wi("animationend"),uc=wi("animationiteration"),cc=wi("animationstart"),ac=wi("transitionend"),dc=new Map,xs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ln(e,n){dc.set(e,n),Gn(n,[e])}for(var Qi=0;Qi<xs.length;Qi++){var Ki=xs[Qi],rf=Ki.toLowerCase(),lf=Ki[0].toUpperCase()+Ki.slice(1);Ln(rf,"on"+lf)}Ln(sc,"onAnimationEnd");Ln(uc,"onAnimationIteration");Ln(cc,"onAnimationStart");Ln("dblclick","onDoubleClick");Ln("focusin","onFocus");Ln("focusout","onBlur");Ln(ac,"onTransitionEnd");yt("onMouseEnter",["mouseout","mouseover"]);yt("onMouseLeave",["mouseout","mouseover"]);yt("onPointerEnter",["pointerout","pointerover"]);yt("onPointerLeave",["pointerout","pointerover"]);Gn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Gn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Gn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Gn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Gn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Gn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var qt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),of=new Set("cancel close invalid load scroll toggle".split(" ").concat(qt));function ws(e,n,t){var r=e.type||"unknown-event";e.currentTarget=t,rd(r,n,void 0,e),e.currentTarget=null}function fc(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var r=e[t],i=r.event;r=r.listeners;e:{var l=void 0;if(n)for(var o=r.length-1;0<=o;o--){var s=r[o],u=s.instance,d=s.currentTarget;if(s=s.listener,u!==l&&i.isPropagationStopped())break e;ws(i,s,d),l=u}else for(o=0;o<r.length;o++){if(s=r[o],u=s.instance,d=s.currentTarget,s=s.listener,u!==l&&i.isPropagationStopped())break e;ws(i,s,d),l=u}}}if(Xr)throw e=wl,Xr=!1,wl=null,e}function V(e,n){var t=n[jl];t===void 0&&(t=n[jl]=new Set);var r=e+"__bubble";t.has(r)||(pc(n,e,2,!1),t.add(r))}function Gi(e,n,t){var r=0;n&&(r|=4),pc(t,e,r,n)}var Nr="_reactListening"+Math.random().toString(36).slice(2);function ir(e){if(!e[Nr]){e[Nr]=!0,_u.forEach(function(t){t!=="selectionchange"&&(of.has(t)||Gi(t,!1,e),Gi(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Nr]||(n[Nr]=!0,Gi("selectionchange",!1,n))}}function pc(e,n,t,r){switch(Xu(n)){case 1:var i=gd;break;case 4:i=_d;break;default:i=ho}t=i.bind(null,n,t,e),i=void 0,!xl||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(n,t,{capture:!0,passive:i}):e.addEventListener(n,t,!0):i!==void 0?e.addEventListener(n,t,{passive:i}):e.addEventListener(n,t,!1)}function Yi(e,n,t,r,i){var l=r;if(!(n&1)&&!(n&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;s!==null;){if(o=Rn(s),o===null)return;if(u=o.tag,u===5||u===6){r=l=o;continue e}s=s.parentNode}}r=r.return}Iu(function(){var d=l,k=co(t),y=[];e:{var p=dc.get(e);if(p!==void 0){var w=yo,g=e;switch(e){case"keypress":if(qr(t)===0)break e;case"keydown":case"keyup":w=Md;break;case"focusin":g="focus",w=Hi;break;case"focusout":g="blur",w=Hi;break;case"beforeblur":case"afterblur":w=Hi;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=as;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=Cd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Rd;break;case sc:case uc:case cc:w=Dd;break;case ac:w=qd;break;case"scroll":w=xd;break;case"wheel":w=Hd;break;case"copy":case"cut":case"paste":w=Ad;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=fs}var E=(n&4)!==0,L=!E&&e==="scroll",a=E?p!==null?p+"Capture":null:p;E=[];for(var c=d,f;c!==null;){f=c;var v=f.stateNode;if(f.tag===5&&v!==null&&(f=v,a!==null&&(v=Jt(c,a),v!=null&&E.push(lr(c,v,f)))),L)break;c=c.return}0<E.length&&(p=new w(p,g,null,t,k),y.push({event:p,listeners:E}))}}if(!(n&7)){e:{if(p=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",p&&t!==gl&&(g=t.relatedTarget||t.fromElement)&&(Rn(g)||g[un]))break e;if((w||p)&&(p=k.window===k?k:(p=k.ownerDocument)?p.defaultView||p.parentWindow:window,w?(g=t.relatedTarget||t.toElement,w=d,g=g?Rn(g):null,g!==null&&(L=Yn(g),g!==L||g.tag!==5&&g.tag!==6)&&(g=null)):(w=null,g=d),w!==g)){if(E=as,v="onMouseLeave",a="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(E=fs,v="onPointerLeave",a="onPointerEnter",c="pointer"),L=w==null?p:rt(w),f=g==null?p:rt(g),p=new E(v,c+"leave",w,t,k),p.target=L,p.relatedTarget=f,v=null,Rn(k)===d&&(E=new E(a,c+"enter",g,t,k),E.target=f,E.relatedTarget=L,v=E),L=v,w&&g)n:{for(E=w,a=g,c=0,f=E;f;f=Zn(f))c++;for(f=0,v=a;v;v=Zn(v))f++;for(;0<c-f;)E=Zn(E),c--;for(;0<f-c;)a=Zn(a),f--;for(;c--;){if(E===a||a!==null&&E===a.alternate)break n;E=Zn(E),a=Zn(a)}E=null}else E=null;w!==null&&Cs(y,p,w,E,!1),g!==null&&L!==null&&Cs(y,L,g,E,!0)}}e:{if(p=d?rt(d):window,w=p.nodeName&&p.nodeName.toLowerCase(),w==="select"||w==="input"&&p.type==="file")var C=Yd;else if(ms(p))if(tc)C=bd;else{C=Zd;var N=Xd}else(w=p.nodeName)&&w.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(C=Jd);if(C&&(C=C(e,d))){nc(y,C,t,k);break e}N&&N(e,p,d),e==="focusout"&&(N=p._wrapperState)&&N.controlled&&p.type==="number"&&hl(p,"number",p.value)}switch(N=d?rt(d):window,e){case"focusin":(ms(N)||N.contentEditable==="true")&&(nt=N,Dl=d,Wt=null);break;case"focusout":Wt=Dl=nt=null;break;case"mousedown":Nl=!0;break;case"contextmenu":case"mouseup":case"dragend":Nl=!1,_s(y,t,k);break;case"selectionchange":if(tf)break;case"keydown":case"keyup":_s(y,t,k)}var D;if(vo)e:{switch(e){case"compositionstart":var B="onCompositionStart";break e;case"compositionend":B="onCompositionEnd";break e;case"compositionupdate":B="onCompositionUpdate";break e}B=void 0}else et?bu(e,t)&&(B="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(B="onCompositionStart");B&&(Ju&&t.locale!=="ko"&&(et||B!=="onCompositionStart"?B==="onCompositionEnd"&&et&&(D=Zu()):(gn=k,mo="value"in gn?gn.value:gn.textContent,et=!0)),N=ni(d,B),0<N.length&&(B=new ds(B,e,null,t,k),y.push({event:B,listeners:N}),D?B.data=D:(D=ec(t),D!==null&&(B.data=D)))),(D=Vd?Wd(e,t):Qd(e,t))&&(d=ni(d,"onBeforeInput"),0<d.length&&(k=new ds("onBeforeInput","beforeinput",null,t,k),y.push({event:k,listeners:d}),k.data=D))}fc(y,n)})}function lr(e,n,t){return{instance:e,listener:n,currentTarget:t}}function ni(e,n){for(var t=n+"Capture",r=[];e!==null;){var i=e,l=i.stateNode;i.tag===5&&l!==null&&(i=l,l=Jt(e,t),l!=null&&r.unshift(lr(e,l,i)),l=Jt(e,n),l!=null&&r.push(lr(e,l,i))),e=e.return}return r}function Zn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Cs(e,n,t,r,i){for(var l=n._reactName,o=[];t!==null&&t!==r;){var s=t,u=s.alternate,d=s.stateNode;if(u!==null&&u===r)break;s.tag===5&&d!==null&&(s=d,i?(u=Jt(t,l),u!=null&&o.unshift(lr(t,u,s))):i||(u=Jt(t,l),u!=null&&o.push(lr(t,u,s)))),t=t.return}o.length!==0&&e.push({event:n,listeners:o})}var sf=/\r\n?/g,uf=/\u0000|\uFFFD/g;function Ss(e){return(typeof e=="string"?e:""+e).replace(sf,`
`).replace(uf,"")}function Ar(e,n,t){if(n=Ss(n),Ss(e)!==n&&t)throw Error(_(425))}function ti(){}var Al=null,Bl=null;function Pl(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Ll=typeof setTimeout=="function"?setTimeout:void 0,cf=typeof clearTimeout=="function"?clearTimeout:void 0,Es=typeof Promise=="function"?Promise:void 0,af=typeof queueMicrotask=="function"?queueMicrotask:typeof Es<"u"?function(e){return Es.resolve(null).then(e).catch(df)}:Ll;function df(e){setTimeout(function(){throw e})}function Xi(e,n){var t=n,r=0;do{var i=t.nextSibling;if(e.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(r===0){e.removeChild(i),nr(n);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=i}while(t);nr(n)}function Sn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Ds(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var Et=Math.random().toString(36).slice(2),Je="__reactFiber$"+Et,or="__reactProps$"+Et,un="__reactContainer$"+Et,jl="__reactEvents$"+Et,ff="__reactListeners$"+Et,pf="__reactHandles$"+Et;function Rn(e){var n=e[Je];if(n)return n;for(var t=e.parentNode;t;){if(n=t[un]||t[Je]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Ds(e);e!==null;){if(t=e[Je])return t;e=Ds(e)}return n}e=t,t=e.parentNode}return null}function yr(e){return e=e[Je]||e[un],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function rt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(_(33))}function Ci(e){return e[or]||null}var zl=[],it=-1;function jn(e){return{current:e}}function W(e){0>it||(e.current=zl[it],zl[it]=null,it--)}function H(e,n){it++,zl[it]=e.current,e.current=n}var Pn={},ke=jn(Pn),De=jn(!1),Un=Pn;function kt(e,n){var t=e.type.contextTypes;if(!t)return Pn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===n)return r.__reactInternalMemoizedMaskedChildContext;var i={},l;for(l in t)i[l]=n[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=i),i}function Ne(e){return e=e.childContextTypes,e!=null}function ri(){W(De),W(ke)}function Ns(e,n,t){if(ke.current!==Pn)throw Error(_(168));H(ke,n),H(De,t)}function hc(e,n,t){var r=e.stateNode;if(n=n.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var i in r)if(!(i in n))throw Error(_(108,Xa(e)||"Unknown",i));return X({},t,r)}function ii(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Pn,Un=ke.current,H(ke,e),H(De,De.current),!0}function As(e,n,t){var r=e.stateNode;if(!r)throw Error(_(169));t?(e=hc(e,n,Un),r.__reactInternalMemoizedMergedChildContext=e,W(De),W(ke),H(ke,e)):W(De),H(De,t)}var tn=null,Si=!1,Zi=!1;function mc(e){tn===null?tn=[e]:tn.push(e)}function hf(e){Si=!0,mc(e)}function zn(){if(!Zi&&tn!==null){Zi=!0;var e=0,n=q;try{var t=tn;for(q=1;e<t.length;e++){var r=t[e];do r=r(!0);while(r!==null)}tn=null,Si=!1}catch(i){throw tn!==null&&(tn=tn.slice(e+1)),qu(ao,zn),i}finally{q=n,Zi=!1}}return null}var lt=[],ot=0,li=null,oi=0,Me=[],Ie=0,Vn=null,rn=1,ln="";function In(e,n){lt[ot++]=oi,lt[ot++]=li,li=e,oi=n}function yc(e,n,t){Me[Ie++]=rn,Me[Ie++]=ln,Me[Ie++]=Vn,Vn=e;var r=rn;e=ln;var i=32-Qe(r)-1;r&=~(1<<i),t+=1;var l=32-Qe(n)+i;if(30<l){var o=i-i%5;l=(r&(1<<o)-1).toString(32),r>>=o,i-=o,rn=1<<32-Qe(n)+i|t<<i|r,ln=l+e}else rn=1<<l|t<<i|r,ln=e}function _o(e){e.return!==null&&(In(e,1),yc(e,1,0))}function xo(e){for(;e===li;)li=lt[--ot],lt[ot]=null,oi=lt[--ot],lt[ot]=null;for(;e===Vn;)Vn=Me[--Ie],Me[Ie]=null,ln=Me[--Ie],Me[Ie]=null,rn=Me[--Ie],Me[Ie]=null}var Le=null,Pe=null,Q=!1,We=null;function kc(e,n){var t=Oe(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Bs(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,Le=e,Pe=Sn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,Le=e,Pe=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Vn!==null?{id:rn,overflow:ln}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Oe(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,Le=e,Pe=null,!0):!1;default:return!1}}function Tl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ml(e){if(Q){var n=Pe;if(n){var t=n;if(!Bs(e,n)){if(Tl(e))throw Error(_(418));n=Sn(t.nextSibling);var r=Le;n&&Bs(e,n)?kc(r,t):(e.flags=e.flags&-4097|2,Q=!1,Le=e)}}else{if(Tl(e))throw Error(_(418));e.flags=e.flags&-4097|2,Q=!1,Le=e}}}function Ps(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Le=e}function Br(e){if(e!==Le)return!1;if(!Q)return Ps(e),Q=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Pl(e.type,e.memoizedProps)),n&&(n=Pe)){if(Tl(e))throw vc(),Error(_(418));for(;n;)kc(e,n),n=Sn(n.nextSibling)}if(Ps(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(_(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){Pe=Sn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}Pe=null}}else Pe=Le?Sn(e.stateNode.nextSibling):null;return!0}function vc(){for(var e=Pe;e;)e=Sn(e.nextSibling)}function vt(){Pe=Le=null,Q=!1}function wo(e){We===null?We=[e]:We.push(e)}var mf=dn.ReactCurrentBatchConfig;function zt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(_(309));var r=t.stateNode}if(!r)throw Error(_(147,e));var i=r,l=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===l?n.ref:(n=function(o){var s=i.refs;o===null?delete s[l]:s[l]=o},n._stringRef=l,n)}if(typeof e!="string")throw Error(_(284));if(!t._owner)throw Error(_(290,e))}return e}function Pr(e,n){throw e=Object.prototype.toString.call(n),Error(_(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Ls(e){var n=e._init;return n(e._payload)}function gc(e){function n(a,c){if(e){var f=a.deletions;f===null?(a.deletions=[c],a.flags|=16):f.push(c)}}function t(a,c){if(!e)return null;for(;c!==null;)n(a,c),c=c.sibling;return null}function r(a,c){for(a=new Map;c!==null;)c.key!==null?a.set(c.key,c):a.set(c.index,c),c=c.sibling;return a}function i(a,c){return a=An(a,c),a.index=0,a.sibling=null,a}function l(a,c,f){return a.index=f,e?(f=a.alternate,f!==null?(f=f.index,f<c?(a.flags|=2,c):f):(a.flags|=2,c)):(a.flags|=1048576,c)}function o(a){return e&&a.alternate===null&&(a.flags|=2),a}function s(a,c,f,v){return c===null||c.tag!==6?(c=il(f,a.mode,v),c.return=a,c):(c=i(c,f),c.return=a,c)}function u(a,c,f,v){var C=f.type;return C===bn?k(a,c,f.props.children,v,f.key):c!==null&&(c.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===mn&&Ls(C)===c.type)?(v=i(c,f.props),v.ref=zt(a,c,f),v.return=a,v):(v=Kr(f.type,f.key,f.props,null,a.mode,v),v.ref=zt(a,c,f),v.return=a,v)}function d(a,c,f,v){return c===null||c.tag!==4||c.stateNode.containerInfo!==f.containerInfo||c.stateNode.implementation!==f.implementation?(c=ll(f,a.mode,v),c.return=a,c):(c=i(c,f.children||[]),c.return=a,c)}function k(a,c,f,v,C){return c===null||c.tag!==7?(c=Hn(f,a.mode,v,C),c.return=a,c):(c=i(c,f),c.return=a,c)}function y(a,c,f){if(typeof c=="string"&&c!==""||typeof c=="number")return c=il(""+c,a.mode,f),c.return=a,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case gr:return f=Kr(c.type,c.key,c.props,null,a.mode,f),f.ref=zt(a,null,c),f.return=a,f;case Jn:return c=ll(c,a.mode,f),c.return=a,c;case mn:var v=c._init;return y(a,v(c._payload),f)}if(Rt(c)||At(c))return c=Hn(c,a.mode,f,null),c.return=a,c;Pr(a,c)}return null}function p(a,c,f,v){var C=c!==null?c.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return C!==null?null:s(a,c,""+f,v);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case gr:return f.key===C?u(a,c,f,v):null;case Jn:return f.key===C?d(a,c,f,v):null;case mn:return C=f._init,p(a,c,C(f._payload),v)}if(Rt(f)||At(f))return C!==null?null:k(a,c,f,v,null);Pr(a,f)}return null}function w(a,c,f,v,C){if(typeof v=="string"&&v!==""||typeof v=="number")return a=a.get(f)||null,s(c,a,""+v,C);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case gr:return a=a.get(v.key===null?f:v.key)||null,u(c,a,v,C);case Jn:return a=a.get(v.key===null?f:v.key)||null,d(c,a,v,C);case mn:var N=v._init;return w(a,c,f,N(v._payload),C)}if(Rt(v)||At(v))return a=a.get(f)||null,k(c,a,v,C,null);Pr(c,v)}return null}function g(a,c,f,v){for(var C=null,N=null,D=c,B=c=0,K=null;D!==null&&B<f.length;B++){D.index>B?(K=D,D=null):K=D.sibling;var j=p(a,D,f[B],v);if(j===null){D===null&&(D=K);break}e&&D&&j.alternate===null&&n(a,D),c=l(j,c,B),N===null?C=j:N.sibling=j,N=j,D=K}if(B===f.length)return t(a,D),Q&&In(a,B),C;if(D===null){for(;B<f.length;B++)D=y(a,f[B],v),D!==null&&(c=l(D,c,B),N===null?C=D:N.sibling=D,N=D);return Q&&In(a,B),C}for(D=r(a,D);B<f.length;B++)K=w(D,a,B,f[B],v),K!==null&&(e&&K.alternate!==null&&D.delete(K.key===null?B:K.key),c=l(K,c,B),N===null?C=K:N.sibling=K,N=K);return e&&D.forEach(function(se){return n(a,se)}),Q&&In(a,B),C}function E(a,c,f,v){var C=At(f);if(typeof C!="function")throw Error(_(150));if(f=C.call(f),f==null)throw Error(_(151));for(var N=C=null,D=c,B=c=0,K=null,j=f.next();D!==null&&!j.done;B++,j=f.next()){D.index>B?(K=D,D=null):K=D.sibling;var se=p(a,D,j.value,v);if(se===null){D===null&&(D=K);break}e&&D&&se.alternate===null&&n(a,D),c=l(se,c,B),N===null?C=se:N.sibling=se,N=se,D=K}if(j.done)return t(a,D),Q&&In(a,B),C;if(D===null){for(;!j.done;B++,j=f.next())j=y(a,j.value,v),j!==null&&(c=l(j,c,B),N===null?C=j:N.sibling=j,N=j);return Q&&In(a,B),C}for(D=r(a,D);!j.done;B++,j=f.next())j=w(D,a,B,j.value,v),j!==null&&(e&&j.alternate!==null&&D.delete(j.key===null?B:j.key),c=l(j,c,B),N===null?C=j:N.sibling=j,N=j);return e&&D.forEach(function(Ce){return n(a,Ce)}),Q&&In(a,B),C}function L(a,c,f,v){if(typeof f=="object"&&f!==null&&f.type===bn&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case gr:e:{for(var C=f.key,N=c;N!==null;){if(N.key===C){if(C=f.type,C===bn){if(N.tag===7){t(a,N.sibling),c=i(N,f.props.children),c.return=a,a=c;break e}}else if(N.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===mn&&Ls(C)===N.type){t(a,N.sibling),c=i(N,f.props),c.ref=zt(a,N,f),c.return=a,a=c;break e}t(a,N);break}else n(a,N);N=N.sibling}f.type===bn?(c=Hn(f.props.children,a.mode,v,f.key),c.return=a,a=c):(v=Kr(f.type,f.key,f.props,null,a.mode,v),v.ref=zt(a,c,f),v.return=a,a=v)}return o(a);case Jn:e:{for(N=f.key;c!==null;){if(c.key===N)if(c.tag===4&&c.stateNode.containerInfo===f.containerInfo&&c.stateNode.implementation===f.implementation){t(a,c.sibling),c=i(c,f.children||[]),c.return=a,a=c;break e}else{t(a,c);break}else n(a,c);c=c.sibling}c=ll(f,a.mode,v),c.return=a,a=c}return o(a);case mn:return N=f._init,L(a,c,N(f._payload),v)}if(Rt(f))return g(a,c,f,v);if(At(f))return E(a,c,f,v);Pr(a,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,c!==null&&c.tag===6?(t(a,c.sibling),c=i(c,f),c.return=a,a=c):(t(a,c),c=il(f,a.mode,v),c.return=a,a=c),o(a)):t(a,c)}return L}var gt=gc(!0),_c=gc(!1),si=jn(null),ui=null,st=null,Co=null;function So(){Co=st=ui=null}function Eo(e){var n=si.current;W(si),e._currentValue=n}function Il(e,n,t){for(;e!==null;){var r=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),e===t)break;e=e.return}}function ht(e,n){ui=e,Co=st=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(Ee=!0),e.firstContext=null)}function Fe(e){var n=e._currentValue;if(Co!==e)if(e={context:e,memoizedValue:n,next:null},st===null){if(ui===null)throw Error(_(308));st=e,ui.dependencies={lanes:0,firstContext:e}}else st=st.next=e;return n}var Fn=null;function Do(e){Fn===null?Fn=[e]:Fn.push(e)}function xc(e,n,t,r){var i=n.interleaved;return i===null?(t.next=t,Do(n)):(t.next=i.next,i.next=t),n.interleaved=t,cn(e,r)}function cn(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var yn=!1;function No(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function wc(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function on(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function En(e,n,t){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,O&2){var i=r.pending;return i===null?n.next=n:(n.next=i.next,i.next=n),r.pending=n,cn(e,t)}return i=r.interleaved,i===null?(n.next=n,Do(r)):(n.next=i.next,i.next=n),r.interleaved=n,cn(e,t)}function $r(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,fo(e,t)}}function js(e,n){var t=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var i=null,l=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};l===null?i=l=o:l=l.next=o,t=t.next}while(t!==null);l===null?i=l=n:l=l.next=n}else i=l=n;t={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function ci(e,n,t,r){var i=e.updateQueue;yn=!1;var l=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var u=s,d=u.next;u.next=null,o===null?l=d:o.next=d,o=u;var k=e.alternate;k!==null&&(k=k.updateQueue,s=k.lastBaseUpdate,s!==o&&(s===null?k.firstBaseUpdate=d:s.next=d,k.lastBaseUpdate=u))}if(l!==null){var y=i.baseState;o=0,k=d=u=null,s=l;do{var p=s.lane,w=s.eventTime;if((r&p)===p){k!==null&&(k=k.next={eventTime:w,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var g=e,E=s;switch(p=n,w=t,E.tag){case 1:if(g=E.payload,typeof g=="function"){y=g.call(w,y,p);break e}y=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=E.payload,p=typeof g=="function"?g.call(w,y,p):g,p==null)break e;y=X({},y,p);break e;case 2:yn=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[s]:p.push(s))}else w={eventTime:w,lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},k===null?(d=k=w,u=y):k=k.next=w,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(k===null&&(u=y),i.baseState=u,i.firstBaseUpdate=d,i.lastBaseUpdate=k,n=i.shared.interleaved,n!==null){i=n;do o|=i.lane,i=i.next;while(i!==n)}else l===null&&(i.shared.lanes=0);Qn|=o,e.lanes=o,e.memoizedState=y}}function zs(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var r=e[n],i=r.callback;if(i!==null){if(r.callback=null,r=t,typeof i!="function")throw Error(_(191,i));i.call(r)}}}var kr={},en=jn(kr),sr=jn(kr),ur=jn(kr);function qn(e){if(e===kr)throw Error(_(174));return e}function Ao(e,n){switch(H(ur,n),H(sr,e),H(en,kr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:yl(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=yl(n,e)}W(en),H(en,n)}function _t(){W(en),W(sr),W(ur)}function Cc(e){qn(ur.current);var n=qn(en.current),t=yl(n,e.type);n!==t&&(H(sr,e),H(en,t))}function Bo(e){sr.current===e&&(W(en),W(sr))}var G=jn(0);function ai(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ji=[];function Po(){for(var e=0;e<Ji.length;e++)Ji[e]._workInProgressVersionPrimary=null;Ji.length=0}var Hr=dn.ReactCurrentDispatcher,bi=dn.ReactCurrentBatchConfig,Wn=0,Y=null,le=null,ue=null,di=!1,Qt=!1,cr=0,yf=0;function he(){throw Error(_(321))}function Lo(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Ge(e[t],n[t]))return!1;return!0}function jo(e,n,t,r,i,l){if(Wn=l,Y=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Hr.current=e===null||e.memoizedState===null?_f:xf,e=t(r,i),Qt){l=0;do{if(Qt=!1,cr=0,25<=l)throw Error(_(301));l+=1,ue=le=null,n.updateQueue=null,Hr.current=wf,e=t(r,i)}while(Qt)}if(Hr.current=fi,n=le!==null&&le.next!==null,Wn=0,ue=le=Y=null,di=!1,n)throw Error(_(300));return e}function zo(){var e=cr!==0;return cr=0,e}function Ze(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ue===null?Y.memoizedState=ue=e:ue=ue.next=e,ue}function qe(){if(le===null){var e=Y.alternate;e=e!==null?e.memoizedState:null}else e=le.next;var n=ue===null?Y.memoizedState:ue.next;if(n!==null)ue=n,le=e;else{if(e===null)throw Error(_(310));le=e,e={memoizedState:le.memoizedState,baseState:le.baseState,baseQueue:le.baseQueue,queue:le.queue,next:null},ue===null?Y.memoizedState=ue=e:ue=ue.next=e}return ue}function ar(e,n){return typeof n=="function"?n(e):n}function el(e){var n=qe(),t=n.queue;if(t===null)throw Error(_(311));t.lastRenderedReducer=e;var r=le,i=r.baseQueue,l=t.pending;if(l!==null){if(i!==null){var o=i.next;i.next=l.next,l.next=o}r.baseQueue=i=l,t.pending=null}if(i!==null){l=i.next,r=r.baseState;var s=o=null,u=null,d=l;do{var k=d.lane;if((Wn&k)===k)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var y={lane:k,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(s=u=y,o=r):u=u.next=y,Y.lanes|=k,Qn|=k}d=d.next}while(d!==null&&d!==l);u===null?o=r:u.next=s,Ge(r,n.memoizedState)||(Ee=!0),n.memoizedState=r,n.baseState=o,n.baseQueue=u,t.lastRenderedState=r}if(e=t.interleaved,e!==null){i=e;do l=i.lane,Y.lanes|=l,Qn|=l,i=i.next;while(i!==e)}else i===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function nl(e){var n=qe(),t=n.queue;if(t===null)throw Error(_(311));t.lastRenderedReducer=e;var r=t.dispatch,i=t.pending,l=n.memoizedState;if(i!==null){t.pending=null;var o=i=i.next;do l=e(l,o.action),o=o.next;while(o!==i);Ge(l,n.memoizedState)||(Ee=!0),n.memoizedState=l,n.baseQueue===null&&(n.baseState=l),t.lastRenderedState=l}return[l,r]}function Sc(){}function Ec(e,n){var t=Y,r=qe(),i=n(),l=!Ge(r.memoizedState,i);if(l&&(r.memoizedState=i,Ee=!0),r=r.queue,To(Ac.bind(null,t,r,e),[e]),r.getSnapshot!==n||l||ue!==null&&ue.memoizedState.tag&1){if(t.flags|=2048,dr(9,Nc.bind(null,t,r,i,n),void 0,null),ce===null)throw Error(_(349));Wn&30||Dc(t,n,i)}return i}function Dc(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=Y.updateQueue,n===null?(n={lastEffect:null,stores:null},Y.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Nc(e,n,t,r){n.value=t,n.getSnapshot=r,Bc(n)&&Pc(e)}function Ac(e,n,t){return t(function(){Bc(n)&&Pc(e)})}function Bc(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Ge(e,t)}catch{return!0}}function Pc(e){var n=cn(e,1);n!==null&&Ke(n,e,1,-1)}function Ts(e){var n=Ze();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ar,lastRenderedState:e},n.queue=e,e=e.dispatch=gf.bind(null,Y,e),[n.memoizedState,e]}function dr(e,n,t,r){return e={tag:e,create:n,destroy:t,deps:r,next:null},n=Y.updateQueue,n===null?(n={lastEffect:null,stores:null},Y.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(r=t.next,t.next=e,e.next=r,n.lastEffect=e)),e}function Lc(){return qe().memoizedState}function Ur(e,n,t,r){var i=Ze();Y.flags|=e,i.memoizedState=dr(1|n,t,void 0,r===void 0?null:r)}function Ei(e,n,t,r){var i=qe();r=r===void 0?null:r;var l=void 0;if(le!==null){var o=le.memoizedState;if(l=o.destroy,r!==null&&Lo(r,o.deps)){i.memoizedState=dr(n,t,l,r);return}}Y.flags|=e,i.memoizedState=dr(1|n,t,l,r)}function Ms(e,n){return Ur(8390656,8,e,n)}function To(e,n){return Ei(2048,8,e,n)}function jc(e,n){return Ei(4,2,e,n)}function zc(e,n){return Ei(4,4,e,n)}function Tc(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Mc(e,n,t){return t=t!=null?t.concat([e]):null,Ei(4,4,Tc.bind(null,n,e),t)}function Mo(){}function Ic(e,n){var t=qe();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Lo(n,r[1])?r[0]:(t.memoizedState=[e,n],e)}function Oc(e,n){var t=qe();n=n===void 0?null:n;var r=t.memoizedState;return r!==null&&n!==null&&Lo(n,r[1])?r[0]:(e=e(),t.memoizedState=[e,n],e)}function Rc(e,n,t){return Wn&21?(Ge(t,n)||(t=Uu(),Y.lanes|=t,Qn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,Ee=!0),e.memoizedState=t)}function kf(e,n){var t=q;q=t!==0&&4>t?t:4,e(!0);var r=bi.transition;bi.transition={};try{e(!1),n()}finally{q=t,bi.transition=r}}function Fc(){return qe().memoizedState}function vf(e,n,t){var r=Nn(e);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},qc(e))$c(n,t);else if(t=xc(e,n,t,r),t!==null){var i=_e();Ke(t,e,r,i),Hc(t,n,r)}}function gf(e,n,t){var r=Nn(e),i={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(qc(e))$c(n,i);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=n.lastRenderedReducer,l!==null))try{var o=n.lastRenderedState,s=l(o,t);if(i.hasEagerState=!0,i.eagerState=s,Ge(s,o)){var u=n.interleaved;u===null?(i.next=i,Do(n)):(i.next=u.next,u.next=i),n.interleaved=i;return}}catch{}finally{}t=xc(e,n,i,r),t!==null&&(i=_e(),Ke(t,e,r,i),Hc(t,n,r))}}function qc(e){var n=e.alternate;return e===Y||n!==null&&n===Y}function $c(e,n){Qt=di=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Hc(e,n,t){if(t&4194240){var r=n.lanes;r&=e.pendingLanes,t|=r,n.lanes=t,fo(e,t)}}var fi={readContext:Fe,useCallback:he,useContext:he,useEffect:he,useImperativeHandle:he,useInsertionEffect:he,useLayoutEffect:he,useMemo:he,useReducer:he,useRef:he,useState:he,useDebugValue:he,useDeferredValue:he,useTransition:he,useMutableSource:he,useSyncExternalStore:he,useId:he,unstable_isNewReconciler:!1},_f={readContext:Fe,useCallback:function(e,n){return Ze().memoizedState=[e,n===void 0?null:n],e},useContext:Fe,useEffect:Ms,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Ur(4194308,4,Tc.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Ur(4194308,4,e,n)},useInsertionEffect:function(e,n){return Ur(4,2,e,n)},useMemo:function(e,n){var t=Ze();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var r=Ze();return n=t!==void 0?t(n):n,r.memoizedState=r.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},r.queue=e,e=e.dispatch=vf.bind(null,Y,e),[r.memoizedState,e]},useRef:function(e){var n=Ze();return e={current:e},n.memoizedState=e},useState:Ts,useDebugValue:Mo,useDeferredValue:function(e){return Ze().memoizedState=e},useTransition:function(){var e=Ts(!1),n=e[0];return e=kf.bind(null,e[1]),Ze().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var r=Y,i=Ze();if(Q){if(t===void 0)throw Error(_(407));t=t()}else{if(t=n(),ce===null)throw Error(_(349));Wn&30||Dc(r,n,t)}i.memoizedState=t;var l={value:t,getSnapshot:n};return i.queue=l,Ms(Ac.bind(null,r,l,e),[e]),r.flags|=2048,dr(9,Nc.bind(null,r,l,t,n),void 0,null),t},useId:function(){var e=Ze(),n=ce.identifierPrefix;if(Q){var t=ln,r=rn;t=(r&~(1<<32-Qe(r)-1)).toString(32)+t,n=":"+n+"R"+t,t=cr++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=yf++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},xf={readContext:Fe,useCallback:Ic,useContext:Fe,useEffect:To,useImperativeHandle:Mc,useInsertionEffect:jc,useLayoutEffect:zc,useMemo:Oc,useReducer:el,useRef:Lc,useState:function(){return el(ar)},useDebugValue:Mo,useDeferredValue:function(e){var n=qe();return Rc(n,le.memoizedState,e)},useTransition:function(){var e=el(ar)[0],n=qe().memoizedState;return[e,n]},useMutableSource:Sc,useSyncExternalStore:Ec,useId:Fc,unstable_isNewReconciler:!1},wf={readContext:Fe,useCallback:Ic,useContext:Fe,useEffect:To,useImperativeHandle:Mc,useInsertionEffect:jc,useLayoutEffect:zc,useMemo:Oc,useReducer:nl,useRef:Lc,useState:function(){return nl(ar)},useDebugValue:Mo,useDeferredValue:function(e){var n=qe();return le===null?n.memoizedState=e:Rc(n,le.memoizedState,e)},useTransition:function(){var e=nl(ar)[0],n=qe().memoizedState;return[e,n]},useMutableSource:Sc,useSyncExternalStore:Ec,useId:Fc,unstable_isNewReconciler:!1};function Ue(e,n){if(e&&e.defaultProps){n=X({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Ol(e,n,t,r){n=e.memoizedState,t=t(r,n),t=t==null?n:X({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Di={isMounted:function(e){return(e=e._reactInternals)?Yn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var r=_e(),i=Nn(e),l=on(r,i);l.payload=n,t!=null&&(l.callback=t),n=En(e,l,i),n!==null&&(Ke(n,e,i,r),$r(n,e,i))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var r=_e(),i=Nn(e),l=on(r,i);l.tag=1,l.payload=n,t!=null&&(l.callback=t),n=En(e,l,i),n!==null&&(Ke(n,e,i,r),$r(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=_e(),r=Nn(e),i=on(t,r);i.tag=2,n!=null&&(i.callback=n),n=En(e,i,r),n!==null&&(Ke(n,e,r,t),$r(n,e,r))}};function Is(e,n,t,r,i,l,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,o):n.prototype&&n.prototype.isPureReactComponent?!rr(t,r)||!rr(i,l):!0}function Uc(e,n,t){var r=!1,i=Pn,l=n.contextType;return typeof l=="object"&&l!==null?l=Fe(l):(i=Ne(n)?Un:ke.current,r=n.contextTypes,l=(r=r!=null)?kt(e,i):Pn),n=new n(t,l),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Di,e.stateNode=n,n._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=l),n}function Os(e,n,t,r){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,r),n.state!==e&&Di.enqueueReplaceState(n,n.state,null)}function Rl(e,n,t,r){var i=e.stateNode;i.props=t,i.state=e.memoizedState,i.refs={},No(e);var l=n.contextType;typeof l=="object"&&l!==null?i.context=Fe(l):(l=Ne(n)?Un:ke.current,i.context=kt(e,l)),i.state=e.memoizedState,l=n.getDerivedStateFromProps,typeof l=="function"&&(Ol(e,n,l,t),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(n=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),n!==i.state&&Di.enqueueReplaceState(i,i.state,null),ci(e,t,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function xt(e,n){try{var t="",r=n;do t+=Ya(r),r=r.return;while(r);var i=t}catch(l){i=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:n,stack:i,digest:null}}function tl(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function Fl(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var Cf=typeof WeakMap=="function"?WeakMap:Map;function Vc(e,n,t){t=on(-1,t),t.tag=3,t.payload={element:null};var r=n.value;return t.callback=function(){hi||(hi=!0,Yl=r),Fl(e,n)},t}function Wc(e,n,t){t=on(-1,t),t.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=n.value;t.payload=function(){return r(i)},t.callback=function(){Fl(e,n)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(t.callback=function(){Fl(e,n),typeof r!="function"&&(Dn===null?Dn=new Set([this]):Dn.add(this));var o=n.stack;this.componentDidCatch(n.value,{componentStack:o!==null?o:""})}),t}function Rs(e,n,t){var r=e.pingCache;if(r===null){r=e.pingCache=new Cf;var i=new Set;r.set(n,i)}else i=r.get(n),i===void 0&&(i=new Set,r.set(n,i));i.has(t)||(i.add(t),e=Of.bind(null,e,n,t),n.then(e,e))}function Fs(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function qs(e,n,t,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=on(-1,1),n.tag=2,En(t,n,1))),t.lanes|=1),e)}var Sf=dn.ReactCurrentOwner,Ee=!1;function ge(e,n,t,r){n.child=e===null?_c(n,null,t,r):gt(n,e.child,t,r)}function $s(e,n,t,r,i){t=t.render;var l=n.ref;return ht(n,i),r=jo(e,n,t,r,l,i),t=zo(),e!==null&&!Ee?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,an(e,n,i)):(Q&&t&&_o(n),n.flags|=1,ge(e,n,r,i),n.child)}function Hs(e,n,t,r,i){if(e===null){var l=t.type;return typeof l=="function"&&!Uo(l)&&l.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=l,Qc(e,n,l,r,i)):(e=Kr(t.type,null,r,n,n.mode,i),e.ref=n.ref,e.return=n,n.child=e)}if(l=e.child,!(e.lanes&i)){var o=l.memoizedProps;if(t=t.compare,t=t!==null?t:rr,t(o,r)&&e.ref===n.ref)return an(e,n,i)}return n.flags|=1,e=An(l,r),e.ref=n.ref,e.return=n,n.child=e}function Qc(e,n,t,r,i){if(e!==null){var l=e.memoizedProps;if(rr(l,r)&&e.ref===n.ref)if(Ee=!1,n.pendingProps=r=l,(e.lanes&i)!==0)e.flags&131072&&(Ee=!0);else return n.lanes=e.lanes,an(e,n,i)}return ql(e,n,t,r,i)}function Kc(e,n,t){var r=n.pendingProps,i=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},H(ct,Be),Be|=t;else{if(!(t&1073741824))return e=l!==null?l.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,H(ct,Be),Be|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:t,H(ct,Be),Be|=r}else l!==null?(r=l.baseLanes|t,n.memoizedState=null):r=t,H(ct,Be),Be|=r;return ge(e,n,i,t),n.child}function Gc(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function ql(e,n,t,r,i){var l=Ne(t)?Un:ke.current;return l=kt(n,l),ht(n,i),t=jo(e,n,t,r,l,i),r=zo(),e!==null&&!Ee?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,an(e,n,i)):(Q&&r&&_o(n),n.flags|=1,ge(e,n,t,i),n.child)}function Us(e,n,t,r,i){if(Ne(t)){var l=!0;ii(n)}else l=!1;if(ht(n,i),n.stateNode===null)Vr(e,n),Uc(n,t,r),Rl(n,t,r,i),r=!0;else if(e===null){var o=n.stateNode,s=n.memoizedProps;o.props=s;var u=o.context,d=t.contextType;typeof d=="object"&&d!==null?d=Fe(d):(d=Ne(t)?Un:ke.current,d=kt(n,d));var k=t.getDerivedStateFromProps,y=typeof k=="function"||typeof o.getSnapshotBeforeUpdate=="function";y||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||u!==d)&&Os(n,o,r,d),yn=!1;var p=n.memoizedState;o.state=p,ci(n,r,o,i),u=n.memoizedState,s!==r||p!==u||De.current||yn?(typeof k=="function"&&(Ol(n,t,k,r),u=n.memoizedState),(s=yn||Is(n,t,s,r,p,u,d))?(y||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(n.flags|=4194308)):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=u),o.props=r,o.state=u,o.context=d,r=s):(typeof o.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{o=n.stateNode,wc(e,n),s=n.memoizedProps,d=n.type===n.elementType?s:Ue(n.type,s),o.props=d,y=n.pendingProps,p=o.context,u=t.contextType,typeof u=="object"&&u!==null?u=Fe(u):(u=Ne(t)?Un:ke.current,u=kt(n,u));var w=t.getDerivedStateFromProps;(k=typeof w=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==y||p!==u)&&Os(n,o,r,u),yn=!1,p=n.memoizedState,o.state=p,ci(n,r,o,i);var g=n.memoizedState;s!==y||p!==g||De.current||yn?(typeof w=="function"&&(Ol(n,t,w,r),g=n.memoizedState),(d=yn||Is(n,t,d,r,p,g,u)||!1)?(k||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,g,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,g,u)),typeof o.componentDidUpdate=="function"&&(n.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=g),o.props=r,o.state=g,o.context=u,r=d):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),r=!1)}return $l(e,n,t,r,l,i)}function $l(e,n,t,r,i,l){Gc(e,n);var o=(n.flags&128)!==0;if(!r&&!o)return i&&As(n,t,!1),an(e,n,l);r=n.stateNode,Sf.current=n;var s=o&&typeof t.getDerivedStateFromError!="function"?null:r.render();return n.flags|=1,e!==null&&o?(n.child=gt(n,e.child,null,l),n.child=gt(n,null,s,l)):ge(e,n,s,l),n.memoizedState=r.state,i&&As(n,t,!0),n.child}function Yc(e){var n=e.stateNode;n.pendingContext?Ns(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Ns(e,n.context,!1),Ao(e,n.containerInfo)}function Vs(e,n,t,r,i){return vt(),wo(i),n.flags|=256,ge(e,n,t,r),n.child}var Hl={dehydrated:null,treeContext:null,retryLane:0};function Ul(e){return{baseLanes:e,cachePool:null,transitions:null}}function Xc(e,n,t){var r=n.pendingProps,i=G.current,l=!1,o=(n.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(i&2)!==0),s?(l=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),H(G,i&1),e===null)return Ml(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(o=r.children,e=r.fallback,l?(r=n.mode,l=n.child,o={mode:"hidden",children:o},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=o):l=Bi(o,r,0,null),e=Hn(e,r,t,null),l.return=n,e.return=n,l.sibling=e,n.child=l,n.child.memoizedState=Ul(t),n.memoizedState=Hl,e):Io(n,o));if(i=e.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return Ef(e,n,o,r,s,i,t);if(l){l=r.fallback,o=n.mode,i=e.child,s=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&n.child!==i?(r=n.child,r.childLanes=0,r.pendingProps=u,n.deletions=null):(r=An(i,u),r.subtreeFlags=i.subtreeFlags&14680064),s!==null?l=An(s,l):(l=Hn(l,o,t,null),l.flags|=2),l.return=n,r.return=n,r.sibling=l,n.child=r,r=l,l=n.child,o=e.child.memoizedState,o=o===null?Ul(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=e.childLanes&~t,n.memoizedState=Hl,r}return l=e.child,e=l.sibling,r=An(l,{mode:"visible",children:r.children}),!(n.mode&1)&&(r.lanes=t),r.return=n,r.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=r,n.memoizedState=null,r}function Io(e,n){return n=Bi({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Lr(e,n,t,r){return r!==null&&wo(r),gt(n,e.child,null,t),e=Io(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Ef(e,n,t,r,i,l,o){if(t)return n.flags&256?(n.flags&=-257,r=tl(Error(_(422))),Lr(e,n,o,r)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(l=r.fallback,i=n.mode,r=Bi({mode:"visible",children:r.children},i,0,null),l=Hn(l,i,o,null),l.flags|=2,r.return=n,l.return=n,r.sibling=l,n.child=r,n.mode&1&&gt(n,e.child,null,o),n.child.memoizedState=Ul(o),n.memoizedState=Hl,l);if(!(n.mode&1))return Lr(e,n,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var s=r.dgst;return r=s,l=Error(_(419)),r=tl(l,r,void 0),Lr(e,n,o,r)}if(s=(o&e.childLanes)!==0,Ee||s){if(r=ce,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==l.retryLane&&(l.retryLane=i,cn(e,i),Ke(r,e,i,-1))}return Ho(),r=tl(Error(_(421))),Lr(e,n,o,r)}return i.data==="$?"?(n.flags|=128,n.child=e.child,n=Rf.bind(null,e),i._reactRetry=n,null):(e=l.treeContext,Pe=Sn(i.nextSibling),Le=n,Q=!0,We=null,e!==null&&(Me[Ie++]=rn,Me[Ie++]=ln,Me[Ie++]=Vn,rn=e.id,ln=e.overflow,Vn=n),n=Io(n,r.children),n.flags|=4096,n)}function Ws(e,n,t){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n),Il(e.return,n,t)}function rl(e,n,t,r,i){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:i}:(l.isBackwards=n,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=t,l.tailMode=i)}function Zc(e,n,t){var r=n.pendingProps,i=r.revealOrder,l=r.tail;if(ge(e,n,r.children,t),r=G.current,r&2)r=r&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ws(e,t,n);else if(e.tag===19)Ws(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(H(G,r),!(n.mode&1))n.memoizedState=null;else switch(i){case"forwards":for(t=n.child,i=null;t!==null;)e=t.alternate,e!==null&&ai(e)===null&&(i=t),t=t.sibling;t=i,t===null?(i=n.child,n.child=null):(i=t.sibling,t.sibling=null),rl(n,!1,i,t,l);break;case"backwards":for(t=null,i=n.child,n.child=null;i!==null;){if(e=i.alternate,e!==null&&ai(e)===null){n.child=i;break}e=i.sibling,i.sibling=t,t=i,i=e}rl(n,!0,t,null,l);break;case"together":rl(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Vr(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function an(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Qn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(_(153));if(n.child!==null){for(e=n.child,t=An(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=An(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Df(e,n,t){switch(n.tag){case 3:Yc(n),vt();break;case 5:Cc(n);break;case 1:Ne(n.type)&&ii(n);break;case 4:Ao(n,n.stateNode.containerInfo);break;case 10:var r=n.type._context,i=n.memoizedProps.value;H(si,r._currentValue),r._currentValue=i;break;case 13:if(r=n.memoizedState,r!==null)return r.dehydrated!==null?(H(G,G.current&1),n.flags|=128,null):t&n.child.childLanes?Xc(e,n,t):(H(G,G.current&1),e=an(e,n,t),e!==null?e.sibling:null);H(G,G.current&1);break;case 19:if(r=(t&n.childLanes)!==0,e.flags&128){if(r)return Zc(e,n,t);n.flags|=128}if(i=n.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),H(G,G.current),r)break;return null;case 22:case 23:return n.lanes=0,Kc(e,n,t)}return an(e,n,t)}var Jc,Vl,bc,ea;Jc=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Vl=function(){};bc=function(e,n,t,r){var i=e.memoizedProps;if(i!==r){e=n.stateNode,qn(en.current);var l=null;switch(t){case"input":i=fl(e,i),r=fl(e,r),l=[];break;case"select":i=X({},i,{value:void 0}),r=X({},r,{value:void 0}),l=[];break;case"textarea":i=ml(e,i),r=ml(e,r),l=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ti)}kl(t,r);var o;t=null;for(d in i)if(!r.hasOwnProperty(d)&&i.hasOwnProperty(d)&&i[d]!=null)if(d==="style"){var s=i[d];for(o in s)s.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Xt.hasOwnProperty(d)?l||(l=[]):(l=l||[]).push(d,null));for(d in r){var u=r[d];if(s=i!=null?i[d]:void 0,r.hasOwnProperty(d)&&u!==s&&(u!=null||s!=null))if(d==="style")if(s){for(o in s)!s.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in u)u.hasOwnProperty(o)&&s[o]!==u[o]&&(t||(t={}),t[o]=u[o])}else t||(l||(l=[]),l.push(d,t)),t=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(l=l||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(l=l||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Xt.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&V("scroll",e),l||s===u||(l=[])):(l=l||[]).push(d,u))}t&&(l=l||[]).push("style",t);var d=l;(n.updateQueue=d)&&(n.flags|=4)}};ea=function(e,n,t,r){t!==r&&(n.flags|=4)};function Tt(e,n){if(!Q)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function me(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,r=0;if(n)for(var i=e.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=t,n}function Nf(e,n,t){var r=n.pendingProps;switch(xo(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return me(n),null;case 1:return Ne(n.type)&&ri(),me(n),null;case 3:return r=n.stateNode,_t(),W(De),W(ke),Po(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Br(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,We!==null&&(Jl(We),We=null))),Vl(e,n),me(n),null;case 5:Bo(n);var i=qn(ur.current);if(t=n.type,e!==null&&n.stateNode!=null)bc(e,n,t,r,i),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!r){if(n.stateNode===null)throw Error(_(166));return me(n),null}if(e=qn(en.current),Br(n)){r=n.stateNode,t=n.type;var l=n.memoizedProps;switch(r[Je]=n,r[or]=l,e=(n.mode&1)!==0,t){case"dialog":V("cancel",r),V("close",r);break;case"iframe":case"object":case"embed":V("load",r);break;case"video":case"audio":for(i=0;i<qt.length;i++)V(qt[i],r);break;case"source":V("error",r);break;case"img":case"image":case"link":V("error",r),V("load",r);break;case"details":V("toggle",r);break;case"input":es(r,l),V("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},V("invalid",r);break;case"textarea":ts(r,l),V("invalid",r)}kl(t,l),i=null;for(var o in l)if(l.hasOwnProperty(o)){var s=l[o];o==="children"?typeof s=="string"?r.textContent!==s&&(l.suppressHydrationWarning!==!0&&Ar(r.textContent,s,e),i=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(l.suppressHydrationWarning!==!0&&Ar(r.textContent,s,e),i=["children",""+s]):Xt.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&V("scroll",r)}switch(t){case"input":_r(r),ns(r,l,!0);break;case"textarea":_r(r),rs(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=ti)}r=i,n.updateQueue=r,r!==null&&(n.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Au(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(t,{is:r.is}):(e=o.createElement(t),t==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,t),e[Je]=n,e[or]=r,Jc(e,n,!1,!1),n.stateNode=e;e:{switch(o=vl(t,r),t){case"dialog":V("cancel",e),V("close",e),i=r;break;case"iframe":case"object":case"embed":V("load",e),i=r;break;case"video":case"audio":for(i=0;i<qt.length;i++)V(qt[i],e);i=r;break;case"source":V("error",e),i=r;break;case"img":case"image":case"link":V("error",e),V("load",e),i=r;break;case"details":V("toggle",e),i=r;break;case"input":es(e,r),i=fl(e,r),V("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=X({},r,{value:void 0}),V("invalid",e);break;case"textarea":ts(e,r),i=ml(e,r),V("invalid",e);break;default:i=r}kl(t,i),s=i;for(l in s)if(s.hasOwnProperty(l)){var u=s[l];l==="style"?Lu(e,u):l==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Bu(e,u)):l==="children"?typeof u=="string"?(t!=="textarea"||u!=="")&&Zt(e,u):typeof u=="number"&&Zt(e,""+u):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Xt.hasOwnProperty(l)?u!=null&&l==="onScroll"&&V("scroll",e):u!=null&&lo(e,l,u,o))}switch(t){case"input":_r(e),ns(e,r,!1);break;case"textarea":_r(e),rs(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Bn(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?at(e,!!r.multiple,l,!1):r.defaultValue!=null&&at(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=ti)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return me(n),null;case 6:if(e&&n.stateNode!=null)ea(e,n,e.memoizedProps,r);else{if(typeof r!="string"&&n.stateNode===null)throw Error(_(166));if(t=qn(ur.current),qn(en.current),Br(n)){if(r=n.stateNode,t=n.memoizedProps,r[Je]=n,(l=r.nodeValue!==t)&&(e=Le,e!==null))switch(e.tag){case 3:Ar(r.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ar(r.nodeValue,t,(e.mode&1)!==0)}l&&(n.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Je]=n,n.stateNode=r}return me(n),null;case 13:if(W(G),r=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Q&&Pe!==null&&n.mode&1&&!(n.flags&128))vc(),vt(),n.flags|=98560,l=!1;else if(l=Br(n),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(_(318));if(l=n.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(_(317));l[Je]=n}else vt(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;me(n),l=!1}else We!==null&&(Jl(We),We=null),l=!0;if(!l)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(n.child.flags|=8192,n.mode&1&&(e===null||G.current&1?oe===0&&(oe=3):Ho())),n.updateQueue!==null&&(n.flags|=4),me(n),null);case 4:return _t(),Vl(e,n),e===null&&ir(n.stateNode.containerInfo),me(n),null;case 10:return Eo(n.type._context),me(n),null;case 17:return Ne(n.type)&&ri(),me(n),null;case 19:if(W(G),l=n.memoizedState,l===null)return me(n),null;if(r=(n.flags&128)!==0,o=l.rendering,o===null)if(r)Tt(l,!1);else{if(oe!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(o=ai(e),o!==null){for(n.flags|=128,Tt(l,!1),r=o.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),n.subtreeFlags=0,r=t,t=n.child;t!==null;)l=t,e=r,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,e=o.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return H(G,G.current&1|2),n.child}e=e.sibling}l.tail!==null&&b()>wt&&(n.flags|=128,r=!0,Tt(l,!1),n.lanes=4194304)}else{if(!r)if(e=ai(o),e!==null){if(n.flags|=128,r=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Tt(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!Q)return me(n),null}else 2*b()-l.renderingStartTime>wt&&t!==1073741824&&(n.flags|=128,r=!0,Tt(l,!1),n.lanes=4194304);l.isBackwards?(o.sibling=n.child,n.child=o):(t=l.last,t!==null?t.sibling=o:n.child=o,l.last=o)}return l.tail!==null?(n=l.tail,l.rendering=n,l.tail=n.sibling,l.renderingStartTime=b(),n.sibling=null,t=G.current,H(G,r?t&1|2:t&1),n):(me(n),null);case 22:case 23:return $o(),r=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(n.flags|=8192),r&&n.mode&1?Be&1073741824&&(me(n),n.subtreeFlags&6&&(n.flags|=8192)):me(n),null;case 24:return null;case 25:return null}throw Error(_(156,n.tag))}function Af(e,n){switch(xo(n),n.tag){case 1:return Ne(n.type)&&ri(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return _t(),W(De),W(ke),Po(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Bo(n),null;case 13:if(W(G),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(_(340));vt()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return W(G),null;case 4:return _t(),null;case 10:return Eo(n.type._context),null;case 22:case 23:return $o(),null;case 24:return null;default:return null}}var jr=!1,ye=!1,Bf=typeof WeakSet=="function"?WeakSet:Set,A=null;function ut(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){J(e,n,r)}else t.current=null}function Wl(e,n,t){try{t()}catch(r){J(e,n,r)}}var Qs=!1;function Pf(e,n){if(Al=br,e=lc(),go(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var i=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{t.nodeType,l.nodeType}catch{t=null;break e}var o=0,s=-1,u=-1,d=0,k=0,y=e,p=null;n:for(;;){for(var w;y!==t||i!==0&&y.nodeType!==3||(s=o+i),y!==l||r!==0&&y.nodeType!==3||(u=o+r),y.nodeType===3&&(o+=y.nodeValue.length),(w=y.firstChild)!==null;)p=y,y=w;for(;;){if(y===e)break n;if(p===t&&++d===i&&(s=o),p===l&&++k===r&&(u=o),(w=y.nextSibling)!==null)break;y=p,p=y.parentNode}y=w}t=s===-1||u===-1?null:{start:s,end:u}}else t=null}t=t||{start:0,end:0}}else t=null;for(Bl={focusedElem:e,selectionRange:t},br=!1,A=n;A!==null;)if(n=A,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,A=e;else for(;A!==null;){n=A;try{var g=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var E=g.memoizedProps,L=g.memoizedState,a=n.stateNode,c=a.getSnapshotBeforeUpdate(n.elementType===n.type?E:Ue(n.type,E),L);a.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var f=n.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(_(163))}}catch(v){J(n,n.return,v)}if(e=n.sibling,e!==null){e.return=n.return,A=e;break}A=n.return}return g=Qs,Qs=!1,g}function Kt(e,n,t){var r=n.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var l=i.destroy;i.destroy=void 0,l!==void 0&&Wl(n,t,l)}i=i.next}while(i!==r)}}function Ni(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var r=t.create;t.destroy=r()}t=t.next}while(t!==n)}}function Ql(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function na(e){var n=e.alternate;n!==null&&(e.alternate=null,na(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Je],delete n[or],delete n[jl],delete n[ff],delete n[pf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ta(e){return e.tag===5||e.tag===3||e.tag===4}function Ks(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||ta(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Kl(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=ti));else if(r!==4&&(e=e.child,e!==null))for(Kl(e,n,t),e=e.sibling;e!==null;)Kl(e,n,t),e=e.sibling}function Gl(e,n,t){var r=e.tag;if(r===5||r===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Gl(e,n,t),e=e.sibling;e!==null;)Gl(e,n,t),e=e.sibling}var de=null,Ve=!1;function hn(e,n,t){for(t=t.child;t!==null;)ra(e,n,t),t=t.sibling}function ra(e,n,t){if(be&&typeof be.onCommitFiberUnmount=="function")try{be.onCommitFiberUnmount(gi,t)}catch{}switch(t.tag){case 5:ye||ut(t,n);case 6:var r=de,i=Ve;de=null,hn(e,n,t),de=r,Ve=i,de!==null&&(Ve?(e=de,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):de.removeChild(t.stateNode));break;case 18:de!==null&&(Ve?(e=de,t=t.stateNode,e.nodeType===8?Xi(e.parentNode,t):e.nodeType===1&&Xi(e,t),nr(e)):Xi(de,t.stateNode));break;case 4:r=de,i=Ve,de=t.stateNode.containerInfo,Ve=!0,hn(e,n,t),de=r,Ve=i;break;case 0:case 11:case 14:case 15:if(!ye&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var l=i,o=l.destroy;l=l.tag,o!==void 0&&(l&2||l&4)&&Wl(t,n,o),i=i.next}while(i!==r)}hn(e,n,t);break;case 1:if(!ye&&(ut(t,n),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(s){J(t,n,s)}hn(e,n,t);break;case 21:hn(e,n,t);break;case 22:t.mode&1?(ye=(r=ye)||t.memoizedState!==null,hn(e,n,t),ye=r):hn(e,n,t);break;default:hn(e,n,t)}}function Gs(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new Bf),n.forEach(function(r){var i=Ff.bind(null,e,r);t.has(r)||(t.add(r),r.then(i,i))})}}function He(e,n){var t=n.deletions;if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];try{var l=e,o=n,s=o;e:for(;s!==null;){switch(s.tag){case 5:de=s.stateNode,Ve=!1;break e;case 3:de=s.stateNode.containerInfo,Ve=!0;break e;case 4:de=s.stateNode.containerInfo,Ve=!0;break e}s=s.return}if(de===null)throw Error(_(160));ra(l,o,i),de=null,Ve=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(d){J(i,n,d)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)ia(n,e),n=n.sibling}function ia(e,n){var t=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(He(n,e),Xe(e),r&4){try{Kt(3,e,e.return),Ni(3,e)}catch(E){J(e,e.return,E)}try{Kt(5,e,e.return)}catch(E){J(e,e.return,E)}}break;case 1:He(n,e),Xe(e),r&512&&t!==null&&ut(t,t.return);break;case 5:if(He(n,e),Xe(e),r&512&&t!==null&&ut(t,t.return),e.flags&32){var i=e.stateNode;try{Zt(i,"")}catch(E){J(e,e.return,E)}}if(r&4&&(i=e.stateNode,i!=null)){var l=e.memoizedProps,o=t!==null?t.memoizedProps:l,s=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{s==="input"&&l.type==="radio"&&l.name!=null&&Du(i,l),vl(s,o);var d=vl(s,l);for(o=0;o<u.length;o+=2){var k=u[o],y=u[o+1];k==="style"?Lu(i,y):k==="dangerouslySetInnerHTML"?Bu(i,y):k==="children"?Zt(i,y):lo(i,k,y,d)}switch(s){case"input":pl(i,l);break;case"textarea":Nu(i,l);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!l.multiple;var w=l.value;w!=null?at(i,!!l.multiple,w,!1):p!==!!l.multiple&&(l.defaultValue!=null?at(i,!!l.multiple,l.defaultValue,!0):at(i,!!l.multiple,l.multiple?[]:"",!1))}i[or]=l}catch(E){J(e,e.return,E)}}break;case 6:if(He(n,e),Xe(e),r&4){if(e.stateNode===null)throw Error(_(162));i=e.stateNode,l=e.memoizedProps;try{i.nodeValue=l}catch(E){J(e,e.return,E)}}break;case 3:if(He(n,e),Xe(e),r&4&&t!==null&&t.memoizedState.isDehydrated)try{nr(n.containerInfo)}catch(E){J(e,e.return,E)}break;case 4:He(n,e),Xe(e);break;case 13:He(n,e),Xe(e),i=e.child,i.flags&8192&&(l=i.memoizedState!==null,i.stateNode.isHidden=l,!l||i.alternate!==null&&i.alternate.memoizedState!==null||(Fo=b())),r&4&&Gs(e);break;case 22:if(k=t!==null&&t.memoizedState!==null,e.mode&1?(ye=(d=ye)||k,He(n,e),ye=d):He(n,e),Xe(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!k&&e.mode&1)for(A=e,k=e.child;k!==null;){for(y=A=k;A!==null;){switch(p=A,w=p.child,p.tag){case 0:case 11:case 14:case 15:Kt(4,p,p.return);break;case 1:ut(p,p.return);var g=p.stateNode;if(typeof g.componentWillUnmount=="function"){r=p,t=p.return;try{n=r,g.props=n.memoizedProps,g.state=n.memoizedState,g.componentWillUnmount()}catch(E){J(r,t,E)}}break;case 5:ut(p,p.return);break;case 22:if(p.memoizedState!==null){Xs(y);continue}}w!==null?(w.return=p,A=w):Xs(y)}k=k.sibling}e:for(k=null,y=e;;){if(y.tag===5){if(k===null){k=y;try{i=y.stateNode,d?(l=i.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(s=y.stateNode,u=y.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=Pu("display",o))}catch(E){J(e,e.return,E)}}}else if(y.tag===6){if(k===null)try{y.stateNode.nodeValue=d?"":y.memoizedProps}catch(E){J(e,e.return,E)}}else if((y.tag!==22&&y.tag!==23||y.memoizedState===null||y===e)&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===e)break e;for(;y.sibling===null;){if(y.return===null||y.return===e)break e;k===y&&(k=null),y=y.return}k===y&&(k=null),y.sibling.return=y.return,y=y.sibling}}break;case 19:He(n,e),Xe(e),r&4&&Gs(e);break;case 21:break;default:He(n,e),Xe(e)}}function Xe(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(ta(t)){var r=t;break e}t=t.return}throw Error(_(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Zt(i,""),r.flags&=-33);var l=Ks(e);Gl(e,l,i);break;case 3:case 4:var o=r.stateNode.containerInfo,s=Ks(e);Kl(e,s,o);break;default:throw Error(_(161))}}catch(u){J(e,e.return,u)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Lf(e,n,t){A=e,la(e)}function la(e,n,t){for(var r=(e.mode&1)!==0;A!==null;){var i=A,l=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||jr;if(!o){var s=i.alternate,u=s!==null&&s.memoizedState!==null||ye;s=jr;var d=ye;if(jr=o,(ye=u)&&!d)for(A=i;A!==null;)o=A,u=o.child,o.tag===22&&o.memoizedState!==null?Zs(i):u!==null?(u.return=o,A=u):Zs(i);for(;l!==null;)A=l,la(l),l=l.sibling;A=i,jr=s,ye=d}Ys(e)}else i.subtreeFlags&8772&&l!==null?(l.return=i,A=l):Ys(e)}}function Ys(e){for(;A!==null;){var n=A;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:ye||Ni(5,n);break;case 1:var r=n.stateNode;if(n.flags&4&&!ye)if(t===null)r.componentDidMount();else{var i=n.elementType===n.type?t.memoizedProps:Ue(n.type,t.memoizedProps);r.componentDidUpdate(i,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=n.updateQueue;l!==null&&zs(n,l,r);break;case 3:var o=n.updateQueue;if(o!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}zs(n,o,t)}break;case 5:var s=n.stateNode;if(t===null&&n.flags&4){t=s;var u=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&t.focus();break;case"img":u.src&&(t.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var d=n.alternate;if(d!==null){var k=d.memoizedState;if(k!==null){var y=k.dehydrated;y!==null&&nr(y)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(_(163))}ye||n.flags&512&&Ql(n)}catch(p){J(n,n.return,p)}}if(n===e){A=null;break}if(t=n.sibling,t!==null){t.return=n.return,A=t;break}A=n.return}}function Xs(e){for(;A!==null;){var n=A;if(n===e){A=null;break}var t=n.sibling;if(t!==null){t.return=n.return,A=t;break}A=n.return}}function Zs(e){for(;A!==null;){var n=A;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{Ni(4,n)}catch(u){J(n,t,u)}break;case 1:var r=n.stateNode;if(typeof r.componentDidMount=="function"){var i=n.return;try{r.componentDidMount()}catch(u){J(n,i,u)}}var l=n.return;try{Ql(n)}catch(u){J(n,l,u)}break;case 5:var o=n.return;try{Ql(n)}catch(u){J(n,o,u)}}}catch(u){J(n,n.return,u)}if(n===e){A=null;break}var s=n.sibling;if(s!==null){s.return=n.return,A=s;break}A=n.return}}var jf=Math.ceil,pi=dn.ReactCurrentDispatcher,Oo=dn.ReactCurrentOwner,Re=dn.ReactCurrentBatchConfig,O=0,ce=null,te=null,fe=0,Be=0,ct=jn(0),oe=0,fr=null,Qn=0,Ai=0,Ro=0,Gt=null,Se=null,Fo=0,wt=1/0,nn=null,hi=!1,Yl=null,Dn=null,zr=!1,_n=null,mi=0,Yt=0,Xl=null,Wr=-1,Qr=0;function _e(){return O&6?b():Wr!==-1?Wr:Wr=b()}function Nn(e){return e.mode&1?O&2&&fe!==0?fe&-fe:mf.transition!==null?(Qr===0&&(Qr=Uu()),Qr):(e=q,e!==0||(e=window.event,e=e===void 0?16:Xu(e.type)),e):1}function Ke(e,n,t,r){if(50<Yt)throw Yt=0,Xl=null,Error(_(185));hr(e,t,r),(!(O&2)||e!==ce)&&(e===ce&&(!(O&2)&&(Ai|=t),oe===4&&vn(e,fe)),Ae(e,r),t===1&&O===0&&!(n.mode&1)&&(wt=b()+500,Si&&zn()))}function Ae(e,n){var t=e.callbackNode;hd(e,n);var r=Jr(e,e===ce?fe:0);if(r===0)t!==null&&os(t),e.callbackNode=null,e.callbackPriority=0;else if(n=r&-r,e.callbackPriority!==n){if(t!=null&&os(t),n===1)e.tag===0?hf(Js.bind(null,e)):mc(Js.bind(null,e)),af(function(){!(O&6)&&zn()}),t=null;else{switch(Vu(r)){case 1:t=ao;break;case 4:t=$u;break;case 16:t=Zr;break;case 536870912:t=Hu;break;default:t=Zr}t=pa(t,oa.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function oa(e,n){if(Wr=-1,Qr=0,O&6)throw Error(_(327));var t=e.callbackNode;if(mt()&&e.callbackNode!==t)return null;var r=Jr(e,e===ce?fe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||n)n=yi(e,r);else{n=r;var i=O;O|=2;var l=ua();(ce!==e||fe!==n)&&(nn=null,wt=b()+500,$n(e,n));do try{Mf();break}catch(s){sa(e,s)}while(!0);So(),pi.current=l,O=i,te!==null?n=0:(ce=null,fe=0,n=oe)}if(n!==0){if(n===2&&(i=Cl(e),i!==0&&(r=i,n=Zl(e,i))),n===1)throw t=fr,$n(e,0),vn(e,r),Ae(e,b()),t;if(n===6)vn(e,r);else{if(i=e.current.alternate,!(r&30)&&!zf(i)&&(n=yi(e,r),n===2&&(l=Cl(e),l!==0&&(r=l,n=Zl(e,l))),n===1))throw t=fr,$n(e,0),vn(e,r),Ae(e,b()),t;switch(e.finishedWork=i,e.finishedLanes=r,n){case 0:case 1:throw Error(_(345));case 2:On(e,Se,nn);break;case 3:if(vn(e,r),(r&130023424)===r&&(n=Fo+500-b(),10<n)){if(Jr(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){_e(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Ll(On.bind(null,e,Se,nn),n);break}On(e,Se,nn);break;case 4:if(vn(e,r),(r&4194240)===r)break;for(n=e.eventTimes,i=-1;0<r;){var o=31-Qe(r);l=1<<o,o=n[o],o>i&&(i=o),r&=~l}if(r=i,r=b()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*jf(r/1960))-r,10<r){e.timeoutHandle=Ll(On.bind(null,e,Se,nn),r);break}On(e,Se,nn);break;case 5:On(e,Se,nn);break;default:throw Error(_(329))}}}return Ae(e,b()),e.callbackNode===t?oa.bind(null,e):null}function Zl(e,n){var t=Gt;return e.current.memoizedState.isDehydrated&&($n(e,n).flags|=256),e=yi(e,n),e!==2&&(n=Se,Se=t,n!==null&&Jl(n)),e}function Jl(e){Se===null?Se=e:Se.push.apply(Se,e)}function zf(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var i=t[r],l=i.getSnapshot;i=i.value;try{if(!Ge(l(),i))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function vn(e,n){for(n&=~Ro,n&=~Ai,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Qe(n),r=1<<t;e[t]=-1,n&=~r}}function Js(e){if(O&6)throw Error(_(327));mt();var n=Jr(e,0);if(!(n&1))return Ae(e,b()),null;var t=yi(e,n);if(e.tag!==0&&t===2){var r=Cl(e);r!==0&&(n=r,t=Zl(e,r))}if(t===1)throw t=fr,$n(e,0),vn(e,n),Ae(e,b()),t;if(t===6)throw Error(_(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,On(e,Se,nn),Ae(e,b()),null}function qo(e,n){var t=O;O|=1;try{return e(n)}finally{O=t,O===0&&(wt=b()+500,Si&&zn())}}function Kn(e){_n!==null&&_n.tag===0&&!(O&6)&&mt();var n=O;O|=1;var t=Re.transition,r=q;try{if(Re.transition=null,q=1,e)return e()}finally{q=r,Re.transition=t,O=n,!(O&6)&&zn()}}function $o(){Be=ct.current,W(ct)}function $n(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,cf(t)),te!==null)for(t=te.return;t!==null;){var r=t;switch(xo(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ri();break;case 3:_t(),W(De),W(ke),Po();break;case 5:Bo(r);break;case 4:_t();break;case 13:W(G);break;case 19:W(G);break;case 10:Eo(r.type._context);break;case 22:case 23:$o()}t=t.return}if(ce=e,te=e=An(e.current,null),fe=Be=n,oe=0,fr=null,Ro=Ai=Qn=0,Se=Gt=null,Fn!==null){for(n=0;n<Fn.length;n++)if(t=Fn[n],r=t.interleaved,r!==null){t.interleaved=null;var i=r.next,l=t.pending;if(l!==null){var o=l.next;l.next=i,r.next=o}t.pending=r}Fn=null}return e}function sa(e,n){do{var t=te;try{if(So(),Hr.current=fi,di){for(var r=Y.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}di=!1}if(Wn=0,ue=le=Y=null,Qt=!1,cr=0,Oo.current=null,t===null||t.return===null){oe=1,fr=n,te=null;break}e:{var l=e,o=t.return,s=t,u=n;if(n=fe,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,k=s,y=k.tag;if(!(k.mode&1)&&(y===0||y===11||y===15)){var p=k.alternate;p?(k.updateQueue=p.updateQueue,k.memoizedState=p.memoizedState,k.lanes=p.lanes):(k.updateQueue=null,k.memoizedState=null)}var w=Fs(o);if(w!==null){w.flags&=-257,qs(w,o,s,l,n),w.mode&1&&Rs(l,d,n),n=w,u=d;var g=n.updateQueue;if(g===null){var E=new Set;E.add(u),n.updateQueue=E}else g.add(u);break e}else{if(!(n&1)){Rs(l,d,n),Ho();break e}u=Error(_(426))}}else if(Q&&s.mode&1){var L=Fs(o);if(L!==null){!(L.flags&65536)&&(L.flags|=256),qs(L,o,s,l,n),wo(xt(u,s));break e}}l=u=xt(u,s),oe!==4&&(oe=2),Gt===null?Gt=[l]:Gt.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,n&=-n,l.lanes|=n;var a=Vc(l,u,n);js(l,a);break e;case 1:s=u;var c=l.type,f=l.stateNode;if(!(l.flags&128)&&(typeof c.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Dn===null||!Dn.has(f)))){l.flags|=65536,n&=-n,l.lanes|=n;var v=Wc(l,s,n);js(l,v);break e}}l=l.return}while(l!==null)}aa(t)}catch(C){n=C,te===t&&t!==null&&(te=t=t.return);continue}break}while(!0)}function ua(){var e=pi.current;return pi.current=fi,e===null?fi:e}function Ho(){(oe===0||oe===3||oe===2)&&(oe=4),ce===null||!(Qn&268435455)&&!(Ai&268435455)||vn(ce,fe)}function yi(e,n){var t=O;O|=2;var r=ua();(ce!==e||fe!==n)&&(nn=null,$n(e,n));do try{Tf();break}catch(i){sa(e,i)}while(!0);if(So(),O=t,pi.current=r,te!==null)throw Error(_(261));return ce=null,fe=0,oe}function Tf(){for(;te!==null;)ca(te)}function Mf(){for(;te!==null&&!ld();)ca(te)}function ca(e){var n=fa(e.alternate,e,Be);e.memoizedProps=e.pendingProps,n===null?aa(e):te=n,Oo.current=null}function aa(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=Af(t,n),t!==null){t.flags&=32767,te=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{oe=6,te=null;return}}else if(t=Nf(t,n,Be),t!==null){te=t;return}if(n=n.sibling,n!==null){te=n;return}te=n=e}while(n!==null);oe===0&&(oe=5)}function On(e,n,t){var r=q,i=Re.transition;try{Re.transition=null,q=1,If(e,n,t,r)}finally{Re.transition=i,q=r}return null}function If(e,n,t,r){do mt();while(_n!==null);if(O&6)throw Error(_(327));t=e.finishedWork;var i=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(_(177));e.callbackNode=null,e.callbackPriority=0;var l=t.lanes|t.childLanes;if(md(e,l),e===ce&&(te=ce=null,fe=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||zr||(zr=!0,pa(Zr,function(){return mt(),null})),l=(t.flags&15990)!==0,t.subtreeFlags&15990||l){l=Re.transition,Re.transition=null;var o=q;q=1;var s=O;O|=4,Oo.current=null,Pf(e,t),ia(t,e),nf(Bl),br=!!Al,Bl=Al=null,e.current=t,Lf(t),od(),O=s,q=o,Re.transition=l}else e.current=t;if(zr&&(zr=!1,_n=e,mi=i),l=e.pendingLanes,l===0&&(Dn=null),cd(t.stateNode),Ae(e,b()),n!==null)for(r=e.onRecoverableError,t=0;t<n.length;t++)i=n[t],r(i.value,{componentStack:i.stack,digest:i.digest});if(hi)throw hi=!1,e=Yl,Yl=null,e;return mi&1&&e.tag!==0&&mt(),l=e.pendingLanes,l&1?e===Xl?Yt++:(Yt=0,Xl=e):Yt=0,zn(),null}function mt(){if(_n!==null){var e=Vu(mi),n=Re.transition,t=q;try{if(Re.transition=null,q=16>e?16:e,_n===null)var r=!1;else{if(e=_n,_n=null,mi=0,O&6)throw Error(_(331));var i=O;for(O|=4,A=e.current;A!==null;){var l=A,o=l.child;if(A.flags&16){var s=l.deletions;if(s!==null){for(var u=0;u<s.length;u++){var d=s[u];for(A=d;A!==null;){var k=A;switch(k.tag){case 0:case 11:case 15:Kt(8,k,l)}var y=k.child;if(y!==null)y.return=k,A=y;else for(;A!==null;){k=A;var p=k.sibling,w=k.return;if(na(k),k===d){A=null;break}if(p!==null){p.return=w,A=p;break}A=w}}}var g=l.alternate;if(g!==null){var E=g.child;if(E!==null){g.child=null;do{var L=E.sibling;E.sibling=null,E=L}while(E!==null)}}A=l}}if(l.subtreeFlags&2064&&o!==null)o.return=l,A=o;else e:for(;A!==null;){if(l=A,l.flags&2048)switch(l.tag){case 0:case 11:case 15:Kt(9,l,l.return)}var a=l.sibling;if(a!==null){a.return=l.return,A=a;break e}A=l.return}}var c=e.current;for(A=c;A!==null;){o=A;var f=o.child;if(o.subtreeFlags&2064&&f!==null)f.return=o,A=f;else e:for(o=c;A!==null;){if(s=A,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Ni(9,s)}}catch(C){J(s,s.return,C)}if(s===o){A=null;break e}var v=s.sibling;if(v!==null){v.return=s.return,A=v;break e}A=s.return}}if(O=i,zn(),be&&typeof be.onPostCommitFiberRoot=="function")try{be.onPostCommitFiberRoot(gi,e)}catch{}r=!0}return r}finally{q=t,Re.transition=n}}return!1}function bs(e,n,t){n=xt(t,n),n=Vc(e,n,1),e=En(e,n,1),n=_e(),e!==null&&(hr(e,1,n),Ae(e,n))}function J(e,n,t){if(e.tag===3)bs(e,e,t);else for(;n!==null;){if(n.tag===3){bs(n,e,t);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Dn===null||!Dn.has(r))){e=xt(t,e),e=Wc(n,e,1),n=En(n,e,1),e=_e(),n!==null&&(hr(n,1,e),Ae(n,e));break}}n=n.return}}function Of(e,n,t){var r=e.pingCache;r!==null&&r.delete(n),n=_e(),e.pingedLanes|=e.suspendedLanes&t,ce===e&&(fe&t)===t&&(oe===4||oe===3&&(fe&130023424)===fe&&500>b()-Fo?$n(e,0):Ro|=t),Ae(e,n)}function da(e,n){n===0&&(e.mode&1?(n=Cr,Cr<<=1,!(Cr&130023424)&&(Cr=4194304)):n=1);var t=_e();e=cn(e,n),e!==null&&(hr(e,n,t),Ae(e,t))}function Rf(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),da(e,t)}function Ff(e,n){var t=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(t=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(_(314))}r!==null&&r.delete(n),da(e,t)}var fa;fa=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||De.current)Ee=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return Ee=!1,Df(e,n,t);Ee=!!(e.flags&131072)}else Ee=!1,Q&&n.flags&1048576&&yc(n,oi,n.index);switch(n.lanes=0,n.tag){case 2:var r=n.type;Vr(e,n),e=n.pendingProps;var i=kt(n,ke.current);ht(n,t),i=jo(null,n,r,e,i,t);var l=zo();return n.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Ne(r)?(l=!0,ii(n)):l=!1,n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,No(n),i.updater=Di,n.stateNode=i,i._reactInternals=n,Rl(n,r,e,t),n=$l(null,n,r,!0,l,t)):(n.tag=0,Q&&l&&_o(n),ge(null,n,i,t),n=n.child),n;case 16:r=n.elementType;e:{switch(Vr(e,n),e=n.pendingProps,i=r._init,r=i(r._payload),n.type=r,i=n.tag=$f(r),e=Ue(r,e),i){case 0:n=ql(null,n,r,e,t);break e;case 1:n=Us(null,n,r,e,t);break e;case 11:n=$s(null,n,r,e,t);break e;case 14:n=Hs(null,n,r,Ue(r.type,e),t);break e}throw Error(_(306,r,""))}return n;case 0:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Ue(r,i),ql(e,n,r,i,t);case 1:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Ue(r,i),Us(e,n,r,i,t);case 3:e:{if(Yc(n),e===null)throw Error(_(387));r=n.pendingProps,l=n.memoizedState,i=l.element,wc(e,n),ci(n,r,null,t);var o=n.memoizedState;if(r=o.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},n.updateQueue.baseState=l,n.memoizedState=l,n.flags&256){i=xt(Error(_(423)),n),n=Vs(e,n,r,t,i);break e}else if(r!==i){i=xt(Error(_(424)),n),n=Vs(e,n,r,t,i);break e}else for(Pe=Sn(n.stateNode.containerInfo.firstChild),Le=n,Q=!0,We=null,t=_c(n,null,r,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(vt(),r===i){n=an(e,n,t);break e}ge(e,n,r,t)}n=n.child}return n;case 5:return Cc(n),e===null&&Ml(n),r=n.type,i=n.pendingProps,l=e!==null?e.memoizedProps:null,o=i.children,Pl(r,i)?o=null:l!==null&&Pl(r,l)&&(n.flags|=32),Gc(e,n),ge(e,n,o,t),n.child;case 6:return e===null&&Ml(n),null;case 13:return Xc(e,n,t);case 4:return Ao(n,n.stateNode.containerInfo),r=n.pendingProps,e===null?n.child=gt(n,null,r,t):ge(e,n,r,t),n.child;case 11:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Ue(r,i),$s(e,n,r,i,t);case 7:return ge(e,n,n.pendingProps,t),n.child;case 8:return ge(e,n,n.pendingProps.children,t),n.child;case 12:return ge(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(r=n.type._context,i=n.pendingProps,l=n.memoizedProps,o=i.value,H(si,r._currentValue),r._currentValue=o,l!==null)if(Ge(l.value,o)){if(l.children===i.children&&!De.current){n=an(e,n,t);break e}}else for(l=n.child,l!==null&&(l.return=n);l!==null;){var s=l.dependencies;if(s!==null){o=l.child;for(var u=s.firstContext;u!==null;){if(u.context===r){if(l.tag===1){u=on(-1,t&-t),u.tag=2;var d=l.updateQueue;if(d!==null){d=d.shared;var k=d.pending;k===null?u.next=u:(u.next=k.next,k.next=u),d.pending=u}}l.lanes|=t,u=l.alternate,u!==null&&(u.lanes|=t),Il(l.return,t,n),s.lanes|=t;break}u=u.next}}else if(l.tag===10)o=l.type===n.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(_(341));o.lanes|=t,s=o.alternate,s!==null&&(s.lanes|=t),Il(o,t,n),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===n){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}ge(e,n,i.children,t),n=n.child}return n;case 9:return i=n.type,r=n.pendingProps.children,ht(n,t),i=Fe(i),r=r(i),n.flags|=1,ge(e,n,r,t),n.child;case 14:return r=n.type,i=Ue(r,n.pendingProps),i=Ue(r.type,i),Hs(e,n,r,i,t);case 15:return Qc(e,n,n.type,n.pendingProps,t);case 17:return r=n.type,i=n.pendingProps,i=n.elementType===r?i:Ue(r,i),Vr(e,n),n.tag=1,Ne(r)?(e=!0,ii(n)):e=!1,ht(n,t),Uc(n,r,i),Rl(n,r,i,t),$l(null,n,r,!0,e,t);case 19:return Zc(e,n,t);case 22:return Kc(e,n,t)}throw Error(_(156,n.tag))};function pa(e,n){return qu(e,n)}function qf(e,n,t,r){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Oe(e,n,t,r){return new qf(e,n,t,r)}function Uo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function $f(e){if(typeof e=="function")return Uo(e)?1:0;if(e!=null){if(e=e.$$typeof,e===so)return 11;if(e===uo)return 14}return 2}function An(e,n){var t=e.alternate;return t===null?(t=Oe(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Kr(e,n,t,r,i,l){var o=2;if(r=e,typeof e=="function")Uo(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case bn:return Hn(t.children,i,l,n);case oo:o=8,i|=8;break;case ul:return e=Oe(12,t,n,i|2),e.elementType=ul,e.lanes=l,e;case cl:return e=Oe(13,t,n,i),e.elementType=cl,e.lanes=l,e;case al:return e=Oe(19,t,n,i),e.elementType=al,e.lanes=l,e;case Cu:return Bi(t,i,l,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case xu:o=10;break e;case wu:o=9;break e;case so:o=11;break e;case uo:o=14;break e;case mn:o=16,r=null;break e}throw Error(_(130,e==null?e:typeof e,""))}return n=Oe(o,t,n,i),n.elementType=e,n.type=r,n.lanes=l,n}function Hn(e,n,t,r){return e=Oe(7,e,r,n),e.lanes=t,e}function Bi(e,n,t,r){return e=Oe(22,e,r,n),e.elementType=Cu,e.lanes=t,e.stateNode={isHidden:!1},e}function il(e,n,t){return e=Oe(6,e,null,n),e.lanes=t,e}function ll(e,n,t){return n=Oe(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Hf(e,n,t,r,i){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fi(0),this.expirationTimes=Fi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fi(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Vo(e,n,t,r,i,l,o,s,u){return e=new Hf(e,n,t,s,u),n===1?(n=1,l===!0&&(n|=8)):n=0,l=Oe(3,null,null,n),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},No(l),e}function Uf(e,n,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Jn,key:r==null?null:""+r,children:e,containerInfo:n,implementation:t}}function ha(e){if(!e)return Pn;e=e._reactInternals;e:{if(Yn(e)!==e||e.tag!==1)throw Error(_(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Ne(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(_(171))}if(e.tag===1){var t=e.type;if(Ne(t))return hc(e,t,n)}return n}function ma(e,n,t,r,i,l,o,s,u){return e=Vo(t,r,!0,e,i,l,o,s,u),e.context=ha(null),t=e.current,r=_e(),i=Nn(t),l=on(r,i),l.callback=n??null,En(t,l,i),e.current.lanes=i,hr(e,i,r),Ae(e,r),e}function Pi(e,n,t,r){var i=n.current,l=_e(),o=Nn(i);return t=ha(t),n.context===null?n.context=t:n.pendingContext=t,n=on(l,o),n.payload={element:e},r=r===void 0?null:r,r!==null&&(n.callback=r),e=En(i,n,o),e!==null&&(Ke(e,i,o,l),$r(e,i,o)),o}function ki(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function eu(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Wo(e,n){eu(e,n),(e=e.alternate)&&eu(e,n)}function Vf(){return null}var ya=typeof reportError=="function"?reportError:function(e){console.error(e)};function Qo(e){this._internalRoot=e}Li.prototype.render=Qo.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(_(409));Pi(e,n,null,null)};Li.prototype.unmount=Qo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Kn(function(){Pi(null,e,null,null)}),n[un]=null}};function Li(e){this._internalRoot=e}Li.prototype.unstable_scheduleHydration=function(e){if(e){var n=Ku();e={blockedOn:null,target:e,priority:n};for(var t=0;t<kn.length&&n!==0&&n<kn[t].priority;t++);kn.splice(t,0,e),t===0&&Yu(e)}};function Ko(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ji(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function nu(){}function Wf(e,n,t,r,i){if(i){if(typeof r=="function"){var l=r;r=function(){var d=ki(o);l.call(d)}}var o=ma(n,r,e,0,null,!1,!1,"",nu);return e._reactRootContainer=o,e[un]=o.current,ir(e.nodeType===8?e.parentNode:e),Kn(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var s=r;r=function(){var d=ki(u);s.call(d)}}var u=Vo(e,0,!1,null,null,!1,!1,"",nu);return e._reactRootContainer=u,e[un]=u.current,ir(e.nodeType===8?e.parentNode:e),Kn(function(){Pi(n,u,t,r)}),u}function zi(e,n,t,r,i){var l=t._reactRootContainer;if(l){var o=l;if(typeof i=="function"){var s=i;i=function(){var u=ki(o);s.call(u)}}Pi(n,o,e,i)}else o=Wf(t,n,e,i,r);return ki(o)}Wu=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Ft(n.pendingLanes);t!==0&&(fo(n,t|1),Ae(n,b()),!(O&6)&&(wt=b()+500,zn()))}break;case 13:Kn(function(){var r=cn(e,1);if(r!==null){var i=_e();Ke(r,e,1,i)}}),Wo(e,1)}};po=function(e){if(e.tag===13){var n=cn(e,134217728);if(n!==null){var t=_e();Ke(n,e,134217728,t)}Wo(e,134217728)}};Qu=function(e){if(e.tag===13){var n=Nn(e),t=cn(e,n);if(t!==null){var r=_e();Ke(t,e,n,r)}Wo(e,n)}};Ku=function(){return q};Gu=function(e,n){var t=q;try{return q=e,n()}finally{q=t}};_l=function(e,n,t){switch(n){case"input":if(pl(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var r=t[n];if(r!==e&&r.form===e.form){var i=Ci(r);if(!i)throw Error(_(90));Eu(r),pl(r,i)}}}break;case"textarea":Nu(e,t);break;case"select":n=t.value,n!=null&&at(e,!!t.multiple,n,!1)}};Tu=qo;Mu=Kn;var Qf={usingClientEntryPoint:!1,Events:[yr,rt,Ci,ju,zu,qo]},Mt={findFiberByHostInstance:Rn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Kf={bundleType:Mt.bundleType,version:Mt.version,rendererPackageName:Mt.rendererPackageName,rendererConfig:Mt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:dn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ru(e),e===null?null:e.stateNode},findFiberByHostInstance:Mt.findFiberByHostInstance||Vf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Tr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Tr.isDisabled&&Tr.supportsFiber)try{gi=Tr.inject(Kf),be=Tr}catch{}}ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Qf;ze.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ko(n))throw Error(_(200));return Uf(e,n,null,t)};ze.createRoot=function(e,n){if(!Ko(e))throw Error(_(299));var t=!1,r="",i=ya;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),n=Vo(e,1,!1,null,null,t,!1,r,i),e[un]=n.current,ir(e.nodeType===8?e.parentNode:e),new Qo(n)};ze.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(_(188)):(e=Object.keys(e).join(","),Error(_(268,e)));return e=Ru(n),e=e===null?null:e.stateNode,e};ze.flushSync=function(e){return Kn(e)};ze.hydrate=function(e,n,t){if(!ji(n))throw Error(_(200));return zi(null,e,n,!0,t)};ze.hydrateRoot=function(e,n,t){if(!Ko(e))throw Error(_(405));var r=t!=null&&t.hydratedSources||null,i=!1,l="",o=ya;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(l=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),n=ma(n,null,e,1,t??null,i,!1,l,o),e[un]=n.current,ir(e),r)for(e=0;e<r.length;e++)t=r[e],i=t._getVersion,i=i(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,i]:n.mutableSourceEagerHydrationData.push(t,i);return new Li(n)};ze.render=function(e,n,t){if(!ji(n))throw Error(_(200));return zi(null,e,n,!1,t)};ze.unmountComponentAtNode=function(e){if(!ji(e))throw Error(_(40));return e._reactRootContainer?(Kn(function(){zi(null,null,e,!1,function(){e._reactRootContainer=null,e[un]=null})}),!0):!1};ze.unstable_batchedUpdates=qo;ze.unstable_renderSubtreeIntoContainer=function(e,n,t,r){if(!ji(t))throw Error(_(200));if(e==null||e._reactInternals===void 0)throw Error(_(38));return zi(e,n,t,!1,r)};ze.version="18.3.1-next-f1338f8080-20240426";function ka(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ka)}catch(e){console.error(e)}}ka(),ku.exports=ze;var Gf=ku.exports,tu=Gf;ol.createRoot=tu.createRoot,ol.hydrateRoot=tu.hydrateRoot;const ru=[{id:"k_0001",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 民法调整范围与基本原则",content:`【民法调整范围】民法是调整平等主体的自然人、法人和非法人组织之间的人身关系和财产关系的法律规范的总和。
【民法七大基本原则】
• 平等原则：民事主体在民事活动中的法律地位一律平等。
• 自愿原则：民事主体按照自己的意思设立、变更、终止民事法律关系。
• 公平原则：合理确定各方的权利和义务。
• 诚信原则：秉持诚实，恪守承诺（民法中的“帝王条款”）。
• 守法与公序良俗原则：不得违反法律，不得违背公序良俗。
• 绿色原则：有利于节约资源、保护生态环境。
• 民事权益受法律保护原则：任何组织或个人不得侵犯。`},{id:"k_0002",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 好意施惠关系（情谊行为）",content:`【好意施惠关系】是指当事人之间无意设定法律上的权利义务关系，由一方基于良好道德风尚实施的使另一方受恩惠的行为（如搭便车、请客吃饭、顺路代买物品等）。
【核心考点】
• 好意施惠属于情谊关系，不受民法调整，当事人之间不产生合同债权债务关系。
• 但如果施惠人在履行过程中存在故意或重大过失导致对方人身/财产损害的，仍需依法承担侵权责任。`},{id:"k_0003",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 自然人的民事权利能力与胎儿利益保护",content:`【民事权利能力】是指自然人依法享有民事权利、承担民事义务的资格。
• 始期与终期：自然人从出生时起到死亡时止，具有民事权利能力，依法享有民事权利，承担民事义务。人人平等。
• 出生与死亡时间认定：以出生证明、死亡证明为准；没有证明的以户籍登记为准；有相反证据足以推翻的以该证据为准。
• 胎儿利益保护：涉及遗产继承、接受赠与等胎儿利益保护的，胎儿视为具有民事权利能力。但胎儿娩出时为死体的，其民事权利能力自始不存在。`},{id:"k_0004",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法 • 总则 • 有关规定",content:`【有关规定】自然人从出生时起到死亡时止，具有民事权利能力，依法享有民事权利，承担民事义务。
自然人的出生时间和死亡时间，以出生证明、死亡证明记载的时间为准；没有出生证明、死亡证明的，以户籍登记或者其他有效身份登记记载的时间为准。有其他证据足以推翻以上记载时间的，以该证据证明的时间为准。
涉及遗产继承、接受赠与等胎儿利益保护的，胎儿视为具有民事权利能力。
但是，胎儿娩出时为死体的，其民事权利能力自始不存在。`},{id:"k_0005",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 自然人的民事行为能力划分标准",content:`【完全民事行为能力人】
• 年满18周岁且精神健康状况正常的自然人；
• 年满16周岁且以自己的劳动收入为主要生活来源的未成年人。

【限制民事行为能力人】
• 8周岁以上（8 ≤ X < 18）的未成年人；
• 不能完全辨认自己行为的成年人。
• 行为效力：可独立实施纯获利益或与其年龄、智力、精神相适应的民事法律行为；实施其他民事法律行为需由法定代理人代理或经其同意、追认。

【无民事行为能力人】
• 未满8周岁（X < 8）的未成年人；
• 不能辨认自己行为的成年人。
• 行为效力：由其法定代理人代理实施民事法律行为，本人独立实施的民事法律行为一律无效。`},{id:"k_0006",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 法定监护人顺序与监护职责",content:`【未成年人的法定监护人】
• 当然监护人：父母（父母离婚不影响法定监护关系）。
• 父母死亡或无监护能力的法定顺序：
  (1) 祖父母、外祖父母；
  (2) 兄、姐；
  (3) 其他愿意担任监护人的个人或组织（须经居委会、村委会或民政部门同意）。

【无/限制民事行为能力成年人的法定监护顺序】
  (1) 配偶；
  (2) 父母、子女；
  (3) 其他近亲属；
  (4) 其他愿意担任的个人或组织（须经同意）。

【兜底监护人】没有依法具有监护资格的人的，由民政部门担任，也可以由村委会、居委会担任。`},{id:"k_0007",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 民事法律行为的效力类型（有效/无效/可撤销/效力待定）",content:`【有效要件】行为人具有相应行为能力 + 意思表示真实 + 不违反强制性规定、不违背公序良俗。
【无效情形】
• 无民事行为能力人独立实施的民事法律行为；
• 行为人与相对人以虚假的意思表示实施的民事法律行为（隐藏行为按相关法律处理）；
• 违反法律、行政法规的效力性强制性规定；
• 违背公序良俗；
• 恶意串通，损害他人合法权益。
【可撤销情形（自知道或应当知道之日起1年内，重大误解90日内）】
• 重大误解、欺诈、胁迫、显失公平。
【效力待定情形】限制民事行为能力人超越能力实施的非纯获利行为；无权代理行为。`},{id:"k_0008",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 虚假表示与隐藏行为的效力",content:"2. 行为人与相对人以虚假的意思表示实施的民事法律行为；"},{id:"k_0009",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 恶意串通民事法律行为的效力",content:"3. 行为人与相对人恶意串通，损害他人合法权益的民事法律行为；"},{id:"k_0010",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 违背公序良俗的民事法律行为",content:"4. 违背公序良俗的民事法律行为；"},{id:"k_0011",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 违反法律、行政法规强制性规定",content:`5. 违反法律、行政法规的强制性规定的民事法律行为无效，但是该强制性规定不导致该民事法律行为无效的除外。
可撤销
l．重大误解的民事法律行为；`},{id:"k_0012",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 显失公平的民事法律行为",content:`4. 显失公平的民事法律行为。
效力待定
l．限制民事行为能力人未经法定代理人代理实施的超越其能力范围的行为；`},{id:"k_0013",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 欠缺代理权的无权代理与表见代理",content:`2.欠缺代理权的代理行为。
（四）诉讼时效`},{id:"k_0014",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 诉讼时效制度与起算规则",content:`【普通诉讼时效】向人民法院请求保护民事权利的诉讼时效期间为三年。
【最长诉讼时效】自权利受到损害之日起超过二十年的，人民法院不予保护，有特殊情况的可申请延长。
【起算时间】自权利人知道或者应当知道权利受到损害以及义务人之日起计算。
【不适用诉讼时效的情形】
• 请求停止侵害、排除妨碍、消除危险；
• 不动产物权和登记的动产物权权利人请求返还财产；
• 请求支付抚养费、赡养费或者抚育费；
• 依法不适用诉讼时效的其他请求权。`},{id:"k_0015",chapter:"第一章 法律常识",section:"第一讲民法",topic:"一、总则",title:"民法典 • 不适用诉讼时效的情形",content:`2. 不适用诉讼时效的情形不适用诉讼时效的情形请求停止侵害、排除妨碍、消除危险。
不动产物权和登记的动产物权的权利人请求返还财产。
请求支付抚养费、赡养费或者扶养费。
依法不适用诉讼时效的其他请求权。`},{id:"k_0016",chapter:"第一章 法律常识",section:"第一讲民法",topic:"二、物权",title:"民法典 • 物权概述与物权法定原则",content:`【物权的概念】是指权利人依法对特定的物享有直接支配和排他的权利，包括所有权、用益物权和担保物权。
【物权法定原则】物权的种类和内容，由法律规定，当事人不得随意创设。
【物权变动规则】
• 不动产物权：经依法登记发生效力；未经登记，不发生效力（法律另有规定的除外）。国家所有自然资源所有权可不登记。
• 动产物权：自交付时发生效力（法律另有规定的除外）。`},{id:"k_0017",chapter:"第一章 法律常识",section:"第一讲民法",topic:"二、物权",title:"民法典 • 所有权权能与征收征用规则",content:`【所有权四大权能】
• 占有：对物的实际控制与管领；
• 使用：依照物的性能加以利用；
• 收益：收取物所产生的天然孳息与法定孳息；
• 处分：决定物的命运（所有权最核心、最本质的权能）。
【征收与征用】
• 征收：为了公共利益的需要，依法征收集体土地、单位和个人房屋等（所有权发生移转），必须给予公平合理的补偿。
• 征用：因抢险救灾、疫情防控等紧急需要，依法征用组织或者个人的财产（所有权不移转，用后返还），用后应当返还并给予补偿。`},{id:"k_0018",chapter:"第一章 法律常识",section:"第一讲民法",topic:"二、物权",title:"民法典 • 动产与不动产的善意取得制度",content:`【善意取得构成要件】无处分权人将不动产或者动产转让给受让人的，所有权人有权追回；但符合下列全部情形的，受让人取得该物所有权：
  (1) 受让人受让该动产或不动产时是善意的（不知情且无重大过失）；
  (2) 以合理的价格转让（非赠与、非显著低价）；
  (3) 转让的财产依照法律规定应当登记的已经登记，不需要登记的已经交付给受让人。
【法律后果】受让人取得物权后，原所有权人有权向无处分权人请求损害赔偿。`},{id:"k_0019",chapter:"第一章 法律常识",section:"第一讲民法",topic:"二、物权",title:"民法典 • 居住权的概念与设立规则",content:`【居住权概念】居住权人有权按照合同约定或者遗嘱，对他人的住宅享有占有、使用的用益物权，以满足生活居住的需要。
【设立与生效】
• 设立方式：应当采用书面形式订立居住权合同，或以遗嘱方式设立；
• 生效要件：居住权自向登记机构办理登记时设立（登记生效主义）。
【权能限制】
• 居住权原则上无偿设立；
• 居住权不得转让、不得继承；
• 设立居住权的住宅不得出租（当事人另有约定的除外）。
• 居住权期间届满或者居住权人死亡的，居住权消灭。`},{id:"k_0020",chapter:"第一章 法律常识",section:"第一讲民法",topic:"三、合同",title:"民法典 • 合同编概述与合同订立程序",content:`【合同的概念】合同是民事主体之间设立、变更、终止民事法律关系的协议。婚姻、收养、监护等有关身份关系的协议适用身份法规定，没有规定的可参照适用合同编。
【合同订立程序】
• 要约：希望和他人订立合同的意思表示，内容须具体确定，表明经受要约人承诺即受该意思表示约束（如拍卖公告、商业广告通常为要约邀请，但符合要约条件的视为要约）。
• 承诺：受要约人同意要约的意思表示。承诺生效时合同成立。`},{id:"k_0021",chapter:"第一章 法律常识",section:"第一讲民法",topic:"四、人格权",title:"民法 • 人格权",content:`生命权自然人享有生命权。自然人的生命安全和生命尊严受法律保护。任何组织或者个人不得侵害他人的生命权。
身体权自然人享有身体权。自然人的身体完整和行动自由受法律保护。任何组织或者个人不得侵害他人的身体权。
侵权方式：
(1)破坏身体的完整性。（2)破坏身体的完满性。（3)侵害身体活动自由。
健康权自然人享有健康权。自然人的身心健康受法律保护。任何组织或者个人不得侵害他人的健康权。
实施加害行为，导致自然人的生理机能、心理机能不能正常发挥，处千疾病状态，或者丧失、部分丧失劳动能力的，即成立对健康权的侵害。
姓名权和名称权自然人享有姓名权，有权依法决定、使用、变更或者许可他人使用自己的姓名，但是不得违背公序良俗。
法人、非法人组织享有名称权，有权依法决定、使用、变更、转让或者许可他人使用自己的名称。
任何组织或者个人不得以干涉、盗用、假冒等方式侵害他人的姓名权或者名称权。
肖像权自然人享有肖像权，有权依法制作、使用、公开或者许可他人使用自己的肖像。肖像是通过影像、雕塑、绘画等方式在一定载体上所反映的特定自然人可以被识别的外部形象。
对自然人声音的保护，参照适用肖像权保护的有关规定。
侵权方式：
任何组织或者个人不得以丑化、污损，或者利用信息技术手段伪造等方式侵害他人的肖像权。未经肖像权人同意，不得制作、使用、公开肖像权人的肖像，但是法律另有规定的除外。
未经肖像权人同意，肖像作品权利人不得以发表、复制、发行、出租、展览等方式使用或者公开肖像权人的肖像。
肖像的合理使用：
合理实施下列行为的，可以不经肖像权人同意：
(1) 为个人学习、艺术欣赏、课堂教学或者科学研究，在必要范围内使用肖像权人已经公开的肖像；
(2) 为实施新闻报道，不可避免地制作、使用、公开肖像权人的肖像；
(3)为依法履行职责，国家机关在必要范围内制作、使用、公开肖像权人的肖像；
(4)为展示特定公共环境，不可避免地制作、使用、公开肖像权人的肖像；
(5)为维护公共利益或者肖像权人合法权益，制作、使用、公开肖像权人的肖像的其他行为。
名誉权民事主体享有名誉权。任何组织或者个人不得以侮辱、诽谤等方式侵害他人的名誉权。名誉是对民事主体的品德、声望、才能、信用等的社会评价。
荣誉权民事主体享有荣誉权。任何组织或者个人不得非法剥夺他人的荣誉称号，不得证毁、贬损他人的荣誉。
荣誉是指有关机关按照一定程序和标准对民事主体所作的积极、肯定的正式评价。
隐私权自然人享有隐私权。任何组织或者个人不得以刺探、侵扰、泄露、公开等方式侵害他人的隐私权。
隐私是自然人的私人生活安宁和不愿为他人知晓的私密空间、私密活动、私密信息。
个人信息自然人的个人信息受法律保护。
个人信息是以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人的各种信息，包括自然人的姓名、出生日期、身份证件号码、生物识别信息、住址、电话号码、电子邮箱、健康信息、行踪信息等。`},{id:"k_0022",chapter:"第一章 法律常识",section:"第一讲民法",topic:"四、人格权",title:"民法 • 人格权",content:"机关，以证明张某在上班时间没有认真履行工作职责"},{id:"k_0023",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法 • 婚姻家庭",content:`（一）结婚的条件及效力结婚条件
l．达到法定婚龄：男不得早于二十二周岁，女不得早于二十周岁。`},{id:"k_0024",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法典 • 禁止结婚的亲属关系规定",content:`3. 不得有禁止结婚的亲属关系。
婚姻效力无效婚姻`},{id:"k_0025",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法典 • 未到法定婚龄的婚姻效力",content:`3. 未到法定婚龄。
可撤销婚姻`},{id:"k_0026",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法典 • 婚前隐瞒重大疾病的可撤销婚姻",content:`2. 一方患有重大疾病，婚前未如实告知另一方的。
（二）夫妻财产制度夫妻共同财产夫妻在婚姻关系存续期间所得的下列财产，为夫妻的共同财产：
l．工资、奖金、劳务报酬；`},{id:"k_0027",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法典 • 夫妻共同财产（生产经营与投资收益）",content:"2. 生产、经营、投资的收益；"},{id:"k_0028",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法 • 婚姻家庭 • 知识产权的收益",content:"3. 知识产权的收益，具体是指婚姻关系存续期间，实际取得或者已经明确可以取得的财产性收益；"},{id:"k_0029",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法典 • 夫妻共同财产（继承或受赠财产）",content:"4. 继承或者受赠的财产，但是遗嘱或者赠与合同中确定只归一方的除外；"},{id:"k_0030",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法典 • 夫妻共同财产的其他法定范围",content:`5. 其他应当归共同所有的财产。
夫妻一方个人财产
l．一方的婚前财产；`},{id:"k_0031",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法典 • 夫妻个人特有财产（人身损害赔偿等）",content:"2. 一方因受到人身损害获得的赔偿或者补偿；"},{id:"k_0032",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法典 • 夫妻个人特有财产（遗嘱或赠与确定归一方）",content:"3. 遗嘱或者赠与合同中确定只归一方的财产；"},{id:"k_0033",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法 • 婚姻家庭 • 军人的伤亡保险金",content:`5. 军人的伤亡保险金、伤残补助金、医药生活补助费。
同居关系析产双方均无配偶的同居关系析产纠纷案件中，对同居期间所得的财产，有约定的，按照约定处理；没有约定且协商不成的，人民法院按照以下情形分别处理：
(1) 各自所得的工资、奖金、劳务报酬、知识产权收益，各自继承或者受赠的财产以及单独生产、经营、投资的收益等，归各自所有；
(2) 共同出资购置的财产或者共同生产、经营、投资的收益以及其他无法区分的财产，以各自出资比例为基础，综合考虑共同生活情况、有尤共同子女、对财产的贡献大小等因素进行分割。
基于婚姻赠与房屋的处理
l．婚前或者婚姻关系存续期间，当事人约定将一方所有的房屋转移登记至另一方或双方名下，离婚诉讼时房屋所有权尚未转移登记，双方对房屋归属或者分割有争议且协商不成的，人民法院可以根据当事人诉讼请求，结合给予目的，综合考虑婚姻关系存续时间、共同生活及孕育共同子女情况、
离婚过错、对家庭的贡献大小以及离婚时房屋市场价格等因素，判决房屋归其中一方所有，并确定是否由获得房屋一方对另一方予以补偿以及补偿的具体数额。
2．婚前或者婚姻关系存续期间，一方将其所有的房屋转移登记至另一方或者双方名下，离婚诉讼中，双方对房屋归属或者分割有争议且协商不成的，
如果婚姻关系存续时间较短且给予方无重大过错，人民法院可以根据当事人诉讼请求，判决该房屋归给予方所有，并结合给予目的，综合考虑共同生活及孕育共同子女情况、离婚过错、对家庭的贡献大小以及离婚时房屋市场价格等因素，确定是否由获得房屋一方对另一方予以补偿以及补偿的具体数额。
直播打赏夫妻一方未经另一方同意，在网络直播平台用夫妻共同财产打赏，数额明显超出其家庭一般消费水平的，另一方有权请求在婚姻关系存续期间分割夫妻共同财产，或者在离婚分割夫妻共同财产时请求对打赏一方少分或者不分。
父母在婚后出资购买房屋的所有权归属
l．婚姻关系存续期间，夫妻购置房屋由一方父母全额出资，如果赠与合同明确约定只赠与自己子女一方的，按照约定处理；没有约定或者约定不明确的，离婚分割夫妻共同财产时，人民法院可以判决该房屋归出资人子女一方所有，并综合考虑共同生活及孕育共同子女情况、离婚过错、对家庭的贡献大小以及离婚时房屋市场价格等因素，确定是否由获得房屋一方对另一方予以补偿以及补偿的具体数额。
2．婚姻关系存续期间，夫妻购置房屋由一方父母部分出资或者双方父母出资，如果赠与合同明确约定相应出资只赠与自己子女一方的，按照约定处理；没有约定或者约定不明确的，离婚分割夫妻共同财产时，人民法院可以根据当事人诉讼请求，以出资来源及比例为基础，综合考虑共同生活及孕育共同子女情况、离婚过错、对家庭的贡献大小以及离婚时房屋市场价格等因素，判决房屋归其中一方所有，并由获得房屋一方对另一方予以合理补偿。
彩礼返还
（民法典＋司法解释）
应当返还
（l）未缔结婚姻；（2）借婚姻索取财物酌情返还
(1)未登记但共同生活；（2)登记但共同生活时间短；
(3)婚前给付导致生活困难不予返还已登记结婚且长期共同生活
（三）离婚`},{id:"k_0034",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法 • 婚姻家庭 • 协议离婚",content:`1. 协议离婚条件
(1) 自愿离婚的意思表示。
(2) 对子女抚养、财产以及债务处理等事项协商一致。
(3)亲自到婚姻登记机关申请。
冷静期自婚姻登记机关收到离婚登记申请之日起三十日内，任何一方不愿意离婚的，可以向婚姻登记机关撤回离婚登记申请。
前款规定期限届满后三十日内，双方应当亲自到婚姻登记机关申请发给离婚证；
未申请的，视为撤回离婚登记申请。`},{id:"k_0035",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法 • 婚姻家庭 • 诉讼离婚",content:`2. 诉讼离婚判决离婚的法定条件人民法院审理离婚案件，应当进行调解；如果感情确已破裂，调解尤效的，应当准予离婚。有下列情形之一，调解无效的，应当准予离婚：
(1) 重婚或者与他人同居；
(2) 实施家庭暴力或者虐待、遗弃家庭成员；
（3）有赌博、吸毒等恶习屡教不改；
（4)因感情不和分居满二年；
(5)其他导致夫妻感情破裂的情形。
一方被宣告失踪，另一方提起离婚诉讼的，应当准予离婚。
经人民法院判决不准离婚后，双方又分居满一年，一方再次提起离婚诉讼的，
应当准予离婚。`},{id:"k_0036",chapter:"第一章 法律常识",section:"第一讲民法",topic:"五、婚姻家庭",title:"民法典 • 离婚经济补偿与离婚损害赔偿",content:`3. 离婚补偿和离婚赔偿离婚补偿夫妻一方因抚育子女、照料老年人、协助另一方工作等负担较多义务的，离婚时有权向另一方请求补偿。
离婚赔偿有下列情形之一，导致离婚的，尤过错方有权请求损害赔偿：
(1) 重婚；
(2) 与他人同居；
(3)实施家庭暴力；
(4) 虐待、遗弃家庭成员；
(5) 有其他重大过错。`},{id:"k_0037",chapter:"第一章 法律常识",section:"第一讲民法",topic:"六、继承",title:"民法 • 继承",content:`法定继承范围和顺序第一顺序配偶、子女、父母。
丧偶儿媳对公婆，丧偶女婿对岳父母，尽了主要赡养义务的，
作为第一顺序继承人。
第二顺序兄弟姐妹、祖父母、外祖父母。
分配原则继承开始后，由第—顺序继承人继承，第二顺序继承人不继承；没有第一顺序继承人继承的，由第二顺序继承人继承。
同一顺序继承人继承遗产的份额，一般应当均等。
遗嘱继承、遗赠与遗赠扶养协议遗嘱
l．形式：自书遗嘱、代书遗嘱、打印遗嘱、录音录像遗嘱、口头遗嘱、公证遗嘱。
2．其他规定：
(1) 立有数份遗嘱，内容相抵触的，以最后的遗嘱为准。
(2) 立遗嘱后，遗嘱人实施与遗嘱内容相反的民事法律行为的，视为对遗嘱相关内容的撤回。
遗嘱继承
l．将遗产处分给法定继承人范围内的人所有，叫遗嘱继承。
2．接受继承可以明示，也可以默示。继承人在继承开始后，没有表示放弃继承的，就视为接受继承。
遗赠
l．将遗产处分给国家、集体或法定继承人以外的人所有，叫遗赠。
2．接受遗赠必须在受遗赠人知道受遗赠后60日内，以明示或积极作为的形式作出表示，到期没有表示的，视为放弃受遗赠。
遗赠扶养协议
l．遗赠扶养协议，是指遗赠人与继承人以外的组织或者个人签订的，遗赠人的全部或部分财产在其死亡后转移给扶养人，扶养人承担对遗赠人生养死葬生养死葬义务的协议。
2．遗赠扶养协议＞遗嘱（遗赠）＞法定继承。`},{id:"k_0038",chapter:"第一章 法律常识",section:"第一讲民法",topic:"七、侵权责任",title:"民法 • 侵权责任",content:`监护人责任归责原则无过错。
责任承担
l．原则上由监护人承担，有财产的无民事行为能力人、限制民事行为能力人造成他人损害的，从本人财产中支付赔偿费用；不足部分，由监护人赔偿。`},{id:"k_0039",chapter:"第一章 法律常识",section:"第一讲民法",topic:"七、侵权责任",title:"民法 • 侵权责任 • 夫妻离婚后",content:"2. 夫妻离婚后，未成年子女造成他人损害，被侵权人请求离异夫妻共同承担侵权责任的，人民法院予以支持。一方以未与该子女共同生活为由主张不承担或者少承担责任的，人民法院不予支持。"},{id:"k_0040",chapter:"第一章 法律常识",section:"第一讲民法",topic:"七、侵权责任",title:"民法典 • 离异夫妻对未成年子女侵权责任的分担",content:`3. 离异夫妻之间的责任份额，可以由双方协议确定；协议不成的，人民法院可以根据双方履行监护职责的约定和实际履行情况等确定。
无、限制民事行为能力人在教育机构遭受损害归责原则过错推定（尤民事行为能力人，注意：不满8周岁）。
一般过错（限制民事行为能力人）。
责任主体学校、幼儿园或其他教育机构。
由第三人导致损害由教育机构以外的第三人承担侵权责任；幼儿园、学校或者其他教育机构未尽到管理职责的，承担相应的补充责任。幼儿园、学校或者其他教育机构承担补充责任后，可以向第三人追偿。
用工责任归责原则无过错。
种类单位用工性质劳动关系。
责任主体用人单位（即国家机关、事业单位、企业、个体工商户等）。
对外由用人单位承担侵权责任。
对内用人单位承担侵权责任后，可以向有故意或者重大过失的工作人员追偿。
劳务派遣实际用人单位承担无过错责任，劳务派遣单位有过错的，承担相应的责任。
个人劳务心提供劳务一方因劳务造成他人损害的，由接受劳务一方承担侵权责任。接受劳务一方承担侵权责任后，可以向有故意或者重大过失的提供劳务一方追偿。
• 提供劳务一方因劳务受到损害的，根据双方各自的过错承担相应的责任。
安保义务人责任归责原则一般过错。
责任主体商场、娱乐场所、宾馆、银行、车站等公共场所的管理人或群众性活动组织者，
且不以有交易关系为必要。
第三人侵权第三人承担赔偿责任；安保义务人无过错的，不承担责任；有过错的，在过错范围内承担相应的补充赔偿责任；承担责任后可向第三人追偿。
产品责任归责原则尤过错责任。
责任承担因产品存在缺陷造成他人损害的，被侵权人可以向产品的生产者请求赔偿，也可以向产品的销售者请求赔偿。
产品缺陷由生产者造成的，销售者赔偿后，有权向生产者追偿。因销售者的过错使产品存在缺陷的，生产者赔偿后，有权向销售者追偿。
饲养动物损害责任动物类型归责原则责任主体免责事由一般动物无过错饲养人或管理人烈性犬无过错责任、没有免责事由；
没有安全措施的动物——尤过错责任、受害人故意（减轻）；
有安全措施的动物——无过错责任、受害人故意（免责）、受害人重大过失（减轻）。
动物园过错推定动物园受害人故意、重大过失。
高空抛物责任能够确定侵权人从建筑物中抛掷物品或者从建筑物上坠落的物品造成他人损害的，由侵权人依法承担侵权责任。（一般过错）
不能确定侵权人经调查难以确定具体侵权人的，除能够证明自己不是侵权人的外，由可能加害的建筑物使用人给予补偿。可能加害的建筑物使用人补偿后，有权向侵权人追偿。（过错推定＋公平补偿）
物业物业服务企业等建筑物管理人应当采取必要的安全保障措施防止前款规定情形的发生；未采取必要的安全保障措施的，应当依法承担未履行安全保障义务的侵权责任。（一般过错）
环境污染和生态破坏责任归责原则无过错责任。
环境污染侵权实行举证责任倒置及因果关系的推定：因污染环境、破坏生态发生纠纷，行为人应当就法律规定的不承担责任或者减轻责任的情形及其行为与损害之间不存在因果关系承担举证责任。
机动车侵权责任机动车一方承担无过错责任。免责事由：
致非机动心非机动车、行人有过错，根据其过错程度适当减轻机动车一方责任；
车、行人
• 机动车一方没有过错的，承担不超过百分之十的赔偿责任；
损害
• 交通事故的损失是由非机动车驾驶人、行人故意碰撞机动车造成的，机动车一方不承担赔偿责任。（碰瓷）
机动车之间过错责任。机动车之间发生交通事故的，由有过错的一方承担赔偿责任；双方都有过错的，按照各自过错的比例分担责任。
好意搭乘非营运机动车发生交通事故造成无偿搭乘人损害的，属于该机动车一方责任的，
过程中发应当减轻其赔偿责任，但机动车使用人有故意或重大过失的除外。好意搭乘是生交通事一种助人为乐的行为，属于互帮互助的传统美德，发生交通事故后，若让驾驶故造成乘人承担全部责任，不利千传统美德弘扬。
车人损害`},{id:"k_0041",chapter:"第一章 法律常识",section:"第一讲民法",topic:"七、侵权责任",title:"民法 • 侵权责任",content:`请求M公司承担违约责任
1超格学员专用1
楼的某一住户蔡某能证明自己当时不在家，也要给予丁某一定补偿`},{id:"k_0042",chapter:"第一章 法律常识",section:"一、刑法的空间效力",topic:"一、刑法的空间效力",title:"刑法的空间效力 • 通用",content:"属地管辖在我国领域内犯罪，除法律特别规定的以外，适用我国刑法。"},{id:"k_0043",chapter:"第一章 法律常识",section:"一、刑法的空间效力",topic:"一、刑法的空间效力",title:"刑法的空间效力 • 领域",content:`1. 领域：
• 固有领域：领陆、领水、领空、我国驻外使领馆；
• 流动领域：悬挂我国国旗的船舶、航空器。`},{id:"k_0044",chapter:"第一章 法律常识",section:"一、刑法的空间效力",topic:"一、刑法的空间效力",title:"刑法的空间效力 • “犯罪地”的确定标准",content:`2. “犯罪地”的确定标准：犯罪行为地和结果地只要有一项发生在我国境内即可。
属人管辖
l．中华人民共和国公民在中华人民共和国领域外犯本法规定之罪的，适用本法，但是按本法规定的最高刑为三年以下有期徒刑的，可以不予追究。
2．中华人民共和国国家工作人员和军人在中华人民共和国领域外犯本法规定之罪的，适用本法。
保护管辖外国人在中华人民共和国领域外对中华人民共和国国家或者公民犯罪，而按本法规定的最低刑为三年以上有期徒刑的，可以适用本法，但是按照犯罪地的法律不受处罚的除外。
普遍管辖对于中华人民共和国缔结或者参加的国际条约所规定的罪行，中华人民共和国在所承担条约义务的范围内行使刑事管辖权的，适用本法。
－ 自然人的刑事责任能力完全刑事责任能力心年满16周岁；
• 间歇性精神病人精神正常时；
• 醉酒的人。
完全无刑事责任能力心不满12周岁的人；
• 精神病人。
相对无刑事责任能力心已满12周岁不满14周岁的人，犯故意杀人、故意伤害罪，致人死亡或者以特别残忍手段致人重伤造成严重残疾，情节恶劣，经最高人民检察院核准追诉的，应当负刑事责任。
• 巳满14周岁不满16周岁的人，犯故意杀人、故意伤害致人重伤或者死亡、强奸、抢劫、贩卖毒品、放火、爆炸、投放危险物质罪的，应当负刑事责任。
减轻刑事责任能力已满12周岁不满18周岁的未成年人、已满75周岁的人、又聋又哑的人、盲人、尚未完全丧失辨认或者控制自己行为能力的精神病人，为减轻刑事责任能力的人。`},{id:"k_0045",chapter:"第一章 法律常识",section:"一、刑法的空间效力",topic:"三、正当防卫",title:"刑法的空间效力 • 正当防卫",content:`【概念】为了使国家、公共利益、本人或者他人的人身、财产和其他权利免受正在进行的不法侵害，而采取的制止不法侵害的行为，对不法侵害人造成损害的，属于正当防卫，不负刑事责任。
防卫过当及其处罚正当防卫明显超过必要限度造成重大损害的，应当负刑事责任，但是应当减轻或者免除处罚。
特殊正当防卫
——无限防卫权
l．适用范围：正在进行的严重危及人身安全的暴力犯罪，如行凶、杀人、抢劫、强奸、绑架。
2．限度：即使超过必要限度，造成不法侵害人死亡的，不负刑事责任。`},{id:"k_0046",chapter:"第一章 法律常识",section:"一、刑法的空间效力",topic:"四、重要罪名",title:"刑法的空间效力 • 要罪名",content:`抢劫罪
l．抢劫罪，是指以非法占有为目的，以暴力、胁迫或者其他方法，强行劫取公私财物的行为。
2．转化型抢劫：
(1) 携带凶器抢夺的，依照抢劫罪定罪处罚。
(2) 犯盗窃罪、诈骗罪、抢夺罪，为窝截赃物、抗拒抓捕或者毁灭罪证当场使用暴力或者以暴力相威胁的，依照抢劫罪的规定定罪处罚。
抢夺罪以非法占有为目的，直接夺取他人紧密占有的数额较大的公私财物，或者多次夺取他人紧密占有的公私财物的行为。
盗窃罪以非法占有为目的，窃取公私财物数额较大，或者多次盗窃、入户盗窃、携带凶器盗窃、扒窃的行为。
诈骗罪以非法占有为目的，使用虚构事实或者隐瞒真相的方法，骗取数额较大的公私财物的行为。
侵占罪将代为保管的他人财物非法占为己有，数额较大，拒不退还的，或者将他人的遗忘物或者埋藏物非法占为已有，数额较大，拒不交出的行为。
帮助信息网络犯罪活动罪自然人或者单位明知他人利用信息网络实施犯罪，为其犯罪提供互联网接入、
服务器托管、网络存储、通讯传输等技术支持，或者提供广告推广、支付结算等帮助，情节严重的行为。
贪污罪国家工作人员和受国家机关、国有公司、企业、事业单位、人民团体委托管理、
经营国有财产的人员，利用职务上的便利，侵吞、窃取、骗取或者以其他手段非法占有公共财物的行为。
挪用公款罪国家工作人员利用职务上的便利，挪用公款归个人使用，进行非法活动的，或者挪用公款数额较大、进行营利活动的，或者挪用公款数额较大、超过三个月未还的，是挪用公款罪。
挪用用千救灾、抢险、防汛、优抚、扶贫、移民、救济款物归个人使用的，从重处罚。
受贿罪国家工作人员利用职务上的便利，索取他人财物的，或者非法收受他人财物，
为他人谋取利益的行为。
利用影响力受贿罪国家工作人员的近亲属或者其他与该国家工作人员关系密切的人，通过该国家工作人员职务上的行为，或者利用该国家工作人员职权或者地位形成的便利条件，通过其他国家工作人员职务上的行为，为请托人谋取不正当利益，索取请托人财物或者收受请托人财物，数额较大或者有其他较重情节的行为。
高空抛物罪从建筑物或者其他高空抛掷物品，悄节严重的行为。
有此行为，同时构成其他犯罪的，依照处罚较重的规定定罪处罚。
妨害安全驾驶罪对行驶中的公共交通工具的驾驶人员使用暴力或者抢控驾驶操纵装置，干扰公共交通工具正常行驶，危及公共安全或者驾驶人员在行驶的公共交通工具上擅离职守，与他人互殴或者殴打他人，危及公共安全的行为。
有以上行为，同时构成其他犯罪的，依照处罚较重的规定定罪处罚。
以危险方法危害公共安全罪以危险方法危害公共安全罪，是指故意使用放火、决水、爆炸、投放危险物质以外的危险方法危害公共安全的行为。`},{id:"k_0047",chapter:"第一章 法律常识",section:"一、刑法的空间效力",topic:"四、重要罪名",title:"刑法的空间效力 • 要罪名",content:"孩跨区入学问题，丁知情后未反对"},{id:"k_0048",chapter:"第一章 法律常识",section:"第三讲法理学",topic:"第三讲法理学",title:"法理学 • 通用",content:"我国法的正式渊源正式渊源制定机关"},{id:"k_0049",chapter:"第一章 法律常识",section:"第三讲法理学",topic:"第三讲法理学",title:"法理学 • 注意",content:`【注意】内容宪法第一届人大第一次全体会议（全人大）
宪法的修改由全人常或者五分之一以上的全国人民代表大会代表提议，并由全国人民代表大会以全体代表的三分之二以上的多数通过。
法律基本法律
l．全人大；`},{id:"k_0050",chapter:"第一章 法律常识",section:"第三讲法理学",topic:"第三讲法理学",title:"法理学 • 全人大可授权全",content:`2.全人大可授权全人常制定相关法律。
修改主体：
l．全人大；
2．全人大闭会期间，全人常有权部分补充或修改，
但不得同该法律的基本原则相抵触。
非基本法律全人常修改主体：全人常行政法规国务院是国家行政机关体系中最高的规范性文件。
监察法规国家监察委员会监察法规应当在公布后的三十日内报全人常备案。
地方性法规省级人大、人常；
设区市级人大、人常设区的市级人大、人常仅可就城乡建设与管理、生态文明建设、历史文化保护、基层治理等方面的事项制定地方性法规，须报省级人常批准后施行。
自治法规民族区域自治地方，
即自治区、自治州、
自治县人大自治区的自治条例和单行条例，报全国人民代表大会常务委员会批准后生效。自治州、自治县的自治条例和单行条例，报省、自治区、直辖市的人民代表大会常务委员会批准后生效。
规章部门规章国务院各部、委员会、中国人民银行、审计署和具有行政管理职能的直构属机 。
地方政府规章省、自治区、直辖市和设区的市、自治州的人民政府设区的市、自治州的人民政府制定地方政府规章，
限于城乡建设与管理、生态文明建设、历史文化保护、基层治理等方面的事项。`},{id:"k_0051",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"一、宪法概述",title:"宪法概述 • 通用",content:`【概念】宪法是国家最高权力机关经由特殊程序制定和修改的，综合性地规定国家、
社会和公民生活的根本问题，具有最高法律效力的法。
我国宪法发展的历程`},{id:"k_0052",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"一、宪法概述",title:"宪法概述 • 钦定宪法大纲",content:"1. 1908年，《钦定宪法大纲》是我国历史上第一部宪法性文件。"},{id:"k_0053",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"一、宪法概述",title:"宪法概述 • 中华民国临时约法",content:"2. 1912年，《中华民国临时约法》是我国历史上唯一的一部具有资产阶级共和国性质的宪法性文件。"},{id:"k_0054",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"一、宪法概述",title:"宪法概述 • 共同纲领",content:"3. 《共同纲领》于1949年9月29日通过，是在新中国成立后起到“临时宪法”作用的一部宪法性文件。"},{id:"k_0055",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"一、宪法概述",title:"宪法概述",content:"4. 1954年宪法是我国第一部社会主义类型的宪法。"},{id:"k_0056",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"一、宪法概述",title:"宪法概述 • 年宪法是我国的现行宪法",content:`5. 1982年宪法是我国的现行宪法，经历了5次修改(1988年、1993年、1999
年、2004年、2018年部分修改），1982年12月4日通过(2014年将每年12
月4日定为“国家宪法日”)
我国宪法的结构序言、正文。（无附则）
序言历史发展、指导思想、根本任务、基本国策、效力地位等。
正文`},{id:"k_0057",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"一、宪法概述",title:"宪法概述 • 会排序",content:`【会排序】
• 总纲：国家性质、国家政治制度、国家结构形式、经济制度、文化制度、社会制度
• 公民的基本权利和义务。
• 国家机构。
• 国家标志：国旗、国歌、国徽、首都。`},{id:"k_0058",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"二、因家制度",title:"宪法概述 • 国家制度",content:`根本制度社会主义制度国体人民民主专政政体人民代表大会制度：
(1)国家的一切权力属于人民。
(2) 人民通过民主选举产生全国人民代表大会和地方各级人民代表大会，作为人民行使国家权力的机关。
(3) 国家行政机关、审判机关、检察机关、监察机关都由人民代表大会产生，对它负责，受它监督。
(4) 全国人民代表大会和地方各级人民代表大会都由民主选举产生，对人民负责，受人民监督。
基本政治制度`},{id:"k_0059",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"二、因家制度",title:"宪法 • 民族区域自治制度",content:`1.民族区域自治制度
(1)民族自治地方：自治区、自治州、自治县。（注意：民族乡不是自治地方） (2)
民族自治地方的自治机关：自治区、自治州、自治县的人民代表大会和人民政府。
自治区主席、自治州州长、自治县县长山实行区域自治的民族的公民担任。
民族自治地方的人大常委会中应当有实行区域自治的民族的公民担任主任或者副主任。`},{id:"k_0060",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"二、因家制度",title:"宪法 • 基层群众自治制度（村委会与居委会）",content:`3. 基层群众自治制度国家结构形式单一制经济制度公有制为主体、多种所有制经济共同发展的基本经济制度；坚持按劳分配为主体、
多种分配方式并存的分配制度；社会主义市场经济体制。
社会主义的公共财产神圣不可侵犯。
公民的合法的私有财产不受侵犯。国家依照法律规定保护公民的私有财产权和继承权。国家为了公共利益的需要，可以依照法律规定对公民的私有财产实行征收或者征用并给予补偿。
一公民的基本权利政治权利和自由选举权与被选举权中华人民共和国年满十八周岁的公民，不分民族、种族、性别、职业、
家庭出身、宗教信仰、教育程度、财产状况、居住期限，都有选举权和被选举权；但是依照法律被剥夺政治权利的人除外。
政治自由言论、出版、集会、结社、游行、示威。
人身自由权生命权我国《宪法》虽然没有明确规定生命权条款，但在价值上是充分尊重和保障生命。
人身自由
(1) 中华人民共和国公民的人身自由不受侵犯；
(2) 任何公民，非经人民检察院批准或者决定或者人民法院决定，
并由公安机关执行，不受逮捕；
(3) 禁止非法拘禁和以其他方法非法剥夺或者限制公民的人身自由，禁止非法搜查公民的身体。
人格尊严中华人民共和国公民的人格尊严不受侵犯。
禁止用任何方法对公民进行侮辱、诽谤和诬告陷害。
住宅不受侵犯中华人民共和国公民的住宅不受侵犯。
禁止非法搜查或者非法侵入公民的住宅。
通信自由和通信秘密中华人民共和国公民的通信自由和通信秘密受法律的保护。除因国家安全或者追查刑事犯罪的需要，由公安机关或者检察机关依照法律规定的程序对通信进行检查外，任何组织或者个人不得以任何理由侵犯公民的通信自由和通信秘密。
监督权
(1) 中华人民共和国公民对于任何国家机关和国家工作人员，有提出批评和建议的权利；对于任何国家机关和国家工作人员的违法失职行为，有向有关国家机关提出申诉、控告或者检举的权利，但是不得捏造或者歪曲事实进行诬告陷害。
(2) 对于公民的申诉、控告或者检举，有关国家机关必须查清事实，负责处理。
任何人不得压制和打击报复。
社会经济文化权利劳动既是权利，又是义务。
受教育劳动者的休息权心中华人民共和国劳动者有休息的权利；
• 国家发展劳动者休息和休养的设施，规定职工的工作时间和休假制度。
物质帮助权中华人民共和国公民在年老、疾病或者丧失劳动能力的情况下（目前，我国宪法并未明确规定，公民在遇到地震等自然灾害的情况下可以获得物质帮助），有从国家和社会获得物质帮助的权利。
文化权利与自由中华人民共和国公民有进行科学研究、文学艺术创作和其他文化活动的自由。国家对于从事教育、科学、技术、文学、艺术和其他文化事业的公民的有益于人民的创造性工作，给以鼓励和帮助。`},{id:"k_0061",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法概述 • 中央国家机关",content:`全国人民代表大会性质全国人民代表大会是我国的最高国家权力机关。
组成任期全国人民代表大会由省、自治区、直辖市、特别行政区和军队选出的代表组成。各少数民族都应当有适当名额的代表。
全国人民代表大会每届任期五年。（可以连选连任）
会议召开每年举行一次，由全国人民代表大会常务委员会召集。
立法权
l.修改宪法。`},{id:"k_0062",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 全国人民代表大会的核心职权",content:`3. 制定和修改刑事、民事、国家机构的和其他的基本法律。
l．选举中华人民共和国主席、副主席。`},{id:"k_0063",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 国家领导人员的任免与选举程序",content:"2. 根据中华人民共和国主席的提名，决定国务院总理的人选。"},{id:"k_0064",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 国务院组成人员的决定程序",content:`3. 根据国务院总理的提名，决定国务院副总理、国务委员、各部部长、各委员会主任、审计长、秘书长的人选。
重要职权人事任免权`},{id:"k_0065",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 中央军事委员会主席的选举",content:"4. 选举中央军事委员会主席。"},{id:"k_0066",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 中央军事委员会其他组成人员的决定",content:"5. 根据中央军事委员会主席的提名，决定中央军事委员会其他组成人员的人选。"},{id:"k_0067",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 国家监察委员会主任的选举",content:"6. 选举国家监察委员会主任。"},{id:"k_0068",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 最高人民检察院检察长的选举",content:`8. 选举最高人民检察院检察长。
l．审查和批准国民经济和社会发展计划和计划执行情况的报告。
重大事项决定权`},{id:"k_0069",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 国家预算与决算的审查批准",content:"2. 审查和批准国家的预算和预算执行情况的报告。"},{id:"k_0070",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 改变或撤销全国人大常委会不适当决定",content:"3. 改变或者撤销全国人民代表大会常务委员会不适当的决定。"},{id:"k_0071",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法概述 • 中央国家机关",content:"4. 批准省、自治区和直辖市的建置。"},{id:"k_0072",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法概述 • 中央国家机关",content:"5. 决定特别行政区的设立及其制度。"},{id:"k_0073",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 全国人大常委会决定战争与和平状态",content:`6. 决定战争和和平的问题。
全国人民代表大会常务委员会性质全国人民代表大会常务委员会是全国人民代表大会的常设机关，是全国人民代表大会闭会期间，行使国家最高权力的机关。
人员组成：委员长，副委员长若干人，秘书长，委员若干人。
组成每届任期5年；委员长、副委员长连续任职不得超过两届。
任期全国人民代表大会常务委员会的组成人员不得担任国家行政机关、监察机关、审判机关和检察机关的职务。
立法权
l．解释宪法和法律、监督宪法实施。
2．制定和修改非基本法律。
l．撤销国务院制定的同宪法、法律相抵触的行政法规、决定和命令。
2．撤销省、自治区、直辖市国家权力机关制定的同宪法、法律和行重要政法规相抵触的地方性法规和决议。`},{id:"k_0074",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 全国人大常委会决定驻外代表任免",content:"3. 决定驻外全权代表的任免。"},{id:"k_0075",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 全国人大常委会决定条约与协定批准",content:`4. 决定同外国缔结条约和重要协定的批准和废除。
职权重大事项决定权`},{id:"k_0076",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 国家勋章和荣誉称号的规定与授予",content:"5. 规定和决定授予国家的勋章和荣誉称号。"},{id:"k_0077",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法概述 • 中央国家机关 • 闭会期间",content:"7. 闭会期间，如果遇到国家遭受武装侵犯或者必须履行国际间共同防止侵略的条约的情况，决定战争状态的宣布。"},{id:"k_0078",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法概述 • 中央国家机关",content:"8. 决定全国总动员或者局部动员。"},{id:"k_0079",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 动员令与紧急状态的宣布权限",content:`9. 决定全国或者个别省、自治区和直辖市进入紧急状态。
国家主席性质国家主席是我国的国家元首。
国务院性质是我国最高国家权力机关的执行机关，是最高国家行政机关。
组成任期人员组成：总理，副总理若干人，国务委员若干人，各部部长，各委员会主任，审计长，秘书长。
每届任期5年；总理、副总理、国务委员连续任职不得超过两届。
重要职权
l．立法权。国务院有权根据宪法和法律，规定行政措施，制定行政法规，发布决定和命令。`},{id:"k_0080",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 国务院领导和管理经济与城乡建设",content:"2. 领导和管理。（领导和管理经济工作和城乡建设、生态文明建设、教育、科学、文化、卫生、体育和计划生育工作、民政、公安、司法行政、国防建设、民族事务，保护华侨正当的权利和利益、保护归侨合法的权利和利益）"},{id:"k_0081",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 国务院改变或撤销各部委不适当命令",content:"3. 改变或者撤销各部、各委员会发布的不适当的命令、指示和规章。"},{id:"k_0082",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法 • 国务院改变或撤销地方各级机关不适当决定",content:"4. 改变或者撤销地方各级国家行政机关的不适当的决定和命令。"},{id:"k_0083",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法概述 • 中央国家机关 • 批准省",content:"5. 批准省、自治区、直辖市的区域划分，批准自治州、县、自治县、市的建置和区域划分。"},{id:"k_0084",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法概述 • 中央国家机关 • 决定省",content:`6. 决定省、自治区、直辖市的范围内部分地区进入紧急状态。
中央军事委员会性质领导全国武装力量，是全国最高军事领导机关。`},{id:"k_0085",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法概述 • 中央国家机关 • 注意",content:`【注意】：中华人民共和国的武装力量属于人民。
人民法院性质人民法院是国家的审判机关，依照法律规定独立行使审判权，不受行政机关、社会团体和个人的干涉。
人民检察院性质国家法律监督机关。
监察委员会性质国家监察机关。
职责
l．监督（对象一所有公职人员）`},{id:"k_0086",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法概述 • 中央国家机关 • 处置",content:`3. 处置：对违法的公职人员一政务处分决定对失职的领导人一进行问责对涉嫌犯罪的一移送人民检察院
1超格学员专用1`},{id:"k_0087",chapter:"第一章 法律常识",section:"一、宪法概述",topic:"四、中央因家机关",title:"宪法概述 • 中央国家机关",content:"编教材，把中华民族共同体意识从小就植入孩子们的心灵"},{id:"k_0088",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"第五讲行政法",title:"行政法 • 概念",content:`【概念】行政许可，是指行政机关根据行政相对方的申请，经审查依法赋予其从事某种活动的法律资格或者实施某种行为的法律权利的具体行政行为。
设定经常性行政许可，由全国人大及其常委会以法律、国务院以行政法规、有权地方人大及其常委会以地方性法规来设定。
国务院可以以决定形式和省、自治区和直辖市人民政府可以以规章形式设定临时性行政许可。
实施程序申请、受理、审查、决定期限：
l．能当场做出行政许可决定的，当场做出决定。不能当场作出行政许可决定的，
行政机关应当自受理行政许可申请之日起二十日内作出行政许可决定。二十日内不能作出决定的，经本行政机关负责人批准，可以延长十日，并应当将延长期限的理由告知申请人。但是，法律、法规另有规定的，依照其规定。
2．采取统一办理或者联合办理、集中办理的，办理的时间不得超过45日；45日内不能办结的，经本级人民政府负责人批准，可以延长15日，并应当将延长期限的理由告知申请人。
听证程序
l．听证日期：行政机关应当于举行听证的七日前将举行听证的时间、地点通知申请人、利害关系人，必要时予以公告。
2．听证的方式：听证应当公开举行。
3案外人主持。`},{id:"k_0089",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"第五讲行政法",title:"行政法 • 申辩、质证",content:`4.申辩、质证。
5．听证笔录的案卷排他原则。
监督检查撤销违法取得。
撤回合法取得，但：
(1) 行政许可所依据的法律、法规、规章修改或者废止；
(2) 准予行政许可所依据的客观情况发生重大变化的。
吊销合法取得，违法使用（行政处罚）。
注销程序。
一行政处罚处罚种类`},{id:"k_0090",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"第五讲行政法",title:"行政法 • 财产罚",content:"3. 财产罚罚款、没收违法所得、没收非法财物。"},{id:"k_0091",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"第五讲行政法",title:"行政法 • 资格罚",content:"4. 资格罚暂扣许可证件、降低资质等级、吊销许可证件。"},{id:"k_0092",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"第五讲行政法",title:"行政法 • 行政处罚种类（行为罚）",content:"5. 行为罚限制开展生产经营活动、责令停产停业、责令关闭、限制从业。"},{id:"k_0093",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"第五讲行政法",title:"行政法 • 其他法定行政处罚种类",content:`7. 法律、行政法规规定的其他行政处罚。
设定法律各种处罚。
行政法规限制人身自由除外。
地方性法规限制人身自由、吊销营业执照除外。
部门规章警告、通报批评、罚款；罚款限额由国务院规定。
地方性规章警告、通报批评、罚款；罚款限额由省级人大常委会规定。
管辖行政处罚由违法行为发生地的县级以上地方人民政府具有行政处罚权的行政机关管辖。法律、行政法规另有规定的除外。
省、自治区、直辖市根据当地实际情况，可以决定将基层管理迫切需要的县级人民政府部门的行政处罚权交由能够有效承接的乡镇人民政府、街道办事处行使，并定期组织评估。
适用不予处罚的情节有：
(1)不满14周岁的人有违法行为的，不予行政处罚，责令监护人加以管教；
(2)精神病人在不能辨认或者不能控制自己行为时有违法行为的，不予行政处罚，但应当责令其监护人严加看管和治疗；
(3)违法行为轻微并及时纠正，没有造成危害后果的，不予行政处罚；
(4)初次违法且危害后果轻微并及时改正的，可以不予行政处罚；
(5)当事人有证据足以证明没有主观过错的，不予行政处罚。法律、行政法规另有规定的，从其规定。
(6)超过追贵时效的，不再给予行政处罚。但法律另有规定的除外。
追责时效违法行为在2年内未被发现的，不再给予行政处罚；涉及公民生命健康安全、
金融安全且有危害后果的，上述期限延长至5年。法律另有规定的除外。
一事不再罚对当事人的同一个违法行为，不得给予两次以上罚款的行政处罚。同一个违法行为违反多个法律规范应当给予罚款处罚的，按照罚款数额高的规定处罚。
决定程序普通程序立案、调查取证、告知听取，立案之日起90日内作出行政处罚决定、送达（当场交付当事人；当事人不在场的，7日内送达）。
简易程序适用条件：心违法事实确凿并有法定依据；＠处罚种类和幅度分别是对公民处以200元以下、对法人或者其他组织处以3000元以下的罚款或者警告的。
特点：当场决定，当场送达。
听证程序应当告知当事人有权申请听证的情形：
(1)较大数额罚款；
(2)没收较大数额违法所得、没收较大价值非法财物；
(3)降低资质等级、吊销许可证件；
(4)责令停产停业、责令关闭、限制从业； (5)
其他较重的行政处罚；
(6)法律、法规、规章规定的其他情形。
听证会的程序：
(1) 听证的时间。由行政机关通知听证会举行的时间和地点；当事人要求听证的，应当在行政机关告知后五日内提出；行政机关应当在听证的七日前，通知当事人举行听证的时间、地点。
(2) 听证的方式。听证公开举行，涉及国家秘密、商业秘密或者个人隐私的除外。
(3) 案外人主持。
(4) 当事人可以亲自参加听证，也可以委托一至二人代理。
(5) 当事人及其代理人无正当理由拒不出席听证或者未经许可中途退出听证的，视为放弃听证权利，行政机关终止听证。
(6) 申辩、质证。
(7) 听证笔录：适用案卷排他原则。
执行程序罚缴分离罚缴分离，是指作出罚款决定的行政机关应当与收缴罚款的机构分离。
当场收缴
(1) 按照简易程序当场作出行政处罚决定，有下列情形之一的执法人员可以当场收缴：依法给予100元以下的罚款或者不当场收缴事后难以执行的。
（2)按照简易程序或者普通程序作出行政处罚，在边远、水上、
交通不便地区当事人向指定的银行或者通过电子支付系统缴纳罚款确有困难，经当事人提出，行政机关及其执法人员可以当场收缴罚款。
一行政强制行政强制措施`},{id:"k_0094",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"第五讲行政法",title:"行政法 • 概念",content:`【概念】行政强制措施是指行政机关在行政管理过程中，为制止违法行为，防止证据损毁，
避免危害发生，控制危险扩大等情形，依法对公民的人身自由实施暂时性限制，
或者对公民、法人或其他组织的财物实施暂时性控制的行为。
种类心限制公民人身自由（约束至酒醒、强制戒毒、强制隔离）；
2查封场所、设施或者财物；
• 扣押财物；
• 冻结存款、汇款；
• 其他行政强制措施。
行政强制执行`},{id:"k_0095",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"第五讲行政法",title:"行政法 • 概念",content:`【概念】行政强制执行是使用强制措施实现行政法义务的国家执行制度。
种类
CD加处罚款或者滞纳金；到期不缴纳罚款的，每日按罚款数额的3％加处罚款，加处罚款的数额不得超出罚款的数额（罚不过本金）；
• 划拨存款、汇款；
• 拍卖或者依法处理查封扣押的场所设施或者财物；
中排除妨碍、恢复原状；
• 代履行；
• 其他强制执行方式。`},{id:"k_0096",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"四、行政复议",title:"行政法 • 行政复议",content:`【概念】行政复议是指公民、法人或者其他组织认为行政机关的行政行为侵犯其合法权益，向行政复议机关提出行政复议申请，行政复议机关受理、审理行政行为合法性、适当性的行政行为。
重要制度一级复议制度一级复议原则是指行政争议经过行政复议机关一次审理并做出决定之后，申请人即使不服，也不得再向有关行政机关申请复议，而只能向法院提起行政诉讼，但是法律规定行政复议决定为最终栽决的除外。
调解制度行政复议机关办理行政复议案件，可以进行调解。调解应当遵循合法、自愿的原则，不得损害国家利益、社会公共利益和他人合法权益，不得违反法律、法规的强制性规定。
复议范围
(1) 对行政机关作出的行政处罚决定不服；
(2) 对行政机关作出的行政强制措施、行政强制执行决定不服；
(3) 申请行政许可，行政机关拒绝或者在法定期限内不予答复，或者对行政机关作出的有关行政许可的其他决定不服；
(4) 对行政机关作出的确认自然资源的所有权或者使用权的决定不服；
(5)对行政机关作出的征收征用决定及其补偿决定不服；
(6)对行政机关作出的赔偿决定或者不予赔偿决定不服；
(7)对行政机关作出的不予受理工伤认定申请的决定或者工伤认定结论不服；
(8)认为行政机关侵犯其经营自主权或者农村土地承包经营权、农村土地经营权；
(9)认为行政机关滥用行政权力排除或者限制竞争；
(10) 认为行政机关违法集资、摊派费用或者违法要求履行其他义务；
(11) 申请行政机关履行保护人身权利、财产权利、受教育权利等合法权益的法定职责，行政机关拒绝履行、未依法履行或者不予答复；
(12) 申请行政机关依法给付抚恤金、社会保险待遇或者最低生活保障等社会保障，行政机关没有依法给付；
(13) 认为行政机关不依法订立、不依法履行、未按照约定履行或者违法变更、解除政府特许经营协议、土地房屋征收补偿协议等行政协议；
(14) 认为行政机关在政府信息公开工作中侵犯其合法权益；
(15) 认为行政机关的其他行政行为侵犯其合法权益。
排除事项
l.国家行为：国防、外交等。`},{id:"k_0097",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"四、行政复议",title:"行政法 • 行政复议 • 抽象行政行为",content:"2. 抽象行政行为：行政法规、规章或者行政机关制定、发布的具有普遍约束力的决定、命令等规范性文件。"},{id:"k_0098",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"四、行政复议",title:"行政法 • 行政复议 • 内部行政行为",content:"3. 内部行政行为：行政机关对行政机关工作人员的奖惩、任免等决定。"},{id:"k_0099",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"四、行政复议",title:"行政法 • 行政复议 • 行政调解行为",content:`4. 行政调解行为：行政机关对民事纠纷作出的调解。
复议机关被申请人复议机关本级人民政府工作部门下一级人民政府本级人民政府依法设立的派出机关本级人民政府或其工作部门管理的被授权组织县级以上地方各级人民政府县级以上地方各级政府工作部门依法设立的派出机构原则上本级人民政府，直辖市、设区的市人民政府工作部门按行政区划设立派出机构，也可以由其所在地的人民政府管辖海关、外汇管理、金融、
国安、税务上一级主管部门司法行政部门本级人民政府或上一级司法行政管理部门省、自治区、直辖市人民政府本机关自己复议对省级政府和国务院部门作出的行政复议决定不服的，可以向法院提起行政诉讼；也可以向国务院申请裁决（最终栽决）
国务院部门国务院部门国务院部门的派出机构国务院部门管理的被授权组织复议申请公民、法人或者其他组织认为行政行为侵犯其合法权益的，可以自知道或者应当知道该行政行为之日起60日内提出行政复议申请；但是法律规定的申请期限超过60日的除外。
复议前置有下列情形之一的，申请人应当先向行政复议机关申请行政复议，对行政复议决定不服的，可以再依法向人民法院提起行政诉讼：
(1) 对当场作出的行政处罚决定不服；
(2) 对行政机关作出的侵犯其已经依法取得的自然资源的所有权或者使用权的决定不服；
(3) 认为行政机关存在本法第十一条规定的未履行法定职责情形；（不作为）
(4)申请政府信息公开，行政机关不予公开；
(5)法律、行政法规规定应当先向行政复议机关申请行政复议的其他情形。
普通程序之听证制度
(1)审理重大、疑难、复杂的行政复议案件，行政复议机构应当组织听证。行政复议机构认为有必要听证，或者申请人请求听证的，行政复议机构可以组织听证。 (2)
听证由一名行政复议人员任主持人，两名以上行政复议人员任听证员，一名记录员制作听证笔录。
（3)行政复议机构组织听证的，应当于举行听证的五日前将听证的时间、地点和拟听证事项书面通知当事人。
（4)申请人尤正当理由拒不参加听证的，视为放弃听证权利。
(5)被申请人的负责人应当参加听证。不能参加的，应当说明理由并委托相应的工作人员参加听证。
(6)经过听证的行政复议案件，行政复议机关应当根据听证笔录、审查认定的事实和证据，依照本法作出行政复议决定。
简易程序行政复议机关审理下列行政复议案件，认为事实清楚、权利义务关系明确、争议不大的，可以适用简易程序：
(l)被申请行政复议的行政行为是当场作出；
(2)被申请行政复议的行政行为是警告或者通报批评；
(3)案件涉及款额三千元以下；
(4)属于政府信息公开案件。
除前款规定以外的行政复议案件，当事人各方同意适用简易程序的，可以适用简易程序。`},{id:"k_0100",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"五、行政诉讼",title:"行政法 • 行政诉讼",content:`【概念】行政诉讼是指公民、法人或其他组织认为行政主体作出的行政行为侵犯其合法权益，依法向人民法院提起诉讼，由人民法院对被诉行政行为进行审理并作出裁判的诉讼活动。
管辖级别管辖基层法院原则上由基层法院管辖一审行政诉讼。
中级法院
l．对国务院部门或者县级以上地方人民政府所作的行政行为提起诉讼的案件。`},{id:"k_0101",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"五、行政诉讼",title:"行政诉讼法 • 中级人民法院的一审管辖范围",content:"3. 本辖区内重大、复杂的案件。"},{id:"k_0102",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"五、行政诉讼",title:"行政诉讼法 • 基层人民法院与中级法院管辖分工",content:`4. 其他法律规定由中级人民法院管辖的案件。
高级法院管辖区内重大复杂的案件。
最高法院全国范围内重大复杂案件。
地域管辖一般规定原告就被告，由最初作出具体行为的行政机关所在地的人民法院管辖。
经复议案件：可以由最初作出行政行为的机关所在地法院管辖，也可以由复议机关所在地人民法院管辖。
特殊地域管辖涉及不动产：因不动产提起诉讼的由不动产所在地人民法院管辖。
对限制人身自由的行政强制措施不服提起诉讼由被告所在地或原告所在地（包括原告户籍地、经常居住地和被限制人身自由地）人民法院管辖。
选择管辖：两个以上人民法院都有管辖权的案件，原告可以选择其中一个人民法院提起诉讼。原告向两个以上有管辖权的人民法院提起诉讼的，由最先立案的人民法院管辖。
举证责任被告对作出的行政行为负有举证责任，应当提供作出该行政行为的证据和所依据的规范性文件。
在诉讼过程中，被告及其诉讼代理人不得自行向原告、第三人和证人收集证据。
起诉期限复议后起诉的期限：公民、法人或者其他组织不服复议决定的，可以在收到复议决定书之日起十五日内向人民法院提起诉讼。
直接向人民法院起诉的期限：公民、法人或者其他组织直接向人民法院提起诉讼的，应当自知道或者应当知道作出行政行为之日起六个月内提出。法律另有规定的除外。
审理公开审判原则人民法院公开审理行政案件，但涉及国家秘密、个人隐私和法律另有规定的除外。涉及商业秘密的案件，当事人申请不公开审理的，可以不公开审理。
诉讼不停止行政行为执行原则诉讼不适用调解原则`},{id:"k_0103",chapter:"第一章 法律常识",section:"第五讲行政法",topic:"五、行政诉讼",title:"行政法 • 行政诉讼",content:`2. [ 2025年．国考］下列情形不在申请行政复议范围之内的是（ ）。
A. 餐馆甲因食品卫生不达标，被吊销餐饮服务许可证，甲不服`},{id:"k_0104",chapter:"第一章 法律常识",section:"第六讲公职法",topic:"一、公务员法",title:"公务员法 • 不得录用为公务员的五种法定情形",content:`【不得录用为公务员的情形】下列人员不得录用为公务员：
  (1) 因犯罪受过刑事处罚的；
  (2) 被开除中国共产党党籍的；
  (3) 被开除公职的；
  (4) 被依法列为失信联合惩戒对象的；
  (5) 有法律规定不得录用为公务员的其他情形的。`},{id:"k_0105",chapter:"第一章 法律常识",section:"第六讲公职法",topic:"一、公务员法",title:"公务员法 • 公务员的奖励种类与条件",content:`【奖励种类】由低到高依次为：嘉奖、记三等功、记二等功、记一等功、授予称号。
【奖励原则】坚持精神奖励与物质奖励相结合、以精神奖励为主的原则。`},{id:"k_0106",chapter:"第一章 法律常识",section:"第六讲公职法",topic:"一、公务员法",title:"公务员法 • 公务员的奖励种类与撤销情形",content:`2. 对受奖励的公务员或者公务员集体予以表彰，并对受奖励的个人给予一次性奖金或者其他待遇。
处分`},{id:"k_0107",chapter:"第一章 法律常识",section:"第六讲公职法",topic:"一、公务员法",title:"公务员法 • 公务员处分的六大种类与期限",content:`【处分种类与期间】
• 警告：6个月；
• 记过：12个月；
• 记大过：18个月；
• 降级：24个月；
• 撤职：24个月；
• 开除：终身不得再录用为公务员。
【处分期间的影响】受处分期间不得晋升职务、职级和级别；受记过、记大过、降级、撤职处分的，不得晋升工资档次。`},{id:"k_0108",chapter:"第一章 法律常识",section:"第六讲公职法",topic:"一、公务员法",title:"公务员法 • 公务员受处分期间晋升限制",content:"2. 公务员在受处分期间不得晋升职务、职级和级别，其中受记过、记大过、降级、撤职处分的，不得晋升工资档次。"},{id:"k_0109",chapter:"第一章 法律常识",section:"第六讲公职法",topic:"一、公务员法",title:"公职法 • 公务员法 • 受处分的期间为",content:`3. 受处分的期间为：警告，六个月；记过，十二个月；记大过，十八个月；降级、
撤职，二十四个月。`},{id:"k_0110",chapter:"第一章 法律常识",section:"第六讲公职法",topic:"一、公务员法",title:"公职法 • 公务员法",content:"4. 受撤职处分的，按照规定降低级别。"},{id:"k_0111",chapter:"第一章 法律常识",section:"第六讲公职法",topic:"一、公务员法",title:"公务员法 • 公务员受处分的解除与影响",content:"5. 公务员受开除以外的处分，在受处分期间有悔改表现，并且没有再发生违纪违法行为的，处分期满后自动解除。"},{id:"k_0112",chapter:"第一章 法律常识",section:"第六讲公职法",topic:"一、公务员法",title:"公职法 • 公务员法 • 解除处分后",content:`6. 解除处分后，晋升工资档次、级别和职务、职级不再受原处分的影响。但是，
解除降级、撤职处分的，不视为恢复原级别、原职务、原职级。
复核申诉公务员对涉及本人的人事处理不服的，可以自知道该人事处理之日起三十日内向原处理机关申请复核；对复核结果不服的，可以自接到复核决定之日起十五日内，
按照规定向同级公务员主管部门或者作出该人事处理的机关的上一级机关提出申诉；也可以不经复核，自知道该人事处理之日起三十日内直接提出申诉。`},{id:"k_0113",chapter:"第一章 法律常识",section:"第六讲公职法",topic:"二、公职人员政务处分法",title:"公职法 • 公职人员政务处分法",content:`处分种类与期间种类：警告、记过、记大过、降级、撤职、开除。
政务处分的期间为：警告，六个月；记过，十二个月；记大过，十八个月；降级、
撤职，二十四个月。
复审复核公职人员对监察机关作出的涉及本人的政务处分决定不服的，可以依法向作出决定的监察机关申请复审；公职人员对复审决定仍不服的，可以向上一级监察机关申请复核。
监察机关发现本机关或者下级监察机关作出的政务处分决定确有错误的，应当及时予以纠正或者责令下级监察机关及时予以纠正。
复审、复核期间，不停止原政务处分决定的执行。
公职人员不因提出复审、复核而被加重政务处分。`},{id:"k_0114",chapter:"第一章 法律常识",section:"三、监察法",topic:"三、监察法",title:"监察法 • 通用",content:`完善监察派驻的规定，增设“再派出“制度各级监察委员会可以向本级中国共产党机关、国家机关、中国人民政治协商会议委员会机关、法律法规授权或者委托管理公共事务的组织和单位以及辖区内特定区域、国有企业、事业单位等派驻或者派出监察机构、监察专员。
经国家监察委员会批准，国家监察委员会派驻本级实行垂直管理或者双重领导并以上级单位领导为主的单位、国有企业的监察机构、监察专员，可以向驻在单位的下一级单位再派出。经国家监察委员会批准，国家监察委员会派驻监察机构、监察专员，可以向驻在单位管理领导班子的普通高等学校再派出；国家监察委员会派驻国务院国有资产监督管理机构的监察机构，可以向驻在单位管理领导班子的国有企业再派出。
监察机构、监察专员对派驻或者派出它的监察委员会或者监察机构、监察专员负责。
授予监察机关必要的监察措施强制到案监察机关根据案件情况，经依法审批，可以强制涉嫌严重职务违法或者职务犯罪的被调查人到案接受调查。
责令候查被涸查人涉嫌严重职务违法或者职务犯罪，并有下列情形之一的，经监察机关依法审批，可以对其采取责令候查措施：
（一）不具有本法第二十四条第一款所列情形的；
（二）符合留置条件，但患有严重疾病、生活不能自理的，系怀孕或者正在哺乳自己婴儿的妇女，或者生活不能自理的人的唯一扶养人；
（三）案件尚未办结，但留置期限届满或者对被留置人员不需要继续采取留置措施的；
（四）符合留置条件，但因为案件的特殊情况或者办理案件的需要，采取责令候查措施更为适宜的。
被责令候查人员应当遵守以下规定：
（一）未经监察机关批准不得离开所居住的直辖市、设区的市的城市市区或者不设区的市、县的辖区；
（二）住址、工作单位和联系方式发生变动的，在二十四小时以内向监察机关报告；
（三）在接到通知的时候及时到案接受涸查；
（四）不得以任何形式干扰证人作证；
（五）不得串供或者伪造、隐匿、毁灭证据。
被责令候查人员违反前款规定，情节严重的，可以依法予以留置。
管护对于未被留置的下列人员，监察机关发现存在逃跑、自杀等重大安全风险的，经依法审批，可以进行管护：
（一）涉嫌严重职务违法或者职务犯罪的自动投案人员；
（二）在接受谈话、函询、询问过程中，交代涉嫌严重职务违法或者职务犯罪问题的人员；
（三）在接受讯问过程中，主动交代涉嫌重大职务犯罪问题的人员。
采取管护措施后，应当立即将被管护人员送留置场所，至迟不得超过二十四小时。
配套完善新增三项监察强制措施的时限、审批程序和工作要求采取强制到案、责令候查或者管护措施，应当按照规定的权限和程序，经监察机关主要负责人批准。
强制到案持续的时间不得超过十二小时；需要采取管护或者留置措施的，强制到案持续的时间不得超过二十四小时。不得以连续强制到案的方式变相拘禁被调查人。
责令候查最长不得超过十二个月。
监察机关采取管护措施的，应当在七日以内依法作出留置或者解除管护的决定，特殊情况下可以延长一日至三日。
完善留置期限规定留置时间不得超过三个月。在特殊情况下，可以延长一次，延长时间不得超过三个月。省级以下监察机关采取留置措施的，延长留置时间应当报上一级监察机关批准。监察机关发现采取留置措施不当或者不需要继续采取留置措施的，应当及时解除或者变更为贵令候查措施。对涉嫌职务犯罪的被调查人可能判处十年有期徒刑以上刑罚，监察机关依照前款规定延长期限届满，仍不能调查终结的，经国家监察委员会批准或者决定，可以再延长二个月。
省级以上监察机关在调查期间，发现涉嫌职务犯罪的被调查人另有与留置时的罪行不同种的重大职务犯罪或者同种的影响罪名认定、量刑档次的重大职务犯罪，经国家监察委员会批准或者决定，自发现之日起依照本条第一款的规定重新计算留置时间。留置时间重新计算以一次为限。
强化监察机关自身建设特约监察员监察机关根据工作需要，可以从各方面代表中聘请特约监察员。特约监察员按照规定对监察机关及其工作人员履行职责情况实行监督。
禁闭措施监察人员涉嫌严重职务违法或者职务犯罪，为防止造成更为严重的后果或者恶劣影响，监察机关经依法审批，可以对其采取禁闭措施。禁闭的期限不得超过七日。
被禁闭人员应当配合监察机关调查。监察机关经涸查发现被禁闭人员符合管护或者留置条件的，可以对其采取管护或者留置措施。`},{id:"k_0115",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 通用",content:`一、治安管理处罚法(2026.1.1起施行）［修】
行政处罚VS治安管理处罚行政处罚治安管理处罚联系治安管理处罚是行政处罚的一个类型。治安管理处罚法为特殊法，行政处罚法属于一般法。
实施机关行政主体。`},{id:"k_0116",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法",content:"2. 派出所（限警告，1000元以下罚款）。"},{id:"k_0117",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"罚款、没收违法所得、没收非法财物",content:"2. 罚款、没收违法所得、没收非法财物。"},{id:"k_0118",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法",content:"3. 暂扣许可证件、降低资质等级、吊销许可证件。"},{id:"k_0119",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"行政法 • 限制开展生产经营与停产停业处罚",content:"4. 限制开展生产经营活动、责令停产停"},{id:"k_0120",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法",content:"3. 行政拘留（并罚不超20天）。"},{id:"k_0121",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法",content:`4. 吊销公安机关发放的许可证件。
业、责令关闭、限制从业。
5．行政拘留（并罚不超20天）。
对外国人，适用限期出境或者驱逐出境。
(4个主罚＋1个附加罚：驱逐）
简易程序对公民200元以下罚款，对法人或其他组织3000元以下罚款与警告。
警告与500元以下罚款（当场作出）。
公安机关作出吊销许可证件，处4000元较大数额的罚款、没收较大数额违法所以上罚款的治安管理处罚决定或者采取听证得、没收较大价值非法财物；降低资质责令停业整顿措施前，应当告知违反治安程序等级、吊销许可证；责令停产停业、责管理行为人有权要求举行听证；违反治安令关闭、限制从业；其他较重＋依申请。
管理行为人要求听证的，公安机关应当及时依法举行听证。
对可能执行行政拘留的未成年人，公安机关应当告知未成年人和其监护人有权要求举行听证；未成年人和其监护人要求听证的，公安机关应当及时依法举行听证。
对未成年人案件的听证不公开举行。
前两款规定以外的案情复杂或者具有重大社会影响的案件，违反治安管理行为人要求听证，公安机关认为必要的，应当及时依法举行听证。
办理时限立案之日起90天内作出处罚决定。
自立案之日起不得超过3O H；案情重大、
复杂的，经上一级公安机关批准，可以延长30日。期限延长以2次为限。
当场收缴
l．简易程序下，100元以下罚款或不当场收缴事后难以执行。
2．简易程序或普通程序下，边远、水上、交通不便地区，当事人申请。
l．被处200元以下罚款，被处罚人对罚款尤异议的；`},{id:"k_0122",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法",content:`2.在边远、水上、交通不便地区，旅客列车上或者口岸，公安机关及其人民警察依照本法的规定作出罚款决定后，被处罚人到指定的银行或者通过电子支付系统缴纳罚款确有困难，经被处罚人提出的；
3．被处罚人在当地没有固定住所，不当场收缴事后难以执行的。
其他重大亮点明确正当防卫认定，终结 ”还手即互殴＂
新法首次在治安管理领域明确规定了正当防卫的合法性，规定 ”为了免受正在进行的不法侵害而采取的制止行为，造成损害的，不属于违反治安管理行为，不受处罚”；仅当“制止行为明显超过必要限度，造成较大损害的＂才应依法处罚，但应减轻或不予处罚。
强化学生欺凌治理，构建
“公安＋学校”协同模式
l．公安介入贵任：对殴 、侮辱、恐吓等学生欺凌行为，违反治安管理的，公安机关须依法给予治安管理处罚、采取相应矫治教育等措施。
2．学校贵任强化：学校明知发生严重欺凌或侵害案件而未履行报告、处置义务的，将被责令改正并追究相关人员责任。
围绕未成年人保护，
构建“刚柔并济“体系堵住“一放了之＂ 洞，避免“一刀切“放纵恶性行为；多措并举防止侵害未成年人权益；保障未成年违法婕疑人的程序权利。`},{id:"k_0123",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 不执行拘留范围收紧",content:`1. 不执行拘留范围收紧：已满14不满16周岁、已满16不满
18周岁初次违法者不执行拘留，但情节严重、影响恶劣或已满
14不满16周岁一年内二次违法仍执行。`},{id:"k_0124",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 矫治教育",content:"2. 矫治教育：对不处罚或未执行拘留的未成年人，公安机关须依相关法律采取矫治措施。"},{id:"k_0125",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 禁止行为",content:"3. 禁止行为：组织、胁迫未成年人有偿陪侍；负有监护、看护职责的人虐待未成年人。"},{id:"k_0126",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 从处罚",content:"4. 从重处罚：制作、运输、复制、出售、出租淫秽的书刊、图片、影片、音像制品等淫秽物品或者利用信息网络、电话以及其他通讯工具传播淫秽信息，淫秽物品或者淫秽信息中涉及未成年人的，从重处罚；组织未成年人从事播放淫秽音像、进行淫秽表演、参与聚众淫乱活动的，从重处罚。"},{id:"k_0127",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 听证权利",content:`5. 听证权利：可能执行行政拘留的，公安机关应当告知未成年人和其监护人有权要求举行听证，要求听证的，公安机关应当及时依法举行听证。对未成年人案件的听证不公开举行，公安机关不得因违反治安管理行为人要求听证而加重其处罚。
新增多项违法行为，
填补数字时代监管空自
l．扰乱公共秩序类，例如：考试作弊；组织领导传销活动；有损英雄烈士名誉荣誉；抢控驾驶操纵装置干扰公共交通。
2．妨害公共安全类，例如：高空抛物（即使未造成损害，只要危害公共安全即可处罚）；无人机“黑飞”；升放携带明火的孔明灯等升空物体。`},{id:"k_0128",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 侵犯人身财产权利类，例如",content:"3. 侵犯人身财产权利类，例如：虐待被监护、看护的幼老病残人员；违反国家规定向他人提供或出售公民个人信息。"},{id:"k_0129",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 妨害社会管理类，例如",content:`4. 妨害社会管理类，例如：组织、胁迫未成年人在酒吧、歌厅等场所从事有偿陪侍；违规饲养烈性犬致人伤害。
严格规范执法程序，
给执法权戴上＂紧雒咒“
l.明确执法证件：将警察依照本法出示的证件明确为“人民警察证”。`},{id:"k_0130",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 全程录音录像",content:"2. 全程录音录像：要求询问嫌疑人、当场检查、扣押、单人执法时必须同步录音录像。"},{id:"k_0131",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"限缩单人执法",content:`3. 限缩单人执法：严格限定”一人执法”的适用情形和条件（通常限千办案场所内的低风险环节）。
建立违法记录封存制度，
助力轻微违法者回归社会违反治安管理的记录应当予以封存，不得向任何单位和个人提供或者公开，但有关国家机关为办案需要或者有关单位根据国家规定进行查询的除外。依法进行查询的单位，应当对被封存的违法记录的情况予以保密。
完善民间纠纷调解程序，
推动和解优先处罚对于因民间纠纷引起的架斗殴或者损毁他人财物等违反治安管理行为，情节较轻的，公安机关可以调解处理。
经公安机关涸解，当事人达成协议的，不予处罚。经涸解未达成协议或者达成协议后不履行的，公安机关应当依照本法的规定对违反治安管理行为作出处理，并告知当事人可以就民事争议依法向人民法院提起民事诉讼。
对属于本法规定的调解范围的治安案件，公安机关作出处理决定前，当事人自行和解或者经人民调解委员会调解达成协议并履行，书面申请经公安机关认可的，不予处罚。`},{id:"k_0132",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"环境保护法典",content:`二、环境保护法典(2026.8.15起施行）［立】
概况
l．时间：2026年3月12日，第十四届全国人民代表大会第四次会议表决通过，国家主席习近平签署第70号主席令予以公布，2026年8月15日起施行。`},{id:"k_0133",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 结构",content:"2. 结构：共5编（总则、污染防治、生态保护、绿色低碳发展、法律责任和附则），1242条。"},{id:"k_0134",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法地位",content:"3. 立法地位：我国第二部以“法典”命名的法律，也是世界上第一部以“生态环境法典”命名的法律。"},{id:"k_0135",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"废止法律",content:`4. 废止法律：法典施行之日，《环境保护法》等10部法律同时废止。（即
《环境保护法》《大气污染防治法》《水污染防治法》《海洋环境保护法》
《土壤污染防治法》《固体废物污染环境防治法》《环境噪声污染防治法》
《放射性污染防治法》《环境影响评价法》《清洁生产促进法》）`},{id:"k_0136",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"“四个首次”与法意义",content:`5. “四个首次”与立法意义：（l）首次以“生态环境法典”命名，是世界首部；（2）首次将
“绿色低碳发展“独立成编，为全球首创； (3)
首次以法律形式确立全国生态日(8月 15
日）；（4)首次以法律形式界定光污染`},{id:"k_0137",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 国家基本国策",content:`3.国家基本国策节约资源和保护生态环境是国家的基本国策。国家采取有利于保护生态环境、促进人与自然和谐共生的经济、技术等政策措施，统筹产业结构调整、
污染防治、生态保护、应对气候变化，协同推进降碳、减污、扩绿、增长，推进生态优先、节约集约和绿色低碳发展。`},{id:"k_0138",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 大基本原则",content:"4. 六大基本原则生态环境保护坚持预防为主、系统治理、生态优先、绿色发展、公众参与、损害担贵的原则。"},{id:"k_0139",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 全民义务",content:"5. 全民义务：任何单位和个人都有保护生态环境的义务。"},{id:"k_0140",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 排污许可核心制度",content:`1. 排污许可核心制度国家建立健全以排污许可制为核心的固定污染源监督管理制度。
该编涵盖9个分编，覆盖了大气、水、海洋、土壤、固体废物、噪声、放射性、化学物质、电磁辐射和光污染等全领域污染防治。其中新增了三个重要章节：化学物质污染风险管控、电磁辐射污染防治和光污染防治填补了此前法律空白。`},{id:"k_0141",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"光污染定义（首次法律界定）",content:`2. 光污染定义（首次法律界定）
本法所称光污染，是指过度、不恰当使用人工照明或者不恰当改变日光的照射条件，造成周围生活环境中人的视觉受到干扰的现象。`},{id:"k_0142",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 噪声污染定义革",content:`3. 噪声污染定义革新噪声污染，是指超过噪声排放标准或者未依法采取防控措施产生噪声，并干扰他人正常生活、工作和学习的现象。
生态保护编`},{id:"k_0143",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 山水林田湖草沙一体化",content:"1. 山水林田湖草沙一体化国家统筹考虑生态环境要素的复杂性、生态系统的完整性、自然地理单元的连续性、经济社会发展的可持续性，坚持山水林田湖草沙一体化保护和系统治理，提升生态系统多样性、稳定性、持续性，维护生态安全。"},{id:"k_0144",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 自然保护地体系",content:"2. 自然保护地体系国家建立健全以国家公园为主体的自然保护地体系，实行统一设置、分级管理、分区管控。自然保护地按生态价值和保护强度高低依次分为国家公园、自然保护区和自然公园，各类自然保护地范围不得交叉重叠。"},{id:"k_0145",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 生物遗传资源惠益分享",content:`3. 生物遗传资源惠益分享向境外提供，或者与境外机构、个人或者其设立或者实际控制的机构合作研究利用我国生物遗传资源的，应当依法取得批准，并提出公平、合理的国家共享惠益方案。
绿色低碳发展编（全球首创，
独立成编，共4
章114条）
l．碳排放双控国家实施碳排放总量和强度控制制度，基于碳达峰碳中和目标科学合理确定碳排放指标。`},{id:"k_0146",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 产品碳足迹管理",content:"2. 产品碳足迹管理国务院有关部门开展产品碳足迹管理，制定产品碳足迹核算标准和技术规范，建立产品碳足迹核算、分级管理、标识认证和信息披露制度，应对国际绿色贸易壁垒。"},{id:"k_0147",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 风光退役设备处理",content:"3. 风光退役设备处理从事风电、光伏发电建设运营的企业，应当自行或委托具备条件的企业对退役风电机组叶片、光伏组件等进行循环利用或尤害化处置，解决新能源产业”后半场”污染问题。"},{id:"k_0148",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 次性用品限制",content:`4. 一次性用品限制国家在保障产品安全和卫生的前提下，限制一次性用品的生产和销售。旅游、住宿等行业应当按照国家规定，不主动提供一次性用品。
法律责任编
l．追责期限与诉讼时效造成环境污染、生态破坏等危害后果的违法行为在五年内被发现的，应当依法给予行政处罚；其他违法行为在二年内被发现的，应当依法给予行政处罚。
提起生态环境民事诉讼的诉讼时效期间为五年。诉讼时效期间自当事人知道或者应当知道受到损害以及责任人之日起计算。`},{id:"k_0149",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 竞合从",content:"2. 竞合从重同一个违法行为违反多个生态环境法律规范应当给予罚款处罚的，按照罚款数额高的规定处罚。"},{id:"k_0150",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 从与从轻减轻情形",content:`3. 从重与从轻减轻情形
(1)实施污染环境、破坏生态等违法行为，有恶意损害生态环境、拒不改正、造成严重危害后果等法定情形的，依法从重处罚；（2）有主动消除或减轻危害后果、有效采取修复措施等情形的，依法从轻或减轻处罚；（3)违法行为轻微并及时改正，没有造成危害后果的，不予处罚。
4．按日连续处罚企业事业单位和其他生产经营者违法排放、倾倒、处置污染物等，受到罚款处罚，被责令改正的，发现其继续实施该违法行为、拒不改正或者拒绝、阻挠复查的，可以自责令改正之日的次日起，按照原罚款数额按日连续处罚。 5.民事责任优先因污染环境、破坏生态等行为应当承担民事责任、行政责任、刑事责任的，承担行政责任或者刑事责任不影响承担民事责任。财产不足以支付的，优先承担民事责任。`},{id:"k_0151",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 归贵原则",content:`6.归贵原则实施污染环境、破坏生态等违法行为的，除有证据足以证明其没有过错外，
应当承担行政责任。实施污染环境、破坏生态等行为，造成他人民事权益损害的，不论有无过错，应当承担民事责任（即无过错责任原则）。
一反不正当竞争法(2025.10.15起施行）［修】
完善规制混淆行为的情形
l．经营者不得擅自使用他人有一定影响的域名主体部分、网站名称、网页、新媒体账号名称、应用程序名称或者图标等。`},{id:"k_0152",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 擅自将他人注册商标",content:`2. 擅自将他人注册商标、未注册的驰名商标作为企业名称中的字号使用，
或者将他人商品名称、企业名称（包括简称、字号等）、注册商标、未注册的驰名商标等设置为搜索关键词，引人误认为是他人商品或者与他人存在特定联系的，属于混淆行为。`},{id:"k_0153",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法",content:`3. 经营者不得帮助他人实施混淆行为。
细化关于商业贿赂、虚假宣传、不当有奖销售和商业坻毁等不正当竞争行为的规定
l．坚持“行贿受贿一起查＂，在现行禁止实施贿赂规定的基础上，增加规定：单位和个人不得在交易活动中收受贿赂的规定。
2．将虚假宣传行为误导的对象由消费者扩展为“消费者和其他经营者”,并加强对刷单炒信行为的规制，明确不得通过“虚假评价”方式帮助他人实施虚假宣传。`},{id:"k_0154",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 有奖活动开始后",content:"3. 有奖活动开始后，经营者不得无正当理由变更所设奖的种类、兑奖条件、奖金金额或者奖品等有奖销售信息。"},{id:"k_0155",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 规定经营者不得",content:`4. 规定经营者不得”指使他人”进行商业坻毁，并将商业坻毁的对象由
“竞争对手”扩展为“其他经营者”。
完善网络不正当竞争监管制度
l．经营者不得利用数据和算法、技术、平台规则等，实施恶意交易等不正当竞争行为。`},{id:"k_0156",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 经营者不得以欺诈",content:`2. 经营者不得以欺诈、胁迫、避开或者破坏技术管理措施等不正当方式，
获取、使用其他经营者合法持有的数据，损害其他经营者的合法权益，扰乱市场竞争秩序。`},{id:"k_0157",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 经营者不得滥用平台规则",content:`3. 经营者不得滥用平台规则，直接或者指使他人对其他经营者实施虚假交易、虚假评价或者恶意退货等行为，损害其他经营者的合法权益，扰乱市场竞争秩序。
整治平台
“内卷式”竞争
l．平台经营者不得强制或者变相强制平台内经营者按照其定价规则，以低于成本的价格销售商品，扰乱市场竞争秩序。`},{id:"k_0158",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 平台经营者应当在平台服务",content:"2. 平台经营者应当在平台服务协议和交易规则中明确平台内公平竞争规则，建立不正当竞争举报投诉和纠纷处置机制，引导、规范平台内经营者依法公平竞争；发现平台内经营者实施不正当竞争行为的，应当及时依法采取必要的处置措施，保存有关记录，并按规定向平台经营者住所地县级以上人民政府监督检查部门报告。"},{id:"k_0159",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"反垄断法 • 平台经营者禁止强制“二选一”",content:`3. 平台经营者违反本法规定强制或者变相强制平台内经营者以低于成本的价格销售商品的，由监督检查部门责令停止违法行为，处五万元以上五十万元以下的罚款；情节严重的，处五十万元以上二百万元以下的罚款。
明确禁止滥用优势地位损害中小企业合法权益
l．大型企业等经营者不得滥用自身资金、技术、交易渠道、行业影响力等方面的优势地位，要求中小企业接受明显不合理的付款期限、方式、条件和违约责任等交易条件，拖欠中小企业的货物、工程、服务等账款。 2．经营者违反本法规定滥用自身优势地位的，由省级以上人民政府监督检查部门责令限期改正，逾期不改正的，处一百万元以下的罚款；情节严重的，处一百万元以上五百万元以下的罚款。
l．增加约谈制度。经营者涉娅违反本法规定的，监督检查部门可以对其有关负责人进行约谈，要求其说明情况、提出改进措施。
2．强化有关部门及人员的保密义务，规定监督检查部门及其工作人员对完善监管措施和调查过程中知悉的商业秘密、个人隐私和个人信息均依法负有保密义务。
3．将不正当竞争行为导致的民事赔偿数额的计算方式明确为”按照其因法律责任被侵权所受到的实际损失或者侵权人因侵权所获得的利益确定”。
4．规定销售本法第七条规定的违法商品的（混淆行为），依法予以处罚；
销售者不知道其销售的商品属于违法商品，能证明该商品是自己合法取得并说明提供者的，由监督检查部门责令停止销售，不予行政处罚。`},{id:"k_0160",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"村民委员会组织法",content:`四、村民委员会组织法(2026.1.1起施行）［修】
立法目的为了健全基层群众自治制度，由村民依法办理自己的事情，发展基层民主，
维护村民的合法权益，促进乡村全面振兴，推进基层治理体系和治理能力现代化。
村民委员会性质村民委员会是村民自我管理、自我服务、自我教育、自我监督的基层群众性自治组织，实行民主选举、民主协商、民主决策、民主管理、民主监督。
工作原则村民委员会工作坚持中国共产党的领导，坚持和发展全过程人民民主，坚持自治、法治、德治相结合。
党组织职责定位中国共产党在农村的基层组织，按照中国共产党章程进行工作，领导和支持村民委员会行使职权；依照宪法和法律，支持和保障村民开展自治活动、直接行使民主权利。
指导监督部门中央和地方基层群众自治指导监督部门负责指导和监督农村基层群众自治工作。
法人资格确立村民委员会具有基层群众性自治组织法人资格，村民委员会主任为法定代表人，可以从事履行职能所需民事活动，但不得提供担保。
成员构成
l．应当有妇女成员。`},{id:"k_0161",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法",content:"2. 村民委员会成员实行近亲属回避。"},{id:"k_0162",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"组织法 • 村委会主任与村党组织书记“一肩挑”",content:"3. 村民委员会主任可以由村党组织负责人通过法定程序担任。"},{id:"k_0163",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 村民委员会成员和村党组织",content:`4. 村民委员会成员和村党组织领导班子成员可以交叉任职。
下属委员会人民调解、治安保卫、公共卫生（删掉了计划生育）、人居环境、老年人和妇女儿童工作等委员会。
生态文明建设职责引导村民合理利用自然资源，保护和改善生态环境，推进美丽乡村建设。
代行农村集体经济组织职能未设立农村集体经济组织的，村民委员会、村民小组可以依法代行农村集体经济组织的职能。
宣传教育职责村民委员会应当宣传宪法、法律、法规，宣传党和国家的政策，支持和推动村民履行法律规定的义务，维护村民的合法权益，支持和引导村民践行社会主义核心价值观，铸牢中华民族共同体意识，发展文化教育，普及科技知识，促进男女平等和家庭和睦，关心关爱老年人、留守儿童、残疾人和困难村民，
增强团结互助，推进移风易俗，培育文明乡风。
协助工作职责村民委员会应当协助组织村民参与群防群治，协助处理信访事项和协调化解矛盾纠纷，协助做好社区矫正工作和刑满释放人员帮教工作，协助做好突发事件应对工作。
选举制度完善
l．村民选举委员会组成：村民会议、村民代表会议或者各村民小组会议推选产生。`},{id:"k_0164",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 选举权扩大",content:`2. 选举权扩大：
年满十八周岁的村民，不分民族、种族、性别、职业家庭出身、宗教信仰、教育程度财产状况、居住期限，都有选举权和被选举权；但是，依照法律被剥夺政治权利的人除外。
村民委员会选举前，应当对下列人员进行登记，列入参加选举的村民名单：
（一）户籍在本村并且在本村居住的村民；
（二）户籍在本村，不在本村居住，本人表示参加选举的村民；
（三）户籍不在本村，在本村居住或者从事村务工作一年以上本人申请参加选举，并且经村民会议或者村民代表会议同意参加选举的公民巳在户籍所在村或者居住村登记参加选举的村民，不得再参加其他地方村民委员会的选举。`},{id:"k_0165",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 候选人提名主体调整",content:`3. 候选人提名主体调整：由村党组织或者登记参加选举的村民提名推荐。
4．候选人资格负面清单：
(1) 被开除中国共产党党籍。
(2) 因犯罪受过刑事处罚。
(3) 利用宗族或者黑恶势力从事非法活动。
(4) 组织或者参加非法宗教活动或者邪教活动。
5．委托投票限制调整：
每一村民接受委托不得超过三人，候选人不得接受委托投票。
6．辞职：村民委员会成员可以向村民委员会提出辞职申请，其职务自村民会议或者村民代表会议审议通过之日起终止。
l．村民会议召开频次：村民会议每年至少召开一次。
2．村民会议讨论决定事项：
(1)涉及村庄规划、建设等乡村建设重要事项。
(2)本村享受误工补贴的人员及补贴标准。
(3)从村集体经济所得资金和物资的使用。
(4)本村公益事业的兴办和筹资筹劳方案及建设承包方案。
(5)本村重点帮扶人员、帮扶方案。
(6)法律、法规规定或者村民会议认为应当由村民会议讨论决定的涉及村民利益的其他事项。
民主决策`},{id:"k_0166",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 党组织前置审议",content:"【党组织前置审议】需由村民会议或者村民代表会议决定的重要事项，应当与协商先经村党组织研究讨论。"},{id:"k_0167",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 民主协商制度",content:`3.民主协商制度：
(1)协商事项：涉及村民切身利益的公共事务、公益事业以及村民反映的实际困难和矛盾纠纷。
(2) 协商形式：议事会、听证会、恳谈会等。
(3) 参与主体：村民及其他利益相关方，可邀请人民政府有关部门、乡镇政府、群团组织、人大代表、政协委员等，专业事项可邀请相关专业人员。
(4)落实机制：村民委员会应当及时组织实施或者监督落实；需要提交会议的，应当召集会议讨论决定。
村务公开与监督
l．村务公开方式：
应当设立村务公开栏，可以采用现代信息技术进行村务公开。公布期限不得少于15日。
2．村务监督委员会制度完善：
(])组织形式：村应当建立村务监督委员会或者其他形式的村务监督机构。
(2)成员要求：由村民会议或者村民代表会议推选，其中应有具备财会、管理知识的人员，村民委员会成员及其近亲属不得担任。
(3) 职责权限：负责村民民主理财，监督村务公开等制度落实，可以列席村民委员会会议和村民代表会议，参与各项协商活动。
(4) 举报机制：发现侵害群众利益等违纪违法行为，应当向乡镇政府或者县级政府和监察机关反映。
工作保障机制
l．经费保障：
(1) 日常运转经费和成员基本报酬：由县级以上政府规定标准，县级政府给予适当补助。
(2) 公益事业经费：由村民会议通过筹资筹劳解决；确有困难的，由地方政府给予适当支持。
(3) 村集体经济收入：应当适当用千村公共事务和公益事业、村委会运转保障以及误工人员补贴。
2．基层减负机制：
(1) 地方各级政府应当建立健全整治形式主义为基层减负长效机制。
(2) 有关部门委托村委会协助开展工作的事项，应当符合法律、法规规定，
所需经费由委托部门承担。
3．基础设施保障：
(])村级综合服务设施建设应当纳入相关规划，县级以上地方政府应当给予支持。
(2)县级以上地方政府应当对乡村治理信息化建设进行统筹规划和实施，
鼓励和支持村委会运用现代信息技术服务村民。`},{id:"k_0168",chapter:"第一章 法律常识",section:"第七讲新法",topic:"第七讲新法",title:"法 • 培训支持",content:`4.培训支持：
乡镇政府或县级政府应当为村委会成员及其他村务工作者提供培训，帮助其提升政治素质、法治意识、政策水平和服务能力。`},{id:"k_0169",chapter:"第一章 法律常识",section:"第七讲新法",topic:"五、增值税法(2026.1.1起施行）［立】",title:"增值税法",content:`应税交易
l．在境内发生应税交易，是指下列情形：
（一）销售货物的，货物的起运地或者所在地在境内；
（二）销售或者租赁不动产、转让自然资源使用权的，不动产、自然资源所在地在境内；
（三）销售金融商品的，金融商品在境内发行，或者销售方为境内单位和个人；
（四）除本条第二项、第三项规定外，销售服务、尤形资产的，服务、尤形资产在境内消费，或者销售方为境内单位和个人。`},{id:"k_0170",chapter:"第一章 法律常识",section:"第七讲新法",topic:"五、增值税法(2026.1.1起施行）［立】",title:"增值税法 • 有下列情形之一的",content:`2. 有下列情形之一的，视同应税交易，应当依照本法规定缴纳增值税：
（一）单位和个体工商户将自产或者委托加工的货物用千集体福利或者个人消费；
（二）单位和个体工商户无偿转让货物；
（三）单位和个人无偿转让无形资产、不动产或者金融商品。`},{id:"k_0171",chapter:"第一章 法律常识",section:"第七讲新法",topic:"五、增值税法(2026.1.1起施行）［立】",title:"法 • 增值税法 • 有下列情形之一的",content:`3. 有下列情形之一的，不属于应税交易，不征收增值税：
（一）员工为受雇单位或者雇主提供取得工资、薪金的服务；
（二）收取行政事业性收费、政府性基金；
（三）依照法律规定被征收、征用而取得补偿；
（四）取得存款利息收入。
税率`},{id:"k_0172",chapter:"第一章 法律常识",section:"第七讲新法",topic:"五、增值税法(2026.1.1起施行）［立】",title:"法 • 增值税法 • 档税率",content:"1. 四档税率：13%、9%、6%、0。（心纳税人出口货物，税率为零；国务院另有规定的除外。心境内单位和个人跨境销售国务院规定范围内的服务、无形资产，税率为零）"},{id:"k_0173",chapter:"第一章 法律常识",section:"第七讲新法",topic:"五、增值税法(2026.1.1起施行）［立】",title:"增值税法 • 适用简易计税方法计算缴纳",content:"2. 适用简易计税方法计算缴纳增值税的征收率为百分之三。"},{id:"k_0174",chapter:"第一章 法律常识",section:"第七讲新法",topic:"五、增值税法(2026.1.1起施行）［立】",title:"税法 • 增值税兼营与混合销售规定",content:`3. 纳税人发生两项以上应税交易涉及不同税率、征收率的，应当分别核算适用不同税率、征收率的销售额；未分别核算的，从高适用税率。
4．纳税人发生一项应税交易涉及两个以上税率、征收率的，按照应税交易的主要业务适用税率、征收率。
税收优惠
l．小规模纳税人发生应税交易，销售额未达到起征点的，免征增值税；达到起征点的，依照本法规定全额计算缴纳增值税。
2．下列项目免征增值税：
(1)农业生产者销售的自产农产品，农业机耕、排灌、病虫害防治、植物保护、农牧保险以及相关技术培训业务，家禽、牲畜、水生动物的配种和疾病防治； (2)医疗机构提供的医疗服务；
(3)古旧图书，自然人销售的自己使用过的物品；
(4)直接用于科学研究、科学试验和教学的进口仪器、设备；
(5)外国政府、国际组织无偿援助的进口物资和设备；
(6)由残疾人的组织直接进口供残疾人专用的物品，残疾人个人提供的服务；
(7)托儿所、幼儿园、养老机构、残疾人服务机构提供的育养服务，婚姻介绍服务，殡葬服务；
(8)学校提供的学历教育服务，学生勤工俭学提供的服务；
(9)纪念馆、博物馆、文化馆、文物保护单位管理机构、美术馆、展览馆、书画院、
图书馆举办文化活动的门票收入，宗教场所举办文化、宗教活动的门票收入。前款规定的免税项目具体标准由国务院规定。
3．纳税人兼营增值税优惠项目的，应当单独核算增值税优惠项目的销售额；未单独核算的项目，不得享受税收优惠。`},{id:"k_0175",chapter:"第一章 法律常识",section:"第七讲新法",topic:"六、仲裁法(2026.3.1起施行）［修】",title:"仲裁法",content:`l．拓宽涉外仲裁案件范册。将现行法”涉外经济贸易、运输和海事中发生的纠纷的仲裁“修改为＂涉外经济贸易、运输、海事纠纷以及其他涉外纠纷的完善涉外仲裁＂，使更多案件能够适用“涉外仲栽的特别规定”。
2．针对涉外询事中发生的纠纷、自由贸易试验区内企业间的涉外纠纷这两类仲裁制度特定案件，明确当事人除可选择通常适用的仲裁委员会仲裁外，还可选择在境内地点、按照约定仲裁规则、由符合条件人员组成仲裁庭这一特别方式进行仲裁。
3．增设“仲裁地”制度，完善仲裁司法管辖规则。当事人可以书面约定仲裁地，并鼓励涉外仲裁当事人选择我国仲裁委员会、约定我国作为仲裁地进行仲裁。
第八十一条当事人可以书面约定仲栽地。除当事人对仲裁程序的适用法另有约定外，以仲裁地作为仲栽程序的适用法及司法管辖法院的确定依据。仲裁栽决视为在仲栽地作出。
当事人对仲栽地没有约定或者约定不明确的，根据当事人约定的仲裁规则确定仲栽地；仲栽规则没有规定的，由仲裁庭根据案件情况，按照便利争议解决的原则确定仲栽地。
第八十七条鼓励涉外仲裁当事人选择中华人民共和国（包括特别行政区）
的仲栽机构、约定中华人民共和国（包括特别行政区）作为仲栽地进行仲栽。
4．支持仲裁机构“走出去”“引进来”。
第八十六条支持仲栽机构到中华人民共和国境外设立业务机构，开展仲裁活动。
根据经济社会发展和改革开放需要，可以允许境外仲裁机构在国务院批准设立的自由贸易试验区、海南自由贸易港等区域内依照国家有关规定设立业务机构，开展涉外仲裁活动。
5．明确境外生效裁决申请承认和执行的管辖法院及对等原则。
提高仲裁公信力
l．强化仲裁活动主体的诚信义务，防范虚假仲裁。`},{id:"k_0176",chapter:"第一章 法律常识",section:"第七讲新法",topic:"六、仲裁法(2026.3.1起施行）［修】",title:"法 • 仲裁法 • 拓宽仲裁员聘任渠道",content:`2. 拓宽仲裁员聘任渠道，规范仲裁员选聘管理。
增加“曾任检察官满八年”可担任仲裁员；仲裁机构可以从具有法律、经济贸易、海事海商、科学技术等专门知识的境外人士中聘任仲裁员。
仲裁员有被开除公职、吊销律师执业证书或者被撤销高级职称等不再具备担任仲裁员条件情形的，仲裁机构应当将其除名。`},{id:"k_0177",chapter:"第一章 法律常识",section:"第七讲新法",topic:"六、仲裁法(2026.3.1起施行）［修】",title:"法 • 仲裁法 • 完善仲裁委员会设",content:"3. 完善仲裁委员会设立、变更、注销登记程序。"},{id:"k_0178",chapter:"第一章 法律常识",section:"第七讲新法",topic:"六、仲裁法(2026.3.1起施行）［修】",title:"法 • 仲裁法 • 提高仲裁委员会",content:"4. 提高仲裁委员会、仲裁员的透明度，建立信息公开和披露制度。"},{id:"k_0179",chapter:"第一章 法律常识",section:"第七讲新法",topic:"六、仲裁法(2026.3.1起施行）［修】",title:"仲裁法",content:`1.明确通过网络进行仲裁的法律效力。
第十一条仲栽活动可以通过信息网络在线进行，但当事人明确表示不同意的除外。
仲栽活动通过信息网络在线进行的，与线下仲栽活动具有同等法律效力。`},{id:"k_0180",chapter:"第一章 法律常识",section:"第七讲新法",topic:"六、仲裁法(2026.3.1起施行）［修】",title:"法 • 仲裁法 • 明确仲裁庭",content:`2.明确仲裁庭“自裁管辖权＂、缩短申请撤销裁决的时限。
推进与国际当事人对仲裁协议效力有异议的，可以请求人民法院裁定，也可以请求仲裁通行规则相委员会或者仲裁庭决定；当事人申请撤销裁决的，应当自收到裁决书之日起融通的中国三个月内提出。
特色仲裁
3．扩大仲裁协议的认定方式、增加仲栽送达制度、拓宽首席仲栽员选定方式，
实践创新充分尊重当事人意思自治。
规定一方当事人主张有仲裁协议，另一方在首次开庭前不予否认的，经仲裁庭提示并记录，视为存在仲裁协议；仲裁文件以当事人约定的合理方式送达，
没有约定或者约定不明的，按照仲裁规则规定的方式送达；增加当事人可以约定由其各自选定的仲裁员共同选定第三名仲裁员。`},{id:"k_0181",chapter:"第一章 法律常识",section:"第七讲新法",topic:"七、网络安全法(2026.1.1起施行）［修】",title:"网络安全法",content:`网络安全工作基本原则网络安全工作坚持中国共产党的领导，贯彻总体国家安全观，统筹发展和安全，推进网络强国建设。
人工智能国家支持人工智能基础理论研究和算法等关键技术研发，推进训练数据资源、算力等基础设施建设，完善人工智能伦理规范，加强风险监测评估和安全监管，促进人工智能应用和健康发展。
国家支持创新网络安全管理方式，运用人工智能等新技术，提升网络安全保护水平。
个人信息保护网络运营者处理个人信息，应当遵守本法和《中华人民共和国民法典》《中华人民共和国个人信息保护法》等法律、行政法规的规定。
处罚弹性机制违反本法规定，但具有《行政处罚法》规定的从轻、减轻或者不予处罚情形的，依照其规定从轻、减轻或者不予处罚。`},{id:"k_0182",chapter:"第一章 法律常识",section:"第七讲新法",topic:"八、食品安全法(2025.12.1起施行）［修】",title:"食品安全法",content:`重点液态食品道路散装运输
l.国家对重点液态食品道路散装运输实行许可制度，道路运输经营者应当依法取得县级以上地方人民政府食品安全监督管理部门核发的准运证。
2．许可条件：
(1) 专用运输容器：符合食品安全要求。
(2) 作业人员：具备相应资质。
(3) 管理制度：建立完善的运输管理体系。`},{id:"k_0183",chapter:"第一章 法律常识",section:"第七讲新法",topic:"八、食品安全法(2025.12.1起施行）［修】",title:"法 • 食品安全法 • 发货方查验义务",content:`3. 发货方查验义务：
应当查验承运方的准运证，核验运输容器是否符合食品安全要求。`},{id:"k_0184",chapter:"第一章 法律常识",section:"第七讲新法",topic:"八、食品安全法(2025.12.1起施行）［修】",title:"法 • 食品安全法 • 收货方查验义务",content:`4. 收货方查验义务：
应当查验承运方的准运证、运输记录，核验运输容器铅封是否完整。`},{id:"k_0185",chapter:"第一章 法律常识",section:"第七讲新法",topic:"八、食品安全法(2025.12.1起施行）［修】",title:"法 • 食品安全法 • 承运方运输规范",content:`5. 承运方运输规范：
（1)在运输容器显著位置喷涂食品专用标识。
（2）按照国家规定使用运输容器并及时清洗。
(3)严禁装运食品以外的其他物质。
6．处罚：
(1) 未按要求运输的处罚：
道路运输经营者未按要求进行重点液态食品散装运输的，悄节严重时，除吊销许可证外，还应当处5万元以上50万元以下罚款。
(2) 无证运输的处罚：
• 责令停止重点液态食品道路散装运输经营；＠没收违法所得；＠并处5万元以上50万元以下罚款。
(3) 违反查验义务和单据造假的处罚：
• 伪造、变造或使用伪造、变造的运输记录、清洗凭证；心未履行查验、核验义务。处罚标准：责令改正，给予警告；拒不改正的，处1万元以上10万元以下罚款。
婴幼儿配方食品婴幼儿配方食品监管范围在“婴幼儿配方乳粉”后增加“婴幼儿配方液态乳＂。
1超格学员专用1`},{id:"k_0186",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"旧石器时代（打制石器）",content:`1. 旧石器时代（打制石器）
人类云南元谋人（直立人）
发现地区 1 特点云南元谋县我国境内目前已知的最早人类陕西蓝田人（直立人）
陕西省蓝田县直立行走北京人（直立人）
北京周口店使用天然火，并保存火种北京山顶洞人（晚期智人）
北京周口店磨光和钻孔技术，制造出骨针，人工取火`},{id:"k_0187",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"石器时代（磨制石器）",content:`2. 新石器时代（磨制石器）
流域细分流域文化遗址发现地区年代（约）
主要特点黄河流域黄河中游仰韶文化河南三门峡距今
7000-5000年最早发现彩陶；穴居；半坡遗址是其代表。母系氏族繁荣黄河中游半坡遗址陕西西安距今约
6000年半地穴式房屋；最早种植粟（小米）；
彩陶（人面鱼纹盆）；母系氏族五谷：稻、黍、稷、麦、寂；
六畜：马、牛、羊、鸡、犬、豕黄河下游大汶口文化山东泰安距今
6500-4500年早期红陶，晚期轮制陶器、臼陶；出现私有制；开始养蚕绳丝（我国最早）；
进入父系氏族黄河下游龙山文化山东济南距今
4500-4000年黑陶文化，陶器薄如蛋壳，称＂蛋壳陶＂
长江流域长江河下游姆渡文化浙江宁波距今约
7000年最早种植水稻；使用骨耜；巢居（神卯结构干栏式建筑）
太湖流域良渚文化浙江杭州距今
5300-4300年大型水利工程（良渚古城水利系统）；
玉器（玉琼、玉璧）象征权力；已进入早期国家阶段长江上游三星堆文化四川广汉距今
4800-2600年古蜀文化，长江文明之源；青铜顶尊人像、青铜神树、黄金面具、金杖辽河流域西辽河红山文化内蒙古赤峰距今
6000-5000年大型玉龙(“中华第一玉龙”) ;`},{id:"k_0188",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"神话传说",content:`3. 神话传说三皇燧人氏（钻木取火），伏毅氏（发明八卦），神农氏（炎帝，尝百草）。
五帝黄帝（中华第一共主，轩辕氏，人文始祖）、额顼、帝咎、尧（禅让制）、舜
（禅让禹）。
仓颉根据野兽的脚印发明象形文字。
火神祝融，楚人之祖。
水神共工氏，怒庄不周山。
羲和太阳女神与制定日历的女神。
（二）奴隶封建社会时期夏朝禹／桀
l．公元前2070年，禹建夏，启继位，世袭制代替禅让制，公天下代替家天下。`},{id:"k_0189",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"通用",title:"里头（洛阳偃师）遗址是夏文化的遗存",content:"3. 二里头（洛阳偃师）遗址是夏文化的遗存。"},{id:"k_0190",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"鸣条之战商汤灭夏，夏朝灭亡",content:`4. 鸣条之战商汤灭夏，夏朝灭亡。
商朝汤（亳）／
纣王
l．伊尹辅助商汤（成汤网开一面）
2．盘庚迁殷（河南安阳）`},{id:"k_0191",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"商朝甲骨文与殷墟遗址",content:"4. 甲骨文。商朝晚期王室用于占卜的文字，是中国已知最早的成体系的文字。"},{id:"k_0192",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"通用",title:"殷墟妇好墓与西周分封制",content:`5. 殷墟遗址（河南安阳）
西周武王姬发周幽王
l．文王拘而演周易（《周易》被认为是群经之首，孔子韦编三绝）。姜尚
（姜子牙）于渭水直钩垂钓，辅佐周武王通过牧野之战灭亡商朝。`},{id:"k_0193",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"牧野之战与西周建立",content:"2. 牧野之战【商纣王高筑鹿台、暴殄天物、 牝牝鸡司晨、倒戈相向、土崩瓦解、比干（七窍之心）】"},{id:"k_0194",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西周宗法礼乐制度与周公旦",content:"3. 周公旦，周公本名姬旦，是周武王姬发的弟弟，武王建立周王朝两年病死后，周公开始辅佐周成王，平定武庚之乱。＂一沐三握发，一饭三吐哺＂。"},{id:"k_0195",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西周国人暴动与“防民之口，甚于防川”",content:"4. 周厉王（国人暴动、道路以目），“周召共和＂，此为我国历史有确切纪年的开始（公元前841年）。"},{id:"k_0196",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西周烽火戏诸侯与西周灭亡",content:"5. 周幽王（烽火戏诸侯、褒姒）"},{id:"k_0197",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西周青铜器 • 何尊（“中国”最早文字铭文）",content:`6. 何尊，是西周早期，是“中国“最早的文字记载，其中“宅兹中国”为
“中国”一词最早的文字记载，其中提到周武王在世时决定建都于洛邑，即“宅兹中国”;`},{id:"k_0198",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西周青铜器 • 毛公鼎（铭文最长的重宝）",content:`7. 毛公鼎，是西周晚期的重器，是现存青铜器铭文中最高的一篇。陕西省岐山县出土，馆藏地是台北故宫博物院。
（毛公鼎） （何尊）
东周春秋
l．周平王东迁洛邑，东周开始。
2．春秋五霸：齐桓公（尊王攘夷、葵丘会盟、长勺之战曹判论战，提出
＂一鼓作气，再而衰，三而竭＂的军事思想。）、晋文公（退避三舍、寒食节介子推）、楚庄王（问鼎中原、一呜惊人）、吴王阖闾（任用孙武、
三令五申）、越王勾践（春秋晚期最后一位霸主，卧薪尝胆，商圣范蠡，兔死狗烹／鸟尽弓藏；勾践剑）、秦穆公羊皮换贤（百里奚），
伯乐相马。
战国
l．三家分晋（赵魏韩）田氏代齐。司马光将三家分晋列为《资治通鉴》的开篇之作。`},{id:"k_0199",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"战国七雄与主要地理方位",content:"2. 战国七雄：韩赵魏楚燕齐秦"},{id:"k_0200",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"赵武灵王与胡服骑射改革",content:`3. 胡服骑射（赵武灵王：上祧下裤）
（胡服骑射）`},{id:"k_0201",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"商鞅变法核心措施与历史影响",content:"4. 商鞅变法（秦孝公，前356年，徙木立信，废井田、开肝陌、土地私有，重农抑商；奖军功；废分封、行县制，实行连坐之法）"},{id:"k_0202",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"秦相吕不韦、“奇货可居”与《吕氏春秋》",content:"5. 吕不韦“奇货可居＂，辅佐秦王政，被尊为＂仲父”，并编撰《吕氏春秋》悬赏改字，有“一字千金”之典。"},{id:"k_0203",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"秦国水利工程 • 都江堰与郑国渠",content:"6. 秦国修建都江堰与郑国渠，极大促进农业生产。"},{id:"k_0204",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"战国诸子百家争鸣与稷下学宫",content:`7. “百家争鸣＂盛况：孟子提出“民贵君轻＂，荀子主张“性恶论”并作
《劝学》，庄子有＂庄周梦蝶”之典，墨子主张“兼爱”“非攻”。 8．苏秦＂
悬梁刺股＂苦学，佩六国相印，合纵；张仪以“连横”之策破合纵；范睢远交近攻。`},{id:"k_0205",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"战国三大著名战役（桂陵、马陵、长平）",content:`9. 著名战役：桂陵之战（围魏救赵）、马陵之战（减灶计）、长平之战
（纸上谈兵）`},{id:"k_0206",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"战国四公子（孟尝君、平原君、信陵君、春申君）",content:`10. 楚考烈王：武王墩墓位千安徽省淮南市，是一处战国晚期楚国的高等级大型墓地。武王墩一号墓主人身份基本可以确认为《史记·楚世家》
记载的战国晚期楚考烈王。在位期间令孙叔敖兴建芍陂。
l．秦灭齐国，完成统一大业，秦王嬴政自称“始皇帝”。第一个统一中嬴政／
子婴（刘央集权王朝，定都咸阳。
2．确立皇帝制、三公［丞相（文）、太尉（武）、御史大夫（监察）】九卿、郡县制邦攻占咸
3．书同文（李斯发明小篆）、货币（秦半两）、度量衡（长短、体积容秦朝阳约法三章，秦朝灭亡）
积、重屋）、车同轨`},{id:"k_0207",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"秦朝水利工程 • 灵渠与秦长城",content:"4. 修筑长城，修广西灵渠，沟通长江与珠江水系。"},{id:"k_0208",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"陈胜吴广起义（大泽乡起义）与《陈涉世家》",content:'5. 陈胜昊广起义《陈涉世家》（“王侯将相，宁有种乎＂ ＂苟富贵，勿相忘”“燕雀安知鸿鹄之志哉＂）通过“鱼腹丹书” "簧火狐呜”制造舆论；巨鹿之战（项羽破签沉舟，消灭秦军主力）'},{id:"k_0209",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"楚汉相争典故与“汉初三杰”",content:`6. 楚汉相争（刘邦：十面埋伏、四面楚歌，楚河汉界·鸿沟。项羽：霸王别姬、乌江自勿0。)
l．定都长安。
2．汉初三杰：韩信膀下之辱、一饭于金、背水一战、多多益善；萧何成也萧何败也萧何，萧规曹随；张良运筹帷握
3．文（缓萦救父）景之治（黄老之术＂轻摇薄赋” ”与民休息”)
4．汉武帝：推恩令（汉景帝时期出现七国之乱，推恩令目的是削弱诸侯王势力）、堇仲舒： ＂罢黜百家，独尊儒术＂，儒家思想成为正统。北西汉刘邦
（约法三章，暗度陈仓）
／刘婴击匈奴（卫青龙城、霍去病饮马i翰海、封狼居胥、禅千姑衍），思子台。
5．张蓦通西域、丝绸之路开辟，以长安为起点，开辟陆上丝绸之路，葡萄、石榴、胡桃、胡瓜、胡蒜、胡麻、芝麻传入我国。`},{id:"k_0210",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"古代作物传入历史 • “胡”字与“番”字物种",content:`［知识链接】
带“胡＂的，多是两汉、南北朝传入中国的胡豆、胡椒、胡瓜（黄瓜）等；
带＂番＂的，多是明朝以后传入中国的美洲作物番茄、番薯等；
带”1羊＂的，多是清朝末年和民国时期传入中国洋葱、洋白菜等；`},{id:"k_0211",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西汉爱国典故 • 苏武牧羊持节不屈",content:`6. 苏武奉命出使匈奴，被扣留十九年，在北海牧羊，始终持汉节不失，
彰显民族气节。`},{id:"k_0212",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"汉宣帝设置西域都护府管辖新疆",content:"7. 设置西域都护府（汉宣帝），新新疆纳入中央管辖。"},{id:"k_0213",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西汉民族融合 • 昭君出塞（落雁·青冢）",content:"8. 昭君出塞（落雁，青冢，汉元帝）"},{id:"k_0214",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西汉励志典故 • 匡衡凿壁偷光",content:"9. 匡衡＂凿壁偷光”，勤奋苦读。"},{id:"k_0215",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西汉王莽改制（新朝）与东汉光武中兴",content:`10. 西汉后期，外戚王莽自立为帝，改国号为“新”，西汉灭亡。
东汉刘秀／
刘协
l．光武中兴（刘秀绿林赤眉起义，昆阳大战战胜新朝，25年建立东汉，
定都洛阳，史称光武中兴）`},{id:"k_0216",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"东汉名将马援 • “马革裹尸”与伏波将军",content:"2. 马援（伏波将军）：“男儿要当死千边野，以马革裹尸还葬耳，何能卧床上在儿女子手中邪？”（大丈夫应当战死沙场，用马皮裹着尸体回来下葬，怎么能躺在床上死在儿女身边呢？）"},{id:"k_0217",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"东汉末年黄巾起义与三国鼎立前奏",content:`3. 黄巾起义（张角）“苍天已死，黄天当立，岁在甲子，天下大吉”。
三国魏蜀吴
l．官渡之战（曹操VS袁绍）：火烧乌巢，以少胜多，奠定北方统一基础。`},{id:"k_0218",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"三国著名战役 • 官渡之战与赤壁之战",content:"2. 赤壁之战（孙权、刘备VS曹操）：火烧赤壁，奠定三国鼎立雏形。"},{id:"k_0219",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"三国著名战役 • 夷陵之战（猇亭之战）",content:`3. 夷陵之战（虢亭之战）（孙权VS刘备）：火烧连营，三国鼎立局面形成。
唐·刘禹锡《西塞山怀古》：王浚楼船下益州，全陵王气黯然收。于寻铁锁沉江底，一片降幡出石头。
两晋南北朝
—
l．司马炎二分归晋，定都洛阳（西晋）“王与马共天下”。`},{id:"k_0220",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西晋八王之乱、五胡乱华与“狗尾续貂”",content:`2. 贾南风专权引发“八王之乱”，司马伦“狗尾续貂＂（乱封官爵）国力大损，导致“五胡乱华”。
（五胡：匈奴、鲜卑、羌、养曷、氏）`},{id:"k_0221",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"东晋建立（司马睿与王与马共天下）",content:"3. 司马睿以建康为都，建立东晋。"},{id:"k_0222",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"东晋北伐典故 • 祖逖闻鸡起舞与刘琨枕戈待旦",content:`4. 祖逖北伐（闻鸡起舞、中流击楫）、刘琨（枕戈待旦）。
（枕戈待旦）`},{id:"k_0223",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"南北朝著名战役 • 淝水之战与谢安东山再起",content:`5. 淝水之战（安徽淮南，氐族人前秦符坚和东晋，投鞭断流，草木皆兵，
风声鹤唳）。谢安在淝水之战时“东山再起“小儿破贼，弈棋退敌。 6．车胤＂囊萤（属于化学变化）＂、孙康＂映雪（物理变化）”,皆为勤学苦读典范。`},{id:"k_0224",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"西晋文学典故 • 左思《三都赋》与洛阳纸贵",content:"7. 左思创作《三都赋》，导致“洛阳纸贵”。"},{id:"k_0225",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"南朝文学典故 • 江淹与江郎才尽",content:"8. 江淹晚年才思减退，有“江郎才尽”之说。"},{id:"k_0226",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"魏晋南北朝名人 • 陶渊明与张僧繇画龙点睛",content:"9. 陶渊明”不求甚解”（五柳先生、好读书） 张僧繇＂画龙点睛＂ （南朝画家、点睛飞龙）"},{id:"k_0227",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"南朝宋齐梁陈更替与北朝对峙",content:`10. 刘裕（自毁长城）夺权：东晋灭亡。
南朝（宋、齐、梁、陈，都在建康）；北朝（北方五少数民族政权），南北对峙。
11．北魏孝文帝改革：平城（山西大同）迁都洛阳，穿汉服、改汉姓。
隋朝杨坚／
杨广
l．开皇之治
2．隋朝开创科举制，开凿京杭大运河；三省六部制；赵州桥（李春）是世界上现存年代最久、跨度最大、保存最完整的单孔敞肩圆弧石拱桥。
（三省六部制）
唐朝李渊／
哀帝
l．贞观之治［唐太宗（李世民），玄武门之变；科举以进士和明经为主；
玄樊西行；文成公主远嫁吐蕃松赞干布·布达拉宫、天可汗、大昭寺】
2．贞观遗风（武睾—龙门石窟—卢舍那大佛，首创武举、殿试，立无字碑）`},{id:"k_0228",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"唐朝盛世 • 开元盛世、鉴真东渡与贵妃羞花",content:"3. 开元盛世［唐玄宗，鉴真六次东渡日本；杨贵妃（羞花）】"},{id:"k_0229",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"唐代文化宗师 • 画圣吴道子、药王孙思邈、茶圣陆羽、颜筋柳骨",content:`4. “画圣”吴道子、｀｀药王”孙思邈、“茶圣”陆羽、｀｀颜筋柳骨＂（颜真卿、
柳公权）等`},{id:"k_0230",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"唐朝由盛转衰转折点 • 安史之乱",content:"5. 安史之乱（由盛转衰）"},{id:"k_0231",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"唐末黄巢起义与“满城尽带黄金甲”",content:`6. 黄巢起义（冲天香阵透长安，满城尽带黄金甲）
宋朝赵匡胤／
赵昂
l．陈桥兵变：后周大将赵匡胤在陈桥驿发动兵变，“黄袍加身＂，建立宋朝，定都东京（今河南开封）。杯酒释兵权解除禁军将领兵权，加强中央集权，形成重文轻武的局面。`},{id:"k_0232",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"五代十国归宋 • 吴越钱弘俶纳土与《百家姓》",content:"2. 吴越钱弘纳土归宋，北宋《百家姓》赵钱孙李按照政治地位排序，南宋《三字经》。宋太宗：烛光斧影，雪中送炭。"},{id:"k_0233",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"北宋民族关系 • 澶渊之盟",content:"3. 澶渊之盟：辽撤兵，双方约为兄弟之国。"},{id:"k_0234",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"宋代绘画成语 • 文同与胸有成竹",content:"4. 文同擅长画竹，胸中先有成竹，典故＂胸有成竹”。"},{id:"k_0235",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"宋代理学尊师典故 • 程门立雪",content:"5. 杨时和游酢冒雪在程颐门前等待请教，留下“程门立雪＂的尊师佳话。"},{id:"k_0236",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"宋代隐逸文化 • 林逋与“梅妻鹤子”",content:"6. 隐士林逋（林和靖）隐居西湖孤山，以梅为妻，以鹤为子，称“梅妻鹤子”。"},{id:"k_0237",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"古代志向名言 • 宗悫“乘长风破万里浪”",content:"7. 宗恣(qu e）乘风破浪，少时叔父问其志，答：＂愿乘长风破万里浪。”"},{id:"k_0238",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"北宋灭亡事件 • 靖康之变",content:"8. 靖康之变：金军攻破东京，宋徽宗、宋钦宗被俘，北宋灭亡。"},{id:"k_0239",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"南宋抗金名将岳飞与“东窗事发”",content:"9. 奸臣秦桧陷害岳飞，后夫妻因害岳飞之事败露而“东窗事发”。"},{id:"k_0240",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"宋金关系和议 • 绍兴和议",content:"10. 绍兴和议：南宋向金国称臣，金朝皇帝册封宋高宗赵构为皇帝。"},{id:"k_0241",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"南宋陆秀夫崖山海战与元朝统一",content:`11. 公元1279年，南宋军队与元军在崖山进行最后决战，陆秀夫背负幼帝赵昂跳海殉国。
元朝忽必烈／
元顺帝
l．忽必烈取《易经》“大哉乾元”之意，改国号为“大元”，定都大都
（今北京）。第一个少数民族统一政权。`},{id:"k_0242",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"通用",title:"元朝天文学成就 • 郭守敬与《授时历》",content:"3. 天文学家郭守敬编订《授时历》，测定一年为365. 2425日，与现行公历基本相同但更早。"},{id:"k_0243",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"元朝管辖台湾机构 • 澎湖巡检司",content:`5. i彭湖巡检司管辖台湾。
明朝朱元璋／
崇祯帝
l．朱元璋在中央废除丞相和中书省，设锦衣卫；在地方设三司（承宣布政使司、提刑按察使司、都指挥使司）。`},{id:"k_0244",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"明成祖朱棣 • 靖难之役、迁都北京与《永乐大典》",content:"2. 明成祖朱棣发动靖难之役，迁都北京，修建紫禁城，编纂永乐大典（类书）、设内阁。"},{id:"k_0245",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"明朝对外交往 • 郑和七下西洋",content:"3. 郑和七下西洋，先后到达亚洲、非洲30多个国家和地区，最远到达红海、非洲东海岸。"},{id:"k_0246",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"明朝手工艺名品 • 仁宣之治与宣德炉",content:`4. 明宣宗朱瞻基，开创“仁宣之治“强化了东厂及宦官权力；并亲自督造仿古铜炉，即后世所称的宣德炉。
（宣德炉）`},{id:"k_0247",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"明代国家工艺 • 景泰蓝（铜胎掐丝珐琅）",content:`5. 朱瞻基之子朱祁钰在景泰年间，推动铜胎掐丝珐琅工艺的规范化生产，后世称之为景泰蓝。
（景泰蓝）`},{id:"k_0248",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"明代官窑瓷器名品 • 成化斗彩鸡缸杯",content:`6. 朱瞻基（成立西厂）之孙朱见深千成化年间，命御窑厂烧制斗彩鸡缸杯，成为明代官窑瓷器中的名品。
（斗彩鸡缸杯）`},{id:"k_0249",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"明代抗倭名将 • 戚继光与戚家军",content:"7. 戚继光抗倭，封侯非我意，但愿海波平。"},{id:"k_0250",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"明代东林书院 • “风声雨声读书声”名联",content:"8. 东林书院，“风声雨声读书声声声入耳，家事国事天下事事事关心”。"},{id:"k_0251",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"明代万历首辅张居正改革与一条鞭法",content:"9. 张居正推行“一条鞭法”等改革措施，使明朝一度出现“万历中兴”。"},{id:"k_0252",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"明末农民起义 • 李自成推翻明朝",content:`10. 1644年李自成攻破北京城，结束明朝统治。
清朝皇太极／
溥仪
l．郑成功收复台湾，驱逐荷兰军队，收复了台湾。1885年，清朝设台湾省（台中），刘铭传为台湾首任巡抚。
2．康熙平三藩、施琅收台湾。`},{id:"k_0253",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"清代专制集权顶峰 • 雍正设立军机处",content:`3. 雍正设立军机处（封建专制达到顶峰），设驻裁大臣，管理西藏事务；
摊丁入亩，改土归流。`},{id:"k_0254",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"清代边疆治理 • 乾隆设立伊犁将军",content:"4. 乾隆。设伊犁将军，管理新新疆事务。"},{id:"k_0255",chapter:"第二章 人文历史常识",section:"历史与文化精要",topic:"通用",title:"清代文化典籍 • 纪晓岚主编《四库全书》",content:`5. 纪主编《四库全书》（丛书），四库即“经史子集“四部，分指：
倘经、史书、诸子、诗文集。`},{id:"k_0256",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"二、古代经济",title:"古代经济",content:`（一）古代农业时期农具名称动力主要特点／技术进步历史意义原始社会未耜人力木质结构，“未”为手柄，＂耜”为铲头；最古老的翻土工具后世犁的始祖春秋战国枯棉人力利用杠杆原理的汲水工具降低取水劳力，
早期高效灌溉工具汉代直辕犁畜力
（二牛）
铁犁锌＋木质犁床，结构稳固但笨重，回转不便俗称“二牛抬杠＂
楼车人力／
畜力可同时完成开沟、下种、覆土三道工序现代播种机的雏形，节省人力和种子水排水力利用水力驱动皮褒，
向冶铁炉连续鼓风，
以提升炉温世界最早的鼓风机械，大幅提高冶铁效率和铁器质量，为铁农具普及奠定基础东汉／三国翻车（龙骨水车）
人力／
脚踏木板叶链构成的连续提水工具灌溉功效显著，
沿用于年（曹魏马钧改进）
唐代曲辕犁（江东犁）
畜力
（一牛）
辕山直变曲，操作灵活省力；
标志中国传统犁耕技术完全成熟筒车水力利用水流自然动力，
轮周木筒自动提水实现古代意义上的“自动化”
四大农书
(1) 《汜胜之书》：西汉，汜胜之；是我国最早的农书。
(2) 《齐民要术》：北魏，贾思腮；是我国现存最早、最完整的农书。
(3) 《王祯农书》：元代，王祯；全书首创《农器图谱》，用306幅图描绘了100多种农具。
(4) 《农政全书》：明代，徐光启；是我国农学史上最早传播西方近代科学知识的著作。
（二）古代手工业类别时间／时期代表器物／相关知识点陶器新石器时代（距今约7000-5000
年）到唐代（约公元7-8世纪）
秦始皇陵兵马桶：出土千陕西西安，数千件真人大小灰陶桶，
被誉为“世界第八大奇迹”，展现了极高的写实雕塑艺术。
唐三彩：
• 主要分布在长安和洛阳两地，洛阳出土最早、总量最大、珍品最多，故亦称“洛阳唐三彩”。
• 常见颜色：黄、白、绿、褐、青五种，以黄、白、绿为主。
• 最具代表性的造型：马和骆驼，反映唐代丝路贸易与贵族生活。
• 属于低温铅釉陶器，多用作明器（随葬品）。
瓷器商朝一东汉—北朝一唐宋一明清商朝：原始瓷器东汉：成熟青瓷北朝：成熟白瓷唐：越窑青瓷、邢窑白瓷、秘色瓷宋：定窑、汝窑、官窑、钧窑、哥窑（五大名窑）
汝窑
“五大名窑之首＂，宋徽宗最爱， “雨过天青云破处”
天青色，釉面有细碎开片， ＂蟹爪纹”, "寥若晨星”的晨星稀气泡。
官窑官府兴建，专供皇室有紫口铁足（口沿釉薄露灰紫胎，足部无釉露铁色胎）的特征。
哥窑以开片著称
“金丝铁线”，釉色多为米白、青灰。
钧窑
＂窑变“无双，入窑一色，出窑万彩
＂钧瓷无双＂， 色千变万化，如玫瑰紫、海棠红、天青、月白。常见＂ 蛹走泥纹”。
定窑以白瓷闻名，五大名窑中唯一位于江北的窑口白瓷（有“白定”之称）， 质温润如象牙。常用刻花、划花、印花装饰。芒口（镶口）。
（三）国家宝藏`},{id:"k_0257",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"二、古代经济",title:"古代经济 • 石器时代",content:`1. 新石器时代（距今约10000-4000年）
舞蹈纹彩陶盆新石器时代．马家窑文化青海同德宗日遗址／
青海省博物馆心马家窑文化特征；＠原始社会生活（乐舞、祭祀）；
• 出土地点（青海）。
神徽（良渚玉器神人兽面纹）
新石器时代．良渚文化浙江杭州良渚遗址／
浙江省博物馆心玉踪、玉钺上的神人兽面纹；＠一个神人骑着神兽，
代表权力来自上天。`},{id:"k_0258",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"二、古代经济",title:"古代经济 • 商代晚期",content:`2. 商代晚期（约公元前1300－前1046年）
后母戊鼎
（司母戊鼎）
商代晚期河南安阳殷墟武官村
／中国国家博物馆现存最重青铜器是世界上迄今考古发现最大的出土青铜器；内壁铭文”后母戊＂。
四羊方尊商代晚期湖南宁乡／
中国国家博物馆工艺特征（分铸法）；被誉为＂臻于极致的青铜典范＂。四只羊托起酒坛，羊
＝祥，寓意吉祥。
太阳神鸟金饰
（四鸟绕日）
商代晚期四川成都金沙遗址／
成都金沙遗址博物馆心金沙遗址（三星堆之后）；
• 中国文化遗产标志；
• 太阳崇拜。
嵌绿松石象牙杯商代晚期河南安阳殷墟妇好墓
／中国国家博物馆心妇好”后母辛＂ （商王武丁之妻，女将军）；
• 商代象牙雕刻与镶嵌工艺。`},{id:"k_0259",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"二、古代经济",title:"古代经济",content:`3. 西周（公元前1046－前771年）
晋侯鸟尊西周中期山西曲沃／
山西博物院鸟首象鼻造型，盖内铭文
“晋侯作向太室宝尊彝＂
（证明晋国存在）。
利熊内底铭文32字，记载甲子
（武王征商簇）
西周早期陕西西安临潼／
中国国家博物馆日清晨“武王征商”，证实
《尚书．牧誓》记载；是武王伐纣的唯一文物实证。`},{id:"k_0260",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"二、古代经济",title:"古代经济",content:`4. 春秋战国（公元前770－前221年）
越王勾践剑春秋晚期湖北江陵望山楚墓／
湖北省博物馆千年不锈，菱形暗纹，复合金属铸造；
勾践的佩剑，埋2000多年还能划破20层纸。
春秋兽形匝春秋时期出土不详（多馆藏）
• 青铜器分类（匝为水器）；
• 沃盟之礼（先秦礼仪）。
曾侯乙编钟战国早期湖北随州擂鼓墩／
湖北省博物馆
65件，音域跨五个半八度，
一钟双音；改写世界音乐史。`},{id:"k_0261",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"二、古代经济",title:"古代经济",content:`5. 秦汉（公元前221－公元220年）
素纱椰衣西汉湖南长沙马王堆汉墓
／湖南省博物馆重49克，薄如蝉翼；汉代纺织技术巅峰。
一件衣服叠起来能塞进火柴盒，比鸡蛋还轻。
金缕玉衣西汉河北满城中山靖王墓
／河北省博物馆
2498片玉片金丝编缀；中山靖王刘胜及其妻各一件；象征“玉能防腐”。
与长信宫灯同墓。
长信宫灯西汉河北满城中山靖王妻窦绾墓／
河北省博物馆宫女执灯造型，烟道设计可净化空气；被誉为“中华第一灯”。
汉代“环保吸油烟机”，宫女手臂是中空的烟道。
错金银云纹青铜犀尊西汉陕西兴平豆马村
／中国国家博物馆心错金银工艺，汉代工匠用金银丝在青铜犀牛身上
“画”出云纹，栩栩如生；
• 写实动物造型。
马踏飞燕
（铜奔马）
东汉甘肃武威雷台汉墓／
甘肃省博物馆三足腾空，一足踏飞燕，力学平衡奇迹；中国旅游标
J士止L、0
汉代织锦护臂（五星出东方利中国）
汉代新疆民丰尼雅遗址／
新疆博物馆蜀锦织就，五色丝线；铭文
“五星出东方利中国”。
6唐代(618-907年）
唐三彩载乐驼唐代陕西西安鲜千庭诲墓
／中国国家博物馆七乐桶手持胡乐，一人起舞；釉色黄、绿、自；丝路文化交融。
鉴金舞马衔杯纹银壶唐代陕西西安何家村窖藏
／陕西历史博物馆心唐代鉴金；心唐代皇帝过生日，马会跳舞、衔杯敬酒，
这件银壶记录了这一幕。
镶金兽首玛瑙杯唐代陕西西安何家村窖藏
／陕西历史博物馆缠丝玛瑙巧雕兽首，兽嘴镶金； ＂俏色”工艺；
外国酒杯的造型＋中国玉雕的技艺＝大唐海纳百川。`},{id:"k_0262",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"二、古代经济",title:"古代经济 • 宋元时期",content:`7. 宋元时期(960-1368年）
《富春山居图》
元代黄公望／
分藏浙江、台北
“画中之兰亭”;
画被烧成两截，一段在浙江，一段在台湾。
元青花萧何追韩信梅瓶元代南京市博物馆
“萧何月下追韩信＇题材；
进口“苏麻离青＂料；被誉为“青花之王”。`},{id:"k_0263",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"二、古代经济",title:"古代经济",content:`8. 明清时期（1368-1911年）
明正统铜人
（针炎铜人）
明代
（正统年间）
传世／
中国国家博物馆用于针炎教学和考试；表面刻穴位，内灌水银，扎准则水银流出。
镶宝石金冠
（翼善冠）
明代（万历）
北京定陵／
定陵博物馆细金丝编织，镶嵌宝石128
块； ＂冀善冠”为明代帝王专属；定陵是唯一被考古发掘的明代帝陵。
《永乐大典》
明代（永乐）
国家图书馆（残卷）
中国古代最大类书，22877
卷；明成祖朱棣命解缙编级；
现存仅约800余卷；中国国家图书馆收藏了224册，是全世界收藏最多的机构。
（四）古代商业`},{id:"k_0264",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"二、古代经济",title:"古代经济 • 货币演变",content:`1. 货币演变夏代中国历史上最早的货币天然海贝商朝商人善于经商，以贝为币（贝币继续使用）
秦汉
(1) 秦统一货币为秦半两钱（圆形方孔钱形制确立），标志着形状杂乱向形状统一的转变
(2) 汉武帝铸五铢钱（使用时间最长的货币之一），标志着地方铸币向中央统一铸币转变唐朝唐高祖废五铢钱，行开元通宝（开创通宝钱体系）柜坊和飞钱宋元
(1) 四川出现世界上最早的纸币 “交子”
(2) 中国称银锭为“元宝”的开始明清大明宝钞中国历史上发行时间最长、体系最完整的纸币`},{id:"k_0265",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"二、古代经济",title:"古代经济 • 商业发展",content:`2. 商业发展商朝商人善千经商，后世”商人”一词源千此秦汉
(1) 商鞅变法首倡重农抑商政策
(2) 汉武帝盐铁官营（国家垄断盐铁经营）
(3) 丝绸之路（陆上）和海上丝绸之路开辟对外贸易唐朝固定交易场所市；出现邸店（仓库＋旅店）、柜坊（早期银行雏形）
宋元
(1) 城市中坊（居住区）和市（商业区）的界限被打破，设置早市和晚市，放宽宵禁
(2) 设立市舶司管理对外贸易（相当于海关）
明清清朝闭关锁国，仅留广州一地通商（“一口通商”)`},{id:"k_0266",chapter:"第二章 人文历史常识",section:"古代科技与发明",topic:"三、古代科技",title:"古代科技",content:`（一）天文历法著作／成就时期主要贡献／知识点
《春秋》
春秋
（鲁国国史）
我国第一部编年体史书；“有星孛入北斗”是哈雷彗星在世界上的最早记录
《甘石星经》
战国世界上现存最早的天文著作之一
《太初历》
汉武帝时期中国第一部较为完整的历书，首次将二十四节气正式编入历法
《汉书》
东汉（班固）
“有黑气大如钱，居日中央“ 世界上最早的太阳黑子记录解释月食东汉（张衡）
首次科学解释月食（“月光生于日之所照，魄于日之所蔽＂）；发明水运浑天仪、地动仪；与司马相如、扬雄、班固并称“汉赋四大家”
《大衍历》
唐朝（借一行）
实测子午线长度
《授时历》
元朝（郭守敬）
我国沿用时间最长的历法，与现行公历基本相同
（二）二十四节气文献记载在《淮南子》一书中，出现了和现代完全一样的二十四节气的名称。邓平等制定的《太初历》，正式把二十四节气订于历法。
l．春季：立春、雨水、惊龄、春分、清明、谷雨 2.夏季：立夏、小满、芒种、夏至、小暑、大暑`},{id:"k_0267",chapter:"第二章 人文历史常识",section:"古代科技与发明",topic:"三、古代科技",title:"古代二十四节气 • 立秋、处暑、白露、秋分、寒露、霜降",content:"3. 秋季：立秋、处暑、白露、秋分、寒露、霜降"},{id:"k_0268",chapter:"第二章 人文历史常识",section:"古代科技与发明",topic:"三、古代科技",title:"古代二十四节气 • 立冬、小雪、大雪、冬至、小寒、大寒",content:`4. 冬季：立冬、小雪、大雪、冬至、小寒、大寒反映温度变化小暑、大暑、处暑（天气即将由热转凉）、小寒、大寒。
反映天气现象雨水、谷雨、白露、寒露、霜降、小雪、大雪。
反映物候现象惊垫（仲春时节的开始）、清明、小满、芒种。
气物候特征节气物候特征节气物候特征立春东风解冻，挚虫始振立夏缕姻鸣，吨Ji叽引出立秋凉风至，白露降雨水獭祭鱼，鸿雁来小满小麦灌浆饱满处暑鹰乃祭鸟，天地始肃惊垫雷乍响、惊百虫芒种麦有芒成熟白露鸿雁来，玄鸟归春分昼夜等分夏至白昼最长秋分昼夜等分清明桐始华，虹始见小暑温风至，蟋蟀居壁寒露鸿雁来宾，菊有黄华谷雨萍始生，鸣鸠拂羽大暑腐草为萤，土润游暑霜降乃祭兽，草木黄落立冬水始冰，地始冻小雪虹藏不见，闭塞成冬大雪鹊鸣不呜，虎始交冬至黑夜最长
（三）中国古代计时方法干支干支纪日法是商朝历法的最大成就，是世界上延续至今的最长的纪日方法，以60为最小公倍数，60年一循环，周而复始。
十天干甲乙丙丁戊已庚辛壬癸
1
2
3
4
5
6
7
8
9
l O
十二地支子
1
丑2
寅
3
卯4
辰
5
巳
6
午
7
未
8
申
9
酉10
十二生肖鼠牛虎兔龙蛇马羊猴鸡计算方法天干：年份－3，看尾数，（尾数为0即10)。
地支：（年份－3) 7 12,看余数。
如2024年，减3之后为2021,天干尾数为1,地支余数为5,则为甲辰年。
时辰古代汉族劳动人民把一昼夜划分成12时辰，每个时辰等于2小时。
23~ 1点
1 ~ 3点
3 ~ 5点
5 ~ 7点
7 ~ 9点
9 ~11点夜半鸡鸣李贺的《致酒行》：“我有迷魂招不得，雄鸡一声天下白” 毛泽东主席在
《浣溪沙·和柳亚子先生》“一唱雄鸡天下白”
平旦日出食时隅中三更四更五更子时丑时寅时卯时辰时巳时
11~13点
13~15点
15~17点
17~19点
19~21点
21~23点日中日映哺时
H入黄昏人定一更二更午时未时申时酉时戌时亥时年号汉武帝开始用年号纪年，即位那年称建元元年（公元前140年）。
庙号定义：皇帝死后被供奉在太庙中祭祀时，所追尊的名号。通常只授予有功德或值得纪念的皇帝。
、斗C]
访i亏定义：皇帝（以及诸侯、大臣等）死后，根据其生前言行和功过给予的一个总结性称号。始于西周。
特点：
分为美谥、平谥、恶谥。
l.美谥：庄、襄、武、文、宣、明、景 2.平谥：怀、悼、哀`},{id:"k_0269",chapter:"第二章 人文历史常识",section:"古代科技与发明",topic:"三、古代科技",title:"古代谥号制度 • 美谥、平谥与恶谥",content:`3.恶谥：历、灵、炀名和字
(1)用途：用千尊称他人；长辈取字、不能自取；
(2)字前家“伯仲叔季”表示排行。如仲尼。
(3)取字方法心同义反复。如诸葛亮，字孔明；屈平，字原。
• 反义相对。如韩愈，字退之；辛弃疾，字幼安。
• 意义相辅，互为补充。如赵云，字子龙；千谦，字廷益。
（四）地理水利成就时期主要贡献／知识点
《山海经》
先秦我国历史上最早的地理学著作
《尚书·禹贡》
战国大禹把中国分为九州（冀3芯青、徐、扬、荆、豫、梁、雍）
都江堰战国
（秦国）
秦国太守李冰父子修建郑国渠战国
（秦国）
韩国水工郑国主持兴建，最早在关中建设的水利工程灵渠秦朝沟通漓江与湘江，连接长江与珠江水系，被誉为世界古代水利建筑明珠
《禹贡地域图》
魏晋裴秀作，开创中国古代地图绘制学大运河隋炀帝开通；元代开通京杭大运河隋代开通，元代完成京杭大运河
《水经注》
北魏
（鄱道元）
中国古代最全面的地理学著作，“因水以证地”：以水道为纲，记录水道流域内自然地理、经济地理等内容。
《徐霞客游记》
明朝
（徐霞客）
第一部日记体游记，古今游记之最，世界上最早记述石灰岩溶（喀斯特）地貌，2011年起，每年5月19日被定为中国旅游日，因为他在《徐霞客游记》开篇《游天台山记》记录下的出发这一天，便是1613年5月19日。
《坤舆万国全图》
利玛窦与李之藻明意大利传教士利玛窦与李之藻合作刊刻，我国最早的彩绘地图。
（五）名胜古迹四大名窟敦煌莫高窟 “东方艺术明珠”“千佛洞”洛阳龙门石窟一一中国石刻艺术的最高峰大同云冈石窟中国北方早期石窟的典范天水麦积山石窟——东方雕塑陈列馆中国佛教四大名山山西五台山、浙江普陀山、四川峨眉山、安徽九华山，分别是文殊菩萨、观世音菩萨、普贤菩萨、地藏菩萨的道场。
中国古代四大书院应天书院（河南商丘）、岳麓书院（湖南长沙）、白鹿洞书院（江西庐山）、
嵩阳书院（河南登封）。
（六）城市古称长安、西京、镐京西安西北望长安，可怜无数山。（辛弃疾）
金陵、建康、建业、石头城南京山围故国周遭在，潮打石头城寂寞回。（刘禹锡）
临安、钱塘、武林杭州暖风熏得游人醉，直把杭州作汴州。（林升）
姑苏、吴郡、平江苏州姑苏城外寒山寺，夜半钟声到客船。（张继）
广陵、维扬、江都扬州故人西辞黄鹤楼，烟花三月下广陵。（李白）
大都、蓟城、幽州、北平北京念天地之悠悠，独抢然而涕下。（登幽州台歌）
锦官城、蓉城、益州成都晓看红湿处，花重锦官城。（杜甫）
彭城徐州我间彭城水，君言似曲江。（苏轼）
京口、润州镇江京口瓜洲一水间，钟山只隔数重山。（王安石）
汴梁、大梁、东京开封琪树明霞五凤楼，夷门自古帝王州。（李盼）
洛邑、神都、东都洛阳即从巴峡穿巫峡，便下襄阳向洛阳。（杜甫）
江陵、南郡荆州朝辞白帝彩云间，于里江陵一日还。（李白）
兰陵枣庄兰陵美酒郁金香，玉碗盛来唬珀光。（李白）
徽州黄山一生痴绝处，无梦到徽州。（汤显祖）
浔阳、柴桑九江浔阳江头夜送客，枫叶荻花秋瑟瑟。（白居易）
盛京、奉天沈阳晚渡盛京城，西风动客情。（近代诗词）
（七）关隘`},{id:"k_0270",chapter:"第二章 人文历史常识",section:"古代科技与发明",topic:"三、古代科技",title:"长城沿线著名关隘（山海关、嘉峪关、居庸关等）",content:`1. 属于长城沿线的关隘关隘名称地理位置历史意义相关诗文居庸关北京市昌平区明长城重要关隘，京北第一屏障居庸关上子规啼，饮马流泉落日低朱彝尊《出居庸关》
玉门关甘肃省敦煌市西北汉长城西段重要关隘，古代丝绸之路通往西域的北道门户羌笛何须怨杨柳，春风不度玉门关王之涣《凉州词二首．其一》
青海长云暗雪山，孤城遥望玉门关王昌龄《从军行七首．其四》
榆关
（山海关）
河北省秦皇岛市明长城东端起点，有“天下第一关”之称，华北与东北咽喉山一程，水一程，身向榆关那畔行，夜深千帐灯纳兰性德《长相思·山一程》
雁门关山西省忻州市代县长城重要关隘，有“天下九塞，
雁门为首”之称，中原抵御北方游牧民族的核心要塞黑云压城城欲摧，甲光向日金鳞开——李贺《雁门太守行》
嘉峪关甘肃省嘉峪关市明长城西端起点，有“天下第一雄关”之称，丝绸之路交通要冲严关百尺界天西，万里征人驻马蹄林则徐《出嘉峪关感赋四首．其一》
阳关甘肃省敦煌市西南汉长城重要关隘，古代丝绸之路西域南路门户劝君更尽一杯酒，西出阳关无故人——王维《送元二使安西》`},{id:"k_0271",chapter:"第二章 人文历史常识",section:"古代科技与发明",topic:"三、古代科技",title:"非长城沿线著名关隘（剑门关、虎牢关、函谷关等）",content:`2. 不属于长城的关隘关隘名称地理位置历史意义相关诗文潼关陕西省渭南市潼关县黄河、渭河交汇处，中原通往关中的咽喉，历代兵家必争之地峰峦如聚，波涛如怒，山河表里潼关路张养浩《山坡羊·潼关怀古》
剑门关四川省广元市剑阁县蜀道核心险关，有“一夫当关，万夫莫开”之称，入蜀咽喉剑阁睁蛛而崔鬼，一夫当关，
万夫莫开——李白《蜀道难》
函谷关河南省三门峡市灵宝市战国至秦汉关中平原东部门户，
中原与关中的战略要冲天开函谷壮关中，万古惊尘向北空胡曾《函谷关》
娄山关贵州省磋义市汇川区黔北第一险关，川黔交通要道，
红军长征重要关隘雄关漫道真如铁，而今迈步从头越毛泽东《忆秦娥·娄山关》
（八）数学成就时期主要贡献／知识点
《九九乘法歌诀》
春秋战国商高问答；完整的十进制系统
《周牌算经》
西汉记载勾股定理（毕达哥拉斯定理）
《九章算术》
西汉标志着中国古代数学形成完整体系，历朝历代教科书
《九章算术注》
东汉（刘徽）
首创割圆术，发明圆周率珠算发明东汉（刘洪）
发明珠算，被称为＂算圣”
圆周率南朝（祖冲之）
精确计算圆周率
（九）医学上古黄帝（针炎之祖）
《黄帝内经》托名黄帝。分《灵枢》《素问》。此书治疗方法多用针刺。皇甫谧（西晋）著作《针炎甲乙经》
是中国第一部针炎学的专著。
战国扁鹊
“脉学之宗”，提出望闻问切“四诊法”。典故：讳疾忌医、妙手回春。
能感受到搏动的是“动脉”。
东汉
L《黄帝内经》：奠定了我国中医理论基础张仲景（医圣）始创“坐堂医“药店称“堂”的来历；传说发明饺子；所著《伤寒杂病论》被誉为“万世宝典”;首次记录”人工呼吸＂ ；祛寒娇耳汤；（华伦与董奉、
张仲景并称为“建安三神医”)`},{id:"k_0272",chapter:"第二章 人文历史常识",section:"古代科技与发明",topic:"三、古代科技",title:"古代医学典籍 • 《神农本草经》《本草纲目》",content:`2.《神农本草经》：第一部完整的药物学著作华伦（神医）“麻沸散”是世界最早的麻药，比西方早
1600多年。元化重生，五禽戏。
唐朝唐本草——世界上最早国家颁布的药典孙思邈（药王）《于金方》全面总结历代和当时的医学成果。创立脏病、腑病分类系统。
南宋宋慈（法医之祖）
《洗冤集录》是世界上最早的法医文著。
明朝李时珍（药圣）
《本草纲目》被誉为“东方医药巨典”，被达尔文誉为
“中国古代的百科全书”。
五脏：心、肝、脾、肺、肾；
六腑：大肠、小肠、胃、胆、膀胱、三焦。
（十）四大发明造纸术甘肃天水放马滩出土的西汉绘有地图的麻纤维纸，是目前世界上所知最早的纸。
东汉宦官蔡伦于105年改进造纸术，制造植物纤维纸。
印刷术现存世界上最早的雕版印刷品是唐朝我国印制的《金刚经》。
北宋毕界利用胶泥发明活字印刷术。
指南针战国时期发明司南。宋朝发明罗盘针。指南针在宋朝航海交通上已普遍使用。
火药唐朝发明了火药，南宋时发明了“突火枪＂。元代发明金属火铣`},{id:"k_0273",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"四、古代文化",title:"古代科举制度沿革（隋创唐完宋盛明清定型）",content:`（一）选官朝代选官制度先秦世卿世禄制战国军功爵制两汉察举和征辟，孝廉、秀才（经中博士）
魏晋南北朝九品中正制（“上品无寒门、下品无士族”
隋朝隋炀帝时，始建进士科，科举制度正式形成。
唐朝唐太宗时：增加了考试科目，以进士和明经两科为主。
武则天时：首创了武举和殿试。
唐玄宗时：诗歌成为进士科考试的主要内容。
宋朝为了防止徇私作弊，设置＂锁院制”“别试”制度、“封弥”制度、｀｀昝录”
制度等。
明清
l．明清两朝科举的基本制度和考试程序大体是一致的。进士科正式考试共分院试、乡试秋闱、会试（春闱）和殿试。院试中了就是秀才，乡试考中者为 “举人”，第一名称“解元”。会试取中者为“贡士”，第一名称“会元”。殿试出榜分三甲，合称“三鼎甲＂。
一甲（共3名）：赐进士及第（状元、榜眼、探花）；
二甲（若干名）：赐进士出身（第一名称“传胪＂）；
三甲（若干名）：赐同进士出身。`},{id:"k_0274",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"四、古代文化",title:"明清科举考试层级（院试、乡试、会试、殿试）",content:"2. 明清时期的科举制度，实行八股取士，需要靠朱熹的《四书章旬集注》等内容写文章。"},{id:"k_0275",chapter:"第二章 人文历史常识",section:"古代经济与制度",topic:"赋税制度演变",title:"中国古代主要赋税制度演变",content:`【初税亩】春秋·鲁国（公元前594年）：按实际耕地面积征收粮食，承认私田合法，是我国农业税“按田亩计征”的开端。
【租庸调制】隋至唐前期：租（地税，按丁交粮）+ 调（户税，交纳绢帛布匹）+ 庸（纳绢代役，保证农民生产时间）。
【两税法】唐中后期（780年，杨炎推行）：取消租庸调与杂徭，按土地资产征收地税与户税，分夏秋两季征收，开创了人头税转向财产税的先河。
【一条鞭法】明代（张居正推广）：将田赋、丁银与各项徭役合并，一律折银按亩征收，推动了赋役货币化与商品经济发展。
【摊丁入亩】清代（雍正推行）：将丁银摊入地亩一并征收（地丁银），正式彻底废除独立人头税，促进了人口统计的大幅增长。
【农业税废除】2006年（中华人民共和国）：国家宣布全面取消农业税，终结了我国延续两千多年的“田赋”历史。`},{id:"k_0276",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"诸子百家",title:"先秦诸子百家核心思想与代表人物",content:`【儒家】
• 孔子（至圣先师）：核心思想为“仁”与“礼”，主张“为政以德”、“有教无类”；编订《六经》（《诗》《书》《礼》《易》《乐》《春秋》）。
• 孟子（亚圣）：主张统治者施行“仁政”，提出“民贵君轻”的民本思想与“性善论”。
• 荀子：主张“礼法并用”、“水则载舟，水则覆舟”与“性恶论”（弟子韩非子、李斯）。
• 四书五经：南宋朱熹将《大学》《中庸》《论语》《孟子》合为“四书”；五经为《诗》《书》《礼》《易》《春秋》。
• 六艺：礼（礼仪）、乐（音乐）、射（射箭）、御（驾车）、书（书法）、数（算术）。

【道家】
• 老子（李耳）：道家创始人，《道德经》，“道法自然”、“无为而治”、“上善若水”，蕴含朴素辩证法。
• 庄子：“齐物论”、“逍遥游”，主张顺应自然。

【法家】
• 韩非子：法家集大成者，主张“以法治国”、“法、术、势”相结合，建立中央集权。

【墨家】
• 墨子：“兼爱”、“非攻”、“尚贤”、“节用”、“节葬”。

【兵家】
• 孙武（兵圣）：《孙子兵法》（“知己知彼，百战不殆”）；孙膑：《孙膑兵法》（“围魏救赵”）。`},{id:"k_0277",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"文人名家",title:"苏轼生平轨迹与名作考点",content:`【青年时期（约21岁）】嘉祐二年进士及第（主考官欧阳修），才华横溢，名动京师。
【中年时期（约36岁）】历任杭州通判、密州、徐州、湖州知州；自请外放，政绩斐然。《饮湖上初晴后雨》（“欲把西湖比西子，淡妆浓抹总相宜”）、《江城子·密州出猎》（“会挽雕弓如满月，西北望，射天狼”）。
【中年转折（44岁）】乌台诗案爆发，因诗作获罪下狱，后被贬黄州。
【黄州低谷（45-49岁）】任黄州团练副使，自号“东坡居士”。创作《念奴娇·赤壁怀古》（“大江东去，浪淘尽，千古风流人物”）、《赤壁赋》、《后赤壁赋》。
【老年贬谪（59-62岁）】远贬惠州（《食荔枝》“日啖荔枝三百颗，不辞长作岭南人”），后贬绝境儋州（海南，“九死南荒吾不恨，兹游奇绝冠平生”）。
【终年（66岁）】遇赦北归，途中卒于常州。`},{id:"k_0278",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"宋词名家",title:"宋词流派、代表人物与名篇名句",content:`【豪放派】
• 苏轼：开创豪放词风，将词由“艳科”引向广阔社会生活。
• 辛弃疾：“词中之龙”，《破阵子》（“醉里挑灯看剑，梦回吹角连营”）、《永遇乐·京口北固亭怀古》（“想当年，金戈铁马，气吞万里如虎”）、《青玉案·元夕》（“众里寻他千百度，蓦然回首，那人却在，灯火阑珊处”）。

【婉约派】
• 李煜（南唐后主）：《虞美人》（“问君能有几多愁？恰似一江春水向东流”）、《浪淘沙》（“帘外雨潺潺，春意阑珊”）。
• 柳永：两宋创用词调最多，《雨霖铃》（“多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月”）、《蝶恋花》（“衣带渐宽终不悔，为伊消得人憔悴”）。
• 秦观：婉约派一代词宗，《鹊桥仙》（“金风玉露一相逢，便胜却人间无数。两情若是久长时，又岂在朝朝暮暮”）。
• 晏殊（词人宰相）：《浣溪沙》（“无可奈何花落去，似曾相识燕归来”）。
• 李清照（易安居士）：宋代婉约女词人代表，《如梦令》（“知否？知否？应是绿肥红瘦”）、《醉花阴》（“莫道不销魂，帘卷西风，人比黄花瘦”）、《声声慢》（“寻寻觅觅，冷冷清清，凄凄惨惨戚戚”）。`},{id:"k_0279",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"元曲与戏剧",title:"元曲四大家、四大悲剧与古代戏剧名作",content:`【元曲四大家】
• 关汉卿（元曲奠基人）：代表作《窦娥冤》（血溅白练、六月飞雪、亢旱三年）、《救风尘》（赵盼儿智救宋引章）。
• 马致远（“曲状元”）：代表作《汉宫秋》（王昭君和亲）、散曲《天净沙·秋思》（“枯藤老树昏鸦，小桥流水人家”被誉为“秋思之祖”）。
• 白朴：代表作《梧桐雨》（写唐玄宗与杨贵妃爱情悲剧）。
• 郑光祖：代表作《倩女离魂》（王文举与张倩女）。

【其他重要戏剧】
• 王实甫《西厢记》：张生与崔莺莺，“愿普天下有情的都成了眷属”。
• 纪君祥《赵氏孤儿》：程婴救孤，最早传入欧洲的中国戏剧。

【四大悲剧与四大喜剧】
• 四大悲剧：《窦娥冤》《梧桐雨》《汉宫秋》《赵氏孤儿》。
• 四大喜剧：《拜月亭》《西厢记》《墙头马上》《倩女离魂》。

【明清传奇戏剧】
• 汤显祖（“东方莎士比亚”）：“临川四梦”（《牡丹亭》《南柯记》《邯郸记》《紫钗记》）。《牡丹亭》杜丽娘与柳梦梅，“原来姹紫嫣红开遍”。
• 洪昇：《长生殿》（李隆基与杨玉环）。
• 孔尚任：《桃花扇》（侯方域与李香君，“借离合之情，写兴亡之感”）。`},{id:"k_0280",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"明清小说",title:"明清古典小说巅峰名著",content:`【《聊斋志异》】
• 清代蒲松龄著，中国古典文言短篇小说巅峰。
• 名家评价：郭沫若“写鬼写妖高人一等，刺贪刺虐入木三分”；老舍“鬼狐有性格，笑骂成文章”。

【《儒林外史》】
• 清代吴敬梓著，中国古代长篇讽刺小说巅峰。
• 主题：揭露科举制度的腐败和封建礼教对士人灵魂的毒害，塑造了范进、严监生等典型人物。`},{id:"k_0281",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"传统节日",title:"中国传统节日、习俗与常考名篇诗词对照",content:`【春节／元日（正月初一）】
• 核心习俗：放爆竹、贴桃符、饮屠苏酒、守岁、拜年。
• 常考诗词：王安石《元日》“爆竹声中一岁除，春风送暖入屠苏。千门万户曈曈日，总把新桃换旧符。”

【元宵节／上元节（正月十五）】
• 核心习俗：观花灯、赏月、猜灯谜、吃元宵、耍龙灯。
• 常考诗词：辛弃疾《青玉案·元夕》“东风夜放花千树，更吹落，星如雨”；欧阳修《生查子·元夕》“月上柳梢头，人约黄昏后”。

【清明节（公历4月5日前后）】
• 特殊地位：既是四大传统节日，又是二十四节气之一。
• 核心习俗：扫墓祭祖、踏青、插柳、吃青团。
• 常考诗词：杜牧《清明》“清明时节雨纷纷，路上行人欲断魂”；韩翃《寒食》“日暮汉宫传蜡烛，轻烟散入五侯家”。

【端午节（五月初五）】
• 核心习俗：吃粽子、赛龙舟、挂菖蒲艾草、佩香囊、饮雄黄酒，纪念屈原。

【七夕节（七月初七）】
• 核心习俗：乞巧、拜织女、穿针、看牛郎织女星。
• 常考诗词：秦观《鹊桥仙》“纤云弄巧，飞星传恨，银汉迢迢暗度。金风玉露一相逢，便胜却人间无数”；杜牧《秋夕》“天阶夜色凉如水，卧看牵牛织女星”。

【中秋节（八月十五）】
• 核心习俗：赏月、吃月饼、家人团圆、拜月、赏桂花。
• 常考诗词：苏轼《水调歌头》“但愿人长久，千里共婵娟”。

【重阳节（九月初九）】
• 核心习俗：登高远眺、赏菊、插茱萸、饮菊花酒、敬老。
• 常考诗词：王维《九月九日忆山东兄弟》“遥知兄弟登高处，遍插茱萸少一人”；李清照《醉花阴》“东篱把酒黄昏后，有暗香盈袖”。`},{id:"k_0282",chapter:"第二章 人文历史常识",section:"古代艺术与非遗",topic:"五、古代艺术",title:"古代中国画技法与流派分类",content:`（一）书法甲骨文：我国有文字可考的历史，从商朝开始，是中国巳发现的最早、体系较为完整的文字。我国第一部关于甲骨文的著作是刘鸭的《铁云藏龟》。
金文：铸刻在青铜器上的铭文称为金文或钟鼎文。
小篆：小篆是在秦始皇统一中国后，是我国第一次系统地将文字的书体标准化。
书法字体隶书：程邈所创，蚕头燕尾、一波三折。 隶书是使汉字走向简化、
定型化的一种字体。
楷书：汉魏之间，由隶书逐渐演变而来。 ”形体方正，笔画平直，可作楷模＂。
草书：汉代，是为了书写简便在隶书基础上演变出来的。
行书：行书是介千楷书与草书之间的一种书体。
书法家楷书鼻祖：钟繇被誉为楷书鼻祖。
楷书四大家：
唐代柳公权
《玄秘塔碑》《神策军碑》（楷书，笔力刚劲，世称“柳体”)
唐代颜真卿
《颜勤札碑》《颜氏家庙碑》《多宝塔碑》（楷书，气势雄浑，
世称＂颜体”)
唐代欧阳询
《九成宫醴泉铭》《化度寺碑》（楷书，结构险峻严谨，世称
“欧体”)
唐代赵孟
《玄妙观重修二门记》（楷书、行书皆精，风格圆润秀逸）
张旭：唐代书法家，史称“草圣”。
怀素：与张旭并称＂颠张醉素”，代表作有《自叙帖》。
王羲之：东晋书法家，被称为“书圣”，王羲之的书法被誉为＂飘若浮云，矫若惊龙”，代表作有《兰亭序》《黄庭经》《快雪时晴帖》等。
王献之：王羲之之子，有“小圣”之称，代表作有《中秋帖》。 宋四家：北宋时期四位书法家苏轼、黄庭坚、米蒂、蔡襄的合称。
行书代表作：王羲之创作了“天下第一行书”《兰亭序》，颜真卿创作了“天下第二行书”《祭侄文稿》，苏轼创作了“天下第三行书”《寒食帖》。
《三希宝帖》（王毅之《快雪时晴帖》、王献之《中秋帖》、王询《伯远帖》）欧阳询《仲尼梦奠帖》（中华第一楷书）
怀素《自叙帖》（中华第一草书）米节《蜀素帖》（中华第一美帖）
自宋朝以来“文房四宝”则特指宣笔（安徽宣城）、徽墨（安徽徽州歙县）、宣纸
（安徽宣城泾县）、歙砚（安徽徽州歙县）、祧砚（甘肃卓尼县）、端砚（广东肇庆，古称端州），元代以后湖笔（浙江湖州）渐兴。
工具书
《说文解字》，东汉许慎，我国最早字典，系统分析汉字的文字之法，剖析汉字形体构造。
《尔雅》，战国至汉代成书，世界上最早的词典。
（二）绘画`},{id:"k_0283",chapter:"第二章 人文历史常识",section:"古代艺术与非遗",topic:"五、古代艺术",title:"古代中国画六法与写意工笔概述",content:"1. 国画概述别称丹青工具毛笔、宣纸或绢画法分类工笔画、写意画绢本以绢为底，质地细腻，适合工笔重彩，唐宋多见纸本以纸为底，便于水墨晕染，元以后盛行"},{id:"k_0284",chapter:"第二章 人文历史常识",section:"古代艺术与非遗",topic:"五、古代艺术",title:"中国古代十大传世名画及作者",content:`2. 人物画代表作时代画家代表作材质地位／备注东晋顾恺之
《女史戟图》
绢本我国存世最早最完整的国画作品（唐代摹本）
东晋顾恺之
《洛神赋图》
绢本第一幅改编自文学作品的画作（被誉为“中国绘画始祖”)
唐朝周防
《簪花仕女图》
绢本仕女画代表唐朝阎立本
《历代帝王图》
绢本唐朝阎立本
《步辇图》
绢本唐朝吴道子
《送子天王图》
纸本
（摹本）
“画圣“吴带当风唐朝张萱、
周防等
《唐宫仕女图》
绢本包括张萱《虢国夫人游春图》、周防《簪花仕女图》等唐朝韩况
《五牛图》
纸本现存最早的纸本中国画南唐顾闵中
《韩熙载夜宴图》
绢本明朝仇英
《汉宫春晓图》
绢本
3山水花鸟画代表作时代画家代表作材质地位／备注隋朝展子虔
《游春图》
绢本中国现存最早山水画北宋王希孟
《千里江山图》
绢本青绿山水杰作，庐山和鄱阳湖元朝黄公望
《富春山居图》
纸本水墨山水巅峰，浙江有座山叫做“富春山”
清代郎世宁
（意大利人）
《百骏图》
绢本中西合璧画风
4．风俗画北宋张择端
《清明上河图》
描绘日常生活、社会风俗，
散点构图法绢本`},{id:"k_0285",chapter:"第二章 人文历史常识",section:"古代艺术与非遗",topic:"五、古代艺术",title:"古代书法名家与“天下三大行书”",content:`［知识链接】十大传世名画
《洛神赋图》：高古游丝（形容线条如春蚕吐丝，连绵流畅）
《步辇图》：汉藏和亲（见证唐太宗接见松赞干布使者的历史）
《唐宫仕女图》：丰肥为美（展现大唐盛世雍容华贵的审美）
《五牛图》：最古纸本（现存最古老的纸本中国画）
《韩熙载夜宴图》：连环叙事（像连环画一样通过屏风分割时空）
《于里江山图》：只此青绿（石青石绿色的极致运用）
《清明上河图》：市俗胜景（北宋汴京繁华生活的写实记录）
《富春山居图》：水墨巅峰（被誉为“画中之兰亭”，尽显笔墨神韵）
《汉宫春晓图》：重彩工笔（明代宫廷仕女画的集大成者）
《百骏图》：中西合璧（中国线条与西方光影透视的结合）
（三）戏曲概述中国五大戏剧：京剧、越剧、黄梅戏、评剧、豫剧。
京剧起源清代乾隆五十五年起，三庆、四喜、春台、和春四大徽班陆续进入北京。
行当扮演剧中人物分角色行当，是中国戏曲特有的表演体制，包括生、旦、净、丑。
l．生：扮演男性人物，分为老生、小生、武生等。
2．旦：女性角色的统称。大致划分为正旦（青衣）、花旦、武旦、老旦、彩旦等专行。
正旦：俗称“青衣＂，扮演的大多数是贤妻良母、贞节烈女之类的人物。
花旦：青年或中年女性的形象，性格活泼或泼辣放荡，常常带点喜剧色彩。
3．净：俗称“花脸＂，扮演性格、气质、相貌上有特异之点的男性角色，分为大花脸、二花脸、武二花、油花脸（俗称毛净）。
4．丑：喜剧角色，由于面部化妆用臼粉在鼻梁眼窝间勾画小块脸谱，又叫“小花脸”。
表现手法唱、念、做、打是戏曲表演中的四种艺术手段。
唱：指的是唱功；念：指的是音乐性念白；做：指的是做功；也就是表演；
打：指的是武功。
脸谱红脸忠勇侠义，多为正面角色。（关羽、姜维、常遇春）黑脸刚烈、正直、勇猛甚至鲁莽（包拯、张飞、李逵） 白色阴险奸诈，刚悛自用（曹操、赵高）
黄色凶狠残暴（宇文成都、典韦）
蓝色刚强、骁勇、有心计的人物性格（如窦尔敦）绿色顽强、暴躁的人物形象紫色一刚正威武，不媚权贵。
金脸和银脸神秘，代表神妖。
越剧简介有第二国剧之称，越剧长于抒情，以唱为主，多以“才子佳人＂题材为主。
代表曲目
《梁山伯与祝英台》被誉为＂中国的罗密欧与朱丽叶”，讲述了梁山伯与祝英台的凄美爱情故事； 《白蛇传》则演绎了白素贞与许仙的爱情传奇。
黄梅戏简介原名黄梅调、采茶戏等，起源千湖北黄梅，发展壮大于安徽安庆。
代表曲目
《天仙配》讲述七仙女与薇永的爱情故事，《夫妻双双把家还》唱段家喻户晓；还有《女驸马》等经典剧目。
评剧简介评剧流传千中国北方，清末在河北涞县一带的小曲”对口莲花落“基础上形成，先是在河北农村流行，后进入唐山，称“唐山落子”。
代表曲目
《杨三姐告状》根据真实事件改编，反映社会现实；《花为媒》讲述一段曲折的爱情故事。
豫剧简介发源于河南开封，是在河南梆子的基础上发展起来的。地方戏中拥有最大数量的专业剧团。
代表曲目
《花木兰》讲述花木兰替父从军的故事，塑造了巾闹英雄形象；《穆桂英挂帅》常香玉是豫剧大师。
昆曲简介又称昆山腔、昆腔、昆剧，发源于14世纪中国的苏州昆山，独领中国剧坛近300年，被誉为“百戏之祖”。
代表曲目
《牡丹亭》《长生殿》《桃花扇》等。
（四）音乐古琴1
与音乐`},{id:"k_0286",chapter:"第二章 人文历史常识",section:"古代艺术与非遗",topic:"五、古代艺术",title:"古代乐律学 • 五音（宫商角徵羽）与十二律",content:"1. 五音：宫（1)、商(2)、角(3)、微(5)、羽(6)。"},{id:"k_0287",chapter:"第二章 人文历史常识",section:"古代艺术与非遗",topic:"五、古代艺术",title:"明代律学先驱 • 朱载堉与十二平均律",content:`2. 十二律：明朱载 ，古代定音方法，将一个八度分为12个半音，各律从低到高依次为：黄钟、大吕、太簇、夹钟、姑洗、仲吕、昶宾、林钟、夷则、南吕、尤射、应钟。
3演奏方式：吹（笛、笙、喷呐）、拉（二胡）、弹（琵琶、筝）、 （鼓、锣、磐、梆子）。
4中国传统乐器分类：
按制作材料：金（钟、铺、饶）、石（磐）、丝（琴、瑟）、竹（箫）、抱（笙、竿）、土
（坝、伍）、革（毅、雷鼓）、木（祝、敌）。`},{id:"k_0288",chapter:"第二章 人文历史常识",section:"古代艺术与非遗",topic:"五、古代艺术",title:"中国古代四大名绣（苏绣、湘绣、粤绣、蜀绣）",content:"＇古琴最初有五根弦，象征着金、木、水、火、土。周文王增加了一根弦，武王伐纣又增添了一根弦，又称“文武七弦琴”。"},{id:"k_0289",chapter:"第二章 人文历史常识",section:"党史重大事件",topic:"六、党史大事件",title:"中国共产党创建时期与早期工人运动",content:`l．新文化运动-+中共创建(1915-1921)
考点核心内容
《新青年》
1915年9月上海创刊，原名《青年杂志》，新文化运动标志。
五四运动
1919年，导火线：巴黎和会外交失败；标志新民主主义革命开端；工人阶级第一次独立登上政治舞台。
1915年9月，陈独秀在上海创办《青年杂志》，后到北大任职，改名《新青年》，新文化运动由此发端。
胡适《文学改良刍议》；鲁迅《狂人日记》第一篇白话文小说，鲁迅先生三部小说集：《呐喊》《彷惶》《故事新编》。`},{id:"k_0290",chapter:"第二章 人文历史常识",section:"党史重大事件",topic:"六、党史大事件",title:"中共一大、二大、三大与国共第一次合作",content:`2. 中共一大一大革命时期(1921-1927)
考点核心内容中共一大
1921年7月23日，上海法租界石库门一嘉兴南湖红船精神；13名代表，50多名党员；通过第一个纲领（最高纲领）；选举陈独秀为中央局书记（李大钊、陈独秀未出席），正式宣告中国共产党的成立。
中共二大
1922年7月上海；第一部正式的党章 《中国共产党章程》；第一次提出反帝反封民主革命纲领。
中共三大
1923年6月广州；决定共产党员以个人身份加入国民党。
国民党一大
1924年1月广州；重新解释三民主义，确立联俄、联共、扶助农工三大政策；国共第一次合作正式形成。
中共四大
1925年1月；第一次提出无产阶级领导权和工农联盟问题。
中共五大
1927年4月－5月武汉；第一次设立中央监察委员会；提出民主集中制。`},{id:"k_0291",chapter:"第二章 人文历史常识",section:"党史重大事件",topic:"六、党史大事件",title:"土地革命战争三大起义（南昌、秋收、广州）",content:`3. 土地革命战争(1927-1937)
考点核心内容南昌起义
1927年8月1日，打响武装反抗国民党反动派的第一枪；党独立领导革命战争、
创建人民军队的开端。周恩来是这次起义的主要领导人之一，担任中共前敌委员会书记。
八七会议
1927年8月7日汉口；纠正陈独秀右倾；毛泽东提出“枪杆子里出政权”；总方针：土地革命和武装反抗国民党。
秋收起义
1927年9月9日；第一次打出自己的军旗；从进攻大城市转向农村。
知识链接：三次工作重心的转移第一次(1927年）：城市一农村（文家市决策，开辟农村包围城市道路）
第二次(1949年）：农村一城市（七届二中全会，准备执政全国）
第三次(1978年）：阶级斗争一经济建设（十一届三中全会，开启改革开放）
广州起义
1927年12月11日；第一次公开打出“工农红军”旗帜；建立中国第一个城市苏维埃政权。
三湾改编
1927年9月；支部建在连上，“官兵平等”，党对军队的绝对领导。
井冈山根据地
1927年10月，第一个农村革命根据地。
中共六大
1928年6-7月莫斯科（唯一一次在国外召开）。
古田会议
1929年12月；思想建党、政治建军；党对军队绝对领导。
九一八事变
1931年9月18日，中国抗日战争开端，世界反法西斯战争的开端。
中华苏维埃共和国
1931年11月瑞金，毛泽东为主席。
长征
1934年10月－1936年10月；原因：第五次反＂闱剿”失败；瑞金出发(1934.10)
—强渡湘江—遵义会议(1935.1)—四渡赤水（ 乱了敌人的＂追剿”计划）
(1935.1)—南渡乌江—抢渡金沙江（跳出了敌人包围阳）（1935.5.3-9)—抢渡大渡河(1935.5.25)—飞夺泸定桥(1935.5.29)—翻越夹金山（第一座雪山是：夹金山）—翻越六盘山（最后一座山）《清平乐．六盘山》今日长缨在手，何时缚住苍龙—吴起镇(1935.10.19)—三大主力会宁会师(1936.10)。
遵义会议
1935年1月；确立了毛泽东在党中央和红军的领导地位；党第一次独立自主运用马列主义解决中国问题；生死攸关转折点。
瓦窑堡会议
1935年12月；制定抗日民族统一战线策略方针。
西安事变
1936年12月12日，张学良、杨虎城；和平解决，由国内战争走向抗日民族战争的转折点。`},{id:"k_0292",chapter:"第二章 人文历史常识",section:"党史重大事件",topic:"六、党史大事件",title:"抗日战争重要战役（平型关、台儿庄、百团大战）",content:`4. 抗日战争（1937-1945)
考点核心内容卢沟桥事变
1937年7月7日，全国抗战开始。
洛川会议
1937年8月，开辟敌后战场，建立敌后抗日根据地；制定全面抗战路线；
通过《抗日救国十大纲领》。
平型关大捷
1937年9月25日，八路军首战大捷，打破日军不可战胜神话。
南京大屠杀
1937年12月13日；12月13日为国家公祭日。
晋察冀根据地
1938年1月，第一个抗日民主政权，第一个敌后抗日根据地。
百团大战
1940年8月－1941年1月，华北八路军，规模最大、持续时间最长。
皖南事变
1941年1月，国民党第二次反共高潮；周恩来”千古奇冤，江南一叶”。
大生产运动
1939年“自己动手”,1943年“自己动手、丰衣足食”;359旅南泥湾。
《为人民服务》
1944年9月，张思德追悼会。
中共七大
1945年4-6月延安杨家岭；确立毛泽东思想为党的指导思想并写入党章。`},{id:"k_0293",chapter:"第二章 人文历史常识",section:"党史重大事件",topic:"六、党史大事件",title:"解放战争三大战役（辽沈、淮海、平津）与渡江战役",content:`5. 解放战争（1945-1949)
考点核心内容重庆谈判
1945年8-10月，签署《双十协定》。
三大战役
1948年9月－1949年1月，辽沈、淮海（历时最长、规模最大、歼敌最多）、
平津。
七届二中全会
（西柏坡会议）
1949年3月；工作重心由乡村转到城市；两个务必：心务必使同志们继续地保持谦虚、谨慎、不骄、不躁的作风；心务必使同志们继续地保持艰苦奋斗的作风。
渡江战役
1949年4月21日；4月23日解放南京，国民党统治结束。
中国人民政治协商会议
1949年9月；《共同纲领》起临时宪法作用；选举中央人民政府；宣告新中国成立。`},{id:"k_0294",chapter:"第二章 人文历史常识",section:"党史重大事件",topic:"六、党史大事件",title:"新中国成立初期的重要历史事件与三大改造",content:`6. 新中国成立后(1949-1978)高频考点考点核心内容过渡时期总路线
1953年，“一化三改”。
和平共处五项原则
1953年12月，周恩来首次提出。
一届全国人大
1954年9月；第一部社会主义类型宪法；确立人民代表大会制度。
万隆会议
1955年，周恩来提出“求同存异”。
社会主义改造完成
1956年底，进入社会主义初级阶段。
武汉长江大桥
1957年10月，第一座公铁两用长江大桥。
第一颗原子弹爆炸
1964年10月16日。
人工合成牛胰岛素
1965年，国际首次。
第一颗氢弹
1967年6月17日。
第一颗人造卫星“东方红一号”
1970年4月24日。
恢复联合国合法席位
1971年10月25日，第26届联大。
尼克松访华
1972年2月，发表上海《联合公报》。
“三个世界”划分
1974年2月，毛泽东。`},{id:"k_0295",chapter:"第二章 人文历史常识",section:"党史重大事件",topic:"六、党史大事件",title:"十一届三中全会与改革开放伟大转折",content:`7. 改革开放新时期(1978-2012)
秦山核电站
1991年12月，第一座自行设计建造上海合作组织
2001年6月15日成立中国加入WTO
2001年11月10日，第143个成员全面取消农业税
2006年1月1日，延续2600多年“皇粮国税“终结青藏铁路
2006年7月1日，世界海拔最高、线路最长高原铁路`},{id:"k_0296",chapter:"第二章 人文历史常识",section:"党史重大事件",topic:"六、党史大事件",title:"中国特色社会主义新时代重大成就",content:`A.《布尔塞维克》是解放战争时期中国共产党创办的中央机关刊物 B.
《红旗》杂志`},{id:"k_0297",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"七、主席诗词",title:"毛泽东诗词名篇考点（《沁园春·雪》《忆秦娥·娄山关》）",content:`历史时期
／事件代表诗词创作时间
／背景高频考点与关键旬前期
《七绝．改西乡隆盛诗赠父亲》
1909年孩儿立志出乡关，学不成名誓不还。埋骨何须桑梓地，人生无处不青山！
《诗经·小雅·小弁》：“维桑与梓，必恭敬止。”
《沁园春·长沙》
1925年独立寒秋，湘江北去，橘子洲头。恰同学少年，
风华正茂。
秋收起义
＆井冈山
《西江月．井冈山》
1928年秋，黄洋界保卫战后黄洋界保卫战；井冈山斗争。
“山下旌旗在望，山头鼓角相闻。”“敌军围困万千重，我自岩然不动。＂ 描写敌强我弱、军民同心。
“黄洋界上炮声隆，报道敌军宵遁。“ 地点：
黄洋界；结果：胜利。
《清平乐．蒋桂战争》
1929年秋蒋桂战争，属1929年军阀混战，不是直接反“围剿”但为同一时期背景。
“风云突变，军阀重开战。” "洒向人间都是怨，
一枕黄粱再现。“一一讽刺国民党新军阀混战。
《渔家傲．
第一次反“围剿”胜利（龙冈大捷）。
“万木霜天红烂漫，天兵怒气冲霄汉。”“二十红军反
“围剿”
反第一次大｀｀圃剿”》
1931年春万军重入赣，风烟滚滚来天半。”“不周山下红旗乱。“ 用共工触柱典故，喻红军必胜。
《菩萨蛮．
1933年赤橙黄绿青蓝紫，谁持彩练当空舞大柏地》
《清平乐．
1934年长征前夕毛泽东在会昌的乐观情绪。
会昌》
夏，长征前夕
“东方欲晓，莫道君行早。踏遍青山人未老，风景这边独好。“ 虽受排挤仍充满信心。
长征（重中之重）
《忆秦娥．娄山关》
1935年2
月，二渡赤水后娄山关战斗地点（贵州遵义）；
“西风烈，长空雁叫霜晨月。”“雄关漫道真如铁，而今迈步从头越。“二渡赤水
《七律．长征》
1935年10
月，长征胜利在望
“金沙水拍云崖暖，大渡桥横铁索寒。“ ”更喜眠山千里雪，三军过后尽开颜。” 概括长征路线与重要战斗。
《清平乐．六盘山》
1935年10
月，长征最后一座六盘山位置（宁夏）；“不到长城非好汉＂ ；抗日目标。
“天高云淡，望断南飞雁。”“不到长城非好汉，
屈指行程二万。”“今日长缨在手，何时缚住苍龙？＂ 苍龙指日本侵略者。
《六言诗．给彭德怀同志》
1935年10
月，吴起镇战斗后吴起镇战斗；彭德怀指挥才能。
“山高路远坑深，大军纵横驰奔。”“谁敢横刀立马？唯我彭大将军。＂ 赞扬彭德怀。
1936年2
写于陕北，不是长征途中但属同一时期；评点历史人物；主旨“数风流人物，还看今朝”指无产
《沁园春．雪》
月，红军东征前阶级。
“北国风光，千里冰封，万里雪飘。”“江山如此多娇，引无数英雄竞折腰。“ 秦皇汉武、
唐宗宋祖成吉思汗。“数风流人物，还看今朝。”
抗日战争
《五律·挽戴安澜将军》
1942年戴安澜远征缅甸殉国，毛泽东挽诗。
“外侮需人御，将军赋采薇。”“师称机械化，
勇夺虎黑威。＂
《七律．人民解放军占领南京》
1949年
4月
“钟山风雨起苍黄，百万雄师过大江。”“宜将剩勇追穷寇，不可沽名学霸王。”“天若有情天亦老，人间正道是沧桑。＂
武汉长江大桥（“一五”计划成就）；预见三峡
《水调歌头．游泳》
1956年
6月工程。
”才饮长沙水，又食武昌鱼。”“一桥飞架南北，
天堑变通途。” ”更立西江石壁，截断巫山云雨，
社会主义高峡出平湖。＂
新中国消灭血吸虫病；歌颂人民。
建设
《七律二首·送瘟神》
1958年
7月
“天连五岭银锄落，地动三河铁臂摇。”“春风杨柳万千条，六亿神州尽舜尧。”“借问瘟君欲何往，纸船明烛照天烧。＂
《水涸歌头．重上井冈山》
1965年1
1965年重上井冈山，不是长征时期。
“三十八年过去，弹指一挥间。“ 965
年。
”可上九天揽月，可下五洋捉鳖。＂
志，后用千航天深潜成就。
1927到豪情壮
1超格学员专用1`},{id:"k_0298",chapter:"第二章 人文历史常识",section:"古代文学与文化",topic:"七、主席诗词",title:"毛泽东诗词名篇考点（《七律·长征》《水调歌头·重上井冈山》）",content:"安整风运动山千里雪，三军过后尽开颜"},{id:"k_0299",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"经典力学基本定律概述",content:"【牛顿第一运动定律（又称惯性定律）】任何物体在不受任何外力的作用下，总保持匀速直线运动状态或静止状态，直到有外力迫使它改变这种状态为止。"},{id:"k_0300",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"牛顿第二运动定律（加速度定律）及生活物理",content:"【牛顿第二运动定律】物体的加速度跟物体所受的合外力成正比，跟物体的质量成反比，加速度的方向跟合外力的方向相同。"},{id:"k_0301",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"牛顿第三运动定律（作用力与反作用力）",content:"【牛顿第三运动定律】两个物体之间的作用力和反作用力，总是同时在同一条直线上，大小相等，方向相反。"},{id:"k_0302",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"生活中的摩擦力与重力现象",content:`【生活应用举例】重力地球对物体的吸引力；质量越大、离地越近则重力越大；方向竖直向下苹果落地；水往低处流；跳起后落回地面。
感觉“变重”了一超重（向上加速或向下减速）感觉“变轻”了一失重（向下加速或向上减速）
重心物体重力的集中点；重心不一定在物体上（如圆环重心在圆心）
不倒翁（低重心稳定）；走钢丝演员持长杆凋节重心；卡车重物放低以降低重心质量物体所含物质的多少；不随位置、形状、状态改变宇航员在太空中质量与地面相同（只是失重）；一袋大米从超市到家质量不变（质量是对物体惯性大小的量度一惯性只跟质量有关）
压强单位面积上受到的压力；受力面积越小，压强越大；面积越大，压强越小增大压强：针尖、刀刃锋利；图钉尖很尖减小压强：坦克履带、书包宽肩带；图钉帽较大大气压空气有重量，对地面物体产生压力；海拔越高，大气压越小液体的沸点随气压增大而升高（高压锅原理）
摩擦力两接触物体相对运动（或趋势）时产生的力；影响因素：接触面粗糙度、压力大小、摩擦种类增大摩擦：鞋底花纹、汽车防滑链、体操运动员抹镁粉、刹车片减小摩擦：加润滑油、磁悬浮列车、滚珠轴承、搬运垫圆木`},{id:"k_0303",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"阿基米德浮力原理与生活应用",content:`1. 浮力浮力物体在液体或气体中受到的向上的托力。方向总是竖直向上。
阿基米德原理物体受到的浮力，等于它排开的液体或气体的重量。
浮力大小只跟液体密度和物体浸入的体积有关，跟物体的形状、质量、深度都没关系。
轮船把肚子做大，排开更多的水，就能浮起来。
潜水艇靠往肚子里灌水（变重）或排水（变轻）来上浮下潜。
热气球加热空气，空气变轻，密度小于外面的空气，就飞起来了。`},{id:"k_0304",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"液体表面张力现象与毛细现象",content:`2. 表面张力荷叶上的水珠水的表面有一种“收缩＂的力，让水尽量聚成球形。
水上行走的昆虫水面像一层有弹性的膜，能托住很轻的东西。
回形针浮在水面也是被这层“水膜＂托住的。
肥皂泡表面张力让泡泡保持球形。`},{id:"k_0305",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"杠杆原理分类（省力杠杆、费力杠杆、等臂杠杆）",content:"3. 杠杆省力杠杆动力臂长，省力但费距离开瓶器、扳手费力杠杆阻力臂长，费力但省距离手臂、慑子等臂杠杆两边一样长，不省力也不费力天平"},{id:"k_0306",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"伯努利原理（流速与压强关系）及飞行器升力",content:`4. 伯努利原理流体（空气、水）流速越快，压力越小飞机机翼（上面流速快、压力小，产生升力）；香蕉球（球旋转导致两侧流速不同，拐弯）；火车站安全线（靠近火车空气流速快，人容易被“吸“过去）；两张纸中间吹气，纸会靠拢。
5向心力向心力物体做圆周运动时，把它“拉”向圆心的那个力。不是独立存在的力，可能是摩擦力、拉力或引力提供的。
（二）声学常识`},{id:"k_0307",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"电磁波谱分类与频率波长特征",content:`【概念】定义／决定因素典型例子与易错点音调声音的高低，由声源振动的频率决定。频率高则音调高。
男女声区别、吉他调弦松紧、笛子按孔改变音涸。
响度声音的强弱（大小），由声源振动的振幅决定，也与距离声源远近有关。
用力敲鼓声大、调大音响音量。
音色声音的品质特色，由发声体本身的材料、结构等决定。
不同乐器、不同人发同一音调，我们能区分，靠的就是音色。
超声波
（频率＞20000Hz)
方向性好，穿透力强。`},{id:"k_0308",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"红外线与紫外线的医学与生活应用",content:"1. 医学：B超检查、体外碎石。"},{id:"k_0309",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"X射线与γ射线在工业探伤中的应用",content:`2. 工业：超声清洗（眼镜、零件）、无损探伤。
3军事／生活：声呐探测、倒车雷达。
频率低，波长长，传播衰减小，传播距离极远，能绕过`},{id:"k_0310",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"卫星遥感与物理监测技术",content:`1. 自然监测：预报地震、海啸、台风（这次声波
（频率<20Hz)
些灾害发生前会产生次声波）。`},{id:"k_0311",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"物理探测技术在军事侦察中的应用",content:`2.军事侦察：监测核爆炸、火箭发射。
障碍物。
3．危害：某些频率的次声波可能与人体器官共振，对人体有害。
（三）光学常识电磁波谱（按波长从长到短／频率从低到高）：
无线电波一微波一红外线一可见光一紫外线 x射线（伦琴射线）一伽马射线。
波段（能量从低到高）
典型应用与考点无线电波通信、广播、雷达。
微波微波炉加热（使水分子共振）
红外线热成像、遥控器、夜视仪。
一切有温度的物体都会辐射红外线。
可见光红、橙、黄、绿、蓝、陡、紫。红光波长最长，紫光最短。
紫外线杀菌消毒、验钞、促进维生素D合成。过量照射有害，臭氧层能吸收大部分。
X射线
（伦琴射线）
医学影像（胸透、CT)、安检。具有穿透性，穿透能力随能量升高而增强。
知识链接
MRI和B超不会产生电离辐射，对人体安全性较高。X射线和CT会产生电离辐射，但常规桧查剂量在安全范围内。
伽马射线肿瘤放疗、食品杀菌、医疗器械灭菌、天文观测。是电磁波中波长最短、频率最高、能量最大、穿透力最强的。
光的直线传播光在真空或同一均匀介质中沿直线传播；光年是光一年走的距离日食（月居中）、月食
（地居中）、影子、小孔成像（树叶缝隙圆形光斑）
无影灯、激光准直；词语：一叶障目、坐井观天、形影相随、射击瞄准、排队看齐光的反射光射到物体表面，部分光被反射回去看到不发光的物体；
平面镜成像、潜望镜、自行车尾灯；漫反射
（黑板、衣服反光条）
凸面镜（发散）：后视镜；
凹面镜（会聚）：太阳灶、车灯罩、反射式望远镜光的折射光从一种透明介质斜射入另一种时，传播方向改变水中筷子变弯、石头凹变浅、猫眼看人、放大镜、眼镜片、海市凸厮楼透镜（发散）：近视镜；
透镜（会聚）：放大镜、老花镜光的散射光偏离直线方向向四面八方传播；
波长越短越易散射天空蓝色、早晚霞光
（红光不易散射）、
雾霾天光线暗、丁达尔效应（光柱）
汽车雾灯橘红色、灯塔
／航标／信号灯红色（波长长，穿透强）
光的偏振自然光通过偏振片后，只有振动方向与偏振片偏振方向一致的光波才能透过，透过的光只沿一个特定方向振动。
立体电影光的干涉两列或两列以上的波在空间中重叠时发生叠加，形成新的波形。
彩色的肥皂泡泡光的衍射光在传播过程中，遇到障碍物或小孔时，偏离直线传播路径而绕到障碍物后面传播的现象。
光线经过不透光圆屏，在中心轴线上形成亮斑（泊松亮斑）
（四）内能常识分子动理论分子热运动：物质由大量分子构成，分子在不停地做无规则运动（扩散现象）。
实例：花香、菜香、煤把墙染黑、墨汁染色等。
热传递通过不同方式传递能量：
热传导：热量在物体内部或相互接触的物体之间，通过微观粒子（原子、分子等）的振动和碰撞，从高温处向低温处”一步一步传递＂的过程。
热辐射：任何有温度的物体都会向外发射电磁波（比如红外线），这种电磁波携带着热量，不需要介质，即使在真空中也能传播。
热对流：在流体（液体或气体）中，流体本身发生宏观的整体流动，使得高温部分和低温部分相互混合、交换位置，从而传递热量。
（五）电磁学常识电流的磁效应电磁感应发现者奥斯特（丹麦）
法拉第（英国）
核心现象电生磁：电流周围会产生磁场磁生电：变化的磁场会产生感应电流能量转化电能一磁场能（或机械能，如电磁铁吸引铁块）
机械能（或其他形式能）一电能典型应用电铃、电动机、电磁起重机、扬声器发电机、尤线充电、电磁炉知识链接：地磁地磁地核结构内核为固态（铁锦），外核为液态（铁铢）；地磁场主要源于液态外核的运动（地核发电机理论）。
产生原因地球外核中富含铁、锦的液态金属，在地球自转和热对流作用下运动，产生电流，形成磁场。
主要作用心保护大气层：偏转太阳风（高能带电粒子流），避免大气层被剥离。
• 形成极光：将带电粒子导向两极，与大气碰撞发光。
极光产生条件心高能带电粒子流（如太阳风）
• 磁场（使粒子向两极聚集）
• 大气层（粒子与大气分子碰撞发光）
生活／自然应用心指南针指向南北
• 信鸽、海龟等动物依赖地磁场导航
（六）家电电器主要原理电磁炉电磁感应（电流通过线阁产生交变磁场，使铁磁性金属锅底产生涡流而发热）
微波炉电磁波（微波）加热（使食物内水分子共振摩擦生热）
电饭赁电流热效应（底部发热盘发热）
电风扇电动机原理（通电线厮在磁场中受力转动）
空调／冰箱压缩机驱动制冷剂完成压缩一冷凝一膨胀一蒸发的热力学循环，通过室内机和室外机实现热量交换。
室内机（蒸发器、风扇等）
室外机（冷凝器、压缩机等）
液晶电视
(LCD)
液态晶体在电场作用下调制背光
OLED电视有机发光二极管（通电后有机材料自发光）
LED灯发光二极管（半导体PN结内电子与空穴复合发光）
白炽灯电流热效应（灯丝发热至白炽状态发光）
节能灯
（荧光灯）
气体放电产生紫外线＋荧光粉受激发光洗衣机
（波轮／滚筒）
洗衣机（波轮／滚筒式）通过电动机驱动内桶／波轮旋转，产生水流冲刷、摩擦或摔打作用剥离污渍；脱水时利用高速旋转产生的离心力将水分甩出。
（七）物态变化物态变化转化方向热蜕变化凝华气态转化为固态放热升华固态转化为气态吸热液化气态转化为液态放热汽化液态转化为气态吸热凝固液态转化为固态放热熔化固态转化为液态吸热`},{id:"k_0312",chapter:"第三章 科技常识",section:"物理常识",topic:"一、物理常识",title:"光学常识 • 光的直线传播、反射、折射与色散",content:"2. [ 2026年．多省公务员联考］下列与常用电器有关的说法正确的有几项？"},{id:"k_0313",chapter:"第三章 科技常识",section:"化学常识",topic:"二、化学常识",title:"化学常识 • 常见气体性质与用途（氧、氢、氮、稀有气体）",content:`（一）物质物质变化物理变化没有新物质生成滴水成冰、铁棒成针、肥皂去污、电风扇、焰色反应化学变化有新物质生成燃烧、食物腐败、花开花落混合物两种及以上纯净物混合有两种以上的分子（或原子）
空气、合金、钢铁、天然气、
牛奶、胶体纯净物单质由同种元素组成的纯净物
H2、02
化合物由不同种元素组成的纯净物
H20、CO2
氧化物两种元素组成，其中一种是氧元素
H20、CO2
无机物与有机化合物对应，通常指不含碳元素的化合物，但包括碳的氧化物、碳酸氢盐、碳酸盐、 化物等
CO、CO2、H2C03、碳酸盐有机物含碳元素的化合物（二氧化碳、一氧化碳、碳酸及其盐等除外）
有机物一定含碳，但含碳的不一定是有机物糖、酒精、甲皖、塑料、合成纤维、合成橡胶等构成物质的微粒古希腊时期，德谟克利特通过逻辑思辨提出原子论；
1803年，道尔顿通过化学反应定撮分析提出近代原子学说；
1811年，阿伏伽德罗通过气体体积关系提出分子概念；
1897年，汤姆生通过阴极射线实验发现电子；
1911年，卢瑟福通过a粒子散射实验证实原子核存在，并建立了核式原子模型。
分子保持物质化学性质的最小粒子
H20,大部分气体如CO2、有机物都是由分子构成原子化学变化中不可再分的最小粒子金属单质如Fe、稀有气体、部分非金属单质（如碳C、硫S、
硅Si)由原子直接构成
（二）空气、水和碳空气氮气空气中最多，占将近八成（体积分数），不怎么爱反应
78%
氧气占两成多（体积分数）
21%
二氧化碳会导致温室效应`},{id:"k_0314",chapter:"第三章 科技常识",section:"化学常识",topic:"二、化学常识",title:"生活化学 • 常见酸碱盐与化学安全常识",content:`0. 03%
水硬水水里钙镁太多，烧水壶容易长水垢遇到肥皂水，浮渣多，泡沫少井水、矿泉水软水水里钙镁少，洗衣服泡沫多遇到肥皂水，浮渣少，泡沫多雨水、蒸熘水、
纯净水净化方法让脏东西沉底、过滤掉、用活性炭吸走异味加杀菌剂沉淀、过滤、吸附、杀菌消毒碳单质金刚石硬得离谱，能划玻璃（自然界中最坚硬的）
钻石石黑能导电，铅笔芯就是它铅笔芯木炭、活性炭疏松多孔结构，专门”吸＂脏东西和异味冰箱除味、净水器二氧化碳
(CO2)
溶千水能溶在水里，变成碳酸（汽水就是它）
汽水冒泡干冰二氧化碳的固体叫干冰，冒白烟人工降雨、舞台烟雾一氧化碳
(CO)
基本特点无色无味，有毒，不溶于水煤气中毒的元凶为啥有毒跟血红蛋白”抢座位”，让血没法运氧气人会缺氧窒息中毒后需送医院，在高压氧舱中抢救天然气甲皖(CH4),家里烧火做饭用的沼气、天然气、可燃冰主要成分都是甲皖
（三）金属与非金属大类名称特性／要点（通俗表述）
金属之最铝地壳里含最最多的金属，到处都有钙人体里含量最多的金属，骨头牙齿全靠它铁全世界产鼠最高的金属，钢铁就是它铜人类最早使用的金属，古人先用铜后用铁银导电、导热最好的金属，但太贵不常用金延展性最好，稳定性好千淘万泄虽辛苦，吹尽黄沙始到金鸽熔点最高，特别耐热
7k＝
常温下唯一液态的金属（易挥发，别名水银，遇到硫可以变成硫化采），
零下几十度才冻住；有毒银密度最大、最重，同样大小最压手锥密度最小的金属（常见），同样大小最轻（目前新能源所用电池主要就含它，手机电池也含它）碱金属是最活泼的，所以容易发生爆炸艳最软的金属（常见），跟面团似的，小刀就能切非金属
（石油）
自称
“工业血液”
历史沈括《梦溪笔谈》最早提出“石油”一词石油加工分熘（物理变化，本质是多次蒸熘，利用沸点不同，得到不同产物）得汽油、煤油、柴油；
裂化（化学变化）提高轻质油产屋；
裂解（化学变化）得烯经、芳经；
还有石蜡、沥青。
汽油标号用辛烧值表示，标号越高抗爆性越好，但并非对所有发动机都好。
（四）酸碱盐大类名称化学式／俗名／
原料性质要点用途／生活应用酸定义由氢离子和酸根离子构成，电离时生成的阳离子全部是H+
如盐酸、硫酸、硝酸、醋酸等。
盐酸
HCl
挥发性强酸，与金属反应生成H2
除锈、制药、实验室常用酸。人体胃液中含有盐酸，可帮助消化。家居清洁（沽厕灵）
硫酸
H2S04
无色、无味、难挥发，溶千水放出大量热，强腐蚀性（不慎滴到手上，立即用大量水冲洗，再涂抹
3%~ 5％的碳酸氢钠溶液）
工业原料，实验室常用酸。浓硫酸常温下也可使铁铝钝化。浓硫酸可以做某些气体的干燥剂。
硝酸
HN03（浓／稀）
强氧化性，浓硝酸易挥发，
常下使铁、铝钝化；与金属反应一般不产生H2
可用铝、铁容器储存；王水
（浓HCl＋浓HN0,=3 : 1)
可溶解金、铅。
乙酸
（醋酸）
CH3COOH
酸性，可与碳酸盐、金属氧化物反应除铁锈、水垢；松花蛋除涩、
除鱼腥（中和甲胺）；炒菜加醋促进钙铁磷吸收、保持
VB/VC稳定；解酒（生成乙酸乙酷）；炒菜加醋／酒提香（酷化反应）
果酸多种有机酸
（水果中）
与乙醇反应生成酷类解酒碱定义由金属离子（或按根离子）
和氢氧根离子构成，电离时生成的阴离子全部是
OH-
如氢氧化钙、氢氧化钠片茎一片＝辛干化钠
NaOH（火碱、
烧碱、苛性钠）
强腐蚀性，易潮解（表面变湿），固体溶于水放出大量热制肥皂、除油污；不可直接接触
／茎＝干户＝辛亡化钙
Ca (OH) 2（熟石灰、消石灰、
石灰水、石灰浆
／石灰乳）
微溶千水，有腐蚀性改良酸性土壤、处理污水、
杀菌防虫、砌砖抹墙（三合土）、鸡蛋保鲜、皮蛋制作盐定义能解离出金屈离子（或
NH4+)和酸根离子的化合物。还可能有氢离子，如硫酸氢钠。
如纯碱、小苏打等氯化钠
NaCl（食盐）
离子形式存在千体液中涸味剂、防腐剂、生理盐水
(0. 9%)、融雪剂碳酸钠
Na2C03（纯碱、
苏打、碱面）
易溶千水，溶液呈碱性（虽名＂碱＂，实为盐）
除去面团发酵酸、洗涤油污、制肥皂碳酸氢钠
NaHC01
（小苏打）
可溶于水，溶液弱碱性发酵剂（蒸谩头）、胃酸过多、蚊虫叮咬碳酸钙
CaC03
（大理石、石灰石、汉白玉）
白色固体，不溶千水建筑材料（雕栏玉砌）、制生石灰，喀斯特地貌亚硝酸盐
NaN02（常见）
防腐护色剂，但致癌按国标添加于肉制品；少吃剩饭菜，腌菜 15天，
与
VC同食硅酸盐材料陶瓷黏土
（主要原料）
经高温烧结而成碗、盘子、瓷砖等日用及建筑陶瓷玻璃二氧化硅（沙子为主要来源）
熔化后制成，透明、易碎窗户、杯子、光学仪器等
pH值范围
0 ~14
<7酸性（越小越酸），＞7
碱性（越大越碱），＝7中性测溶液酸碱度正常雨水
pH=5. 6
弱酸性酸雨：pH<5. 6
饮用水
pH6. 5~8. 5
适宜范围国家饮用水标准
（五）塑料聚乙烯
PE
手感有点蜡质感，摸起来滑滑的，
比较软保鲜膜、塑料袋、矿泉水瓶盖、
洗发水瓶聚氯乙烯
PVC
可以软也可以硬，加增塑剂就变软自来水管、电线外皮、塑钢门窗、
人造革聚苯乙烯
PS
无色透明，很脆，一所就断一次性泡沫饭盒、酸奶杯、塑料勺子、CD盒聚丙烯
PP
耐高温，可以放进微波炉，像蜡一样白白的微波炉饭盒、水杯、吸管、汽车保险杠聚四氪乙烯
PTFE
超级滑，什么粘东西都粘不住，还耐高温耐腐蚀不粘锅涂层、密封阳、化工管道`},{id:"k_0315",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"生物常识 • 细胞结构与动植物细胞区别",content:`（一）生殖发育植物有性繁殖、无性繁殖（扦插和嫁接），或二者兼备有的靠种子（有性），有的抬根枝插土里就能活（尤性），有的两种都行有性繁殖：
• 水力传播：红树林植物类群、椰子、睡莲。心风力繁殖：蒲公英种子、柳树、杨树。
• 动物传播：樱桃、野葡萄、野山参、松树。心爆裂传播：风仙花。
昆虫变态发育小时候和长大完全两个样，比如毛毛虫变蝴蝶两栖动物变态发育水里出生用鲤呼吸，长大上岸用肺呼吸，比如蜊纠变青蛙
（二）植物植物分类藻类没有根、茎、叶的分化长得最简单的植物，连根茎叶都分不出来，就像一片绿毛毛海带、紫菜、水绵苔鲜一般很矮小，有类似茎和叶的分化，根非常简单
（假根）
矮趴趴地长地上，看着有杆有叶，但根是假的，只是固定用的葫芦鲜、地钱蕨类有根、茎、叶的分化，抱子繁殖终于长出真正的根茎叶了，但不靠种子，靠抱子
（粉末）繁殖蕨菜、贯众、肾蕨、木沙椤种子植物被裸子植物种子裸露，没有果皮包着种子光溜溜在外面，没有果肉包着油松、侧柏、苏铁、银杏、
水杉子植物种子外面有果皮包被种子穿了一层＂衣服＂（果皮），也就是我们常说的开花结果植物桃、豌豆、荔枝、木瓜
（三）地质年代隐生宙太古代无划分最古老的年代，只有细菌和蓝藻，没啥像样的化石元古代震旦纪蓝藻细菌多了起来，开始出现没有脊椎的动物显生宙古生代寒武纪藻类多了，三叶虫满海都是（生命大爆发）
志留纪珊瑚多起来，开始有鱼了泥盆纪蕨类植物和原始松柏类出现，昆虫和原始两栖类最早发现二叠纪松柏类等裸子植物开始发展中生代三叠纪裸子植物继续发展，爬行动物发展，哺乳动物出现，恐龙登场罗纪恐龙称霸，开始有鸟了白翌纪开花植物大量出现，恐龙灭绝，有沙尘暴新生代第三纪动植物越来越像现在这样，哺乳动物称霸第四纪这个时期初期，人类的老祖宗出现了
（四）植物生理三大作用光合作用少反应式：消耗二氧化碳＋水——（光、叶绿体）一产生有机物＋氧气。
• 影响因素：水分、CO2浓度、光照强弱及光质（红光、蓝紫光）。
蒸腾作用小水分从植物体表（主要是叶片气孔）以水蒸气形式散失到空气中。
• 意义：给植物降温；促进根系吸水；拉动水分和无机盐向上运输；增加环境湿度。
呼吸作用心有氧呼吸：消耗有机物＋氧气 （线粒体）一产生二氧化碳＋水＋大量能量。
• 无氧呼吸：
－植物／微生物：有机物一酒精＋二氧化碳＋少量能量；
－动物：有机物一乳酸＋少量能量。
（五）化肥种类作用缺少表现举例／备注氮肥促进茎叶茂盛、叶色浓绿叶片发黄，光合作用减慢，生长迟缓尿素（含氮量最高46%)、按类（碳酸氢按、硫酸按、氯化按）、硝酸类
（硝酸锁）
磷肥促进生长，增强抗寒、抗旱能力生长迟缓、产量降低；叶片紫红过磷酸钙、钙镁磷肥、磷矿粉等钾肥茎杆粗硬，增强抗病虫害和抗倒伏能力易倒伏；叶尖叶缘焦枯（褐斑）
氯化钾、硫酸钾、草木灰(K2C03)
单质肥（含一种元素）
针对性地补充氮、
磷、钾氮肥：尿素、碳酸氢按等；磷肥：过磷酸钙等；钾肥：氯化钾等有机肥含有机质，肥效长，
能改良土壤农家肥（人畜粪尿）
（六）动物分类原生动物草履虫、变形虫、酵母、衣藻、浮游生物等最低等的动物，就一个细胞，啥都是它自己干腔肠动物水母、海蜇、水蛭、珊瑚虫等最低等的多细胞动物，身体像个袋子，只有一个开口（吃和拉一个口）
扁形动物寄生虫等身体扁扁的，像条带子，很多是寄生虫线形动物线虫等身体细长像线，两头尖环节动物蟒、沙蚕、蛭（水蛭）等身体一节一节的，像火车车厢串起来软体动物贝类、乌贼、蜗牛、鲍鱼、就鱼等身体软软的，大多有壳（乌贼、 鱼的壳在里面或退化了）
节肢动物蜘蛛、虾、蟹、娱蛉、奇虾等动物界第一大类群，身体分节，腿也多，外面穿＂盔甲＂ （外骨骼）
鱼类四大家鱼、鲤鱼、中华 、带鱼、鲨鱼、海马等水里生活，用鲤呼吸，体温随水温变
（变温动物）
两栖动物青蛙、蟾 、蛛蠓等小时候水里用鲤，长大了上岸用肺
（皮肤也能帮忙呼吸），冬天要睡觉
（冬眠）
爬行动物龟、斯赐、蛇、 、恐龙等身上有鳞片或甲，真正的陆生动物，
体温随环境变（变温）
鸟类鸡、鸽子、猫头鹰、驼鸟、野鸡、企鹅等身上长羽毛，前肢变翅膀，有翅膀没牙齿，体温恒定（恒温动物）
哺乳动物
（胎生、恒温、
用肺呼吸）
鲸鱼、海豚、猫、虎、编蝠是唯一会飞的哺乳动物、鸭嘴兽等身上长毛，胎生（鸭嘴兽例外，它是卵生），喝奶长大，体温恒定
（七）防御行为保护色体色与周围环境融为一体，不易被天敌发现变色龙（体色随环境变化）、斯赐（多呈土褐色）、
北极熊（白色雪地）、竹节虫（绿色或褐色）
拟态整个身体形态（不仅是颜色）模拟环境中的物体或其他生物，以躲避天敌枯叶蝶（形似枯叶）、尺蠼（形似树枝）、舟蛾
（形似断枝）、猫头鹰（部分种类体色似树皮）、
竹节虫（形似细枝）
警戒色体色鲜艳、醒目，与周围环境形成强烈对比，警告天敌“我有毒或危险”
蓝环章鱼（蓝色圆环）、大黄蜂（黄黑条纹）、箭蛙（鲜艳红、黄、蓝）、毒蛾幼虫（鲜艳条纹）
（八）微生物病毒非细胞型生物，必须在细胞内寄生无细胞结病构，主要由活一种核酸
(DNA或
RNA)构成按宿主分：
l．动物病毒：流感毒、乙肝病毒、艾滋病毒、狂犬病毒。`},{id:"k_0316",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"微生物常识 • 病毒结构与植物病毒",content:"2. 植物病毒：烟草花叶病毒。"},{id:"k_0317",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"微生物常识 • 细菌与噬菌体结构特性",content:`3. 细菌病毒（噬菌体）。
流感病毒一呼吸系统乙肝病毒一消化系统（肝脏）
艾滋病毒一免疫系统狂犬病毒一神经系统`},{id:"k_0318",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"医药常识 • 抗生素的杀菌机制与滥用危害",content:"1. 抗生素对病毒无效（因病毒无细胞结构）。"},{id:"k_0319",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"食品微生物 • 嗜冷菌与冰箱食品安全",content:`2. 耐冷不耐热，可用硬化物（镇酒）等灭活。
细菌有细胞结构
（原核生物）
单细胞，有细胞壁、细胞膜、细胞质有益菌：双歧杆菌
（肠道）、乳酸菌、
根瘤菌（固氮）。致病菌：
－幽门螺杆菌（胃）
－沙门氏菌（肠道
－大肠杆菌（部分致病）
幽门螺杆菌一慢性胃炎、胃溃疡沙门氏菌一急性肠胃炎（常见千
）未煮熟鸡蛋、肉类）
抗生素主要对细菌有效。
巴氏消毒法
（在五六十摄氏度下加热半小时，杀死乳酸杆菌等微生物）
真菌有细胞结构
（真核生物）
单细胞（如酵母菌）或多细胞（如霉菌、蘑菇）
酵母菌、霉菌、食用菌（蘑菇）。
脚气（ ）、酵母菌用千酿酒发面。
（九）营养物质糖类(CH心）
（碳水化合物）
主要供能物质
（人体所需薯能量的含
55%-65％
源于此）。
主要来自主食：米、面、
类等（富淀粉，口来腔初步消化）。
单糖：不能水解为更简单的糖分子。代表：
葡萄糖、果糖二糖：水解后生成两分子单糖。代表：荒糖、麦芽糖、乳糖多糖：包括淀粉和纤维素，味不甜，需要经淀粉酶（口腔中的唾液淀粉酶）分解为葡萄糖才能被人体吸收。
油脂质储能物质
（能量储备）
食用油、坚果、肥肉式
（脂）、鱼油（脂）。`},{id:"k_0320",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"人体生理 • 三大营养物质代谢与能量供给",content:"1. 我国成年男子体内平均脂肪含最约为"},{id:"k_0321",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"营养学常识 • 水溶性与脂溶性维生素功能及缺乏症",content:`13.3%,女性稍高。脂肪是贮备人体能量的形
。`},{id:"k_0322",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"膳食健康 • 饱和脂肪酸与不饱和脂肪酸",content:`2. 需适量摄入不饱和脂肪酸（如坚果、鱼油），
限制饱和脂肪（动物油）和反式脂肪（人造奶油、糕点）。
蛋白质：促进生长发育与新陈代谢；动物蛋白（肉、禽蛋）含饱和脂肪和胆固醇，优质蛋白推荐瘦肉、鱼、去皮鸡肉、蛋清；植物蛋臼（豆类）低脂低胆固醇、高膳食纤维，
氨基酸，生命肉、蛋、奶、
适合糖尿病患者。
蛋自质的物质基础豆制品。
血红蛋白：红细胞主要成分，输送氧气；与
co亲合力比02高约200倍，结合生成鲜红色
HbCO,使Hb失携氧能力，导致co中毒。
酶：活细胞产生的催化性蛋白质；低温冷冻可抑制酶活性，控制化学变化。
供能顺序：紧急用糖，储备用脂，万不得已才用蛋。
热量比：脂肪(9)>蛋白质（4)＝碳水化合物（4)（单位：千卡／克）
维生素类型性状功能富含食物缺乏症维生素A
脂溶性维持视觉，维持上皮结构完整与健全鱼肝油、动物肝脏、绿色蔬菜夜盲症维生素B,
水溶性脚气病维生素B2
水溶性口舌炎症、口腔溃疡叶酸（维生素B9)
水溶性参与红细胞生成绿叶蔬菜、豆类、动物肝脏叶酸缺乏会导致贫血维生素C
水溶性新鲜蔬菜、水果坏血病，免疫力下降，
缺铁性贫血维生素D
脂溶性人体可以少量合成，
能帮助吸收磷和钙鱼肝油、蛋黄、乳制品骨质软化、骨质疏松、
倭病维生素E
脂溶性促进性激素分泌，延缓衰老，抗氧化，又称生育酚植物油、果蔬、坚果、瘦肉、乳类、蛋类、相橘皮等更年期综合征、色素沉淀维生素K
脂溶性参与凝血因子合成，
促进血液凝固，又称凝血维生素；辅助骨代谢绿叶蔬菜（疲菜、甘蓝）、植物油、肝脏、蛋类、大豆油凝血功能受损
（十）食品添加剂合法的
（十一）急救`},{id:"k_0323",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"急救常识 • 心肺复苏（CPR）与自动体外除颤器（AED）",content:`1. 心脏复苏与AED
黄金4分钟胸外按压与人工呼吸按30: 2交替进行按压患者仰卧硬质平面，频率100~120次／分，深度;;,5('m
吹气先清理口鼻异物，捏紧鼻孔吹气，每次约5秒
AED使用针对心源性猝死：开机后按语音提示贴电极片，分析心律时勿触碰患者，建议电击时按下放电键，除颤后立即继续心肺复苏`},{id:"k_0324",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"急症识别与急救 • 脑卒中（中风）与急性心梗识别",content:`2. 脑卒中与心梗脑卒中（中风）
牢记“BE FAST" :平衡失调、视力改变、面部歪斜、单侧无力、言语不清一立即拨打急救电话。勿喂食喂水，保持平卧头侧位心梗胸骨后压株性疼痛，可放射至左肩、下颌或背部。立即停止活动，含服硝酸甘油（若医嘱允许），呼叫急救`},{id:"k_0325",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"日常生活急救 • 烫伤、骨折、气道异物海姆立克急救法",content:`3. 其他损伤关节／肌肉扭伤拉伤先冷敷24小时，之后改热敷运动后肌肉酸痛由乳酸堆积引起，宜热敷动脉出血血色鲜红，呈喷射状：在伤口近心端强力压迫或使用止血带静脉出血血色暗红，缓慢流出：直接在伤口局部加压包扎，无需刻意寻找近心端或远心端烧伤／中暑冷水冲洗创面、冷敷降温；口服含盐饮料，禁止只喝白开水。剧烈运动后应补充淡盐水或电解质饮料
（十二）检查参数检查参数适用场景检测内容常见异常关联疾病其他血常规体检、
感染筛查红细胞、白细胞、血小板、血红蛋白贫血、
感染、白血病白细胞升高（细菌感染）、血红蛋白低（贫血）
转氨酶肝功能检查
ALT、AST
肝炎、脂肪肝、肝硬化、
• 肌炎正常：0- 40U/L
(ALT/AST)
血糖检测糖尿病诊断空腹血糖、
餐后血糖糖尿病、低血糖症正常范围： 3.9~`},{id:"k_0326",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"人体健康指标 • 正常血糖与血压生理范围",content:`6.lmmol/L（空腹）；
空腹;;,7.Ommol/L（糖尿病）
血脂四项心血管疾病风险评估
TC、TG、LDL-C、
HDL-C
高脂血症、动脉粥样硬化、
冠心病
TC < 5.2 ; TG < 1.7 ;
LDL-C<3.4; HDL-C>`},{id:"k_0327",chapter:"第三章 科技常识",section:"生物与医学常识",topic:"三、生物常识",title:"法定计量单位与医学常用检测单位",content:`1.0（单位：mmol/L)
甲胎蛋白
(AFP)
肝癌筛查血清AFP
原发性肝癌、
肝硬化、肝炎正常<7~10 ng/mL;明显升高提示肝癌血尿酸
(UA)
反映膘呤代谢血液中尿酸浓度痛风、肾功能异常正常范围：
男性：208~428 ? mol/L
女性：155~357 ? mol/L
尿常规肾病、糖尿病筛查尿蛋白、尿糖、红细胞、白细胞肾炎、尿路感染、糖尿病尿蛋白阳性（肾病）、
尿糖阳性（糖尿病）
血压测量高血压筛查收缩压／舒张压高血压、低血压正常值(120/80mmHg)、
分级(;:, 140/90为高血压）
（十三）科学家阿基米德
“力学之父”
(1)物理定律：浮力定律（阿基米德原理）、杠杆原理。
(2)历史地位：与高斯、牛顿并称“世界三大数学家”。
名言：“给我一个支点，我就能撬起整个地球”。
伽利略
“近代科学之父”
“现代物理学之义.,、“
(1)物理学贡献：自由落体定律、惯性原理、摆的等时性。 (2)
天文学贡献：用望远镜观测天体，支持日心说。
(3)方法论：开创实验研究方法。
经典力学的先驱。
开普勒
“天空立法者”
(1)天文学定律：发现行星运动三大定律（轨道、面积、周期）。
(2)数据基础：定律基于第谷的观测数据。
为牛顿万有引力定律奠定基础。
牛顿
“经典物理学奠基人”
(1)物理学定律：牛顿运动三定律、万有引力定律。
(2)数学贡献：与莱布尼茨独立发明微积分。
(3)代表著作：《自然哲学的数学原理》。
安培物理学家
(1)电学贡献：发现安培定律（电流磁效应）。
(2)单位纪念：电流单位“安培“以其命名。
电磁学奠基人之一。
法拉第
“电学之父”
电磁学贡献：发现电磁感应现象（发电机原理）、提出电场线、磁场线概念。
实验科学大师，麦克斯韦的理论基础。
麦克斯韦物理学家
(1)电磁理论：建立麦克斯韦方程组，统一电、磁、光现象，预言电磁波存在。
(2)历史地位：实现了物理学第二次大综合（第一次是牛顿）。
为无线电通信奠定理论基础。
孟德尔
“现代遗传学之
/义、“
(1)遗传学定律：豌豆实验
(2)历史地位：奠定现代遗传学基础。
用统计学方法研究生物遗传的先驱。
普朗克
“量子论奠基人”
(1)物理学贡献：提出能量子假说，开创量子理论，获1918
年诺贝尔物理学奖。
(2)常数纪念：普朗克常数以其命名。
宣告了量子时代的到来。
爱因斯坦
“现代物理学之
/义、“
(1)相对论：创立狭义相对论(1905)和广义相对论(1915)。
(2)量子论：提出光子说，成功韶释光电效应（获1921年诺贝尔物理学奖）。
(3)质能方程：E=mc勹二十世纪最伟大的科学家，被《时代》评为“世纪伟人”。
魏格纳气象学家、地球物理学家
(1)地质理论：提出“大陆漂移说”，发表《海陆的起源》。 (2)历史地位：板块构造学说的先驱。
哈恩
（奥托·哈恩）
化学家重要发现：与助手斯特拉斯曼发现核裂变现象(1938年，
铀核裂变），获1944年诺贝尔化学奖。
“核裂变之父”。
弗莱明
（亚历山大·弗莱明）
细菌学家
(1) 医学发现：发现青霉素（首个抗生素），获1945年诺贝尔生理学或医学奖。
(2) 时代意义：开创抗生素时代，使人类进入合成新药时代。
冯·诺依曼
”计算机之父”
(1) 计算机科学：提出“冯·诺依曼结构＂（存储程序原理），奠定现代计算机基础。
(2) 数学贡献：对量子力学、博弈论、核武器等有重大贡献。
现代计算机体系结构的创始人。`},{id:"k_0328",chapter:"第四章 地理常识",section:"资源与环境地理",topic:"一、矿产",title:"我国矿产资源分布特征 • 煤炭与石油资源",content:`类别矿产名称能源矿产石油、天然气、页岩气、煤炭、煤层气、铀金属矿产铁、恪、铜、铝、金、铢、鸽、锡、铝、梯、钻、 、稀土、铅非金属矿产磷、钾盐、晶质石墨、萤石矿产主要产地主要用途地位／特点相关城市（称号）
锡广西、云南（两省合计占全国
2/3)
电子产品焊料、
合金、化工我国优势矿产，储量和产量居世界前列铭赣南、湘南硬质合金、高速钢、军工储量、产量、出口量
“三个第一”
赣南（江西）
稀土内蒙古包头、江西赣州永磁材料、催化剂、抛光、储氢战略性关键矿产；包头轻稀土，赣州重稀土内蒙古包头
（＂稀土之都”)
钾盐新疆罗布泊、青海柴达木、云南野井钾肥
（农业生产）
保障农业用肥安全；
以盐湖型为主铁矿辽宁鞍山、四川攀枝花、河北迁安等钢铁冶炼贫矿多、富矿少，大最依赖进口辽宁鞍山(“钢铁之城”“钢都”)
天然气水合物
（可燃冰）
南海神狐海域未来清洁能源
2017年首次成功试采，世界首次泥质粉砂型安全可控开采磷矿湖北宜昌、云南、
贵州等磷肥、化工产品我国磷矿资源丰富，
但多为中低品位湖北宜昌锥江西宜春、青海盐湖、四川等电池（尤其是锥电池）
新能源关键矿产江西宜春
“亚洲悝都”)
石英砂安徽、广东、江电苏等子、光伏、光纤、玻璃行业广泛用于硅材料工业铝土矿广西百色、山西、
贵州等铝冶炼我国铝土矿资源中等，但需求大广西百色金矿山东、河南、广西百色等金融储备、首饰、电子我国金矿资源较丰仁甲仁大金沟金矿铜矿江西上饶（德兴）、西藏、云南等电力、电子、建筑我国最大的露天铜矿在德兴江西上饶
(“铜都”)`},{id:"k_0329",chapter:"第四章 地理常识",section:"资源与环境地理",topic:"一、矿产",title:"我国金属矿产资源分布 • 铁矿与有色金属",content:`－ 太阳和八大行星能员来源主要成分氢和氨能量来源内部的核聚变反应像不断爆炸的氢弹，氢变成氨，过程中释放巨大能量大气结构光球太阳表面（我们肉眼看到的那层）
我们平时看到的太阳，光就是从这发出来的色球光球外面那层，平时被光球亮光遮住，
日全食时能看到粉色圈太阳的“外套＂，平时看不见日冕最外层，像太阳的“头发”，延伸到很匹、一太阳活动黑子太阳表面的“黑斑＂，其实是温度稍低的区域太阳脸上长了“黑痔＇，
那里温度稍微低一点耀斑太阳表面的猛烈爆炸，突然变亮太阳突然”发火＂，喷出大星能量和物质活动影响干扰通讯干扰无线电短波通讯让收音机、GPS信号“抽风”
磁暴地球出现磁暴现象地球磁场被＂搅乱”，指南针乱转极光产生极光（南极光、北极光）
极光的条件：太阳风＋地球磁场＋大气层太阳来的带电粒子撞到地球大气，在天上“放烟花”
太阳系八大行星水星
（辰星、
昏星）
离太阳最近，温差大；公转最快，但质鼠轻。
金星
（长庚、
启明、太白）
夜空中最亮的星（离地球近）；自转反向（太阳西边出），热到能融化铅。
目前宇宙中已知存在生命的唯一天体，已有46亿年历史。
最底部（从地面往上约0-12
对流旺盛，雨雪云风（大气的水平运对流层公里）
雾都发生在这里动）、热岛效应（城市比郊区热）
对流层上面（约12-50公空气以水平流动为主，气流平稳，适平流层飞机巡航、臭氧层里）
合飞机航行；有臭氧层高层大气平流层上面(50公里以上）
空气稀薄，有电离层流星、极光、无线电通讯岩浆岩地下岩浆冷却后变地球玄武岩、花岗岩成的石头。喷出地表冷却的是玄武岩
（黑、细），在地下慢慢冷却的是花岗岩（花、硬）
沉积岩砂岩、页岩、石灰岩岩石圈
（三大类岩石）
沙子、泥土、生物遗骸沉积压实成的石头，往往有层理
（一层一层的）
变质岩老石头被高温高压
＂烤“变质形成的。
石灰岩变大理岩，
页岩变板岩板岩、大理岩地震震源地震开始发生的地震源深度与破坏力震源越浅，破坏程度越大震级衡量地震大小的一种噩度代表地震释放的能量有多大。震级增加1级，能量增加约30倍火星（荧惑星、罚星、执法）
自转轴倾角、自转周期均与地球相近，公转一周约为地球公转时间的两倍。自转公转跟地球像双胞胎，表面红通通（氧化铁锈），“天问一号”。因其红光荧荧似火，
且运行轨迹复杂令人迷惑，故名＂荧惑＂。
木星
（岁星、
重华、应星、纪星）
行星里的大块头，地球的保护神（吸陨石），自转快得像抽陀螺，身上条纹是风暴。
古人以其约12年（实为11.86年）绕天一周，用以纪年，故称＂岁星”。
土星（镇星、填星）
古人认为其约28年行经二十八宿一周，犹如镇守一宿，故名。
土黄色，光环，美得像个穿裙子的姑娘。
天王星自转的倾斜度很大。躺着转的行星。
海王星离太阳最远的行星离太阳最远，冷得要命，但大气活动最暴躁，风速快到你站不住脚。
其他北极星北辰、勾陈一、紫微星例：譬如北辰（《论语》）
北斗星北斗七星（天枢、天璇、天玑、天权、玉衡、开阳、摇光）`},{id:"k_0330",chapter:"第四章 地理常识",section:"资源与环境地理",topic:"一、矿产",title:"我国稀土资源分布与战略地位（白云鄂博等）",content:`月相月相新月（朔）
上弦月满月（望）
下弦月日期（农历）
初一初七、初八`},{id:"k_0331",chapter:"第四章 地理常识",section:"自然与中国地理",topic:"二十二、二十三",title:"我国地形三级阶梯分界线及主要地形区",content:`外观不可见半圆形、
亮面朝西圆形半圆形、
亮面朝东月出时间清展（日出时间）
正午黄昏(H落时间）
半夜（午夜）
月落时间黄昏（日落时间）
半夜（午夜）
清晨（日出时间）
正午观察时间及位置彻夜不见上半夜西半天通宵可见下半夜东半天`},{id:"k_0332",chapter:"第四章 地理常识",section:"自然与中国地理",topic:"二十二、二十三",title:"我国主要山脉走向及地理分界线意义",content:"2. 农业：水田与旱地分界线、水稻与小麦主产区分界线。"},{id:"k_0333",chapter:"第四章 地理常识",section:"自然与中国地理",topic:"二十二、二十三",title:"我国土壤与天然植被的垂直地带性与纬度分布",content:"3. 植被／土壤：亚热带常绿阔叶林与温带落叶阔叶林分界线。"},{id:"k_0334",chapter:"第四章 地理常识",section:"自然与中国地理",topic:"一、综合地理",title:"我国主要河流水文特征与外流区内流区",content:`分界线
（秦岭－淮河）
秦岭－淮河一线`},{id:"k_0335",chapter:"第四章 地理常识",section:"自然与中国地理",topic:"一、综合地理",title:"我国主要湖泊分布 • 咸水湖与淡水湖（青海湖、鄱阳湖等）",content:"4. 水文：河流有无结冰期分界线。"},{id:"k_0336",chapter:"第四章 地理常识",section:"自然与中国地理",topic:"一、综合地理",title:"我国主要自然灾害分布（地震、台风、洪涝、干旱、滑坡）",content:"5. 综合：中国南北地理分界线。"},{id:"k_0337",chapter:"第四章 地理常识",section:"自然与中国地理",topic:"二、气候与降",title:"我国季风气候特征与降水量时空分布规律",content:`水界线季风区与非季风区分界线大兴安岭－阴山－贺兰山－巴颜喀拉山－冈底斯山。
以东受夏季风影响明显，以西影响小。
400毫米等降水量线半湿润区与半干旱区分界线，大致与季风区非季风区分界线一致。
农业意义：农耕区与畜牧业区的大致分界线。`},{id:"k_0338",chapter:"第四章 地理常识",section:"自然地理",topic:"三、地形阶梯",title:"秦岭—淮河一线的重大地理分界线意义",content:`与地势界线第一、二级阶梯界线昆仑山—祁连山—横断山脉东缘。
第二、三级阶梯界线大兴安岭—太行山—巫山—雪峰山。`},{id:"k_0339",chapter:"第四章 地理常识",section:"人文与人口地理",topic:"四、人口地理",title:"我国人口地理界线（黑河—腾冲线／胡焕庸线）",content:`分界线
（胡焕庸线）
黑龙江黑河－云南腾冲一线。
东南侧人口稠密(94％以上），西北侧人口稀疏。
（二）河流`},{id:"k_0340",chapter:"第四章 地理常识",section:"人文与人口地理",topic:"四、人口地理",title:"长江与黄河主要水利枢纽及生态治理",content:`1. 长江和黄河长江黄河源头青藏高原唐古拉山青藏高原巴颜喀拉山流经省份青、藏、川、云、渝、鄂、湘、赣、皖、苏、
沪11个省区青、川、甘、宁、内蒙古、晋、陕、豫、
鲁9个省区注入海洋东海渤海地位中国第一长河、世界第三长河中国第二长河特点世界第三长河，亚洲第一大河。
与黄河、澜沧江同源青海三江源。
与澜沧江、怒江在云南横断山脉形成“三江并流”。
最大支流为汉江，流域面积最大支流为嘉陵江。
黄金水道，全球航运最繁忙的河流。
注入东海，入海口有崇明岛（东海瀛洲）。
我国第二长河。
上游清、中游黄；渭河、汾河两大支流；泾渭分明；壶口瀑布。
下游淤积成悬河。
二月下旬宁蒙几字湾、下游凌汛。`},{id:"k_0341",chapter:"第四章 地理常识",section:"人文与人口地理",topic:"四、人口地理",title:"我国重要跨流域调水工程（南水北调中线、东线）",content:`2. 其他河流
（三）湖泊主要湖泊
l．五大淡水湖鄱阳湖（赣）、洞庭湖（湘）、太湖（苏）、洪泽湖（苏）、巢湖（皖）为我国五大淡水湖泊。
(1) 鄱阳湖，位千江西省，是我国面积最大的淡水湖，也是我国第二大湖。
(2) 洞庭湖，位千湖南省，被誉为“长江之肾＂。
(3) 太湖，湖区隶属于江苏省，有“一湖跨三州”之说，即跨东吴（苏州）、中吴（常州）、西吴（湖州）。
(4) 洪泽湖，位于江苏省，素有“日出斗金”之美誉。
(5)巢湖，位于安徽省，是安徽境内最大的湖泊。`},{id:"k_0342",chapter:"第四章 地理常识",section:"人文与人口地理",topic:"四、人口地理",title:"中国最大咸水湖 • 青海湖的地理与生态特征",content:"2. 青海湖，位于青海省，是我国最大的内陆湖泊，也是我国最大的咸水湖。"},{id:"k_0343",chapter:"第四章 地理常识",section:"人文与人口地理",topic:"四、人口地理",title:"西藏三大圣湖 • 纳木错地理特征",content:`3. 纳木错，位于西藏自治区，是西藏第二大湖泊，也是中国第三大咸水湖，海拔
4718米，是我国和世界海拔最高的咸水湖。`},{id:"k_0344",chapter:"第四章 地理常识",section:"人文与人口地理",topic:"四、人口地理",title:"中国陆地最低点 • 新疆吐鲁番艾丁湖",content:`4. 艾丁湖，位于新疆吐鲁番盆地，湖水面海拔－155米，是我国海拔最低的湖泊，
属于内陆咸水湖。`},{id:"k_0345",chapter:"第四章 地理常识",section:"人文与人口地理",topic:"四、人口地理",title:"“大西洋最后一滴眼泪” • 新疆赛里木湖",content:`5. 赛里木湖，位千中国新疆塔城地区，被称为“大西洋最后一滴眼泪＂。
知识链接：湖泊成因构造湖地壳断陷、坳陷积水，湖形狭长、水深青海湖、滇池、泪海、抚仙湖、纳木错青海湖是构造湖＋咸水湖火山口湖火山口塌陷积水，圆形、
深不可测长白山天池天池是中国最深湖泊
(373米）
冰川湖冰川创蚀或冰债堵塞天山天池天池属于冰硕堰塞湖，不是构造湖河成湖河流摆动、淤塞鄱阳湖、洞庭湖、太湖中国五大淡水湖多属此类海成湖
（冯湖）
海湾被沙坝封闭杭州西湖西湖是洞湖，不是淡水湖？实际巳淡化风成湖沙丘间风蚀洼地积水月牙泉沙漠地区特有人工湖拦河筑坝形成三峡水库、千岛湖千岛湖＝新安江水库
（四）海洋渤海辽宁、河北、天津、山东被辽宁、河北、天津、山东围起来的“小澡盆＂，黄河的水流到这里。
黄海辽宁（鸭绿江口）、山东、
江苏位千中国与朝鲜半岛之间，水有点黄（得名千此），
青岛就在黄海边。
东海上海、浙江、福建长江水汇入这里，台湾海峡是东海的一部分（水下的
“大浅盘”)。
南海广东、广西、海南最靠南、最暖和、面积最大的海，海南岛就在南海边。
（五）地貌地貌类型核心定义与形成原因典型代表（中国境内）
核心区别与备考要点溶蚀作用。具有溶蚀能力的水
·云南路南石林（地表）
·贵州双河溶洞（地下）
．重庆小寨天坑（塌陷）
．广西桂林山水（综合景观）
关键词：水（溶蚀）、
（含二氧化碳等）对可溶性岩可溶性岩石（石灰喀斯特地貌石（石灰岩为主）进行化学溶岩）。主要分布在解，并伴随流水冲蚀、沉积，
西南湿润地区（云形成的地表和地下形态。因最贵桂）。
早在斯洛文尼亚的喀斯特高原系统研究而得名。
雅丹地貌风蚀作用。在极端干旱区（如沙溃、戈壁），裸露地表的河湖相沉积岩（泥岩、砂岩）在定向强风长期吹蚀下，形成的垄岗状、
城堡状、柱状等地貌。
维吾尔语意为＂陡峭的土丘＂。
．新疆罗布泊地区
·柴达木盆地西部（世界最长雅丹群）
·甘肃敦煌魔鬼城关键词：风（侵蚀）、
干旱区、河湖沉积岩。是风力侵蚀的典型产物，与“风积地貌＂ （如沙丘）
对应。
丹霞地貌侵蚀作用（以流水为主）。由垂直节理发育的红色陆相碎屑岩（砂岩、砾岩）构成，在流水、重力、风化等综合外力作用下，形成的以陡崖坡为特征的地貌。以广东丹霞山命名。
·广东丹霞山（命名地）
·福建武夷山、江西龙虎山，四川青城山
·甘肃张掖彩色丘陵
（西北干旱型丹霞）
关键词：红色砂岩／
砾岩、垂直节理、陡崖坡。分布广，南方（湿润区）以流水侵蚀为主，西北
（干旱区）叠加了风蚀作用。`},{id:"k_0346",chapter:"第五章 经济常识",section:"宏观调控与政策",topic:"一、宏观调控的日标",title:"宏观调控的四大目标（促进经济增长、增加就业、稳定物价、保持国际收支平衡）",content:`（一）经济增长衡量经济增长的相关指标国内生产总值
(GDP)
指经济社会（即一国或一地区）在一定时期内运用生产要素所生产的全部最终产品（物品和劳务）的市场价值，是一个地域概念。
国民生产总值
(GNP)
指一个国家或一个地区的常住居民在一定时期所拥有的生产要素所生产的全部最终产品（包括商品和服务）的市场价值，是一个国民概念。
（二）充分就业失业的常见概念失业类型摩擦性失业、结构性失业、季节性失业、周期性失业。
（三）稳定物价通货膨胀和通货紧缩的含义
l．通货膨胀：货币供给大于货币实际需求，导致货币贬值，而引起的一段时间内商品和劳务的价格持续而普遍的上涨现象。其实质是社会总需求大于社会总供给。
通货膨胀的再分配效应：通货膨胀不利于靠固定的货币收入维持生活的人。通货膨胀不利于债权人，有利于债务人。
2．通货紧缩：一般物价水平持续下降的一种货币现象。其实质是社会总供给大于社会总需求。
衡量通货膨胀程度的指标消费物价指数(CPI)
是用与居民生活有关的产品及劳务价格统计出来的物价变动指标。
当CPl>3％的增幅时，就是通货膨胀；而当CPl>5％的增幅时，就是严重的通货膨胀。
影响通货膨胀的经济影响通货膨胀不利于靠固定的货币收入维持生活的人，其实际收入水平会下降。
通货膨胀对储蓄者不利。
在债务人与债权人之间，通货膨胀将有利于债务人而不利于债权人。
在政府与公众之间，通货膨胀将有利于政府而不利于公众。`},{id:"k_0347",chapter:"第五章 经济常识",section:"宏观调控与政策",topic:"二、宏观调控政策分析",title:"宏观经济调控的两大主要手段 • 财政政策与货币政策",content:`经济形势比较手段目标通货紧缩
（经济萧条）
扩张性
（积极）
财政政策两增：增加财政支出（政府购买、转移支付），增发国债。
一减：减少税收。
刺激社会总需求，拉动经济增长。
货币政策三降：降低法定存款准备金率、再贴现率、基准利率。
一买入：买入债券。
通货膨胀
（经济过热）
紧缩性
（消极）
财政政策两减：减少财政支出（政府购买、转移支付），减发国债。
一增：增加税收。
抑制社会总需求，稳定物价。
货币政策三提：提高法定存款准备金率、再贴现率、基准利率。
一卖出：卖出债券。`},{id:"k_0348",chapter:"第五章 经济常识",section:"宏观调控与政策",topic:"二、宏观调控政策分析",title:"通货膨胀与通货紧缩的成因、表现及应对调控工具",content:`［知识链接】我国常见税收的种类流转税增值税对在我国境内销售货物、劳务、服务、无形资产、不动产以及进口货物的单位和个人，就其实现的增值额征收的一种税。
消费税对生产、委托加工、进口应税消费品（如烟、酒、高档化妆品、成品油等）的单位和个人征收的一种税，在增值税的基础上，对特定的消费品再征收一道税，
主要目的是引导消费方向，调节产品结构，保证国家财政收入。
关税由海关对进出境的货物、物品征收的税种，主要包括进出口关税，以及对入境旅客行李物品和个人邮递物品征收的进口税，是维护国家主权和经济利益、保护国内产业、增加国家财政收入的重要手段。
所得税类企业所得税对我国境内的企业和其他取得收入的组织的生产经营所得和其他所得征收的一种税。
个人所得税对个人（自然人）取得的各项应税所得征收的一种税，包括工资、薪金所得，
劳务报酬所得，稿酬所得，特许权使用费所得，经营所得，利息、股息、红利所得，财产租赁所得，财产转让所得，偶然所得等。
财产行为税房产税以房屋为征税对象，按照房屋的计税余值或租金收入向产权所有人征收的一种财产税。
契税在土地、房屋等不动产所有权转移，当事人双方订立契约时，对产权承受人征收的一种税。
土地增值税对转让国有土地使用权、地上建筑物及其附着物并取得增值收入的单位和个人征收的一种税。
印花税对经济活动和经济交往中书立、领受具有法律效力的凭证的行为所征收的一种税。
资源环境税资源税对在我国境内开采应税矿产品（如原油、天然气、煤炭、金属矿等）和生产盐的单位和个人征收的一种税，从价计征或从量计征。
环境保护税对在我国领域和我国管辖的其他海域，直接向环境排放应税污染物（如大气污染物、水污染物、固体废物、噪声等）的企业事业单位和其他生产经营者征收的一种税。
收入分配政策初次分配初次分配属于微观分配行为，主要应由生产部门自主进行。（讲效率）
再分配再分配属于宏观分配行为，主要由政府以收入税等形式对各个经济主体的初次分配所得进行调节，着重解决社会发展和社会公平问题。（讲公平）
第三次分配第三次分配是建立在志愿性基础上，以募集、自愿捐赠等慈善公益方式对社会资源和社会财富进行的分派。（讲社会贵任）
世界经济的三大支柱组织国际货币基金组织
(IMF)
国际货币基金组织(IMF)是布雷顿森林体系的一个组成部分，成立于
1945年12月，总部设在美国华盛顿，是联合国的独立机构，在经营上具有独立性。
世界银行
(WB)
世界银行(WB)是国际复兴开发银行(IBRD)的通称，是1944年7月布雷顿森林会议后，与国际货币基金组织同时产生的两个国际性金融机构之一，也是联合国下属的一个专门机构。
世界贸易组织
(WTO)
世界贸易组织(WTO)于1995年1月1日正式开始运作，负责管理世界经济和贸易秩序，总部设在瑞士日内瓦，它的前身是1947年订立的关税及贸易总协定，是一个独立于联合国的永久性国际组织，在经营上有其独立性。
世贸组织的首要目标是帮助开展平稳、自由、公平的贸易。
其他经济组织全面与进步跨太平洋伙伴关系协定
(CPTPP)
CPTPP于2018年12月30日正式生效，包括日本、加拿大、澳大利亚、智利、
新西兰、新加坡、文莱、马来西亚、越南、墨西哥和秘鲁等］1个国家，覆盖4.98
亿人口，签署国国内生产总值之和占全球经济总量的13%。
亚洲基础设施投资银行
(AIIB)
亚洲基础设施投资银行是政府间性质的亚洲区域多边开发机构，是首个由中国倡议设立的多边金融投资机构。
上海合作组织上海合作组织（上合组织）是2001年6月15日在中国上海宣布成立的永久性政府间国际组织。
亚太经合组织
APEC
亚太地区重要的经济合作论坛，也是亚太地区最高级别的政府间经济合作机制。
二十国集团
(G20)
二十国集团(G20)由七国集团财长会议千1999年倡议成立，政府间国际经济合作论坛。`},{id:"k_0349",chapter:"第五章 经济常识",section:"经济学术语与常考名词",topic:"三、经济学术语和热词",title:"常考经济学重要名词与术语（恩格尔系数、基尼系数、CPI、机会成本、沉没成本、边际效用递减等）",content:`供给侧结构性改革和扩大有效需求供给侧和需求侧是管理和调控宏观经济的两个基本手段。需求侧管理，重在解决总量性问题，注重短期调控，主要是通过调节税收、财政支出、货币信贷等来刺激或抑制需求。供给侧管理，重在解决结构性问题，注重激发经济增长动力，主要通过优化要素配置和调整生产结构来提高供给体系质最和效率，进而推动经济增长。
恩格尔系数食品支出总额占个人消费支出总额的比重。
基尼系数衡量一个国家或地区居民收入差距（贫富差距）的常用指标。
机会成本生产一单位的某种商品的机会成本是指生产者所放弃的使用相同的生产要素在其他生产用途中所能得到的最高收入。
沉没成本沉没成本是指以往发生的与当前决策无关的费用。它表示已经发生不可收回的支出，存在形式有多种，比如时间、金钱、精力。它常用来和可变成本作比较，可变成本可以被改变，而沉没成本则不能被改变。
边际效应递减边际效应递减规律，是指在一定时间内，在其他商品的消费数量保持不变的条件下，随若消费者对某种商品消费量的增加，消费者从该商品连续增加的每一消费单位中所得到的效用增量即边际效用是递减的。
MO、Ml、M2、
M3
MO:流通中现金（含数字人民币）。
Ml: MO＋单位活期存款。
M2: Ml＋单位定期存款＋个人储蓄存款＋证券客户保证金。
M3: M2＋高流动性证券及其他资产。
中央银行中国人民银行是我国的中央银行。执行货币政策，对国民经济进行宏观调控，对金融机构乃至金融业进行监督管理的特殊的金融机构。
BP
基点是利率的计数单位，一个百分点等于100个基点。
拉弗曲线税率与政府税收收入之间的关系：税率过低或过高都会导致税收减少，存在一个最优税率使税收最大化。
菲利普斯曲线通货膨胀率与失业率之间的关系：通胀率上升时失业率下降，通胀率下降时失业率上升。
库兹涅茨曲线经济增长与收入不平等之间的关系：经济发展初期收入差距拉大，达到拐点后收入差距缩小。
劳伦斯曲线
（洛伦兹曲线）
人口累计百分比与收入累计百分比之间的关系：曲线弯曲程度越大，收入分配越不平等。
LPR
贷款市场报价利率(LPR)是由具有代表性的报价行，根据本行对最优质客户的贷款利率，以公开市场操作利率（主要指中期借贷便利利率）加点形成的方式报价。
灰犀牛
＂灰犀牛”事件是太过于常见以至于人们习以为常的风险。
黑天鹅
“黑天鹅”事件是极其罕见的、出乎人们意料的风险。`}],iu=[{id:"q_0001",chapter:"第一章 法律常识",section:"一、总则",q_num:1,source:"2022年．事业单位联考",stem:"1. [ 2022年．事业单位联考】依据《中华人民共和国民法典》，下列说法错误的是（ ）。",options:[{key:"A",text:"满十六周岁便可以独立实施民事法律行为"},{key:"B",text:"八周岁以上的未成年人可以独立实施纯获利益的民事法律行为"},{key:"C",text:"不满八周岁的未成年人由其法定代理人代理实施民事法律行为"},{key:"D",text:"不能辨认自己行为的成年人由其法定代理人代理实施民事法律行为"}],answer:"A",analysis:`。解析：本题考查法律常识。
A项正确，根据《最高人民法院关于适用（中华人民共和国民法典〉合同编通则若干问题的解
释》第四条第二款规定：“采取现场拍卖、网络拍卖等公开竞价方式订立合同，当事人请求确认合
同自拍卖师落槌、电子交易系统确认成交时成立的，人民法院应予支持。合同成立后，
当事人拒绝签订成交确认书的，人民法院应当依据拍卖公告、竞买人的报价等确定合同内容。”选
项中，拍卖师落槌该合同即成立。
B项错误，根据《最高人民法院关于适用（中华人民共和国民法典〉合同编通则若干问题的
解释》第六条第二款规定：“当事人通过签订意向书或者备忘录等方式，仅表达交易的意向，未约
定在将来一定期限内订立合同，或者虽然有约定但是难以确定将来所要订立合同的主体、标的
等内容，一方主张预约合同成立的，人民法院不予支持。”选项中，甲乙企业签订的合作备忘录
仅表达了双方深度合作的意向，不构成预约合同。
C项错误，根据《最高人民法院关于适用（中华人民共和国民法典〉合同编通则若干问题的
解释》第十条第三款规定：“提供格式条款的一方对其已经尽到提示义务或者说明义务承担
举证责任。对于通过互联网等信息网络订立的电子合同，提供格式条款的一方仅以采取了设置勾
选、弹窗等方式为由主张其已经履行提示义务或者说明义务的，人民法院不予支持，但是其举证
符合前两款规定的除外。”本条前两款是关于履行提示义务或者说明义务的要求。选项中，甲仅以
设置勾选的方式提示用户并未尽到提示义务。
D项错误，根据《最高人民法院关于适用（中华人民共和国民法典〉合同编通则若干问题的
解释》第十三条规定： “合同存在无效或者可撤销的情形，当事人以该合同已在有关行政管理
部门办理备案、已经批准机关批准或者已依据该合同办理财产权利的变更登记、转移登记等为
由主张合同有效的，人民法院不予支持。”选项中，以办理产权变更登记手续为由，不能主张合
同有效。
故本题选A。`},{id:"q_0002",chapter:"第一章 法律常识",section:"一、总则",q_num:2,source:"2026年．天津市考",stem:"2. [ 2026年．天津市考］根据《民法典》，下列属于无效民事法律行为的是（ ）。",options:[{key:"A",text:"8周岁的甲用压岁钱购买价值千元的游戏机"},{key:"B",text:"甲以举报乙偷税漏税相要挟，迫使乙以低价将房屋卖给自己"},{key:"C",text:"甲因重大误解，将仿品当作古董高价购入"},{key:"D",text:"甲委托乙出售车辆，乙以略低于市场价的价格将车卖给不知情的丙"}],answer:"A",analysis:`。解析：A项错误，根据《中华人民共和国民法典》第十九条规定：“八周岁以上
的未成年人为限制民事行为能力人，实施民事法律行为由其法定代理人代理或者经其法定代理人
同意、追认；但是，可以独立实施纯获利益的民事法律行为或者与其年龄、智力相适应的民事法
律行为。“第一百四十五条第一款规定： ＂限制民事行为能力人实施的纯获利益的民事法律行为
或者与其年龄、智力、精神健康状况相适应的民事法律行为有效；实施的其他民事法律行为经法
定代理人同意或者追认后有效。“本项中，8周岁的甲购买千元游戏机的行为，超出其年龄、智力
认知范围，属于效力待定的民事法律行为。
B项错误，根据《中华人民共和国民法典》第一百五十条规定：“一方或者第三人以胁迫手
段，使对方在违背真实意思的情况下实施的民事法律行为，受胁迫方有权请求人民法院或者仲
裁机构予以撤销。“本项中，甲以举报偷税漏税相要挟迫使乙卖房，属于可撤销的民事法律行为。
C项错误，根据《中华人民共和国民法典》第一百四十七条规定：“基于重大误解实施的民事
法律行为，行为人有权请求人民法院或者仲裁机构予以撤销。“本项中，甲因重大误解购入仿品，
属于可撤销的民事法律行为。
D项错误，根据《中华人民共和国民法典》第一百六十二条规定：“代理人在代理权限内，以被
代理人名义实施的民事法律行为，对被代理人发生效力。“本项中，乙系甲的委托代理人，以略低
于市场价的价格卖给不知情的丙，该代理行为有效。`},{id:"q_0003",chapter:"第一章 法律常识",section:"一、总则",q_num:3,source:"2026年多省联考·福建、河南、甘肃、广西",stem:`3. [ 2026年多省联考·福建、河南、甘肃、广西】诉讼时效是指权利人能行使权利而不行使，
经过法律规定的时间，便丧失了请求法院强制义务人履行义务的权利的时效制度。下列请求权中，
适用诉讼时效的是（ ）。`,options:[{key:"A",text:"公司请求未履行出资义务的股东缴纳其认缴的注册资本"},{key:"B",text:"普通动产的所有权人要求无权占有人返还原物的请求权"},{key:"C",text:"小区业主委员会请求业主补交欠交的住宅专项维修资金"},{key:"D",text:"名誉权受到侵害，受害人请求行为人停止侵害、恢复名誉"}],answer:"B",analysis:`。解析：A项错误，根据《最高人民法院关于适用（中华人民共和国公司法〉若干
问题的规定（三）》第十九条第一款规定：“公司股东未履行或者未全面履行出资义务或者抽逃出
资，公司或者其他股东请求其向公司全面履行出资义务或者返还出资，被告股东以诉讼时效为由
进行抗辩的，人民法院不予支持。“因此，公司请求未履行出资义务的股东缴纳其认缴的注册资
本的请求权不适用诉讼时效。
B项正确，根据《中华人民共和国民法典》第一百九十六条第二项规定：“下列请求权不适
用诉讼时效的规定：（二）不动产物权和登记的动产物权的权利人请求返还财产；“因此，只
有登记的动产物权的权利人请求返还财产不适用诉讼时效，普通动产的所有权人要求无权占有
人返还原物的请求权适用诉讼时效。
C项错误，根据《中华人民共和国民法典》第二百八十一条第一款规定：“建筑物及其附属设
施的维修资金，属于业主共有。经业主共同决定，可以用于电梯、屋顶、外墙、无障碍设      施等
共有部分的维修、更新和改造。建筑物及其附属设施的维修资金的筹集、使用情况应当定期公布。“因
此，维修资金属于业主共有财产，交纳维修资金是业主基于业主身份必须履行的法定义务，目的
是维持“建筑物区分所有权”这一共同体的存续基础，若允许以诉讼时效抗辩，将导致“未交者长期
受益、已交者受损＂，违背了民法典的公平原则。因此，小区业主委员会请求业主补交欠交的住
宅专项维修资金的请求权，因维修资金涉及公共利益和共有义务，不适用诉讼时效。
D项错误，根据《中华人民共和国民法典》第九百九十五条规定：“人格权受到侵害的，受害
人有权依照本法和其他法律的规定请求行为人承担民事责任。受害人的停止侵害、排除妨碍、消除
危险、消除影响、恢复名誉、赔礼道歉请求权，不适用诉讼时效的规定。＂
故本题选B。
二、物权`},{id:"q_0004",chapter:"第一章 法律常识",section:"二、物权",q_num:1,source:"2024年．国考",stem:`1. [ 2024年．国考】老张常居国外，其儿子小张常住老张名下房子内。小张在外欠债较多，
伪造手续后将老张名下房屋卖给了不知情的小王，小王支付对价并办理了产权变更手续。下列有
关说法正确的是（ ）。`,options:[{key:"A",text:"小张与小王之间的买卖合同及物权变动均有效"},{key:"B",text:"小张与小王之间的买卖合同关系有效，但不发生物权变动效力"},{key:"C",text:"因小张伪造手续，该买卖行为无效"},{key:"D",text:"老张有权向小王请求损害赔偿"}],answer:"A",analysis:"【答案解析提示】本题考查【第一章 法律常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0005",chapter:"第一章 法律常识",section:"二、物权",q_num:2,source:"2025年．国考",stem:"2. [ 2025年．国考】关于所有权的取得，下列说法正确的是（ ）。",options:[{key:"A",text:"甲在公园捡到一条金项链，经多方寻找失主未果，此时甲获得项链的所有权"},{key:"B",text:"乙以市价购买了一辆自行车，后发现该车是卖家借来的，乙仍可获得该车的所有权"},{key:"C",text:"丙继承了一处房产，但尚未办理变更登记，丙此时还未获得该房产的所有权"},{key:"D",text:"丁从村集体处承包了一块田地用于农作物种植，丁同时取得这块田地的所有权"}],answer:"B",analysis:`。解析：本题考查法律常识。
A项错误，根据《中华人民共和国民法典》第三百一十四条规定： ＂拾得遗失物，应当返还
权利人。拾得人应当及时通知权利人领取，或者送交公安等有关部门。“因此，甲应当及时通知权
利人领取，或者送交公安等有关部门，甲并不可以获得项链的所有权。
B项正确，根据《中华人民共和国民法典》第三百一十一条第一款规定：＂无处分权人将不
动产或者动产转让给受让人的，所有权人有权追回；除法律另有规定外，符合下列情形的，受
让人取得该不动产或者动产的所有权：（一）受让人受让该不动产或者动产时是善意；（二）以
合理的价格转让；（三）转让的不动产或者动产依照法律规定应当登记的已经登记，不需要登
记的已经交付给受让人。“因此，乙以市价购买了一辆自行车，后发现该车是卖家借来的，乙可
以善意取得该车的所有权。
C项错误，根据《中华人民共和国民法典》第一千一百二十一条规定：＂继承从被继承人死
亡时开始。“第二百三十条规定：“因继承取得物权的，自继承开始时发生效力。“因此，丙对于该
房屋所有权的取得，自继承开始即被继承人死亡时发生效力。
D项错误，根据《中华人民共和国民法典》第三百二十四条规定：“国家所有或者国家所有
由集体使用以及法律规定属于集体所有的自然资源，组织、个人依法可以占有、使用和收益。”因此，
丁对该田地可以依法享有占有、使用和收益的权利，并不享有所有权。
故本题选B。
三、合同`},{id:"q_0006",chapter:"第一章 法律常识",section:"三、合同",q_num:1,source:"2025年．国考",stem:"1. [ 2025年．国考］下列情形中，甲的主张最可能得到人民法院支持的是（ ）。",options:[{key:"A",text:"甲竞买人在现场拍卖中拍得一件艺术品，甲主张合同自拍卖师落槌 时成"},{key:"B",text:"甲乙企业签订的合作备忘录仅表达了双方深度合作的意向，甲主张预约合同成 立"},{key:"C",text:"甲游戏平台在采用格式条款订立合同时，仅以设置勾选的方式提示用户，甲主张己履行 提示义务"},{key:"D",text:"甲与乙的房产买卖合同存在可撤销的情形，但已办理产权变更登记手续，甲以此为由主"}],answer:"A",analysis:`。解析：本题考查法律常识。
A项正确，根据《最高人民法院关于适用（中华人民共和国民法典〉合同编通则若干问题的解
释》第四条第二款规定：“采取现场拍卖、网络拍卖等公开竞价方式订立合同，当事人请求确认合
同自拍卖师落槌、电子交易系统确认成交时成立的，人民法院应予支持。合同成立后，
当事人拒绝签订成交确认书的，人民法院应当依据拍卖公告、竞买人的报价等确定合同内容。”选
项中，拍卖师落槌该合同即成立。
B项错误，根据《最高人民法院关于适用（中华人民共和国民法典〉合同编通则若干问题的
解释》第六条第二款规定：“当事人通过签订意向书或者备忘录等方式，仅表达交易的意向，未约
定在将来一定期限内订立合同，或者虽然有约定但是难以确定将来所要订立合同的主体、标的
等内容，一方主张预约合同成立的，人民法院不予支持。”选项中，甲乙企业签订的合作备忘录
仅表达了双方深度合作的意向，不构成预约合同。
C项错误，根据《最高人民法院关于适用（中华人民共和国民法典〉合同编通则若干问题的
解释》第十条第三款规定：“提供格式条款的一方对其已经尽到提示义务或者说明义务承担
举证责任。对于通过互联网等信息网络订立的电子合同，提供格式条款的一方仅以采取了设置勾
选、弹窗等方式为由主张其已经履行提示义务或者说明义务的，人民法院不予支持，但是其举证
符合前两款规定的除外。”本条前两款是关于履行提示义务或者说明义务的要求。选项中，甲仅以
设置勾选的方式提示用户并未尽到提示义务。
D项错误，根据《最高人民法院关于适用（中华人民共和国民法典〉合同编通则若干问题的
解释》第十三条规定： “合同存在无效或者可撤销的情形，当事人以该合同已在有关行政管理
部门办理备案、已经批准机关批准或者已依据该合同办理财产权利的变更登记、转移登记等为
由主张合同有效的，人民法院不予支持。”选项中，以办理产权变更登记手续为由，不能主张合
同有效。
故本题选A。`},{id:"q_0007",chapter:"第一章 法律常识",section:"三、合同",q_num:2,source:"2018年．事业单位联考",stem:`2. [ 2018年．事业单位联考】甲乙签订房屋买卖合同，约定乙以贷款方式购买甲名下的房
产一套。后因国家房贷政策收紧，乙无法办理贷款。下列说法正确的是（ ）。`,options:[{key:"A",text:"乙可以请求法院变更或解除合同"},{key:"B",text:"房屋产权自合同履行之日起转移"},{key:"C",text:"国家房贷政策的变化属于不可抗力"},{key:"D",text:"甲可以向乙主张违约责任"}],answer:"A",analysis:"【答案解析提示】本题考查【第一章 法律常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0008",chapter:"第一章 法律常识",section:"四、人格权",q_num:1,source:"2025年．江苏省考",stem:`1. [ 2025年．江苏省考】张某与李某同住一个小区，双方发生借款纠纷，张某起诉到法院，
法院判决李某应偿还借款，但李某未履行生效判决。为此，张某在小区业主群向李某讨债，并在
小区公告栏、电梯间等处张贴判决书。李某认为张某侵犯了其个人权益。对此，下列说法正确的是
（ ）。`,options:[{key:"A",text:"张某正当行使权利，其讨债行为不构成侵权"},{key:"B",text:"张某向李某公开讨债，侵犯了李某的名誉权"},{key:"C",text:"张某公开张贴判决书，侵犯了李某的隐私权"},{key:"D",text:"张某应当申请法院强制执行，尤权自行讨债"}],answer:"C",analysis:`。解析：A项错误，C项正确，根据《中华人民共和国民法典》第一于零三十二条
规定：“自然人享有隐私权。任何组织或者个人不得以刺探、侵扰、泄霹、公开等方式侵害他人的
隐私权。隐私是自然人的私人生活安宁和不愿为他人知晓的私密空间、私密活动、私密信息。＂题
中，张某未经许可，将带有李某个人信息的判决书公布到小区，侵犯了李某的隐私权。
B项错误，根据《中华人民共和国民法典》第一千零二十四条规定：“民事主体享有名誉权。
任何组织或者个人不得以侮辱、诽谤等方式侵害他人的名誉权。名誉是对民事主体的品德、声望、
才能、信用等的社会评价。＂题中，张某未经许可，将带有李某个人信息的判决书公布到小区，
并未以侮辱、诽谤等方式侵害李某的名誉权。
D项错误，根据《中华人民共和国民事诉讼法》第二百四十七条规定：“发生法律效力的民
事判决、裁定，当事人必须履行。一方拒绝履行的，对方当事人可以向人民法院申请执行，也可
以由审判员移送执行员执行。调解书和其他应当由人民法院执行的法律文书，当事人必须履行。
一方拒绝履行的，对方当事人可以向人民法院申请执行。“因此，张某可以申请法院强制执行，
但是也有权自行讨债。
故本题选C。`},{id:"q_0009",chapter:"第一章 法律常识",section:"四、人格权",q_num:2,source:"2025年．江苏省考",stem:`2. [ 2025年．江苏省考】燕某、郑某是某小区业主委员会的主任和委员，同时也是业主微信
群的群主和管理员。业主徐某在业主群中发言，质疑业主委员会不依法办事，并与多位业主发生
争执，郑某将其移出群。徐某向燕某投诉，要求重新入群，燕某拒绝并将其拉黑。徐某认为其人
格受到贬损，欲将燕某、郑某起诉至法院，对此，下列说法正确的是（ ）。`,options:[{key:"A",text:"郑某作为管理员不拥有平台赋予的＂踢人“权力"},{key:"B",text:"燕某作为群主将业主徐某拉黑，侵害了其人格权"},{key:"C",text:"入群、退群、移出群等行为不属于民事诉讼受案范围"},{key:"D",text:"业主微信群的群主、管理员没有自主选择群成员的权力"}],answer:"C",analysis:`。解析：A、D两项错误，根据《互联网群组信息服务管理规定》第九条第一款规
定：“互联网群组建立者、管理者应当履行群组管理责任，依据法律法规、用户协议和平台公约，
规范群组网络行为和信息发布，构建文明有序的网络群体空间。”题中，业主微信群的群主、管理
员有权依照规定履行包括将群成员移出群组、自主选择群成员在内的群组管理职责。
B项错误，根据《中华人民共和国民法典》第九百九十条规定：“人格权是民事主体享有的
生命权、身体权、健康权、姓名权、名称权、肖像权、名誉权、荣誉权、隐私权等权利。除
前款规定的人格权外，自然人享有基于人身自由、人格尊严产生的其他人格权益。＂题中，并未
表明燕某发表过对徐某侮辱、诽谤的内容，燕某作为群主将业主徐某拉黑不构成对其人格权的侵
犯。
C项正确，根据《中华人民共和国民事诉讼法》第三条规定：“人民法院受理公民之间、法人
之间、其他组织之间以及他们相互之间因财产关系和人身关系提起的民事诉讼，适用本法的规
定。＂入群、退群、移出群等行为不涉及公民之间的人身和财产关系，不产生民事法律关系，因
此不属于民事诉讼受案范围。
故本题选C。`},{id:"q_0010",chapter:"第一章 法律常识",section:"四、人格权",q_num:3,source:"2016年．山东省考",stem:"3. [ 2016年．山东省考］下列行为侵犯了公民肖像权的是（ ）。",options:[{key:"A",text:"杨某碰到走失儿童小赵，未经其同意将其照片印制在寻亲广告上"},{key:"B",text:"学校未经学生小王同意，将其获奖照片张贴在宣传窗内"},{key:"C",text:"报社未经省委书记同意，将其视察民情的照片刊登在报纸上"},{key:"D",text:"影楼未经张小姐同意，将其个人写真印制在宣传册上"}],answer:"D",analysis:`。解析：《民法典》第1019条规定，任何组织或者个人不得以丑化、污损，或者
利用信息技术手段伪造等方式侵害他人的肖像权。未经肖像权人同意，不得制作、使用、公开肖
像权人的肖像，但是法律另有规定的除外。未经肖像权人同意，肖像作品权利人不得以 发表、复
制、发行、出租、展览等方式使用或者公开肖像权人的肖像。第1020条规定，“合理实施下列行为
的，可以不经肖像权人同意：（一）为个人学习、艺术欣赏、课堂教学或者科学研究，在必要范
围内使用肖像权人已经公开的肖像；（二）为实施新闻报道，不可避免地制作、使用、公开肖像权
人的肖像； （三）为依法履行职责，国家机关在必要范围内制作、使用、公开肖像权人的肖像；
（四）为展示特定公共环境，不可避免地制作、使用、公开肖像权人的肖像；（五）为维护公共
利益或者肖像权人合法权益，制作、使用、公开肖像权人的肖像的其他行为。“A、B、C项属于肖
像的合理使用，并未侵犯肖像权。D项：影楼未经张小姐同意，将其个人写真印制在宣传册上的
行为符合侵犯肖像权的构成要件。故本题选D。
说明：该题目是《民法典》实施之前考查，为了便千掌握知识点，解析直接引用了《民法典》
的规定。需要注意的是，按照考试当年所实施的法律，本题答案仍为D。`},{id:"q_0011",chapter:"第一章 法律常识",section:"四、人格权",q_num:4,source:"2020年．事业单位联考",stem:`4. [ 2020年．事业单位联考】2020年5月28日，十三届全国人大三次会议表决通过的《中华
人民共和国民法典》，首次对“隐私＂的定义作出了规定，并强化了对隐私权的保护。下列选项
中，不属于侵犯隐私权的是（ ）。`,options:[{key:"A",text:"某知名导演钱某未经演员李某同意，将自己与李某私下的微信聊天记录发到网上，以证 明二人关系良好"},{key:"B",text:"某房地产公司职员孙某模仿自己上司刘某在工作中的神态语气并制成视频，未经刘某同 意，将视频公开发布到网上，以增加网络点击量"},{key:"C",text:"某银行应王某债权人的要求，未经王某同意，提供王某在该银行的流水记录，以证明王 某存在隐匿、转移资产的悄况"},{key:"D",text:"某网络视频播放平台未经张某同意，将张某在该平台的观影记录提供给其所任职的政府"}],answer:"C",analysis:`。解析：A项错误，C项正确，根据《中华人民共和国民法典》第一于零三十二条
规定：“自然人享有隐私权。任何组织或者个人不得以刺探、侵扰、泄霹、公开等方式侵害他人的
隐私权。隐私是自然人的私人生活安宁和不愿为他人知晓的私密空间、私密活动、私密信息。＂题
中，张某未经许可，将带有李某个人信息的判决书公布到小区，侵犯了李某的隐私权。
B项错误，根据《中华人民共和国民法典》第一千零二十四条规定：“民事主体享有名誉权。
任何组织或者个人不得以侮辱、诽谤等方式侵害他人的名誉权。名誉是对民事主体的品德、声望、
才能、信用等的社会评价。＂题中，张某未经许可，将带有李某个人信息的判决书公布到小区，
并未以侮辱、诽谤等方式侵害李某的名誉权。
D项错误，根据《中华人民共和国民事诉讼法》第二百四十七条规定：“发生法律效力的民
事判决、裁定，当事人必须履行。一方拒绝履行的，对方当事人可以向人民法院申请执行，也可
以由审判员移送执行员执行。调解书和其他应当由人民法院执行的法律文书，当事人必须履行。
一方拒绝履行的，对方当事人可以向人民法院申请执行。“因此，张某可以申请法院强制执行，
但是也有权自行讨债。
故本题选C。`},{id:"q_0012",chapter:"第一章 法律常识",section:"五、婚姻家庭",q_num:12,source:"2025年．公务员联考（新疆卷）",stem:"[ 2025年．公务员联考（新疆卷）】下列案例中，当事人的主张能够获得法院支持的是",options:[{key:"A",text:"王某以妻子未经自己同意擅自流产为由，主张妻子侵犯自己的生育权，要求进行损害赔偿"},{key:"B",text:"张某与妻子离婚时，以女方一天也没有回家住过为由，主张返还按照习俗给付的18万 元彩礼"},{key:"C",text:"李某认为自己在婚后通过转让发明专利获得的收入为个人财产，主张不能用于偿还夫妻 共同债务"},{key:"D",text:"某父母为已婚女儿出资购房，并约定房屋为女儿所有，其女婿孙某离婚时主张该房屋"}],answer:"B",analysis:`。解析：《民法典》第一于零三十二条规定：“自然人享有隐私权。任何组织或者
个人不得以刺探、侵扰、泄露、公开等方式侵害他人的隐私权。隐私是自然人的私人生活安宁和不
愿为他人知晓的私密空间、私密活动、私密信息。“第一千零三十二条规定：“除法律另有规定或者
权利人明确同意外，任何组织或者个人不得实施下列行为：（一）以电话、短信、即时通讯工具、
电子邮件、传单等方式侵扰他人的私人生活安宁；（二）进入、拍摄、窥
视他人的住宅、宾馆房间等私密空间；（三）拍摄、窥视、窃听、公开他人的私密活动；（四）拍
摄、窥视他人身体的私密部位；（五）处理他人的私密信息；（六）以其他方式侵害他人的隐私
权。＂
A项正确，私下的微信聊天记录属于隐私信息，钱某未经李某同意予以公开，侵犯了李某
的隐私权。
B项错误，神态语气不属于个人的私密和私生活，孙某模仿刘某的神态语气并录制视频发
到网上，不属于侵犯隐私权。
C项正确，银行的流水记录属于私密信息，未经本人同意或有权机关调查，银行不得向他
人提供。该银行违法向他人提供王某的银行流水记录，侵犯了王某的隐私权。
D项正确，张某的观影记录是与公共利益无关的私密活动，网络视频播放平台未经本人同
意擅自提供观影记录的行为，侵犯了张某的隐私权。
本题为选非题，故本题选B。
五、婚姻家庭
【答案】B。解析：A项不能获得法院支持，根据《最高人民法院关于适用（中华人民共和
国民法典〉婚姻家庭编的解释（一）》第二十三条规定：“夫以妻擅自中止妊娠侵犯其生育权为由
请求损害赔偿的，人民法院不予支持；夫妻双方因是否生育发生纠纷，致使感情确已破裂，一方请
求离婚的，人民法院经调解无效，应依照民法典第一于零七十九条第三款第五项的规定处理。
“因此，王某以其妻子未经自己同意擅自流产为由，主张妻子侵犯自己的生育权，该主张无法获
得法院支持。
B项可以获得法院支持，根据《最高人民法院关于适用（中华人民共和国民法典〉婚姻家庭
编的解释（一）》第五条第一款规定：“当事人请求返还按照习俗给付的彩礼的，如果查明属于
以下情形，人民法院应当予以支持：（一）双方未办理结婚登记手续；（二）双方办理结婚登
记手续但确未共同生活； （三）婚前给付并导致给付人生活困难。“因此，张某的情况符合”未
共同生活”的条件，法院可以支持其返还彩礼的请求。
C项不能获得法院支持，根据《中华人民共和国民法典》第一千零六十二条第一款规定：
“夫妻在婚姻关系存续期间所得的下列财产，为夫妻的共同财产，归夫妻共同所有：（一）工
资、奖金、劳务报酬；（二）生产、经营、投资的收益；（三）知识产权的收益；（四）继承或
者受赠的财产，但是本法第一于零六十三条第三项规定的除外；（五）其他应当归共同所有的财
产。“因此，李某在婚后通过转让发明专利获得的收入为共同财产，其主张不能用于偿还夫妻共
同债务，不能获得法院支持。
D项不能获得法院支持，根据《中华人民共和国民法典》第一千零六十三条规定：“下列财产
为夫妻一方的个人财产：（一）一方的婚前财产；（二）一方因受到人身损害获得的赔偿或者补
偿；（三）遗嘱或者赠与合同中确定只归一方的财产；（四）一方专用的生活用品；（五）其他应
当归一方的财产。＂某父母为已婚女儿出资购房，并约定房屋为女儿所有，属于赠与合同中确
定只归一方的财产，因此，该房屋属于其女儿的个人财产，其女婿孙某离婚时主张该房屋属于
家庭共同财产，不能获得法院支持。
故本题选B。
六、继承
l.【答案】A。解析：A项正确，根据《中华人民共和国民法典》第一于零五十三条第一款规
定： ＂一方患有重大疾病的，应当在结婚登记前如实告知另一方；不如实告知的，另一方可以
向人民法院请求撤销婚姻。＂
B项错误，根据《中华人民共和国民法典》第一千一百三十四条至一千一百三十九条规定，法
定的遗嘱的形式有：自书遗嘱、代书遗嘱、打印遗嘱、以录音录像形式立的遗嘱、口头遗嘱和公
证遗嘱六类。没有网络遗嘱这一种类。
C项错误，根据《中华人民共和国民法典》第一千一百二十九条规定：＂丧偶儿媳对公婆，丧
偶女婿对岳父母，尽了主要赡养义务的，作为第一顺序继承人。＂
D项错误，根据《中华人民共和国民法典》第一于零九十八条规定：“收养人应当同时具备
下列条件：（四）无不利于被收养人健康成长的违法犯罪记录＂
故本题选A。`},{id:"q_0013",chapter:"第一章 法律常识",section:"六、继承",q_num:1,source:"2022年．四川省考",stem:"1. [ 2022年．四川省考］根据《中华人民共和国民法典》，下列说法正确的是（ ）。",options:[{key:"A",text:"一方患有重大疾病但未在结婚登记前告知另一方的，另一方可以请求撤销婚姻"},{key:"B",text:"具有民事行为能力的自然人可以通过网络遗嘱的方式处理自己的合法财产"},{key:"C",text:"丧偶儿媳不能作为第一或者第二顺序继承人"},{key:"D",text:"有违法犯罪记录的，不能成为收养人"}],answer:"A",analysis:`。解析：A项错误，根据《中华人民共和国民法典》第十九条规定：“八周岁以上
的未成年人为限制民事行为能力人，实施民事法律行为由其法定代理人代理或者经其法定代理人
同意、追认；但是，可以独立实施纯获利益的民事法律行为或者与其年龄、智力相适应的民事法
律行为。“第一百四十五条第一款规定： ＂限制民事行为能力人实施的纯获利益的民事法律行为
或者与其年龄、智力、精神健康状况相适应的民事法律行为有效；实施的其他民事法律行为经法
定代理人同意或者追认后有效。“本项中，8周岁的甲购买千元游戏机的行为，超出其年龄、智力
认知范围，属于效力待定的民事法律行为。
B项错误，根据《中华人民共和国民法典》第一百五十条规定：“一方或者第三人以胁迫手
段，使对方在违背真实意思的情况下实施的民事法律行为，受胁迫方有权请求人民法院或者仲
裁机构予以撤销。“本项中，甲以举报偷税漏税相要挟迫使乙卖房，属于可撤销的民事法律行为。
C项错误，根据《中华人民共和国民法典》第一百四十七条规定：“基于重大误解实施的民事
法律行为，行为人有权请求人民法院或者仲裁机构予以撤销。“本项中，甲因重大误解购入仿品，
属于可撤销的民事法律行为。
D项错误，根据《中华人民共和国民法典》第一百六十二条规定：“代理人在代理权限内，以被
代理人名义实施的民事法律行为，对被代理人发生效力。“本项中，乙系甲的委托代理人，以略低
于市场价的价格卖给不知情的丙，该代理行为有效。`},{id:"q_0014",chapter:"第一章 法律常识",section:"六、继承",q_num:2,source:"2020年．四川省考",stem:"2. [ 2020年．四川省考］按照我国《民法典》的规定，财产继承的效力顺位为（ ）。",options:[{key:"A",text:"遗嘱继承＞遗赠扶养协议＞法定继承"},{key:"B",text:"法定继承＞遗赠扶养协议＞遗嘱继承"},{key:"C",text:"遗赠扶养协议＞遗嘱继承＞法定继承"},{key:"D",text:"遗赠扶养协议＞法定继承＞遗嘱继承"}],answer:"C",analysis:`。解析：根据《中华人民共和国民法典》第一千一百二十二条规定：＂继承开始
后，按照法定继承办理；有遗嘱的，按照遗嘱继承或者遗赠办理；有遗赠扶养协议的，按照
协议办理。”所以，遗赠扶养协议的效力最高，其次是遗赠或者遗嘱，效力最低的是法定继承。所
以效力顺位是：遗赠扶养协议＞遗嘱继承＞法定继承。故本题选C。
七、侵权贵任
l.【答案】B。解析：A项正确，一方当事人故意告知对方虚假情况，或者故意隐瞒真实情
况，诱使对方当事人作出错误意思表示的，可以认定为欺诈行为。题中，M公司宣称其销售的
门锁具有“生成临时密码”功能，但韩某购买安装后发现并不具备所宣称的功能，因此，M公司
对产品的不实宣传构成欺诈。
B项错误，根据《中华人民共和国民法典》第一百四十八条规定：“一方以欺诈手段，使对
方在违背真实意思的情况下实施的民事法律行为，受欺诈方有权请求人民法院或者仲裁机构予
以撤销。“因此，M公司与韩某之间的买卖合同并不是无效的，而是可撤销的。
C项正确，根据《中华人民共和国消费者权益保护法》第五十五条第一款规定：“经营者提
供商品或者服务有欺诈行为的，应当按照消费者的要求增加赔偿其受到的损失，增加赔偿的金
额为消费者购买商品的价款或者接受服务的费用的三倍；增加赔偿的金额不足五百元的，为五
百元。法律另有规定的，依照其规定。“因此，韩某有权向M公司主张惩罚性赔偿。
D项正确，根据《中华人民共和国民法典》第一百八十六条规定：“因当事人一方的违约行为，
损害对方人身权益、财产权益的，受损害方有权选择请求其承担违约责任或者侵权责任。”违约行为，
是指当事人一方不履行合同义务或履行合同义务不符合约定条件的行为。题中，韩 某购买安装
的M公司销售的智能门锁，并不具备约定的“生成临时密码”功能，M公司的行为构成违约，因
此，韩某有权请求M公司承担违约责任。
本题为选非题，故本题选B。`},{id:"q_0015",chapter:"第一章 法律常识",section:"七、侵权责任",q_num:1,source:"2025年．江苏省考",stem:`1. [ 2025年．江苏省考］M公司在网络购物平台销售一款智能门锁，宣称该门锁具有“生
成临时密码”功能，韩某购买安装该款门锁后，发现并不具备所宣称的功能，该公司回复说需要
额外付费升级系统后才能安装该功能。对此，下列说法不正确的是（ ）。`,options:[{key:"A",text:"M公司对产品的不实宣传构成欺诈"},{key:"C",text:"韩某有权向M公司主张惩罚性赔偿"},{key:"B",text:"M公司与韩某之间的买"},{key:"D",text:"韩某有权"}],answer:"C",analysis:`。解析：根据《中华人民共和国民法典》第一千一百二十二条规定：＂继承开始
后，按照法定继承办理；有遗嘱的，按照遗嘱继承或者遗赠办理；有遗赠扶养协议的，按照
协议办理。”所以，遗赠扶养协议的效力最高，其次是遗赠或者遗嘱，效力最低的是法定继承。所
以效力顺位是：遗赠扶养协议＞遗嘱继承＞法定继承。故本题选C。
七、侵权贵任
l.【答案】B。解析：A项正确，一方当事人故意告知对方虚假情况，或者故意隐瞒真实情
况，诱使对方当事人作出错误意思表示的，可以认定为欺诈行为。题中，M公司宣称其销售的
门锁具有“生成临时密码”功能，但韩某购买安装后发现并不具备所宣称的功能，因此，M公司
对产品的不实宣传构成欺诈。
B项错误，根据《中华人民共和国民法典》第一百四十八条规定：“一方以欺诈手段，使对
方在违背真实意思的情况下实施的民事法律行为，受欺诈方有权请求人民法院或者仲裁机构予
以撤销。“因此，M公司与韩某之间的买卖合同并不是无效的，而是可撤销的。
C项正确，根据《中华人民共和国消费者权益保护法》第五十五条第一款规定：“经营者提
供商品或者服务有欺诈行为的，应当按照消费者的要求增加赔偿其受到的损失，增加赔偿的金
额为消费者购买商品的价款或者接受服务的费用的三倍；增加赔偿的金额不足五百元的，为五
百元。法律另有规定的，依照其规定。“因此，韩某有权向M公司主张惩罚性赔偿。
D项正确，根据《中华人民共和国民法典》第一百八十六条规定：“因当事人一方的违约行为，
损害对方人身权益、财产权益的，受损害方有权选择请求其承担违约责任或者侵权责任。”违约行为，
是指当事人一方不履行合同义务或履行合同义务不符合约定条件的行为。题中，韩 某购买安装
的M公司销售的智能门锁，并不具备约定的“生成临时密码”功能，M公司的行为构成违约，因
此，韩某有权请求M公司承担违约责任。
本题为选非题，故本题选B。`},{id:"q_0016",chapter:"第一章 法律常识",section:"七、侵权责任",q_num:2,source:"2024年．江苏省考",stem:`2. [ 2024年．江苏省考】某日，未取得驾驶证的甲驾驶私家车回家，途中见路人乙向其挥手，
随即停车，乙询问可否无偿搭乘甲的顺风车，甲同意，在后续行驶过程中，甲因接打电话未及
时发现侧方来车，情急之下紧急制动，虽成功避免相撞，但急刹致乙受伤，下列说法正确的是（`,options:[{key:"A",text:"因乙尤偿搭乘，甲不承担责任"},{key:"B",text:"甲应当承担侵权责任"},{key:"C",text:"因甲出于善意，其承担的法律责任应酌悄减轻"},{key:"D",text:"因乙未询问甲是否取得驾驶证，乙自行承担责任"}],answer:"A",analysis:"【答案解析提示】本题考查【第一章 法律常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0017",chapter:"第一章 法律常识",section:"七、侵权责任",q_num:3,source:"2023年．山东省考",stem:`3. [ 2023年．山东省考】某化工厂因排放污水导致周边村民农作物受损歉收，村民起诉化工
厂要求赔偿，下列说法正确的是（ ）。`,options:[{key:"A",text:"若化工厂能够证明未超标排放，即不承担侵权责任"},{key:"B",text:"村民起诉化工厂侵权损害赔偿的诉讼时效为两年"},{key:"C",text:"村民应举证证明化工厂排放污水与农作物受损存在因果关系"},{key:"D",text:"若化工厂能够证明污染损害系不可抗力造成的，不承担赔偿责任"}],answer:"D",analysis:`。解析：A项错误，根据《民法典》第1229条的规定，环境污染致害的赔偿为无
过错责任，并不因为某厂有无过错影响其承担责任。故即便化工厂的污水符合国家规定的污水
排放标准，也应承担责任。B项错误，《环境保护法》第66条规定：“提起环境损害赔偿诉讼的时
效期间为三年，从当事人知道或者应当知道其受到损害时起计算。“C项错误，《民法典》第
1230条规定，因污染环境、破坏生态发生纠纷，行为人应当就法律规定的不承担责任或者减轻
责任的情形及其行为与损害之间不存在囚果关系承担举证责任。D项正确，《水污染防治法》第
96条规定，由于不可抗力造成水污染损害的，排污方不承担赔偿责任；法律另有规定的除外。
故本题选D。`},{id:"q_0018",chapter:"第一章 法律常识",section:"七、侵权责任",q_num:4,source:"公考精选真题",stem:`4. 【2022年．山东省考】根据《中华人民共和国民法典》关于侵权责任的规定，下列说法正确
的是（ ）。`,options:[{key:"A",text:"张某因工作太忙，委托邻居肖某代为照顾12岁女儿小张。因肖某疏忽，致使小张重伤 另一儿童，此时张某无须承担责任"},{key:"B",text:"王某在某直播带货平台购得零食一箱，吃坏了肚子，可直接向卖家索赔"},{key:"C",text:"赵某在小区避狗时没牵绳，致使狗将同小区小李咬伤，后经警方调查为李某故意挑逗所 致，赵某可免责"},{key:"D",text:"丁某在某栋居民楼下行走，被高空抛出的物品砸伤，经调查难以确定具体侵权人，该栋"}],answer:"C",analysis:`。解析：根据《中华人民共和国民法典》第一千一百二十二条规定：＂继承开始
后，按照法定继承办理；有遗嘱的，按照遗嘱继承或者遗赠办理；有遗赠扶养协议的，按照
协议办理。”所以，遗赠扶养协议的效力最高，其次是遗赠或者遗嘱，效力最低的是法定继承。所
以效力顺位是：遗赠扶养协议＞遗嘱继承＞法定继承。故本题选C。
七、侵权贵任
l.【答案】B。解析：A项正确，一方当事人故意告知对方虚假情况，或者故意隐瞒真实情
况，诱使对方当事人作出错误意思表示的，可以认定为欺诈行为。题中，M公司宣称其销售的
门锁具有“生成临时密码”功能，但韩某购买安装后发现并不具备所宣称的功能，因此，M公司
对产品的不实宣传构成欺诈。
B项错误，根据《中华人民共和国民法典》第一百四十八条规定：“一方以欺诈手段，使对
方在违背真实意思的情况下实施的民事法律行为，受欺诈方有权请求人民法院或者仲裁机构予
以撤销。“因此，M公司与韩某之间的买卖合同并不是无效的，而是可撤销的。
C项正确，根据《中华人民共和国消费者权益保护法》第五十五条第一款规定：“经营者提
供商品或者服务有欺诈行为的，应当按照消费者的要求增加赔偿其受到的损失，增加赔偿的金
额为消费者购买商品的价款或者接受服务的费用的三倍；增加赔偿的金额不足五百元的，为五
百元。法律另有规定的，依照其规定。“因此，韩某有权向M公司主张惩罚性赔偿。
D项正确，根据《中华人民共和国民法典》第一百八十六条规定：“因当事人一方的违约行为，
损害对方人身权益、财产权益的，受损害方有权选择请求其承担违约责任或者侵权责任。”违约行为，
是指当事人一方不履行合同义务或履行合同义务不符合约定条件的行为。题中，韩 某购买安装
的M公司销售的智能门锁，并不具备约定的“生成临时密码”功能，M公司的行为构成违约，因
此，韩某有权请求M公司承担违约责任。
本题为选非题，故本题选B。`},{id:"q_0019",chapter:"第一章 法律常识",section:"四、重要罪名",q_num:1,source:"2024年．国考",stem:"1. [ 2024年．国考］下列哪种情形，我国刑法不具有管辖权？（",options:[{key:"A",text:"甲国公民在我国国际机场里给乙国公民下毒，乙国公民出境后毒发身亡"},{key:"B",text:"我国公民在甲国境内，对甲国公民实施绑架行为"},{key:"C",text:"在从我国出发己行驶至甲国的国际列车上，甲国公民对乙国公民实施抢劫"},{key:"D",text:"我国公民在我国境内，通过电话教暧在甲国的甲国公民故意杀人"}],answer:"C",analysis:`。解析：《刑法》第六条规定，凡在中华人民共和国领域内犯罪的，除法律有特
别规定的以外，都适用本法。凡在中华人民共和国船舶或者航空器内犯罪的，也适用本法。犯
罪的行为或者结果有一项发生在中华人民共和国领域内的，就认为是在中华人民共和国领域
内犯罪。C项中国际列车行驶至甲国，不符合属地管辖。甲国公民对乙国公民实施抢劫不符合属
人管辖及保护管辖。故本题选C。`},{id:"q_0020",chapter:"第一章 法律常识",section:"四、重要罪名",q_num:2,source:"2023年．国考",stem:"2. [ 2023年．国考】关于电信诈骗，下列说法错误的是（ ）。",options:[{key:"A",text:"非法使用“伪基站“实施电信诈骗的以非法侵入计算机信息系统罪追究刑事责任"},{key:"B",text:"实施电信诈骗最高可被判处尤期徒刑"},{key:"C",text:"电信诈骗受害人可以通过诉讼程序要求服务存在缺陷的电信运营商承担相应责任"},{key:"D",text:"负责招募他人实施电信网络诈骗犯罪活动的，以共同犯罪论处"}],answer:"A",analysis:`。解析：A项说法错误，《关于办理电信网络诈骗等刑事案件适用法律若干问题的
意见》规定： ＂（一）在实施电信网络诈骗活动中，非法使用＇伪基站＇｀黑广播＇，干扰无线
电通讯秩序，符合刑法第二百八十八条规定的，以扰乱无线电通讯管理秩序罪追究刑事     责
任。同时构成诈骗罪的，依照处罚较重的规定定罪处罚。“B项说法正确，《刑法》第二百六十六
条规定： ＂诈骗公私财物，数额较大的，处三年以下有期徒刑、拘役或者管制，并处或者单处罚
金；数额巨大或者有其他严重情节的，处三年以上十年以下有期徒刑，并处罚金；数额特别巨大
或者有其他特别严重情节的，处十年以上有期徒刑或者无期徒刑，并处罚金或者没收财产。本法
另有规定的，依照规定。“C项说法正确，《反电信网络诈骗法》第四十六条第二款规定：“电信业
务经营者、银行业金融机构、非银行支付机构、互联网服务提供者等违反本法规定，造成他人损
害的，依照《中华人民共和国民法典》等法律的规定承担民事责任。＂第六条第五款规定：“电信
业务经营者、银行业金融机构、非银行支付机构、互联网服务提供者承担风险防控责任，建立反
电信网络诈骗内部控制机制和安全责任制度，加强新业务涉诈风险安全评估。“D项说法正确，
《关于办理电信网络诈骗等刑事案件适用法律若干问题的意见》规定：“负责招募他人实施电信网
络诈骗犯罪活动，或者制作、提供诈骗方案、术语清单、语音包、信息等的，以诈骗共同犯罪论处。
“故本题选A。`},{id:"q_0021",chapter:"第一章 法律常识",section:"四、重要罪名",q_num:3,source:"2019年．国考",stem:"3. [ 2019年．国考】下列犯罪行为应以盗窃罪论处的是（ ）。",options:[{key:"A",text:"甲窃得价值5000元的手机一部，被发现后持械抗拒抓捕"},{key:"B",text:"乙窃得同事的信用卡一张，并用其消费10000元"},{key:"C",text:"丙在火车上检到价值50000元的提包一只，经失主催要后拒不归还"},{key:"D",text:"丁为某私营公司的销售主管，在销售过程中私自将价值50000元的产品据为己有"}],answer:"A",analysis:"【答案解析提示】本题考查【第一章 法律常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0022",chapter:"第一章 法律常识",section:"四、重要罪名",q_num:4,source:"2022年．国考",stem:"4. [ 2022年．国考］下列甲乙丙丁的行为构成利用影响力受贿罪的是（ ）。",options:[{key:"A",text:"甲为某生态环境局副局长，某项目经理王某为减轻环境行政罚款向其行贿5万元，后甲 向下属监察大队负责人打招呼撤销罚款决定"},{key:"B",text:"乙为某市场监督管理局局长，某项目经理张某为减轻国土资源行政罚款向其行贿5万元， 后乙向自然资源局领导打招呼望撤销罚款决定"},{key:"C",text:"丙为某税务局公务员，其夫为教育局局长，丙收受李某5万元并通过其夫职权解决李某 小孩跨区入学问题，其夫不知情"},{key:"D",text:"丁为某教育局局长，其妻为私企员工，私下收受刘某5万元并通过其夫职权解决刘某小"}],answer:"A",analysis:"【答案解析提示】本题考查【第一章 法律常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0023",chapter:"第一章 法律常识",section:"第三讲法理学",q_num:1,source:"2025年．多省联考",stem:"1. [ 2025年．多省联考】下列关于法规的表述，正确的是（ ）。",options:[{key:"A",text:"国家监察委员会根据宪法、法律和行政法规，制定监察法规"},{key:"B",text:"《中华人民共和国军事设施保护法》和《国际军事合作工作条例》都属于军事法规"},{key:"C",text:"地方性法规是指各地方政府按照宪法、法律、行政法规的规定制定的规范性法律文件"},{key:"D",text:"党内法规是体现党的统一意志，规范党的领导和党的建设活动、依靠党的纪律保证实施"}],answer:"C",analysis:`。解析：《刑法》第三百八十八条规定，国家工作人员利用本人职权或者地位形成
的便利条件，通过其他国家工作人员职务上的行为，为请托人谋取不正当利益，索取请托人财物
或者收受请托人财物的，以受贿论处。第三百八十八条之一规定，国家工作人员的近亲属或者其
他与该国家工作人员关系密切的人，通过该国家工作人员职务上的行为，或者利用该国家工作人
员职权或者地位形成的便利条件，通过其他国家工作人员职务上的行为，为请托人谋取不正当利
益，索取请托人财物或者收受请托人财物，数额较大或者有其他较重情节的，处三年以下有期徒
刑或者拘役，并处罚金；数额巨大或者有其他严重悄节的，处三年以上七年以下有期徒刑，并处
罚金；数额特别巨大或者有其他特别严重情节的，处七年以上有期徒刑，并处罚金或者没收财产。
离职的国家工作人员或者其近亲属以及其他与其关系密切的人，利用该离职的国家工作人员原职
权或者地位形成的便利条件实施前款行为的，依照前款的规定定罪处罚。甲、乙、丁构成受贿罪，
A项、B项、D项错误。丙构成利用影响力受贿罪，C项正确。故
本题选C。
第三讲
法理学
l．［答案］仄解析：A项错误，根据《中华人民共和国立法法》第一百一十八条规定：“国家
监察委员会根据宪法和法律、全国人民代表大会常务委员会的有关决定，制定监察法规，报全国人
民代表大会常务委员会备案。“因此，国家监察委员会制定监察法规的根据包含宪法和法律、全
国人民代表大会常务委员会的有关决定，并不包括行政法规。
B项错误，根据《中华人民共和国立法法》第十条第三款规定：“全国人民代表大会常务委
员会制定和修改除应当由全国人民代表大会制定的法律以外的其他法律；在全国人民代表大会
闭会期间，对全国人民代表大会制定的法律进行部分补充和修改，但是不得同该法律的基本原
则相抵触。“第一百一十七条规定：“中央军事委员会根据宪法和法律，制定军事法规。＂由此说
明，《中华人民共和国军事设施保护法》属于法律，由全国人民代表大会常务委员会制定。《国际
军事合作工作条例》属于军事法规，由中央军委制定。
C项错误，根据《中华人民共和国立法法》第八十条规定：“省、自治区、直辖市的人民代表
大会及其常务委员会根据本行政区域的具体情况和实际需要，在不同宪法、法律、行政法规相抵
触的前提下，可以制定地方性法规。“第八十一条第一款规定：“设区的市的人民代表大会及其常
务委员会根据本市的具体情况和实际需要，在不同宪法、法律、行政法规和本省、自治区的地方
性法规相抵触的前提下，可以对城乡建设与管理、生态文明建设、历史文化保护、基层治理等方面
的事项制定地方性法规“因此，地方性法规是由特定的地方人大及其常委会制定，并非地方
政府制定。
D项正确，根据《中国共产党党内法规制定条例》第三条第一款规定：“党内法规是党的中央
组织，中央纪律检查委员会以及党中央工作机关和省、自治区、直辖市党委制定的体现党的统一
意志、规范党的领导和党的建设活动、依靠党的纪律保证实施的专门规章制度。＂
故本题选D。`},{id:"q_0024",chapter:"第一章 法律常识",section:"第三讲法理学",q_num:2,source:"2024年．国考",stem:"2. [ 2024年．国考】根据《中华人民共和国立法法》，下列说法错误的是（ ）。",options:[{key:"A",text:"国家监察委员会可以向全国人大常委会提出法律案"},{key:"B",text:"县级人大常委可以对基层治理方面的事项制定地方性法规"},{key:"C",text:"设区的市人大常委会可以根据实际需要设立基层立法联系点"},{key:"D",text:"法律草案的说明应当包括起草过程中对重大分歧意见的协调处理情况"}],answer:"C",analysis:`。解析：《刑法》第三百八十八条规定，国家工作人员利用本人职权或者地位形成
的便利条件，通过其他国家工作人员职务上的行为，为请托人谋取不正当利益，索取请托人财物
或者收受请托人财物的，以受贿论处。第三百八十八条之一规定，国家工作人员的近亲属或者其
他与该国家工作人员关系密切的人，通过该国家工作人员职务上的行为，或者利用该国家工作人
员职权或者地位形成的便利条件，通过其他国家工作人员职务上的行为，为请托人谋取不正当利
益，索取请托人财物或者收受请托人财物，数额较大或者有其他较重情节的，处三年以下有期徒
刑或者拘役，并处罚金；数额巨大或者有其他严重悄节的，处三年以上七年以下有期徒刑，并处
罚金；数额特别巨大或者有其他特别严重情节的，处七年以上有期徒刑，并处罚金或者没收财产。
离职的国家工作人员或者其近亲属以及其他与其关系密切的人，利用该离职的国家工作人员原职
权或者地位形成的便利条件实施前款行为的，依照前款的规定定罪处罚。甲、乙、丁构成受贿罪，
A项、B项、D项错误。丙构成利用影响力受贿罪，C项正确。故
本题选C。
第三讲
法理学
l．［答案］仄解析：A项错误，根据《中华人民共和国立法法》第一百一十八条规定：“国家
监察委员会根据宪法和法律、全国人民代表大会常务委员会的有关决定，制定监察法规，报全国人
民代表大会常务委员会备案。“因此，国家监察委员会制定监察法规的根据包含宪法和法律、全
国人民代表大会常务委员会的有关决定，并不包括行政法规。
B项错误，根据《中华人民共和国立法法》第十条第三款规定：“全国人民代表大会常务委
员会制定和修改除应当由全国人民代表大会制定的法律以外的其他法律；在全国人民代表大会
闭会期间，对全国人民代表大会制定的法律进行部分补充和修改，但是不得同该法律的基本原
则相抵触。“第一百一十七条规定：“中央军事委员会根据宪法和法律，制定军事法规。＂由此说
明，《中华人民共和国军事设施保护法》属于法律，由全国人民代表大会常务委员会制定。《国际
军事合作工作条例》属于军事法规，由中央军委制定。
C项错误，根据《中华人民共和国立法法》第八十条规定：“省、自治区、直辖市的人民代表
大会及其常务委员会根据本行政区域的具体情况和实际需要，在不同宪法、法律、行政法规相抵
触的前提下，可以制定地方性法规。“第八十一条第一款规定：“设区的市的人民代表大会及其常
务委员会根据本市的具体情况和实际需要，在不同宪法、法律、行政法规和本省、自治区的地方
性法规相抵触的前提下，可以对城乡建设与管理、生态文明建设、历史文化保护、基层治理等方面
的事项制定地方性法规“因此，地方性法规是由特定的地方人大及其常委会制定，并非地方
政府制定。
D项正确，根据《中国共产党党内法规制定条例》第三条第一款规定：“党内法规是党的中央
组织，中央纪律检查委员会以及党中央工作机关和省、自治区、直辖市党委制定的体现党的统一
意志、规范党的领导和党的建设活动、依靠党的纪律保证实施的专门规章制度。＂
故本题选D。`},{id:"q_0025",chapter:"第一章 法律常识",section:"四、中央因家机关",q_num:1,source:"2025年·浙江省考",stem:`1. [ 2025年·浙江省考】中华人民共和国是全国各族人民共同缔造的统一的多民族国家。下
列有关表述不正确的是（ ）。`,options:[{key:"A",text:"“多元一体”是中华民族的显著特征"},{key:"B",text:"民族自治地方的自治机关是自治区、自治州、自治县的人民代表大会和人民政府"},{key:"C",text:"民族自治地方的少数民族干部具有优先任用权，自治区主席、自治州州长、自治县县长 除外"},{key:"D",text:"加强对青少年的历史文化教育，全面推广普及国家通用语言文字，全面推行使用国家统"}],answer:"C",analysis:`。解析：A选项说法正确。2022年3月5日，习近平在参加十三届全国人大五次
会议内蒙古代表团审议时的讲话指出：“我国是统一的多民族国家，中华民族多元一体是我国
的一个显著特征。“多元一体，既体现了充分郫重“多元”，坚持平等和谐，又凸显了高度认同
“一体”，不断同、聚力。
B选项说法正确。《宪法》第112规定：“民族自治地方的自治机关是自治区、自治州、自治
县的人民代表大会和人民政府。＂
C选项说法错误。《宪法》第113条第2款规定：“自治区、自治州、自治县的人民代表大会
常务委员会中应当有实行区域自治的民族的公民担任主任或者副主任。“第114条规定： “自治
区主席、自治州州长、自治县县长由实行区域自治的民族的公民担任。”即：自治区主席、自治州
州长、自治县县长只能由本民族的公民担任，自治区、自治州、自治县的人大常委会的主任或者
副主任至少有一个是本民族公民。“除外”说法错误。
D选项说法正确。2024年9月27日，习近平在全国民族团结进步表彰大会上指出，加强
对青少年的历史文化教育，全面推广普及国家通用语言文字，全面推行使用国家统编教材，把
中华民族共同体意识从小就植入孩子们的、灵。
故本题选C。`},{id:"q_0026",chapter:"第一章 法律常识",section:"四、中央因家机关",q_num:2,source:"公考精选真题",stem:`2. 【2024年．事业单位联考A类】根据《中华人民共和国宪法》，下列哪项属于我国公民
的基本权利？（ ）
• 依照法律服兵役和参加民兵组织
• 维护国家统一和全国各民族团结
• 对任何国家机关和工作人员提出批评和建议
也在年老、疾病的情况下，从国家和社会获得物质帮助`,options:[{key:"A",text:"• 、"},{key:"B",text:"• 、 c.、@"},{key:"D",text:"• @"}],answer:"D",analysis:`。解析：、错误，《宪法》第五十五条第二款规定：“依照法律服兵役和参加民兵
组织是中华人民共和国公民的光荣义务。“因此，依照法律服兵役和参加民兵组织是公民的基本
义务，而非基本权利。、错误，《宪法》第五十二条规定：“中华人民共和国公民有维护国家统一
和全国各民族团结的义务。“因此，维护国家统一和全国各民族团结是公民的基本义务，而非基
本权利。、正确，《宪法》第四十一条第一款规定：“中华人民共和国公民对于任何国家机关和国
家工作人员，有提出批评和建议的权利；对于任何国家机关和国家工作人员的违法失职行为，
有向有关国家机关提出申诉、控告或者检举的权利，但是不得捏造或者歪曲
事实进行诬告陷害。“因此，对任何国家机关和工作人员提出批评和建议是公民的基本权利。、
正确，《宪法》第四十五条第一款规定：“中华人民共和国公民在年老、疾病或者丧失劳动能力的
情况下，有从国家和社会获得物质帮助的权利。国家发展为公民享受这些权利所需要的社会保
险、社会救济和医疗卫生事业。“因此，在年老、疾病的情况下，从国家和社会获得物质帮助是公
民的基本权利。故本题选D。`},{id:"q_0027",chapter:"第一章 法律常识",section:"四、中央因家机关",q_num:3,source:"2019年．国考",stem:"3. [ 2019年．国考］根据我国宪法和有关法律，下列国家机关的哪一做法不符合规定？",options:[{key:"A",text:"某市监察委员会决定对涉嫌行贿的某公司法定代表人实行留置"},{key:"B",text:"某自治州人民代表大会常务委员会制定城市环境管理的地方性法规"},{key:"C",text:"某县人民法院执行民事案件时要求被执行人提供手机微信记录"},{key:"D",text:"中国证券监督管理委员会依法制定有关上市公司的监管规章"}],answer:"A",analysis:"【答案解析提示】本题考查【第一章 法律常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0028",chapter:"第一章 法律常识",section:"五、行政诉讼",q_num:1,source:"2024年．国考",stem:"1. [ 2024年．国考］下列做法符合《中华人民共和国行政处罚法》规定的是（ ）。",options:[{key:"A",text:"甲综合行政执法局责令孙某限期拆除其违法建筑"},{key:"B",text:"某变电站项目建成六年后，乙生态环境局发现其系”未批先建“，处以罚款"},{key:"C",text:"某公司因某次违规代开发票被丙税务部门罚款三次"},{key:"D",text:"丁市场监督管理局对王某作出行政拘留七日并罚款一于元的处罚"}],answer:"A",analysis:`。解析：《行政处罚法》第三十六条规定，违法行为在二年内未被发现的，不再给
予行政处罚；涉及公民生命健康安全、金瞧安全且有危害后果的，上述期限延长至五年。法律另
有规定的除外。前款规定的期限，从违法行为发生之日起计算；违法行为有连续或者继续状态的，
从行为终了之日起计算。环境保护部在《关于建设项目“未批先建“违法行为法律适用问题的意见》
（环政法函［2018 J  31号）中明确指出，根据上述法律规定，“未批先建“违法行为的行政处罚
追溯期限应当自建设行为终了之日起计算。因此，“未批先建“违法行为自建设行为终了之日起二
年内未被发现的，环保部门应当遵守行政处罚法第二十九条（行政处罚法修改后为上述第三十六
条）的规定，不予行政处罚。B项不符合规定。第二十九条规定，对当事人的同一个违法行为，
不得给予两次以上罚款的行政处罚。同一个违法行为违反多个法律规范应当给予罚款处罚的，
按照罚款数额高的规定处罚。C项不符合规定。第十八条规定，国家在城市管理、市场监管、生
态环境、文化市场、交通运输、应急管理、农业等领域推行建立综合行政执法制度，相对集中行
政处罚权。国务院或者省、自治区、直辖市人民政府可以决定一个行政机关行使有关行政机关的
行政处罚权。限制人身自由的行政处罚权只能由公安机关和法律规定的其他机关行使。D项不符
合规定。故本题选A。`},{id:"q_0029",chapter:"第一章 法律常识",section:"五、行政诉讼",q_num:29,source:"公考精选真题",stem:"1超格学员专用1",options:[{key:"B",text:"建设单位乙在申请建筑工程施工许可证时，因申请材料不全被拒绝，乙不服"},{key:"C",text:"公务员丙不能胜任工作，其所属行政机关作出降职处理决定，丙不服"},{key:"D",text:"工人丁提出工伤认定申请，当地人力资源和社会保障局作出不予受理决定，丁不服"}],answer:"C",analysis:`。解析：A项正确，根据《中华人民共和国行政复议法》第十一条第一项规定： “有
下列情形之一的，公民、法人或者其他组织可以依照本法申请行政复议：（一）对行政机
关作出的行政处罚决定不服。“根据《中华人民共和国行政处罚法》第九条规定：“行政处罚的种
类：（一）警告、通报批评；（二）罚款、没收违法所得、没收非法财物；（三）暂扣许可证件、
降低资质等级、吊销许可证件；（四）限制开展生产经营活动、责令停产停业、责令关闭、限制
从业；（五）行政拘留；（六）法律、行政法规规定的其他行政处罚。＂吊销餐饮服务许可证属
千行政处罚，因此，餐馆甲有权申请行政复议。
B项正确，根据《中华人民共和国行政复议法》第十一条第三项规定：“有下列情形之一的，
公民、法人或者其他组织可以依照本法申请行政复议：（三）申请行政许可，行政机关拒绝或
者在法定期限内不予答复，或者对行政机关作出的有关行政许可的其他决定不服。“建设单位乙
在申请建筑工程施工许可证时，因申请材料不全被拒绝，属于对行政机关作出的有关行政许可
的决定不服，建设单位乙有权申请行政复议。
C项错误，根据《中华人民共和国行政复议法》第十二条第三项规定：“下列事项不属于行
政复议范围：（三）行政机关对行政机关工作人员的奖惩、任免等决定。＂针对公务员丙作出的
降职处理决定，属于对行政机关工作人员的奖惩、任免等决定，不在行政复议范围之内。 D项
正确，根据《中华人民共和国行政复议法》第十一条第七项规定：“有下列情形之一
的，公民、法人或者其他组织可以依照本法申请行政复议：（七）对行政机关作出的不予受理工
伤认定申请的决定或者工伤认定结论不服。“工人丁提出工伤认定申请，当地人力资源和社会保
障局作出不予受理决定，属于对行政机关作出的不予受理工伤认定申请的决定不服，工人丁有
权申请行政复议。
本题为选非题，故本题选C。`},{id:"q_0030",chapter:"第一章 法律常识",section:"五、行政诉讼",q_num:3,source:"2025年．国考",stem:`3. [ 2025年．国考】2024年5月，甲驾驶重型半挂车行驶至某县辖区内被交警临检。该县公
安局交警大队认定甲存在驾驶故意污损机动车号牌的机动车在道路上行驶的行为，遂当场作出
罚款200元、记9分的处罚决定。甲认为其不存在故意污损号牌的行为，对处罚决定不服。下列
说法正确的是（ ）。`,options:[{key:"A",text:"甲可以不经行政复议，直接向人民法院提起行政诉讼"},{key:"B",text:"甲若申请行政复议，复议机关为该县公安局"},{key:"C",text:"甲若申请行政复议，不适用简易程序审理"},{key:"D",text:"甲若申请行政复议，该案可适用调韶"}],answer:"D",analysis:`。解析：本题考查法律常识。
A项错误，根据《中华人民共和国行政复议法》第二十三条第一款第一项规定：“有下列情
形之一的，申请人应当先向行政复议机关申请行政复议，对行政复议决定不服的，可以再依法
向人民法院提起行政诉讼： （一）对当场作出的行政处罚决定不服；＂题中，县公安局交警大
队是当场对甲作出罚款200元、记9分的处罚决定，甲对此不服应当先向行政复议机关申请行
政复议，对行政复议决定不服的，可以再依法向人民法院提起行政诉讼，不得直接向人民法院
提起行政诉讼。
B项错误，根据《中华人民共和国行政复议法》第二十四条第一款第一项规定： ＂县级以上
地方各级人民政府管辖下列行政复议案件：（一）对本级人民政府工作部门作出的行政行为不
服的；＂题中，甲对行政处罚决定不服，则县公安局为被申请人，复议机关为县政府，而不是
县公安局。
C项错误，根据《中华人民共和国行政复议法》第五十三条第一款第一项规定：“行政复议
机关审理下列行政复议案件，认为事实清楚、权利义务关系明确、争议不大的，可以适用简易
程序：（一）被申请行政复议的行政行为是当场作出；＂题中，县公安局交警大队是当场对甲
作出罚款200元、记9分的处罚决定，依法可以适用简易程序审理。
D项正确，根据《中华人民共和国行政复议法》第五条第一款：“行政复议机关办理行政复议
案件，可以进行调韶。“因此，甲若申请行政复议，该案可适用调解。
故本题选D。
第六讲公
职法
l．【答案】A。解析：《中华人民共和国公职人员政务处分法》第十四条规定：“公职人员犯罪，
有下列情形之一的，予以开除：（一）因故意犯罪被判处管制、拘役或者有期徒刑以上刑罚（含
宣告缓刑）的；（二）因过失犯罪被判处有期徒刑，刑期超过三年的；（三）因犯罪被单处或
者并处剥夺政治权利的。因过失犯罪被判处管制、拘役或者三年以下有期徒刑的，一般应当予以
开除；案件情况特殊，予以撤职更为适当的，可以不予开除，但是应当报请上一级机关批准。
公职人员因犯罪被单处罚金，或者犯罪情节轻微，人民检察院依法作出不起诉决定或者人民法
院依法免予刑事处罚的，予以撤职；造成不良影响的，予以开除。“甲因故意犯罪被判处有期徒
刑以上，应予以开除，而非撤职。A项错误。乙交通肇事犯罪情节轻微，检察院对其不起诉，予
以撤职符合上述规定。B项正确。丙犯盗窃罪被单处罚金，予以撤职符合上述规定。C项正确。丁
虽为故意犯罪，但人民法院依法免予刑事处罚，予以撤职符合上述规定。D项正确。本题为选非
题，故本题选A。`},{id:"q_0031",chapter:"第一章 法律常识",section:"三、监察法",q_num:1,source:"2022年．国考",stem:"1. [ 2022年．国考】根据《中华人民共和国公职人员政务处分法》，下列哪一处分不恰当？",options:[{key:"A",text:"甲系某行政主管部门公务员，犯故意伤害罪被判处有期徒刑六个月，缓刑一年，被撤职"},{key:"B",text:"乙系交通运输部门公务员，交通肇事犯罪悄节轻微，检察机关对其作出不起诉决定，乙 被撤职"},{key:"C",text:"丙系某国有企业管理人员，犯盗窃罪被单处罚金，被撤职"},{key:"D",text:"丁系某公办高校事业编管理人员，犯侵占罪但被免予刑事处罚，被撤职"}],answer:"D",analysis:`。解析：本题考查法律常识。
A项错误，根据《中华人民共和国行政复议法》第二十三条第一款第一项规定：“有下列情
形之一的，申请人应当先向行政复议机关申请行政复议，对行政复议决定不服的，可以再依法
向人民法院提起行政诉讼： （一）对当场作出的行政处罚决定不服；＂题中，县公安局交警大
队是当场对甲作出罚款200元、记9分的处罚决定，甲对此不服应当先向行政复议机关申请行
政复议，对行政复议决定不服的，可以再依法向人民法院提起行政诉讼，不得直接向人民法院
提起行政诉讼。
B项错误，根据《中华人民共和国行政复议法》第二十四条第一款第一项规定： ＂县级以上
地方各级人民政府管辖下列行政复议案件：（一）对本级人民政府工作部门作出的行政行为不
服的；＂题中，甲对行政处罚决定不服，则县公安局为被申请人，复议机关为县政府，而不是
县公安局。
C项错误，根据《中华人民共和国行政复议法》第五十三条第一款第一项规定：“行政复议
机关审理下列行政复议案件，认为事实清楚、权利义务关系明确、争议不大的，可以适用简易
程序：（一）被申请行政复议的行政行为是当场作出；＂题中，县公安局交警大队是当场对甲
作出罚款200元、记9分的处罚决定，依法可以适用简易程序审理。
D项正确，根据《中华人民共和国行政复议法》第五条第一款：“行政复议机关办理行政复议
案件，可以进行调韶。“因此，甲若申请行政复议，该案可适用调解。
故本题选D。
第六讲公
职法
l．【答案】A。解析：《中华人民共和国公职人员政务处分法》第十四条规定：“公职人员犯罪，
有下列情形之一的，予以开除：（一）因故意犯罪被判处管制、拘役或者有期徒刑以上刑罚（含
宣告缓刑）的；（二）因过失犯罪被判处有期徒刑，刑期超过三年的；（三）因犯罪被单处或
者并处剥夺政治权利的。因过失犯罪被判处管制、拘役或者三年以下有期徒刑的，一般应当予以
开除；案件情况特殊，予以撤职更为适当的，可以不予开除，但是应当报请上一级机关批准。
公职人员因犯罪被单处罚金，或者犯罪情节轻微，人民检察院依法作出不起诉决定或者人民法
院依法免予刑事处罚的，予以撤职；造成不良影响的，予以开除。“甲因故意犯罪被判处有期徒
刑以上，应予以开除，而非撤职。A项错误。乙交通肇事犯罪情节轻微，检察院对其不起诉，予
以撤职符合上述规定。B项正确。丙犯盗窃罪被单处罚金，予以撤职符合上述规定。C项正确。丁
虽为故意犯罪，但人民法院依法免予刑事处罚，予以撤职符合上述规定。D项正确。本题为选非
题，故本题选A。`},{id:"q_0032",chapter:"第一章 法律常识",section:"三、监察法",q_num:2,source:"2026年．国考",stem:"2. [ 2026年．国考】下列情形不符合《中华人民共和国监察法》及其实施条例规定的是",options:[{key:"A",text:"监察人员李某涉赚职务犯罪，监察机关决定对其采取15日禁闭措施"},{key:"B",text:"办理监察事项的监察人员黄某系监察对象刘某的丈夫，黄某应自行回避"},{key:"C",text:"再派出的监察专员王某在开展监察工作过程中，受派出他的监察机构领导"},{key:"D",text:"公务员张某在怀孕期间因涉娥严重职务违法被监察机关调查，经监察机关依法审批，对"}],answer:"A",analysis:`。解析：《中华人民共和国监察法》第六十四条第一款规定：＂监察人员涉嫌严重
职务违法或者职务犯罪，为防止造成更为严重的后果或者恶劣影响，监察机关经依法审批，可以
对其采取禁闭措施。禁闭的期限不得超过七日。“因此A选项说法错误。当选。
《中华人民共和国监察法》第六十七条： ＂办理监察事项的监察人员有下列情形之一的，应
当自行回避，监察对象、检举人及其他有关人员也有权要求其回避：（一）是监察对象或者检举
人的近亲属的；“因此B选项正确。
《中华人民共和国监察法实施条例》第十四条第二款规定：“再派出监察机构、监察专员开展
监察工作，受派出它的监察机构、监察专员领导。“因此C选项正确。
《中华人民共和国监察法》第二十三条： ”被调查人涉嫌严重职务违法或者职务犯罪，并有
下列情形之一的，经监察机关依法审批，可以对其采取责令候查措施：（二）符合留置条件，
但患有严重疾病、生活不能自理的，系怀孕或者正在哺乳自己婴儿的妇女，或者生活不能自理的
人的唯一扶养人；“因此D选项正确。
故本题选A。`},{id:"q_0033",chapter:"第二章 人文历史常识",section:"通用",q_num:1,source:"2026年．国考（行政执法、副省）",stem:`1. [ 2026年．国考（行政执法、副省）】《贺新郎．读史》是毛泽东创作的咏史词，高度凝
练了人类社会发展历程。下列相关说法不恰当的是（ ）。`,options:[{key:"A",text:"在“只几个石头磨过“时人类学会了用火"},{key:"B",text:"成汤创立商朝是“五帝三皇神圣事”之一"},{key:"C",text:"利篇是＂铜铁炉中翻火焰”时代留下的器物"},{key:"D",text:"”更陈王奋起挥黄钺＂揭开了秦末农民起义的序幕"}],answer:"B",analysis:`。解析：A选项说法恰当。词中“只几个石头磨过，小儿时节。“把石头磨成石器。
石器时代是人类的“小儿时节”，即童年时代。石器时代的人类已掌握用火技术，主要通过保存天
然火种和人工取火（如击石、钻木）获取火源。
B选项说法不恰当。五帝三皇神圣事：传说中国上古有三皇五帝，是最高尚最有才能的神
圣人物。孔安国作《尚书序》、皇甫谧作《帝王世纪》，以伏毅、神农、黄帝为三皇。司马迁
《五帝本纪》以黄帝、颜顼、帝砦、唐尧、虞舜为五帝。成汤创立商朝是在三皇五帝之后。
C选项说法恰当。铜铁炉中翻火焰：指青铜器时代和铁器时代。青铜器和铁器都要用炉火来
冶炼和翻铸。利筒，是一件西周武王时期的标准器皿，也是目前中国发现的最早的西周青铜器。
D选项说法恰当。陈王：秦未农民起义领袖陈胜，他进占陈县（今河南淮阳县）时称王。故
本题选B。`},{id:"q_0034",chapter:"第二章 人文历史常识",section:"通用",q_num:2,source:"2026年．多省公务员联考",stem:"2. [ 2026年．多省公务员联考】关于我国考古发现，下列说法错误的是（ ）。",options:[{key:"A",text:"良渚文化主要分布于太湖地区，其文化遗址最大特色是所出土的玉器"},{key:"B",text:"仰韶文化主要分布在黄河支流汇集的中原地区，其中较著名的是元谋人遗址"},{key:"C",text:"大汶口文化主要分布在泰山周围地区，氏族墓地中晚期出现了男女合葬现象"},{key:"D",text:"龙山文化是新石器时代晚期的文化，其陶器已开始使用轮制技术，器型规整"}],answer:"A",analysis:"【答案解析提示】本题考查【第二章 人文历史常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0035",chapter:"第二章 人文历史常识",section:"通用",q_num:3,source:"2026年．多省联考．黑龙江、辽宁、内蒙古",stem:`3. [ 2026年．多省联考．黑龙江、辽宁、内蒙古］如果要拍摄一部反映中华文明源远流长演
进历程的纪录片，下列可作为第一个奴隶制王朝解说词的是（ ）。`,options:[{key:"A",text:"这是中国历史上第一个有文献可考，并为考古学和甲骨文所证实的都城遗址"},{key:"B",text:"制礼作乐旨在使社会保持稳定，充满和谐之美，华夏文明由此进入以札乐文明为代表符 号的时代"},{key:"C",text:"无论在西安的汉唐都城宫殿遗址，还是迄今保留最为完整的北京故宫，我们都能发现它 们与二里头相似的宫殿建筑机制，二里头宫殿无疑是他们的祖先"},{key:"D",text:"铁农具开始出现，耕作能力大大提高，很多人在公田劳动之外开垦荒地，成为私田。私"}],answer:"C",analysis:`。解析：中国历史上第一个奴隶制王朝是夏朝。
A项错误，殷墟是商朝后期都城遗址，位于河南安阳，是中国历史上第一个有文献可考、
并为考古学和甲骨文所证实的都城遗址，对应的是商朝，与夏朝无关。而商朝是继夏朝之后的
奴隶制王朝，并非中国历史上第一个奴隶制王朝。
B项错误， ”制礼作乐”是西周时期周公为维护等级制度、规范社会秩序所推行的文化与政
治制度。礼乐制度的确立，标志着华夏文明进入礼乐文明阶段，但西周属于奴隶制王朝的鼎盛与
后期阶段，远晚于第一个奴隶制王朝夏朝。
C项正确，二里头遗址位千河南洛阳，被学术界主流认定为夏代中晚期都城遗址，是夏朝
的重要考古实证。二里头宫殿开创了中国古代宫殿建筑的基本规制与布局机制，对后世汉唐都城、
北京故宫等宫殿建筑都产生了深远影响，对应第一个奴隶制王朝夏朝。
D项错误，铁农具开始出现、私田大量开垦是春秋战国时期生产力发展与土地制度变革的
重要表现。这一时期，随着铁器牛耕的普及，井田制逐步瓦解，土地私有制开始发展，标志着
奴隶制社会逐渐解体，封建社会逐步形成。春秋战国时期远晚千第一个奴隶制王朝夏朝。
故本题选C。
二、古代经济
l.【答案】A。解析：A选项说法错误。记录文字中描述的“何家村窖藏的金碗银壶”“鉴
金舞马衔杯纹银壶”是唐代文物，出土于陕西西安何家村。而“马王堆遗址”是位于湖南长沙的西
汉墓葬遗址，以辛追夫人、素纱禅衣、帛画等文物闻名。两者在时代、地域和文物属性上均不相关，
因此将对何家村文物的描述对应马王堆遗址错误。
B选项说法正确。太和殿，又称“金銮殿”，位千北京故宫博物院内，是紫禁城（故宫）中
最大的殿宇。太和殿坐落于气势恢宏的三层汉白玉须弥座之上，这一设计既彰显了皇权的至高
无上，其层叠的造型和洁白的石材也赋予了建筑庄严与飘逸并存的美感。描述符合北京故宫太
和殿的建筑特征。
C选项说法正确。西夏陵位千宁夏银川西侧的贺兰山前戈壁滩，2025年7月11     B,被联合
国教科文组织列入《世界遗产名录》。陵区现存众多穷土陵台与残垣，呈星罗棋布之势，在苍茫的
天地间尽显历史的沧桑与神秘。描述与西夏陵的实际风貌和地理环境相符。
D选项说法正确。敦煌莫高窟开凿在呜沙山的崖壁上，洞窟密集如蜂房，层层叠叠，内部
保存了跨越于年的精美佛教壁画与雕塑，是举世闻名的佛教艺术宝库。描述准确抓住了莫高窟
的外观特点和核心文化价值。
故本题选A。`},{id:"q_0036",chapter:"第二章 人文历史常识",section:"二、古代经济",q_num:1,source:"2026年．国考（副省）",stem:`1. [ 2026年．国考（副省）］某学生假期参观历史古迹并写下记录。下列古迹与记录文字
对应错误的是（ ）。`,options:[{key:"A",text:"马王堆遗址一—何家村窖藏的金碗银壶在射灯下流淌着暗光，鉴金舞马衔杯纹银壶上的 骏马俯首献酒"},{key:"B",text:"北京故宫 气势恢宏的三层汉白玉须弥座犹如层叠的云，将金碧辉煌的太和殿高高托 起，威严之外添了几分神秘与飘逸"},{key:"C",text:"西夏陵 漫步千贺兰山前的戈壁滩，星罗棋布的古冢在眼前铺展，高低错落的残垣在 风中静立，仿佛正缓缓撩开岁月的面纱"},{key:"D",text:"敦煌莫高窟 朴实无华的山岗间，洞窟犹如蜂房一般，层层叠叠，保留了千年佛教艺"}],answer:"C",analysis:`。解析：中国历史上第一个奴隶制王朝是夏朝。
A项错误，殷墟是商朝后期都城遗址，位于河南安阳，是中国历史上第一个有文献可考、
并为考古学和甲骨文所证实的都城遗址，对应的是商朝，与夏朝无关。而商朝是继夏朝之后的
奴隶制王朝，并非中国历史上第一个奴隶制王朝。
B项错误， ”制礼作乐”是西周时期周公为维护等级制度、规范社会秩序所推行的文化与政
治制度。礼乐制度的确立，标志着华夏文明进入礼乐文明阶段，但西周属于奴隶制王朝的鼎盛与
后期阶段，远晚于第一个奴隶制王朝夏朝。
C项正确，二里头遗址位千河南洛阳，被学术界主流认定为夏代中晚期都城遗址，是夏朝
的重要考古实证。二里头宫殿开创了中国古代宫殿建筑的基本规制与布局机制，对后世汉唐都城、
北京故宫等宫殿建筑都产生了深远影响，对应第一个奴隶制王朝夏朝。
D项错误，铁农具开始出现、私田大量开垦是春秋战国时期生产力发展与土地制度变革的
重要表现。这一时期，随着铁器牛耕的普及，井田制逐步瓦解，土地私有制开始发展，标志着
奴隶制社会逐渐解体，封建社会逐步形成。春秋战国时期远晚千第一个奴隶制王朝夏朝。
故本题选C。
二、古代经济
l.【答案】A。解析：A选项说法错误。记录文字中描述的“何家村窖藏的金碗银壶”“鉴
金舞马衔杯纹银壶”是唐代文物，出土于陕西西安何家村。而“马王堆遗址”是位于湖南长沙的西
汉墓葬遗址，以辛追夫人、素纱禅衣、帛画等文物闻名。两者在时代、地域和文物属性上均不相关，
因此将对何家村文物的描述对应马王堆遗址错误。
B选项说法正确。太和殿，又称“金銮殿”，位千北京故宫博物院内，是紫禁城（故宫）中
最大的殿宇。太和殿坐落于气势恢宏的三层汉白玉须弥座之上，这一设计既彰显了皇权的至高
无上，其层叠的造型和洁白的石材也赋予了建筑庄严与飘逸并存的美感。描述符合北京故宫太
和殿的建筑特征。
C选项说法正确。西夏陵位千宁夏银川西侧的贺兰山前戈壁滩，2025年7月11     B,被联合
国教科文组织列入《世界遗产名录》。陵区现存众多穷土陵台与残垣，呈星罗棋布之势，在苍茫的
天地间尽显历史的沧桑与神秘。描述与西夏陵的实际风貌和地理环境相符。
D选项说法正确。敦煌莫高窟开凿在呜沙山的崖壁上，洞窟密集如蜂房，层层叠叠，内部
保存了跨越于年的精美佛教壁画与雕塑，是举世闻名的佛教艺术宝库。描述准确抓住了莫高窟
的外观特点和核心文化价值。
故本题选A。`},{id:"q_0037",chapter:"第二章 人文历史常识",section:"二、古代经济",q_num:2,source:"2026年多省联考．辽宁、内蒙古",stem:`2.[ 2026年多省联考．辽宁、内蒙古】文史爱好者小刘于假期先后游览了四座博物馆（院），分
别欣赏了以下四件代表性文物藏品。小刘先后游览的博物馆（院）最有可能是（ ）。`,options:[{key:"A",text:"殷墟博物馆、三星堆博物馆、良渚博物院、秦始皇帝陵博物院"},{key:"B",text:"良渚博物院、殷墟博物馆、三星堆博物馆、秦始皇帝陵博物院"},{key:"C",text:"秦始皇帝陵博物院、三星堆博物馆、殷墟博物馆、良渚博物院"},{key:"D",text:"秦始皇帝陵博物院、三星堆博物馆、良渚博物院、殷墟博物馆"}],answer:"C",analysis:`。解析：图1是秦始皇陵兵马俏中的跪射桶，出土于二号坑弩兵方阵核、，其左
腿曲蹲、右膝着地的持弓姿态生动再现了秦军作战场景，现收藏于秦始皇帝陵博物院。
图2是三星堆青铜人头像，1986年于四川广汉三星堆一、二号祭祀坑首次发现，2021至
2022年新出土于三号、八号祭祀坑，现收藏于三星堆博物馆。
图3是商代青铜恶，青铜恶是商代典型青铜礼器、酒器，特征为三足、两柱、一鉴，纹饰以
兽面纹为主，是商晚期都城殷墟文化的核、器物之一，主要收藏于殷墟博物馆。
图4是良渚玉璧，玉璧是良渚文化中最重要的礼器，以精美的玉质、规整的形制为特征，
是长江下游新石器时代良渚文明的代表性器物，现收藏千良渚博物院。
综上，依次是秦始皇帝陵博物院、三星堆博物馆、殷墟博物馆、良渚博物院。故本
题选C。`},{id:"q_0038",chapter:"第二章 人文历史常识",section:"二、古代经济",q_num:3,source:"2024年．国考．地市级",stem:`3. [ 2024年．国考．地市级］某地将要举办一场主题为“星汉灿烂——追溯两汉科技”的学术
交流会，下列论文题目最不可能出现在这次交流会上的是（ ）。`,options:[{key:"A",text:"太初历制定中的年干支变化"},{key:"B",text:"水运仪象台复原研究新探"},{key:"C",text:"《汜胜之书》中的栽培技术及区种法探析"},{key:"D",text:"试论直辕犁的推广及其对农业生产的影响"}],answer:"B",analysis:`。解析：A项可能出现，太初历是汉武帝时期制定的一种历法，是中国古代一部
比较完整的历法。B项不可能出现，水运仪象台是北宋时期苏颂、韩公廉等人发明制造的以漏刻
水力驱动的，集天文观测、天文演示和报时系统为一体的大型自动化天文仪器。C项可能出现，
《汜胜之书》是西汉晚期的一部重要农学著作，一般认为是中国现存最早的一部农书。 D项可能
出现，西汉出现的直辕犁，只有犁头和扶手，比较适合在平原地区使用。故本题选B。
三、古代科技`},{id:"q_0039",chapter:"第二章 人文历史常识",section:"三、古代科技",q_num:1,source:"2026年·浙江省考",stem:"1. [ 2026年·浙江省考］下列诗句提及的历史上的著名关隘，不在长城上的是（ ）。",options:[{key:"A",text:"居庸关上子规啼，饮马流泉落日低"},{key:"B",text:"羌笛何须怨杨柳，春风不度玉门关"},{key:"C",text:"峰峦如聚，波涛如怒，山河表里潼关路"},{key:"D",text:"山一程，水一程，身向榆关那畔行，夜深千帐灯"}],answer:"A",analysis:"【答案解析提示】本题考查【第二章 人文历史常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0040",chapter:"第二章 人文历史常识",section:"三、古代科技",q_num:2,source:"公考精选真题",stem:"2. 【2020年．四川省考】下列哪句古诗描写的旅行方向与其他三句明显不同？（ ）",options:[{key:"A",text:"朝辞臼帝彩云间，于里江陵一日还"},{key:"B",text:"即从巴峡穿巫峡，便下襄阳向洛阳"},{key:"C",text:"故人西辞黄鹤楼，烟花三月下扬州"},{key:"D",text:"夜发清溪向三峡，思君不见下渝州"}],answer:"B",analysis:`。解析：A项正确，“朝辞白帝彩云间，千里江陵一日还”出自唐朝诗人李白的
《早发白帝城》。白帝城位于今重庆市奉节县城东白帝山，江陵指今湖北江陵县，因此旅行方向
为由西至东。B项错误，  ”即从巴峡穿巫峡，便下襄阳向洛阳”出自唐朝诗人杜甫的《闻官军收
河南河北》。诗中巴峡在今重庆境内，襄阳今属湖北，洛阳今属河南，诗人从四川回故乡河南，
旅行方向为由南向北。C项正确，“故人西辞黄鹤楼，烟花三月下扬州”出自唐朝诗人李白的《黄
鹤楼送孟浩然之广陵》。黄鹤楼位于今湖北武汉市武昌蛇山的黄鹄矶，扬州地处江苏省中部，因
此旅行方向为由西至东。D项正确，“夜发清溪向三峡，思君不见下渝州”出自唐朝诗人李白的
《峨眉山月歌》。清溪指清溪驿，属四川键为，在峨眉山附近，渝州位千今重庆一带，因此旅行
方向为由西至东。本题为选非题，故本题选B。`},{id:"q_0041",chapter:"第二章 人文历史常识",section:"三、古代科技",q_num:3,source:"2025年．四川省考",stem:"3. [ 2025年．四川省考】下列古诗旬中出现的时辰与现代24小时制对应时间错误的是",options:[{key:"A",text:"二条九陌丽城限，万户千门平旦开一3时到5时"},{key:"B",text:"山高树多日出迟，食时雾露且雾靠一7时到9时"},{key:"C",text:"人定犹行背街鼓，月高还去打僧房 17时到19时"},{key:"D",text:"姑苏城外寒山寺，夜半钟声到客船一23时到1时"}],answer:"C",analysis:`。解析：A选项说法正确。“三条九陌丽城喂，万户千门平旦开“出自唐代骆宾王的
《帝京篇》，描写了长安城清展的繁华景象。“平旦”指的是寅时，是早晨天刚亮的时候，即每天的
3时—5时。
B选项说法正确。“山高树多日出迟，食时雾露且雾靠“出自宋代王质的《东流道中》，描写
了东流一带早晨太阳出来的景象。“食时”指的是辰时，大约是上午吃早饭的时间，即每天的7
时—9时。
C选项说法错误。“人定犹行背街鼓，月高还去打借房”出自唐代诗人王建的《寄杨十二秘
书》，描写了诗人夜晚在古寺中的活动情景。“人定”指的是亥时，这是指人们应该休息的时间，
一般在21时至23时之间，而不是17时到19时。
D选项说法正确。＂姑苏城外寒山寺，夜半钟声到客船”出自唐代诗人张继的《枫桥夜泊》。 “夜
半”指的是子时，也就是午夜，对应十二时辰的子时，即23时—1时。
故本题选C。
四、古代文化`},{id:"q_0042",chapter:"第二章 人文历史常识",section:"四、古代文化",q_num:1,source:"2026年．多省公务员联考",stem:`1. [ 2026年．多省公务员联考】中华法系源远流长，中华优秀传统法律文化蕴含丰富法治
思想和深邃政治智慧，是中华文化瑰宝。关于中华优秀传统法律文化，下列说法错误的是（ ）。`,options:[{key:"A",text:"“民胞物与“出自《墨子》"},{key:"C",text:"“仁，人、也”记载在《孟子》中"},{key:"B",text:"“礼法并施“是荀子的主要思想"},{key:"D",text:"古代”录囚“体现了“仁＂的精神"}],answer:"A",analysis:`。解析：A选项表述错误。选项词句出自北宋张载《西铭》，原文为：“民，吾同胞；
物，吾与也。”意思为：把所有人当作同胞，把万物当作朋友。体现仁爱万物、天下一家的博大胸
怀。
B选项表述正确。“礼法并施“是战国后期思想家荀子提出的政治理念，主张将儒家礼制与
法家法治相结合。“礼法并施“以“性恶论”为基础，主张＂札高于法，法以礼为原则”,二者统合
于治理模式。
C选项表述正确。选项词句出自《孟子·告子上》，意思是：仁，是人本来就有的善、、本、。
D选项表述正确。录囚（也作＂虑囚＂）是古代一种司法复核制度，上级官员／皇帝定期审
问、检查在押囚犯，纠正错案、平反冤案、宽赦轻罪。录囚强调慎刑、恤刑、爱惜人命，不滥杀、
不冤枉，是儒家仁政、仁爱精神在司法里的体现。
故本题选A。`},{id:"q_0043",chapter:"第二章 人文历史常识",section:"四、古代文化",q_num:2,source:"2026年．四川省考",stem:`2. [ 2026年．四川省考】与苏轼光彩夺目的文学艺术成就比起来，他的仕宦之旅却跌右起
伏。在40年的仕宦之旅中，他任职过的地方就多达十五处。在这些地方任上他给我们留下了许多
脍炙人口的千古诗篇。下列诗词涉及地点从北到南顺序正确的是（ ）。
• 九死南荒吾不恨，兹游奇绝冠平生 、日啖荔枝三百颗，不辞长作岭南人
• 大江东去，浪淘尽，千古风流人物`,options:[{key:"A",text:"• 、岔）"},{key:"B",text:"• CD@"},{key:"C",text:"• ?C"},{key:"D",text:"3. [ 2020年．国考］下列言论中涉及到的人才选拔制度，按出现顺序先后排列正确的是"},{key:"D",text:"• ?CD"}],answer:"A",analysis:"【答案解析提示】本题考查【第二章 人文历史常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0044",chapter:"第二章 人文历史常识",section:"四、古代文化",q_num:44,source:"公考精选真题",stem:`不得为属
籍
中风吹金
榜落凡世，
三十三人
名字香`,options:[{key:"B",text:"• (2)@(j) c．、中、"},{key:"D",text:"• 、 、3"}],answer:"A",analysis:`。解析：本题考查人文常识。、“学通行修，经中博士“反映的是察举制。察举制
是西汉时期选拔官吏的一种制度，它的主要特征是由地方长官在辖区内随时考察、选取人才并推
荐给上级或中央，经过试用考核再任命官职。、 ＂宗室非有军功论，不得为属籍”出自司马迁
《史记·商君列传》，反映的是军功爵制。军功爵制的出现和确立，在先秦军事史上具有划时代的意
义，事实上，由于军功爵制的实行，列国也都程度不同地收到了富国强兵的效果。 @“九品访人，
唯问中正“反映的是九品中正制。九品中正制，又称九品官人法，是魏晋南北
朝时期重要的选官制度，是曹丕采纳吏部尚书陈群的意见，命其制定的制度。中“风吹金榜落凡
世，三十三人名字香“反映的是科举制。科举是通过考试选拔官吏，具有分科考试，取士权归于
中央所有，允许自由报考和主要以成绩定取舍等显著的特点。科举制从隋朝开始实行。按出现顺
序先后排列正确的是、CD、、。故本题选A。
五、古代艺术
l．【答案】B。解析：A项正确，＂妙手丹青”中的“丹青“确实指代两种矿物染料。“丹”指朱砂，
是一种红色的矿物颜料；“青”指石青（如蓝铜矿）或曾青，是一种蓝色的矿物颜料。因此，该成
语字面上包含了两种矿物染料，用来借代绘画艺术。
B项错误，《清明上河图》是由北宋画家张择端绘制的长卷，其绘制材质是＂绢＂（一种丝
织品），而非纸张。同时，画作中运用了色彩渲染，属于“设色”作品，而非单纯的水墨画。因此
《清明上河图》并非纸本水墨画，而是绢本设色风俗画。
C项正确，＂胸有成竹”出自苏轼的《文与可画贺笃谷偃竹记》，是苏轼评价表兄文同（文与
可）画竹时，、中先有完整意象，再下笔作画，因此是苏轼对文同的评价。
D项正确，“点染”是中国古代的一种绘画技法。根据记载，北齐颜之推在《颜氏家训．杂艺》
中提到“武烈太子偏能写真，坐上宾客，随宜点染，即成数人＂。在古代画论中，“点染无法”也
被列为绘画十二忌之一，指设色时点染不得法，可见其作为一种技法的客观存在。
本题为选非题，故本题选B。`},{id:"q_0045",chapter:"第二章 人文历史常识",section:"五、古代艺术",q_num:1,source:"2026年．多省公务员联考",stem:"1. [ 2026年．多省公务员联考】下列关于我国古代绘画说法错误的是（ ）。",options:[{key:"A",text:"“妙手丹青”中包含两种矿物染料"},{key:"B",text:"《清明上河图》是纸本水墨画"},{key:"C",text:'"'},{key:"D",text:"“点染”是一种古代绘画技法"}],answer:"A",analysis:`。解析：本题考查人文常识。、“学通行修，经中博士“反映的是察举制。察举制
是西汉时期选拔官吏的一种制度，它的主要特征是由地方长官在辖区内随时考察、选取人才并推
荐给上级或中央，经过试用考核再任命官职。、 ＂宗室非有军功论，不得为属籍”出自司马迁
《史记·商君列传》，反映的是军功爵制。军功爵制的出现和确立，在先秦军事史上具有划时代的意
义，事实上，由于军功爵制的实行，列国也都程度不同地收到了富国强兵的效果。 @“九品访人，
唯问中正“反映的是九品中正制。九品中正制，又称九品官人法，是魏晋南北
朝时期重要的选官制度，是曹丕采纳吏部尚书陈群的意见，命其制定的制度。中“风吹金榜落凡
世，三十三人名字香“反映的是科举制。科举是通过考试选拔官吏，具有分科考试，取士权归于
中央所有，允许自由报考和主要以成绩定取舍等显著的特点。科举制从隋朝开始实行。按出现顺
序先后排列正确的是、CD、、。故本题选A。
五、古代艺术
l．【答案】B。解析：A项正确，＂妙手丹青”中的“丹青“确实指代两种矿物染料。“丹”指朱砂，
是一种红色的矿物颜料；“青”指石青（如蓝铜矿）或曾青，是一种蓝色的矿物颜料。因此，该成
语字面上包含了两种矿物染料，用来借代绘画艺术。
B项错误，《清明上河图》是由北宋画家张择端绘制的长卷，其绘制材质是＂绢＂（一种丝
织品），而非纸张。同时，画作中运用了色彩渲染，属于“设色”作品，而非单纯的水墨画。因此
《清明上河图》并非纸本水墨画，而是绢本设色风俗画。
C项正确，＂胸有成竹”出自苏轼的《文与可画贺笃谷偃竹记》，是苏轼评价表兄文同（文与
可）画竹时，、中先有完整意象，再下笔作画，因此是苏轼对文同的评价。
D项正确，“点染”是中国古代的一种绘画技法。根据记载，北齐颜之推在《颜氏家训．杂艺》
中提到“武烈太子偏能写真，坐上宾客，随宜点染，即成数人＂。在古代画论中，“点染无法”也
被列为绘画十二忌之一，指设色时点染不得法，可见其作为一种技法的客观存在。
本题为选非题，故本题选B。`},{id:"q_0046",chapter:"第二章 人文历史常识",section:"五、古代艺术",q_num:2,source:"2025年．多省公务员联考",stem:"2. [ 2025年．多省公务员联考】下列关于汉字的表述错误的是（ ）。",options:[{key:"A",text:"甲骨文的内容多为＂卜辞”"},{key:"B",text:"“书同文”中的“文”指的是大篆"},{key:"C",text:"“钟鸣鼎食”中的两种器具均是金文的载体"},{key:"D",text:"隶书是篆书的化繁为简，化圆为方，化弧为直"}],answer:"B",analysis:`。解析：
A项正确，甲骨文，主要流行千商周时期，又称＂契文”“甲骨卜辞＂，是迄今为止中国发
现的年代最早的成熟文字系统。因商朝的人大都迷信鬼神，大事小事都要卜问，故甲骨文的内
容大部分是殷商王室占卜的记录，即“卜辞”。
B项错误，“书同文”是秦始皇统一六国后推行的政策，以秦国的小篆为标准，统一全国文
字，这里的“文”指的是小篆，而不是大篆。
C项正确，“钟鸣鼎食”出自《史记·货殖列传》，钟：古代乐器；鼎：古代炊器，二者都是青铜
器，而金文指的是铸造在殷商与周朝青铜器上的铭文，所以这两种器具均是金文的载体。
D项正确，隶书是由篆书演变而来的，它简化了篆书的结构，将篆书的圆转笔画改为方折，
化繁为简，化圆为方，化弧为直。
本题为选非题，故本题选B。`},{id:"q_0047",chapter:"第二章 人文历史常识",section:"五、古代艺术",q_num:4,source:"2025年．多省公务员联考",stem:"4. [ 2025年．多省公务员联考】下列诗句与其所描述的乐器对应正确的是（ ）。",options:[{key:"A",text:"昆山玉碎风凰叫，芙蓉泣露香兰笑 二胡"},{key:"B",text:"锦瑟无端五十弦，一弦一柱思华年 古筝"},{key:"C",text:"曲终收拨当、画，四弦一声如裂帛 笙簇"},{key:"D",text:"几年调弄七条丝，元化分功十指知 古琴"}],answer:"D",analysis:`。解析：
A项错误，“昆山玉碎风凰叫，芙蓉泣露香兰笑”出自唐代李贺的《李凭笙簇引》，意思是乐
声清脆得就像昆仑山的美玉被击碎，风凰在呜叫；时而又像芙蓉在露水中饮泣，像兰花迎风开
放笑语轻柔。通过“玉碎”“风凰叫＂等意象描述笙簇的清脆音色和奇幻音效，诗句所描述的乐器
是笙簇，而非二胡。
B项错误，“锦瑟无端五十弦，一弦一柱思华年”出自唐代李商隐的《锦瑟》，意思是精美的
瑟为什么有五十根弦，一弦一柱都叫我追忆青春年华。＂瑟”是中国传统弹拨乐器，早期有五十
弦，后演变为二十五弦，而古筝通常为二十一弦，两者形制不同。诗旬明确指向瑟，而非古筝。
C项错误，“曲终收拨当、画，四弦一声如裂帛”出自唐代白居易的《琵琶行》，意思是一曲终
了拨子从弦索中间划过四弦，一声轰呜好像撕裂了布帛。“四弦“直接点明诗旬所描述的乐器为琵
琶，而非签簇。
D项正确，“几年调弄七条丝，元化分功十指知”出自唐代方干的《听段处士弹琴》，意思是
弹琴者花费了数年时间来涸弄琴弦，深知通过十指的巧妙运用，能够将自然的变化和美妙
融入到音乐之中。“七条丝“明确指出了所弹乐器为古琴，古琴以七弦为基本形制，且诗句强调
“十指“拨弄的技法，符合古琴演奏特点。
故本题选D。
六、党史大事件`},{id:"q_0048",chapter:"第二章 人文历史常识",section:"六、党史大事件",q_num:1,source:"2026年．多省公务员联考",stem:`1. [ 2026年．多省公务员联考】中国共产党党报党刊的发展历程，与中国共产党的奋斗历
程密不可分。下列说法错误的是（ ）。`,options:[{key:"A",text:"《布尔塞维克》是解放战争时期中国共产党创办的中央机关刊物"},{key:"B",text:"《人民日报》由《晋察冀日报》和晋冀鲁豫《人民日报》合并而来"},{key:"C",text:"《红色中华》创刊于江西瑞金，初期为中华苏维埃共和国临时中央政府机关报"},{key:"D",text:"《求是》杂志是党中央指导全党全国工作的重要思想理论阵地，前身是中共中央主办的"}],answer:"A",analysis:`。解析：
A错误，《布尔塞维克》是中共中央在第二次国内革命战争时期的地下理论机关刊物。1927
年10月24日在上海创刊，1932年7月出至5卷1期后停刊。解放战争时期是1946年至1949年。
B正确，《人民日报》是中国共产党中央委员会机关报。1948年6月15  B,由《晋察冀日报》
和晋冀鲁豫《人民日报》合并而成的中共华北局机关报《人民日报》在河北省平山县里庄创刊，毛
泽东同志为该报题写报头。
C正确，1931年12月11日，《红色中华》创刊千江西瑞金，初期为中华苏维埃共和国临时
中央政府机关报。
D正确，《求是》杂志是中国共产党中央委员会主办的机关刊物，是党中央指导全党全国工
作的重要思想理论阵地。《求是》杂志创刊于1988年7月1日，其前身是1958年创办的《红旗》杂
志。毛泽东为《红旗》亲笔题写了刊名。邓小平为《求是》亲笔题写了刊名。
故本题选A。`},{id:"q_0049",chapter:"第二章 人文历史常识",section:"六、党史大事件",q_num:2,source:"2026年·山东省考",stem:`2. [ 2026年·山东省考】革命纪念馆是汲取奋进力量、传承红色基因，进行爱国主义教育的重
要场所。下列爱国主义教育主题与革命纪念馆对应正确的是（ ）。
• ”伟大的开端”——中国共产党第一次全国代表大会纪念馆、”
开国第一战” 抗美援朝纪念馆
• “铁窗犹见坚壮志“ 雨花台烈士纪念馆
• ”历史转折、始创新型人民军队“ 南湖革命纪念馆`,options:[{key:"A",text:"0)(2)@"},{key:"B",text:"• 、d c．、、、"},{key:"D",text:"(2)@@"}],answer:"A",analysis:`。解析：、对应正确。中共一大（中国共产党第一次全国代表大会）于1921年
在上海召开（后转移至浙江嘉兴南湖），标志着中国共产党的诞生，被广泛称为“伟大的开端”。
2021年中国共产党第一次全国代表大会纪念馆举办“伟大的开端一中国共产党创建历史陈
列＂，庆祝中国共产党成立100周年精品展览。
• 对应正确。抗美援朝（又称：抗美援朝战争、抗美援朝运动），是20世纪so年代新中
国成立之初，中国人民在中国共产党领导下，为援助朝鲜人民，保卫国家安全而进行的一场反
侵略正义战争。抗美援朝纪念馆2021年5月已开展举办的庆祝中国共产党成立100周年精品展
览正是以“开国第一战”为主题。
• 对应正确。铁窗犹见坚壮志 雨花英烈狱中斗争革命文物展，是江苏南京雨花台烈士
纪念馆千2021年6月至2021年10月举办的庆祝中国共产党成立100周年精品展览。展览以雨
花英烈的狱中斗争为主线，突出了他们面对酷刑和死亡时坚守信仰、舍生取义的事迹。例如，赵
良璋、丁行等烈士在被捕后仍秘密传递情报、刻印信物，体现了“铁窗”中的坚定斗志。
• 对应错误。南湖革命纪念馆的“红船起航一一南湖革命纪念馆基本陈列＂。党的十九大鲜明
提出“建设创新型人民军队”的时代命题，这在党的历史上是第一次。
故本题选A。`},{id:"q_0050",chapter:"第二章 人文历史常识",section:"六、党史大事件",q_num:3,source:"2020年．国考·副省级",stem:`3. [ 2020年．国考·副省级】下列图片所反映的历史事件，按时间先后顺序排列正确的是
图、 图、`,options:[{key:"A",text:"2@)(1)j 图、 图、"},{key:"B",text:"• 、、）a c．、、）、、"},{key:"D",text:"• 、、）3"}],answer:"C",analysis:`。解析：图、反映的是1921年7月23日，中国共产党第一次全国代表大会在上
海举行。在会议进行过程中，突然有法租界巡捕闯进了会场，会议被迫中断。于是，最后一天的
会议，便转到了浙江嘉兴南湖的一艘红色游船上举行。图、反映的是1934年10月，红军主力
8. 6万人跨过于都河，从这里踏上二万五于里长征的第一步，开启了人类历史上前所未有的壮
举。图、反映的是1929年12月28日召开的古田会议，即中国共产党红军第四军第九次代表大
会。图、反映的是1947年，以刘少奇、朱德为首的中央工作委员会先期进驻西柏坡。在这里召开
了全国土地会议，颁布并实施了《中国土地法大纲》。1948年，毛泽东、周恩来、任弼时率领中共
中央和解放军总部移驻西柏坡，在此组织指挥了震惊中外的辽沈、淮海、平津三大战役，召开了
具有伟大历史意义的中共七届二中全会。按时间先后，正确顺序为、、、、。故本题选C。
七、主席诗词`},{id:"q_0051",chapter:"第二章 人文历史常识",section:"七、主席诗词",q_num:1,source:"2024年·浙江省考",stem:"1. [ 2024年·浙江省考】下列毛泽东诗旬与其创作时期，对应正确的是（ ）。",options:[{key:"A",text:"问苍茫大地，谁主沉浮？——大革命时期"},{key:"B",text:"钟山风雨起苍黄，百万雄师过大江 抗日战争时期"},{key:"C",text:"神女应无恙，当惊世界殊一一解放战争时期"},{key:"D",text:"俱往矣，数风流人物，还看今朝——社会主义建设时期"}],answer:"A",analysis:`。解析：A项正确， ”问苍茫大地，谁主沉浮？”出自《沁园春．长沙》，意思是
这苍茫大地的盛衰兴废，由谁来决定主宰呢？这首词创作于1925年，毛泽东重游橘子洲，感慨
万千，写下了这首著名的《沁园春·长沙》，对应大革命时期。大革命时期即1924年1月至 1927年7
月的第一次国内革命战争时期。
B项错误，“钟山风雨起苍黄，百万雄师过大江”出自《七律．人民解放军占领南京》，意思
是革命的暴风雨震荡着蒋家王朝都城南京，解放军以百万雄师突破长江天险，直捣蒋军苦、经
营三个半月的根据地－南京城。这是毛泽东千1949年4月所写的诗，纪念南京解放、庆祝革命胜
利，对应解放战争时期。
C项错误，“神女应无恙，当惊世界殊”出自《水调歌头．游泳》，意思是神女想必很健康，
但她会惊愕世界变了模样。这首词是毛泽东1956年在武汉畅游长江时的感兴之作，对应社会主义
建设时期。
D项错误，＂俱往矣，数风流人物，还看今朝”出自《沁园春．雪》，意思是这些人物全都
过去了，数一数能建功立业的英雄人物，还要看今天的人们。这是毛泽东于1936年2月所写的词，
对应抗日战争时期。
故本题选A。`},{id:"q_0052",chapter:"第二章 人文历史常识",section:"七、主席诗词",q_num:2,source:"2022年．国考·副省级、地市级、行政执法卷",stem:`2. [ 2022年．国考·副省级、地市级、行政执法卷】下列毛泽东诗词与创作背景对应正确的是
（`,options:[{key:"A",text:"金沙水拍云崖暖，大渡桥横铁索寒 1930年第一次反“围剿”"},{key:"B",text:"宜将剩勇追穷寇，不可沽名学霸王 1949年解放南京"},{key:"C",text:"军叫工农革命，旗号锁刀斧头。匡庐一带不停留，要向潇湘直进 1948年淮海战役"},{key:"D",text:"三十八年过去，弹指一挥间。可上九天揽月，可下五洋捉鳖，谈笑凯歌还 1941年延"}],answer:"B",analysis:`。解析：A项出自毛泽东1935年创作的《七律·长征》。1934年第五次反“围剿”失
败，中国共产党被迫进行战略转移，红军开始了二万五千里长征。在1935年10月长征即将胜
利时，毛主席、潮膨湃写下了《七律．长征》一诗，回顾了长征的过程。其中“金沙水拍云岸暖，
大渡桥横铁索寒“反映的是长征途中红军巧渡金沙江、强渡大渡河、飞夺泸定桥的历史事件。B项
出自毛泽东1949年创作的《七律．人民解放军占领南京》。1949年4月20  B,全面内战已进入尾
声，国民党军队全线溃败，拒绝在和平协定上签字。4月21  B,毛泽东和朱德发出《向全国进军
的命令》，号令全军坚决、彻底、干净、全部地歼灭中国境内一切敢于抵抗的国民党反动派，解放
全中国。当夜，中国人民解放军百万雄师在东起江苏江阴、西至江西湖口的一千余里的战线上分
三路强渡长江。23日晚，东路陈毅的第三野战军占领南京。毛泽东听到这个消息后欢欣鼓舞，写
下了这首诗。C项出自毛泽东同志1927年创作的《西江月·秋收起义》。1927年9月，毛主席以中央
特派员的身份，回到湘赣边界领导了秋收起义。起义后几天，当时革命正处在异常艰苦的关头，
毛主席激情满怀地写下了《西江月·秋收起义》一词。 “军叫工农革命，旗号濂刀斧头。匡庐一带
不停留，要向潇湘直进”是词作上阙部分，描写了起义军声势浩大的局面，体现了工农革命军
的坚决态度。D项出自毛泽东1965年创作的《水涸歌头．重上井冈山》。1965年5月，毛主席重上
井冈山，回顾自1927年上井冈山开辟工农武装割据道路起，中国的革命历程，他感溉良多，
写下了《水调歌头．重上井冈山》一词。故本
题选B。`},{id:"q_0053",chapter:"第二章 人文历史常识",section:"七、主席诗词",q_num:3,source:"2022年．上海市考",stem:`3. [ 2022年．上海市考］“每一场革命都有它自身的传奇。毛泽东率领数万名工农红军所完
成的战略转移，就是中国革命史上的伟大传奇。“下列选项中，（ ）是描述这一“伟大
传奇”的诗词。`,options:[{key:"A",text:"天连五岭银锄落，地动三河铁臂摇。借问瘟君欲何往，纸船明烛照天烧。"},{key:"B",text:"钟山风雨起苍黄，百万雄师过大江。虎踞龙盘今胜昔，天翻地覆慨而慷。"},{key:"C",text:"一山飞峙大江边，跃上葱芜四百旋。冷眼向洋看世界，热风吹雨洒江天。"},{key:"D",text:"金沙水拍云庄暖，大渡桥横铁索寒。更喜眠山千里雪，三军过后尽开颜。"}],answer:"D",analysis:`。解析：由“毛泽东率领数万名工农红军所完成的战略转移＂，可知题干中的
“伟大传奇”是指长征。
A项错误，“天连五岭银锄落，地动三河铁臂摇。借问瘟君欲何往，纸船明烛照天烧”出自毛
泽东的《七律二首·送瘟神．其二》，是毛泽东在1958年6月30日《人民日报》上读到余江县消灭
了血吸虫的消息后写下的组诗作品。该诗写新时代新社会人民当家作主、改天换地的壮举和人民
幸福安康、瘟神被逐的情景，浓情歌颂了伟大的时代和英雄的人民。与长征无关。
B项错误，“钟山风雨起苍黄，百万雄师过大江。虎踞龙盘今胜昔，天翻地覆慨而慷”出自
毛泽东的《七律．人民解放军占领南京》，该诗描绘了1949年解放军渡江解放南京的雄伟场面，
赞颂了南京解放所取得的历史性胜利，抒发了欢庆南京解放的革命豪悄。与长征无关。
C项错误，“一山飞峙大江边，跃上葱宠四百旋。冷眼向洋看世界，热风吹雨洒江天”出自
毛泽东的《七律·登庐山》，全诗紧扣诗题“登庐山”来写，概写登山过程和抒写登山后的所见所思
所感，歌颂了新中国的新社会现实，并对反华势力表示极大的蔑视，表达了自己高度乐观的形
势观。与长征无关。
D项正确，“金沙水拍云庄暖，大渡桥横铁索寒。更喜眠山千里雪，三军过后尽开颜”出自
毛泽东的《七律．长征》，意思是不惧急流巧渡金沙江，不畏严寒飞夺泸定桥；翻过白雪恺皓的
千里眠山，红军战士个个喜笑颜开。《七律．长征》高度概括了红军长征的战斗历程，描绘了红
军的英雄形象，充满了革命英雄主义和乐观主义精神，也展现了作者对革命胜利的坚定信念。
故本题选D。`},{id:"q_0054",chapter:"第二章 人文历史常识",section:"七、主席诗词",q_num:4,source:"2022年．广东省考",stem:"4. [ 2022年．广东省考］毛泽东一生中写下了许多朕炙人口的诗旬，其中描写长征的是",options:[{key:"A",text:"独立寒秋，湘江北去，橘子洲头"},{key:"C",text:"七百里驱十五日，赣水苍茫闽山碧"},{key:"B",text:"宜将剩勇追穷寇，不"},{key:"D",text:"更喜眠"}],answer:"D",analysis:`。解析：A项错误，“独立寒秋，湘江北去，橘子洲头”出自毛泽东的《沁园春．长
沙》，这旬诗的意思是在深秋一个秋高气爽的日子里，我独自忙立在橘子洲头，眺望着湘江碧水
缓缓北流。与长征尤关。
B项错误， ＂宜将剩勇追穷寇，不可沽名学霸王”出自毛泽东的《七律．人民解放军占领南
京》，这旬诗的意思是应该趁现在这敌衰我盛的大好时机，痛追残敌，解放全中国。不可学那贪
图虚名，放纵敌人而造成自己失败的楚霸王项羽。描写的是解放战争。
C项错误，“七百里驱十五日，赣水苍茫闽山碧”出自毛泽东的《渔家傲·反第二次大“围剿”》，
这旬诗的意思是十五天长驱七百里，从苍茫的赣江边一直打到青翠的闽西山区。描写的是第二
次反闱剿。
D项正确， ”更喜眠山千里雪，三军过后尽开颜”出自毛泽东的《七律．长征》，这旬诗的意
思是更加令人喜悦的是踏上于里积雪的眠山，红军翻越过去以后个个笑逐颜开。描写的是红军长
征中翻越雪山的情景，体现了中国红军的革命乐观主义精神。
故本题选D。`},{id:"q_0055",chapter:"第三章 科技常识",section:"一、物理常识",q_num:1,source:"2026年．多省公务员联考",stem:"1. [ 2026年．多省公务员联考］下列关于物态变化的说法，错误的是（ ）。",options:[{key:"A",text:"夏天往饮料中加冰是因其熔化吸热"},{key:"B",text:"东北雾凇的形成是由于发生了凝华"},{key:"C",text:"冬天凝结在车窗上的雾气是液态的"},{key:"D",text:"沸腾和蒸发涉及的物态变化不一样"}],answer:"A",analysis:"【答案解析提示】本题考查【第三章 科技常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0056",chapter:"第三章 科技常识",section:"一、物理常识",q_num:56,source:"公考精选真题",stem:`下列关于日常生活中家用电器与物理常识的说法：
① LED灯通常会比卤素灯更加节能
② 空调的压缩机通常装在室外机中
③ 油烟机工作时电能主要转化成机械能
④ 洗衣机脱水运行过程中会产生离心现象
正确的有几项？`,options:[{key:"A",text:"1项"},{key:"B",text:"2项"},{key:"C",text:"3项"},{key:"D",text:"4项"}],answer:"D",analysis:`【解析】本题考查生活物理常识。
① 正确：LED灯（发光二极管）发光效率高、电光转换率高、发热极少，比传统的卤素灯和白炽灯显著节能环保。
② 正确：分体式空调的压缩机和冷凝器均安装在室外机中，以利于向室外强力散热并有效降低室内运行噪音。
③ 正确：抽油烟机主要由电动机驱动风叶轮高速旋转，工作时主要将电能转化成机械能形成负压吸力。
④ 正确：洗衣机脱水桶高速旋转时，附着在衣物上的水滴所受的附着力不足以提供做圆周运动所需的向心力，水滴沿切线方向甩出，利用了离心现象。
综上，①②③④全部正确，共4项。
故本题选D。`},{id:"q_0057",chapter:"第三章 科技常识",section:"一、物理常识",q_num:3,source:"2025年．国考．地市级卷",stem:"3. [ 2025年．国考．地市级卷】下列与船只行驶有关的说法错误的是（ ）。",options:[{key:"A",text:"皮筏在顺流而下的过程中动能转化为重力势能"},{key:"B",text:"船舵利用杠杆原理改变行船的方向"},{key:"C",text:"使用船桨划船前进时利用了力的相互作用"},{key:"D",text:"帆船实现逆风行驶是利用了伯努利原理"}],answer:"A",analysis:`。解析：A项错误，动能是指物体因运动而具有的能。质量相同的物体，运动的速
度越大，它的动能越大；运动速度相同的物体质量越大，它的动能也越大。重力势能是指物体由
千受到重力并处在一定高度时所具有的能。物体质最越大，位置越高，具有的重力势能就越大。
皮筏顺流而下的过程中，重力势能随着高度不断减小而减小，动能随着运动速度不断增大而增
大，重力势能转化为动能。
B项正确，船舵是用来操纵和控制船舶航向的装置，一般位于船尾，又称船尾舵。船舵通
常由舵叶和舵杆组成，利用阿基米德杠杆原理以及作用力与反作用力原理，通过改变流经船体
或机身的流体的方向来控制船的行驶方向。
C项正确，船桨是一种上端为圆杆，下端为板状的划水工具，根据鱼的胸鳍和腹鳍而发明。
船桨的工作原理主要是利用了牛顿第三定律，通过水波的反作用力使船前进。向后划船桨时，人
通过船桨给了水一个向后的作用力，与此同时，水也给了船桨一个向前的作用力，由此使人向
前移动。因此，使用船桨划船前进时利用了力的相互作用。
D项正确，伯努利原理是指在流体中，如果流体速度小，压强就大；如果流体速度大，压
强就小。帆船在航行过程中遇到逆风情况时，可以通过调整船帆，使得两侧的空气流速不同，
从而产生压力差，使得帆船逆风行驶。
本题为选非题，故本题选A。
二、化学常识
L［答案］A。解析：A选项说法错误。常温下纯水中氢离子和氢氧根离子浓度为10-'mol/L,
海水中的氢离子和氢氧根离子浓度实际并不高(ph=8时，H＋浓度约为10-8mol/L,  Off浓度约
为 10-6mol/L),直接电解海水制氢效率并不高，且存在腐蚀、析氯等问题，通常需要淡化或特
殊电解技术。
B选项说法正确。深远海养殖是一项综合性系统工程，现代深远海养殖平台一般都是设置
在水深超过15m且有较大浪流的开放性水域，在离岸较远(3海里外）的岛礁水域或养殖水体
超过1万矿的海水养殖网箱平台。
C选项说法正确。潮沙发电是一种利用海水周期性涨落能量进行水力发电的技术，通过在
海湾或感潮河口筑坝形成水库，利用潮位差驱动水轮机发电。其原理与常规水电类似，但需适
应低水头（落差小）、大流量的海水特性，具有清洁可再生、发电稳定等特点，可结合围垦、养
殖等综合利用。
D选项说法正确。液化天然气运输船(LNG船）是专用于海上天然气运输的船型。运输夭然
气对船的要求非常苛刻，不仅要做到极高标准的密封性，保存天然气的液货舱还要能承受液化
天然气零下163摄氏度的低温考验。液货舱最核、的就是一种叫殷瓦钢的材料，它在零下163摄
氏度天然气变成液态的时候，能保质保量地将其储存起来。
故本题选A。`},{id:"q_0058",chapter:"第三章 科技常识",section:"二、化学常识",q_num:1,source:"2026年．国考（地市卷、副省卷）",stem:"1. [ 2026年．国考（地市卷、副省卷）］下列与海洋经济有关的说法错误的是（ ）。",options:[{key:"A",text:"海水中氢离子和氢氧根离子浓度高，利用海水制氢效率高"},{key:"B",text:"现代深远海养殖平台一般设置在有较大浪流的开放性水域"},{key:"C",text:"潮沙发电的水轮机结构要适应海水落差小、流量大的特点"},{key:"D",text:"液化天然气运输船的液舱通常采用超低温环境储存天然气"}],answer:"A",analysis:"【答案解析提示】本题考查【第三章 科技常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0059",chapter:"第三章 科技常识",section:"二、化学常识",q_num:2,source:"2026年．国考（地市卷、副省卷）",stem:`2. [ 2026年．国考（地市卷、副省卷）】关于化学平衡在人类活动中的应用，下列说法错误
的是（ ）。`,options:[{key:"A",text:"处理硬水时，可通过加入适量石灰乳作为软化剂调节水的硬度"},{key:"B",text:"血液中CO2浓度增加时，血液中水电离出的氢氧根离子会增多"},{key:"C",text:"适当降低水温增大CO2的溶解度可维持冷却水管道中的盐类平衡"},{key:"D",text:"向含有铜离子的废水中加入适最的碱可达到净化水质的环保目的"}],answer:"C",analysis:`。解析：、正确，LED灯是半导体电子跃迁直接发光（冷光源），它可以直接把
电能转化为光能。卤素灯靠鸽丝高温发光（热光源），大量电能转化为热能。因此LED灯比卤
素灯更加节能，是公认更高效的照明方案。
• 正确，油烟机核、是电机驱动风轮旋转：电能一电机内部电磁作用一产生旋转力矩一带
动风轮高速转动一形成机械能（动能）。风轮的机械能再转化为气流的动能与风压，实现吸排油
烟。因此油烟机工作时，电能主要转化为机械能。
• 正确，家用最常见的分体式空调（挂机／柜机），压缩机、冷凝器、散热风扇都装在室外
机中；室内机只有蒸发器、风机与电控。压缩机工作产生大量热，室外机直接向室外散热，效
率更高。
• 错误，洗衣机运行（尤其脱水）时，桶壁对衣物的弹力提供向、力，让衣物做圆周运动，
方向指向圆、。但是衣服上的水珠因衣物纤维的拉力不足以提供所需向、力，沿切线飞出，因此
实现了脱水。需要注意的是，向、力是由弹力提供的，不是一种独立产生的力。
综上，CD@、表述正确，共3项。
故本题选C。`},{id:"q_0060",chapter:"第三章 科技常识",section:"二、化学常识",q_num:3,source:"2026年．天津市考",stem:"3. [ 2026年．天津市考】下列有关燃油的说法正确的是（ ）。",options:[{key:"A",text:"乙醇汽油的热值比普通汽油的更高"},{key:"B",text:"航空煤油常使用含铅物质作为抗震剂"},{key:"C",text:"汽油的辛烧值含屋越高防爆性能越好"},{key:"D",text:"柴油的标号是根据密度进行划分的"}],answer:"A",analysis:"【答案解析提示】本题考查【第三章 科技常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0061",chapter:"第三章 科技常识",section:"二、化学常识",q_num:4,source:"2026年3月．全国事业单位联考",stem:`4. [ 2026年3月．全国事业单位联考］探求微观世界的奥秘可以帮助我们发现真相。关于下
列事实的微观解释，错误的是（ ）。`,options:[{key:"A",text:"双氧水能杀菌而水不能：分子结构不同，化学性质不同"},{key:"B",text:"温度计中的水银热胀冷缩：采原子的大小发生了改变"},{key:"C",text:"稀盐酸与稀硫酸化学性质相似：溶液中都含有大鼠氢离子"},{key:"D",text:"石墨一定条件下转变成金刚石：碳原子的排列方式改变"}],answer:"B",analysis:`。解析：A项正确，双氧水由2个氢原子和2个氧原子构成，水分子由2个氢原
子和1个氧原子构成，二者的分子结构不同。分子是保持物质化学性质的最小粒子，分子结 构不
同，物质的化学性质不同，因此双氧水能杀菌而水不能。B项错误，温度计中的水银（采）属于
金属单质，由采原子直接构成。热胀冷缩的微观本质是温度升高时，采原子之间的间隔变大；温
度降低时，采原子之间的间隔变小。但是采原子本身的大小始终没有发生改变。C项正确，稀盐
酸和稀硫酸均属于酸类物质，酸具有相似化学性质的原因是其水溶液中都含有大量的氢离子，
因此两者化学性质相似。D项正确，石墨和金刚石均是由碳元素组成的单质，属于同素异形体。
两者在一定条件下可相互转化，其根本原因正是碳原子的排列方式不同，石墨中碳原子呈层状排
列，金刚石中碳原子呈正四面体结构。本题为选非题，故本题选B。
三、生物常识`},{id:"q_0062",chapter:"第三章 科技常识",section:"三、生物常识",q_num:1,source:"2026年．国考．行政执法卷",stem:`1. [ 2026年．国考．行政执法卷】某学院要制作一款与爱因斯坦有关的纪念手提袋，下列
哪项不适合用作印刷图案？（ ）`,options:[{key:"A",text:"光电效应"},{key:"B",text:"E=m('2"},{key:"C",text:"引力是时空弯曲的效应"},{key:"D",text:"F=ma"}],answer:"A",analysis:"【答案解析提示】本题考查【第三章 科技常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0063",chapter:"第三章 科技常识",section:"三、生物常识",q_num:2,source:"2025年．国考．行政执法卷",stem:`2. [ 2025年．国考．行政执法卷】如果要写一部《地球史诗》，下列描述与地质年代对应不
当的是（ ）。`,options:[{key:"A",text:"虽然这时的大陆荒凉一片，但大海的子民空前繁盛，藻类欣欣向荣，二叶虫风头最劲， 生命是这个时代永恒的主题 寒武纪"},{key:"B",text:"新生的纪元始千大灭绝之后，哺乳动物继恐龙成为新主，被子植物极度繁盛，裸子植物 只有松柏长青 志留纪"},{key:"C",text:"鱼类是这个时代的代言人，裸蕨在大地上站稳了脚跟，成片的森林改写了历史，登陆的 两栖类颠覆了乾坤——泥盆纪"},{key:"D",text:"森林以裸子植物为名养育了恐龙，鸟类首次翱翔于天空，恐龙最终征服了世界—— 罗纪"}],answer:"B",analysis:`。解析：A项正确，寒武纪是古生代的第一个纪，约开始于5.4亿年前，结束
千4. 85亿年前。在这个时期里，陆地下沉，北半球大部被海水淹没。寒武纪常被称为“三叶虫的
时代”，这是因为寒武纪岩石中保存有比其他类群丰富的矿化的三叶虫硬壳。植物中红藻、绿藻
等开始繁盛。
B项错误，志留纪是古生代的第三个纪，约开始于4.43亿年前，结束于4. 19亿年前。在
这个时期里，地壳相当稳定，但末期有强烈的造山运动。生物群中腕足类和珊瑚繁荣，三叶虫
和笔石仍繁盛，尤颌类发育，到晚期出现原始鱼类，末期出现原始陆生植物裸蕨。新生代是显
生宙的第三个代，分为古近纪、新近纪和第四纪。在这个时期地壳有强烈的造山运动，中生代
的爬行动物绝迹，哺乳动物繁盛，生物达到高度发展阶段，和现代接近，后期有人类出现。
C项正确，泥盆纪是古生代的第四个纪，约开始千4. 19亿年前，结束千3. 59亿年前。这
个时期的初期各处海水退去，积聚后层沉积物。后期海水又淹没陆地并形成含大量有机物质的
沉积物。在泥盆纪里蕨类植物繁盛，昆虫和两栖类兴起。脊椎动物进入飞跃发展时期，鱼形动物
数最和种类增多，现代鱼类一硬骨鱼开始发展。泥盆纪常被称为“鱼类时代”。
D项正确，保罗纪是中生代的第二个纪，约开始千2.01亿年前，结束千1. 45亿年前。在
这个时期里，有造山运动和剧烈的火山活动。这一时期恐龙成为陆地的统治者，爬行动物非常
发达，翼龙类和鸟类出现，哺乳动物开始发展。植物中苏铁、银杏最繁盛。
本题为选非题，故本题选B。`},{id:"q_0064",chapter:"第三章 科技常识",section:"三、生物常识",q_num:3,source:"2024年．多省公务员联考",stem:`3. [ 2024年．多省公务员联考】地质学家和古生物学家根据地层自然形成的先后顺序，将
地层分为4宙14代12纪。关于下图说法错误的是（ ）。`,options:[{key:"A",text:"＊处被命名为“太古宙＂"},{key:"B",text:"＊处被命名为“白坚纪”"},{key:"C",text:"新生代被子植物高度繁盛"},{key:"D",text:"元古宙只有细菌和蓝藻存在"}],answer:"D",analysis:`。解析：A、B两项正确，地质学家和古生物学家根据地层自然形成的先后顺序，
将地层分为4宙14代12纪，早期的冥古宙、太古宙和元古宙（元古宙在中国含有1个震旦纪）；以后
显生宙的古生代、中生代和新生代。古生代分为寒武纪、奥陶纪、志留纪、泥盆纪、石炭
纪和二叠纪，共6个纪；中生代分为三叠纪、1朱罗纪和白型纪，共3个纪；新生代分为古近纪、
新近纪和第四纪，共3个纪。第四纪是新生代最新的一个纪，包括更新世和全新世。
C项正确，新生代是地球历史上最新的一个地质时代。新生代以哺乳动物和被子植物的高度
繁盛为特征，由于生物界逐渐呈现了现代的面貌，故名新生代，即现代生物的时代。
D项错误，元古代时期出现了大量蓝藻和细菌，这些生物是地球上最原始的生命形式，都是
原始单细胞生物。而元古宙晚期有无脊椎动物出现，所以元古宙不仅仅只有细菌和蓝藻的存在。
故本题选D。`},{id:"q_0065",chapter:"第三章 科技常识",section:"三、生物常识",q_num:4,source:"2026年．多省公务员联考",stem:"4. [ 2026年．多省公务员联考】下列与肥料有关的说法错误的是（ ）。",options:[{key:"A",text:"钾肥具有抗倒伏的功效"},{key:"B",text:"尿素是一种常见的氮肥"},{key:"C",text:"“化作春泥“体现了腐殖化作用"},{key:"D",text:"复合肥料可为农作物提供有机质"}],answer:"D",analysis:`。解析：A项正确，钾肥能促进作物茎杆细胞壁木质素合成，主要作用是增强作
物茎杆的机械强度和韧性，促进作物根系发达、茎杆健壮，从而显著提升作物的抗倒伏、抗病虫
害等抗逆能力，因此钾肥具有抗倒伏的功效。
B项正确，尿素是人体蛋白质代谢的主要终产物，化学式为CO (NH2)2,含氮量为40％以
上，是目前使用最广泛、含氮量最高的固体氮肥之一，适用千各类土壤和作物，肥效较高且相
对温和。
C项正确，“化作春泥＂描述的是植物残体、枯枝落叶等有机物质在土壤中经过微生物分解、
转化，逐渐形成腐殖质的过程，这一过程体现了腐殖化作用，腐殖质能改善土壤结构、提升土壤
肥力。
D项错误，复合肥料是指同时含有氮、磷、钾中两种或两种以上大量营养元素的化学肥料，其
核、作用是为农作物提供氮、磷、钾等矿质养分，并不含有机质；有机质主要来源于农家肥、堆肥、
绿肥、腐殖质等有机肥，因此复合肥料不能为农作物提供有机质。
本题为选非题，故本题选D。`},{id:"q_0066",chapter:"第三章 科技常识",section:"三、生物常识",q_num:5,source:"2026年·山东省考",stem:"5. [ 2026年·山东省考］低血压常被人们所忽视，下列说法错误的是（ ）。",options:[{key:"A",text:"生理性低血压常见于年轻女性、儿童和青少年"},{key:"B",text:"年轻时有低血压，到某个年龄阶段，血压可能会恢复正常"},{key:"C",text:"一般来说，人的血压低就不存在、血管疾病风险"},{key:"D",text:"人的精神状态跟脑部供血不足有关，一般有低血压，会使人的精神状态不足"}],answer:"C",analysis:`。解析：低血压是指血压低于正常水平，常被定义为上肢动脉血压低于
90/60mmHg (12/SkPa)。低血压的原因有很多，包括大出血、脱水、感染、过敏等导致的短期内快
速发生低血压，而缓慢发生且逐渐加重的低血压，往往由、脏病和内分泌疾病引发。另外与形体
瘦弱、遗传因素有一定关联的原发性低血压，以及体位性低血压，餐后低血压等也较为常见。
A选项说法正确。生理性低血压是指血压偏低但无明显症状的健康状态，主要与遗传和个人
体质有关，常见于年轻女性、儿童和青少年它通常无需特殊处理，可通过饮食调理、规律作息和
适当运动来改善。
B选项说法正确。随着年龄的增长，身体各机能逐渐衰退，血管弹性也会下降，导致血压
上升，所以年轻时有低血压，到某个年龄阶段，血压可能会恢复正常
C选项说法错误。低血压患者并非完全不会得、血管疾病，但风险相对较低。、血管疾病的
发生与多种因素相关，低血压本身可能降低部分风险，但若伴随其他异常（如器官供血不足、基
础疾病等），仍存在、血管疾病风险。此外，严重低血压可能导致重要器官灌注不足，诱发、脑
缺血事件。
D选项说法正确。低血压是指血压低于正常水平，而脑供血不足则是指脑部血液供应不足。这
两者之间存在一定的关联，低血压可能会导致脑供血不足的发生，会使人的精神状态不足。
故本题选C。`},{id:"q_0067",chapter:"第三章 科技常识",section:"三、生物常识",q_num:6,source:"2026年·浙江省考",stem:`6. [ 2026年·浙江省考】配料：小龙粉、生活饮用水、植物油、食用盐、白砂糖，香辛料、谷氨酸
钠，单硬脂配甘油声、子呈味核甘酸二钠、阿斯巴甜、三氯庶糖、特丁基对苯二酚、纽甜、红曲红、
山梨酸钾、食用香精。
以上是某食品的配料表，下列有关表述，正确的是（ ）。`,options:[{key:"A",text:"三氯庶糖不属于糖类，糖尿病人可适量摄入"},{key:"B",text:"红曲红是一种人工合成色素，具有良好的着色性"},{key:"C",text:"山梨酸钾与福尔马林的防腐机理相同，可替换使用"},{key:"D",text:"谷氨酸钠俗名味精，是常见的增味剂，不属于食品添加剂"}],answer:"A",analysis:`。解析：A选项说法正确。三氯庶糖是一种人工合成的非营养性甜味剂，化学结构
是庶糖的衍生物，但不属于糖类（碳水化合物），在体内不被代谢，不提供能量也不升高血糖，
因此糖尿病患者可以适量食用。
B选项说法错误。红曲色素是一种由红曲霉属的丝状真菌经发酵而成的优质的天然食用色
素，是红曲霉的次级代谢产物。
C选项说法错误。山梨酸钾通过抑制霉菌、酵母和部分细菌的生长来防腐，安全用于食品。福
尔马林（甲 溶液）是一种有毒化学物质，严禁用千食品防腐，主要用于标本保存等工业用途。
两者防腐机理不同，且不能互相替代，尤其福尔马林对人体有致癌性。
D选项说法错误。味精（谷氨酸钠）是常用的涸味品，也是列入《食品添加剂使用标准》
(GB2760-2011)的食品添加剂。味精（谷氨酸钠）作为调味品生产、经营时，其标签应当符合
相应食品安全国家标准；如作为食品添加剂生产销售，其产品标签必须载明“食品添加剂”字样。
故本题选A。`},{id:"q_0068",chapter:"第三章 科技常识",section:"三、生物常识",q_num:7,source:"2026年．多省公务员联考",stem:"7. [ 2026年．多省公务员联考】下列异常的体检指标，与其关联的疾病最不可能对应的是",options:[{key:"A",text:"白细胞数量高于参考范匪的上限 阑尾炎"},{key:"B",text:"谷丙转氨酶高于参考范围的上限 冠、病"},{key:"C",text:"红细胞数量低于参考范围的下限一贫血症"},{key:"D",text:"甲胎蛋白浓度高于参考范围的上限 肝癌"}],answer:"B",analysis:`。解析：
A项正确，白细胞是人体免疫系统的核、功能细胞，外周血白细胞总数升高，是急性细菌
性感染、化脓性炎症反应的标志性指标。阑尾炎的核、发病机制是阑尾管腔堵塞后继发肠道细菌
感染，引发的急性化脓性炎症，属于典型的腹腔细菌感染性疾病。急性阑尾炎发作时，机体免
疫系统快速激活，大量白细胞增殖并趋化至炎症病灶，直接导致外周血白细胞总数显著高于参
考上限。
B项错误，谷丙转氨酶90％以上储存于人体肝细胞的胞质中，、肌、骨骼肌等其他组织中
含量极低。只有当肝细胞受损、细胞膜完整性被破坏时，大量谷丙转氨酶才会释放进入血液，
导致外周血检测值显著升高。故谷丙转氨酶是临床诊断肝细胞损伤、肝脏疾病的特异性、敏感性
核、指标，冠、病本身不会导致谷丙转氨酶升高。冠、病全称冠状动脉粥样硬化性、脏病，是冠
状动脉粥样硬化导致血管狭窄、、肌缺血缺氧引发的、脏疾病，其特异性生物标志物是肌钙蛋
白等。
C项正确，贫血症指外周血中单位容积内的红细胞计数、血红蛋白浓度、红细胞比容低于
同年龄、同性别、同地区健康人群的参考范围下限的一种病理状态。其中，红细胞数量减少是贫
血最核心的病理表现之一。
D项正确，甲胎蛋白是原发性肝细胞癌的特异性肿瘤标志物。生理状态下，甲胎蛋白主要
由胎儿肝细胞合成，出生后合成能力迅速下降，健康成人外周血中甲胎蛋白浓度极低。当肝细
胞发生癌变时，癌变的肝细胞可能重新获得合成甲胎蛋白的能力，导致外周血甲胎蛋白浓度显
著升高。
故本题选B。`},{id:"q_0069",chapter:"第三章 科技常识",section:"三、生物常识",q_num:8,source:"2026年．多省公务员联考",stem:"8. [ 2026年．多省公务员联考】下列植物病原体与其对植物的致病机理对应错误的是",options:[{key:"A",text:"真菌 通过吸气或菌丝入侵，分泌酶类破坏细胞壁"},{key:"B",text:"细菌 经伤口或气孔侵入，释放毒素破坏组织结构"},{key:"C",text:"病毒——借媒介或接触进入活细胞，利用宿主系统复制"},{key:"D",text:"线虫一由昆虫传播，寄生于植物韧皮部干扰物质运输"}],answer:"D",analysis:`。解析：
A项正确，真菌多通过植物叶片气孔、伤口等部位侵入，或以菌丝直接穿透植物表皮入侵，
入侵后会分泌纤维素酶、果胶酶等酶类物质，分解破坏植物细胞壁与细胞结构，进而引发植物
病害。
B项正确，细菌通常无法直接穿透植物完整表皮，多经由植物伤口、自然气孔等通道侵入
植物体内，随后在植物组织内大量繁殖，并分泌毒素、胞外酶等物质，破坏植物细胞与组织结
构，导致植物出现腐烂、萎照等病状。
C项正确，病毒尤细胞结构，自身尤法独立繁殖，需借助岈虫等昆虫媒介或植株间摩擦接
触等方式进入植物活细胞，之后利用植物宿主细胞内的细胞器、营养物质与遗传系统完成自身
核酸复制和蛋白质合成，不断增殖后破坏宿主细胞。
D项错误，线虫多数通过土壤、流水等直接侵染植物根系，并非由昆虫传播，且多数植物
线虫主要寄生千植物根部组织，通过穿刺取食破坏根系细胞，或引发根部畸形、腐烂，而寄生
于植物韧皮部干扰物质运输的多是部分细菌、病毒类病原体。
故本题选D。`},{id:"q_0070",chapter:"第四章 地理常识",section:"一、矿产",q_num:1,source:"2026年国考．地市卷",stem:`1. [ 2026年国考．地市卷】2025年自然资源部发布《新发现矿种公告》，高纯石英矿正式
成为我国第174号矿种。下列与之相关的说法错误的是（ ）。`,options:[{key:"A",text:"高纯石英矿在分类上属于金属矿"},{key:"B",text:"天然水晶是石英的结晶体"},{key:"C",text:"高纯石英可用千芯片制造中的光刻环节"},{key:"D",text:"石英砂具有耐高温的特性"},{key:"B",text:"类）】我国科学家攻克石墨高温纯化关键技术，成功开发出超"}],answer:"A",analysis:"【答案解析提示】本题考查【第四章 地理常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0071",chapter:"第四章 地理常识",section:"一、矿产",q_num:2,source:"2025年．江苏省考(B类）",stem:`2. [ 2025年．江苏省考(B类）】我国科学家攻克石墨高温纯化关键技术，成功开发出超
高纯石墨产品，标志着我国超高纯石墨产品达到国际领先水平。下列关于石墨的说法正确的是`,options:[{key:"A",text:"是由碳元素组成的有色金属矿物"},{key:"B",text:"在自然界分布广泛，不存在人造石墨"},{key:"C",text:"属于战略性物资，我国禁止出口石墨产品"},{key:"D",text:"在工业生产中应用广泛，被誉为“工业黑金”"}],answer:"D",analysis:`。解析：A项错误，石愿又名黑铅，是碳的一种同素异形体，不透明且触感油
腻，颜色由铁黑到钢铁灰不等，形状可呈晶体状、薄片状、鳞状、条纹状、层状体。石墨是一种非
金属矿物，并不是有色金属矿物。
B项错误，石墨是一种天然形成的矿物，它常见于火成岩、变质岩中的矿床或伴生矿物中，
也可以在沉积岩中发现。石墨既存在千自然界中，也可以通过人工制备得到。天然石墨的生产成
本相对较高，而人工合成的石墨可以达到更高的质量和纯度要求。
C项错误，石墨是多个国家的战略性矿产资源，其在新能源、航天航空、核能、军工等战略
性新兴产业中具有重要应用。中国作为全球最大的石墨生产国和出口国，长期以来，坚定履行
防扩散等国际义务，根据维护国家安全和利益需要，依法对特定石思物项实施出口管制，对部
分石墨物项实施临时管制。故“禁止出口石墨产品”说法错误。
D项正确，石墨由于其特殊的结构，具有耐高温性、抗热震性、导电性、润滑性、化学稳定
性以及可塑性等众多特性，广泛应用于冶金、机械、电子、军工、国防、航天航空等领域，被称为
“工业黑金”。
故本题选D。
二、太阳和八大行星`},{id:"q_0072",chapter:"第四章 地理常识",section:"一、紫微星",q_num:1,source:"2026年．天津市考",stem:"1. [ 2026年．天津市考］若是太阳系的八大行星做自我介绍，下列不恰当的是（ ）。",options:[{key:"A",text:"天王星：我的大气层最为“高冷＂，甲烧和氨让我嬴得了冰巨星的“美誉“"},{key:"B",text:"海王星：直到今天，我还只是数学预测，人类的探测器从来没有看到过我"},{key:"C",text:"木星：在众多兄弟姐妹中我的＂块头”最大，“黄自相间”是我的漂亮外衣"},{key:"D",text:"金星：“早东晚酉＇是我的位置特征，“启明”“长庚”是古人诗意的表达"}],answer:"B",analysis:`。解析：
A恰当，天王星的“冰”并非日常的水冰，而是在太阳系外层极寒环境下，水、氨、甲烧凝结
成的固态“冰＂态物质。甲皖冰云会反射大部分太阳辐射，加剧大气的低温状态，氨参与大气结
构与能翟调节：氨与水、甲烧共同构成天王星的“冰＂态幔层，在大气中还会与其他物质相互作
用形成复杂的云层结构。此外，氨分子的热辐射特征会影响天王星大气的热传递，进一步维持
其大气的低温环境。
B不恰当，1846年9月23日，加勒按照勒维烈的推算（利用天王星轨道的摄动推测），在
预定的天区发现海王星，海王星也成为唯一一颗利用数学预测而非有计划的观测发现的行星。
美国国家航空航天局的旅行者2号探测器在1989年8月25日飞掠过海王星，这是人类历史上
首次用空间探测器探测海王星。
C恰当，木星是太阳系中体积最大的行星，其直径约为地球的11倍，体积可容纳1321个
地球，质量相当于地球的318倍，木星表面呈现黄、白、褐等五彩续纷的条纹图案，这些颜色由
氢、氨及微量甲烧、氨等气体组成的大气层形成，快速自转导致大气中东西风带交织，形成明暗
交替的带状结构。
D恰当，金星作为内行星的轨道特性，始终在太阳附近运行，不会远离太阳的视位置。当
金星位于太阳东侧时，会在日出前升起于东方，成为＂启明星”；当位于太阳西侧时，则在日
落后出现在西方，被称为“长庚星”。
故本题选B。`},{id:"q_0073",chapter:"第四章 地理常识",section:"一、紫微星",q_num:2,source:"2026年．四川省考",stem:"2. [ 2026年．四川省考］下列关于天文知识的说法错误的是（ ）。",options:[{key:"A",text:"羲和号是中国首颗太阳探测科学技术试验卫星"},{key:"B",text:"2006年海王星被降为矮行星，从九大行星中除名"},{key:"C",text:"小行星可以根据发现者的提议来进行命名"},{key:"D",text:"射电望远镜观测不受阴雨天及黑夜的限制"}],answer:"A",analysis:"【答案解析提示】本题考查【第四章 地理常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0074",chapter:"第四章 地理常识",section:"一、紫微星",q_num:3,source:"2025年．国考．行政执法卷、副省级卷",stem:"3. [ 2025年．国考．行政执法卷、副省级卷】下列诗句都涉及天体，其中说法错误的是",options:[{key:"A",text:'"卧看牵牛织女星”所涉及的天体不属于太阳系'},{key:"B",text:"“每依北斗望京华”中的天体不包括北极星"},{key:"C",text:"“启明星在树梢头”中的行星公转轨道半径较地球更大"},{key:"D",text:'"岁星渐高辰星光”中的＂岁星”属于气态巨行星三、'}],answer:"C",analysis:`。解析：A项正确，太阳系包括太阳、8个行星、近500个卫星和至少120万个
小行星，还有一些矮行星和彗星。牛郎星，又名河鼓二、“天鹰座Cl'."'是恒星光谱A型中的主
序星，不属于太阳系。织女星，或者称为织女一或天琴座Cl'.'是天琴座中最明亮的恒星，也不
属于太阳系。
B项正确，北斗七星，是夜空中的七颗亮星，它们组成的图形像是古代囡酒的斗，故命名
为北斗七星。北斗七星从斗身最前端开始，到斗柄的末尾，按顺序依次命名为大熊座0'.、大熊
座6、大熊座丫、大熊座8、大熊座e、大熊座［、大熊座n。北极星现在一般指“勾陈一”
（小熊座Cl'.)。北斗七星不包括北极星。
C项错误，金星在中国古代被称为太白金星，清展在东方天空出现则被称为＂启明星”,晚
间在西方天空出现被称为“长庚星”或“昏星”。金星是太阳系的八大行星之一，是从太阳向外的
第二颗行星，公转轨道半径比地球小。
D项正确，中国古代称木星为岁星。木星是太阳系中距离太阳第五近的行星，也是太阳系
中体积最大的行星。木星是一颗气态巨行星，质量是太阳的千分之一，但却是太阳系中其他七
大行星质鼠总和的2.5倍。
本题为选非题，故本题选C。
三、月相`},{id:"q_0075",chapter:"第四章 地理常识",section:"二十二、二十三",q_num:1,source:"2025年．多省公务员联考",stem:`1. [ 2025年．多省公务员联考】“超级满月”是月球位于近地点时刚好出现满月，使月亮看
起来又大又亮的现象。其发生需要满足的条件是（ ）。`,options:[{key:"A",text:"农历初一前后，地球运动到太阳与月球之间"},{key:"B",text:"农历初一前后，月球运动到太阳与地球之间"},{key:"C",text:"农历十五前后，地球运动到太阳与月球之间"},{key:"D",text:"农历十五前后，月球运动到太阳与地球之间"},{key:"A",text:"类］某人在中秋之夜开始夜跑，坚持连续夜跑了19天，"}],answer:"C",analysis:`。解析：C项正确，A、B、D三项错误，满月发生在农历十五前后，此时月球运行
至地球背向太阳的一侧，即地球位于太阳和月球之间（三者近似直线），月球被太阳照亮的半
球完全朝向地球，形成“满月”。若此时月球恰好位于近地点，则为“超级满月”。故本
题选C。`},{id:"q_0076",chapter:"第四章 地理常识",section:"二十二、二十三",q_num:2,source:"2025年3月．事业单位联考A类",stem:`2. [ 2025年3月．事业单位联考A类］某人在中秋之夜开始夜跑，坚持连续夜跑了19天，
这时他看到的月相与下列哪句诗词的描写最接近？（ ）`,options:[{key:"A",text:"露似真珠月似弓"},{key:"C",text:"举杯邀月，对影成三客"}],answer:"A",analysis:"【答案解析提示】本题考查【第四章 地理常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0077",chapter:"第四章 地理常识",section:"四、中国地理",q_num:77,source:"公考精选真题",stem:`四、中国地理
（一）重要的分界线`,options:[{key:"B",text:"杨柳岸，晓风残月"},{key:"D",text:"海上生明月，天涯共此 时 l．气候：亚热带与暖温带分界线、1月0°c等温线、800mm等 降水量线、湿润区与半湿润区分界线。"}],answer:"A",analysis:`。解析：A项正确，该旬出自唐代白居易的《暮江吟》，“可怜九月初三夜，露似
真珠月似弓＂，由“月似弓”和“九月初三”可推断此时的月相是上蛾眉月，与题干中所描述的月
相相符。
B项错误，该旬出自宋代柳永的《雨霖铃．寒蝉凄切》，由“晓”和“残月”可知为残月月相，
出现在农历廿五—廿八，与题干中所描述的月相不符。
C项错误，该句出自宋代苏轼的《念奴娇．中秋》，描述的是农历八月十五的满月月相，与
题干中所描述的月相不符。
D项错误，该旬唐代张九龄的《望月怀远》，旬中“海上生明月”，表明月亮从海上（东方）
升起，而“明月”表明月亮亮度很高，与满月月相相吻合，满月是月球反射太阳光最充分的阶段，
亮度最高。另外，从地理范围来看，满月时月球与太阳位置相对，全球夜半球均可观测，实现
“天涯共此时”的时空统一性。
故本题选A。
四、中国地理
l.【答案】B。解析：A选项说法正确。黄河以含沙最大而闻名，黄河的河水呈黄色，比较
浑浊，当其汇入相对清澈的渤海时，由于河水与海水的密度、盐度不同，会在一段时间内相互浸
润而不混合，从而形成一条非常清晰黄蓝相间的分界线，这是黄河入海口的典型景观。
B选项说法错误。“三龙吐珠，八门入淘＂描绘的是珠江入海口的形态，而非淮河。珠江下游
水系发达，入海口区域水网密布，主要经由虎门、蕉门、洪奇门、横门、磨刀门、鸡啼门、虎跳门和
崖门八个口门流入南海，形成了“八门入海”的奇特格局；“三龙”指珠江的西江、东江、北江三大
于流。而淮河历史上因黄河夺淮入海，河道较为单一，主要经由苏北灌溉总渠等人工河道入海，
并无“八门入海”的特征。
C选项说法正确。辽河入海口的潮间带上覆盖着大面积的碱蓬草，碱蓬草每年四月长出地面，
在夏季为绿色，到了秋季则变为鲜艳的赤红色，从而形成了一望无际的“红海滩”。“红海滩”是辽
宁盘锦地区的著名自然景观。
D选项说法正确。长江水扯巨大，携带着大量的泥沙在其入海口处沉积，同时，东海的海
潮又对这些泥沙起到顶托和冲刷作用，在河流与海洋动力的长期相互作用下，泥沙不断淤积，
最终形成了我国第三大岛也是我国最大的冲积岛       崇明岛。
故本题选B。`},{id:"q_0078",chapter:"第四章 地理常识",section:"四、人口地理",q_num:1,source:"2026年．国考（地市、副省）",stem:"1. [ 2026年．国考（地市、副省）】下列关于河流入涧口的描述与河流对应错误的是（ ）。",options:[{key:"A",text:"浑浊的河水奔流而至，汇入清澈的渤海，形成一条清晰的分界线－黄河"},{key:"B",text:"“二龙吐珠，八门入海＇，生动地描绘出了它的奇特形态一淮河"},{key:"C",text:"在入海口的潮间带上，会看到一片耀眼的红色，又被称为“红海滩＂ 辽河"},{key:"D",text:"在其与东海海潮的相互激荡下，造就了我国第三大岛崇明岛 长江"}],answer:"A",analysis:`。解析：A项正确，该旬出自唐代白居易的《暮江吟》，“可怜九月初三夜，露似
真珠月似弓＂，由“月似弓”和“九月初三”可推断此时的月相是上蛾眉月，与题干中所描述的月
相相符。
B项错误，该旬出自宋代柳永的《雨霖铃．寒蝉凄切》，由“晓”和“残月”可知为残月月相，
出现在农历廿五—廿八，与题干中所描述的月相不符。
C项错误，该句出自宋代苏轼的《念奴娇．中秋》，描述的是农历八月十五的满月月相，与
题干中所描述的月相不符。
D项错误，该旬唐代张九龄的《望月怀远》，旬中“海上生明月”，表明月亮从海上（东方）
升起，而“明月”表明月亮亮度很高，与满月月相相吻合，满月是月球反射太阳光最充分的阶段，
亮度最高。另外，从地理范围来看，满月时月球与太阳位置相对，全球夜半球均可观测，实现
“天涯共此时”的时空统一性。
故本题选A。
四、中国地理
l.【答案】B。解析：A选项说法正确。黄河以含沙最大而闻名，黄河的河水呈黄色，比较
浑浊，当其汇入相对清澈的渤海时，由于河水与海水的密度、盐度不同，会在一段时间内相互浸
润而不混合，从而形成一条非常清晰黄蓝相间的分界线，这是黄河入海口的典型景观。
B选项说法错误。“三龙吐珠，八门入淘＂描绘的是珠江入海口的形态，而非淮河。珠江下游
水系发达，入海口区域水网密布，主要经由虎门、蕉门、洪奇门、横门、磨刀门、鸡啼门、虎跳门和
崖门八个口门流入南海，形成了“八门入海”的奇特格局；“三龙”指珠江的西江、东江、北江三大
于流。而淮河历史上因黄河夺淮入海，河道较为单一，主要经由苏北灌溉总渠等人工河道入海，
并无“八门入海”的特征。
C选项说法正确。辽河入海口的潮间带上覆盖着大面积的碱蓬草，碱蓬草每年四月长出地面，
在夏季为绿色，到了秋季则变为鲜艳的赤红色，从而形成了一望无际的“红海滩”。“红海滩”是辽
宁盘锦地区的著名自然景观。
D选项说法正确。长江水扯巨大，携带着大量的泥沙在其入海口处沉积，同时，东海的海
潮又对这些泥沙起到顶托和冲刷作用，在河流与海洋动力的长期相互作用下，泥沙不断淤积，
最终形成了我国第三大岛也是我国最大的冲积岛       崇明岛。
故本题选B。`},{id:"q_0079",chapter:"第四章 地理常识",section:"四、人口地理",q_num:2,source:"2026年．国考．行政执法卷",stem:`2. [ 2026年．国考．行政执法卷】为促进长江水生生物多样性和水域生态修复，我国实施
长江十年禁渔。下列相关说法错误的是（ ）。`,options:[{key:"A",text:"禁止在长江流域开放水域养殖外来物种或者其他非本地物种"},{key:"B",text:"青、草、峭、岫四大家鱼会在长江和其附属湖泊之间 游"},{key:"C",text:"长江流域”一江一口两湖七河＇禁渔，“两湖”指鄱阳湖和太湖"},{key:"D",text:"在禁渔期内使用炸鱼、电鱼等方式捕捞，涉嫌刑事犯罪"}],answer:"C",analysis:`。解析：A选项说法正确。为了保护长江物种资源，国家明确禁止在长江流域开
放水域养殖、投放外来物种或其他非本地物种种质资源。这一举措旨在防止外来物种对长江生态
系统的破坏，维护本地物种的稳定和多样性。
B选项说法正确。这些鱼类属于典型的江湖半洞游鱼类，繁殖季节（通常4-7月），它们
从附属湖泊逆水洞游至长江干流或上游产卵场生殖。产卵后，亲鱼会返回湖泊等食料丰盛区域
索饵肥育。秋末冬初，它们从湖泊浅水区洞游至长江干流深水处或湖泊深水区越冬；次年春季
水温回升时，再重新洞游进入湖泊索饵。
C选项说法错误。根据党中央部署，“一江一口两湖七河”，包括长江干流，长江口禁捕管理
区，鄱阳湖、洞庭湖两大通江湖泊，大渡河、眠江、沦江、赤水河、嘉陵江、乌江、汉江等重要支流。
D选项说法正确。根据相关法律规定，在禁渔区或禁渔期实施电鱼、炸鱼等行为，即使没有
捕捞到渔获物，也可认定为刑法第三百四十条规定的“情节严重”，以非法捕捞水产品罪定罪处
罚。
故本题选C。`},{id:"q_0080",chapter:"第四章 地理常识",section:"四、人口地理",q_num:3,source:"2026年．天津市考",stem:"3. [ 2026年．天津市考］下列古诗词中提到的“海”与今天我国四大海域对应错误的是",options:[{key:"A",text:"东临竭石，以观沧海 渤海"},{key:"B",text:"楼观沧海日，门对浙江潮 黄海"},{key:"C",text:"海面雷霆聚，江、瀑布横 东海"},{key:"D",text:"云散月明谁点缀？夭容海色本澄清 南海"}],answer:"B",analysis:`。解析：
A项正确，在曹操的诗旬“东临竭石以观沧海”中， ＂沧海”指的是渤海。竭石山位于河北省
秦皇岛市附近，面临渤海，因此这句诗描绘了诗人登上竭石山时所见的壮丽海景。
B项错误， ＂楼观沧海日，门对浙江潮”出自唐代诗人宋之问的五言古诗《灵隐寺》，描绘
杭州灵隐寺登楼可见壮美日出、寺门正对钱塘江潮的壮阔景象。钱塘江干流从西向东贯穿皖南和
浙北，汇入东海。
C项正确，“海面雷霆巨，江、瀑布横＂描写的是钱塘江潮的壮丽景象。这两旬出自范仲淹
的《和运使舍人观潮》，通过生动的意象展现了潮水的磅磷气势和自然的力星。钱塘江干流从西向
东贯穿皖南和浙北，汇入东海。
D项正确，“云散月明谁点缀？夭容海色本澄清。”出自苏轼的《六月二十日夜渡海》。这句诗
描写的是琼州海峡（雷州海峡），是苏轼在元符三年(1100年）六月二十日夜，从海南儋州遇
赦北归渡海时所见之景。琼州海峡位于南海。
故本题选B。`},{id:"q_0081",chapter:"第四章 地理常识",section:"四、人口地理",q_num:4,source:"2025年．天津市考",stem:"4. [ 2025年．天津市考】下列论文选题与其考察地点对应正确的是（ ）。",options:[{key:"A",text:"《卢舍那大佛造像艺术研究》—山西大同"},{key:"B",text:"《丹霞地貌景观特征及发育演化研究》—贵州赤水"},{key:"C",text:"《三江并流区地表覆盖类型变化成因探析》—四川宜宾"},{key:"D",text:"《乡村振兴背景下河姆渡遗址的保护与开发》—浙江湖州"}],answer:"B",analysis:`。解析：A项错误，卢舍那大佛位于河南省洛阳龙门西山南部山腰奉先寺，是
按照武则天的形象塑造的，作于唐高宗咸亨四年。卢舍那大佛是龙门石窟中艺术水平最高、整
体设计最严密、规模最大的一座造像，以神秘微笑著称，被国外游客誉为“东方蒙娜丽莎”“世界最
美雕像＂。因此考察地点应是河南洛阳。
B项正确，丹霞地貌即以陆相为主的红层发育的具有陡崖坡的地貌。丹霞地貌在中国广泛
分布，其中四川的蜀南竹海和七洞沟属于幼年期丹霞，贵州赤水丹霞属于青年期丹霞，广东丹
霞山属于壮年期丹霞，江西龙虎山则属于老年期丹霞。因此考察地点对应贵州赤水。
C项错误，三江并流是指金沙江、澜沧江和怒江这三条发源千青藏高原的大江在云南省境内
自北向南并行奔流170多千米的区域，位千中国云南省。因此考察地点应是云南。
D项错误，河姆渡遗址位于浙江省宁波市余姚市河姆渡镇河姆渡村的东北，距宁波市区约
20于米，是中国南方早期新石器时代遗址。因此考察地点应是浙江宁波。故
本题选B。`},{id:"q_0082",chapter:"第五章 经济常识",section:"一、宏观调控的日标",q_num:82,source:"2026年．国考（行政执法卷）",stem:"[ 2026年．国考（行政执法卷）】下列说法与我国税收制度不相符的是（ ）。",options:[{key:"A",text:"对在我国境内外资企业工作多年的外籍居民征收个人所得税"},{key:"B",text:"对我国境内某全球知名半导体公司征收增值税"},{key:"C",text:"对某进口高档化妆品公司征收消费税"},{key:"D",text:"对未做废弃物无害化处理的养殖场征收资源税"}],answer:"A",analysis:"【答案解析提示】本题考查【第五章 经济常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0083",chapter:"第五章 经济常识",section:"二、宏观调控政策分析",q_num:83,source:"2026年．国考（地市卷、副省卷）",stem:"[ 2026年．国考（地市卷、副省卷）】下列经济目标与政策工具匹配错误的是（ ）。",options:[{key:"A",text:"扩大基础设施投资规模 提高专项债发行额度"},{key:"B",text:"降低市场主体经营成本 延续小微企业增值税减免"},{key:"C",text:"拓宽房企的融资渠道 增加保障性住房再贷款额度"},{key:"D",text:"缓解基层”三保＂支出压力 加大中央对地方转移支付"}],answer:"A",analysis:"【答案解析提示】本题考查【第五章 经济常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0084",chapter:"第五章 经济常识",section:"三、经济学术语和热词",q_num:84,source:"公考精选真题",stem:"L【2026年．多省公务员联考］下列语句与其所蕴含的经济学原理对应正确的是（ ）。",options:[{key:"A",text:"物以多为贱一沉没成本"},{key:"B",text:"酒香不怕巷子深 买方市场"},{key:"C",text:"众人拾柴火焰高 规模经济"},{key:"D",text:"物至而反，冬夏是也。致至而危，累棋是也一边际效用递增"}],answer:"A",analysis:"【答案解析提示】本题考查【第五章 经济常识】相关考点知识。请结合对应知识卡片进行复习记忆。"},{id:"q_0085",chapter:"第五章 经济常识",section:"三、经济学术语和热词",q_num:2,source:"2026年．山东省考",stem:`2. [ 2026年．山东省考】谷子经济作为新型消费现象，因经济二次元IP周边商品的消费文化
和经济展开，作为国内一线经济发展中的增长点之一，下列说法错误的是（ ）。`,options:[{key:"A",text:"体现文化赋能经济"},{key:"C",text:"增加商品使用价值"},{key:"B",text:"促进产业融合发展"},{key:"D",text:"突出商品情绪价值"}],answer:"A",analysis:"【答案解析提示】本题考查【第五章 经济常识】相关考点知识。请结合对应知识卡片进行复习记忆。"}],Mr="cs-fuxi-tracker-v5";function It(e,n){if(!e)return"";if(!n||!n.trim())return e;const t=n.trim(),r=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi");return String(e).split(r).map((l,o)=>r.test(l)?m.jsx("span",{className:"search-highlight",children:l},o):l)}function lu(e){if(!e)return null;const n=String(e).trim();if(!n)return null;const t=n.split(`
`).filter(r=>r.trim()!=="");return t.length===1&&!t[0].startsWith("【")&&!t[0].startsWith("•")?m.jsx("p",{className:"fc-para",children:t[0]}):t.map((r,i)=>{const l=r.trim();if(!l)return null;if(/^【[^】]+】/.test(l))return m.jsx("div",{className:"fc-section-header",children:l},i);if(/^[（(][一二三四五六七八九十]+[）)]/.test(l))return m.jsx("div",{className:"fc-major-num",children:l},i);if(/^[•·-]\s*/.test(l))return m.jsxs("div",{className:"fc-bullet-item",children:[m.jsx("span",{className:"fc-bullet-dot",children:"🔹"}),m.jsx("span",{className:"fc-bullet-text",children:l.replace(/^[•·-]\s*/,"")})]},i);if(/^[①②③④⑤⑥⑦⑧⑨⑩]/.test(l)||/^[（(]\d+[）)]/.test(l)||/^\d+[.．、]/.test(l))return m.jsx("div",{className:"fc-num-item",children:l},i);if(/^[A-Da-d][项．.]/.test(l)){const o=/正确/.test(l),s=/错误/.test(l);return m.jsx("div",{className:`fc-option-line ${o?"fc-correct":""} ${s?"fc-wrong":""}`,children:l},i)}return m.jsx("p",{className:"fc-para",children:l},i)})}function Yf(){const e=F.useRef(null),n=F.useRef(null),t=F.useRef(null),r=F.useRef(null),[i,l]=F.useState("340px"),[o,s]=F.useState(0),[u,d]=F.useState(!1),[k,y]=F.useState(!1),[p,w]=F.useState(""),[g,E]=F.useState(()=>localStorage.getItem("cs-fuxi-mode")||"knowledge"),[L,a]=F.useState("all"),[c,f]=F.useState(()=>{const h=localStorage.getItem("cs-fuxi-mode")||"knowledge",z=h==="knowledge"?ru:iu,R=localStorage.getItem(`${Mr}_${h}`)||localStorage.getItem(`cs-fuxi-tracker-v4_${h}`),T={};if(R)try{const re=JSON.parse(R);Array.isArray(re)&&re.forEach(ie=>{ie.id&&ie.status&&ie.status!=="new"&&(T[ie.id]=ie.status)})}catch{}return z.map(re=>({...re,status:T[re.id]||"new"}))}),[v,C]=F.useState(0),[N,D]=F.useState(!1),[B,K]=F.useState({known:0,unsure:0,unknown:0}),[j,se]=F.useState("all"),[Ce,fn]=F.useState(()=>localStorage.getItem("cs-fuxi-random")==="true"),[Tn,Dt]=F.useState([]),[Z,ve]=F.useState(null);F.useEffect(()=>{localStorage.setItem("cs-fuxi-mode",g)},[g]),F.useEffect(()=>{localStorage.setItem("cs-fuxi-random",Ce)},[Ce]);const S=c.filter(h=>L==="all"?!0:h.chapter===L),P=S.length>0&&v>=0&&v<S.length?v:0,x=S[P]||null;F.useEffect(()=>{const h=g==="knowledge"?ru:iu,z=localStorage.getItem(`${Mr}_${g}`)||localStorage.getItem(`cs-fuxi-tracker-v4_${g}`),R={};if(z)try{const $=JSON.parse(z);Array.isArray($)&&$.forEach(M=>{M.id&&M.status&&M.status!=="new"&&(R[M.id]=M.status)})}catch{}const T=h.map($=>({...$,status:R[$.id]||"new"}));f(T);const re=T.filter($=>L==="all"?!0:$.chapter===L);re.length===0&&L!=="all"&&a("all");const ie=re.length>0?re:T;if(Ce&&ie.length>0){const $=[];ie.forEach((ne,ae)=>{ne.status!=="known"&&$.push(ae)});const M=$.length>0?$[Math.floor(Math.random()*$.length)]:Math.floor(Math.random()*ie.length);C(M)}else C(0);D(!1),ve(null),Dt([])},[g]),F.useEffect(()=>{if(S.length!==0){if(Ce){const h=[];S.forEach((R,T)=>{R.status!=="known"&&h.push(T)});const z=h.length>0?h[Math.floor(Math.random()*h.length)]:Math.floor(Math.random()*S.length);C(z)}else C(0);D(!1),ve(null)}},[L]),F.useEffect(()=>{if(c.length>0){const h=c.filter(T=>T.status==="known").length,z=c.filter(T=>T.status==="unsure").length,R=c.filter(T=>T.status==="unknown").length;K({known:h,unsure:z,unknown:R}),localStorage.setItem(`${Mr}_${g}`,JSON.stringify(c))}},[c,g]),F.useEffect(()=>{const h=()=>{if(e.current&&n.current&&p.trim()===""){const R=e.current.getBoundingClientRect().bottom+window.scrollY,re=n.current.getBoundingClientRect().top-R,$=.75*(parseFloat(getComputedStyle(document.documentElement).fontSize)||16);let M=340;if(g==="knowledge")if(N&&r.current){const ae=Math.max(340,r.current.scrollHeight),Xn=t.current&&t.current.offsetHeight?t.current.offsetHeight:44;M=ae+$+Xn}else M=340;else if(r.current){const ae=Math.max(340,r.current.scrollHeight);if(Z!==null){const Xn=t.current&&t.current.offsetHeight?t.current.offsetHeight:44;M=ae+$+Xn}else M=ae}let ne=(re-M)/2-$;s(Math.max(0,ne))}};setTimeout(h,40),window.addEventListener("resize",h);const z=new ResizeObserver(h);return e.current&&z.observe(e.current),n.current&&z.observe(n.current),r.current&&z.observe(r.current),t.current&&z.observe(t.current),()=>{window.removeEventListener("resize",h),z.disconnect()}},[p,L,g,u,k,N,Z,v]),F.useEffect(()=>{if(r.current){const h=r.current.scrollHeight;l(`${Math.max(340,h)}px`)}if(N&&(Z!==null||g==="knowledge")){const h=setTimeout(()=>{const z=t.current,R=document.querySelector(".floating-mode-bar");if(z&&R){const T=z.getBoundingClientRect(),re=R.getBoundingClientRect(),$=T.bottom-(re.top-10);$>2&&window.scrollBy({top:$,behavior:"smooth"})}},50);return()=>clearTimeout(h)}else N||window.scrollTo({top:0,behavior:"smooth"})},[Z,x,N,g]);const U=c.filter(h=>{if(!p.trim())return!1;const z=p.trim().toLowerCase();return g==="knowledge"?h.title&&h.title.toLowerCase().includes(z)||h.content&&h.content.toLowerCase().includes(z)||h.chapter&&h.chapter.toLowerCase().includes(z)||h.section&&h.section.toLowerCase().includes(z):h.stem&&h.stem.toLowerCase().includes(z)||h.analysis&&h.analysis.toLowerCase().includes(z)||h.chapter&&h.chapter.toLowerCase().includes(z)||h.section&&h.section.toLowerCase().includes(z)||h.source&&h.source.toLowerCase().includes(z)||h.options&&h.options.some(R=>R.text&&R.text.toLowerCase().includes(z))}),ee=h=>{window.scrollTo({top:0,behavior:"instant"}),a(h.chapter||"all"),se("all"),w(""),d(!1),setTimeout(()=>{const R=c.filter(T=>h.chapter==="all"||T.chapter===h.chapter).findIndex(T=>T.id===h.id);R!==-1&&C(R),D(!1),ve(null)},20)},pn=h=>{if(j===h){se("all");return}if((h==="known"?B.known:h==="unsure"?B.unsure:h==="unknown"?B.unknown:0)===0){alert(`当前没有处于“${h==="known"?"已掌握":h==="unsure"?"模糊":"生词"}”状态的卡片！`);return}const R=S.findIndex(T=>T.status===h);if(R!==-1)window.scrollTo({top:0,behavior:"instant"}),se(h),C(R),D(!1),ve(null);else{alert("在当前选中的章节中没有处于该状态的卡片，已为你切换到“全部章节”。"),window.scrollTo({top:0,behavior:"instant"}),a("all"),se(h);const T=c.findIndex(re=>re.status===h);T!==-1&&C(T),D(!1),ve(null)}},$e=h=>{if(!x)return;window.scrollTo({top:0,behavior:"instant"});const z=c.findIndex(T=>T.id===x.id);if(z===-1)return;const R=[...c];R[z].status=h,f(R),D(!1),ve(null),Dt(T=>[...T,P]),setTimeout(()=>{let T=P,re=j;const ie=R.filter(M=>L==="all"?!0:M.chapter===L);let $=[];if(j!=="all"&&($=ie.map((M,ne)=>({status:M.status,index:ne})).filter(M=>M.status===j).map(M=>M.index),$.length===0&&(re="all",se("all"),alert("恭喜！你已复习完该状态下的所有卡片，系统已自动切回“全部”模式。"))),re==="all")if(Ce){const M=[];if(ie.forEach((ne,ae)=>{ne.status!=="known"&&M.push(ae)}),M.length>0){let ne=M;M.length>1&&(ne=M.filter(ae=>ae!==P)),T=ne[Math.floor(Math.random()*ne.length)]}else{const ae=Array.from({length:ie.length},(Xn,ga)=>ga).filter(Xn=>Xn!==P);T=ae.length>0?ae[Math.floor(Math.random()*ae.length)]:0}}else{let M=!1;for(let ne=0;ne<ie.length;ne++){let ae=(P+1+ne)%ie.length;if(ie[ae].status!=="known"){T=ae,M=!0;break}}M||(T=(P+1)%ie.length)}else if(Ce){let M=$;$.length>1&&(M=$.filter(ne=>ne!==P)),T=M[Math.floor(Math.random()*M.length)]}else{const M=$.find(ne=>ne>P);T=M!==void 0?M:$[0]}C(T)},30)},Nt=h=>{if(h.stopPropagation(),Tn.length>0){window.scrollTo({top:0,behavior:"instant"});const z=Tn[Tn.length-1];Dt(R=>R.slice(0,-1)),C(z),D(!1),ve(null)}},Ye=h=>{switch(h){case"known":return"rgba(16, 185, 129, 0.8)";case"unsure":return"rgba(245, 158, 11, 0.8)";case"unknown":return"rgba(239, 68, 68, 0.8)";default:return"rgba(107, 114, 128, 0.8)"}};if(!x)return m.jsx("div",{className:"loading",style:{textAlign:"center",padding:"3rem",color:"var(--text-secondary)"},children:"加载常识题库中..."});const Mn=c.length,va=B.known/(Mn||1)*100;return m.jsxs("div",{className:"app-container",children:[m.jsxs("header",{className:"header",ref:e,children:[m.jsxs("div",{className:"header-nav-bar",children:[m.jsx("button",{className:"header-icon-btn reset-header-btn",title:"重置当前模式学习进度",onClick:()=>{const h=g==="knowledge"?"考点模式":"真题模式";window.confirm(`确定要重置【${h}】的所有学习进度吗？（不可恢复）`)&&(localStorage.removeItem(`${Mr}_${g}`),window.location.reload())},children:m.jsxs("svg",{width:"17",height:"17",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.3",strokeLinecap:"round",strokeLinejoin:"round",children:[m.jsx("path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"}),m.jsx("path",{d:"M21 3v5h-5"})]})}),m.jsxs("button",{className:`header-meta-pill ${k?"active":""}`,onClick:()=>y(h=>!h),title:k?"收起筛选面板":"展开题库与章节面板",children:[m.jsx("span",{className:"pill-db-name",children:g==="knowledge"?"📖 考点模式":"✍️ 真题演练"}),m.jsx("span",{className:"pill-divider",children:"·"}),m.jsx("span",{className:"pill-cat-name",children:L==="all"?"全部章节":L.includes("法律")?"⚖️ 法律":L.includes("人文")?"📜 人文历史":L.includes("科技")?"🔬 科技":L.includes("地理")?"🌍 地理":L.includes("经济")?"📈 经济":L.length>5?L.slice(0,4)+"...":L}),m.jsxs("span",{className:"pill-progress-text",children:["(",P+1,"/",S.length,")"]}),m.jsx("span",{className:`pill-chevron ${k?"open":""}`,children:m.jsx("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.6",strokeLinecap:"round",strokeLinejoin:"round",children:m.jsx("polyline",{points:"6 9 12 15 18 9"})})})]}),m.jsx("button",{className:`header-icon-btn search-header-btn ${u||p?"active":""}`,onClick:()=>d(h=>!h),title:"搜索常识考点",children:m.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.3",strokeLinecap:"round",strokeLinejoin:"round",children:[m.jsx("circle",{cx:"11",cy:"11",r:"8"}),m.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]})})]}),(u||p.trim()!=="")&&m.jsxs("form",{className:"search-bar-box",onSubmit:h=>{var z;h.preventDefault(),(z=h.target.querySelector("input"))==null||z.blur()},children:[m.jsxs("svg",{className:"search-box-icon",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round",children:[m.jsx("circle",{cx:"11",cy:"11",r:"8"}),m.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]}),m.jsx("input",{type:"search",enterKeyHint:"search",autoFocus:!0,className:"search-box-input",placeholder:`搜索考点、题目、解析 (${c.length} 题)...`,value:p,onChange:h=>{w(h.target.value)},onKeyDown:h=>{h.key==="Enter"&&h.target.blur()}}),p&&m.jsx("button",{type:"button",className:"search-box-clear",onPointerDown:h=>{h.preventDefault(),h.stopPropagation(),w("")},onClick:h=>{h.preventDefault(),h.stopPropagation(),w("")},title:"清空搜索",children:"✕"})]}),k&&m.jsxs("div",{className:"progress-container panel-drawer-open",children:[m.jsx("div",{className:"progress-bar",children:m.jsx("div",{className:"progress-fill",style:{width:`${va}%`}})}),m.jsxs("div",{className:"stats",children:[m.jsxs("button",{className:`stat-item ${j==="known"?"active-known":""}`,onClick:()=>pn("known"),title:"只复习已掌握",children:[m.jsx("span",{className:"dot dot-known"}),"已掌握: ",m.jsx("span",{className:"stat-count",children:B.known})]}),m.jsxs("button",{className:`stat-item ${j==="unsure"?"active-unsure":""}`,onClick:()=>pn("unsure"),title:"只复习模糊",children:[m.jsx("span",{className:"dot dot-unsure"}),"模糊: ",m.jsx("span",{className:"stat-count",children:B.unsure})]}),m.jsxs("button",{className:`stat-item ${j==="unknown"?"active-unknown":""}`,onClick:()=>pn("unknown"),title:"只复习生词",children:[m.jsx("span",{className:"dot dot-unknown"}),"生词: ",m.jsx("span",{className:"stat-count",children:B.unknown})]}),m.jsxs("button",{className:`stat-item ${j==="all"?"active-all":""}`,onClick:()=>se("all"),title:"查看全部",children:["总计: ",m.jsx("span",{className:"stat-count",children:Mn})]})]}),m.jsx("div",{className:"category-scroll-container",children:m.jsx("div",{className:"category-scroll-track",children:[{key:"all",label:"全部章节"},{key:"第一章 法律常识",label:"⚖️ 法律"},{key:"第二章 人文历史常识",label:"📜 人文历史"},{key:"第三章 科技常识",label:"🔬 科技"},{key:"第四章 地理常识",label:"🌍 地理"},{key:"第五章 经济常识",label:"📈 经济"}].map(h=>m.jsx("button",{className:`cat-chip ${L===h.key?"active":""}`,onClick:()=>a(h.key),children:h.label},h.key))})})]})]}),m.jsx("main",{className:"main-content",children:p.trim()!==""?m.jsxs("div",{className:"search-knowledge-view",children:[m.jsxs("div",{className:"search-results-bar",children:[m.jsxs("span",{className:"search-count-text",children:["共匹配到 ",m.jsx("strong",{children:U.length})," 个",g==="knowledge"?"考点":"题目"]}),m.jsx("button",{className:"search-clear-action-btn",onClick:()=>w(""),children:"清空搜索"})]}),U.length===0?m.jsx("div",{className:"empty-state-card",style:{background:"white",borderRadius:"20px",padding:"2rem",textAlign:"center"},children:m.jsxs("p",{style:{color:"var(--text-secondary)"},children:["没有找到匹配的",g==="knowledge"?"考点":"题目"]})}):m.jsx("div",{className:"knowledge-cards-list",children:U.map(h=>m.jsxs("div",{className:"knowledge-card",onClick:()=>ee(h),children:[m.jsxs("div",{className:"knowledge-card-top",children:[m.jsxs("div",{className:"knowledge-chapter-wrap",children:[m.jsx("span",{className:"knowledge-chapter-name",children:h.chapter}),h.section&&m.jsxs("span",{className:"knowledge-group-name",children:["· ",h.section]})]}),m.jsx("span",{className:`knowledge-status-tag status-tag-${h.status||"new"}`,children:h.status==="known"?"已掌握":h.status==="unsure"?"模糊":h.status==="unknown"?"生词":"未复习"})]}),g==="knowledge"?m.jsxs(m.Fragment,{children:[m.jsx("h4",{style:{margin:0,fontSize:"1.05rem",color:"var(--text-primary)",fontWeight:"700"},children:It(h.title,p)}),m.jsx("p",{style:{margin:0,fontSize:"0.88rem",color:"var(--text-secondary)",lineHeight:"1.6"},children:It(h.content,p)})]}):m.jsxs(m.Fragment,{children:[m.jsx("h4",{style:{margin:0,fontSize:"0.98rem",color:"var(--text-primary)",fontWeight:"600",lineHeight:"1.6"},children:It(h.stem,p)}),h.source&&m.jsxs("div",{style:{fontSize:"0.78rem",color:"#64748b",fontWeight:"600"},children:["🎯 来源：",It(h.source,p)]}),m.jsxs("div",{style:{fontSize:"0.85rem",color:"var(--text-secondary)",background:"#f8fafc",padding:"0.5rem 0.75rem",borderRadius:"8px",borderLeft:"3px solid var(--accent-color)"},children:[m.jsxs("strong",{children:["正确答案：",h.answer]}),m.jsx("p",{style:{margin:"0.3rem 0 0 0",lineHeight:"1.5"},children:It(h.analysis,p)})]})]})]},h.id))})]}):m.jsxs(m.Fragment,{children:[g==="knowledge"?m.jsx("div",{className:`card-container ${N?"expanded":""}`,style:{height:N?i:"340px",marginTop:`${o}px`},onClick:()=>D(!N),children:m.jsxs("div",{className:`card ${N?"flipped":""}`,children:[m.jsxs("div",{className:"card-front",children:[m.jsxs("div",{className:"card-top-bar",children:[m.jsxs("div",{className:"group-tag",children:[x.chapter,x.section&&x.section!==x.chapter?` · ${x.section}`:""]}),x.status!=="new"&&m.jsxs("div",{className:"status-badge-inline",style:{backgroundColor:Ye(x.status)},children:["上次标记: ",x.status==="known"?"认识":x.status==="unsure"?"模糊":"不认识"]})]}),m.jsxs("div",{className:"card-front-center-content",children:[m.jsx("h2",{className:"idiom-word",style:(()=>{const h=(x.title||"").length;return h<=4?{fontSize:"2.6rem",fontWeight:"800",letterSpacing:"0.1rem",margin:0}:h<=8?{fontSize:"1.9rem",fontWeight:"700",letterSpacing:"0.04rem",lineHeight:"1.35",margin:0}:h<=14?{fontSize:"1.5rem",fontWeight:"700",letterSpacing:"0.02rem",lineHeight:"1.4",margin:0}:{fontSize:"1.25rem",fontWeight:"700",letterSpacing:"0",lineHeight:"1.45",margin:0}})(),children:x.title}),m.jsx("div",{className:"card-hint",style:{marginTop:"1.25rem"},children:"点击翻转查看考点精释"})]})]}),m.jsx("div",{className:"card-back",children:m.jsxs("div",{className:"card-back-inner",ref:r,children:[m.jsxs("div",{className:"group-tag",children:[x.chapter,x.section&&x.section!==x.chapter?` · ${x.section}`:""]}),m.jsxs("div",{className:"card-back-content",style:{width:"100%"},children:[m.jsx("h3",{children:x.title}),m.jsx("div",{className:"full-definition-container fc-container",children:lu(x.content)})]})]})})]})}):m.jsxs("div",{className:"card-front",style:{position:"relative",height:"auto",minHeight:"340px",justifyContent:"flex-start",alignItems:"stretch",padding:"1.25rem 1.5rem",cursor:"default",marginTop:Z===null?`${o}px`:void 0},children:[m.jsxs("div",{className:"card-top-bar",style:{position:"relative",top:0,left:0,right:0,marginBottom:"0.75rem"},children:[m.jsxs("div",{className:"group-tag",style:{margin:0},children:[x.chapter,x.section&&x.section!==x.chapter?` · ${x.section}`:""]}),x.status!=="new"&&m.jsxs("div",{className:"status-badge-inline",style:{backgroundColor:Ye(x.status)},children:["上次标记: ",x.status==="known"?"认识":x.status==="unsure"?"模糊":"不认识"]})]}),x.source&&m.jsxs("div",{style:{fontSize:"0.8rem",color:"var(--text-secondary)",marginBottom:"0.5rem",fontWeight:"700",textAlign:"left"},children:["🎯 来源：",x.source]}),m.jsx("h3",{style:{fontSize:"1.05rem",fontWeight:"700",lineHeight:"1.7",color:"var(--text-primary)",marginBottom:"1rem",textAlign:"left"},children:x.stem}),m.jsx("div",{style:{fontSize:"0.88rem",color:"var(--text-secondary)",fontWeight:"600",marginBottom:"0.5rem",textAlign:"left"},children:"请选择正确选项："}),m.jsx("div",{className:"options-container",children:(x.options||[]).map(h=>{let z="option-btn";return Z!==null&&(h.key===x.answer?z+=" correct":Z===h.key&&(z+=" incorrect"),z+=" disabled"),m.jsxs("button",{className:z,onClick:()=>{Z===null&&ve(h.key)},disabled:Z!==null,children:[m.jsx("span",{className:"option-label",children:Z!==null&&h.key===x.answer?"✓ ":Z!==null&&Z===h.key?"✗ ":`${h.key}. `}),m.jsx("span",{style:{flex:1,lineHeight:"1.5"},children:h.text})]},h.key)})}),Z!==null&&m.jsxs("div",{className:"full-definition-container fc-container",style:{borderLeftColor:Z===x.answer?"#10b981":"#ef4444",background:Z===x.answer?"rgba(16, 185, 129, 0.05)":"rgba(239, 68, 68, 0.05)",marginTop:"0.8rem",textAlign:"left"},children:[m.jsxs("strong",{style:{color:Z===x.answer?"#065f46":"#991b1b",display:"block",marginBottom:"0.4rem",fontSize:"0.98rem"},children:["【",Z===x.answer?"回答正确 ✓":"回答错误 ✗","】正确答案是 ",x.answer]}),lu(x.analysis)]})]}),m.jsxs("div",{ref:t,className:`action-buttons ${g==="knowledge"&&!N||g==="quiz"&&Z===null?"hidden":""}`,children:[m.jsx("button",{className:"btn btn-prev",onClick:Nt,disabled:Tn.length===0,children:"上一题"}),m.jsx("button",{className:"btn btn-unknown",onClick:h=>{h.stopPropagation(),$e("unknown")},children:"不认识"}),m.jsx("button",{className:"btn btn-unsure",onClick:h=>{h.stopPropagation(),$e("unsure")},children:"模糊"}),m.jsx("button",{className:"btn btn-known",onClick:h=>{h.stopPropagation(),$e("known")},children:"认识"})]})]})}),m.jsxs("nav",{className:"floating-mode-bar",ref:n,children:[m.jsx("button",{className:`mode-btn ${g==="knowledge"?"active":""}`,onClick:()=>{E("knowledge"),D(!1),ve(null)},children:"考点模式"}),m.jsx("button",{className:`mode-btn ${g==="quiz"?"active":""}`,onClick:()=>{E("quiz"),D(!1),ve(null)},children:"真题模式"}),m.jsx("span",{className:"mode-divider"}),m.jsx("button",{className:`mode-btn random-btn ${Ce?"":"active"}`,onClick:()=>fn(!1),children:"顺序"}),m.jsx("button",{className:`mode-btn random-btn ${Ce?"active":""}`,onClick:()=>{if(fn(!0),S.length>0){const h=Math.floor(Math.random()*S.length);C(h),D(!1),ve(null)}},children:"随机"})]})]})}ol.createRoot(document.getElementById("root")).render(m.jsx(Ia.StrictMode,{children:m.jsx(Yf,{})}));
