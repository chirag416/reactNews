import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import Favorites from "./components/Favorites";

const App = () => {
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCategory("");
  };

  return (
    <Router>
      <Navbar onCategoryChange={handleCategoryChange} onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Cards category={category} searchQuery={searchQuery} />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
