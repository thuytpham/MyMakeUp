import React, { Component } from 'react';
import { withCookies } from 'react-cookie';



class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLoginView: true
    }

    inputChanged = event => {
        let cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});

    }
    login = event => {
        if(this.state.isLoginView) {
            fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.credentials)
                }).then( resp => resp.json())
                .then( res => {
                    console.log(res.token);
                    this.props.cookies.set('name-token', res.token);
                    window.location.href = '/products';
                })
                .catch( error => console.log(error))
        
        }else{

            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.credentials)
                }).then( resp => resp.json())
                .then( res => {
                    this.setState({isLoginView: true});
                })
                .catch( error => console.log(error))
        } 
    }
    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView});
    }

    render(){
        return ( 
            <div className="login-container">
                <h1>
                    { this.state.isLoginView ? 'Login': 'SignUp Form'}
                </h1>
                    <span>Username</span><br/>
                    <input type="text" name = "username" value={this.state.credentials.username} 
                        onChange={this.inputChanged}/><br/>
                    <span>Password</span><br/>
                    <input type="text" name = "password" value={this.state.credentials.password} 
                        onChange={this.inputChanged}/><br/><br/>
                    <button onClick={this.login}>
                        { this.state.isLoginView ? 'Login': 'SignUp'}
                        </button><br/><br/>
                    <p onClick={this.toggleView}>
                        { this.state.isLoginView ? 'New User? Please click here': 'Back To Login. Please click here'}
                    </p>   
                </div>
    
        )
    }
}

export default withCookies(Login);