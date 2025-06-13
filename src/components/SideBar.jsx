import "./styles/SideBar.css";
import MovieSideBar from "./MovieSideBar";
const SideBar = ({
  movieData,
  setMovieData,
  setShowSidebar,
  handleCurrentlyPlaying,
  fetchDataCurrPlaying,
}) => {
  const handleSetHideBar = () => {
    setShowSidebar(false);
  };
  const handleHomeView = () => { 
    fetchDataCurrPlaying()
  }
  const handleLikedMovies = () => {
    const LikedMovies = movieData.filter((movie) => movie.isLiked);
    setMovieData(LikedMovies);
  };
  const handleWatchedMovies = () => {
    const WatchedMovies = movieData.filter((movie) => movie.isWatched);
    setMovieData(WatchedMovies);
  };

  return (
    <div className="SideBar">
      <div className="SideBarContent">
        <div>
          <h1 className="TitleButton" onClick={handleHomeView}>
            Home
          </h1>

          <h1 className="TitleButton" onClick={handleLikedMovies}>
            Liked movies
          </h1>
          <h1 className="TitleButton" onClick={handleWatchedMovies}>
            Watched movies
          </h1>
        </div>
        <div></div>
        <button className="btn"onClick={handleSetHideBar}>Close</button>
      </div>
    </div>
  );
};

export default SideBar;
