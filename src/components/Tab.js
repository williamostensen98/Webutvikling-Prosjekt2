// Src for inspiration for tabs: https://alligator.io/react/tabs-component/
import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // onClick = () => {
  //   const { label, onClick } = this.props;
  //   onClick(label);
  // }

  render() {
    const activeTab = this.props.activeTab;
    const label = this.props.label;
    const onClick = this.props.onClick;

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
    );
  }
}

export default Tab;
