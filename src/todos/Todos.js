import React, {Component} from 'react';
import Todo from './TodoForm';
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
        <Route path="/todo/edit/:id" render={(props) => <Todo {...props} save={pr.add} delete={pr.delete}/>}/>
    </div>
)

class Todos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [{task:"Kill Bill", id:"", complete:true}],
            found: [],
            keyword   : ""
        };
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
        this.clearTyping = this.clearTyping.bind(this);
    }

    add({id = Math.random() + "_", task, complete=false}) {
        console.log("adding todo in App", arguments)

        let oldTodos = [...this.state.todos];
        let modified =  oldTodos.filter(td => td.id == id)[0];
        if(! modified){
            modified = {id, task, complete};
            oldTodos.push(modified);
        }
        modified.task = task;
        modified.complete = complete;
        this.setState({todos: oldTodos, found: oldTodos});
    }

    delete(id) {
        console.log("delete todo in App:",this.state.todos)
        let oldTodos = [...this.state.todos];
        let leftTodos =  oldTodos.filter(td => td.id != id);
        this.setState({todos: leftTodos, found: leftTodos});
    }

    componentDidMount() {
        TodoAPI.getAll().then( (todos) => { this.setState({ todos: todos, found: todos }) } )
    }

    handleTyping(event) {
        let input = event.target.value;
        this.setState(old => {
            let oldTodos = [...this.state.todos.filter( td => td.task.includes(input))];
            return {todos: [...this.state.todos], keyword : input, found: oldTodos};
        });
    }

    clearTyping(){
        this.setState(old => {
            let oldTodos = [...this.state.todos];
            return {todos: [...this.state.todos], keyword : "", found: oldTodos};
        });
    }


    render() {
        return (

            <div className="row">

                <div className="col-1 border-top border-success">
                    <NavLinks/>
                </div>

                <div className="col border-left border-bottom border-success">


                    <form>

                        <div className="form-group row">

                            <div className="col-sm-10">
                                <input type="text" name="search" className="form-control" id="exampleInputEmail1" value={this.state.keyword} onChange={this.handleTyping} placeholder="Search tasks"/>
                            </div>
                            <div className="col-sm-2">
                                <button type="button" className="btn btn-outline-primary" onClick={this.clearTyping}>Clear</button>
                            </div>
                        </div>

                    </form>



                    <ul>
                        {this.state.found.map((e) => (
                            <li key={e.id}>
                                <Link to={`/todo/edit/${e.id}`}>
                                    {e.task}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="col border border-success">
                    <Routes add={this.add} delete={this.delete}/>
                </div>
            </div>

        );
    }
}

export default Todos;








