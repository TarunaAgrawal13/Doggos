const axios = require("axios");

const getDogRecommendation = async (req, res) => {
  try {
    const { space, activity, experience, budget } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is missing from .env" });
    }

    const prompt = `
Suggest 3 dog breeds. Respond ONLY with a valid JSON array, no markdown, no explanation, no code fences.
Format:
[
  { "name": "Breed Name", "reason": "Why this breed suits the user" },
  { "name": "Breed Name", "reason": "Why this breed suits the user" },
  { "name": "Breed Name", "reason": "Why this breed suits the user" }
]

User Preferences:
Space: ${space}
Activity: ${activity}
Experience: ${experience}
Budget: ${budget}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const rawText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch {
      parsed = cleanText;
    }

    res.json({ result: parsed });

  } catch (error) {
    console.error("❌ AI ERROR STATUS:", error.response?.status);
    console.error("❌ AI ERROR DATA:", JSON.stringify(error.response?.data, null, 2));
    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
};

module.exports = { getDogRecommendation };