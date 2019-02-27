import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {user: props.user || {id: Math.random() + "_", name: "", email: ""}};
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    save(event) {
        event.preventDefault();
        this.props.save(this.state.user);
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


    render() {
        return (
            <Fragment>
                <h1>{this.props.user ? `Editing ${this.state.user.email} ${this.state.user.name}` : "Create new user"}</h1>

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
