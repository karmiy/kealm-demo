export class Subscribe {
  protected _subscribes: Array<(...args: unknown[]) => void> = [];

  on = (cb: (...args: unknown[]) => void) => {
    this._subscribes.push(cb);
    return () => {
      const index = this._subscribes.findIndex((item) => item === cb);
      this._subscribes.splice(index, 1);
    };
  };

  once = (cb: (...args: unknown[]) => void) => {
    const off = this.on((...args) => {
      cb(...args);
      off();
    });
  };
}
