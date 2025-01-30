import React from "react";
import Plot from "react-plotly.js";

const RadarChart = ({ player1Data, player2Data }) => {
  const metrics = ["3P", "2P", "TS%", "DBPM", "STL%", "BLK%", "AST%", "AST/TOV", "ORB%", "DRB%"]; // Metrics to display

  // Extract values for Player 1
  const player1Values = player1Data
    ? metrics.map((metric) => parseFloat(player1Data[metric]) || 0)
    : null;

  // Extract values for Player 2
  const player2Values = player2Data
    ? metrics.map((metric) => parseFloat(player2Data[metric]) || 0)
    : null;

  // Data array for both players
  const plotData = [];

  if (player1Data) {
    plotData.push({
      type: "scatterpolar",
      r: player1Values, // Player 1's metric values
      theta: metrics,   // Metric names
      fill: "toself",   // Fill under the curve
      name: player1Data.Player, // Player 1's name
      line: { color: "blue" },  // Player 1's line color
    });
  }

  if (player2Data) {
    plotData.push({
      type: "scatterpolar",
      r: player2Values, // Player 2's metric values
      theta: metrics,   // Metric names
      fill: "toself",   // Fill under the curve
      name: player2Data.Player, // Player 2's name
      line: { color: "red" },   // Player 2's line color
    });
  }

  // Default placeholder data for blank graph
  const placeholderData = [{
    type: "scatterpolar",
    r: [0], // Dummy radial value
    theta: [""], // Dummy angular value
    mode: "lines", // Minimal mode for blank graph
    line: { color: "rgba(0,0,0,0)" }, // Invisible line
    hoverinfo: "none", // Disable hover info
  }];

  // Use placeholder data if no players are selected
  const finalData = plotData.length > 0 ? plotData : placeholderData;

  return (
    <Plot
      data={finalData}
      layout={{
        polar: { radialaxis: { visible: true, range: [0, 1] } }, // Fixed axis range
        title: plotData.length > 0 ? "Player Comparison Radar Chart" : "Select Players to Compare",
        showlegend: plotData.length > 0, // Show legend only if players are present
        autosize: true,
      }}
      useResizeHandler={true}
      style={{ width: "100%", height: "100%" }} // Inherit dimensions from parent
    />
  );
};

export default RadarChart;
