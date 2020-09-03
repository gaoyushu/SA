// 装饰模式 Decorator mode
// 不必改变原类文件和使用继承的情况下 动态地扩展一个对象的功能

// 被装饰者
var Car = function() {}
Car.prototype.drive = function() {
    console.log('drive!'); // 驾驶
} 
Car.prototype.brake = function() {
    console.log('brake!'); // 刹车
}

// 装饰者
// 实现所有接口的装饰器父类
var CarDecorator = function(car) {
    this.car = car;
}
CarDecorator.prototype = {
    drive: function() {
        this.car.drive();
    },
    brake: function() {
        this.car.brake();
    }
}

var AutopilotDecorator = function(car) {
    CarDecorator.call(this, car);
}
AutopilotDecorator.prototype = new CarDecorator(); // 继承自装饰器父类
AutopilotDecorator.prototype.drive = function() {
    this.car.drive();
    console.log('self driving'); // 自动驾驶
}

var HybridDecorator = function(car) {
    CarDecorator.call(this, car);
}
HybridDecorator.prototype = new CarDecorator(); // 继承自装饰器父类
HybridDecorator.prototype.brake = function() {
    this.car.brake();
    console.log('start charging'); // 开始充电
}

// 测试
var car = new Car();
car = new AutopilotDecorator(car);
car = new HybridDecorator(car);
car.drive();
car.brake();

// 测试结果
// drive!
// self driving
// brake!
// start charging