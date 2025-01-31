import React from "react";
import "../About.css"; // Ensure you have a CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About This Site</h1>

      {/* How to Use Section */}
      <section className="about-section">
        <h2>How to Use This Site</h2>
        <p>
          Welcome to the <strong>Basketball Player Comparison Tool</strong>! This site helps
          you compare players using <strong>advanced statistics</strong> visualized through
          a <strong>spider graph</strong>.
        </p>
        <ol>
          <li><strong>Select Two Players:</strong> Use the dropdown menus to search for and pick two players.</li>
          <li><strong>View the Comparison:</strong> The site generates a radar chart comparing their key stats.</li>
          <li><strong>Read the Summary:</strong> Our AI-powered blurb provides insights into their strengths and weaknesses.</li>
        </ol>
      </section>

      {/* Who's in the database section*/}
      <section className="about-section">
        <h2>Who is included?</h2>
        <p>
          Player's who are included are those who accumulated <strong>5000 minutes played through the 2017 season.</strong> This limitation was imposed becauase
          the dataset contains only data through this season, and including players with smaller sample sizes could skew the normalization and result in unfair comparisons.
        </p>
      </section>

      {/* Stat Definitions Section */}
      <section className="about-section">
        <h2>Understanding the Stats</h2>
        <p>
          The player comparison uses <strong>normalized stats</strong> to ensure fair
          evaluation across different metrics. Below are the key
          metrics:
        </p>
        <ul>
          <li><strong>2P (2P / MP):</strong> How frequently a player scores a 2P shot.</li>
          <li><strong>3P (3P / MP):</strong> How frequently a player scores a 3P shot.</li>
          <li><strong>TS% (True Shooting Percentage):</strong> A measure of scoring efficiency, taking all forms of scoring into account.</li>
          <li><strong>AST% (Assist Percentage):</strong>The percentage of a teams assists a player made while on the floor, measuring playmaking volume.</li>
          <li><strong>AST/TOV (Assist to Turnover Ratio):</strong>The ratio of a players assists to turnovers, measuring playmaking efficiency.</li>
          <li><strong>STL% (Steal Percentage):</strong> How often a defensive possession ends in a steal by the player.</li>
          <li><strong>BLK% (Block Percentage):</strong> How often opponent shot attempts are blocked by the player.</li>
          <li><strong>DBPM (Defensive Box Plus Minus):</strong> An all-encompassing metric measuring defensive impact.</li>
          <li><strong>ORB% (Offensive Rebound Percentage):</strong> How often an available offensive rebound is grabbed by the player.</li>
          <li><strong>DRB% (Defensive Rebound Percentage):</strong> How often an available defensive rebound is grabbed by the player.</li>
        </ul>
      </section>

      {/* Hybrid Normalization Section */}
      <section className="about-section">
        <h2>What is Hybrid Normalization?</h2>
        <p>
          To ensure fair and meaningful player comparisons, we apply <strong>hybrid normalization</strong> to each statistical metric. This process transforms all stats onto a <strong>0-1 scale</strong>, making them comparable while maintaining differentiation between players of different skill levels.
        </p>
        
        <h3>How It Works:</h3>
        <ul>
          <li>Each metric undergoes both <strong>Min-Max Normalization</strong> and <strong>Percentile Rank Normalization</strong> independently.</li>
          <li><strong>Min-Max Normalization</strong> scales raw values between <strong>0 and 1</strong>, ensuring all stats fit within a uniform range.</li>
          <li><strong>Percentile Rank Normalization</strong> assigns a value based on a player's <strong>position within the dataset</strong>, capturing how they perform relative to others.</li>
          <li>A <strong>weighted average</strong> of these two normalization methods is applied, balancing absolute performance with relative ranking.</li>
          <li>This approach rewards players who perform <strong>above the median</strong> while still differentiating <strong>statistical outliers</strong>, preventing extreme values from skewing comparisons.</li>
        </ul>

        <p>
          By combining these techniques, the radar chart ensures that <strong>dominant players stand out</strong>, while players who are <strong>above average in a category</strong> are also recognized. This hybrid approach <strong>strikes a balance between fairness and differentiation</strong>, making player comparisons both intuitive and insightful.
        </p>

        <p>
          The normalized metric is calculated using the formula:
        </p>
        <p>
          <strong>Normalized(metric) =</strong> α × Percentile(metric) + (1 - α) × Min-Max(metric)
        </p>
        <p>
          Where: <br />
          α (alpha) = 0.65 <br />
          Percentile(metric) = The percentile rank of the metric across all players <br />
          Min-Max(metric) = The min-max normalized value of the metric across all players
        </p>

      </section>

      {/* Sources section */}
      <section className="about-section">
        <h2>Sources</h2>
        <ul>
          <li>
            Data was sourced from:{" "}
            <a href="https://www.kaggle.com/datasets/drgilermo/nba-players-stats" target="_blank" rel="noopener noreferrer">
              NBA Players Stats since 1950
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default About;
