import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loading } from '../../actions/loading';
import { Layout } from 'antd';
import './style.css';

const { Header, Footer, Sider, Content } = Layout;

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Layout className='full-height'>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

App.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status
});

export default connect(mapStateToProps)(App);
