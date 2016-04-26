class WellEntryController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  def index
  end

  def show
    render text: "heyo" + params[:id].to_s
  end

  def create
    @state = params["state-select"]
    @owner = params["owner-select"]

    # Filter appropriately
    if @owner == "All" and @state == "US"
      @wellResults = WellEntry.all
    elsif @state == "US" and @owner != "All" then
      @wellResults = WellEntry.where(owner: @owner)
    elsif @owner == "All" and @state != "US" then
      @wellResults = WellEntry.where(state: @state)
    else
      @wellResults = WellEntry.where(state: @state, owner: @owner)
    end

    # Render as json
    render json: @wellResults.as_json
  end
end
