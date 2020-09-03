// 桥接模式 bridge mode
// 解决多维度变化
// 将抽象部分和实现部分分离 使他们都可以独立变化（对象组合方式）

// each函数并不关心fn里面的具体实现 fn里面的逻辑也不会被each函数的改写影响
// 经典应用：回调函数

var each = function (arr, fun) {
    for (var i = 0; i < arr.length; i++) {
        var val = arr[i];
        console.log('each ', arr[i]);
        if (fun.call(val, i, val, arr)) { // 实现部分
            return false;
        }
    }
};

var arr = [1, 2, 3, 4];
each(arr, function (i, v) {
    arr[i] = v * 2;
    console.log('fun ', arr[i]);
});

// 测试结果
// each  1
// fun  2
// each  2
// fun  4
// each  3
// fun  6
// each  4
// fun  8