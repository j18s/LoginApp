import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Account from './Account';

//todo: put validations in place like userid exists already.

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            userid: 'bb',
            password: '900',
            isLogin: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        let self = this;
        let apiBaseUrl = "http://localhost:4000/api";
        let payload = {
            "userid": this.state.userid,
            "password": this.state.password
        };
        // console.log(this);
        axios.post(apiBaseUrl + '/login', payload)
            .then(function (response) {
                // console.log(response);
                if (response.data.code === 200) {
                    console.log(response.data);
                    self.setState({isLogin: true,
                        first_name:response.data.output.first_name,
                        last_name:response.data.output.last_name
                    });
                }
            });
    }

    render() {
        // console.log(this.props.location.state);
        // const { from } = this.props.location.state || '/';
        const {isLogin} = this.state;
        if (isLogin===false) {
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
                                defaultValue="bb"
                                onChange={(event, newValue) => this.setState({userid: newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                defaultValue="900"
                                onChange={(event, newValue) => this.setState({password: newValue})}
                            />
                            <br/>
                            <RaisedButton label="Submit" onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            );
        }
        else
        {
            return(
            <div>
                <Account first_name={this.state.first_name} last_name={this.state.last_name}/>
            </div>);
        }
    }
}

export default Login;