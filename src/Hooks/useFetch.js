import { useCallback, useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = useCallback(async () => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url);
      json = await response.json();
      if (!response.ok) throw new Error();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      return { response, json };
    }
  }, [url]);

  return {
    error,
    loading,
    request,
  };
};

export default useFetch;