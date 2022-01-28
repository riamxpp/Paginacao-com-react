import React, { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import SearchInput from "./SearchInput";
import ShowResult from "./ShowResult";
import style from "./Home.module.css";
import Paginition from "./Paginition";
import qs from "qs";

const url = "https://kitsu.io/api/edge/anime?";
const api = "https://kitsu.io/api/edge/";
const LIMIT = 12;

const Home = () => {
  const [date, setDate] = useState({});
  const [value, setValue] = useState("");
  const [offset, setOffset] = useState(0);

  const { error, loading, request } = useFetch(url);

  console.log(date);

  useEffect(() => {
    setDate({});

    const query = {
      page: {
        limit: LIMIT,
        offset,
      },
    };

    if (value) {
      query.filter = {
        text: value,
      };
    }

    async function takeDate() {
      const { json } = await request(`${api}anime?${qs.stringify(query)}`);
      setDate(json);
      return;
    }
    takeDate();
  }, [value, request, offset]);

  if (error) return <div>Ocorreu um erro!!!</div>;
  if (!date) return null;
  return (
    <div className={style.home}>
      <SearchInput value={value} setValue={setValue} />
      {loading && <div>Carregando</div>}
      {date.data && <ShowResult animes={date.data} />}
      {date.data && (
        <Paginition
          limit={LIMIT}
          total={date.data.count}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
};

export default Home;
