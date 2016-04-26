class AddPurposeKeyToWellIngredients < ActiveRecord::Migration
  def change
    add_column :well_ingredients, :purpose_key, :string
  end
end
