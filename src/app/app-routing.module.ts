import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLibroComponent } from './components/create-libro/create-libro.component';
import { ListaLibrosComponent } from './components/lista-libros/lista-libros.component';


const routes: Routes = [
  { path: '', redirectTo: 'lista-libros', pathMatch: 'full' },
  { path: 'lista-libros', component: ListaLibrosComponent },
  { path: 'create-libro', component: CreateLibroComponent },
  { path: 'editLibro/:id', component: CreateLibroComponent },
  { path: '**', redirectTo: 'lista-libros', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
