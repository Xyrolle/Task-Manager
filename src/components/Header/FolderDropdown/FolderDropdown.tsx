import React from 'react';

import './FolderDropdown.css';

const FolderDropdown: React.FC = () => {
  return (
    <div className="folderDropdownContainer">
      <header className="folderDropdownHeader">
        <div>Latest | All</div>
        <input type="search" autoComplete="off" placeholder="Search" />
      </header>
      <div className="folderDropdownContent" role="contentinfo" />
    </div>
  );
};

export default FolderDropdown;
