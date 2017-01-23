import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


import DateView from '../../components/DateView';
import './style.css';



export class Workout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='page-container'>
        <DateView />
        <DateView />
        <DateView />
        <DateView />
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
