import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { Alumnos } from '../layout/layout.component';
import { Alumno, AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';
import { Router } from '@angular/router';
import { toArray, Subscription } from 'rxjs';
import { DataToEditService } from 'src/app/services/dataToEdit/data-to-edit.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Curso } from 'src/app/services/courses/courses.service';
@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit, OnChanges, OnDestroy {

  @Output() idToDelete = new EventEmitter<number>();
  @Output() idToEdit = new EventEmitter<number>();

  loading:boolean = true;

  listadoAlumnos:Alumno[] = [];
  dataSubscription: Subscription | null = null;
  courses : Curso [] = []
  displayedColumns: string[] = ['Nombre', 'Curso', 'Email','Detalle','Editar', 'Eliminar' ];
  dataSource: any[] = [];

  constructor(
    private router: Router,
    private alumnosList: AlumnosListService,
    private editService: DataToEditService,
    public dialog: MatDialog,
    private coursesService: CoursesService
  ) {}

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  openDialog(id:number): void {
    const dialogRef = this.dialog.open(DetailDialogComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  deleteById(id:number){
    this.alumnosList.deleteAlumno(id).subscribe({
      next: (response)=>{
        this.getList()
      }
    })
    this.loading = true
    this.getList()
    this.router.navigate(['/alumnos/list']);
  }

  editById(id:number){
    this.editService.setAlumnId(id)
    this.router.navigate(['/alumnos/form']);
  }

  getList(){
    this.alumnosList.getData().subscribe({
      next: (data=>{
        this.listadoAlumnos = data
        this.dataSource = data
        this.loading = false
      })
    })
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.getList()
    this.loading = false;
  }

  openDetailDialog(id:number){

  }

  getCourses(){
    this.coursesService.getCourses().subscribe({
      next: (data)=>{
        this.courses = data
        
      }
    })
  }


  async ngOnInit() {
    this.getCourses()
    this.getList()
  }
}
