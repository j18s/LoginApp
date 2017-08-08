import React, {Component} from 'react';
import {imgBaseUrl} from './Config';

class Account extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <p>Hello {this.props.first_name} {this.props.last_name}</p>
                <img alt="avatar" src={imgBaseUrl +this.props.url}/>
            </div>
        );
    }
}

export default Account;
