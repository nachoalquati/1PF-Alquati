import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoursesService } from '../courses/courses.service';
import { AlumnosListService } from '../alumnosList/alumnos-list.service';


export interface Inscripcion {
  id: number,
  alumnoId:number,
  cursoId: number,
  estado: string
}


@Injectable({
  providedIn: 'root'
})



export class InscripcionesService {


  private inscripciones$ = new BehaviorSubject<Inscripcion[] | any>([])
  response: any
  constructor(private httpClient: HttpClient, private coursesService: CoursesService, private alumnosService: AlumnosListService) { }
  private res$ = new BehaviorSubject<any | null>(null)
  getInscripciones(){
    this.httpClient.get(`http://localhost:3000/inscripciones`).subscribe({
      next: (data) =>{
        this.inscripciones$.next(data)
      }
    })
    return this.inscripciones$
  }

  deleteInscipcion(id:number){
    this.httpClient.delete(`http://localhost:3000/inscripciones/${id}`).subscribe({
      next: (data)=>{
        this.res$.next(data)
      }
    })
    return this.res$
  }

  createInscripcion(inscripcion:any){
    this.httpClient.post(`http://localhost:3000/inscripciones`, inscripcion).subscribe({
      next: (data)=>{
        this.res$.next(data)
      }
    })
    return this.res$
  }
  changeStatus(inscripcion:Inscripcion){
    this.httpClient.put(`http://localhost:3000/inscripciones/${inscripcion.id}`, inscripcion).subscribe({
      next: (data)=>{
        this.res$.next(data)
      }
    })
    return this.res$
  }
}
