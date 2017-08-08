import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Account from './Account';
import {apiBaseUrl} from './Config';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            first_name: '',
            last_name: '',
            userid: '',
            password: '',
            url: '',
            isLogin: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        let self = this;
        let payload = {
            "userid": this.state.userid,
            "password": this.state.password
        };
        axios.post(apiBaseUrl + '/login', payload)
            .then(function (response) {
                if (response.data.code === 200) {
                    self.setState({
                        isLogin: true,
                        first_name: response.data.output.first_name,
                        last_name: response.data.output.last_name,
                        url: response.data.output.url
                    });
                }
                else if (response.data.code === 401) {
                    console.log('Record not match.')
                }
            });
    }

    render() {
        const {isLogin} = this.state;
        if (isLogin === false) {
            return (
                <div>
                    <MuiThemeProvider>
                        <div>
                            <AppBar
                                title="Login" className="App-Bar"
                            />
                            <TextField
                                hintText="Enter your Email address"
                                floatingLabelText="Email address"
                                onChange={(event, newValue) => this.setState({userid: newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({password: newValue})}
                            />
                            <br/>
                            <RaisedButton label="Submit" onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Account url={this.state.url} first_name={this.state.first_name} last_name={this.state.last_name}/>
                </div>);
        }
    }
}

export default Login;