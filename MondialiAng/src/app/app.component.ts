import { Component } from '@angular/core';
import { StatoMondialiService } from './stato-mondiali.service';
import { Mondiali, Mondiali1 } from './models/mondiali.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './appSetting';
import { flaskLink } from './flaskLink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MondialiAng';
  linkFlask = flaskLink.getUrl();

  dataFrame: Observable<Mondiali1[]>| undefined;
  dati:Mondiali1[] = undefined!;

  dataFrame1: Observable<Mondiali[]>| undefined;
  dati1:Mondiali[] = undefined!;

  constructor(private stato : StatoMondialiService, private http: HttpClient){
  }
  
  getDatas(anno: HTMLInputElement){
    let n = anno.value;
    this.dataFrame1 = this.http.get<Mondiali[]>(this.linkFlask +"/capocannonieri/" +n);
    this.dataFrame1.subscribe(this.fati1)
  }

  fati1 = (dataa: Mondiali[]) => {
    this.dati1 = dataa;
    console.log(dataa);
  }

  getStadi(anno2: HTMLInputElement){
    let n = anno2.value;
    this.dataFrame = this.http.get<Mondiali1[]>(this.linkFlask +"/year/" +n);
    this.dataFrame.subscribe(this.fati)
  }

  fati = (data: Mondiali1[]) => {
    this.dati = data;
    console.log(data);
  }
  
}
