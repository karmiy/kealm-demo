const shallowEqual = require('shallowequal');

function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}
const ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },
};

module.exports = ReactComponentWithPureRenderMixin;