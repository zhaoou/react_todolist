import React, {Component, Fragment} from 'react';
import UserForm from "./UserForm";
import {Link, NavLink, Route} from "react-router-dom";

import * as UserAPI from './UserAPI'


let NavLinks = () => (
    <nav className="nav flex-column">
        <NavLink exact className="nav-link active" to="/user/create">Add</NavLink>

    </nav>
)

let Routes = (pr) => (
    <div>
        <Route path="/user/create"   render={(props) => <UserForm {...props} save={pr.add}/>}/>
        <Route path="/user/edit/:id" render={(props) => <UserForm {...props} save={pr.add}/>}/>
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

    componentDidMount() {
        UserAPI.getAll().then( (users) => { this.setState({ users }) } )
    }

    render() {
        return (

            <Fragment>

                <div className="row">
                    <div className="col-1 border-top border-primary">
                        <NavLinks/>
                    </div>

                    <div className="col">
                        <ul>
                            {this.state.users.map((e) => (
                                <li>
                                    <Link to={`/user/edit/${e.id}`}>
                                        {e.name.toString()} {e.email}
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col">
                        <Routes add={this.add}/>
                    </div>
                </div>
            </Fragment>


        );
    }
}

export default Users;








