import PropTypes from '../_util/vue-types';
import BaseMixin from '../_util/BaseMixin';

export default {
  name: 'SlTagGroup',
  mixins: [BaseMixin],
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    mode: {
      default: 'checkbox',
      type: String,
    },
    value: [String, Array],
    onChange: PropTypes.func,
  },
  methods: {
    change(checked, key) {
      const { value, mode } = this.$props;
      let emitValue;
      if(mode === 'checkbox') {
        emitValue = checked ? (!value.includes(key) && [...value, key]) : (value.includes(key) && value.filter(item => item !== key));
      }
      if(mode === 'radio') {
        emitValue = checked ? key : '';
      }
      this.$emit('change', emitValue);
    }
  },

  render() {
    const { value, mode } = this.$props;
    this.$slots.checkableTag.forEach(checkableTag => {
      // 修改checked和onchange，受group控制
      mode === 'checkbox' && value.includes(checkableTag.key) && (checkableTag.componentOptions.propsData.checked = true);
      mode === 'radio' && value === checkableTag.key && (checkableTag.componentOptions.propsData.checked = true);
      !checkableTag.componentOptions.listeners && (checkableTag.componentOptions.listeners = {});
      checkableTag.componentOptions.listeners.change = (checked) => {
        this.change(checked, checkableTag.key);
      }
    })
    return (
      <div>
        {this.$slots.checkableTag}
      </div>
    );
  },
};
