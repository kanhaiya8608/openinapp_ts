import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdInsertChart, MdCalendarMonth, MdOutlineSettings } from 'react-icons/md';
import { HiTicket, HiDocumentText } from "react-icons/hi2";

const Sidebar = ({ isOpen }) => {
  const menus = [
    { label: 'Dashboard', route: '/homepage', icon: <MdDashboard size={25} /> },
    { label: 'Upload', route: '/homepage', icon: <MdInsertChart size={25}/> },
    { label: 'Invoice', route: '/homepage', icon: <HiTicket size={25}/> },
    { label: 'Schedule', route: '/homepage', icon: <HiDocumentText size={25}/> },
    { label: 'Calendar', route: '/homepage', icon: <MdCalendarMonth size={25}/> },
    { label: 'Settings', route: '/homepage', icon: <MdOutlineSettings size={25}/> },
  ];

  return (
    <div className={`relative ${isOpen ? 'hidden' : 'lg:flex'} flex-col w-full h-full text-black shadow-md`}>
      <div className='flex justify-center items-center m-4 p-4'>
        <img src="/images/Subtract.png" alt=""  />
        <h1 className='text-4xl pl-2'>Base</h1>
      </div>
      <div className='flex-1 h-full'>
        <ul className="h-full">
          {menus.map((menu, index) => (
            <li key={index} className='flex items-center justify-between p-4 transition-colors hover:text-indigo-600'>
              <NavLink to={menu.route}>
                <div className='flex w-full'>
                  <div className='px-10 text-lg flex items-center'>
                    {menu.icon && <span className='mr-5'>{menu.icon}</span>}
                    <span>{menu.label}</span>
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
