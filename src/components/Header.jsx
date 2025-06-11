import { useState } from "react";
import "./styles/Header.css";

const Header = ({ searchQuery, handleSearchChange}) => {

  return (
    <div className="Header">
      <div>
        <h1>Flixter</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder={"Search for a movie!"}
          value={searchQuery}
          onChange={handleSearchChange}
        ></input>
        <select name="sorting" id="sorting" onChange={() => {}}>
          <option value="name"> Sort by Name (A-Z)</option>
          <option value="likes"> Sort by Release Date </option>
          <option value="date"> Sort by Vote Average </option>
        </select>
      </div>
    </div>
  );
};

export default Header;
