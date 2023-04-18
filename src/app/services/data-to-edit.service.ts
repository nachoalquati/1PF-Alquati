import { Injectable } from '@angular/core';
import { Alumnos } from '../components/layout/layout.component';

@Injectable({
  providedIn: 'root'
})
export class DataToEditService {

  private alumno:any

  setAlumno(alumno:any) {
    this.alumno = alumno;
  }

  getAlumno() {
    return this.alumno;
  }

  constructor() { }
}
