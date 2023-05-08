import { Component, OnChanges, OnInit } from '@angular/core';
import { InscripcionesService } from 'src/app/services/inscripciones/inscripciones.service';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom ,  firstValueFrom, BehaviorSubject } from 'rxjs';
import { Alumno, AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';
import { CoursesService, Curso } from 'src/app/services/courses/courses.service';
import { FormControl } from '@angular/forms';

export interface Inscripcion {
  id: number,
  alumnoId: number,
  cursoId: number,
  estado: string
}

@Component({
  selector: 'app-inscripciones-list',
  templateUrl: './inscripciones-list.component.html',
  styleUrls: ['./inscripciones-list.component.css']
})


export class InscripcionesListComponent implements OnInit, OnChanges {

  inscripciones$ = new BehaviorSubject<Object | null>(null)
  cursos$ = new BehaviorSubject<Object | null>(null)
  alumnos$ = new BehaviorSubject<Object | null>(null)
  alumnos: Alumno [] = []
  cursos: Curso[] = []
  inscripciones: Inscripcion[] = []
  dataSource: Inscripcion[] = []
  displayedColumns = ['Alumno', 'Curso', 'Estado', 'Modificar', 'Eliminar' ]
  statusControl = new FormControl('Cambiar estado')
  selectedStatus: string | null = null
constructor(
  private inscripcionesService: InscripcionesService,
  private alumnosService: AlumnosListService,
  private coursesService: CoursesService
    ){}

  async ngOnInit() {
    this.getInscripciones()
    this.getAlumnos()
    this.getCourses()
    console.log(this.alumnos$, this.cursos$, this.inscripciones$);
    
  }

  ngOnChanges(): void {
    this.getInscripciones()
  }
  
  editInscripcion(id:number){

  }

  deleteInscripcion(id:number){

  }

  openDialog(id:number){

  }

  getAlumnos(){
    this.alumnosService.getData().subscribe({
      next: (data)=>{
        this.alumnos$.next(data)
        this.alumnos = data
      }
    })
  }

  changeStatus(inscripcion:Inscripcion){
    if(this.statusControl.value){
      inscripcion.estado = this.statusControl.value
    }
    this.inscripcionesService.changeStatus(inscripcion).subscribe({
      next: (data)=>{
        console.log(data);
        this.getInscripciones()
        this.statusControl.setValue('Cambiar estado')
      }
    })
    this.getInscripciones()
  }

  getCourses(){
    this.coursesService.getCourses().subscribe({
      next: (data)=>{
        this.cursos$.next(data)
        this.cursos = data
      }
    })
  }

 getInscripciones(){
    this.inscripcionesService.getInscripciones().subscribe({
    next: (data:Inscripcion[])=>{
      this.inscripciones$.next(data)
      this.inscripciones = data
      this.dataSource = data
    }
   })
  }

  deleteInscipciones(id:number){
    this.inscripcionesService.deleteInscipcion(id).subscribe({
      next: (data)=>{
        console.log(data);
        this.getInscripciones()
      }
    })
    this.getInscripciones()
  }
}


