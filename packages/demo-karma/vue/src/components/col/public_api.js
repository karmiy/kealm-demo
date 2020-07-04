import { Col } from '../grid/public_api';
/* istanbul ignore next */
Col.install = function(Vue) {
    Vue.component(Col.name, Col);
};

export default Col;