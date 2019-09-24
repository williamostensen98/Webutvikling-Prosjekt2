import React, {Component} from 'react';


class Header extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div className="header-container">
                <header className="header">
                <h1>
                    {this.props.headerText}
                </h1>
                </header>
            </div>
        )
    }

}


export default Header
