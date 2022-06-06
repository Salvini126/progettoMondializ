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

  a2 : number = 0 ;
  data2 : any;
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

  getStadi(anno2: any): boolean {
    let a2 = anno2.value;
    this.stato.getStadi(a2).subscribe((data2: any) =>{
      console.warn(data2)
      this.data2 = data2
    })
    return false;
  }
  
}
