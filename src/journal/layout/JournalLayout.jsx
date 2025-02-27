import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar, SideBar } from '../components';

const drawerWidth  = 240;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{ display: 'flex'}} className='animate__animated animate__fadeIn animate__faster'>
        {/* navbar */}
        <NavBar drawerWidth= {drawerWidth}/>
        {/* sidebar */}
        <SideBar drawerWidth={drawerWidth}/>
        <Box
            component='main'
            sx={{flexGrow:1, p:3}}
        >
        {/* toolbar */}
        <Toolbar/>
        {children}

        </Box>
    </Box>
  )
}
