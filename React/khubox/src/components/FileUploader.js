import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../css/FileUploader.css';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
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
    <div className="file-uploader" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>파일을 이곳에 드래그하세요.</p>
      ) : (
        <p>파일을 드래그하거나 클릭하여 업로드하세요.</p>
      )}

      {files.length > 0 && (
        <div>
          <h4>업로드된 파일:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name}
                <button onClick={() => handleDownload(file)}>다운로드</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
