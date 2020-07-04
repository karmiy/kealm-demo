import ref from 'vue-ref';
import ColorPicker from './color-picker';

/* istanbul ignore next */
ColorPicker.install = function(Vue) {
  Vue.component(ColorPicker.name, ColorPicker);
  Vue.use(ref, { name: 'sl-ref' });
};

export default ColorPicker;