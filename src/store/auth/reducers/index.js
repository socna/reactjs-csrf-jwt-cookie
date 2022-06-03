import { combineReducers } from 'redux';
  
import { verifyTokenReducer } from './verify-token';

export default combineReducers({
    token: verifyTokenReducer
});