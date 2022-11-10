DROP TABLE IF EXISTS van CASCADE;
DROP TABLE IF EXISTS family;

CREATE TABLE van (
    id serial PRIMARY KEY,
    make text,
    license_plate text
);

CREATE TABLE family (
    id serial PRIMARY KEY,
    member_name text,
    driver_license boolean,
    van_id integer,
    CONSTRAINT fk_van_id
        FOREIGN KEY(van_id)
        REFERENCES van(id) ON DELETE CASCADE
);


 