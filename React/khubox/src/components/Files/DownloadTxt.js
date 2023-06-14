import React, { useState } from 'react';

const DownloadTxt = ({ text, filename, buttonName }) => {
  const [clickButton, setClickButton] = useState(buttonName);
  
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  }

  return (
    <button onClick={handleDownload}>{clickButton}</button>
  );
}

export default DownloadTxt;