import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './style.css';



export class Setting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Setting Page 
      </div>
    );
  }
}

Setting.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Setting);
