// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
