import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';
import { ProductoDescripcion } from '../interfaces/producto.descripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando= true;
  productos : Producto[] = [];
  productosfiltrado: Producto[] = [];

  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  // Para cargar productos
  private cargarProductos() {

    return new Promise<void> ( ( resolve, reject) => {

      this.http.get<Producto[]>('https://portafolio-angular-baf1a-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
  
          /* console.log(resp); */
          this.productos = resp;
          this.cargando = false;
          resolve();
  
          /* setTimeout(() => {
            this.cargando = false;
          }, 2000); */
  
        });

    });

  }

  getProducto(id: string): Observable<ProductoDescripcion> {
    return this.http.get<ProductoDescripcion>(`https://portafolio-angular-baf1a-default-rtdb.firebaseio.com/productos/${id}.json`);
  }


  buscarProducto( termino: string ) {
   
    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // aplicar filtro
        this.filtrarProductos( termino );
      });

    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }

    
  }


  private filtrarProductos( termino: string ) {

    console.log(this.productos);
    this.productosfiltrado = [];

    //Para cambiarlo a minuscula
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosfiltrado.push( prod );
      }

    })

  }

}


