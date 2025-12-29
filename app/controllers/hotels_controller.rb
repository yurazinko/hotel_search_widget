class HotelsController < ApplicationController
  def search
    if params[:location].blank? || params[:adults].blank?
      return render json: {
        status: "error",
        message: "Location and adults count are required"
      }, status: :unprocessable_entity
    end

    results = BoomNow::Client.new.search_hotels(
      location: params[:location],
      adults: params[:adults]
    )

    render json: { status: "success", data: results }
  end
end
