import React, { Component } from 'react';
import Hello from './Todo';
import Routes from '../Routes';
class Todos extends Component {




  render() {
    return (
      <div>

        todo details
        {this.props.match.params.id}
      </div>


    );
  }
}

export default Todos;
