import { useState } from "react";
import "./styles/MovieCard.css";

const MovieCard = ({ imgURL, movieTitle, rating }) => {
  const handleSave = (e) => {
    console.log("saved");
    e.stopPropagation();
  };
  const handleLike = (e) => {
    console.log("liked");
    e.stopPropagation();
  };
  return (
    <div className="MovieCard">
      <div className="CardImg">
        <img
          src={`${
            imgURL !== null
              ? `https://image.tmdb.org/t/p/w500${imgURL}`
              : "../../public/noimage.png"
          }`}
        />
      </div>
      <div>
        <h3>{movieTitle}</h3>
        <div className="rating">
          {/* Star icon here */}
          <svg
            height={"20px"}
            width={"20px"}
            xmlns="http://www.w3.org/2000/svg"
            fill={"#FFD700"}
            viewBox="0 0 576 512"
          >
            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
          <p>{Math.round(rating * 10) / 100}</p>
          <svg
            onClick={handleLike}
            height={"20px"}
            width={"20px"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill={false ? "red" : "#555555"}
          >
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
          </svg>
          <svg
            onClick={handleSave}
            className="save"
            height={"20px"}
            width={"20px"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="#FFFFFF"
          >
            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
          </svg>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MovieCard;
