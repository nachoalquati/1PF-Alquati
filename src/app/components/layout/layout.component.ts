import { Component } from '@angular/core';

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
  }

  handleData(data:any){
    this.formVisible = false
    this.listVisible = true
    ELEMENT_DATA = [...ELEMENT_DATA, {...data, id:Date.now().toString(36) + Math.random().toString(36).substr(2, 5)}]
    this.list = ELEMENT_DATA
    console.log(ELEMENT_DATA);
  }

  deleteById(incomingId:number){
    
    let newArray =  ELEMENT_DATA.filter(elemt=> elemt.id !== incomingId)
    
    ELEMENT_DATA = newArray
    this.list = ELEMENT_DATA
  }
  

}
