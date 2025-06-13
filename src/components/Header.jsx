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
  const handleOpenSideBar = () => {
    setShowSidebar(true);
  };

  return (
    <div className="Header">
      <div>
        <h1>Flixter</h1>
      </div>
      <div className="HeaderContent">
        <div>
          <button onClick={handleSearchMovies}>Search</button>
          <button onClick={handleCurrentlyPlaying}>Clear</button>
        </div>
        <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
        <div>
          <button onClick={handleOpenSideBar}>Open Sidebar</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
