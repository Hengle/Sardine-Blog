(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(A){A.defineMode("commonlisp",function(C){var I=/^(block|let*|return-from|catch|load-time-value|setq|eval-when|locally|symbol-macrolet|flet|macrolet|tagbody|function|multiple-value-call|the|go|multiple-value-prog1|throw|if|progn|unwind-protect|labels|progv|let|quote)$/;var F=/^with|^def|^do|^prog|case$|^cond$|bind$|when$|unless$/;var B=/^(?:[+\-]?(?:\d+|\d*\.\d+)(?:[efd][+\-]?\d+)?|[+\-]?\d+(?:\/[+\-]?\d+)?|#b[+\-]?[01]+|#o[+\-]?[0-7]+|#x[+\-]?[\da-f]+)/;var G=/[^\s'`,@()\[\]";]/;var J;function H(M){var L;while(L=M.next()){if(L=="\\"){M.next()}else{if(!G.test(L)){M.backUp(1);break}}}return M.current()}function D(O,N){if(O.eatSpace()){J="ws";return null}if(O.match(B)){return"number"}var M=O.next();if(M=="\\"){M=O.next()}if(M=='"'){return(N.tokenize=K)(O,N)}else{if(M=="("){J="open";return"bracket"}else{if(M==")"||M=="]"){J="close";return"bracket"}else{if(M==";"){O.skipToEnd();J="ws";return"comment"}else{if(/['`,@]/.test(M)){return null}else{if(M=="|"){if(O.skipTo("|")){O.next();return"symbol"}else{O.skipToEnd();return"error"}}else{if(M=="#"){var M=O.next();if(M=="["){J="open";return"bracket"}else{if(/[+\-=\.']/.test(M)){return null}else{if(/\d/.test(M)&&O.match(/^\d*#/)){return null}else{if(M=="|"){return(N.tokenize=E)(O,N)}else{if(M==":"){H(O);return"meta"}else{return"error"}}}}}}else{var L=H(O);if(L=="."){return null}J="symbol";if(L=="nil"||L=="t"||L.charAt(0)==":"){return"atom"}if(N.lastType=="open"&&(I.test(L)||F.test(L))){return"keyword"}if(L.charAt(0)=="&"){return"variable-2"}return"variable"}}}}}}}}function K(O,M){var L=false,N;while(N=O.next()){if(N=='"'&&!L){M.tokenize=D;break}L=!L&&N=="\\"}return"string"}function E(O,N){var M,L;while(M=O.next()){if(M=="#"&&L=="|"){N.tokenize=D;break}L=M}J="ws";return"comment"}return{startState:function(){return{ctx:{prev:null,start:0,indentTo:0},lastType:null,tokenize:D}},token:function(N,M){if(N.sol()&&typeof M.ctx.indentTo!="number"){M.ctx.indentTo=M.ctx.start+1}J=null;var L=M.tokenize(N,M);if(J!="ws"){if(M.ctx.indentTo==null){if(J=="symbol"&&F.test(N.current())){M.ctx.indentTo=M.ctx.start+C.indentUnit}else{M.ctx.indentTo="next"}}else{if(M.ctx.indentTo=="next"){M.ctx.indentTo=N.column()}}M.lastType=J}if(J=="open"){M.ctx={prev:M.ctx,start:N.column(),indentTo:null}}else{if(J=="close"){M.ctx=M.ctx.prev||M.ctx}}return L},indent:function(N,M){var L=N.ctx.indentTo;return typeof L=="number"?L:N.ctx.start+1},closeBrackets:{pairs:'()[]{}""'},lineComment:";;",blockCommentStart:"#|",blockCommentEnd:"|#"}});A.defineMIME("text/x-common-lisp","commonlisp")});