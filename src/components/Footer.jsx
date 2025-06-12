import { useState } from "react";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div>
        <p>All rights reserved to Flixster</p>
      </div>
      <div>
        <div>
          <a target="_blank" href={`https://www.themoviedb.org/?language=en-US`}>
            <p>TMDB (Where all the data was obtained)</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
