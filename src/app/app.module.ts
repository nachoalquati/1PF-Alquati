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


const routes: Routes = [
  { path: 'alumnos/list', component: AlumnoListComponent },
  { path: 'courses/list', component: ListComponent },
  { path: 'courses/form/:id', component: CoursesFormComponent },
  { path: 'courses/form', component: CoursesFormComponent },
  { path: 'alumnos/form', component: AlumnoFormComponent },
  { path: 'search/:query', component: SearchAlumnoComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AlumnoFormComponent,
    AlumnoListComponent,
    ApellidoPipe,
    SearchAlumnoComponent,
    DetailDialogComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
