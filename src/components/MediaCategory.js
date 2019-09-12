import React, {Component} from 'react'

class MediaCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div className="category-container">
                <div>
                <label>
                    {this.props.mediaLabel}
                </label>
                <br />

                <input type="checkbox" id="1">
                </input>
                <label for="a"> {this.props.category1}</label>
                </div>
            </div>
        )
    }
}

export default MediaCategory
