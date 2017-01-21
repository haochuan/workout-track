import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Alert, Layout } from 'antd';
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
    let alertMessage = this.props.message.content ?
                       (<Alert className="top-message" message={this.props.message.content} type={this.props.message.messageType} />) :
                      null;
    if (status.isLoading && status.isLoading !== 'loaded') {
      return (
        <Layout className='loader-wrapper'>
          {alertMessage}
          <div className="loader">
            <div className="loader-box"></div>
            <div className="loader-hill"></div>
          </div>
        </Layout>
      );
    } else {
      return (
        <Layout className='full-height'>
          {alertMessage}
          {this.props.children}
        </Layout>
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
