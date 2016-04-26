class CreateWellEntries < ActiveRecord::Migration
  def change
    create_table :well_entries, id: false do |t|
      t.string :id, primary: true
      t.string :owner
      t.float :latitude
      t.float :longitude
      t.string :state
      t.string :city

      t.timestamps null: false
    end
  end
end
