import {Link, NavLink, Route, Switch} from "react-router-dom";
import React, {Component, Fragment} from 'react';
import Todos from "./todos/Todos";
import Users from "./users/Users";

let About = (props) => (<h3> Abuot</h3>);

let NotFound = () => (<h3> Dis dint find </h3>);

let Home = () => (<h3> Home  </h3>);

let Spinner = () => (
    <div className="d-flex justify-content-center">
        <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)

let NavLinks = () => (
    <nav className="nav flex-column">
        <NavLink exact className="nav-link" activeClassName="disabled" to="/">Home</NavLink>
        <NavLink exact className="nav-link" activeClassName="disabled" to="/todo">Todos</NavLink>
        <NavLink exact className="nav-link" activeClassName="disabled" to="/user">Users</NavLink>
        <NavLink exact className="nav-link" activeClassName="disabled" to="/about">About</NavLink>

    </nav>
)

let Routes = () => (
    <Switch>
        <Route exact path="/"   component={Home}/>
        <Route path="/todo"     component={Todos}/>
        <Route path="/about"    component={About}/>
        <Route path="/user"     component={Users}/>
        {/*<Route path="/:page"    component={NotFound}/>*/}
    </Switch>
)


class Main extends Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-1 border-top border-primary">
                        <NavLinks/>
                    </div>
                    <div className="col">
                        <Routes/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Main;
export {Spinner};
