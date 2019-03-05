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
        this.handleChange = this.handleChange.bind(this);
    }

    save(event) {
        event.preventDefault();

        this.props.save(this.state.todo);

        // if(this.state.todo.id){//update
        //     //TodoAPI.update(this.state.todo).then( (todo) => {this.props.save(todo) } );
        //     TodoAPI.update(this.state.todo).then( (todo) => {this.props.save(todo) } );
        //     // this.props.save(todo)
        // }
        // else{//create
        //     TodoAPI.create({task:this.state.todo.task}).then( (todo) => { this.props.save(todo)} );
        // }

        //this.props.save(this.state.todo);
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


    handleChange(event) {
        let input = event.target.value;
        this.setState(old => {
            let newTodo = {...old.todo};
            newTodo.task = input;
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

                <h5>Title: {this.state.todo.task}</h5>
                <h5>UserId: {this.state.todo.id}</h5>
                <h5>Completed: {this.state.todo.complete}</h5>


                <p>{this.props.match.params.id ? `Editing ${this.state.todo.task} ${this.state.todo.complete}` : "Create new todo"}</p>

                <form  onSubmit={this.save}>
                    <input type="hidden" value={this.state.todo.id}/>
                    <input type="text" name="name" value={this.state.todo.task} onChange={this.handleChange}/>
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
