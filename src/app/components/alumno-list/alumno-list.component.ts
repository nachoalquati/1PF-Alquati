import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { Alumnos } from '../layout/layout.component';
import { AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})

export class AlumnoListComponent implements OnInit, OnChanges {

  @Output()
  idToDelete = new EventEmitter<number>();
  @Output()
  idToEdit = new EventEmitter<number>();

  loading:boolean = true

  listadoAlumnos:Alumnos[] = []
  constructor(
    private router: Router,
    private alumnosList: AlumnosListService,
    ) {
  }


  async deleteById(id:number){
    this.alumnosList.deleteAlumno(id)
    let alumnos = await this.alumnosList.getAlumnos()
    this.dataSource = alumnos
  }

  editById(id:number){
    this.idToEdit.emit(id)
    this.alumnosList.editAlumnos(id)
    this.router.navigate(['/alumnos/form']);
  }


  async ngOnChanges(changes: SimpleChanges) {
    let alumnos = await this.alumnosList.getAlumnos()
    this.loading = false
    this.dataSource = alumnos
  }

  displayedColumns: string[] = ['Nombre', 'Curso', 'Email', 'Eliminar', 'Editar'];
  dataSource: Alumnos[] = []
  
 

  async ngOnInit() {
    let alumnos = await this.alumnosList.getData()
    this.dataSource = alumnos;
    this.loading = false
    
  }

}
