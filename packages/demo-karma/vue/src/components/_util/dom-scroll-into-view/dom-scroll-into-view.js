import {
  getWindow,
  isWindow,
  offset,
  domUtils,
  scrollLeft,
  scrollTop,
  css
} from './util';

function scrollIntoView(elem, container, config) {
  config = config || {};
  // document 归一化到 window
  if (container.nodeType === 9) {
    container = getWindow(container);
  }

  let allowHorizontalScroll = config.allowHorizontalScroll;
  const onlyScrollIfNeeded = config.onlyScrollIfNeeded;
  let alignWithTop = config.alignWithTop;
  let alignWithLeft = config.alignWithLeft;
  const offsetTop = config.offsetTop || 0;
  const offsetLeft = config.offsetLeft || 0;
  const offsetBottom = config.offsetBottom || 0;
  const offsetRight = config.offsetRight || 0;

  allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;

  const isWin = isWindow(container);
  const elemOffset = offset(elem);
  const eh = domUtils.outerHeight(elem);
  const ew = domUtils.outerWidth(elem);
  let containerOffset;
  let ch;
  let cw;
  let containerScroll;
  let diffTop;
  let diffBottom;
  let win;
  let winScroll;
  let ww;
  let wh;

  if (isWin) {
    win = container;
    wh = domUtils.height(win);
    ww = domUtils.width(win);
    winScroll = {
      left: scrollLeft(win),
      top: scrollTop(win),
    };
    // elem 相对 container 可视视窗的距离
    diffTop = {
      left: elemOffset.left - winScroll.left - offsetLeft,
      top: elemOffset.top - winScroll.top - offsetTop,
    };
    diffBottom = {
      left: elemOffset.left + ew - (winScroll.left + ww) + offsetRight,
      top: elemOffset.top + eh - (winScroll.top + wh) + offsetBottom,
    };
    containerScroll = winScroll;
  } else {
    containerOffset = offset(container);
    ch = container.clientHeight;
    cw = container.clientWidth;
    containerScroll = {
      left: container.scrollLeft,
      top: container.scrollTop,
    };
    // elem 相对 container 可视视窗的距离
    // 注意边框, offset 是边框到根节点
    diffTop = {
      left: elemOffset.left - (containerOffset.left +
        (parseFloat(css(container, 'borderLeftWidth')) || 0)) - offsetLeft,
      top: elemOffset.top - (containerOffset.top +
        (parseFloat(css(container, 'borderTopWidth')) || 0)) - offsetTop,
    };
    diffBottom = {
      left: elemOffset.left + ew -
        (containerOffset.left + cw +
          (parseFloat(css(container, 'borderRightWidth')) || 0)) + offsetRight,
      top: elemOffset.top + eh -
        (containerOffset.top + ch +
          (parseFloat(css(container, 'borderBottomWidth')) || 0)) + offsetBottom,
    };
  }

  if (diffTop.top < 0 || diffBottom.top > 0) {
    // 强制向上
    if (alignWithTop === true) {
      scrollTop(container, containerScroll.top + diffTop.top);
    } else if (alignWithTop === false) {
      scrollTop(container, containerScroll.top + diffBottom.top);
    } else {
      // 自动调整
      if (diffTop.top < 0) {
        scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  } else {
    if (!onlyScrollIfNeeded) {
      alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
      if (alignWithTop) {
        scrollTop(container, containerScroll.top + diffTop.top);
      } else {
        scrollTop(container, containerScroll.top + diffBottom.top);
      }
    }
  }

  if (allowHorizontalScroll) {
    if (diffTop.left < 0 || diffBottom.left > 0) {
      // 强制向上
      if (alignWithLeft === true) {
        scrollLeft(container, containerScroll.left + diffTop.left);
      } else if (alignWithLeft === false) {
        scrollLeft(container, containerScroll.left + diffBottom.left);
      } else {
        // 自动调整
        if (diffTop.left < 0) {
          scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    } else {
      if (!onlyScrollIfNeeded) {
        alignWithLeft = alignWithLeft === undefined ? true : !!alignWithLeft;
        if (alignWithLeft) {
          scrollLeft(container, containerScroll.left + diffTop.left);
        } else {
          scrollLeft(container, containerScroll.left + diffBottom.left);
        }
      }
    }
  }
}

export default scrollIntoView;