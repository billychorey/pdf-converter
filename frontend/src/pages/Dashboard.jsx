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
        credentials: 'include',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toLocaleString();

        setPdfs((prev) => [...prev, { url, timestamp }]);
        setSelectedFile(null);
      } else {
        console.error('Failed to convert image.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Dashboard</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Convert to PDF
          </button>
        </form>

        {pdfs.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Generated PDFs</h2>
            <ul className="space-y-2">
              {pdfs.map((pdf, index) => (
                <li key={index} className="bg-gray-50 p-3 rounded border">
                  <span className="block text-sm text-gray-600 mb-1">
                    PDF from {pdf.timestamp}
                  </span>
                  <div className="space-x-4">
                    <a
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Open
                    </a>
                    <a
                      href={pdf.url}
                      download={`converted_${index + 1}.pdf`}
                      className="text-blue-600 hover:underline"
                    >
                      Download
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
