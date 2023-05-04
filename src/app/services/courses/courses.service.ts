import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Curso {
  id: number
  nombre: string;
  inicio: string;
  finalizacion: string;
  precio: number;
}

export interface DeleteResponse {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private cursos$ = new BehaviorSubject<Curso[] | any>([])
  private response$ = new BehaviorSubject<any | null>(null)
  private courseData$ = new BehaviorSubject<Curso| null | any>(null)
  private newCourse$ = new BehaviorSubject<Object| null>(null)
  private editedCourse$ = new BehaviorSubject<Object | null>(null)

  constructor(private httpClient: HttpClient) { }


  getCourses(): Observable <Curso[]>{
    this.httpClient.get('http://localhost:3000/cursos').subscribe({
      next: (cursos)=>{
        this.cursos$.next(cursos)
      }
    })
    return this.cursos$
  }

  deleteCourse(id:number) {
    this.httpClient.delete<DeleteResponse>(`http://localhost:3000/cursos/${id}`).subscribe({
      next: (data)=>{
        this.response$.next(data)
      }
    })
    return this.response$
  }

  getCourseById(id:string | null){
    this.httpClient.get(`http://localhost:3000/cursos/${id}`).subscribe({
      next: (data)=>{
        this.courseData$.next(data)
      }
    })
    return this.courseData$
  }

  createCourse(curso:FormData){
    this.httpClient.post(`http://localhost:3000/cursos`, curso).subscribe({
      next: (data)=>{
        this.newCourse$.next(data)
      }
    })
    return this.newCourse$
  }

  editCourse(id:string, curso:FormData){
    this.httpClient.put(`http://localhost:3000/cursos/${id}`, curso).subscribe({
      next: (data)=>{
        this.editedCourse$.next(data)
      }
    })
    return this.editedCourse$
  }

}
