import mongoose from "mongoose";


const watchlistSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  symbols: [{ type: String }]
});

const watchlistModel = mongoose.model("watchlistModel", watchlistSchema);
export { watchlistModel };