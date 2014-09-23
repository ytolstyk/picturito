Rails.application.routes.draw do
  root to: "users#new"

  resources :users
  resource :session, only: [:new, :create, :destory]

  resources :pictures
end
