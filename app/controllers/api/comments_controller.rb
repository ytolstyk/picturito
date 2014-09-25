module Api
  class CommentsController < ApiController
    def index
      @comments = Comment.all
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
        # make an activity record
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
      render json: {}
    end

    private

    def comment_params
      params.require(:comment).permit(:body, :picture_id)
    end
  end
end