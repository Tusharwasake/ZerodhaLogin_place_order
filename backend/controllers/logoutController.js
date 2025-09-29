import { tokenModel } from "../models/tokenModel.js";

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("user_id");
    await tokenModel.deleteMany({});
    console.log("Database cleared - all tokens removed on logout");

    res.json({ message: "Logout successful. All tokens cleared." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
