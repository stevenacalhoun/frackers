class WellIngredientController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  def index
  end

  def show
    render text: "heyo" + params[:id].to_s
  end

  def create
    @well = params["well"]
    begin

      @purposePK = WellPurpose.where(well_key: @well).take.purpose_key
      @ingredients = WellIngredient.where(purpose_key: @purposePK).order(percent_mass: :desc)[0, 4]

      @formattedIngredients = []
      @ingredients.each do |ingredient|
        @ingredientString = ingredient.ingredient_name + ": " + ingredient.percent_mass.to_s + "%"
        @formattedIngredients.push(@ingredientString)
      end

      # Render as json
      render json: @formattedIngredients
    rescue
      render json: []
    end
  end
end
