module Api
  class ActivitiesController < ApiController
    def index
      @activities = current_user.own_activities.includes(:user, :picture).page 1
    end

    def destroy
      @activity = Activity.find(params[:id])
      @activity.destroy
      render json: @activity
    end

    def update
      @activity = Activity.find(params[:id])
      @activity.update(viewed: true)
      render json: @activity
    end

    private

    def activity_params
      params.require(activity).permit(:viewed)
    end
  end
end
