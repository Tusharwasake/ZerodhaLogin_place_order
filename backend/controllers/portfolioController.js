import "dotenv/config";
import { KiteConnect } from "kiteconnect";
import { tokenModel } from "../models/tokenModel.js";

const kc = new KiteConnect({
  api_key: process.env.KITE_API_KEY,
});

const getTrades = async (req, res) => {
  try {
    const { user_id } = req.query;

    let tokenDoc;
    if (user_id) {
      tokenDoc = await tokenModel.findOne({ user_id });
    } else {
      tokenDoc = await tokenModel.findOne().sort({ login_time: -1 });
    }

    if (!tokenDoc) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    kc.setAccessToken(tokenDoc.access_token);
    const trades = await kc.getTrades();

    res.json({
      success: true,
      data: trades,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get trades",
      error: error.message,
    });
  }
};

const getPositions = async (req, res) => {
  try {
    const { user_id } = req.query;

    let tokenDoc;
    if (user_id) {
      tokenDoc = await tokenModel.findOne({ user_id });
    } else {
      tokenDoc = await tokenModel.findOne().sort({ login_time: -1 });
    }

    if (!tokenDoc) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    kc.setAccessToken(tokenDoc.access_token);
    const positions = await kc.getPositions();

    res.json({
      success: true,
      data: positions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get positions",
      error: error.message,
    });
  }
};

const getHoldings = async (req, res) => {
  try {
    const { user_id } = req.query;

    let tokenDoc;
    if (user_id) {
      tokenDoc = await tokenModel.findOne({ user_id });
    } else {
      tokenDoc = await tokenModel.findOne().sort({ login_time: -1 });
    }

    if (!tokenDoc) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    kc.setAccessToken(tokenDoc.access_token);
    const holdings = await kc.getHoldings();

    res.json({
      success: true,
      data: holdings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get holdings",
      error: error.message,
    });
  }
};

export { getTrades, getPositions, getHoldings };
