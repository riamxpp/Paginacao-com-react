import React from "react";
import style from "./Paginition.module.css";

// max de booes
const MAX_ITEMS = 9;
// Quantos botoes irão ficar a esquerda do meu botao com a pág atual
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Paginition = ({ limit, total, offset, setOffset }) => {
  // Verifica se meu offset é zero, se for zero está na página 1
  const currentPage = offset ? offset / limit + 1 : 1;
  // Pega meu total e divide pelo meu limite, arredondando pra cima
  const totalPages = Math.ceil(total / limit);
  // Para saber qual o meu primeiro botão, max vai procurar o maior valor entre os dois itens passados
  // por exemplo, se eu estou na pág 45 e diminui MAX_LEFT(4) fica 41, obviamente meu firstPage será 41, porem se
  // eu estiver na pág 3 e diminuir 4 vai ficar -1 então o maior num será 1, e assim tbm sera com a pag 1,2...
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
      {/* Cria um array com a qnt MAX_ITEMS, porem o array será preenchido com undefined  */}
      {/* Math.min pegar o menor numero de pages */}
      {Array.from({ length: MAX_ITEMS })
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
