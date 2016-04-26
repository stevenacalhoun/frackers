class PollutionEntryController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  def index
  end

  def show
    render text: "heyo" + params[:id].to_s
  end

  def create
    @state = params["state"]

    # Filter appropriately
    if @state != "US"
      @pollutionResults = PollutionEntry.where(state_code: @state)
    end

    # Render as json
    render json: @pollutionResults.as_json
  end
end
