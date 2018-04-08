class Api::LeaguesController < ApplicationController
  def index
    @leagues = League.includes(:cash_balances, :users)
  end

  def show
    @league = League.find_by(id: params[:id]) || League.random_league
  end

  def create
    @league = League.new(league_params)
    if @league.save
      render :show
    else
      render json: @league.errors.full_messages, status: 422
    end
  end

  private
    def league_params
      params.require(:league).permit(:name, :starting_balance)
    end
end
