#!/bin/bash
psql -U postgres -d joeyshomes -a -c "\copy properties(id, property_address, property_description) from 'data_files/Properties.csv' DELIMITER ',' CSV HEADER"

psql -U postgres -d joeyshomes -a -c "\copy propertiesgeneraldetails(image_path, purchase_date) FROM 'data_files/PropertiesGeneralDetails.csv' DELIMITER ',' CSV HEADER"

psql -U postgres -d joeyshomes -a -c "\copy propertiesfinancialdetails(rental_income, net_operating_income, cash_flow, cash_on_cash_return, total_cash_in, cap_rate, internal_rate_return, base_market_value, net_present_value, loan_to_value_ratio, operating_expense_ratio, vacancy_rate) FROM 'data_files/PropertiesFinancialDetails.csv' DELIMITER ',' CSV HEADER"

psql -U postgres -d joeyshomes -a -c "\copy propertiesmaintenance(properties_id, maintenance_name, cost, maintenance_type, due_date) FROM 'data_files/PropertiesMaintenance.csv' DELIMITER ',' CSV HEADER"