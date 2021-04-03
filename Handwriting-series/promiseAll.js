function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || promises.length === 0) {
      resolve([]);
    }

    const result = [];
    let count = 0;

    // for (let i = 0; i < promises.length; i++) {
    //   Promise.resolve(promises[i])
    //     .then((res) => {
    //       count++;
    //       result[i] = res;

    //       if (count === promises.length) {
    //         resolve(result);
    //       }
    //     })
    //     .catch((err) => {
    //       reject(err);
    //     });
    // }

    for (let promise of promises) {
      Promise.resolve(promise)
        .then((res) => {
          result[count++] = res;
          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

promiseAll("124").then((res) => {
  console.warn("124", res);
});
