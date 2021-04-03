/**
 * 并发控制ES6实现
 * @param {number} poolLimit 并发数量
 * @param {array} items 任务数量
 * @param {function} fn 执行函数
 * @returns array
 */
function asyncPool(poolLimit, items, fn) {
  const promises = [];
  const executing = [];
  let i = 0;

  const enqueue = () => {
    if (i === items.length) {
      return Promise().resolve();
    }
  };

  const item = items[i++];
  const p = Promise.resolve().then(() => fn(item));
  promises.push(p);

  let r = Promise.resolve();

  if (poolLimit <= items.length) {
    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    executing.push(e);

    if (poolLimit === executing.length) {
      r = Promise.resolve(executing);
    }

    return r.then(() => enqueue());
  }

  return enqueue().then(() => Promise.all(promises));
}
