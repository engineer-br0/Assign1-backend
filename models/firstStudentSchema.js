const mongoose = require("mongoose");

const firstStudentSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  marks: {
    physics: [{ type: Number, required: true }],
    maths: [{ type: Number, required: true }],
    chemistry: [{ type: Number, required: false }],
  },
  physicsPercentage: { type: Number, required: true },
  chemistryPercentage: { type: Number, required: true },
  mathsPercentage: { type: Number, required: true },
  overallPercentage: { type: Number, required: true },
});

const firstEndpointStudents = mongoose.model(
  "firstEndpointStudents",
  firstStudentSchema
);

module.exports = firstEndpointStudents;
