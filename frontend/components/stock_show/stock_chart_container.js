import { connect } from 'react-redux';

import { requestChartUpdate } from '../../actions/remote_stock_actions';

import StockChart from './stock_chart';

const mapStateToProps = (state, ownProps) => {
  const { symbol, companyName } = ownProps;

  return ({ symbol: symbol,
            companyName: companyName,
            chartData: state.ui.remoteStocks.remoteChartData[symbol],
            isChartLoading: state.ui.loading.remoteChartLoading })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestChartUpdate: (symbol, interval) => (
    dispatch(requestChartUpdate(symbol, interval))
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockChart);
