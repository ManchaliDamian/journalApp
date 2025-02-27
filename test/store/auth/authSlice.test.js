import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";


describe('Pruebas en el authSlice', () => { 
    

    test('debe de regresar el estado inicial y llamarse auth', () => {

        
        const state = authSlice.reducer(initialState, {}); //el estado inicial y un objeto vacio
        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');
        
        
     });

     test('debe de realizar la autenticacion', () => { 
        
        
        
        const state = authSlice.reducer( initialState, login(demoUser));

        expect(state).toEqual({
            status: 'authenticated', //'checking', // , y authenticated
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    })
    test('debe de realizar el logout', () => { 
        
        const state = authSlice.reducer( authenticatedState, logout());

        expect(state).toEqual({
            status: 'not-authenticated', //'checking', // , y authenticated
            uid: null,
            email: null,
            displayName:null,
            photoURL: null,
            errorMessage: undefined, 
        });


     })
    test('debe de realizar el logout con argumentos', () => { 
        
        const errorMessage = 'Faltan credenciales'
        const state = authSlice.reducer( authenticatedState, logout( {errorMessage}));

        expect(state).toEqual({
            status: 'not-authenticated', //'checking', // , y authenticated
            uid: null,
            email: null,
            displayName:null,
            photoURL: null,
            errorMessage: errorMessage, 
        });


     })

     test('debe de cambiar el estado a Checking', () => { 
        
        const state = authSlice.reducer( authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');
      })
});