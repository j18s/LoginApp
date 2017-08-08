import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Login from './Login';
import Register from './Register';
// import Account from './Account';

import logo from './images/Logo_Full_Color.svg';

class Loginscreen extends Component {
    constructor(props) {
        super(props);
        var loginButtons = [];
        loginButtons.push(<Link to="/Login" className="App-link">Logout</Link>);
        this.state = {
            username: '',
            password: '',
            loginscreen: [],
            loginmessage: '',
            loginButtons: loginButtons,
            isLogin: false
        }
    }
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <img src={logo} className="App-logo" alt="logo"/>
                        <ul className="navigation">
                            <Link to="/Login" className="App-link">Login</Link>
                            <Link to="/Register" className="App-link">Register</Link>
                            {this.state.loginButtons}
                        </ul>
                        <br/> <br/>

                        <Route path="/Login" component={Login}/>
                        <Route path="/Register" component={Register}/>
                    </div>
                </Router>
            </div>
        )
    }

}

export default Loginscreen;