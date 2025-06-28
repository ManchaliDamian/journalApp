import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SiderBarItem } from './SiderBarItem';
import { startNewNote } from '../../store/journal/index';

export const SideBar = ({ drawerWidth, mobileOpen, setMobileOpen }) => {
    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);
    const dispatch = useDispatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const onClickNewNote = () => {
        dispatch(startNewNote());
        if (mobileOpen) setMobileOpen(false); // Cierra el drawer al crear nueva nota en móvil
    };

    // Contenido del drawer para reutilizarlo en ambas versiones
    const drawerContent = (
        <>
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    {displayName}
                </Typography>
            </Toolbar>
            <Divider/>

            <Box sx={{ p: 2 }}>
                <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition-colors w-full"
                    onClick={onClickNewNote}
                >
                    Nueva Entrada
                </button>
            </Box>

            <List>
                {
                    notes.map(note => (
                        <SiderBarItem 
                            key={note.id} 
                            {...note} 
                            onClick={() => setMobileOpen(false)} // Cierra el drawer al seleccionar nota
                        />
                    ))
                }    
            </List>
        </>
    );

    return (
        <Box 
            component='nav'
            sx={{ width: {sm: drawerWidth}, flexShrink: { sm: 0} }}
        >
            {/* Drawer para pantallas pequeñas (móvil) */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Mejor rendimiento en móvil
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Drawer para pantallas grandes (escritorio) */}
            <Drawer 
                variant='permanent'
                open
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', 
                        width: drawerWidth
                    }
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    )
}