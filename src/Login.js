import React, {Component, Fragment} from 'react';

import firebase from "firebase";


class Login extends Component {

    constructor(props) {
        super(props);

        this.firebaseApp = firebase.initializeApp({
            apiKey: "AIzaSyAnRPIyaZthwWYXmuq9yG-5MUAl1b9gkLM",
            authDomain: "weh8w8.firebaseapp.com",
            databaseURL: "https://weh8w8.firebaseio.com",
        });
        this.authenticateWithGithub = this.authenticateWithGithub.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
    }


    async authHandler (authCallbackData){
        this.props.update({email: authCallbackData.user.email, id: authCallbackData.user.uid});
    }

    authenticateWithGithub(){
        let auth_provider = new firebase.auth.GithubAuthProvider();
        this.firebaseApp.auth().signInWithPopup(auth_provider).then(this.authHandler);
    }

    async logout() {
        await firebase.auth().signOut();
        this.props.update({id:"", email:""});
    };


    render() {
        return (
            <Fragment>

                { ! this.props.user.email ?
                    (<button  className="btn btn-outline-primary" onClick={this.authenticateWithGithub}>github login</button>)
                    : (<button  className="btn btn-outline-danger" onClick={this.logout}>Log Out!</button>) }

            </Fragment>
        );
    }
}

export default Login;
