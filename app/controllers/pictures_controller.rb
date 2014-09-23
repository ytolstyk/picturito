class PicturesController < ApplicationController
  def index
    @pictures = Picture.all
  end

  def show
    @picture = Picture.find(params[:id])
  end

  def new
    @picture = Picture.new
  end

  def create
    @picture = Picture.new(picture_params)
    @picture.user_id = current_user.id

    if @picture.save
      redirect_to pictures_url
    else
      flash.now[:errors] = @picture.errors.full_messages
      render :new
    end
  end

  def destroy
  end

  private

  def picture_params
    params.require(:picture).permit(:title, :description, :img_url)
  end
end
