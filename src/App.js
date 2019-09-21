import React, {Component} from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs'
import './css/main.css';
// import { render } from "react-dom";
import TabContent from "./components/TabContent"
import Footer from "./components/Footer"
import MediaCategory from "./components/MediaCategory"
import catData from "./categoryData"


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: catData
        }
    }

    render() {
        const mediaCategories = this.state.data.map(data =>
            <MediaCategory
                mediaLabel={data.mediaLabel}
                id={data.id}
                categories={data.categories}
            />);
        return (
            <div>
                <Header headerText="Welcome world!"/>
                <div className="main-content">
                    <Tabs>
                        <div label="1">
                            <TabContent
                                id="1"
                                categoryData={this.state.data}
                            />
                        </div>
                        <div label="2">
                            <TabContent
                                id="2"
                                categoryData={this.state.data}
                            />
                        </div>
                        <div label="3">
                            <TabContent
                                id="3"
                                categoryData={this.state.data}
                            />
                        </div>
                        <div label="4">
                            <TabContent
                                id="4"
                                categoryData={this.state.data}
                            />
                        </div>
                    </Tabs>
                    <div className="media-categories">
                    {mediaCategories}
                    </div>
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
