// Inicializar el mapa
const map = L.map('map').setView([19.845, -90.523], 14);

// Cargar tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Sitios
const sites = [
    { lat: 19.8341388, lng: -90.5564829, title: 'Vapor Lolá' },
    { lat: 19.825526, lng: -90.57013, title: 'Batería de San Luis' },
    { lat: 19.824654, lng: -90.56867, title: 'Fuerte de San Miguel' },
    { lat: 19.805915, lng: -90.600995, title: 'Parque de Lerma' },
    { lat: 19.7932242, lng: -90.6240417, title: 'Playa Bonita' },
];

// Marcadores
sites.forEach((site) => {
    L.marker([site.lat, site.lng]).addTo(map)
        .bindPopup(site.title);
});

// Polilínea
const routeCoordinates = sites.map(site => [site.lat, site.lng]);
L.polyline(routeCoordinates, { color: 'blue', weight: 4 }).addTo(map);

// Variables
let userMarker;
const destination = sites[0];
let followUser = true;

// Actualizar distancia
function updateDistance(userPosition) {
    const userLatLng = L.latLng(userPosition);
    const destinationLatLng = L.latLng(destination.lat, destination.lng);

    const distanceInMeters = userLatLng.distanceTo(destinationLatLng);
    const distanceInKm = (distanceInMeters / 1000).toFixed(2);

    document.getElementById('distance').textContent = `Distancia al destino: ${distanceInKm} km`;
}

// Geolocalización
if (navigator.geolocation) {

    navigator.geolocation.watchPosition(

        (position) => {
            const pos = [position.coords.latitude, position.coords.longitude];

            if (userMarker) {
                userMarker.setLatLng(pos);
            } else {
                userMarker = L.marker(pos).addTo(map)
                    .bindPopup('Ubicación actual')
                    .openPopup();
            }

            if (followUser) {
                map.setView(pos, 14);
            }

            updateDistance(pos);
        },

        () => {
            alert('Error: El servicio de geolocalización ha fallado.');
        },

        { enableHighAccuracy: true, maximumAge: 5000, timeout: 5000 }

    );

} else {
    alert('Error: Tu navegador no soporta geolocalización.');
}

// Botón para activar/des
::contentReference[oaicite:10]{index=10}
 
