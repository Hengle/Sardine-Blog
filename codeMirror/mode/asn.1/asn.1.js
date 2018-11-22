(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(B){B.defineMode("asn.1",function(R,Q){var N=R.indentUnit,C=Q.keywords||{},L=Q.cmipVerbs||{},M=Q.compareTypes||{},P=Q.status||{},I=Q.tags||{},H=Q.storage||{},E=Q.modifier||{},T=Q.accessTypes||{},F=Q.multiLineStrings,D=Q.indentStatements!==false;var S=/[\|\^]/;var K;function U(Z,Y){var X=Z.next();if(X=='"'||X=="'"){Y.tokenize=V(X);return Y.tokenize(Z,Y)}if(/[\[\]\(\){}:=,;]/.test(X)){K=X;return"punctuation"}if(X=="-"){if(Z.eat("-")){Z.skipToEnd();return"comment"}}if(/\d/.test(X)){Z.eatWhile(/[\w\.]/);return"number"}if(S.test(X)){Z.eatWhile(S);return"operator"}Z.eatWhile(/[\w\-]/);var W=Z.current();if(C.propertyIsEnumerable(W)){return"keyword"}if(L.propertyIsEnumerable(W)){return"variable cmipVerbs"}if(M.propertyIsEnumerable(W)){return"atom compareTypes"}if(P.propertyIsEnumerable(W)){return"comment status"}if(I.propertyIsEnumerable(W)){return"variable-3 tags"}if(H.propertyIsEnumerable(W)){return"builtin storage"}if(E.propertyIsEnumerable(W)){return"string-2 modifier"}if(T.propertyIsEnumerable(W)){return"atom accessTypes"}return"variable"}function V(W){return function(c,a){var Y=false,b,X=false;while((b=c.next())!=null){if(b==W&&!Y){var Z=c.peek();if(Z){Z=Z.toLowerCase();if(Z=="b"||Z=="h"||Z=="o"){c.next()}}X=true;break}Y=!Y&&b=="\\"}if(X||!(Y||F)){a.tokenize=null}return"string"}}function G(a,Z,W,Y,X){this.indented=a;this.column=Z;this.type=W;this.align=Y;this.prev=X}function J(Z,X,W){var Y=Z.indented;if(Z.context&&Z.context.type=="statement"){Y=Z.context.indented}return Z.context=new G(Y,X,W,null,Z.context)}function O(X){var W=X.context.type;if(W==")"||W=="]"||W=="}"){X.indented=X.context.indented}return X.context=X.context.prev}return{startState:function(W){return{tokenize:null,context:new G((W||0)-N,0,"top",false),indented:0,startOfLine:true}},token:function(Z,X){var Y=X.context;if(Z.sol()){if(Y.align==null){Y.align=false}X.indented=Z.indentation();X.startOfLine=true}if(Z.eatSpace()){return null}K=null;var W=(X.tokenize||U)(Z,X);if(W=="comment"){return W}if(Y.align==null){Y.align=true}if((K==";"||K==":"||K==",")&&Y.type=="statement"){O(X)}else{if(K=="{"){J(X,Z.column(),"}")}else{if(K=="["){J(X,Z.column(),"]")}else{if(K=="("){J(X,Z.column(),")")}else{if(K=="}"){while(Y.type=="statement"){Y=O(X)}if(Y.type=="}"){Y=O(X)}while(Y.type=="statement"){Y=O(X)}}else{if(K==Y.type){O(X)}else{if(D&&(((Y.type=="}"||Y.type=="top")&&K!=";")||(Y.type=="statement"&&K=="newstatement"))){J(X,Z.column(),"statement")}}}}}}}X.startOfLine=false;return W},electricChars:"{}",lineComment:"--",fold:"brace"}});function A(F){var E={},C=F.split(" ");for(var D=0;D<C.length;++D){E[C[D]]=true}return E}B.defineMIME("text/x-ttcn-asn",{name:"asn.1",keywords:A("DEFINITIONS OBJECTS IF DERIVED INFORMATION ACTION REPLY ANY NAMED CHARACTERIZED BEHAVIOUR REGISTERED WITH AS IDENTIFIED CONSTRAINED BY PRESENT BEGIN IMPORTS FROM UNITS SYNTAX MIN-ACCESS MAX-ACCESS MINACCESS MAXACCESS REVISION STATUS DESCRIPTION SEQUENCE SET COMPONENTS OF CHOICE DistinguishedName ENUMERATED SIZE MODULE END INDEX AUGMENTS EXTENSIBILITY IMPLIED EXPORTS"),cmipVerbs:A("ACTIONS ADD GET NOTIFICATIONS REPLACE REMOVE"),compareTypes:A("OPTIONAL DEFAULT MANAGED MODULE-TYPE MODULE_IDENTITY MODULE-COMPLIANCE OBJECT-TYPE OBJECT-IDENTITY OBJECT-COMPLIANCE MODE CONFIRMED CONDITIONAL SUBORDINATE SUPERIOR CLASS TRUE FALSE NULL TEXTUAL-CONVENTION"),status:A("current deprecated mandatory obsolete"),tags:A("APPLICATION AUTOMATIC EXPLICIT IMPLICIT PRIVATE TAGS UNIVERSAL"),storage:A("BOOLEAN INTEGER OBJECT IDENTIFIER BIT OCTET STRING UTCTime InterfaceIndex IANAifType CMIP-Attribute REAL PACKAGE PACKAGES IpAddress PhysAddress NetworkAddress BITS BMPString TimeStamp TimeTicks TruthValue RowStatus DisplayString GeneralString GraphicString IA5String NumericString PrintableString SnmpAdminAtring TeletexString UTF8String VideotexString VisibleString StringStore ISO646String T61String UniversalString Unsigned32 Integer32 Gauge Gauge32 Counter Counter32 Counter64"),modifier:A("ATTRIBUTE ATTRIBUTES MANDATORY-GROUP MANDATORY-GROUPS GROUP GROUPS ELEMENTS EQUALITY ORDERING SUBSTRINGS DEFINED"),accessTypes:A("not-accessible accessible-for-notify read-only read-create read-write"),multiLineStrings:true})});