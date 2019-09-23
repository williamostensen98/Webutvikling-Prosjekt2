import React, {Component} from 'react'


class MediaCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: props.categories,
        }
    }
    // renderCheckbox kan utvides til å ta input for å lage en liste kategorier med props
    renderCheckbox(i) {
        return (
            <label className="radio-label" for={this.props.id}>
                <input
                    id={this.props.id}
                    type="radio"
                    defaultChecked={this.props.categories[i].checked}
                    name={this.props.mediaLabel}
                    onClick={() => this.props.handleRadioChange(this.props, i)}>
                </input>
                {this.props.categories[i].text}
                <br/>
            </label>
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
