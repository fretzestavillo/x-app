import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Alert, Snackbar } from '@mui/material';

interface PostBoxProps {
  onClose: () => void;
  id: string;
  accessToken: string;
  profilePic: string;
  fullName: string;
  username: string;
}

export function PostComponent({
  onClose,
  id,
  accessToken,
  profilePic,
  fullName,
  username,
}: PostBoxProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [postText, setPostText] = useState('');

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
    if (!postText.trim() && !selectedFile) return;
    console.log('Post submitted:', { text: postText, image: selectedFile });

    const formData = new FormData();
    formData.append('id', id);
    formData.append('accessToken', accessToken);
    formData.append('fullName', fullName);
    formData.append('username', username);
    formData.append('profilePic', profilePic);
    formData.append('postText', postText);

    if (selectedFile) {
      formData.append('postFile', selectedFile); // Name must match backend
    }

    try {
      const url = 'http://localhost:3000/api/uploadPost';
      const response = await fetch(url, {
        method: 'POST',
        body: formData, // ✅ DO NOT manually set `Content-Type`
      });
      const data = await response.json();

      if (response.ok) {
        setSnackbar({
          open: true,
          message: data.message,
          severity: 'success',
        });

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
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <>
      {/* ✅ Snackbar for success/error messages */}
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
        <Card
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 500,
            width: '100%',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar src={profilePic} sx={{ width: 40, height: 40 }} />
              <div>
                <p style={{ fontWeight: 'bold' }}>{fullName}</p>
                <p style={{ fontSize: '14px', color: 'gray' }}>@{username}</p>
              </div>
              <IconButton onClick={onClose} sx={{ marginLeft: 'auto' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <TextField
              placeholder="What's happening?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              multiline
              fullWidth
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                <ImageIcon color="primary" />
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
              </label>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </Box>
    </>
  );

  //   return (
  //     <Box
  //       sx={{
  //         position: 'fixed',
  //         top: 0,
  //         left: 0,
  //         width: '100vw',
  //         height: '100vh',
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //         backdropFilter: 'blur(5px)',
  //         zIndex: 999,
  //       }}
  //       onClick={onClose}
  //     >
  //       <Card
  //         sx={{
  //           p: 2,
  //           borderRadius: 2,
  //           boxShadow: 3,
  //           maxWidth: 500,
  //           width: '100%',
  //         }}
  //         onClick={(e) => e.stopPropagation()}
  //       >
  //         <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  //           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  //             <Avatar src={profilePic} sx={{ width: 40, height: 40 }} />
  //             <div>
  //               <p style={{ fontWeight: 'bold' }}>{fullName}</p>
  //               <p style={{ fontSize: '14px', color: 'gray' }}>@{username}</p>
  //             </div>
  //             <IconButton onClick={onClose} sx={{ marginLeft: 'auto' }}>
  //               <CloseIcon />
  //             </IconButton>
  //           </div>
  //           <TextField
  //             placeholder="What's happening?"
  //             value={postText}
  //             onChange={(e) => setPostText(e.target.value)}
  //             multiline
  //             fullWidth
  //           />
  //           {imageUrl && (
  //             <img
  //               src={imageUrl}
  //               alt="Preview"
  //               style={{ width: '100%', borderRadius: '8px' }}
  //             />
  //           )}
  //           <div
  //             style={{
  //               display: 'flex',
  //               alignItems: 'center',
  //               justifyContent: 'space-between',
  //             }}
  //           >
  //             <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
  //               <ImageIcon color="primary" />
  //               <input
  //                 type="file"
  //                 onChange={handleFileChange}
  //                 style={{ display: 'none' }}
  //                 id="file-upload"
  //               />
  //             </label>
  //             <Button onClick={handleSubmit} variant="contained" color="primary">
  //               Post
  //             </Button>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </Box>
  //   );
}
