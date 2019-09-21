import React, {Component} from 'react';
//import PropTypes from 'prop-types';


class TabContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animalLimericks: [],
            test: ""

        }

    }

    getText() {
         fetch("./media/text/animals.json")
             .then(response => response.json())
             .then(response => {
                const {limericks} = response.data
                this.setState({ animalLimericks: limericks })
                this.setState({ test: limericks[0].text })
            })
     }  

    componentDidMount() {
        this.getText()
    }



    render() {
        return(
            <div className="tab-content-container">
            <p>  </p>
                {/*<svg viewBox="0 0 300 200">
                    <circle
                        cx={this.props.cx}
                        cy={this.props.cy}
                        r={this.props.r}
                        fill={this.props.fill}
                    />
                </svg>*/}
                <p>{this.state.test}</p>
            </div>
        )
    }


}


export default TabContent;
