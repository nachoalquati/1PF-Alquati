import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DetailDialogComponent } from 'src/app/components/detail-dialog/detail-dialog.component';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-courses-detail-dialog',
  templateUrl: './courses-detail-dialog.component.html',
  styleUrls: ['./courses-detail-dialog.component.css']
})
export class CoursesDetailDialogComponent {

  displayedColumns = ['']
  dataSource: any
  fetchData: any
  constructor(
    private coursesService: CoursesService,
    public dialogRef: MatDialogRef<DetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    ){}

  ngOnInit(): void {
    console.log(this.data);
    this.getCourseAndAlumns(this.data)
    
  }

  getCourseAndAlumns(id:any){
    this.coursesService.getCourseAndAlumnsById(id).subscribe(data=>{
      this.fetchData = data
      this.dataSource = this.fetchData.alumnos
      console.log(this.dataSource);
      
    })
    
  }

}
