import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import * as authActions from '../../actions/auth';
import './style.css';



export class Main extends Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    this.props.dispatch(authActions.logout());
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.logoutHandler}>Logout</Button>
      </div>
    );
  }
}

Main.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Main);
