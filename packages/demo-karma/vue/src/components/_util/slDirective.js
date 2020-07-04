import { slInput } from './slInputDirective';
import { slDecorator } from './FormDecoratorDirective';

export default {
  install: Vue => {
    slInput(Vue);
    slDecorator(Vue);
  },
};
