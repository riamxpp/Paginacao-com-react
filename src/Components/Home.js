import React, { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import SearchInput from "./SearchInput";
import ShowResult from "./ShowResult";
import style from "./Home.module.css";

const Home = () => {
  const [date, setDate] = useState({});
  const [value, setValue] = useState("");
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${value}&page[limit]=12`;
  console.log(value);
  const { error, loading, request } = useFetch(url);

  useEffect(() => {
    setDate({});
    async function takeDate() {
      const { json } = await request();
      setDate(json);
      return;
    }
    if (value) {
      takeDate();
    }
  }, [value, request]);

  if (error) return <div>Ocorreu um erro!!!</div>;
  if (!date) return null;
  return (
    <div className={style.home}>
      <SearchInput value={value} setValue={setValue} />
      {loading && <div>Carregando</div>}
      {date.data && <ShowResult animes={date.data} />}
    </div>
  );
};

export default Home;
