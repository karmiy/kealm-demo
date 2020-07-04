export function slDecorator(Vue) {
  return Vue.directive('decorator', {});
}

export default {
  // just for tag
  install: Vue => {
    slDecorator(Vue);
  },
};
