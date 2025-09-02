'use client';

import { useState } from 'react';

export default function Home() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    } else {
      alert('Please drop a PDF file.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="p-30">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 p-8 mb-6 text-center rounded">
        Drag and drop a PDF file here
        <br />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mt-4 text-center" />
      </div>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          className="w-full h-[600px] border border-black"
          title="PDF Viewer"
        />
      )}
    </div>
  );
}