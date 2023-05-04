import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  displayedColumns = ['']
  dataSource: MatTableDataSource<Object> | null = null;

  constructor(){}

}
