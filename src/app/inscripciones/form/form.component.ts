import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Alumno, AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';
import { CoursesService, Curso } from 'src/app/services/courses/courses.service';
import { Inscripcion, InscripcionesService } from 'src/app/services/inscripciones/inscripciones.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  courses: Curso[] = []
  alumnos: Alumno[] = []
  inscripciones : Inscripcion [] = []
  selected: number | null = null
  selectedCourse : number | null = null
  coursesControl = new FormControl('', [Validators.required])
  alumnosControl = new FormControl('', [Validators.required])
  estadoControl = new FormControl('Pendiente')
  formulario 

  constructor(
    private coursesService: CoursesService,
    private alumnosService: AlumnosListService,
    private inscipcionesService: InscripcionesService,
    private formBuilder: FormBuilder,
    private router: Router
    ){
      this.formulario = this.formBuilder.group({
        alumnoId: this.alumnosControl ,
        cursoId: this.coursesControl,
        estado: this.estadoControl
      },
      );
    }

  ngOnInit(): void {
    this.getAlumnos()
    this.getCourses()
  }

  getCourses(){
    this.coursesService.getCourses().subscribe(data=>{
      this.courses = data
      console.log(this.courses);
      
    })
  }
  getAlumnos(){
    this.alumnosService.getData().subscribe(data=>{
      this.alumnos = data
      console.log(this.alumnos);
      
    })
  }

  createInscripcion(){
    this.inscipcionesService.createInscripcion(this.formulario.value).subscribe({
      next: (data)=>{
        setTimeout(() => {
          this.router.navigate(['/inscripciones/list'])
        }, 400);
      }
    })
  }
}
