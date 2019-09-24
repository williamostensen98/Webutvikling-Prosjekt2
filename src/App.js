import React, {Component} from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs'
import './css/main.css';
// import { render } from "react-dom";
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
            selected: [0, 0, 0],
            hasFavorite: localStorage.getItem('hasFavorite'),
            clicks: Number(sessionStorage.getItem('clicks'))
        }
    }

    incrementClick = (prevState) => {
        sessionStorage.setItem('clicks', this.state.clicks + 1)
        this.setState({
            clicks: this.state.clicks + 1
        })
    }

    handleRadioChange = (button, i) => {
        const sel = [...[], ...this.state.selected];
        if (button.mediaLabel === "Images") {
            sel[0] = i;
            this.setState( prevState => ({
                selectedButton: {
                    sound: prevState.selectedButton.sound,
                    image: button.categories[i].text,
                    text: prevState.selectedButton.text
                },
                selected: sel,
            }))
        }
        if (button.mediaLabel === "Sounds") {
            sel[1] = i;
            this.setState(prevState => ({
                selectedButton: {
                    sound: button.categories[i].text,
                    image: prevState.selectedButton.image,
                    text: prevState.selectedButton.text
                },
                selected: sel,
            }))
        }
        if (button.mediaLabel === "Texts") {
            sel[2] = i;
            this.setState(prevState => ({
                selectedButton: {
                    text: button.categories[i].text,
                    image: prevState.selectedButton.image,
                    sound: prevState.selectedButton.sound
                },
                selected: sel,
            }))
        }
    }

    handleClick = () => {
        localStorage.setItem('favoriteImage', this.state.selectedButton.image)
        localStorage.setItem('favoriteSound', this.state.selectedButton.sound)
        localStorage.setItem('favoriteText', this.state.selectedButton.text)
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
            },
            selected: [
                this.state.data[0].categories.findIndex((el) => el.text === localStorage.getItem('favoriteImage')),
                this.state.data[1].categories.findIndex((el) => el.text === localStorage.getItem('favoriteSound')),
                this.state.data[2].categories.findIndex((el) => el.text === localStorage.getItem('favoriteText'))
            ]
        })
    }


    handleRemove = () => {
        this.setState({
            hasFavorite: false
        })
        localStorage.clear()
    }

    render() {
        const mediaCategories = this.state.data.map((data,i) =>
            <MediaCategory
                mediaLabel={data.mediaLabel}
                key={data.id}
                categories={data.categories}
                handleRadioChange={this.handleRadioChange}
                index={this.state.selected[i]}
            />);
        return (
            <div onClick={this.incrementClick}>
                <Header headerText="Project 2"/>
                <div className="main-content">

                    <Tabs
                        mediaCategories={this.state.data}
                        selectedButton={this.state.selectedButton}
                        hasFavorite={this.state.hasFavorite}
                    >
                        <div label="1"/>
                        <div label="2"/>
                        <div label="3"/>
                        <div label="4"/>
                    </Tabs>
                    <div className="media-categories">
                        <div className="categories">{mediaCategories}</div>

                        <div className="buttons">
                            {this.state.hasFavorite
                                ? <button onClick={this.handleRemove}>Remove favorite</button>
                                : <button onClick={this.handleClick}>Add to favorite</button>
                            }
                            {this.state.hasFavorite
                                ? <button onClick={this.applyFavorite}>Apply favorite</button>
                                : null
                            }
                            <p>Your clicks: {this.state.clicks}</p>


                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

}

export default App;
