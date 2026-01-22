import { Container, Typography, Box, Button } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Home } from '@mui/icons-material'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <Helmet><title>404 | Portfolio</title></Helmet>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh" textAlign="center">
          <Typography variant="h1" className="font-heading font-bold gradient-text">404</Typography>
          <Typography variant="h4" gutterBottom>Page Not Found</Typography>
          <Button variant="contained" startIcon={<Home />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
            Go Home
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default NotFoundPage