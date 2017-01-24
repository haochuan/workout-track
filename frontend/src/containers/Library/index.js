import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AppCard from '../../components/AppCard';

import './style.css';



export class Library extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-container">
        <AppCard title={'Workout'} addNew={(() => {return 0})}>
        </AppCard>
        <br />
        <br />
        <hr />
        <AppCard title={'Exercise'} addNew={(() => {return 0})}>
        </AppCard>
      </div>
    );
  }
}

Library.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Library);
