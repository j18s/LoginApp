import React, {Component} from 'react';
import './App.css';
import Loginscreen from './Loginscreen'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//TODO: understand 300ms concept related to tap-event-plgin.
class App extends Component {

    render() {
        return (
            <div className="App">
                <div>
                    <Loginscreen/>
                </div>
            </div>
        );
    }
}

export default App;
