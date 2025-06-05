import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://127.0.0.1:5001/convert", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to convert");

    const blob = await response.blob();

    // 🔍 Extract filename from headers
    const disposition = response.headers.get("Content-Disposition");
    console.log("Header received:", disposition); // <-- add this!
    const match = disposition && disposition.match(/filename="(.+)"/);
    const filename = match ? match[1] : "converted.pdf";


    // 🧠 Create object URL
    const url = window.URL.createObjectURL(blob);
    setDownloadLinks((prev) => [...prev, { url, filename }]);
    setFile(null);
  } catch (err) {
    console.error(err);
  }
};




  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Image to PDF Converter</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Convert to PDF</button>
      </form>

      {downloadLinks.length > 0 && (
        <>
          <h2>Converted PDFs:</h2>
            <ul>
              {downloadLinks.map(({ url, filename }, index) => (
                  <li key={index}>
                    <a href={url} download={filename}>{filename}</a>
                  </li>
                ))}
            </ul>
        </>
      )}
    </div>
  );
}

export default App;
