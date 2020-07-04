import PropTypes from '../_util/vue-types';
import { initDefaultProps, getOptionProps } from '../_util/props-util';
import VcSteps from '../vc-steps/public_api';
// import Icon from '../icon';

const getStepsProps = (defaultProps = {}) => {
    const props = {
        prefixCls: PropTypes.string,
        iconPrefix: PropTypes.string,
        current: PropTypes.number,
        initial: PropTypes.number,
        labelPlacement: PropTypes.oneOf(['horizontal', 'vertical']).def('vertical'),
        status: PropTypes.oneOf(['wait', 'process', 'finish', 'error']),
        size: PropTypes.oneOf(['default', 'small']),
        direction: PropTypes.oneOf(['horizontal', 'vertical']),
        progressDot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    };
    return initDefaultProps(props, defaultProps);
};

export default {
    name: 'SlSteps',
    props: getStepsProps({
        prefixCls: 'salus-steps',
        iconPrefix: 'salus',
        current: 0,
    }),
    Step: { ...VcSteps.Step, name: 'SlStep' },
    render() {
        const props = getOptionProps(this);
        // const { prefixCls } = props;
        const icons = {
            finish: 'salus-icon-check-o',
            error: 'salus-icon-pop-close-o'
        };
        const stepsProps = {
            props: {
                icons,
                ...props,
            },
            on: this.$listeners,
            scopedSlots: this.$scopedSlots,
        };
        return <VcSteps {...stepsProps}>{this.$slots.default}</VcSteps>;
    },
};