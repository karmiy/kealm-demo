import buttonTypes from './buttonTypes';
import {filterEmpty} from '../_util/props-util';

const props = buttonTypes();
export default {
    name: 'SlButton',
    inheritAttrs: false,
    __SL_BUTTON: true,
    props,
    data() {
        return {
            sLoading: !!this.loading,
        };
    },
    computed: {
        classes() {
            const {
                prefixCls,
                type,
                shape,
                size,
                sLoading,
                full,
                iconOnly,
                icon,
                // search,
                $slots,
            } = this;
            const children = filterEmpty($slots.default);
            return {
                [`${prefixCls}`]: true,
                [`${prefixCls}-${type}`]: type,
                [`${prefixCls}-${shape}`]: shape,
                [`${prefixCls}-${size}`]: size,
                /*[`${prefixCls}-icon`]: iconOnly,
                [`${prefixCls}-icon1`]: children !== 0 && icon,*/
                [`${prefixCls}-icon-only`]: children.length === 1 && icon,
                [`${prefixCls}-icon1`]: icon,
                [`${prefixCls}-loading`]: sLoading,
                [`${prefixCls}-full`]: full,
                // [`salus-input-search-button`]: search
            };
        },
    },
    watch: {
        loading(val) {
            clearTimeout(this.delayTimeout);
            if (typeof val !== 'boolean' && val && val.delay) {
                this.delayTimeout = setTimeout(() => {
                    this.sLoading = !!val;
                }, val.delay);
            } else {
                this.sLoading = !!val;
            }
        },
    },
    beforeDestroy() {
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }
    },
    methods: {
        handleClick(event) {
            const {sLoading} = this.$data;
            if (sLoading) {
                return;
            }
            this.$emit('click', event);
        },
        insertSpace(child, iconOnly) {
            if (typeof child.text === 'string') {
                let text = child.text.trim();
                if (iconOnly) {
                    return null;
                }
                return <span>{text}</span>;
            }
            return child;
        },
    },
    render() {
        const {
            htmlType,
            classes,
            iconOnly,
            disabled,
            handleClick,
            sLoading,
            $slots,
            $attrs,
            $listeners,
        } = this;
        const buttonProps = {
            attrs: {
                ...$attrs,
                disabled,
            },
            class: classes,
            on: {
                ...$listeners,
                click: handleClick,
            },
        };
        const children = filterEmpty($slots.default);
        const kids = children.map(child => this.insertSpace(child,iconOnly));
        const loading = <i class="salus-icon-loading salus-icon-loading-white"></i>;
        // if ($attrs.href !== undefined) {
        //     return (
        //         <a {...buttonProps} ref="buttonNode">
        //             {sLoading?loading:null}
        //             {kids}
        //         </a>
        //     );
        // } else {
            return (
                    <button {...buttonProps} ref="buttonNode" type={htmlType || 'button'}>
                        {sLoading?loading:null}
                        {kids}
                    </button>
            );
        // }
    },
};
