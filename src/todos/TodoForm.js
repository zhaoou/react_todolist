import React, {Component, Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as TodoAPI from "../todos/TodoAPI";
import * as UserAPI from "../users/UserAPI";


class TodoForm extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {todo      : {title:"", id:"", completed:false}};
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    save(event) {
        event.preventDefault();
        this.props.save(this.state.todo);
        event.currentTarget.reset();
        this.props.history.push("/todo")
    }


    handleChange(event) {
        let input = event.target.value;
        this.setState(old => {
            let newTodo = {...old.todo};
            newTodo.title = input;
            return {todo: newTodo};
        });
    }

    componentDidMount() {
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

                <h5>Title: {this.state.todo.title}</h5>
                <h5>UserId: {this.state.todo.id}</h5>
                <h5>Completed: {this.state.todo.completed}</h5>


                <p>{this.props.match.params.id ? `Editing ${this.state.todo.title} ${this.state.todo.completed}` : "Create new todo"}</p>

                <form className="border border-primary" onSubmit={this.save}>
                    <input type="hidden" value={this.state.todo.id}/>
                    <input type="text" name="name" value={this.state.todo.title} onChange={this.handleChange}/>
                    {/*<input type="text" name="email" value={this.state.todo.email} onChange={this.handleChange}/>*/}
                    <button type="submit">save modifications</button>
                </form>

                <hr/>
            </Fragment>
        );
    }
}

export default withRouter(TodoForm);


//storeInput = React.createRef();
//
//     goToStore = event => {
//         event.preventDefault();
//         this.props.history.push(`/store/${this.storeInput.current.value}`);
//     }
//
//     render(){
//         return (
//             <form className="store-selector" onSubmit={this.goToStore}>
//                 <h2> Please enter store</h2>
//                 <input ref={this.storeInput} type="text" placeholder="Store Name" defaultValue={getFunName()}/>
//                 <button type="submit"> visiti store </button>
//             </form>
//         );
//     }
