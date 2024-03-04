copy properties(id, property_address, property_description)
FROM '/Users/jack/Documents/code/JoeysHomes/joeyshomes/DB/data_files/Properties-Table 1.csv'
DELIMITER ','
CSV HEADER
QUOTE '\"';

copy propertiesgeneraldetails(image_path, purchase_date)
FROM '/Users/jack/Documents/code/JoeysHomes/joeyshomes/DB/data_files/PropertiesGeneralDetails-Table 1.csv'
DELIMITER ','
CSV HEADER
QUOTE '\"';

copy propertiesfinancialdetails(rental_income, net_operating_income, cash_flow, cash_on_cash_return, total_cash_in, cap_rate, internal_rate_return, base_market_value, net_present_value, loan_to_value_ratio, operating_expense_ratio, vacancy_rate)
FROM '/Users/jack/Documents/code/JoeysHomes/joeyshomes/DB/data_files/PropertiesFinancialDetails-Table 1.csv' 
DELIMITER ',' 
CSV HEADER
QUOTE '\"';

copy propertiesmaintenance(properties_id, maintenance_name, cost, maintenance_type, due_date)
FROM '/Users/jack/Documents/code/JoeysHomes/joeyshomes/DB/data_files/PropertiesMaintenance-Table 1.csv'
DELIMITER ',' 
CSV HEADER 
QUOTE '\"';