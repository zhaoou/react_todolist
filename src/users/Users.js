import React, { Component } from 'react';
import User from "./User";
import UserForm from "./UserForm";
import {Link, Route, Switch} from "react-router-dom";
import Todos from "../todos/Todos";
import TodoDetails from "../todos/TodoDetails";
class Users extends Component {

    constructor(props) {
        super(props);
        console.log("users created")
        this.state = {users: [{email: "zhaoouzhao@aliyun.com", name:"michael"}]};
        this.add = this.add.bind(this)
    }

    add(name, email){
        let oldUsers = [...this.state.users];
        console.log("111", oldUsers)
        let existingUsers = this.state.users.filter( x => x.email == email);
        console.log("222", email)
        if(existingUsers[0]){
            existingUsers[0].name = name;
        } else{
            oldUsers.push( {name: name, email: email});
        }
        this.setState({users: oldUsers});
    }

    render() {
        return (
                <div>

                    { this.state.users.map( (e, i) => (
                        <User key={i}  user={e} save={this.add} />

                    ))}

                    <Link to="/user/create">Add</Link>

                    <Switch>
                        <Route path="/user/create" render={ (props) => <UserForm {...props} save={this.add} /> } />
                        <Route path="/user/edit/:id" render={ (props) => <UserForm {...props} save={this.add} users={this.state.users}/> } />
                    </Switch>

                </div>
        );
    }
}

export default Users;








