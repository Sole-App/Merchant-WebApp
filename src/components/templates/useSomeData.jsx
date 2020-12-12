import React, { useState, useEffect } from "react";

const useSomeData = () => {
  const cachedData = JSON.parse(localStorage.getItem("someData"));
  const [someData, setSomeData] = useState(cachedData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!someData) {
      setLoading(true);
      fetch("/some-data")
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("someData", JSON.stringify(data));
          return setSomeData(data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, []);

  return { someData, loading, error };
};