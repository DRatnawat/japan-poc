import React, { useState, useEffect, useRef } from 'react'; 

const airports = {
  'SFO': {
    name: 'San Francisco International Airport',
    center: { lat: 37.6213, lng: -122.3790 }
  },
  'JFK': {
    name: 'John F. Kennedy International Airport',
    center: { lat: 40.6413, lng: -73.7781 }
  }
};

const AirportNavigation = () => {
  const [selectedAirport, setSelectedAirport] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [route, setRoute] = useState(null);  // Ensure route is defined here
  const [navigationInfo, setNavigationInfo] = useState(null);  // Ensure navigation info is set
  const [dynamicPois, setDynamicPois] = useState([]);
  const [source, setSource] = useState(null);

  const mapRef = useRef(null);
  const googleRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDFTLuameTVWO8p6X3tx8Pcjjayfo-B4UM&libraries=places,directions`;
    script.async = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [selectedAirport]);

  const initializeMap = () => {
    googleRef.current = window.google;
    const mapInstance = new googleRef.current.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 5,
    });
    setMap(mapInstance);
  
    const rendererInstance = new googleRef.current.maps.DirectionsRenderer({
      suppressMarkers: true,
    });
    setDirectionsRenderer(rendererInstance);
  };

  useEffect(() => {
    if (map && selectedAirport) {
      const airport = airports[selectedAirport];
      map.setCenter(airport.center);
      map.setZoom(15);
      map.setMapTypeId('satellite');
      map.setTilt(45);

      directionsRenderer.setMap(map);

      if (currentLocationMarker) {
        currentLocationMarker.setMap(null);
      }

      const deviceLocation = {
        lat: airport.center.lat + 0.001,
        lng: airport.center.lng + 0.001,
      };

      const marker = new googleRef.current.maps.Marker({
        position: deviceLocation,
        map: map,
        title: 'Your Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });
      setCurrentLocationMarker(marker);

      const service = new googleRef.current.maps.places.PlacesService(map);
      const request = {
        location: airport.center,
        radius: '1000',
        type: ['restaurant', 'airport', 'parking', 'shopping_mall', 'atm','terminal','checkpoint'],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === googleRef.current.maps.places.PlacesServiceStatus.OK) {
          const pois = results.map(place => ({
            position: place.geometry.location,
            title: place.name,
          }));
          setDynamicPois(pois);
        }
      });
    }
  }, [map, selectedAirport, directionsRenderer]);

  useEffect(() => {
    if (map && selectedDestination && currentLocationMarker) {
      const directionsService = new googleRef.current.maps.DirectionsService();

      const request = {
        origin: currentLocationMarker.getPosition(),
        destination: JSON.parse(selectedDestination),  // Exact lat/lng of POI
        travelMode: 'WALKING',
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
          setRoute(result.routes[0].overview_path); // Store the full route
          setNavigationInfo({
            distance: result.routes[0].legs[0].distance.text,
            duration: result.routes[0].legs[0].duration.text,
          });
        } else {
          console.error('Directions request failed:', status);
        }
      });
    }
  }, [map, selectedDestination, currentLocationMarker]);

  const startNavigation = () => {
    if (!route) {
      alert('Please select a destination first.');
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < route.length) {
        currentLocationMarker.setPosition(route[i]);
        map.panTo(route[i]);
        map.setZoom(20);
        i++;
      } else {
        clearInterval(interval);
        alert('You have reached your destination!');
        map.setZoom(15);
      }
    }, 1000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#4A90E2' }}>Dynamic Airport Navigation System</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
        <select 
          value={selectedAirport} 
          onChange={(e) => setSelectedAirport(e.target.value)} 
          style={{ padding: '10px', fontSize: '16px', width: '45%' }}
        >
          <option value="">Select an airport</option>
          {Object.keys(airports).map(code => (
            <option key={code} value={code}>{airports[code].name}</option>
          ))}
        </select>
        <select 
          value={selectedDestination} 
          onChange={(e) => setSelectedDestination(e.target.value)} 
          style={{ padding: '10px', fontSize: '16px', width: '45%' }}
        >
          <option value="">Select destination</option>
          {dynamicPois.map((poi, index) => (
            <option key={index} value={JSON.stringify(poi.position)}>{poi.title}</option>
          ))}
        </select>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={startNavigation}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4A90E2',
            color: '#fff',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
            display: selectedDestination ? 'inline-block' : 'none'
          }}
        >
          Start Navigation
        </button>
      </div>
      <div ref={mapRef} style={{ height: '600px', width: '100%', border: '1px solid #ccc' }}></div>
      {navigationInfo && (
        <div style={{ marginTop: '20px', textAlign: 'center', backgroundColor: '#f7f7f7', padding: '10px', borderRadius: '5px' }}>
          <h3 style={{ color: '#4A90E2' }}>Navigation Info</h3>
          <p>Distance: {navigationInfo.distance}</p>
          <p>Duration: {navigationInfo.duration}</p>
        </div>
      )}
    </div>
  );
};

export default AirportNavigation;
