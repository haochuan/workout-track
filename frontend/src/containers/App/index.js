import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';

import * as authActions from '../../actions/auth';
import './style.css';

const { Header, Footer, Sider, Content } = Layout;

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };

    this.menuHandler = this.menuHandler.bind(this);
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  menuHandler(menu) {
    const key = Number(menu.key);
    console.log(key);
    switch (key) {
      case 1:
        window.location = '/#/workout';
        break;
      case 2:
        window.location = '/#/exercise';
        break;
      case 3:
        window.location = '/#/stats';
        break;
      case 4:
        window.location = '/#/setting';
        break;
      case 5:
        this.props.dispatch(authActions.logout());
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Layout className="full-height">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo"></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.menuHandler}>
            <Menu.Item key="1">
              <Icon type="solution" />
              <span className="nav-text">Workout</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="rocket" />
              <span className="nav-text">Exercise</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="area-chart" />
              <span className="nav-text">Stats</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="setting" />
              <span className="nav-text">Setting</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="logout" />
              <span className="nav-text">Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header/>
          <Content>
            {this.props.children}
          </Content>
        </Layout>
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
