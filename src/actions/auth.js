import {firebase, googleAuthProvider } from '../firebase/firebase-config'
import {types} from '../types/types'
import {uiStartLoading, uiFinishLoading} from '../actions/ui'
import Swal from 'sweetalert2'

export const startLoginEmailPassword = (email, password) =>{
    return (dispatch /*Este dispach lo provee el tunk (Middelware) */) =>{
        dispatch(uiStartLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( ({user} /*Viene del objeto que retorna firebase en la auth, se desestructura user para luego extraer datos*/) => {
            dispatch(
            login(user.uid, user.displayName)
            );
            dispatch(uiFinishLoading());
        }).catch(
            e=>{
                console.log(e);
                dispatch(uiFinishLoading());
                Swal.fire('Error', e.message, 'error')
            }
        )
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) =>{
        dispatch(uiStartLoading());
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then( async ({user}) => {
            await user.updateProfile({displayName: name})
            dispatch(
               login(user.uid, user.displayName)
            )
            dispatch(uiFinishLoading());
        }).catch(
            e=>{
                console.log(e);
                dispatch(uiFinishLoading());
                Swal.fire('Error', e.message, 'error');
            }
        )
    }
}


export const startGoogleLogin = () =>{
    return (dispatch) =>{
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then( ({user}) => {
            dispatch(
               login(user.uid, user.displayName)
            )
        })
    }
}

export const login = (uid, displayName) =>{
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () =>{
    return async(dispatch) =>{
        await firebase.auth().signOut();
        dispatch( logout() );
    }
}

   
export const logout = () =>({
    type: types.logout
})