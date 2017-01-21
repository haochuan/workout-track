import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../components/LoginForm';
import './style.css';






export class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="loginForm-background">
        <div className="loginForm-wrapper">
          <LoginForm />
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
