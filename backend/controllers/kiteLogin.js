import "dotenv/config";

export const kitelogin = (req, res) => {
  try {
    const kite_url = `https://kite.zerodha.com/connect/login?v=3&api_key=${process.env.KITE_API_KEY}`;

    res.redirect(kite_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
