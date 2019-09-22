import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import axios from "axios"


class TabContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryData: this.props.categoryData,
            imgID: 1,
            audio: "",
            textID: 1,
            image: "",
            allText: {author: "",
                    text: ""
            }
        }
    }
    // Fetching images using AJAX and fetch() function
    getImage() {
        fetch("./media/svg/" + this.props.selectedButton.image + "/" + this.props.activeTab + ".svg")
        .then(response => response.text())
        .then(response => {
            this.setState({
                image: response
            })
        })
    }

    getSoundCombos(){
        this.setState({
            audio: "./media/sounds/" + this.props.selectedButton.sound +"/"+ this.props.activeTab + ".mp3"
        })
    }

    //JENNY
    getText() {
         fetch("./media/text/"+this.props.selectedButton.text+".json")
             .then(response => response.json())
             .then(response => {
                this.setState({ allText: response.data.limericks })
                // console.log(this.state.allText[0].text) //HVORFOR FUNKER DETTE

            })
     }


    componentDidMount() {
        this.getImage()
        this.getText()
        // console.log(this.state.allText) //HVORFOR FUNKER DETTE IKKE
        // this.getSoundCombos()

    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.activeTab !=  prevProps.activeTab){
            this.getSoundCombos()
            this.getImage()
            this.getText()

        }
    }

    renderAuthor() {
        return this.state.allText[this.props.activeTab].author

    }


    // JENNY
    renderText() {
        // console.log(this.state.allText[0].text)
        var relevantText = this.state.allText[this.props.activeTab-1].text
        var newText = relevantText.split("\r")
        // console.log(this.state.allText[0][text])
        let moreText = []
        for (var i = 0; i < newText.length() ; i++) {
            moreText.append(<p>{newText[i]}</p>)
        }
        return moreText
    }

    render() {
        {this.getText()}
        return(
            <div className="tab-content-container">
                <div className="image" dangerouslySetInnerHTML={{__html: this.state.image}} ></div>
                <audio src={this.state.audio} controls autoPlay/>
                <p>{this.state.allText[0]}</p>
            </div>
        )
    }


}


export default TabContent;
