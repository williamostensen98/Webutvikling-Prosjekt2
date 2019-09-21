import React, {Component} from 'react'

class MediaCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: props.categories
        }
    }
    // renderCheckbox kan utvides til å ta input for å lage en liste kategorier med props
    renderCheckbox(i) {
        return (
                <li>
                    <label className="checkbox-label">
                        <input type="checkbox" name={this.props.categories[i].name}>
                        </input>
                        {this.props.categories[i].text}
                        <span className="checkbox-custom"></span>
                    </label>
                </li>
        )
    }

    createCheckbox = () => {
        let checkboxes = []
        for (let i=0; i < this.state.categories.length; i++) {
            checkboxes.push(this.renderCheckbox(i))
        }
        return checkboxes
    }

    render() {
        // console.log(this.state.categories[0])
        return(
            <div className="category-container">
                <label>
                    {this.props.mediaLabel}
                <ul className="media-list">
                    {this.createCheckbox()}
                </ul>
                </label>
            </div>
        )
    }
}

export default MediaCategory
