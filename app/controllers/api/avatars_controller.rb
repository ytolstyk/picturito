module Api
  class AvatarsController < ApiController
    wrap_parameters :avatar, include: [:avatar]

    def index
      @avatars = Avatar.all
    end

    def show
      @avatar = current_user.avatar
    end

    def new
    end

    def create
      current_user.avatar.destroy if current_user.avatar
      current_user.avatar.create(avatar_params)
    end

    def destroy
    end

    private

    def avatar_params
      params.require(:avatar).permit(:avatar)
    end
  end
end
