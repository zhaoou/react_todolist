import {Switch, Route, Link, NavLink, BrowserRouter} from "react-router-dom";
import React, { Component } from 'react';
import Todos from "./todos/Todos";
import TodoDetails from "./todos/TodoDetails";
import Users from "./users/Users";


let About = (props) => (<h3> Abuot {props.name}</h3>);
let NotFound = () => (<h3> Dis dint find  </h3>);

let Links = () => (
    <div>
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
    </div>
)

let s = { color: "red"};

let NavLinks = () => (
    <div>
        <NavLink exact activeStyle={s} to="/">home</NavLink>
        <NavLink exact activeStyle={s} to="/about">about</NavLink>
        <NavLink exact activeStyle={s} to="/user">users</NavLink>
    </div>
)

// let Router = () => (
//     <BrowserRouter>
//         <Switch>
//             <Route exact path="/" component={StorePicker} />
//             <Route path="/store/:storeId" component={App} />
//             <Route path="/:page" component={NotFound} />
//         </Switch>
//     </BrowserRouter>
//
// )


class Routes extends Component {

    render() {
        return (
            <div>
                <NavLinks/>
                <Switch>
                    <Route path="/about"  render={ (props) => <About {...props} name={"Joel"} /> } />
                    <Route exact path="/" component={Todos} />
                    <Route path="/todo/:id" component={TodoDetails} />
                    <Route path="/user" component={Users} />

                    <Route path="/:page" component={NotFound} />
                </Switch>
                {/*<Links/>*/}
            </div>
        );
    }
}

export default Routes;
