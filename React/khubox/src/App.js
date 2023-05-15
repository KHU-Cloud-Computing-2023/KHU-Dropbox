import SignUp from '../src/components/SignUp';
import LogIn from './components/LogIn';
import Files from './components/Files';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '../src/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </Router>
  );
}

export default App;