import React, { Component, Fragment } from 'react';

class Hello extends Component {

  constructor(props) {
    super(props);
    this.numRef = React.createRef();
    this.nameRef = React.createRef();

    this.state = {
      numbers: [1,2,3,4,5]
    };
    this.addNumber = this.addNumber.bind(this); // copy of the function will be bound permanently to the object, not prototype, and will be looked up first when called. shadowing.
    this.addName = this.addName.bind(this);
    console.log("created with props", props);
  }

  // this function belongs to Hello.prototype
  addNumber(event) {
    event.preventDefault();
    let numbers = [...this.state.numbers];
    numbers.push(this.numRef.current.value);
    this.setState({numbers: numbers });
    event.currentTarget.reset();
  }

  addName(event) {
    event.preventDefault();
    this.props.addName(this.nameRef.current.value);
    event.currentTarget.reset();

  }

  componentDidMount() {
    console.log(this, "mounted");
  }

  render() {
    return (
        <Fragment>
          <hr/>

          <h3> Hello state numbers: {this.state.numbers } </h3>
          <h3> Todos state name given as prop: {this.props.name}</h3>

          <h3> change numbers in Hello</h3>
          <form onSubmit={this.addNumber}>
            <input type="text" ref={this.numRef} name="number" />
            <button type="submit"> add number in this component</button>
          </form>

          <h3> change names in App</h3>
          <form onSubmit={this.addName}>
            <input type="text" ref={this.nameRef} name="name" />
            <button type="submit"> add name in parent component</button>
          </form>

          <hr/>

        </Fragment>
    );
  }
}

export default Hello;
