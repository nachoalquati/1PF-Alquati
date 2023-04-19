import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { Alumnos } from '../layout/layout.component';
import { AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';





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


  listadoAlumnos:Alumnos[] = []
  constructor(
    private alumnosList: AlumnosListService,
    ) {
  }


  async deleteById(id:number){
    this.idToDelete.emit(id)
    let alumnos = await this.alumnosList.getAlumnos()
    this.dataSource = alumnos
  }

  editById(id:number){
    this.idToEdit.emit(id)
  }


  async ngOnChanges(changes: SimpleChanges) {
    let alumnos = await this.alumnosList.getAlumnos()
    this.dataSource = alumnos
  }

  displayedColumns: string[] = ['Nombre', 'Curso', 'Email', 'Eliminar', 'Editar'];
  dataSource: Alumnos[] = []
  
 

  async ngOnInit() {
    let alumnos = await this.alumnosList.getAlumnos()
    this.dataSource = alumnos;
    console.log(await this.alumnosList.getAlumnos());
  }

}
