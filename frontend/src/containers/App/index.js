import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TabBar from 'antd-mobile/lib/tab-bar';
import NavBar from 'antd-mobile/lib/nav-bar';

import Workout from '../Workout';
import Library from '../Library';

import icon_plan_on from '../../asserts/icn_plan_on.png';
import icon_plan_off from '../../asserts/icn_plan_off.png';
import icon_library_on from '../../asserts/icn_library_on.png';
import icon_library_off from '../../asserts/icn_library_off.png';
import icon_progress_on from '../../asserts/icn_progress_on.png';
import icon_progress_off from '../../asserts/icn_progress_off.png';



import * as authActions from '../../actions/auth';
import './style.css';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'workoutTab',
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
            icon={{ uri: icon_plan_off}}
            selectedIcon={{ uri: icon_plan_on }}
            title="Workout"
            key="Workout"
            selected={this.state.selectedTab === 'workoutTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'workoutTab',
              });
            }}
            data-seed="logId"
          >
            <Workout />
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: icon_library_off}}
            selectedIcon={{ uri: icon_library_on }}
            title="Library"
            key="Library"
            selected={this.state.selectedTab === 'libraryTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'libraryTab',
              });
            }}
            data-seed="logId1"
          >
            <Library />
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: icon_progress_off}}
            selectedIcon={{ uri: icon_progress_on }}
            title="Progress"
            key="Progress"
            selected={this.state.selectedTab === 'progressTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'progressTab',
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
