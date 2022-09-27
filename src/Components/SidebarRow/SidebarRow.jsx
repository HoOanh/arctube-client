import React from 'react';
import './SidebarRow.scss';

import { Link } from 'react-router-dom';

const SidebarRow = ({ title, Icon, path }) => {
  const selected = window.location.pathname;
  return (
    <Link to={path} className={`sidebarRow ${selected === path && 'selected'}`}>
      <Icon className="sidebarRow__icon" />
      <h2 className="sidebarRow__title">{title}</h2>
    </Link>
  );
};

export default SidebarRow;
