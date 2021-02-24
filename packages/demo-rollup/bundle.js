(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.myBundle = {}));
}(this, (function (exports) { 'use strict';

    function foo(id) {
        console.log(id);
    }

    exports.foo = foo;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
