import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class libroService {

  constructor(private firestore: AngularFirestore) { }

  addLibro(libro: any): Promise<any> {
    return this.firestore.collection('libro').add(libro);
  }

  getLibros(): Observable<any> {
    return this.firestore.collection('libro', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarLibro(id: string): Promise<any> {
    return this.firestore.collection('libro').doc(id).delete();
  }

  getLibro(id: string): Observable<any> {
    return this.firestore.collection('libro').doc(id).snapshotChanges();
  }

  actualizarLibro(id: string, data:any): Promise<any> {
    return this.firestore.collection('libro').doc(id).update(data);
  }

}