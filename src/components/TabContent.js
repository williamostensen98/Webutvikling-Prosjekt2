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
    handlePlay(){
        var object = this.refs.Player;
        if(object.paused){
            object.play()
        }
        else{
            object.pause()
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
        return this.state.allText[this.props.activeTab-1].author
    }


    // JENNY
    renderText() {
        var relevantText = this.state.allText[this.props.activeTab-1].text
        var newText = relevantText.split("\n")
        let moreText = []
        for (var i = 0; i < newText.length ; i++) {
            moreText.push(<p key={Math.random()}>{newText[i]}</p>)
        }
        return moreText
    }

    render() {
        return(
            <div className="tab-content-container">
                <div className="image">
                    <div
                    id="svg_img"
                    style={{
                        marginLeft: this.props.activeTab === 1 || this.props.selectedButton.image  !== "Animals" ? '0px' : '50px',
                        marginTop: this.props.activeTab === 2 || (this.props.activeTab === 4 && this.props.selectedButton.image === "Animals"? '50px': '0px' )}}
                    dangerouslySetInnerHTML={{__html: this.state.image}} >

                    </div>
                </div>
                <div className="nested">
                    <div className="text-wrap">
                        {this.renderText()}
                        <p> - {this.renderAuthor()}</p>

                    </div>

                    <div className="audio-wrap" >
                        <audio id="Player" ref="Player" src={this.state.audio} />
                        <button className="controls" onClick={(e) => this.handlePlay(e)}>&#9658; / <b>||</b></button>


                    </div>
                </div>
            </div>
        )
    }


}


export default TabContent;
