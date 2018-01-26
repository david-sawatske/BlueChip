import React from 'react';

import { merge } from 'lodash';

class SortableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOrderASC: true };

    this.handleClick = this.handleClick.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
  }

  toggleOrder() {
    this.setState({ isOrderASC: !this.state.isOrderASC })
  }

  handleClick(event) {
    event.preventDefault();

    this.toggleOrder();
    this.props.onClick(this.props.attribute, this.state.isOrderASC);
  }

  render () {
    return (
      <th>
        <a onClick={this.handleClick}>{ this.props.title } { this.props.arrow }</a>
      </th>
    );
  }
}

export default SortableHeader;
