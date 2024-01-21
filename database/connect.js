const mongoose = require("mongoose");
require("dotenv").config();

//mongoose.set("strictQuery", false);

const connection = async () => {
  const URI = (await process.env.URI) || "";
  try {
    const connect = await mongoose.connect(URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error occurred in mongo connection:", error);
  }
};

module.exports = connection;
