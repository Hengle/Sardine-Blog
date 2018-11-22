(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(A){A.defineMode("ebnf",function(C){var E={slash:0,parenthesis:1};var D={comment:0,_string:1,characterClass:2};var B=null;if(C.bracesMode){B=A.getMode(C,C.bracesMode)}return{startState:function(){return{stringType:null,commentType:null,braced:0,lhs:true,localState:null,stack:[],inDefinition:false}},token:function(K,J){if(!K){return}if(J.stack.length===0){if((K.peek()=='"')||(K.peek()=="'")){J.stringType=K.peek();K.next();J.stack.unshift(D._string)}else{if(K.match(/^\/\*/)){J.stack.unshift(D.comment);J.commentType=E.slash}else{if(K.match(/^\(\*/)){J.stack.unshift(D.comment);J.commentType=E.parenthesis}}}}switch(J.stack[0]){case D._string:while(J.stack[0]===D._string&&!K.eol()){if(K.peek()===J.stringType){K.next();J.stack.shift()}else{if(K.peek()==="\\"){K.next();K.next()}else{K.match(/^.[^\\\"\']*/)}}}return J.lhs?"property string":"string";case D.comment:while(J.stack[0]===D.comment&&!K.eol()){if(J.commentType===E.slash&&K.match(/\*\//)){J.stack.shift();J.commentType=null}else{if(J.commentType===E.parenthesis&&K.match(/\*\)/)){J.stack.shift();J.commentType=null}else{K.match(/^.[^\*]*/)}}}return"comment";case D.characterClass:while(J.stack[0]===D.characterClass&&!K.eol()){if(!(K.match(/^[^\]\\]+/)||K.match(/^\\./))){J.stack.shift()}}return"operator"}var H=K.peek();if(B!==null&&(J.braced||H==="{")){if(J.localState===null){J.localState=B.startState()}var F=B.token(K,J.localState),I=K.current();if(!F){for(var G=0;G<I.length;G++){if(I[G]==="{"){if(J.braced===0){F="matchingbracket"}J.braced++}else{if(I[G]==="}"){J.braced--;if(J.braced===0){F="matchingbracket"}}}}}return F}switch(H){case"[":K.next();J.stack.unshift(D.characterClass);return"bracket";case":":case"|":case";":K.next();return"operator";case"%":if(K.match("%%")){return"header"}else{if(K.match(/[%][A-Za-z]+/)){return"keyword"}else{if(K.match(/[%][}]/)){return"matchingbracket"}}}break;case"/":if(K.match(/[\/][A-Za-z]+/)){return"keyword"}case"\\":if(K.match(/[\][a-z]+/)){return"string-2"}case".":if(K.match(".")){return"atom"}case"*":case"-":case"+":case"^":if(K.match(H)){return"atom"}case"$":if(K.match("$$")){return"builtin"}else{if(K.match(/[$][0-9]+/)){return"variable-3"}}case"<":if(K.match(/<<[a-zA-Z_]+>>/)){return"builtin"}}if(K.match(/^\/\//)){K.skipToEnd();return"comment"}else{if(K.match(/return/)){return"operator"}else{if(K.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)){if(K.match(/(?=[\(.])/)){return"variable"}else{if(K.match(/(?=[\s\n]*[:=])/)){return"def"}}return"variable-2"}else{if(["[","]","(",")"].indexOf(K.peek())!=-1){K.next();return"bracket"}else{if(!K.eatSpace()){K.next()}}}}}return null}}});A.defineMIME("text/x-ebnf","ebnf")});