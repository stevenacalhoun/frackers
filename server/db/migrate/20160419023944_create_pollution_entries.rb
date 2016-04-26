class CreatePollutionEntries < ActiveRecord::Migration
  def change
    create_table :pollution_entries do |t|

      t.timestamps null: false
    end
  end
end
