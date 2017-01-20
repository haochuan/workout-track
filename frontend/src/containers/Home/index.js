import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './style.css';



export class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        Home Page
      </div>
    );
  }
}

Home.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(Home);
