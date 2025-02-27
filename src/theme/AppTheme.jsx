import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { purpleTheme } from './'

export const AppTheme = ({children}) => {
  return (
    // el theme tiene que cumplir 
    <ThemeProvider theme={purpleTheme}>
        <CssBaseline/>
        {/* llega el journalapp */}
        {children} 

    </ThemeProvider>
  )
}
