import { Component, OnInit } from '@angular/core';
import { CoursesService, Curso } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  
  cursos$: Curso[] = [];
  displayedColumns: string[] = ['Nombre', 'Inicio', 'Finalización', 'Precio'];
  dataSource: Curso[] = [];
  loading:boolean = true

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(
      (cursosList) => {
        this.cursos$ = cursosList 
        this.dataSource = cursosList
        this.loading = false
      },
      error => {
        console.log(error);
      }
    );
  }

  

}
