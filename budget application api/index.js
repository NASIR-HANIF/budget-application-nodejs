const express = require("express");
const server = express();
server.listen(1000);

const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const multiPart = multer().none();
// enable cors
server.use(cors());
// including body parser});
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(multiPart);

const indexRouter = require("./routes/index.routes");
const budgetRouter = require("./routes/budget.routes")

server.use("/",indexRouter);
server.use("/api/budget",budgetRouter);
