import { OpenAI } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { player1Data, player2Data } = req.body;
  if (!player1Data || !player2Data) {
    return res.status(400).json({ error: "Missing player data" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Securely use API key from Vercel
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: `You are a blunt, no-nonsense expert in evaluating basketball players. You are speaking in the year 2017, so anything after that you do not know. 
          Your job is to compare two players based on their playstyles, historical context, and statistical profiles. 
        
          - The provided stats are **normalized on a scale from 0 to 1**, meaning they represent **relative performance** rather than raw magnitudes.
          - **Do not reference actual stat values** (like "Player X averaged 25 PPG") because the numbers are **scaled, not real**.
          - Instead, talk about how the players compare to each other and the general player pool (e.g., "Player X scores at a high rate compared to his peers").
          - **2P and 3P refer to scoring volume, NOT shooting percentage**. Do not mistake them for efficiency metrics.
          - There is **no 2P% or 3P% stat available**, so do not mention them.
          - **Do not use Markdown formatting such as bold (**text**) or italics (*text*).** Present information naturally, without unnecessary formatting.
      
        
          Contextualize the numbers by discussing **how they align with each players reputation**. If anything is **unexpected or contradicts common perception**, highlight it.
        
          Be direct, analytical, and insightful—avoid fluff and exaggeration. `
        },
        
        {
          role: "user",
          content: `Compare these two players based on their provided stats and what you know about their careers:
          Player 1: ${JSON.stringify(player1Data)}
          Player 2: ${JSON.stringify(player2Data)}
        
          Provide a concise and engaging comparison that explains their differences in playstyle, statistical profile, and historical reputation. 
          Remember that stats are **normalized (0-1)**, so discuss them in relative terms rather than absolute numbers. Also, do not use Markdown formatting in your response.`
        }
        
      ],
    });

    return res.status(200).json({ blurb: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return res.status(500).json({ error: "Failed to generate player comparison" });
  }
}
