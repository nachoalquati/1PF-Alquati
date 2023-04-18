import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataToEditService } from 'src/app/services/data-to-edit.service';
import { Alumnos } from '../layout/layout.component';

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
    private editService: DataToEditService
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
  ngOnInit(): void {
    this.alumnoToEdit = this.editService.getAlumno();
    if(this.alumnoToEdit){
      this.idControl.setValue(this.alumnoToEdit.id)
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
