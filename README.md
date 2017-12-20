## Beer Board

by Dana Pellerin

---

This is my first Node.js project. 

I wrote this because I felt that existing beer tap display projects were just too much to manage. All I wanted was something to show what I have on tap in my garage brewery. I wanted it simple and easy to update.

It's written specifically for my three tap setup. I usually have one in fermentation so I made a "coming soon" section. I may eventually try to make it more flexible for other folks, but for now it was written exclusively for my needs. 

I run this on a Raspberry Pi 3 attached to a 32" 1080p TV. 

---

### Setup

You must create and pre-populate the database. Run the following in the db folder:

`sqlite3 beerboard.sqlt < create.sql`

---

### To Do

- Add delete and add buttons for beers
- Allow empty taps