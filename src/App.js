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
            data: catData,
            selectedButton: {
                image: "Animals",
                sound: "Cartoons",
                text: "Animals"
            },
            hasFavorite: localStorage.getItem('hasFavorite') || false
        }
        this.handleRadioChange = this.handleRadioChange.bind(this)
    }



    handleRadioChange(button, i) {
        if (button.mediaLabel === "Images") {
            this.setState( prevState => ({
                selectedButton: {
                    sound: prevState.selectedButton.sound,
                    image: button.categories[i].text,
                    text: prevState.selectedButton.text
                }
            }))
        }
        if (button.mediaLabel === "Sounds") {
            this.setState(prevState => ({
                selectedButton: {
                    sound: button.categories[i].text,
                    image: prevState.selectedButton.image,
                    text: prevState.selectedButton.text
                }
            }))
        }
        if (button.mediaLabel === "Texts") {
            this.setState(prevState => ({
                selectedButton: {
                    text: button.categories[i].text,
                    image: prevState.selectedButton.image,
                    sound: prevState.selectedButton.sound
                }
            }))
        }
    }

    handleClick = () => {
        localStorage.setItem('favoriteImage', this.state.selectedButton.image)
        localStorage.setItem('favoriteSound', this.state.selectedButton.sound)
        localStorage.setItem('favoriteText', this.state.selectedButton.imagtext)
        localStorage.setItem('hasFavorite', true)
        this.setState({
            hasFavorite: true
        })
    }

    applyFavorite = () => {
        this.setState({
            selectedButton: {
                image: localStorage.getItem('favoriteImage'),
                text: localStorage.getItem('favoriteText'),
                sound: localStorage.getItem('favoriteSound')
            }
        })
    }

    handleRemove = () => {
        this.setState({
            hasFavorite: false
        })
        localStorage.clear()
    }

    render() {
        const mediaCategories = this.state.data.map(data =>
            <MediaCategory
                mediaLabel={data.mediaLabel}
                id={data.id}
                categories={data.categories}
                handleRadioChange={this.handleRadioChange}
            />);
        return (
            <div>
                <Header headerText="Welcome world!"/>
                <div className="main-content">
                    <Tabs
                        mediaCategories={this.state.data}
                        selectedButton={this.state.selectedButton}
                        hasFavorite={this.state.hasFavorite}
                    >
                        <div label="1">
                        </div>
                        <div label="2">
                        </div>
                        <div label="3">
                        </div>
                        <div label="4">
                        </div>
                    </Tabs>
                    <div className="media-categories">
                    {mediaCategories}
                    {this.state.hasFavorite ? <button onClick={this.handleRemove}>Remove favorite</button> : <button onClick={this.handleClick}>Add to favorite</button>}
                    {this.state.hasFavorite ? <button onClick={this.applyFavorite}>Apply favorite</button> : null   }



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
