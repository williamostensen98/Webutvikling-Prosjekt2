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
            images: [
                null, null, null, null
            ],
            texts: [
                null, null, null, null
            ]
        }
    }
    // Fetching images using AJAX and fetch() function
    getImage() {
        fetch("./media/svg/Animals/Caribou.svg")
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
    componentDidMount() {
        this.getImage()
        // this.getSoundCombos()

    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.activeTab !=  prevProps.activeTab){
            this.getSoundCombos()

        }
    }



    render() {
        return(
            <div className="tab-content-container">
                <div className="image" dangerouslySetInnerHTML={{__html: this.state.image}} ></div>
                <audio src={this.state.audio} controls autoPlay/>
            </div>
        )
    }


}


export default TabContent;
