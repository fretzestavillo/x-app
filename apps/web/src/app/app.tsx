import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/home';
import { SignIn } from './components/signin';
import { SignUp } from './components/signup';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
