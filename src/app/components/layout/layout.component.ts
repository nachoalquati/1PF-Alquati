import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  showFiller = false;
  formVisible = false
  listVisible = true

  showList() : void {
    this.listVisible = true
    this.formVisible = false
    
  }

  showForm() : void {
    this.formVisible = true
    this.listVisible = false
  }
}
