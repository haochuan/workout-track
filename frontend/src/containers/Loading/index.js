import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Toast from 'antd-mobile/lib/toast';

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

  componentDidUpdate() {
    if (this.props.message.content) {
      Toast[this.props.message.messageType](this.props.message.content);
    }
  }

  render() {
    const { status } = this.props;
    if (status.isLoading && status.isLoading !== 'loaded') {
      return (
        <div className='loader-wrapper'>
          <div className="loader">
            <div className="loader-box"></div>
            <div className="loader-hill"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='full-height'>
          {this.props.children}
        </div>
      );
    }
  }
}

Loading.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status,
  message: state.message
});

export default connect(mapStateToProps)(Loading);
