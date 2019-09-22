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
            allText: [{author: "",
                        text: ""
                    }]
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
            })
     }


    componentDidMount() {
        this.getImage()
        this.getSoundCombos()
        this.getText()
        // this.getSoundCombos()

    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.activeTab !==  prevProps.activeTab || this.props.selectedButton !== prevProps.selectedButton){
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
        var relevantText = this.state.allText[this.props.activeTab-1].text
        var newText = relevantText.split("\n")
        let moreText = []
        for (var i = 0; i < newText.length ; i++) {
            moreText.push(<p>{newText[i]}</p>)
        }
        return moreText
    }

    render() {
        return(
            <div className="tab-content-container">
                <div className="image" dangerouslySetInnerHTML={{__html: this.state.image}} ></div>
                <audio src={this.state.audio} controls autoPlay/>
                <p>{this.renderText()}</p>

            </div>
        )
    }


}


export default TabContent;
