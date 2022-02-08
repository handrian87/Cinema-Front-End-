import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../../services/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  public villes: any;
  public cinemas: any;
  public currentVille: any;
  public currentCinema: any;
  public salles:any;
  constructor(public cinemaService:CinemaService) { }

  ngOnInit(): void {
    // Envoie de requête http vers le BE pour demander la liste des villes
    this.cinemaService.getVilles()
      .subscribe(data => {
        this.villes=data;
      }, err=> {
        console.log(err);
      })
  }

  onGetCinema(v:any) {
    this.currentVille = v;

    this.cinemaService.getCinema(v)
      .subscribe(data => {
        this.cinemas=data;
      }, err=> {
        console.log(err);
      })
  }

  onGetSalles(c:any) {
    this.currentCinema = c;
    this.cinemaService.getSalles(c)
      .subscribe(data => {
        this.salles=data;
        this.salles._embedded.salles.forEach((salle:any)=>{
          this.cinemaService.getProjections(salle)
            .subscribe((data:any) => {
              salle.projectionFilms=data;
            })
        })
      }, err=> {
        console.log(err);
      })
  }
}
