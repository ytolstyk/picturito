class UsersController < ApplicationController
  before_action :ensure_logged_in, except: [:new, :create]

  def new
    @user = User.new
  end

  def create
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
