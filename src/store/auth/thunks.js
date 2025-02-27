
//los thunks son acciones que tienen tareas asincronas 

import { loginWithEmailPassword, logoutFirebase, registrerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password) => {
    return async( dispatch) => {

        dispatch( checkingCredentials())



    }
}
export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await singInWithGoogle();
        if(!result.ok) return dispatch( logout( result.errorMessage ) )
        
        dispatch( login( result )) // loguea al usuario
        
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        const { ok, uid, photoURL, errorMessage } = await registrerUserWithEmailPassword({email, password, displayName})
        
        if(!ok ) return dispatch( logout({errorMessage}))
        
        dispatch( login( {uid,displayName,email,photoURL} )) // loguea al usuario    
    }

}



export const startLoginWithEmailPassword = ({email, password}) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() ); //estado de checking
        
        const resp = await loginWithEmailPassword({email, password})
        
        
        if(!resp.ok ) return dispatch( logout(resp))
        
        dispatch( login( resp )) // loguea al usuario    
    }


}


export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch(clearNotesLogout())
        dispatch( logout() )
    }
}


