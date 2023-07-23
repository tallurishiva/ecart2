import React, { useEffect, useState } from 'react';

function FileDisplay({ fileData }) {
  const [decodedData, setDecodedData] = useState('');

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const decodedText = reader.result;
      setDecodedData(decodedText);
    };
    reader.readAsText(fileData);
  }, [fileData]);

  return (
    <div>
      <h3>Decoded Data:</h3>
      <pre>{decodedData}</pre>
    </div>
  );
}

export default FileDisplay;
