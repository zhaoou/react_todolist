import React, {Component, Fragment} from 'react';
import User from "./User";
import UserForm from "./UserForm";
import {Link, Route, Switch} from "react-router-dom";
import Todos from "../todos/Todos";
import TodoDetails from "../todos/TodoDetails";
class Users extends Component {

    constructor(props) {
        super(props);
        console.log("users created")
        this.state = {users: [{id:Math.random()+"_", email: "zhaoouzhao@aliyun.com", name:"michael"}]};
        this.add = this.add.bind(this)
    }

    add({name, email}){
        console.log(name, email);
        let oldUsers = [...this.state.users];
        let existingUsers = this.state.users.filter( x => x.id == id);
        if(existingUsers[0]){
            existingUsers[0].name = name;
        } else{
            oldUsers.push( {name: name, email: email});
        }
        this.setState({users: oldUsers});
    }

    render() {
        return (
                <Fragment>

                    { this.state.users.map( (e, i) => (
                        <Fragment>
                            <User key={e.id}  user={e} save={this.add} />
                            <Route path="/user/edit/:id" render={ (props) => <UserForm {...props} save={this.add} user={e}/> } />
                        </Fragment>

                    ))}

                    <Link to="/user/create">Add</Link>
                    <Route path="/user/create" render={ (props) => <UserForm {...props} save={this.add} /> } />

                </Fragment>
        );
    }
}

export default Users;








