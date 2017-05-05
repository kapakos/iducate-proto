import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: props.location.query.message,
    };
  }

  render() {
    return (
      <div>
        <NavigationBar {...this.props} />
        <div style={{ width: '1190px', margin: '0 auto' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.shape(),
  location: React.PropTypes.shape(),
};

Main.defaultProps = {
  children: {},
  location: {},
};

export default Main;
