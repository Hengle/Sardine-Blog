(function(A){if(typeof exports=="object"&&typeof module=="object"){A(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],A)}else{A(CodeMirror)}}})(function(A){A.defineMode("clojure",function(O){var G="builtin",X="comment",M="string",R="string-2",L="atom",H="number",U="bracket",W="keyword",V="variable";var K=O.indentUnit||2;var F=O.indentUnit||2;function N(b){var a={},Y=b.split(" ");for(var Z=0;Z<Y.length;++Z){a[Y[Z]]=true}return a}var J=N("true false nil");var C=N("defn defn- def def- defonce defmulti defmethod defmacro defstruct deftype defprotocol defrecord defproject deftest slice defalias defhinted defmacro- defn-memo defnk defnk defonce- defunbound defunbound- defvar defvar- let letfn do case cond condp for loop recur when when-not when-let when-first if if-let if-not . .. -> ->> doto and or dosync doseq dotimes dorun doall load import unimport ns in-ns refer try catch finally throw with-open with-local-vars binding gen-class gen-and-load-class gen-and-save-class handler-case handle");var E=N("* *' *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* *command-line-args* *compile-files* *compile-path* *compiler-options* *data-readers* *e *err* *file* *flush-on-newline* *fn-loader* *in* *math-context* *ns* *out* *print-dup* *print-length* *print-level* *print-meta* *print-readably* *read-eval* *source-path* *unchecked-math* *use-context-classloader* *verbose-defrecords* *warn-on-reflection* + +' - -' -> ->> ->ArrayChunk ->Vec ->VecNode ->VecSeq -cache-protocol-fn -reset-methods .. / < <= = == > >= EMPTY-NODE accessor aclone add-classpath add-watch agent agent-error agent-errors aget alength alias all-ns alter alter-meta! alter-var-root amap ancestors and apply areduce array-map aset aset-boolean aset-byte aset-char aset-double aset-float aset-int aset-long aset-short assert assoc assoc! assoc-in associative? atom await await-for await1 bases bean bigdec bigint biginteger binding bit-and bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left bit-shift-right bit-test bit-xor boolean boolean-array booleans bound-fn bound-fn* bound? butlast byte byte-array bytes case cast char char-array char-escape-string char-name-string char? chars chunk chunk-append chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? class class? clear-agent-errors clojure-version coll? comment commute comp comparator compare compare-and-set! compile complement concat cond condp conj conj! cons constantly construct-proxy contains? count counted? create-ns create-struct cycle dec dec' decimal? declare default-data-readers definline definterface defmacro defmethod defmulti defn defn- defonce defprotocol defrecord defstruct deftype delay delay? deliver denominator deref derive descendants destructure disj disj! dissoc dissoc! distinct distinct? doall dorun doseq dosync dotimes doto double double-array doubles drop drop-last drop-while empty empty? ensure enumeration-seq error-handler error-mode eval even? every-pred every? ex-data ex-info extend extend-protocol extend-type extenders extends? false? ffirst file-seq filter filterv find find-keyword find-ns find-protocol-impl find-protocol-method find-var first flatten float float-array float? floats flush fn fn? fnext fnil for force format frequencies future future-call future-cancel future-cancelled? future-done? future? gen-class gen-interface gensym get get-in get-method get-proxy-class get-thread-bindings get-validator group-by hash hash-combine hash-map hash-set identical? identity if-let if-not ifn? import in-ns inc inc' init-proxy instance? int int-array integer? interleave intern interpose into into-array ints io! isa? iterate iterator-seq juxt keep keep-indexed key keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list list* list? load load-file load-reader load-string loaded-libs locking long long-array longs loop macroexpand macroexpand-1 make-array make-hierarchy map map-indexed map? mapcat mapv max max-key memfn memoize merge merge-with meta method-sig methods min min-key mod munge name namespace namespace-munge neg? newline next nfirst nil? nnext not not-any? not-empty not-every? not= ns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics ns-refers ns-resolve ns-unalias ns-unmap nth nthnext nthrest num number? numerator object-array odd? or parents partial partition partition-all partition-by pcalls peek persistent! pmap pop pop! pop-thread-bindings pos? pr pr-str prefer-method prefers primitives-classnames print print-ctor print-dup print-method print-simple print-str printf println println-str prn prn-str promise proxy proxy-call-with-super proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot rand rand-int rand-nth range ratio? rational? rationalize re-find re-groups re-matcher re-matches re-pattern re-seq read read-line read-string realized? reduce reduce-kv reductions ref ref-history-count ref-max-history ref-min-history ref-set refer refer-clojure reify release-pending-sends rem remove remove-all-methods remove-method remove-ns remove-watch repeat repeatedly replace replicate require reset! reset-meta! resolve rest restart-agent resultset-seq reverse reversible? rseq rsubseq satisfies? second select-keys send send-off seq seq? seque sequence sequential? set set-error-handler! set-error-mode! set-validator! set? short short-array shorts shuffle shutdown-agents slurp some some-fn sort sort-by sorted-map sorted-map-by sorted-set sorted-set-by sorted? special-symbol? spit split-at split-with str string? struct struct-map subs subseq subvec supers swap! symbol symbol? sync take take-last take-nth take-while test the-ns thread-bound? time to-array to-array-2d trampoline transient tree-seq true? type unchecked-add unchecked-add-int unchecked-byte unchecked-char unchecked-dec unchecked-dec-int unchecked-divide-int unchecked-double unchecked-float unchecked-inc unchecked-inc-int unchecked-int unchecked-long unchecked-multiply unchecked-multiply-int unchecked-negate unchecked-negate-int unchecked-remainder-int unchecked-short unchecked-subtract unchecked-subtract-int underive unquote unquote-splicing update-in update-proxy use val vals var-get var-set var? vary-meta vec vector vector-of vector? when when-first when-let when-not while with-bindings with-bindings* with-in-str with-loading-context with-local-vars with-meta with-open with-out-str with-precision with-redefs with-redefs-fn xml-seq zero? zipmap *default-data-reader-fn* as-> cond-> cond->> reduced reduced? send-via set-agent-send-executor! set-agent-send-off-executor! some-> some->>");var I=N("ns fn def defn defmethod bound-fn if if-not case condp when while when-not when-first do future comment doto locking proxy with-open with-precision reify deftype defrecord defprotocol extend extend-protocol extend-type try catch let letfn binding loop for doseq dotimes when-let if-let defstruct struct-map assoc testing deftest handler-case handle dotrace deftrace");var P={digit:/\d/,digit_or_colon:/[\d:]/,hex:/[0-9a-f]/i,sign:/[+-]/,exponent:/e/i,keyword_char:/[^\s\(\[\;\)\]]/,symbol:/[\w*+!\-\._?:<>\/\xa1-\uffff]/};function B(Z,Y,a){this.indent=Z;this.type=Y;this.prev=a}function S(a,Z,Y){a.indentStack=new B(Z,Y,a.indentStack)}function Q(Y){Y.indentStack=Y.indentStack.prev}function D(Y,Z){if(Y==="0"&&Z.eat(/x/i)){Z.eatWhile(P.hex);return true}if((Y=="+"||Y=="-")&&(P.digit.test(Z.peek()))){Z.eat(P.sign);Y=Z.next()}if(P.digit.test(Y)){Z.eat(Y);Z.eatWhile(P.digit);if("."==Z.peek()){Z.eat(".");Z.eatWhile(P.digit)}if(Z.eat(P.exponent)){Z.eat(P.sign);Z.eatWhile(P.digit)}return true}return false}function T(Z){var Y=Z.next();if(Y&&Y.match(/[a-z]/)&&Z.match(/[a-z]+/,true)){return}if(Y==="u"){Z.match(/[0-9a-z]{4}/i,true)}}return{startState:function(){return{indentStack:null,indentation:0,mode:false}},token:function(e,c){if(c.indentStack==null&&e.sol()){c.indentation=e.indentation()}if(e.eatSpace()){return null}var d=null;switch(c.mode){case"string":var g,f=false;while((g=e.next())!=null){if(g=='"'&&!f){c.mode=false;break}f=!f&&g=="\\"}d=M;break;default:var b=e.next();if(b=='"'){c.mode="string";d=M}else{if(b=="\\"){T(e);d=R}else{if(b=="'"&&!(P.digit_or_colon.test(e.peek()))){d=L}else{if(b==";"){e.skipToEnd();d=X}else{if(D(b,e)){d=H}else{if(b=="("||b=="["||b=="{"){var a="",Z=e.column(),Y;if(b=="("){while((Y=e.eat(P.keyword_char))!=null){a+=Y}}if(a.length>0&&(I.propertyIsEnumerable(a)||/^(?:def|with)/.test(a))){S(c,Z+K,b)}else{e.eatSpace();if(e.eol()||e.peek()==";"){S(c,Z+F,b)}else{S(c,Z+e.current().length,b)}}e.backUp(e.current().length-1);d=U}else{if(b==")"||b=="]"||b=="}"){d=U;if(c.indentStack!=null&&c.indentStack.type==(b==")"?"(":(b=="]"?"[":"{"))){Q(c)}}else{if(b==":"){e.eatWhile(P.symbol);return L}else{e.eatWhile(P.symbol);if(C&&C.propertyIsEnumerable(e.current())){d=W}else{if(E&&E.propertyIsEnumerable(e.current())){d=G}else{if(J&&J.propertyIsEnumerable(e.current())){d=L}else{d=V}}}}}}}}}}}}return d},indent:function(Y){if(Y.indentStack==null){return Y.indentation}return Y.indentStack.indent},closeBrackets:{pairs:'()[]{}""'},lineComment:";;"}});A.defineMIME("text/x-clojure","clojure")});