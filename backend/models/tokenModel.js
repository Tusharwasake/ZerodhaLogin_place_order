import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },

  login_time: {
    type: Date,
    default: Date.now,
  },
});

const tokenModel = mongoose.model("tokenModel", tokenSchema);
export { tokenModel };
