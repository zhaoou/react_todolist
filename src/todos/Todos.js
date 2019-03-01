import React, {Component} from 'react';
import Todo from './Todo';
import * as TodoAPI from "../todos/TodoAPI";
import {Link, NavLink, Route} from "react-router-dom";

let NavLinks = () => (
    <nav className="nav flex-column">
        <NavLink exact className="nav-link active" to="/todo/create">Add</NavLink>

    </nav>
)

let Routes = (pr) => (
    <div>
        <Route path="/todo/create"   render={(props) => <Todo {...props} save={pr.add}/>}/>
        <Route path="/todo/edit/:id" render={(props) => <Todo {...props} save={pr.add}/>}/>
    </div>
)

class Todos extends Component {

    constructor(props) {
        super(props);
        // this.state = {ray: ["Kill Bill", "Buy Milk"]};

        this.state = {todos: [{title:"Kill Bill", userId:"0", completed:true}]};

        this.add = this.add.bind(this);
    }

    add(name) {
        console.log("adding name in App")
        // let oldNames = [...this.state.ray];
        // oldNames.push(name);
        // this.setState({ray: oldNames});
    }

    componentDidMount() {
        console.log("todos componentDidMount")
        TodoAPI.getAll().then( (todos) => { this.setState({ todos }) } )
    }

    render() {
        return (

            <div className="row">

                <div className="col-1 border-top border-primary">
                    <NavLinks/>
                </div>

                <div className="col">
                    {/*{this.state.todos.map((e, i) => (*/}
                        {/*<Todo key={i} name={e.title} userId={e.userId} completed={e.completed.toString()} add={this.add}/> //*/}
                    {/*))}*/}

                    <ul>
                        {this.state.todos.map((e) => (
                            <li>
                                <Link to={`/todo/edit/${e.id}`}>
                                    {e.title.toString()}
                                </Link>

                            </li>
                        ))}
                    </ul>
                </div>


                <div className="col">
                    <Routes add={this.add}/>
                </div>
            </div>

        );
    }
}

export default Todos;








