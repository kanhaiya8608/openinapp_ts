import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const DashLayout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth > 768); // Set to true for screens wider than 768px

  // Update isSidebarVisible when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <div className={`md:relative h-screen bg-white bg-white-50 shadow-lg ${isSidebarVisible ? 'block' : 'hidden'}`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-auto p-4'>
        {children}
      </div>
    </div>
  );
};

export default DashLayout;
