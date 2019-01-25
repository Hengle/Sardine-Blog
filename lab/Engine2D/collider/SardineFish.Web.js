window.SardineFish=(function(sar){console.warn(
try{
window.localStorage=(function(localStorage)
    {
        if (!localStorage) {
  Object.defineProperty(window, "localStorage", new (function () {
    var aKeys = [], oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function (sKey) { return sKey ? this[sKey] : null; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function (nKeyId) { return aKeys[nKeyId]; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function (sKey, sValue) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function () { return aKeys.length; },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function (sKey) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get = function () {
      var iThisIndx;
      for (var sKey in oStorage) {
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
        else { aKeys.splice(iThisIndx, 1); }
        delete oStorage[sKey];
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
      for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/);
        if (aCouple.length > 1) {
          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  })());
}

    })();
    if(!sar)
        sar={};
    sar.Web=(function(web)
    {
        if(!web)
            web={};
        return web;
    })(sar.Web);
    
    function LinkList()
    {
        this.head=null;
        this.tail=null;
        this.count=0;
    }
    LinkList.version=1.0;
    LinkList.Node=function(obj, last, next)
    {
        this.object=obj;
        if(last)
            this.last=last;
        else
            this.last=null;
        if(next)
            this.next=next;
        else
            this.next=null;
    }
    LinkList.prototype.add=function(obj)
    {
        if(this.count<=0)
        {
            this.head=new LinkList.Node(obj,null,null);
            this.head.parent=this;
            this.tail=this.head;
            this.count=1;
            return this.head;
        }
        var node=new LinkList.Node(obj,this.tail,null);
        node.parent=this;
        this.tail.next=node
        this.tail=node;
        this.count++;
        return node;
    }
    LinkList.prototype.remove=function(node)
    {
        if(node.parent!=this)
        {
            throw new Error("The node doesn't belong to this link list");
        }
        if(node.last==null)
        {
            this.head=node.next;
        }
        else
            node.last.next=node.next;
        if(node.next==null)
        {
            this.tail=node.last;
        }
        else
            node.next.last = node.last;
        this.count--;
    }
    LinkList.prototype.foreach=function(callback)
    {
        if(!callback)
            throw new Error("A callback function is require.");
        var p=this.head;
        for(var p=this.head;p;p=p.next)
        {
            var br = callback(p.object, p);
            if (br)
                return;
        }
    }
    if(!sar.Web.LinkList||!sar.Web.LinkList.version||sar.Web.LinkList.version < LinkList.version)
    {
        sar.Web.LinkList=LinkList;
        window.LinkList=LinkList;
    }
    sar.Web.LinkList=LinkList;
    window.LinkList=LinkList;
    
    return sar;
}catch(ex){alert("Web Init:"+ex.message);}
})(window.SardineFish);

