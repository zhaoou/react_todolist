import React, { Component, Fragment } from 'react';
import {Switch, Route, Link, NavLink, BrowserRouter, withRouter} from "react-router-dom";

class User extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Fragment>
                <h1>NAME {this.props.user.name.toString()} email {this.props.user.email}, id{this.props.user.id}</h1>
                <Link to={`/user/edit/${this.props.user.email}`}>Edit</Link>
            </Fragment>
        );
    }
}

export default withRouter(User);
