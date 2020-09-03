// 命令模式 command mode
// 解决多个命令者和多个实施者之间的耦合关系
// 客户下达命令-传达者接受并传递给执行者-执行者接收并执行命令
// 代码场景：点菜

// 命令模式类似于JS中的回调函数 

// 命令发出者-顾客
const Client = function(name){
    this.name = name;
}

// 命令执行者-厨师
const Cook = function(name){
    this.name = name;
}
Cook.prototype.makeFood = function(food){
    console.log('makefood: ', food);
}
Cook.prototype.serveFood = function(client){
    console.log('serveFood: ', client.name);
}

// 命令传达者-服务员
const Waiter = function(client, food) { // 命令对象
    this.client = client;
    this.food = food;
}
Waiter.prototype.execute = function (cook) { // 提供执行方法
    console.log('Relaying');
    cook.makeFood(this.food)
    cook.serveFood(this.client)
}

// 测试
var client1 = new Client('client1');
var client2 = new Client('client2');

var cook = new Cook('cook');

var command = new Waiter(client1, 'Kung Pao Chicken');
command.execute(cook);
command = new Waiter(client2, 'Yu-Shiang Rose');
command.execute(cook);
command = new Waiter(client1, 'Yu-Shiang Rose');
command.execute(cook);

// 测试结果
// Relaying
// makefood:  Kung Pao Chicken
// serveFood:  client1
// Relaying
// makefood:  Yu-Shiang Rose
// serveFood:  client2
// Relaying
// makefood:  Yu-Shiang Rose
// serveFood:  client1