const mongoose = require("mongoose");

const secondStudentSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  years_old: { type: Number, required: true },
  gender: { type: String, required: true },
  scores: {
    subjects: ["physics", "chemistry", "maths"],
    marks_obtained: [{ type: Number, required: true }],
    total_marks: [{ type: Number, required: true }],
  },
  physicsPercentage: { type: Number, required: true },
  chemistryPercentage: { type: Number, required: true },
  mathsPercentage: { type: Number, required: true },
  overallPercentage: { type: Number, required: true },
});

const secondEndpointStudents = mongoose.model(
  "secondEndpointStudents",
  secondStudentSchema
);

module.exports = secondEndpointStudents;
