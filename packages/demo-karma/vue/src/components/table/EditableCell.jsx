import PropTypes from '../_util/vue-types';
import Input from '../input/public_api';

const EditableCell = {
  name: 'SlEditableCell',
  props: {
      text: PropTypes.string
  },
  data() {
    return {
      value: this.text,
      editable: false,
    }
  },
  methods: {
    handleChange (e) {
      const value = e.target.value;
      this.value = value;
    },
    check () {
      this.editable = false;
      this.$emit('change', this.value);
    },
    edit () {
      this.editable = true;
    },
  },
  render() {
    const wrapper = this.editable ? (
      <div class="editable-cell-input-wrapper">
        <Input value={this.value} onChange={this.handleChange} onPressEnter={this.check} />
        <i class="salus-icon-check-o" onClick={this.check}></i>
      </div>
    )
    :
    (
      <div class="editable-cell-text-wrapper">
        {this.value || ' '}
        <i class="salus-icon-edit-o" onClick={this.edit}></i>
      </div>
    );
    return (
      <div class="editable-cell">
        {wrapper}
      </div>
    )
  },
};

export default EditableCell;
