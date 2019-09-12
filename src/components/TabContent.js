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
                <svg viewBox="0 0 200 200">
                    <circle
                        cx={this.props.cx}
                        cy={this.props.cy}
                        r={this.props.r}
                        fill={this.props.fill}
                    />
                </svg>
            </div>
        )
    }


}


export default TabContent;
