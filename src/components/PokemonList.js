import React, { Component, useState,  useEffect } from 'react';
import useFetch from '../utils/api';
import { sortData, filterData } from '../utils/helpers';
import Filter from './Filter';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';

// Class component
/*
class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      filter: '',
      sort: 'name',
    };
  }

  componentDidMount() {
    fetchData('/pokemon')
      .then(data => {
        this.setState({ pokemon: data.results })})
      .catch(error => console.error(error));
  }

  handleFilterChange = (filter) => {
    this.setState({ filter });
  }

  handleSortChange = (sort) => {
    this.setState({ sort });
  }

 render() {
  const { pokemon, filter, sort } = this.state;
  const filteredPokemon = filterData(pokemon, filter);
  const sortedPokemon = sortData(filteredPokemon, sort);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Filter onFilterChange={this.handleFilterChange} onSortChange={this.handleSortChange} />
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
}

export default PokemonList;
*/

// Functional component

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');

  const filteredPokemon = filterData(pokemon, filter);
  const sortedPokemon = sortData(filteredPokemon, sort);

  const { data, loading, error } = useFetch('/pokemon');

  console.log(data);

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
