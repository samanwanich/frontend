import React from 'react';

function Sidebar({ isOpen, closeSidebar }) {
  const username = sessionStorage.getItem('username') || 'Guest';
  return (
    <>
      {/* Sidebar */}
      <nav
        className={`w3-sidebar w3-white w3-animate-left ${isOpen ? 'w3-show' : 'w3-hide'}`}
        style={{ zIndex: 3, width: '300px', border: 'black' }}
      >
        <div className="w3-container w3-row">
          {/* <div className="w3-col s4">
            <img src="/w3images/avatar2.png" className="w3-circle w3-margin-right" style={{ width: '46px' }} alt="avatar" />
          </div> */}
          <div className="w3-col s12 w3-bar">
            <span>Welcome, <strong>{username}</strong></span><br />
            <a href="#" className="w3-bar-item w3-button"><i className="fa fa-envelope"></i></a>
            <a href="#" className="w3-bar-item w3-button"><i className="fa fa-user"></i></a>
            <a href="#" className="w3-bar-item w3-button"><i className="fa fa-cog"></i></a>
          </div>
        </div>
        <hr />
        <div className="w3-container">
          {/* Additional content */}
        </div>
        <div className="w3-bar-block">
          <a href="#" className="w3-bar-item w3-button w3-padding w3-blue"><i className="fa fa-users fa-fw"></i> ข้อมูลส่วนตัว</a>
          <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-eye fa-fw"></i> ดูผลการเรียน</a>
          <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa fa-users fa-fw"></i> ตารางเรียน</a>
          <a href="#" className="w3-bar-item w3-button w3-padding"><i className="fa-solid fa-table-list"></i> ค้นหาตารางสอนอาจารย์</a>
        </div>
      </nav>

      {/* Overlay for closing the sidebar */}
      {isOpen && (
        <div
          className="w3-overlay w3-hide-large w3-animate-opacity"
          style={{ cursor: 'pointer', zIndex: 2 }}
          onClick={closeSidebar}
        />
      )}
    </>
  );
}

export default Sidebar;
