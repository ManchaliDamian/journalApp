import { Delete, DeleteOutlined, SaveAltOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal'
import Swal from 'sweetalert2'
import'sweetalert2/dist/sweetalert2.css';


export const NoteView = () => {
    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving} = useSelector(state => state.journal)
    const {body, title, date,  onInputChange, formState} = useForm ( note )


    const dateString = useMemo( () => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])


    const fileInputRef = useRef();


    useEffect(() => {
      dispatch( setActiveNote(formState))
    }, [formState])
    
    useEffect(() => {
      if(messageSaved.length > 0) {
        Swal.fire('Nota actualizada', messageSaved, 'success'); 
      }

    }, [messageSaved])
    

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }
    const onFileInputChange = ({target}) => {
        const files = target.files;
        if(files.length === 0) return;

        dispatch( startUploadingFiles( target.files))
    }


    const onDelete = () => {
        dispatch( startDeletingNote());
    }
  return (
    <Grid 
        className='animate__animated animate__fadeIn animate__faster'
        container direction='row' justifyContent='space-between' sx={{ mb: 1}}
    > 
        <Grid item>
            <Typography fontSize={39} fontWeight='light'> {dateString}</Typography>
        </Grid>
        <Grid item>
            <input type="file"
                   multiple
                   ref={fileInputRef}
                   onChange={ onFileInputChange } 
                   style={{display: 'none'}}
                   />

            <IconButton
                color='primary'
                disabled={isSaving}
                onClick={ () => fileInputRef.current.click() } //simula el click al elemento referido
                >

                <UploadOutlined/>

            </IconButton>
            <Button
                 disabled={isSaving}
                 color='primary' 
                 sx={{p: 2}}
                 onClick={ onSaveNote }
                 
                 >
                <SaveAltOutlined sx={{fontSize: 30, mr: 1}} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type='text'
                vatiant='filled'
                fullWidth
                placeholder=' Ingrese un título'
                label= 'Título'
                sx={{boder: 'none', mb:1}}
                name='title'
                value={title}
                onChange={onInputChange}
            />
            <TextField
                type='text'
                vatiant='filled'
                fullWidth
                multiline
                placeholder='¿Qué sucedió en el día de hoy?'
                minRows={5}
                name='body'
                value={body}
                onChange={onInputChange}
            
            />
        </Grid>
        <Grid>
            <Button
                onClick={ onDelete }
                sx={{ mt:2}}
                color='error'
            >
                <DeleteOutlined/>
                Borrar
            </Button>

        </Grid>

        <ImageGallery images={note.imageUrls}/>
    </Grid>
  )
}
