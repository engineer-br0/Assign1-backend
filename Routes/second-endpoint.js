const express = require("express");
const secondEndpointStudents = require("../models/secondStudentSchema");
const secondEndpointRouter = express.Router();

function calculatePercentage(obtainedMarks, totalMarks) {
  if (totalMarks === 0) return 0;
  return (obtainedMarks / totalMarks) * 100;
}

secondEndpointRouter.post("/", async (req, res) => {
  const { first_name, last_name, years_old, gender, scores } = req.body;

  if (
    !first_name ||
    !last_name ||
    !years_old ||
    !gender ||
    !scores ||
    !scores.subjects ||
    !scores.marks_obtained ||
    !scores.total_marks
  ) {
    return res.status(400).json({ error: "Incomplete data provided" });
  }

  const { subjects, marks_obtained, total_marks } = scores;

  if (
    !Array.isArray(subjects) ||
    !Array.isArray(marks_obtained) ||
    !Array.isArray(total_marks) ||
    subjects.length !== marks_obtained.length ||
    subjects.length !== total_marks.length ||
    !subjects.includes("physics") ||
    !subjects.includes("maths")
  ) {
    return res
      .status(400)
      .json({ error: "Invalid data format for subjects or marks" });
  }

  const physicsIndex = subjects.indexOf("physics");
  const mathsIndex = subjects.indexOf("maths");
  const chemistryIndex = subjects.indexOf("chemistry");

  const physicsPercentage = calculatePercentage(
    marks_obtained[physicsIndex],
    total_marks[physicsIndex]
  );
  const chemistryPercentage =
    chemistryIndex !== -1
      ? calculatePercentage(
          marks_obtained[chemistryIndex],
          total_marks[chemistryIndex]
        )
      : null;
  const mathsPercentage = calculatePercentage(
    marks_obtained[mathsIndex],
    total_marks[mathsIndex]
  );
  const overallPercentage = chemistryPercentage
    ? (physicsPercentage + chemistryPercentage + mathsPercentage) / 3
    : (physicsPercentage + mathsPercentage) / 2;

  const existingStudent = await secondEndpointStudents.findOne({
    first_name,
    last_name,
  });

  if (existingStudent) {
    const upload = await secondEndpointStudents.findOneAndUpdate({
      first_name,
      last_name,
      years_old,
      gender,
      scores: {
        subjects,
        marks_obtained,
        total_marks,
      },
      physicsPercentage,
      chemistryPercentage,
      mathsPercentage,
      overallPercentage,
    });
    console.log("upl", upload);

    res.status(201).json({
      success: true,
      name: `${first_name} ${last_name}`,
      age: years_old,
      physicsPercentage,
      chemistryPercentage,
      mathsPercentage,
      overallPercentage,
    });
  } else {
    const upload = await secondEndpointStudents.create({
      first_name,
      last_name,
      years_old,
      gender,
      scores: {
        subjects,
        marks_obtained,
        total_marks,
      },
      physicsPercentage,
      chemistryPercentage,
      mathsPercentage,
      overallPercentage,
    });
    console.log("upl", upload);

    res.status(201).json({
      success: true,
      name: `${first_name} ${last_name}`,
      age: years_old,
      physicsPercentage,
      chemistryPercentage,
      mathsPercentage,
      overallPercentage,
    });
  }
});

module.exports = secondEndpointRouter;
