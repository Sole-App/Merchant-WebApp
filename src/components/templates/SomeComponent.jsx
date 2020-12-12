import React, { useState, useEffect } from "react";

const SomeComponent = (props) => {
  const [someData, setSomeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/some-data")
      .then((response) => response.json())
      .then((data) => setSomeData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <React.Fragment>
      {loading && <div>{"Loading..."}</div>}
      {!loading && error && <div>{`Error: ${error}`}</div>}
      {!loading && !error && someData && (
        <div>{/* INSERT SOME AMAZING UI */}</div>
      )}
    </React.Fragment>
  );
};
