class PicturesController < ApplicationController
  def index
    @images = Picture.all
  end

  def new
  end

  def create
  end

  def destroy
  end
end
