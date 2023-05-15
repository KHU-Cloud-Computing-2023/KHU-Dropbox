import NavBar from "./Navbar";
import "./Files.css";
import { BiDotsVerticalRounded } from "react-icons/bi";

// 데이터베이스 연동해서 가져오면서 수정할 예정
function FileLists() {
    return (
        <div class="filePage">
            <div class="fileTitle">
                <h1>Files</h1>
                <p>Current Location: Files/</p>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">File Name</th>
                        <th scope="col">Modified</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>homePage</td>
                        <td>2023.01.01</td>
                        <td><BiDotsVerticalRounded /></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>HelloWorld.py</td>
                        <td>2023.01.01</td>
                        <td><BiDotsVerticalRounded /></td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Mytext.txt</td>
                        <td>2023.01.01</td>
                        <td><BiDotsVerticalRounded /></td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Mytext2.txt</td>
                        <td>2023.01.01</td>
                        <td><BiDotsVerticalRounded /></td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Mytext2.txt</td>
                        <td>2023.01.01</td>
                        <td><BiDotsVerticalRounded /></td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>Mytext2.txt</td>
                        <td>2023.01.01</td>
                        <td><BiDotsVerticalRounded /></td>
                    </tr>
                    <tr>
                        <th scope="row">7</th>
                        <td>Mytext2.txt</td>
                        <td>2023.01.01</td>
                        <td><BiDotsVerticalRounded /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
function Files() {
    return (
        <>
            <NavBar />
            <FileLists />
        </>
    );
}

export default Files;