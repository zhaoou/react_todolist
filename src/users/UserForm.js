import React, { Component, Fragment } from 'react';
import {Link, withRouter} from "react-router-dom";

class UserForm extends Component{

    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();

        // copy of the function will be bound permanently to the object, not prototype, and will be looked up first when called. shadowing.
        this.addUser = this.addUser.bind(this);
        // this.goToTodo = this.goToTodo.bind(this);
    }

    // this function belongs to Todo.prototype
    addUser(event) {
        event.preventDefault();
        this.props.add(this.nameRef.current.value, this.emailRef.current.value);
        event.currentTarget.reset();
    }

    render() {
        return (
            <Fragment>
                {/*<h1> {this.props.user.userName}</h1>*/}
                <form onSubmit={this.addUser}>
                    <input type="text" ref={this.nameRef} name="name" />
                    <input type="text" ref={this.emailRef} name="email" />
                    <button type="submit"> add name in parent component</button>
                </form>
                <hr/>
            </Fragment>
        );
    }
}

export default withRouter(UserForm);