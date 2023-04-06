import { Component, Input } from '@angular/core';
import { Application } from 'src/app/models/application';

@Component({
  selector: 'app-aplication-item',
  templateUrl: './application-item.component.html',
  styleUrls: ['./application-item.component.scss'],
})
export class ApplicationItemComponent {
  @Input() application: Application;

  public hideContactInfo: boolean = true;
  public isEditing: boolean = false;

  public showContactInfo() {
    this.hideContactInfo = !this.hideContactInfo;
  }

  public showEditForm(isEditing: boolean) {
    this.isEditing = isEditing;
  }

  public onCloseEditForm() {
    this.isEditing = false;
  }
}
