import { fireEvent, render, screen} from '@testing-library/react';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../../src/store/auth/authSlice';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticatedState } from '../../fixtures/authFixtures';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../../src/store/auth/thunks';

// mock al principio para que funcione
const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()


jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    }
}))


// dejarlo solamente y mockear todo react-redux sobreescribe todas las funciones de react-redux
// de esta forma se sobreescribe cualquier paquete
jest.mock('react-redux', () => ({
    
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(), 
    // se sobreescribe solamente useDispatch y regresa una funcion que recibe una funcion y la ejecuta
})) 


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})


describe('Pruebas en <LoginPage/>', () => { 
    
    beforeEach( () => jest.clearAllMocks() )

    test('debe de mostrar el componente correctamente', async () => { 
        
        render(
            <Provider store={store}>

                <MemoryRouter>
                    
                    <LoginPage/>
 
                </MemoryRouter>
            
            </Provider>
        )
        
        // screen.debug()
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
     })

     test('boton de google debe de llamar startGoogleSignIn', () => { 
        
        render(
            <Provider store={store}>

                <MemoryRouter>
                    
                    <LoginPage/>
 
                </MemoryRouter>
            
            </Provider>
        );

        const btnGoogle = screen.getByLabelText('google-btn')
        fireEvent.click(btnGoogle)

        expect(mockStartGoogleSignIn).toHaveBeenCalled()
      })

      test('submit debe de llamar startLoginWithEmailPassword', () => { 
        

        const email = 'damian@gmail.com'
        const password = '123456'
        render(
            <Provider store={store}>

                <MemoryRouter>
                    
                    <LoginPage/>
 
                </MemoryRouter>
            
            </Provider>
        );

        const emailField = screen.getByRole('textbox', {name: 'Correo'}) // agregamos cualquier nombre nos da todas las opciones de names
        fireEvent.change( emailField, { target: { name: 'email', value: email } } )

        const passwordField = screen.getByTestId('password') 
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } )
         
        const loginForm = screen.getByLabelText('submit-form') 
        fireEvent.submit(loginForm)

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({email: email, password: password})
    })





 })