import { collection, deleteDoc, doc, documentId, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosActiveNote, deleteNoteById } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";


export const startNewNote = () => {

    return async(  dispatch, getState ) => {
        
       
        dispatch( savingNewNote() );

        const {uid} = getState().auth;
        console.log(uid);
        
        const newNote = {
            title:'',
            body: '',
            date: new Date().getTime(),
        }

        // crea en firebaseBD la nota firebaseDB,`${ uid }/journal/notes, cuando se apreta
        // el + para nueva nota firebase crea el id para esa nota.
        const newDoc = doc( collection( firebaseDB,`${ uid }/journal/notes` ) )
        await setDoc( newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ) );

        dispatch( setActiveNote( newNote ) );

        
        
    }

    
}


export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        // const notes = await loadNotes( uid );
        // dispatch( setNotes( notes ) )
        const notes = await loadNotes(uid)
        dispatch( setNotes( notes ) )
    }
}



export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        
        const noteToFirestore = { ...note };
        delete noteToFirestore.id; //elimina una propiedad del noteToFirestore

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`); // solo la referencia al documento

        await setDoc(docRef, noteToFirestore, { merge: true }); // merge true, para que mantenga los datos que ya tiene el documento

        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = [] ) => {
    return async( dispatch) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file )); // almancea en un array las promesas de fileUpload
        }
        //disparar las promesas de fileUpload
        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch(setPhotosActiveNote( photosUrls ));
        

    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`); // solo la referencia al documento
        await deleteDoc(docRef); // no regresa nada pero borra la nota
        
        dispatch( deleteNoteById( note.id ) );
        

        // dispatch(startLoadingNotes());
    }
}