import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent {

  @Output()
  formEmitter = new EventEmitter<FormGroup>();
  
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

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nombre: this.nameControl ,
      apellido: this.lastNameControl,
      email: this.emailControl,
      tipoCurso: this.typeControl
    });
  }

  
  

  

  sendForm() {
    if(this.nameControl.valid && this.typeControl.valid && this.emailControl.valid && this.lastNameControl.valid ){
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
