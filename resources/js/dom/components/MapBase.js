import { Component } from 'domr-framework';
import { Map, LayerGroup, TileLayer, Marker, Circle } from 'leaflet';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default class extends Component {
  constructor() {
    super();
  }

  Markup() {
    return `
      <div id="mapid" style="height: 100vh">
      </div>
    `;
  }

  MakeCircle(lat, lng, type = 'country') {
    const color = type === 'city' ? 'blue' : 'red';

    return new Circle([lat, lng], {
      color,
      fillColor: color,
      opacity: 1,
      fillOpacity: 0.3,
      radius: 70000,
    });
  }

  MapArea() {
    return '';
  }

  AfterRenderDone() {
    const thisSelf = this.GetThisComponent();
    let mymap = '';

    if (isMobile) {
      mymap = new Map('mapid', {
        minZoom: 2,
        maxZoom: 6,
      }).fitWorld();
    } else {
      mymap = new Map('mapid', {
        minZoom: 2,
        maxZoom: 6,
      });
    }

    const circlesLayer = new LayerGroup();

    mymap.setView([0, 0], 2);

    const mainTile = new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    mainTile.addTo(mymap);

    const marker = new Marker([0, 0]);

    marker.addTo(mymap);

    marker.setOpacity(0);

    this.MapArea(thisSelf, mymap, circlesLayer, marker);
  }
}
