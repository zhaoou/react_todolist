import React, { Component } from 'react';
import Hello from './Hello';
import Routes from '../Routes';
class Todos extends Component {

  constructor(props) {
    super(props);
    this.state = {ray: ["Stepan", "Michael"]};
    this.addName = this.addName.bind(this);
  }

  addName(name){
    console.log("adding name in App")
    let oldNames = [...this.state.ray];
    oldNames.push(name);
    this.setState({ray: oldNames});
  }

  render() {
    return (
      <div>

        { this.state.ray.map( (e, i) => (
            <Hello key={Math.random()+"_hello"} name={e} addName={this.addName}/>
        ))}
      </div>


    );
  }
}

export default Todos;
