import { Pipe, PipeTransform } from '@angular/core';
import { Alumnos } from './components/layout/layout.component';

@Pipe({
  name: 'apellido'
})
export class ApellidoPipe implements PipeTransform {

  transform(value: Alumnos, ...args: unknown[]): unknown {
    return value.nombre + ' ' + value.apellido;
  }

} 
