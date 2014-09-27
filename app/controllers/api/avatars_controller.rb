module Api
  class AvatarsController < ApiController
    wrap_parameters :avatar, include: [:image, :title]

    def index
      if current_user.avatars.empty?
        @avatar = []
      else
        @avatar = current_user.avatars.first
      end
    end

    def show
      @avatar = current_user.avatars
    end

    def new
    end

    def create
      current_user.avatars.destroy unless current_user.avatars.empty?
      @avatar = current_user.avatars.create(avatar_params)

      if @avatar.save
        render json: @avatar
      else
        render json: @avatar.errors.full_messages
      end
    end

    def destroy
      @picture = Picture.find(params[:id])
      @picture.destroy
      render json: @picture
    end

    private

    def avatar_params
      params.require(:avatar).permit(:image, :title)
    end
  end
end
