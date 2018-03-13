class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render json: { id: @user.id.to_s, username: @user.username }
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user =   User.find_by(id: params[:id]) || User.random_user
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
  end

  private
    def user_params
      params.require(:user).permit(:username, :password)
    end
end
