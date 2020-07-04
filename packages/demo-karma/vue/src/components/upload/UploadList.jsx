import BaseMixin from '../_util/BaseMixin';
import { getOptionProps, initDefaultProps } from '../_util/props-util';
import getTransitionProps from '../_util/getTransitionProps';
import Tooltip from '../tooltip/public_api';
import Progress from '../progress/public_api';
import classNames from 'classnames';
import { UploadListProps } from './interface';

const imageTypes = ['image', 'webp', 'png', 'svg', 'gif', 'jpg', 'jpeg', 'bmp'];
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
const previewFile = (file, callback) => {
  if (file.type && !imageTypes.includes(file.type)) {
    callback('');
  }
  const reader = new window.FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
};

const extname = url => {
  if (!url) {
    return '';
  }
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};

const isImageUrl = file => {
  if (imageTypes.includes(file.type)) {
    return true;
  }
  const url = file.thumbUrl || file.url;
  const extension = extname(url);
  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)) {
    return true;
  } else if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  } else if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
};

export default {
  name: 'SlUploadList',
  mixins: [BaseMixin],
  props: initDefaultProps(UploadListProps, {
    listType: 'text', // or picture
    progressAttr: {
      strokeWidth: 2,
      showInfo: false,
    },
    prefixCls: 'salus-upload',
    showRemoveIcon: true,
    showPreviewIcon: true,
    isShowProgress: false,
  }),
  updated() {
    this.$nextTick(() => {
      if (this.listType !== 'picture' && this.listType !== 'picture-card') {
        return;
      }
      (this.items || []).forEach(file => {
        if (
          typeof document === 'undefined' ||
          typeof window === 'undefined' ||
          !window.FileReader ||
          !window.File ||
          !(file.originFileObj instanceof window.File) ||
          file.thumbUrl !== undefined
        ) {
          return;
        }
        /*eslint-disable */
        file.thumbUrl = '';
        /*eslint -enable */
        previewFile(file.originFileObj, previewDataUrl => {
          /*eslint-disable */
          file.thumbUrl = previewDataUrl;
          /*eslint -enable ktodo */
          // this.forceUpdate()
        });
      });
    });
  },
  methods: {
    handleClose(file) {
      this.$emit('remove', file);
    },
    handlePreview(file, e) {
      const { preview } = this.$listeners;
      if (!preview) {
        return;
      }
      e.preventDefault();
      return this.$emit('preview', file);
    },
  },
  render() {
    const {
      prefixCls,
      items = [],
      listType,
      showPreviewIcon,
      showRemoveIcon,
      locale,
      isShowProgress,
      reUploadButtonVisible,
      resumeButtonVisible,
    } = getOptionProps(this);
    const list = items.map(file => {
      let progress;
      // let icon = <Icon type={file.status === 'uploading' ? 'loading' : 'paper-clip'} />;
      // let icon = file.status === 'uploading' ? <i class="salus-icon-loading" /> : null;
      let icon = null;

      if (listType === 'picture' || listType === 'picture-card') {
        if(file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
          if(listType === 'picture-card') {
            icon = <div class={`${prefixCls}-list-item-uploading-text`}>{locale.uploading}</div>;
          }else {
            icon = <i class={`${prefixCls}-list-item-thumbnail`}></i>
          }
        }else {
          const thumbnail = <img src={file.thumbUrl || file.url} alt={file.name} />;
          icon = (
            <a
              class={`${prefixCls}-list-item-thumbnail`}
              onClick={e => this.handlePreview(file, e)}
              href={file.url || file.thumbUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {thumbnail}
            </a>
          );
        }
        /*if (listType === 'picture-card' && file.status === 'uploading') {
          icon = <div class={`${prefixCls}-list-item-uploading-text`}>{locale.uploading}</div>;
        } else if (!file.thumbUrl && !file.url) {
          icon = <i class="salus-icon-loading"/>;
        } else {
          const thumbnail = isImageUrl(file) ? (
            <img src={file.thumbUrl || file.url} alt={file.name} />
          ) : (
            <i class="salus-icon-loading"/>
          );
          icon = (
            <a
              class={`${prefixCls}-list-item-thumbnail`}
              onClick={e => this.handlePreview(file, e)}
              href={file.url || file.thumbUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {thumbnail}
            </a>
          );
        }*/
      }

      // 显示文件上传状态
      if (file.status === 'uploading' && isShowProgress) {
        const progressProps = {
          props: {
            ...this.progressAttr,
            type: 'line',
            percent: file.percent,
          },
        };
        // show loading icon if upload progress listener is disabled
        const loadingProgress = 'percent' in file ? <Progress {...progressProps} /> : null;

        progress = (
          <div class={`${prefixCls}-list-item-progress`} key="progress">
            {loadingProgress}
          </div>
        );
      }
      const infoUploadingClass = classNames({
        [`${prefixCls}-list-item`]: true,
        [`${prefixCls}-list-item-${file.status}`]: true,
      });
      const linkProps =
        typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
      const preview = file.url ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          class={`${prefixCls}-list-item-name`}
          title={file.name}
          {...linkProps}
          href={file.thumbUrl || file.url}
          onClick={e => this.handlePreview(file, e)}
        >
          {file.name}
        </a>
      ) : (
        <span
          class={`${prefixCls}-list-item-name`}
          onClick={e => this.handlePreview(file, e)}
          title={file.name}
        >
          {file.name}
        </span>
      );
      const style =
        file.url || file.thumbUrl
          ? undefined
          : {
              pointerEvents: 'none',
              opacity: 0.5,
            };
      const previewIcon = showPreviewIcon ? (
        <a
          href={file.url || file.thumbUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={style}
          onClick={e => this.handlePreview(file, e)}
          title={locale.previewFile}
        >
          <i class="salus-icon-clear-text-o" />
        </a>
      ) : null;
      const iconProps = {
        props: {
          type: 'delete',
          title: locale.removeFile,
        },
        on: {
          click: () => {
            this.handleClose(file);
          },
        },
      };
      const iconProps1 = { ...iconProps, ...{ props: { type: 'close' } } };
      const removeIcon = showRemoveIcon ? <i class="salus-icon-delete-o" onClick={() => {this.handleClose(file)}} title={locale.removeFile} /> : null;
      /*const removeIconClose = showRemoveIcon ? (
        <div class={`${prefixCls}-list-item-done-remove`}>
          <a href="javascript:;" title='删除文件' onClick={() => {this.handleClose(file)}}>删除</a>
        </div>
      ) : null;*/
      const removeIconClose = showRemoveIcon && listType !== 'text' ? (<i class="salus-icon-pop-close-o" onClick={() => {this.handleClose(file)}} title={locale.removeFile}></i>) : null;
      // 显示图片上传卡片hover过的操作按钮
      const actions =
        listType === 'picture-card' && file.status !== 'uploading' ? (
          <span class={`${prefixCls}-list-item-actions`}>
            {previewIcon}
            {removeIcon}
          </span>
        ) : (
          removeIconClose
        );
      let message;
      if (file.response && typeof file.response === 'string') {
        message = file.response;
      } else {
        message = (file.error && file.error.statusText) || locale.uploadError;
      }
      const iconAndPreview =
        file.status === 'error' ? (
          <Tooltip title={message}>
            {icon}
            {preview}
          </Tooltip>
        ) : (
          <span>
            {icon}
            {preview}
          </span>
        );
      // 上传状态
      const uploadStatus = (file.status === 'uploading' && (listType !== 'picture' && listType !== 'picture-card'))
        ? (
          <div class={`${prefixCls}-list-item-status`}>
            <span>上传中</span>
            <i class="salus-icon-loading salus-icon-loading-gray"></i>
          </div>
        ) : null;
      // 显示文件删除、续传、重传按钮
      const deleteGroups = ((file.status === 'done' || file.status === 'error' || !file.status) && (listType !== 'picture' && listType !== 'picture-card'))
        ? (
          <div class={`${prefixCls}-list-item-done-remove`}>
            <a href="javascript:;"
               onClick={() => {this.handleClose(file)}}
                title={ locale.removeFile }>删除</a>
            {file.status === 'error' && resumeButtonVisible ?
              <a href="javascript:;"
                 title={ locale.resumeFile }
                 onClick={() => {
                   file.status = 'uploading';
                   this.$emit('resume', file);
                 }}
              >续传</a>
              :
              null
            }
            {file.status === 'error' && reUploadButtonVisible ?
              <a href="javascript:;"
                 title={ locale.reUploadFile }
                 onClick={() => { this.$emit('reUpload', file) }}
              >重传</a>
              :
              null
            }
          </div>
        ) : null;
      const transitionProps = getTransitionProps('fade');
      return (
        <div class={infoUploadingClass} key={file.uid}>
          <div class={`${prefixCls}-list-item-info`}>{iconAndPreview}</div>
          {actions}
          <transition {...transitionProps}>{progress}</transition>
          {uploadStatus}
          {deleteGroups}
        </div>
      );
    });
    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${listType}`]: true,
    });
    const animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
    const transitionGroupProps = getTransitionProps(`${prefixCls}-${animationDirection}`);
    return (
      <transition-group {...transitionGroupProps} tag="div" class={listClassNames}>
        {list}
      </transition-group>
    );
  },
};
