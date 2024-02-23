--DROP TABLE IF EXISTS contacts;
--DROP TABLE IF EXISTS customers;

CREATE TABLE IF NOT EXISTS Properties (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   property_address VARCHAR ( 200 ) UNIQUE NOT NULL,
   property_description VARCHAR ( 200 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS PropertiesDetails (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   image_path VARCHAR ( 200 ) NOT NULL,
   base_value INT NOT NULL,
   purchase_date DATE NOT NULL,
   CONSTRAINT fk_property_id
       FOREIGN KEY(id) 
	    REFERENCES Properties(id)
	    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PropertiesMaintenance (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   property_id INT NOT NULL,
   maintenance_name VARCHAR ( 200 ) NOT NULL,
   cost INT NOT NULL,
   maintenance_type VARCHAR ( 200 ) NOT NULL,
   due_date DATE NOT NULL,
   CONSTRAINT fk_property_id
       FOREIGN KEY(property_id) 
	    REFERENCES Properties(id)
	    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Users (
   id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   email VARCHAR ( 200 ) NOT NULL,
   password VARCHAR ( 200 ) NOT NULL
)