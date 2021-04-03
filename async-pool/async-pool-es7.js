/**
 * 并发流控制
 * @param {number} poolLimit 同时执行的任务数量
 * @param {array} items 当前所需要执行的任务
 * @param {function} fn 执行的任务方法
 * @returns Array
 */
async function asyncPool(poolLimit, items, fn) {
  const promises = []; // 所有任务
  const executing = []; // 正在执行的任务

  for (let item of items) {
    const p = Promise.resolve().then(() => fn(item));
    promises.push(p);

    if (poolLimit <= items.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);

      if (poolLimit === executing.length) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(promises);
}

// 示例：
