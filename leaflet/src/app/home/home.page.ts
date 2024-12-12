import { Component } from '@angular/core';
import * as L from 'leaflet';

// Deklarasi Komponen
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map!: L.Map;
  currentLayer!: L.TileLayer;
  markerIcon!: L.Icon;

  //fungsi yg berjalan ketika inisialisasi
  constructor() {}

  // Initialize the custom marker icon
  initializeMarkerIcon() {
    this.markerIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL for the custom icon
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // The point of the icon which will be anchored to the marker position
      popupAnchor: [0, -32] // The point from which the popup will appear relative to the icon
    });
  }

  //dijalankan setelah komponen terinisialisasi
  ngOnInit() {}

  ionViewDidEnter() {
    // Initialize map
    this.map = L.map('mapId').setView([-6.172585117601355, 106.82667995208206], 11);

    // Add default tile layer
    this.currentLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Initialize the custom marker icon
    this.initializeMarkerIcon();

    // Define coordinates and data for popup
    const stations = [
      { nama: 'SPKLU Pantai Indah', x: -6.122509432, y: 106.7437603, jam_buka: '24 jam', CHAdeMO: '60 kW', CCS: '60 kW', type2: '22 kW' },
      { nama: 'SPKLU Bandengan Utara', x: -6.130484776, y: 106.7991686, jam_buka: '08.00-15.00', CHAdeMO: '60 kW', CCS: '60 kW', type2: '22 kW' },
      { nama: 'SPKLU Senen Raya', x: -6.161185184, y: 106.8410084, jam_buka: '24 jam', CHAdeMO: '', CCS: '', type2: '22 kW' },
      { nama: 'Buzz Station', x: -6.209951562, y: 106.8172689, jam_buka: '24 jam', CHAdeMO: '', CCS: '', type2: '22 kW' },
      { nama: 'SPKLU Kuningan', x: -6.217118985, y: 106.8261953, jam_buka: '24 jam', CHAdeMO: '', CCS: '', type2: '11 kW' },
      { nama: 'SPKLU Fatmawati', x: -6.265923122, y: 106.7990728, jam_buka: '24 jam', CHAdeMO: '50 kW', CCS: '50 kW', type2: '43 kW' },
      { nama: 'SPKLU Halim', x: -6.257049981, y: 106.8859335, jam_buka: '24 jam', CHAdeMO: '', CCS: '200 kW', type2: '' },
      { nama: 'SPKLU Cakung', x: -6.164062307, y: 106.9592539, jam_buka: '24 jam', CHAdeMO: '400 kW', CCS: '350 kW', type2: '' },
    ];

    // Loop through the stations and add markers with the custom icon and popups
    stations.forEach((station) => {
      const coord: L.LatLngTuple = [station.x, station.y];
      const marker = L.marker(coord, { icon: this.markerIcon }).addTo(this.map);

      // Create popup content dynamically with bold text
      let popupContent = `
        <b>Nama:</b> ${station.nama}<br>
        <b>Jam Buka:</b> ${station.jam_buka}<br>
      `;

      // Add CHAdeMO, CCS, and type2 to the popup only if they are not empty
      if (station.CHAdeMO) {
        popupContent += `<b>CHAdeMO:</b> ${station.CHAdeMO}<br>`;
      }
      if (station.CCS) {
        popupContent += `<b>CCS:</b> ${station.CCS}<br>`;
      }
      if (station.type2) {
        popupContent += `<b>Type 2:</b> ${station.type2}<br>`;
      }

      // Bind the generated popup content to the marker
      marker.bindPopup(popupContent);
    });
  }

  onBasemapChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    // Remove the current layer
    this.map.removeLayer(this.currentLayer);

    // Add the new layer based on the selected value
    switch (selectedValue) {
      case 'osm':
        this.currentLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });
        break;
      case 'terrain':
        this.currentLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a> contributors',
        });
        break;
      case 'dark':
        this.currentLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        });
        break;
      default:
        break;
    }

    this.currentLayer.addTo(this.map);
  }
}




// import { Component } from '@angular/core';
// import * as L from 'leaflet';

// //Deklarasi Komponen
// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {
//   map!: L.Map;
//   currentLayer!: L.TileLayer;

//   //fungsi yg berjalan ketika inisialisasi
//   constructor() {}

//   //dijalankan setelah komponen terinisialisasi
//   ngOnInit() {}

//   ionViewDidEnter() {
//     this.map = L.map('mapId').setView([51.505, -0.09], 13);

//     this.currentLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.map);

//     // Add a marker
//     const circleMarker = L.circleMarker([51.505, -0.09], {
//       radius: 10, // Radius in pixels
//       color: 'blue', // Border color
//       fillColor: '#30f', // Fill color
//       fillOpacity: 0.5 // Fill opacity
//     }).addTo(this.map);

//     circleMarker.bindPopup(`
//       <b>London</b><br>
//       London is the capital and largest city of both England and the United Kingdom, with a population of 8,866,180 in 2022.<br>
//       <img src="${'https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/030/060/medium/6bb3b8e04e3fd79092ba45a80271d0f3/article-london-st-pauls-cathedral.jpg'}" alt="London" style="width: 150px; height: auto;" />
//     `).openPopup();
//   }

//   onBasemapChange(event: Event) {
//     const selectedValue = (event.target as HTMLSelectElement).value;

//     // Remove the current layer
//     this.map.removeLayer(this.currentLayer);

//     // Add the new layer based on the selected value
//     switch (selectedValue) {
//       case 'osm':
//         this.currentLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         });
//         break;
//       case 'terrain':
//         this.currentLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//           attribution: '&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a> contributors',
//         });
//         break;
//       case 'dark':
//         this.currentLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
//           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
//         });
//         break;
//       default:
//         break;
//     }

//     this.currentLayer.addTo(this.map);
//   }
// }
