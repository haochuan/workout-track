import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './style.css';



export class Stats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Stats Page 
      </div>
    );
  }
}

Stats.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Stats);
