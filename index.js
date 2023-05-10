const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mainRouter = require("./src/routes/index");

const port = 4000;

const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    methods: ["GET", "PUT", "POST", "DELETE"],
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", mainRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
