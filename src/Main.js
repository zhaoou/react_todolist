import {NavLink, Route, Switch} from "react-router-dom";
import React, {Component, Fragment} from 'react';
import Todos from "./todos/Todos";
import Login from "./Login";


let Spinner = () => (
    <div className="d-flex justify-content-center">
        <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)


let Home = (props) => (<h3> You are signed in as: {props.user.user.email} </h3>);


let NavLinks = () => (
    <nav className="nav flex-column">
        <NavLink exact className="nav-link" activeClassName="disabled" to="/">Home</NavLink>
        <NavLink exact className="nav-link" activeClassName="disabled" to="/todo">Todos</NavLink>
    </nav>
)

let Routes = (user) => (
    <Switch>
        <Route exact path="/"
               render={(props) => <Home {...props} user={user}/>}/>

        <Route path="/todo"
               render={(props) => <Todos {...props} user={user}/>}/>

    </Switch>
)


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {user: {email: "", id: ""}};
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(user) {
        console.log(user);
        this.setState({user});
    }

    render() {

        return (
            <Fragment>
                <div className="row">
                    <div className="col-1 border-top border-primary">
                        {(this.state.user.email) ? <NavLinks/> : ''}

                        <Login update={this.updateUser} user={this.state.user}/>


                    </div>
                    <div className="col">
                        {(this.state.user.email) ? <Routes user={this.state.user}/> : ''}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Main;
export {Spinner};
