import { useState, useEffect } from 'react';

// Custom hook for API calls
export default function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2${endpoint}`);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}
