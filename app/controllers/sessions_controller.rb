class SessionsController < ApplicationController
  before_action :ensure_logged_in, only: [:destroy]

  def new
  end

  def create
    user = User.find_by_credentials(
        params[:username], params[:password]
      )

    if user
      login_user!(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Username/password doesn't exist"]
      render :new
    end
  end

  def destroy
    logout_user!(current_user)
  end
end
