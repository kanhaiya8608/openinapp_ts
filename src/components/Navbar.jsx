import React, { useState } from 'react';
import Dropdown from './Dropdown';
function Navbar({ toggleSidebar }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  function handleLogout() {
    sessionStorage.removeItem('token');
    navigate('/');
  }


  return (
    <div className='flex justify-between items-center p-4'>
      <span className='text-2xl font-bold'>Upload CSV</span>
      <Dropdown onLogout={handleLogout} />
      <button className='md:hidden p-2' onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
    </div>
  );
}

export default Navbar;
