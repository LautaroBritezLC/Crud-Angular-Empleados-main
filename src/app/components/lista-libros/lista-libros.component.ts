import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { libroService } from 'src/app/services/libros.service';
@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit {
  libros: any[] = [];

  constructor(
    private _LibroService: libroService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getLibros()
  }

  getLibros() {
    this._LibroService.getLibros().subscribe(data => {
      this.libros = [];
      data.forEach((element: any) => {
        this.libros.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarLibro(id: string) {
    this._LibroService.eliminarLibro(id).then(() => {
      this.toastr.error('El libro fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-top-right'
      });
    }).catch(() => {})
  }

}


