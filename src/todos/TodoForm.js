import React, {Component, Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as TodoAPI from "../todos/TodoAPI";


class TodoForm extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {todo : {task:"", id:"", complete:false}, users: props.users};
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTaskNameTyping = this.handleTaskNameTyping.bind(this);
        this.handleTaskComplete = this.handleTaskComplete.bind(this);
        this.changeAssignee = this.changeAssignee.bind(this);

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
        if (this.state.todo.id) this.props.del(this.state.todo.id);
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

    changeAssignee(event){
        let userId = event.target.value;
        this.setState(old => {
            let newTodo = {...old.todo};
            newTodo.userId = userId;
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
        console.log(JSON.stringify(this.state.todo))
        return (
            <Fragment>
                <h1>{this.props.match.params.id ? `Editing` : "Creating"}</h1>
                {/*<p> {`${this.state.todo.task} (${this.state.todo.complete})`} </p>*/}
                <p> {`${this.state.todo.task}`} ({this.state.todo.complete? 'Complete' : 'Incomplete'}) </p>

                <form onSubmit={this.save}>
                    <input type="hidden" value={this.state.todo.id}/>

                    <div className="form-group">
                        <label htmlFor="taskName">TaskName</label>
                        <input id="taskName"
                               className="form-control"
                               type="text"
                               name="name"
                               value={this.state.todo.task}
                               onChange={this.handleTaskNameTyping}
                               placeholder="Enter full task"/>
                    </div>


                    <div className="form-group">
                        <label htmlFor="assignedTo">Assigned to</label>

                        <select className="form-control" id="assignedTo" onChange={this.changeAssignee} value={this.state.todo.userId}>
                            {this.state.users.map(u => (<option key={u.id} selected={this.state.todo.userId== u.id} value={u.id}>{u.name}</option>))}
                        </select>

                    </div>





                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={this.state.todo.complete} onChange={this.handleTaskComplete} id="complete"/>
                        <label className="form-check-label" htmlFor="complete">Done?</label>
                    </div>

                    <div className="btn-group" role="group" >
                        <button type="submit" className="btn btn-primary">Save</button>
                        {this.props.match.params.id ?
                            <button type="submit" className="btn btn-danger" onClick={this.delete}>Delete</button>
                            : "" }

                    </div>
                </form>
            </Fragment>
        );
    }
}

export default withRouter(TodoForm);



