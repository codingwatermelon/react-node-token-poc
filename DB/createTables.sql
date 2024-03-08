CREATE TABLE IF NOT EXISTS Properties (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   property_address VARCHAR ( 200 ) UNIQUE NOT NULL,
   property_description VARCHAR ( 200 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS PropertiesBasicGeneralDetails (
   id int PRIMARY KEY,
   image_path VARCHAR ( 200 ) NOT NULL,
   purchase_date DATE NOT NULL,
   rental_income NUMERIC(10,2) NOT NULL,
   operating_expenses NUMERIC(10,2) NOT NULL,
   purchase_price NUMERIC(10,2) NOT NULL,
   vacancy_rate NUMERIC(10,2) NOT NULL,
   CONSTRAINT fk_properties_id
       FOREIGN KEY(id) 
	    REFERENCES Properties(id)
	    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PropertiesDerivedFinancialDetails (
   id int PRIMARY KEY,
   cash_flow NUMERIC(10,2) NOT NULL,
   cash_on_cash_return NUMERIC(10,2) NOT NULL,
   total_cash_in NUMERIC(10,2) NOT NULL,
   cap_rate NUMERIC(10,2) NOT NULL,
   net_present_value NUMERIC(10,2) NOT NULL,
   loan_to_value_ratio NUMERIC(10,2) NOT NULL,
   operating_expense_ratio NUMERIC(10,2) NOT NULL,
   CONSTRAINT fk_properties_id
       FOREIGN KEY(id) 
	    REFERENCES Properties(id)
	    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PropertiesMaintenance (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   properties_id INT NOT NULL,
   maintenance_name VARCHAR ( 200 ) NOT NULL,
   cost NUMERIC(10,2) NOT NULL,
   maintenance_type VARCHAR ( 200 ) NOT NULL,
   due_date DATE NOT NULL,
   CONSTRAINT fk_properties_id
       FOREIGN KEY(properties_id) 
	    REFERENCES Properties(id)
	    ON DELETE CASCADE
);