// 代理模式 proxy mode
// 为其他对象提供一种代理以控制该对象的访问
// 代码场景：明星代理人

// 粉丝
var fans = function(name) {
    this.name = name;
}

// 明星
var star =  {
    hello: function(fan) { // 被代理类和代理类同时实现该方法
        console.log('hello '+ fan.name);
    }
}

// 代理人
var proxy = {
    hello: function(fans) { // 被代理类和代理类同时实现该方法
        star.hello(fans); // 代理类的方法调用被代理的方法来实现
    }
}

var fan = new fans('fan')
star.hello(fan); // hello fan
proxy.hello(fan); // hello fan