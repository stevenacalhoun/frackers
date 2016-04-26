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

class AddMoreFieldsToPollutionEntry < ActiveRecord::Migration
  def change
    add_column :pollution_entries, :type, :string

    add_column :pollution_entries, :latitude, :string
    add_column :pollution_entries, :longitude, :string

    add_column :pollution_entries, :country_code, :integer
    add_column :pollution_entries, :state_code, :integer
  end
end
