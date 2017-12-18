/*
 * Populate DB with test data
 */

--
-- Drop tables
-- 
DROP TABLE IF EXISTS beers;
DROP TABLE IF EXISTS taps;

--
-- Beers
--
CREATE TABLE beers (
    id INTEGER PRIMARY KEY,
    brewery_name TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    style TEXT NOT NULL,
    ibu REAL,
    srm REAL,
    abv REAL
);

--
-- Taps
--
CREATE TABLE taps (
    id INTEGER PRIMARY KEY,
    number INTEGER NOT NULL,
    beer_id INTEGER
);


--
-- Insert data
--

-- Beers
INSERT INTO beers (id, brewery_name, name, description, style, ibu, srm, abv)
VALUES (1, 'Coors', 'Red Pig IPA', 'A relly bitter beer', 'IPA', '90', '12', '7.0');

INSERT INTO beers (id, brewery_name, name, description, style, ibu, srm, abv)
VALUES (2, 'Budweiser', 'Douchbag Pale Ale', "You're gonna hate this one", 'Pale Ale', '20', '6', '4.5');

INSERT INTO beers (id, brewery_name, name, description, style, ibu, srm, abv)
VALUES (3, 'Fucking Brewery', 'The Fat Cow', 'A fat stout', 'Stout', '20', '50', '6.5');

INSERT INTO beers (id, brewery_name, name, description, style, ibu, srm, abv)
VALUES (4, 'Chicken Brewery', 'Some Beer', 'Beery stuff', 'Stout', '20', '50', '6.5');

-- Taps
INSERT INTO taps (id, number, beer_id)
VALUES (1, 1, 1);

INSERT INTO taps (id, number, beer_id)
VALUES (2, 2, 2);

INSERT INTO taps (id, number, beer_id)
VALUES (3, 3, 3);

INSERT INTO taps (id, number, beer_id)
VALUES (4, 4, 4);