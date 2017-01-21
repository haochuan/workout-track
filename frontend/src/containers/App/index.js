import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { message, Layout } from 'antd';
import './style.css';

const { Header, Footer, Sider, Content } = Layout;

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // if (this.props.message) {
    //   message.info(this.props.message);
    // }
  }

  render() {
    return (
      <Layout className='full-height'>
        <Header>Header</Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

App.propTypes = {

};

const mapStateToProps = (state) => ({
  status: state.status,
  message: state.message
});

export default connect(mapStateToProps)(App);
