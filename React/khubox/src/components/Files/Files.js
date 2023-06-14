import React, { useState, useEffect } from 'react';
import DownloadTxt from './DownloadTxt';
import { useParams } from 'react-router-dom';
import NavBar from '../Navbar';
import '../../css/Files.css';

import { BsFileEarmark } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";

function FileLists({ files }) {
    const [showFileDetails, setShowFileDetails] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // wow123/file.txt
    const downloadFile = async (fileKey) => {
        console.log(window.sessionStorage.getItem("id"));
        console.log(fileKey);
        const root_folder = window.sessionStorage.getItem("id")
        // const root_folder = "wow123";

        // 다운로드 링크 클릭
        const fileUrl = `/files/download?fileKey=${root_folder}/${fileKey}`;
        fetch(fileUrl)
            .then(response => response.blob())
            .then(blob => {
                const downloadUrl = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', fileKey);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error(error);
            });
    };

    function getRandomDate(start, end) {
        const startDate = start.getTime();
        const endDate = end.getTime();

        return new Date(startDate + Math.random() * (endDate - startDate));
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString(undefined, options).replace(/\//g, '.');
    }

    const handleShowFileDetails = (file) => {
        setSelectedFile(file.split('/')[1]);
        setShowFileDetails(true);
    };

    const handleHideFileDetails = () => {
        setShowFileDetails(null);
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Modified</th>
                    <th scope="col">Options</th>
                    <th scope="col">ChatGPT</th>
                </tr>
            </thead>
            <tbody>
                {/* 파일 행 렌더링 */}
                {files.map((file, index) => {
                    const randomDate = new Date(getRandomDate(new Date(2022, 1, 1), new Date()));
                    const formattedDate = formatDate(randomDate);
                    return (
                        <tr key={index + 1}>
                            <th scope="row">
                                <BsFileEarmark size="30" />
                            </th>
                            <td>
                                <button onClick={() => handleShowFileDetails(file)}>
                                    {index === 0 ? file : file.split('/')[1]}
                                </button>
                            </td>
                            <td>{formattedDate}</td>
                            <td>
                                <button onClick={() => downloadFile(file.split('/')[1])}>
                                    <BsDownload />
                                </button>
                            </td>
                            <td>
                                <DownloadTxt text="Hello, World!" filename="summery.txt" />
                            </td>
                        </tr>
                    );
                })}

                <div className={`overlay ${showFileDetails !== null ? 'show' : ''}`} onClick={handleHideFileDetails}>
                    <div class="file-details">
                        <h5>{selectedFile}</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquid similique, ab et quibusdam dolorem at pariatur deserunt soluta odit reprehenderit, sapiente ducimus rem. Quia hic ab culpa distinctio possimus.</p>
                        <div>
                            <button className="delete">삭제</button>
                            <button className="update">수정</button>
                        </div>
                    </div>
                </div>
            </tbody>

        </table >
    );
}

const Files = () => {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const params = useParams();
    const folderName = params.folderName || '';

    useEffect(() => {
        fetchFiles();
    }, []);

    // detail 창 esc로 종료
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                const overlay = document.querySelector('.overlay');
                overlay.classList.remove('show');
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const fetchFiles = () => {
        fetch('/files/file')
            .then(response => response.json())
            .then(data => setFiles(data))
            .catch(error => console.log(error));
    }

    // const addFolder = (folder) => {
    //     setFolders((prevFolders) => [...prevFolders, folder]);
    // };

    // const addFile = (file) => {
    //     setFiles((prevFiles) => [...prevFiles, file]);
    // };

    // const navigateBack = () => {
    //     window.history.back();
    // };

    return (
        <>
            <NavBar tag="drive" />
            <div className="filePage">
                <div className="fileTitle">
                    <h1>Files</h1>
                    <p className="currentLocation">Current Location: {`Files/${folderName}`}</p>
                    {/*{folderName === '' && (*/}
                    {/*    <div className="folderCreatorContainer">*/}
                    {/*        <FolderCreator addFolder={addFolder} />*/}
                    {/*    </div>*/}
                    {/*)}*/}

                </div>
                <FileLists folders={folders} files={files} />
            </div>
        </>
    );
};

export default Files;
