import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import NavBar from '../Navbar';
import FileUploader from '../Files/FileUploader';
import FolderCreator from '../Files/FolderCreator';
import '../../css/Files.css';
import { BiDotsVerticalRounded, BiFolder } from 'react-icons/bi';
import { BsFileEarmark } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";

function FileLists({ files }) {

    // const tmpfiles = [
    //     { name: "homePage.txt", file: "1.png" },
    //     { name: "HelloWorld.txt", file: "2.png" },
    //     { name: "helloworld.txt", file: "3.png" },
    //     { name: "Untitled.py", file: "4.png" },
    //     { name: "CloudComputing.js", file: "5.png" },
    //     { name: "hello.pdf", file: "6.png" }
    // ]
    // wow123/file.txt
    const downloadFile = async (fileKey) => {
        console.log(window.sessionStorage.getItem("id"));
        console.log(fileKey);
        // const root_folder = window.sessionStorage.getItem("id")
        const root_folder = "wow123";

        // 다운로드 링크 클릭
        const fileUrl = `/files/download?fileKey=${root_folder}/${fileKey}`;
        // const fileUrl = `http://34.234.42.198:8080/files/download?fileKey=${root_folder}/${fileKey}`;
        // console.log(fileUrl);
        // window.open(fileUrl, '_blank');
        // const response = await fetch(fileUrl, {
        //     method: 'Get',
        // });
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
        // console.log(response.blob());
        // const blob = response.blob()
        // const downloadUrl = window.URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = downloadUrl;
        // link.setAttribute('download', 'filename.ext');
        // document.body.appendChild(link);
        // link.click();
        // const link = document.createElement('a');
        // link.href = fileUrl;
        // link.setAttribute('id', "wow123");
        // link.setAttribute('type', 'application/json');
        // link.click();
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Modified</th>
                    <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
                {/* 파일 행 렌더링 */}
                {files.map((file, index) => (
                    <tr key={index + 1}>
                        <th scope="row">
                            <BsFileEarmark size="30" />
                        </th>
                        <td>
                            {/* 상세 페이지로 이동하게 처리해야함 */}
                            <a href="/#">{index === 0 ? file : file.split('/')[1]}</a>
                        </td>
                        <td>{file.modified}</td>
                        <td>
                            {/* <button onClick={downloadFile(file.split('/')[1])}>
                                <BsDownload />
                            </button> */}
                            <button onClick={() => downloadFile(file.split('/')[1])}>
                                <BsDownload />
                            </button>
                            {/* <button onClick={() => downloadImage(item.filename)}>다운로드</button> */}
                        </td>
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

const Files = () => {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const location = useLocation();
    const params = useParams();
    const folderName = params.folderName || '';

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = () => {
        fetch('/files/file')
        .then(response => response.json())
        .then(data => setFiles(data))
        .catch(error => console.log(error));
    }

    const addFolder = (folder) => {
        setFolders((prevFolders) => [...prevFolders, folder]);
    };

    const addFile = (file) => {
        setFiles((prevFiles) => [...prevFiles, file]);
    };

    const navigateBack = () => {
        window.history.back();
    };

    return (
        <>
            <NavBar />
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
