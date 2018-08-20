const express = require("express");
const cors = require("cors");

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.stack);
});

const server = app.listen(PORT, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log(server.address());

  console.log("Listening at http://%s:%s", host, port);
});
