import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataToEditService } from 'src/app/services/dataToEdit/data-to-edit.service';
import { Alumnos } from '../layout/layout.component';
import { AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {

  
  @Output()
  formEmitter = new EventEmitter<FormGroup>();


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
  idControl = new FormControl(
    this.generateId(this.alumnoToEdit),
    []
  )

  generateId(alumno:any){
    if(alumno){
      return alumno.id
    }
    return Math.round(Date.now()) + Math.random()
  }

  constructor(
    private formBuilder: FormBuilder,
    private editService: DataToEditService,
    private alumnosList: AlumnosListService
    ) {
    this.formulario = this.formBuilder.group({
      nombre: this.nameControl ,
      apellido: this.lastNameControl,
      email: this.emailControl,
      curso: this.typeControl,
      id: this.idControl
    },
    );
  }
  async ngOnInit() {
    this.alumnoToEdit = this.editService.getAlumno();
    let alumno
    if(this.alumnoToEdit){
      this.idControl.setValue(this.alumnoToEdit.id)
      this.nameControl.setValue(this.alumnoToEdit.nombre)
      this.lastNameControl.setValue(this.alumnoToEdit.apellido)
      this.emailControl.setValue(this.alumnoToEdit.email)
      this.typeControl.setValue(this.alumnoToEdit.curso)
    }else{
      console.log('No hay alumno para editar');
    }
    
  }

  
  

  

  sendForm() {
    if(this.nameControl.valid && this.typeControl.valid && this.emailControl.valid && this.lastNameControl.valid ){
      console.log(this.formulario.value);
      this.formEmitter.emit(this.formulario.value);
    }
    else{
      this.nameControl.markAsTouched()
      this.typeControl.markAsTouched()
      this.emailControl.markAsTouched()
      this.lastNameControl.markAsTouched()
    }
  }
}
