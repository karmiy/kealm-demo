export default {
  name: 'SlAvatar',
  props: {
    prefixCls: {
      type: String,
      default: 'salus-avatar',
    },
    shape: {
      validator: val => ['circle', 'square'].includes(val),
      default: 'circle',
    },
    size: {
      validator: val => {
        return typeof val === 'number' || ['small', 'large', 'default'].includes(val);
      },
      default: 'default',
    },
    src: String,
    /** Srcset of image avatar */
    srcSet: String,
    icon: String,
    alt: String,
    loadError: Function,
  },
  data() {
    return {
      isImgExist: true,
      scale: 1,
    };
  },
  mounted() {
    this.prevChildren = this.$slots.default;
    this.prevState = { ...this.$data };
    this.$nextTick(() => {
      this.setScale();
    });
  },
  updated() {
    if (
      this.preChildren !== this.$slots.default ||
      (this.prevState.scale !== this.$data.scale && this.$data.scale === 1) ||
      this.prevState.isImgExist !== this.$data.isImgExist
    ) {
      this.$nextTick(() => {
        this.setScale();
      });
    }
    this.preChildren = this.$slots.default;
    this.prevState = { ...this.$data };
  },
  methods: {
    setScale() {
      const childrenNode = this.$refs.avatarChildren;
      if (childrenNode) {
        const childrenWidth = childrenNode.offsetWidth;
        const avatarWidth = this.$el.getBoundingClientRect().width;
        if (avatarWidth - 8 < childrenWidth) {
          this.scale = (avatarWidth - 8) / childrenWidth;
        } else {
          this.scale = 1;
        }
        this.$forceUpdate();
      }
    },
    handleImgLoadError() {
      const { loadError } = this.$props;
      const errorFlag = loadError ? loadError() : undefined;
      if (errorFlag !== false) {
        this.isImgExist = false;
      }
    },
  },
  render() {
    const { prefixCls, shape, size, src, icon, alt, srcSet } = this.$props;

    const { isImgExist, scale } = this.$data;

    const sizeCls = {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    };

    const classString = {
      [prefixCls]: true,
      ...sizeCls,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: src && isImgExist,
      [`${prefixCls}-icon`]: icon,
    };

    const sizeStyle =
      typeof size === 'number'
        ? {
            width: `${size}px`,
            height: `${size}px`,
            lineHeight: `${size}px`,
            fontSize: icon ? `${size / 2}px` : '18px',
          }
        : {};

    let children = this.$slots.default;
    if (src && isImgExist) {
      children = <img src={src} srcSet={srcSet} onError={this.handleImgLoadError} alt={alt} />;
    } else if (icon) {
      children = <i class={icon} />;
    } else {
      const childrenNode = this.$refs.avatarChildren;
      if (childrenNode || (scale !== 1 && childrenNode)) {
        const transformString = `scale(${scale})`;
        const childrenStyle = {
          msTransform: transformString,
          WebkitTransform: transformString,
          transform: transformString,
          position : 'absolute',
          display  : 'inline-block',
          left     : `calc(50% - ${Math.round(childrenNode.offsetWidth / 2)}px)`
        };
        const sizeChildrenStyle =
          typeof size === 'number'
            ? {
                lineHeight: `${size}px`,
              }
            : {};
        children = (
          <span
            class={`${prefixCls}-string`}
            ref="avatarChildren"
            style={{ ...sizeChildrenStyle, ...childrenStyle }}
          >
            {children}
          </span>
        );
      } else {
        children = (
          <span class={`${prefixCls}-string`} ref="avatarChildren">
            {children}
          </span>
        );
      }
    }
    return (
      <span {...{ on: this.$listeners, class: classString, style: sizeStyle }}>{children}</span>
    );
  },
};
