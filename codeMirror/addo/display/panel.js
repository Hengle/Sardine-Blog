(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(D){D.defineExtension("addPanel",function(G,H){H=H||{};if(!this.state.panels){A(this)}var J=this.state.panels;var F=J.wrapper;var I=this.getWrapperElement();if(H.after instanceof B&&!H.after.cleared){F.insertBefore(G,H.before.node.nextSibling)}else{if(H.before instanceof B&&!H.before.cleared){F.insertBefore(G,H.before.node)}else{if(H.replace instanceof B&&!H.replace.cleared){F.insertBefore(G,H.replace.node);H.replace.clear()}else{if(H.position=="bottom"){F.appendChild(G)}else{if(H.position=="before-bottom"){F.insertBefore(G,I.nextSibling)}else{if(H.position=="after-top"){F.insertBefore(G,I)}else{F.insertBefore(G,F.firstChild)}}}}}}var E=(H&&H.height)||G.offsetHeight;this._setSize(null,J.heightLeft-=E);J.panels++;return new B(this,G,H,E)});function B(H,F,G,E){this.cm=H;this.node=F;this.options=G;this.height=E;this.cleared=false}B.prototype.clear=function(){if(this.cleared){return}this.cleared=true;var E=this.cm.state.panels;this.cm._setSize(null,E.heightLeft+=this.height);E.wrapper.removeChild(this.node);if(--E.panels==0){C(this.cm)}};B.prototype.changed=function(E){var F=E==null?this.node.offsetHeight:E;var G=this.cm.state.panels;this.cm._setSize(null,G.height+=(F-this.height));this.height=F};function A(J){var G=J.getWrapperElement();var H=window.getComputedStyle?window.getComputedStyle(G):G.currentStyle;var F=parseInt(H.height);var I=J.state.panels={setHeight:G.style.height,heightLeft:F,panels:0,wrapper:document.createElement("div")};G.parentNode.insertBefore(I.wrapper,G);var E=J.hasFocus();I.wrapper.appendChild(G);if(E){J.focus()}J._setSize=J.setSize;if(F!=null){J.setSize=function(M,K){if(K==null){return this._setSize(M,K)}I.setHeight=K;if(typeof K!="number"){var L=/^(\d+\.?\d*)px$/.exec(K);if(L){K=Number(L[1])}else{I.wrapper.style.height=K;K=I.wrapper.offsetHeight;I.wrapper.style.height=""}}J._setSize(M,I.heightLeft+=(K-F));F=K}}}function C(G){var F=G.state.panels;G.state.panels=null;var E=G.getWrapperElement();F.wrapper.parentNode.replaceChild(E,F.wrapper);E.style.height=F.setHeight;G.setSize=G._setSize;G.setSize()}});