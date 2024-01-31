import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import DataTable from '../components/DataTable';
import { useNavigate } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import DashLayout from '../Layout/DashLayout';

const Homepage = ({ token }) => {
  let navigate = useNavigate();
  const [csvData, setCsvData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Add state for sidebar visibility

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (data) => {
    const csv = data.slice(0, 10000);
    Papa.parse(csv, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  const handleRealUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsTableVisible(true); // Show the table once the file is uploaded
    }, 2000); // 2000 milliseconds (2 seconds)
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Remove the token from sessionStorage
    navigate('/'); // Navigate to the login page or any desired route
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);

    fileInputRef.current.value = '';
    setIsDragging(false);
  };

  return (
    <DashLayout>
      <div className='p-8'>
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-bold'>Upload CSV</span>
          <div>
            <div className="flex items-center">
              <img src="/images/me.jpeg" alt="" className="h-10 w-10 rounded-full" />
              <button className="inline align-middle text-red-500 ml-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      
        <h3 className='text-3xl pb-8'> <span className='font-bold'>Welcome back, </span> <span className='font-'>{token.user.user_metadata.full_name}</span></h3>
        <div className='flex flex-col items-center'>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => handleFileChange(e.target.files[0])}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <div className='flex flex-col items-center text-center w-full max-w-lg mx-auto'>
            <label
              htmlFor="fileInput"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                cursor: 'pointer',
                border: isDragging ? '2px solid #000' : '2px dashed #000',
                borderRadius: '5px',
                padding: '40px',
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img className='mx-auto h-10 w-10 mb-4' src="/images/excel.png" alt="" />
              <button className=' px-4 py-2 rounded w-full'>
                Drop your Excel sheet here or <span className='text-blue-700'>browse</span>
              </button>
            </label>
            <button onClick={handleRealUpload} disabled={isUploading} className='w-full mt-4 bg-indigo-500 text-white px-4 py-2 rounded'>
              {isUploading ? <SyncLoader size={8} color='#fff' /> : 'Upload'}
            </button>
          </div>
        </div>
        <div className='flex justify-center mt-10'>
          {isTableVisible && csvData.length > 0 && <DataTable data={csvData} />}
        </div>
      </div>
    </DashLayout>
  );
};

export default Homepage;
