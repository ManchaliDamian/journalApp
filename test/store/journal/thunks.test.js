import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { firebaseDB } from "../../../src/firebase/config";

describe('Pruebas en Journal Thunks', () => { 
    
    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach( () => jest.clearAllMocks() );
    
    test('startNewNote debe de crear una nueva nota en blanco', async () => { 
        
        const uid = 'TESTING';
        getState.mockReturnValue({ auth: { uid : uid } }); // va a retornar el uid de la autenticacion
        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote());
        expect (dispatch).toHaveBeenCalledWith( addNewEmptyNote({
            title: '',
            body: '',
            date: expect.any(Number),
            id: expect.any(String)
        
        }) );
        expect (dispatch).toHaveBeenCalledWith( setActiveNote({
            title: '',
            body: '',
            date: expect.any(Number),
            id: expect.any(String)
        
        }) );
        // borrar de firebase 
        const collectionRef = collection( firebaseDB, `${uid}/journal/notes` );
        const docs = await getDocs( collectionRef );

        const deletePromises = []

        docs.forEach( doc => {
            deletePromises.push( deleteDoc( doc.ref ) );
        });
        
        await Promise.all( deletePromises ); // borra todas las notas que tenemos en la colleccion
        jest.setTimeout(10000); // Aumenta el timeout a 10 segundos

     })



 })