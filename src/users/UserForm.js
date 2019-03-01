import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import * as UserAPI from "./UserAPI";

class UserForm extends Component {

    constructor(props) {
        console.log("constructor")
        super(props);
        this.state = { user: {id: Math.random() + "_", name: "", email: ""} };
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    save(event) {
        event.preventDefault();
        this.props.save(this.state.user);
        // TODO save in API
        UserAPI.get(this.props.match.params.id).then( (user) => { this.setState({ user }) } )

        event.currentTarget.reset();
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
        UserAPI.get(this.props.match.params.id).then( (user) => { this.setState({ user }) } )
        console.log("componentDidMount")
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        console.log("componentDidUpdate")
        if (this.props.match.params.id !== prevProps.match.params.id) {
            console.log("componentDidUpdate conditions")
            UserAPI.get(this.props.match.params.id).then( (user) => { this.setState({ user }) } )
        }
    }

    render() {
        return (
            <Fragment>


                    <p>{this.props.user ? `Editing ${this.state.user.email} ${this.state.user.name}` : "Create new user"}</p>

                    <form class="border border-primary" onSubmit={this.save}>
                        <input type="hidden" value={this.state.user.id}/>
                        <input type="text" name="name" value={this.state.user.name} onChange={this.handleChange}/>
                        <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange}/>
                        <button type="submit"> add name in parent component</button>
                    </form>

            </Fragment>
        );
    }
}

export default withRouter(UserForm);
