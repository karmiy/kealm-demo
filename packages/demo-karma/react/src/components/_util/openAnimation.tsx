import cssAnimation from 'css-animation';
import raf from 'raf';

function animate(node: HTMLElement, show: boolean, done: () => void) {
  let height: number;
  let requestAnimationFrameId: number;
  return cssAnimation(node, 'salus-motion-collapse', {
    start() {
      if (!show) {
        node.style.height = `${node.offsetHeight}px`;
        node.style.opacity = '1';
      } else {
        height = node.offsetHeight;
        node.style.height = '0px';
        node.style.opacity = '0';
      }
    },
    active() {
      if (requestAnimationFrameId) {
        raf.cancel(requestAnimationFrameId);
      }
      requestAnimationFrameId = raf(() => {
        node.style.height = `${show ? height : 0}px`;
        node.style.opacity = show ? '1' : '0';
      });
    },
    end() {
      if (requestAnimationFrameId) {
        raf.cancel(requestAnimationFrameId);
      }
      node.style.height = '';
      node.style.opacity = '';
      done();
    },
  });
}

const animation = {
  enter(node: HTMLElement, done: () => void) {
    return animate(node, true, done);
  },
  leave(node: HTMLElement, done: () => void) {
    return animate(node, false, done);
  },
  appear(node: HTMLElement, done: () => void) {
    return animate(node, true, done);
  },
};

export default animation;
