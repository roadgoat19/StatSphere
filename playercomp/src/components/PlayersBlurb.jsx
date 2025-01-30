import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("API key is missing!");
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

const PlayerComparisonBlurb = ({ player1Data, player2Data }) => {
  const [blurb, setBlurb] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBlurb(null);
    setLoading(false);
  }, [player1Data, player2Data]);

  const generateBlurb = async () => {
    if (!player1Data || !player2Data) return;

    setLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: `You are a blunt, non-sugarcoating expert at comparing athletes. You live in the year 2017, so anything after that you have no knowledge of.
            You should mainly talk about their history, the era they played in, and anything that should be taken into consideration when looking
            at their stats (an injury, for example). Then contextualize their stats compared to their reputation, adding what aligns and anything that is surprising (if applicable).` },
          {
            role: "user",
            content: `Compare these two players based on their stats and what you know about their histories:
                      Player 1: ${JSON.stringify(player1Data)}
                      Player 2: ${JSON.stringify(player2Data)}
                      Provide a brief and engaging summary. The stats are normalized on a scale from 0 - 1, so talk about them relatively not about magnitude. 2P and 3P
                      refer to volume, not percentage.`,
          },
        ],
      });

      const generatedText = completion.choices[0].message.content;
      setBlurb(generatedText);
    } catch (error) {
      console.error("Error generating blurb:", error);
      setBlurb("Failed to generate comparison. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blurb-container">
      {blurb && <p>{blurb}</p>}
      {loading ? (
        <button className="generate-blurb-button" disabled>Loading...</button>
      ) : (
        <button
          onClick={generateBlurb}
          className={`generate-blurb-button ${!player1Data || !player2Data ? "disabled" : ""}`}
          disabled={!player1Data || !player2Data} 
        >
          Generate Player Comparison
        </button>
      )}
    </div>
  );
};

export default PlayerComparisonBlurb;
