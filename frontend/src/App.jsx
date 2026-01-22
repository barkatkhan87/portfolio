import { useEffect, useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppRoutes from './routes/AppRoutes'
import { useTheme } from './contexts/ThemeContext'
import { Box } from '@mui/material'


function App() {
  const { theme } = useTheme()

  // 1. Logic for Tailwind Dark Mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])


  // 2. Logic for MUI Dark Mode & Layout Baseline
  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: theme,
      primary: { main: '#667eea' },
      background: {
        default: theme === 'dark' ? '#0a0a0f' : '#ffffff',
        paper: theme === 'dark' ? '#1e1e2e' : '#ffffff',
      },
    },
  }), [theme])

  return (
    <MuiThemeProvider theme={muiTheme}>
      {/* CssBaseline fixes global centering and background issues */}
      <CssBaseline />
      <Box className="min-h-screen w-full bg-white dark:bg-dark-400 transition-colors duration-300">
        <AppRoutes />
      </Box>
    </MuiThemeProvider>
  )
}

export default App