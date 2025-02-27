import { loginWithEmailPassword, logoutFirebase, registrerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";


jest.mock('../../../src/firebase/providers'); // hace el mock completo a todo lo que está siendo exportado ahí



describe('Pruebas en AuthThunks', () => { 
    
    const dispatch = jest.fn();
    
    beforeEach( () =>  jest.clearAllMocks() )

    test('debe de invocar el checkingCredentials ', async () => { 
        

        await checkingAuthentication()(dispatch)

        


        // modif
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        
         

     })


     test('startGoogleSignIn debe de llamar checkingCredentials y login', async() => { 
        
        const loginData = { ok: true, ...demoUser}
        await singInWithGoogle.mockResolvedValue(loginData)
        
        // thunks a probar
        await startGoogleSignIn()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
      })

     test('startGoogleSignIn debe de llamar checkingCredentials y logout-error', async() => { 
        
        const loginData = { ok: false, errorMessage:'error'}
        await singInWithGoogle.mockResolvedValue(loginData)
        
        // thunks a probar
        await startGoogleSignIn()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())


        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage)) 
      })


      test('startLoginWithEmailPassword debe de llamar checkingCredentials y login ', async() => { 
        

        const loginData = { ok: true, ...demoUser}
        const formData = { email: demoUser.email, password: demoUser.password}

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
       })



      test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login ', async() => { 
        

        const loginData = { ok: true, ...demoUser}
        const formData = { email: demoUser.email, password: demoUser.password, displayName: demoUser.displayName, photoURL: demoUser.photoURL, uid: demoUser.uid}

        await registrerUserWithEmailPassword.mockResolvedValue(loginData)

        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(formData))
       })




       test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => { 
        
        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())

        })

 })