import { KiteConnect } from "kiteconnect";
import { tokenModel } from "../models/tokenModel.js";

const kc = new KiteConnect({
  api_key: process.env.KITE_API_KEY,
});

const placeOrder = async (req, res) => {
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

    const {
      tradingsymbol,
      exchange = "NSE",
      transaction_type,
      quantity,
      order_type,
      product,
      price,
      trigger_price,
      validity = "DAY",
      disclosed_quantity,
      tag,
      variety = "regular",
    } = req.body;

    if (
      !tradingsymbol ||
      !transaction_type ||
      !quantity ||
      !order_type ||
      !product
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const orderData = {
      tradingsymbol,
      exchange,
      transaction_type,
      quantity: parseInt(quantity),
      order_type,
      product,
      validity,
    };

    if (price) orderData.price = parseFloat(price);
    if (trigger_price) orderData.trigger_price = parseFloat(trigger_price);
    if (disclosed_quantity)
      orderData.disclosed_quantity = parseInt(disclosed_quantity);
    if (tag) orderData.tag = tag;

    const result = await kc.placeOrder(variety, orderData);

    res.json({
      success: true,
      message: "Order placed",
      order_id: result.order_id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order failed",
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
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
    const orders = await kc.getOrders();

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error: error.message,
    });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const { order_id } = req.params;
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
    const history = await kc.getOrderHistory(order_id);

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get order history",
      error: error.message,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { user_id } = req.query;
    const { variety = "regular" } = req.body;

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
    const result = await kc.cancelOrder(variety, order_id);

    res.json({
      success: true,
      message: "Order cancelled",
      order_id: result.order_id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};

const modifyOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { user_id } = req.query;

    const {
      quantity,
      price,
      order_type,
      trigger_price,
      validity = "DAY",
      disclosed_quantity,
      variety = "regular",
    } = req.body;

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

    const modifyParams = {};

    if (quantity) modifyParams.quantity = quantity;
    if (price) modifyParams.price = price;
    if (order_type) modifyParams.order_type = order_type;
    if (trigger_price) modifyParams.trigger_price = trigger_price;
    if (validity) modifyParams.validity = validity;
    if (disclosed_quantity)
      modifyParams.disclosed_quantity = disclosed_quantity;

    const result = await kc.modifyOrder(variety, order_id, modifyParams);

    res.json({
      success: true,
      message: "Order modified",
      order_id: result.order_id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to modify order",
      error: error.message,
    });
  }
};

export { placeOrder, getOrders, getOrderHistory, cancelOrder, modifyOrder };
