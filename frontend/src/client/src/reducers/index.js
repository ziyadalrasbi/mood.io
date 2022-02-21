import { combineReducers } from "redux";
import { spotifyReducer } from "./spotifyReducer";
import { dbReducer } from "./dbReducer";
import { detectReducer } from "./detectReducer";

const config = {
    spotifyReducer: spotifyReducer,
    dbReducer: dbReducer,
    detectReducer: detectReducer
}

const appReducer = combineReducers(config);

export default appReducer;