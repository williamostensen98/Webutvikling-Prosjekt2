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
                    <input type="checkbox" name={this.props.categories[i]}>
                    </input>
                    <label for="a"> {this.props.categories[i]}</label>
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
                </label>
                <br />
                <ul className="media-list">
                    {this.createCheckbox()}
                </ul>
            </div>
        )
    }
}

export default MediaCategory
