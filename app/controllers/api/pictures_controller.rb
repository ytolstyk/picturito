module Api
  class PicturesController < ApiController
    wrap_parameters :picture, include: [:title, :description, :img_url]

    def index
      @pictures = Picture.all.order(:id)
    end

    def show
      @picture = Picture.find(params[:id])
      @picture.update(views: @picture.views += 1)

      render :show
    end

    def new
      @picture = Picture.new
    end

    def create
      @picture = Picture.new(picture_params)
      @picture.user_id = current_user.id

      if @picture.save
        render json: @picture
      else
        render json: @picture.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
    end

    def destroy
      @picture = Picture.find(params[:id])
      @picture.destroy
      render json: {}
    end

    private

    def picture_params
      params.require(:picture).permit(:title, :description, :img_url)
    end
  end
end