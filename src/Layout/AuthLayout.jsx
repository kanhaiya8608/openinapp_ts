import React from 'react';
import IconLibrary from '../components/IconLibrary.jsx'
const AuthLayout = ({ children }) => {
  return (
    <div>
     <div className='block md:flex w-screen'>
      <div className='leftee flex md:flex-col md:justify-between p-6 md:h-screen w-screen md:w-1/2'>
        <img className='h-10 w-10 mr-2 md:h-16 md:w-16 ' src='/images/image 1.png'/>
        <h1 className='text-4xl md:text-6xl font-bold text-white text-center'>BASE</h1>
        <div className='hidden md:block'>
        <IconLibrary color='white'/>
        </div>
      </div>
      <main className='h-screen w-full md:w-1/2'>{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
