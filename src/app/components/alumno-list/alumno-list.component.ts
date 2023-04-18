import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { Alumnos } from '../layout/layout.component';





@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})

export class AlumnoListComponent implements OnInit, OnChanges {
  @Input()
  listadoAlumnos: Alumnos[]
  @Output()
  idToDelete = new EventEmitter<number>();
  @Output()
  idToEdit = new EventEmitter<number>();

  constructor() {
    this.listadoAlumnos = [];
  }


  deleteById(id:number){
    this.idToDelete.emit(id)
  }

  editById(id:number){
    this.idToEdit.emit(id)
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = this.listadoAlumnos
  }

  displayedColumns: string[] = ['Nombre', 'Curso', 'Email', 'Eliminar', 'Editar'];
  dataSource: Alumnos[] = []
  
 

  ngOnInit(): void {
    this.dataSource = this.listadoAlumnos;
  }

}
