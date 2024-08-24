import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient ) { 

    /* console.log('Hola');  */
    this.cargarInfo();
    this.cargarEquipo();
    
  }

  private cargarInfo() {

    // Leer el archivo Json
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {

      this.cargada= true;
      this.info= resp;
      /* console.log(resp);   */
    })

  }

  private cargarEquipo() {

    // Leer el archivo Json de Firebase
    this.http.get('https://portafolio-angular-baf1a-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( (resp: any) => {

      this.equipo= resp;
      /* console.log(resp);   */
    })

  }
}
