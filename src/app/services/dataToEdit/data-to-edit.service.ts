import { Injectable } from '@angular/core';
import { Alumnos } from '../../components/layout/layout.component';

@Injectable({
  providedIn: 'root'
})
export class DataToEditService {

  private alumno:any
  private alumnId: number | null = null

  setAlumno(alumno:any) {
    this.alumno = alumno;
  }

  setAlumnId(id:number | null){
    this.alumnId = id
  }

  getAlumno() {
    return this.alumno;
  }

  getAlumnIdToEdit(){
    return this.alumnId
  }

  constructor() { }
}
