import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components';
import { useState } from 'react';

export const JournalLayout = ({ children }) => {
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar 
                drawerWidth={drawerWidth} 
                onToggleSidebar={handleDrawerToggle}
            />
            
            <SideBar 
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <Box 
                component='main'
                sx={{ 
                    flexGrow: 1, 
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar />
                { children }
            </Box>
        </Box>
    )
}