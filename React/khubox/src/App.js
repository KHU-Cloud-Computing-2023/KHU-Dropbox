import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/User/SignUp';
import LogIn from './components/User/LogIn';
import Files from './components/Files/Files';
// import FileUploader from './components/Files/FileUploader';
import FolderCreator from './components/Files/FolderCreator';
import GroupPage from './components/Group/GroupPage';
import GroupDetailsPage from './components/Group/GroupDetailsPage';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.text())
      .then(message => {
        setMessage(message);
      });
  }, [])

  return (
    <Router>
      <h1 className="App-title">{message}</h1>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/files" element={<Files />} />
        <Route path="/folder/:folderName" element={<Files />} />
        <Route path="/folder" element={<FolderCreator />} />
        <Route path="GroupPage" element={<GroupPage />} />
        <Route path="/GroupPage/:groupId" element={<GroupDetailsPage />} />

        {/* <Route path="/uploader" element={<FileUploader />} /> */}
        {/* <Route path="/SearchFile" element={<SearchFile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;