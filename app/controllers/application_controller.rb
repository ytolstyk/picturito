class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :current_avatar
  helper_method :background_image
  helper_method :eggs

  def login_user!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def current_avatar
    if current_user.avatars.empty?
      @current_avatar ||= "https://s3-us-west-1.amazonaws.com/picturito-dev/images/avatars/default_small.jpeg"
    else
      @current_avatar ||= current_user.avatars.last.image.url(:small)
    end
  end

  def eggs
    eggs = Dir.entries("./app/assets/images/eggs")
    eggs.delete(".")
    eggs.delete("..")
    eggs.delete(".DS_Store")
    eggs.map! { |el| "/assets/eggs/#{el}".html_safe }
  end

  def background_image
    images = Dir.entries("./app/assets/images/backgrounds")
    images.delete(".")
    images.delete("..")
    images.delete(".DS_Store")
    image = images.sample
    "/assets/backgrounds/#{image}"
  end

  def logout_user!(user)
    user.reset_session_token!
    session[:session_token] = user.class.generate_session_token

    redirect_to new_session_url
  end

  def ensure_logged_in
    redirect_to new_session_url unless current_user
  end


end
