import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import './DefaultLayout.scss';

const DefaultLayout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
