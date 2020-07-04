import Notification from '../vc-notification/public_api';
/*import Icon from '../icon';*/

let defaultDuration = 3000;
let defaultTop;
let defaultPos = 'topRight'; // 新增默认位置
let defaultPauseOnHover = true; // 默认鼠标移入禁止自动移除
let defaultAnimate = true; // 默认动画
let defaultClosable = true; // 默认可关闭
let messageInstance;
let key = 1;
let prefixCls = 'salus-global-alert';
let transitionName = 'move-up';
let getContainer = () => document.body;
let maxCount;

function getMessageInstance(options, callback) {
  if (messageInstance) {
    // 位置改变要调整
    options.pos && (messageInstance.component.pos = options.pos);
    callback(messageInstance);
    return;
  }
  Notification.newInstance(
    {
      prefixCls,
      transitionName,
      style: {
        top: defaultTop,
        position: 'fixed',
        display: 'inline-block',
        zIndex: 1010,
      }, // 覆盖原来的样式
      getContainer,
      maxCount,
      options: {
        pos: options.pos || defaultPos,
        pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : defaultPauseOnHover,
        animate: options.animate !== undefined ? options.animate : defaultAnimate,
        //closable: options.closable !== undefined ? options.closable : defaultClosable,
      },
    },
    instance => {
      if (messageInstance) {
        callback(messageInstance);
        return;
      }
      messageInstance = instance;
      callback(instance);
    },
  );
}

// type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

function notice(args) {
  const duration = args.options.duration !== undefined ? args.options.duration : defaultDuration;
  const closable = args.options.closable !== undefined ? args.options.closable : defaultClosable;
  const iconType = {
    info: 'salus-icon-notification',
    success: 'salus-icon-success salus-color-success',
    error: 'salus-icon-error-msg salus-color-danger',
    warning: 'salus-icon-sign-mark salus-color-prompt-warning',
    loading: 'salus-icon-loading',
  }[args.type];

  const target = key++;
  const closePromise = new Promise(resolve => {
    const callback = () => {
      if (typeof args.onClose === 'function') {
        args.onClose();
      }
      return resolve(true);
    };
    getMessageInstance(args.options, instance => {
      instance.notice({
        key: target,
        duration,
        style: {},
        content: (h, closeInstance) => (
          <div
            class={prefixCls}
            style="pointer-events: all;display: inline-block"
          >
            {/* 有title */}
            {args.options.title && (
              <div class={{[`${prefixCls}-title-wrap`]: 1, [`${prefixCls}-center`]: args.options.centerContent}}>
                <div class={`${prefixCls}-title`}>
                  {args.options.centerContent && (
                    <div class={`${prefixCls}-title-icons`}>
                      <i class={iconType}/>
                    </div>
                  )}
                  {args.options.title}
                </div>
                <div class={`${prefixCls}-title-content`}>
                  {renderContent(h, args)}
                </div>
                {closable && closeInstance}
              </div>
            )}
            {/* 无title */}
            {!args.options.title && (
              [
                <i class={iconType}/>,
                renderContent(h, args),
                closable && closeInstance
              ]
            )}
          </div>
        ),
        onClose: callback,
      });
    });
  });
  const result = () => {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
  result.then = (filled, rejected) => closePromise.then(filled, rejected);
  result.promise = closePromise;
  return result;
}

/**
 * 渲染内容
 */
function renderContent(h, args) {
  let contents = typeof args.content === 'function' ? args.content(h) : args.content;
  return typeof contents === 'string' ? ` ${contents} ` : contents;
}

// type ConfigContent = React.ReactNode | string;
// type ConfigDuration = number | (() => void);
// export type ConfigOnClose = () => void;

// export interface ConfigOptions {
//   top?: number;
//   duration?: number;
//   prefixCls?: string;
//   getContainer?: () => HTMLElement;
//   transitionName?: string;
// }

const api = {
  open: notice,
  config(options) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      messageInstance = null; // delete messageInstance for new defaultTop
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.pauseOnHover !== undefined) {
      defaultPauseOnHover = options.pauseOnHover;
      messageInstance = null;
    }
    if (options.animate !== undefined) {
      defaultAnimate = options.animate;
      messageInstance = null;
    }
    if (options.closable !== undefined) {
      defaultClosable = options.closable;
      messageInstance = null;
    }
    if (options.prefixCls !== undefined) {
      prefixCls = options.prefixCls;
    }
    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }
    if (options.transitionName !== undefined) {
      transitionName = options.transitionName;
      messageInstance = null; // delete messageInstance for new transitionName
    }
    if (options.maxCount !== undefined) {
      maxCount = options.maxCount;
      messageInstance = null;
    }
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};

['success', 'info', 'warning', 'error', 'loading'].forEach(type => {
  api[type] = (content, options = {}, onClose) => { // duration改为options
    /*if (typeof duration === 'function') {
      onClose = duration;
      duration = undefined;
    }*/
    if(typeof options === 'function') {
      onClose = options;
      options = {};
    }
    return api.open({ content, options, type, onClose });
  };
});

api.warn = api.warning;

export default api;
