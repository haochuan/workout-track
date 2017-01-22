import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './style.css';



export class Workout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Workout Page 
      </div>
    );
  }
}

Workout.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Workout);
