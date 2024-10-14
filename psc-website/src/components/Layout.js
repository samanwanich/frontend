import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle the sidebar instead of just opening or closing it
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} closeSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="w3-main" style={{ marginLeft: sidebarOpen ? '300px' : '0', marginTop: '43px' }}>
        <Outlet /> {/* This will render the content of the current route */}
      </div>
    </>
  );
}

export default Layout;
