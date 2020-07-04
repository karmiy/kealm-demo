import Steps from './Steps';

/* istanbul ignore next */
Steps.install = function(Vue) {
    Vue.component(Steps.name, Steps);
    Vue.component(Steps.Step.name, Steps.Step);
};

export default Steps;