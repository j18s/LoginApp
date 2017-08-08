import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Message from './Message'
import {apiBaseUrl} from './Config';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            userid: '',
            password: '',
            btnLabel: 'Submit',
            btnDisabled: false,
            isSubmitted: false
        };
        this.submitData = this.submitData.bind(this);
    }

    submitData() {
        let self = this;
        let payload = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "userid": this.state.userid,
            "password": this.state.password
        };

        self.setState({btnLabel: 'Registering ...', btnDisabled: !this.state.btnDisabled});

        axios.post(apiBaseUrl + '/register', payload)
            .then(function (response) {
                if (response.data.code === 200) {
                    console.log(response.data.output.insertId);
                    axios.post(apiBaseUrl + '/setimage/' + response.data.output.insertId)
                        .then(function () {
                            self.setState({isSubmitted: true});
                        });
                }
            });
    }

    render() {
        const {isSubmitted} = this.state;
        if (isSubmitted === false) {
            return (
                <div>
                    <MuiThemeProvider>
                        <div>
                            <AppBar
                                title="Register" className="App-Bar"
                            />
                            <TextField
                                hintText="Enter your First Name"
                                floatingLabelText="First Name"
                                onChange={(event, newValue) => this.setState({first_name: newValue})}
                            />
                            <br/>
                            <TextField
                                hintText="Enter your Last Name"
                                floatingLabelText="Last Name"
                                onChange={(event, newValue) => this.setState({last_name: newValue})}
                            />
                            <br/>
                            <TextField
                                hintText="Enter your Email"
                                type="email"
                                floatingLabelText="Email"
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
                            <RaisedButton label={this.state.btnLabel}
                                          disabled={this.state.btnDisabled}
                                          onClick={this.submitData}></RaisedButton>
                        </div>
                    </MuiThemeProvider>
                </div>
            )
        }
        else {
            return (
                <Message message="User is registered, please use Login button to login."/>
            )
        }
    }
}

export default Register;