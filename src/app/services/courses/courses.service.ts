import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Curso {
  id: number
  nombre: string;
  inicio: string;
  finalizacion: string;
  precio: number;
}

let CURSOS: Curso[] = [
  {
    id:1,
    nombre: 'Angular',
    inicio: '04/05/2023',
    finalizacion: '05/07/2023',
    precio: 34900
  },
  {
    id:2,
    nombre: 'Vue JS',
    inicio: '01/06/2023',
    finalizacion: '4/09/2023',
    precio: 27500
  },
  {
    id:3,
    nombre: 'React',
    inicio: '17/05/2023',
    finalizacion: '26/07/2023',
    precio: 37450
  }
]

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): Observable <Curso[]>{
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(CURSOS);
        observer.complete();
      }, 2000);
    });
  }
}
