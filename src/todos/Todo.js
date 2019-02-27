import React, {Component, Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";


class Todo extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.nameRef = React.createRef();

        // copy of the function will be bound permanently to the object, not prototype, and will be looked up first when called. shadowing.
        this.addName = this.addName.bind(this);
        this.goToTodo = this.goToTodo.bind(this);
    }

    // this function belongs to Todo.prototype
    addName(event) {
        event.preventDefault();
        this.props.add(this.nameRef.current.value);
        event.currentTarget.reset();
    }

    goToTodo(event) {
        event.preventDefault();
        this.props.history.push(`/todo/${this.props.name}`);
    }

    componentDidMount() {
        // console.log(this, "mounted");
    }

    render() {
        return (
            <Fragment>

                <h1> {this.props.name}</h1>

                {/*<form onSubmit={this.goToTodo}>*/}
                {/*<button type="submit"> see todo </button>*/}
                {/*</form>*/}
                <Link to={`/todo/${this.props.name}`}>Details</Link>

                <h3> change names in App</h3>
                <form onSubmit={this.addName}>
                    <input type="text" ref={this.nameRef} name="name"/>
                    <button type="submit"> add name in parent component</button>
                </form>

                <hr/>
            </Fragment>
        );
    }
}

export default withRouter(Todo);


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
