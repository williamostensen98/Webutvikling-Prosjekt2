import React, {Component} from 'react'



class MediaCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: props.categories,
        }
    }

    isOptionFavorite(i) {
        if (this.props.categories[i].text === this.props.favoriteCombo.favoriteText) {
            return true;
        }
        if (this.props.categories.text === this.props.favoriteCombo.favoriteImage) {
            return true;
        }
        if (this.props.categories.text === this.props.favoriteCombo.favoriteSound) {
            return true;
        }
        return false;
    }
    // renderCheckbox kan utvides til å ta input for å lage en liste kategorier med props
    renderCheckbox(i) {
        return (
            <label className="radio-label" key={Math.random()}>
                <input
                    id={this.props.id}
                    type="radio"
                    checked={i === this.props.index }
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
        if (this.state.categories){ // This ensures that state.categories is set before for loop. prevents undefined .length below
            for (let i=0; i < this.state.categories.length; i++) {
                checkboxes.push(this.renderCheckbox(i))
            }
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
