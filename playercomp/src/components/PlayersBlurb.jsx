import React, { useState, useEffect } from "react";

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
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player1Data, player2Data }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setBlurb(data.blurb);
      } else {
        console.error("Error:", data.error);
        setBlurb("Failed to generate comparison.");
      }
    } catch (error) {
      console.error("Request error:", error);
      setBlurb("An error occurred.");
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




