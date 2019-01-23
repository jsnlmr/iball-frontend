import { createStore } from 'redux'

const initialState = {
  players: [],
  courts: [],
  favorites: [],
  currentUser: null,
  clickedCourt: null,
  hoverCourt: null,
}

const reducer = (state=initialState, action) => {
  return state
}

const store = createStore(reducer)

export default store
