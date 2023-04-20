import { Injectable } from '@angular/core';
import { DataToEditService } from '../dataToEdit/data-to-edit.service';
import { Observable } from 'rxjs';

export interface Alumnos {
  id: number
  nombre: string;
  apellido: string;
  email: string;
  curso: string;
}

let ELEMENT_DATA: Alumnos[] = [
  {id: 1, nombre: "Ignacio", apellido:"Alquati" , curso: "Angular", email:"nacho@coder.com"},
];

@Injectable({
  providedIn: 'root'
})
export class AlumnosListService {

  constructor(private editService: DataToEditService) { }

 async  getAlumnos() {
    setTimeout(()=>{
     ELEMENT_DATA = ELEMENT_DATA
    }, 5000);
    return await ELEMENT_DATA
  }

  getData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ELEMENT_DATA);
      }, 2000); 
    });
  }
  
  setAlumnos(alumnosArray:Alumnos[]){
    ELEMENT_DATA = alumnosArray
  }

  addAlumno(alumno:Alumnos){
    ELEMENT_DATA = [...ELEMENT_DATA, {...alumno}]
  }

  editAlumnos(incomingId:number){
    let alumnoToEdit = ELEMENT_DATA.find(elemt=> elemt.id === incomingId)
    this.editService.setAlumno(alumnoToEdit)
  }

  deleteAlumno(alumnoId:number){
    console.log(alumnoId);
    console.log(ELEMENT_DATA)
    let newArray =  ELEMENT_DATA.filter(elemt=> elemt.id !== alumnoId)
    console.log(newArray);
    
    ELEMENT_DATA = newArray
  }

  getAlumnoById(incomingId:number){
    let alumno = ELEMENT_DATA.find(elemt=>{return elemt.id === incomingId})
  }
  getDataByName(incomingName:string): Observable<any> {
    
    return new Observable(observer => {
      setTimeout(() => {
        let alumno:Alumnos | undefined = ELEMENT_DATA.find(elemt=>{      

           return elemt.nombre === incomingName
        })
        
        observer.next(alumno);
        observer.complete();
      }, 2000);
    });
  }
}
