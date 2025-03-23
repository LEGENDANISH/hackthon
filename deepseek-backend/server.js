const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// DeepSeek API endpoint and key
const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/v1/analyze";
const API_KEY = "sk-0ba3ff396ccc4acb9fb4f455088733a6"; // Hardcoded API key

// Proxy endpoint
app.post("/analyze", async (req, res) => {
  try {
    const { image } = req.body; // Get the base64 image from the request body

    // Make a POST request to the DeepSeek API
    const response = await axios.post(
      DEEPSEEK_ENDPOINT,
      { image },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send the DeepSeek API response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Proxy error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch data from DeepSeek API" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});