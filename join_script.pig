collection_stations = LOAD 's3://frackers/collection_stations_filtered_nh.csv' USING PigStorage(',') AS (MonitoringLocationIdentifier:chararray,
MonitoringLocationName:chararray,
MonitoringLocationTypeName:chararray,
HUCEightDigitCode:chararray,
LatitudeMeasure:Double,
LongitudeMeasure:Double,
CountryCode:chararray,
StateCode:chararray,
CountyCode:chararray );


sample_results = LOAD 's3://frackers/sample_results_filtered_nh.csv' USING PigStorage(',') AS (ActivityStartDate:chararray,
ActivityEndDate:chararray,
ProjectIdentifier:chararray,
MonitoringLocationIdentifier:chararray,
CharacteristicName:chararray,
ResultMeasureValue:Double,
ResultUnitCode:chararray );

results_stations = join collection_stations by MonitoringLocationIdentifier, sample_results by MonitoringLocationIdentifier;

STORE results_stations INTO 's3://frackers/output_inner_join' USING PigStorage(',');
