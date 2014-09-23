class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def login_user!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token

    redirect_to pictures_url #IMAGES URL
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def ensure_logged_in
    redirect_to pictures_url unless current_user
  end


end
