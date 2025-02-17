export function Home() {
  const userData = localStorage.getItem('user');

  if (userData) {
    const parsedUserData = JSON.parse(userData);
    console.log('User Data:', parsedUserData);
  } else {
    console.log('No user data found in local storage.');
  }

  return (
    <>
      <h1>Home</h1>
    </>
  );
}
