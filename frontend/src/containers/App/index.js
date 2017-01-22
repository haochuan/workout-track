import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TabBar from 'antd-mobile/lib/tab-bar';
import NavBar from 'antd-mobile/lib/nav-bar';

import * as authActions from '../../actions/auth';
import './style.css';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false
    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>{pageText}</div>
      </div>
    );
  }


  render() {
    return (
      <div className="full-height">
        <NavBar className="app-navbar" iconName={null}>Dong Dong Le</NavBar>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/cKhfyLTszUeFARPgfokz.png' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/bqUXyjiOyKrXRfiIZVsZ.png' }}
            title="Workout"
            key="Workout"
            selected={this.state.selectedTab === 'blueTab'}
            badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent('Workout')}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/cKhfyLTszUeFARPgfokz.png' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/bqUXyjiOyKrXRfiIZVsZ.png' }}
            title="Library"
            key="Library"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent('Library')}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/cKhfyLTszUeFARPgfokz.png' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/bqUXyjiOyKrXRfiIZVsZ.png' }}
            title="Progress"
            key="Progress"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('Progress')}
          </TabBar.Item>
        </TabBar>
      </div>       
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
