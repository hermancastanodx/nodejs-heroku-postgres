CREATE TABLE cta_solution (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(254)
);

CREATE TABLE cta_capability (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description VARCHAR(254)
);

CREATE TABLE cta_solutionCapability (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  solutionId INTEGER,
  capabilityId INTEGER
);

CREATE TABLE cta_profile (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(254) NOT NULL,
  description VARCHAR(254),
  isAdmin boolean NOT NULL
);

CREATE TABLE cta_user (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(254) NOT NULL,
  email VARCHAR(254) NOT NULL,
  firstName VARCHAR(254),
  lastName VARCHAR(254),
  password VARCHAR(1024),
  profileId INTEGER
);

INSERT INTO cta_user (username, email, firstName, lastName, password, profileId)
  VALUES 
    ('hcastano', 'herman.castano@gmail.com', 'Herman', 'Castano', '12345', 1),
    ('ecastano', 'emilia.castano@gmail.com', 'Emilia', 'Castano', '12345', 2),
    ('acastano', 'anna.castano@gmail.com', 'Anna', 'Castano', '12345', 2);

INSERT INTO cta_profile (name, description, isAdmin)
  VALUES 
    ('System Administrator', 'System administrator with all rights', true),
    ('Designer', 'User that is able to design solutions', false);

INSERT INTO cta_solution (name, description)
  VALUES 
  ('S01', 'Solution One'), 
  ('S01', 'Solution Two'), 
  ('S01', 'Solution Three');

INSERT INTO cta_Capability (name, description)
  VALUES 
  ('C01', 'Capability One'), 
  ('C02', 'Capability Two'), 
  ('C03', 'Capability Three');

INSERT INTO cta_solutionCapability (name, solutionId, capabilityId)
  VALUES 
  ('S01-C01', 1, 1), 
  ('S01-C02', 1, 2), 
  ('S01-C03', 1, 3),
  ('S02-C01', 1, 1);