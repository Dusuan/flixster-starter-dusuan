const MovieSideBar = ({ name, score }) => {
  return (
    <div className="MovieSideBar">
      <div>
        <p>{name}</p>
        <p>{score}</p>
      </div>
    </div>
  );
};
export default MovieSideBar;
