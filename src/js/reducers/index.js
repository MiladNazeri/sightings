import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sightings from './reducer-sightings.js'
import signin from './reducer-signin.js'
import whales from './reducer-whale.js'

const rootReducer = combineReducers({
  form: formReducer,
  sightings,
  signin,
  whales
  /* your reducers */
});

export default rootReducer;
