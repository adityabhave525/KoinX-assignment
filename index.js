const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const URL = "https://api.coingecko.com/api/v3/";
const API_KEY = process.env.API_KEY

app.get("/stats", async (req, res) => {
  const { coin } = req.body;

  if (!coin) {
    return res.status(400).json({
      err: "Coin is required",
    });
  }

  try {
    const statsUrl = `${URL}simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    const options = {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": API_KEY,
      },
    };

    const result = await axios.get(statsUrl, options);
    const response = result.data;

    const price = response[`${coin}`]["usd"];
    const market_cap = response[`${coin}`]["usd_market_cap"];
    const change_24h = response[`${coin}`]["usd_24h_change"].toFixed(1);

    return res.status(200).json({
      price: price,
      marketCap: market_cap,
      "24hChange": Number(change_24h),
    });
  } catch (e) {
    console.log("Error: " + e);
    return res.status(500).json({
      err: "Error fetching coin data",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
