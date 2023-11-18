// actions.js
export const FETCH_POKEMON_LIST_REQUEST = 'FETCH_POKEMON_LIST_REQUEST';
export const FETCH_POKEMON_LIST_SUCCESS = 'FETCH_POKEMON_LIST_SUCCESS';
export const FETCH_POKEMON_LIST_FAILURE = 'FETCH_POKEMON_LIST_FAILURE';

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
            throw new Error('Errore nella richiesta');
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
                throw new Error('Errore nella richiesta');
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


