module Api
  class PictureLikesController < ApiController
    def index
      @picture_likes = PictureLike.all
    end

    def create
      @like = PictureLike.new(picture_like_params)
      @like.user = current_user

      if @like.save
        # make an activity record
        render json: @like
      else
        render json: @like.errors.full_messages
      end
    end

    def destroy
      @like = current_user.picture_likes.find_by_picture_id(params[:id])
      @like.destroy
      render json: {}
    end

    private

    def picture_like_params
      params.require(:picture_like).permit(:picture_id)
    end
  end
end