import React from "react";
import style from "./Paginition.module.css";

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Paginition = ({ limit, total, offset, setOffset }) => {
  const currentPage = offset ? offset / limit + 1 : 1;
  const totalPages = Math.ceil(total / limit);
  const firstPage = Math.max(currentPage - MAX_LEFT, 1);

  function onPageChange(page) {
    setOffset((page - 1) * limit);
  }

  return (
    <ul className={style.paginacao}>
      <li>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </button>
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, totalPages) })
        .map((_, index) => index + firstPage)
        .map((page) => (
          <li key={page}>
            <button
              className={currentPage === page ? style.actualPage : null}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      <li>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Próxima
        </button>
      </li>
    </ul>
  );
};

export default Paginition;
