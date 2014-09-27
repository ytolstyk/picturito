module Api
  class CommentsController < ApiController
    def index
      @comments = Comment.all.order(:id).page params[:page]
    end

    def show
      @comment = Comment.find(params[:id])
    end

    def new
      @comment = Comment.new
    end

    def create
      @comment = Comment.new(comment_params)
      @comment.user_id = current_user.id

      if @comment.save
        # make an activity record unless on yourself
        unless current_user.id == @comment.picture.user.id
          Activity.create(
            user_id: current_user.id,
            owner_id: @comment.picture.user.id,
            action: "commented on",
            picture_id: @comment.picture.id
            )
        end

        render json: @comment
      else
        render json: @comment.errors.full_messages
      end
    end

    def update
    end

    def destroy
      @comment = Comment.find(params[:id])
      @comment.destroy

      # destroy activity
      @comment.user.activities.where(picture_id: @comment.picture.id).each do |act|
        act.destroy
      end
      
      render json: {}
    end

    private

    def comment_params
      params.require(:comment).permit(:body, :picture_id)
    end
  end
end