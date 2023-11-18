import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPokemonList } from '../store/actions/pokemon';

function PokemonPage({ list, loading, error, fetchPokemonList }) {
    let { pokemonName } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        if (list.length === 0) {
            fetchPokemonList();
        }
        else {
            const foundPokemon = list.find(p => p.name === pokemonName);
            setPokemon(foundPokemon);
        }
    }, [pokemonName, list]);

    if (!pokemon) {
        return <div>Pokemon not found :(</div>;
    }

    return (
        <div className="pokemon_card">
            <img className="pokemon_img" src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className='pokemon_name'>{pokemon.name}</div>
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

export default connect(mapStateToProps, { fetchPokemonList })(PokemonPage);
