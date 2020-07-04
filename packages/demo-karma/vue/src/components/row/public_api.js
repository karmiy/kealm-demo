import { Row } from '../grid/public_api';

/* istanbul ignore next */
Row.install = function(Vue) {
    Vue.component(Row.name, Row);
};

export default Row;
