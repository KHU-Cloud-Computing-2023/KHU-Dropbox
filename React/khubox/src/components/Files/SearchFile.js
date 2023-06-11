import React, { useState } from 'react';
import Files from "./Files";

function SearchFile({ }) {
    const files = [
        { name: "homePage.txt", file: "1.png" },
        { name: "HelloWorld.txt", file: "2.png" },
        { name: "helloworld.txt", file: "3.png" },
        { name: "Untitled.py", file: "4.png" },
        { name: "CloudComputing.js", file: "5.png" },
        { name: "hello.pdf", file: "6.png" }
    ]

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value.toLowerCase());
    }

    const handleSearch = (e) => {
        e.preventDefault();

        const filteredFiles = files.filter((file) =>
            file.name.toLowerCase().includes(searchInput)
        );
        setSearchResults(filteredFiles);
        console.log(filteredFiles);
    };

    return (
        <>
            <form className="d-flex p-2" onSubmit={handleSearch}>
                <input className="me-2 search-input" type="search" placeholder="Search" aria-label="Search" onChange={handleInputChange} />
                {/*<Files files={searchResults}/>*/}
            </form>
        </>
    )
}

export default SearchFile;