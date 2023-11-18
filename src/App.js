import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/home_page';
import PokemonPage from './components/pokemon_page'
import NotFoundPage from './components/not_found_page';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import pokemonReducer from './store/reducers/pokemon';
import Header from './components/header';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

function App() {
  return (
    <Provider store={store}>
    <Router>
    <Header/>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/pokemon/:pokemonName" component={PokemonPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
