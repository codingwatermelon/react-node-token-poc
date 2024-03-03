COPY Properties(property_address, property_description)
FROM 'data_files/Properties-Table 1.csv'
DELIMITER ','
CSV HEADER;