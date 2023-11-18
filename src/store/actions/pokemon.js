export const FETCH_POKEMON_LIST_REQUEST = 'FETCH_POKEMON_LIST_REQUEST';
export const FETCH_POKEMON_LIST_SUCCESS = 'FETCH_POKEMON_LIST_SUCCESS';
export const FETCH_POKEMON_LIST_FAILURE = 'FETCH_POKEMON_LIST_FAILURE';

export const FETCH_EVOL_REQUEST = 'FETCH_EVOL_REQUEST';
export const FETCH_EVOL_SUCCESS = 'FETCH_EVOL_SUCCESS';
export const FETCH_EVOL_FAILURE = 'FETCH_EVOL_FAILURE';

const updatePokemonList = (list) => {
    return {
        type: FETCH_POKEMON_LIST_SUCCESS,
        payload: list
    }
}

async function getAllDataForPokemonList(list) {
    let completed_list = [];
    for(let e of list) {
        const res = await fetch(e.url); 
        if (!res.ok) {
            throw new Error('Error in request');
        }  //single pokemon has url for fetching its main info (sort of mongo populate)
        const pokemonData = await res.json()
        completed_list.push(pokemonData);
    }

    return completed_list;
}

export const fetchPokemonList = () => {
    return async dispatch => {
        dispatch({ type: FETCH_POKEMON_LIST_REQUEST });
        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
            if (!res.ok) {
                throw new Error('Error in request');
            }    
            const list = await res.json();
            const completed_list = await getAllDataForPokemonList(list.results || [])
            dispatch(updatePokemonList(completed_list));
        }     
        catch (error) {
            dispatch({ type: FETCH_POKEMON_LIST_FAILURE, payload: error.message });
        }    
    }    
}; 

function findEvolution(chain, evol) {
    if(evol && evol.species && evol.species.url){
        chain.push(evol.species.url)
    }
    if(evol && evol.evolves_to){
        for(let ev of evol.evolves_to){
            chain = findEvolution(chain, ev)
        }
    }
    return chain;
}

const updatePokemonInfo = (chain) => {
    return {
        type: FETCH_EVOL_SUCCESS,
        payload: chain
    }
}


export const fetchEvolutionChain = (id) => {
    return async dispatch => {
        dispatch({ type: FETCH_EVOL_REQUEST });
        try {
            const res = await fetch('https://pokeapi.co/api/v2/pokemon-species/'+id);
            if (!res.ok) {
                throw new Error('Error in request');
            }    
            const specie = await res.json();
            const evol = await fetch(specie?.evolution_chain?.url)
            if (!evol.ok) {
                throw new Error('Error in request');
            }  
            const evolObj = await evol.json();
            let chain = [];
            chain = findEvolution(chain, evolObj.chain)

            dispatch(updatePokemonInfo(chain))
        
        }     
        catch (error) {
            dispatch({ type: FETCH_EVOL_FAILURE, payload: error.message });
        }    
    }     
}




