<<<<<<< HEAD
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
=======
async function analyzeCreative(imageUrl) {
  try {
    console.log("Sending image to Groq...");
>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)

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

<<<<<<< HEAD
Return the answer as JSON with these keys:
=======
Return ONLY valid JSON using exactly this structure:
>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)

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

<<<<<<< HEAD
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
=======
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "qwen/qwen3.8-27b",

          messages: [
            {
              role: "user",

              content: [
                {
                  type: "text",
                  text: prompt,
                },

                {
                  type: "image_url",
                  image_url: {
                    url: imageUrl,
                  },
                },
              ],
            },
          ],

          temperature: 0.2,

          max_completion_tokens: 1500,

          response_format: {
            type: "json_object",
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:");
      console.error(JSON.stringify(data, null, 2));

      throw new Error(
        data?.error?.message || "Groq API request failed"
      );
    }

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("Groq returned an empty response");
    }

    console.log("Groq analysis received successfully");

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch (parseError) {
      console.error("Groq returned invalid JSON:");
      console.error(text);

      throw new Error("Groq returned invalid JSON");
    }

    return analysis;

  } catch (error) {
    console.error("=================================");
    console.error("AI ANALYSIS ERROR");
    console.error("=================================");
    console.error("Message:", error?.message);
    console.error("Name:", error?.name);
    console.error("Stack:", error?.stack);
    console.error("=================================");

>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)
    throw error;
  }
}

module.exports = {
  analyzeCreative,
};