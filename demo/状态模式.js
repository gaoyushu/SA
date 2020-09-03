// 状态模式 state mode
// 某对象状态发生变化时 其所能做的操作也随之改变
// 环境类 抽象状态类 具体状态类

// 环境类
// 定义环境类 它是具有状态的类 其中包含状态类接口的对象 当该类执行某个接口的方法时 会调用真实状态类的实现方法 当该类修改状态时 也会修改该类的真实状态对象
const Context = function(state){
    this.state = state; // 当前状态
}
Context.prototype.request = function(state){ // 更换状态 同时调用相同方法 会有不同状态不同的对应结果
    this.state = state;
    this.state.handle();
}

// 抽象状态类
const State = function(){

}
State.prototype.handle = function(){
    throw new Error('you shoule rewrite this');
}

// 具体状态类
// 继承自抽象状态类 重写方法
const StateA = function(){
    State.apply(this);
}
StateA.prototype = new State(); // 继承抽象状态类
StateA.prototype.handle = function(){ // 重写handle方法
    console.log('this is stateA');
}
const StateB = function(){
    State.apply(this);
}
StateB.prototype = new State();
StateB.prototype.handle = function(){
    console.log('this is stateB');
}
const StateC = function(){
    State.apply(this);
}
StateC.prototype = new State();
StateC.prototype.handle = function(){
    console.log('this is stateC');
}

// 测试
var stateA = new StateA();
var stateB = new StateB();
var stateC = new StateC();

var context = new Context();
context.request(stateA);
context.request(stateB);
context.request(stateC);

// 预想结果
// A -> B -> C

// 测试结果
// this is stateA
// this is stateB
// this is stateC