import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  render() {
    return (
      <div className="content">
        <h2>Iducate Prototypes</h2>
        <ul>
          <li><Link to="/courses">Courses</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
