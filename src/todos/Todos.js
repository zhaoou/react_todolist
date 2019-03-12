import React, {Component} from 'react';
import TodoForm from './TodoForm';
import * as TodoAPI from "../todos/TodoAPI";
import {Link, NavLink, Route} from "react-router-dom";
import {Spinner} from "../Main";

let NavLinks = () => (
    <nav className="nav flex-column">
        <NavLink exact className="nav-link active" to="/todo/create">Add</NavLink>
    </nav>
)

let Routes = (pr) => (
    <div>
        <Route path="/todo/create"
               render={(props) => <TodoForm {...props} crud={{add: pr.add, del: pr.del}}/>}/>
        <Route path="/todo/edit/:id"
               render={(props) => <TodoForm {...props} crud={{add: pr.add, del: pr.del}}/>}/>
    </div>
)



class Todos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [{task: "Kill Bill", id: "", complete: true}],
            found: [],
            keyword: "",
            loading: true
        };
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
        this.clearTyping = this.clearTyping.bind(this);
    }


    add({id, task, complete}) {
        if (id) {// update
            TodoAPI.update({id, task, complete});
            let oldTodos = [...this.state.todos];
            let existingTodos = this.state.todos.filter(x => x.id == id);
            if (existingTodos[0]) {
                existingTodos[0].task = task;
                existingTodos[0].complete = complete;
            }
            ;
            this.setState({todos: oldTodos, found: oldTodos});

        } else {// create
            TodoAPI.create({task: task, complete:complete, userEmail: this.props.userEmail}).then(todo => {
                let oldTodos = [...this.state.todos];
                oldTodos.push(todo);
                this.setState({todos: oldTodos, found: oldTodos});
            })
        }
    }

    delete(id) {
        let oldTodos = [...this.state.todos].filter(td => td.id != id);
        TodoAPI.remove(id);
        this.setState({todos: oldTodos, found: oldTodos});
    }

    componentDidMount() {
        Promise.all([TodoAPI.getAll(this.props.userEmail)]).then(([todos]) => {
            this.setState({todos: todos,  found: todos, loading: false})
        });
    }

    handleTyping(event) {
        let input = event.target.value;
        this.setState(old => {
            let oldTodos = [...this.state.todos.filter(td => td.task.includes(input))];
            return {todos: [...this.state.todos], keyword: input, found: oldTodos};
        });
    }

    clearTyping() {
        this.setState(old => {
            let oldTodos = [...this.state.todos];
            return {todos: [...this.state.todos], keyword: "", found: oldTodos};
        });
    }


    render() {

        if (this.state.loading) { return <Spinner/> }
        return (

            <div className="row">


                <div className="col-1 border-top border-primary">
                    <NavLinks/>
                </div>

                <div className="col-6 border-left border-primary">


                    <form>

                        <div className="input-group mb-3">

                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-outline-primary" id="button-addon1"
                                        onClick={this.clearTyping}>Clear
                                </button>
                            </div>
                            <input type="text" name="search" className="form-control" id="exampleInputTask1"
                                   value={this.state.keyword} onChange={this.handleTyping} placeholder="Search tasks"
                                   aria-describedby="button-addon1"/>

                        </div>

                    </form>


                    <ul>
                        {this.state.found.map((e) => (
                                <li key={e.id}>
                                    <Link to={`/todo/edit/${e.id}`}>
                                        {e.task}
                                        {!e.complete || <span className="badge badge-success">Done</span>}

                                    </Link>
                                </li>
                        ))}
                    </ul>

                </div>


                <div className="col border-left border-primary">
                    <Routes add={this.add} del={this.delete} users={this.state.users}/>
                </div>
            </div>

        );
    }
}

export default Todos;








