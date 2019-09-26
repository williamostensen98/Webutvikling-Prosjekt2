import React from 'react';

export default function Header(props) {
    return (
        <div className="header-container">
            <header className="header">
            <h1>
                {props.headerText}
            </h1>
            </header>
        </div>
    )
}
