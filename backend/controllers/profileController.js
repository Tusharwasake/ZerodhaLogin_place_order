import "dotenv/config";
import fetch from "node-fetch";
import { tokenModel } from "../models/tokenModel.js";

export const profileController = async (req, res) => {
  let { user_id } = req.params;

  // If no user_id in params, try to get it from cookies
  if (!user_id) {
    user_id = req.cookies.user_id;
  }

  try {
    let tokenDoc;

    if (user_id) {
      tokenDoc = await tokenModel.findOne({ user_id });
    } else {
      // Fallback to latest token if no user_id available
      tokenDoc = await tokenModel.findOne().sort({ login_time: -1 });
    }

    if (!tokenDoc) {
      return res
        .status(401)
        .json({ error: "No access_token found. Please login again." });
    }

    const access_token = tokenDoc.access_token;
    const api_key = process.env.KITE_API_KEY;

    const response = await fetch("https://api.kite.trade/user/profile", {
      method: "GET",
      headers: {
        "X-Kite-Version": "3",
        Authorization: `token ${api_key}:${access_token}`,
      },
    });

    const data = await response.json();

    if (data.status !== "success") {
      return res
        .status(400)
        .json({ error: data.message || "Failed to fetch profile" });
    }
    res.json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
