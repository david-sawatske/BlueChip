class Api::TransactionsController < ApplicationController
  def create
    @transaction = Transaction.new(transaction_params)
    @user = current_user

    if @transaction.save
      render :show
    else
      render json: @transaction.errors.full_messages, status: 422
    end
  end

  private
    def transaction_params
      params.require(:transaction).permit(:symbol, :transaction_date, :share_quant,
                                          :user_id, :league_id, :share_price)
    end
end
