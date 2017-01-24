import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Title from '../../components/Title';

import './style.css';



export class Library extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Title title={'Workout'} />
        <hr/>
        <Title title={'Exercise'} />
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
