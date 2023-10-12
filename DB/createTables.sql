--DROP TABLE IF EXISTS contacts;
--DROP TABLE IF EXISTS customers;

CREATE TABLE IF NOT EXISTS Properties (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   property_address VARCHAR ( 200 ) UNIQUE NOT NULL,
   property_description VARCHAR ( 200 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS PropertyDetails (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   image_path VARCHAR ( 200 ) NOT NULL,
   base_value INT NOT NULL,
   purchase_date DATE NOT NULL,
   CONSTRAINT fk_property_id
       FOREIGN KEY(id) 
	    REFERENCES Properties(id)
	    ON DELETE CASCADE
);

