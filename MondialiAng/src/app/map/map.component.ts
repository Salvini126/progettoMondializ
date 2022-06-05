import { Component, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { StatoMondialiService } from '../stato-mondiali.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map : any;
  private nazione : any;
  private tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

  
  @Input()
  numAnno : any;
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.statoMondServ.getData(this.numAnno).subscribe(nazione => {
      this.nazione = nazione;
      this.initStatesLayer();
    });
  }



  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    this.tiles.addTo(this.map);

    
  }
  constructor(private statoMondServ: StatoMondialiService) { }



  private initStatesLayer() {
    this.map.eachLayer((layer : any) => {
      layer.remove();
    });
    this.tiles.addTo(this.map);

    const stateLayer = L.geoJSON(this.nazione, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#3685ff',
        fillOpacity: 0.8,
        fillColor: '#368eb5'
      })
    });

    this.map.addLayer(stateLayer);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}