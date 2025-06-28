import { IconButton, Typography } from '@mui/material'; // Typography no se usa actualmente, puedes quitarla si no la necesitas
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; // ¡Importa useEffect!

// Importaciones de Firebase Firestore para el tiempo real
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; 
import { firebaseDB } from '../../firebase/config'; // Asegúrate de que esta ruta sea correcta para tu config.js

// Importa las acciones de Redux necesarias
import { startNewNote } from '../../store/journal/thunks'; // setNotes es una acción de tu slice, no de thunks.
                                                                     // Deberías importar { setNotes } de '../../store/journal/journalSlice';
                                                                     // ¡CORRECCIÓN IMPORTANTE ABAJO!
import { setNotes } from '../../store/journal/journalSlice'; // Asegúrate de que esta ruta sea correcta para tu journalSlice.js
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';


export const JournalPage = () => {
    const dispatch = useDispatch();
    const { isSaving, active, notes } = useSelector(state => state.journal); // También necesitamos 'notes' y el 'uid' para cargar las notas
    const { uid } = useSelector(state => state.auth); // Obtener el UID del usuario logueado

    const onClickNewNote = () => {
        dispatch(startNewNote());
    };

    // --- Lógica para la carga de notas en tiempo real ---
    useEffect(() => {
        // Asegúrate de que tenemos un UID antes de intentar cargar notas
        if (!uid) {
            console.warn("UID no disponible. No se pueden cargar las notas para este usuario.");
            return;
        }

        // 1. Define la referencia a la colección de notas del usuario
        // La estructura típica es `users/{uid}/journal/notes`
        const notesCollectionRef = collection(firebaseDB, `${uid}/journal/notes`);
        
        // 2. Define la consulta, ordenando por fecha (ej. las más recientes primero)
        const q = query(notesCollectionRef, orderBy('date', 'desc'));

        // 3. Establece el listener en tiempo real con onSnapshot
        // onSnapshot retorna una función de "unsubscribe"
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedNotes = []; // Usamos un nombre diferente para evitar conflicto con el 'notes' del useSelector
            // Itera sobre los documentos en el snapshot y construye el array de notas
            snapshot.forEach((doc) => {
                fetchedNotes.push({
                    id: doc.id,         // El ID del documento de Firestore
                    ...doc.data()       // Los demás datos de la nota
                });
            });
            // Despacha la acción para actualizar el estado de Redux con las nuevas notas
            // ¡IMPORTANTE!: `setNotes` debería venir de tu `journalSlice.js`
            dispatch(setNotes(fetchedNotes)); 
        }, (error) => {
            // Manejo de errores en caso de que el listener falle
            console.error("Error al escuchar notas en tiempo real:", error);
            // Podrías dispatch una acción de error o mostrar un mensaje al usuario
        });

        // Función de limpieza para desuscribirse del listener cuando el componente se desmonta
        return () => {
            console.log("Desuscribiendo del listener de notas de Firestore.");
            unsubscribe();
        };

    }, [uid, dispatch]); // El efecto se ejecuta si el UID del usuario o el dispatch cambian
    // --- Fin de la lógica para la carga de notas en tiempo real ---

    return (
        <JournalLayout>
            {/* Si hay una nota activa, muestra el editor; de lo contrario, la vista de "Nada seleccionado" */}
            {
                (!!active) // La doble negación (!!) convierte 'active' en un booleano explícito
                    ? <NoteView/>
                    : <NothingSelectedView/>
            }
            
            <IconButton
                onClick={onClickNewNote}
                disabled={isSaving} // Asegúrate de que este 'disabled' funcione como esperas
                size='large'
                sx={{
                    color:'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.8},
                    position:'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx= {{fontSize: 30}}/>
            </IconButton>

        </JournalLayout>
    );
};