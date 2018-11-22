(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"),require("../javascript/javascript"),require("../css/css"),require("../htmlmixed/htmlmixed"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror","../javascript/javascript","../css/css","../htmlmixed/htmlmixed"],A)}else{A(CodeMirror)}}})(function(A){A.defineMode("jade",function(L){var q="keyword";var C="meta";var K="builtin";var F="qualifier";var D={"{":"}","(":")","[":"]"};var r=A.getMode(L,"javascript");function h(){this.javaScriptLine=false;this.javaScriptLineExcludesColon=false;this.javaScriptArguments=false;this.javaScriptArgumentsDepth=0;this.isInterpolating=false;this.interpolationNesting=0;this.jsState=r.startState();this.restOfLine="";this.isIncludeFiltered=false;this.isEach=false;this.lastTag="";this.scriptType="";this.isAttrs=false;this.attrsNest=[];this.inAttributeName=true;this.attributeIsType=false;this.attrValue="";this.indentOf=Infinity;this.indentToken="";this.innerMode=null;this.innerState=null;this.innerModeForLine=false}h.prototype.copy=function(){var Aa=new h();Aa.javaScriptLine=this.javaScriptLine;Aa.javaScriptLineExcludesColon=this.javaScriptLineExcludesColon;Aa.javaScriptArguments=this.javaScriptArguments;Aa.javaScriptArgumentsDepth=this.javaScriptArgumentsDepth;Aa.isInterpolating=this.isInterpolating;Aa.interpolationNesting=this.intpolationNesting;Aa.jsState=A.copyState(r,this.jsState);Aa.innerMode=this.innerMode;if(this.innerMode&&this.innerState){Aa.innerState=A.copyState(this.innerMode,this.innerState)}Aa.restOfLine=this.restOfLine;Aa.isIncludeFiltered=this.isIncludeFiltered;Aa.isEach=this.isEach;Aa.lastTag=this.lastTag;Aa.scriptType=this.scriptType;Aa.isAttrs=this.isAttrs;Aa.attrsNest=this.attrsNest.slice();Aa.inAttributeName=this.inAttributeName;Aa.attributeIsType=this.attributeIsType;Aa.attrValue=this.attrValue;Aa.indentOf=this.indentOf;Aa.indentToken=this.indentToken;Aa.innerModeForLine=this.innerModeForLine;return Aa};function a(Ac,Ab){if(Ac.sol()){Ab.javaScriptLine=false;Ab.javaScriptLineExcludesColon=false}if(Ab.javaScriptLine){if(Ab.javaScriptLineExcludesColon&&Ac.peek()===":"){Ab.javaScriptLine=false;Ab.javaScriptLineExcludesColon=false;return}var Aa=r.token(Ac,Ab.jsState);if(Ac.eol()){Ab.javaScriptLine=false}return Aa||true}}function l(Ac,Ab){if(Ab.javaScriptArguments){if(Ab.javaScriptArgumentsDepth===0&&Ac.peek()!=="("){Ab.javaScriptArguments=false;return}if(Ac.peek()==="("){Ab.javaScriptArgumentsDepth++}else{if(Ac.peek()===")"){Ab.javaScriptArgumentsDepth--}}if(Ab.javaScriptArgumentsDepth===0){Ab.javaScriptArguments=false;return}var Aa=r.token(Ac,Ab.jsState);return Aa||true}}function t(Aa){if(Aa.match(/^yield\b/)){return"keyword"}}function s(Aa){if(Aa.match(/^(?:doctype) *([^\n]+)?/)){return C}}function x(Ab,Aa){if(Ab.match("#{")){Aa.isInterpolating=true;Aa.interpolationNesting=0;return"punctuation"}}function E(Ab,Aa){if(Aa.isInterpolating){if(Ab.peek()==="}"){Aa.interpolationNesting--;if(Aa.interpolationNesting<0){Ab.next();Aa.isInterpolating=false;return"puncutation"}}else{if(Ab.peek()==="{"){Aa.interpolationNesting++}}return r.token(Ab,Aa.jsState)||true}}function g(Ab,Aa){if(Ab.match(/^case\b/)){Aa.javaScriptLine=true;return q}}function J(Ab,Aa){if(Ab.match(/^when\b/)){Aa.javaScriptLine=true;Aa.javaScriptLineExcludesColon=true;return q}}function u(Aa){if(Aa.match(/^default\b/)){return q}}function c(Ab,Aa){if(Ab.match(/^extends?\b/)){Aa.restOfLine="string";return q}}function I(Ab,Aa){if(Ab.match(/^append\b/)){Aa.restOfLine="variable";return q}}function p(Ab,Aa){if(Ab.match(/^prepend\b/)){Aa.restOfLine="variable";return q}}function N(Ab,Aa){if(Ab.match(/^block\b *(?:(prepend|append)\b)?/)){Aa.restOfLine="variable";return q}}function k(Ab,Aa){if(Ab.match(/^include\b/)){Aa.restOfLine="string";return q}}function i(Ab,Aa){if(Ab.match(/^include:([a-zA-Z0-9\-]+)/,false)&&Ab.match("include")){Aa.isIncludeFiltered=true;return q}}function X(Ac,Ab){if(Ab.isIncludeFiltered){var Aa=b(Ac,Ab);Ab.isIncludeFiltered=false;Ab.restOfLine="string";return Aa}}function B(Ab,Aa){if(Ab.match(/^mixin\b/)){Aa.javaScriptLine=true;return q}}function W(Ab,Aa){if(Ab.match(/^\+([-\w]+)/)){if(!Ab.match(/^\( *[-\w]+ *=/,false)){Aa.javaScriptArguments=true;Aa.javaScriptArgumentsDepth=0}return"variable"}if(Ab.match(/^\+#{/,false)){Ab.next();Aa.mixinCallAfter=true;return x(Ab,Aa)}}function Z(Ab,Aa){if(Aa.mixinCallAfter){Aa.mixinCallAfter=false;if(!Ab.match(/^\( *[-\w]+ *=/,false)){Aa.javaScriptArguments=true;Aa.javaScriptArgumentsDepth=0}return true}}function f(Ab,Aa){if(Ab.match(/^(if|unless|else if|else)\b/)){Aa.javaScriptLine=true;return q}}function S(Ab,Aa){if(Ab.match(/^(- *)?(each|for)\b/)){Aa.isEach=true;return q}}function d(Ab,Aa){if(Aa.isEach){if(Ab.match(/^ in\b/)){Aa.javaScriptLine=true;Aa.isEach=false;return q}else{if(Ab.sol()||Ab.eol()){Aa.isEach=false}else{if(Ab.next()){while(!Ab.match(/^ in\b/,false)&&Ab.next()){}return"variable"}}}}}function M(Ab,Aa){if(Ab.match(/^while\b/)){Aa.javaScriptLine=true;return q}}function n(Ac,Ab){var Aa;if(Aa=Ac.match(/^(\w(?:[-:\w]*\w)?)\/?/)){Ab.lastTag=Aa[1].toLowerCase();if(Ab.lastTag==="script"){Ab.scriptType="application/javascript"}return"tag"}}function b(Ac,Ab){if(Ac.match(/^:([\w\-]+)/)){var Aa;if(L&&L.innerModes){Aa=L.innerModes(Ac.current().substring(1))}if(!Aa){Aa=Ac.current().substring(1)}if(typeof Aa==="string"){Aa=A.getMode(L,Aa)}o(Ac,Ab,Aa);return"atom"}}function j(Ab,Aa){if(Ab.match(/^(!?=|-)/)){Aa.javaScriptLine=true;return"punctuation"}}function T(Aa){if(Aa.match(/^#([\w-]+)/)){return K}}function e(Aa){if(Aa.match(/^\.([\w-]+)/)){return F}}function P(Ab,Aa){if(Ab.peek()=="("){Ab.next();Aa.isAttrs=true;Aa.attrsNest=[];Aa.inAttributeName=true;Aa.attrValue="";Aa.attributeIsType=false;return"punctuation"}}function U(Ad,Ac){if(Ac.isAttrs){if(D[Ad.peek()]){Ac.attrsNest.push(D[Ad.peek()])}if(Ac.attrsNest[Ac.attrsNest.length-1]===Ad.peek()){Ac.attrsNest.pop()}else{if(Ad.eat(")")){Ac.isAttrs=false;return"punctuation"}}if(Ac.inAttributeName&&Ad.match(/^[^=,\)!]+/)){if(Ad.peek()==="="||Ad.peek()==="!"){Ac.inAttributeName=false;Ac.jsState=r.startState();if(Ac.lastTag==="script"&&Ad.current().trim().toLowerCase()==="type"){Ac.attributeIsType=true}else{Ac.attributeIsType=false}}return"attribute"}var Aa=r.token(Ad,Ac.jsState);if(Ac.attributeIsType&&Aa==="string"){Ac.scriptType=Ad.current().toString()}if(Ac.attrsNest.length===0&&(Aa==="string"||Aa==="variable"||Aa==="keyword")){try{Function("","var x "+Ac.attrValue.replace(/,\s*$/,"").replace(/^!/,""));Ac.inAttributeName=true;Ac.attrValue="";Ad.backUp(Ad.current().length);return U(Ad,Ac)}catch(Ab){}}Ac.attrValue+=Ad.current();return Aa||true}}function O(Ab,Aa){if(Ab.match(/^&attributes\b/)){Aa.javaScriptArguments=true;Aa.javaScriptArgumentsDepth=0;return"keyword"}}function H(Aa){if(Aa.sol()&&Aa.eatSpace()){return"indent"}}function y(Ab,Aa){if(Ab.match(/^ *\/\/(-)?([^\n]*)/)){Aa.indentOf=Ab.indentation();Aa.indentToken="comment";return"comment"}}function Q(Aa){if(Aa.match(/^: */)){return"colon"}}function R(Ab,Aa){if(Ab.match(/^(?:\| ?| )([^\n]+)/)){return"string"}if(Ab.match(/^(<[^\n]*)/,false)){o(Ab,Aa,"htmlmixed");Aa.innerModeForLine=true;return V(Ab,Aa,true)}}function G(Ac,Ab){if(Ac.eat(".")){var Aa=null;if(Ab.lastTag==="script"&&Ab.scriptType.toLowerCase().indexOf("javascript")!=-1){Aa=Ab.scriptType.toLowerCase().replace(/"|'/g,"")}else{if(Ab.lastTag==="style"){Aa="css"}}o(Ac,Ab,Aa);return"dot"}}function v(Aa){Aa.next();return null}function o(Ac,Ab,Aa){Aa=A.mimeModes[Aa]||Aa;Aa=L.innerModes?L.innerModes(Aa)||Aa:Aa;Aa=A.mimeModes[Aa]||Aa;Aa=A.getMode(L,Aa);Ab.indentOf=Ac.indentation();if(Aa&&Aa.name!=="null"){Ab.innerMode=Aa}else{Ab.indentToken="string"}}function V(Ac,Ab,Aa){if(Ac.indentation()>Ab.indentOf||(Ab.innerModeForLine&&!Ac.sol())||Aa){if(Ab.innerMode){if(!Ab.innerState){Ab.innerState=Ab.innerMode.startState?Ab.innerMode.startState(Ac.indentation()):{}}return Ac.hideFirstChars(Ab.indentOf+2,function(){return Ab.innerMode.token(Ac,Ab.innerState)||true})}else{Ac.skipToEnd();return Ab.indentToken}}else{if(Ac.sol()){Ab.indentOf=Infinity;Ab.indentToken=null;Ab.innerMode=null;Ab.innerState=null}}}function Y(Ac,Ab){if(Ac.sol()){Ab.restOfLine=""}if(Ab.restOfLine){Ac.skipToEnd();var Aa=Ab.restOfLine;Ab.restOfLine="";return Aa}}function z(){return new h()}function w(Aa){return Aa.copy()}function m(Ac,Ab){var Aa=V(Ac,Ab)||Y(Ac,Ab)||E(Ac,Ab)||X(Ac,Ab)||d(Ac,Ab)||U(Ac,Ab)||a(Ac,Ab)||l(Ac,Ab)||Z(Ac,Ab)||t(Ac,Ab)||s(Ac,Ab)||x(Ac,Ab)||g(Ac,Ab)||J(Ac,Ab)||u(Ac,Ab)||c(Ac,Ab)||I(Ac,Ab)||p(Ac,Ab)||N(Ac,Ab)||k(Ac,Ab)||i(Ac,Ab)||B(Ac,Ab)||W(Ac,Ab)||f(Ac,Ab)||S(Ac,Ab)||M(Ac,Ab)||n(Ac,Ab)||b(Ac,Ab)||j(Ac,Ab)||T(Ac,Ab)||e(Ac,Ab)||P(Ac,Ab)||O(Ac,Ab)||H(Ac,Ab)||R(Ac,Ab)||y(Ac,Ab)||Q(Ac,Ab)||G(Ac,Ab)||v(Ac,Ab);return Aa===true?null:Aa}return{startState:z,copyState:w,token:m}});A.defineMIME("text/x-jade","jade")});