import { Injectable } from '@angular/core';
import { DataToEditService } from '../dataToEdit/data-to-edit.service';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface Alumno {
  id: number
  nombre: string;
  apellido: string;
  email: string;
  cursoId: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class AlumnosListService {

  private alumnos$ = new BehaviorSubject<Alumno[]>([])
  private alumno$ = new BehaviorSubject<Alumno | any>(null)
  private alumnosByName$ =  new BehaviorSubject<Alumno[] | any>([])
  private response$ =  new BehaviorSubject<any>([])
  private data$ =  new BehaviorSubject<Alumno | null | any>(null)
  private courseData$ =  new BehaviorSubject<Alumno | null | any>(null)
  private removedAlumn$ = new BehaviorSubject<Alumno | null | any>(null)
  constructor(
    private editService: DataToEditService,
    private httpClient: HttpClient
    ) { }


  getDataFromApi(): void {
    this.httpClient.get<any[]>('http://localhost:3000/alumnos').subscribe({
      next: (alumnos) =>{
        this.alumnos$.next(alumnos)
      }
    })
  }

  getData(): Observable<Alumno[]> {
    this.getDataFromApi()
    return this.alumnos$
  }
  

  addAlumn(alumno:Alumno){
    this.httpClient.post('http://localhost:3000/alumnos', alumno).subscribe(data=>{
      console.log(data);
    })
  }

  editAlumnos(incomingId:number){

    this.httpClient.get(`http://localhost:3000/alumnos/${incomingId}`
    ).subscribe(data=>{
      console.log(data);
      this.editService.setAlumno(data)
    })
  }

  editAlumnById(alumn:FormData, id:number){
    this.httpClient.put(`http://localhost:3000/alumnos/${id}`, alumn).subscribe(data=>{
      console.log(data);
    })
  }

  deleteAlumno(alumnoId:number){
    this.httpClient.delete(`http://localhost:3000/alumnos/${alumnoId}`).subscribe({
      next: (data)=>{
        this.response$.next(data)
      }
    })
    return this.response$
  }

  getAlumnoById(incomingId:number){
    this.httpClient.get(`http://localhost:3000/alumnos/${incomingId}`).subscribe({
      next: (data) =>{
        this.alumno$.next(data)
      }
    })
    return this.alumno$
  }


  getAlumnByName(incomingName:string){
    this.httpClient.get(`http://localhost:3000/alumnos?nombre=${incomingName}`).subscribe({
      next: (data)=>{
        this.alumnosByName$.next(data)
        console.log(this.alumnosByName$.value);
        
      }
    })
    return this.alumnosByName$
  }

  getDetailData(id:number){
    this.httpClient.get(`http://localhost:3000/alumnos/${id}`).subscribe({
      next: (data)=>{
        this.data$.next(data)
      }
    })
    return this.data$
  }


  removeCourseFromAlumn(alumn:any, id:number){
    this.httpClient.put(`http://localhost:3000/alumnos/${id}`, alumn).subscribe({
      next: (data)=>{
        this.removedAlumn$.next(data)
      }
    })
    return this.removedAlumn$
  }
}
