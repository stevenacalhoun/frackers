class CreateWellIngredients < ActiveRecord::Migration
  def change
    create_table :well_ingredients do |t|
      t.string :well_key
      t.string :prupose_key
      t.string :ingredient_name
      t.float :percent_high_additive
      t.float :percent_mass

      t.timestamps null: false
    end
  end
end
