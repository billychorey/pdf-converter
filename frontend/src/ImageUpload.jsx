// 📁 src/components/ImageUpload.jsx
import React, { useState } from "react";

function ImageUpload() {
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
      const disposition = response.headers.get("Content-Disposition");
      const match = disposition && disposition.match(/filename="(.+)"/);
      const filename = match ? match[1] : "converted.pdf";

      const url = window.URL.createObjectURL(blob);
      setDownloadLinks((prev) => [...prev, { url, filename }]);
      setFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Image to PDF Converter
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Convert to PDF
          </button>
        </form>

        {downloadLinks.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
              Converted PDFs:
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {downloadLinks.map(({ url, filename }, index) => (
                <li key={index}>
                  <a
                    href={url}
                    download={filename}
                    className="text-blue-600 hover:underline"
                  >
                    {filename}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
