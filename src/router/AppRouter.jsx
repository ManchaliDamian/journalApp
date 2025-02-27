import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {
  
  
  // antes de mostrar algo se hace una evaluacion


  const {status} = useCheckAuth();
  


  if( status ==='checking') {

    return <CheckingAuth/>

  }




  return (
    <Routes>
      { 
        (status === 'authenticated')
        ? <Route path='/*' element={<JournalRoutes/>}/>
        : <Route path='/auth/*' element={<AuthRoutes/>}/>
      }

      <Route path='/*' element={<Navigate to='/auth/login'/>}/>
        {/* Login y registro. ingresa todo por el auth*/}
        {/* <Route path='/auth/*' element={<AuthRoutes/>}/> */}

        {/* JournalApp, si no es auth ingresa a la app de journal */}
        {/* <Route path='/*' element={<JournalRoutes/>}/> */}
        
    </Routes>
  )
}
