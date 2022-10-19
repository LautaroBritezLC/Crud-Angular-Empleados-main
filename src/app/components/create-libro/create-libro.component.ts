import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { libroService } from 'src/app/services/libros.service';
@Component({
  selector: 'app-create-libro',
  templateUrl: './create-libro.component.html',
  styleUrls: ['./create-libro.component.css']
})
export class CreateLibroComponent implements OnInit {
  createLibro: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Crear libro';
  constructor(
    private fb: FormBuilder,
    private _librosServices: libroService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) { 
    this.createLibro = this.fb.group({
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      edicion: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarLibro() {
    this.submitted = true;

    if (this.createLibro.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarLibro();
    } else {
      this.editarLibro(this.id);
    }

  }

  agregarLibro() {
    const libro: any = {
      nombre: this.createLibro.value.nombre,
      autor: this.createLibro.value.autor,
      edicion: this.createLibro.value.edicion,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    console.log(libro);
    this.loading = true;
    this._librosServices.addLibro(libro).then(() => {
      this.toastr.success('El libro fue registrado con exito!', 'libro Registrado', {
        positionClass: 'toast-top-right'
      });
      this.loading = false;
      this.router.navigate(['/lista-libros']);
    }).catch(error => {
      this.loading = false;
    })
  }

  editarLibro(id: string) {

    const libro: any = {
      nombre: this.createLibro.value.nombre,
      autor: this.createLibro.value.autor,
      edicion: this.createLibro.value.edicion,
      fechaActualizacion: new Date()
    }

    this.loading = true;
    this._librosServices.actualizarLibro(id, libro).then(() => {
      this.loading = false;
      this.toastr.info('El libro fue modificado con exito', 'libro modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/lista-libros']);
    })
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar libro'
      this.loading = true;
      this._librosServices.getLibro(this.id).subscribe(data => {
        this.loading = false;
        this.createLibro.setValue({
          nombre: data.payload.data()['nombre'],
          autor: data.payload.data()['autor'],
          edicion: data.payload.data()['edicion'],
        })
      })
    }
  }

}
