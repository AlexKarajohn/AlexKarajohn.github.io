import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App.tsx'
import { ThemeProvider } from '@mui/material'
import { theme } from 'src/theme/theme.tsx'
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <CssBaseline />
    <ThemeProvider theme={theme}>
      
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
