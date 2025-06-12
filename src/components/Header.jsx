import { useState } from "react";
import "./styles/Header.css";

const Header = ({ searchQuery, handleSearchChange, sort, setSort}) => {

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
        <select name="sorting" id="sorting" value={sort} onChange={(e) => {setSort(e.target.value)}}>
          <option value="default"> Default </option>
          <option value="byName"> Sort by Name (A-Z)</option>
          <option value="byReleaseDateDesc"> Sort by Release Date </option>
          <option value="byVoteAvgDesc"> Sort by Vote Average </option>
        </select>
      </div>
    </div>
  );
};

export default Header;
