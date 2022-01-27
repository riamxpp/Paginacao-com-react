import React from "react";
import style from "./ShowResult.module.css";

const ShowResult = (props) => {
  return (
    <section className={style.showResult}>
      {props.animes.map((anime) => (
        <div key={anime.id}>
          <h4 className={style.title}>{anime.attributes.titles.en}</h4>
          <div className={style.img}>
            <img
              src={anime.attributes.posterImage.small}
              alt={anime.attributes.slug}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ShowResult;
