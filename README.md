## Beer Board
Author: Dana Pellerin

---

### Database Schema

#### Breweries
Name | Type
--- | ---
ID | Integer
Username | Text
Password | Text
Logo | Text
BreweryName | Text
URL | Text
Public | Integer

#### Beers
Name | Type
--- | --- 
ID | Integer
Brewery_Name | Text
Name | Text
Description | Text
Style | Text
IBU | Real
SRM | Real
ABV | Real
BreweryID | Integer

#### Taps
Name | Type
--- | --- 
ID | Integer
Number | Integer
BeerID | Integer
BreweryID | Integer