import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  public host:string="http://localhost:8080";
  constructor(private http:HttpClient) {
  }
  public getVilles(){
    return this.http.get(this.host+"/villes");
  }

  getCinema(v:any) {
    return this.http.get(v._links.cinemas.href);
  }

  getSalles(c: any) {
    return this.http.get(c._links.salles.href);
  }
//http://localhost:8080/projectionFilms/1?projectionFilm=p1
  getProjections(salle: any) {
    let url=salle._links.projectionFilms.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1");
  }
  //pour comprendre tester d'abord: http://localhost:8080/projectionFilms/1
  //http://localhost:8080/projectionFilms/1/ticket?projection=pt
  getTicketsPlaces(p: any) {
    let url=p._links.ticket.href.replace("{?projection}","");
    return this.http.get(url+"?projection=pt")
  }
}
