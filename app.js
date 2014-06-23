var express = require("express"),
    storage = require("./storage"),
    app = express();

app.get("/", function (req, res) {
  res.send("Hello world");
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Express listening on port 3000');
});
