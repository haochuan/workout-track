import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


import AppCard from '../../components/AppCard';
import './style.css';



export class Workout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='app-container'>
        <AppCard title={'Today'} addNew={(() => {return 0})}>
        </AppCard>
        <AppCard title={'Tomorrow'} addNew={(() => {return 0})}>
        </AppCard>
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
