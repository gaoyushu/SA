// 策略模式 Strategy mode
// 将定义的一组算法封装起来 使其相互之间可以替换 封装的算法具有一定的独立性 不会随客户端的变化而变化
// 定义抽象策略类 -> 实现具体策略类 -> 定义环境类
// 代码场景：PPT战斗案例

// 1.定义抽象策略类
// 将战斗的一组算法封装起来 定义所有支持的算法的公共接口
var IStrategy = function(){

}
IStrategy.prototype.fighting = function(){ // 抽象类 方法需要重写
    throw new Error('you shoule rewrite this');
}

// 2.实现具体策略类
// 每种战斗方式都继承抽象策略类 并重写方法 以IStrategy接口实现某个具体算法
var Bow = function(){
    IStrategy.apply(this);
}
Bow.prototype = new IStrategy(); // 继承IStrategy 以下相同
Bow.prototype.fighting = function(){ // 重写方法
    console.log('you are using bow to fight');
}
var Knife = function(){
    IStrategy.apply(this);
}
Knife.prototype = new IStrategy();
Knife.prototype.fighting = function(){
    console.log('you are using knife to fight');
}
var Cannon = function(){
    IStrategy.apply(this);
}
Cannon.prototype = new IStrategy();
Cannon.prototype.fighting = function(){
    console.log('you are using cannon to fight');
}

// 3.定义环境类
// 内部要持有一个策略类的引用 从而给客户端调用
var Context = function(oStrategy){
    this.oStrategy = oStrategy;
}
Context.prototype.fighting = function(){
    this.oStrategy.fighting();
}

// 测试
var oContext = new Context();

oContext= new Context(new Bow());
oContext.fighting();
oContext= new Context(new Knife());
oContext.fighting();
oContext= new Context(new Cannon());
oContext.fighting();

// 测试结果
// you are using bow to fight
// you are using knife to fight
// you are using cannon to fight