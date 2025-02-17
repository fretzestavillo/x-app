import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { SignIn } from './signin';
import { SignUp } from './signup';

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
