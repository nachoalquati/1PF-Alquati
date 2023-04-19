import { Component, OnInit } from '@angular/core';
import { AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';
import { DataToEditService } from 'src/app/services/dataToEdit/data-to-edit.service';

export interface Alumnos {
  id: number
  nombre: string;
  apellido: string;
  email: string;
  curso: string;
}


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {

  constructor(
    private editService:DataToEditService,
    private alumnosList: AlumnosListService
    ) { }
  async ngOnInit(): Promise<void> {
    this.list = await this.alumnosList.getAlumnos()
  }

  public list:Alumnos[] = []
  showFiller = false;
  formVisible = false
  listVisible = true

  showList() : void {
    this.listVisible = true
    this.formVisible = false
    
  }

  showForm() : void {
    this.formVisible = true
    this.listVisible = false
    this.editService.setAlumno(null)
  }

  async handleData(data:any){
    let array = await  this.alumnosList.getAlumnos()
    let foundUser =  array.find(elemt=> elemt.id === data.id)
    this.formVisible = false
    this.listVisible = true

    if (foundUser){
      let array = await this.alumnosList.getAlumnos()
      let newArray = array.map(elemt=>{
        if (elemt.id === data.id){
          return elemt = data
        }
      } )
      this.alumnosList.setAlumnos(newArray)
      let alumnoss = await this.alumnosList.getAlumnos() 
      this.list = alumnoss
    }
    else{
      this.alumnosList.addAlumno(data)
      let alumnoss = await this.alumnosList.getAlumnos() 
      this.list = alumnoss
    }
    
  }

  async deleteById(incomingId:number){
    
    this.alumnosList.deleteAlumno(incomingId)
    let alumnos = await this.alumnosList.getAlumnos()
    this.list = alumnos
  }

  editById(incomingId:number){
    this.showForm()
    this.alumnosList.editAlumnos(incomingId)
  }

}
