import { Component, AfterViewInit, Input} from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from './marker.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  @Input()  mapConfig$: any = {
    markers:[
    { cords:[50.4501, 30.5234], text: 'This is Kyiv'},
    { cords:[49.2331, 28.4682], text: 'This is Vinnytsia'},
    { cords:[48.5079, 32.2623], text: 'This is Kropyntytskyi'},
    { cords:[46.4825, 30.7233], text: 'This is Odessa'},

    ],
    center: [50.4501, 30.5234],
    zoom: 1,
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [50.4501, 30.5234],
      zoom: this.mapConfig$.zoom
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
  this.mapConfig$.markers.forEach((el : any) => {
    L.marker(el.cords).addTo(this.map).bindPopup(el.text);
  });
  }
}
