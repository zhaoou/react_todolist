import React, { Component, Fragment } from 'react';
import {Link, withRouter} from "react-router-dom";

class UserForm extends Component{

    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        console.log("form created")

        this.user = {name: "", email: ""};
        console.log("constructor2")
        if(props.match && props.users) {
            console.log("constructor2")
            this.user = props.users.filter(u => u.email == this.props.match.params.id)[0];
        }
        this.save = this.save.bind(this);
    }

    // this function belongs to Todo.prototype
    save(event) {
        event.preventDefault();
        this.props.save(this.nameRef.current.value, this.emailRef.current.value);
        event.currentTarget.reset();
    }


    shouldComponentUpdate(nextProps) {
        console.log("getting props", nextProps,"aaa");
        if(nextProps.match && nextProps.users) {
            let matchingUsers =  nextProps.users.filter(u => u.email == nextProps.match.params.id)
            if(matchingUsers) {
                console.log("ccc",matchingUsers[0])
                this.user = matchingUsers[0];
                console.log("new user: ", this.user);

            }else{
                this.user = {name:"", email:""};
            }
            return true;
        }
        else{
            this.user = {name:"", email:""};
            console.log("bbb", this.user);
        }
        return false;
    }

    render() {
        return (
            <Fragment>
                <h1>{this.props.user? "Edit user" :  "Create user"}</h1>
                <form onSubmit={this.save}>
                    <input type="text" ref={this.nameRef} name="name" defaultValue={this.user.name} />
                    <input type="text" ref={this.emailRef} name="email" defaultValue={this.user.email}/>
                    <button type="submit"> add name in parent component</button>
                </form>
                <hr/>
            </Fragment>
        );
    }
}

export default withRouter(UserForm);
