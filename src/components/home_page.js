import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPokemonList } from '../store/actions/pokemon';
import PokemonCard from '../components/pokemon_card';

function HomePage({ list, loading, error, fetchPokemonList }) {
  useEffect(() => {
    fetchPokemonList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="homepage">
      <h1>Pokemon List</h1>
      <div className="pokemon_container">
        {list && list.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon}></PokemonCard>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    list: state.pokemon.list,
    loading: state.pokemon.loading,
    error: state.pokemon.error,
  };
};

export default connect(mapStateToProps, { fetchPokemonList })(HomePage);
