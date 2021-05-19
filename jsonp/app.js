const express = require("express");

const app = new express();

app.get("/jsonp", (req, res) => {
  const { callback } = req.query;
  if (!callback) {
    res.send(JSON.stringify({ msg: "未传入callback参数" }));
    return;
  }
  const data = { success: true, data: { user_name: 'douhao' }, msg: "请求成功" };
  setTimeout(() => {
    res.send(`${callback}(${JSON.stringify(data)})`);
  }, 2000);
});

app.listen(3000, () => {
  console.warn("服务启动于：localhost:3000");
});
