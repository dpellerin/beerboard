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
-- Coming Soon
--
CREATE TABLE coming_soon (
    id INTEGER PRIMARY KEY,
    number INTEGER NOT NULL,
    beer_id INTEGER
);

--
-- Config
--
CREATE TABLE config (
    id INTEGER PRIMARY KEY,
    logo TEXT,
    bg TEXT
);

--
-- Insert data
--

-- Beers
INSERT INTO beers (id, brewery_name, name, description, style, ibu, srm, abv)
VALUES (1, 'Coors', 'Original', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae lobortis nisi, et ultricies ligula. Morbi mollis massa vel nibh volutpat cursus vel id lorem. Phasellus vitae neque dictum, convallis justo a, aliquet nisl. Donec sagittis, neque ac porttitor faucibus, tellus diam tempus enim, sit amet tempus nisl tellus eu neque.', 'Pilsner', '20', '3', '5.0');

INSERT INTO beers (id, brewery_name, name, description, style, ibu, srm, abv)
VALUES (2, 'Budweiser', 'Budweiser', "Nullam luctus, tellus id faucibus blandit, augue tortor vestibulum tellus, tincidunt tristique massa velit at ipsum. Phasellus luctus sapien at rutrum efficitur. Maecenas sed auctor diam. Vivamus laoreet vitae erat ut commodo. Suspendisse hendrerit at libero nec pellentesque. Integer purus urna, vehicula vitae interdum eget, mattis ac eros.", 'Pilsner', '20', '6', '4.5');

INSERT INTO beers (id, brewery_name, name, description, style, ibu, srm, abv)
VALUES (3, 'Lagunitas', 'IPA', 'Vivamus sollicitudin vitae nisl et maximus. Nunc vel leo venenatis, elementum felis in, accumsan felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas semper nibh arcu, vitae iaculis nibh mollis id.', 'IPA', '60', '12', '6.5');

INSERT INTO beers (id, brewery_name, name, description, style, ibu, srm, abv)
VALUES (4, 'Samuel Adams', 'Boston Lager', 'Curabitur ullamcorper lacus a tellus pretium ultricies. Ut consequat tincidunt nibh id commodo. Proin ut erat sapien. Sed in lacinia orci. Quisque lacinia, leo non eleifend molestie, lacus nisi lacinia elit, eu mattis nibh diam eget dolor.', 'Lager', '20', '50', '6.5');

-- Taps
INSERT INTO taps (id, number, beer_id)
VALUES (1, 1, 1);

INSERT INTO taps (id, number, beer_id)
VALUES (2, 2, 2);

INSERT INTO taps (id, number, beer_id)
VALUES (3, 3, 3);


-- Coming Soon
INSERT INTO coming_soon (id, number, beer_id)
VALUES (4, 4, 4);

-- Config
INSERT INTO config (id, logo, bg)
VALUES (1, '/images/logo.png', '/images/background.jpg');