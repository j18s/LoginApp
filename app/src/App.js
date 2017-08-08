import React, {Component} from 'react';
import './App.css';
import Loginscreen from './Loginscreen'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


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
