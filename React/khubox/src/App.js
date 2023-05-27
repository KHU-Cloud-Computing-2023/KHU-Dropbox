import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Files from './components/Files';
import FileUploader from './components/FileUploader';
import FolderCreator from './components/FolderCreator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/files" element={<Files />} />
        <Route path="/uploader" element={<FileUploader />} />
        <Route path="/folder" element={<FolderCreator />}/>
      </Routes>
    </Router>
  );
}

export default App;