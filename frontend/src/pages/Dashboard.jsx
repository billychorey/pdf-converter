// 📁 src/pages/Dashboard.jsx
import React, { useState } from 'react';

function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
        const response = await fetch('http://localhost:5001/convert', {
            method: 'POST',
            body: formData,
            credentials: 'include', // ✅ THIS LINE IS CRUCIAL
        });


      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toLocaleString();

        setPdfs((prev) => [...prev, { url, timestamp }]);
        setSelectedFile(null); // clear selection
      } else {
        console.error('Failed to convert image.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Convert to PDF</button>
      </form>

      {pdfs.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Generated PDFs</h2>
          <ul>
            {pdfs.map((pdf, index) => (
            <li key={index}>
                <span>PDF from {pdf.timestamp}: </span>
                <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: '10px' }}
                >
                    Open
                </a>
                <a href={pdf.url} download={`converted_${index + 1}.pdf`}>
                    Download
                </a>
            </li>

            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
