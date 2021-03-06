React based app for finding real estate agencies nearby 2 addresses

Hosted on heroku [here](https://tranquil-eyrie-91425.herokuapp.com) 

Installation:
1. Clone the repo
2. npm install
3. npm start

Structure and Design Choices:

The application accepts two addresses and displays real estate agencies around them. A 
map is displayed with a marker for each result. A list is also displayed below the map,
having results sorted by the sum of distance between the result and the two addresses.
 
This application uses google places api to autocomplete results entered in the search bar 
and the maps api to display the results on a map. 

The parent component of the app lies in app.js. There is a MapContainer component to display 
the map and a PlacesList component to display results as a list. As both these
components essentially use the same results data, they both are direct children of the 
app component. 

The MapContainer component is responsible for getting the search results and propagating the 
results back to the parent, for the PlacesList component to consume. Search is the
thrid child component of app that also propagates the searched addresses back to app.

The search component uses [this](https://github.com/kenny-hibino/react-places-autocomplete) 
react wrapper component for google maps autocomplete api. I have set bounds on autocomplete 
to the Austin, TX area by using latlng boundary coordinates of the city from 
[here](http://www.mapdevelopers.com/geocode_bounding_box.php).

The MapContainer component uses [this](https://github.com/fullstackreact/google-maps-react) 
react based google map component to render the map. Two search queries are made to google places 
api and duplicates results are removed. The results are then sorted according to their distance 
from the input addresses. Distance here is the sum of distances from each of the two points. 
Each result is displayed on the map with the help of a marker. Clicking a marker opens an InfoWindow
that shows the name of that place.

PlacesList component displays the search results returned from google api. Each individual 
result is a child component PlaceItem that includes some information about the place such as its
name, address, rating and distance. Clicking an individual item will take you to the map and indicate
its location with a unique marker. 

I have tried to keep a logical structure for components and maintained state variables for elements
that need to influence the DOM on change. Some child components (PlaceItem from instance) pass variables
up the component hierarchy and the parent component re-distributes these to children that might use them.
PropTypes are specified for all components and I have assigned defaults where applicable.  

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
