//事件兼容
//=======================================
//添加事件监听
const addEvent = (node, type, handler) => {
    if (!node) return false;
    if (node.addEventListener) {
        node.addEventListener(type, handler, false);
        return true;
    } else if (node.attachEvent) {
        node['e' + type + handler] = handler;
        node[type + handler] = function () {
            node['e' + type + handler](window.event);
        };
        node.attachEvent('on' + type, node[type + handler]);
        return true;
    }
    return false;
};
//去除事件监听
const removeEvent = (node, type, handler) => {
    if (!node) return false;
    if (node.removeEventListener) {
        node.removeEventListener(type, handler, false);
        return true;
    } else if (node.detachEvent) {
        node.detachEvent('on' + type, node[type + handler]);
        node[type + handler] = null;
    }
    return false;
};
//得到事件对象
const getEvent = (e) => {
    return e || window.event;
}
//得到事件的目标元素
const getTarget = (e) => {
    return e.target || e.srcElement;
};
//停止事件传播（取消事件的进一步捕获或者冒泡）
const stopPropagation = (e) => {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else if (e.cancelBubble) {
        e.cancelBubble = true;
    }
};
//取消默认事件
const preventDefault = (e) => {
    if (e.preventDefault) {
        e.preventDefault();
    } else if (e.returnValue) {
        e.returnValue = false;
    }
}