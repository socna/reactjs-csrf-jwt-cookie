import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk'
import logger from 'redux-logger';

import reducers from "./reducers";

import { persistStore/*, persistReducer*/ } from "redux-persist";



const middlewares = [thunk];

// if (process.env.REACT_APP_ENV === 'development') {
    middlewares.push(logger);
// }

export const store = createStore(reducers, applyMiddleware(...middlewares));
export const persist = persistStore(store)

