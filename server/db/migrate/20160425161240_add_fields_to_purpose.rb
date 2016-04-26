class AddFieldsToPurpose < ActiveRecord::Migration
  def change
    add_column :well_purposes, :purpose_key, :string
    add_column :well_purposes, :well_key, :string
    add_column :well_purposes, :purpose, :string
    add_column :well_purposes, :trade_name, :string
  end
end
