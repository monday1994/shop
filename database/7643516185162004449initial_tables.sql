CREATE TABLE users(
	id INT GENERATED ALWAYS AS IDENTITY,
	email TEXT,
	password TEXT,
	nickname TEXT,
	name TEXT,
	last_name TEXT,
	sex TEXT,
	age INT,
	birthday DATE,
	city TEXT,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	PRIMARY KEY(id)
);

CREATE TABLE clubs(
	id INT GENERATED ALWAYS AS IDENTITY,
	email TEXT,
	password TEXT,
	name TEXT,
	overrall_rate DECIMAL,
	category TEXT,
	street TEXT,
	zip TEXT,
	location POINT,
	city TEXT,
	website TEXT,
	maximum_capacity INT,
	fullfillment_indicator DECIMAL,
	are_happy_hours_enabled BOOL,
	happy_hours_discount DECIMAL,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	PRIMARY KEY(id)
);

CREATE TABLE events (
	id INT GENERATED ALWAYS AS IDENTITY,
	club_id INT,
	name TEXT,
	tags TEXT[],
	start_time TIMESTAMP,
	end_time TIMESTAMP,
	overrall_rate DECIMAL,
	description TEXT,
	music TEXT[],
	entrance_fee DECIMAL,
	entrance_age INT,
	outfit TEXT[],
	interested_users INT[],
	updated_at TIMESTAMP,
	created_at TIMESTAMP,
	PRIMARY KEY(id),
	CONSTRAINT fk_club
      FOREIGN KEY(club_id) 
	  REFERENCES clubs(id)
);

CREATE TABLE rates (
	id INT GENERATED ALWAYS AS IDENTITY,
	user_id INT,
	event_id INT,
	club_id INT,
	value DECIMAL,
	created_at TIMESTAMP,
	PRIMARY KEY(id),
	CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id),
	CONSTRAINT fk_event
      FOREIGN KEY(event_id) 
	  REFERENCES events(id),
	CONSTRAINT fk_club
      FOREIGN KEY(club_id) 
	  REFERENCES clubs(id)
);