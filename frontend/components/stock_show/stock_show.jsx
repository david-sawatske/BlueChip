import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

import StockHeader from './stock_header';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { quote } = this.props.stockData;

    return (
      <div>
        <StockHeader quote={quote} />
      </div>
    )
  }
}

export default StockShow;
