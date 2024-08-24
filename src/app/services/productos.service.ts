import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando= true;
  productos : Producto[] = [];

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  // Para cargar productos
  private cargarProductos() {
    this.http.get<Producto[]>('https://portafolio-angular-baf1a-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {

        /* console.log(resp); */
        this.productos = resp;
        this.cargando = false;

        /* setTimeout(() => {
          this.cargando = false;
        }, 2000); */

      })
  }
}


