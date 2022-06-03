import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AppSettings } from './appSetting';

@Injectable({
  providedIn: 'root'
})
export class StatoMondialiService {

  constructor(private http :HttpClient) { }

  public getData(numAnno : any){
    return this.http.get(AppSettings._API +"mondiali/" + numAnno);
  }

  //public addUser(user: any,informatica: any,matematica: any,arte: any,scienze: any,storia: any,tecnologia: any,musica: any,geografia: any,pri_inglese: any,sec_leng: any){
    //return this.http.post<any>(AppSettings._API +"usersRec",{user,informatica,matematica,arte,scienze,storia,tecnologia,musica,geografia,pri_inglese,sec_leng}).pipe(map((Users: any) => {return Users}))
  //}
}