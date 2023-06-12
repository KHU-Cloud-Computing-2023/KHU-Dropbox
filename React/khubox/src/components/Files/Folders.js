import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import NavBar from '../Navbar';
import FileUploader from '../Files/FileUploader';
import FolderCreator from '../Files/FolderCreator';
import '../../css/Files.css';
import { BiDotsVerticalRounded, BiFolder } from 'react-icons/bi';
import { BsFileEarmark } from "react-icons/bs";
import { BsDownload, BsFolder2 } from "react-icons/bs";

function FileLists({ files }) {

    const tmpfiles = [
        { name: "CloudComputing", file: "1.png" },
        { name: "CapstonDesign", file: "2.png" },
        { name: "FSSN", file: "3.png" },
    ]

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Modified</th>
                </tr>
            </thead>
            <tbody>
                {/* 파일 행 렌더링 */}
                {tmpfiles.map((file, index) => (
                    <tr key={index + 1}>
                        <th scope="row">
                            <BsFolder2 size="32" />
                        </th>
                        <td>
                            {/* 상세 페이지로 이동하게 처리해야함 */}
                            <a href="/#">{file.name}</a>
                        </td>
                        <td>2023.01.01</td>
                    </tr>
                ))}
                {/*/!* 폴더 행 렌더링 *!/*/}
                {/*{folders.map((folder, index) => (*/}
                {/*    <tr key={index + 1 + files.length}>*/}
                {/*        <th scope="row">*/}
                {/*            /!* 폴더 클릭 시 해당 경로 페이지로 이동 *!/*/}
                {/*            <Link to={`/folder/${folder.name}`} className="folder-link" >*/}
                {/*                <div className="folder-icon">*/}
                {/*                    <BiFolder size="30" />*/}
                {/*                </div>*/}
                {/*            </Link>*/}
                {/*        </th>*/}
                {/*        <td>*/}
                {/*            {folder.name}*/}
                {/*        </td>*/}
                {/*        <td>2023.01.01</td>*/}
                {/*        <td><BiDotsVerticalRounded /></td>*/}
                {/*    </tr>*/}
                {/*))}*/}
            </tbody>
        </table>
    );
}

const Folders = () => {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const location = useLocation();
    const params = useParams();
    const folderName = params.folderName || '';

    useEffect(() => {
        console.log(folders);
    }, [folders]);

    const addFolder = (folder) => {
        setFolders((prevFolders) => [...prevFolders, folder]);
    };

    return (
        <>
            <NavBar />
            <div className="filePage">
                <div className="fileTitle">
                    <h1>Folders</h1>
                    <p className="currentLocation">Current Location: {`Folder/${folderName}`}</p>
                    {folderName === '' && (
                        < div className="folderCreatorContainer">
                            <FolderCreator addFolder={addFolder} />
                        </div>
                    )}
                </div>
                <FileLists folders={folders} files={files} />
            </div>
        </>
    );
};

export default Folders;
