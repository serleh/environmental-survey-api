import { registerUser, userLogin } from "../services/auth.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      message: "Registration sucessfully. Await admin aproval",
      userId: user.id,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { institutionId, password } = req.body;
    const result = await userLogin({ institutionId, password });

    return res.status(200).json({
      message: "Login successful",
      token: result.token,
      userId: result.userId,
      role: result.role,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
