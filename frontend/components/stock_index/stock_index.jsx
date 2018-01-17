import React from 'react';

import StockShow from '../stock_show/stock_show'
import Loader from '../shared/loader';

class StockIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { ownedTickers } = this.props;

    if (ownedTickers) {
      this.props.requestStockSearch(ownedTickers)
    }
  }

  render() {
    const { remoteStockData, transactionData, showModal, hideModal,
            isRemoteStockLoading, currentUser  } = this.props;

    let ShowComponent
    if ( isRemoteStockLoading ) {
      ShowComponent = <Loader />
    } else {
        const tickerArray = Object.keys(transactionData)

        ShowComponent = tickerArray.map((symbol, idx) => (
          <StockShow remoteStockData={remoteStockData[symbol]}
                     stockTransactionData={transactionData[symbol]}
                     currentUser={currentUser}
                     showModal={showModal}
                     hideModal={hideModal}
                     key={idx} />
        ))
    }

    return (
      <div className="">
        { ShowComponent }
      </div>
    )
  }
}

export default StockIndex;
