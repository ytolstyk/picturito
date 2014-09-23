require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Picturito
  class Application < Rails::Application
    config.paperclip_defaults = {                                   
      :storage => :s3,                                              
      :s3_protocol => 'http',                                       
      :url =>':s3_domain_url',                                      
      :path => "images/:class/:id.:style.:extension",
      :s3_host_name => 's3-us-west-1.amazonaws.com',
      :s3_credentials => {                                          
        :bucket => ENV['aws_bucket'], #these values safely stored in application.yml thanks to figaro!                
        :access_key_id => ENV['aws_access_key'],                 
        :secret_access_key => ENV['aws_secret_access_key']          
      }                                                             
    }       
  end
end
