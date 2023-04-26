import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
  query:string | null = ''
  searchString:string = ''
  searchForm: FormGroup;
  public list:Alumnos[] = []
  showFiller = false;
  formVisible = false
  listVisible = true
  searchAlumnoVisible = false
  searchControl = new FormControl(
    '',
    []
  )

  constructor(
    private editService:DataToEditService,
    private alumnosList: AlumnosListService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) {
      this.searchForm = this.formBuilder.group({
      searchByName: this.searchControl ,
    },
    );
  }

  async ngOnInit(): Promise<void> {
    this.list = await this.alumnosList.getAlumnos()



  }

  


  showList() : void {
    this.listVisible = true
    this.formVisible = false
    this.searchAlumnoVisible = false
  }

  showForm() : void {
    this.formVisible = true
    this.listVisible = false
    this.searchAlumnoVisible = false
    this.editService.setAlumno(null)
  }

  showSearched() : void {
    this.formVisible = false
    this.listVisible = false
    this.searchAlumnoVisible = true
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
  
  searchAlumno(){
    this.query = this.searchControl.value
    this.router.navigate(['/search', this.query]);
    this.showSearched()
    console.log('searchstring en form', this.searchControl.value);
    this.searchString = this.searchControl.value || ''
  }
}
