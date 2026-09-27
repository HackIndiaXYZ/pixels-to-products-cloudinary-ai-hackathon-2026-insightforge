const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeCreative(imageUrl) {
  try {
    // Get the image from Cloudinary
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Could not fetch image from Cloudinary");
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());

    const mimeType =
      response.headers.get("content-type") || "image/jpeg";

    const base64Image = imageBuffer.toString("base64");

    const prompt = `
You are an AI marketing creative analyst.

Analyze this advertisement image for a marketing intelligence platform.

Return a structured analysis covering:

1. Visual Elements
- Dominant colors
- Composition
- Objects/products visible
- Overall visual style

2. Text & CTA
- Main text
- CTA text
- Text density
- Whether the CTA is visually prominent

3. Product Visibility
- What product/service is being promoted
- How prominently it appears
- Product placement

4. Human Presence
- Whether people are present
- If present, describe their role

5. Marketing Summary
- Overall creative strategy
- Target audience impression

6. Recommendations
- Give 3 actionable suggestions for improving or testing this creative.

Important:
Do not claim that any visual feature causes better campaign performance.
Use language such as "may", "could", "appears", or "is associated with".

Return the answer as JSON with these keys:

{
  "visualElements": {
    "dominantColors": [],
    "composition": "",
    "objects": [],
    "style": ""
  },
  "textAndCTA": {
    "mainText": "",
    "cta": "",
    "textDensity": "",
    "ctaProminence": ""
  },
  "productVisibility": {
    "product": "",
    "prominence": "",
    "placement": ""
  },
  "humanPresence": {
    "present": false,
    "description": ""
  },
  "marketingSummary": "",
  "recommendations": []
}
`;

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        {
          inlineData: {
            mimeType,
            data: base64Image,
          },
        },
        {
          text: prompt,
        },
      ],
    });

    return result.text;
  } catch (error) {
    console.error("AI analysis error:", error);
    throw error;
  }
}

module.exports = {
  analyzeCreative,
};