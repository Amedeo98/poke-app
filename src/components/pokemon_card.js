import React, { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function PokemonCard({ pokemon }) {
  return (
    <Link to={"/pokemon/"+pokemon.name}>
    <div className="pokemon_card">
        <img className="pokemon_img" src={pokemon.sprites.front_default}></img>
        <div className='pokemon_name'>{pokemon.name}</div>
    </div>
    </Link>
  );
}

export default PokemonCard;
