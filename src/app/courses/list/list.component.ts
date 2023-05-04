import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService, Curso } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges{
  
  cursos$: Curso[] = [];
  displayedColumns: string[] = ['Nombre', 'Inicio', 'Finalización', 'Precio','Detalle', 'Modificar', 'Eliminar' ];
  dataSource: Curso[] = [];
  loading:boolean = true

  constructor(private coursesService: CoursesService, private router:Router) { }

  ngOnInit(): void {
    this.getCourses()
  }
  ngOnChanges(): void {
    this.getCourses()
  }

  getCourses(){
    this.coursesService.getCourses().subscribe({
      next: (data)=>{
        this.dataSource = data
        this.loading = false
      }
    })
  }

  deleteCourse(id:number){
    this.coursesService.deleteCourse(id).subscribe({
      next: (data: any)=>{
        this.getCourses()
      }
    })
    this.getCourses()
  }
  

  editCourse(id:number){
    this.router.navigate([`/courses/form/${id}`])
  }

}
