import express from "express";
import axios from "axios";
import Summary from "../models/Summary.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================== SUMMARIZE ==================
router.post("/summarize", authMiddleware, async (req, res) => {

  try {

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Text is required"
      });
    }

    // Call OpenRouter API
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Summarize:\n${text}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Get AI summary
    const summary = response.data.choices[0].message.content;

    // Save to MongoDB
    await Summary.create({
      user: req.user.id,
      originalText: text,
      summary
    });

    // Send response
    res.json({ summary });

  } catch (error) {

    console.error("AXIOS ERROR:", error.message);

    res.status(500).json({
      message: error.message || "AI error"
    });

  }

});

// ================== HISTORY ==================
router.get("/history", authMiddleware, async (req, res) => {

  try {

    const summaries = await Summary.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(summaries);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch history"
    });

  }

});

export default router;