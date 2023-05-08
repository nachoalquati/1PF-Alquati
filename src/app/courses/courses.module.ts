import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CoursesDetailDialogComponent } from './courses-detail-dialog/courses-detail-dialog.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListComponent,
    CoursesFormComponent,
    CoursesDetailDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatMenuModule,
    MatDatepickerModule,
    RouterModule.forChild([
      { path: 'form', component: CoursesFormComponent },
      { path: 'list', component: ListComponent },
      { path: 'courses/form/:id', component: CoursesFormComponent },
    ])
  ],
})
export class CoursesModule { }
