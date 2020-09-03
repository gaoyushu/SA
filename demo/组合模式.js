// 组合模式 Composite mode
// 表示部分-整体层次结构 忽略组合对象与单个对象的不同 相同使用
// 抽象组件类 叶子节点 组件集合类

// 抽象组件类
const Component = function(name){
    this.name = name;
}
Component.prototype.add = function(){
    throw new Error('you shoule rewrite this'); // 需要重写方法
}
Component.prototype.scan = function(){
    throw new Error('you shoule rewrite this'); // 需要重写方法
}

// 组件集合类
const Folder = function (folder) {
    Component.apply(this);
    this.folder = folder;
    this.lists = []; // 需要有list做容器
}
Folder.prototype = new Component(this.folder); // 继承抽象组件类
Folder.prototype.add = function (resource) {
    this.lists.push(resource); // 有add则添加到list中
}
Folder.prototype.scan = function () { // 扫描文件夹需要遍历
    console.log('scan to a folder：', this.folder)
    for (let i = 0, folder; folder = this.lists[i++];) {
        folder.scan()
    }
}

// 叶子节点
const File = function (file) {
    Component.apply(this);
    this.file = file;
}
File.prototype = new Component(this.file); // 继承抽象组件类
File.prototype.add = function () {
    throw Error('cannot add a child to a leaf node'); // 叶子节点不能有孩子
}
File.prototype.scan = function () {
    console.log('scan to a file：', this.file)
}

// 测试
// 文件结构
// └─folder
//   ├─file1
//   └─folder1
//      └─file2
//      └─file3
// 预想结果
// folder->file1->folder1->file2->file3
const folder = new Folder('folder');
const folder1 = new Folder('folder1');
const file1 = new File('file1');
const file2 = new File('file2');
const file3 = new File('file3');

folder1.add(file2);
folder1.add(file3);
folder.add(file1);
folder.add(folder1);

folder.scan();

// 测试结果
// scan to a folder： folder
// scan to a file： file1
// scan to a folder： folder1
// scan to a file： file2
// scan to a file： file3