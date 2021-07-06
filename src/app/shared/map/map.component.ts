import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IMapMarker } from '../variables';

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
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map: any;

  @Input() markers: IMapMarker[] | null = [
    { cords: [], text: 'This is Vinnytsia' },
  ];
  @Input() mapConfig$: any = {
    center: [50.4501, 30.5234],
    zoom: 5,
  };

  private initMap(): void {
    this.map = L.map('map', {
      center: [50.4501, 30.5234],
      zoom: 4,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        id: 'mapbox/streets-v11', //satellite-v9 streets-v11
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
      if (this.markers)
        this.markers.forEach((el: any) => {
          L.marker(el.cords).addTo(this.map).bindPopup(el.text);
        });
      const myPins = this.markers?.map((el) => el.cords);
      this.map.fitBounds(myPins);
  }
}
