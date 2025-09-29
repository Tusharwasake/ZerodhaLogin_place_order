import "dotenv/config";
import crypto from "crypto";
import fetch from "node-fetch";
import { tokenModel } from "../models/tokenModel.js";

const api_key = process.env.KITE_API_KEY;
const api_secret = process.env.KITE_API_SECRET;

export const kiteCallbackHandler = async (req, res) => {
  const { request_token } = req.query;

  if (!request_token) {
    const frontendUrl = process.env.FRONTEND_URL;
    return res.redirect(
      `${frontendUrl}/callback?status=error&message=${encodeURIComponent(
        "Missing request token"
      )}`
    );
  }

  try {
    const checksum = crypto
      .createHash("sha256")
      .update(`${api_key}${request_token}${api_secret}`, "utf8")
      .digest("hex");

    const params = new URLSearchParams();
    params.append("api_key", api_key);
    params.append("request_token", request_token);
    params.append("checksum", checksum);

    const response = await fetch("https://api.kite.trade/session/token", {
      method: "POST",
      headers: {
        "X-Kite-Version": "3",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      const frontendUrl = process.env.FRONTEND_URL;
      return res.redirect(
        `${frontendUrl}/callback?status=error&message=${encodeURIComponent(
          data.message || "Login failed"
        )}`
      );
    }

    let payload = {
      access_token: data.data.access_token,
      user_id: data.data.user_id,
      login_time: data.data.login_time,
    };

    await tokenModel.deleteMany({});

    const newtoken = await tokenModel.create(payload);

    if (!newtoken) {
      return res.status(400).json({
        message: "new token was not generated",
      });
    }

    const frontendUrl = process.env.FRONTEND_URL;

    res.cookie("user_id", data.data.user_id, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: "production",
      sameSite: "none",
    });

    res.redirect(
      `${frontendUrl}/callback?user_id=${data.data.user_id}&status=success`
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
