import React from 'react';
import useFetch from '../utils/api';
import { Card } from 'antd';

export default function PokemonDetail( { match } ) {
  // API call using custom hook
  const { data , loading, error } = useFetch('/pokemon/' + match.params.id);

  // Loading and error handling
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