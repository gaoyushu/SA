// 观察者模式 observer mode
// subscribe-notice-unsubscribe

// ObserbersList
function ObserverList(){
    this.list = [];
    this.num = 0;
} 
ObserverList.prototype.add = function(observer){
    this.list.push(observer);
    this.num++;
}
ObserverList.prototype.remove = function(observer){
    if(this.num == 0){
        console.log(observer.name,'do not subscribe!','\t',this.list);
    }else if(this.num > 0){
        var that = this;
        this.list.some((item, idx)=>{
            if(item == observer){
                that.list.splice(idx,1);
                that.num--;
                console.log(observer.name,'is already unsubscribed!','\t',that.list);
                return true;
            }else if(idx==that.num-1){
                console.log(observer.name,'do not subscribe!','\t',that.list);
            }
        })
    }
}

// Subject
function Subject(name){
    this.name = name;
    this.observerList=new ObserverList();
}
Subject.prototype.register = function(observer){
    if(this.observerList.num == 0){
        this.observerList.add(observer);
        console.log(observer.name,'subscribe successfully!','\t',this.observerList.list);
    }else if(this.observerList.num > 0){
        // same observer
        var that = this;
        this.observerList.list.some((item, idx)=>{
            if(item.name == observer.name){
                console.log(item.name,'is already subscribed!','\t',that.observerList.list);
                return true;
            }else if(that.observerList.num == idx+1){   
                this.observerList.add(observer);
                console.log(observer.name,'subscribe successfully!','\t',that.observerList.list);
            }
        })
    }
    
}
Subject.prototype.publish = function(message){
    if(this.observerList.num > 0){
        this.observerList.list.map(item=>{
            item.notify(message,this.name);
        })
    }
}
Subject.prototype.unregister = function(observer){
    this.observerList.remove(observer);
}

// Obserber
function Observer(name){
    this.name=name;
}
Observer.prototype.notify = function(message,subject){
    console.log(this.name,'get new massage:',message,'from',subject);
}

// subjectList
function SubjectList(){
    this.list = [];
    this.num = 0;
}
SubjectList.prototype.add = function(subject){
    if(this.num == 0){
        this.list.push(subject);
        this.num++;
        console.log(subject.name,'join us!', '\t',this.list);
    }else if(this.num > 0){
        var that = this;
        this.list.some((item, idx)=>{
            if(item.name == subject.name){
                console.log(subject.name,'is already exist!','\t',this.list);
                return true;
            }else if(idx == that.num-1){
                this.list.push(subject);
                this.num++;
                console.log(subject.name,'join us!', '\t',this.list);
            }
        })
    }
}

var a = new Observer('a');
var b = new Observer('b');

var sublist = new SubjectList();
var suba = new Subject('suba');
var subb = new Subject('subb');
sublist.add(suba);
sublist.add(suba);
sublist.add(subb);

suba.register(a);
suba.register(a);
subb.register(a);
suba.register(b);
suba.publish('hello');
subb.publish('world');
suba.unregister(a);
suba.unregister(a);

/* output
    suba join us!    [Subject {name: 'suba',observerList: ObserverList { list: [], num: 0}}]
    suba is already exist!   [Subject {name: 'suba',observerList: ObserverList { list: [], num: 0 }}]
    subb join us!    [Subject {name: 'suba',observerList: ObserverList { list: [], num: 0 }},Subject {name: 'subb',observerList: ObserverList { list: [], num: 0 }}]
    
    a subscribe successfully!        [ Observer { name: 'a' } ]
    a is already subscribed!         [ Observer { name: 'a' } ]
    a subscribe successfully!        [ Observer { name: 'a' } ]
    b subscribe successfully!        [ Observer { name: 'a' }, Observer { name: 'b' } ]
    a get new massage: hello from suba
    b get new massage: hello from suba
    a get new massage: world from subb
    a is already unsubscribed!       [ Observer { name: 'b' } ]
    a do not subscribe!      [ Observer { name: 'b' } ]
*/