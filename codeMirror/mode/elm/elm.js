(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(A){A.defineMode("elm",function(){function O(Q,R,S){R(S);return S(Q,R)}var P=/[a-z_]/;var D=/[A-Z]/;var G=/[0-9]/;var M=/[0-9A-Fa-f]/;var J=/[0-7]/;var E=/[a-z_A-Z0-9\']/;var N=/[-!#$%&*+.\/<=>?@\\^|~:\u03BB\u2192]/;var I=/[(),;[\]`{}]/;var L=/[ \t\v\f]/;function H(){return function(Q,R){if(Q.eatWhile(L)){return null}var S=Q.next();if(I.test(S)){if(S=="{"&&Q.eat("-")){var T="comment";if(Q.eat("#")){T="meta"}return O(Q,R,F(T,1))}return null}if(S=="'"){if(Q.eat("\\")){Q.next()}else{Q.next()}if(Q.eat("'")){return"string"}return"error"}if(S=='"'){return O(Q,R,K)}if(D.test(S)){Q.eatWhile(E);if(Q.eat(".")){return"qualifier"}return"variable-2"}if(P.test(S)){var U=Q.pos===1;Q.eatWhile(E);return U?"variable-3":"variable"}if(G.test(S)){if(S=="0"){if(Q.eat(/[xX]/)){Q.eatWhile(M);return"integer"}if(Q.eat(/[oO]/)){Q.eatWhile(J);return"number"}}Q.eatWhile(G);var T="number";if(Q.eat(".")){T="number";Q.eatWhile(G)}if(Q.eat(/[eE]/)){T="number";Q.eat(/[-+]/);Q.eatWhile(G)}return T}if(N.test(S)){if(S=="-"&&Q.eat(/-/)){Q.eatWhile(/-/);if(!Q.eat(N)){Q.skipToEnd();return"comment"}}Q.eatWhile(N);return"builtin"}return"error"}}function F(Q,R){if(R==0){return H()}return function(S,T){var V=R;while(!S.eol()){var U=S.next();if(U=="{"&&S.eat("-")){++V}else{if(U=="-"&&S.eat("}")){--V;if(V==0){T(H());return Q}}}}T(F(Q,V));return Q}}function K(Q,R){while(!Q.eol()){var S=Q.next();if(S=='"'){R(H());return"string"}if(S=="\\"){if(Q.eol()||Q.eat(L)){R(B);return"string"}if(!Q.eat("&")){Q.next()}}}R(H());return"error"}function B(Q,R){if(Q.eat("\\")){return O(Q,R,K)}Q.next();R(H());return"error"}var C=(function(){var S={};var R=["case","of","as","if","then","else","let","in","infix","infixl","infixr","type","alias","input","output","foreign","loopback","module","where","import","exposing","_","..","|",":","=","\\",'"',"->","<-"];for(var Q=R.length;Q--;){S[R[Q]]="keyword"}return S})();return{startState:function(){return{f:H()}},copyState:function(Q){return{f:Q.f}},token:function(T,R){var S=R.f(T,function(U){R.f=U});var Q=T.current();return(C.hasOwnProperty(Q))?C[Q]:S}}});A.defineMIME("text/x-elm","elm")})();