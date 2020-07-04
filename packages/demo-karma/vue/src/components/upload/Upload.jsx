import classNames from 'classnames';
import uniqBy from 'lodash-es/uniqBy';
import VcUpload from '../vc-upload/public_api';
import BaseMixin from '../_util/BaseMixin';
import { getOptionProps, initDefaultProps, hasProp } from '../_util/props-util';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import Dragger from './Dragger';
import UploadList from './UploadList';
import { UploadProps } from './interface';
import { T, fileToObject, genPercentAdd, getFileItem, removeFileItem } from './utils';

export { UploadProps };

export default {
  inheritAttrs: false,
  name: 'SlUpload',
  Dragger: Dragger,
  mixins: [BaseMixin],
  props: initDefaultProps(UploadProps, {
    prefixCls: 'salus-upload',
    type: 'select',
    multiple: false,
    action: '',
    data: {},
    accept: '',
    beforeUpload: T,
    showUploadList: true,
    listType: 'text', // or pictrue
    disabled: false,
    supportServerRender: true,
    position: 'bottom',
  }),
  // recentUploadStatus: boolean | PromiseLike<any>;
  data() {
    this.progressTimer = null;
    return {
      sFileList: this.fileList || this.defaultFileList || [],
      dragState: 'drop',
    };
  },
  beforeDestroy() {
    this.clearProgressTimer();
  },
  watch: {
    fileList(val) {
      this.sFileList = val;
    },
  },
  methods: {
    onStart(file) {
      const targetItem = fileToObject(file);
      targetItem.status = 'uploading';
      const nextFileList = this.sFileList.concat();
      const fileIndex = nextFileList.findIndex(({ uid }) => uid === targetItem.uid);
      if (fileIndex === -1) {
        nextFileList.push(targetItem);
      } else {
        nextFileList[fileIndex] = targetItem;
      }
      this.onChange({
        file: targetItem,
        fileList: nextFileList,
      });
      // fix ie progress
      if (!window.FormData) {
        this.autoUpdateProgress(0, targetItem);
      }
    },
    autoUpdateProgress(_, file) {
      const getPercent = genPercentAdd();
      let curPercent = 0;
      this.clearProgressTimer();
      this.progressTimer = setInterval(() => {
        curPercent = getPercent(curPercent);
        this.onProgress(
          {
            percent: curPercent * 100,
          },
          file,
        );
      }, 200);
    },
    onSuccess(response, file) {
      this.clearProgressTimer();
      try {
        if (typeof response === 'string') {
          response = JSON.parse(response);
        }
      } catch (e) {
        /* do nothing */
      }
      const fileList = this.sFileList;
      const targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.status = 'done';
      targetItem.response = response;
      this.onChange({
        file: { ...targetItem },
        fileList,
      });
    },
    onProgress(e, file) {
      const fileList = this.sFileList;
      const targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.percent = e.percent;
      this.onChange({
        event: e,
        file: { ...targetItem },
        fileList: this.sFileList,
      });
    },
    onError(error, response, file) {
      this.clearProgressTimer();
      const fileList = this.sFileList;
      const targetItem = getFileItem(file, fileList);
      // removed
      if (!targetItem) {
        return;
      }
      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';
      this.onChange({
        file: { ...targetItem },
        fileList,
      });
    },
    handleRemove(file) {
      const { remove } = getOptionProps(this);
      Promise.resolve(typeof remove === 'function' ? remove(file) : remove).then(ret => {
        // Prevent removing file
        if (ret === false) {
          return;
        }

        const removedFileList = removeFileItem(file, this.sFileList);
        if (removedFileList) {
          this.onChange({
            file,
            fileList: removedFileList,
          });
        }
      });
    },
    handleManualRemove(file) {
      this.$refs.uploadRef.abort(file);
      file.status = 'removed'; // eslint-disable-line
      this.handleRemove(file);
    },
    onChange(info) {
      if (!hasProp(this, 'fileList')) {
        this.setState({ sFileList: info.fileList });
      }
      this.$emit('change', info);
    },
    onFileDrop(e) {
      this.setState({
        dragState: e.type,
      });
    },
    reBeforeUpload(file, fileList) {
      if (!this.beforeUpload) {
        return true;
      }
      const result = this.beforeUpload(file, fileList);
      if (result === false) {
        this.onChange({
          file,
          fileList: uniqBy(this.sFileList.concat(fileList.map(fileToObject)), item => item.uid),
        });
        return false;
      } else if (result && result.then) {
        return result;
      }
      return true;
    },
    clearProgressTimer() {
      clearInterval(this.progressTimer);
    },
    /**
     * 重传
     */
    reUpload(file) {
      this.$refs.uploadRef.$refs.uploaderRef.upload(file, this.sFileList);
    },
    /**
     * 续传
     */
    resume(file) {
      this.$emit('resume', file)
    },
    renderUploadList(locale) {
      const { prefixCls = '', showUploadList = {}, listType, position, reUploadButtonVisible, resumeButtonVisible } = getOptionProps(this);
      const { showRemoveIcon, showPreviewIcon } = showUploadList;
      const uploadListProps = {
        props: {
          listType,
          items: this.sFileList,
          showRemoveIcon,
          showPreviewIcon,
          locale: { ...locale, ...this.$props.locale },
          reUploadButtonVisible,
          resumeButtonVisible,
        },
        on: {
          remove: this.handleManualRemove,
          reUpload: this.reUpload,
          resume: this.resume,
        },
      };
      if (this.$listeners.preview) {
        uploadListProps.on.preview = this.$listeners.preview;
      }
      const containerStyle = {
        marginBottom: listType === 'text' && position === 'top' && this.sFileList.length !== 0 ? '18px' : '0'
      }
      return (
        <div class={`${prefixCls}-list-container`} style={containerStyle}>
          <UploadList {...uploadListProps} />
        </div>
      );
    },
  },
  render() {
    const { prefixCls = '', showUploadList, listType, type, disabled, position } = getOptionProps(this);

    const vcUploadProps = {
      props: {
        ...this.$props,
        beforeUpload: this.reBeforeUpload,
      },
      on: {
        // ...this.$listeners,
        start: this.onStart,
        error: this.onError,
        progress: this.onProgress,
        success: this.onSuccess,
      },
      ref: 'uploadRef',
      class: `${prefixCls}-btn`,
      attrs: this.$attrs,
    };

    const uploadList = showUploadList ? (
      <LocaleReceiver
        componentName="Upload"
        defaultLocale={defaultLocale.Upload}
        scopedSlots={{ default: this.renderUploadList }}
      />
    ) : null;

    const children = this.$slots.default;

    if (type === 'drag') {
      const dragCls = classNames(prefixCls, {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: this.sFileList.some(file => file.status === 'uploading'),
        [`${prefixCls}-drag-hover`]: this.dragState === 'dragover',
        [`${prefixCls}-disabled`]: disabled,
      });
      return (
        <span>
          <div
            class={dragCls}
            onDrop={this.onFileDrop}
            onDragover={this.onFileDrop}
            onDragleave={this.onFileDrop}
          >
            <VcUpload {...vcUploadProps}>
              <div class={`${prefixCls}-drag-container`}>{children}</div>
            </VcUpload>
          </div>
          {uploadList}
        </span>
      );
    }

    const uploadButtonCls = classNames(prefixCls, {
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${listType}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    });
    const uploadButton = (
      <div class={uploadButtonCls} style={{ display: children ? '' : 'none' }}>
        <VcUpload {...vcUploadProps}>{children}</VcUpload>
      </div>
    );

    if (listType === 'picture-card') {
      return (
        <span>
          {uploadList}
          {uploadButton}
        </span>
      );
    }
    return position === 'top' ? (
      <span>
        {uploadList}
        {uploadButton}
      </span>
    ) : (
      <span>
        {uploadButton}
        {uploadList}
      </span>
    )
    return (
      <span>
        {uploadButton}
        {uploadList}
      </span>
    );
  },
};
