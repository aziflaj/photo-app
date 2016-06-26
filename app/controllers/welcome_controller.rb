class WelcomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :hello]

  def index
  end

  def hello
    render json: {
      username: ENV["SENDGRID_USERNAME"],
      password: ENV["SENDGRID_PASSWORD"]
    }
  end
end
