import {Link, NavLink, Route, Switch} from "react-router-dom";
import React, {Component, Fragment} from 'react';
import Todos from "./todos/Todos";
import TodoDetails from "./todos/TodoDetails";
import Users from "./users/Users";


let About = (props) => (<h3> Abuot</h3>);

let NotFound = () => (<h3> Dis dint find </h3>);

let NavLinks = () => (
    <div>
        <NavLink exact activeStyle="nav-item nav-link" className="btn btn-primary" to="/">home</NavLink>
        <NavLink exact activeStyle="nav-item nav-link" className="btn btn-primary" to="/about">about</NavLink>
        <NavLink exact activeStyle="nav-item nav-link" className="btn btn-primary" to="/user">users</NavLink>
    </div>
)

let Routes = () => (
    <Switch>
        <Route path="/about" component={About}/>
        <Route exact path="/" component={Todos}/>
        <Route path="/todo/:id" component={TodoDetails}/>
        <Route path="/user" component={Users}/>
        <Route path="/:page" component={NotFound}/>
    </Switch>
)


class Main extends Component {
    render() {
        return (
            <Fragment>
            <div className="row">
                <div className="col bg-light">
                    <NavLinks/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Routes/>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default Main;
