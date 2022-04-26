mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: home.geometry.coordinates,
  zoom: 5,
});
const marker1 = new mapboxgl.Marker()
  .setLngLat(home.geometry.coordinates)
  .addTo(map);
