class Api::TransactionsController < ApplicationController
  def create
    @stock = Transaction.new(stock_params)
    @user = current_user

    if @stock.save
      render "api/users/show"
    else
      render json: @stock.errors.full_messages, status: 422
    end
  end

  private
    def stock_params
      params.require(:stock).permit(:symbol, :purchase_day, :share_quant,
                                    :user_id, :league_id, :share_price)
    end
end
