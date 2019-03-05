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
                <p>{this.props.match.params.id ? `Editing ${this.state.user.email} ${this.state.user.name}` : "Create new user"}</p>

                <form className="border border-primary" onSubmit={this.save}>
                    <input type="hidden" value={this.state.user.id}/>
                    <input type="text" name="name" value={this.state.user.name} onChange={this.handleChange}/>
                    <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange}/>
                    <button type="submit"> add name in parent component</button>
                </form>


                <form onSubmit={this.delete}>
                    <button type="submit">delete</button>
                </form>
            </Fragment>

        );
    }
}

export default withRouter(UserForm);
