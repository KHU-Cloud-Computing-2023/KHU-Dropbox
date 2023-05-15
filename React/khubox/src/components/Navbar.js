import 'bootstrap/dist/css/bootstrap.min.css';

import "./Navbar.css";
import { BsPersonCircle } from "react-icons/bs";


function Sidebar() {
    return (
        // <div class="container-fluid">
        // <div class="row flex-nowrap">
        <div class="col-2 row- bd-sidebar">
            <ul class="nav">
                <li class="home"><a href="#!">Home</a></li>
                <li><a href="#!">Files</a></li>
                <li><a href="#!">Account</a></li>
                <li><a href="#!">Groups</a></li>
                <li><a href="#!">User Activity</a></li>
                <li><a href="#!">Trash</a></li>
                <li>
                    <button class="btn btn-success upload" type="submit">
                        Upload Files
                    </button>
                </li>
            </ul>
        </div>

        // </div>
        // </div>
    );
}
function Topbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg ">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#!">KHUBox</a>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="d-flex ms-auto p-2">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-success" type="submit">Search</button>
                        </form>
                        <div class="personCircle">
                            <button><BsPersonCircle size="32" color="#636363" /></button></div>
                    </div>
                </div>
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
