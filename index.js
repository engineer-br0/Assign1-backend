const express = require("express");
const bodyParser = require("body-parser");
const firstEndpointRouter = require("./Routes/first-endpoint");
const secondEndpointRouter = require("./Routes/second-endpoint");
const getEndpointRouter = require("./Routes/get-endpoint");
const dotenv = require("dotenv");
const connection = require("./database/connect");
dotenv.config();

const app = express();
const PORT = 4000;
connection();

app.use(bodyParser.json());
app.use("/first-endpoint", firstEndpointRouter);
app.use("/second-endpoint", secondEndpointRouter);
app.use("/get-endpoint", getEndpointRouter);

// Store student records
const studentRecords = [];

// FIRST ENDPOINT

// SECOND ENDPOINT

// GET endpoint

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
