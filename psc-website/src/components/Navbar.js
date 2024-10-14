import React from 'react';

function Navbar({ toggleSidebar }) {
  return (
    <div className="w3-bar w3-top w3-black w3-large" style={{ zIndex: 4 }}>
      <button
        className="w3-bar-item w3-button w3-hover-none w3-hover-text-light-grey"
        onClick={toggleSidebar}  // Use toggleSidebar instead of openSidebar
      >
        <i className="fa fa-bars"></i> Menu
      </button>
      <span className="w3-bar-item w3-right">Logo</span>
    </div>
  );
}

export default Navbar;
