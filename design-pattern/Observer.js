class Subject {
  constructor() {
    this.observers = [];
  }

  attach(observe) {
    if (observe && observe.update && typeof observe.update === 'function') {
      this.observers.push(observe)
    } else {
      throw new Error('您输入的不是观察者类型的数据')
    }
  }

  notify() {
    if (this.observers && this.observers.length) {
      this.observers.forEach(item => item.update && item.update());
    }
  }
}

class Observer {
  constructor(name, sub) {
    this.name = name;
    this.sub = sub;
    this.sub.attach(this)
  }

  update() {
    console.log(`${this.name}, 被触发了`);
  }
}

const sub = new Subject();
const ob1 = new Observer('吃饭', sub);
const ob2 = new Observer('喝水', sub);
sub.notify();

