import React, { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import SearchInput from "./SearchInput";
import ShowResult from "./ShowResult";
import style from "./Home.module.css";
import Paginition from "./Paginition";
import qs from "qs";

const url = "https://kitsu.io/api/edge/anime?";
const api = "https://kitsu.io/api/edge/";
const LIMIT = 10;

const Home = () => {
  const [date, setDate] = useState({});
  const [value, setValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [resetOffset, setResetOffset] = useState(false);

  const { error, loading, request } = useFetch(url);

  useEffect(() => {
    setDate({});

    const query = {
      page: {
        limit: LIMIT,
        offset,
      },
    };

    if (value) {
      if (!resetOffset) {
        setResetOffset(true);
        setOffset(0);
      }
      query.filter = {
        text: value,
      };
    } else if (resetOffset) {
      if (value.length === 0) {
        setResetOffset(false);
        setOffset(0);
      }
    }

    async function takeDate() {
      const { json } = await request(`${api}anime?${qs.stringify(query)}`);
      setDate(json);
      return;
    }
    takeDate();
  }, [value, request, offset, resetOffset]);

  console.log(date);

  if (error) return <div>Ocorreu um erro!!!</div>;
  if (!date) return null;
  return (
    <div className={style.home}>
      <SearchInput value={value} setValue={setValue} />
      {loading && (
        <div className={style.loading}>
          <p>Carregando...</p>
        </div>
      )}
      {date.data && <ShowResult animes={date.data} />}
      {date.data && (
        <Paginition
          limit={LIMIT}
          total={date.meta.count}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
};

export default Home;
