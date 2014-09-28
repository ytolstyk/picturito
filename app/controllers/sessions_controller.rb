class SessionsController < ApplicationController
  before_action :ensure_logged_in, only: [:destroy]

  def new
    images = Dir.entries("./app/assets/images/backgrounds")
    images.delete(".")
    images.delete("..")
    images.map! {|el| "/assets/backgrounds/#{el}"}
    @image = images.sample
  end

  def create
    images = Dir.entries("./app/assets/images/backgrounds")
    images.delete(".")
    images.delete("..")
    images.map! {|el| "/assets/backgrounds/#{el}"}
    @image = images.sample
    
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
