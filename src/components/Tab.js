// Src for inspiration for tabs: https://alligator.io/react/tabs-component/
import React from 'react';
import PropTypes from 'prop-types';


export default function Tab(props) {
    const activeTab = props.activeTab;
    const label = props.label;
    const onClick = props.onClick;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active';
    }
    return (
      <li
        className={className}
        onClick={onClick}
      >
        Tab {label}
      </li>
    )
}

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
