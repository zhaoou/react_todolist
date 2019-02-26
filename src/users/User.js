import React, { Component, Fragment } from 'react';
import {Switch, Route, Link, NavLink, BrowserRouter, withRouter} from "react-router-dom";

class User extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }



    render() {
        return (
            <Fragment>
                <h1>NAME: {this.props.user.name}</h1>
                <h1>EMAIL: {this.props.user.email}</h1>
                <Link to={`/user/edit/${this.props.user.email}`}>Edit</Link>
                <hr/>
            </Fragment>
        );
    }
}

export default withRouter(User);
