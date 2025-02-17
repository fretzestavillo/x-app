import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import { useEffect, useState } from 'react';

export function Home() {
  const [id, setId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      console.log('User Data:', parsedUserData);
      setId(parsedUserData.id);
      setAccessToken(parsedUserData.accessToken);
      setName(parsedUserData.name);
    } else {
      console.log('No user data found in local storage.');
    }
  }, []);

  const nameParts = name.split(' ');
  const initials = nameParts[0][0] + nameParts[nameParts.length - 1][0];

  return (
    <>
      <div>
        <Avatar sx={{ bgcolor: red[500], cursor: 'pointer' }}>
          {initials}
        </Avatar>
      </div>
    </>
  );
}
