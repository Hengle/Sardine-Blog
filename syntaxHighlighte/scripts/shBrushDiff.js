(function(){typeof(require)!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;function A(){this.regexList=[{regex:/^\+\+\+.*$/gm,css:"color2"},{regex:/^\-\-\-.*$/gm,css:"color2"},{regex:/^\s.*$/gm,css:"color1"},{regex:/^@@.*@@$/gm,css:"variable"},{regex:/^\+[^\+]{1}.*$/gm,css:"string"},{regex:/^\-[^\-]{1}.*$/gm,css:"comments"}]}A.prototype=new SyntaxHighlighter.Highlighter();A.aliases=["diff","patch"];SyntaxHighlighter.brushes.Diff=A;typeof(exports)!="undefined"?exports.Brush=A:null})();