(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(C){C.defineOption("rulers",false,function(G,F,E){if(E&&E!=C.Init){D(G);G.off("refresh",B)}if(F&&F.length){A(G);G.on("refresh",B)}});function D(G){for(var E=G.display.lineSpace.childNodes.length-1;E>=0;E--){var F=G.display.lineSpace.childNodes[E];if(/(^|\s)CodeMirror-ruler($|\s)/.test(F.className)){F.parentNode.removeChild(F)}}}function A(E){var G=E.getOption("rulers");var J=E.defaultCharWidth();var F=E.charCoords(C.Pos(E.firstLine(),0),"div").left;var H=E.display.scroller.offsetHeight+30;for(var I=0;I<G.length;I++){var K=document.createElement("div");K.className="CodeMirror-ruler";var M,L=G[I];if(typeof L=="number"){M=L}else{M=L.column;if(L.className){K.className+=" "+L.className}if(L.color){K.style.borderColor=L.color}if(L.lineStyle){K.style.borderLeftStyle=L.lineStyle}if(L.width){K.style.borderLeftWidth=L.width}}K.style.left=(F+M*J)+"px";K.style.top="-50px";K.style.bottom="-20px";K.style.minHeight=H+"px";E.display.lineSpace.insertBefore(K,E.display.cursorDiv)}}function B(E){D(E);A(E)}});