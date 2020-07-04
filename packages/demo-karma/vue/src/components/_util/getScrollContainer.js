import DomComputedStyle from './Dom/getComputedStyle';
/**
 * 获取滚动容器列表
 * @param target 目标元素
 */
const getScrollContainerList = (target) => {
  const list = [];

  if (target) {
    let parent = target.parentElement;
    while(parent) {
      if (isScrollContainer(parent)) {
        list.push(parent);
      }
      parent = parent.parentElement;
    }
  }
  return list;
}

/**
 * 判断是否是滚动容器
 * @param target 目标元素
 */
export const isScrollContainer = (target) => {
  if (!target) {
    return false;
  }
  const overflowY = DomComputedStyle(target).overflowY;
  return (overflowY === 'auto' || overflowY === 'scroll') && (target.scrollHeight > target.clientHeight);
}

export default getScrollContainerList;