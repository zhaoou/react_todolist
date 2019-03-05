import React, {Component, Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as TodoAPI from "../todos/TodoAPI";


class TodoForm extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {todo      : {task:"", id:"", complete:false}};
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTaskNameTyping = this.handleTaskNameTyping.bind(this);
        this.handleTaskComplete = this.handleTaskComplete.bind(this);

    }

    save(event) {
        event.preventDefault();
        console.log(this.state.todo);
        this.props.save(this.state.todo);
        event.currentTarget.reset();
        this.props.history.push("/todo");

    }

    delete(event) {
        event.preventDefault();
        TodoAPI.del(this.state.todo.id);//.then( () => {this.props.delete(this.state.todo.id) } );
        this.props.delete(this.state.todo.id);
        event.currentTarget.reset();
        this.props.history.push("/todo");

    }


    handleTaskComplete(event){
        let checked = event.target.checked;
        this.setState(old => {
            let newTodo = {...old.todo};
            newTodo.complete = checked;
            return {todo: newTodo};
        });
    }

    handleTaskNameTyping(event) {
        let input = event.target.value;
        this.setState(old => {
            let newTodo = {...old.todo};
            newTodo.task = input;
            return {todo: newTodo};
        });
    }

    componentDidMount() {
        if (this.props.match.params.id)
            TodoAPI.get(this.props.match.params.id).then( (todo) => { this.setState({ todo }) } )
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.id !== prevProps.match.params.id) {
            console.log("componentDidUpdate conditions")
            TodoAPI.get(this.props.match.params.id).then( (todo) => { this.setState({ todo }) } )
        }
    }

    render() {
        return (
            <Fragment>

                <h5>UserId: {this.state.todo.id}</h5>

                <p>{this.props.match.params.id ? `Editing ${this.state.todo.task} ${this.state.todo.complete}` : "Create new todo"}</p>

                <form onSubmit={this.save}>
                    <input type="hidden" value={this.state.todo.id}/>
                    <input type="text" name="name" value={this.state.todo.task} onChange={this.handleTaskNameTyping}/>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={this.state.todo.complete} onChange={this.handleTaskComplete} id="complete"/>
                        <label className="form-check-label" htmlFor="complete">Done?</label>
                    </div>
                    {/*<input type="text" name="email" value={this.state.todo.email} onChange={this.handleChange}/>*/}
                    <br/>
                    <button type="submit">save modifications</button>
                </form>

                <form  onSubmit={this.delete}>
                    <button type="submit">delete</button>
                </form>

            </Fragment>
        );
    }
}

export default withRouter(TodoForm);



