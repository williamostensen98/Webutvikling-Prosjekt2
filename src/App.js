import React from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs'
import './css/main.css';
import { render } from "react-dom";
import TabContent from "./components/TabContent"


function App() {
    return (
        <div>
            <Header headerText="Welcome world!"/>
            <h1>Tabs</h1>
            <Tabs>
                <div label="1">
                    <TabContent />
                </div>
                <div label="2">
                    Kombinasjon 2
                </div>
                <div label="3">
                    Kombinasjon 3
                </div>
                <div label="4">
                    Kombinasjon 4
                </div>
            </Tabs>
        </div>
    );
}
// const container = document.createElement('div');
// document.body.appendChild(container);
// render(<App />, container);

export default App;
