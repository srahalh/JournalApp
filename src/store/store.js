import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//Import de reducer
import { authReducer } from "../reducers/authReducer";
import {uiReducer} from '../reducers/uiReducer'
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//Reducer Root
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
});


export const store = createStore(reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
    );


/**
 * La linea 15 como segundo parametro habilita las herramientas de desarrollo
 *  y el thunk se usa como meddleware para conexion asyc
 */