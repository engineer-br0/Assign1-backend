const express = require("express");
const getEndpointRouter = express.Router();
const FirstEndpointStudent = require("../models/firstStudentSchema");
const SecondEndpointStudent = require("../models/secondStudentSchema");

// Function to calculate percentage
function calculatePercentage(obtainedMarks, totalMarks) {
  if (totalMarks === 0) return 0; // Avoid division by zero
  return (obtainedMarks / totalMarks) * 100;
}

getEndpointRouter.get("/", async (req, res) => {
  try {
    const firstEndpointStudents = await FirstEndpointStudent.find();
    const secondEndpointStudents = await SecondEndpointStudent.find();

    const formattedFirstEndpointStudents = firstEndpointStudents.map(
      (student) => {
        const {
          name,
          age,
          gender,
          marks: { physics, chemistry, maths },
          physicsPercentage,
          chemistryPercentage,
          mathsPercentage,
          overallPercentage,
        } = student;

        return {
          name,
          age,
          gender,
          physicsPercentage,
          chemistryPercentage,
          mathsPercentage,
          overallPercentage,
        };
      }
    );

    const formattedSecondEndpointStudents = secondEndpointStudents.map(
      (student) => {
        const { first_name, last_name, years_old, gender, scores } = student;
        const { subjects, marks_obtained, total_marks } = scores;

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
        const overallPercentage =
          (physicsPercentage + (chemistryPercentage || 0) + mathsPercentage) /
          3;

        return {
          name: `${first_name} ${last_name}`,
          age: years_old,
          gender: gender,
          physicsPercentage,
          chemistryPercentage,
          mathsPercentage,
          overallPercentage,
        };
      }
    );

    const allFormattedStudents = [
      ...formattedFirstEndpointStudents,
      ...formattedSecondEndpointStudents,
    ];
    res.status(200).json({
      success: true,
      message: "Student records retrieved successfully",
      data: allFormattedStudents,
    });
  } catch (error) {
    console.error("Error retrieving student records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = getEndpointRouter;
