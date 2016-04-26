#  0    MonitoringLocationIdentifier
#  1    MonitoringLocationName
#  2 x  MonitoringLocationTypeName
#  3    HUCEightDigitCode
#  4 x  LatitudeMeasure
#  5 x  LongitudeMeasure
#  6 x  CountryCode
#  7 x  StateCode
#  8    CountyCode
#  9  o ActivityStartDate
# 10  o ActivityEndDate
# 11  o ProjectIdentifier
# 12  o MonitoringLocationIdentifier
# 13  o CharacteristicName
# 14 xo ResultMeasureValue
# 15 xo ResultUnitCode

class AddFieldsToPollutionEntry < ActiveRecord::Migration
  def change
    add_column :pollution_entries, :project_id, :string
    add_column :pollution_entries, :location_id, :string
    add_column :pollution_entries, :characteristic_name, :string

    add_column :pollution_entries, :start_date, :string
    add_column :pollution_entries, :end_date, :string

    add_column :pollution_entries, :value, :decimal
    add_column :pollution_entries, :unit_code, :string
  end
end
