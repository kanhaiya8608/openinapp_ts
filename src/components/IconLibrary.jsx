import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const IconLibrary = ({ color }) => {
  const iconStyle = {
    color: color,
    marginRight: '20px',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <FaFacebook size={30} style={iconStyle} />
      <FaTwitter size={30} style={iconStyle} />
      <FaInstagram size={30} style={iconStyle} />
      <FaLinkedin size={30} style={iconStyle} />
    </div>
  );
};

export default IconLibrary;
