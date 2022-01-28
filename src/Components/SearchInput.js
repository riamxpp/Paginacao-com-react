import React, { useState } from "react";
import useDebounce from "../Hooks/useDebounce";
import style from "./SearchInput.module.css";

const SearchInput = ({ value, setValue }) => {
  const [displayValue, setDisplayValue] = useState(value);

  const debounceChange = useDebounce(setValue, 500);

  function handleChange({ target }) {
    setDisplayValue(target.value);
    debounceChange(target.value);
  }

  return (
    <input
      type="search"
      className={style.input}
      onChange={handleChange}
      value={displayValue}
      placeholder="Anime"
    ></input>
  );
};

export default SearchInput;
