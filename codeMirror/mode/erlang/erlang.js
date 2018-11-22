(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(A){A.defineMIME("text/x-erlang","erlang");A.defineMode("erlang",function(g){var X=["-type","-spec","-export_type","-opaque"];var L=["after","begin","catch","case","cond","end","fun","if","let","of","query","receive","try","when"];var D=/[\->,;]/;var h=["->",";",","];var m=["and","andalso","band","bnot","bor","bsl","bsr","bxor","div","not","or","orelse","rem","xor"];var J=/[\+\-\*\/<>=\|:!]/;var Q=["=","+","-","*","/",">",">=","<","=<","=:=","==","=/=","/=","||","<-","!"];var i=/[<\(\[\{]/;var E=["<<","(","[","{"];var f=/[>\)\]\}]/;var Z=["}","]",")",">>"];var M=["is_atom","is_binary","is_bitstring","is_boolean","is_float","is_function","is_integer","is_list","is_number","is_pid","is_port","is_record","is_reference","is_tuple","atom","binary","bitstring","boolean","function","integer","list","number","pid","port","record","reference","tuple"];var j=["abs","adler32","adler32_combine","alive","apply","atom_to_binary","atom_to_list","binary_to_atom","binary_to_existing_atom","binary_to_list","binary_to_term","bit_size","bitstring_to_list","byte_size","check_process_code","contact_binary","crc32","crc32_combine","date","decode_packet","delete_module","disconnect_node","element","erase","exit","float","float_to_list","garbage_collect","get","get_keys","group_leader","halt","hd","integer_to_list","internal_bif","iolist_size","iolist_to_binary","is_alive","is_atom","is_binary","is_bitstring","is_boolean","is_float","is_function","is_integer","is_list","is_number","is_pid","is_port","is_process_alive","is_record","is_reference","is_tuple","length","link","list_to_atom","list_to_binary","list_to_bitstring","list_to_existing_atom","list_to_float","list_to_integer","list_to_pid","list_to_tuple","load_module","make_ref","module_loaded","monitor_node","node","node_link","node_unlink","nodes","notalive","now","open_port","pid_to_list","port_close","port_command","port_connect","port_control","pre_loaded","process_flag","process_info","processes","purge_module","put","register","registered","round","self","setelement","size","spawn","spawn_link","spawn_monitor","spawn_opt","split_binary","statistics","term_to_binary","time","throw","tl","trunc","tuple_size","tuple_to_list","unlink","unregister","whereis"];var C=/[\w@Ø-ÞÀ-Öß-öø-ÿ]/;var Y=/[0-7]{1,3}|[bdefnrstv\\"']|\^[a-zA-Z]|x[0-9a-zA-Z]{2}|x{[0-9a-zA-Z]+}/;function l(u,r){if(r.in_string){r.in_string=(!b(u));return B(r,u,"string")}if(r.in_atom){r.in_atom=(!T(u));return B(r,u,"atom")}if(u.eatSpace()){return B(r,u,"whitespace")}if(!e(r)&&u.match(/-\s*[a-zß-öø-ÿ][\wØ-ÞÀ-Öß-öø-ÿ]*/)){if(K(u.current(),X)){return B(r,u,"type")}else{return B(r,u,"attribute")}}var q=u.next();if(q=="%"){u.skipToEnd();return B(r,u,"comment")}if(q==":"){return B(r,u,"colon")}if(q=="?"){u.eatSpace();u.eatWhile(C);return B(r,u,"macro")}if(q=="#"){u.eatSpace();u.eatWhile(C);return B(r,u,"record")}if(q=="$"){if(u.next()=="\\"&&!u.match(Y)){return B(r,u,"error")}return B(r,u,"number")}if(q=="."){return B(r,u,"dot")}if(q=="'"){if(!(r.in_atom=(!T(u)))){if(u.match(/\s*\/\s*[0-9]/,false)){u.match(/\s*\/\s*[0-9]/,true);return B(r,u,"fun")}if(u.match(/\s*\(/,false)||u.match(/\s*:/,false)){return B(r,u,"function")}}return B(r,u,"atom")}if(q=='"'){r.in_string=(!b(u));return B(r,u,"string")}if(/[A-Z_Ø-ÞÀ-Ö]/.test(q)){u.eatWhile(C);return B(r,u,"variable")}if(/[a-z_ß-öø-ÿ]/.test(q)){u.eatWhile(C);if(u.match(/\s*\/\s*[0-9]/,false)){u.match(/\s*\/\s*[0-9]/,true);return B(r,u,"fun")}var s=u.current();if(K(s,L)){return B(r,u,"keyword")}else{if(K(s,m)){return B(r,u,"operator")}else{if(u.match(/\s*\(/,false)){if(K(s,j)&&((e(r).token!=":")||(e(r,2).token=="erlang"))){return B(r,u,"builtin")}else{if(K(s,M)){return B(r,u,"guard")}else{return B(r,u,"function")}}}else{if(N(u)==":"){if(s=="erlang"){return B(r,u,"builtin")}else{return B(r,u,"function")}}else{if(K(s,["true","false"])){return B(r,u,"boolean")}else{return B(r,u,"atom")}}}}}}var t=/[0-9]/;var d=/[0-9a-zA-Z]/;if(t.test(q)){u.eatWhile(t);if(u.eat("#")){if(!u.eatWhile(d)){u.backUp(1)}}else{if(u.eat(".")){if(!u.eatWhile(t)){u.backUp(1)}else{if(u.eat(/[eE]/)){if(u.eat(/[-+]/)){if(!u.eatWhile(t)){u.backUp(2)}}else{if(!u.eatWhile(t)){u.backUp(1)}}}}}}return B(r,u,"number")}if(k(u,i,E)){return B(r,u,"open_paren")}if(k(u,f,Z)){return B(r,u,"close_paren")}if(W(u,D,h)){return B(r,u,"separator")}if(W(u,J,Q)){return B(r,u,"operator")}return B(r,u,null)}function k(r,q,d){if(r.current().length==1&&q.test(r.current())){r.backUp(1);while(q.test(r.peek())){r.next();if(K(r.current(),d)){return true}}r.backUp(r.current().length-1)}return false}function W(r,q,d){if(r.current().length==1&&q.test(r.current())){while(q.test(r.peek())){r.next()}while(0<r.current().length){if(K(r.current(),d)){return true}else{r.backUp(1)}}r.next()}return false}function b(d){return V(d,'"',"\\")}function T(d){return V(d,"'","\\")}function V(s,q,d){while(!s.eol()){var r=s.next();if(r==q){return true}else{if(r==d){s.next()}}}return false}function N(q){var d=q.match(/([\n\s]+|%[^\n]*\n)*(.)/,false);return d?d.pop():""}function K(q,d){return(-1<d.indexOf(q))}function B(r,q,d){c(r,G(d,q));switch(d){case"atom":return"atom";case"attribute":return"attribute";case"boolean":return"atom";case"builtin":return"builtin";case"close_paren":return null;case"colon":return null;case"comment":return"comment";case"dot":return null;case"error":return"error";case"fun":return"meta";case"function":return"tag";case"guard":return"property";case"keyword":return"keyword";case"macro":return"variable-2";case"number":return"number";case"open_paren":return null;case"operator":return"operator";case"record":return"bracket";case"separator":return null;case"string":return"string";case"type":return"def";case"variable":return"variable";default:return null}}function U(d,s,r,q){return{token:d,column:s,indent:r,type:q}}function G(d,q){return U(q.current(),q.column(),q.indentation(),d)}function R(d){return U(d,0,0,d)}function e(s,d){var q=s.tokenStack.length;var r=(d?d:1);if(q<r){return false}else{return s.tokenStack[q-r]}}function c(q,d){if(!(d.type=="comment"||d.type=="whitespace")){q.tokenStack=o(q.tokenStack,d);q.tokenStack=P(q.tokenStack)}}function o(q,d){var r=q.length-1;if(0<r&&q[r].type==="record"&&d.type==="dot"){q.pop()}else{if(0<r&&q[r].type==="group"){q.pop();q.push(d)}else{q.push(d)}}return q}function P(d){var q=d.length-1;if(d[q].type==="dot"){return[]}if(d[q].type==="fun"&&d[q-1].token==="fun"){return d.slice(0,q-1)}switch(d[d.length-1].token){case"}":return p(d,{g:["{"]});case"]":return p(d,{i:["["]});case")":return p(d,{i:["("]});case">>":return p(d,{i:["<<"]});case"end":return p(d,{i:["begin","case","fun","if","receive","try"]});case",":return p(d,{e:["begin","try","when","->",",","(","[","{","<<"]});case"->":return p(d,{r:["when"],m:["try","if","case","receive"]});case";":return p(d,{E:["case","fun","if","receive","try","when"]});case"catch":return p(d,{e:["try"]});case"of":return p(d,{e:["case"]});case"after":return p(d,{e:["receive","try"]});default:return d}}function p(q,u){for(var d in u){var t=q.length-1;var v=u[d];for(var r=t-1;-1<r;r--){if(K(q[r].token,v)){var s=q.slice(0,r);switch(d){case"m":return s.concat(q[r]).concat(q[t]);case"r":return s.concat(q[t]);case"i":return s;case"g":return s.concat(R("group"));case"E":return s.concat(q[r]);case"e":return s.concat(q[r])}}}}return(d=="E"?[]:q)}function O(w,d){var s;var q=g.indentUnit;var u=a(d);var r=e(w,1);var v=e(w,2);if(w.in_string||w.in_atom){return A.Pass}else{if(!v){return 0}else{if(r.token=="when"){return r.column+q}else{if(u==="when"&&v.type==="function"){return v.indent+q}else{if(u==="("&&r.token==="fun"){return r.column+3}else{if(u==="catch"&&(s=n(w,["try"]))){return s.column}else{if(K(u,["end","after","of"])){s=n(w,["begin","case","fun","if","receive","try"]);return s?s.column:A.Pass}else{if(K(u,Z)){s=n(w,E);return s?s.column:A.Pass}else{if(K(r.token,[",","|","||"])||K(u,[",","|","||"])){s=S(w);return s?s.column+s.token.length:q}else{if(r.token=="->"){if(K(v.token,["receive","case","if","try"])){return v.column+q+q}else{return v.column+q}}else{if(K(r.token,E)){return r.column+r.token.length}else{s=F(w);return I(s)?s.column+q:0}}}}}}}}}}}}function a(q){var d=q.match(/,|[a-z]+|\}|\]|\)|>>|\|+|\(/);return I(d)&&(d.index===0)?d[0]:""}function S(r){var q=r.tokenStack.slice(0,-1);var d=H(q,"type",["open_paren"]);return I(q[d])?q[d]:false}function F(s){var r=s.tokenStack;var q=H(r,"type",["open_paren","separator","keyword"]);var d=H(r,"type",["operator"]);if(I(q)&&I(d)&&q<d){return r[q+1]}else{if(I(q)){return r[q]}else{return false}}}function n(s,q){var r=s.tokenStack;var d=H(r,"token",q);return I(r[d])?r[d]:false}function H(r,s,d){for(var q=r.length-1;-1<q;q--){if(K(r[q][s],d)){return q}}return false}function I(d){return(d!==false)&&(d!=null)}return{startState:function(){return{tokenStack:[],in_string:false,in_atom:false}},token:function(q,d){return l(q,d)},indent:function(q,d){return O(q,d)},lineComment:"%"}})});