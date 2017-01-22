import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import './style.css';



export class Exercise extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Exercise Page 
      </div>
    );
  }
}

Exercise.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Exercise);
