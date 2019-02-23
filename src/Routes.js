import {Switch, Route, Link, NavLink, BrowserRouter} from "react-router-dom";
import React, { Component } from 'react';
import Todos from "./todos/Todos";
import TodoDetails from "./todos/TodoDetails";


let About = () => (<h3> Abuot </h3>);
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
        <NavLink exact activeStyle={s} to="/about">about</NavLink>>
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
                    <Route path="/about" component={About} />
                    <Route exact path="/" component={Todos} />
                    <Route path="/todo/:id" component={TodoDetails} />

                    <Route path="/:page" component={NotFound} />

                </Switch>
                <Links/>
            </div>
        );
    }
}

export default Routes;
