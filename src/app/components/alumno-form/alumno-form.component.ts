import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataToEditService } from 'src/app/services/dataToEdit/data-to-edit.service';
import { Alumnos } from '../layout/layout.component';
import { AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {

  @Output()
  formEmitter = new EventEmitter<FormGroup>();

  idToEdit: number | null = null
  alumnoToEdit:any = null
  formulario: FormGroup;
  favoriteSeason: string = '';
  selected: string = ''
  nameControl = new FormControl(
    '',
    [Validators.required]
    )
  typeControl = new FormControl(
    '',
    [Validators.required]
  )
  lastNameControl = new FormControl(
    '',
    [Validators.required]
  )
  emailControl = new FormControl(
    '',
    [Validators.required, Validators.email]
  )

  alumnosService: any;
  alumnos: any;


  constructor(
    private formBuilder: FormBuilder,
    private editService: DataToEditService,
    private alumnosList: AlumnosListService,
    private router: Router
    ) {
    this.formulario = this.formBuilder.group({
      nombre: this.nameControl ,
      apellido: this.lastNameControl,
      email: this.emailControl,
      cursoId: this.typeControl,
    },
    );
  }
  async ngOnInit() {

    this.idToEdit = this.editService.getAlumnIdToEdit()
    if(this.idToEdit){
      this.alumnosList.getAlumnoById(this.idToEdit).subscribe(data=>{
        this.nameControl.setValue(data.nombre)
        this.lastNameControl.setValue(data.apellido)
        this.emailControl.setValue(data.email)
        this.typeControl.setValue(data.cursoId)
      })

    }
    
    this.alumnoToEdit = this.editService.getAlumno();


    if(this.alumnoToEdit){
      this.nameControl.setValue(this.alumnoToEdit.nombre)
      this.lastNameControl.setValue(this.alumnoToEdit.apellido)
      this.emailControl.setValue(this.alumnoToEdit.email)
      this.typeControl.setValue(this.alumnoToEdit.cursoId)
    }else{
      console.log('No hay alumno para editar');
    }
    
  }

  
  

  

  sendForm() {
    if(this.nameControl.valid && this.typeControl.valid && this.emailControl.valid && this.lastNameControl.valid ){
      this.formEmitter.emit(this.formulario.value);
      console.log('id to edit: ',this.idToEdit);
      
      if(this.idToEdit){
        console.log('entro en editAlumn');
        this.alumnosList.editAlumnById(this.formulario.value, this.idToEdit)
        this.editService.setAlumnId(null)
      }
      else{
        console.log('entro en addAlumn');
        
        this.alumnosList.addAlumn(this.formulario.value)
      }
      
      this.router.navigate(['/alumnos/list']);
    }
    else{
      this.nameControl.markAsTouched()
      this.typeControl.markAsTouched()
      this.emailControl.markAsTouched()
      this.lastNameControl.markAsTouched()
    }
  }
}
