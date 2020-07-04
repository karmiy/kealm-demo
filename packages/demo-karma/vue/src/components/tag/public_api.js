import Tag from './Tag';
import CheckableTag from './CheckableTag';
import TagGroup from './TagGroup';

Tag.CheckableTag = CheckableTag;
Tag.TagGroup = TagGroup;

/* istanbul ignore next */
Tag.install = function(Vue) {
  Vue.component(Tag.name, Tag);
  Vue.component(Tag.CheckableTag.name, Tag.CheckableTag);
  Vue.component(Tag.TagGroup.name, Tag.TagGroup);
};

export default Tag;
