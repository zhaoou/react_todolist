import React, {Component, Fragment} from 'react';
import UserForm from "./UserForm";
import {Link, NavLink, Route} from "react-router-dom";

import * as UserAPI from './UserAPI'
import {Spinner} from "../Main";


let NavLinks = () => (
    <nav className="nav flex-column">
        <NavLink exact activeClassName="disabled" className="nav-link" to="/user/create">Add</NavLink>
    </nav>
)

let Routes = (pr) => (
    <div>
        <Route path="/user/create"   render={(props) => <UserForm {...props} save={pr.add} del={pr.del}/>}/>
        <Route path="/user/edit/:id" render={(props) => <UserForm {...props} save={pr.add} del={pr.del}/>}/>
    </div>
)


class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {users: [{id: "", email: "", name: ""}], keyword:"", found:[], loading: true};
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.handleTyping = this.handleTyping.bind(this);
        this.clearTyping = this.clearTyping.bind(this);

    }

    add({id, name, email}) {
        if(id){// update
            UserAPI.update({id, name, email});
            let oldUsers = [...this.state.users];
            let existingUsers = this.state.users.filter(x => x.id == id);
            if (existingUsers[0]) {
                existingUsers[0].name = name;
                existingUsers[0].email = email;
            };
            this.setState({users: oldUsers, found: oldUsers});

        }else{// create
            UserAPI.create({name, email}).then(user => {
                let oldUsers = [...this.state.users];
                oldUsers.push(user);
                this.setState({users: oldUsers, found: oldUsers});
            })
        }
    }

    delete(id){
        let oldUsers = [...this.state.users].filter(u => u.id != id);
        console.log(oldUsers);
        UserAPI.remove(id);
        this.setState({users: oldUsers, found: oldUsers});
    }

    handleTyping(event) {
        let input= event.target.value;
        this.setState(() => {
            let newUsers = [...this.state.users.filter((user)=> user.name.includes(input) || user.email.includes(input))];
            return {users: [...this.state.users], keyword: input, found: newUsers };
        });
    }

    clearTyping(){
        this.setState(old => {
            let oldUsers = [...this.state.users];
            return {users: oldUsers, keyword : "", found: oldUsers};
        });
    }

    componentDidMount() {
        UserAPI.getAll().then( (users) => { this.setState({ users: users, found:users, loaded: false }) } )
    }


    render() {


        if (this.state.loading) { return <Spinner/> }
        return (

            <Fragment>

                <div className="row">
                    <div className="col-1 border-top border-primary">
                        <NavLinks/>
                    </div>

                    <div className="col-6 border-left border-primary">

                        <form>

                            <div className="input-group mb-3">

                                <div className="input-group-prepend">
                                    <button type="button" className="btn btn-outline-primary"  id="button-addon1" onClick={this.clearTyping}>Clear</button>
                                </div>
                                <input type="text" name="search" className="form-control" id="exampleInputEmail1" value={this.state.keyword} onChange={this.handleTyping} placeholder="Search users" aria-describedby="button-addon1"/>


                            </div>

                        </form>


                        <ul>
                            {this.state.found.map((e) => (
                                <li key={e.id}>
                                    <Link to={`/user/edit/${e.id}`}>
                                        {e.name} {"-"}  {e.email}
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col  border-left border-primary">
                        <Routes add={this.add} del={this.delete}/>
                    </div>
                </div>
            </Fragment>


        );
    }
}

export default Users;








