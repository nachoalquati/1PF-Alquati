import { Component } from '@angular/core';
import { DataToEditService } from 'src/app/services/data-to-edit.service';

export interface Alumnos {
  id: number
  nombre: string;
  apellido: string;
  email: string;
  curso: string;
}

let ELEMENT_DATA: Alumnos[] = [
  {id: 1, nombre: 'Ignacio', apellido:'Alquati' , curso: 'Angular', email:'nacho@coder.com'},
];

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent {

  constructor(private editService:DataToEditService) { }

  list = ELEMENT_DATA
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

  handleData(data:any){
    let foundUser = ELEMENT_DATA.find(elemt=> elemt.id === data.id)
    this.formVisible = false
    this.listVisible = true

    if (foundUser){
      ELEMENT_DATA = ELEMENT_DATA.map(elemt=>{
        if (elemt.id === data.id){
          return elemt = data
        }
      } )
      this.list = ELEMENT_DATA
    }
    else{
      ELEMENT_DATA = [...ELEMENT_DATA, {...data}]
      this.list = ELEMENT_DATA
    }
    
  }

  deleteById(incomingId:number){
    
    let newArray =  ELEMENT_DATA.filter(elemt=> elemt.id !== incomingId)
    
    ELEMENT_DATA = newArray
    this.list = ELEMENT_DATA
  }

  editById(incomingId:number){
    this.showForm()
    console.log(incomingId);
    let alumnoToEdit = ELEMENT_DATA.find(elemt=> elemt.id === incomingId)
    this.editService.setAlumno(alumnoToEdit)
  }

}
