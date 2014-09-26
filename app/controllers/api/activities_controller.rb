module Api
  class ActivitiesController < ApiController
    def index
      @activities = current_user.own_activities
    end

    def destroy
      @activity = Activity.find(params[:id])
      @activity.destroy
      render json: @activity
    end

  end
end
