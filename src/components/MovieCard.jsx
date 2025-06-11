import { useState } from "react";
import "./styles/MovieCard.css";

const MovieCard = ({ imgURL, movieTitle, rating }) => {
  return (
    <div className="MovieCard">
      <div className="CardImg">
        <img src={`${imgURL !== null ? `https://image.tmdb.org/t/p/w500${imgURL}` : "../../public/noimage.png"}`} />
      </div>
      <div>
        <h3>{movieTitle}</h3>
        <div>
          {/* Star icon here */}
          <p>{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
