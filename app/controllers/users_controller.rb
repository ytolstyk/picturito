class UsersController < ApplicationController
  before_action :ensure_logged_in, except: [:new, :create]

  def new
    images = Dir.entries("./app/assets/images/backgrounds")
    images.delete(".")
    images.delete("..")
    images.map! {|el| "/assets/backgrounds/#{el}"}
    @image = images.sample

    @user = User.new
  end

  def create
    images = Dir.entries("./app/assets/images/backgrounds")
    images.delete(".")
    images.delete("..")
    images.map! {|el| "/assets/backgrounds/#{el}"}
    @image = images.sample
    
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user ||= User.find(params[:id])
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
