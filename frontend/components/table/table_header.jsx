import React from 'react';

class SortableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOrderASC: false };

    this.handleClick = this.handleClick.bind(this);
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
    const clickFn = (this.props.arrow) ? this.handleClick : null;

    return (
      <th>
        <a onClick={clickFn}>{ this.props.title } { this.props.arrow }</a>
      </th>
    );
  }
}

export default SortableHeader;
