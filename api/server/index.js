const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routers = [require("./products")];

const PORT = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Error handling middleware.
app.use((err, req, res, _) => {
    console.error(err.stack);

    res.sendStatus(500);
});

app.use(routers);

const server = app.listen(PORT, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log(server.address());

    console.log("Listening at http://%s:%s", host, port);
});