Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resources :users, only: [:show, :index], defaults: { format: :json }
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :pictures do
      resources :comments, only: [:index]
    end
    resources :comments
    resources :picture_likes
    resources :activities
    resources :avatars
  end
end