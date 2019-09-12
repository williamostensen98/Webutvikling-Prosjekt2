import React, {Component} from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs'
import './css/main.css';
import { render } from "react-dom";
import TabContent from "./components/TabContent"
import Footer from "./components/Footer"
import MediaCategory from "./components/MediaCategory"

class App extends Component {
    render() {
        return (
            <div>
                <Header headerText="Welcome world!"/>
                <div className="main-content">
                    <Tabs>
                        <div label="1">
                            <TabContent
                                cx="50"
                                cy="50"
                                r="50"
                                fill="#03DAC6"
                            />
                        </div>
                        <div label="2">
                            <TabContent
                                cx="100"
                                cy="100"
                                r="50"
                                fill="#CF6679"
                            />
                        </div>
                        <div label="3">
                            <TabContent
                                cx="150"
                                cy="50"
                                r="50"
                                fill="#BB86FC"
                            />
                        </div>
                        <div label="4">
                            <TabContent
                                cx="50"
                                cy="150"
                                r="50"
                                fill="#3700B3"
                            />
                        </div>
                    </Tabs>
                    <MediaCategory
                        mediaLabel="Graphics"
                        category1="Animals"
                    />

                </div>
                <Footer />
            </div>
        );
    }

}
// const container = document.createElement('div');
// document.body.appendChild(container);
// render(<App />, container);

export default App;
