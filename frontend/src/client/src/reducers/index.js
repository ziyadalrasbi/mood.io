import { combineReducers } from "redux";
import { spotifyReducer } from "./spotifyReducer";
import { dbReducer } from "./dbReducer";

const config = {
    spotifyReducer: spotifyReducer,
    dbReducer: dbReducer
}

const appReducer = combineReducers(config);

export default appReducer;