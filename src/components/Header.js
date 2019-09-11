import React, {Component} from 'react';


class Header extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const text = "Hello world!";
        return (
            <div className="header-container">
                <header className="header">
                    <h1>
                        {text}
                    </h1>
                </header>
            </div>
        )
    }

}


export default Header
