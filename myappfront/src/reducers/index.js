import {combineReducers} from "redux";
import {user} from "./user";
import {modele} from "./modele";
import {produit} from "./produit";

export const reducers = combineReducers({
    user,
    modele,
    produit
});