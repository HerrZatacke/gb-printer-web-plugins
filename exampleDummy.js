!function(){var t={3099:function(t){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},9670:function(t,n,r){var e=r(111);t.exports=function(t){if(!e(t))throw TypeError(String(t)+" is not an object");return t}},1318:function(t,n,r){var e=r(5656),o=r(7466),i=r(1400),c=function(t){return function(n,r,c){var u,f=e(n),a=o(f.length),s=i(c,a);if(t&&r!=r){for(;a>s;)if((u=f[s++])!=u)return!0}else for(;a>s;s++)if((t||s in f)&&f[s]===r)return t||s||0;return!t&&-1}};t.exports={includes:c(!0),indexOf:c(!1)}},2092:function(t,n,r){var e=r(9974),o=r(8361),i=r(7908),c=r(7466),u=r(5417),f=[].push,a=function(t){var n=1==t,r=2==t,a=3==t,s=4==t,l=6==t,p=7==t,v=5==t||l;return function(y,g,h,b){for(var d,m,w=i(y),x=o(w),O=e(g,h,3),j=c(x.length),A=0,S=b||u,P=n?S(y,j):r||p?S(y,0):void 0;j>A;A++)if((v||A in x)&&(m=O(d=x[A],A,w),t))if(n)P[A]=m;else if(m)switch(t){case 3:return!0;case 5:return d;case 6:return A;case 2:f.call(P,d)}else switch(t){case 4:return!1;case 7:f.call(P,d)}return l?-1:a||s?s:P}};t.exports={forEach:a(0),map:a(1),filter:a(2),some:a(3),every:a(4),find:a(5),findIndex:a(6),filterOut:a(7)}},5417:function(t,n,r){var e=r(111),o=r(3157),i=r(5112)("species");t.exports=function(t,n){var r;return o(t)&&("function"!=typeof(r=t.constructor)||r!==Array&&!o(r.prototype)?e(r)&&null===(r=r[i])&&(r=void 0):r=void 0),new(void 0===r?Array:r)(0===n?0:n)}},4326:function(t){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},9920:function(t,n,r){var e=r(6656),o=r(3887),i=r(1236),c=r(3070);t.exports=function(t,n){for(var r=o(n),u=c.f,f=i.f,a=0;a<r.length;a++){var s=r[a];e(t,s)||u(t,s,f(n,s))}}},8880:function(t,n,r){var e=r(9781),o=r(3070),i=r(9114);t.exports=e?function(t,n,r){return o.f(t,n,i(1,r))}:function(t,n,r){return t[n]=r,t}},9114:function(t){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},7235:function(t,n,r){var e=r(857),o=r(6656),i=r(6061),c=r(3070).f;t.exports=function(t){var n=e.Symbol||(e.Symbol={});o(n,t)||c(n,t,{value:i.f(t)})}},9781:function(t,n,r){var e=r(7293);t.exports=!e((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},317:function(t,n,r){var e=r(7854),o=r(111),i=e.document,c=o(i)&&o(i.createElement);t.exports=function(t){return c?i.createElement(t):{}}},8113:function(t,n,r){var e=r(5005);t.exports=e("navigator","userAgent")||""},7392:function(t,n,r){var e,o,i=r(7854),c=r(8113),u=i.process,f=u&&u.versions,a=f&&f.v8;a?o=(e=a.split("."))[0]<4?1:e[0]+e[1]:c&&(!(e=c.match(/Edge\/(\d+)/))||e[1]>=74)&&(e=c.match(/Chrome\/(\d+)/))&&(o=e[1]),t.exports=o&&+o},748:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2109:function(t,n,r){var e=r(7854),o=r(1236).f,i=r(8880),c=r(1320),u=r(3505),f=r(9920),a=r(4705);t.exports=function(t,n){var r,s,l,p,v,y=t.target,g=t.global,h=t.stat;if(r=g?e:h?e[y]||u(y,{}):(e[y]||{}).prototype)for(s in n){if(p=n[s],l=t.noTargetGet?(v=o(r,s))&&v.value:r[s],!a(g?s:y+(h?".":"#")+s,t.forced)&&void 0!==l){if(typeof p==typeof l)continue;f(p,l)}(t.sham||l&&l.sham)&&i(p,"sham",!0),c(r,s,p,t)}}},7293:function(t){t.exports=function(t){try{return!!t()}catch(t){return!0}}},9974:function(t,n,r){var e=r(3099);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 0:return function(){return t.call(n)};case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},5005:function(t,n,r){var e=r(857),o=r(7854),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,n){return arguments.length<2?i(e[t])||i(o[t]):e[t]&&e[t][n]||o[t]&&o[t][n]}},7854:function(t,n,r){var e=function(t){return t&&t.Math==Math&&t};t.exports=e("object"==typeof globalThis&&globalThis)||e("object"==typeof window&&window)||e("object"==typeof self&&self)||e("object"==typeof r.g&&r.g)||function(){return this}()||Function("return this")()},6656:function(t,n,r){var e=r(7908),o={}.hasOwnProperty;t.exports=Object.hasOwn||function(t,n){return o.call(e(t),n)}},3501:function(t){t.exports={}},490:function(t,n,r){var e=r(5005);t.exports=e("document","documentElement")},4664:function(t,n,r){var e=r(9781),o=r(7293),i=r(317);t.exports=!e&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},8361:function(t,n,r){var e=r(7293),o=r(4326),i="".split;t.exports=e((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},2788:function(t,n,r){var e=r(5465),o=Function.toString;"function"!=typeof e.inspectSource&&(e.inspectSource=function(t){return o.call(t)}),t.exports=e.inspectSource},9909:function(t,n,r){var e,o,i,c=r(8536),u=r(7854),f=r(111),a=r(8880),s=r(6656),l=r(5465),p=r(6200),v=r(3501),y="Object already initialized",g=u.WeakMap;if(c||l.state){var h=l.state||(l.state=new g),b=h.get,d=h.has,m=h.set;e=function(t,n){if(d.call(h,t))throw new TypeError(y);return n.facade=t,m.call(h,t,n),n},o=function(t){return b.call(h,t)||{}},i=function(t){return d.call(h,t)}}else{var w=p("state");v[w]=!0,e=function(t,n){if(s(t,w))throw new TypeError(y);return n.facade=t,a(t,w,n),n},o=function(t){return s(t,w)?t[w]:{}},i=function(t){return s(t,w)}}t.exports={set:e,get:o,has:i,enforce:function(t){return i(t)?o(t):e(t,{})},getterFor:function(t){return function(n){var r;if(!f(n)||(r=o(n)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}}}},3157:function(t,n,r){var e=r(4326);t.exports=Array.isArray||function(t){return"Array"==e(t)}},4705:function(t,n,r){var e=r(7293),o=/#|\.prototype\./,i=function(t,n){var r=u[c(t)];return r==a||r!=f&&("function"==typeof n?e(n):!!n)},c=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},u=i.data={},f=i.NATIVE="N",a=i.POLYFILL="P";t.exports=i},111:function(t){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},1913:function(t){t.exports=!1},133:function(t,n,r){var e=r(7392),o=r(7293);t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol();return!String(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&e&&e<41}))},8536:function(t,n,r){var e=r(7854),o=r(2788),i=e.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},1574:function(t,n,r){"use strict";var e=r(9781),o=r(7293),i=r(1956),c=r(5181),u=r(5296),f=r(7908),a=r(8361),s=Object.assign,l=Object.defineProperty;t.exports=!s||o((function(){if(e&&1!==s({b:1},s(l({},"a",{enumerable:!0,get:function(){l(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var t={},n={},r=Symbol(),o="abcdefghijklmnopqrst";return t[r]=7,o.split("").forEach((function(t){n[t]=t})),7!=s({},t)[r]||i(s({},n)).join("")!=o}))?function(t,n){for(var r=f(t),o=arguments.length,s=1,l=c.f,p=u.f;o>s;)for(var v,y=a(arguments[s++]),g=l?i(y).concat(l(y)):i(y),h=g.length,b=0;h>b;)v=g[b++],e&&!p.call(y,v)||(r[v]=y[v]);return r}:s},30:function(t,n,r){var e,o=r(9670),i=r(6048),c=r(748),u=r(3501),f=r(490),a=r(317),s=r(6200),l=s("IE_PROTO"),p=function(){},v=function(t){return"<script>"+t+"</"+"script>"},y=function(){try{e=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,n;y=e?function(t){t.write(v("")),t.close();var n=t.parentWindow.Object;return t=null,n}(e):((n=a("iframe")).style.display="none",f.appendChild(n),n.src=String("javascript:"),(t=n.contentWindow.document).open(),t.write(v("document.F=Object")),t.close(),t.F);for(var r=c.length;r--;)delete y.prototype[c[r]];return y()};u[l]=!0,t.exports=Object.create||function(t,n){var r;return null!==t?(p.prototype=o(t),r=new p,p.prototype=null,r[l]=t):r=y(),void 0===n?r:i(r,n)}},6048:function(t,n,r){var e=r(9781),o=r(3070),i=r(9670),c=r(1956);t.exports=e?Object.defineProperties:function(t,n){i(t);for(var r,e=c(n),u=e.length,f=0;u>f;)o.f(t,r=e[f++],n[r]);return t}},3070:function(t,n,r){var e=r(9781),o=r(4664),i=r(9670),c=r(7593),u=Object.defineProperty;n.f=e?u:function(t,n,r){if(i(t),n=c(n,!0),i(r),o)try{return u(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[n]=r.value),t}},1236:function(t,n,r){var e=r(9781),o=r(5296),i=r(9114),c=r(5656),u=r(7593),f=r(6656),a=r(4664),s=Object.getOwnPropertyDescriptor;n.f=e?s:function(t,n){if(t=c(t),n=u(n,!0),a)try{return s(t,n)}catch(t){}if(f(t,n))return i(!o.f.call(t,n),t[n])}},1156:function(t,n,r){var e=r(5656),o=r(8006).f,i={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return c&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return c.slice()}}(t):o(e(t))}},8006:function(t,n,r){var e=r(6324),o=r(748).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return e(t,o)}},5181:function(t,n){n.f=Object.getOwnPropertySymbols},6324:function(t,n,r){var e=r(6656),o=r(5656),i=r(1318).indexOf,c=r(3501);t.exports=function(t,n){var r,u=o(t),f=0,a=[];for(r in u)!e(c,r)&&e(u,r)&&a.push(r);for(;n.length>f;)e(u,r=n[f++])&&(~i(a,r)||a.push(r));return a}},1956:function(t,n,r){var e=r(6324),o=r(748);t.exports=Object.keys||function(t){return e(t,o)}},5296:function(t,n){"use strict";var r={}.propertyIsEnumerable,e=Object.getOwnPropertyDescriptor,o=e&&!r.call({1:2},1);n.f=o?function(t){var n=e(this,t);return!!n&&n.enumerable}:r},3887:function(t,n,r){var e=r(5005),o=r(8006),i=r(5181),c=r(9670);t.exports=e("Reflect","ownKeys")||function(t){var n=o.f(c(t)),r=i.f;return r?n.concat(r(t)):n}},857:function(t,n,r){var e=r(7854);t.exports=e},1320:function(t,n,r){var e=r(7854),o=r(8880),i=r(6656),c=r(3505),u=r(2788),f=r(9909),a=f.get,s=f.enforce,l=String(String).split("String");(t.exports=function(t,n,r,u){var f,a=!!u&&!!u.unsafe,p=!!u&&!!u.enumerable,v=!!u&&!!u.noTargetGet;"function"==typeof r&&("string"!=typeof n||i(r,"name")||o(r,"name",n),(f=s(r)).source||(f.source=l.join("string"==typeof n?n:""))),t!==e?(a?!v&&t[n]&&(p=!0):delete t[n],p?t[n]=r:o(t,n,r)):p?t[n]=r:c(n,r)})(Function.prototype,"toString",(function(){return"function"==typeof this&&a(this).source||u(this)}))},4488:function(t){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},3505:function(t,n,r){var e=r(7854),o=r(8880);t.exports=function(t,n){try{o(e,t,n)}catch(r){e[t]=n}return n}},8003:function(t,n,r){var e=r(3070).f,o=r(6656),i=r(5112)("toStringTag");t.exports=function(t,n,r){t&&!o(t=r?t:t.prototype,i)&&e(t,i,{configurable:!0,value:n})}},6200:function(t,n,r){var e=r(2309),o=r(9711),i=e("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},5465:function(t,n,r){var e=r(7854),o=r(3505),i="__core-js_shared__",c=e[i]||o(i,{});t.exports=c},2309:function(t,n,r){var e=r(1913),o=r(5465);(t.exports=function(t,n){return o[t]||(o[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.15.2",mode:e?"pure":"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})},1400:function(t,n,r){var e=r(9958),o=Math.max,i=Math.min;t.exports=function(t,n){var r=e(t);return r<0?o(r+n,0):i(r,n)}},5656:function(t,n,r){var e=r(8361),o=r(4488);t.exports=function(t){return e(o(t))}},9958:function(t){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},7466:function(t,n,r){var e=r(9958),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},7908:function(t,n,r){var e=r(4488);t.exports=function(t){return Object(e(t))}},7593:function(t,n,r){var e=r(111);t.exports=function(t,n){if(!e(t))return t;var r,o;if(n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!e(o=r.call(t)))return o;if(!n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},9711:function(t){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},3307:function(t,n,r){var e=r(133);t.exports=e&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},6061:function(t,n,r){var e=r(5112);n.f=e},5112:function(t,n,r){var e=r(7854),o=r(2309),i=r(6656),c=r(9711),u=r(133),f=r(3307),a=o("wks"),s=e.Symbol,l=f?s:s&&s.withoutSetter||c;t.exports=function(t){return i(a,t)&&(u||"string"==typeof a[t])||(u&&i(s,t)?a[t]=s[t]:a[t]=l("Symbol."+t)),a[t]}},8309:function(t,n,r){var e=r(9781),o=r(3070).f,i=Function.prototype,c=i.toString,u=/^\s*function ([^ (]*)/,f="name";e&&!(f in i)&&o(i,f,{configurable:!0,get:function(){try{return c.call(this).match(u)[1]}catch(t){return""}}})},9601:function(t,n,r){var e=r(2109),o=r(1574);e({target:"Object",stat:!0,forced:Object.assign!==o},{assign:o})},9070:function(t,n,r){var e=r(2109),o=r(9781);e({target:"Object",stat:!0,forced:!o,sham:!o},{defineProperty:r(3070).f})},1817:function(t,n,r){"use strict";var e=r(2109),o=r(9781),i=r(7854),c=r(6656),u=r(111),f=r(3070).f,a=r(9920),s=i.Symbol;if(o&&"function"==typeof s&&(!("description"in s.prototype)||void 0!==s().description)){var l={},p=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),n=this instanceof p?new s(t):void 0===t?s():s(t);return""===t&&(l[n]=!0),n};a(p,s);var v=p.prototype=s.prototype;v.constructor=p;var y=v.toString,g="Symbol(test)"==String(s("test")),h=/^Symbol\((.*)\)[^)]+$/;f(v,"description",{configurable:!0,get:function(){var t=u(this)?this.valueOf():this,n=y.call(t);if(c(l,t))return"";var r=g?n.slice(7,-1):n.replace(h,"$1");return""===r?void 0:r}}),e({global:!0,forced:!0},{Symbol:p})}},2526:function(t,n,r){"use strict";var e=r(2109),o=r(7854),i=r(5005),c=r(1913),u=r(9781),f=r(133),a=r(3307),s=r(7293),l=r(6656),p=r(3157),v=r(111),y=r(9670),g=r(7908),h=r(5656),b=r(7593),d=r(9114),m=r(30),w=r(1956),x=r(8006),O=r(1156),j=r(5181),A=r(1236),S=r(3070),P=r(5296),T=r(8880),E=r(1320),C=r(2309),I=r(6200),M=r(3501),k=r(9711),F=r(5112),N=r(6061),R=r(7235),D=r(8003),L=r(9909),X=r(2092).forEach,Y=I("hidden"),z="Symbol",J=F("toPrimitive"),G=L.set,W=L.getterFor(z),q=Object.prototype,H=o.Symbol,K=i("JSON","stringify"),B=A.f,V=S.f,Z=O.f,Q=P.f,U=C("symbols"),_=C("op-symbols"),$=C("string-to-symbol-registry"),tt=C("symbol-to-string-registry"),nt=C("wks"),rt=o.QObject,et=!rt||!rt.prototype||!rt.prototype.findChild,ot=u&&s((function(){return 7!=m(V({},"a",{get:function(){return V(this,"a",{value:7}).a}})).a}))?function(t,n,r){var e=B(q,n);e&&delete q[n],V(t,n,r),e&&t!==q&&V(q,n,e)}:V,it=function(t,n){var r=U[t]=m(H.prototype);return G(r,{type:z,tag:t,description:n}),u||(r.description=n),r},ct=a?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof H},ut=function(t,n,r){t===q&&ut(_,n,r),y(t);var e=b(n,!0);return y(r),l(U,e)?(r.enumerable?(l(t,Y)&&t[Y][e]&&(t[Y][e]=!1),r=m(r,{enumerable:d(0,!1)})):(l(t,Y)||V(t,Y,d(1,{})),t[Y][e]=!0),ot(t,e,r)):V(t,e,r)},ft=function(t,n){y(t);var r=h(n),e=w(r).concat(pt(r));return X(e,(function(n){u&&!at.call(r,n)||ut(t,n,r[n])})),t},at=function(t){var n=b(t,!0),r=Q.call(this,n);return!(this===q&&l(U,n)&&!l(_,n))&&(!(r||!l(this,n)||!l(U,n)||l(this,Y)&&this[Y][n])||r)},st=function(t,n){var r=h(t),e=b(n,!0);if(r!==q||!l(U,e)||l(_,e)){var o=B(r,e);return!o||!l(U,e)||l(r,Y)&&r[Y][e]||(o.enumerable=!0),o}},lt=function(t){var n=Z(h(t)),r=[];return X(n,(function(t){l(U,t)||l(M,t)||r.push(t)})),r},pt=function(t){var n=t===q,r=Z(n?_:h(t)),e=[];return X(r,(function(t){!l(U,t)||n&&!l(q,t)||e.push(U[t])})),e};(f||(E((H=function(){if(this instanceof H)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,n=k(t),r=function(t){this===q&&r.call(_,t),l(this,Y)&&l(this[Y],n)&&(this[Y][n]=!1),ot(this,n,d(1,t))};return u&&et&&ot(q,n,{configurable:!0,set:r}),it(n,t)}).prototype,"toString",(function(){return W(this).tag})),E(H,"withoutSetter",(function(t){return it(k(t),t)})),P.f=at,S.f=ut,A.f=st,x.f=O.f=lt,j.f=pt,N.f=function(t){return it(F(t),t)},u&&(V(H.prototype,"description",{configurable:!0,get:function(){return W(this).description}}),c||E(q,"propertyIsEnumerable",at,{unsafe:!0}))),e({global:!0,wrap:!0,forced:!f,sham:!f},{Symbol:H}),X(w(nt),(function(t){R(t)})),e({target:z,stat:!0,forced:!f},{for:function(t){var n=String(t);if(l($,n))return $[n];var r=H(n);return $[n]=r,tt[r]=n,r},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(l(tt,t))return tt[t]},useSetter:function(){et=!0},useSimple:function(){et=!1}}),e({target:"Object",stat:!0,forced:!f,sham:!u},{create:function(t,n){return void 0===n?m(t):ft(m(t),n)},defineProperty:ut,defineProperties:ft,getOwnPropertyDescriptor:st}),e({target:"Object",stat:!0,forced:!f},{getOwnPropertyNames:lt,getOwnPropertySymbols:pt}),e({target:"Object",stat:!0,forced:s((function(){j.f(1)}))},{getOwnPropertySymbols:function(t){return j.f(g(t))}}),K)&&e({target:"JSON",stat:!0,forced:!f||s((function(){var t=H();return"[null]"!=K([t])||"{}"!=K({a:t})||"{}"!=K(Object(t))}))},{stringify:function(t,n,r){for(var e,o=[t],i=1;arguments.length>i;)o.push(arguments[i++]);if(e=n,(v(n)||void 0!==t)&&!ct(t))return p(n)||(n=function(t,n){if("function"==typeof e&&(n=e.call(this,t,n)),!ct(n))return n}),o[1]=n,K.apply(null,o)}});H.prototype[J]||T(H.prototype,J,H.prototype.valueOf),D(H,z),M[Y]=!0}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,r),i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),function(){"use strict";r(8309),r(2526),r(1817),r(9601),r(9070);function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}var n=function(){function n(t,r){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),this.name="Dummy Plugin",this.description="This is a dummy plugin which just 'console.log's some stuff",this.configParams={message:{label:"A message",type:"string"},amount:{label:"A number",type:"number"}},this.config=r,this.saveAs=t.saveAs,this.progress=t.progress,console.log(t,this.config),console.log("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgAgMAAAD2oY++AAAADFBMVEUAAABPUU6RlJD////2OIW8AAAACXBIWXMAAC4jAAAuIwF4pT92AAADJklEQVRYw+XTza3qMBAF4IlEAbCgnyxIAUjXT6KAsKCfuwgFICVIFEAW9MMCCkBKnu04jn9mxuFeFk96Z20dfZwJAP90csjz/JOFC1jIfIwns8k3Mh/lLRZvNC55Xq55mzeMGcMbcIvZjUtYyqyWadwbxkwlsd68xoEngSrIl2eO+45R47JVFjdG6yUbDW7gucacWE/lS4fnZVnYaHmIblOokOutgtDH1TwNFF9CCOTLC3BTI3pal1eIsHGJ6lS2KyBOa9YTNvRx/awhxSuCRvPXQLNVAZrnAKfG6LQuTwdpLJz1vMbwy3PXUzqx1Q/59dxG6rgTb72OGotwPaeRPO7EE76R5n2rAHFawxPrqJHEiZ3YyQBx2m30Y+wfQ5C870oG+PW8RsMrCqxS8apd1IjzhCjLEuIvL+JVkdGuF+SPDJDr6VRhY3Ral1fuy/0eEJzwcKFxTfA0cI82RjzTuOXW0zwdmMGrqrquYRV9eS5O8+LGHc6rjjKArVcOPC/gnraKeLXi1Y0MkMedeIGR5h2PqhFfL8oJ6PXqkacD/HpjDgewOJoXNnqndXky8iG6ns+LjBRPpQFsvIDnNJYlsZ7inYaHM3gqd2BwIw9rRHCjkcadTt7D+MsLcM1dB3CfxwuMNO/SXC4XKNM8p1Hzaop3vz/uD8DXaw5I45HjmTwuQJw2NmK4xsWZALed1ziD5zWi29lcr1cgjzvx3EaW15yb8xnQw448t5E47YhTPB1A10MCCd4APIfGS7iea2TX02mvbdsCv57TyK83pD3bRgY3NnLraZwJ3Nn1xnQdzOANjc6XRwMfjyeQx239AL+e4klghxjPNkFjEvd46gCCC3lDYxLX9V0vA/x6vpEufdqYRp7HGjuTfgwkcXzj0/L6p2lM4mReMkDiJp4xpnlte2tvMINnjSmeSg/kcYNA/OUFPBPATuvhxkYSZ3j9yzxM4qyRXc9kbPTXIxr59ZyH5HHnNDq429TIrkc2WtwrepjEkcaYNzycwQsaw+OGD/uZAeK0v2xETvt7I7HejxrZ9X7SeLtx6/2k8fWa+fA9Y3/7YON/+fAvry6ACPyhSHAAAAAASUVORK5CYII=")}var r,e,o;return r=n,(e=[{key:"setConfig",value:function(t){Object.assign(this.config,t),console.log(this.config)}},{key:"withImage",value:function(t){t.getMeta().then((function(t){return console.log(t)})),t.getPalette().then((function(t){return console.log(t)})),t.getTiles().then((function(t){return console.log(t)})),t.getCanvas().then((function(t){return console.log(t)}))}},{key:"withSelection",value:function(t){console.log(t)}}])&&t(r.prototype,e),o&&t(r,o),n}();window.gbpwRegisterPlugin(n)}()}();