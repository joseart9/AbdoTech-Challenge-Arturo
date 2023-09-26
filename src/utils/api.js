import { useState, useEffect } from 'react';

async function fetchData(endpoint) {
  return fetch(`https://pokeapi.co/api/v2${endpoint}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

// Custom hook for API calls
export default function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect( () => {
    fetchData(endpoint)
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
  }, []);

  return { data, loading, error };
}
