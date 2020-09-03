// 迭代器模式 iterator mode
// 提供一种方法 顺序访问一个聚合对象中的各个元素 而又不用暴露内部表示
// 把迭代的过程从业务逻辑中分离出来

// 集合
class Container {
    constructor(list) {
        this.list = list
    }
    getIterator() {
        return new Iterator(this) // 把迭代的过程从业务逻辑中分离出来
    }
}

// 迭代器
class Iterator {
    constructor(conatiner) {
        this.list = conatiner.list // 集合元素
        this.index = 0 // 当前索引
    }
    next() { // 返回当前元素后当前索引+1
        if (this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }
    hasNext() { // 判断还有没有元素
        if (this.index >= this.list.length) {
            return false
        }
        return true
    }
}

// 测试代码
let container = new Container([1, 2, 3, 4, 5])
let iterator = container.getIterator()
while(iterator.hasNext()) {
    console.log(iterator.next())
}

// 测试结果
// 1
// 2
// 3
// 4
// 5