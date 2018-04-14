# Beer Board

by Dana Pellerin

This is my first Node.js project. 

I wrote this because I felt that existing beer tap display projects were just too much to manage. All I wanted was something to show what I have on tap in my garage brewery. I wanted it simple and easy to update.

You can modify the number of taps displayed, the number of upcoming beers, and you can have as many beers as you want in the database which makes serving up repeat beers easy. 

I run this on a Raspberry Pi 3 attached to a 32" 1080p TV.   

## Setup

To install the dependencies, run the following from the project root:

`npm install`

You must create and pre-populate the database. Run the following in the db folder:

`sqlite3 beerboard.sqlt < create.sql`

Run the test server:

`npm start`

Test by opening a browser and browsing to http://localhost:3000


## To Do

- Add periodic auto-refresh
- Convert Admin page to single page app and RESTify