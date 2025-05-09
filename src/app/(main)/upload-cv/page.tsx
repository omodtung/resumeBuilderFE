"use client";

import React, { useState } from 'react';
import { uploadCV } from './actions';

const UploadCVPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCvFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!name || !phone || !company || !cvFile) {
      alert('Please fill in all required fields and select a file.');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('company', company);
    formData.append('cvFile', cvFile);

    try {
      const token = sessionStorage.getItem('token');
      // The server action will handle the case where the token is null or invalid.
      const result = await uploadCV(formData, token);
      if (result.success) {
        setUploadSuccess(true);
        // Optionally clear form or redirect
      } else {
        // Handle upload failure
        alert('Upload failed.');
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
      <h1 className="text-2xl font-bold text-White-700 mb-2">Upload lên CV để gia tăng cơ hội</h1>
      <p className="text-gray-600 mb-6">Tải CV lên sớm để kết nối với nhà tuyển dụng</p>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ tên:<span className="text-red-500">*</span></label>
            <input type="text" id="name" className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm p-2 bg-gray-50 text-black" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Điện thoại:<span className="text-red-500">*</span></label>
            <input type="text" id="phone" className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm p-2 bg-gray-50 text-black" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <div className="mb-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Công ty:<span className="text-red-500">*</span></label>
            <select
              id="company"
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm p-2 bg-gray-50 text-black"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">Chọn công ty</option>
              <option value="FPT">FPT</option>
              <option value="VETTEL">VETTEL</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="cvFile" className="block text-sm font-medium text-gray-700">File CV:<span className="text-red-500">*</span></label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-md bg-gray-50">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 005.656 5.656l3.172 3.172M28 8a4 4 0 00-4 4v20m-4-8l-3.172-3.172a4 4 0 00-5.656 5.656l3.172 3.172m0 0L28 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Chọn tệp</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
                <p className="pl-1">hoặc kéo và thả</p>
              </div>
              {cvFile && <p className="text-sm text-gray-500">{cvFile.name} ({(cvFile.size / 1024).toFixed(2)} KB)</p>}
              <p className="text-xs text-gray-500">zip, pdf, doc, docx, jpg, png,... tối đa 5mb</p>
            </div>
          </div>
        </div>

        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload CV'}
        </button>

        {uploadSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            * File đã tải lên thành công. Hệ thống sẽ chuyển đến đến trang quản lý CV trong ít phút. ↻
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadCVPage;
