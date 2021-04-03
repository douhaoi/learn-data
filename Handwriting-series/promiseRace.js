function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || promises.length === 0) {
      resolve("");
    }

    for (let promise of promises) {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

const e1 = setTimeout(() => 'e1', 1000);
const e2 = setTimeout(() => 'e2', 2000);

promiseRace([e1, e2]).then(res => {
  console.warn(99, res);
})