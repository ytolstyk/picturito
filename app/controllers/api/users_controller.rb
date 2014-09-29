module Api
  class UsersController < ApiController
    before_action :ensure_logged_in

    def index
      @users = User.all
    end

    def show
      @user = User.find(params[:id])
    end

    private

    def user_params
      params.require(:user).permit(:username, :password)
    end
  end
end