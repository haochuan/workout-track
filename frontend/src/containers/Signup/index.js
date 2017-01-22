import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/auth';
import SignupForm from '../../components/SignupForm';
import './style.css';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.signupHandler = this.signupHandler.bind(this);
  }

  signupHandler(email, password) {
    this.props.dispatch(actions.signup(email, password));
  }

  render() {
    return (
      <div className="signupForm-background">
        <div className="signupForm-wrapper">
          <SignupForm signupHandler={this.signupHandler}/>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Signup);
