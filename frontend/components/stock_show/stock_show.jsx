import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

class StockShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stockData } = this.props

    return (
      <div>
        <h2>{stockData.quote.companyName}</h2>
      </div>
    )
  }
}

export default StockShow;
