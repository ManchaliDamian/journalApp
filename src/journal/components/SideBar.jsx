
import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { SiderBarItem } from './SiderBarItem';

export const SideBar = ({drawerWidth}) => {
  //  el useSelector accede al store y le pedimos que parte del store queremos usar,
  // al elegir auth ya está autenticado entonces tenemos el nombre de usuario
    const { displayName } = useSelector( state => state.auth);
    const { notes } = useSelector( state => state.journal);
    return (
    <Box 
        component='nav'
        sx= {{ width: {sm: drawerWidth}, flexShrink: { sm: 0} }}
        >
        <Drawer 
            variant='permanent'
            open={true}
            sx={{
                display: {xs: 'block'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
            }}
            >
            <Toolbar>

                <Typography variant='h6' noWrap component='div'>
                    {displayName}
                </Typography>
            </Toolbar>
            <Divider/>

            <List>
                {
                    notes.map( note => (
                        <SiderBarItem key={note.id} {...note} />
                    )
                    )
                }    
            </List>    
        </Drawer>


    </Box>
  )
}
