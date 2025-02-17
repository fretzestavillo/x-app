import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

export function Login() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(result);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <>
      {/* <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleLogin}
        >
          Login with Google
        </Button> */}
      {/* Snackbar for showing success or error messages */}
    </>
  );
}
