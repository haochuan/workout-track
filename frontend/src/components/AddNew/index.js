import React, { Component, PropTypes } from 'react';
import './style.css';

import icon_add from '../../asserts/icn_add.png';

const AddNew = ({addNew}) => (
  <div className="addNew-container">
    <img className="addNew-addImage" src={icon_add} onClick={addNew}/>
  </div>
);

export default AddNew;
