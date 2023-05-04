import { Component, Input, OnDestroy, OnInit, ApplicationRef, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subscription, EMPTY } from 'rxjs';
import { Alumno, AlumnosListService } from 'src/app/services/alumnosList/alumnos-list.service';
import { Alumnos } from '../layout/layout.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-alumno',
  templateUrl: './search-alumno.component.html',
  styleUrls: ['./search-alumno.component.css']
})
export class SearchAlumnoComponent implements OnInit, OnChanges, OnDestroy {

  @Input() searchString: string = '';
  alumno: Alumnos | undefined;
  alumns$: Alumno[] = []
  alumnos$: Observable<Alumnos> = EMPTY
  alumnosSubscription: Subscription | undefined;
  loading: boolean = true
  foundData: boolean = false
  query: string | null = ''

  constructor(
    private alumnosService: AlumnosListService,
     private appRef: ApplicationRef,
      private viewContainerRef: ViewContainerRef,
      private route: ActivatedRoute
      ) {}
 

  async ngOnInit() {
    this.query = this.route.snapshot.paramMap.get('query');
    console.log('query= ', this.query);

    this.searchAlumnoWithName()

  }

  searchAlumnoWithName(){
  
    if (this.query) {
      
      this.alumnosService.getAlumnByName(this.query).subscribe({
        next: (data)=>{
          this.alumns$ = data
          console.log(this.alumns$);
          
          if(this.alumns$){
            this.loading = false
            this.foundData = true
          }
          else{
            this.loading = false
            this.foundData = false
          }
        }
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true
    this.foundData = false
    this.query = this.route.snapshot.paramMap.get('query');
    this.searchAlumnoWithName()
  }

  Limpiar() {

    this.alumno = undefined;
    this.alumnos$ = EMPTY;

    this.viewContainerRef.clear();
  }

  ngOnDestroy(): void {
    if (this.alumnosSubscription) {
      this.alumnosSubscription.unsubscribe();
    }
  }
}
