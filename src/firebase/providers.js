import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";




const googleProvider = new GoogleAuthProvider();


export const singInWithGoogle = async() => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // como tomar las credenciales
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log({credentials});

        const { displayName, email, photoURL, uid } = result.user;
        // console.log({user}); // se ve todo los datos 
        return {
            ok: true,
            // user info
            displayName, email, photoURL, uid
        }
        
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registrerUserWithEmailPassword = async ({email, password, displayName}) => {

    try {
        
        
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password ); // esta funcion loguea al usuario
        const { uid, photoURL } = resp.user;
        // actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, {displayName} ); // para saber el usuario
        return {
            ok:true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        console.log(error);
        
        return { ok: false, errorMessage: 'El correo ya fue registrado con anterioridad.' }
    }

}

export const loginWithEmailPassword = async({email,password}) => {
    
    try {
        // signInWithEmailAndPassword funcion a llamar de firebase
    const resp = await signInWithEmailAndPassword(FirebaseAuth,email,password);
    const {uid, displayName, photoURL} = resp.user;
    
    return {
        ok:true,
        uid,photoURL,displayName
    }
    
    } catch (error) {
        console.log(error);
        
        return { ok: false, errorMessage: 'FirebaseError: Firebase: Error (auth/invalid-credential).' }
    }
    
    
}



export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}






