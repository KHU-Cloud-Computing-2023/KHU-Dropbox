import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import NavBar from '../Navbar';
import Folders from './Folders';
import '../../css/Files.css';

import { BsFileEarmark, BsDownload, BsFolder2 } from "react-icons/bs";
import { BiDotsVerticalRounded } from 'react-icons/bi';



function FileLists({ files, folders }) {
    let randomDate = new Date(getRandomDate(new Date(2022, 1, 1), new Date()));
    let formattedDate = formatDate(randomDate);

    const tmpfiles = [
        { name: "homePage.txt", file: "1.png" },
        { name: "HelloWorld.txt", file: "2.png" },
        { name: "hello.txt", file: "hello.txt" },
        { name: "Untitled.py", file: "4.png" },
        { name: "CloudComputing.js", file: "5.png" },
        { name: "hello.pdf", file: "6.png" }
    ]

    const tmpfolders = [
        { name: "CloudComputing", file: "1.png" },
        { name: "CapstonDesign", file: "2.png" },
        { name: "FSSN", file: "3.png" },
    ]

    const downloadFile = (filename) => {
        // 파일 다운로드 링크 생성
        const fileUrl = `https://khubox-bucket2.s3.amazonaws.com/${filename}`;
        // 다운로드 링크 클릭
        window.open(fileUrl, '_blank');
    };

    // 날짜 랜덤 생성 -> 기능 구현 후 삭제 예정
    function getRandomDate(start, end) {
        const startDate = start.getTime();
        const endDate = end.getTime();

        return new Date(startDate + Math.random() * (endDate - startDate));
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString(undefined, options).replace(/\//g, '.');
    }

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
                {/* 임시로 만든 파일과 폴더 리스트 이용해서 화면에 출력 */}
                {/* 파일 행 렌더링 */}
                {tmpfiles.map((file, index) => {
                    const randomDate = new Date(getRandomDate(new Date(2022, 1, 1), new Date()));
                    const formattedDate = formatDate(randomDate);

                    return (
                        <tr key={index + 1}>
                            <th scope="row">
                                <BsFileEarmark size="30" />
                            </th>
                            <td>
                                {/* 상세 페이지로 이동하게 처리해야함 */}
                                <a href="/#">{file.name}</a>
                            </td>
                            <td>{formattedDate}</td>
                            <td>
                                <button onClick={downloadFile}>
                                    <BsDownload />
                                </button>
                            </td>
                        </tr>
                    );
                })}

                {/* 폴더 행 렌더링 */}
                {tmpfolders.map((folder, index) => {
                    randomDate = new Date(getRandomDate(new Date(2022, 1, 1), new Date()));
                    formattedDate = formatDate(randomDate);

                    return (
                        <tr key={index + 1}>
                            <th scope="row">
                                <BsFolder2 size="32" />
                            </th>
                            <td>
                                {/* 상세 페이지로 이동하게 처리해야함 */}
                                <a href="/#">{folder.name}</a>
                            </td>
                            <td>{formattedDate}</td>
                            <td>
                                <button onClick={downloadFile}>
                                    <BiDotsVerticalRounded />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

const Files = () => {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const params = useParams();
    const folderName = params.folderName || '';

    useEffect(() => {
        console.log(folders);
    }, [folders]);

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
