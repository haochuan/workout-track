import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './style.css';



export class CreateExercise extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        CreateExercise Page 
      </div>
    );
  }
}

CreateExercise.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(CreateExercise);
