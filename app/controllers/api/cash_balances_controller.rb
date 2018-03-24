class Api::CashBalancesController < ApplicationController
  def create
    @cash_balance = CashBalance.new(cash_balance_params)
    @user = current_user

    if @cash_balance.save
      render :show
    else
      render json: @cash_balance.errors.full_messages, status: 422
    end
  end

  def update
    @cash_balance = CashBalance.find(params[:id])
    @user = current_user

    if @cash_balance.update(cash_balance_params)
      render :show
    else
      render json: @cash_balance.errors.full_messages, status: 422
    end
  end

  private
    def cash_balance_params
      params.require(:cash_balance).permit(:user_id, :league_id, :balance, :id)
    end
end
