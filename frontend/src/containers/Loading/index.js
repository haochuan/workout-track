import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import { loading } from '../../actions/loading';
import './style.css';

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
    if (status.isLoading && status.isLoading !== 'loaded') {
      return (
        <div className="spinner-wrapper">
          <Spinner spinnerName="three-bounce" />
        </div>
      );
    } else {
      return (
        <div>{this.props.children}</div>
      );
    }
  }
}

Loading.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Loading);
