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
                    <h6>
                        {this.props.headerText}
                    </h6>
                </header>
            </div>
        )
    }

}


export default Header
