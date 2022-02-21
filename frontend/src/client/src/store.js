import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import appReducer from './reducers';

const store = createStore(appReducer, applyMiddleware(thunk));

export default store;