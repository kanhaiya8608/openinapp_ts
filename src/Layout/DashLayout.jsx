import React from 'react'

const DashLayout = ({children}) => {
  return (
    <div>
    Navbar
    <div>{children}</div>
    Sidebar
    </div>
  )
}

export default DashLayout