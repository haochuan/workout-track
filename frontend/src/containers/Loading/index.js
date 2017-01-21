import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
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
        <Layout className='loader-wrapper'>
          <div className="loader">
            <div className="loader-box"></div>
            <div className="loader-hill"></div>
          </div>
        </Layout>
      );
    } else {
      return (
        <Layout className='full-height'>
          {this.props.children}
        </Layout>
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
