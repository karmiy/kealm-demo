import PropTypes from '../_util/vue-types';
import { getComponentFromProp } from '../_util/props-util';

export default {
  name: 'SlCardMeta',
  props: {
    prefixCls: PropTypes.string.def('salus-card'),
    title: PropTypes.any,
    description: PropTypes.any,
    timeInfo: PropTypes.any,
    metaExtra: PropTypes.any,
  },
  render() {
    const { prefixCls = 'salus-card' } = this.$props;
    const classString = {
      [`${prefixCls}-meta`]: true,
    };

    const avatar = getComponentFromProp(this, 'avatar');
    const title = getComponentFromProp(this, 'title');
    const description = getComponentFromProp(this, 'description');
    const timeInfo = getComponentFromProp(this, 'timeInfo');
    const metaExtra = getComponentFromProp(this, 'metaExtra');

    const avatarDom = avatar ? <div class={`${prefixCls}-meta-avatar`}>{avatar}</div> : null;
    const titleDom = title ? <div class={`${prefixCls}-meta-title`}>{title}</div> : null;
    const descriptionDom = description ? (
      <div class={`${prefixCls}-meta-description`}>{description}</div>
    ) : null;
    const timeInfoDom = timeInfo ? (
      <span class={`${prefixCls}-meta-time-info`}>{timeInfo}</span>
    ) : null;
    const metaExtraDom = metaExtra ? (
      <span class={`${prefixCls}-extra`}>{metaExtra}</span>
    ) : null;
    const MetaDetail =
      titleDom || descriptionDom || timeInfoDom ? (
        <div class={`${prefixCls}-meta-detail`}>
          {titleDom}
          {descriptionDom}
          {timeInfoDom}
          {metaExtraDom}
        </div>
      ) : null;
    return (
      <div {...{ on: this.$listeners }} class={classString}>
        {avatarDom}
        {MetaDetail}
      </div>
    );
  },
};
