module Api
  class PicturesController < ApiController
    wrap_parameters :picture, include: [:title, :description, :img_url]

    def index
      # include url pagination logic here
      @total_pages = Picture.total_pages
      if params[:user_id]
        @user = User.includes(:avatars).find(params[:user_id])
        @pictures = @user.pictures.includes({ user: :avatars }, :liked_users, :picture_likes, :rating).order(:id).page params[:page]
      else
        @user = current_user
        @pictures = Picture.includes({ user: :avatars }, :liked_users, :picture_likes, :rating).all.order(:id).page params[:page]
      end
    end

    def show
      @picture = Picture.includes({ user: :avatars }, :liked_users, :picture_likes, { comments: { user: :avatars } }, :rating).find(params[:id])
      @picture.update(views: @picture.views += 1)
      @picture.rating.show_action

      render :show
    end

    def new
      @picture = Picture.new
    end

    def create
      @picture = Picture.new(picture_params)
      @picture.user_id = current_user.id
      @picture.title = "*" if @picture.title == ""

      if @picture.save
        render json: @picture
      else
        render json: @picture.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @picture = Picture.find(params[:id])

      if @picture.update(picture_params)
        render json: @picture
      else
        render json: @picture.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @picture = Picture.find(params[:id])
      @picture.destroy
      render json: {}
    end

    def favorites
      if current_user
        # @pictures = current_user.liked_pictures.includes(:user, :picture_likes, :rating).order(:id).page params[:page]
        @pictures = current_user.liked_pictures.includes(:user, :rating)
          .select('pictures.*, picture_likes.created_at AS picture_like_date')
          .order(:id).page params[:page]
      else
        render json: []
      end
    end

    def popular
      @total_pages = Picture.total_pages
      @pictures = Picture.all.includes({ user: :avatars }, :liked_users, :picture_likes, :rating).order("ratings.score desc").page params[:page]
    end

    private

    def picture_params
      params.require(:picture).permit(:title, :description, :img_url)
    end
  end
end