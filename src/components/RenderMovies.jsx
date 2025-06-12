import MovieCard from "./MovieCard";

const RenderMovies = ({handleModalOpen, movieData, searchingMovies}) => {
     if (searchingMovies && movieData.length < 1) {
      return <div>No movies found!</div>;
    }
    if (!movieData) {
      return <div>Something went wrong</div>;
    }
    return movieData?.map((movie) => (
      <div key={movie.id} onClick={() => handleModalOpen(movie)}>
        <MovieCard
          imgURL={movie.poster_path}
          movieTitle={movie.title}
          rating={movie.vote_average}
        />
      </div>
    ));
}

export default RenderMovies