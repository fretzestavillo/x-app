import React, { useState } from 'react';
import { Box, Button, Avatar, Stack, Snackbar, Alert } from '@mui/material';

interface UploadProfilePicProps {
  id: string;
  onClose: () => void;
  setProfilePic: (newProfilePic: string) => void;
}

export function UploadProfilePic({
  id,
  onClose,
  setProfilePic,
}: UploadProfilePicProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setSnackbar({
        open: true,
        message: 'Please select a file first!',
        severity: 'error',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('id', id);

    try {
      const url = 'http://localhost:3000/api/uploadProfilePic';
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: data.message,
          severity: 'success',
        });
        setProfilePic(data.filePath);
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.filepath = data.filePath;
        localStorage.setItem('user', JSON.stringify(userData));

        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to upload profile picture.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setSnackbar({
        open: true,
        message: 'An error occurred. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          zIndex: 999,
        }}
        onClick={onClose}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Upload Profile Picture</h2>

          <Avatar
            src={imageUrl || ''}
            sx={{ width: 150, height: 150, margin: 'auto', mb: 2 }}
          />

          <Stack spacing={2} alignItems="center">
            <Button variant="contained" component="label">
              Choose File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
