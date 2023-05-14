import SignUp from '../src/components/SignUp';
import LogIn from './components/LogIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;