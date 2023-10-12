insert into Properties (property_address, property_description) VALUES ('21117 47th Avenue E', 'test 1 description');
insert into Properties (property_address, property_description) VALUES ('21818 42nd Avenue E', 'test 2 description');
insert into Properties (property_address, property_description) VALUES ('403 Rudnick Court NW', 'test 3 description');
insert into Properties (property_address, property_description) VALUES ('1800 Greenwood Dr', 'test 4 description');
insert into Properties (property_address, property_description) VALUES ('342 North St', 'test 5 description');

insert into PropertiesDetails (image_path, base_value, purchase_date) VALUES ('https://photos.zillowstatic.com/fp/0c52d2ff7289d3d542c859f68fdbc8f2-cc_ft_1536.webp', 450, '2005-10-03');
insert into PropertiesDetails (image_path, base_value, purchase_date) VALUES ('https://photos.zillowstatic.com/fp/93e01e8055e05aad272cdf9d8e132f4a-cc_ft_1536.webp', 550, '2015-02-05');
insert into PropertiesDetails (image_path, base_value, purchase_date) VALUES ('https://photos.zillowstatic.com/fp/8ccec0ac70fde08d69fed913ce83e89f-cc_ft_1536.webp', 650, '2010-05-10');
insert into PropertiesDetails (image_path, base_value, purchase_date) VALUES ('https://photos.zillowstatic.com/fp/e5c45aa3886e9b832d5a5012b25fc0ed-uncropped_scaled_within_1536_1152.webp', 400, '2006-11-12');
insert into PropertiesDetails (image_path, base_value, purchase_date) VALUES ('https://photos.zillowstatic.com/fp/510de7bae4112e920d4e688eaac98b12-uncropped_scaled_within_1536_1152.webp', 350, '2009-07-20');

insert into PropertiesMaintenance (property_id, maintenance_name, cost, maintenance_type, due_date) VALUES (1, 'AC replacement', 200, 'preventative', '2023-10-30');
insert into PropertiesMaintenance (property_id, maintenance_name, cost, maintenance_type, due_date) VALUES (1, 'Roof replacement', 10000, 'emergency', '2023-10-30');
insert into PropertiesMaintenance (property_id, maintenance_name, cost, maintenance_type, due_date) VALUES (3, 'HVAC inspection', 100, 'preventative', '2023-11-30');
insert into PropertiesMaintenance (property_id, maintenance_name, cost, maintenance_type, due_date) VALUES (4, 'Siding installation', 1000, 'cosmetic', '2023-12-31');
insert into PropertiesMaintenance (property_id, maintenance_name, cost, maintenance_type, due_date) VALUES (5, 'Annual septic pump', 250, 'scheduled', '2023-11-30');