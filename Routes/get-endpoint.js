const express = require("express");
const getEndpointRouter = express.Router();

getEndpointRouter.get("/get-endpoint", (req, res) => {
  const formattedRecords = studentRecords.map((record) => ({
    name: record.name,
    age: record.age,
    gender: record.gender || "Not specified",
    physics_percentage: record.physicsPercentage,
    chemistry_percentage: record.chemistryPercentage || "N/A",
    maths_percentage: record.mathsPercentage,
    overall_percentage: record.overallPercentage,
  }));

  res.status(200).json(formattedRecords);
});

module.exports = getEndpointRouter;
