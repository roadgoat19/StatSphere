import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import RadarChart from "../components/RadarChart";
import PlayerSearchDropdown from "../components/PlayerSearchDropdown";
import PlayerComparisonBlurb from "../components/PlayersBlurb"
import '../PlayerComparison.css'

const PlayerComparisonPage = () => {
  const [data, setData] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState(null);

  useEffect(() => {
    Papa.parse("/player_data.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  const playerOptions = data.map((row) => row.Player);

  const player1Data = selectedPlayer1
    ? data.find((row) => row.Player === selectedPlayer1)
    : null;
  const player2Data = selectedPlayer2
    ? data.find((row) => row.Player === selectedPlayer2)
    : null;

  return (
    <div className="container">
      <h1>Player Comparison</h1>

      <PlayerSearchDropdown
        options={playerOptions}
        onSelect={setSelectedPlayer1}
        placeholder="Search for Player 1"
      />

      <PlayerSearchDropdown
        options={playerOptions}
        onSelect={setSelectedPlayer2}
        placeholder="Search for Player 2"
      />

      <div className="chart-container">
        <RadarChart player1Data={player1Data} player2Data={player2Data} />
      </div>
        <PlayerComparisonBlurb
          player1Data={player1Data}
          player2Data={player2Data}
        />
    </div>
  );
};

export default PlayerComparisonPage;
