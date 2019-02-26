import React, { Component } from 'react';
import User from "./User";
import UserForm from "./UserForm";
class Users extends Component {

    constructor(props) {
        super(props);
        console.log("users created")
        this.state = {users: [{userName:"michael",userEmail: "zhaoouzhao@aliyun.com"}]};
        this.add = this.add.bind(this)
        this.edit = this.edit.bind(this);
    }

    add(name, email){
        let oldUsers = [...this.state.users];
        let user = {userName:name, userEmail:email};
        oldUsers.push(user);
        this.setState({users: oldUsers});
    }

    edit(name, email){
        console.log("edit is working")
        // let oldUsers = [...this.state.users];
        // let user = {userName:name, userEmail:email};
        // oldUsers.push(user);
        // this.setState({users: oldUsers});
    }

    render() {
        return (
                <div>

                    { this.state.users.map( (e, i) => (

                        <User key={i}  user={e} add={this.add} edit={this.edit}/>


                    ))}

                    <UserForm add={this.add}/>
                </div>
        );
    }
}

export default Users;








