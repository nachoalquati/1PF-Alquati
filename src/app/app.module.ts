import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutComponent } from './components/layout/layout.component';
import { MatListModule } from '@angular/material/list';
import { AlumnoFormComponent } from './components/alumno-form/alumno-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { MatTableModule } from '@angular/material/table';
import { ApellidoPipe } from './apellido.pipe';
import { SearchAlumnoComponent } from './components/search-alumno/search-alumno.component';
import { MatCardModule } from '@angular/material/card';
import { CoursesModule } from './courses/courses.module';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './courses/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { DetailDialogComponent } from './components/detail-dialog/detail-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CoursesFormComponent } from './courses/courses-form/courses-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { InscripcionesListComponent } from './inscripciones/inscripciones-list/inscripciones-list.component';
import { FormComponent } from './inscripciones/form/form.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: '/layout/alumnos/list', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent,
    children:[
      {path:'login', component:LoginComponent}
    ]
  },
  { path: 'layout', component:LayoutComponent,
    canActivate:[ AuthGuard ],
    children:[
      { path: 'alumnos',
      children:[
       {path:'list' , component: AlumnoListComponent},
       {path:'form' , component: AlumnoFormComponent},
      ]
     },
     {path: 'inscripciones',
       children:[
         { path: 'list', component: InscripcionesListComponent },
         { path: 'form', component: FormComponent }
       ]
     },
     {path: 'courses',
       loadChildren: () => import('././courses/courses.module').then((m)=> m.CoursesModule)
     },
     { path: 'search/:query', component: SearchAlumnoComponent },
    ]
  },
  
];


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AlumnoFormComponent,
    AlumnoListComponent,
    ApellidoPipe,
    SearchAlumnoComponent,
    DetailDialogComponent,
    InscripcionesListComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    CoursesModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
    MatNativeDateModule, 
    [RouterModule.forRoot(routes)],
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
