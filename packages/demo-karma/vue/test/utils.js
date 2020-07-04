import Vue from 'vue';
import Salus from 'src/public_api';

Vue.use(Salus);

let id = 0;

const createEl = () => {
    const el = document.createElement('div');

    el.id = 'app' + ++id;
    document.body.appendChild(el);

    return el;
}

/**
 * 回收 vm
 * @param { Object } vm
 */
export const destroyVM = vm => {
    vm.$destroy && vm.$destroy();
    vm.$el &&
    vm.$el.parentNode &&
    vm.$el.parentNode.removeChild(vm.$el);
}

/**
 * 创建一个 Vue 的实例对象
 * @param  { Object|String }  Compo   组件配置，可直接传 template
 * @param  { Boolean = false } mounted 是否添加到 DOM 上
 * @return { Object } vm
 */
export const createVue = (Compo, mounted = false) => {
    if (Object.prototype.toString.call(Compo) === '[object String]') {
        Compo = { template: Compo };
    }
    return new Vue(Compo).$mount(mounted === false ? null : createEl());
}

/**
 * 创建一个测试组件实例
 * @link http://vuejs.org/guide/unit-testing.html#Writing-Testable-Components
 * @param  {Object}  Compo          - 组件对象
 * @param  {Object}  propsData      - props 数据
 * @param  {Boolean=false} mounted  - 是否添加到 DOM 上
 * @return {Object} vm
 */
export const createTest = (Compo, propsData = {}, mounted = false) => {
    if (propsData === true || propsData === false) {
      mounted = propsData;
      propsData = {};
    }
    const elm = createEl();
    const Ctor = Vue.extend(Compo);
    return new Ctor({ propsData }).$mount(mounted === false ? null : elm);
};

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {Element} elm
 * @param  {String} name
 * @param  {*} opts
 */
export const triggerEvent = function(elm, name, ...opts) {
    let eventName;
  
    if (/^mouse|click/.test(name)) {
      eventName = 'MouseEvents';
    } else if (/^key/.test(name)) {
      eventName = 'KeyboardEvent';
    } else {
      eventName = 'HTMLEvents';
    }
    const evt = document.createEvent(eventName);
  
    evt.initEvent(name, ...opts);
    elm.dispatchEvent
      ? elm.dispatchEvent(evt)
      : elm.fireEvent('on' + name, evt);
  
    return elm;
};

/**
 * 触发 “mouseup” 和 “mousedown” 事件
 * @param {Element} elm
 * @param {*} opts
 */
export const triggerClick = function(elm, ...opts) {
    triggerEvent(elm, 'mousedown', ...opts);
    triggerEvent(elm, 'mouseup', ...opts);
  
    return elm;
};

/**
 * 触发 keydown 事件
 * @param {Element} elm
 * @param {keyCode} int
 */
export const triggerKeyDown = function(el, keyCode) {
    const evt = document.createEvent('Events');
    evt.initEvent('keydown', true, true);
    evt.keyCode = keyCode;
    el.dispatchEvent(evt);
};

/**
 * 过渡一个nextTick，用于vue进行重赋值，DOM重新渲染，await promiseNextTick
 * @param {VueInstance} vm
 * @param {String} type: nextTick/timeout（default: nextTick）
 * @param {Number} delay（default: 0）
 */
export const promiseNextTick = (vm, type = 'nextTick', delay = 0) => {
    return new Promise(resolve => {
        type === "nextTick" ?
            vm.$nextTick(() => {
                resolve();
            })
            :
            setTimeout(() => {
                resolve();
            },delay);
    })
};

/**
 * 循环每一个promise callback，用于await promiseEach，不支持同时异步调用2个promiseEach
 * @param {Collection} collection
 * @param {Function} callback: () => Promise
 */
export const promiseEach = (collection, callback, ...rest) => {
    const [index = 0, list = []] = rest;
    if(index === 0 && list.length)
        return;
    if(index === collection.length) {
        return Promise.resolve(list);
    }else {
        return callback(collection[index], index).then(data => {
            list.push(data);
            return promiseEach(collection, callback,index + 1, list);
        });
    }
};