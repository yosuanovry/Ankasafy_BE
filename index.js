const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mainRouter = require("./src/routes/index");

const port = 4000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", mainRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// const errorHandler = require('./src/middleware/errorHandling.js')
// app.use(errorHandler)
