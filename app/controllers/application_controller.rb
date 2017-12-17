class ApplicationController < ActionController::Base
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception, unless: -> { request.format.json? }

  helper_method :current_user, :logged_in?

  private
    def current_user
      return nil unless session[:session_token]
      @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
      !current_user.nil?
    end

    def login(user)
      session[:session_token] = user.reset_session_token!
      @current_user = user
    end

    def logout
      current_user.reset_session_token!
      session[:session_token] = nil
      @current_user = nil
    end

    def require_login
      render json: { base: ['Please log in'] }, status: 401 unless logged_in?
    end
end
