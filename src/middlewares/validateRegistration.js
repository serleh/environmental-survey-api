export const validateRegistration = (req, res, next) => {
  const { name, role, institutionId } = req.body;

  if (!name || !role || !institutionId) {
    return res
      .status(400)
      .json({ message: "Name, Role, and Institution ID are required" });
  }

  if (!["STUDENT", "FACULTY"].includes(role)) {
    return res
      .status(400)
      .json({ message: "Only Students and Faculties can register" });
  }

  if (role === "STUDENT") {
    const {
      class: studentClass,
      section,
      admissionDate,
      specialization,
    } = req.body;
    if (!studentClass || !section || !admissionDate || !specialization) {
      return res
        .status(400)
        .json({ message: "Missing required student fields" });
    }
  }
  if (role === "FACULTY") {
    const { specialization, dateOfJoining } = req.body;

    if (!specialization || !dateOfJoining) {
      return res
        .status(400)
        .json({ messsage: "Missing required falcuty fields" });
    }
  }
  next();
};
