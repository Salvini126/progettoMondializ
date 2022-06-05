import { Component } from '@angular/core';
import { StatoMondialiService } from './stato-mondiali.service';
import { Mondiali } from './models/mondiali.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MondialiAng';
  a : number = 0 ;
  data : any;

  constructor(private stato : StatoMondialiService){
  }
  
  
  
  getDatas(anno: any): boolean {
    let a = anno.value;
    this.stato.getCapCannonieri(a).subscribe((data: any) =>{
      console.warn(data)
      this.data = data
    })
    return false;
  }

  
}
