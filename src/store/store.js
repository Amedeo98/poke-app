import { createStore } from 'redux'

function counterReducer(state = { value: 0 }, action) {
    switch (action.type) {
      case 'counter/incremented':
        return { value: state.value + 1 }
      case 'counter/decremented':
        return { value: state.value - 1 }
      default:
        return state
    }
  }
  
  // Create a Redux store holding the state of your app.
  // Its API is { subscribe, dispatch, getState }.
  const store = createStore(counterReducer)
  
  // You can use subscribe() to update the UI in response to state changes.
  // Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
  // There may be additional use cases where it's helpful to subscribe as well.
  
  store.subscribe(() => console.log(store.getState()))
  
  // The only way to mutate the internal state is to dispatch an action.
  // The actions can be serialized, logged or stored and later replayed.
  store.dispatch({ type: 'counter/incremented' })
  // {value: 1}
  store.dispatch({ type: 'counter/incremented' })
  // {value: 2}
  store.dispatch({ type: 'counter/decremented' })
  // {value: 1}

  export default store;