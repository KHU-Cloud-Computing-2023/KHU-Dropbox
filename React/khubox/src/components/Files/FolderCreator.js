import React, { useState, useEffect } from 'react';
import '../../css/FolderCreator.css';

const FolderCreator = ({ addFolder }) => {
  const [folderName, setFolderName] = useState('');
  const [folders, setFolders] = useState([]);
  const [currentFolderPath, setCurrentFolderPath] = useState('/folder');

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName.trim() === '') {
      return;
    }
    const newFolder = {
      id: Date.now(),
      name: folderName.trim(),
    };
    addFolder(newFolder);
    setFolderName('');
  };

  const renderFolderContents = () => {
    const folderPath = currentFolderPath.split('/').slice(1);
    const currentFolderName = folderPath[folderPath.length - 1];
    const currentFolder = folders.find((folder) => folder.name === currentFolderName);
    if (!currentFolder) {
      return null;
    }

    return (
      <div>
        <h2>Current Folder: {currentFolder.name}</h2>
      </div>
    );
  };

  return (
    <div className="folder-creator">
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={folderName}
          onChange={handleInputChange}
          placeholder="Folder Name"
          className="folderInput"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default FolderCreator;