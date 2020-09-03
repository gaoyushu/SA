// 外观模式 facade mode
// 为子系统中的一组接口提供一个一致的界面 尽量少的与子系统内部组件交互
// 三个角色 目标类 外观类 客户端类
// 代码场景：解决部分浏览器兼容问题

// 外观模式&适配器模式
// 适配器模式是将一个对象包装起来以改变其接口，而外观模式是将一群对象包装起来以简化其接口。
// 适配器是将接口转换为不同接口，而外观模式是提供一个统一的接口来简化接口。

// 目标类
// 问题：获取事件对象
const getEvent = function(event) {
  return event || window.event; // IE下window.event
};
// 问题：获取事件元素
const getTarget = function(event) {
  const event = getEvent(event);
  return event.target || event.srcElement; // IE下event.srcElement
};
// 问题：阻止默认事件
const preventDefault = function(event) {
  const event = getEvent(event);
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  } // IE下
};
// 问题：冒泡事件
const cancelBubble = function(event) {
  const event = getEvent(event);
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  } // IE下
};

// 外观类
// 封装子系统的这组接口 放在事件里 用户交互时可以解决兼容问题
document.onclick = function(e) {
  preventDefault(e);
  if (getTarget(e) !== document.getElementById("myinput")) {
    console.log("facade mode");
  }
};

// 客户端类
// 在IE浏览器下 可以解决兼容问题
// 点击某个元素时 不会因IE的不兼容 而无法正常显示