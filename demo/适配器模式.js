// 适配器模式 Adapter mode
// 将一个类的接口转化成客户希望的另外一个接口
// 确定目标接口 -> 确定被适配者 -> 创建适配器
// 代码场景：PPT神鹿案例（对象适配器）

// 1.确定目标接口
// 我们期待的接口
var ITarget = function(){

};
ITarget.prototype.fly = function(){
    console.log('fly');
};
ITarget.prototype.run = function(){
    console.log('run');
}

// 2.确定被适配者-神鹿
// 需要被适配的对象
var Deer = function(){

};
Deer.prototype.run = function () {
    console.log("deer running");
};

// 3.创建适配器
// 通过在内部包装一个Adaptee对象 把源接口转换成目标接口
var DeerAdapter = function(oDeer){
    ITarget.apply(this); 
    this.oDeer = oDeer; // 拥有Adaptee神鹿的对象
};
DeerAdapter.prototype = new ITarget(); // 继承ITarget
DeerAdapter.prototype.run = function(){ // 把源接口转换成目标接口
    this.oDeer.run();
};
DeerAdapter.prototype.fly = function(){
    console.log('I can fly!');
};

// 测试
var oDeerAdapter = new DeerAdapter(new Deer());

oDeerAdapter.run();
oDeerAdapter.fly();

// 测试结果
// deer running
// I can fly!