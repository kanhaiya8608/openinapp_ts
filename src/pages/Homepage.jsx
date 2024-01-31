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

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleRealUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIsTableVisible(true); // Show the table once the file is uploaded
    }, 2000); // 2000 milliseconds (2 seconds)
  };

  function handleLogout() {
    sessionStorage.removeItem('token');
    navigate('/');
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);

    // Programmatically trigger the file input to reset its value (for future drag-and-drops)
    fileInputRef.current.value = '';
    setIsDragging(false);
  };

  return (
    <DashLayout>
    <div className='p-8'>
      <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
      <img src={token.user.user_metadata.image} alt="User Avatar" />
      <button onClick={handleLogout}>Logout</button>

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
              width: '100%', // Set to full width
              boxSizing: 'border-box', // Ensure padding doesn't add to the width
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img className='mx-auto h-10 w-10 mb-4' src="/images/excel.png" alt="" />
            <button className=' px-4 py-2 rounded w-full'>
              Drop your Excel sheet here or <span className='text-blue'>browse</span>
            </button>
          </label>
          <button onClick={handleRealUpload} disabled={isUploading} className='w-full mt-4 bg-indigo-500 text-white px-4 py-2 rounded'>
          {isUploading ? <SyncLoader size={8} color='#fff' /> : 'Upload'}
          </button>
        </div>
      </div>
      <div className='flex justify-center p-6'>
      {isTableVisible && csvData.length > 0 && <DataTable data={csvData} />}
      </div>
    </div>
    </DashLayout>
  );
};

export default Homepage;
