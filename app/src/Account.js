import React, {Component} from 'react';
class Account extends Component {
    // constructor(props){
    //     super(props)
    // }
    render() {
        console.log(this.props);
        return (
            <div><p>Hello {this.props.first_name} {this.props.last_name}</p></div>
        );
    }
}

export default Account;
