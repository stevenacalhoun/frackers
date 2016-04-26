class CreateWellPurposes < ActiveRecord::Migration
  def change
    create_table :well_purposes do |t|

      t.timestamps null: false
    end
  end
end
