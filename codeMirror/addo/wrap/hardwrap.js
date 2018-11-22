(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(C){var E=C.Pos;function B(J,M,L){var K=L.paragraphStart||J.getHelper(M,"paragraphStart");for(var G=M.line,H=J.firstLine();G>H;--G){var F=J.getLine(G);if(K&&K.test(F)){break}if(!/\S/.test(F)){++G;break}}var O=L.paragraphEnd||J.getHelper(M,"paragraphEnd");for(var I=M.line+1,N=J.lastLine();I<=N;++I){var F=J.getLine(I);if(O&&O.test(F)){++I;break}if(!/\S/.test(F)){break}}return{from:G,to:I}}function D(I,J,G,H){for(var F=J;F>0;--F){if(G.test(I.slice(F-1,F+1))){break}}if(F==0){F=J}var K=F;if(H){while(I.charAt(K-1)==" "){--K}}return{from:K,to:F}}function A(T,P,G,U){P=T.clipPos(P);G=T.clipPos(G);var F=U.column||80;var L=U.wrapOn||/\s\S|-[^\.\d]/;var H=U.killTrailingSpace!==false;var M=[],S="",Q=P.line;var R=T.getRange(P,G,false);if(!R.length){return null}var K=R[0].match(/^[ \t]*/)[0];for(var J=0;J<R.length;++J){var N=R[J],I=S.length,X=0;if(S&&N&&!L.test(S.charAt(S.length-1)+N.charAt(0))){S+=" ";X=1}var W="";if(J){W=N.match(/^\s*/)[0];N=N.slice(W.length)}S+=N;if(J){var O=S.length>F&&K==W&&D(S,F,L,H);if(!O||O.from!=I||O.to!=I+X){M.push({text:[X?" ":""],from:E(Q,I),to:E(Q+1,W.length)})}else{S=K+N;++Q}}while(S.length>F){var V=D(S,F,L,H);M.push({text:["",K],from:E(Q,V.from),to:E(Q,V.to)});S=K+S.slice(V.to);++Q}}if(M.length){T.operation(function(){for(var Y=0;Y<M.length;++Y){var Z=M[Y];T.replaceRange(Z.text,Z.from,Z.to)}})}return M.length?{from:M[0].from,to:C.changeEnd(M[M.length-1])}:null}C.defineExtension("wrapParagraph",function(G,H){H=H||{};if(!G){G=this.getCursor()}var F=B(this,G,H);return A(this,E(F.from,0),E(F.to-1),H)});C.commands.wrapLines=function(F){F.operation(function(){var J=F.listSelections(),K=F.lastLine()+1;for(var H=J.length-1;H>=0;H--){var L=J[H],I;if(L.empty()){var G=B(F,L.head,{});I={from:E(G.from,0),to:E(G.to-1)}}else{I={from:L.from(),to:L.to()}}if(I.to.line>=K){continue}K=I.from.line;A(F,I.from,I.to,{})}})};C.defineExtension("wrapRange",function(F,G,H){return A(this,F,G,H||{})});C.defineExtension("wrapParagraphsInRange",function(J,L,I){I=I||{};var H=this,M=[];for(var G=J.line;G<=L.line;){var F=B(H,E(G,0),I);M.push(F);G=F.to}var K=false;if(M.length){H.operation(function(){for(var N=M.length-1;N>=0;--N){K=K||A(H,E(M[N].from,0),E(M[N].to-1),I)}})}return K})});