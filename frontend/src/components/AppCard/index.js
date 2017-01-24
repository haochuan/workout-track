import React, { Component, PropTypes } from 'react';
import AddNew from '../AddNew';
import Title from '../Title';
import './style.css';

class AppCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, addNew } = this.props;
    let titleComponent, addNewComponent;
    if (title) {
      titleComponent = (
        <Title title={title} />
      );
    }

    if (addNew) {
      addNewComponent = (
        <AddNew addNew={addNew} />
      );
    }
    return (
      <div className="appCard-container">
        {titleComponent}
        <div className="appCard-content">
          {addNewComponent}
        </div>
      </div>
    );
  }
}

AppCard.propTypes = {

};

export default AppCard 
