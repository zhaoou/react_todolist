import React, {Component, Fragment} from 'react';
import User from "./User";
import UserForm from "./UserForm";
import {Link, NavLink, Route, Switch} from "react-router-dom";


let NavLinks = () => (
    <div>
        <NavLink exact to="/user/create" className="btn btn-primary">Add</NavLink>

    </div>
)

let Routes = (pr) => (
    <div>
        <Route path="/user/create" render={(props) => <UserForm {...props} save={pr.add}/>}/>
    </div>
)


class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [{id: Math.random() + "_", email: "zhaoouzhao@aliyun.com", name: "michael"}]};
        this.add = this.add.bind(this)
    }

    add({id = Math.random() + "_", name, email}) {
        console.log(name, email);
        let oldUsers = [...this.state.users];
        let existingUsers = this.state.users.filter(x => x.id == id);
        if (existingUsers[0]) {
            existingUsers[0].name = name;
            existingUsers[0].email = email;
        } else {
            oldUsers.push({id: id, name: name, email: email});
        }
        this.setState({users: oldUsers});
    }

    render() {
        return (

            <Fragment>
                <div className="col bg-warning">
                    <NavLinks/>
                </div>
                <div className="col">

                    {this.state.users.map((e) => (
                        <Fragment>
                            <h3>{e.name.toString()} {e.email} {e.id}</h3>
                            <User key={e.id} user={e} save={this.add}/>
                            <Link to={`/user/edit/${e.id}`}>Edit</Link>
                            <Route path="/user/edit/:id"
                                   render={(props) => <UserForm {...props} save={this.add} user={e}/>}/>
                        </Fragment>
                    ))}

                </div>
                <Routes add={this.add}/>
            </Fragment>
        );
    }
}

export default Users;








