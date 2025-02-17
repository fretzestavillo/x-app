import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  full_name: yup
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .required('Full name is required'),
  born_date: yup.string().required('Born date is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  retype_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export function SignUp() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const result = await response.json();

      if (result.message === 'Email already exists!') {
        setSnackbarMessage(`${result.message}`);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        reset();
      } else {
        setSnackbarMessage(`${result.message}`);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
    } catch (error) {
      setSnackbarMessage('Signup Failed! Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);

      console.error('Error:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1300,
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Container maxWidth="sm">
        <Box sx={{ mt: 10, p: 3, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h5" gutterBottom>
            Signup Form
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Full Name"
              {...register('full_name')}
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
              margin="normal"
            />
            <TextField
              fullWidth
              type="date"
              label="Born Date"
              {...register('born_date')}
              InputLabelProps={{ shrink: true }}
              error={!!errors.born_date}
              helperText={errors.born_date?.message}
              margin="normal"
            />
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
            />
            <TextField
              fullWidth
              type="password"
              label="Re-type Password"
              {...register('retype_password')}
              error={!!errors.retype_password}
              helperText={errors.retype_password?.message}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
