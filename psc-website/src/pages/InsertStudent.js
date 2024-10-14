import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file';

function InsertStudent() {
  const [jsonData, setJsonData] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = (event) => {
    const input = event.target.files[0];
    readXlsxFile(input).then((data) => {
      const headers = data[0];
      const jsonData = [];
      for (let i = 1; i < data.length; i++) {
        const temp = {};
        for (let j = 0; j < headers.length; j++) {
          temp[headers[j]] = data[i][j];
        }
        jsonData.push(temp);
      }
      setJsonData(JSON.stringify(jsonData, null, 2));
    });
  };

  const handleSubmit = async () => {
    const students = JSON.parse(jsonData);

    try {
      const response = await fetch('http://localhost:5000/student/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(students),
      });

      if (response.ok) {
        setUploadStatus('Students inserted successfully!');
      } else {
        const errorData = await response.json();
        setUploadStatus(`Error inserting students: ${errorData.message}`);
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  const handleDownload = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'students.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="container">
      <div className="input-container">
        <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
        <label>Select Excel File</label>
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>
        Convert to JSON and Send to API
      </button>

      <div className="input-container">
        <textarea
          id="json_data"
          rows="10"
          cols="50"
          value={jsonData}
          readOnly
        />
      </div>

      <button className="btn btn-secondary" onClick={handleDownload}>
        Download JSON File
      </button>

      <div>{uploadStatus && <p>{uploadStatus}</p>}</div>
    </div>
  );
}

export default InsertStudent;
