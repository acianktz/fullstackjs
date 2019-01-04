import React, { Component } from 'react';
import './index.css';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [], 
    };
  }

  render() {
    return (
      <div>
        Hello world
      </div>
    );
  }
}
