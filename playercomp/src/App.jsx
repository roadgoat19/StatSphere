import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlayerComparisonPage from "./pages/PlayerComparisonPage"; // Your main page
import About from "./pages/About"; // Your about page
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content"> 
        <Routes>
          <Route path="/" element={<PlayerComparisonPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Analytics />
    </Router>
  );
};

export default App;
