import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {BiFolder} from 'react-icons/bi';
import '../css/FolderCreator.css';

const FolderCreator = ({addFolder}) => {
    const [folderName, setFolderName] = useState('');
    const [folders, setFolders] = useState([]);
    const [currentFolderPath, setCurrentFolderPath] = useState('/folder');
    const navigate = useNavigate();

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
        // setFolders([...folders, newFolder]);
        addFolder(newFolder);
        setFolderName('');
    };

    const handleFolderClick = (folderName) => {
      setCurrentFolderPath(`${currentFolderPath}/${folderName}`);
      navigate(`/folder/${folderName}`);
    };

    // Render the contents of the current folder
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
          {/* Render the contents of the current folder */}
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
                />
                <button type="submit">Create Folder</button>
            </form>
            {/*<div className="folder-list">*/}
            {/*  {folders.map((folder) => (*/}
            {/*    <div*/}
            {/*      key={folder.id}*/}
            {/*      className="folder-item"*/}
            {/*      onClick={() => handleFolderClick(folder.name)}*/}
            {/*    >*/}
            {/*      <div className="folder-icon">*/}
            {/*        <BiFolder />*/}
            {/*      </div>*/}
            {/*      <div className="folder-name">{folder.name}</div>*/}
            {/*    </div>*/}
            {/*  ))}*/}
            {/*</div>*/}
            {/*{renderFolderContents()}*/}
        </div>
    );
};

export default FolderCreator;