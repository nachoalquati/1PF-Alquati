import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { ListComponent } from './list/list.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    CoursesComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports:[
    CoursesComponent
  ]
})
export class CoursesModule { }
