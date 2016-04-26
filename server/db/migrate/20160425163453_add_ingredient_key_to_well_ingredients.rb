class AddIngredientKeyToWellIngredients < ActiveRecord::Migration
  def change
    add_column :well_ingredients, :ingredient_key, :string
  end
end
