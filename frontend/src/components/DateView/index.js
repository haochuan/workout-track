import React, { Component, PropTypes } from 'react';
import AddNew from '../AddNew';
import './style.css';

const DateView = () => (
  <div className="dateView-container">
    <div className="dateView-title">
      Today
    </div>
    <div className="dateView-content">
      <AddNew />
    </div>
  </div>
);

export default DateView;
