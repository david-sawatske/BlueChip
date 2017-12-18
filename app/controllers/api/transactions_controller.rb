class Api::TransactionsController < ApplicationController
  def create
    @stock = OwnedStock.new(stock_params)

    if @stock.save
      render :show
    else
      render json: @stock.errors.full_messages, status: 422
    end
  end

  private
    def stock_params
      params.require(:stock).permit(:ticker, :purchase_day, :share_quant,
                                    :user_id, :league_id, :share_price)
    end
end
