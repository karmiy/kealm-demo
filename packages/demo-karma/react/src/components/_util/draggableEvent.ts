export class SalusDragOptions {
  start?: Function;
  drag?: Function;
  end?: Function;
}
const draggable = (element: HTMLElement, options: SalusDragOptions) => {
  let isDragging = false;

  const moveFn = (event: MouseEvent) => {
    if (options.drag) {
      options.drag(event)
    }
  }

  const upFn = (event: MouseEvent) => {
    document.removeEventListener('mousemove', moveFn);
    document.removeEventListener('mouseup', upFn);
    (document as any)['onselectstart'] = null;
    document['ondragstart'] = null;

    isDragging = false;

    if (options.end) {
      options.end(event);
    }
  }

  element.addEventListener('mousedown', event => {
    if (isDragging) return;

    (document as any)['onselectstart'] = () => false;
    document['ondragstart'] = () => false;

    document.addEventListener('mousemove', moveFn);
    document.addEventListener('mouseup', upFn);

    isDragging = true;

    if (options.start) {
      options.start(event);
    }
  })
}

export default draggable;