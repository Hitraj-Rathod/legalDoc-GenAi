'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';


interface AnalysisResult {
  summary: string;
  key_points: string[];
  risk_analysis: {
    rating: 'Low' | 'Medium' | 'High';
    points: string[];
  };
}

const DocumentAnalyzerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setAnalysis(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a document first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Make sure the backend URL is correct
      const response = await axios.post('http://localhost:5001/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // The backend now returns a nested structure
      const result = response.data;
      const parsedResult: AnalysisResult = {
        summary: result.summary,
        key_points: result.key_points,
        // The risk_analysis from the prompt is a string, let's assume it's an object now
        risk_analysis: {
          rating: result.risk_analysis.rating,
          points: result.risk_analysis.points,
        }
      };
      setAnalysis(parsedResult);
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.error || 'An error occurred during analysis.');
      } else {
        setError('Could not connect to the analysis server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (rating: 'Low' | 'Medium' | 'High') => {
    switch (rating) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 pt-20">Legal Document Analyzer</h1>
          <p className="mt-2 text-lg text-black font-serif">
            Upload your document to get an AI-powered summary, key points, and risk assessment.
          </p>
        </div>

        {/* Uploader */}
        <div
          {...getRootProps()}
          className={`mt-10 p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
            ${isDragActive ? 'hover:bg-[#1C352D] bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-gray-700">✅ Selected: <strong>{file.name}</strong></p>
          ) : (
            <p className="text-gray-500">Drag & drop a .pdf or .docx file here, or click to select</p>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleAnalyze}
            disabled={!file || isLoading}
            className="px-8 py-3 hover:bg-[#1C352D] bg-[#748873] text-white font-semibold rounded-lg shadow-md  disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Document'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
            <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <strong>Error:</strong> {error}
            </div>
        )}

        {/* Results */}
        {isLoading && (
            <div className="mt-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">AI is reading your document, please wait...</p>
            </div>
        )}

        {analysis && (
          <div className="mt-10 bg-white p-8 rounded-lg shadow-lg space-y-8">
            {/* Summary Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">📜 Document Summary</h2>
              <p className="mt-4 text-gray-700 leading-relaxed">{analysis.summary}</p>
            </div>

            {/* Key Points Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">📌 Key Points</h2>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                {analysis.key_points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Risk Analysis Section */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">⚠️ Risk Analysis</h2>
                <div className="mt-4">
                    <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${getRiskColor(analysis.risk_analysis.rating)}`}>
                        Overall Risk: {analysis.risk_analysis.rating}
                    </span>
                    <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                        {analysis.risk_analysis.points.map((point, index) => (
                        <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentAnalyzerPage;