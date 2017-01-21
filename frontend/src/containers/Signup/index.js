import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SignupForm from '../../components/SignupForm';
import './style.css';

export class Signup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="signupForm-background">
        <div className="signupForm-wrapper">
          <SignupForm />
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
