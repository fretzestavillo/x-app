import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from './interface';
import { mockPosts } from './mockpost';
import { deepOrange, deepPurple } from '@mui/material/colors';

import {
  Tabs,
  Tab,
  Box,
  Avatar,
  Typography,
  IconButton,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  ChatBubbleOutline,
  Repeat,
  FavoriteBorder,
  Visibility,
} from '@mui/icons-material';
import { UploadProfilePic } from './uploadprofilepic';

export function Home() {
  const [id, setId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setprofilePic] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState(mockPosts); // Use mock data for now
  const navigate = useNavigate();

  const [showUpload, setShowUpload] = useState(false); // Toggle state for showing the upload component

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log('User Data:', parsedUserData);
      setId(parsedUserData.id);
      setAccessToken(parsedUserData.accessToken);
      setName(parsedUserData.name);
      setprofilePic(parsedUserData.filepath);
    } else {
      navigate('/signin');
      console.log('No user data found in local storage.');
    }
  }, []);

  const isVideo = (url: string) => url?.match(/\.(mp4|webm|ogg)$/i);

  function handleClick() {
    console.log('Avatar clicked!');
    setShowUpload((prev) => !prev); // Toggle the state
  }

  return (
    <>
      {showUpload && (
        <UploadProfilePic
          id={id}
          onClose={() => setShowUpload(false)}
          setProfilePic={setprofilePic}
        />
      )}

      <div>
        {profilePic ? (
          // If profilePic exists, show the Avatar with the image
          <Avatar
            sx={{
              cursor: 'pointer',
              mt: 2, // Margin Top
              ml: 2, // Margin Left
            }}
            onClick={handleClick}
            src={profilePic}
          />
        ) : (
          // If profilePic does not exist, show the Avatar with initials
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              cursor: 'pointer',
              mt: 2, // Margin Top
              ml: 2, // Margin Left
            }}
            onClick={handleClick}
          >
            {name
              .trim()
              .split(' ')
              .filter(Boolean)
              .map((part) => part[0].toUpperCase())
              .join('')}
          </Avatar>
        )}
      </div>

      <Box
        sx={{
          maxWidth: 600,
          margin: 'auto',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          centered
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: 'black', height: '3px' },
            '& .MuiTab-root': {
              fontSize: '16px',
              fontWeight: '600',
              textTransform: 'none',
              width: '50%',
            },
          }}
        >
          <Tab label="For You" />
          <Tab label="Following" />
        </Tabs>

        {/* Post Feed */}
        {activeTab === 0 && (
          <Box sx={{ padding: 2 }}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id} sx={{ marginBottom: 2, padding: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={post.profilePic} alt={post.fullName} />
                    <Box>
                      <Typography fontWeight="bold">{post.fullName}</Typography>
                      <Typography variant="body2" color="gray">
                        @{post.username} • {post.postDate}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ paddingLeft: 8 }}>
                    <Typography>{post.postText}</Typography>

                    {/* Display Media Content */}
                    {post.postContent && (
                      <Box sx={{ marginTop: 1 }}>
                        {isVideo(post.postContent) ? (
                          <video
                            controls
                            style={{ width: '100%', borderRadius: 10 }}
                          >
                            <source src={post.postContent} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={post.postContent}
                            alt="Post content"
                            style={{ width: '100%', borderRadius: 10 }}
                          />
                        )}
                      </Box>
                    )}

                    {/* Post Actions */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 2,
                      }}
                    >
                      <IconButton size="small">
                        <ChatBubbleOutline fontSize="small" />{' '}
                        {post.messageCount}
                      </IconButton>
                      <IconButton size="small">
                        <Repeat fontSize="small" /> {post.repostCount}
                      </IconButton>
                      <IconButton size="small">
                        <FavoriteBorder fontSize="small" /> {post.heartCount}
                      </IconButton>
                      <IconButton size="small">
                        <Visibility fontSize="small" /> {post.viewsCount}
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography textAlign="center" color="gray">
                No posts available.
              </Typography>
            )}
          </Box>
        )}

        {/* "Following" tab content */}
        {activeTab === 1 && (
          <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography color="gray">
              Following posts will appear here.
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
