import classNames from 'classnames';
import Dialog from './Modal';
import ActionButton from './ActionButton';
import {getConfirmLocale} from './locale';

export default {
    functional: true,
    render(h, context) {
        const {props} = context;
        const {
            onCancel,
            onOk,
            close,
            zIndex,
            afterClose,
            visible,
            keyboard,
            centered,
            getContainer,
            maskStyle,
            okButtonProps,
            cancelButtonProps
        } = props;
        let icon;
        switch (props.type) {
            case 'info' :
                icon = 'form-msg';
                break;
            case 'success':
                icon = 'success';
                break;
            case 'error':
                icon = 'error-msg';
                break;
            case 'warning':
            default:
                icon = 'sign-mark';
                break;
        }
        const iconType = `salus-icon-${icon}`;
        const okType = props.okType || 'primary';
        const prefixCls = props.prefixCls || 'salus-modal';
        const contentPrefixCls = 'salus-confirm';
        // 默认为 true，保持向下兼容
        const okCancel = 'okCancel' in props ? props.okCancel : true;
        const width = props.width || 470;
        const style = props.style || {};
        // 默认为 false，保持旧版默认行为
        const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
        const runtimeLocale = getConfirmLocale();
        const okText = props.okText || (okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
        const cancelText = props.cancelText || runtimeLocale.cancelText;
        const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';

        const classString = classNames(
            contentPrefixCls,
            `${contentPrefixCls}-${props.type}`,
            props.class,
        );
        let cancelNode = props.type === 'confirm' && (
            <ActionButton
                actionFn={onCancel}
                closeModal={close}
                autoFocus={autoFocusButton === 'cancel'}
                buttonProps={cancelButtonProps}
            >
                {cancelText}
            </ActionButton>
        );
        let okNode = (
            <ActionButton type={okType} actionFn={onOk}
                          closeModal={close} autoFocus={autoFocusButton === 'ok'}
                          buttonProps={okButtonProps}>
                {okText}
            </ActionButton>
        )
        let tempFooter = (
            <div>
                {okNode}
                {cancelNode}
            </div>
        );
        let isConfirm = props.type === 'confirm';
        return (
            <Dialog
                prefixCls={prefixCls}
                class={classString}
                wrapClassName={classNames({[`${contentPrefixCls}-centered`]: !!centered})}
                onCancel={e => close({triggerCancel: true}, e)}
                visible={visible}
                transitionName="zoom"
                maskTransitionName="fade"
                maskClosable={maskClosable}
                maskStyle={maskStyle}
                style={style}
                width={width}
                zIndex={zIndex}
                afterClose={afterClose}
                keyboard={keyboard}
                centered={centered}
                getContainer={getContainer}
                footer={tempFooter}
                isConfirm={isConfirm}
            >
                <div class={`${contentPrefixCls}-body-wrapper`}>
                    <div class={`${contentPrefixCls}-body`}>
                        <i class={iconType}/>
                        <span class={`${contentPrefixCls}-title`}>{props.title}</span>
                        <div class={`${contentPrefixCls}-content`}>{props.content}</div>
                    </div>
                </div>
            </Dialog>
        );
    },
};
