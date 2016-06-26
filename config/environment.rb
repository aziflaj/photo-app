# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  address: "smtp.sendgrid.net",
  port: "587",
  authentication: :plain,
  user_name: ENV["SENDGRID_USERNAME"], # CAREFUL! should be user_name instead of username!
  password: ENV["SENDGRID_PASSWORD"],
  domain: "heroku.com",
  enable_starttls_auto: true
}
