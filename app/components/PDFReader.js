"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import { pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
export default function PDFReader() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    onDrop,
  });

  return (
    <div className="flex flex-col items-center p-6">
      {!file ? (
        <div
          {...getRootProps()}
          className={`w-full max-w-lg p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-500 font-medium">Drop your PDF here...</p>
          ) : (
            <p className="text-gray-600">Drag & drop a PDF here, or click to select</p>
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<p>Loading PDF...</p>}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="mb-4 shadow-md"
              />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
}