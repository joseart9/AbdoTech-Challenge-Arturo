import React, { useState,  useEffect } from 'react';
import useFetch from '../utils/api';
import { sortData, filterData } from '../utils/helpers';
import Filter from './Filter';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';

export default function PokemonList() {
  // API call using custom hook
  const { data, loading, error } = useFetch('/pokemon');

  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');

  const filteredPokemon = filterData(pokemon, filter);
  const sortedPokemon = sortData(filteredPokemon, sort);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  }

  const handleSortChange = (sort) => {
    setSort(sort);
  }

  useEffect(() => {
    if (data) {
      setPokemon(data.results);
    }
  }, [data]);

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading API data!</div>
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Filter onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      <List
        style={{ background: '#f5f5f5', borderRadius: '10px', padding: '20px' }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={sortedPokemon}
        renderItem={poke => (
          <List.Item>
            <Link to={`/pokemon/${poke.name}`}>
              <Card
                hoverable
                style={{ borderRadius: '10px', transition: 'all 0.3s ease' }}
                cover={<img alt={poke.name} src={"https://freepngimg.com/download/pokemon/20250-9-pokeball-photo.png"} />}
                bodyStyle={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card.Meta title={poke.name.toUpperCase()} style={{ textAlign: 'center' }} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
