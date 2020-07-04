const draggable = (element, options) => {
  let isDragging = false;

  const moveFn = (event) => {
    if (options.drag) {
      options.drag(event)
    }
  }

  const upFn = (event) => {
    document.removeEventListener('mousemove', moveFn);
    document.removeEventListener('mouseup', upFn);
    document['onselectstart'] = null;
    document['ondragstart'] = null;

    isDragging = false;

    if (options.end) {
      options.end(event);
    }
  }

  element.addEventListener('mousedown', event => {
    if (isDragging) return;

    document['onselectstart'] = () => false;
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