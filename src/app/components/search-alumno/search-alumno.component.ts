import { Component, Input, OnDestroy, OnInit, ApplicationRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subscription, EMPTY } from 'rxjs';
import { AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';
import { Alumnos } from '../layout/layout.component';

@Component({
  selector: 'app-search-alumno',
  templateUrl: './search-alumno.component.html',
  styleUrls: ['./search-alumno.component.css']
})
export class SearchAlumnoComponent implements OnInit, OnChanges, OnDestroy {

  @Input() searchString: string = '';
  alumno: Alumnos | undefined;
  alumnos$: Observable<Alumnos> = EMPTY
  alumnosSubscription: Subscription | undefined;
  loading: boolean = true
  foundData: boolean = false

  constructor(private alumnosService: AlumnosListService, private appRef: ApplicationRef, private viewContainerRef: ViewContainerRef) {}
 

  async ngOnInit() {
    
    if (this.searchString) {
      
      this.alumnos$ = this.alumnosService.getDataByName(this.searchString);
      this.alumnosSubscription = this.alumnosService.getDataByName(this.searchString).subscribe(
        alumnos => {
          if(alumnos != undefined){
            this.loading = false
            this.alumno = alumnos;
            this.foundData = true
          }
          else{
            this.loading = false
            this.foundData = false
          }
          
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true
    this.foundData = false
    if (this.searchString) {
      
      this.alumnos$ = this.alumnosService.getDataByName(this.searchString);
      this.alumnosSubscription = this.alumnosService.getDataByName(this.searchString).subscribe(
        alumnos => {
          // Asignar los datos recibidos a la propiedad alumnos
          if(alumnos != undefined){
            this.loading = false
            this.alumno = alumnos;
            this.foundData = true
          }
          else{
            this.loading = false
            this.foundData = false
          }
          
        },
        error => {
          // Aquí puedes manejar el error del Observable, por ejemplo, mostrar un mensaje de error en la interfaz de usuario
          console.log(error);
        }
      );
    }
  }

  Limpiar() {
    // Limpiar los datos del componente aquí
    this.alumno = undefined;
    this.alumnos$ = EMPTY;

    // Desvincular la vista del componente de la aplicación para marcarlo como eliminado
    this.viewContainerRef.clear();;
  }

  ngOnDestroy(): void {
    if (this.alumnosSubscription) {
      this.alumnosSubscription.unsubscribe();
    }
  }
}
