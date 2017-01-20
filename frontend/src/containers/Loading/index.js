import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { loading } from '../../actions/loading';
import './style.css';

import Login from '../Login';

export class Loading extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loading());
  }

  render() {
    const { status } = this.props;
    let content;
    if (status.isLoading) {
      content = (
        <div className="spinner-wrapper">
          <Spinner spinnerName="three-bounce" />
        </div>
      );
    } else {
      content = (
        <Login />
      );
    }
    return (
      <div className="main">
         {content}
      </div>
    );
  }
}

Loading.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Loading);
