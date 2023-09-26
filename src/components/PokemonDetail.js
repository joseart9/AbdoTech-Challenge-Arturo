import React, { Component, useEffect, useState } from 'react';
import useFetch from '../utils/api';
import { Card } from 'antd';

// Class component
/*
class PokemonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    fetchData(`/pokemon/${match.params.id}`)
      .then(data => this.setState({ pokemon: data }))
      .catch(error => console.error(error));
  }

  render() {
    const { pokemon } = this.state;

    if (!pokemon) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card 
          style={{ width: 300 }}
          cover={<img alt={pokemon.name} src={pokemon.sprites?.front_default} />}
        >
          <Card.Meta 
            title={pokemon.name} 
            description={
              <>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <p>Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
              </>
            }
          />
        </Card>
      </div>
    );
  }
}

export default PokemonDetail;
*/

// Functional component

export default function PokemonDetail( { match } ) {
  const { data , loading, error } = useFetch('/pokemon/' + match.params.id);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading API data!</div>
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card 
        style={{ width: 300 }}
        cover={<img alt={data.name} src={data.sprites?.front_default} />}
      >
        <Card.Meta 
          title={data.name} 
          description={
            <>
              <p>Height: {data.height}</p>
              <p>Weight: {data.weight}</p>
              <p>Type: {data.types.map(type => type.type.name).join(', ')}</p>
            </>
          }
        />
      </Card>
    </div>
  );
}