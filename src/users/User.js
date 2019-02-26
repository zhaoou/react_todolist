import React, { Component, Fragment } from 'react';
import {Switch, Route, Link, NavLink, BrowserRouter, withRouter} from "react-router-dom";

class User extends Component {

    constructor(props) {
        super(props);
        console.log(props);
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

    // goToTodo(event){
    //     event.preventDefault();
    //     this.props.history.push(`/todo/${this.props.name}`);
    // }

    componentDidMount() {
        // console.log(this, "mounted");
    }

    render() {
        return (
            <Fragment>

                <h1>NAME: {this.props.user.userName}</h1>
                <h1>EMAIL: {this.props.user.userEmail}</h1>

                {/*<Link to={{*/}
                    {/*pathname:`/user/${this.props.email}`,*/}
                    {/*state:{user:this.props.user}  }}>Details*/}
                {/*</Link>*/}
                {/*<button onClick={this.edit}>edit</button>*/}
                <hr/>
            </Fragment>
        );
    }
}

export default withRouter(User);
