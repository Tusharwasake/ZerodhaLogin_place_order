import { watchlistModel } from "../models/watchlist.js";

export const getWatchlist = async (req, res) => {
  const { user_id } = req.query;
  const doc = await watchlistModel.findOne({ user_id });
  res.json({ success: true, symbols: doc?.symbols || [] });
};

export const addToWatchlist = async (req, res) => {
  const { user_id, symbol } = req.body;
  let doc = await watchlistModel.findOne({ user_id });
  if (!doc) doc = await watchlistModel.create({ user_id, symbols: [] });
  if (!doc.symbols.includes(symbol)) doc.symbols.push(symbol);
  await doc.save();
  res.json({ success: true, symbols: doc.symbols });
};

export const removeFromWatchlist = async (req, res) => {
  const { user_id, symbol } = req.body;
  const doc = await watchlistModel.findOne({ user_id });
  if (doc) {
    doc.symbols = doc.symbols.filter((s) => s !== symbol);
    await doc.save();
  }
  res.json({ success: true, symbols: doc?.symbols || [] });
};
