import { IconButton, Typography } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector} from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'
export const JournalPage = () => {


  const {isSaving, active } = useSelector(state => state.journal);
  const dispatch = useDispatch();

  const onClickNewNote = () => {
  
    dispatch(startNewNote());

  }
  return (
    <JournalLayout>

      
      
      {
        (!!active)
        ? <NoteView/>
        : <NothingSelectedView/>
      }
      {/* <NothingSelectedView/> */}
      {/* nada seleccionado */}
      {/* cuando hay una nota */}

      
      <IconButton
      onClick={onClickNewNote}
      disabled={isSaving}
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
  )
}
