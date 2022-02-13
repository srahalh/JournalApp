import { types } from "../types/types";

/**
 * 
 * Tipo de objeto que voy a manejar 
 *  {
 *      uid: '8da9da9snmas'
 *      name: 'Said'
 * }
 */



export const authReducer = (state = {}, action) => {
        switch (action.type){
            case types.login:
                return {
                    uid: action.payload.uid,
                    name: action.payload.displayName
                }
            case types.logout:
                return { }

            default:
                return state;
        }
};