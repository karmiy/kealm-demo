const listeners = [];

const subscribe = (fn) => {
  listeners.push(fn);

  return () => {
    const index = listeners.findIndex(f => f === fn);
    listeners.splice(index, 1);
  }
};

const emit = () => {
  console.log('emit.....................');
  listeners.forEach(fn => fn());
}

export default {
  subscribe,
  emit,
}
