Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :leagues, only: [:index, :show, :create]
    resources :users, only: [:create, :show]
    resources :cash_balances, only: [:create, :update]
    resource :session, only: [:create, :destroy]
    resources :transactions, only: [:create]
  end
end
