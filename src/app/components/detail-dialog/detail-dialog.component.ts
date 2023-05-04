import { Component, OnInit, Inject } from '@angular/core';
import { Alumno, AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CoursesService, Curso } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css']
})
export class DetailDialogComponent implements OnInit{

    alumno: Alumno | null 
    curso: Curso | null 

    constructor(
        private alumnosService: AlumnosListService,
        public courseService: CoursesService,
        public dialogRef: MatDialogRef<DetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: number,
        ){
            this.alumno = null
            this.curso = null
        }

    ngOnInit(): void {
        // this.getData(this.data).subscribe({

        // })

        this.alumno = null
        this.curso = null

        this.getData(this.data)

        console.log(this.alumno);
        console.log(this.curso);
        
        
    }

    getData(id:number){
        this.alumno = null
        this.alumnosService.getDetailData(id).subscribe({
            next: (data)=>{
                this.alumno = data
                this.getCourseData()
            }
        })


    }

    getCourseData(){
        this.curso = null
        if(this.alumno){
            this.courseService.getCourseById(this.alumno.cursoId).subscribe({
                next: (data)=>{
                    this.curso = data          
                },
                error: (e)=>{
                    console.log(e);
                    this.curso = null
                }
            })
        }
    }
    onNoClick(): void {
        this.alumno = null
        this.curso = null
        this.dialogRef.close();
      }

      removeCourse(alumno:Alumno | null){
        if(alumno){
            alumno.cursoId = null
            this.alumnosService.removeCourseFromAlumn(alumno, alumno.id).subscribe({
                next: (data)=>{
                    console.log(data);
                    
                }
            })
        }
      }
}
