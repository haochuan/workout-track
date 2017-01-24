import React, { Component, PropTypes } from 'react';
import AddNew from '../AddNew';
import Title from '../Title';
import './style.css';

const DateView = () => (
  <div className="dateView-container">
    <Title title={"Today"} />
    <div className="dateView-content">
      <AddNew />
    </div>
  </div>
);

export default DateView;
