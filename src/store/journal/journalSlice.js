import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
     
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        
   },
   reducers: {
      savingNewNote: (state) => {
         state.isSaving = true;
      },
      addNewEmptyNote: (state, action) => {
         //payload va a tener la nota nueva
         state.notes.push(action.payload);
         state.isSaving = false;
      },
      setActiveNote: (state, action) => {
         //nota que quiero establecer en pantalla
         state.active = action.payload;
         state.messageSaved = '';
      },
      setNotes: (state, action) => {
         state.notes = action.payload;
      },
      setSaving: ( state ) => {
         state.isSaving = true;
         state.messageSaved = '';
      },
      updateNote: (state, action) => { // payload: note
         state.isSaving = false;
         state.notes = state.notes.map( note => {
            if(note.id === action.payload.id){
               return action.payload;
            }
            
            return note;

         });

         state.messageSaved = `${action.payload.title}, actualizada correctamente`;
      },
      setPhotosActiveNote: (state, action) => {

         state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
         state.isSaving = false;
      },
      clearNotesLogout: (state) => {
         state.isSaving = false;
         state.messageSaved= '';
         state.notes = [];
         state.active = null;
      },
      deleteNoteById: (state, action ) => {
         state.active = null;
         state.notes = state.notes.filter( note => note.id !== action.payload);
      },
   }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    setPhotosActiveNote,
    clearNotesLogout,
 } = journalSlice.actions;