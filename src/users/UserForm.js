import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import * as UserAPI from "./UserAPI";

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {user: {id: "", name: "", email: ""}};
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.delete = this.delete.bind(this);
    }

    delete(event) {
        event.preventDefault();
        if (this.state.user.id) this.props.del(this.state.user.id);
        this.props.history.push("/user")
    }

    save(event) {
        event.preventDefault();
        this.props.save(this.state.user);
        event.currentTarget.reset();
        this.props.history.push("/user")
    }

    handleChange(event) {
        let {name, value} = event.target;
        this.setState(old => {
            let newUser = {...old.user};
            newUser[name] = value;
            return {user: newUser};
        });
    }

    componentDidMount() {
        if (this.props.match.params.id)
            UserAPI.get(this.props.match.params.id).then((user) => {
                this.setState({user})
            })
    }

    componentDidUpdate(prevProps) {
        console.log("update");
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.id && this.props.match.params.id !== prevProps.match.params.id) {
            UserAPI.get(this.props.match.params.id).then((user) => {
                this.setState({user})
            })
        }
    }

    render() {
        return (

            <Fragment>

                <h1> {this.props.match.params.id ? `Editing` : `Creating`}</h1>

                <p> {`${this.state.user.name} (${this.state.user.email})`} </p>


                <form onSubmit={this.save}>

                    <input type="hidden" value={this.state.user.id}/>

                    <div className="form-group">
                        <label htmlFor="userName">Name</label>
                        <input id="userName"
                               className="form-control"
                               type="text"
                               name="name"
                               value={this.state.user.name}
                               onChange={this.handleChange}
                               placeholder="Enter full name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="userEmail">Email address</label>
                        <input type="text"
                               className="form-control"
                               id="userEmail"
                               name="email"
                               value={this.state.user.email}
                               onChange={this.handleChange}
                               placeholder="Enter email"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Save changes</button>
                    {this.props.match.params.id ?
                        <button type="submit" className="btn btn-danger" onClick={this.delete}>Delete User</button>
                        : "" }
                </form>


            </Fragment>

        );
    }
}

export default withRouter(UserForm);
