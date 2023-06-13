import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/User/SignUp';
import LogIn from './components/User/LogIn';
import MyPage from './components/User/MyPage';

import Files from './components/Files/Files';
import Folders from './components/Files/Folders';
import Trash from './components/Files/Trash';
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
      {/* <h1 className="App-title">{message}</h1> */}
      <Routes>
        {/* User */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* Files */}
        <Route path="/files" element={<Files />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/folder/:folderName" element={<Files />} />
        <Route path="/trash" element={<Trash />} />

        {/* Group */}
        <Route path="GroupPage" element={<GroupPage />} />
        <Route path="/GroupPage/:groupId" element={<GroupDetailsPage />} />

      </Routes>
    </Router>
  );
}

export default App;