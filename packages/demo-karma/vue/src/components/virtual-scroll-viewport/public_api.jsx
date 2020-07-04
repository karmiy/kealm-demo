import PropTypes from "../_util/vue-types";
const virtualScrollViewportProps = {
  listData: PropTypes.array, // 渲染列表
  itemSize: PropTypes.number, // 每一项的高度
  scrollTarget: PropTypes.object, // 滚动目标
  renderCount: PropTypes.number, // 渲染显示出来的条数
}

export default {
  name: 'SlVirtualScrollViewport',
  props: initDefaultProps(virtualScrollViewportProps, {
    renderCount: 10,
  }),
  data() {
    return {
      _headerSize: 0, // 头部高度
      _start: 0, // 开始位置
      totalSize: 0, // 总高度
      scrollTop: 0, // 滚动高度
      updateRenderNodeNum: 2, // 更新渲染节点
    }
  },
  computed: {
    /**
     * 真实总高度：列表总高 + 头部高
     */
    realTotalSize() {
      return this.totalSize + this._headerSize;
    },

    /**
     * 渲染头部高度，不知干嘛的
     */
    renderHeaderSize() {
      return this.itemSize * 2;
    },

    /**
     * 计算用来撑开容器的translate高度
     */
    translate() {
      if (this._start < this.updateRenderNodeNum) {
        return 0;
      }
      const maxScrollTop = this.realTotalSize - this.itemSize * this.renderCount;
      if (this.scrollTop > maxScrollTop) {
        return maxScrollTop;
      }

      return (this._start - this.updateRenderNodeNum) * this.itemSize;
    },
  },
  mounted() {
    const { listData, itemSize } = this.$props;
    // 校验必填参数
    if (!listData || !itemSize) {
      throw new Error(`'listData' or 'itemSize' cannot be empty!`);
    }
  },
  methods: {
  },
  render() {

  },
};
