window.SardineFish=(function(sar){
try{
    if(!sar)
        sar={};

    sar.Web=(function(web)
    {
        if(!web)
            web={};
        return web;
    })(sar.Web);
    sar.Web.Engine2D=(function(engine)
    {console.warn(
        if(!engine)
            engine={};
        return engine;
    })(sar.Web.Engine2D);
    engine = sar.Web.Engine2D;
    
    //-------Vector2
    function Vector2(x,y)
    {
        this.x=x;
        this.y=y;
        
    }
    Vector2.fromPoint=function(p1,p2)
    {
        return new Vector2(p2.x-p1.x,p2.y-p1.y);
    }
    Vector2.prototype.copy=function()
    {
        return new Vector2(this.x,this.y);
    }
    Vector2.prototype.toString=function()
    {
        return "("+this.x+","+this.y+")";
    }
    Vector2.prototype.getLength=function()
    {
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }
    Vector2.prototype.mod=function()
    {
        return Math.sqrt(this.x*this.x+this.y*this.y);
    }
    Vector2.prototype.plus=function(v)
    {
        if(!(v instanceof Vector2))
            throw new Error("v must be a Vector");
        this.x=this.x+v.x;
        this.y=this.y+v.y;
        return this;
    }
    Vector2.prototype.minus=function(v)
    {
        if(!(v instanceof Vector2))
            throw new Error("v must be a Vector");
        this.x=this.x-v.x;
        this.y=this.y-v.y;
        return this;
    }
    Vector2.prototype.multi=function(n)
    {
        if (!isNaN(n))
        {
            this.x*=n;
            this.y*=n;
            return this;
        }
    }
    Vector2.plus=function(u,v)
    {
        if (!(u instanceof Vector2) || !(u instanceof Vector2))
        {
            throw new Error("u and v must be an Vector2.");
        }
        return new Vector2(u.x+v.x,u.y+v.y);
    }
    Vector2.minus=function(u,v)
    {
        if (!(u instanceof Vector2) || !(u instanceof Vector2))
        {
            throw new Error("u and v must be an Vector2.");
        }
        return new Vector2(u.x-v.x,u.y-v.y);
    }
    Vector2.multi=function(u,v)
    {
        if (!(u instanceof Vector2))
        {
            throw new Error("u must be an Vector2.");
        }
        if(v instanceof Vector2)
        {
            return (u.x*v.x+u.y*v.y);
        }
        else if (!isNaN(v))
        {
            return (new Vector2(u.x*v,u.y*v));
        }
    }
    engine.Vector2=Vector2;
    window.Vector2 = Vector2;

    //-------Point
    function Point(x,y)
    {
        if(isNaN(x) || isNaN(y))
            throw "x and y must be numbers.";
        this.x=x;console.warn(
        this.y=y; 
    }
    Point.prototype.copy=function()
    {
        return new Point(this.x,this.y);
    }
    Point.prototype.toString=function()
    {
        return "("+this.x+","+this.y+")";
    }
    Point.prototype.rotate=function (o, ang)
    {
        var x=this.x-o.x;
        var y=this.y-o.y;
        var dx=x*Math.cos(ang)-y*Math.sin(ang);
        var dy=y*Math.cos(ang)+x*Math.sin(ang);
        return new Point(o.x+dx,o.y+dy);
    }
    Point.prototype.isBelongTo=function(l)
    {
        if(!(this.lines instanceof Array))
            throw "this object has something wrong.";
        for(var i=0;i<this.lines.length;i++)
        {
            if(this.lines[i]==l)
                return true;
        }
        return false;
    }
    Point.prototype.addLine=function(l)
    {
        if(!(this.lines instanceof Array))
            throw "this object has something wrong.";
        this.lines[this.lines.length]=l;
    }
    Point.prototype.render = function (graphics, x, y, r, dt)
    {

    }
    engine.Point=Point;
    window.Point=Point;

    //-------Line
    function Line(_p1,_p2)
    {
        var p1=_p1,p2=_p2;
        if((_p1 instanceof Vector2) && (_p2 instanceof Vector2))
        {
            p1=new Point(_p1.x,_p1.y,this);
            p2=new Point(_p2.x,_p2.y,this);
        }
        else if(!(p1 instanceof Point) || !(p2 instanceof Point))
        {
            throw new Error("P1 or P2 is not a Point.");
        }
        this.p1=p1;
        this.p2=p2;
        this.center=new Point((p1.x+p2.x)/2,(p1.y+p2.y)/2);
        this.position=this.center;
        this.strokeStyle = new Color(0, 0, 0, 1.00);
    }
    Line.prototype.copy=function()
    {
        var p1=this.p1.copy();
        var p2=this.p2.copy();
        var line=new Line(p1,p2);
        line.setCenter(this.center.x,this.center.y);
        return line;
    }
    Line.prototype.setCenter=function(x,y)
    {
        this.center.x=x;
        this.center.y=y;
    }
    Line.prototype.moveTo=function(x,y)
    {
        if(x==this.center.x&&y==this.center.y)
            return;
        this.p1.x=this.p1.x-this.center.x+x;
        this.p1.y=this.p1.y-this.center.y+y;
        this.p2.x=this.p2.x-this.center.x+x;
        this.p2.y=this.p2.y-this.center.y+y;
        this.center.x=x;
        this.center.y=y;
    }
    Line.prototype.isCross=function (obj) 
    {
        if(obj instanceof Line)
        {
            var p1=this.p1;
            var p2=this.p2;
            var p3=obj.p1;
            var p4=obj.p2;
            var v13=new Vector2(p3.x-p1.x, p3.y-p1.y);
            var v14=new Vector2(p4.x-p1.x, p4.y-p1.y);
            var v31=new Vector2(p1.x-p3.x, p1.y-p3.y);
            var v32=new Vector2(p2.x-p3.x, p2.y-p3.y);
            var v12=new Vector2(p2.x-p1.x, p2.y-p1.y);
            var v34=new Vector2(p4.x-p3.x, p4.y-p3.y);
            if((v13.x*v12.y - v12.x*v13.y) * (v14.x*v12.y - v12.x*v14.y) < 0 && (v31.x*v34.y - v34.x*v31.y) * (v32.x*v34.y - v34.x*v32.y) < 0)
                return true;
            return false;
        }
        else if(obj instanceof Circle)
        {
            var v1=new Vector2(obj.o.x-this.p1.x,obj.o.y-this.p1.y);
            var v2=new Vector2(this.p2.x-this.p1.x, this.p2.y-this.p1.y);
            var v3=new Vector2(obj.o.x-this.p2.x,obj.o.y-this.p2.y);
            var v4=new Vector2(-v2.x,-v2.y);
            var d1=(obj.o.x-this.p1.x)*(obj.o.x-this.p1.x) + (obj.o.y-this.p1.y)*(obj.o.y-this.p1.y);
            d1=(d1<=obj.r*obj.r) ? 1:0;
            var d2=(obj.o.x-this.p2.x)*(obj.o.x-this.p2.x) + (obj.o.y-this.p2.y)*(obj.o.y-this.p2.y);
            d2=(d2<=obj.r*obj.r) ? 1:0;
            if(d1^d2)
                return true;
            if(d1&&d2)
                return false;
            if((v1.x*v2.x+v1.y*v2.y<0) || (v3.x*v4.x+v3.y*v4.y<0))
            {
                return false;
            }
            if(v3.x*v4.x+v3.y*v4.y<0)
            {
                
            }
            var x=v1.x*v2.y-v2.x*v1.y;
            var l=v2.x*v2.x+v2.y*v2.y;
            l=l*obj.r*obj.r;
            x*=x;
            
            if(x<=l)
                return true;
            return false;
        }
    }
    Line.prototype.render = function (graphics, x, y, r, dt)
    {
        graphics.beginPath();
        graphics.moveTo(this.p1.x, this.p1.y);
        graphics.lineTo(this.p2.x, this.p2.y);
        graphics.strokeStyle = this.strokeStyle;
        graphics.stroke();
    }
    engine.Line=Line;
    window.Line=Line;

    //-------GameObject
    function GameObject ()
    {
        this.id=null;
        this.name="GameObject";
        this.graphic=null;
        this.collider=null;
        this.layer=0;
        this.zIndex=0;
        this.mass=1;
        this.gravity=true;
        this.onGround=false;
        this.hitTest=false;
        this.F=new Force(0,0);
        this.constantForce=new Force(0,0);
        this.v=new Vector2(0,0);
        this.a=new Vector2(0,0);
        this.position=new Point(0,0);
        this.center=this.position;
        this.rotation=0.0;
        this.onRender=null;
        this.onUpdate=null;
        this.onStart=null;
        this.onCollide=null;
        this.onMouseDown=null;
        this.onMouseUp=null;
        this.onClick = null;
        this.onDoubleClick = null;
    }
    GameObject.CollideEventArgs=function(target)
    {
        this.target=target;
        this.e=1;
        this.dff=0;
        this.ignore=false;
    }
    GameObject.prototype.copy=function()
    {
        var obj=new GameObject();
        obj.name=this.name;
        obj.layer=this.layer;
        obj.zIndex=this.zIndex;
        if(this.graphic)
        {
            obj.graphic = this.graphic.copy ? this.graphic.copy() : this.graphic;
        }
        if(this.collider)
        {
            obj.collider = this.collider.copy ? this.collider.copy() : this.collider;
        }
        obj.mass=this.mass;
        obj.gravity=this.gravity;
        obj.onGround=this.onGround;
        obj.hitTest=this.hitTest;
        obj.constantForce=this.constantForce;
        obj.F=this.F.copy();
        obj.v=this.v.copy();
        obj.a=this.a.copy();
        obj.position=this.position.copy();
        obj.center=obj.position;
        obj.rotation=this.rotation;
        obj.onRender=this.onRender;
        obj.onUpdate=this.onUpdate;
        obj.onStart=this.onStart;
        obj.onCollide=this.onCollider;
        obj.onMouseDown=this.onMouseDown;
        obj.onMouseUp=this.onMouseUp;
        obj.onClick = this.onClick;
        obj.onDoubleClick = this.onDoubleClick;
        return obj;
    }
    GameObject.prototype.resetForce=function()
    {
        this.F.x=0;
        this.F.y=0
    }
    GameObject.prototype.resetConstantForce=function()
    {
        this.constantForce.x=0;
        this.constantForce.y=0;
    }
    GameObject.prototype.force=function(a,b,c)
    {
        if(a instanceof Force)
        {
            if(b)
            {
                this.constantForce.x+=a.x;
                this.constantForce.y+=a.y;
                return this.constantForce;
            }
            this.F.x+=a.x;
            this.F.y+=a.y;
            return this.F;
        }
        else if(isNaN(a)||isNaN(b))
        {
            throw new Error("Paramate must be a Number.");
        }
        else
        {
            if(c)
            {
                this.constantForce.x+=a;
                this.constantForce.y+=b;
                return this.constantForce;
            }
            this.F.x+=a;
            this.F.y+=b;
            return this.F;
        }
    }
    GameObject.prototype.addMomenta=function(p)
    {
         
    }
    GameObject.prototype.drawToCanvas=function(canvas,x,y,r,dt)
    {
        if(this.graphic)
            this.graphic.drawToCanvas(canvas,x,y,r,dt);
    }
    GameObject.prototype.render = function (graphics, x, y, r, dt)
    {
        if (this._animCallback)
            this._animCallback(dt);
        if (this.graphic)
            this.graphic.render(graphics, x, y, r, dt);
    }
    GameObject.prototype.setCenter=function(x,y)
    {
        this.position.x = x;
        this.position.y = y;
    }
    GameObject.prototype.moveTo=function(x,y)
    {
        if(this.graphic)
        {
            this.graphic.moveTo(this.graphic.position.x-this.position.x+x,this.graphic.position.y-this.position.y+y);
        }
        if(this.collider && this.collider!=this.graphic)
        {
            this.collider.moveTo(this.collider.position.x-this.position.x+x,this.collider.position.y-this.position.y+y);
        }
        this.position.x=x;
        this.position.y=y;
    }
    GameObject.prototype.moveAnimateTo = function (x, y, t, callback)
    {
        var startPosition = this.position.copy();
        var time = 0;
        var gameObject = this;
        this._animCallback = function (dt)
        {
            time += dt;
            if (time >= t)
                time = t;
            gameObject.moveTo((x - startPosition.x) / t * time + startPosition.x, (y - startPosition.y) / t * time + startPosition.y);
            if(time == t )
            {
                gameObject._animCallback = null;
                if (callback)
                    callback();
            }
        }
    }
    engine.GameObject=GameObject;
    window.GameObject = GameObject;

    

    //-------Colliders
    function Colliders() { }

    

    //-------Circle
    function Circle (r)
    {
        if(!r)
            r=0;
        this.r=r;
        this.o=new Point(0,0);
        this.position=new Point(0,0);
        this.center=this.position;     
        this.angV=0;
        this.rotate=0;
        this.rigidBody=false;
        this.e=1;
        this.I=1;//moment of inercial
        this.mass=1;
        this.dff=0;//dynamic friction factor
        this.static=false;
        this.soft=true;
        this.landed=false;
        this.strokeWidth=1;
        this.strokeStyle=new Color(0,0,0,1);
        this.fillStyle=new Color(255,255,255,1);
    }
    Circle.prototype.copy=function()
    {
        var circle=new Circle(this.r);
        circle.setCenter(this.o.x,this.o.y);
        circle.strokeWidththis.strokeWidth;
        if(this.strokeStyle instanceof Color)
            circle.strokeStyle=this.strokeStyle.copy();
        else
            circle.strokeStyle=this.strokeStyle;
        if(this.fillStyle instanceof Color)
            circle.fillStyle=this.fillStyle.copy();
        else
            circle.fillStyle=this.fillStyle;
        return circle;
    }
    Circle.prototype.setPosition=function(x,y)
    {
        this.o.x+=x-this.position.x;
        this.o.y+=y-this.position.y;
        this.position.x=x;
        this.position.y=y;
    }
    Circle.prototype.setCenter=function(x,y)
    {
        this.position.x=x;
        this.position.y=y;
    }
    Circle.prototype.moveTo=function(x,y)
    {
        if(x==this.position.x&&y==this.position.y)
            return;
        this.o.x=this.o.x-this.position.x+x;
        this.o.y=this.o.y-this.position.y+y;
        this.position.x=x;
        this.position.y=y;
    }
    Circle.prototype.drawToCanvas=function(canvas,x,y,r,dt)
    {
         var ctx=canvas.getContext("2d");
         ctx.beginPath();
         ctx.arc(this.o.x,this.o.y,this.r,0,2*Math.PI);
         ctx.lineWidth=this.strokeWidth;
         ctx.strokeStyle=this.strokeStyle;
         ctx.fillStyle=this.fillStyle;
         ctx.fill();
         ctx.stroke();
    }
    Circle.prototype.render = function (graphics, x, y, r, dt)
    {
        graphics.beginPath();
        graphics.arc(this.o.x, this.o.y, this.r, 0, 2 * Math.PI);
        graphics.lineWidth = this.strokeWidth;
        graphics.strokeStyle = this.strokeStyle;
        graphics.fillStyle = this.fillStyle;
        graphics.fill();
        graphics.stroke();
    }
    Circle.prototype.isCross=function(obj)
    {
        if(obj instanceof Line)
        {
            return obj.isCross(this);
        }
        else if(obj instanceof Circle)
        {
            return this.isCollideWith(obj);
        }
    }
    Circle.prototype.isCollideWith=function (col)
    {
        if(col instanceof Polygon)
        {
            for(var i=0;i<col.E.length;i++)
            {
                if(col.E[i].isCross(this))
                    return true;
            }
            return false;
        }
        else if(col instanceof Circle)
        {
            var dx=this.o.x-col.o.x;
            var dy=this.o.y-col.o.y;
            var d=dx*dx+dy*dy;
            if((this.r-col.r)*(this.r-col.r)<=d && d<=(this.r+col.r)*(this.r+col.r))
                return true;
            return false;
        }
        else if (col instanceof Rectangle)
        {
            if (col.o.x <= this.o.x && this.o.x <= col.o.x + col.width)
            {
                if (col.o.y - this.r <= this.o.y && this.o.y <= col.o.y + col.height + this.r)
                    return true;
            }
            if (col.o.y <= this.o.y && this.o.y <= col.o.y + col.height)
            {
                if (col.o.x - this.r <= this.o.x && this.o.x <= col.o.x + col.width + this.r)
                    return true;
            }
        }
    }
    Circle.prototype.collide=function(self,target,dt)
    {
        if(self.collider.static&&target.collider.static)
            return;
        if(target.collider instanceof Circle)
        {
            var args=new GameObject.CollideEventArgs();
            args.dff=Math.min(self.collider.dff,target.collider.dff);
            args.e=Math.min(self.collider.e,target.collider.e);
            if(self.onCollide)
            {
                args.target=target;
                self.onCollide(args);
                if(args.ignore)
                    return;
            }
            if(target.onCollide)
            {
                args.target=self;
                target.onCollide(args);
                if(args.ignore)
                    return;
            }
            var o1=self.collider.o;
            var o2=target.collider.o;
            var m1=self.collider.mass;
            var m2=target.collider.mass;
            var v0=self.v;
            var e=args.e;
            var dff=args.dff;
            var v1=new Vector2(0,0);
            var v2=new Vector2(target.v.x-v0.x,target.v.y-v0.y);
            var o21=new Vector2(o1.x-o2.x,o1.y-o2.y);
            var n=new Vector2(o21.y,-o21.x);
            var Lo21=o21.x*o21.x+o21.y*o21.y;
            var Ln=n.x*n.x+n.y*n.y;
            var vt=Vector2.multi(n,(v2.x*n.x+v2.y*n.y)/Ln);
            var Lvn=v2.x*o21.x+v2.y*o21.y;
            if(Lvn<=0)
            {
                return;
                
            }
            var vn=Vector2.multi(o21,Lvn/Lo21);
//alert((v2.x*o21.x+v2.y*o21.y)/Lo21);
            v1=Vector2.multi(vn,(m2+e*m2)/(m1+m2));
            v2=Vector2.multi(vn,(m2-e*m1)/(m1+m2));
            v1.plus(v0);
            v2.plus(vt);
            v2.plus(v0);
            self.v=v1;
            target.v=v2;
        }
        else if(target.collider instanceof Rectangle)
        {
            var args = new GameObject.CollideEventArgs();
            args.dff = Math.min(self.collider.dff, target.collider.dff);
            args.e = Math.min(self.collider.e, target.collider.e);
            if (self.onCollide)
            {
                args.target = target;
                self.onCollide(args);
                if (args.ignore)
                    return;
            }
            if (target.onCollide)
            {
                args.target = self;
                target.onCollide(args);
                if (args.ignore)
                    return;
            }
            var e = args.e;
            var dff = args.dff;
            var m1 = target.mass;
            var m2 = self.mass;
            var rect=target.collider;
            var circle=self.collider;
            var dx=-1,dy=-1;
            var v0=target.v;
            var v1 = new Vector2(0, 0);
            var v2 = new Vector2(self.v.x - v0.x, self.v.y - v0.y);
            var V = [
                new Point(rect.o.x, rect.o.y),
                new Point(rect.o.x + rect.width, rect.o.y),
                new Point(rect.o.x + rect.width, rect.o.y + rect.height),
                new Point(rect.o.x, rect.o.y + rect.height)];

            var E = [
                    new Line(V[0], V[1]),
                    new Line(V[1], V[2]),
                    new Line(V[2], V[3]),
                    new Line(V[3], V[0])];

            //Length
            E[0].length = rect.width;
            E[1].length = rect.height;
            E[2].length = rect.width;
            E[3].length = rect.height;
            //Normal Vector
            E[0].norV = new Vector2(0, -1);
            E[1].norV = new Vector2(1, 0);
            E[2].norV = new Vector2(0, 1);
            E[3].norV = new Vector2(-1, 0);
            //Tangent Vector
            E[0].tanV = new Vector2(1, 0);
            E[1].tanV = new Vector2(0, 1);
            E[2].tanV = new Vector2(-1, 0);
            E[3].tanV = new Vector2(0, -1);
            for (var i = 0; i < 4; i++)
            {
                var p = V[i];
                p.norV = new Vector2(p.x - this.center.x, p.y - this.center.y);
                p.tanV = new Vector2(-p.norV.y, p.norV.x);
            }

            var minL = null;
            var minLD = -1;
            for (var i = 0; i < 4; i++)
            {
                var l = E[i];
                if (v2.x * l.norV.x + v2.y * l.norV.y > 0) //Away from edge
                    continue;
                var n = new Vector2(circle.o.x - l.p1.x, circle.o.y - l.p1.y);
                var t = l.tanV.x * n.x + l.tanV.y * n.y;
                if (0 <= t && t <= l.length) //In edge
                {
                    var d = (n.x * l.norV.x + n.y * l.norV.y);
                    if (0 <= d && d <= circle.r) //Touch
                    {
                        if (d < minLD || minLD < 0)
                        {
                            minL = l;
                            minLD = d;
                        }
                    }
                }
            }
            minP = null;
            minPD = -1;
            for (var i = 0; i < 4; i++)
            {
                var p = V[i];
                if (v2.x * p.norV.x + v2.y * p.norV.y > 0) //Away from Point
                    continue;
                var n = new Vector2(circle.o.x - p.x, circle.o.y - p.y);
                var d = n.x * p.norV.x + n.y * p.norV.y;
                if (0 <= d && d <= circle.r)
                {
                    if (d < minPd || minPD < 0)
                    {
                        minP = p;
                        minPD = d;
                    }
                }
            }

            if (minLD < 0 && minPD < 0)
                return;

            var vn = null, vt = null;
            if (minPD < 0 || (minLD > 0 && minLD <= minPD)) //Collide with edge
            {
                vn = Vector2.multi(minL.norV, (v2.x * minL.norV.x + v2.y * minL.norV.y));
                vt = new Vector2(v2.x - vn.x, v2.y - vn.y);
            }
            else if (minLD < 0 || (minPD >= 0 && minPD < minLD)) //Collide with Point
            {
                var n = new Vector2(minP.x - circle.o.x, minP.y - circle.o.y);
                var Ln = n.x * n.x + n.y * n.y;
                vn = Vector2.multi(n, (n.x * v2.x + n.y * v2.y) / Ln);
                vt = new Vector2(v2.x - vn.x, v2.y - vn.y);
            }
            else
                return;
            if (!vn || !vt)
                return;
            if (self.collider.static)
            {
                v1.x = 2 * vn.x;
                v1.y = 2 * vn.y;
            }
            else if (target.collider.static)
            {
                v2.x = -vn.x;
                v2.y = -vn.y;
            }
            else
            {
                v1 = Vector2.multi(vn, (m2 + e * m2) / (m1 + m2));
                v2 = Vector2.multi(vn, (m2 - e * m1) / (m1 + m2));
            }
            v2.plus(vt);
            v2.plus(v0);
            v1.plus(v0);
            target.v = v1;
            self.v = v2;
        }
        else
        {
return;
            return target.collider.collide(target,self,dt);
        }
    }
    Colliders.Circle = Circle;
    window.Circle=Circle;

    //-------Polygon
    function Polygon (v)
    {
        if(!(v instanceof Array))
            throw new Error("Paramater v must be a array of points");
        this.E=new Array();
        this.V=new Array();
        this.strokeWidth=1;
        this.strokeStyle=new Color(0,0,0,1);
        this.fillStyle=new Color(255,255,255,1);
        this.V=v;
        this.E=new Array();
        this.rigidBody=false;
        this.bounce=1;
        this.dff=0;//dynamic friction factor
        this.static=false;
        this.soft=true;
        this.landed=false;
        var sumX=0,sumY=0;
        for(var i=0;i<v.length;i++)
        {
            sumX+=v[i].x;
            sumY+=v[i].y;
            var j=(i+1)%v.length;
            this.E[i]=new Line(v[i],v[j]);
        }
        this.center=new Point(sumX/v.length,sumY/v.length);
        this.position=this.center;
    }
    Polygon.createRect=function (x,y,width,height)
    {
        var v=[];
        v[0]=new Point(x,y);
        v[1]=new Point(x+width,y);
        v[2]=new Point(x+width,y+height);
        v[3]=new Point(x,y+height);
        return new Polyon(v);
    }
    /*
    Polygon.prototype.addLine=function(l)
    {
        if(!(l instanceof Line))
            throw "paramter is not a line.";
        if(!(this.E instanceof Array))
        {
            this.E=new Array();
        }
        this.E[this.E.length]=l;
        l.polygon=this;
        if(!(this.V instanceof Array))
        {
            this.V=new Array();
        }
        var existed=false;
        for(var i=0;i<this.V.length;i++)
        {
            if(this.V[i].x==l.p1.x && this.V[i].y==l.p1.y)
            {
                existed=true;
                break;
            }
        }
        if(!existed)
            this.V[this.V.length]=l.p1;
        existed=false;
        for(var i=0;i<this.V.length;i++)
        {
            if(this.V[i].x==l.p2.x && this.V[i].y==l.p2.y)
            {
                existed=true;
                break;
            }
        }
        if(!existed)
            this.V[this.V.length]=l.p2;
    }
    */
    Polygon.prototype.copy=function()
    {
        var v=[];
        for(var i=0;i<this.V.length;i++)
        {
            v[i]=new Point(this.V[i].x,this.V[i].y);
        }
        var pol=new Polygon(v);
        pol.strokeWidth=this.strokeWidth;
        if(this.strokeStyle instanceof Color)
            pol.strokeStyle=this.strokeStyle.copy();
        else
            pol.strokeStyle=this.strokeStyle;

        if(this.fillStyle instanceof Color)
            pol.fillStyle=this.fillStyle.copy();
        else
            pol.fillStyle=this.fillStyle;

        pol.setCenter(this.center.x,this.center.y);
        return pol;
    }
    Polygon.prototype.moveTo=function (x,y)
    {
        for(var i=0;i<this.V.length;i++)
        {
            this.V[i].x=(this.V[i].x-this.center.x)+x;
            this.V[i].y=(this.V[i].y-this.center.y)+y;
        }
        this.center.x=x;
        this.center.y=y;
    }
    Polygon.prototype.setCenter=function(x,y)
    {
        this.center.x=x;
        this.center.y=y;
    }
    Polygon.prototype.isCollideWith=function(col)
    {
        if(!(col instanceof Polygon) && !(col instanceof Circle))
            throw new Error("The parameter is not a collider");
        if(!(this.E instanceof Array))
        {
            throw new Error("Something wrong with this polygon");
        }
        if(col instanceof Polygon)
        {
            if(!(col.E instanceof Array))
            {
                throw new Error("Something wrong with the polygon");
            }
            for(var i=0;i<this.E.length;i++)
                for(var j=0;j<col.E.length;j++)
                {
                    
                    if(this.E[i].isCross(col.E[j]))
                    {
                        //Graphics.drawLine(this.E[i], "red");
                        //Graphics.drawLine(col.E[j], "red");
                        return true;
                    }
                }
            return false;
        }
        else if(col instanceof Circle)
        {
            for(var i=0;i<this.E.length;i++)
            {
                if(this.E[i].isCross(col))
                    return true;
            }
            return false;
        }
        return false;
    }
    Polygon.prototype.render = function (graphics, x, y, r, dt)
    {
        graphics.beginPath();
        if (this.V.length < 3)
            throw new Error("The polygen must contains at least 3 points.");
        graphics.moveTo(this.V[0].x, this.V[0].y);
        for (var i = 1; i < this.V.length; i++)
            graphics.lineTo(this.V[i].x, this.V[i].y);
        graphics.lineTo(this.V[0].x, this.V[0].y);
        graphics.lineWidth = this.strokeWidth;
        graphics.strokeStyle = this.strokeStyle;
        graphics.fillStyle = this.fillStyle;
        graphics.fill();
        graphics.stroke();
    }
    Colliders.Polygon = Polygon;
    window.Polygon = Polygon;

    //-------Rectangle
    function Rectangle(w,h)
    {
        w=isNaN(w)?0:w;
        h=isNaN(h)?0:h;
        this.width=w;
        this.height=h;
        this.o=new Point(0,0);
        this.position=new Point(w/2,h/2);
        this.center=this.position;
        this.rigidBody=false;
        this.bounce=1;
        this.dff=0;//dynamic friction factor
        this.static=false;
        this.soft=true;
        this.landed=false;
        this.fillStyle=new Color(255,255,255,1);
        this.strokeStyle = new Color(0, 0, 0, 1);
        this.V = [
            new Point(0, 0),
            new Point(w, 0),
            new Point(w, h),
            new Point(0, h)];
        this.E = [
                new Line(this.V[0], this.V[1]),
                new Line(this.V[1], this.V[2]),
                new Line(this.V[2], this.V[3]),
                new Line(this.V[3], this.V[0])];
        for (var i = 0; i < 4; i++)
        {
            var p = this.V[i];
            p.norV = new Vector2(p.x - this.center.x, p.y - this.center.y);
            p.tanV = new Vector2(-p.norV.y, p.norV.x);
        }
        //Length
        this.E[0].length = w;
        this.E[1].length = h;
        this.E[2].length = w;
        this.E[3].length = h;
        //Normal Vector
        this.E[0].norV = new Vector2(0, -1);
        this.E[1].norV = new Vector2(1, 0);
        this.E[2].norV = new Vector2(0, 1);
        this.E[3].norV = new Vector2(-1, 0);
        //Tangent Vector
        this.E[0].tanV = new Vector2(1, 0);
        this.E[1].tanV = new Vector2(0, 1);
        this.E[2].tanV = new Vector2(-1, 0);
        this.E[3].tanV = new Vector2(0, -1);
    }
    Rectangle.prototype.copy=function()
    {
        var rect=new Rectangle(this.width,this.height);
        rect.o=this.o.copy();
        rect.position=this.position.copy();
        rect.rigidBody=this.rigidBody;
        rect.bounce=this.bounce;
        rect.dff=this.dff;
        rect.static=this.static;
        rect.soft=this.soft;
        rect.landed=this.landed;
        if(this.strokeStyle instanceof Color)
            rect.strokeStyle=this.strokeStyle.copy();
        else
            rect.strokeStyle=this.strokeStyle;
        if(this.fillStyle instanceof Color)
            rect.fillStyle=this.fillStyle.copy();
        else
            rect.fillStyle=this.fillStyle;
        return rect;
    }
    Rectangle.prototype.setCenter=function(x,y)
    {
        if(!isNaN(x)&&!isNaN(y))
        {
            this.position.x=x;
            this.position.y=y;
        }
        else
        {
            this.position.x=this.o.x+(x(this.width,this.height)).x;
            this.position.y=this.o.y+this.height-(x(this.width,this.height)).y;
        }
    }
    Rectangle.prototype.moveTo=function(x,y)
    {
        this.o.x+=x-this.position.x;
        this.o.y+=y-this.position.y;
        this.position.x=x;
        this.position.y=y;
    }
    Rectangle.prototype.setPosition=Rectangle.prototype.moveTo;
    Rectangle.prototype.drawToCanvas=function(canvas,x,y,r,dt)
    {
        var ctx=canvas.getContext("2d");
        ctx.fillStyle=this.fillStyle;
        ctx.strokeStyle=this.strokeStyle;
        ctx.fillRect(this.o.x,this.o.y,this.width,this.height);
        ctx.strokeRect(this.o.x,this.o.y,this.width,this.height);
    }
    Rectangle.prototype.render = function (graphic, x, y, r, dt)
    {
        graphic.fillStyle = this.fillStyle;
        graphic.strokeStyle = this.strokeStyle;
        graphic.fillRect(this.o.x, this.o.y+this.height, this.width, this.height);
        graphic.strokeRect(this.o.x, this.o.y+this.height, this.width, this.height);
    }
    Rectangle.prototype.isCollideWith = function (obj)
    {
        if (obj instanceof Ground)
        {
            return (!(this.o.x > obj.xR || this.o.x + this.width < obj.xL) && (this.o.y >= obj.y && obj.y >= this.o.y - this.height));
        }
        else if (obj instanceof Wall)
        {
            return (!(this.o.y - this.height > obj.yH || this.o.y < obj.yL) && (this.o.x <= obj.x && obj.x <= this.o.x + this.width));
        }
        else if (obj instanceof Rectangle)
        {
            var x1 = (obj.o.x - this.o.x) * (obj.o.x + obj.width - this.o.x);
            var x2 = (obj.o.x - (this.o.x + this.width)) * (obj.o.x + obj.width - (this.o.x + this.width));
            var y1 = (obj.o.y - this.o.y) * (obj.o.y + obj.height - this.o.y);
            var y2 = (obj.o.y - (this.o.y + this.height)) * (obj.o.y + obj.height - (this.o.y + this.height));
            if (obj.o.x + obj.width < this.o.x || this.o.x + this.width < obj.o.x ||
               obj.o.y - obj.height > this.o.y || this.o.y - this.height > obj.o.y)
            {
                return false;
            }
            else
                return true;
        }
        else if (obj instanceof Point)
        {
            if (this.o.x <= obj.x && obj.x <= this.o.x + this.width && obj.y <= this.o.y && this.o.y - this.height <= obj.y)
                return true;
            else
                return false;
        }
        else if (obj instanceof Circle)
            return obj.isCollideWith(this);
    }
    Rectangle.prototype.collide=function(main,obj,dt)
    {
        if(main.collider.static&&obj.collider.static)
            return;
        if(main.onCollide)
        {
            var e=new GameObject.CollideEventArgs(main,obj);
            e.relativeV=new Vector2(obj.v.x-main.v.x,obj.v.y-main.v.y);
            main.onCollide(e);
        }
        if(obj.onCollide)
        {
            var e=new GameObject.CollideEventArgs(obj,main);
            e.relativeV=new Vector2(main.v.x-obj.v.x,main.v.y-obj.v.y);
            obj.onCollide(e);
        }
        if(obj.collider instanceof Rectangle)
        {
            var dx=-1,dy=-1;
            if(obj.v.x-main.v.x<0)
            {
                dx=Math.abs(main.collider.o.x+main.collider.width-obj.collider.o.x);
            }
            else if(obj.v.x-main.v.x>0)
            {
                dx=Math.abs(obj.collider.o.x+obj.collider.width-main.collider.o.x);
            }
            else if(obj.v.x-main.v.x==0)
            {
                dx=Math.min(Math.abs(main.collider.o.x+main.collider.width-obj.collider.o.x),Math.abs(obj.collider.o.x+obj.collider.width-main.collider.o.x));
            }
            if(obj.v.y-main.v.y<0)
            {
                dy=Math.abs(main.collider.o.y-(obj.collider.o.y-obj.collider.height));
            }
            else if(obj.v.y-main.v.y>0)
            {
                dy=Math.abs(obj.collider.o.y-(main.collider.o.y-main.collider.height));
            }
            else if(obj.v.y-main.v.y==0)
            {
                dy=Math.min(Math.abs(main.collider.o.y-(obj.collider.o.y-obj.collider.height)),Math.abs(obj.collider.o.y-(main.collider.o.y-main.collider.height)));
            }
            if((dx>=0&&dx<=dy) || dy<0)
            {
                var v1=obj.v.x-main.v.x;
                var v2=0;
                if(!main.collider.static&&!obj.collider.static)
                {
                    v2=2*obj.mass*v1/(obj.mass+main.mass);
                    v1=(obj.mass-main.mass)*v1/(obj.mass+main.mass);
                    v2+=main.v.x;
                    v1+=main.v.x;
                }
                else if(main.collider.static)
                {
                    
                    v1=-obj.v.x*obj.collider.bounce;
                    v2=main.v.x;
                }
                else
                {
                    v1=obj.v.x;
                    v2=-main.v.x*main.collider.bounce;
                }
                var t=dx/Math.abs(main.v.x-obj.v.x);
                t=isNaN(t)?0:t;
                t>dt?dt:t;
                if(!main.collider.soft||!obj.collider.soft)
                {
                    main.moveTo(main.position.x-(main.v.x*t)+(v2*(dt-t)),main.position.y);
                    obj.moveTo(obj.position.x-(obj.v.x*t)+(v1*(dt-t)),obj.position.y);
                }
                main.v.x=v2;
                obj.v.x=v1;
            }
            else if((dy>=0&&dy<=dx) || dx<0)
            {
                var v1=obj.v.y-main.v.y;
                var v2=0;
                if(!main.collider.static&&!obj.collider.static)
                {
                    v2=2*obj.mass*v1/(obj.mass+main.mass);
                    v1=(obj.mass-main.mass)*v1/(obj.mass+main.mass);
                    v2+=main.v.y;
                    v1+=main.v.y;
                }
                else if(main.collider.static)
                {
                    v1=-obj.v.y*obj.collider.bounce;
                    v2=main.v.y;
                    if(obj.v.y<=0&&obj.gravity)
                        obj.collider.landed=true;
                }
                else
                {
                    v1=obj.v.y;
                    v2=-main.v.y*main.collider.bounce;
                    if(main.v.y<=0&&main.gravity)
                        main.collider.landed=true;
                }
                var t=dy/Math.abs(main.v.y-obj.v.y);
                t=isNaN(t)?0:t;
                t>dt?dt:t;
                if(!main.collider.soft||!obj.collider.soft)
                {
                    main.moveTo(main.position.x,main.position.y-(main.v.y*t)+(v2*(dt-t)));
                    obj.moveTo(obj.position.x,obj.position.y-(obj.v.y*t)+(v1*(dt-t)));
                }
                main.v.y=v2;
                obj.v.y=v1;
            }
        }
        else if(obj.collider instanceof Ground)
        {
            if(main.collider.o.y-main.collider.height<=obj.collider.y)
            {
                var t=(main.collider.o.y-main.collider.height-obj.collider.y)/main.v.y;
                t=isNaN(t)?0:t;
                main.moveTo(main.position.x,main.position.y-main.v.y*t);
                main.v.y=-main.v.y*main.collider.bounce;
                if(main.gravity)
                    main.collider.landed=true;
            }
        }
        else if (obj.collider instanceof Wall)
        {
            
        }
        else if(obj.collider instanceof Circle)
        {
            return obj.collider.collide(obj, main, dt);
        }
    }
    Colliders.Rectangle = Rectangle;
    window.Rectangle = Rectangle;

    //-------Ground
    function Ground(y, xL, xR)
    {
        xL = isNaN(xL) ? 0 : xL;
        xR = isNaN(xR) ? Number.MAX_SAFE_INTEGER : xR;
        this.position = new Point(xL, y);
        this.y = y;
        this.width = xR - xL;
        this.xL = xL;
        this.xR = xR;
        this.static = true;
        this.rigidBody = true;
    }
    Ground.prototype.copy=function()
    {
        var g=new Ground(this.y,this.xL,this.xR);
        g.rigidBody=this.rigidBody;
        g.static = this.static;
        g.position=this.position.copy();
        return g;
    }
    Ground.prototype.moveTo=function(x,y)
    {
        this.y=y;
        this.position.x=x;
        this.position.y=y;
    }
    Ground.prototype.setCenter = function (x, y, align)
    {
        this.y = y;
        this.xL = x - align(this.xR - this.xL).x;
        this.xR = this.xL + this.width;
    }
    Ground.prototype.drawToCanvas=function(canvas,x,y,r,dt)
    {
        return;
        var ctx=canvas.getContext("2d");
        ctx.fillStyle=this.fillStyle;
        ctx.strokeStyle=this.strokeStyle;
        ctx.fillRect(this.center.x,this.center.y,canvas.width,this.height);
        ctx.strokeRect(this.center.x,this.center.y,canvas.width,this.height);
    }
    Ground.prototype.render = function (graphics, x, y, r, dt)
    {
        return;
    }
    Ground.prototype.toGameObject=function()
    {
        var obj=new GameObject();
        obj.collider=this;
        obj.graphic=this;
        obj.mass=1;
        obj.gravity=false;
        return obj;
    }
    Ground.prototype.isCollideWith=function(col)
    {
        if (col instanceof Rectangle)
            return col.isCollideWith(this);
        else if (col instanceof Circle)
            return col.isCollideWith(this);
    }
    Ground.prototype.collide=function(ground,obj,dt)
    {
        if(obj.collider instanceof Rectangle)
            return obj.collider.collide(obj,ground,dt);
    }
    Colliders.Ground = Ground;
    window.Ground = Ground;

    //-------Wall
    function Wall(x, yL, yH)
    {
        yL = isNaN(yL) ? 0 : yL;
        yH = isNaN(yH) ? Number.MAX_SAFE_INTEGER : yH;
        this.x = x;
        this.height = yH - yL;
        this.yL = yL;
        this.yH = yH;
        this.static = true;
        this.rigidBody = true;
        this.position = new Point(x, yL);
    }
    Wall.prototype.copy = function ()
    {
        var w = new Wall(this.x, this.yL, this.yH);
        w.rigidBody = this.rigidBody;
        w.static = this.static;
        w.position = this.position.copy();
    }
    Wall.prototype.toGameObject = function ()
    {
        var obj = new GameObject();
        obj.collider = this;
        obj.graphic = this;
        obj.mass = 1;
        obj.gravity = false;
        return obj;
    }
    Wall.prototype.setCenter = function (x, y, align)
    {
        this.x = x;
        this.yH = y + align(this.height);
        this.yL = this.yH - this.height;
        this.position.x = x;
        this.position.y = y;
    }
    Wall.prototype.moveTo = function (x, y)
    {
        this.x += (x - this.position.x);
        this.yH += (y - this.position.y);
        this.yL += (y - this.position.y);
        this.position.x = x;
        this.position.y = y;
    }
    Wall.prototype.isCollideWith = function (col)
    {
        if(col instanceof Rectangle )
            return col.isCollideWith (this);
    }
    Colliders.Wall = Wall;
    window.Wall = Wall;

    function OneWayGround()
    {

    }


    engine.Colliders=Colliders;
    window.Colliders=Colliders;

    return sar;
}catch(ex){alert("Collider init:"+ex.message);}
})(window.SardineFish);





































