import React from 'react';

const DownloadTxt = ({ text, filename }) => {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  }

  return (
    <button onClick={handleDownload}>요약</button>
  );
}

export default DownloadTxt;