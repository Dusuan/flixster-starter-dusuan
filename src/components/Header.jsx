import { useState } from "react";
import "./styles/Header.css";

const Header = ({
  searchQuery,
  handleSearchChange,
  handleSearchMovies,
  handleCurrentlyPlaying,
  sort,
  showSidebar,
  setShowSidebar,

  setSort,
}) => {


  const handleOpenSideBar = () =>{
    setShowSidebar(true);
  }

  return (
    <div className="Header">
      <div>
        <h1>Flixter</h1>
      </div>
      <div>
        <button onClick={handleSearchMovies}>Search</button>
        <button onClick={handleCurrentlyPlaying}>Currently Playing</button>
        <input
          type="text"
          placeholder={"Search for a movie!"}
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchMovies();
            }
          }}
        ></input>
        <select
          name="sorting"
          id="sorting"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
          }}
        >
          <option value="default"> Default </option>
          <option value="byName"> Sort by Name (A-Z)</option>
          <option value="byReleaseDateDesc"> Sort by Release Date </option>
          <option value="byVoteAvgDesc"> Sort by Vote Average </option>
        </select>
        <button onClick={handleOpenSideBar}>Open Sidebar</button>
      </div>
    </div>
  );
};

export default Header;
