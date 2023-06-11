import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Navbar.css";
import React, { useState } from 'react';
import FileUploader from './Files/FileUploader';
import FolderCreator from './Files/FolderCreator';
import SearchFile from './Files/SearchFile';
import { BsPersonCircle } from "react-icons/bs";

function Sidebar() {
    const [showUploader, setShowUploader] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [showFileUploader, setShowFileUploader] = useState(false);
    const [showFolderCreator, setShowFolderCreator] = useState(false);

    const handleButtonClick = () => {
        setShowUploader(!showUploader);
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const handleFileUploaderToggle = () => {
        setShowFileUploader(!showFileUploader);
    };

    const handleFolderCreatorToggle = () => {
        setShowFolderCreator(!showFolderCreator);
    };

    return (
        <div class="col-2 row- bd-sidebar">
            <ul class="nav">
                <li className={`button ${activeMenu === 'button' ? 'active' : ''}`}>
                    {showUploader && <FileUploader />}
                    <button
                        className="btn btn-success upload"
                        type="submit"
                        onClick={handleButtonClick}
                    >
                        + 새로 만들기
                    </button>
                    {showUploader && (
                        <ul className="upload-options">
                            <li>
                                <a href="#!" onClick={handleFileUploaderToggle}>
                                    파일 업로드
                                </a>
                            </li>
                            <li>
                                <a href="#!" onClick={handleFolderCreatorToggle}>
                                    새 폴더 만들기
                                </a>
                            </li>
                        </ul>
                    )}
                </li>
                <li className={`home ${activeMenu === 'home' ? 'active' : ''}`}><a href="#!">홈</a></li>
                <li className={`drive ${activeMenu === 'drive' ? 'active' : ''}`}><a href="#!">드라이브</a></li>
                <li className={`mypage ${activeMenu === 'mypage' ? 'active' : ''}`}><a href="#!">마이페이지</a></li>
                <li className={`group ${activeMenu === 'group' ? 'active' : ''}`}><a href="#!">그룹</a></li>
                <li className={`trash ${activeMenu === 'trash' ? 'active' : ''}`}><a href="#!">휴지통</a></li>
            </ul>
            {showFileUploader && <FileUploader />}
            {showFolderCreator && <FolderCreator />}
        </div>
    );
}

function Topbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg ">
                <a class="navbar-brand" href="#!">KHUBox</a>
                <SearchFile />
            </nav>
        </div>
    );
}

function NavBar() {
    return (
        <>
            <Topbar />
            <Sidebar />
        </>
    );
}

export default NavBar;
