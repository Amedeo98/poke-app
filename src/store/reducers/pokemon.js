// reducers.js
import {
    FETCH_POKEMON_LIST_REQUEST, FETCH_POKEMON_LIST_SUCCESS, FETCH_POKEMON_LIST_FAILURE,
  } from '../actions/pokemon';
  
  const initialState = {
    list: [],
    loading: false,
    error: null,
  };
  
  const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POKEMON_LIST_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_POKEMON_LIST_SUCCESS:
        return { ...state, list: action.payload, loading: false };
      case FETCH_POKEMON_LIST_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };

export default pokemonReducer;
  