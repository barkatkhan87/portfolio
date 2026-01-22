import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Paper, Typography, TextField, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [values, setValues] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setValues((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(values);
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Admin Login</title></Helmet>
      <Box className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-dark-300 p-4">
        <Container maxWidth="sm">
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Admin Login
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              Enter your credentials to continue.
            </Typography>

            <Box component="form" onSubmit={onSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={onChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={values.password}
                onChange={onChange}
                type={show ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShow((p) => !p)} edge="end">
                      {show ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                loading={loading}
                startIcon={<Login />}
                variant="contained"
                sx={{ py: 1.4 }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;