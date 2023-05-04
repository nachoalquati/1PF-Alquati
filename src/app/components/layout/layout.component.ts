import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Alumno, AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';
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
  public list : Alumno[] = []
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
    this.getList()

    }



  

  getList(){
    this.alumnosList.getData().subscribe({
      next: (data=>{
        this.list = data
      })
    })
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


  async deleteById(incomingId:number){
    
    this.alumnosList.deleteAlumno(incomingId)
    let alumnos = await this.alumnosList.getData()
    this.getList()
    this.router.navigate(['alumnos/form']);
  }

  editById(incomingId:number){
    this.showForm()
    this.alumnosList.editAlumnos(incomingId)
  }
  
  searchAlumno(){
    this.query = this.searchControl.value
    this.router.navigate(['alumnos/list']);
    this.router.navigate(['/search', this.query]);
    this.showSearched()
  }
}
