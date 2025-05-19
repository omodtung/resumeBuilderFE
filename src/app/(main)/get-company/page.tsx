"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { uploadCV } from './actions';

const GetCompanyPage = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [companyName, setCompanyName] = useState<string | null>(null); // State for company name

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCvFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!cvFile) {
      alert('Please select a file.');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    setCompanyName(null);

    const formData = new FormData();
    formData.append('cvFile', cvFile);

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        alert('Authentication token is missing. Please log in.');
        setIsUploading(false);
        return;
      }

      const result = await uploadCV(formData, token);
      if (result.success) {
        setUploadSuccess(true);
        setCompanyName(result.data); // Set the company name
      } else {
        alert(`Upload failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-2">Get Company Details</h1>
      <p className="text-gray-600 mb-6">Upload a file to fetch company information</p>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="cvFile" className="block text-sm font-medium text-gray-700">
            File:<span className="text-red-500">*</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-md bg-gray-50">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 005.656 5.656l3.172 3.172M28 8a4 4 0 00-4 4v20m-4-8l-3.172-3.172a4 4 0 00-5.656 5.656l3.172 3.172m0 0L28 8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Select File</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              {cvFile && (
                <p className="text-sm text-gray-500">
                  {cvFile.name} ({(cvFile.size / 1024).toFixed(2)} KB)
                </p>
              )}
              <p className="text-xs text-gray-500">zip, pdf, doc, docx, jpg, png,... max 5mb</p>
            </div>
          </div>
        </div>

        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Submit'}
        </button>

        {uploadSuccess && companyName && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            * File successfully uploaded. Detected company: <strong>{companyName}</strong>.
          </div>
        )}

        <Link href="/upload-cv" className="text-blue-500 hover:underline mt-4 inline-block">
          Quay lại trang tải lên CV.
        </Link>
      </div>
    </div>
  );
};

export default GetCompanyPage;
