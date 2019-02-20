// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable
		var client;
		// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on
		var earthquakelayer;
		// create the code to get the Earthquakes data using an XMLHttpRequest
		function getEarthquakes() {
		client = new XMLHttpRequest();
		client.open('GET','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
		client.onreadystatechange = earthquakeResponse; 
		// note don't use earthquakeResponse() with brackets as that doesn't work
		client.send();
		}
		// create the code to wait for the response from the data server, and process the response once it is received
		function earthquakeResponse() {
		// this function listens out for the server to say that the data is ready - i.e. has state 4
		if (client.readyState == 4) {
		// once the data is ready, process the data
		var earthquakedata = client.responseText;
		loadEarthquakelayer(earthquakedata);
		}
		}
		// define a global variable to hold the layer so that we can use it later on
		var earthquakelayer;
		// convert the received data - which is text - to JSON format and add it to the map
		function loadEarthquakelayer(earthquakedata) {
		// convert the text to JSON
		var earthquakejson = JSON.parse(earthquakedata);
		// add the JSON layer onto the map - it will appear using the default icons
		earthquakelayer = L.geoJson(earthquakejson).addTo(mymap);
		// change the map zoom so that all the data is shown
		mymap.fitBounds(earthquakelayer.getBounds());
		}
		// 2-2-2
		var testMarkerRed = L.AwesomeMarkers.icon({
			icon: 'play',
			markerColor: 'red'
			});
		var testMarkerPink = L.AwesomeMarkers.icon({
			icon: 'play',
			markerColor: 'pink'
			});