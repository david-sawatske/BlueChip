module TransactionsHelper
  def transaction_data(transaction)
    byId = {}
    id = transaction.id.to_s

    byId[id] = { id: id,
                 symbol: transaction.symbol,
                 sharePrice: transaction.share_price,
                 shareQuant: transaction.share_quant,
                 purchaseDay: transaction.purchase_day }

    allIds = [id]

    { transactionsById: byId, allTransactionIds: allIds }
  end

  def user_league_transaction(transaction)
    transaction_id = transaction.id.to_s

    joinedById = { transaction_id => { id: transaction_id.to_s,
                                       user_id: transaction.user_id.to_s,
                                       league_id: transaction.league_id.to_s }}

    { transactionsById: joinedById,
      allTransactionIds: [transaction_id.to_s] }
  end

  def format_json(obj)
    JSON.parse(Jbuilder.encode { |json| json.(obj, *obj.attributes.keys) })
  end
end
