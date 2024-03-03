--DROP TABLE IF EXISTS contacts;
--DROP TABLE IF EXISTS customers;

CREATE TABLE IF NOT EXISTS Properties (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   property_address VARCHAR ( 200 ) UNIQUE NOT NULL,
   property_description VARCHAR ( 200 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS PropertiesGeneralDetails (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   image_path VARCHAR ( 200 ) NOT NULL,
   purchase_date DATE NOT NULL,
   CONSTRAINT fk_properties_id
       FOREIGN KEY(id) 
	    REFERENCES Properties(id)
	    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PropertiesFinancialDetails (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   rental_income INT NOT NULL,
   net_operating_income INT NOT NULL,
   cash_flow INT NOT NULL,
   cash_on_cash_return INT NOT NULL,
   total_cash_in INT NOT NULL,
   cap_rate INT NOT NULL,
   internal_rate_return INT NOT NULL,
   base_market_value INT NOT NULL,
   net_present_value INT NOT NULL,
   loan_to_value_ratio INT NOT NULL,
   operating_expense_ratio INT NOT NULL,
   vacancy_rate INT NOT NULL,
   CONSTRAINT fk_propertiesgeneraldetails_id
       FOREIGN KEY(id) 
	    REFERENCES PropertiesGeneralDetails(id)
	    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PropertiesMaintenance (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   properties_id INT NOT NULL,
   maintenance_name VARCHAR ( 200 ) NOT NULL,
   cost INT NOT NULL,
   maintenance_type VARCHAR ( 200 ) NOT NULL,
   due_date DATE NOT NULL,
   CONSTRAINT fk_properties_id
       FOREIGN KEY(properties_id) 
	    REFERENCES Properties(id)
	    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Users (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   email VARCHAR ( 200 ) NOT NULL,
   password VARCHAR ( 200 ) NOT NULL
)