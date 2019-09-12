import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TabContent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div className="tab-content-container">
                <svg viewBox="0 0 100 100">
                    <circle
                        id="bigCirc"
                        cx="50"
                        cy="0"
                        r="50"
                        fill="#03DAC6"
                    />
                </svg>
            </div>
        )
    }


}


export default TabContent;
