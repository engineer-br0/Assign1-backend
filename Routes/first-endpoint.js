const express = require("express");
const firstEndpointRouter = express.Router();
const FirstEndpointStudent = require("../models/firstStudentSchema");

function calculatePercentage(obtainedMarks, totalMarks) {
  if (totalMarks === 0) return 0; // Avoid division by zero
  return (obtainedMarks / totalMarks) * 100;
}

firstEndpointRouter.post("/", async (req, res) => {
  const { name, age, gender, marks } = req.body;

  if (!name || !age || !gender || !marks || !marks.physics || !marks.maths) {
    return res.status(400).json({ error: "Incomplete data provided" });
  }

  const { physics, chemistry, maths } = marks;

  if (
    !Array.isArray(physics) ||
    !Array.isArray(maths) ||
    (chemistry && !Array.isArray(chemistry)) ||
    physics.length !== 2 ||
    maths.length !== 2 ||
    (chemistry && chemistry.length !== 2) ||
    typeof physics[0] !== "number" ||
    typeof physics[1] !== "number" ||
    (chemistry &&
      (typeof chemistry[0] !== "number" || typeof chemistry[1] !== "number")) ||
    typeof maths[0] !== "number" ||
    typeof maths[1] !== "number" ||
    physics[0] < 0 ||
    physics[1] <= 0 ||
    (chemistry && (chemistry[0] < 0 || chemistry[1] <= 0)) ||
    maths[0] < 0 ||
    maths[1] <= 0 ||
    physics[0] > physics[1] ||
    (chemistry && chemistry[0] > chemistry[1]) ||
    maths[0] > maths[1]
  ) {
    return res.status(400).json({ error: "Invalid data format for marks" });
  }

  const physicsPercentage = calculatePercentage(physics[0], physics[1]);
  const chemistryPercentage = chemistry
    ? calculatePercentage(chemistry[0], chemistry[1])
    : null;
  const mathsPercentage = calculatePercentage(maths[0], maths[1]);
  const overallPercentage = chemistry
    ? (physicsPercentage + chemistryPercentage + mathsPercentage) / 3
    : (physicsPercentage + mathsPercentage) / 2;

  const existingStudent = await FirstEndpointStudent.findOne({ name });

  if (existingStudent) {
    const updatedStudent = await FirstEndpointStudent.findOneAndUpdate(
      { name },
      {
        $set: {
          age,
          gender,
          marks: {
            physics,
            chemistry,
            maths,
          },
          physicsPercentage,
          chemistryPercentage,
          mathsPercentage,
          overallPercentage,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      data: updatedStudent,
    });
  } else {
    const newStudent = await FirstEndpointStudent.create({
      name,
      age,
      gender,
      marks: {
        physics,
        chemistry,
        maths,
      },
      physicsPercentage,
      chemistryPercentage,
      mathsPercentage,
      overallPercentage,
    });

    res.status(201).json({
      success: true,
      message: "Document created successfully",
      data: newStudent,
    });
  }
});

module.exports = firstEndpointRouter;
