import React, { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/pokemon.css';

function PokemonCard({ pokemon, current, animated }) {
  return (
    <Link to={"/pokemon/"+pokemon.name}>
    <div className={animated? 'pokemon_card animated' : 'pokemon_card'}>
        <img src={pokemon.sprites.front_default} className={current ? 'current' : ''}></img>
        <div className='pokemon_name'>{pokemon.name}</div>
    </div>
    </Link>
  );
}

export default PokemonCard;
