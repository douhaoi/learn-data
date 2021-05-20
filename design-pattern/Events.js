class Eventemit {
  constructor() {
    this.events = Object.create(null);
  }

  on(eventName, fn) {
    if (typeof fn !== "function") {
      throw new TypeError("您当前输入的 fn 非函数类型，请检查后重试");
    }
    if (!this.events[eventName]) {
      this.events[eventName] = new Set();
    }
    this.events[eventName].add(fn);
    return this;
  }

  once(eventName, fn) {
    if (typeof fn !== "function") {
      throw new TypeError("您当前输入的 fn 非函数类型，请检查后重试");
    }
    const onceListener = (...args) => fn.apply(this, args);
    onceListener.once = true;
    this.on(eventName, onceListener);
    return this;
  }

  off(eventName, fn) {
    if (typeof fn !== "function") {
      throw new TypeError("您当前输入的 fn 非函数类型，请检查后重试");
    }
    const event = this.events[eventName];
    if (event) {
      for (let listener of event) {
        if (listener === fn) {
          event.delete(listener);
          break;
        }
      }
    }
    return this;
  }

  emit(eventName, ...args) {
    const event = this.events[eventName];
    if (event) {
      for(let listener of event) {
        listener.apply(this. args);
        if (listener.once) {
          event.delete(listener)
        }
      }
      return true;
    } else {
      return false;
    }
  }
}
