import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import './style.css';



export class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
       
      </div>
    );
  }
}

Main.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Main);
