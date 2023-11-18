import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPokemonList, fetchEvolutionChain } from '../store/actions/pokemon';
import PokemonCard from './pokemon_card';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


function PokemonPage({ list, loading, error, evolution_chain, fetchPokemonList, fetchEvolutionChain }) {
    let { pokemonName } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [pokemonFromEvolution, setPokemonFromEvolution] = useState([]);

    useEffect(() => {
        if (list.length === 0) {
            fetchPokemonList();
        }
        else {
            const foundPokemon = list.find(p => p.name === pokemonName);
            if (foundPokemon) {
                setPokemon(foundPokemon);
                fetchEvolutionChain(foundPokemon.id)
            }
        }
    }, [pokemonName, list]);

    useEffect(() => {
        if (evolution_chain && evolution_chain[0]) {
            setPokemonFromEvolution(list.filter(p => evolution_chain.find(e => e == p.species.url)))
        }
    }, [evolution_chain])

    if (!pokemon) {
        return <div>Pokemon not found :(</div>;
    }

    return (
        <section className="flex_center_container">
            <div className='info_container'>
                <Link to="/" className='back'></Link>
                <div className='pokemon_card'>
                    <div className='flex_container'>
                        <h2>{pokemon.name}</h2>
                        <div className='pokedex_number'>{pokemon.id}</div>
                    </div>
                    <div className="front_back_images">
                        <img className="pokemon_img" src={pokemon.sprites.front_default}></img>
                        <img className="pokemon_img" src={pokemon.sprites.back_default}></img>
                    </div>
                    <br></br>
                    <div>
                        <h3>TYPES</h3>
                        <div className='flex_container'>
                            {pokemon.types.map(t =>
                                <div key={t.slot} className="type">{t.type.name}</div>
                            )}
                        </div>
                    </div>

                    <div className="stats">
                        <h3>STATS</h3>
                        <div className='flex_container'>
                            <div>
                                {pokemon.stats.map((s, index) =>
                                    <label key={index}>
                                        <strong>{s.stat.name}: </strong>
                                        <div>{s.base_stat}</div>
                                    </label>
                                )}
                            </div>
                            <div className='pokedex_number'>{pokemon.stats.map(s => s.base_stat).reduce((acc, s) => acc + s)}</div>
                        </div>
                    </div>
                    <br></br>
                    <div className='flex_center_container'>
                        <label>
                            <strong>height: </strong><div>{pokemon.height}</div>
                        </label>
                        <label>
                            <strong>weight: </strong><div>{pokemon.weight}</div>
                        </label>
                    </div>
                </div>
                <br></br>
                <div>
                    <h2>Evolution</h2>
                    <div className='evol_container'>
                        {pokemonFromEvolution.map(e =>
                            <div className='flex_center_container' key={e.id} >
                                <PokemonCard pokemon={e} current={e.name == pokemon.name} animated={true}></PokemonCard>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => {
    return {
        list: state.pokemon.list,
        loading: state.pokemon.loading,
        error: state.pokemon.error,
        evolution_chain: state.pokemon.evolution_chain
    };
};

export default connect(mapStateToProps, { fetchPokemonList, fetchEvolutionChain })(PokemonPage);
