import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent {
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

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nombre: this.nameControl ,
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoCurso: this.typeControl
    });
  }

  enviar() {
    console.log(this.formulario.value);
  }
}
