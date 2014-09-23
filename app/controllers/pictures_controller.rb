class PicturesController < ApplicationController
  def index
    @pictures = Picture.all.page(params[:page]).per(2)
  end

  def show
    @picture = Picture.find(params[:id])
    @picture.update(views: @picture.views += 1)
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
    @picture = Picture.find(params[:id])
    @picture.destroy
    redirect_to user_url(current_user)
  end

  private

  def picture_params
    params.require(:picture).permit(:title, :description, :img_url)
  end
end
