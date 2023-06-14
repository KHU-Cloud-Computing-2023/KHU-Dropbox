import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../../css/FileUploader.css';
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { BsFileEarmark } from "react-icons/bs";

const FileUploader = () => {
    const [files, setFiles] = useState([]);

    const onDrop = async (acceptedFiles) => {
        try {
            const formData = new FormData();
            acceptedFiles.forEach((file) => {
                formData.append('file', file);
            });
            await fetch('/files/upload', {
                method: 'POST',
                body: formData,
            });
            setFiles([...files, ...acceptedFiles]);
        } catch (error) {
            console.error(error);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleDownload = (file) => {
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div class="footer">
            <div className="file-uploader" {...getRootProps()}>
                <input {...getInputProps()} />
                {files.length === 0 && <BsFileEarmarkArrowUp size="60" />}
                {isDragActive ? (
                    <p>파일을 이곳에 드롭하세요.</p>
                ) : (
                    <>
                        {files.length > 0 ? (
                            <div>
                                {files.map((file, index) => (
                                    <div className="file-item" key={index}>
                                        <BsFileEarmark className="file-icon" />
                                        <span key={index}>{file.name}</span>
                                    </div>

                                ))}
                            </div>
                        ) : (
                            <p>파일을 드래그하거나 클릭하여 업로드하세요.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default FileUploader;
