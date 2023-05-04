import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService, Curso } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.css']
})


export class CoursesFormComponent implements OnInit {

 nombreControl = new FormControl('',[Validators.required])
 fechaInicioControl = new FormControl('', [Validators.required])
 fechaFinalizacionControl = new FormControl('', [Validators.required])
 precioControl = new FormControl('', [Validators.required])
 curso: Curso | null = null
 formulario: FormGroup;
 courseId: string | null = null;
 
constructor(
  private formBuilder: FormBuilder,
  private courseService: CoursesService,
  private router: Router,
  private route: ActivatedRoute
){
  this.formulario = this.formBuilder.group({
    nombre: this.nombreControl,
    precio: this.precioControl,
    inicio: this.fechaInicioControl,
    finalizacion: this.fechaFinalizacionControl,
}) 
}


  ngOnInit(): void {
    
    this.courseId = this.route.snapshot.paramMap.get('id');

    if(this.courseId){
      this.getCourseById(this.courseId)
    }
    
  }

  onSubmit(){

    if(this.courseId){
      this.courseService.editCourse(this.courseId, this.formulario.value).subscribe({
        next: (data)=>{
          setTimeout(() => {
            this.router.navigate(['courses/list'])
          }, 250);
        }
      })
    }
    else{

      this.courseService.createCourse(this.formulario.value).subscribe({
        next: (data)=>{
          setTimeout(() => {
            this.router.navigate(['courses/list'])
          }, 250);
        }
      })
    }
    
  }

  getCourseById(id:string){
    this.courseService.getCourseById(id).subscribe({
      next: (data)=>{
        this.nombreControl.setValue(data.nombre)
        this.precioControl.setValue(data.precio)
        this.fechaInicioControl.setValue(data.inicio)
        this.fechaFinalizacionControl.setValue(data.finalizacion)
      }
    })
  }

}
