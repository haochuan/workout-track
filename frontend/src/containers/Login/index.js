import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth';
import LoginForm from '../../components/LoginForm';
import './style.css';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.loginHandler = this.loginHandler.bind(this);
  }

  componentDidMount() {
    
  }

  loginHandler(email, password) {
    this.props.dispatch(actions.login(email, password));
  }

  render() {
    return (
      <div className="loginForm-background">
        <div className="loginForm-wrapper">
          <LoginForm loginHandler={this.loginHandler}/>
        </div>
      </div>
    );
  }
}

Login.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Login);
