import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import logo from './images/Logo_Full_Color.svg';
import Message from './Message'
class Loginscreen extends Component {
    constructor(props) {
        super(props);
        // var loginButtons = [];
        // loginButtons.push();
        this.state = {
            username: '',
            password: '',
            loginscreen: [],
            loginmessage: '',
            loginButtons: '',
            isLogin: false
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Router>
                        <div>
                            <Link to="/"><img src={logo} className="App-logo" alt="logo"/></Link>

                            <ul className="navigation">
                                <Link to="/Login" className="App-link">Login</Link>
                                <Link to="/Register" className="App-link">Register</Link>
                                <Link to="/" className="App-link">Logout</Link>
                            </ul>
                            <Message message="Welcome! Please login or register yourself using above action buttons."/>

                            <br/> <br/>

                            <Route path="/Login" component={Login}/>
                            <Route path="/Register" component={Register}/>
                        </div>
                    </Router>
                </div>
            </div>
        )
    }

}

export default Loginscreen;