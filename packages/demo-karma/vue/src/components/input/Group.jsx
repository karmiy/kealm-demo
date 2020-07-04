import {filterEmpty} from '../_util/props-util';

export default {
    name: 'SlInputGroup',
    props: {
        prefixCls: {
            default: 'salus-input-group',
            type: String,
        },
        size: {
            validator(value) {
                return ['small', 'large', 'default'].includes(value);
            },
        },
        compact: Boolean,
    },
    computed: {
        classes() {
            const {prefixCls, size, compact = false} = this;
            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-lg`]: size === 'large',
                [`${prefixCls}-sm`]: size === 'small',
                [`${prefixCls}-compact`]: compact,
            };
        },
    },
    methods: {},
    render() {
        const {$listeners, prefixCls} = this;
        return (
            <span class={this.classes} {...{on: $listeners}}>
                <div class={`${prefixCls}-inner-container`}>
                  {filterEmpty(this.$slots.default)}
                </div>
            </span>
        );
    },
};
