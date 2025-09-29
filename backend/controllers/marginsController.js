import { tokenModel } from "../models/tokenModel.js";

export const marginsController = async (req, res) => {
  try {
    const { segment } = req.params;
    const { user_id } = req.query;

    let tokenDoc;
    if (user_id) {
      tokenDoc = await tokenModel.findOne({ user_id });
    } else {
      tokenDoc = await tokenModel.findOne().sort({ login_time: -1 });
    }

    if (!tokenDoc) {
      return res
        .status(404)
        .json({ error: "No access_token found. Please login again." });
    }

    const access_token = tokenDoc.access_token;
    const api_key = process.env.KITE_API_KEY;

    const url = segment
      ? `https://api.kite.trade/user/margins/${segment}`
      : "https://api.kite.trade/user/margins";

    const response = await fetch(url, {
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
        .json({ error: data.message || "Failed to fetch margin" });
    }
    res.json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
